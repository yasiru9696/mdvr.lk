import React from 'react';
import { 
  Camera, 
  Cloud, 
  HardDrive, 
  Wifi, 
  Shield, 
  Eye, 
  MapPin, 
  Monitor
} from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "HD Video Recording",
    description: "Capture crystal clear footage with our high-definition cameras designed for vehicle environments.",
    icon: "Camera"
  },
  {
    title: "Cloud Backup",
    description: "Automatically upload and store footage securely in the cloud with optional cellular connectivity.",
    icon: "Cloud"
  },
  {
    title: "Redundant Storage",
    description: "Local storage with redundancy ensures your data remains safe even in offline conditions.",
    icon: "HardDrive"
  },
  {
    title: "Wireless Connectivity",
    description: "Connect to your fleet's DVR systems remotely using 4G cellular & Wi-Fi technologies.",
    icon: "Wifi"
  },
  {
    title: "Tamper Protection",
    description: "Advanced security features prevent unauthorized access to footage and hardware.",
    icon: "Shield"
  },
  {
    title: "AI-Powered Analytics",
    description: "Intelligent system can detect incidents, analyze driver behavior, and provide actionable insights.",
    icon: "Eye"
  },
  {
    title: "GPS Integration",
    description: "Synchronize video with location data for comprehensive trip documentation and analysis.",
    icon: "MapPin"
  },
  {
    title: "Live Monitoring",
    description: "Monitor your entire vehicle fleet in one place with real-time tracking available on web, PC, and mobile.",
    icon: "Monitor"
  }
];

const getIcon = (iconName: string, className: string = "h-8 w-8 text-white") => {
  switch (iconName) {
    case "Camera": return <Camera className={className} />;
    case "Cloud": return <Cloud className={className} />;
    case "HardDrive": return <HardDrive className={className} />;
    case "Wifi": return <Wifi className={className} />;
    case "Shield": return <Shield className={className} />;
    case "Eye": return <Eye className={className} />;
    case "MapPin": return <MapPin className={className} />;
    case "Monitor": return <Monitor className={className} />;
    default: return <Camera className={className} />;
  }
};

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="section ">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-900 to-transparent"></div>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Powerful <span className="text-primary-500">Features</span></h2>
          <p className="text-White-300 text-lg">
            Our Mobile DVR systems come equipped with industry-leading capabilities designed to meet the demanding needs of modern fleets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card group hover:bg-gradient-to-b hover:from-dark-800 hover:to-dark-900/80"
            >
              <div className="mb-8 group-hover:from-primary-400/4 group-hover:to-secondary-400/40">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;