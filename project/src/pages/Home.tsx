import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16">
        <motion.div className="relative z-10">
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Share Skills,{' '}
            <motion.span
              animate={{
                color: ['#6366f1', '#a855f7', '#ec4899', '#6366f1']
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Grow Together
            </motion.span>
          </motion.h1>
        </motion.div>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with skilled individuals in your area, share your expertise, and learn from others.
          Join our community of lifelong learners and skilled professionals.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <motion.span
              className="relative flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
          <Link
            to="/search"
            className="px-8 py-3 border-2 border-indigo-500 text-indigo-500 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Browse Skills
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Users className="w-12 h-12 text-indigo-500" />}
          title="Connect Locally"
          description="Find skilled individuals in your area and build meaningful connections"
        />
        <FeatureCard
          icon={<MapPin className="w-12 h-12 text-indigo-500" />}
          title="Location-Based"
          description="Discover opportunities and skills available in your neighborhood"
        />
        <FeatureCard
          icon={<Star className="w-12 h-12 text-indigo-500" />}
          title="Skill Exchange"
          description="Share your expertise and learn new skills from others"
        />
      </section>

      {/* Featured Skills Section */}
      <section className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-8">Popular Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Web Development', 'Photography', 'Cooking', 'Language Teaching', 'Graphic Design', 'Music', 'Fitness Training', 'Digital Marketing'].map((skill) => (
            <div
              key={skill}
              className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer"
            >
              <p className="font-medium text-gray-800">{skill}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Share Your Skills?</h2>
        <p className="mb-8 text-lg opacity-90">Join our growing community of skill sharers today!</p>
        <Link
          to="/signup"
          className="inline-flex items-center px-8 py-3 bg-white text-indigo-500 rounded-lg font-semibold hover:bg-opacity-90 transition-opacity"
        >
          Get Started <ArrowRight className="ml-2" />
        </Link>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
