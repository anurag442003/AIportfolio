import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <div className="container mx-auto px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-yellow-500">AI</span> in the Shadows
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-8">
          Cutting-edge AI solutions for Gotham's darkest challenges
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="/projects"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300 inline-block"
          >
            Uncover Projects
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {[
          { title: 'Neural Networks', description: 'Advanced pattern recognition for crime prediction' },
          { title: 'Quantum Computing', description: 'Harnessing quantum algorithms for unbreakable encryption' },
          { title: 'Autonomous Systems', description: 'Self-evolving AI for adaptive city protection' },
        ].map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 hover:border-yellow-500 transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-yellow-500">{skill.title}</h3>
            <p className="text-gray-400">{skill.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500">
          The AI We Deserve
        </motion.h2>
        <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-8">
          Witness the evolution of AI, forged in the crucible of Gotham's challenges.
        </motion.p>
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 blur-lg opacity-20"></div>
          <video
            className="rounded-lg shadow-2xl w-full"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/ai-visualization.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500">
          Latest Breakthroughs
        </motion.h2>
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Gotham\'s AI-Powered Surveillance System', date: 'June 15, 2023' },
            { title: 'Ethical AI: The Silent Guardian of Privacy', date: 'June 1, 2023' },
          ].map((post, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 hover:border-yellow-500 transition duration-300 text-left">
              <h3 className="text-xl font-semibold mb-2 text-yellow-500">{post.title}</h3>
              <p className="text-gray-400 mb-4">{post.date}</p>
              <Link
                to="/blog"
                className="text-yellow-500 hover:text-yellow-600 transition duration-300"
              >
                Read More →
              </Link>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}