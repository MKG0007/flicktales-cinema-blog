import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film, Users, PenTool, Eye } from 'lucide-react';
import CircularGallery from '../animation/CircularGallery';

const About = () => {
  useEffect(() => {
    document.title = 'About | FlickTales';
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 }
    }
  };

  const teamGalleryItems = [
    { name: 'Eleanor Richards', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { name: 'Marcus Chen', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { name: 'Sophia Martinez', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { name: 'David Hoffman', image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { name: 'Amara Washington', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { name: 'Nadia Williams', image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-20 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* ===== Header Section ===== */}
      <section className="relative py-28 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.08),transparent)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.15),transparent)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500">
              Welcome to FlickTales
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Exploring the magic of movies through vibrant storytelling, sharp analysis & thoughtful conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Mission Section ===== */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-heading font-semibold mb-8 text-red-500 dark:text-red-400">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            At <strong>FlickTales</strong>, we treat cinema as a living, breathing canvas of emotion, ideas, and cultural memory. Our mission is simple: illuminate the craft and meaning behind every frame—celebrating the films that entertain, provoke, and inspire.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Founded in 2025 by a collective of critics, filmmakers, and lifelong movie buffs, we bridge scholarly insight with conversational warmth. Whether you are a film-school graduate or a weekend binge-watcher, this is your space to deepen your love for cinema.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We write with humility and curiosity, inviting dialogue rather than delivering decrees—because every film is a mirror, reflecting who we are and where we have been.
          </p>
        </motion.div>
      </section>

      {/* ===== Core Values Section ===== */}
      <section className="py-24 bg-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 mb-20 transition-colors">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-heading font-semibold mb-4 text-yellow-500 dark:text-yellow-400">
              Core Values That Guide Us
            </h2>
            <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
              Principles shaping every review, essay, and conversation.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {[
              {
                icon: <Film className="mb-5 text-red-600 dark:text-red-500" size={36} />,
                title: 'Artistic Appreciation',
                description:
                  'Cinema is a symphony of sight, sound, and story—we honor each discipline and the alchemy they create together.'
              },
              {
                icon: <Users className="mb-5 text-yellow-500 dark:text-yellow-400" size={36} />,
                title: 'Inclusive Perspective',
                description:
                  'Great stories belong to everyone. We amplify under-represented voices on-screen and off, enriching the conversation for all.'
              },
              {
                icon: <PenTool className="mb-5 text-purple-500 dark:text-purple-400" size={36} />,
                title: 'Thoughtful Analysis',
                description:
                  'Beyond hot takes. We unpack technique, context, and intent so you can experience films in razor-sharp resolution.'
              },
              {
                icon: <Eye className="mb-5 text-blue-500 dark:text-blue-400" size={36} />,
                title: 'Curious Engagement',
                description:
                  'Better questions uncover deeper truths—we invite our readers to join the exploration.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="p-8 rounded-2xl backdrop-blur-lg bg-white/70 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 text-center shadow-md hover:shadow-red-500/20 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Team Gallery Section ===== */}
      <section className="container mx-auto px-6 mb-24 text-center">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-heading font-semibold mb-4 text-red-600 dark:text-red-400">
            Meet the Minds Behind FlickTales
          </h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            A small team of passionate storytellers & cine-obsessives.
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

      {/* ===== Critique Section ===== */}
      <section className="bg-gray-100 dark:bg-gray-900 py-24 transition-colors">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-heading font-semibold mb-6 text-yellow-500 dark:text-yellow-400 text-center">
              How We Critique
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li><strong>Contextualize:</strong> Place each film within its genre, the filmmaker’s oeuvre, and the cultural moment.</li>
              <li><strong>Spotlight:</strong> Surface technical and artistic flourishes casual viewers might miss.</li>
              <li><strong>Unpack:</strong> Dissect story technique, themes, and character arcs that drive emotional impact.</li>
              <li><strong>Invite:</strong> Welcome diverse readings—because every audience brings a unique lens.</li>
              <li><strong>Celebrate Subjectivity:</strong> Acknowledge that personal experience shapes every encounter with art.</li>
            </ul>
            <p className="mt-8 text-gray-600 dark:text-gray-400 text-center">
              Star ratings are handy shortcuts—but the real value lives in the dialogue they spark.  
              Even when we are critical, we engage with respect for intention and craft, exploring what works, what doesn’t, and most importantly, <em>why</em>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Cinematic Divider ===== */}
      <div className="mt-20 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-70 w-3/4 mx-auto rounded-full blur-sm" />
    </motion.div>
  );
};

export default About;
