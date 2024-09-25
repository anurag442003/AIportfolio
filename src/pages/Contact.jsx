import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-white"
        style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
      >
        Reach out to me
      </motion.h2>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <motion.div
          className="bg-gradient-to-br from-black to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative border border-gray-700 hover:border-white hover:border-opacity-80"
          whileHover={{ scale: 1.03 }}
        >
          <a href="https://www.linkedin.com/in/anuragbasavarajbhusare" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white p-8 block">
            <FaLinkedin size={48} className="mx-auto mb-4" />
            <p className="mt-4 text-xl font-bold text-white" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>LinkedIn</p>
            <p className="mt-2 text-gray-400">Connect with me on LinkedIn</p>
          </a>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-black to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative border border-gray-700 hover:border-white hover:border-opacity-80"
          whileHover={{ scale: 1.03 }}
        >
          <a href="https://github.com/anurag442003" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white p-8 block">
            <FaGithub size={48} className="mx-auto mb-4" />
            <p className="mt-4 text-xl font-bold text-white" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>GitHub</p>
            <p className="mt-2 text-gray-400">Check out my projects on GitHub</p>
          </a>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-black to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative border border-gray-700 hover:border-white hover:border-opacity-80"
          whileHover={{ scale: 1.03 }}
        >
          <a href="https://x.com/anurag_bhusare" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white p-8 block">
            <FaTwitter size={48} className="mx-auto mb-4" />
            <p className="mt-4 text-xl font-bold text-white" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>Twitter</p>
            <p className="mt-2 text-gray-400">Follow me on Twitter</p>
          </a>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-black to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative border border-gray-700 hover:border-white hover:border-opacity-80"
          whileHover={{ scale: 1.03 }}
        >
          <a href="mailto:anuragbhusare44@gmail.com" className="text-gray-300 hover:text-white p-8 block">
            <FaEnvelope size={48} className="mx-auto mb-4" />
            <p className="mt-4 text-xl font-bold text-white" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>Email</p>
            <p className="mt-2 text-gray-400">Send me an email</p>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}