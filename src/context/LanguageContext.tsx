"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
    "Features": { en: "Features", ar: "المميزات" },
    "Pricing": { en: "Pricing", ar: "الأسعار" },
    "Capabilities": { en: "Capabilities", ar: "القدرات" },
    "Sign Up Free": { en: "Sign Up Free", ar: "سجل مجاناً" },
    "Log In": { en: "Log In", ar: "دخول" },
    "Product": { en: "Product", ar: "المنتج" },
    "Company": { en: "Company", ar: "الشركة" },
    "About Us": { en: "About Us", ar: "عن الشركة" },
    "Contact": { en: "Contact", ar: "تواصل معنا" },
    "Terms of Service": { en: "Terms of Service", ar: "شروط الخدمة" },
    "Privacy Policy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    "Sign In": { en: "Sign In", ar: "تسجيل الدخول" },
    "Get Started": { en: "Get Started", ar: "ابدأ الآن" },
    "Choose Plan": { en: "Choose Plan", ar: "اختر الخطة" },
    "Contact Sales": { en: "Contact Sales", ar: "تواصل مع المبيعات" },
    "Most Popular": { en: "Most Popular", ar: "الأكثر شيوعاً" },
    "Welcome to Seya": { en: "Welcome to Seya", ar: "مرحباً بك في SEYA" },
    "Settings": { en: "Settings", ar: "الإعدادات" },
    "Logout": { en: "Logout", ar: "خروج" },
    "New Chat": { en: "New Chat", ar: "محادثة جديدة" },
    "History": { en: "History", ar: "السجل" },
    "Profile": { en: "Profile", ar: "الملف الشخصي" },
    "Subscription": { en: "Subscription", ar: "الاشتراك" },
    "Name": { en: "Name", ar: "الاسم" },
    "Email": { en: "Email", ar: "البريد الإلكتروني" },
    "New Password (leave blank to keep)": { en: "New Password (leave blank to keep)", ar: "كلمة المرور الجديدة (اتركها فارغة للإبقاء)" },
    "Save Changes": { en: "Save Changes", ar: "حفظ التغييرات" },
    "Current Plan": { en: "Current Plan", ar: "الخطة الحالية" },
    "Upgrade to Pro": { en: "Upgrade to Pro", ar: "ترقية للنسخة الاحترافية" },
    "Upgrade Now": { en: "Upgrade Now", ar: "رقّي الآن" },

    // Footer
    "The AI-powered content creation platform for modern teams.": { en: "The AI-powered content creation platform for modern teams.", ar: "منصة إنشاء المحتوى المدعومة بالذكاء الاصطناعي للفرق الحديثة." },
    "© 2024 SEYA. All rights reserved.": { en: "© 2024 SEYA. All rights reserved.", ar: "© 2024 SEYA. جميع الحقوق محفوظة." },

    // Hero
    "Your AI Assistant for Effortless Writing": { en: "Your AI Assistant for Effortless Writing", ar: "مساعدك الذكي للكتابة السهلة" },
    "Articles.": { en: "Articles.", ar: "مقالات." },
    "Tweets.": { en: "Tweets.", ar: "تغريدات." },
    "Scripts.": { en: "Scripts.", ar: "سيناريوهات." },
    "Posts.": { en: "Posts.", ar: "منشورات." },
    "SEYA is your personal AI agent for high-quality content generation. Stop staring at a blank page and start creating in seconds.": { en: "SEYA is your personal AI agent for high-quality content generation. Stop staring at a blank page and start creating in seconds.", ar: "SEYA هو وكيل الذكاء الاصطناعي الشخصي لإنشاء محتوى عالي الجودة. توقف عن التحديق في صفحة فارغة وابدأ في الإنشاء في ثوانٍ." },
    "Get Started for Free": { en: "Get Started for Free", ar: "ابدأ مجاناً" },

    // Features
    "AI Article Writer": { en: "AI Article Writer", ar: "كاتب المقالات بالذكاء الاصطناعي" },
    "Generate long-form articles that are SEO-optimized and ready to publish in minutes.": { en: "Generate long-form articles that are SEO-optimized and ready to publish in minutes.", ar: "أنشئ مقالات طويلة محسنة لمحركات البحث وجاهزة للنشر في دقائق." },
    "Social Media Genius": { en: "Social Media Genius", ar: "عبقري وسائل التواصل الاجتماعي" },
    "Create engaging tweets, threads, and social media posts that capture attention.": { en: "Create engaging tweets, threads, and social media posts that capture attention.", ar: "أنشئ تغريدات وسلاسل ومنشورات جذابة تخطف الأنظار." },
    "YouTube Script Pro": { en: "YouTube Script Pro", ar: "محترف سيناريوهات يوتيوب" },
    "Craft compelling video scripts that keep your audience hooked from start to finish.": { en: "Craft compelling video scripts that keep your audience hooked from start to finish.", ar: "صغ سيناريوهات فيديو مقنعة تبقي جمهورك متشوقاً من البداية إلى النهاية." },
    "One Agent, Infinite Possibilities": { en: "One Agent, Infinite Possibilities", ar: "وكيل واحد، إمكانيات لا حصر لها" },
    "Discover how our versatile AI writing assistant can streamline your content workflow and amplify your creativity.": { en: "Discover how our versatile AI writing assistant can streamline your content workflow and amplify your creativity.", ar: "اكتشف كيف يمكن لمساعد الكتابة بالذكاء الاصطناعي المتعدد الاستخدامات تبسيط سير عمل المحتوى الخاص بك وتعزيز إبداعك." },

    // Steps
    "Simple Steps to Brilliant Content": { en: "Simple Steps to Brilliant Content", ar: "خطوات بسيطة لمحتوى رائع" },
    "Step 1": { en: "Step 1", ar: "الخطوة 1" },
    "Describe Your Topic": { en: "Describe Your Topic", ar: "صف موضوعك" },
    "Provide a simple prompt, keywords, or a brief description of what you need.": { en: "Provide a simple prompt, keywords, or a brief description of what you need.", ar: "قدم وصفاً بسيطاً، كلمات مفتاحية، أو وصفاً مختصراً لما تحتاجه." },
    "Step 2": { en: "Step 2", ar: "الخطوة 2" },
    "Generate Content": { en: "Generate Content", ar: "توليد المحتوى" },
    "SEYA's advanced AI analyzes your input and crafts unique content in seconds.": { en: "SEYA's advanced AI analyzes your input and crafts unique content in seconds.", ar: "يقوم الذكاء الاصطناعي المتقدم في SEYA بتحليل مدخلاتك وصياغة محتوى فريد في ثوانٍ." },
    "Step 3": { en: "Step 3", ar: "الخطوة 3" },
    "Publish & Share": { en: "Publish & Share", ar: "انشر وشارك" },
    "Review, edit if needed, and share your masterpiece with the world.": { en: "Review, edit if needed, and share your masterpiece with the world.", ar: "راجع، عدل إن لزم الأمر، وشارك تحفتك مع العالم." },

    // Pricing
    "Simple, Transparent Pricing": { en: "Simple, Transparent Pricing", ar: "أسعار بسيطة وشفافة" },
    "Start for free and upgrade when you need more": { en: "Start for free and upgrade when you need more", ar: "ابدأ مجاناً وقم بالترقية عندما تحتاج للمزيد" },
    "Free": { en: "Free", ar: "مجاني" },
    "Perfect for trying out Seya": { en: "Perfect for trying out Seya", ar: "مثالي لتجربة SEYA" },
    "0 EGP": { en: "0 EGP", ar: "0 جنيه" },
    "/ month": { en: "/ month", ar: "/ شهر" },
    "50 AI Messages / Month": { en: "50 AI Messages / Month", ar: "50 رسالة ذكاء اصطناعي / شهر" },
    "Basic Support": { en: "Basic Support", ar: "دعم أساسي" },
    "Pro": { en: "Pro", ar: "احترافي" },
    "Unleash your full potential": { en: "Unleash your full potential", ar: "أطلق العنان لإمكاناتك الكاملة" },
    "500 EGP": { en: "500 EGP", ar: "500 جنيه" },
    "Unlimited": { en: "Unlimited", ar: "غير محدود" },
    "AI Messages": { en: "AI Messages", ar: "رسائل ذكاء اصطناعي" },
    "Priority Support": { en: "Priority Support", ar: "دعم ذو أولوية" },
    "Access to New Features": { en: "Access to New Features", ar: "الوصول للميزات الجديدة" },
    "RECOMMENDED": { en: "RECOMMENDED", ar: "موصى به" },

    // Testimonials
    "What Our Users Say": { en: "What Our Users Say", ar: "ماذا يقول مستخدمونا" },
    "Content Marketer": { en: "Content Marketer", ar: "مسوق محتوى" },
    "YouTuber": { en: "YouTuber", ar: "يوتيوبر" },
    "Social Media Manager": { en: "Social Media Manager", ar: "مدير وسائل التواصل الاجتماعي" },
    "\"SEYA cut my content creation time in half! The article writer is a game-changer for my blog.\"": { en: "\"SEYA cut my content creation time in half! The article writer is a game-changer for my blog.\"", ar: "\"قلص SEYA وقت إنشاء المحتوى الخاص بي إلى النصف! كاتب المقالات غير قواعد اللعبة لمدونتي.\"" },
    "\"As a YouTuber, I struggled with scripts. SEYA's Script Pro gives me fantastic ideas and structures to work with.\"": { en: "\"As a YouTuber, I struggled with scripts. SEYA's Script Pro gives me fantastic ideas and structures to work with.\"", ar: "\"كيوتيوبر، كنت أعاني مع السيناريوهات. SEYA Script Pro يعطيني أفكاراً وهياكل رائعة للعمل بها.\"" },
    "\"Managing social media for multiple clients is tough. The Social Media Genius tool is my secret weapon.\"": { en: "\"Managing social media for multiple clients is tough. The Social Media Genius tool is my secret weapon.\"", ar: "\"إدارة وسائل التواصل الاجتماعي لعملاء متعددين أمر صعب. أداة عبقري وسائل التواصل الاجتماعي هي سلاحي السري.\"" },

    // Auth
    "Login failed": { en: "Login failed", ar: "فشل تسجيل الدخول" },
    "Signing in...": { en: "Signing in...", ar: "جاري تسجيل الدخول..." },
    "Loading...": { en: "Loading...", ar: "جاري التحميل..." },
    "Sign Up": { en: "Sign Up", ar: "إنشاء حساب" },
    "Confirm Password": { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
    "Passwords do not match": { en: "Passwords do not match", ar: "كلمات المرور غير متطابقة" },
    "Registration failed": { en: "Registration failed", ar: "فشل التسجيل" },
    "Creating...": { en: "Creating...", ar: "جاري الإنشاء..." },
    "Create Account": { en: "Create Account", ar: "إنشاء الحساب" },

    // Capabilities
    "From Ideas to Impact, Instantly": { en: "From Ideas to Impact, Instantly", ar: "من الأفكار إلى التأثير، فوراً" },
    "Discover the wide range of high-quality content SEYA can generate for you. Explore examples and see the power of AI in action.": { en: "Discover the wide range of high-quality content SEYA can generate for you. Explore examples and see the power of AI in action.", ar: "اكتشف المجموعة الواسعة من المحتوى عالي الجودة الذي يمكن لـ SEYA إنشاؤه لك. استكشف الأمثلة وشاهد قوة الذكاء الاصطناعي في العمل." },
    "Articles & Blog Posts": { en: "Articles & Blog Posts", ar: "مقالات ومنشورات مدونة" },
    "Informative, persuasive, listicles, and how-to guides.": { en: "Informative, persuasive, listicles, and how-to guides.", ar: "معلوماتي، مقنع، قوائم، وأدلة إرشادية." },
    "Tweets & Threads": { en: "Tweets & Threads", ar: "تغريدات وسلاسل" },
    "Generate single tweets or engaging multi-tweet threads.": { en: "Generate single tweets or engaging multi-tweet threads.", ar: "أنشئ تغريدات فردية أو سلاسل تغريدات جذابة." },
    "YouTube Scripts": { en: "YouTube Scripts", ar: "سيناريوهات يوتيوب" },
    "Create compelling script intros with visual cues and narration.": { en: "Create compelling script intros with visual cues and narration.", ar: "أنشئ مقدمات سيناريو مقنعة مع إشارات بصرية وسرد." },
    "LinkedIn Posts": { en: "LinkedIn Posts", ar: "منشورات لينكد إن" },
    "Craft professional, thought-leadership posts for your network.": { en: "Craft professional, thought-leadership posts for your network.", ar: "صغ منشورات احترافية وقيادية لشبكتك." },
    "Instagram Captions": { en: "Instagram Captions", ar: "تعليقات إنستغرام" },
    "Write short, engaging captions with emojis and hashtags.": { en: "Write short, engaging captions with emojis and hashtags.", ar: "اكتب تعليقات قصيرة وجذابة مع رموز تعبيرية ووسوم." },
    "Facebook Posts": { en: "Facebook Posts", ar: "منشورات فيسبوك" },
    "Design posts for community engagement and promotion.": { en: "Design posts for community engagement and promotion.", ar: "صمم منشورات للمشاركة المجتمعية والترويج." },
    "Ready to Automate Your Content?": { en: "Ready to Automate Your Content?", ar: "جاهز لأتمتة المحتوى الخاص بك؟" },
    "Choose Your Plan": { en: "Choose Your Plan", ar: "اختر خطتك" },

    // PaymentButton
    "Pay Now": { en: "Pay Now", ar: "ادفع الآن" },
    "Processing...": { en: "Processing...", ar: "جاري المعالجة..." },
    "Payment initiation failed. Please try again.": { en: "Payment initiation failed. Please try again.", ar: "فشل بدء الدفع. يرجى المحاولة مرة أخرى." },
    "An error occurred. Please try again.": { en: "An error occurred. Please try again.", ar: "حدث خطأ. يرجى المحاولة مرة أخرى." },

    // Pricing Modal
    "Upgrade Your Plan": { en: "Upgrade Your Plan", ar: "رقّي خطتك" },
    "Free Plan": { en: "Free Plan", ar: "الخطة المجانية" },
    "Pro Plan": { en: "Pro Plan", ar: "الخطة الاحترافية" },

    // Chat Page
    "Type a message...": { en: "Type a message...", ar: "اكتب رسالة..." },
    "Rename Chat": { en: "Rename Chat", ar: "إعادة تسمية المحادثة" },
    "Delete Chat": { en: "Delete Chat", ar: "حذف المحادثة" },
    "Are you sure you want to delete this chat?": { en: "Are you sure you want to delete this chat?", ar: "هل أنت متأكد أنك تريد حذف هذه المحادثة؟" },
    "Cancel": { en: "Cancel", ar: "إلغاء" },
    "Delete": { en: "Delete", ar: "حذف" },
    "Rename": { en: "Rename", ar: "إعادة تسمية" },
    "Enter new chat name": { en: "Enter new chat name", ar: "أدخل اسم المحادثة الجديد" },

    // About Page
    "About": { en: "About", ar: "عن" },
    "Empowering creators with AI-powered content generation": { en: "Empowering creators with AI-powered content generation", ar: "تمكين المبدعين من خلال إنشاء المحتوى المدعوم بالذكاء الاصطناعي" },
    "Our Mission": { en: "Our Mission", ar: "مهمتنا" },
    "At SEYA, we believe that everyone deserves access to powerful content creation tools. Our mission is to democratize content creation by providing AI-powered solutions that help individuals and teams produce high-quality content faster and more efficiently.": { en: "At SEYA, we believe that everyone deserves access to powerful content creation tools. Our mission is to democratize content creation by providing AI-powered solutions that help individuals and teams produce high-quality content faster and more efficiently.", ar: "في SEYA، نؤمن بأن الجميع يستحق الوصول إلى أدوات إنشاء محتوى قوية. مهمتنا هي ديمقراطية إنشاء المحتوى من خلال توفير حلول مدعومة بالذكاء الاصطناعي تساعد الأفراد والفرق على إنتاج محتوى عالي الجودة بشكل أسرع وأكثر كفاءة." },
    "Our Story": { en: "Our Story", ar: "قصتنا" },
    "SEYA was born from the frustration of spending countless hours creating content for various platforms. We recognized that content creators needed a solution that could adapt to different formats while maintaining quality and authenticity.": { en: "SEYA was born from the frustration of spending countless hours creating content for various platforms. We recognized that content creators needed a solution that could adapt to different formats while maintaining quality and authenticity.", ar: "ولدت SEYA من الإحباط الناتج عن قضاء ساعات لا تحصى في إنشاء محتوى لمنصات مختلفة. أدركنا أن منشئي المحتوى بحاجة إلى حل يمكنه التكيف مع التنسيقات المختلفة مع الحفاظ على الجودة والأصالة." },
    "Today, SEYA serves thousands of creators, marketers, and businesses worldwide, helping them streamline their content creation process and focus on what matters most - connecting with their audience.": { en: "Today, SEYA serves thousands of creators, marketers, and businesses worldwide, helping them streamline their content creation process and focus on what matters most - connecting with their audience.", ar: "اليوم، تخدم SEYA الآلاف من المبدعين والمسوقين والشركات في جميع أنحاء العالم، مما يساعدهم على تبسيط عملية إنشاء المحتوى والتركيز على ما يهم أكثر - التواصل مع جمهورهم." },
    "Our Values": { en: "Our Values", ar: "قيمنا" },
    "Innovation": { en: "Innovation", ar: "الابتكار" },
    "We continuously push the boundaries of what's possible with AI technology.": { en: "We continuously push the boundaries of what's possible with AI technology.", ar: "نحن ندفع باستمرار حدود ما هو ممكن باستخدام تقنية الذكاء الاصطناعي." },
    "Quality": { en: "Quality", ar: "الجودة" },
    "We're committed to delivering exceptional results that exceed expectations.": { en: "We're committed to delivering exceptional results that exceed expectations.", ar: "نحن ملتزمون بتقديم نتائج استثنائية تفوق التوقعات." },
    "Accessibility": { en: "Accessibility", ar: "إمكانية الوصول" },
    "We make powerful tools available to everyone, regardless of technical expertise.": { en: "We make powerful tools available to everyone, regardless of technical expertise.", ar: "نجعل الأدوات القوية متاحة للجميع، بغض النظر عن الخبرة التقنية." },
    "Community": { en: "Community", ar: "المجتمع" },
    "We believe in building a supportive community of creators helping creators.": { en: "We believe in building a supportive community of creators helping creators.", ar: "نؤمن ببناء مجتمع داعم من المبدعين يساعدون بعضهم البعض." },

    // Contact Page
    "Get in": { en: "Get in", ar: "تواصل" },
    "Touch": { en: "Touch", ar: "معنا" },
    "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.": { en: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.", ar: "هل لديك أسئلة؟ نود أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن." },
    "Send us a message": { en: "Send us a message", ar: "أرسل لنا رسالة" },
    "Subject": { en: "Subject", ar: "الموضوع" },
    "Message": { en: "Message", ar: "الرسالة" },
    "Send Message": { en: "Send Message", ar: "إرسال الرسالة" },
    "Sending...": { en: "Sending...", ar: "جاري الإرسال..." },
    "Message sent successfully!": { en: "Message sent successfully!", ar: "تم إرسال الرسالة بنجاح!" },
    "Something went wrong. Please try again.": { en: "Something went wrong. Please try again.", ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى." },
    "Your name": { en: "Your name", ar: "اسمك" },
    "your@email.com": { en: "your@email.com", ar: "your@email.com" },
    "How can we help?": { en: "How can we help?", ar: "كيف يمكننا مساعدتك؟" },
    "Tell us more about your inquiry...": { en: "Tell us more about your inquiry...", ar: "أخبرنا المزيد عن استفسارك..." },

    // Privacy Page
    "Privacy": { en: "Privacy", ar: "سياسة" },
    "Policy": { en: "Policy", ar: "الخصوصية" },
    "Last updated: November 22, 2025": { en: "Last updated: November 22, 2025", ar: "آخر تحديث: 22 نوفمبر 2025" },
    "1. Introduction": { en: "1. Introduction", ar: "1. مقدمة" },
    "SEYA (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. Please read this privacy policy carefully.": { en: "SEYA (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. Please read this privacy policy carefully.", ar: "تلتزم SEYA (\"نحن\" أو \"نا\") بحماية خصوصيتك. تشرح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وإفصاحنا وحمايتنا لمعلوماتك عند استخدام خدمتنا. يرجى قراءة سياسة الخصوصية هذه بعناية." },
    "2. Information We Collect": { en: "2. Information We Collect", ar: "2. المعلومات التي نجمعها" },
    "We collect information that you provide directly to us, including:": { en: "We collect information that you provide directly to us, including:", ar: "نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك:" },
    "Account information (name, email address, password)": { en: "Account information (name, email address, password)", ar: "معلومات الحساب (الاسم، عنوان البريد الإلكتروني، كلمة المرور)" },
    "Profile information you choose to provide": { en: "Profile information you choose to provide", ar: "معلومات الملف الشخصي التي تختار تقديمها" },
    "Content you create, upload, or share through the Service": { en: "Content you create, upload, or share through the Service", ar: "المحتوى الذي تنشئه أو تحمّله أو تشاركه عبر الخدمة" },
    "Communications between you and SEYA": { en: "Communications between you and SEYA", ar: "الاتصالات بينك وبين SEYA" },
    "Payment information (processed securely through third-party payment processors)": { en: "Payment information (processed securely through third-party payment processors)", ar: "معلومات الدفع (تتم معالجتها بأمان من خلال معالجي الدفع التابعين لجهات خارجية)" },
    "3. Automatically Collected Information": { en: "3. Automatically Collected Information", ar: "3. المعلومات التي يتم جمعها تلقائياً" },
    "When you access or use our Service, we automatically collect certain information, including:": { en: "When you access or use our Service, we automatically collect certain information, including:", ar: "عند الوصول إلى خدمتنا أو استخدامها، نقوم تلقائياً بجمع معلومات معينة، بما في ذلك:" },
    "Log data (IP address, browser type, operating system)": { en: "Log data (IP address, browser type, operating system)", ar: "بيانات السجل (عنوان IP، نوع المتصفح، نظام التشغيل)" },
    "Device information (device type, unique device identifiers)": { en: "Device information (device type, unique device identifiers)", ar: "معلومات الجهاز (نوع الجهاز، معرفات الجهاز الفريدة)" },
    "Usage data (pages visited, features used, time spent on the Service)": { en: "Usage data (pages visited, features used, time spent on the Service)", ar: "بيانات الاستخدام (الصفحات التي تمت زيارتها، الميزات المستخدمة، الوقت الذي يقضيه في الخدمة)" },
    "Cookies and similar tracking technologies": { en: "Cookies and similar tracking technologies", ar: "ملفات تعريف الارتباط وتقنيات التتبع المماثلة" },
    "4. How We Use Your Information": { en: "4. How We Use Your Information", ar: "4. كيف نستخدم معلوماتك" },
    "We use the information we collect to:": { en: "We use the information we collect to:", ar: "نستخدم المعلومات التي نجمعها لـ:" },
    "Provide, maintain, and improve our Service": { en: "Provide, maintain, and improve our Service", ar: "توفير وصيانة وتحسين خدمتنا" },
    "Process transactions and send related information": { en: "Process transactions and send related information", ar: "معالجة المعاملات وإرسال المعلومات ذات الصلة" },
    "Send you technical notices, updates, security alerts, and support messages": { en: "Send you technical notices, updates, security alerts, and support messages", ar: "إرسال الإشعارات الفنية والتحديثات وتنبيهات الأمان ورسائل الدعم" },
    "Respond to your comments, questions, and customer service requests": { en: "Respond to your comments, questions, and customer service requests", ar: "الرد على تعليقاتك وأسئلتك وطلبات خدمة العملاء" },
    "Communicate with you about products, services, offers, and events": { en: "Communicate with you about products, services, offers, and events", ar: "التواصل معك حول المنتجات والخدمات والعروض والفعاليات" },
    "Monitor and analyze trends, usage, and activities in connection with our Service": { en: "Monitor and analyze trends, usage, and activities in connection with our Service", ar: "مراقبة وتحليل الاتجاهات والاستخدام والأنشطة المتعلقة بخدمتنا" },
    "Detect, investigate, and prevent fraudulent transactions and other illegal activities": { en: "Detect, investigate, and prevent fraudulent transactions and other illegal activities", ar: "الكشف عن المعاملات الاحتيالية والأنشطة غير القانونية الأخرى والتحقيق فيها ومنعها" },
    "Personalize and improve the Service and provide content or features that match your interests": { en: "Personalize and improve the Service and provide content or features that match your interests", ar: "تخصيص وتحسين الخدمة وتوفير محتوى أو ميزات تتناسب مع اهتماماتك" },
    "5. Information Sharing and Disclosure": { en: "5. Information Sharing and Disclosure", ar: "5. مشاركة المعلومات والإفصاح عنها" },
    "We may share your information in the following circumstances:": { en: "We may share your information in the following circumstances:", ar: "قد نشارك معلوماتك في الظروف التالية:" },
    "With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf": { en: "With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf", ar: "مع البائعين والمستشارين ومقدمي الخدمات الآخرين الذين يحتاجون إلى الوصول إلى هذه المعلومات للقيام بالعمل نيابة عنا" },
    "In response to a request for information if we believe disclosure is in accordance with applicable law": { en: "In response to a request for information if we believe disclosure is in accordance with applicable law", ar: "رداً على طلب للحصول على معلومات إذا كنا نعتقد أن الإفصاح يتوافق مع القانون المعمول به" },
    "If we believe your actions are inconsistent with our user agreements or policies": { en: "If we believe your actions are inconsistent with our user agreements or policies", ar: "إذا كنا نعتقد أن أفعالك لا تتفق مع اتفاقيات المستخدم أو سياساتنا" },
    "To protect the rights, property, and safety of SEYA or others": { en: "To protect the rights, property, and safety of SEYA or others", ar: "لحماية حقوق وممتلكات وسلامة SEYA أو الآخرين" },
    "In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition": { en: "In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition", ar: "فيما يتعلق بـ، أو أثناء المفاوضات بشأن، أي اندماج أو بيع لأصول الشركة أو تمويل أو استحواذ" },
    "With your consent or at your direction": { en: "With your consent or at your direction", ar: "بموافقتك أو بتوجيه منك" },
    "6. Data Security": { en: "6. Data Security", ar: "6. أمن البيانات" },
    "We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.": { en: "We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.", ar: "نحن ننفذ تدابير فنية وتنظيمية مناسبة لحماية أمن معلوماتك الشخصية. ومع ذلك، يرجى ملاحظة أنه لا توجد طريقة للإرسال عبر الإنترنت أو طريقة للتخزين الإلكتروني آمنة بنسبة 100٪." },
    "7. Data Retention": { en: "7. Data Retention", ar: "7. الاحتفاظ بالبيانات" },
    "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.": { en: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.", ar: "نحتفظ بمعلوماتك الشخصية طالما كان ذلك ضرورياً لتحقيق الأغراض الموضحة في سياسة الخصوصية هذه، ما لم يكن هناك حاجة إلى فترة احتفاظ أطول أو يسمح بها القانون." },
    "8. Your Rights": { en: "8. Your Rights", ar: "8. حقوقك" },
    "Depending on your location, you may have certain rights regarding your personal information, including:": { en: "Depending on your location, you may have certain rights regarding your personal information, including:", ar: "بناءً على موقعك، قد يكون لديك حقوق معينة فيما يتعلق بمعلوماتك الشخصية، بما في ذلك:" },
    "The right to access your personal information": { en: "The right to access your personal information", ar: "الحق في الوصول إلى معلوماتك الشخصية" },
    "The right to correct inaccurate or incomplete information": { en: "The right to correct inaccurate or incomplete information", ar: "الحق في تصحيح المعلومات غير الدقيقة أو غير الكاملة" },
    "The right to delete your personal information": { en: "The right to delete your personal information", ar: "الحق في حذف معلوماتك الشخصية" },
    "The right to restrict or object to our processing of your information": { en: "The right to restrict or object to our processing of your information", ar: "الحق في تقييد أو الاعتراض على معالجتنا لمعلوماتك" },
    "The right to data portability": { en: "The right to data portability", ar: "الحق في نقل البيانات" },
    "The right to withdraw consent": { en: "The right to withdraw consent", ar: "الحق في سحب الموافقة" },
    "9. Cookies": { en: "9. Cookies", ar: "9. ملفات تعريف الارتباط" },
    "We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.": { en: "We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.", ar: "نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتتبع النشاط على خدمتنا والاحتفاظ بمعلومات معينة. يمكنك توجيه متصفحك لرفض جميع ملفات تعريف الارتباط أو الإشارة عند إرسال ملف تعريف ارتباط." },
    "10. Children's Privacy": { en: "10. Children's Privacy", ar: "10. خصوصية الأطفال" },
    "Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.": { en: "Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.", ar: "خدمتنا غير مخصصة للأطفال دون سن 13 عاماً. نحن لا نجمع معلومات شخصية عن عمد من الأطفال دون سن 13 عاماً. إذا كنت والداً أو وصياً وتعتقد أن طفلك قد زودنا بمعلومات شخصية، فيرجى الاتصال بنا." },
    "11. Changes to This Privacy Policy": { en: "11. Changes to This Privacy Policy", ar: "11. تغييرات على سياسة الخصوصية هذه" },
    "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date.": { en: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date.", ar: "قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة وتحديث تاريخ \"آخر تحديث\"." },
    "12. Contact Us": { en: "12. Contact Us", ar: "12. اتصل بنا" },
    "If you have any questions about this Privacy Policy, please contact us at privacy@seya.ai": { en: "If you have any questions about this Privacy Policy, please contact us at privacy@seya.ai", ar: "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على privacy@seya.ai" },

    // Terms Page
    "Terms of": { en: "Terms of", ar: "شروط" },
    "Service": { en: "Service", ar: "الخدمة" },
    "1. Acceptance of Terms": { en: "1. Acceptance of Terms", ar: "1. قبول الشروط" },
    "By accessing and using SEYA (\"the Service\"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.": { en: "By accessing and using SEYA (\"the Service\"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.", ar: "من خلال الوصول إلى SEYA (\"الخدمة\") واستخدامها، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على شروط الخدمة هذه، فيرجى عدم استخدام الخدمة." },
    "2. Use License": { en: "2. Use License", ar: "2. ترخيص الاستخدام" },
    "Permission is granted to temporarily access and use the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:": { en: "Permission is granted to temporarily access and use the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:", ar: "يُمنح الإذن للوصول المؤقت واستخدام الخدمة للعرض الشخصي وغير التجاري العابر فقط. هذا منح لترخيص، وليس نقل للملكية، وبموجب هذا الترخيص لا يجوز لك:" },
    "Modify or copy the materials": { en: "Modify or copy the materials", ar: "تعديل أو نسخ المواد" },
    "Use the materials for any commercial purpose or for any public display": { en: "Use the materials for any commercial purpose or for any public display", ar: "استخدام المواد لأي غرض تجاري أو لأي عرض عام" },
    "Attempt to decompile or reverse engineer any software contained in the Service": { en: "Attempt to decompile or reverse engineer any software contained in the Service", ar: "محاولة فك تجميع أو هندسة عكسية لأي برنامج موجود في الخدمة" },
    "Remove any copyright or other proprietary notations from the materials": { en: "Remove any copyright or other proprietary notations from the materials", ar: "إزالة أي حقوق نشر أو تدوينات ملكية أخرى من المواد" },
    "Transfer the materials to another person or \"mirror\" the materials on any other server": { en: "Transfer the materials to another person or \"mirror\" the materials on any other server", ar: "نقل المواد إلى شخص آخر أو \"نسخ\" المواد على أي خادم آخر" },
    "3. User Accounts": { en: "3. User Accounts", ar: "3. حسابات المستخدمين" },
    "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.": { en: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.", ar: "عند إنشاء حساب معنا، يجب عليك تقديم معلومات دقيقة وكاملة وحديثة في جميع الأوقات. يشكل عدم القيام بذلك خرقاً للشروط، مما قد يؤدي إلى الإنهاء الفوري لحسابك على خدمتنا." },
    "You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.": { en: "You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.", ar: "أنت مسؤول عن حماية كلمة المرور التي تستخدمها للوصول إلى الخدمة وعن أي أنشطة أو إجراءات بموجب كلمة المرور الخاصة بك." },
    "4. Content": { en: "4. Content", ar: "4. المحتوى" },
    "Our Service allows you to generate, post, and share content. You are responsible for the content that you generate and share through the Service, including its legality, reliability, and appropriateness.": { en: "Our Service allows you to generate, post, and share content. You are responsible for the content that you generate and share through the Service, including its legality, reliability, and appropriateness.", ar: "تتيح لك خدمتنا إنشاء ونشر ومشاركة المحتوى. أنت مسؤول عن المحتوى الذي تنشئه وتشاركه من خلال الخدمة، بما في ذلك قانونيته وموثوقيته وملاءمته." },
    "By generating and sharing content via the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.": { en: "By generating and sharing content via the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.", ar: "من خلال إنشاء ومشاركة المحتوى عبر الخدمة، فإنك تمنحنا الحق والترخيص لاستخدام وتعديل وأداء وعرض وإعادة إنتاج وتوزيع هذا المحتوى علناً على الخدمة ومن خلالها." },
    "5. Prohibited Uses": { en: "5. Prohibited Uses", ar: "5. الاستخدامات المحظورة" },
    "You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:": { en: "You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:", ar: "لا يجوز لك استخدام الخدمة إلا للأغراض القانونية ووفقاً لهذه الشروط. أنت توافق على عدم استخدام الخدمة:" },
    "In any way that violates any applicable national or international law or regulation": { en: "In any way that violates any applicable national or international law or regulation", ar: "بأي طريقة تنتهك أي قانون أو لائحة وطنية أو دولية معمول بها" },
    "To transmit, or procure the sending of, any advertising or promotional material without our prior written consent": { en: "To transmit, or procure the sending of, any advertising or promotional material without our prior written consent", ar: "لإرسال، أو التسبب في إرسال، أي مواد إعلانية أو ترويجية دون موافقتنا الخطية المسبقة" },
    "To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity": { en: "To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity", ar: "لانتحال صفة الشركة أو موظف في الشركة أو مستخدم آخر أو أي شخص أو كيان آخر أو محاولة انتحال صفتهم" },
    "To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service": { en: "To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service", ar: "للانخراط في أي سلوك آخر يقيد أو يمنع أي شخص من استخدام الخدمة أو الاستمتاع بها" },
    "6. Subscription and Payments": { en: "6. Subscription and Payments", ar: "6. الاشتراك والمدفوعات" },
    "Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you select.": { en: "Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you select.", ar: "يتم إصدار فواتير لبعض أجزاء الخدمة على أساس الاشتراك. ستتم محاسبتك مقدماً على أساس متكرر ودوري. يتم تحديد دورات الفوترة على أساس شهري أو سنوي، اعتماداً على نوع خطة الاشتراك التي تختارها." },
    "A valid payment method is required to process the payment for your subscription. You shall provide accurate and complete billing information.": { en: "A valid payment method is required to process the payment for your subscription. You shall provide accurate and complete billing information.", ar: "مطلوب طريقة دفع صالحة لمعالجة الدفع لاشتراكك. يجب عليك تقديم معلومات فوترة دقيقة وكاملة." },
    "7. Termination": { en: "7. Termination", ar: "7. الإنهاء" },
    "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.": { en: "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.", ar: "يجوز لنا إنهاء أو تعليق حسابك ومنع الوصول إلى الخدمة فوراً، دون إشعار مسبق أو مسؤولية، وفقاً لتقديرنا الخاص، لأي سبب من الأسباب ودون قيد، بما في ذلك على سبيل المثال لا الحصر خرق الشروط." },
    "8. Limitation of Liability": { en: "8. Limitation of Liability", ar: "8. تحديد المسؤولية" },
    "In no event shall SEYA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.": { en: "In no event shall SEYA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.", ar: "لا تتحمل SEYA، ولا مديروها أو موظفوها أو شركاؤها أو وكلاؤها أو موردوها أو الشركات التابعة لها، بأي حال من الأحوال المسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك على سبيل المثال لا الحصر، خسارة الأرباح أو البيانات أو الاستخدام أو الشهرة أو غيرها من الخسائر غير الملموسة." },
    "9. Changes to Terms": { en: "9. Changes to Terms", ar: "9. تغييرات على الشروط" },
    "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms of Service on this page.": { en: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms of Service on this page.", ar: "نحتفظ بالحق، وفقاً لتقديرنا الخاص، في تعديل أو استبدال هذه الشروط في أي وقت. سنقدم إشعاراً بأي تغييرات مهمة عن طريق نشر شروط الخدمة الجديدة على هذه الصفحة." },
    "10. Contact Us": { en: "10. Contact Us", ar: "10. اتصل بنا" },
    "If you have any questions about these Terms, please contact us at support@seya.ai": { en: "If you have any questions about these Terms, please contact us at support@seya.ai", ar: "إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على support@seya.ai" },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = language;
        localStorage.setItem("language", language);
    }, [language]);

    const t = (key: string) => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
