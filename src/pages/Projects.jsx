import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Batcomputer AI',
    description: 'Advanced AI system for crime analysis and prediction',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    title: 'Gotham Security Network',
    description: 'AI-powered surveillance system for Gotham City',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    title: 'Batmobile Autopilot',
    description: 'Self-driving AI for the Batmobile',
    image: '/placeholder.svg?height=200&width=300',
  },
]

export default function Projects() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        My <span className="text-yellow-400">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}