// Lingo.dev Translation Service
// Interfaces with Lingo.dev MCP server for centralized text management

// In-memory cache for translations
const translationCache = {
    en: {},
    ar: {}
};

// Translation database - organized by namespace
// This will be the source of truth until Lingo.dev MCP is fully integrated
const translations = {
    en: {
        // Global
        'global.loading': 'Loading...',
        'global.error': 'Error',
        'global.save': 'Save',
        'global.cancel': 'Cancel',
        'global.close': 'Close',

        // Navbar
        'navbar.home': 'Home',
        'navbar.about': 'About',
        'navbar.demo': 'Live Demo',
        'navbar.profile': 'Profile',
        'navbar.login': 'Login',
        'navbar.signup': 'Sign Up',
        'navbar.vision': 'Vision',
        'navbar.howItWorks': 'How Manara Works',
        'navbar.explore': 'Explore UAE',
        'navbar.essentials': 'Essential Visit Places',
        'navbar.logoText': 'Multi-Agent Adaptive Navigation & Accessible Route Assistant',

        // Hero
        'hero.title': 'When the city changes,',
        'hero.titleHighlight': 'your plan changes.',
        'hero.subtitle': 'ATLAS adapts your day in real-time using live heat, crowd, and event data across the UAE.',
        'hero.cta': 'See It Live',

        // About
        'about.title': 'Built for the UAE.',
        'about.titleSuffix': 'By Design.',
        'about.inclusion.label': 'National Goal 01',
        'about.inclusion.title': 'Inclusion is',
        'about.inclusion.titleHighlight': 'Default.',
        'about.inclusion.description': 'A digital system that adapts to age, ability, and needs—guaranteed by Federal Law.',
        'about.sustainability.label': 'National Goal 02',
        'about.sustainability.title': 'Sustainable is',
        'about.sustainability.titleHighlight': 'Smart.',
        'about.sustainability.description': 'AI that reduces emissions, optimizes routes, and supports the UAE\'s green growth targets.',
        'about.list.0.title': 'Universal Design',
        'about.list.0.desc': 'Zero-friction interfaces for every citizen.',
        'about.list.1.title': 'Heat-Aware Routing',
        'about.list.1.desc': 'Protecting vulnerable groups from extreme weather.',
        'about.list.2.title': 'No One Left Behind',
        'about.list.2.desc': 'From families to People of Determination.',

        // Live Demo
        'liveDemo.title': 'See MANARA',
        'liveDemo.titleHighlight': 'adapt a day',
        'liveDemo.titleSuffix': 'in real time.',
        'liveDemo.subtitle': 'Live data drives the plan. Chat with ATLAS to fine-tune.',
        'liveDemo.liveConnect': 'Live Connect',
        'liveDemo.temp': 'Temp',
        'liveDemo.crowdDensity': 'Crowd Density',

        // Live Demo - Preferences
        'liveDemo.preferences.title': 'General Preferences',
        'liveDemo.preferences.city': 'Touring City',
        'liveDemo.preferences.travelerType': 'Traveler Type',
        'liveDemo.preferences.costPreference': 'Cost Preference',

        // Live Demo - Family & Accessibility
        'liveDemo.family.title': 'Family & Accessibility',
        'liveDemo.family.adults': 'Adults',
        'liveDemo.family.children': 'Children',
        'liveDemo.family.pod': 'People of Determination?',
        'liveDemo.family.podInfo': 'ATLAS prioritizes accessible, low-strain activities and routes.',
        'liveDemo.family.summary': 'Party: {adults} Adults · {children} Children · PoD: {pod}',
        'liveDemo.family.warning': 'Add travelers to generate plan.',

        // Live Demo - Metrics
        'liveDemo.metrics.dayCost': 'Est. Day Cost',
        'liveDemo.metrics.perPerson': '/ person',
        'liveDemo.metrics.heatExposure': 'Heat Exposure',
        'liveDemo.metrics.minimized': '↓ Minimized',
        'liveDemo.metrics.normal': 'Normal',
        'liveDemo.metrics.saveItinerary': 'Save Itinerary',

        // Live Demo - Timeline
        'liveDemo.timeline.morning': 'Morning',
        'liveDemo.timeline.midday': 'Midday',
        'liveDemo.timeline.afternoon': 'Afternoon',
        'liveDemo.timeline.evening': 'Evening',
        'liveDemo.timeline.adapted': 'ADAPTED',
        'liveDemo.timeline.alternative': 'Alternative',
        'liveDemo.timeline.clickToSwap': 'Click to Swap',

        // Live Demo - AI Assistant
        'liveDemo.assistant.title': 'ATLAS Assistant',
        'liveDemo.assistant.subtitle': 'Ask to adjust your day in plain language',
        'liveDemo.assistant.placeholder': 'Type a request (e.g., \'Swap morning and evening\' or \'Add Ferrari World\')...',
        'liveDemo.assistant.greeting': 'Hello! I am ATLAS. I have optimized your plan. Ask me to "Swap morning/evening", "Add Louvre", or "Avoid heat".',

        // Save Modal
        'saveModal.title': 'Save Itinerary',
        'saveModal.description': 'Give your trip a name to find it easily later.',
        'saveModal.tripTitle': 'Trip Title',
        'saveModal.cancel': 'Cancel',
        'saveModal.save': 'Save Plan',
        'saveModal.saved': 'Saved!',
        'saveModal.viewProfile': 'View in Profile',

        // Footer
        'footer.slogan': 'Adaptive Tourism & Logistics Autonomy System',
        'footer.rights': 'All rights reserved.',

        // Cost Options
        'cost.budget': 'Budget',
        'cost.balanced': 'Balanced',
        'cost.premium': 'Premium',

        // Profile
        'profile.title': 'Start Your',
        'profile.titleHighlight': 'Journey',
        'profile.subtitle': 'Sign in to optimize your UAE experience, save custom itineraries, and get real-time adaptations.',
        'profile.tab.itineraries': 'Saved Itineraries',
        'profile.tab.places': 'Saved Places',
        'profile.tab.cuisines': 'Saved Cuisines',
        'profile.tab.settings': 'Preferences',
        'profile.empty.title': 'No Saved Itineraries',
        'profile.empty.description': 'Create your first smart itinerary in the Live Demo section.',
        'profile.empty.cta': 'Create Itinerary',
        'profile.emptyPlaces.title': 'No Saved Places',
        'profile.emptyPlaces.description': 'Save interesting places from your itineraries or the Explore section.',
        'profile.emptyPlaces.cta': 'Explore Places',

        // Auth
        'auth.login': 'Login',
        'auth.signup': 'Sign Up',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.name': 'Name',
        'auth.submit': 'Continue',
        'auth.switch.login': 'Already have an account? Login',
        'auth.switch.signup': 'Need an account? Sign Up',

        // Essentials
        'essentials.title': 'Essential',
        'essentials.titleHighlight': 'Visit Places',
        'essentials.subtitle': 'Curated top spots across the Emirates.',
        'essentials.book': 'Book Now',
        'essentials.addToProfile': 'Add to Profile',
        'essentials.added': 'Added!',
        'essentials.loginRequired': 'Login to save items',

        // Traveler Types
        'traveler.family': 'Family',
        'traveler.solo': 'Solo Explorer',
        'traveler.culture': 'Culture Seekers',
        'traveler.luxury': 'Luxury / VIP',

        // Yes/No
        'common.yes': 'Yes',
        'common.no': 'No',

        // Footer (expanded)
        'footer.tagline': '"When the city changes, your plan changes."',
        'footer.vision': 'Vision',
        'footer.system': 'System',
        'footer.liveDemo': 'Live Demo',
        'footer.privacy': 'Privacy & Governance',
        'footer.description': 'A concept system for adaptive, human-centered tourism across the United Arab Emirates.',
        'footer.designed': 'Designed for scale, resilience, and real-world conditions.',
        'footer.copyright': '© 2026 MANARA System.',

        // Vision
        'vision.title': 'A System',
        'vision.titleHighlight': 'Built for Reality.',
        'vision.subtitle': 'MANARA isn\'t a prototype. It\'s designed for the complexity of real cities.',

        // How It Works
        'howItWorks.title': 'How MANARA',
        'howItWorks.titleHighlight': 'Works',
        'howItWorks.subtitle': 'A multi-agent system that adapts tourism in real-time.',
        'howItWorks.cta': 'Experience it Live',
        'howItWorks.step1.title': 'Sense the City',
        'howItWorks.step1.desc': 'MANARA continuously monitors heat, crowds, and major events across every emirate.',
        'howItWorks.step1.tags': 'Heat, Crowds, Events',
        'howItWorks.step1.example': '⚠ Alert: 42°C in Downtown Dubai',
        'howItWorks.step2.title': 'Understand the Traveler',
        'howItWorks.step2.desc': 'Your preferences—family needs, indoor-first, or luxury—shape the engine\'s logic.',
        'howItWorks.step2.tags': 'Family, Culture, Comfort',
        'howItWorks.step2.example': '✓ Preference: Indoor activities preferred',
        'howItWorks.step3.title': 'Adapt the Day',
        'howItWorks.step3.desc': 'When conditions shift, ATLAS quietly triggers a re-route and explains why.',
        'howItWorks.step3.tags': 'Reroute, Notify, Approve',
        'howItWorks.step3.example': '➜ Moved outdoor activity to evening.',

        // Cities
        'city.dubai': 'Dubai',
        'city.abudhabi': 'Abu Dhabi',
        'city.sharjah': 'Sharjah',
        'city.ajman': 'Ajman',

        // Run Button
        'button.runAtlas': 'Run ATLAS'
    },
    ar: {
        // Global
        'global.loading': 'جاري التحميل...',
        'global.error': 'خطأ',
        'global.save': 'حفظ',
        'global.cancel': 'إلغاء',
        'global.close': 'إغلاق',

        // Navbar
        'navbar.home': 'الرئيسية',
        'navbar.about': 'حول',
        'navbar.demo': 'عرض مباشر',
        'navbar.profile': 'الملف الشخصي',
        'navbar.login': 'تسجيل الدخول',
        'navbar.signup': 'إنشاء حساب',
        'navbar.vision': 'الرؤية',
        'navbar.howItWorks': 'كيف يعمل منارة',
        'navbar.explore': 'استكشف الإمارات',
        'navbar.essentials': 'أماكن الزيارة الأساسية',
        'navbar.logoText': 'الملاحة التكيفية متعددة الوكلاء ومساعد الطريق الميسر',

        // Hero
        'hero.title': 'عندما تتغير المدينة،',
        'hero.titleHighlight': 'تتغير خطتك.',
        'hero.subtitle': 'يتكيف أطلس مع يومك في الوقت الفعلي باستخدام بيانات الحرارة والازدحام والفعاليات المباشرة في جميع أنحاء الإمارات.',
        'hero.cta': 'شاهد مباشرة',

        // How It Works
        // How It Works
        'howItWorks.title': 'نظام بسيط،',
        'howItWorks.titleHighlight': 'يعمل في الخلفية.',
        'howItWorks.step1.title': 'استشعار المدينة',
        'howItWorks.step1.desc': 'يراقب منارة الحرارة والازدحام والفعاليات الكبرى عبر كل إمارة.',
        'howItWorks.step1.tags': 'حرارة, ازدحام, فعاليات',
        'howItWorks.step1.example': '⚠ تنبيه: 42°C في وسط دبي',
        'howItWorks.step2.title': 'تحليل الخيارات',
        'howItWorks.step2.desc': 'يقوم الذكاء الاصطناعي بتصفية الأماكن بناءً على تفضيلاتك وظروف الوقت الفعلي.',
        'howItWorks.step2.tags': 'تصفية ذكية, مطابقة, راحة',
        'howItWorks.step2.example': '✔ البديل: متحف المستقبل (داخلي)',
        'howItWorks.step3.title': 'توجيه رحلتك',
        'howItWorks.step3.desc': 'يتم إنشاء خطة ديناميكية تتكيف تلقائيًا إذا تغيرت الظروف.',
        'howItWorks.step3.tags': 'توجيه, تكيف, تنبيه',
        'howItWorks.step3.example': '⟳ تم التحديث: تجنب الازدحام',
        'howItWorks.cta': 'جرب النظام',

        // About
        'about.title': 'مصمم للإمارات.',
        'about.titleSuffix': 'بكل إتقان.',
        'about.inclusion.label': 'الهدف الوطني 01',
        'about.inclusion.title': 'الشمولية',
        'about.inclusion.titleHighlight': 'المطلقة.',
        'about.inclusion.description': 'نظام رقمي يتكيف مع العمر والقدرة والاحتياجات - مضمون بموجب القانون الاتحادي.',
        'about.sustainability.label': 'الهدف الوطني 02',
        'about.sustainability.title': 'الاستدامة',
        'about.sustainability.titleHighlight': 'الذكية.',
        'about.sustainability.description': 'ذكاء اصطناعي يقلل الانبعاثات ويحسن المسارات ويدعم أهداف النمو الأخضر للإمارات.',
        'about.list.0.title': 'التصميم الشامل',
        'about.list.0.desc': 'واجهات خالية من الاحتكاك لكل مواطن.',
        'about.list.1.title': 'التوجيه مع الوعي بالحرارة',
        'about.list.1.desc': 'حماية الفئات الضعيفة من الطقس القاسي.',
        'about.list.2.title': 'لا أحد يتخلف عن الركب',
        'about.list.2.desc': 'من العائلات إلى أصحاب الهمم.',

        // Live Demo
        'liveDemo.title': 'شاهد منارة',
        'liveDemo.titleHighlight': 'تتكيف مع يوم',
        'liveDemo.titleSuffix': 'في الوقت الفعلي.',
        'liveDemo.subtitle': 'البيانات المباشرة تقود الخطة. تحدث مع أطلس للضبط الدقيق.',
        'liveDemo.liveConnect': 'اتصال مباشر',
        'liveDemo.temp': 'الحرارة',
        'liveDemo.crowdDensity': 'كثافة الازدحام',

        // Live Demo - Preferences
        'liveDemo.preferences.title': 'التفضيلات العامة',
        'liveDemo.preferences.city': 'المدينة السياحية',
        'liveDemo.preferences.travelerType': 'نوع المسافر',
        'liveDemo.preferences.costPreference': 'تفضيل التكلفة',

        // Live Demo - Family & Accessibility
        'liveDemo.family.title': 'العائلة وإمكانية الوصول',
        'liveDemo.family.adults': 'البالغون',
        'liveDemo.family.children': 'الأطفال',
        'liveDemo.family.pod': 'أصحاب الهمم؟',
        'liveDemo.family.podInfo': 'يعطي أطلس الأولوية للأنشطة والطرق الميسرة وقليلة الإجهاد.',
        'liveDemo.family.summary': 'المجموعة: {adults} بالغ · {children} طفل · أصحاب الهمم: {pod}',
        'liveDemo.family.warning': 'أضف مسافرين لإنشاء خطة.',

        // Live Demo - Metrics
        'liveDemo.metrics.dayCost': 'التكلفة المقدرة لليوم',
        'liveDemo.metrics.perPerson': '/ للشخص',
        'liveDemo.metrics.heatExposure': 'التعرض للحرارة',
        'liveDemo.metrics.minimized': '↓ مخفض',
        'liveDemo.metrics.normal': 'عادي',
        'liveDemo.metrics.saveItinerary': 'حفظ الخطة',

        // Live Demo - Timeline
        'liveDemo.timeline.morning': 'الصباح',
        'liveDemo.timeline.midday': 'الظهيرة',
        'liveDemo.timeline.afternoon': 'بعد الظهر',
        'liveDemo.timeline.evening': 'المساء',
        'liveDemo.timeline.adapted': 'متكيف',
        'liveDemo.timeline.alternative': 'البديل',
        'liveDemo.timeline.clickToSwap': 'انقر للتبديل',

        // Live Demo - AI Assistant
        'liveDemo.assistant.title': 'مساعد أطلس',
        'liveDemo.assistant.subtitle': 'اطلب تعديل يومك بلغة بسيطة',
        'liveDemo.assistant.placeholder': 'اكتب طلبًا (مثل "بدّل الصباح والمساء" أو "أضف عالم فيراري")...',
        'liveDemo.assistant.greeting': 'مرحبًا! أنا أطلس. لقد قمت بتحسين خطتك. اطلب مني "تبديل الصباح/المساء" أو "إضافة اللوفر" أو "تجنب الحرارة".',

        // Save Modal
        'saveModal.title': 'حفظ الخطة',
        'saveModal.description': 'أعط رحلتك اسمًا للعثور عليها بسهولة لاحقًا.',
        'saveModal.tripTitle': 'عنوان الرحلة',
        'saveModal.cancel': 'إلغاء',
        'saveModal.save': 'حفظ الخطة',
        'saveModal.saved': 'تم الحفظ!',
        'saveModal.viewProfile': 'عرض في الملف الشخصي',

        // Profile
        'profile.title': 'ابدأ',
        'profile.titleHighlight': 'رحلتك',
        'profile.subtitle': 'سجل الدخول لتحسين تجربتك في الإمارات، وحفظ خطط مخصصة، والحصول على تعديلات في الوقت الفعلي.',
        'profile.tab.itineraries': 'الخطط المحفوظة',
        'profile.tab.places': 'الأماكن المحفوظة',
        'profile.tab.cuisines': 'المأكولات المحفوظة',
        'profile.tab.settings': 'التفضيلات',
        'profile.empty.title': 'لا توجد خطط محفوظة',
        'profile.empty.description': 'أنشئ أول خطة ذكية لك في قسم العرض المباشر.',
        'profile.empty.cta': 'إنشاء خطة',
        'profile.emptyPlaces.title': 'لا توجد أماكن محفوظة',
        'profile.emptyPlaces.description': 'احفظ أماكن مثيرة للاهتمام من خططك أو قسم الاستكشاف.',
        'profile.emptyPlaces.cta': 'استكشاف الأماكن',

        // Auth
        'auth.login': 'تسجيل الدخول',
        'auth.signup': 'إنشاء حساب',
        'auth.email': 'البريد الإلكتروني',
        'auth.password': 'كلمة المرور',
        'auth.name': 'الاسم',
        'auth.submit': 'متابعة',
        'auth.switch.login': 'لديك حساب بالفعل؟ تسجيل الدخول',
        'auth.switch.signup': 'تحتاج إلى حساب؟ إنشاء حساب',

        // Essentials
        'essentials.title': 'أماكن الزيارة',
        'essentials.titleHighlight': 'الأساسية',
        'essentials.subtitle': 'أفضل الأماكن المختارة بعناية في جميع أنحاء الإمارات.',
        'essentials.book': 'احجز الآن',
        'essentials.addToProfile': 'أضف إلى الملف الشخصي',
        'essentials.added': 'تمت الإضافة!',
        'essentials.loginRequired': 'سجل الدخول لحفظ العناصر',

        // Footer (expanded)
        'footer.slogan': 'نظام الاستقلالية للسياحة والخدمات اللوجستية التكيفي',
        'footer.tagline': '"عندما تتغير المدينة، تتغير خطتك."',
        'footer.vision': 'الرؤية',
        'footer.system': 'النظام',
        'footer.liveDemo': 'عرض مباشر',
        'footer.privacy': 'الخصوصية والحوكمة',
        'footer.description': 'نظام مفاهيمي للسياحة التكيفية التي تركز على الإنسان في جميع أنحاء الإمارات العربية المتحدة.',
        'footer.designed': 'مصمم للتوسع والمرونة والظروف الواقعية.',
        'footer.copyright': '© 2026 نظام منارة.',
        'footer.rights': 'جميع الحقوق محفوظة.',

        // Vision
        'vision.title': 'نظام',
        'vision.titleHighlight': 'مبني للواقع.',
        'vision.subtitle': 'منارة ليست نموذجًا أوليًا. إنها مصممة لتعقيد المدن الحقيقية.',

        // How It Works
        'howItWorks.title': 'كيف تعمل',
        'howItWorks.titleHighlight': 'منارة',
        'howItWorks.subtitle': 'نظام متعدد الوكلاء يتكيف مع السياحة في الوقت الفعلي.',
        'howItWorks.cta': 'جربه مباشرة',
        'howItWorks.step1.title': 'استشعار المدينة',
        'howItWorks.step1.desc': 'يراقب منارة باستمرار الحرارة والازدحام والفعاليات الرئيسية في كل إمارة.',
        'howItWorks.step1.tags': 'الحرارة، الازدحام، الفعاليات',
        'howItWorks.step1.example': '⚠ تنبيه: 42°C في وسط مدينة دبي',
        'howItWorks.step2.title': 'فهم المسافر',
        'howItWorks.step2.desc': 'تفضيلاتك - احتياجات العائلة، أو الأماكن المغلقة أولاً، أو الفخامة - تشكل منطق المحرك.',
        'howItWorks.step2.tags': 'العائلة، الثقافة، الراحة',
        'howItWorks.step2.example': '✓ التفضيل: الأنشطة الداخلية مفضلة',
        'howItWorks.step3.title': 'تكييف اليوم',
        'howItWorks.step3.desc': 'عندما تتغير الظروف، يقوم أطلس بهدوء بتغيير المسار وشرح السبب.',
        'howItWorks.step3.tags': 'إعادة التوجيه، إشعار، موافقة',
        'howItWorks.step3.example': '➜ تم نقل النشاط الخارجي للمساء.',

        // Cost Options
        'cost.budget': 'اقتصادي',
        'cost.balanced': 'متوازن',
        'cost.premium': 'فاخر',

        // Traveler Types
        'traveler.family': 'عائلة',
        'traveler.solo': 'مستكشف منفرد',
        'traveler.culture': 'باحثون عن الثقافة',
        'traveler.luxury': 'فاخر / VIP',

        // Yes/No
        'common.yes': 'نعم',
        'common.no': 'لا',

        // Cities
        'city.dubai': 'دبي',
        'city.abudhabi': 'أبوظبي',
        'city.sharjah': 'الشارقة',
        'city.ajman': 'عجمان',

        // Run Button
        'button.runAtlas': 'تشغيل أطلس'
    }
};

/**
 * Get translation for a given key and language
 * @param {string} key - Translation key (dot notation supported)
 * @param {string} language - Language code (en, ar)
 * @returns {string} Translated string or key if not found
 */
export const getTranslation = (key, language = 'en', variables = null) => {
    // Check cache first
    let translation = translationCache[language]?.[key];

    if (!translation) {
        // Get from local translations database
        translation = translations[language]?.[key];

        // Fallback to English if Arabic translation missing
        if (!translation && language === 'ar') {
            translation = translations.en[key];
        }

        // Cache the raw translation if found
        if (translation) {
            translationCache[language][key] = translation;
        }
    }

    if (!translation) {
        console.warn(`Translation missing for key: ${key} (${language})`);
        return key;
    }

    // Apply variable substitution if variables provided
    if (variables) {
        return formatTranslation(translation, variables);
    }

    return translation;
};

/**
 * Format translation with variables
 * @param {string} translation - Translation string with {variable} placeholders
 * @param {object} variables - Object with variable values
 * @returns {string} Formatted string
 */
export const formatTranslation = (translation, variables = {}) => {
    return translation.replace(/\{(\w+)\}/g, (match, key) => {
        return variables[key] !== undefined ? variables[key] : match;
    });
};

/**
 * Clear translation cache (useful for development/testing)
 */
export const clearCache = () => {
    translationCache.en = {};
    translationCache.ar = {};
};

/**
 * Preload translations for a language
 * @param {string} language - Language code
 */
export const preloadLanguage = (language) => {
    if (!translations[language]) return;

    Object.keys(translations[language]).forEach(key => {
        translationCache[language][key] = translations[language][key];
    });
};

// Preload English on initialization
preloadLanguage('en');
