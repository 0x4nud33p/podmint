"use client";

import CallToAction from '@/components/CallToAction';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import React from 'react'
import Footer from '@/components/Footer';

const page = () => {
  return (
    <div className="min-h-screen bg-podmint text-white">
      <main className="relative">
        <div className="fixed top-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
        <div
          className="fixed bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"
          style={{ animationDelay: "1.5s" }}
        ></div>

        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default page
