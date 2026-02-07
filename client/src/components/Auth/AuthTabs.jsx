import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useLanguage } from '../../context/LanguageContext';

const CITIES = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Fujairah', 'Ajman', 'Umm Al Quwain'];

const AuthTabs = () => {
    const { login, signup, error } = useProfile();
    const { t } = useLanguage();
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        startingCity: 'Dubai'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (mode === 'login') {
            await login(formData.email, formData.password);
        } else {
            await signup(formData);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto bg-surface border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex mb-8 border-b border-white/10">
                <button
                    onClick={() => setMode('login')}
                    className={`flex-1 pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${mode === 'login' ? 'text-manara-cyan border-b-2 border-manara-cyan' : 'text-gray-500 hover:text-white'}`}
                >
                    {t('auth.login')}
                </button>
                <button
                    onClick={() => setMode('register')}
                    className={`flex-1 pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${mode === 'register' ? 'text-manara-cyan border-b-2 border-manara-cyan' : 'text-gray-500 hover:text-white'}`}
                >
                    {t('auth.signup')}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'register' && (
                    <div>
                        <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">{t('auth.name')}</label>
                        <input
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan"
                            placeholder={t('auth.name')}
                        />
                    </div>
                )}

                <div>
                    <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">{t('auth.email')}</label>
                    <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">{t('auth.password')}</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan"
                        placeholder="••••••••"
                    />
                </div>

                {mode === 'register' && (
                    <div>
                        <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">{t('liveDemo.preferences.city')}</label>
                        <select
                            name="startingCity"
                            value={formData.startingCity}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan appearance-none"
                        >
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl">
                        {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-manara-cyan text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,234,255,0.3)] hover:shadow-[0_0_30px_rgba(0,234,255,0.5)] transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? t('global.loading') : (mode === 'login' ? t('auth.login') : t('auth.signup'))}
                </button>
            </form>
        </div>
    );
};

export default AuthTabs;
