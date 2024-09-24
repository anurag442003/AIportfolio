import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TextScramble = ({ text }) => {
  const [scrambledText, setScrambledText] = useState('');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const duration = 700;
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

const TypingEffect = ({ text, typingSpeed = 75 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = -1;
    const typingInterval = setInterval(() => {      
      if (i < text.length) {       
        i++;   
        setDisplayText((prev) => prev + text.charAt(i));
              
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
        <h1 className="text-5xl md:text-5xl font-bold mb-4">
          <TextScramble text="ANURAG BASAVARAJ BHUSARE" />
        </h1>
        <p className="text-2xl md:text-3xl text-gray-400 mb-8">
          <TypingEffect text="Portfolio" />
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
            className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg border border-gray-800 hover:border-yellow-500 transition duration-300 cursor-pointer relative overflow-hidden"
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
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredSkill === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
// No i meant keeping the existing design whatever. Just add this Below Home Or Create a Separate page called ABout ME and Add All my resume contents there. WHichever you feel suitable. I am not happy with your current design. Be innovative and surprise me claude