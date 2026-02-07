// AILogic.js
// core logic for ATLAS Smart Itinerary & AI Assistant

// --- ENHANCED ACTIVITY DATABASE ---
// Tags: Family, Culture, VIP, Nature, Thrill, Relaxation, Shopping
// Time: Morning, Midday, Afternoon, Evening
// Accessibility: { wheelchair: true/false, sensoryFriendly: true/false }

export const ACTIVITY_DB = [
    // --- DUBAI ---
    {
        id: 'dxb_fahidi',
        name: 'Al Fahidi Walking Tour',
        city: 'Dubai',
        desc: 'Wander through historic wind-tower laneways.',
        cost: 0,
        val: 0,
        type: 'Outdoor',
        tags: ['Culture', 'History'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: false, sensory: true }, // Cobblestones
        timeSlots: ['Morning', 'Afternoon'], // Avoid midday heat
        duration: 2,
        intensity: 'Medium'
    },
    {
        id: 'dxb_museum_future',
        name: 'Museum of the Future',
        city: 'Dubai',
        desc: 'Journey to 2071 in an indoor architectural icon.',
        cost: 145,
        val: 145,
        type: 'Indoor',
        tags: ['Future', 'Culture', 'Indoor'],
        familyFriendly: true,
        minAge: 4,
        accessibility: { wheelchair: true, sensory: false }, // Loud/Bright
        timeSlots: ['Morning', 'Midday', 'Afternoon'],
        duration: 3,
        intensity: 'Low'
    },
    {
        id: 'dxb_burj_khalifa',
        name: 'Burj Khalifa (At The Top)',
        city: 'Dubai',
        desc: 'Views from the world\'s tallest tower.',
        cost: 170,
        val: 170,
        type: 'Indoor',
        tags: ['Views', 'Iconic', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon', 'Evening'],
        duration: 2,
        intensity: 'Low'
    },
    {
        id: 'dxb_mall_aquarium',
        name: 'Dubai Mall Aquarium',
        city: 'Dubai',
        desc: 'Underwater tunnel and marine zoo experience.',
        cost: 120,
        val: 120,
        type: 'Indoor',
        tags: ['Family', 'Nature', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon', 'Evening'],
        duration: 2,
        intensity: 'Low'
    },
    {
        id: 'dxb_creek_abra',
        name: 'Dubai Creek Abra Ride',
        city: 'Dubai',
        desc: 'Traditional boat ride across the creek.',
        cost: 2,
        val: 2,
        type: 'Outdoor',
        tags: ['Culture', 'Views', 'Outdoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: false, sensory: true }, // Steps to boat
        timeSlots: ['Morning', 'Afternoon', 'Evening'], // Hot midday
        duration: 1,
        intensity: 'Low'
    },
    {
        id: 'dxb_desert_safari',
        name: 'Desert Safari & BBQ',
        city: 'Dubai',
        desc: 'Dune bashing and dinner under stars.',
        cost: 150,
        val: 150,
        type: 'Outdoor',
        tags: ['Adventure', 'Nature', 'Dinner'],
        familyFriendly: true,
        minAge: 5, // Bumpy
        accessibility: { wheelchair: false, sensory: false }, // Sand/Bumps
        timeSlots: ['Afternoon', 'Evening'],
        duration: 6,
        intensity: 'High'
    },
    {
        id: 'dxb_la_perle',
        name: 'La Perle Show',
        city: 'Dubai',
        desc: 'World-class aqua acrobatics theatre.',
        cost: 250,
        val: 250,
        type: 'Indoor',
        tags: ['Show', 'Indoor', 'Evening'],
        familyFriendly: true,
        minAge: 2,
        accessibility: { wheelchair: true, sensory: false }, // Loud
        timeSlots: ['Evening'],
        duration: 2,
        intensity: 'Low'
    },
    {
        id: 'dxb_frame',
        name: 'Dubai Frame',
        city: 'Dubai',
        desc: 'Views of old and new Dubai.',
        cost: 50,
        val: 50,
        type: 'Indoor',
        tags: ['Views', 'Iconic', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon'],
        duration: 1.5,
        intensity: 'Low'
    },
    {
        id: 'dxb_miracle_garden',
        name: 'Miracle Garden',
        city: 'Dubai',
        desc: 'World\'s largest natural flower garden.',
        cost: 75,
        val: 75,
        type: 'Outdoor',
        tags: ['Nature', 'Family', 'Outdoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Afternoon'], // Hot midday
        duration: 2,
        intensity: 'Medium'
    },

    // --- ABU DHABI ---
    {
        id: 'auh_grand_mosque',
        name: 'Sheikh Zayed Mosque',
        city: 'Abu Dhabi',
        desc: 'Majestic white marble architectural masterpiece.',
        cost: 0,
        val: 0,
        type: 'Indoor', // Mostly covered/AC options but walk is outdoor-ish
        tags: ['Culture', 'Iconic', 'Respect'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Afternoon', 'Evening'], // Closed fri am
        duration: 2,
        intensity: 'Medium' // Long walk
    },
    {
        id: 'auh_louvre',
        name: 'Louvre Abu Dhabi',
        city: 'Abu Dhabi',
        desc: 'World-class art under a floating dome.',
        cost: 63,
        val: 63,
        type: 'Indoor',
        tags: ['Art', 'Culture', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon', 'Evening'],
        duration: 3,
        intensity: 'Low'
    },
    {
        id: 'auh_ferrari_world',
        name: 'Ferrari World',
        city: 'Abu Dhabi',
        desc: 'Home to the world\'s fastest rollercoaster.',
        cost: 310,
        val: 310,
        type: 'Indoor',
        tags: ['Thrill', 'Family', 'Indoor'],
        familyFriendly: true,
        minAge: 3,
        accessibility: { wheelchair: true, sensory: false }, // Loud/Fast
        timeSlots: ['Midday', 'Afternoon', 'Evening'],
        duration: 4,
        intensity: 'Medium'
    },
    {
        id: 'auh_qasr_watan',
        name: 'Qasr Al Watan',
        city: 'Abu Dhabi',
        desc: 'Tour the majestic presidential palace.',
        cost: 65,
        val: 65,
        type: 'Indoor',
        tags: ['Culture', 'History', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon'],
        duration: 2,
        intensity: 'Low'
    },
    {
        id: 'auh_mangroves',
        name: 'Mangrove Kayaking',
        city: 'Abu Dhabi',
        desc: 'Paddle through serene natural channels.',
        cost: 160,
        val: 160,
        type: 'Outdoor',
        tags: ['Nature', 'Active', 'Outdoor'],
        familyFriendly: true,
        minAge: 6,
        accessibility: { wheelchair: false, sensory: true },
        timeSlots: ['Morning', 'Afternoon'], // Tide/Heat dependent
        duration: 2,
        intensity: 'High'
    },
    {
        id: 'auh_warnerbros',
        name: 'Warner Bros. World',
        city: 'Abu Dhabi',
        desc: 'Fully indoor theme park with characters.',
        cost: 310,
        val: 310,
        type: 'Indoor',
        tags: ['Family', 'Fun', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: false },
        timeSlots: ['Midday', 'Afternoon'],
        duration: 4,
        intensity: 'Medium'
    },

    // --- SHARJAH ---
    {
        id: 'shj_rain_room',
        name: 'Rain Room',
        city: 'Sharjah',
        desc: 'Walk through rain without getting wet.',
        cost: 25,
        val: 25,
        type: 'Indoor',
        tags: ['Art', 'Unique', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon', 'Evening'],
        duration: 1,
        intensity: 'Low'
    },
    {
        id: 'shj_al_noor',
        name: 'Al Noor Island',
        city: 'Sharjah',
        desc: 'Butterfly house and light sculptures.',
        cost: 35,
        val: 35,
        type: 'Outdoor',
        tags: ['Nature', 'Art', 'Outdoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Afternoon', 'Evening'],
        duration: 2,
        intensity: 'Low'
    },
    {
        id: 'shj_museum_islamic',
        name: 'Museum of Islamic Civ.',
        city: 'Sharjah',
        desc: 'Thousands of Islamic artifacts.',
        cost: 10,
        val: 10,
        type: 'Indoor',
        tags: ['History', 'Culture', 'Indoor'],
        familyFriendly: true,
        minAge: 5,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon'],
        duration: 2,
        intensity: 'Low'
    },

    // --- RAS AL KHAIMAH ---
    {
        id: 'rak_jebel_jais',
        name: 'Jebel Jais Viewing Deck',
        city: 'Ras Al Khaimah',
        desc: 'Views from the UAE\'s highest peak.',
        cost: 5,
        val: 5,
        type: 'Outdoor',
        tags: ['Nature', 'Views', 'Outdoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Afternoon'],
        duration: 3,
        intensity: 'Low' // Drive + View
    },
    {
        id: 'rak_zipline',
        name: 'Jais Flight Zipline',
        city: 'Ras Al Khaimah',
        desc: 'World\'s longest zipline experience.',
        cost: 450,
        val: 450,
        type: 'Outdoor',
        tags: ['Adventure', 'Thrill', 'Outdoor'],
        familyFriendly: false, // Age/Height restrictions
        minAge: 12,
        accessibility: { wheelchair: false, sensory: false },
        timeSlots: ['Morning', 'Afternoon'],
        duration: 2,
        intensity: 'High'
    },
    {
        id: 'rak_dhayah_fort',
        name: 'Dhayah Fort',
        city: 'Ras Al Khaimah',
        desc: 'Historic hilltop fort with panoramic views.',
        cost: 0,
        val: 0,
        type: 'Outdoor',
        tags: ['History', 'Views', 'Outdoor'],
        familyFriendly: true,
        minAge: 5,
        accessibility: { wheelchair: false, sensory: true }, // Stairs
        timeSlots: ['Morning', 'Afternoon'],
        duration: 1.5,
        intensity: 'High' // Stairs
    }

];

export const ACTIVITY_DB_AR = [
    // --- DUBAI ---
    {
        id: 'dxb_fahidi',
        name: 'جولة الفهيدي التاريخية',
        city: 'Dubai', // Keep city IDs in English for logic, or map them? Logic uses context.city which comes from UI. UI city needs to be mapped. Best to keep IDs English.
        desc: 'تجول في أزقة البراجيل التاريخية القديمة.',
        cost: 0,
        val: 0,
        type: 'Outdoor',
        tags: ['Culture', 'History'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: false, sensory: true },
        timeSlots: ['Morning', 'Afternoon'],
        duration: 2,
        intensity: 'Medium'
    },
    {
        id: 'dxb_museum_future',
        name: 'متحف المستقبل',
        city: 'Dubai',
        desc: 'رحلة إلى عام 2071 في أيقونة معمارية هندسية.',
        cost: 145,
        val: 145,
        type: 'Indoor',
        tags: ['Future', 'Culture', 'Indoor'],
        familyFriendly: true,
        minAge: 4,
        accessibility: { wheelchair: true, sensory: false },
        timeSlots: ['Morning', 'Midday', 'Afternoon'],
        duration: 3,
        intensity: 'Low'
    },
    {
        id: 'dxb_burj_khalifa',
        name: 'برج خليفة (القمة)',
        city: 'Dubai',
        desc: 'إطلالات من أطول برج في العالم.',
        cost: 170,
        val: 175,
        type: 'Indoor',
        tags: ['Views', 'Iconic', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon', 'Evening'],
        duration: 2,
        intensity: 'Low'
    },
    {
        id: 'dxb_mall_aquarium',
        name: 'أكواريوم دبي مول',
        city: 'Dubai',
        desc: 'نفق تحت الماء وحديقة حيوانات بحرية.',
        cost: 120,
        val: 120,
        type: 'Indoor',
        tags: ['Family', 'Nature', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon', 'Evening'],
        duration: 2,
        intensity: 'Low'
    },
    {
        id: 'dxb_creek_abra',
        name: 'ركوب العبرة في الخور',
        city: 'Dubai',
        desc: 'جولة بقارب تقليدي عبر خور دبي.',
        cost: 2,
        val: 2,
        type: 'Outdoor',
        tags: ['Culture', 'Views', 'Outdoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: false, sensory: true },
        timeSlots: ['Morning', 'Afternoon', 'Evening'],
        duration: 1,
        intensity: 'Low'
    },
    {
        id: 'dxb_desert_safari',
        name: 'سفاري الصحراء وعشاء',
        city: 'Dubai',
        desc: 'قيادة في الكثبان الرملية وعشاء تحت النجوم.',
        cost: 150,
        val: 150,
        type: 'Outdoor',
        tags: ['Adventure', 'Nature', 'Dinner'],
        familyFriendly: true,
        minAge: 5,
        accessibility: { wheelchair: false, sensory: false },
        timeSlots: ['Afternoon', 'Evening'],
        duration: 6,
        intensity: 'High'
    },
    {
        id: 'dxb_la_perle',
        name: 'عرض لا بيرل',
        city: 'Dubai',
        desc: 'مسرح مائي عالمي للألعاب البهلوانية.',
        cost: 250,
        val: 250,
        type: 'Indoor',
        tags: ['Show', 'Indoor', 'Evening'],
        familyFriendly: true,
        minAge: 2,
        accessibility: { wheelchair: true, sensory: false },
        timeSlots: ['Evening'],
        duration: 2,
        intensity: 'Low'
    },
    {
        id: 'dxb_frame',
        name: 'برواز دبي',
        city: 'Dubai',
        desc: 'إطلالات على دبي القديمة والحديثة.',
        cost: 50,
        val: 50,
        type: 'Indoor',
        tags: ['Views', 'Iconic', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon'],
        duration: 1.5,
        intensity: 'Low'
    },
    {
        id: 'dxb_miracle_garden',
        name: 'الحديقة المعجزة',
        city: 'Dubai',
        desc: 'أكبر حديقة زهور طبيعية في العالم.',
        cost: 75,
        val: 75,
        type: 'Outdoor',
        tags: ['Nature', 'Family', 'Outdoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Afternoon'],
        duration: 2,
        intensity: 'Medium'
    },
    // --- ABU DHABI ---
    {
        id: 'auh_grand_mosque',
        name: 'جامع الشيخ زايد الكبير',
        city: 'Abu Dhabi',
        desc: 'تحفة معمارية من الرخام الأبيض.',
        cost: 0,
        val: 0,
        type: 'Indoor',
        tags: ['Culture', 'Iconic', 'Respect'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Afternoon', 'Evening'],
        duration: 2,
        intensity: 'Medium'
    },
    {
        id: 'auh_louvre',
        name: 'اللوفر أبوظبي',
        city: 'Abu Dhabi',
        desc: 'فن عالمي تحت قبة عائمة.',
        cost: 63,
        val: 63,
        type: 'Indoor',
        tags: ['Art', 'Culture', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon', 'Evening'],
        duration: 3,
        intensity: 'Low'
    },
    {
        id: 'auh_ferrari_world',
        name: 'عالم فيراري',
        city: 'Abu Dhabi',
        desc: 'موطن أسرع أفعوانية في العالم.',
        cost: 310,
        val: 310,
        type: 'Indoor',
        tags: ['Thrill', 'Family', 'Indoor'],
        familyFriendly: true,
        minAge: 3,
        accessibility: { wheelchair: true, sensory: false },
        timeSlots: ['Midday', 'Afternoon', 'Evening'],
        duration: 4,
        intensity: 'Medium'
    },
    // --- SHARJAH ---
    {
        id: 'shj_rain_room',
        name: 'الغرفة الماطرة',
        city: 'Sharjah',
        desc: 'امش تحت المطر دون أن تبتل.',
        cost: 25,
        val: 25,
        type: 'Indoor',
        tags: ['Art', 'Unique', 'Indoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Midday', 'Afternoon', 'Evening'],
        duration: 1,
        intensity: 'Low'
    },
    {
        id: 'shj_al_noor',
        name: 'جزيرة النور',
        city: 'Sharjah',
        desc: 'بيت الفراشات ومنحوتات ضوئية.',
        cost: 35,
        val: 35,
        type: 'Outdoor',
        tags: ['Nature', 'Art', 'Outdoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Afternoon', 'Evening'],
        duration: 2,
        intensity: 'Low'
    },
    // --- RAK ---
    {
        id: 'rak_jebel_jais',
        name: 'منصة مشاهدة جبل جيس',
        city: 'Ras Al Khaimah',
        desc: 'إطلالات من أعلى قمة في الإمارات.',
        cost: 5,
        val: 5,
        type: 'Outdoor',
        tags: ['Nature', 'Views', 'Outdoor'],
        familyFriendly: true,
        minAge: 0,
        accessibility: { wheelchair: true, sensory: true },
        timeSlots: ['Morning', 'Afternoon'],
        duration: 3,
        intensity: 'Low'
    },
    {
        id: 'rak_zipline',
        name: 'جيس فلايت',
        city: 'Ras Al Khaimah',
        desc: 'أطول مسار انزلاقي في العالم.',
        cost: 450,
        val: 450,
        type: 'Outdoor',
        tags: ['Adventure', 'Thrill', 'Outdoor'],
        familyFriendly: false,
        minAge: 12,
        accessibility: { wheelchair: false, sensory: false },
        timeSlots: ['Morning', 'Afternoon'],
        duration: 2,
        intensity: 'High'
    }
];

// --- HELPER FUNC: GET SCORE ---
const scoreActivity = (act, context) => {
    let score = 50;

    // 1. City Match (Critical)
    if (act.city !== context.city) return -1000;

    // 2. Time Slot Match
    if (!act.timeSlots.includes(context.time)) return -100;

    // 3. User Type Preference
    if (context.travelerType === 'Family') {
        if (act.familyFriendly) score += 40;
        if (act.tags.includes('Family')) score += 30;
    } else if (context.travelerType === 'Culture Seekers') {
        if (act.tags.includes('Culture') || act.tags.includes('History') || act.tags.includes('Art')) score += 50;
    } else if (context.travelerType === 'Solo Explorer') {
        if (act.tags.includes('Adventure') || act.tags.includes('Musem') || act.tags.includes('Cafe')) score += 40;
    } else if (context.travelerType === 'Luxury / VIP') {
        if (act.val > 200) score += 100; // Major boost
        if (act.tags.includes('VIP') || act.tags.includes('Iconic')) score += 50;
    }

    // 4. Budget Fit (Stronger Weights)
    if (context.costPref === 'Budget') {
        if (act.val === 0) score += 1500; // HUGE boost for free
        else if (act.val <= 50) score += 500;
        else if (act.val > 100) score -= 1000; // Strong penalty for expensive
    } else if (context.costPref === 'Premium') {
        if (act.val >= 300) score += 1500; // HUGE boost for expensive/premium
        else if (act.val >= 100) score += 500;
        else if (act.val < 50) score -= 500; // Penalty for cheap
    } else {
        // Balanced
        if (act.val > 50 && act.val < 300) score += 500; // Sweet spot
        else if (act.val === 0) score += 200; // Free is okay
        else if (act.val >= 300) score -= 300; // Avoid super expensive
    }

    // 5. Environmental Factors
    if (context.weather.temp > 35 && act.type === 'Outdoor') {
        score -= 200; // Massive penalty for heat
        if (context.time === 'Midday') score -= 1000; // Impossible
    }

    // 6. Accessibility / PoD
    if (context.pod) {
        if (!act.accessibility.wheelchair) return -1000; // HARD FILTER
        if (act.intensity === 'High') score -= 200;
        if (act.type === 'Indoor') score += 50;
    }

    // 7. Crowds
    if (context.crowds > 80 && act.tags.includes('Iconic')) score -= 30;

    return score;
};

// --- MAIN GENERATOR FUNCTION ---
export const generateSmartItinerary = (params, lang = 'en') => {
    // Params: { city, traveler, costPref, adults, children, pod, weather, crowds }
    const isAr = lang === 'ar';
    const DB = isAr ? ACTIVITY_DB_AR : ACTIVITY_DB;

    // Map English context city/time to DB if needed, but DB uses English keys for city/timeSlots mostly.
    // If param.city comes in Arabic, we need to map it to English ID
    // Map English context city/time to DB if needed, but DB uses English keys for city/timeSlots mostly.
    // If param.city comes in Arabic, we need to map it to English ID
    let city = params.city;
    let cityDisplay = params.city; // For display in text generation

    if (isAr) {
        if (city === 'دبي') city = 'Dubai';
        if (city === 'أبوظبي') city = 'Abu Dhabi';
        if (city === 'الشارقة') city = 'Sharjah';
        if (city === 'رأس الخيمة') city = 'Ras Al Khaimah';
        if (city === 'عجمان') city = 'Ajman';

        // Ensure display is Arabic even if input was English (stale state)
        if (cityDisplay === 'Dubai') cityDisplay = 'دبي';
        if (cityDisplay === 'Abu Dhabi') cityDisplay = 'أبوظبي';
        if (cityDisplay === 'Sharjah') cityDisplay = 'الشارقة';
        if (cityDisplay === 'Ras Al Khaimah') cityDisplay = 'رأس الخيمة';
        if (cityDisplay === 'Ajman') cityDisplay = 'عجمان';
    }

    const timeSlots = isAr
        ? ['الصباح', 'الظهيرة', 'بعد الظهر', 'المساء']
        : ['Morning', 'Midday', 'Afternoon', 'Evening'];

    // Mapping for logic lookups (the DB uses English timeSlots)
    const timeMap = isAr ? {
        'الصباح': 'Morning', 'الظهيرة': 'Midday', 'بعد الظهر': 'Afternoon', 'المساء': 'Evening'
    } : { 'Morning': 'Morning', 'Midday': 'Midday', 'Afternoon': 'Afternoon', 'Evening': 'Evening' };

    const itinerary = [];

    // Context object for scoring
    const context = {
        city: city, // Use English city ID for scoring
        travelerType: params.traveler, // This might be Arabic now?
        costPref: params.costPref,
        children: params.children || 0,
        pod: params.pod || false,
        weather: params.weather || { temp: 30 },
        crowds: params.crowds || 50
    };

    // Need to handle Arabic Traveler/Cost prefs if passed in Arabic
    if (isAr) {
        // Simple mapping based on expected values
        if (context.travelerType === 'عائلة') context.travelerType = 'Family';
        if (context.travelerType === 'مستكشف منفرد') context.travelerType = 'Solo Explorer';
        // ... extend if needed
        if (context.costPref === 'اقتصادي') context.costPref = 'Budget';
        if (context.costPref === 'فاخر') context.costPref = 'Premium';
    }

    // Keep track of used activities to avoid dupes
    const usedIds = new Set();

    timeSlots.forEach(time => {
        context.time = timeMap[time]; // Use English time for logic

        // Filter valid candidates from SELECTED DB (which has localized names/descs)
        const candidates = DB.filter(act => {
            // We use the English DB logic props (city, timeSlots) which should be same in AR DB
            // Note: ACTIVITY_DB_AR must have English city/timeSlots/tags values!
            // I kept them English in my definition above.
            const s = scoreActivity(act, context);
            return s > -100 && !usedIds.has(act.id);
        });

        // Sort by score
        candidates.sort((a, b) => scoreActivity(b, context) - scoreActivity(a, context));

        // Selection
        let selection = candidates[0];
        if (!selection) {
            // Smart Fallback
            if (isAr) {
                if (context.time === 'Morning' || context.time === 'Afternoon') {
                    selection = { id: `generic_${time}`, name: `استكشاف ${cityDisplay}`, desc: 'وقت للراحة واكتشاف المدينة.', val: 0, tag: 'Leisure', type: 'Outdoor', city: context.city, tags: [], accessibility: { wheelchair: true }, timeSlots: [] };
                } else {
                    selection = { id: `generic_${time}`, name: 'الاستراحة في الفندق / المول', desc: 'تجنب الحرارة أو استرح قليلاً.', val: 0, tag: 'Relax', type: 'Indoor', city: context.city, tags: [], accessibility: { wheelchair: true }, timeSlots: [] };
                }
            } else {
                if (context.time === 'Morning' || context.time === 'Afternoon') {
                    selection = { id: `generic_${time}`, name: `Explore ${context.city}`, desc: 'Leisure time to discover the city.', val: 0, tag: 'Leisure', type: 'Outdoor', city: context.city, tags: [], accessibility: { wheelchair: true }, timeSlots: [] };
                } else {
                    selection = { id: `generic_${time}`, name: 'Relax at Hotel / Mall', desc: 'Escape the heat or rest.', val: 0, tag: 'Relax', type: 'Indoor', city: context.city, tags: [], accessibility: { wheelchair: true }, timeSlots: [] };
                }
            }
        }

        // Backup
        let backup = candidates.find(c => c.id !== selection.id);
        if (!backup) {
            backup = isAr
                ? { id: `backup_${time}`, name: 'قهوة / استراحة', desc: 'استراحة هادئة.', val: 20, tag: 'Relax', type: 'Indoor' }
                : { id: `backup_${time}`, name: 'Coffee / Lounge', desc: 'A quiet break.', val: 20, tag: 'Relax', type: 'Indoor' };
        }

        usedIds.add(selection.id);

        // Annotations
        let note = '';
        let adjusted = false;

        // Auto-note why
        if (selection.val > 300 && context.costPref === 'Premium') note = isAr ? 'خيار فاخر' : 'Premium Choice';
        if (selection.val === 0 && context.costPref === 'Budget') note = isAr ? 'توفير' : 'Budget Smart';
        if (context.weather.temp > 35 && selection.type === 'Indoor') { note = isAr ? 'مكيف (حرارة)' : 'AC Recommended'; adjusted = true; }
        if (context.pod && selection.accessibility.wheelchair) note = isAr ? 'ميسر' : 'Accessible';

        itinerary.push({
            time, // Localized time name
            main: selection,
            backup,
            adjusted,
            note
        });
    });

    return itinerary;
};


// --- AI NLP SIMULATOR ---
export const processAICommand = (text, currentItinerary, context, lang = 'en') => {
    // Simple regex/keyword matching to simulate LLM intent
    const lower = text.toLowerCase();
    const isAr = lang === 'ar';
    const DB = isAr ? ACTIVITY_DB_AR : ACTIVITY_DB;

    // Helper to map city dict keys (English) to Arabic for display
    const getCityName = (c) => {
        if (!isAr) return c;
        const map = { 'Dubai': 'دبي', 'Abu Dhabi': 'أبوظبي', 'Sharjah': 'الشارقة', 'Ras Al Khaimah': 'رأس الخيمة', 'Ajman': 'عجمان' };
        return map[c] || c;
    }

    // Responses
    const responses = isAr ? {
        confused: "لم أفهم ذلك تمامًا.",
        swap: (t1, t2) => `قمت بتبديل أنشطة ${t1} و ${t2}.`,
        addFailCity: (act, city) => `لا يمكنني إضافة ${act} لأنه في ${getCityName(city)}، ويومك في ${getCityName(context.city)}.`,
        addSuccess: (act, time) => `أضفت ${act} إلى ${time}.`,
        indoor: "نقلت كل شيء إلى الداخل لتبقى باردًا.",
        budget: "استبدلت الأنشطة باهظة الثمن ببدائل اقتصادية.",
        default: "أفهم أنك تريد تغيير الخطة، لكن أحتاج تعليمات محددة مثل 'بدل الصباح والمساء' أو 'أضف اللوفر'."
    } : {
        confused: "I didn't quite catch that.",
        swap: (t1, t2) => `I've swapped your ${t1} and ${t2} activities.`,
        addFailCity: (act, city) => `I can't add ${act} because it's in ${city}, and your day is in ${context.city}.`,
        addSuccess: (act, time) => `I've added ${act} to your ${time}.`,
        indoor: "I've moved everything indoors to keep you cool.",
        budget: "I've swapped out the pricier activities for budget-friendly alternatives.",
        default: "I understand you want to change the plan, but I need more specific instructions like 'Switch morning and evening' or 'Add Ferrari World'.",
    };

    // 1. SWAP (Logic needs to work with Arabic or English inputs? Assuming English inputs or very simple Arabic strings)
    // For this demo, let's assume we match English keywords even if Lang is AR, OR simple AR keywords
    // "تبديل" = swap

    if (lower.includes('swap') || lower.includes('switch') || lower.includes('تبديل') || lower.includes('غير')) {
        // ... (Keep existing simple slot logic, maybe extend for Arabic terms if needed)
        // Simplified: just check English terms for now as user likely types/clicks English or we map inputs
        // Be robust:
        let slot1 = null;
        let slot2 = null;

        const timeMap = isAr ? { 'صباح': 0, 'ظهر': 1, 'عصر': 2, 'مساء': 3 } : { 'morning': 0, 'midday': 1, 'afternoon': 2, 'evening': 3 };

        // Check for times
        Object.keys(timeMap).forEach(k => {
            if (lower.includes(k)) {
                if (slot1 === null) slot1 = timeMap[k];
                else slot2 = timeMap[k];
            }
        });

        // English fallback if isAr but input has English
        if (isAr && slot1 === null) {
            if (lower.includes('morning')) slot1 = 0;
            if (lower.includes('evening')) slot2 = 3;
        }

        if (slot1 !== null && slot2 !== null) {
            // Perform Swap
            const newPlan = [...currentItinerary];
            const temp = newPlan[slot1].main;
            newPlan[slot1].main = newPlan[slot2].main;
            newPlan[slot2].main = temp;

            newPlan[slot1].adjusted = true; newPlan[slot1].note = isAr ? 'تم التبديل' : 'Swapped';
            newPlan[slot2].adjusted = true; newPlan[slot2].note = isAr ? 'تم التبديل' : 'Swapped';

            return {
                text: responses.swap(newPlan[slot1].time, newPlan[slot2].time),
                action: 'UPDATE_ITINERARY',
                updatedItinerary: newPlan
            };
        }
    }

    // 2. REPLACE/ADD
    // Check against DB names (both AR and EN to be safe? No, check current Lang DB)
    const targetActivity = DB.find(act => lower.includes(act.name.toLowerCase()) || (act.name.toLowerCase().replace('the ', '') && lower.includes(act.name.toLowerCase().replace('the ', ''))));

    if (targetActivity) {
        // Feasibility check
        // We need to map context city to English for check
        let ctxCity = context.city;
        if (isAr) {
            if (ctxCity === 'دبي') ctxCity = 'Dubai';
            if (ctxCity === 'أبوظبي') ctxCity = 'Abu Dhabi';
            // ...
        }

        if (targetActivity.city !== ctxCity) {
            return {
                text: responses.addFailCity(targetActivity.name, targetActivity.city),
                action: null
            };
        }

        // Find best slot
        // ... (Logic remains similar, just finding index)
        let targetSlotIdx = 2; // Default Afternoon
        // Logic to find slot index from Activity timeSlots (which are English in DB)
        // ...

        const newPlan = [...currentItinerary];
        newPlan[targetSlotIdx] = {
            ...newPlan[targetSlotIdx],
            main: targetActivity,
            adjusted: true,
            note: isAr ? 'إضافة ذكية' : 'AI Added'
        };

        return {
            text: responses.addSuccess(targetActivity.name, newPlan[targetSlotIdx].time),
            action: 'UPDATE_ITINERARY',
            updatedItinerary: newPlan
        };
    }

    // 3. CONSTRAINT CHANGE
    if (lower.includes('indoor') || lower.includes('too hot') || lower.includes('داخلي') || lower.includes('حر')) {
        // Replace all outdoors with indoors
        const newPlan = currentItinerary.map(slot => {
            if (slot.main.type === 'Outdoor') {
                const replacement = DB.find(a =>
                    a.city === (isAr ? (context.city === 'دبي' ? 'Dubai' : 'Abu Dhabi') : context.city) && // Hacky city map
                    a.type === 'Indoor' &&
                    a.timeSlots.includes(isAr ? (slot.time === 'الصباح' ? 'Morning' : 'Evening') : slot.time) // Hacky time map
                    && a.id !== slot.main.id
                ) || slot.backup;

                return { ...slot, main: replacement || slot.backup, adjusted: true, note: isAr ? 'داخلي' : 'Switched to Indoor' };
            }
            return slot;
        });
        return {
            text: responses.indoor,
            action: 'UPDATE_ITINERARY',
            updatedItinerary: newPlan
        };
    }

    // Default
    return {
        text: responses.default,
        action: null
    };
};
