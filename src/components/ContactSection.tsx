import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xwpbkayg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Thank you for your message! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        setStatus('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section relative">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-900 to-transparent"></div>
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-4">Get in <span className="text-primary-500">Touch</span></h2>
            <h3 className="mb-3">Don't Wait for an Incident to Happen. </h3>
            <p className="text-gray-300 text-lg mb-8">
              A modern Mobile DVR with AI is the single best investment you can make for your safety and your business. Protect yourself from false claims, prevent accidents, and drive with confidence.
            </p>
            <p className="text-gray-300 text-lg mb-8">
              Ready to enhance your fleet security? Contact us today for a personalized consultation and demonstration.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="mr-6 mt-1 feature-icon-container w-5 h-5">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Call Us</h3>
                  <p className="text-gray-400">+94 77 3499 994</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1 feature-icon-container w-10 h-10">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <p className="text-gray-400">info@mobiledvr.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1 feature-icon-container w-10 h-10">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Headquarters</h3>
                  <p className="text-gray-400">No 334 1st Floor, Kelaniya 11600</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="card">
              <h3 className="text-xl font-medium mb-6">Request Information</h3>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-full flex items-center justify-center">
                Send Message <Send size={18} className="ml-2" />
              </button>
            </form>
            {status && <p className="mt-4 text-center text-gray-300">{status}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;