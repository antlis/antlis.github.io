export const translations = {
  en: {
    nav: {
      about: 'About',
      blog: 'Blog',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    home: {
      title: 'Anton L — Frontend Developer | Vue, React, TypeScript',
      heading: "Hi, I'm Anton",
      description: 'Frontend developer specializing in Vue/Nuxt.js, React/Next.js, and TypeScript. Building modern web applications, sharing dev tips, and contributing to open source.',
      recentPosts: 'Recent Posts',
      viewAll: 'View all',
    },
    about: {
      title: 'About — Anton L | Frontend Developer',
      heading: 'About',
      description: 'Anton L is a frontend developer with experience in Vue, Nuxt.js, React, Next.js, and TypeScript. Previously worked on Cointelegraph and other production web applications.',
      text: "I'm a developer passionate about building modern web apps. I love exploring new technologies, learning, and sharing knowledge through writing and open source.",
    },
    contact: {
      title: 'Contact — Anton L',
      heading: 'Contact',
      description: 'Get in touch with Anton L — frontend developer available for freelance and full-time opportunities. Reach out via email or social platforms.',
      text: 'Feel free to reach out via email or find me on any of these platforms.',
    },
    blog: {
      title: 'Blog — Anton L | Web Development, Tools & Security',
      heading: 'Blog',
      description: 'Articles about frontend development, developer tools, shell productivity, web security, and modern JavaScript/TypeScript by Anton L.',
      empty: 'No posts yet.',
    },
    portfolio: {
      title: 'Portfolio — Anton L | Web Development Projects',
      heading: 'Portfolio',
      description: 'Frontend development projects by Anton L — production web applications built with Vue, Nuxt.js, React, Next.js, and TypeScript.',
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
      title: 'Антон Л — Фронтенд-разработчик | Vue, React, TypeScript',
      heading: 'Привет, я Антон',
      description: 'Фронтенд-разработчик, специализируюсь на Vue/Nuxt.js, React/Next.js и TypeScript. Создаю современные веб-приложения, делюсь опытом и участвую в open source.',
      recentPosts: 'Последние записи',
      viewAll: 'Все записи',
    },
    about: {
      title: 'Обо мне — Антон Л | Фронтенд-разработчик',
      heading: 'Обо мне',
      description: 'Антон Л — фронтенд-разработчик с опытом работы с Vue, Nuxt.js, React, Next.js и TypeScript. Работал над Cointelegraph и другими продакшен веб-приложениями.',
      text: 'Я разработчик, увлечённый созданием современных веб-приложений. Люблю изучать новые технологии, учиться и делиться знаниями через статьи и open source.',
    },
    contact: {
      title: 'Контакты — Антон Л',
      heading: 'Контакты',
      description: 'Свяжитесь с Антоном Л — фронтенд-разработчик, доступен для фриланса и постоянной работы. Напишите на email или через соцсети.',
      text: 'Свяжитесь со мной по email или найдите меня на любой из этих платформ.',
    },
    blog: {
      title: 'Блог — Антон Л | Веб-разработка, инструменты и безопасность',
      heading: 'Блог',
      description: 'Статьи о фронтенд-разработке, инструментах разработчика, продуктивности в терминале, веб-безопасности и современном JavaScript/TypeScript от Антона Л.',
      empty: 'Записей пока нет.',
    },
    portfolio: {
      title: 'Портфолио — Антон Л | Проекты веб-разработки',
      heading: 'Портфолио',
      description: 'Проекты фронтенд-разработки Антона Л — продакшен веб-приложения на Vue, Nuxt.js, React, Next.js и TypeScript.',
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
