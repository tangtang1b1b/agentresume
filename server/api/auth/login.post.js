import bcrypt from 'bcryptjs';
import { getDb, initDb } from '../../../server/utils/db.js';
import { signToken } from '../../../server/utils/auth.js';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' });
  }

  await initDb();
  const sql = getDb();

  const [user] = await sql`SELECT id, email, password_hash FROM users WHERE email = ${email.toLowerCase()}`;
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }

  const token = signToken({ userId: user.id, email: user.email });
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return { user: { id: user.id, email: user.email } };
});
