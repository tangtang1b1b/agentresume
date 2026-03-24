<template>
  <NuxtLayout>
    <div class="mx-auto max-w-7xl px-4 py-8">
      <!-- Header -->
      <header class="mb-8 flex gap-3 sm:gap-2 flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">履歷生成器</h1>
          <p class="mt-1 text-sm text-gray-500">填寫資料，即時預覽您的專業履歷</p>
        </div>
        <div class="flex items-center gap-3 print:hidden">
          <button
            v-if="user"
            :disabled="saving"
            class="rounded-lg border border-primary-500 px-4 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 disabled:opacity-50"
            @click="saveResume"
          >
            {{ saving ? '儲存中...' : (saveSuccess ? '✓ 已儲存' : '儲存履歷') }}
          </button>
          <button
            class="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            @click="printResume"
          >
            列印 / 匯出 PDF
          </button>
        </div>
      </header>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Editor Panel -->
        <div class="space-y-8 print:hidden">
          <div class="rounded-xl bg-white p-6 shadow">
            <ResumePersonalSection
              :data="resume.personal"
              @update="updatePersonal"
            />
          </div>
          <div class="rounded-xl bg-white p-6 shadow">
            <ResumeExperienceSection
              :data="resume.experience"
              @add="addExperience"
              @remove="removeExperience"
              @update-item="(i, p) => Object.assign(resume.experience[i], p)"
            />
          </div>
          <div class="rounded-xl bg-white p-6 shadow">
            <ResumeEducationSection
              :data="resume.education"
              @add="addEducation"
              @remove="removeEducation"
              @update-item="(i, p) => Object.assign(resume.education[i], p)"
            />
          </div>
          <div class="rounded-xl bg-white p-6 shadow">
            <ResumeSkillsSection
              :data="resume.skills"
              @add="addSkill"
              @remove="removeSkill"
            />
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="lg:sticky lg:top-8 lg:self-start">
          <p class="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400 print:hidden">
            即時預覽
          </p>
          <ResumePreview :resume="resume" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: '履歷生成器 | AgentResume',
  meta: [{ name: 'description', content: '使用 Nuxt3 + Tailwind CSS 打造的免費履歷生成器' }],
})

const {
  resume,
  updatePersonal,
  addExperience,
  removeExperience,
  addEducation,
  removeEducation,
  addSkill,
  removeSkill,
} = useResume()

const { user, fetchMe } = useAuth()
const saving = ref(false)
const saveSuccess = ref(false)

await fetchMe()

if (user.value) {
  try {
    const data = await $fetch('/api/resume')
    if (data.resume) {
      resume.value = data.resume
    }
  } catch {}
}

async function saveResume() {
  saving.value = true
  saveSuccess.value = false
  try {
    await $fetch('/api/resume', { method: 'PUT', body: { resume: resume.value } })
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 3000)
  } catch (e) {
    alert('儲存失敗：' + (e?.data?.statusMessage || '請稍後再試'))
  } finally {
    saving.value = false
  }
}

function printResume() {
  window.print()
}
</script>
