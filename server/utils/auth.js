import jwt from 'jsonwebtoken';

export function signToken(payload) {
  const config = useRuntimeConfig();
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
}

export function verifyToken(token) {
  const config = useRuntimeConfig();
  return jwt.verify(token, config.jwtSecret);
}

export function getTokenFromEvent(event) {
  const cookies = parseCookies(event);
  return cookies.auth_token || null;
}

export function requireAuth(event) {
  const token = getTokenFromEvent(event);
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  try {
    return verifyToken(token);
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
  }
}
