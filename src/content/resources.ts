export const resourcesHero = {
  // Visible H1 stays brand/editorial (SEO team PR #25); hub intent lives in title/meta.
  title: "راهنمای ضربان قلب و علم تمرین",
  lede: "در منابع بیت‌فیت درباره پایش ضربان قلب در ورزش، محاسبه زون‌های ضربان قلب، انتخاب حسگر پوشیدنی، شدت تمرین و کلاس‌های گروهی بیشتر بخوانید.",
} as const;

export const resourcesFeatured = {
  tag: "برای ورزشکار",
  title: "زون‌های ضربان قلب چیست؟ راهنمای ۵ زون تمرینی",
  body: "با پنج زون ضربان قلب، کاربرد هرکدام، روش محاسبه و نحوه استفاده از اطلاعات زون‌ها در تمرین آشنا شوید.",
  image: "/beatfitImages/articles/زون-های-ضربان-قلب.webp",
  imageAlt: "ورزشکار در حال تمرین با حسگر ضربان قلب نصب‌شده روی بازو",
  ctaLabel: "ادامه مطلب",
  ctaHref: "/blog/heart-rate-zones",
} as const;

export type ResourceCategory =
  | "all"
  | "gym"
  | "coach"
  | "athlete";

export const resourcesCatalog = {
  searchPlaceholder: "دنبال چه موضوعی هستید؟",
  ctaLabel: "ادامه مطلب",
  filters: [
    { id: "all" as const, label: "همه مطالب" },
    { id: "gym" as const, label: "برای باشگاه‌ها" },
    { id: "coach" as const, label: "برای مربیان" },
    { id: "athlete" as const, label: "برای ورزشکاران" },
  ],
  items: [
    {
      id: "intensity-class",
      category: "gym" as const,
      tag: "برای باشگاه‌ها",
      title: "پایش ضربان قلب در باشگاه چیست و چه کاربردی دارد؟",
      body: "با تجهیزات موردنیاز، کاربردهای نمایش زنده و نکات انتخاب یک سیستم پایش مناسب برای باشگاه آشنا شوید.",
      image: "/beatfitImages/articles/پایش-ضربان-قلب-در-باشگاه.webp",
      imageAlt: "کلاس گروهی ورزشی با حسگرهای ضربان قلب بیت‌فیت روی بازوی ورزشکاران",
      href: "/blog/connected-training-system",
    },
    {
      id: "coach-live",
      category: "coach" as const,
      tag: "برای مربیان",
      title: "چطور شدت تمرین ورزشکاران را در کلاس گروهی کنترل کنیم؟",
      body: "با روش‌های مشاهده، RPE، آزمون صحبت و پایش ضربان قلب، شدت نسبی ورزشکاران را بهتر تشخیص دهید.",
      image: "/beatfitImages/articles/کنترل-شدت-تمرین-در-کلاس-گروهی.webp",
      imageAlt: "مربی در حال گفت‌وگو با ورزشکار و بررسی اهداف تمرینی در بیت‌فیت",
      href: "/blog/live-class-monitoring",
    },
    {
      id: "athlete-zones",
      category: "athlete" as const,
      tag: "برای ورزشکاران",
      title: "زون‌های ضربان قلب چیست؟ راهنمای ۵ زون تمرینی",
      body: "با پنج زون ضربان قلب، کاربرد هرکدام و روش محاسبه شدت تمرین آشنا شوید.",
      image: "/beatfitImages/articles/زون-های-ضربان-قلب.webp",
      imageAlt: "ورزشکار در حال تمرین با حسگر ضربان قلب نصب‌شده روی بازو",
      href: "/blog/heart-rate-zones",
    },
    {
      id: "athlete-progress",
      category: "athlete" as const,
      tag: "برای ورزشکاران",
      title: "چطور با تاریخچه تمرین، روند پیشرفت خود را بشناسیم؟",
      body: "یاد بگیرید جلسات مشابه، ضربان قلب، زون‌ها و بار تمرینی را کنار هم بگذارید و تغییرات را درست تفسیر کنید.",
      image: "/beatfitImages/articles/تاریخچه-تمرین.webp",
      imageAlt: "ورزشکار در حال دویدن با حسگر ضربان قلب روی بازو",
      href: "/blog/workout-history-progress",
    },
    {
      id: "athlete-training-load",
      category: "athlete" as const,
      tag: "برای ورزشکاران",
      title: "بار تمرینی چیست و چطور فشار تمرین را نشان می‌دهد؟",
      body: "با تفاوت بار داخلی و خارجی، حجم و شدت تمرین و روش‌های تفسیر فشار هر جلسه آشنا شوید.",
      image: "/beatfitImages/articles/بار-تمرینی-چیست.webp",
      imageAlt: "ورزشکار پس از تمرین با حسگر بیت‌فیت و نمایش اطلاعات بار تمرینی",
      href: "/blog/training-load",
    },
    {
      id: "athlete-sensors",
      category: "athlete" as const,
      tag: "برای ورزشکاران",
      title: "سنسور بازویی، ساعت هوشمند یا بند سینه‌ای؟",
      body: "تفاوت فناوری، دقت، راحتی و کاربرد سه نوع حسگر ضربان قلب را در تمرین مقایسه کنید.",
      image: "/beatfitImages/articles/مقایسه-سنسور-ضربان-قلب.webp",
      imageAlt: "مقایسه ساعت هوشمند، حسگر ضربان قلب بازویی و بند سینه‌ای",
      href: "/blog/heart-rate-sensor-comparison",
    },
    {
      id: "coach-class-design",
      category: "coach" as const,
      tag: "برای مربیان",
      title: "چطور برای آمادگی‌های متفاوت یک کلاس گروهی طراحی کنیم؟",
      body: "انتخاب حرکات جایگزین، تنظیم شدت و نمونه برنامه ۴۵دقیقه‌ای را در یک راهنمای کاربردی ببینید.",
      image: "/beatfitImages/articles/طراحی-تمرین-گروهی.webp",
      imageAlt: "ورزشکار در حال آماده‌سازی حسگرهای ضربان قلب پیش از تمرین قدرتی",
      href: "/blog/group-class-design",
    },
  ],
} as const;
