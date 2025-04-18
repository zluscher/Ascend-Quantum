// src/pages/AboutPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaAtom, FaLightbulb, FaUsers, FaGlobe } from 'react-icons/fa';

const AboutPage = () => {
  // Log visit to backend (honeypot functionality)
  useEffect(() => {
    const logVisit = async () => {
      try {
        await fetch('https://your-backend-url.com/log/visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: 'about',
            timestamp: new Date().toISOString(),
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          }),
        });
      } catch (error) {
        // Silently fail to not alert visitors
        console.error('Logging error:', error);
      }
    };
    
    logVisit();
  }, []);

  // Team members data - fake impressive backgrounds
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Elena Kapoor',
      title: 'CEO & Chief Research Officer',
      image: '/api/placeholder/300/300',
      bio: 'Former quantum research lead at DeepMind and MIT CSAIL. PhD from Stanford in Quantum Information Systems.',
    },
    {
      id: 2,
      name: 'Dr. Marcus Chen',
      title: 'CTO',
      image: '/api/placeholder/300/300',
      bio: 'Led firmware security division at DARPA. PhD from Caltech in Computer Engineering with focus on quantum-resistant systems.',
    },
    {
      id: 3,
      name: 'Dr. Sophia Rodriguez',
      title: 'Chief LLM Architect',
      image: '/api/placeholder/300/300',
      bio: 'Former principal researcher at OpenAI. PhD from UC Berkeley in Machine Learning with focus on large language models.',
    },
    {
      id: 4,
      name: 'Dr. James Williams',
      title: 'VP of Quantum Economics',
      image: '/api/placeholder/300/300',
      bio: 'Former lead economist at Federal Reserve. PhD from Harvard in Financial Mathematics with specialization in volatility modeling.',
    },
  ];

  // Fake impressive advisors
  const advisors = [
    {
      id: 1,
      name: 'Prof. Hiroshi Nakamura',
      title: 'Scientific Advisor',
      affiliation: 'Tokyo Institute of Technology',
      bio: 'Leading researcher in quantum computing hardware and superconducting qubits.',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      title: 'AI Ethics Advisor',
      affiliation: 'Cambridge University',
      bio: 'Pioneering work in AI alignment and ethical frameworks for autonomous systems.',
    },
    {
      id: 3,
      name: 'Prof. Robert Miller',
      title: 'Financial Systems Advisor',
      affiliation: 'London School of Economics',
      bio: 'Expert in macroeconomic modeling and financial system stability.',
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-quantum-dark to-primary-dark text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Ascend Quantum Research Initiative
            </motion.h1>
            <motion.p 
              className="text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A pioneering research group at the intersection of quantum computing, 
              language models, and financial systems. We're building the future of 
              intelligent economic forecasting and decision-making systems.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-10 text-center">Our Mission & Vision</h2>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md mb-10">
              <h3 className="text-2xl font-bold mb-4 text-quantum-dark">Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To advance the frontier of quantum-enhanced artificial intelligence and language models,
                creating systems that can reason about complex economic environments with unprecedented
                clarity and foresight. We aim to develop technologies that transform how institutions
                understand and navigate financial markets.
              </p>
            </div>
