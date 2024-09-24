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
          className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          whileHover={{ scale: 1.05 }}
        >
          <a href="https://www.linkedin.com/in/aiknight" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500">
            <FaLinkedin size={48} className="mx-auto mb-4" />
            <p className="mt-4 text-xl font-bold text-yellow-500">LinkedIn</p>
            <p className="mt-2 text-gray-400">Connect with me on LinkedIn</p>
          </a>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          whileHover={{ scale: 1.05 }}
        >
          <a href="https://github.com/aiknight" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500">
            <FaGithub size={48} className="mx-auto mb-4" />
            <p className="mt-4 text-xl font-bold text-yellow-500">GitHub</p>
            <p className="mt-2 text-gray-400">Check out my projects on GitHub</p>
          </a>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          whileHover={{ scale: 1.05 }}
        >
          <a href="https://twitter.com/aiknight" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500">
            <FaTwitter size={48} className="mx-auto mb-4" />
            <p className="mt-4 text-xl font-bold text-yellow-500">Twitter</p>
            <p className="mt-2 text-gray-400">Follow me on Twitter</p>
          </a>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          whileHover={{ scale: 1.05 }}
        >
          <a href="mailto:anuragbhusare44@gmail.com" className="text-gray-300 hover:text-yellow-500">
            <FaEnvelope size={48} className="mx-auto mb-4" />
            <p className="mt-4 text-xl font-bold text-yellow-500">Email</p>
            <p className="mt-2 text-gray-400">Send me an email</p>
          </a>
        </motion.div>
      </div>
    </div>
  );
}