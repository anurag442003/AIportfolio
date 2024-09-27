import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiCrossedSwords } from 'react-icons/gi'; // Import the sword icon

const projects = [
  {
    title: 'TextReplacement-DeepFill-v2-GAN',
    description: 'Text-replacement via Image inpainting-DeepFill-v2-GAN Method',
    image: 'assets/Projects/tr.png',
    tech: ['GAN', 'Image Processing','Google-Vision' ,'python'],
    videoDemo: '/videos/GAN.mp4',
    github: 'https://github.com/anurag442003/TextReplacement-DeepFill-v2-GAN',
  },
  {
    title: 'Gemini-vs-OpenGPT',
    description: 'Comparison of Gemini and OpenGPT with Asynchronous Processing',
    image: 'assets/Projects/geminigpt.png',
    tech: ['Gemini', 'Mixtral-7B','REST-API','python'],
    videoDemo: '/videos/geminigpt.mp4',
    github: 'https://github.com/rmt4genai/GeminiVsOpenGPT',
  },
  {
    title: 'StockAnalysis-CrewAI',
    description: 'Multi-Agentic-AI-Stock-Analysis',
    image: 'assets/Projects/crewAI.png',
    tech: ['CrewAI','Agentic-AI', 'Serper-AI','web-scraping','python'],
    videoDemo: '/videos/crewai.mp4',
    github: 'https://github.com/anurag442003/StockAnalysis-CrewAI',
  },
  {
    title: 'Imitation-Learning',
    description: 'Simulated flying of HummingBird using Imitation-Learning',
    image: 'assets/Projects/hb.png',
    tech: ['Imitation-Learning', 'Unity-ML-Agents', 'C#'],
    videoDemo: '/videos/hb.mp4',
    github: 'https://github.com/anurag442003/Hummingbird_IL',
  },
  {
    title: 'StockAnalysis-Autogen+MemGPT',
    description: 'Pessimistic-Optimistic AI agents for Stock-Analysis',
    image: 'assets/Projects/autogen.png',
    tech: ['Autogen', 'MemGPT','REST-API', 'python'],
    videoDemo: '/videos/arkham-rehab-ai-demo.mp4',
    github: 'https://github.com/anurag442003/StockAnalysis-AutoGen-MemGPT',
  },
  {
    title: 'AI Story Tller',
    description: 'AI-Powered Storyteller: From Idea to Narrative in Three Tiers',
    image: 'assets/Projects/storybot.png',
    tech: ['Gemini-1.5-pro', 'Streamlit', 'python'],
    videoDemo: '/videos/AIStoryTellerBot.mp4',
    github: 'https://github.com/anurag442003/AI-StoryTeller',
  },
];

const ProjectCard = ({ project, setSelectedProject }) => (
  <motion.div
    layout
    className="bg-gradient-to-br from-black to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative border border-gray-700 hover:border-white hover:border-opacity-80"
    whileHover={{ scale: 1.03 }}
    onClick={() => setSelectedProject(project)}
    style={{ height: '500px' }}
  >
    <div className="relative h-56">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-t-xl" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{project.title}</h3>
      </div>
    </div>
    <div className="p-6">
      <p className="text-gray-400 mb-4">{project.description}</p>
      <div className="flex flex-wrap mb-4">
        {project.tech.map((tech, index) => (
          <span key={index} className="bg-gradient-to-r from-gray-900 to-black text-white text-xs font-semibold mr-2 mb-2 px-3 py-1 rounded-full border border-gray-700">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between">
        <a href={project.videoDemo} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
          Video Demo
        </a>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
          GitHub
        </a>
      </div>
    </div>
  </motion.div>
);

const ProjectModal = ({ project, closeModal }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
    onClick={closeModal}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-gradient-to-br from-black to-gray-800 rounded-xl overflow-hidden shadow-2xl max-w-2xl w-full border border-gray-700"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-t-xl" />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-4" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{project.title}</h2>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <h3 className="text-xl font-semibold text-white mb-2" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>Technologies Used:</h3>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          {project.tech.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
        <div className="flex justify-between mb-4">
          <a href={project.videoDemo} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
            Video Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
            GitHub
          </a>
        </div>
        <button
          onClick={closeModal}
          className="bg-gradient-to-r from-gray-900 to-black text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-block shadow-lg hover:shadow-xl border border-gray-700 hover:border-white hover:border-opacity-80"
          style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
        >
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="container mx-auto px-4 py-11">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-8"
      >
        <GiCrossedSwords className="text-white text-3xl mr-3" />
        <h2 className="text-4xl font-bold text-center text-white" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
          My Arsenal
        </h2>
        <GiCrossedSwords className="text-white text-3xl ml-3" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} setSelectedProject={setSelectedProject} />
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} closeModal={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}