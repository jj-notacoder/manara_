import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Vision from '../components/Vision';
import Partners from '../components/Partners';
import About from '../components/About';
import HowItWorks from '../components/HowItWorks';
import UAECoverage from '../components/UAECoverage';
import LiveDemo from '../components/LiveDemo';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';
import Essentials from '../components/Essentials';

const LandingPage = () => {
    return (
        <main className="relative min-h-screen w-full bg-background text-white selection:bg-manara-cyan selection:text-black">
            <Navbar />
            <Hero />
            <About />
            <Vision />
            <HowItWorks />
            <UAECoverage />
            <Essentials />
            <LiveDemo />
            <ClosingCTA />
            <Footer />
        </main>
    );
};

export default LandingPage;
