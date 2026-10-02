(() => {
  'use strict';
  const config = window.FORMA_CONFIG;
  if (!config) return;
  const $ = (selector) => document.querySelector(selector);
  const storage = {
    get(key) { try { return localStorage.getItem(`forma-${key}`); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(`forma-${key}`, value); } catch { /* Storage is optional. */ } },
  };
  const savedLanguage = storage.get('language');
  let language = ['en', 'zh'].includes(savedLanguage) ? savedLanguage : (config.defaultLanguage === 'zh' ? 'zh' : 'en');
  let activeFilter = 'all';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let chosenTheme = storage.get('theme');
  if (!['light', 'dark'].includes(chosenTheme)) chosenTheme = ['light', 'dark'].includes(config.defaultTheme) ? config.defaultTheme : null;
  const ui = {
    en: {
      skip: 'Skip to content', work: 'Work', about: 'About', notes: 'Notes', sayHello: 'Say hello', hello: "Hello, I'm",
      exploreWork: 'Explore my work', moreAbout: 'A little about me', madeWithIntention: 'Made with intention',
      principle1: 'Thoughtful by design.', principle2: 'Curious by nature.', principle3: 'Always in progress.',
      selectedWork: "A FEW THINGS I'VE MADE", workTitle: 'Selected work.', workAside: 'Small details. Clear intentions.\nIdeas brought to life.',
      all: 'All work', design: 'Design', development: 'Development', experiment: 'Experiments',
      demo: 'DEMO', demoNote: 'Every project here is fictional. Make this space your own.', behindWork: 'THE PERSON BEHIND THE WORK',
      aboutTitle: 'Less noise.', aboutTitleSecond: 'More meaning.', toolbox: 'MY TOOLBOX', alongWay: 'ALONG THE WAY',
      sampleTimeline: 'Sample timeline', downloadResume: 'View résumé', thinkingOutLoud: 'THINKING OUT LOUD',
      notesTitle: 'Notes & observations.', notesAside: 'A place for unfinished thoughts.', nextChapter: 'READY FOR THE NEXT CHAPTER',
      contactTitle: 'Good things start', contactTitleSecond: 'with a conversation.',
      contactDescription: "Have an idea, a question, or just a hello?\nThere's always room for something good.", letsTalk: "Let's talk",
      builtWith: 'Built with', backTop: 'Back to top', visitProject: 'Visit project', readArticle: 'Read full article',
      contactLabel: 'TEMPLATE PREVIEW', contactModalTitle: 'Make this hello your own.',
      contactModalSummary: 'No real contact information is included in this demo.',
      contactModalBody: 'When you are ready, add a public contact address to the email field in assets/config.js. Until then, this button only opens this preview. No message is sent or collected.',
      projectLabel: 'PROJECT / ', emptyProjects: 'No projects in this category yet.', switchLanguage: 'Switch to Chinese',
      darkTheme: 'Switch to dark theme', lightTheme: 'Switch to light theme', closeDialog: 'Close dialog', openMenu: 'Open menu', closeMenu: 'Close menu', filterLabel: 'Filter projects',
    },
    zh: {
      skip: '跳到正文', work: '作品', about: '关于', notes: '手记', sayHello: '打个招呼', hello: '你好，我是',
      exploreWork: '看看我的作品', moreAbout: '了解更多', madeWithIntention: '每个细节，都有用心',
      principle1: '以用心回应设计。', principle2: '以好奇探索日常。', principle3: '始终保持生长。',
      selectedWork: '把想法做成作品', workTitle: '精选作品。', workAside: '关注细节，明确意图。\n让想法真实发生。',
      all: '全部作品', design: '设计', development: '开发', experiment: '实验',
      demo: '示例', demoNote: '这里的项目均为虚构示例。把这个空间变成你的。', behindWork: '作品背后的思考',
      aboutTitle: '少一点喧嚣，', aboutTitleSecond: '多一点意义。', toolbox: '我的工具箱', alongWay: '一路走来',
      sampleTimeline: '经历占位示例', downloadResume: '查看简历', thinkingOutLoud: '记录，也思考',
      notesTitle: '手记与观察。', notesAside: '给尚未完成的想法，一个地方。', nextChapter: '期待新的篇章',
      contactTitle: '好的事情，', contactTitleSecond: '从一次对话开始。',
      contactDescription: '一个想法，一个问题，或一句你好。\n总有空间，留给新的可能。', letsTalk: '聊一聊',
      builtWith: '使用', backTop: '回到顶部', visitProject: '访问项目', readArticle: '阅读完整文章',
      contactLabel: '模板预览', contactModalTitle: '让这句你好，属于你。',
      contactModalSummary: '演示模板不包含真实的联系方式。',
      contactModalBody: '准备好后，在 assets/config.js 的 email 字段中填入你愿意公开的联系邮箱。在此之前，这个按钮仅展示预览，不会发送或收集任何信息。',
      projectLabel: '项目 / ', emptyProjects: '此分类暂时没有项目。', switchLanguage: 'Switch to English',
      darkTheme: '切换为深色主题', lightTheme: '切换为浅色主题', closeDialog: '关闭弹窗', openMenu: '打开菜单', closeMenu: '关闭菜单', filterLabel: '筛选作品',
    },
  };
  const t = (key) => ui[language][key] ?? ui.en[key] ?? key;
  const localized = (value) => {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[language] ?? value.en ?? value.zh ?? '';
  };
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function setText(selector, value) { $(selector).textContent = localized(value); }
  function safeUrl(value, allowRelative = false) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      if (!['https:', 'http:'].includes(url.protocol)) return null;
      if (url.username || url.password) return null;
      if (!allowRelative && !/^https?:\/\//i.test(value)) return null;
      if (allowRelative && !/^https?:\/\//i.test(value) && !/^\.\.?\//.test(value)) return null;
      return url.href;
    } catch { return null; }
  }
  function externalLink(node, url) {
    node.href = url;
    node.target = '_blank';
    node.rel = 'noopener noreferrer';
  }
  const artTemplates = {
    atlas: '<div class="mini-app"><div class="mini-sidebar"><div class="mini-logo">atlas.</div><span>Overview</span><span class="mini-active">Projects</span><span>Calendar</span><span>Notes</span></div><div class="mini-body"><div class="mini-top"><span>WORKSPACE / PROJECTS</span><span>•••</span></div><div class="mini-title">A little more focus.</div><div class="mini-subtitle">Space for what matters today.</div><div class="mini-tabs"><span>All projects</span><span>In progress</span><span>Completed</span></div><div class="mini-board"><div class="mini-column"><span>TO EXPLORE</span><div class="mini-card"><i></i><i></i></div><div class="mini-card"><i></i><i></i></div></div><div class="mini-column"><span>IN PROGRESS</span><div class="mini-card"><i></i><i></i></div><div class="mini-card"><i></i><i></i></div></div><div class="mini-column"><span>DONE</span><div class="mini-card"><i></i><i></i></div></div></div></div></div><div class="mini-sticker">Less, but better.</div>',
    ground: '<div class="journal"><div class="journal-nav"><span>COMMON GROUND</span><span>A DIGITAL JOURNAL</span></div><div class="journal-title">Room<br>to grow.</div><div class="journal-caption">NOTES ON A CONSIDERED LIFE</div><div class="journal-landscape"><span class="sun"></span><span class="hill"></span><span class="hill second"></span></div><div class="journal-lines"><i></i><i></i><i></i><i></i></div></div>',
    hours: '<div class="hours-top"><span>A STUDY IN TIME</span><span>SMALL HOURS</span></div><div class="clock-art"><span class="clock-ring"></span><span class="clock-ring"></span><span class="clock-ring"></span><span class="clock-ring"></span><span class="clock-ring"></span><span class="clock-hand"></span><span class="clock-hand second"></span><span class="clock-center"></span><span class="clock-dot"></span></div><div class="hours-bottom">Find your own rhythm.</div>',
    generic: '<svg viewBox="0 0 120 120"><path d="M60 5v110M5 60h110M21 21l78 78M21 99l78-78" stroke="currentColor" stroke-width="16"></path></svg>',
  };
  function renderProjects() {
    const grid = $('#project-grid');
    grid.replaceChildren();
    const projects = (config.projects || []).filter((p) => activeFilter === 'all' || p.category === activeFilter);
    for (const project of projects) {
      const article = element('article', 'project');
      const button = element('button', 'project-button');
      button.type = 'button';
      const art = Object.hasOwn(artTemplates, project.art) ? project.art : 'generic';
      const visual = element('div', `project-art art-${art === 'ground' ? 'ground' : art === 'hours' ? 'hours' : art === 'atlas' ? 'atlas' : 'generic'}`);
      visual.setAttribute('aria-hidden', 'true');
      // Only trusted, fixed illustration markup enters innerHTML; config never does.
      visual.innerHTML = artTemplates[art];
      const meta = element('div', 'project-meta');
      const arrow = element('span', 'project-arrow', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      meta.append(element('h3', '', localized(project.title)), arrow);
      button.append(visual, meta, element('p', 'project-description', localized(project.description)));
      button.addEventListener('click', () => openProject(project));
      const tags = element('div', 'project-tags');
      for (const tag of project.tags || []) tags.append(element('span', 'project-tag', localized(tag)));
      article.append(button, tags);
      grid.append(article);
    }
    if (!projects.length) grid.append(element('p', 'muted', t('emptyProjects')));
    document.querySelectorAll('.filter').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter)));
  }
  function renderFilters() {
    const group = $('#project-filters');
    group.replaceChildren();
    group.setAttribute('aria-label', t('filterLabel'));
    const categories = ['all', ...new Set((config.projects || []).map((p) => p.category).filter(Boolean))];
    for (const category of categories) {
      const button = element('button', 'filter', t(category));
      button.type = 'button';
      button.dataset.filter = category;
      button.addEventListener('click', () => { activeFilter = category; renderProjects(); });
      group.append(button);
    }
  }
  const dialog = $('#detail-dialog');
  function openDialog({ label, title, summary, paragraphs = [], sections = [], url = '', linkLabel = 'visitProject' }) {
    setText('#dialog-label', label);
    setText('#dialog-title', title);
    setText('#dialog-summary', summary);
    const body = $('#dialog-body');
    body.replaceChildren();
    for (const paragraph of paragraphs) body.append(element('p', '', localized(paragraph)));
    for (const section of sections) body.append(element('h3', '', localized(section.title)), element('p', '', localized(section.body)));
    const link = $('#dialog-link');
    const validUrl = safeUrl(url);
    link.hidden = !validUrl;
    link.removeAttribute('href');
    link.firstElementChild.textContent = t(linkLabel);
    if (validUrl) externalLink(link, validUrl);
    dialog.showModal();
    dialog.scrollTop = 0;
  }
  function openProject(project) { openDialog({ label: t('projectLabel') + (project.year || ''), title: project.title, summary: project.summary, sections: project.sections || [], url: project.url }); }
  function renderNotes() {
    const list = $('#notes-list');
    list.replaceChildren();
    for (const note of config.notes || []) {
      const button = element('button', 'note');
      button.type = 'button';
      const row = element('div', 'note-row');
      const end = element('span', 'note-end');
      const arrow = element('span', 'note-arrow', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      end.append(element('span', 'reading-time', localized(note.readingTime)), arrow);
      row.append(element('span', 'note-category', localized(note.category)), element('h3', '', localized(note.title)), end);
      button.append(row);
      button.addEventListener('click', () => openDialog({ label: localized(note.category), title: note.title, summary: note.summary, paragraphs: localized(note.paragraphs) || [], url: note.url, linkLabel: 'readArticle' }));
      list.append(button);
    }
    $('#notes').hidden = !(config.notes || []).length;
    document.querySelectorAll('a[href="#notes"]').forEach((link) => { link.hidden = $('#notes').hidden; });
  }
  function updateTheme() {
    const theme = chosenTheme || (systemTheme.matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    $('#theme-toggle').setAttribute('aria-label', t(theme === 'light' ? 'darkTheme' : 'lightTheme'));
    document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f5f5ef' : '#17251f';
  }
  function updateMenu(open) {
    $('#mobile-nav').hidden = !open;
    $('#menu-toggle').setAttribute('aria-expanded', String(open));
    $('#menu-toggle').setAttribute('aria-label', t(open ? 'closeMenu' : 'openMenu'));
  }
  function render() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = localized(config.siteTitle);
    document.querySelector('meta[name="description"]').content = localized(config.siteDescription);
    document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
    for (const id of ['work-title', 'notes-title']) {
      const heading = $(`#${id}`);
      const text = heading.textContent;
      heading.textContent = text.slice(0, -1);
      heading.append(element('span', 'heading-dot', text.slice(-1)));
    }
    $('#language-toggle').textContent = language === 'en' ? '中文' : 'EN';
    $('#language-toggle').setAttribute('aria-label', t('switchLanguage'));
    $('#dialog-close').setAttribute('aria-label', t('closeDialog'));
    const profile = config.profile;
    setText('#profile-name', profile.name);
    setText('#footer-name', profile.name);
    setText('#profile-role', profile.role);
    setText('#profile-status', profile.status);
    setText('#headline-first', profile.headline[0]);
    setText('#headline-second', profile.headline[1]);
    setText('#profile-description', profile.description);
    setText('#about-lead', profile.aboutLead);
    setText('#about-description', profile.aboutDescription);
    const skills = $('#skill-list');
    skills.replaceChildren();
    for (const skill of profile.skills || []) skills.append(element('span', 'skill', localized(skill)));
    const timeline = $('#experience-list');
    timeline.replaceChildren();
    for (const entry of config.experience || []) {
      const row = element('div', 'experience');
      const detail = element('div');
      detail.append(element('p', 'experience-role', localized(entry.role)), element('p', 'experience-org', localized(entry.organization)));
      row.append(element('span', 'experience-period', localized(entry.period)), detail);
      timeline.append(row);
    }
    $('.experience-heading').hidden = !(config.experience || []).length;
    $('.demo-note').hidden = config.showTemplateHints === false;
    $('.experience-heading .tiny').hidden = config.showTemplateHints === false;
    const resume = $('#resume-link');
    const resumeUrl = safeUrl(profile.resumeUrl, true);
    resume.hidden = !resumeUrl;
    if (resumeUrl) externalLink(resume, resumeUrl);
    const socials = $('#social-links');
    socials.replaceChildren();
    for (const social of profile.socials || []) {
      const url = safeUrl(social.url);
      if (!url) continue;
      const link = element('a', '', localized(social.label));
      externalLink(link, url);
      socials.append(link);
    }
    socials.hidden = !socials.children.length;
    renderFilters(); renderProjects(); renderNotes(); updateTheme(); updateMenu(false);
    $('#year').textContent = new Date().getFullYear();
  }
  $('#theme-toggle').addEventListener('click', () => {
    chosenTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    storage.set('theme', chosenTheme); updateTheme();
  });
  systemTheme.addEventListener('change', () => { if (!chosenTheme) updateTheme(); });
  $('#language-toggle').addEventListener('click', () => {
    if (dialog.open) dialog.close();
    language = language === 'en' ? 'zh' : 'en';
    storage.set('language', language); render();
  });
  $('#menu-toggle').addEventListener('click', () => updateMenu($('#menu-toggle').getAttribute('aria-expanded') !== 'true'));
  $('#mobile-nav').addEventListener('click', (event) => { if (event.target.closest('a')) updateMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('#mobile-nav').hidden) { updateMenu(false); $('#menu-toggle').focus(); }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) updateMenu(false); });
  $('#dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  $('#contact-button').addEventListener('click', () => {
    const email = config.profile.email;
    if (typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      window.location.href = `mailto:${encodeURIComponent(email)}`;
    } else {
      openDialog({ label: t('contactLabel'), title: t('contactModalTitle'), summary: t('contactModalSummary'), paragraphs: [t('contactModalBody')] });
    }
  });
  render();
})();
