import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InputField = ({ label, type, name, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-yellow-500 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

const TextArea = ({ label, name, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-yellow-500 text-sm font-bold mb-2">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
    ></textarea>
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formState.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formState.message.trim()) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-yellow-500"
      >
        Contact the AI Knight
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextArea
              label="Message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              error={errors.message}
            />
            <motion.button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 p-4 bg-green-500 text-white rounded-md"
            >
              Thank you for your message. I'll respond as soon as possible.
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900 p-8 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4 text-yellow-500">AI Knight's Location</h3>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
              {/* Replace this with an actual map or custom Gotham City graphic */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                [Gotham City Map Placeholder]
              </div>
            </div>
          </div>
          <p className="text-gray-300 mb-2">Wayne Tower, Gotham City</p>
          <p className="text-gray-300 mb-2">Email: ai.knight@wayne-enterprises.com</p>
          <p className="text-gray-300">Phone: (555) BAT-TECH</p>
        </motion.div>
      </div>
    </div>
  );
}