import { Award, Code, Users, Zap, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  const skills = [
    'HTML/CSS', 'JavaScript', 'React', 'PHP', 'MySQL', 'Bootstrap',
    'Tailwind CSS', 'Node.js', 'WordPress', 'API Integration', 'SEO', 'UI/UX Design'
  ];

  const stats = [
    { label: 'Projects Completed', value: '50+', icon: Code },
    { label: 'Happy Clients', value: '40+', icon: Users },
    { label: 'Years Experience', value: '3+', icon: Award },
    { label: 'Technologies', value: '15+', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WebProject
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            MCA Graduate | Full-Stack Developer | Digital Solutions Expert
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                {/* 
                  ============================================
                  REPLACE IMAGE URL BELOW WITH YOUR PHOTO PATH
                  ============================================
                  Example: src="/assets/profile.jpg" 
                  or src="/images/my-photo.png"
                  
                  Recommended: 500x500px or 800x800px (1:1 ratio)
                  File formats: .jpg, .png, .webp
                  ============================================
                */}
                <div className="w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                  <img 
                    src="https://via.placeholder.com/500x500/4F46E5/ffffff?text=Your+Photo+Here"
                    alt="Profile Photo - Replace with your image"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      // Fallback to UI Avatars if image fails to load
                      img.src = 'https://ui-avatars.com/api/?name=Your+Name&size=500&background=4F46E5&color=fff&bold=true&font-size=0.35';
                    }}
                  />
                </div>
                
                {/* WhatsApp Contact Button */}
                <div className="mt-6">
                  <a
                    href="https://wa.me/917895227827"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    <span className="text-lg">WhatsApp Contact</span>
                  </a>
                  <p className="text-center text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    +91 7895227827
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Crafting Digital Excellence
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                As an MCA graduate with a passion for web development, I specialize in creating
                professional, scalable, and secure web solutions for businesses across India.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                With expertise in modern web technologies and a deep understanding of business needs,
                I deliver international-quality websites tailored for the Indian market.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                    <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Technical Skills
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-white dark:bg-gray-900 rounded-full shadow-md hover:shadow-xl transition-all transform hover:scale-105"
              >
                <span className="text-gray-900 dark:text-white font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Professional Journey
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  MCA Graduate
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Master of Computer Applications - Specialized in Web Technologies and Software Development
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Full-Stack Developer
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  3+ years of experience building dynamic web applications using modern frameworks and technologies
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Freelance Services
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Active on Freelancer, Fiverr, and Upwork - Delivering quality projects to clients worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADSTERRA AD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
          {/* Adsterra Banner Ad 728x90 */}
          <script type="text/javascript">
            {`
              atOptions = {
                'key' : '434ce64f269e1eb13bd566a25bf782a5',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            `}
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/434ce64f269e1eb13bd566a25bf782a5/invoke.js"></script>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
