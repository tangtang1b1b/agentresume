<template>
  <section>
    <h2 class="mb-4 border-b-2 border-primary-600 pb-1 text-xl font-semibold text-primary-700">
      個人資料
    </h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">姓名 *</label>
        <input
          :value="data.name"
          type="text"
          placeholder="王小明"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          @input="emit('update', { name: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">職稱 *</label>
        <input
          :value="data.title"
          type="text"
          placeholder="全端工程師"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          @input="emit('update', { title: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">電子信箱 *</label>
        <input
          :value="data.email"
          type="email"
          placeholder="example@email.com"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          @input="emit('update', { email: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">電話</label>
        <input
          :value="data.phone"
          type="tel"
          placeholder="+886 912 345 678"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          @input="emit('update', { phone: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">所在地</label>
        <input
          :value="data.location"
          type="text"
          placeholder="台灣，台北市"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          @input="emit('update', { location: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">個人網站</label>
        <input
          :value="data.website"
          type="url"
          placeholder="https://github.com/yourname"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          @input="emit('update', { website: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div class="md:col-span-2">
        <label class="mb-1 block text-sm font-medium text-gray-700">自我介紹</label>
        <textarea
          :value="data.summary"
          rows="3"
          placeholder="簡短描述您的專業背景與能力..."
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          @input="emit('update', { summary: ($event.target as HTMLTextAreaElement).value })"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ResumeData } from '~/composables/useResume'

defineProps<{
  data: ResumeData['personal']
}>()

const emit = defineEmits<{
  update: [payload: Partial<ResumeData['personal']>]
}>()
</script>
