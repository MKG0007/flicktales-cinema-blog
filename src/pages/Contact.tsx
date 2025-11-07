import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import Button from '../components/UI/Button';
import emailjs from '@emailjs/browser';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact | FlickTales';
  }, []);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formState.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formState.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formState.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const serviceId = 'service_udj37o7';
    const templateId = 'template_g0fotwl';
    const publicKey = 'yf1rjWW9q35vtEOtl';

    emailjs
      .send(serviceId, templateId, formState, publicKey)
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setIsSubmitting(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-20 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* ===== Header Section ===== */}
      <section className="text-center mb-16 px-6">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500"
        >
          Get in Touch
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          We’d love to hear from you — whether it’s feedback, collaboration, or just to say hello 🎬
        </p>
      </section>

      {/* ===== Contact Info ===== */}
      <section className="container mx-auto px-6 mb-16 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Mail size={26} />,
            title: 'Email',
            text: 'support@flicktales.com'
          },
          {
            icon: <Phone size={26} />,
            title: 'Phone',
            text: '+91 98765 43210'
          },
          {
            icon: <MapPin size={26} />,
            title: 'Location',
            text: 'Agra, Uttar Pradesh, India'
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-6 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-800 hover:border-red-500/40 shadow-md hover:shadow-red-500/10 text-center transition-all"
          >
            <div className="mb-4 text-red-600 dark:text-yellow-400 flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
            <p className="text-gray-700 dark:text-gray-400">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* ===== Contact Form ===== */}
      <section className="container mx-auto px-6">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto p-10 rounded-3xl backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-red-500/10 transition-all"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formState.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-white/5 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {formErrors.name && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-white/5 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {formErrors.email && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <input
            type="text"
            name="subject"
            placeholder="Subject (Optional)"
            value={formState.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 mb-6 rounded-lg bg-white dark:bg-white/5 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Message */}
          <textarea
            name="message"
            rows="6"
            placeholder="Your Message..."
            value={formState.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-white/5 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
          {formErrors.message && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{formErrors.message}</p>
          )}

          {/* Submit */}
          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center bg-gradient-to-r from-red-600 to-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send size={18} className="ml-2" />
            </Button>
          </div>
        </motion.form>

        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10 text-green-600 dark:text-green-400 font-semibold flex justify-center items-center gap-2"
          >
            <CheckCircle size={22} /> Message Sent Successfully!
          </motion.div>
        )}
      </section>

      {/* ===== Cinematic Divider ===== */}
      <div className="mt-20 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-70 w-3/4 mx-auto rounded-full blur-sm" />
    </motion.div>
  );
};

export default Contact;
