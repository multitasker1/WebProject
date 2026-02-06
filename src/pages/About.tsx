import { motion } from 'framer-motion';
import { Award, Briefcase, Code2, GraduationCap, Heart, MapPin, Star, Users, Zap, Calendar, CheckCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { TopBannerAd, InArticleAd, BeforeFooterAd, BetweenCardsAd } from '../components/AdSense';

export function About() {
  const { darkMode } = useApp();

  const skills = [
    { name: 'HTML/CSS', level: 95, color: 'from-orange-500 to-red-500' },
    { name: 'JavaScript', level: 90, color: 'from-yellow-500 to-orange-500' },
    { name: 'React.js', level: 88, color: 'from-cyan-500 to-blue-500' },
    { name: 'Node.js', level: 85, color: 'from-green-500 to-emerald-500' },
    { name: 'PHP/MySQL', level: 82, color: 'from-indigo-500 to-purple-500' },
    { name: 'TypeScript', level: 80, color: 'from-blue-500 to-indigo-500' },
    { name: 'Tailwind CSS', level: 92, color: 'from-teal-500 to-cyan-500' },
    { name: 'MongoDB', level: 78, color: 'from-green-600 to-lime-500' },
  ];

  const experiences = [
    { 
      year: '2023 - Present', 
      title: 'Senior Full Stack Developer', 
      company: 'WebProject (Founder)', 
      description: 'Leading web development projects and building custom solutions for clients across India.',
      icon: Briefcase
    },
    { 
      year: '2021 - 2023', 
      title: 'Full Stack Developer', 
      company: 'Freelance', 
      description: 'Worked with 50+ clients on various web projects including e-commerce, portfolios, and web apps.',
      icon: Code2
    },
    { 
      year: '2019 - 2021', 
      title: 'Web Developer', 
      company: 'Tech Startup', 
      description: 'Developed and maintained web applications using modern JavaScript frameworks.',
      icon: Zap
    },
    { 
      year: '2017 - 2019', 
      title: 'MCA Graduate', 
      company: 'University', 
      description: 'Completed Master of Computer Applications with specialization in Web Technologies.',
      icon: GraduationCap
    },
  ];

  const certificates = [
    { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023', icon: '☁️' },
    { name: 'Google Analytics Certified', issuer: 'Google', year: '2023', icon: '📊' },
    { name: 'Meta Frontend Developer', issuer: 'Meta', year: '2022', icon: '⚛️' },
    { name: 'MongoDB Developer', issuer: 'MongoDB University', year: '2022', icon: '🍃' },
  ];

  const stats = [
    { value: '150+', label: 'Projects Completed', icon: CheckCircle },
    { value: '50+', label: 'Happy Clients', icon: Users },
    { value: '5+', label: 'Years Experience', icon: Calendar },
    { value: '98%', label: 'Satisfaction Rate', icon: Star },
  ];

  const socialLinks = [
    { name: 'YouTube', url: 'https://www.youtube.com/channel/UC02d9M7WacwzYw126cTah8Q', icon: '📺', color: 'from-red-500 to-red-600' },
    { name: 'YouTube 2', url: 'https://www.youtube.com/channel/UCyUfyldLLudcVNnmjk_AlRQ', icon: '🎬', color: 'from-red-600 to-pink-600' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ashish-solanki-439b8537b/', icon: '💼', color: 'from-blue-600 to-blue-700' },
    { name: 'GitHub', url: 'https://github.io/mutitasker1/', icon: '💻', color: 'from-gray-700 to-gray-900' },
    { name: 'Freelancer', url: 'https://www.freelancer.com/u/ashishs957', icon: '🚀', color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <div className={`min-h-screen pt-28 pb-20 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative z-10">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
                    alt="Developer"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-600/30 to-transparent" />
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className={`absolute -right-6 top-10 p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-violet-600">5+</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Years Exp.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Another Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className={`absolute -left-6 bottom-20 p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">50+</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Clients</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 text-center lg:text-left"
            >
              <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-violet-500 font-bold text-sm tracking-wider uppercase mb-8">
                👋 About Me
              </span>
              
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Hi, I'm
                <span className="block mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Ashish Solanki
                </span>
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                <GraduationCap className="w-6 h-6 text-violet-500" />
                <span className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  MCA Graduate | Full Stack Developer
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
                <MapPin className="w-5 h-5 text-violet-500" />
                <span className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  India
                </span>
              </div>
              
              <p className={`text-lg md:text-xl leading-relaxed mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                I'm a passionate Full Stack Developer with 5+ years of experience in building modern, responsive, and user-friendly websites and web applications. I specialize in React, Node.js, and creating custom solutions that help businesses grow online.
              </p>

              <p className={`text-lg leading-relaxed mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                My mission is to deliver high-quality, scalable web solutions that not only look great but also perform exceptionally. I believe in clean code, modern design, and exceeding client expectations.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="https://www.freelancer.com/u/ashishs957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-2xl transition-all duration-300"
                >
                  <Briefcase className="w-5 h-5" />
                  Hire Me
                </a>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-3 px-8 py-4 font-bold text-lg rounded-2xl border-2 transition-all duration-300 ${
                    darkMode 
                      ? 'border-gray-700 text-white hover:border-violet-500' 
                      : 'border-gray-300 text-gray-900 hover:border-violet-500'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <TopBannerAd />

      {/* Stats Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card-3d text-center p-8 md:p-10 rounded-3xl ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white shadow-xl border border-gray-100'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-violet-600 mb-3">{stat.value}</p>
                <p className={`text-base font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Article Ad */}
      <InArticleAd />

      {/* Skills Section */}
      <section className={`py-20 md:py-28 ${darkMode ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              💪 My Skills
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Technical Expertise
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              I continuously learn and improve my skills to deliver the best solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-6 md:p-8 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {skill.name}
                  </span>
                  <span className="text-lg font-bold text-violet-600">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Between Cards Ad */}
      <BetweenCardsAd />

      {/* Experience Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              📚 Experience
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              My Journey
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-violet-600 to-indigo-600 rounded-full" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex items-center mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className={`card-3d p-8 rounded-3xl ${
                    darkMode 
                      ? 'bg-gray-800/50 border border-gray-700/50' 
                      : 'bg-white shadow-xl border border-gray-100'
                  }`}>
                    <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm mb-4">
                      {exp.year}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {exp.title}
                    </h3>
                    <p className="text-violet-600 font-semibold mb-4">{exp.company}</p>
                    <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center shadow-xl z-10">
                  <exp.icon className="w-8 h-8 text-white" />
                </div>

                {/* Empty space for the other side */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Article Ad */}
      <InArticleAd />

      {/* Certificates */}
      <section className={`py-20 md:py-28 ${darkMode ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              🏆 Certifications
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Professional Certifications
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`card-3d text-center p-8 md:p-10 rounded-3xl ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white shadow-xl border border-gray-100'
                }`}
              >
                <span className="text-5xl mb-6 block">{cert.icon}</span>
                <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {cert.name}
                </h3>
                <p className="text-violet-600 font-medium mb-2">{cert.issuer}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              🌐 Connect With Me
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Follow My Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`card-3d flex items-center gap-6 p-8 rounded-3xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50 hover:border-violet-500/50' 
                    : 'bg-white shadow-xl border border-gray-100 hover:border-violet-300'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${link.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {link.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {link.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Click to visit →
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Before Footer Ad */}
      <BeforeFooterAd />
    </div>
  );
}
