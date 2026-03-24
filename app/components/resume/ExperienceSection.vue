<template>
  <section>
    <div class="mb-4 flex items-center justify-between">
      <h2 class="border-b-2 border-emerald-600 pb-1 text-xl font-semibold text-emerald-700">
        工作經歷
      </h2>
      <button
        class="rounded-lg bg-slate-700 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-smooth hover:bg-slate-800 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300"
        @click="emit('add')"
      >
        + 新增
      </button>
    </div>
    <div class="space-y-6">
      <Transition
        v-for="(exp, index) in data"
        :key="index"
        name="list"
      >
        <div
          class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-smooth hover:shadow-md"
        >
          <div class="mb-3 flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">經歷 {{ index + 1 }}</span>
            <button
              class="text-sm text-rose-600 transition-smooth hover:text-rose-700 hover:underline active:scale-95 focus:outline-none focus:ring-1 focus:ring-rose-300 rounded px-2 py-1"
              @click="openConfirm(index)"
            >
              刪除
            </button>
          </div>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">公司名稱</label>
              <input
                :value="exp.company"
                type="text"
                class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                @input="emit('updateItem', index, { company: $event.target.value })"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">職位</label>
              <input
                :value="exp.position"
                type="text"
                class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                @input="emit('updateItem', index, { position: $event.target.value })"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">開始日期</label>
              <input
                :value="exp.startDate"
                type="text"
                placeholder="2020-01"
                class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                @input="emit('updateItem', index, { startDate: $event.target.value })"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">結束日期</label>
              <input
                :value="exp.endDate"
                type="text"
                placeholder="2022-12 或「至今」"
                class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                @input="emit('updateItem', index, { endDate: $event.target.value })"
              />
            </div>
            <div class="md:col-span-2">
              <label class="mb-1 block text-sm font-medium text-slate-700">工作描述</label>
              <textarea
                :value="exp.description"
                rows="3"
                class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                @input="emit('updateItem', index, { description: $event.target.value })"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Confirm Dialog -->
    <CommonConfirmDialog
      :is-open="showConfirm"
      title="刪除工作經歷"
      message="確定要刪除此工作經歷嗎？此操作無法復原。"
      confirm-text="確認刪除"
      cancel-text="取消"
      @confirm="confirmDelete"
      @cancel="closeConfirm"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['data'])

const emit = defineEmits(['add', 'remove', 'updateItem'])

const showConfirm = ref(false)
const pendingDeleteIndex = ref(null)

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
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
