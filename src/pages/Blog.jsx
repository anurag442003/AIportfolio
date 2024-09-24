import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const blogPosts = [
  {
    title: 'The Future of AI in Crime Fighting',
    date: 'May 15, 2023',
    excerpt: 'Exploring how artificial intelligence is revolutionizing law enforcement and crime prevention in Gotham City.',
    category: 'AI Ethics',
    image: '/ai-crime-fighting.jpg',
  },
  {
    title: 'Machine Learning: From Batcave to Gotham',
    date: 'April 28, 2023',
    excerpt: 'A deep dive into how machine learning algorithms are being applied to protect Gotham City from emerging threats.',
    category: 'Machine Learning',
    image: '/ml-gotham.jpg',
  },
  {
    title: 'Ethics in AI: Lessons from a Dark Knight',
    date: 'April 10, 2023',
    excerpt: 'Discussing the ethical implications of AI in vigilante justice and the importance of responsible AI development.',
    category: 'AI Ethics',
    image: '/ai-ethics.jpg',
  },
  {
    title: 'Neural Networks: Mimicking the Bat-Brain',
    date: 'March 22, 2023',
    excerpt: 'An exploration of how neural networks are inspired by biological brains and their applications in AI technology.',
    category: 'Neural Networks',
    image: '/neural-networks.jpg',
  },
  {
    title: 'Gotham\'s Digital Twin: AI-Powered City Simulation',
    date: 'March 5, 2023',
    excerpt: 'How AI is being used to create a digital replica of Gotham for urban planning and crisis management.',
    category: 'Smart Cities',
    image: '/digital-twin.jpg',
  },
  {
    title: 'The Role of Quantum Computing in Gotham\'s Cybersecurity',
    date: 'February 18, 2023',
    excerpt: 'Examining the potential of quantum computing in enhancing Gotham\'s digital defenses against cyber threats.',
    category: 'Quantum Computing',
    image: '/quantum-cybersecurity.jpg',
  },
];

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => (
  <div className="flex flex-wrap justify-center mb-8">
    {categories.map((category) => (
      <motion.button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={`m-2 px-4 py-2 rounded-full ${
          activeCategory === category
            ? 'bg-yellow-500 text-black'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {category}
      </motion.button>
    ))}
  </div>
);

const BlogPostCard = ({ post }) => (
  <motion.div
    layout
    className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="relative h-48">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
        {post.category}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2 text-yellow-500">{post.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{post.date}</p>
      <p className="text-gray-300 mb-4">{post.excerpt}</p>
      <motion.button
        className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Read More →
      </motion.button>
    </div>
  </motion.div>
);

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...new Set(blogPosts.map((post) => post.category))];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-yellow-500"
      >
        From the Bat-Computer: AI Insights
      </motion.h2>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredPosts.map((post, index) => (
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