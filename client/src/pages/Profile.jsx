import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ItineraryCard from '../components/Profile/ItineraryCard';
import Preferences from '../components/Profile/Preferences';
import AuthTabs from '../components/Auth/AuthTabs';
import SavedItineraryModal from '../components/Profile/SavedItineraryModal';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { user, itineraries, deleteItinerary, loading, addedItems, removeItem } = useProfile();
    const { t, isRTL } = useLanguage();
    const [activeTab, setActiveTab] = useState('itineraries');
    const [selectedItinerary, setSelectedItinerary] = useState(null);

    useEffect(() => {
        if (user && !user.name) setActiveTab('settings');
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-8 h-8 border-manara-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white selection:bg-manara-cyan selection:text-black font-sans">
            <Navbar />

            <main className="container mx-auto px-6 py-32">
                {!user ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                                {t('profile.title')} <span className="text-manara-cyan">{t('profile.titleHighlight')}</span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                {t('profile.subtitle')}
                            </p>
                        </div>
                        <AuthTabs />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ProfileHeader />

                        {/* Tabs */}
                        <div className={`flex border-b border-white/10 mb-12 overflow-x-auto ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            {[
                                { id: 'itineraries', label: t('profile.tab.itineraries') },
                                { id: 'places', label: t('profile.tab.places') },
                                { id: 'cuisines', label: t('profile.tab.cuisines') },
                                { id: 'settings', label: t('profile.tab.settings') }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-4 font-bold uppercase tracking-widest text-sm relative transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-manara-cyan' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-manara-cyan" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="min-h-[400px]">
                            {activeTab === 'itineraries' && (
                                <div className="space-y-8">
                                    {itineraries.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">No itineraries saved yet</h3>
                                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                                Visit the Live Demo to generate a personalized day plan, then save it here to keep track of your trips.
                                            </p>
                                            <a href="/#demo" className="inline-block px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-bold text-manara-cyan border border-manara-cyan/30 transition-all">
                                                Go to Live Demo
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            {itineraries.slice().reverse().map((itinerary, index) => {
                                                // Calculate Total Cost dynamically
                                                const totalCost = itinerary.timeline?.reduce((acc, slot) => acc + (slot.main?.val || 0), 0) || 0;

                                                return (
                                                    <motion.div
                                                        key={itinerary._id || index}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="bg-surface border border-white/10 rounded-2xl overflow-hidden"
                                                    >
                                                        {/* Header */}
                                                        <div className="p-6 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 bg-white/5">
                                                            <div>
                                                                <div className="flex items-center gap-3 mb-1">
                                                                    <span className="px-2 py-0.5 rounded bg-manara-cyan/10 text-manara-cyan text-[10px] font-bold uppercase tracking-widest">{itinerary.city}</span>
                                                                    <span className="text-gray-500 text-xs">•</span>
                                                                    <span className="text-gray-400 text-xs">{new Date(itinerary.createdAt || Date.now()).toLocaleDateString()}</span>
                                                                </div>
                                                                <h3 className="text-xl font-bold text-white">{itinerary.title || `Day in ${itinerary.city}`}</h3>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <div className="text-right">
                                                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Est. Cost</div>
                                                                    <div className="text-xl font-display font-medium text-white">AED {totalCost}</div>
                                                                </div>
                                                                <button
                                                                    onClick={() => deleteItinerary(itinerary._id || itinerary.id)}
                                                                    className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                                                                    title="Delete Itinerary"
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Timeline */}
                                                        <div className="p-6 grid gap-6 md:grid-cols-4">
                                                            {itinerary.timeline?.map((slot, i) => (
                                                                <div key={i} className="relative pl-4 border-l-2 border-white/10 last:border-0 md:border-l-0 md:pl-0">
                                                                    <div className="text-xs font-bold text-manara-cyan uppercase tracking-widest mb-2">{slot.time}</div>
                                                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/20 transition-colors h-full">
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <span className="text-xs font-medium text-gray-500 px-2 py-0.5 bg-black/30 rounded">{slot.main.tag}</span>
                                                                            <span className="text-xs text-gray-400">{slot.main.cost}</span>
                                                                        </div>
                                                                        <h4 className="font-bold text-white mb-1 group-hover:text-manara-cyan transition-colors">{slot.main.name}</h4>
                                                                        <p className="text-xs text-gray-400 line-clamp-2">{slot.main.desc}</p>
                                                                        {slot.note && (
                                                                            <div className="mt-3 text-[10px] text-manara-gold bg-manara-gold/10 px-2 py-1 rounded inline-block">
                                                                                {slot.note}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'places' && (
                                <div className="space-y-6">
                                    {(!addedItems || addedItems.filter(i => i.type === 'place').length === 0) ? (
                                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                            <h3 className="text-xl font-bold text-white mb-2">No saved places yet</h3>
                                            <p className="text-gray-500 mb-6">Explore Essentials to save places.</p>
                                            <a href="/#essentials" className="text-manara-cyan font-bold hover:underline">Explore Essentials</a>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {addedItems.filter(i => i.type === 'place').map((item, index) => (
                                                <div key={`${item.id}-${index}`} className="group relative h-[400px] w-full bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-manara-cyan/50 transition-colors duration-300">
                                                    <div className="absolute inset-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                                                    </div>

                                                    <div className="absolute top-4 right-4 z-10">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                                                            className="p-2 bg-black/50 hover:bg-red-500/50 backdrop-blur-md rounded-full text-white transition-colors"
                                                            title="Remove"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                        </button>
                                                    </div>

                                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                                        <div className="text-xs font-bold text-manara-cyan uppercase tracking-widest mb-2">
                                                            {item.location}
                                                        </div>

                                                        <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                                                        <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                                            {item.description}
                                                        </p>

                                                        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                            {item.tags?.map((tag) => (
                                                                <span key={tag} className="text-[10px] bg-white/10 px-2 py-1 rounded text-white backdrop-blur-sm">{tag}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'cuisines' && (
                                <div className="space-y-6">
                                    {(!addedItems || addedItems.filter(i => i.type === 'cuisine').length === 0) ? (
                                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                            <h3 className="text-xl font-bold text-white mb-2">No saved cuisines yet</h3>
                                            <p className="text-gray-500 mb-6">Explore Essentials to save dishes.</p>
                                            <a href="/#essentials" className="text-manara-cyan font-bold hover:underline">Explore Essentials</a>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {addedItems.filter(i => i.type === 'cuisine').map((item, index) => (
                                                <div key={`${item.id}-${index}`} className="group relative h-[400px] w-full bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-manara-cyan/50 transition-colors duration-300">
                                                    <div className="absolute inset-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                                                    </div>

                                                    <div className="absolute top-4 right-4 z-10">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                                                            className="p-2 bg-black/50 hover:bg-red-500/50 backdrop-blur-md rounded-full text-white transition-colors"
                                                            title="Remove"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                        </button>
                                                    </div>

                                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                                        <div className="text-xs font-bold text-manara-cyan uppercase tracking-widest mb-2">
                                                            {item.category}
                                                        </div>

                                                        <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                                                        <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                                            {item.description}
                                                        </p>

                                                        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                            <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white backdrop-blur-sm">{item.tip}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <Preferences />
                            )}
                        </div>
                    </motion.div>
                )}
            </main>

            <SavedItineraryModal
                itinerary={selectedItinerary}
                onClose={() => setSelectedItinerary(null)}
            />
        </div>
    );
};

export default Profile;
