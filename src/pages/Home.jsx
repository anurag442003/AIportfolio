import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTools, FaBuilding } from 'react-icons/fa';

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

const ResumeSection = ({ title, items }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 hover:border-white hover:border-opacity-80 transition duration-300 mb-8"
  >
    <h2 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{title}</h2>
    <ul className="list-disc list-inside text-gray-300">
      {items.map((item, index) => (
        <li key={index} className="mb-2">{item}</li>
      ))}
    </ul>
  </motion.div>
);

export default function Home() {
  const resumeSections = [
    {
      title: "Education",
      items: [
        "PES UNIVERSITY - B.Tech in Computer Science and Engineering (Dec 2021-July 2025)",
        "-> GPA: 8.75",
        "-> Specialization: Data Science and Machine Learning",
        "Sri Chaitanya College - Grade: 95.6% (Mar 2019- Apr 2021)",
        "Kendriya Vidyalaya Malleswaram - Grade: 95.4% (Mar 2010-Apr 2019)"]
      
    },
    {
      title: "Work Experience",
      items: [
        "Right Media Tech Private Limited - GenAI Intern (Jun 2024-Aug 2024)",
        "Engineered and optimized generative AI tools, focusing on diffusion models and voice-AI technologies. Implemented RAG systems and workflow automation",
        "Conducted research on emerging AI trends, producing weekly reports for strategic decision-making",
      ]
    },
    {
      title: "Projects",
      items: [ 
        <a href="videos/crewai.mp4" target="_blank" rel="noopener noreferrer">Stock Analysis Agent-CrewAI</a>,
        <a href="videos/hb.mp4" target="_blank" rel="noopener noreferrer">Imitation Learning with Unity ML-Agents</a>,
        <a href="videos/geminigpt.mp4" target="_blank" rel="noopener noreferrer">Gemini-vs-OpenGPT Comparison Tool</a>,
        <a href="videos/GAN.mp4" target="_blank" rel="noopener noreferrer">Text-Replacement Image InPainting</a>,
        <a href="videos/AIStoryTellerBot.mp4" target="_blank" rel="noopener noreferrer">AI Story Teller Bot</a>,
        <a href="https://github.com/anurag442003/StockAnalysis-AutoGen-MemGPT" target="_blank" rel="noopener noreferrer">MemGPT-AutoGen Agents for Stock Analysis</a>,
        // <a href="videos/" target="_blank" rel="noopener noreferrer">Intelligent Service Request Automation System</a>,

      ]
    },
    {
      title: "Skills & Achievements",
      items: [
        "Technical: Python, Machine Learning, Generative AI, LLM, Prompt Engineering, Data Analysis, SQL",
        "Soft Skills: Team Leadership, Logical-Rational Thinking, Drive and Initiative",
        "Certifications: Google Data Analytics Specialization",
        "Languages: English (Fluent), Hindi (Fluent), Kannada (Native)",
        "Awards: 2nd Rank in National Spell Bee Competition, Chairman Award for Keyboard in Akhil Bhartiya Sangh National Contest"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between mb-16 relative"
      >
        <div className="text-left z-10 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white"
              style={{
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
            <TextScramble text="ANURAG BASAVARAJ BHUSARE" />
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 mb-8">
            <TypingEffect text="AI Enthusiast"/>
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/projects"
              className="bg-gradient-to-r from-gray-900 to-black text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-block shadow-lg hover:shadow-xl border border-white-500"
              style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
            >
              Explore My Arsenal
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:ml-8 relative"
        >
          <img
            src="assets/dp5.jpg"
            alt="Anurag Basavaraj Bhusare"
            className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
            style={{
              boxShadow: '0 0 25px rgba(255, 255, 255, 0.8)',
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-black to-gray-1000 p-6 rounded-lg shadow-2xl border border-gray-800 hover:border-white hover:border-opacity-80 transition duration-300 mb-16 relative z-20"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white mb-4 md:mb-0" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>Hey there !</h2>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <a
              href="assets/AnuragCV_wpic.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-gray-900 to-black text-white font-bold py-2 px-4 rounded-full transition duration-300 inline-block shadow-lg hover:shadow-xl border border-white-500"
              style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
            >
              View My Resume
            </a>
          </motion.div>
        </div>
        
        <p className="text-gray-300 mb-4">
          🎓 I'm currently a Computer Science & Engineering student at PES University, specializing in AI and Machine Learning. 
        </p>
        <p className="text-gray-300 mb-4">
          🚀 My goal? To be at the forefront of AI advancements, creating solutions that make a real difference for businesses and society.
        </p>
        <p className="text-gray-300 mb-4 flex items-center">
          <FaBuilding className="mr-2 text-white text-xl" /> As an GenAI intern at Right Media Tech, I've honed my skills in generative AI, Stable Diffusion, RAG systems, and workflow automation building end-to-end solutions. 
        </p>
        <p className="text-gray-300 mb-4 flex items-center">
          <FaTools className="mr-2 text-white text-xl" /> Deep Learning, Machine learning, Generative AI, LLMs, Prompt engineering, Python.
        </p>
        <p className="text-gray-300">
          🤝 Open to discussions, collaborations, and opportunities for innovative AI solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resumeSections.map((section, index) => (
          <ResumeSection key={index} title={section.title} items={section.items} />
        ))}
      </div>
    </div>
  );
}