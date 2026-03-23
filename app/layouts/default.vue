<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="border-b border-gray-200 bg-white shadow-sm print:hidden">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <NuxtLink to="/" class="text-lg font-bold text-primary-600">AgentResume</NuxtLink>
        <div v-if="user" class="flex items-center gap-3">
          <span class="text-sm text-gray-500">{{ user.email }}</span>
          <button
            class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="logout"
          >
            登出
          </button>
        </div>
        <NuxtLink
          v-else
          to="/login"
          class="rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
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
