<template>
  <div class="min-h-screen bg-slate-50">
    <nav class="border-b border-slate-200 bg-white shadow-sm print:hidden transition-smooth">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <NuxtLink to="/" class="text-lg font-bold text-emerald-600 transition-smooth hover:text-emerald-700">AgentResume</NuxtLink>
        <div v-if="user" class="flex items-center gap-3">
          <span class="text-sm text-slate-500">{{ user.email }}</span>
          <button
            class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-smooth hover:bg-slate-50 active:scale-95 focus:outline-none focus:ring-1 focus:ring-slate-300"
            @click="logout"
          >
            登出
          </button>
        </div>
        <NuxtLink
          v-else
          to="/login"
          class="rounded-lg bg-slate-700 px-4 py-1.5 text-sm font-medium text-white transition-smooth hover:bg-slate-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          登入 / 註冊
        </NuxtLink>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup>
const { user, logout } = useAuth()
</script>
