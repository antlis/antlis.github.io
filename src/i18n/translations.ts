export const translations = {
  en: {
    nav: {
      about: 'About',
      blog: 'Blog',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    home: {
      title: 'Anton L — Web Developer',
      heading: "Hi, I'm Anton",
      description: 'Web developer passionate about building modern apps. I love exploring new technologies, learning, and sharing knowledge through writing and open source.',
      recentPosts: 'Recent Posts',
      viewAll: 'View all',
    },
    about: {
      title: 'About — Anton L',
      heading: 'About',
      description: 'Learn more about Anton L — a web developer passionate about modern web apps, new technologies, and open source.',
      text: "I'm a developer passionate about building modern web apps. I love exploring new technologies, learning, and sharing knowledge through writing and open source.",
    },
    contact: {
      title: 'Contact — Anton L',
      heading: 'Contact',
      description: 'Get in touch with Anton L via email or social platforms.',
      text: 'Feel free to reach out via email or find me on any of these platforms.',
    },
    blog: {
      title: 'Blog — Anton L',
      heading: 'Blog',
      description: 'Articles about web development, tools, and technologies by Anton L.',
      empty: 'No posts yet.',
    },
    portfolio: {
      title: 'Portfolio — Anton L',
      heading: 'Portfolio',
      description: 'Web development projects and work by Anton L.',
    },
    github: {
      heading: 'GitHub',
      commitsThisYear: 'commits this year',
      error: 'Unable to load GitHub activity.',
    },
    footer: {
      copyright: 'Antlis',
    },
  },
  ru: {
    nav: {
      about: 'Обо мне',
      blog: 'Блог',
      portfolio: 'Портфолио',
      contact: 'Контакты',
    },
    home: {
      title: 'Антон Л — Веб-разработчик',
      heading: 'Привет, я Антон',
      description: 'Веб-разработчик, увлечённый созданием современных приложений. Люблю изучать новые технологии, учиться и делиться знаниями через статьи и open source.',
      recentPosts: 'Последние записи',
      viewAll: 'Все записи',
    },
    about: {
      title: 'Обо мне — Антон Л',
      heading: 'Обо мне',
      description: 'Узнайте больше об Антоне Л — веб-разработчике, увлечённом современными технологиями и open source.',
      text: 'Я разработчик, увлечённый созданием современных веб-приложений. Люблю изучать новые технологии, учиться и делиться знаниями через статьи и open source.',
    },
    contact: {
      title: 'Контакты — Антон Л',
      heading: 'Контакты',
      description: 'Свяжитесь с Антоном Л по email или через социальные платформы.',
      text: 'Свяжитесь со мной по email или найдите меня на любой из этих платформ.',
    },
    blog: {
      title: 'Блог — Антон Л',
      heading: 'Блог',
      description: 'Статьи о веб-разработке, инструментах и технологиях от Антона Л.',
      empty: 'Записей пока нет.',
    },
    portfolio: {
      title: 'Портфолио — Антон Л',
      heading: 'Портфолио',
      description: 'Проекты и работы по веб-разработке Антона Л.',
    },
    github: {
      heading: 'GitHub',
      commitsThisYear: 'коммитов за этот год',
      error: 'Не удалось загрузить активность GitHub.',
    },
    footer: {
      copyright: 'Antlis',
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
