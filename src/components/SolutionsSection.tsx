import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Solution } from '../types';
import busImg from '/img/Bus.png';
import amilaImg from '/img/Truck.png';
import o2Img from '/img/Gas.png';
import schoolBusImg from '/img/School.png';

const solutions: Solution[] = [
  {
    title: "Public Transit Systems",
    description: "Enhance passenger safety and operational efficiency with comprehensive surveillance systems designed specifically for buses, trains, and other public transportation vehicles.",
    imageUrl: busImg,
    details: "Our advanced Mobile DVR solutions are designed to make public transportation safer and more efficient. They provide comprehensive surveillance for buses, and other vehicles, helping monitor passenger activity, prevent incidents, and improve operational oversight. Key features include high-resolution video recording, real-time monitoring capabilities, secure data storage, and easy access for incident investigation. Enhanced with DMS & ADAS: We integrate Driver Monitoring Systems (DMS) to detect driver fatigue and distraction, ensuring operators remain alert and focused. Advanced Driver-Assistance Systems (ADAS) like Forward Collision Warning (FCW) and Lane Departure Warning (LDW) help prevent accidents by alerting drivers to potential hazards and keeping vehicles safely in their lanes, crucial for larger transit vehicles navigating busy routes."
  },
  {
    title: "Commercial Fleet Management",
    description: "Monitor driver behavior, ensure cargo security, and document deliveries with our advanced Mobile DVR solutions tailored for logistics and delivery companies.",
    imageUrl: amilaImg,
    details: "Our Mobile DVR solutions are tailored for logistics and delivery companies to enhance fleet management and security. They allow you to monitor driver behavior, ensure cargo security, and accurately document deliveries. Features include GPS tracking, driver performance analytics, interior and exterior camera views, and tamper-proof storage. Enhanced with DMS & ADAS: Driver Monitoring Systems (DMS) help identify and prevent risky driver behaviors such as drowsiness, distraction, or cellphone use, ensuring professional and safe conduct. Advanced Driver-Assistance Systems (ADAS) Forward Collision Warning (FCW) provide crucial alerts, helping drivers avoid accidents, especially with heavy loads, reducing damage costs and insurance claims."
  },
  {
    title: "Emergency Services",
    description: "Support critical operations with reliable evidence collection, real-time monitoring, and secure storage solutions.",
    imageUrl: o2Img,
    details: "Support critical industrial operations and emergency response with our robust Mobile DVR systems. Designed for reliability and ease of use, these systems provide crucial evidence collection, real-time monitoring, and secure storage. Features include high-definition recording, ruggedized design for demanding environments, instant access to footage, and secure data encryption. Enhanced with DMS & ADAS: Driver Monitoring Systems (DMS) ensure that first responders, who often operate under high-stress conditions, remain alert and focused, minimizing risks due to fatigue or distraction. Advanced Driver-Assistance Systems (ADAS) such as Pedestrian Detection and Front Collision Warning are vital for navigating safely through complex and urgent situations, protecting both emergency personnel and the public."
  },
  {
    title: "School Transportation",
    description: "Ensure student safety with specialized Mobile DVR systems that provide clear monitoring of both interior and exterior environments for school buses.",
    imageUrl: schoolBusImg,
    details: "Prioritize the safety of students with specialized Mobile DVR systems designed specifically for school buses. These solutions provide clear monitoring of both interior and exterior environments, giving peace of mind to parents and school authorities. Features include multiple camera views, real-time monitoring, incident flagging, and secure data storage. Enhanced with DMS & ADAS: Driver Monitoring Systems (DMS) are crucial for school bus drivers, ensuring they are attentive and free from distractions, vital for the safety of children. Advanced Driver-Assistance Systems (ADAS), including Pedestrian Detection and Forward Collision Warning, are particularly important around schools and bus stops to prevent accidents involving students, making every journey safer."
  }
];

const SolutionsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  const openModal = (solution: Solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSolution(null);
    setIsModalOpen(false);
  };

  return (
    <section id="solutions" className="section relative">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-900 to-transparent"></div>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Tailored <span className="text-primary-500">Solutions</span></h2>
          <p className="text-gray-300 text-lg">
            Our Mobile DVR systems are customized for specific industry needs, providing targeted security and operational benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={solution.imageUrl} 
                  alt={solution.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-medium mb-2">{solution.title}</h3>
                <p className="text-gray-300 mb-4 max-w-md">{solution.description}</p>
                <button
                  onClick={() => openModal(solution)}
                  className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors bg-primary-500/20 hover:bg-primary-500/30 px-4 py-2 rounded-md"
                >
                  Learn more <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedSolution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-medium">{selectedSolution.title}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <img 
              src={selectedSolution.imageUrl} 
              alt={selectedSolution.title} 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">{selectedSolution.description}</p>
            <p className="text-gray-200">{selectedSolution.details}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SolutionsSection;