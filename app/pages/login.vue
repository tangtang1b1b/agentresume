<template>
  <NuxtLayout>
    <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg transition-smooth animate-fadeInUp">
        <h1 class="mb-6 text-center text-2xl font-bold text-slate-900">
          {{ isLogin ? '登入' : '註冊帳號' }}
        </h1>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">電子郵件</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">密碼</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="至少 6 個字元"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          <p v-if="error" class="text-sm text-rose-600 animate-fadeInUp">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-lg bg-slate-700 py-2.5 text-sm font-semibold text-white transition-smooth hover:bg-slate-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50"
          >
            {{ loading ? '處理中...' : (isLogin ? '登入' : '註冊') }}
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-slate-500">
          {{ isLogin ? '還沒有帳號？' : '已有帳號？' }}
          <button
            class="font-medium text-emerald-600 transition-smooth hover:text-emerald-700 hover:underline"
            @click="isLogin = !isLogin"
          >
            {{ isLogin ? '立即註冊' : '前往登入' }}
          </button>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({ title: '登入 | AgentResume' })

const { user, login, register } = useAuth()

if (user.value) {
  await navigateTo('/')
}

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    if (isLogin.value) {
      await login(email.value, password.value)
    } else {
      await register(email.value, password.value)
    }
    await navigateTo('/')
  } catch (e) {
    error.value = e?.data?.statusMessage || '操作失敗，請稍後再試'
  } finally {
    loading.value = false
  }
}
</script>
