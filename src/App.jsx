import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <Router>
      <div className="min-h-screen bg-black text-gray-300 font-sans relative">
        {/* <img src={bg} alt="Batman Background" className="absolute z-0 inset-0 w-full h-full object-cover" /> */}
        <header className="fixed w-full z-10">
          <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-red-500">Bat</span>AI
              </Link>
              <div className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="hover:text-red-500 transition duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-300 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isOpen ? (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </nav>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="md:hidden bg-gray-900 py-2"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 text-sm hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </header>

        <main className="pt-16 z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 py-4 mt-8 absolute inset-x-0 bottom-0">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2023 BatAI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}