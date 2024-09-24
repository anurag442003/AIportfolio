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
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotateY: 360 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="text-6xl font-bold"
        >
          <span className="text-yellow-500">AI</span>
          <span className="text-gray-300">Knight</span>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-gray-300 font-sans relative overflow-hidden">
        {/* Dynamic background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
              backgroundSize: ['100% 100%', '200% 200%'],
            }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            style={{
              backgroundImage: 'url("/gotham-skyline.svg")',
              backgroundRepeat: 'repeat',
            }}
          ></motion.div>
        </div>

        {/* Header */}
        <header className="fixed w-full z-50 bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <NavLink to="/" className="text-2xl font-bold">
                <span className="text-yellow-500">AI</span>
                <span className="text-gray-300">Knight</span>
              </NavLink>
              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `hover:text-yellow-500 transition duration-300 ${
                        isActive ? 'text-yellow-500' : 'text-gray-300'
                      }`
                    }
                  >
                    {item.name}
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
              className="md:hidden bg-gray-900 py-2"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm hover:bg-gray-800 ${
                      isActive ? 'text-yellow-500' : 'text-gray-300'
                    }`
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
        <main className="pt-20 pb-12 z-10 relative">
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
        <footer className="bg-gray-900 py-4 text-center text-sm text-gray-500">
          <div className="container mx-auto px-6">
            <p>&copy; 2024 AIKnight. Defending Gotham with Artificial Intelligence.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

//Here are the few changes i'm specifying. 1. Instead of Blue Gradient. Keep Black-Gray gradient 2. The projects card should link have Links to a video demo and the github page. 3. Contacts Page Should include Links to my Linkedin, Github, Twitter. 4. remove the activate AI visualisation that links to a video and the latest breakthrough card in the home page