<template>
  <section>
    <h2 class="mb-4 border-b-2 border-emerald-600 pb-1 text-xl font-semibold text-emerald-700">
      個人資料
    </h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">姓名 *</label>
        <input
          :value="data.name"
          type="text"
          placeholder="王小明"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          @input="emit('update', { name: $event.target.value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">職稱 *</label>
        <input
          :value="data.title"
          type="text"
          placeholder="全端工程師"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          @input="emit('update', { title: $event.target.value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">電子信箱 *</label>
        <input
          :value="data.email"
          type="email"
          placeholder="example@email.com"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          @input="emit('update', { email: $event.target.value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">電話</label>
        <input
          :value="data.phone"
          type="tel"
          placeholder="+886 912 345 678"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          @input="emit('update', { phone: $event.target.value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">所在地</label>
        <input
          :value="data.location"
          type="text"
          placeholder="台灣，台北市"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          @input="emit('update', { location: $event.target.value })"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">個人網站</label>
        <input
          :value="data.website"
          type="url"
          placeholder="https://github.com/yourname"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          @input="emit('update', { website: $event.target.value })"
        />
      </div>
      <div class="md:col-span-2">
        <label class="mb-1 block text-sm font-medium text-slate-700">自我介紹</label>
        <textarea
          :value="data.summary"
          rows="3"
          placeholder="簡短描述您的專業背景與能力..."
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-smooth focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          @input="emit('update', { summary: $event.target.value })"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps(['data'])
const emit = defineEmits(['update'])
</script>
