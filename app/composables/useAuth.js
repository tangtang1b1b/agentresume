export function useAuth() {
  const user = useState('auth_user', () => null);

  async function fetchMe() {
    try {
      const data = await $fetch('/api/auth/me');
      user.value = data.user;
    } catch {
      user.value = null;
    }
  }

  async function login(email, password) {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    user.value = data.user;
    return data.user;
  }

  async function register(email, password) {
    const data = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email, password },
    });
    user.value = data.user;
    return data.user;
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' });
    user.value = null;
    await navigateTo('/login');
  }

  return { user, fetchMe, login, register, logout };
}
