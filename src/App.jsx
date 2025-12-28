import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Play, Star, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import emailjs from '@emailjs/browser';

//Animate contact us
const variants = {
  initial: { scale: 0.8, opacity: 0, y: 30 },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.5 },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: 30,
    transition: { duration: 0.5 },
  },
};

// Contact Form Component
const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration - Replace with your actual IDs
      const serviceId = 'service_an3nu74';
      const templateId = 'template_5n2qs91';
      const userId = 'gNxPGHOi6K9jb8rdM';
      
    const templateParams = {
        from_name: formData.name,
        from_title: formData.title,
        from_email: formData.email,
        message: formData.message,
        to_name: 'JDS Team',
        reply_to: formData.email,
        user_name: formData.name,
        user_email: formData.email,
        user_message: formData.message,
        user_title: formData.title
 };
      
      await emailjs.send(serviceId, templateId, templateParams, userId);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitted(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setIsSubmitting(false);
      
      // Show error message to user
      setErrors({ submit: 'Failed to send message. Please try again or contact us directly.' });
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode='wait'>
    <motion.div 
    variants={variants} initial="initial" animate="animate" exit="exit"
    className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-20 z-50 flex items-center justify-center p-4">
      <div className="group2 bg-white shadow rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
            Schedule a Consultation
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {!isSubmitted ? (
            <>
              <p className="text-gray-600 mb-6">
                Ready to grow your brand online? Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-600'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-600'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-600'
                    }`}
                    placeholder="Tell us about your project, goals, and how we can help you..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-600 to-orange-400 hover:shadow-lg transform hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📧</span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for reaching out! We'll get back to you within 24 hours.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-700 text-sm">
                  <strong>What's next?</strong> Our team will review your project details and send you a personalized consultation proposal.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
    </AnimatePresence>
  );
};

const Jds = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const services = [
    {
      title: "Web Design & Development",
      description: "Custom websites built to convert visitors into customers",
      icon: "🎨"
    },
    {
      title: "Branding & Strategy",
      description: "Comprehensive brand identity and digital strategy",
      icon: "⚡"
    },
    {
      title: "Digital Marketing",
      description: "Results-driven marketing campaigns that grow your business",
      icon: "📈"
    },
    {
      title: "E-commerce Solutions",
      description: "Powerful online stores that drive sales and revenue",
      icon: "🛒"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "200+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "50+", label: "Team Members" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      quote: "JDS transformed our online presence completely. Our conversion rates increased by 300%.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "E-commerce Plus",
      quote: "The team's expertise in web design and digital marketing is unmatched. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "Creative Agency",
      quote: "Professional, creative, and results-driven. JDS exceeded all our expectations.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-orange-200 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
             <motion.div 
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 25,
                          delay: 0.3,
                          duration: 1.3,
                        }}
                        className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
                JD Solutions
              </div>
            </motion.div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <motion.a 
                                initial = {{opacity: 0, y: -20}}
                                animate = {{opacity: 1, y: 0}}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 20,
                                  delay: 0.7,
                                }} href="#services" className="relative text-gray-900 hover:text-red-600 transition-colors font-medium px-1 py-2 group">
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-400 group-hover:w-full transition-all duration-300 ease-out"></span>
                </motion.a>

                   <motion.a 
                                initial = {{opacity: 0, y: -20}}
                                animate = {{opacity: 1, y: 0}}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 20,
                                  delay: 0.8
                                }} href="#" className="relative text-gray-900 hover:text-red-600 transition-colors font-medium px-1 py-2 group">
                  Portfolio
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-400 group-hover:w-full transition-all duration-300 ease-out"></span>
                </motion.a>

                <motion.a 
                                initial = {{opacity: 0, y: -20}}
                                animate = {{opacity: 1, y: 0}}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 20,
                                  delay: 0.9
                                }} href="#about" className="relative text-gray-900 hover:text-red-600 transition-colors font-medium px-1 py-2 group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-400 group-hover:w-full transition-all duration-300 ease-out"></span>
                </motion.a>

                 <motion.a 
                                initial = {{opacity: 0, y: -20}}
                                animate = {{opacity: 1, y: 0}}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 20,
                                  delay: 1
                                }} href="#" className="relative text-gray-900 hover:text-red-600 transition-colors font-medium px-1 py-2 group">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-400 group-hover:w-full transition-all duration-300 ease-out"></span>
                </motion.a>
                <motion.button 
                                  onClick={() => setIsContactFormOpen(true)}
                                  initial = {{opacity: 0, y: -20}}
                                animate = {{opacity: 1, y: 0}}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 20,
                                  delay: 1}}
                  className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </motion.button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#services" className="relative block px-3 py-3 text-gray-900 hover:text-red-600 group">
                Services
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-400 group-hover:w-20 transition-all duration-300 ease-out"></span>
              </a>
              <a href="#" className="relative block px-3 py-3 text-gray-900 hover:text-red-600 group">
                Portfolio
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-400 group-hover:w-20 transition-all duration-300 ease-out"></span>
              </a>
              <a href="#about" className="relative block px-3 py-3 text-gray-900 hover:text-red-600 group">
                About
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-400 group-hover:w-20 transition-all duration-300 ease-out"></span>
              </a>
              <a href="#" className="relative block px-3 py-3 text-gray-900 hover:text-red-600 group">
                Contact
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-400 group-hover:w-20 transition-all duration-300 ease-out"></span>
              </a>
              <button 
                onClick={() => setIsContactFormOpen(true)}
                className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-400 text-white px-6 py-2 rounded-full"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section 
             initial={{ opacity: 0}}
             whileInView={{ opacity: 1}}
             viewport={{ once: true }}
             transition={{ duration: 1.5 }}
              className="pt-24 pb-20 bg-orange-200  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Growing Brands
                  <span className="bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent block">
                    Online
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  We're a full-service digital agency focused on creating exceptional online experiences that drive growth and deliver results.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsContactFormOpen(true)}
                  className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center font-semibold"
                >
                  Start Your Project
                  <ArrowRight className="ml-2" size={20} />
                </button>
                
                {/* <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-red-600 hover:text-red-600 transition-all duration-300 flex items-center justify-center font-semibold">
                  <Play className="mr-2" size={20} />
                  Watch Our Story
                </button>  */}
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-sm text-gray-600">200+ Happy Clients</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src='../src/assets/growth.jpg'/>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-2xl transform -rotate-3 opacity-20"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
             initial={{ x: -300, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }} className="py-16 bg-gradient-to-r from-red-600 to-orange-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }} 
            className="py-20 bg-orange-200 " id='services'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive digital solutions to help your business thrive in the digital landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group2 relative bg-gray shadow-sm border border-gray-200 rounded-2xl p-8 hover:bg-gradient-to-r hover:from-red-50 hover:via-orange-50 hover:to-red-50 hover:border-red-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-orange-400/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div> 
                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 mb-8 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">{service.description}</p>
                  <div className="flex items-center text-red-600 group-hover:text-orange-400 transition-all duration-300">
                    <span className="font-semibold">Learn More</span>
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
               
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
             initial={{ rotateY: 100, opacity: 0 }}
             whileInView={{ rotateY: 0, opacity: 1 }}
             viewport={{ once: true }}
            transition={{ duration: 1 }}
       className="py-20 bg-gradient-to-br from-red-900 to-orange-900 text-white relative overflow-hidden" id='about'>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/20 to-orange-400/20"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-400 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  About JDS
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-gray-300">
                  Founded in 2019, JDS has grown from a small creative studio to a full-service digital agency trusted by brands worldwide. We combine strategic thinking with creative excellence to deliver digital experiences that drive real business results.
                </p>
                <p className="text-gray-300">
                  Our team of award-winning designers, developers, and digital strategists work collaboratively to bring your vision to life. We don't just build websites – we craft digital ecosystems that engage, convert, and grow with your business.
                </p>
                <p className="text-gray-300">
                  From Fortune 500 companies to innovative startups, we've helped hundreds of brands establish their digital presence and achieve measurable growth through strategic design and development.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* <button className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center">
                  Learn More About Us
                  <ArrowRight className="ml-2" size={20} />
                </button> */}
                <a href='#team' className="border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold">
                  Meet Our Team
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Our Core Values</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-lg">Innovation First</h4>
                      <p className="text-gray-300 text-sm">We stay ahead of digital trends to deliver cutting-edge solutions.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-lg">Results Driven</h4>
                      <p className="text-gray-300 text-sm">Every decision we make is focused on delivering measurable business results.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-lg">Client Partnership</h4>
                      <p className="text-gray-300 text-sm">We build long-term relationships based on trust and transparency.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-lg">Creative Excellence</h4>
                      <p className="text-gray-300 text-sm">We combine strategic thinking with exceptional creative execution.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Awards & Recognition</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-sm text-gray-300">Best Digital Agency</div>
                    <div className="text-xs text-red-300">2023</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-sm text-gray-300">Top Web Designer</div>
                    <div className="text-xs text-orange-300">2023</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-sm text-gray-300">Innovation Award</div>
                    <div className="text-xs text-red-300">2023</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">💎</div>
                    <div className="text-sm text-gray-300">Excellence in UX</div>
                    <div className="text-xs text-orange-300">2022</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-16 border-t border-white/20" id='team'>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Our Team</h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Meet the talented individuals who bring creativity, expertise, and passion to every project
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">15+</div>
                <div className="text-gray-300">Designers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">20+</div>
                <div className="text-gray-300">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">8+</div>
                <div className="text-gray-300">Strategists</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">7+</div>
                <div className="text-gray-300">Marketing Experts</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
            initial={{ scale: .5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
           className="py-20 bg-orange-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
             initial={{ y: 100, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }} 
             className="py-20 bg-gradient-to-r from-red-600 to-orange-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Brand Online?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Let's work together to create something amazing that drives real results for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="bg-white text-red-600 px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Schedule a Consultation
            </button>
              {/* <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-red-600 transition-all duration-300 font-semibold">
              View Our Portfolio
            </button> */}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-red-950  text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                JDS
              </div>
              <p className="text-white">
                Growing brands online through exceptional digital experiences.
              </p>
              <div className="flex space-x-4">
                <a href='https://facebook.com/jumerrydigital'target='_blank' className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 cursor-pointer transition-colors">
                  <span className="text-sm font-bold text-center">f</span>
                </a>
                <a href='https://www.instagram.com/jumerry_digital'target='_blank' className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center hover:bg-orange-300 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">Inst</span>
                </a>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <a href="#" className="block text-white hover:text-black transition-colors">Web Design</a>
                <a href="#" className="block text-white hover:text-black transition-colors">Development</a>
                <a href="#" className="block text-white hover:text-black transition-colors">Digital Marketing</a>
                <a href="#" className="block text-white hover:text-black transition-colors">Branding</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#"className="block text-gray-white hover:text-black transition-colors">About Us</a>
                <a href="#" className="block text-gray-white hover:text-black transition-colors">Portfolio</a>
                <a href="#" className="block text-gray-white hover:text-black transition-colors">Careers</a>
                <a href="#" className="block text-gray-white hover:text-black transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-white">
                <p>Lagos, Nigeria</p>
                <p>Ikeja</p>
                <p>Jumerrydigitalsolutions@gmail.com</p>
                {/* <p>(555) 123-4567</p> */}
              </div>
            </div>
          </div>

          <div className="border-t border-white mt-12 pt-8 text-center text-white-400">
            <p>&copy; 2025 JDS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform flex items-center justify-center group ${
          showBackToTop 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-16 opacity-0 scale-50 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ChevronUp 
          size={24} 
          className="transform group-hover:-translate-y-1 transition-transform duration-200" 
        />
        
        {/* Animated ring on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-orange-400 opacity-0 group-hover:opacity-30 scale-110 group-hover:scale-125 transition-all duration-300"></div>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-orange-400 animate-pulse opacity-20"></div>
      </button>
    </div>
  );
};

export default Jds;