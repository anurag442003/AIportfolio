import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TextScramble = ({ text }) => {
  const [scrambledText, setScrambledText] = useState('');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const duration = 2000;
  const frames = 30;

  useEffect(() => {
    let frame = 0;
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambledText(
        text.split('').map((char, index) => {
          if (index < iteration) {
            return char;
          }
          return characters[Math.floor(Math.random() * characters.length)];
        }).join('')
      );

      if (frame >= frames) {
        iteration += 1 / 3;
      }

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      frame++;
    }, duration / frames);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{scrambledText}</span>;
};

const TypingEffect = ({ text, typingSpeed = 50 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, typingSpeed]);

  return <span>{displayText}</span>;
};

export default function Home() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { name: 'Neural Networks', icon: '🧠', description: 'Crafting intelligent systems inspired by the human brain' },
    { name: 'Machine Learning', icon: '🤖', description: 'Teaching machines to learn and adapt like the Batcomputer' },
    { name: 'Computer Vision', icon: '👁️', description: 'Giving AI the power to see and analyze like Batman himself' },
    { name: 'Natural Language Processing', icon: '💬', description: 'Enabling AI to understand and generate human language' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <TextScramble text="AI KNIGHT" />
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          <TypingEffect text="Defending Gotham with Artificial Intelligence" />
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/projects"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300 inline-block"
          >
            Explore My Arsenal
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 hover:border-yellow-500 transition duration-300 cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl mb-4">{skill.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-yellow-500">{skill.name}</h3>
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredSkill === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-300">{skill.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500">The AI We Deserve</h2>
        <p className="text-xl text-gray-400 mb-8">Witness the evolution of AI, forged in the crucible of Gotham's challenges.</p>
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-20 z-10"></div>
          <video
            className="w-full"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/ai-visualization.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Activate AI Visualization
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500">Latest Breakthroughs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Gotham\'s AI-Powered Crime Prediction System', date: 'June 15, 2023' },
            { title: 'Ethical AI: The Silent Guardian of Privacy', date: 'June 1, 2023' },
          ].map((post, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 hover:border-yellow-500 transition duration-300 text-left"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-yellow-500">{post.title}</h3>
              <p className="text-gray-400 mb-4">{post.date}</p>
              <Link
                to="/blog"
                className="text-yellow-500 hover:text-yellow-600 transition duration-300"
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}