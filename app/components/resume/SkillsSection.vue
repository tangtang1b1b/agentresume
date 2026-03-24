<template>
  <section>
    <h2 class="mb-4 border-b-2 border-emerald-600 pb-1 text-xl font-semibold text-emerald-700">
      技能
    </h2>
    <div class="mb-3 flex flex-wrap gap-2">
      <Transition
        v-for="(skill, index) in data"
        :key="index"
        name="tag"
      >
        <span
          class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-200 shadow-sm transition-smooth hover:shadow-md"
        >
          {{ skill }}
          <button
            class="ml-1 text-emerald-500 transition-smooth hover:text-rose-600 hover:scale-110 focus:outline-none"
            aria-label="移除技能"
            @click="openConfirm(index)"
          >
            ×
          </button>
        </span>
      </Transition>
    </div>
    <div class="flex gap-2">
      <input
        v-model="newSkill"
        type="text"
        placeholder="輸入技能後按 Enter 或點擊新增"
        class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        @keydown.enter.prevent="addSkill"
      />
      <button
        class="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-smooth hover:bg-slate-800 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300"
        @click="addSkill"
      >
        新增
      </button>
    </div>

    <!-- Confirm Dialog -->
    <CommonConfirmDialog
      :is-open="showConfirm"
      title="移除技能"
      message="確定要移除此技能嗎？"
      confirm-text="確認移除"
      cancel-text="取消"
      @confirm="confirmDelete"
      @cancel="closeConfirm"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['data'])

const emit = defineEmits(['add', 'remove'])

const newSkill = ref('')
const showConfirm = ref(false)
const pendingDeleteIndex = ref(null)

function addSkill() {
  if (newSkill.value.trim()) {
    emit('add', newSkill.value.trim())
    newSkill.value = ''
  }
}

function openConfirm(index) {
  pendingDeleteIndex.value = index
  showConfirm.value = true
}

function closeConfirm() {
  showConfirm.value = false
  pendingDeleteIndex.value = null
}

function confirmDelete() {
  if (pendingDeleteIndex.value !== null) {
    emit('remove', pendingDeleteIndex.value)
  }
  closeConfirm()
}
</script>

<style scoped>
.tag-enter-active,
.tag-leave-active {
  transition: all 0.3s ease;
}

.tag-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.tag-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
