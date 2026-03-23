<template>
  <section>
    <div class="mb-4 flex items-center justify-between">
      <h2 class="border-b-2 border-primary-600 pb-1 text-xl font-semibold text-primary-700">
        工作經歷
      </h2>
      <button
        class="rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        @click="emit('add')"
      >
        + 新增
      </button>
    </div>
    <div class="space-y-6">
      <div
        v-for="(exp, index) in data"
        :key="index"
        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div class="mb-3 flex items-center justify-between">
          <span class="text-sm font-medium text-gray-500">經歷 {{ index + 1 }}</span>
          <button
            class="text-sm text-red-500 hover:text-red-700"
            @click="emit('remove', index)"
          >
            刪除
          </button>
        </div>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">公司名稱</label>
            <input
              :value="exp.company"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { company: ($event.target as HTMLInputElement).value })"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">職位</label>
            <input
              :value="exp.position"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { position: ($event.target as HTMLInputElement).value })"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">開始日期</label>
            <input
              :value="exp.startDate"
              type="text"
              placeholder="2020-01"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { startDate: ($event.target as HTMLInputElement).value })"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">結束日期</label>
            <input
              :value="exp.endDate"
              type="text"
              placeholder="2022-12 或「至今」"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { endDate: ($event.target as HTMLInputElement).value })"
            />
          </div>
          <div class="md:col-span-2">
            <label class="mb-1 block text-sm font-medium text-gray-700">工作描述</label>
            <textarea
              :value="exp.description"
              rows="3"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { description: ($event.target as HTMLTextAreaElement).value })"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ResumeData } from '~/composables/useResume'

defineProps<{
  data: ResumeData['experience']
}>()

const emit = defineEmits<{
  add: []
  remove: [index: number]
  updateItem: [index: number, payload: Partial<ResumeData['experience'][0]>]
}>()
</script>
