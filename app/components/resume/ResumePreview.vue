<template>
  <div class="rounded-xl bg-white p-8 shadow-lg print:shadow-none">
    <!-- Header -->
    <div class="mb-6 border-b border-gray-200 pb-6">
      <h1 class="text-3xl font-bold text-gray-900">{{ resume.personal.name }}</h1>
      <p class="mt-1 text-lg font-medium text-primary-600">{{ resume.personal.title }}</p>
      <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
        <span v-if="resume.personal.email">📧 {{ resume.personal.email }}</span>
        <span v-if="resume.personal.phone">📞 {{ resume.personal.phone }}</span>
        <span v-if="resume.personal.location">📍 {{ resume.personal.location }}</span>
        <a
          v-if="resume.personal.website"
          :href="resume.personal.website"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:underline"
        >
          🔗 {{ resume.personal.website }}
        </a>
      </div>
    </div>

    <!-- Summary -->
    <div v-if="resume.personal.summary" class="mb-6">
      <h2 class="mb-2 text-lg font-semibold text-gray-800">關於我</h2>
      <p class="text-sm leading-relaxed text-gray-700">{{ resume.personal.summary }}</p>
    </div>

    <!-- Experience -->
    <div v-if="resume.experience.length" class="mb-6">
      <h2 class="mb-3 border-b border-gray-200 pb-1 text-lg font-semibold text-gray-800">
        工作經歷
      </h2>
      <div class="space-y-4">
        <div v-for="(exp, i) in resume.experience" :key="i">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-semibold text-gray-900">{{ exp.position }}</p>
              <p class="text-sm text-primary-600">{{ exp.company }}</p>
            </div>
            <span class="shrink-0 text-xs text-gray-500">
              {{ exp.startDate }} – {{ exp.endDate }}
            </span>
          </div>
          <p class="mt-1 text-sm leading-relaxed text-gray-700">{{ exp.description }}</p>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div v-if="resume.education.length" class="mb-6">
      <h2 class="mb-3 border-b border-gray-200 pb-1 text-lg font-semibold text-gray-800">學歷</h2>
      <div class="space-y-3">
        <div v-for="(edu, i) in resume.education" :key="i">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-semibold text-gray-900">{{ edu.school }}</p>
              <p class="text-sm text-gray-600">{{ edu.degree }} · {{ edu.field }}</p>
            </div>
            <span class="shrink-0 text-xs text-gray-500">
              {{ edu.startDate }} – {{ edu.endDate }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div v-if="resume.skills.length">
      <h2 class="mb-3 border-b border-gray-200 pb-1 text-lg font-semibold text-gray-800">技能</h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(skill, i) in resume.skills"
          :key="i"
          class="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['resume'])
</script>
