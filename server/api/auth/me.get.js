import { requireAuth } from '../../../server/utils/auth.js';

export default defineEventHandler((event) => {
  const user = requireAuth(event);
  return { user: { id: user.userId, email: user.email } };
});
