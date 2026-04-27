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
        "PES UNIVERSITY - B.Tech in Computer Science and Engineering (2021-2025)",
        "Specialization: Data Science and Machine Learning",
        "GPA: 8.8",]
      
    },
    {
      title: "Work Experience",
      items: [
        "British Telecomm Group - Software Engineering Professional (Jan 2025 - Present)",
        "Right Media Tech Private Limited - GenAI Intern (Jun 2024-Aug 2024)",
      ]
    },
    {
      title: "Projects",
        items: [
    <a href="https://github.com/anurag442003/Abot" target="_blank" rel="noopener noreferrer">
      Portfolio RAG Chatbot
    </a>,

    <a href="https://github.com/anurag442003/Autonomous-Trading-Simulation" target="_blank" rel="noopener noreferrer">
      Autonomous Trading Simulation
    </a>,

    <a href="https://github.com/anurag442003/Video-Compliance-AI" target="_blank" rel="noopener noreferrer">
      Video Compliance AI
    </a>,

    <a href="https://github.com/anurag442003/LLM-Price-Prediction-Engine" target="_blank" rel="noopener noreferrer">
      LLM Price Prediction Engine
    </a>,

    <a href="https://github.com/anurag442003/TextReplacement-DeepFill-v2-GAN" target="_blank" rel="noopener noreferrer">
      Text Replacement (DeepFill v2 GAN)
    </a>,

    <a href="https://github.com/anurag442003/AI-StoryTeller" target="_blank" rel="noopener noreferrer">
      AI-StoryTeller
    </a>,
  ] 
    },
    {
      title: "Skills & Achievements",
      items: [
        "AI/ML & Agents: OpenAI Agents SDK, LangChain, LangGraph, LangSmith, MCP, PyTorch, Transformers, RAG, PEFT, LoRA, Fine-tuning, Diffusion Models",
        "Python Libraries: FastAPI, Gradio, Pydantic, Pandas, Ollama, Selenium",
        "Cloud: Azure AI Stack (Video Indexer, AI Search, OpenAI Service, Monitor, OpenTelemetry), Docker",
        "Databases: ChromaDB, FAISS, PostgreSQL, MySQL, Redis",
        "Languages: Python, JavaScript, C++, SQL",
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

        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            className="flex mb-0"
            >
            <Link
              to="/projects"
              className="bg-gradient-to-r from-gray-900 to-black text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-block shadow-lg hover:shadow-xl border border-white-500"
              style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
            >
              Explore My Work
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
              href="assets/AnuragFinalDraft.pdf"
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
          I'm a Software Engineer at BT Group, building enterprise ITSM/ITAM automation at scale on ServiceNow. 
        </p>
        <p className="text-gray-300 mb-4">
          I also work on Applied AI systems—RAG pipelines, multi-agent architectures, and fine-tuned LLMs built for production use. Recent projects include an autonomous multi-agent trading simulator using the OpenAI Agents SDK and MCP, a video compliance auditing system built on Azure AI, and a QLoRA fine-tuned Llama 3.2 model that outperformed Gemini-2.5-Flash on price prediction.
        </p>
        <p className="text-gray-300 mb-4">
          My focus is on reliable AI systems: agent design, retrieval quality, evaluation frameworks, and observability—not just getting models to run, but making them work consistently in real-world environments.
        </p>
        <p className="text-gray-300 mb-4">
          Computer Science graduate from PES University, specializing in Data Science and Machine Learning.
        </p>
        <p className="text-gray-300">
          Open to opportunities in AI/ML and applied LLM engineering — happy to connect🤝
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