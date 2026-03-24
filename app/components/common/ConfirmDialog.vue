<template>
  <Teleport to="body">
    <!-- Modal Overlay -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        @click="$emit('cancel')"
      />
    </Transition>

    <!-- Modal Content -->
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2"
      >
        <div class="rounded-xl bg-white p-6 shadow-xl">
          <h3 class="text-lg font-semibold text-slate-900">
            {{ title }}
          </h3>
          <p class="mt-2 text-sm text-slate-600">
            {{ message }}
          </p>

          <div class="mt-6 flex justify-end gap-3">
            <button
              class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100"
              @click="$emit('cancel')"
            >
              {{ cancelText }}
            </button>
            <button
              class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700 active:bg-rose-800"
              @click="$emit('confirm')"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '確認操作',
  },
  message: {
    type: String,
    default: '是否確定要進行此操作？',
  },
  confirmText: {
    type: String,
    default: '確認刪除',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
})

defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}

.modal-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}
</style>
