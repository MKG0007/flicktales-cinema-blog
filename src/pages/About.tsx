import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film, Users, PenTool, Eye } from 'lucide-react';
import CircularGallery from '../animation/CircularGallery';

const About = () => {
  useEffect(() => {
    document.title = 'About | FlickTales';
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Only name and image for gallery
  const teamGalleryItems = [
    {
      name: 'Eleanor Richards',
      image:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Marcus Chen',
      image:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Sophia Martinez',
      image:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'David Hoffman',
      image:
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Amara Washington',
      image:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      name: 'Nadia Williams',
      image:
        'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-20"
    >
      {/* Header Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 mb-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
              Welcome to FlickTales
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Exploring the magic of movies through vibrant storytelling, sharp analysis & thoughtful conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-prose mx-auto"
        >
          <h2 className="text-3xl font-heading font-semibold mb-6 text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              At <strong> FlickTales </strong>, we treat cinema as a living, breathing canvas of emotion, ideas and cultural memory. Our mission is simple: illuminate the craft and meaning behind every frame—celebrating the films that entertain, provoke and inspire.
            </p>
            <p>
              Founded in 2025 by a collective of critics, filmmakers and lifelong movie buffs, we bridge scholarly insight with conversational warmth. Whether you are a film‑school graduate or a weekend binge‑watcher, this is your space to deepen (or spark) a love for the movies.
            </p>
            <p>
              We write with humility and curiosity, inviting dialogue rather than delivering decrees—because every film is a mirror, reflecting who we are and where we have been.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="bg-white dark:bg-gray-950 py-20 mb-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">
              Core Values That Guide Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Principles shaping every review, essay and conversation.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Film className="mb-4 text-red-600 dark:text-yellow-400" size={32} />,
                title: 'Artistic Appreciation',
                description:
                  'Cinema is a symphony of sight, sound and story—we honour each discipline and the alchemy they create together.'
              },
              {
                icon: <Users className="mb-4 text-red-600 dark:text-yellow-400" size={32} />,
                title: 'Inclusive Perspective',
                description:
                  'Great stories belong to everyone. We amplify under‑represented voices on‑screen and off, enriching the conversation for all.'
              },
              {
                icon: <PenTool className="mb-4 text-red-600 dark:text-yellow-400" size={32} />,
                title: 'Thoughtful Analysis',
                description:
                  'Beyond hot takes. We unpack technique, context and intent so you can experience films in razor‑sharp resolution.'
              },
              {
                icon: <Eye className="mb-4 text-red-600 dark:text-yellow-400" size={32} />,
                title: 'Curious Engagement',
                description: 'Better questions uncover deeper truths—we invite our readers to join the exploration.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center"
              >
                {value.icon}
                <h3 className="text-xl font-heading font-semibold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team - Circular Gallery */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">
            Meet the Minds Behind CineScope
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A small team of passionate storytellers & cine‑obsessives.
          </p>
        </motion.div>
        <div className="w-full h-[500px] md:h-[600px]">
          <CircularGallery
            items={teamGalleryItems.map((member) => ({
              image: member.image,
              text: member.name
            }))}
            bend={1.5}
            textColor="#fff"
            borderRadius={0.05}
            font="bold 24px DM Sans"
          />
        </div>
      </section>

      {/* Our Approach to Criticism */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-prose mx-auto"
          >
            <h2 className="text-3xl font-heading font-semibold mb-6 text-gray-900 dark:text-white">
              How We Critique
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                <strong>Passion + Perspective.</strong> Our reviews aim to:
              </p>
              <ul>
                <li>
                  <strong>Contextualise:</strong> Place each film within its genre, the filmmaker’s oeuvre and the cultural moment.
                </li>
                <li>
                  <strong>Spotlight:</strong> Surface technical and artistic flourishes casual viewers might miss.
                </li>
                <li>
                  <strong>Unpack:</strong> Dissect story technique, themes and character arcs that drive emotional impact.
                </li>
                <li>
                  <strong>Invite:</strong> Welcome diverse readings—because every audience brings a unique lens.
                </li>
                <li>
                  <strong>Celebrate Subjectivity:</strong> Acknowledge that personal experience shapes every encounter with art.
                </li>
              </ul>
              <p>
                Star ratings are handy shortcuts—but the real value lives in the dialogue they spark. Even when we are critical, we engage with respect for intention and craft, exploring what works, what doesn’t and, most importantly, <em>why</em>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
