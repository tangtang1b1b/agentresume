const defaultResume = {
  personal: {
    name: '王小明',
    title: '全端工程師',
    email: 'xiaoming@example.com',
    phone: '+886 912 345 678',
    location: '台灣，台北市',
    website: 'https://github.com/xiaoming',
    summary: '具備 5 年全端開發經驗，擅長 Vue.js、Node.js 與雲端架構，熱衷於建立高效能且易於維護的系統。',
  },
  experience: [
    {
      company: 'ABC 科技股份有限公司',
      position: '資深前端工程師',
      startDate: '2022-03',
      endDate: '至今',
      description: '主導前端架構重構，採用 Nuxt3 + TypeScript，提升效能 40%。帶領 3 人團隊完成多個核心功能模組開發。',
    },
    {
      company: 'XYZ 新創公司',
      position: '全端工程師',
      startDate: '2019-06',
      endDate: '2022-02',
      description: '負責後台管理系統開發（Vue2 + Node.js），建立 RESTful API，並整合第三方金流服務。',
    },
  ],
  education: [
    {
      school: '國立台灣大學',
      degree: '學士學位',
      field: '資訊工程學系',
      startDate: '2015-09',
      endDate: '2019-06',
    },
  ],
  skills: ['Vue.js / Nuxt', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'AWS'],
};

export function useResume() {
  const resume = useState('resume', () => ({
    ...defaultResume,
    personal: { ...defaultResume.personal },
  }));

  function updatePersonal(data) {
    resume.value.personal = { ...resume.value.personal, ...data };
  }

  function addExperience() {
    resume.value.experience.push({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  }

  function removeExperience(index) {
    resume.value.experience.splice(index, 1);
  }

  function addEducation() {
    resume.value.education.push({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    });
  }

  function removeEducation(index) {
    resume.value.education.splice(index, 1);
  }

  function addSkill(skill) {
    if (skill.trim() && !resume.value.skills.includes(skill.trim())) {
      resume.value.skills.push(skill.trim());
    }
  }

  function removeSkill(index) {
    resume.value.skills.splice(index, 1);
  }

  return {
    resume,
    updatePersonal,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
    addSkill,
    removeSkill,
  };
}
