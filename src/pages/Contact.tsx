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
    setFormState(prev => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      message: ''
    };
    let isValid = true;

    if (!formState.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formState.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Email is invalid';
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

    emailjs.send(serviceId, templateId, formState, publicKey)
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
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formState.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formState.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formState.subject}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            value={formState.message}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          ></textarea>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <Send size={18} className="ml-2" />
          </Button>
        </form>
        {isSubmitted && (
          <div className="text-center mt-6 text-green-600 font-semibold">
            <CheckCircle className="inline-block mr-2" /> Message Sent Successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;