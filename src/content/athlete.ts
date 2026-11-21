export const athleteHero = {
  title: "از لحظه تمرین تا مسیر پیشرفت، همراهت هستیم.",
  body: "با بیت‌فیت، شدت تمرینت را در لحظه دنبال کن، نتیجه هر جلسه را ببین و روند پیشرفتت را بهتر بشناس.",
  image: "/assets/contact/app-mockup.webp",
  imageAlt: "پنل ورزشکار بیت‌فیت روی گوشی",
} as const;

export const athleteMotivation = {
  title: "وقتی پیشرفتت را می‌بینی، انگیزه بیشتری برای ادامه‌دادن داری",
  lede: "با بیت‌فیت، میزان تلاش، شدت تمرین و تغییرات عملکردت را در هر جلسه می‌بینی و مسیر پیشرفتت را بهتر می‌شناسی.",
  cards: [
    {
      id: "intensity",
      tone: "gray" as const,
      title: "شدت تمرین همیشه روشن نیست",
      body: "بدون بازخورد لحظه‌ای، نمی‌دانی در چه محدوده‌ای تمرین می‌کنی.",
      image: "/beatfitImages/athlete/intensity-dashboard.webp",
      imageAlt: "نمای زنده ضربان قلب و زون تمرینی در داشبورد بیت‌فیت",
    },
    {
      id: "effort",
      tone: "gray" as const,
      title: "تلاش تو در کلاس دیده نمی‌شود",
      body: "وقتی اطلاعاتی از تمرین ثبت نشود، درک نتیجه جلسه دشوارتر است.",
      image: "/beatfitImages/athlete/effort-session.webp",
      imageAlt: "نمای جلسه تمرین و وضعیت ورزشکاران در داشبورد بیت‌فیت",
    },
    {
      id: "progress",
      tone: "gray" as const,
      title: "پیشرفت بین جلسات گم می‌شود",
      body: "اگر نتیجه هر جلسه باقی نماند، دنبال‌کردن مسیر پیشرفت سخت‌تر می‌شود.",
      image: "/beatfitImages/athlete/progress-sessions.webp",
      imageAlt: "نمودار روند پیشرفت تمرین در چند جلسه",
    },
    {
      id: "talk",
      tone: "gray" as const,
      title: "گفت‌وگو با مربی کلی می‌ماند",
      body: "وقتی داده‌ای از تمرین وجود نداشته باشد، صحبت درباره عملکرد دقیق‌تر پیش نمی‌رود.",
      image: "/beatfitImages/athlete/coach-talk.webp",
      imageAlt: "نمای پنل مربی برای مرور عملکرد ورزشکار",
    },
  ],
} as const;

export const athleteLive = {
  title: "در هر لحظه، از تمرینت باخبر باش",
  lede: "با بیت‌فیت، اطلاعات تمرینت را همان لحظه روی نمایشگر کلاس و در اپلیکیشن خودت می‌بینی تا با شناخت بیشتری تمرین کنی",
  path: "/assets/athlete/live-path.svg",
  phone: "/assets/athlete/iphone-mockup.webp",
  phoneAlt: "پنل تمرین بیت‌فیت روی گوشی",
  steps: [
    {
      id: "intensity",
      side: "start" as const,
      tone: "gray" as const,
      title: "شدت تمرینت را ببین",
      body: "ضربان قلب و زون تمرینی‌ات را در لحظه دنبال کن.",
    },
    {
      id: "class",
      side: "end" as const,
      tone: "green" as const,
      title: "در جریان کلاس بمان",
      body: "وضعیت تمرینت را روی نمایشگر کلاس ببین و با روند جلسه همراه شو.",
    },
    {
      id: "effort",
      side: "start" as const,
      tone: "gray" as const,
      title: "به تلاش خودت آگاه باش",
      body: "بفهم در هر بخش از تمرین چه فشاری را تجربه می‌کنی.",
    },
    {
      id: "focus",
      side: "end" as const,
      tone: "green" as const,
      title: "با تمرکز بیشتری ادامه بده",
      body: "بازخورد زنده کمک می‌کند ارتباطت با تمرین قطع نشود.",
    },
  ],
} as const;

export const athleteProgress = {
  title: "هر جلسه، بخشی از پیشرفت توست",
  lede: "بیت‌فیت نتیجه تمرین‌هایت را ثبت می‌کند تا مسیر ورزشی‌ات فقط به احساس همان روز محدود نماند",
  image: "/assets/athlete/progress-dashboard.webp",
  imageAlt: "کارت ترکیب روزانه وزن ۱۰ روز اخیر",
  cards: [
    {
      id: "trend",
      tone: "green" as const,
      title: "روند تمرینت را بشناس",
      body: "ببین شدت تمرین‌هایت در طول زمان چگونه تغییر کرده است.",
      icon: "/assets/athlete/icon-trend.svg",
    },
    {
      id: "history",
      tone: "green" as const,
      title: "تاریخچه جلساتت را مرور کن",
      body: "نتیجه تمرین‌های قبلی را در یک مسیر مشخص دنبال کن.",
      icon: "/assets/athlete/icon-history.svg",
    },
    {
      id: "load",
      tone: "gray" as const,
      title: "فشار تمرینی‌ات را بهتر درک کن",
      body: "با مرور جلسات، تصویر روشن‌تری از میزان فعالیتت داشته باش.",
      icon: "/assets/athlete/icon-load.svg",
    },
  ],
} as const;

export const athleteGlance = {
  title: "تمام اطلاعات تمرین، در یک نگاه",
  lede: "از ضربان قلب و شدت تمرین گرفته تا کالری مصرف‌شده، روند ضربان قلب و وضعیت حسگر؛ اطلاعات هر ورزشکار در طول کلاس به‌صورت زنده نمایش داده می‌شود.",
  image: "/assets/athlete/glance-dashboard.webp",
  imageAlt: "داشبورد زنده تمرین ورزشکار بیت‌فیت",
  cards: [
    {
      id: "time",
      tone: "green" as const,
      title: "زمان تمرین",
      body: "نمایش زمان جلسه برای پیگیری روند تمرین",
      bodyMuted: true,
    },
    {
      id: "chart",
      tone: "green" as const,
      title: "نمودار تغییرات ضربان قلب",
      body: "دنبال‌کردن تغییرات ضربان قلب در طول جلسه",
      bodyMuted: true,
    },
    {
      id: "calories",
      tone: "gray" as const,
      title: "کالری مصرف‌شده",
      body: "نمایش میزان تخمینی کالری مصرفی در جلسه",
      bodyMuted: false,
    },
    {
      id: "activity",
      tone: "green" as const,
      title: "شاخص فعالیت ورزشکار",
      body: "نمایش میزان فعالیت ثبت‌شده در طول تمرین",
      bodyMuted: false,
    },
    {
      id: "heartrate",
      tone: "gray" as const,
      title: "ضربان قلب لحظه‌ای",
      body: "مشاهده ضربان قلب ورزشکار در هر لحظه از تمرین",
      bodyMuted: false,
    },
  ],
} as const;

export const athleteBanner = {
  title: "آماده‌ای تمرینت را متفاوت ببینی؟",
  body: "با بیت‌فیت، هر جلسه فقط یک تمرین نیست؛ تجربه‌ای است که می‌توانی آن را ببینی، مرور کنی و ادامه بدهی.",
  ctaLabel: "درخواست دمو",
  ctaHref: "/demo",
  image: "/assets/athlete/حسگر-سینه-و-بازوبند-بیت-فیت.webp",
  imageAlt: "حسگر سینه و بازوبند بیت‌فیت",
} as const;
