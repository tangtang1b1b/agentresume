import { requireAuth } from '../../../server/utils/auth.js';
import { getDb } from '../../../server/utils/db.js';

export default defineEventHandler(async (event) => {
  const user = requireAuth(event);
  const sql = getDb();

  const [row] = await sql`SELECT data FROM resumes WHERE user_id = ${user.userId}`;
  return { resume: row?.data ?? null };
});
