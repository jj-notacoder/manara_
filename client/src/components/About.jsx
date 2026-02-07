import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    const [activePillar, setActivePillar] = useState(null); // 'left', 'right', or null

    return (
        <section id="about" className="relative h-screen min-h-[800px] bg-black overflow-hidden flex flex-col">

            {/* -- HEADER (Fixed Top) -- */}
            <div className="relative z-20 pt-16 pb-8 text-center bg-gradient-to-b from-black via-black/80 to-transparent">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight"
                >
                    {t('about.title')} <span className="text-gray-500">{t('about.titleSuffix')}</span>
                </motion.h2>
            </div>

            {/* -- SPLIT INTERFACE -- */}
            <div className="flex-1 flex flex-col md:flex-row relative z-10">

                {/* === LEFT PILLAR (INCLUSION) === */}
                <motion.div
                    className="relative flex-1 border-r border-white/10 group cursor-pointer overflow-hidden"
                    onHoverStart={() => setActivePillar('left')}
                    onHoverEnd={() => setActivePillar(null)}
                    animate={{
                        flex: activePillar === 'left' ? 2 : (activePillar === 'right' ? 0.5 : 1),
                        opacity: activePillar === 'right' ? 0.3 : 1
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Background & Grain */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black opacity-90"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-manara-cyan/10 via-transparent to-transparent opacity-40"></div>

                    {/* Content Container */}
                    <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center">

                        {/* Label */}
                        <motion.div
                            className="flex items-center gap-4 mb-8"
                            animate={{ opacity: activePillar === 'right' ? 0 : 1 }}
                        >
                            <span className="text-manara-cyan font-bold text-sm tracking-[0.2em] uppercase bg-manara-cyan/10 px-3 py-1 rounded-full border border-manara-cyan/20">{t('about.inclusion.label')}</span>
                        </motion.div>

                        {/* Title - Scales up when active */}
                        <motion.h3
                            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-none"
                            animate={{ scale: activePillar === 'left' ? 1.05 : 1, originX: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {t('about.inclusion.title')}<br />
                            <span className="text-manara-cyan">{t('about.inclusion.titleHighlight')}</span>
                        </motion.h3>

                        {/* Description (Hidden unless active/neutral) */}
                        <motion.div
                            animate={{
                                opacity: activePillar === null || activePillar === 'left' ? 1 : 0,
                                y: activePillar === 'right' ? 20 : 0
                            }}
                            className="max-w-xl"
                        >
                            <p className="text-xl md:text-2xl text-gray-400 font-light mb-8">
                                {t('about.inclusion.description')}
                            </p>

                            {/* Detailed List (Only Visible on Hover Left) */}
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: activePillar === 'left' ? 1 : 0,
                                    height: activePillar === 'left' ? 'auto' : 0,
                                    marginTop: activePillar === 'left' ? 24 : 0
                                }}
                                className="space-y-6 overflow-hidden"
                            >
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="flex flex-col border-l-2 border-manara-cyan pl-4">
                                        <span className="text-white font-bold text-lg">{t(`about.list.${i}.title`)}</span>
                                        <span className="text-gray-500">{t(`about.list.${i}.desc`)}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Constellation Visual (Absolute Bottom) */}
                    <div className="absolute bottom-0 right-0 w-full h-[60%] pointer-events-none opacity-30 mix-blend-screen">
                        {/* Orbiting Animation Code - Simpler */}
                        <div className="absolute inset-0 flex items-center justify-center translate-x-1/4 translate-y-1/4">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    className="absolute border border-manara-cyan/30 rounded-full"
                                    style={{ width: i * 200, height: i * 200 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="w-2 h-2 bg-manara-cyan rounded-full absolute -top-1 left-1/2 shadow-[0_0_10px_#00Eaff]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>


                {/* === CENTER CORE === */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <motion.div
                        className="w-24 h-24 md:w-32 md:h-32 bg-black rounded-full border border-white/20 flex items-center justify-center backdrop-blur-xl shadow-2xl relative"
                        animate={{
                            scale: activePillar ? 1.1 : 1,
                            borderColor: activePillar === 'left' ? 'rgba(0,234,255,0.5)' : (activePillar === 'right' ? 'rgba(255,170,0,0.5)' : 'rgba(255,255,255,0.2)')
                        }}
                    >
                        {/* Core Pulse */}
                        <motion.div
                            className="w-12 h-12 rounded-full blur-md"
                            animate={{
                                backgroundColor: activePillar === 'left' ? '#00Eaff' : (activePillar === 'right' ? '#FFD700' : '#ffffff'),
                                opacity: [0.5, 0.8, 0.5],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Connecting Lines */}
                        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10 w-[200%] rotate-90 md:rotate-0" />
                    </motion.div>
                </div>


                {/* === RIGHT PILLAR (SUSTAINABILITY) === */}
                <motion.div
                    className="relative flex-1 group cursor-pointer overflow-hidden"
                    onHoverStart={() => setActivePillar('right')}
                    onHoverEnd={() => setActivePillar(null)}
                    animate={{
                        flex: activePillar === 'right' ? 2 : (activePillar === 'left' ? 0.5 : 1),
                        opacity: activePillar === 'left' ? 0.3 : 1
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Background & Grain */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-black to-black opacity-90"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-manara-gold/10 via-transparent to-transparent opacity-40"></div>

                    {/* Content Container */}
                    <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-end text-right">

                        {/* Label */}
                        <motion.div
                            className="flex items-center gap-4 mb-8"
                            animate={{ opacity: activePillar === 'left' ? 0 : 1 }}
                        >
                            <span className="text-[#D4AF37] font-bold text-sm tracking-[0.2em] uppercase bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">{t('about.sustainability.label')}</span>
                        </motion.div>

                        {/* Title - Scales up when active */}
                        <motion.h3
                            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-none"
                            animate={{ scale: activePillar === 'right' ? 1.05 : 1, originX: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {t('about.sustainability.title')}<br />
                            <span className="text-[#D4AF37]">{t('about.sustainability.titleHighlight')}</span>
                        </motion.h3>

                        {/* Description (Hidden unless active/neutral) */}
                        <motion.div
                            animate={{
                                opacity: activePillar === null || activePillar === 'right' ? 1 : 0,
                                y: activePillar === 'left' ? 20 : 0
                            }}
                            className="max-w-xl"
                        >
                            <p className="text-xl md:text-2xl text-gray-400 font-light mb-8">
                                {t('about.sustainability.description')}
                            </p>

                            {/* Detailed List (Only Visible on Hover Right) */}
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: activePillar === 'right' ? 1 : 0,
                                    height: activePillar === 'right' ? 'auto' : 0,
                                    marginTop: activePillar === 'right' ? 24 : 0
                                }}
                                className="space-y-6 overflow-hidden items-end flex flex-col"
                            >
                                {[
                                    { t: "Responsible AI", d: "Ethical, transparent, and human-centric." },
                                    { t: "Green Growth", d: "Optimizing flows to lower carbon footprint." },
                                    { t: "Proactive Governance", d: "Solving traffic before it starts." }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col border-r-2 border-manara-gold pr-4">
                                        <span className="text-white font-bold text-lg">{item.t}</span>
                                        <span className="text-gray-500">{item.d}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* City Grid Visual (Absolute Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none opacity-30 mix-blend-screen">
                        {/* Grid Animation Code */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(1000px)_rotateX(60deg)_scale(2)] origin-bottom" />
                    </div>

                </motion.div>

            </div>
        </section>
    );
};

export default About;
