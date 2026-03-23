<template>
  <section>
    <div class="mb-4 flex items-center justify-between">
      <h2 class="border-b-2 border-primary-600 pb-1 text-xl font-semibold text-primary-700">
        學歷
      </h2>
      <button
        class="rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        @click="emit('add')"
      >
        + 新增
      </button>
    </div>
    <div class="space-y-4">
      <div
        v-for="(edu, index) in data"
        :key="index"
        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div class="mb-3 flex items-center justify-between">
          <span class="text-sm font-medium text-gray-500">學歷 {{ index + 1 }}</span>
          <button class="text-sm text-red-500 hover:text-red-700" @click="emit('remove', index)">
            刪除
          </button>
        </div>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">學校名稱</label>
            <input
              :value="edu.school"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { school: $event.target.value })"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">學位</label>
            <input
              :value="edu.degree"
              type="text"
              placeholder="學士 / 碩士 / 博士"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { degree: $event.target.value })"
            />
          </div>
          <div class="md:col-span-2">
            <label class="mb-1 block text-sm font-medium text-gray-700">科系</label>
            <input
              :value="edu.field"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { field: $event.target.value })"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">開始年份</label>
            <input
              :value="edu.startDate"
              type="text"
              placeholder="2015-09"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { startDate: $event.target.value })"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">結束年份</label>
            <input
              :value="edu.endDate"
              type="text"
              placeholder="2019-06"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              @input="emit('updateItem', index, { endDate: $event.target.value })"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps(['data'])
const emit = defineEmits(['add', 'remove', 'updateItem'])
</script>
