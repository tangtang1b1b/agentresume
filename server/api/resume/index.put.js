import { requireAuth } from '~/server/utils/auth';
import { getDb } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  const user = requireAuth(event);
  const body = await readBody(event);

  if (!body?.resume) {
    throw createError({ statusCode: 400, statusMessage: 'Resume data is required' });
  }

  const sql = getDb();
  await sql`
    INSERT INTO resumes (user_id, data, updated_at)
    VALUES (${user.userId}, ${JSON.stringify(body.resume)}, NOW())
    ON CONFLICT (user_id) DO UPDATE
    SET data = EXCLUDED.data, updated_at = NOW()
  `;

  return { ok: true };
});
