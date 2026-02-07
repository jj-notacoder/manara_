import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    const navItems = [
        { label: t('footer.vision'), href: '#vision' },
        { label: t('footer.system'), href: '#how-it-works' },
        { label: t('footer.liveDemo'), href: '#demo' },
        { label: t('footer.privacy'), href: '#' }
    ];

    return (
        <footer className="bg-background border-t border-white/5 py-24 text-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">

                    {/* Column 1: Identity */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-4xl font-display font-bold text-white mb-4 tracking-tighter">MANARA</h3>
                        <p className="text-gray-500 font-medium uppercase tracking-widest text-xs mb-4">
                            {t('footer.slogan')}
                        </p>
                        <p className="text-gray-400 italic font-serif text-lg opacity-80">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="flex flex-col items-start md:items-center space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-gray-500 hover:text-manara-cyan transition-colors duration-300 font-medium tracking-wide"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Column 3: Context */}
                    <div className="flex flex-col items-start md:items-end text-left md:text-right">
                        <p className="text-gray-500 leading-relaxed max-w-xs mb-2">
                            {t('footer.description')}
                        </p>
                        <p className="text-gray-600 text-xs mt-2">
                            {t('footer.designed')}
                        </p>
                        <div className="mt-8 text-gray-700 text-xs">
                            {t('footer.copyright')}
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
