import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { generateSmartItinerary, processAICommand } from '../utils/AILogic';
import AuthTabs from './Auth/AuthTabs';
import api from '../api';

// --- COMPONENTS ---

// Enhanced Dropdown
const CustomDropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 block">{label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-surface border ${isOpen ? 'border-manara-cyan' : 'border-white/10'} rounded-xl py-3 px-4 text-white text-sm font-medium cursor-pointer flex justify-between items-center transition-all hover:bg-white/5`}
            >
                <span>{value}</span>
                <svg className={`h-4 w-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#0F1621] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1 max-h-60 overflow-y-auto custom-scrollbar"
                    >
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => { onChange(option); setIsOpen(false); }}
                                className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${value === option ? 'text-manara-cyan bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                {option}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

const PillSelector = ({ label, options, value, onChange }) => {
    return (
        <div>
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 block">{label}</label>
            <div className="flex bg-surface border border-white/10 rounded-xl p-1">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${value === option ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Counter for Adults/Children
const Counter = ({ label, value, onChange, min = 0, max = 10 }) => (
    <div className="flex items-center justify-between py-2">
        <span className="text-sm text-gray-300 font-medium">{label}</span>
        <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/5">
            <button
                onClick={() => onChange(Math.max(min, value - 1))}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                disabled={value <= min}
            >
                -
            </button>
            <span className="w-4 text-center text-sm font-bold text-white">{value}</span>
            <button
                onClick={() => onChange(Math.min(max, value + 1))}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                disabled={value >= max}
            >
                +
            </button>
        </div>
    </div>
);

// Toggle for PoD
const Toggle = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between py-2 cursor-pointer" onClick={() => onChange(!checked)}>
        <span className="text-sm text-gray-300 font-medium">{label}</span>
        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-manara-cyan' : 'bg-gray-700'}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
    </div>
);


const CloudIcon = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>);
const SunIcon = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>);
const CrowdIcon = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
const HeatIcon = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>);
const WheelchairIcon = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>);


// --- MAIN COMPONENT ---
const LiveDemo = () => {
    // Context
    const { t, currentLanguage } = useLanguage();
    const { user, saveItinerary, login, addedItems } = useProfile();

    // Derived Constants from translations
    const CITIES = [
        t('city.abudhabi'),
        t('city.dubai'),
        t('city.sharjah'),
        t('city.rak') // Assumed mapping, or hardcode fallback
    ];
    const TRAVELER_TYPES = [
        t('traveler.family'),
        t('traveler.solo'),
        t('traveler.culture'),
        t('traveler.luxury')
    ];
    const COSTS = [
        t('cost.budget'),
        t('cost.balanced'),
        t('cost.premium')
    ];

    // Core Inputs
    const [city, setCity] = useState(CITIES[0]); // Default to first (Abu Dhabi)
    const [traveler, setTraveler] = useState(TRAVELER_TYPES[0]);
    const [costPref, setCostPref] = useState(COSTS[1]);

    // Family & Accessibility Inputs
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [pod, setPod] = useState(false);

    // Live Sensor Data
    const [weather, setWeather] = useState({ temp: 30, isSunny: true });
    const [crowds, setCrowds] = useState(40);

    // Itinerary State
    const [itinerary, setItinerary] = useState([]);
    const [metrics, setMetrics] = useState({ cost: 0, heatExposure: 'Low', queueTime: 'Low' });

    // UI State
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveTitle, setSaveTitle] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // AI Chat State
    const [chatHistory, setChatHistory] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Initialize Chat Message on Mount/Language Change
    useEffect(() => {
        setChatHistory([{ type: 'bot', text: t('liveDemo.assistant.greeting') }]);
    }, [currentLanguage, t]);

    // Pre-fill from profile
    useEffect(() => {
        if (user?.startingCity && !city) setCity(user.startingCity); // Need mapping if user profile stores English
        if (user?.travelerType) setTraveler(user.travelerType);
        if (user?.costPreference) setCostPref(user.costPreference);
    }, [user]);

    // Fetch Weather Logic (Simulated)
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const baseTemp = city.includes('Dubai') || city.includes('دبي') ? 32 : 30;
                setWeather({ temp: baseTemp + Math.floor(Math.random() * 5), isSunny: true });
            } catch (e) {
                setWeather({ temp: 32, isSunny: true });
            }
        };
        fetchWeather();
    }, [city]);

    // Crowd Simulation
    useEffect(() => {
        const hour = new Date().getHours();
        let baseCrowd = hour >= 16 ? 85 : (hour >= 10 ? 50 : 20);
        setCrowds(Math.floor(Math.min(100, Math.max(0, baseCrowd + (Math.random() * 10 - 5)))));
    }, [city]);

    // --- GENERATE ITINERARY ---
    const updateItinerary = useCallback(() => {
        if (adults + children === 0) return; // Prevention

        const plan = generateSmartItinerary({
            city,
            traveler,
            costPref,
            adults,
            children,
            pod,
            weather,
            crowds,
            addedItems
        }, currentLanguage); // Pass current language!

        // Calculate Metrics
        const totalCost = plan.reduce((acc, slot) => acc + slot.main.val, 0);
        const heatRisk = plan.some(s => s.main.type === 'Outdoor' && weather.temp > 35) ? 'High' : 'Min';

        setItinerary(plan);
        setMetrics({ cost: totalCost, heatExposure: heatRisk, queueTime: crowds > 80 ? 'Optimized' : 'Std' });

    }, [city, traveler, costPref, adults, children, pod, weather, crowds, addedItems, currentLanguage]);

    // Generate on change
    useEffect(() => {
        updateItinerary();
    }, [updateItinerary]);


    // --- AI HANDLER ---
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        const input = userMessage;
        setChatHistory(prev => [...prev, { type: 'user', text: input }]);
        setUserMessage('');
        setIsTyping(true);

        // Simulate Network Delay
        setTimeout(() => {
            const context = { city, weather, crowds, adults, children, pod };
            const result = processAICommand(input, itinerary, context, currentLanguage); // Pass language!

            setChatHistory(prev => [...prev, { type: 'bot', text: result.text }]);

            if (result.action === 'UPDATE_ITINERARY' && result.updatedItinerary) {
                setItinerary(result.updatedItinerary);
                const newCost = result.updatedItinerary.reduce((acc, slot) => acc + slot.main.val, 0);
                setMetrics(prev => ({ ...prev, cost: newCost }));
            }
            setIsTyping(false);
        }, 1000);
    };

    const handleSwap = (index) => {
        setItinerary(prev => {
            const newPlan = prev.map((item, i) => {
                if (i !== index) return item;
                const note = currentLanguage === 'ar' ? 'تم التبديل' : 'User Swap';
                return { ...item, main: item.backup, backup: item.main, adjusted: true, note: note };
            });
            return newPlan;
        });
    };

    const handleSaveClick = () => {
        if (!user) setShowAuthModal(true);
        else {
            setSaveTitle(`${t('liveDemo.save.dayIn')} ${city}`);
            setShowSaveModal(true);
        }
    };

    const handleConfirmSave = () => {
        saveItinerary({
            title: saveTitle,
            city,
            travelerType: traveler,
            timeline: itinerary,
            metrics
        });
        setShowSaveModal(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };


    return (
        <section id="demo" className="py-24 bg-background border-t border-white/5 relative">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        {t('liveDemo.title')} <span className="text-manara-gold">{t('liveDemo.titleHighlight')}</span>
                    </h2>
                    <p className="text-gray-500">{t('liveDemo.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* --- LEFT PANEL: CONTROLS --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 bg-surface border border-white/10 rounded-2xl p-6 sticky top-24"
                    >
                        {/* Live Status */}
                        <div className="bg-gradient-to-br from-black/60 to-black/20 rounded-xl p-5 border border-white/10 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-20">
                                <div className="flex gap-2">
                                    <div className="w-16 h-1 bg-white rotate-45"></div>
                                    <div className="w-16 h-1 bg-white rotate-45"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('liveDemo.liveConnect')}: {city}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                                    {weather.temp > 35 ? <SunIcon className="w-8 h-8 text-orange-400 mb-2 animate-spin-slow" /> : <CloudIcon className="w-8 h-8 text-blue-400 mb-2 animate-bounce-slow" />}
                                    <span className={`text-2xl font-bold ${weather.temp > 35 ? 'text-orange-400' : 'text-blue-400'}`}>{weather.temp}°C</span>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">{t('liveDemo.temp')}</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                                    <CrowdIcon className={`w-8 h-8 mb-2 ${crowds > 60 ? 'text-red-400' : 'text-green-400'}`} />
                                    <span className={`text-2xl font-bold ${crowds > 60 ? 'text-red-400' : 'text-green-400'}`}>{crowds}%</span>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">{t('liveDemo.crowdDensity')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Core Prefs */}
                        <div className="space-y-6 mb-8 border-b border-white/5 pb-8">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('liveDemo.preferences.title')}</h3>
                            <CustomDropdown label={t('liveDemo.preferences.city')} options={CITIES} value={city} onChange={setCity} />
                            <CustomDropdown label={t('liveDemo.preferences.travelerType')} options={TRAVELER_TYPES} value={traveler} onChange={setTraveler} />
                            <PillSelector label={t('liveDemo.preferences.costPreference')} options={COSTS} value={costPref} onChange={setCostPref} />
                        </div>

                        {/* Family & Access */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('liveDemo.family.title')}</h3>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2">
                                <Counter label={t('liveDemo.family.adults')} value={adults} onChange={setAdults} min={1} />
                                <Counter label={t('liveDemo.family.children')} value={children} onChange={setChildren} />
                                <div className="h-px bg-white/10 my-2"></div>
                                <Toggle label={t('liveDemo.family.pod')} checked={pod} onChange={setPod} />
                                {pod && (
                                    <p className="text-[10px] text-manara-cyan mt-2 leading-tight">
                                        {t('liveDemo.family.podInfo')}
                                    </p>
                                )}
                            </div>
                            <div className="text-center text-xs text-gray-500">
                                {t('liveDemo.family.summary', { adults, children, pod: pod ? t('common.yes') : t('common.no') })}
                            </div>
                            {adults + children === 0 && <p className="text-red-400 text-xs text-center font-bold">{t('liveDemo.family.warning')}</p>}
                        </div>

                    </motion.div>


                    {/* --- RIGHT PANEL: ITINERARY & CHAT --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 flex flex-col gap-6"
                    >
                        {/* Metrics Bar */}
                        <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm">
                            <div className="flex flex-wrap items-center gap-6 md:gap-12">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{t('liveDemo.metrics.dayCost')}</div>
                                    <div className="text-2xl font-display font-medium text-white">~ AED {Math.round(metrics.cost || 0)} <span className="text-sm text-gray-500 font-sans font-normal">{t('liveDemo.metrics.perPerson')}</span></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-lg">
                                        <HeatIcon className={`w-6 h-6 ${metrics.heatExposure === 'Min' ? 'text-green-400' : 'text-yellow-400'}`} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{t('liveDemo.metrics.heatExposure')}</div>
                                        <div className={`text-xl font-bold ${metrics.heatExposure === 'Min' ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {metrics.heatExposure === 'Min' ? '↓ ' + t('liveDemo.metrics.minimized') : t('liveDemo.metrics.normal')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleSaveClick}
                                disabled={adults + children === 0}
                                className={`px-6 py-3 font-bold rounded-xl shadow-[0_0_20px_rgba(0,234,255,0.2)] hover:shadow-[0_0_30px_rgba(0,234,255,0.4)] transition-all uppercase tracking-widest text-xs flex items-center gap-2 ${adults + children === 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-manara-cyan text-black'}`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                {t('liveDemo.metrics.saveItinerary')}
                            </button>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-4">
                            {itinerary.map((slot, i) => (
                                <motion.div
                                    key={`${city}-${i}-${slot.main.id}`} // Use ID for smoother reorders
                                    layout // Enable layout animation for swaps
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative bg-surface border ${slot.adjusted ? 'border-manara-gold/40' : 'border-white/5'} hover:border-white/20 transition-colors p-6 rounded-2xl group`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

                                        {/* Time Box */}
                                        <div className="flex-none w-24">
                                            <div className="text-sm font-bold text-manara-cyan uppercase tracking-widest mb-1">{slot.time}</div>
                                            <div className="text-xs text-gray-600 font-mono">
                                                {/* Logic handles English timeSlot mapping in AILogic, but slot.time is localized in AILogic */}
                                                {slot.time === 'Morning' || slot.time === 'الصباح' ? '09:00 - 12:00' :
                                                    slot.time === 'Midday' || slot.time === 'الظهيرة' ? '12:00 - 15:00' :
                                                        slot.time === 'Afternoon' || slot.time === 'بعد الظهر' ? '15:00 - 18:00' : '18:00 +'}
                                            </div>
                                        </div>

                                        {/* Activity Details */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-xl font-bold text-white">{slot.main.name}</h4>
                                                {slot.adjusted && (
                                                    <span className="bg-manara-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                                                        {t('liveDemo.timeline.adapted')}
                                                    </span>
                                                )}
                                                {slot.main.accessibility?.wheelchair && (
                                                    <span title="Wheelchair Accessible"><WheelchairIcon className="w-4 h-4 text-blue-400" /></span>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-400 mb-4 leading-relaxed max-w-lg">{slot.main.desc}</p>

                                            <div className="flex flex-wrap items-center gap-3">
                                                {slot.main.tags.map(tag => (
                                                    <span key={tag} className="text-xs font-medium text-gray-500 px-2 py-1 bg-white/5 rounded border border-white/5">{tag}</span>
                                                ))}
                                                <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-white/5 rounded border border-white/5">{slot.main.cost === 0 ? t('cost.free') : `AED ${slot.main.cost}`}</span>
                                                {slot.note && <span className="text-xs font-medium text-manara-gold flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-manara-gold rounded-full"></span> {slot.note}
                                                </span>}
                                            </div>
                                        </div>

                                        {/* Swap Action */}
                                        <div className="md:w-1/3 pt-6 md:pt-0 md:border-l border-white/5 md:pl-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t('liveDemo.timeline.alternative')}</span>
                                                <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded cursor-pointer hover:text-white" onClick={() => handleSwap(i)}>{t('liveDemo.timeline.clickToSwap')}</span>
                                            </div>

                                            <div
                                                onClick={() => handleSwap(i)}
                                                className="group/backup cursor-pointer p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <h5 className="text-sm font-bold text-gray-300 group-hover/backup:text-white transition-colors">{slot.backup.name}</h5>
                                                    <svg className="w-4 h-4 text-manara-cyan opacity-0 group-hover/backup:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* AI Assistant Panel */}
                        <div className="bg-surface border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-manara-cyan to-blue-500 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white leading-none">{t('liveDemo.assistant.title')}</h4>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{t('liveDemo.assistant.subtitle')}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {chatHistory.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-manara-gold text-black rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    placeholder={t('liveDemo.assistant.placeholder')}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-manara-cyan transition-colors"
                                />
                                <button type="submit" className="absolute right-2 top-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Modals (Save & Auth) */}
            <AnimatePresence>
                {showSaveModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#0F1621] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
                        >
                            <button onClick={() => setShowSaveModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                            <h3 className="text-2xl font-bold text-white mb-2">{t('saveModal.title')}</h3>
                            <p className="text-gray-400 text-sm mb-6">{t('saveModal.description')}</p>
                            <input type="text" value={saveTitle} onChange={(e) => setSaveTitle(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-manara-cyan" autoFocus />
                            <div className="flex gap-4">
                                <button onClick={() => setShowSaveModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5">{t('global.cancel')}</button>
                                <button onClick={handleConfirmSave} className="flex-1 py-3 rounded-xl bg-manara-cyan text-black font-bold hover:bg-manara-cyan/90">{t('global.save')}</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {showAuthModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-lg">
                            <button onClick={() => setShowAuthModal(false)} className="absolute top-0 right-0 z-10 p-2 text-white"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                            <AuthTabs />
                        </div>
                    </motion.div>
                )}
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 z-[70] bg-surface border border-manara-cyan/50 text-white px-6 py-4 rounded-xl flex items-center gap-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                        <div><div className="font-bold text-sm">{t('saveModal.saved')}</div><div className="text-xs text-gray-400">{t('saveModal.viewProfile')}</div></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LiveDemo;
