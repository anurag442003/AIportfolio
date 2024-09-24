import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'Batcomputer AI',
    description: 'Advanced AI system for crime analysis and prediction',
    image: '/batcomputer-ai.jpg',
    tech: ['Machine Learning', 'Big Data', 'Neural Networks'],
  },
  {
    title: 'Gotham Security Network',
    description: 'AI-powered surveillance system for Gotham City',
    image: '/gotham-security.jpg',
    tech: ['Computer Vision', 'Facial Recognition', 'Edge Computing'],
  },
  {
    title: 'Batmobile Autopilot',
    description: 'Self-driving AI for the Batmobile',
    image: '/batmobile-autopilot.jpg',
    tech: ['Reinforcement Learning', 'Sensor Fusion', 'Real-time Decision Making'],
  },
  {
    title: 'Batsuit Nanotech Interface',
    description: 'AI-driven nanotech control system for the Batsuit',
    image: '/batsuit-nanotech.jpg',
    tech: ['Swarm Intelligence', 'Nanorobotics', 'Adaptive Materials'],
  },
  {
    title: 'Arkham Asylum Rehabilitation AI',
    description: 'AI-assisted rehabilitation program for Arkham inmates',
    image: '/arkham-rehab-ai.jpg',
    tech: ['Natural Language Processing', 'Sentiment Analysis', 'Cognitive Behavioral Modeling'],
  },
  {
    title: 'Wayne Enterprises R&D Simulator',
    description: 'AI-powered simulator for testing new Batman gadgets',
    image: '/wayne-enterprises-simulator.jpg',
    tech: ['Physics Simulation', 'Genetic Algorithms', 'Virtual Reality'],
  },
];

const ProjectCard = ({ project, setSelectedProject }) => (
  <motion.div
    layout
    className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    whileHover={{ scale: 1.05 }}
    onClick={() => setSelectedProject(project)}
  >
    <div className="relative h-48">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <h3 className="absolute bottom-2 left-2 text-xl font-bold text-white">{project.title}</h3>
    </div>
    <div className="p-4">
      <p className="text-gray-400 mb-2">{project.description}</p>
      <div className="flex flex-wrap">
        {project.tech.map((tech, index) => (
          <span key={index} className="bg-yellow-500 text-black text-xs font-semibold mr-2 mb-2 px-2 py-1 rounded-full">
            {tech}
          </span>
        ))}
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
      className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl max-w-2xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">{project.title}</h2>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <h3 className="text-xl font-semibold text-yellow-500 mb-2">Technologies Used:</h3>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          {project.tech.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
        <button
          onClick={closeModal}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition duration-300"
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
    <div className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-yellow-500"
      >
        AI Projects: Gotham's Arsenal
      </motion.h2>
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