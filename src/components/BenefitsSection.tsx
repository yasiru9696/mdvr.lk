import React, { useState } from 'react';
import mobile from '/img/mobile.jpg';
import Sleep from '/img/Sleep.jpg';
import Belt from '/img/Belt.jpg';
import Smoke from '/img/Smoke.jpg';
import Distraction from '/img/Distraction.jpg';
import HWM from '/img/HWM.jpg';
import FCW from '/img/FCW.jpg';
import LD from '/img/LD.jpg';
import PCW from '/img/PCW.jpg';
import Brake from '/img/Brake.png';

// Updated videoId for FCW to 1094598156, others are placeholders
const adasDetails = [
  { text: "Headway Monitoring Warning (HMW): Detects if your vehicle is following the vehicle in front too closely.", imageUrl: HWM, videoId: "1094598129" },
  { text: "Forward Collision Warning (FCW): Alerts the driver to potential front-end collisions.", imageUrl: FCW, videoId: "1094598156" },
  { text: "Lane Departure Warning (LDW): Warns the driver if the vehicle drifts out of its lane unintentionally.", imageUrl: LD, videoId: "1094598142" },
  { text: "Pedestrian Collision Warning (PCW): Detects pedestrians and warns the driver of potential impacts.", imageUrl: PCW, videoId: "1094598114" },
  { text: "Sudden Brake Detection (SBD): Provides an immediate warning if rapid Acceleration / deceleration is detected.", imageUrl: Brake, videoId: "1094605724" },
];

const dmsDetails = [
  { text: "Phone Detection: Identifies if the driver is using a mobile phone while driving.", imageUrl: mobile, videoId: "1094598071" },
  { text: "Seatbelt Detection: Checks if the driver is wearing their seatbelt.", imageUrl: Belt, videoId: "1094598059" },
  { text: "Smoking Detection: Detects if the driver is smoking.", imageUrl: Smoke, videoId: "1094598084" },
  { text: "Sleep Detection: Monitors the driver for signs of drowsiness or fatigue.", imageUrl: Sleep, videoId: "1094598050" },
  { text: "Distraction Detection: Identifies general signs of driver distraction.", imageUrl: Distraction, videoId: "1094598038" },
];

const BenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ADAS');
  const [showModal, setShowModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('');

  const openVideoModal = (videoId: string) => {
    setCurrentVideoId(videoId);
    setShowModal(true);
  };

  const closeVideoModal = () => {
    setShowModal(false);
    setCurrentVideoId('');
  };

  const renderDetails = () => {
    const details = activeTab === 'ADAS' ? adasDetails : dmsDetails;
    // Group details into pairs
    const pairedDetails = [];
    for (let i = 0; i < details.length; i += 2) {
      pairedDetails.push(details.slice(i, i + 2));
    }

    return (
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col">
          <h3 className="text-white font-bold mb-2">{activeTab === 'ADAS' ? 'Your Extra Set of Eyes on the Road' : 'Driver Monitoring Insights'}</h3>
          <p className="text-gray-300 mb-4">{activeTab === 'ADAS' ? 'ADAS uses a forward-facing camera to identify potential dangers, giving you crucial warnings to avoid collisions.' : 'DMS ensures driver attentiveness and compliance with safety protocols.'}</p>
        </div>
        {pairedDetails.map((pair, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pair.map((detail, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img src={detail.imageUrl} alt={detail.text} className={activeTab === 'ADAS' ? 'w-50 h-28 flex-shrink-0' : 'w-40 h-40 flex-shrink-0'} />
                <div className="flex-1">
                  <p className="text-gray-300">{detail.text}</p>
                  <button
                    className="mt-2 px-4 py-1 bg-primary-500 text-white rounded hover:bg-primary-600"
                    onClick={() => openVideoModal(detail.videoId)}
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="benefits" className="section bg-dark-900">
      <div className="container-custom">
        <div className="text-center max-w-6xl mx-auto mb-12">
          <h2 className="mb-4">
            Benefits of <span className="text-primary-500">Mobile DVR</span>
          </h2>
          <p className="text-White-300 text-lg">
            Investing in Mobile DVR technology offers a multitude of advantages for your fleet - The Future of Safety: AI-Powered Protection. They understand the road and the driver to prevent accidents before they happen.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className={`px-5 py-3 ${activeTab === 'ADAS' ? 'bg-primary-500 text-white' : 'bg-gray-300 text-black'} rounded-l`}
            onClick={() => setActiveTab('ADAS')}
          >
            ADAS (Road Monitoring)
          </button>
          <button
            className={`px-5 py-3 ${activeTab === 'DMS' ? 'bg-primary-500 text-white' : 'bg-gray-300 text-black'} rounded-r`}
            onClick={() => setActiveTab('DMS')}
          >
            DMS (Driver Monitoring)
          </button>
        </div>

        <div className="grid grid-cols-1 max-w-8xl mx-auto">
          {renderDetails()}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Preview Video</h3>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={closeVideoModal}
                >
                  ✕
                </button>
              </div>
              <div className="relative" style={{ padding: '56.25% 0 0 0' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://player.vimeo.com/video/${currentVideoId}`}
                  title="Video Preview"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BenefitsSection;