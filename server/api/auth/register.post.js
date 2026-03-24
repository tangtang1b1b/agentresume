import bcrypt from 'bcryptjs';
import { getDb, initDb } from '../../../server/utils/db.js';
import { signToken } from '../../../server/utils/auth.js';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' });
  }
  if (password.length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 6 characters' });
  }

  await initDb();
  const sql = getDb();

  const existing = await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()}`;
  if (existing.length > 0) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const [user] = await sql`
    INSERT INTO users (email, password_hash) VALUES (${email.toLowerCase()}, ${passwordHash})
    RETURNING id, email, created_at
  `;

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
