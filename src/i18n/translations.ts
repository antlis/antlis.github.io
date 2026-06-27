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
      description: 'Frontend developer building production web apps, open-source tools, and practical self-hosted systems. I write about Vue, React, TypeScript, terminal workflows, bots, and the engineering details that usually get skipped.',
      recentPosts: 'Recent Posts',
      viewAll: 'View all',
    },
    about: {
      title: 'About — Anton L | Frontend Developer',
      heading: 'About',
      description: 'Anton L is a frontend developer with experience in Vue, Nuxt.js, React, Next.js, and TypeScript. Previously worked on high-traffic web platforms in the media and fintech space.',
      text: "I'm a developer passionate about building modern web apps. I love exploring new technologies, learning, and sharing knowledge through writing and open source.",
    },
    contact: {
      title: 'Contact — Anton L',
      heading: 'Contact',
      description: 'Get in touch with Anton L — frontend developer available for freelance and full-time opportunities. Reach out via email or social platforms.',
      text: 'The quickest way to reach me is via Telegram. You can also use the form below or find me on any of these platforms.',
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
      intro: "Most of my commercial work is under NDA, so it can't be shown here. What you see below is a selection of personal and open-source projects — some of them are pretty old, but each one was built either entirely from scratch or with the frontend part done solo. They reflect how I approach problems, build UIs, and ship things end to end.",
    },
    footer: {
      copyright: 'antlis',
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
      description: 'Фронтенд-разработчик: делаю продакшен веб-приложения, open-source инструменты и практичные self-hosted системы. Пишу про Vue, React, TypeScript, терминальные workflow, ботов и инженерные детали, которые обычно пропускают.',
      recentPosts: 'Последние записи',
      viewAll: 'Все записи',
    },
    about: {
      title: 'Обо мне — Антон Л | Фронтенд-разработчик',
      heading: 'Обо мне',
      description: 'Антон Л — фронтенд-разработчик с опытом работы с Vue, Nuxt.js, React, Next.js и TypeScript. Работал над веб-платформами в медиа и финтехе.',
      text: 'Я разработчик, увлечённый созданием современных веб-приложений. Люблю изучать новые технологии, учиться и делиться знаниями через статьи и open source.',
    },
    contact: {
      title: 'Контакты — Антон Л',
      heading: 'Контакты',
      description: 'Свяжитесь с Антоном Л — фронтенд-разработчик, доступен для фриланса и постоянной работы. Напишите на email или через соцсети.',
      text: 'Быстрее всего связаться со мной через Telegram. Можно также использовать форму ниже или найти меня на любой из этих платформ.',
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
      intro: 'Большинство коммерческих проектов находятся под NDA, поэтому их нельзя показать. Ниже — подборка личных и open-source проектов, некоторые из них довольно старые, но каждый был создан либо полностью с нуля, либо фронтенд-часть была сделана самостоятельно. Они отражают мой подход к решению задач, построению интерфейсов и доставке продукта.',
    },
    footer: {
      copyright: 'antlis',
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
