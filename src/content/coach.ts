export const coachHero = {
  // Visible H1 stays editorial; live-HR intent lives in title/meta (SEO team PR #23).
  title: "دید زنده از وضعیت کلاس، برای تصمیم‌های روشن‌تر مربی",
  body: "با پنل مربی بیت‌فیت، ضربان قلب، زون و شدت تمرین ورزشکاران متصل را به‌صورت زنده پایش کنید و نتیجه هر جلسه را مرور کنید.",
  image: "/assets/coach/dashboard-laptop.webp",
  imageAlt: "داشبورد مربی بیت‌فیت روی لپ‌تاپ",
} as const;

export const coachGuide = {
  title: "هدایت بهتر کلاس، از دیدن آنچه در کلاس می‌گذرد شروع می‌شود",
  lede: "مربی برای همراهی بهتر با اعضا، به تصویری روشن از شدت تمرین، وضعیت لحظه‌ای و نتیجه هر جلسه نیاز دارد.",
  image: "/assets/coach/iphone-mockups.webp",
  imageAlt: "سه گوشی با صفحات مختلف پنل مربی بیت‌فیت",
  cards: [
    {
      id: "history",
      tone: "gray" as const,
      slot: "tl" as const,
      icon: "pulse" as const,
      title: "نتیجه هر جلسه برای جلسه بعد باقی نمی‌ماند",
      body: "بدون ثبت اطلاعات، مرور عملکرد ورزشکار و ادامه‌دادن گفت‌وگوی تمرینی دشوارتر است.",
    },
    {
      id: "live",
      tone: "green" as const,
      slot: "tr" as const,
      icon: "heartOff" as const,
      title: "بدون بازخورد زنده، واکنش سریع دشوارتر است",
      body: "وقتی وضعیت تمرین در لحظه دیده نشود، تشخیص زمان مناسب برای توجه و راهنمایی سخت‌تر می‌شود.",
    },
    {
      id: "intensity",
      tone: "green" as const,
      slot: "bl" as const,
      icon: "shoe" as const,
      title: "در یک کلاس، شدت تمرین همه یکسان نیست",
      body: "هر ورزشکار با سطح آمادگی و واکنش متفاوتی تمرین می‌کند.",
    },
    {
      id: "overview",
      tone: "gray" as const,
      slot: "br" as const,
      icon: "users" as const,
      title: "وضعیت همه اعضا در یک نگاه روشن نیست",
      body: "مربی باید هم‌زمان چندین ورزشکار را دنبال کند و به نیازهای متفاوت آن‌ها پاسخ دهد.",
    },
  ],
} as const;

export const coachClarity = {
  title: "با بیت‌فیت، دید مربی به کلاس روشن‌تر می‌شود.",
  lede: "بیت‌فیت ضربان قلب و زون تمرینی اعضای متصل را در لحظه نمایش می‌دهد تا مربی وضعیت کلاس را دنبال کند، به‌موقع واکنش نشان دهد و نتیجه هر جلسه را مرور کند.",
  cards: [
    {
      id: "guide",
      tone: "gray" as const,
      featured: false,
      icon: "biceps" as const,
      title: "هدایت روشن‌تر",
      body: "افرادی را که به توجه یا راهنمایی بیشتری نیاز دارند، سریع‌تر تشخیص دهید.",
    },
    {
      id: "live",
      tone: "green" as const,
      featured: true,
      icon: "monitor" as const,
      title: "دید زنده از کلاس",
      body: "وضعیت اعضای متصل را هم‌زمان در پنل مربی ببینید.",
    },
    {
      id: "track",
      tone: "gray" as const,
      featured: false,
      icon: "binoculars" as const,
      title: "پیگیری هر جلسه",
      body: "نتیجه تمرین را ثبت کنید و برای گفت‌وگوی بهتر با ورزشکار به آن مراجعه کنید.",
    },
  ],
} as const;

export const coachTools = {
  title: "ابزارهای پنل مربی برای پایش تمرین",
  ctaLabel: "آشنایی با فرایند راه‌اندازی",
  ctaHref: "/demo",
  items: [
    {
      id: "overview",
      title: "نمای کلی کلاس",
      body: "ضربان قلب و وضعیت تمرین اعضای متصل را در یک نگاه دنبال کنید.",
    },
    {
      id: "zone",
      title: "زون و شدت تمرین",
      body: "زون و شدت هر ورزشکار را هم‌زمان ببینید و هدایت کلاس را دقیق‌تر کنید.",
    },
    {
      id: "timing",
      title: "توجه در زمان مناسب",
      body: "لحظه‌هایی که اعضا به توجه بیشتری نیاز دارند را سریع‌تر تشخیص دهید.",
    },
    {
      id: "history",
      title: "تاریخچه جلسات",
      body: "نتیجه هر جلسه را مرور کنید و مسیر تمرین را برای جلسه بعد روشن‌تر بسازید.",
    },
    {
      id: "alerts",
      title: "هشدارهای لحظه‌ای",
      body: "تغییرات مهم شدت تمرین را در لحظه ببینید و واکنش به‌موقع نشان دهید.",
    },
  ],
} as const;

export const coachDecisions = {
  title: "تصمیم‌های بهتر، از اطلاعات روشن شروع می‌شوند.",
  lede: "بیت‌فیت اطلاعات تمرین را در لحظه و بعد از پایان جلسه در اختیار مربی قرار می‌دهد تا واکنش‌ها و گفت‌وگوهای تمرینی بر پایه تصویر روشن‌تری از کلاس شکل بگیرد.",
  image: "/assets/coach/decisions-path.svg?v=2",
  imageAlt: "مسیر تصمیم‌گیری مربی با بیت‌فیت",
  steps: [
    {
      id: "see",
      label: "وضعیت کلاس را روشن‌تر ببینید",
      x: 35 / 1364,
      y: 35 / 722,
      place: "below",
    },
    {
      id: "know",
      label: "عملکرد هر ورزشکار را بهتر بشناسید",
      x: 1163 / 1364,
      y: 149 / 722,
      place: "left",
    },
    {
      id: "decide",
      label: "در لحظه، دقیق‌تر تصمیم بگیرید",
      x: 168 / 1364,
      y: 377.5 / 722,
      place: "right",
    },
    {
      id: "lead",
      label: "کلاس را بهتر هدایت کنید",
      x: 1329 / 1364,
      y: 607 / 722,
      place: "left",
    },
  ],
} as const;

export const coachBannerB = {
  title: "کلاس‌هایی بسازید که مربی و ورزشکار در آن هم‌مسیر باشند.",
  body: "با پنل مربی بیت فیت، وضعیت تمرین را در لحظه دنبال کنید، نتیجه هر جلسه را مرور کنید و ارتباط دقیق‌تری با اعضای کلاس داشته باشید.",
  ctaLabel: "آشنایی با فرایند راه‌اندازی",
  ctaHref: "/demo",
  image: "/assets/gym/coach-showcase.webp",
  imageAlt: "مربی بیت‌فیت در حال نمایش اپلیکیشن روی گوشی",
} as const;
