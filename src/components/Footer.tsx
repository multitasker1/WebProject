import { Youtube, Linkedin, Github, Briefcase } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UC02d9M7WacwzYw126cTah8Q',
      icon: Youtube,
      color: 'hover:bg-red-600'
    },
    {
      name: 'YouTube 2',
      url: 'https://www.youtube.com/channel/UCyUfyldLLudcVNnmjk_AlRQ',
      icon: Youtube,
      color: 'hover:bg-red-500'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ashish-solanki-439b8537b/',
      icon: Linkedin,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'GitHub',
      url: 'https://github.io/mutitasker1/',
      icon: Github,
      color: 'hover:bg-gray-800'
    },
    {
      name: 'Freelancer',
      url: 'https://www.freelancer.com/u/ashishs957',
      icon: Briefcase,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Fiverr',
      url: '#',
      icon: Briefcase,
      color: 'hover:bg-green-600'
    },
    {
      name: 'Upwork',
      url: '#',
      icon: Briefcase,
      color: 'hover:bg-green-700'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Links */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6 text-center">Connect With Us</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center space-x-2 px-6 py-3 bg-gray-800 rounded-lg transition-all transform hover:scale-105 ${link.color} hover:text-white`}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">WebProject</h4>
              <p className="text-gray-400 text-sm">
                Professional web development services in India. Creating custom websites and web applications with cutting-edge technology.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="/projects" className="hover:text-white transition">Projects</a></li>
                <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Web Development</li>
                <li>Web Design</li>
                <li>Custom Applications</li>
                <li>SEO Optimization</li>
                <li>Maintenance & Support</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} WebProject. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ in India | MCA Graduate</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
