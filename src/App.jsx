import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const pageVariants = {
    initial: { opacity: 0, x: '-100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100%' },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <motion.img
          src="/assets/bat.png"
          alt="Batman Symbol"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-512 h-128" // Increased from w-32 h-32 to w-64 h-64
        />
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-gray-300 font-sans relative overflow-hidden">
        {/* Background image */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('assets/dark.jpeg')" }}
        />

        {/* Overlay for better text visibility */}
        <div className="fixed inset-0 z-0 bg-black opacity-50" />

        {/* Header */}
        <header className="fixed w-full z-50 bg-gradient-to-b from-black to-black shadow-lg">
          <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <NavLink to="/" className="flex items-center">
                <img src="/assets/batmetal.png" alt="AI Logo" className="h-8 w-auto" />
              </NavLink>
              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative overflow-hidden px-3 py-2 rounded-lg transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-300'
                      } hover:text-white hover:shadow-lg hover:shadow-white/30`
                    }
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                  </NavLink>
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
              className="md:hidden bg-gradient-to-b from-black to-black py-2"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm ${
                      isActive ? 'text-white' : 'text-gray-300'
                    } hover:text-white hover:bg-white/10 transition-colors duration-300`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </motion.div>
          )}
        </header>

        {/* Main content */}
        <main className="flex-grow pt-20 pb-12 z-10 relative">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    key="home"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Home />
                  </motion.div>
                }
              />
              <Route
                path="/projects"
                element={
                  <motion.div
                    key="projects"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Projects />
                  </motion.div>
                }
              />
              <Route
                path="/blog"
                element={
                  <motion.div
                    key="blog"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Blog />
                  </motion.div>
                }
              />
              <Route
                path="/contact"
                element={
                  <motion.div
                    key="contact"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Contact />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-t from-black to-black py-4 text-center text-sm text-gray-500 z-10 w-full absolute bottom-0 shadow-lg shadow-black/50">
          <div className="container mx-auto px-6">
            <p>&copy; Made with ❤️ by Anurag</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}