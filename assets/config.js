/* Edit this file to make Forma yours. All defaults are fictional placeholders.
 * Use plain text for copy. Both languages are optional: a missing translation
 * falls back to English. No HTML is accepted in configurable text.
 * Leave email, résumé and social links empty until you choose to publish them.
 */
window.FORMA_CONFIG = {
  defaultLanguage: 'en',
  defaultTheme: 'light', // 'light', 'dark' or 'system'
  showTemplateHints: true, // Set false after replacing the fictional demo content.
  siteTitle: { en: 'Forma — Portfolio template', zh: 'Forma — 个人主页模板' },
  siteDescription: {
    en: 'A thoughtfully designed portfolio template. All people, projects and experience are placeholders.',
    zh: '一个用心设计的个人主页模板。人物、项目及经历均为占位示例。',
  },
  profile: {
    name: { en: 'Your name', zh: '你的名字' },
    role: { en: 'Designer & developer', zh: '设计师 / 开发者' },
    status: { en: 'OPEN TO POSSIBILITIES', zh: '保持好奇，探索可能' },
    headline: [
      { en: 'A little curiosity.', zh: '从一点好奇，' },
      { en: 'A lot of possibility.', zh: '到无限可能。' },
    ],
    description: {
      en: 'I turn thoughtful ideas into useful digital experiences. This is a space for your work, your perspective, and what comes next.',
      zh: '让想法成为有用、好用的数字体验。在这里，展示你的作品，分享你的视角，写下新的可能。',
    },
    aboutLead: {
      en: 'I like making things that feel as good as they work.',
      zh: '我喜欢创造既好用，也让人感到愉悦的事物。',
    },
    aboutDescription: {
      en: 'Use this space to tell your story: what you care about, how you approach your craft, and the kinds of problems you enjoy solving. Keep it honest. Keep it yours.',
      zh: '在这里写下你的故事：你关注什么，如何对待自己的工作，又喜欢解决怎样的问题。真实、简洁，表达你自己。',
    },
    skills: ['Design systems', 'Creative coding', 'Prototyping', 'Web development', 'Interaction design'],
    email: '',
    resumeUrl: '', // A relative path such as './assets/resume.pdf', or an HTTPS URL.
    socials: [], // Example: { label: 'GitHub', url: 'https://github.com/YOUR_USERNAME' }
  },
  projects: [
    {
      id: 'atlas', category: 'design', art: 'atlas', year: '20XX',
      title: { en: 'Atlas — A quieter workspace', zh: 'Atlas — 更从容的工作空间' },
      description: { en: 'A little clarity for the everyday.', zh: '给日常工作，多一点清晰。' },
      tags: ['Product design', 'Design system'],
      summary: { en: 'A fictional workspace concept that puts focus before features.', zh: '一个虚构的工作空间概念，让专注先于功能。' },
      sections: [
        { title: { en: 'The idea', zh: '设计起点' }, body: { en: 'A calm place to organize projects, see what matters, and move one thing forward. Replace this demo with the problem your project actually solved.', zh: '用一个安静的空间整理项目、看清重点、推进工作。请将此示例替换为你的项目实际解决的问题。' } },
        { title: { en: 'Your contribution', zh: '你的贡献' }, body: { en: 'Describe your role, your decisions, and the constraints you worked with. Add outcomes only when you can support them.', zh: '介绍你的角色、关键决策及面对的约束。成果描述应有事实依据。' } },
      ],
      url: '',
    },
    {
      id: 'common-ground', category: 'development', art: 'ground', year: '20XX',
      title: { en: 'Common Ground — A digital journal', zh: 'Common Ground — 数字手记' },
      description: { en: 'An open space for ideas to grow.', zh: '让想法自由生长。' },
      tags: ['Web development', 'Editorial'],
      summary: { en: 'A fictional reading experience with room to breathe.', zh: '一个虚构的阅读体验，给文字留下呼吸的空间。' },
      sections: [
        { title: { en: 'The idea', zh: '设计起点' }, body: { en: 'Typography, comfortable spacing, and a simple structure make the content the main event. This project is a demo, not a client engagement.', zh: '通过排版、间距与简洁结构，让内容成为主角。这是演示项目，并非真实客户案例。' } },
        { title: { en: 'How it works', zh: '实现方式' }, body: { en: 'Tell readers what you built and why you chose that approach. Link to your repository or live demo when ready.', zh: '告诉读者你实现了什么，以及为什么选择这种方式。准备好后，可以添加源码或在线演示链接。' } },
      ],
      url: '',
    },
    {
      id: 'small-hours', category: 'experiment', art: 'hours', year: '20XX',
      title: { en: 'Small Hours — An experiment in time', zh: 'Small Hours — 关于时间的实验' },
      description: { en: 'Finding a different kind of rhythm.', zh: '发现另一种节奏。' },
      tags: ['Creative coding', 'Experiment'],
      summary: { en: 'A fictional creative coding study of form, motion, and rhythm.', zh: '一个探索形态、运动与节奏的虚构创意编程实验。' },
      sections: [
        { title: { en: 'The question', zh: '探索问题' }, body: { en: 'What if an interface could help us feel time instead of just measuring it? Use this slot for a side project, an open-source contribution, or a playful exploration.', zh: '界面能否让我们感受时间，而不只是计量时间？这里适合展示业余项目、开源贡献或有趣的探索。' } },
        { title: { en: 'What you learned', zh: '你的收获' }, body: { en: 'Share one useful observation. An honest reflection is more interesting than a list of buzzwords.', zh: '分享一个有用的发现。真实的思考比术语堆砌更有价值。' } },
      ],
      url: '',
    },
  ],
  experience: [
    { period: '20XX — NOW', role: { en: 'Your current role', zh: '你目前的角色' }, organization: { en: 'Organization placeholder', zh: '组织名称占位' } },
    { period: '20XX — 20XX', role: { en: 'A previous chapter', zh: '上一段经历' }, organization: { en: 'Organization placeholder', zh: '组织名称占位' } },
  ],
  notes: [
    {
      id: 'less', category: { en: 'DESIGN', zh: '设计' }, readingTime: { en: '2 MIN READ', zh: '阅读约 2 分钟' },
      title: { en: 'The quiet power of doing less', zh: '少一点，也能更有力量' },
      summary: { en: 'A sample note on giving the important things room.', zh: '关于为重要的事物留出空间的一篇示例手记。' },
      paragraphs: {
        en: ['This is a sample article. Replace it with your own writing, or remove this section entirely.', 'Before adding another element, ask what it helps someone do. A clear hierarchy and one thoughtful detail can say more than a crowded screen.', 'A useful starting point: remove one thing, then notice what becomes easier to see.'],
        zh: ['这是一篇示例文章。你可以替换为自己的文字，也可以移除整个手记板块。', '添加一个元素前，先想一想它能帮助读者做什么。清晰的层次和一个用心的细节，有时比拥挤的画面更能表达。', '一个可以尝试的起点：移除一个元素，观察哪些东西变得更容易看见。'],
      }, url: '',
    },
    {
      id: 'finish', category: { en: 'PROCESS', zh: '过程' }, readingTime: { en: '2 MIN READ', zh: '阅读约 2 分钟' },
      title: { en: 'Make something small. Finish it.', zh: '做一件小事，然后完成它' },
      summary: { en: 'A sample note on scope, momentum, and shipping.', zh: '关于范围、动力与交付的一篇示例手记。' },
      paragraphs: { en: ['This is sample content, not a real personal account.', 'Choose one problem and a small, concrete outcome. Make the first version useful enough to share. You can learn more from one working thing than from many unfinished plans.', 'The next version can start with what the first one taught you.'], zh: ['这是示例内容，并非真实的个人经历。', '选一个问题，定义一个小而具体的结果。让第一个版本达到可以分享的程度。一个完成的作品，往往比许多未完成的计划更能带来收获。', '下一版，从这一版教会你的事情开始。'] }, url: '',
    },
    {
      id: 'curious', category: { en: 'EXPLORATION', zh: '探索' }, readingTime: { en: '1 MIN READ', zh: '阅读约 1 分钟' },
      title: { en: 'Leave a little room for curiosity', zh: '给好奇心留一点空间' },
      summary: { en: 'A sample note on noticing what you usually overlook.', zh: '关于观察日常中被忽略的细节的一篇示例手记。' },
      paragraphs: { en: ['This is sample writing for the template.', 'Some useful ideas begin with a small question about an ordinary thing. Keep a place to record those questions. Return to them when you want to explore without a brief.', 'Not every experiment needs an outcome. Sometimes noticing something new is enough.'], zh: ['这是模板中的示例文字。', '有用的想法，有时来自对日常事物的一个小问题。留一个地方记录它们，在想要自由探索的时候再回来看看。', '不是每一次实验都需要成果。有时，发现一个新细节就足够了。'] }, url: '',
    },
  ],
};
