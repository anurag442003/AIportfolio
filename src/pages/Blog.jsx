import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const blogPosts = [
  {
    title: 'The Future of AI in Crime Fighting',
    date: 'May 15, 2023',
    excerpt: 'Exploring how artificial intelligence is revolutionizing law enforcement and crime prevention in Gotham City.',
    image: '/ai-crime-fighting.jpg',
  },
  {
    title: 'Machine Learning: From Batcave to Gotham',
    date: 'April 28, 2023',
    excerpt: 'A deep dive into how machine learning algorithms are being applied to protect Gotham City from emerging threats.',
    image: '/ml-gotham.jpg',
  },
  {
    title: 'Ethics in AI: Lessons from a Dark Knight',
    date: 'April 10, 2023',
    excerpt: 'Discussing the ethical implications of AI in vigilante justice and the importance of responsible AI development.',
    image: '/ai-ethics.jpg',
  },
  {
    title: 'Neural Networks: Mimicking the Bat-Brain',
    date: 'March 22, 2023',
    excerpt: 'An exploration of how neural networks are inspired by biological brains and their applications in AI technology.',
    image: '/neural-networks.jpg',
  },
  {
    title: 'Gotham\'s Digital Twin: AI-Powered City Simulation',
    date: 'March 5, 2023',
    excerpt: 'How AI is being used to create a digital replica of Gotham for urban planning and crisis management.',
    image: '/digital-twin.jpg',
  },
  {
    title: 'The Role of Quantum Computing in Gotham\'s Cybersecurity',
    date: 'February 18, 2023',
    excerpt: 'Examining the potential of quantum computing in enhancing Gotham\'s digital defenses against cyber threats.',
    image: '/quantum-cybersecurity.jpg',
  },
];

const BlogPostCard = ({ post }) => (
  <motion.div
    layout
    className="bg-gradient-to-br from-black to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative border border-gray-700 hover:border-white hover:border-opacity-80"
    whileHover={{ scale: 1.03 }}
    style={{ height: '350px' }}
  >
    <div className="relative h-48">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-t-xl" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{post.title}</h3>
      </div>
    </div>
    <div className="p-5">
      <p className="text-gray-400 mb-3 text-sm">{post.date}</p>
      <p className="text-gray-300 mb-3 text-sm">{post.excerpt}</p>
      <motion.button
        className="text-white hover:text-gray-300 transition-colors duration-300 text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Read More →
      </motion.button>
    </div>
  </motion.div>
);

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-11">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-white"
        style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
      >
        From the Bat-Computer: AI Insights
      </motion.h2>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}