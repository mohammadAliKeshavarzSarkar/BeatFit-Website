import { SITE_URL } from "../config/site";
import type { JourneyContent, PersonaId } from "../types/persona";

export const site = {
  title: "بیت‌فیت | سیستم پایش زنده ضربان قلب و تمرین گروهی",
  brand: "بیت‌فیت",
  /** Positioning modifier for branded search (see brand-search-language doc). */
  categoryPhrase: "سیستم پایش زنده ضربان قلب و تمرین گروهی",
  homeAriaLabel: "صفحه اصلی بیت‌فیت",
  email: "mailto:hello@beatfit.ir",
  url: SITE_URL,
  narrative: ["LIVE", "HISTORY", "PROGRESS"] as const,
} as const;

export const nav = [
  { href: "/gym", label: "باشگاه" },
  { href: "/coach", label: "مربیان" },
  { href: "/athlete", label: "ورزشکاران" },
  { href: "/resources", label: "منابع" },
  { href: "/demo", label: "درخواست مشاوره" },
] as const;

/** Primary header action — opens the BeatFit product. */
export const headerCta = {
  label: "ورود به بیت‌فیت",
  href: "https://app.beatfit.ir",
} as const;

export const headerMenu = {
  openLabel: "باز کردن منوی ناوبری",
  closeLabel: "بستن منوی ناوبری",
} as const;

export const hero = {
  title: "با بیت فیت ضربان به ضربان، بدنت رو بساز.",
  lede: "ضربان قلبت رو لحظه‌ای ببین و مسیر پیشرفتت رو دنبال کن.",
  tags: [
    { id: "progress", label: "تحلیل پیشرفت", icon: "trendingUp" as const },
    { id: "history", label: "تاریخچه تمرین", icon: "clock" as const },
    { id: "live", label: "ضربان لحظه‌ای", icon: "activity" as const },
  ],
  ctaLabel: "بیت‌فیت چطور کار می‌کنه؟",
  ctaHref: "#live-class",
  markSrc: "/beatfitImages/hero-mark-b.webp",
  markAlt: "",
  sprinterSrc: "/beatfitImages/hero-sprinter.webp",
  sprinterAlt: "ورزشکار بیت‌فیت با سنسور ضربان قلب در حال دویدن",
  /**
   * Left-rail proof tiles — live metrics as product evidence (WHOOP/Nike pattern),
   * not another feature list. Keep to 2–3 small glass tiles.
   */
  proof: [
    {
      id: "bpm",
      spine: "ضربان",
      label: "ضربان لحظه‌ای",
      value: "۱۴۲",
      unit: "BPM",
      icon: "activity" as const,
      live: true,
    },
    {
      id: "zone",
      spine: "زون",
      label: "زون تمرین",
      value: "۳",
      unit: "هوازی",
      icon: "target" as const,
      live: true,
    },
    {
      id: "kcal",
      spine: "کالری",
      label: "کالری جلسه",
      value: "۳۲۰",
      unit: "kcal",
      icon: "thermometer" as const,
      live: true,
    },
  ],
  /** Hotspot chips around the sprinter — x/y are % of the visual box. */
  features: [
    {
      id: "hr",
      label: "ضربان",
      ariaLabel: "ضربان لحظه‌ای",
      icon: "activity" as const,
      x: "6%",
      y: "30%",
    },
    {
      id: "progress",
      label: "پیشرفت",
      ariaLabel: "تحلیل پیشرفت",
      icon: "trendingUp" as const,
      x: "102%",
      y: "26%",
    },
    {
      id: "calories",
      label: "کالری",
      ariaLabel: "محاسبه کالری",
      icon: "thermometer" as const,
      x: "10%",
      y: "60%",
    },
    {
      id: "zones",
      label: "زون‌ها",
      ariaLabel: "زون‌های تمرینی",
      icon: "target" as const,
      x: "104%",
      y: "54%",
    },
    {
      id: "history",
      label: "تاریخچه",
      ariaLabel: "تاریخچه تمرین",
      icon: "clock" as const,
      x: "76%",
      y: "82%",
    },
  ],
} as const;

export const ecosystem = {
  titleBefore: "چرا بعضی اعضا، بعد از مدتی",
  titleAfter: "با همان انگیزه به باشگاه برنمی‌گردند؟",
  lede: "گاهی مسئله کیفیت تمرین نیست: فاصله‌ای است میان تلاشی که انجام می‌شود و پیشرفتی که دیده می‌شود.",
  points: [
    {
      id: "value",
      title: "ارزشی که ملموس نیست",
      body: "تفاوت تجربه‌ای که باشگاه ارائه می‌دهد، همیشه برای اعضا واضح نیست.",
      x: "85.34%",
      dot: "0.687",
    },
    {
      id: "repeat",
      title: "تمرینی که تکراری می‌شود",
      body: "وقتی بازخورد مشخصی وجود ندارد، جلسه‌های تمرین شبیه هم می‌شوند.",
      x: "60.58%",
      dot: "0.614",
    },
    {
      id: "attention",
      title: "توجهی که محدود می‌ماند",
      body: "در یک کلاس گروهی، دنبال کردن وضعیت تمام ورزشکاران آسان نیست.",
      x: "32.37%",
      dot: "0.532",
    },
    {
      id: "progress",
      title: "پیشرفتی که دیده نمی‌شود",
      body: "ورزشکار تلاش می‌کند، اما تصویر روشن و مشخصی از تغییرات عملکرد خود ندارد.",
      x: "10.72%",
      dot: "0.453",
    },
  ],
} as const;

export const experience = {
  title: "تجربه‌ای بسازید که اعضا برای تکرارش بازگردند",
  lede: "وقتی ورزشکار پیشرفت خود را می‌بیند، تمرین برایش معنای بیشتری پیدا می‌کند. مربی با شناخت بهتر از عملکرد اعضا، آگاهانه‌تر تصمیم می‌گیرد و باشگاه می‌تواند تجربه‌ای متمایز و ارزشمندتر ارائه دهد.",
  steps: [
    {
      n: "۱",
      title: "پیشرفتی که دیده می‌شود",
      body: "ورزشکار فقط تمرین نمی‌کند؛ می‌تواند تلاش و تغییرات عملکرد خود را در طول زمان دنبال کند.",
    },
    {
      n: "۲",
      title: "ارتباطی که قوی‌تر می‌شود",
      body: "مربی با درک بهتر از وضعیت ورزشکاران، فرصت بیشتری برای ارائه بازخورد هدفمند دارد.",
    },
    {
      n: "۳",
      title: "تجربه‌ای که باشگاه را متمایز می‌کند",
      body: "باشگاه فراتر از تجهیزات و فضای تمرین، ارزشی قابل‌درک به اعضای خود ارائه می‌دهد.",
    },
  ],
  close: "ارزش واقعی یک باشگاه، تنها در امکانات آن نیست؛ در تجربه‌ای است که برای اعضایش می‌سازد.",
  image: "/assets/product/مچبند-نئون-بیت-فیت.webp",
  imageAlt: "مچ‌بند مشکی بیت‌فیت با حلقه سبز نئون",
} as const;

export const sessionFlow = {
  title: "هر کلاس، یک تجربه زنده",
  lede: "با BeatFit، تمرین فقط انجام نمی‌شود؛ دیده می‌شود، فهمیده می‌شود و ادامه پیدا می‌کند.",
  image: "/assets/home/journey-path.svg",
  /** Artboard: 1343 × 1311 — copy anchors from Figma Group 202 */
  steps: [
    {
      id: "wear",
      step: "قدم ۱",
      title: "پوشيدن سنسور",
      body: "ورزشکار سنسور BeatFit را می‌پوشد و وارد کلاس می‌شود.",
      icon: "wristband" as const,
      side: "left" as const,
      x: 161 / 1343,
      y: 111 / 1311,
      /** Circle centers from journey-path.svg (1343 × 1311) */
      nodeX: 80.5 / 1343,
      nodeY: 80.5 / 1311,
    },
    {
      id: "live",
      step: "قدم ۲",
      title: "نمایش زنده شدت تمرین",
      body: "شدت تمرین او روی نمایشگر، به‌صورت زنده و قابل فهم دیده می‌شود.",
      icon: "live-monitor" as const,
      side: "right" as const,
      x: 701 / 1343,
      y: 342 / 1311,
      nodeX: 1262.5 / 1343,
      nodeY: 304.5 / 1311,
    },
    {
      id: "coach",
      step: "قدم ۳",
      title: "دید بهتر مربی",
      body: "مربی وضعیت کلاس را در یک نگاه می‌بیند و بهتر تصمیم می‌گیرد.",
      icon: "coach" as const,
      side: "left" as const,
      x: 161 / 1343,
      y: 624 / 1311,
      nodeX: 80.5 / 1343,
      nodeY: 593.5 / 1311,
    },
    {
      id: "feedback",
      step: "قدم ۴",
      title: "بازخورد در طول تمرین",
      body: "ورزشکار در طول تمرین بازخورد می‌گیرد و بیشتر درگیر می‌شود.",
      icon: "heart-pulse" as const,
      side: "right" as const,
      x: 701 / 1343,
      y: 862 / 1311,
      nodeX: 1262.5 / 1343,
      nodeY: 824.5 / 1311,
    },
    {
      id: "record",
      step: "قدم ۵",
      title: "ثبت نتيجه جلسه",
      body: "نتیجه جلسه ثبت می‌شود تا مسیر پیشرفت او در جلسات بعدی ادامه پیدا کند.",
      icon: "clipboard" as const,
      side: "left" as const,
      x: 161 / 1343,
      y: 1137 / 1311,
      nodeX: 80.5 / 1343,
      nodeY: 1106.5 / 1311,
    },
  ],
} as const;

export const product = {
  title: "فقط ضربان را نبینید. تمرین را بفهمید.",
  subtitle: "از اتفاقی که همین حالا می‌افتد تا تغییری که در طول زمان شکل می‌گیرد.",
  features: [
    {
      id: "live",
      layout: "full" as const,
      title: "تمرین را در لحظه ببینید.",
      body: "ضربان، زون و شدت هر ورزشکار را هم‌زمان با تمرین دنبال کنید.",
      items: ["ضربان زنده", "زون تمرین", "شدت جلسه"],
      image: "/beatfitImages/mockup1.webp" as string | null,
      imageAlt: "نمای زنده ضربان قلب، زون و شدت تمرین در بیت‌فیت",
    },
    {
      id: "progress",
      layout: "full" as const,
      title: "مسیر پیشرفت را دنبال کنید.",
      body: "هر جلسه ثبت می‌شود تا تغییر تمرین را در طول زمان ببینید.",
      items: ["تاریخچه جلسات", "روند پیشرفت", "مقایسه جلسات"],
      image: "/beatfitImages/اینفوگرافیک-مسیر-پیشرفت-تمرین.webp" as string | null,
      imageAlt: "نمای تاریخچه جلسات و روند پیشرفت تمرین در بیت‌فیت",
    },
  ],
  activityShowcase: {
    title: "هر تمرینی، یک ریتم دارد.",
    body: "از تمرینات قدرتی و HIIT تا دوچرخه و بوکس، شدت تمرین را با داده‌های ضربان قلب دنبال کنید.",
    rowOne: [
      { src: "/beatfitImages/HIIT.webp", label: "HIIT" },
      { src: "/beatfitImages/lifting.webp", label: "قدرتی" },
      { src: "/beatfitImages/function.webp", label: "فانکشنال" },
      { src: "/beatfitImages/running.webp", label: "دویدن" },
    ],
    rowTwo: [
      { src: "/beatfitImages/bysicle.webp", label: "دوچرخه" },
      { src: "/beatfitImages/boxing.webp", label: "بوکس" },
      { src: "/beatfitImages/TRX.webp", label: "TRX" },
      { src: "/beatfitImages/wrkoutgroup.webp", label: "تمرین گروهی" },
    ],
  },
} as const;

export const personasCopy = {
  title: "بیت‌فیت برای شما چه می‌کند؟",
  subtitle: "ورزشکار، مربی یا مدیر باشگاه؛ نقشتان را انتخاب کنید و مسیر خود را ببینید.",
  changeRoleLabel: "تغییر نقش",
  rolesLabel: "انتخاب نقش",
  items: [
    {
      id: "athlete" as PersonaId,
      tabId: "tab-athlete",
      panelId: "panel-athlete",
      image: "/beatfitImages/user2.webp",
      title: "ورزشکار",
      body: "تمرین را زنده ببینید، جلسه را مرور کنید و پیشرفتتان را دنبال کنید.",
      imageAlt: "",
    },
    {
      id: "coach" as PersonaId,
      tabId: "tab-coach",
      panelId: "panel-coach",
      image: "/beatfitImages/user1.webp",
      title: "مربی",
      body: "کلاس را در لحظه ببینید، شدت تمرین را هدایت کنید و عملکرد را مرور کنید.",
      imageAlt: "",
    },
    {
      id: "club" as PersonaId,
      tabId: "tab-club",
      panelId: "panel-club",
      image: "/beatfitImages/user3.webp",
      title: "مدیر باشگاه",
      body: "مربی‌ها، ورزشکاران، کلاس‌ها و دستگاه‌ها را از یک نقطه مدیریت کنید.",
      imageAlt: "",
    },
  ],
} as const;

export const journeys: Record<PersonaId, JourneyContent> = {
  athlete: {
    message: "تمرین تمام می‌شود. مسیر پیشرفت ادامه دارد.",
    steps: [
      {
        icon: "enter",
        title: "وارد جلسه شوید",
        body: "جلسه تمرینتان را پیدا کنید و برای شروع آماده شوید.",
      },
      {
        icon: "wristband",
        title: "مچ‌بند را متصل کنید",
        body: "مچ‌بند را متصل کنید تا ضربان قلب در لحظه ثبت شود.",
      },
      {
        icon: "heart-pulse",
        title: "تمرین را زنده ببینید",
        body: "ضربان، زون و شدت را هم‌زمان با تمرین دنبال کنید.",
      },
      {
        icon: "monitor",
        title: "کلاس را روی Live TV ببینید",
        body: "وضعیت خود و کلاس را روی نمایشگر دنبال کنید.",
      },
      {
        icon: "clipboard",
        title: "جلسه را مرور کنید",
        body: "بعد از تمرین، زمان، زون‌ها و عملکرد جلسه را ببینید.",
      },
      {
        icon: "chart-up",
        title: "پیشرفت را دنبال کنید",
        body: "جلسه‌ها را کنار هم ببینید و روند تمرین را دنبال کنید.",
      },
    ],
  },
  coach: {
    message: "کلاس را ببینید. دقیق‌تر هدایت کنید.",
    steps: [
      {
        icon: "sliders",
        title: "کلاس را آماده کنید",
        body: "جلسه، ورزشکاران و دستگاه‌ها را برای شروع آماده کنید.",
        image: "/beatfitImages/DashboardCoach.webp",
        imageAlt: "",
      },
      {
        icon: "users",
        title: "ورزشکاران را اضافه کنید",
        body: "افراد حاضر در کلاس را به جلسه تمرین اضافه کنید.",
      },
      {
        icon: "play",
        title: "جلسه را شروع کنید",
        body: "تمرین را شروع کنید تا داده‌های کلاس به‌صورت زنده نمایش داده شوند.",
        image: "/beatfitImages/sessionsCoach.webp",
        imageAlt: "",
      },
      {
        icon: "heart-grid",
        title: "کلاس را زنده ببینید",
        body: "ضربان، زون و شدت ورزشکاران را هم‌زمان ببینید.",
      },
      {
        icon: "gauge",
        title: "شدت را هدایت کنید",
        body: "ببینید هر ورزشکار در چه زونی تمرین می‌کند.",
        image: "/beatfitImages/sessionsCoach2.webp",
        imageAlt: "",
      },
      {
        icon: "analytics",
        title: "عملکرد را مرور کنید",
        body: "بعد از جلسه، خلاصه تمرین و عملکرد ورزشکاران را بررسی کنید.",
      },
    ],
  },
  club: {
    message: "مربی‌ها، ورزشکاران، کلاس‌ها و دستگاه‌ها؛ یک‌جا.",
    steps: [
      {
        icon: "coach",
        title: "مربی‌ها را مدیریت کنید",
        body: "مربی‌ها و دسترسی‌هایشان را در یک ساختار مشخص نگه دارید.",
      },
      {
        icon: "users-calendar",
        title: "ورزشکاران و کلاس‌ها را سازمان‌دهی کنید",
        body: "افراد و کلاس‌های مجموعه را در یک ساختار منظم مدیریت کنید.",
      },
      {
        icon: "device",
        title: "دستگاه‌ها را مدیریت کنید",
        body: "مچ‌بندها و دستگاه‌های متصل به باشگاه را مدیریت کنید.",
      },
      {
        icon: "live-monitor",
        title: "جلسات زنده را ببینید",
        body: "وضعیت جلسه‌ها و Live TV را از یک نقطه دنبال کنید.",
      },
      {
        icon: "history",
        title: "فعالیت باشگاه را مرور کنید",
        body: "جلسه‌ها و اطلاعات ثبت‌شده را در طول زمان بررسی کنید.",
      },
      {
        icon: "settings",
        title: "تنظیمات باشگاه را کنترل کنید",
        body: "تنظیمات و دسترسی‌های مجموعه را از یک نقطه مدیریت کنید.",
      },
    ],
  },
};

export const blogs = {
  title: "تمرین را بهتر بشناسید.",
  subtitle: "راهنماها و نکاتی درباره ضربان قلب، زون‌ها و داده‌های تمرین.",
  readMore: "بیشتر بخوانید",
  playLabel: "پخش خودکار اسلایدها",
  pauseLabel: "توقف پخش خودکار اسلایدها",
  reloadLabel: "بازگشت به اولین مطلب",
  pagerLabel: "مطالب بلاگ بیت‌فیت",
  slideLabel: "مطلب",
  items: [
    {
      id: "zones",
      eyebrow: "برای ورزشکار",
      title: "زون‌های ضربان قلب چیست؟ راهنمای ۵ زون تمرینی",
      summary:
        "با پنج زون ضربان قلب، کاربرد هرکدام و روش محاسبه شدت تمرین آشنا شوید.",
      image: "/beatfitImages/articles/زون-های-ضربان-قلب.webp",
      imageAlt: "ورزشکار در حال تمرین با حسگر ضربان قلب نصب‌شده روی بازو",
      href: "/blog/heart-rate-zones",
      /** Set true only when the article page is live — unpublished cards are hidden */
      published: true,
    },
    {
      id: "coach",
      eyebrow: "برای مربی",
      title: "چطور شدت تمرین را در کلاس گروهی کنترل کنیم؟",
      summary:
        "روش‌های مشاهده، RPE، آزمون صحبت و پایش ضربان قلب را برای هدایت بهتر کلاس بشناسید.",
      image: "/beatfitImages/articles/کنترل-شدت-تمرین-در-کلاس-گروهی.webp",
      imageAlt: "مربی در حال گفت‌وگو با ورزشکار و بررسی اهداف تمرینی در بیت‌فیت",
      href: "/blog/live-class-monitoring",
      published: true,
    },
    {
      id: "club",
      eyebrow: "برای باشگاه",
      title: "پایش ضربان قلب در باشگاه؛ راهنمای مدیران",
      summary:
        "با نحوه کار سیستم پایش گروهی، تجهیزات موردنیاز و نکات انتخاب راهکار مناسب برای باشگاه آشنا شوید.",
      image: "/beatfitImages/articles/پایش-ضربان-قلب-در-باشگاه.webp",
      imageAlt: "کلاس گروهی ورزشی با حسگرهای ضربان قلب بیت‌فیت روی بازوی ورزشکاران",
      href: "/blog/connected-training-system",
      published: true,
    },
    {
      id: "progress",
      eyebrow: "برای ورزشکار",
      title: "چطور روند پیشرفت خود را در تاریخچه تمرین ببینیم؟",
      summary:
        "با مقایسه جلسات مشابه، ضربان قلب، زون‌ها و بار تمرینی، مسیر فعالیت خود را دقیق‌تر بشناسید.",
      image: "/beatfitImages/articles/تاریخچه-تمرین.webp",
      imageAlt: "ورزشکار در حال دویدن با حسگر ضربان قلب روی بازو",
      href: "/blog/workout-history-progress",
      published: true,
    },
    {
      id: "training-load",
      eyebrow: "برای ورزشکار",
      title: "بار تمرینی چیست و چطور فشار تمرین را نشان می‌دهد؟",
      summary:
        "تفاوت حجم، شدت و بار تمرینی را بشناسید و عدد فشار هر جلسه را دقیق‌تر تفسیر کنید.",
      image: "/beatfitImages/articles/بار-تمرینی-چیست.webp",
      imageAlt: "ورزشکار پس از تمرین با حسگر بیت‌فیت و نمایش اطلاعات بار تمرینی",
      href: "/blog/live-tv-group-training",
      published: true,
    },
    {
      id: "sensors",
      eyebrow: "برای ورزشکار",
      title: "سنسور بازویی، ساعت یا بند سینه‌ای؛ کدام بهتر است؟",
      summary:
        "فناوری، دقت، راحتی و کاربرد سه روش رایج پایش ضربان قلب را هنگام ورزش مقایسه کنید.",
      image: "/beatfitImages/articles/مقایسه-سنسور-ضربان-قلب.webp",
      imageAlt: "مقایسه ساعت هوشمند، سنسور ضربان قلب بازویی و بند سینه‌ای ورزشی",
      href: "/blog/heart-rate-sensor-comparison",
      published: true,
    },
    {
      id: "class-design",
      eyebrow: "برای مربی",
      title: "چطور برای آمادگی‌های متفاوت یک کلاس طراحی کنیم؟",
      summary:
        "با نسخه‌های جایگزین حرکات، تنظیم شدت و نمونه کامل کلاس ۴۵دقیقه‌ای، برنامه‌ای منعطف‌تر بسازید.",
      image: "/beatfitImages/articles/طراحی-تمرین-گروهی.webp",
      imageAlt: "ورزشکار در حال آماده‌سازی حسگرهای ضربان قلب پیش از تمرین قدرتی",
      href: "/blog/group-class-design",
      published: true,
    },
  ],
} as const;

export const faq = {
  title: "سؤال دارید؟ پاسخ اینجاست.",
  subtitle: "هر آنچه درباره اکوسیستم، علم تمرین و ارزش بیت‌فیت باید بدانید.",
  searchPlaceholder: "جستجو در سؤالات…",
  clearLabel: "پاک کردن جستجو",
  emptyLabel: "سؤالی با این عبارت پیدا نشد.",
  items: [
    {
      id: "ecosystem",
      question: "اکوسیستم بیت‌فیت چگونه کار می‌کند؟",
      answer:
        "از حسگر ضربان قلب تا پیشرفت ورزشکار، همه چیز در یک مسیر ساده و خوانا به هم وصل می‌شود: دستگاه ضربان قلب، هاب، Beat Fit، پنل مربی، Live TV، پنل ورزشکار، تاریخچه و در نهایت پیشرفت.",
    },
    {
      id: "zone",
      question: "Zone چیست؟",
      answer:
        "Zone بازه شدت تمرین نسبت به حداکثر ضربان قلب است. با Zone، مربی و ورزشکار می‌فهمند در هر لحظه در چه سطحی از تلاش هستند.",
    },
    {
      id: "hrmax",
      question: "HRmax چیست؟",
      answer:
        "HRmax بالاترین ضربان قلب قابل‌دسترسی در اوج تلاش است و مبنای محاسبه Zone و شدت تمرین شخصی‌سازی‌شده قرار می‌گیرد.",
    },
    {
      id: "intensity",
      question: "Intensity چیست؟",
      answer:
        "Intensity درصد تلاش فعلی ورزشکار نسبت به ظرفیت شخصی اوست؛ یعنی همان تمرین برای دو نفر می‌تواند شدت متفاوتی داشته باشد.",
    },
    {
      id: "training-load",
      question: "Training Load چیست؟",
      answer:
        "Training Load بار تجمعی جلسات تمرینی است که به مربی کمک می‌کند بین تلاش، ریکاوری و پیشرفت تعادل بهتری برقرار کند.",
    },
    {
      id: "why-beatfit",
      question: "چرا بیت‌فیت؟",
      answer:
        "بیت‌فیت ارزش محصول را نشان می‌دهد، نه فهرست ویژگی. Real-Time یعنی اطلاعات هم‌زمان با تمرین؛ Personal یعنی شدت بر اساس وضعیت هر ورزشکار؛ Persistent یعنی هر جلسه بخشی از تاریخچه می‌شود؛ Actionable یعنی داده به تصمیم بهتر مربی تبدیل می‌شود.",
    },
    {
      id: "equipment",
      question: "آیا به تجهیزات خاصی نیاز دارم؟",
      answer:
        "برای شروع به حسگر ضربان قلب و دستگاه‌هایی که در باشگاه دارید کافی است. بیت‌فیت روی گوشی، تبلت، تلویزیون و ساعت هم در دسترس است.",
    },
    {
      id: "tv",
      question: "آیا می‌توانم روی تلویزیون استفاده کنم؟",
      answer:
        "بله. Live TV بیت‌فیت برای نمایش تمرین زنده در سالن طراحی شده تا مربی و ورزشکاران همان لحظه وضعیت تمرین را ببینند.",
    },
    {
      id: "demo",
      question: "چطور درخواست دمو بدهم؟",
      answer:
        "در پایین صفحه فرم تماس را پر کنید یا روی «درخواست دمو» بزنید. تیم بیت‌فیت برای راه‌اندازی در باشگاه شما هماهنگ می‌شود.",
    },
  ],
} as const;

export const cta = {
  heading: "تماس با ما",
  title: "تمرین را جور دیگری ببین.",
  subtitle: "بیت‌فیت را در باشگاه خود تجربه کنید.",
  primary: "درخواست دمو",
  secondary: "تماس با ما",
  image: "/assets/contact/app-mockup.webp",
  imageAlt: "نمایش اپلیکیشن بیت‌فیت روی موبایل",
  fields: {
    name: "نام و نام خانوادگی",
    email: "ایمیل",
    message: "پیام",
    namePlaceholder: "مثلاً سارا محمدی",
    emailPlaceholder: "name@example.com",
    messagePlaceholder: "درباره باشگاه، تعداد ورزشکار یا زمان مناسب بنویسید…",
  },
} as const;

export const footer = {
  headline: "هیچ ضربانی را از دست نده",
  sub: "شدت تمرین زنده دیده می‌شود و نتیجه هر جلسه برای مسیر بعد می‌ماند.",
  groups: [
    {
      title: "دسترسی سریع",
      links: [
        { href: "/", label: "خانه" },
        { href: "/gym", label: "باشگاه‌ها" },
        { href: "/coach", label: "مربیان" },
        { href: "/athlete", label: "ورزشکاران" },
        { href: "/resources", label: "منابع" },
        { href: "/demo", label: "درخواست دمو" },
      ],
    },
    {
      title: "بیشتر بدانید",
      links: [
        { href: "/resources", label: "بلاگ و منابع" },
        { href: "/demo", label: "درخواست دمو" },
      ],
    },
  ],
  contact: {
    title: "ارتباط با بیت‌فیت",
    body: "برای شروع یک تجربه هوشمندتر، با ما در ارتباط باشید.",
  },
  social: [
    { href: "#", label: "تلگرام", icon: "telegram" },
    { href: "#", label: "واتساپ", icon: "whatsapp" },
    { href: "#", label: "لینکدین", icon: "linkedin" },
    { href: "#", label: "اینستاگرام", icon: "instagram" },
    { href: site.email, label: "ایمیل", icon: "mail" },
  ],
  copyright: "© ۲۰۲۶ BEATFIT تمامی حقوق محفوظ است",
  legalLinks: [
    { href: "#", label: "حریم خصوصی" },
    { href: "#", label: "شرایط استفاده" },
  ],
} as const;
