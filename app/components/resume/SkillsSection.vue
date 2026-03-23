<template>
  <section>
    <h2 class="mb-4 border-b-2 border-primary-600 pb-1 text-xl font-semibold text-primary-700">
      技能
    </h2>
    <div class="mb-3 flex flex-wrap gap-2">
      <span
        v-for="(skill, index) in data"
        :key="index"
        class="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700"
      >
        {{ skill }}
        <button
          class="ml-1 text-primary-400 hover:text-primary-700"
          aria-label="移除技能"
          @click="emit('remove', index)"
        >
          ×
        </button>
      </span>
    </div>
    <div class="flex gap-2">
      <input
        v-model="newSkill"
        type="text"
        placeholder="輸入技能後按 Enter 或點擊新增"
        class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        @keydown.enter.prevent="addSkill"
      />
      <button
        class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        @click="addSkill"
      >
        新增
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  data: string[]
}>()

const emit = defineEmits<{
  add: [skill: string]
  remove: [index: number]
}>()

const newSkill = ref('')

function addSkill() {
  if (newSkill.value.trim()) {
    emit('add', newSkill.value.trim())
    newSkill.value = ''
  }
}
</script>
