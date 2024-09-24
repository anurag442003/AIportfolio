import { motion } from 'framer-motion'

const blogPosts = [
  {
    title: 'The Future of AI in Crime Fighting',
    date: 'May 15, 2023',
    excerpt: 'Exploring how artificial intelligence is revolutionizing law enforcement...',
  },
  {
    title: 'Machine Learning: From Batcave to Gotham',
    date: 'April 28, 2023',
    excerpt: 'How I applied machine learning algorithms to protect Gotham City...',
  },
  {
    title: 'Ethics in AI: Lessons from a Dark Knight',
    date: 'April 10, 2023',
    excerpt: 'Discussing the ethical implications of AI in vigilante justice...',
  },
]

export default function Blog() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Latest from the <span className="text-yellow-400">Batcave</span>
      </h2>
      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{post.date}</p>
            <p className="text-gray-300">{post.excerpt}</p>
            <a
              href="#"
              className="inline-block mt-4 text-yellow-400 hover:underline"
            >
              Read more
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}