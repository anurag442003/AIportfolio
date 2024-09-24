import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-yellow-500">
        Contact the AI Knight
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-900 p-8 rounded-lg shadow-md text-center transition-transform duration-150 hover:scale-101 hover:shadow-white"
          whileHover={{ scale: 1.01 }}
        >
          <a href="https://www.linkedin.com/in/aiknight" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500">
            <FaLinkedin size={48} />
            <p className="mt-4 text-xl font-bold text-yellow-500">LinkedIn</p>
          </a>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-8 rounded-lg shadow-md text-center transition-transform duration-150 hover:scale-101 hover:shadow-white"
          whileHover={{ scale: 1.01 }}
        >
          <a href="https://github.com/aiknight" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500">
            <FaGithub size={48} />
            <p className="mt-4 text-xl font-bold text-yellow-500">GitHub</p>
          </a>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-8 rounded-lg shadow-md text-center transition-transform duration-150 hover:scale-101 hover:shadow-white"
          whileHover={{ scale: 1.01 }}
        >
          <a href="https://twitter.com/aiknight" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500">
            <FaTwitter size={48} />
            <p className="mt-4 text-xl font-bold text-yellow-500">Twitter</p>
          </a>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-8 rounded-lg shadow-md text-center transition-transform duration-150 hover:scale-101 hover:shadow-white"
          whileHover={{ scale: 1.01 }}
        >
          <a href="mailto:anuragbhusare44@gmail.com" className="text-gray-300 hover:text-yellow-500">
            <FaEnvelope size={48} />
            <p className="mt-4 text-xl font-bold text-yellow-500">Email</p>
          </a>
        </motion.div>
      </div>
    </div>
  );
}