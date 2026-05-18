import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'tailwindcss/tailwind.css';
import ReactDOM from 'react-dom';
import ins from '/img/ins.png';
import cmc from '/img/cmc.png';
import Lan from '/img/Lan.png';
import EFL from '/img/EFL.png';
import O2 from '/img/O2.jpg';
import mb from '/img/mb.png';
import Fer from '/img/Fer.png';
import sunmatch from '/img/sunmatch.jpg';
import uni from '/img/uni.jpg';
import inse from '/img/inse.png';
import jjm from '/img/jjm.jpg';
import lanw from '/img/lanw.jpg';

SwiperCore.use([Navigation, Pagination, Autoplay]);

    interface CounterProps {
      end: number;
      label: string;
    }

    const Counter: React.FC<CounterProps> = ({ end, label }) => {
      const [count, setCount] = React.useState(0);
      const ref = React.useRef(null);

      React.useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              let start = 0;
              const duration = 2000;
              const increment = end / (duration / 16);
              const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                  setCount(end);
                  clearInterval(timer);
                } else {
                  setCount(Math.ceil(start));
                }
              }, 16);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );

        if (ref.current) {
          observer.observe(ref.current);
        }

        return () => {
          observer.disconnect();
        };
      }, [end]);

      return (
        <div ref={ref} className="text-center">
          <p className="text-5xl font-bold text-primary-500">{count}+</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      );
    };

    const InsightsSection: React.FC = () => {
      return (
        <section id="Insights" className="section relative text-center mb-1 py-30 pb-10">
          <h1 className="text-5xl mb-4">Our<span className="text-primary-500"> Insights</span></h1>
          <p className="text-lg mb-6 text-white-400 py-0">From Global Ambitions to Industry Success: Our Impact in Numbers</p>
          <p className="text-md mb-6 text-white-500 py-0">Sri Lanka | Cambodia | Thailand</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-0">
            <Counter end={12} label="Years on the market" />
            <Counter end={4} label="Offices and Delivery Centers" />
            <Counter end={500} label="Total Delivered" />
            <Counter end={30} label="Total Active Clients" />
          </div>
        </section>
      );
    };

    const testimonials = [
      {
        quote: "The Mobile DVR solution has transformed how we monitor our fleet. The HD cameras and cloud backup capabilities give us peace of mind and have significantly reduced incident disputes.",
        name: "Amal Perera",
        role: "Fleet Manager",
        company: "Amal Transport Services"
      },
      {
        quote: "Implementation was seamless and the support team has been exceptional. Our drivers feel more secure knowing the system is in place, and we've seen a notable improvement in safety metrics.",
        name: "Thusith Jayasinghe",
        role: "Operations Director",
        company: "Ceylon Nitrogen Limited"
      },
      {
        quote: "The integration with our existing GPS system was flawless. Having synchronized video and location data has been invaluable for our delivery documentation and customer service.",
        name: "Shan Ratnayake",
        role: "Technology Officer",
        company: "ELF Global Logistics"
      }
    ];

    const TestimonialsSection: React.FC = () => {
      return (
        <div className="bg-dark-900 bg-transparent relative py-5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto px-4 mb-10">
              <h2 className="text-5xl mb-4">Client <span className="text-primary-500">Testimonials</span></h2>
              <p className="text-white-300 text-lg">
                Hear from organizations that have transformed their operations with our Mobile DVR solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card relative">
                  <div className="absolute top-6 left-4 text-5xl text-primary-500 opacity-20">"</div>
                  <p className="text-gray-300 mb-6 relative z-10">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    const PartnersSection: React.FC = () => {
      const partnerLogos = [
        { name: "Company 1", imageUrl: ins },
        { name: "Company 2", imageUrl: cmc },
       // { name: "Company 3", imageUrl: Lan },
        { name: "Company 4", imageUrl: EFL },
        { name: "Company 5", imageUrl: O2 },
        { name: "Company 6", imageUrl: mb },
       // { name: "Company 7", imageUrl: Fer },
        { name: "Company 8", imageUrl: sunmatch },
       // { name: "Company 9", imageUrl: uni },
        { name: "Company 10", imageUrl: inse },
       // { name: "Company 11", imageUrl: jjm },
       // { name: "Company 12", imageUrl: lanw },
      ];

      return (
        <section id="Partners" className="py-16 bg-dark-900">
          <div className="container mx-auto items-center h-10 mt-0 pt-0">
            <Swiper 
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
                1536: { slidesPerView: 6 },
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="mySwiper pb-8"
            >
              {partnerLogos.map((partner, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center h-20 mt-0 pt-0">
                    <img
                      src={partner.imageUrl}
                      alt={`${partner.name} logo`}
                      className="h-16 object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      );
    };

    const App: React.FC = () => {
      return (
        <div>
          <InsightsSection />
          <TestimonialsSection />
          <PartnersSection />
        </div>
      );
    };

    ReactDOM.render(<App />, document.getElementById('root'));

export default App;