import { Product } from '../types';

export const gpsProducts: Product[] = [
    {
        id: 'teltonika-fmc920',
        name: 'Teltonika FMC920',
        category: 'GPS Trackers',
        description: 'Small and smart tracker with Bluetooth connectivity, internal High Gain GNSS and GSM antennas and an integrated backup battery. The 4G Cat 1 technology offers much higher bandwidth, lower latency and improved spectrum efficiency. Perfect for basic track & trace and fleet management.',
        price: 'Rs 27,900',
        priceValue: 27900,
        installationFee: 4000,
        imageUrl: '/img/fmc920.png',
        features: [
            '4G CAT 1 with fallback 2G (GSM) network',
            'Bluetooth LE for external devices and sensors',
            'Crash detection working according accelerometer data',
            'Internal High Gain GNSS and GSM antennas',
            'Integrated 170mAh backup battery',
            'Digital Input for ignition or alarm monitoring',
            'Analog Input for temperature or fuel monitoring'
        ],
        tags: ['4G', '2G', 'Temperature', 'Fuel'],
        specifications: {
            'Dimensions': '79 x 43 x 12 mm',
            'Weight': '54 g',
            'GNSS': 'GPS, GLONASS, GALILEO, BEIDOU, SBAS, QZSS, DGPS, AGPS',
            'Cellular': 'LTE Cat 1, GSM',
            'Power Supply': '10 - 30 V DC with overvoltage protection',
            'Backup Battery': '170 mAh Li-Ion (0.63 Wh)',
            'Interfaces': '1 Digital Input, 1 Digital Output, 1 Analog Input',
            'Bluetooth': '4.0 + LE'
        },
        compatibleWith: [
            'gps-acc-fuel-wireless',
            'gps-acc-temp-wireless',
            'gps-acc-eye-sensor'
        ]
    },
    {
        id: 'teltonika-fmb920',
        name: 'Teltonika FMB920',
        category: 'GPS Trackers',
        description: 'Small and smart GPS tracker with Bluetooth connectivity, internal High Gain GNSS and GSM antennas, and an integrated backup battery. Perfect for basic track & trace and fleet management.',
        price: 'Rs 21,900',
        priceValue: 21900,
        installationFee: 4000,
        imageUrl: '/img/fmb920.png',
        features: [
            'Bluetooth 4.0 + LE for external devices and OBDII dongles',
            'Crash detection, Eco-driving, and Towing detection',
            'Digital Input for ignition or alarm monitoring',
            'Analog Input for temperature or fuel monitoring'
        ],
        tags: ['2G', 'Temperature', 'Fuel'],
        specifications: {
            'Dimensions': '79 x 43 x 12 mm',
            'Weight': '54 g',
            'Operating Voltage': '6-30V DC with overvoltage protection',
            'Battery': '170 mAh Li-ion backup battery',
            'IP Rating': 'IP54'
        },
        compatibleWith: [
            'gps-acc-fuel-wireless',
            'gps-acc-temp-wireless',
            'gps-acc-eye-sensor'
        ]
    },
    {
        id: 'teltonika-fmb130',
        name: 'Teltonika FMB130',
        category: 'GPS Trackers',
        description: 'Advanced 2G tracker with internal GNSS, GSM antennas, configurable digital/analogue inputs, impulse inputs, Bluetooth connectivity, and backup battery. Features extended I/O sets and 1-wire interface. Excellent for refrigerated transport, logistics, and agriculture.',
        price: 'Rs 24,900',
        priceValue: 24900,
        installationFee: 4000,
        imageUrl: '/img/fmb130.png',
        features: [
            '2G (GSM/GPRS) network connectivity',
            'Bluetooth LE for external devices and sensors',
            'CAN adapter support (fuel, odometer, RPM, engine temp)',
            'Impulse input for precise fuel flow meters reading',
            'Extended I/O: 3x Digital In, 2x Analog In, 3x Digital Out',
            '1-Wire interface for temperature monitoring and iButton',
            'Integrated 170mAh backup battery'
        ],
        tags: ['2G', 'Fuel', 'Door', 'Temperature', 'Driver identification'],
        specifications: {
            'Dimensions': '65 x 56.6 x 20.6 mm',
            'Weight': '55 g',
            'GNSS': 'GPS, GLONASS, GALILEO, BEIDOU, QZSS, AGPS',
            'Cellular': 'GSM Quad-band (2G)',
            'Power Supply': '10 - 30 V DC with overvoltage protection',
            'Backup Battery': '170 mAh Li-Ion (0.63 Wh)',
            'Interfaces': '3x DIN, 2x AIN, 3x DOUT, 1x 1-Wire, 1x CAN In',
            'Bluetooth': '4.0 + LE'
        },
        compatibleWith: [
            'gps-acc-fuel-wireless',
            'gps-acc-temp-wireless',
            'gps-acc-door-wired',
            'gps-acc-temp-wired',
            'gps-acc-speed-buzzer',
            'gps-acc-driver-id',
            'gps-acc-eye-sensor'
        ]
    },
    {
        id: 'teltonika-fmc130',
        name: 'Teltonika FMC130',
        category: 'GPS Trackers',
        description: 'Advanced 4G LTE terminal with internal GNSS/LTE antennas, configurable digital/analogue inputs, impulse inputs, Bluetooth connectivity, and backup battery. Perfectly suitable for advanced fleet management, logistics, and public transport.',
        price: 'Rs 26,000',
        priceValue: 26000,
        installationFee: 4000,
        imageUrl: '/img/fmc130.png',
        features: [
            'Reliable 4G (LTE CAT 1) connectivity with 2G fallback',
            'Bluetooth LE for external devices, sensors and beacons',
            'Configurable DIN/AIN for flexible remote monitoring',
            '3-Axis Accelerometer for driver monitoring and crash detection',
            'Extended I/O: 3x Digital In, 2x Analog In, 3x Digital Out',
            '1-Wire interface for temperature monitoring and iButton',
            'CAN adapter support via dedicated input'
        ],
        tags: ['4G', 'Fuel', 'Door', 'Temperature', 'Driver identification'],
        specifications: {
            'Dimensions': '65 x 56 x 20.6 mm',
            'Weight': '55 g',
            'GNSS': 'GPS, GLONASS, GALILEO, BEIDOU, QZSS, AGPS',
            'Cellular': 'LTE Cat 1, GSM',
            'Power Supply': '10 - 30 V DC with overvoltage protection',
            'Backup Battery': '170 mAh Li-Ion (0.63 Wh)',
            'Interfaces': '3x DIN, 2x AIN, 3x DOUT, 1x 1-Wire, 1x CAN In',
            'Bluetooth': '4.0 + LE'
        },
        compatibleWith: [
            'gps-acc-fuel-wireless',
            'gps-acc-temp-wireless',
            'gps-acc-door-wired',
            'gps-acc-temp-wired',
            'gps-acc-speed-buzzer',
            'gps-acc-driver-id',
            'gps-acc-eye-sensor'
        ]
    },
    {
        id: 'jimi-iot-vl110c',
        name: 'Jimi IoT VL110C',
        category: 'GPS Trackers',
        description: 'Compact 4G LTE Vehicle GNSS Terminal with a wide 9-90V input voltage range. Features GSM (2G) fallback, remote fuel/power cut-off, and GNSS/LTE jamming detection. Ideal for stolen vehicle recovery and fleet management of motorcycles, passenger cars, and light commercial vehicles.',
        price: 'Rs 9,300',
        priceValue: 9300,
        installationFee: 4000,
        imageUrl: '/img/vl110c.png',
        features: [
            'LTE & GSM Network (4G LTE with 2G fallback)',
            'Remote Cut-Off (Fuel/Power) to immobilize vehicle',
            'Wide 9-90V Operating Voltage for various vehicles',
            'Vehicle Battery Protection (disconnects at critical level)',
            'IP65 Water & Dust Resistance',
            'GNSS/LTE Jamming Detection and alarm',
            'Driving behavior analysis (harsh acceleration/braking/cornering)'
        ],
        tags: ['4G', '2G'],
        specifications: {
            'Dimensions': '94 x 34 x 15 mm',
            'Weight': '44 g',
            'GNSS': 'GPS, BDS, GLONASS, LBS',
            'Cellular': 'LTE Cat1 & GSM',
            'Power Supply': '9-90V DC',
            'Backup Battery': '270mAh/3.7V Li-Polymer battery',
            'Interfaces': '1x ACC, 1x Relay',
            'IP Rating': 'IP65'
        },
        compatibleWith: [
            'gps-acc-speed-buzzer'
        ]
    },
    {
        id: 'jimi-iot-vl802',
        name: 'Jimi IoT VL802',
        category: 'GPS Trackers',
        description: 'Advanced 4G GPS tracker designed for industrial and commercial fleets. Features two-way communication, LTE with GSM (2G) fallback, RS485 interface for peripherals, Bluetooth accessory support, and a suite of event-triggered alerts.',
        price: 'Rs 14,500',
        priceValue: 14500,
        installationFee: 4000,
        imageUrl: '/img/vl802.png',
        features: [
            'LTE & GSM Network (4G LTE with 2G fallback)',
            'Two-Way Communication & Remote Listen-in',
            'Panic Button (SOS) & Ignition Detection (ACC)',
            'Remote Cut-Off (Fuel/Power)',
            'Bluetooth Accessory Support (BLE 5.0)',
            'RS485 Interface for fuel/temperature sensors',
            'Multiple Alerts (impounding, geo-fence, vibration, speeding)'
        ],
        tags: ['4G', '2G', 'Fuel', 'Temperature', 'Waterproof', 'Audio'],
        specifications: {
            'Dimensions': '105 x 57 x 22 mm',
            'Weight': '117.6 g',
            'GNSS': 'GPS, BDS, LBS, GLONASS',
            'Cellular': 'LTE Cat 1, 2G (GSM)',
            'Power Supply': '9-36V DC',
            'Backup Battery': '1,000mAh/3.7V Li-Polymer battery',
            'Interfaces': '5 Digital I/Os, 1 Analog I/O, RS485',
            'IP Rating': 'IP65'
        },
        compatibleWith: [
            'gps-acc-fuel-wireless',
            'gps-acc-temp-wireless',
            'gps-acc-temp-wired',
            'gps-acc-speed-buzzer',
            'gps-acc-speaker-mic'
        ]
    },
    {
        id: 'teltonika-fmp100',
        name: 'Teltonika FMP100',
        category: 'GPS Trackers',
        description: '2G Plug & Play tracker connected via cigarette lighter socket. Features GNSS, GSM, and Bluetooth connectivity. Ideal for light vehicle tracking in applications like courier delivery service, car rental & leasing, and insurance telematics.',
        price: 'Rs 22,000',
        priceValue: 22000,
        installationFee: 0,
        imageUrl: '/img/fmp100.png',
        features: [
            'Plug & Play installation via cigarette lighter socket',
            'Custom Built-In Button for alarms or Private/Business trips switch',
            'Device Status and Vehicle Events via built-in RGB LED and buzzer',
            'Charger for external devices (USB type A 5V 1A)',
            'Bluetooth LE-based connection for external sensors (temperature, humidity)',
            'Internal GNSS and GSM High Gain antennas',
            'Crash detection, Towing detection, Auto Geofence'
        ],
        tags: ['2G', 'Portable', 'Temperature', 'Fuel'],
        specifications: {
            'Dimensions': '96.7 x 33.4 x 27.5 mm',
            'Connection': 'Cigarette lighter socket',
            'GNSS': 'GPS, GLONASS, GALILEO, BEIDOU, SBAS, QZSS, DGPS, AGPS',
            'Cellular': 'GSM Quad-band (2G)',
            'Power Supply': '10-30 V DC with overvoltage protection',
            'Backup Battery': '170 mAh Li-Ion battery (0.63 Wh)',
            'Interfaces': '1x USB 2.0 Micro-USB, 1x USB type A',
            'Bluetooth': '4.0 + LE'
        },
        compatibleWith: [
            'gps-acc-temp-wireless',
            'gps-acc-eye-sensor',
            'gps-acc-fuel-wireless'
        ]
    },
    {
        id: 'istartek-vt110-l',
        name: 'VT110-L 4G Car Tracking Device',
        category: 'GPS Trackers',
        description: '4G Car Tracking Device GPS with built-in high-precision positioning module. Reports positioning information and vehicle status via 4G network for real-time monitoring, anti-theft, and dispatch management. Applicable for fleet management, public transport, school bus, and taxi management.',
        price: 'Rs 7,600',
        priceValue: 7600,
        installationFee: 4000,
        imageUrl: '/img/vt110-l.png',
        features: [
            '4G LTE communication with GSM fallback',
            'Built-in high-precision BDS/GPS/GLONASS/QZSS module',
            'Wide DC 9-90V input voltage',
            'IP66 Waterproof Grade for harsh environments',
            '1 Digital input (configurable as positive/negative trigger, defaults to ACC)',
            '1 Output for remote vehicle control (relay)',
            '3D acceleration sensor built-in'
        ],
        tags: ['4G', '2G', 'Waterproof'],
        specifications: {
            'Dimensions': '90 x 33.8 x 16.6 mm',
            'Weight': 'About 54g',
            'GNSS': 'BDS/GPS/GLONASS/QZSS',
            'Cellular': 'LTE-FDD & GSM',
            'Power Supply': 'DC 9-90V / 1.5A',
            'Backup Battery': '120mAh (30min operating time)',
            'Interfaces': '1 Digital input, 1 Output, 1 TYPE C USB',
            'IP Rating': 'IP66'
        },
        compatibleWith: [
            'gps-acc-speed-buzzer'
        ]
    },
    {
        id: 'istartek-vt200-l',
        name: 'VT200-L 4G Vehicle GPS Tracker',
        category: 'GPS Trackers',
        description: 'Advanced 4G vehicle tracker with RS232 port for peripherals like RFID and OBD readers. Features a 128Mb Flash memory to save historical data during network loss, multiple inputs/outputs, and external audio support. Ideal for fleet management, public transport, and logistics.',
        price: 'Rs 17,200',
        priceValue: 17200,
        installationFee: 4000,
        imageUrl: '/img/vt200-l.png',
        features: [
            '4G LTE communication with GSM fallback',
            'RS232 port for RFID, magnetic card reader, and OBD peripherals',
            '128Mb Flash memory for offline data saving',
            '1-Wire interface for temperature sensor and i-Button',
            'External MIC and Speaker support for two-way audio',
            'Wide 9V-100V power supply range',
            'IP66 Waterproof rating'
        ],
        tags: ['4G', '2G', 'Fuel', 'Temperature', 'Driver identification', 'Door', 'Waterproof', 'Audio'],
        specifications: {
            'Dimensions': '99 x 54 x 19.5 mm',
            'Weight': '106 g',
            'GNSS': 'GPS + BD2',
            'Cellular': 'LTE-FDD/TDD & GSM',
            'Power Supply': '9V-100V',
            'Backup Battery': '500mAh',
            'Interfaces': '3x DIN, 1x Negative IN, 2x DOUT, 1x AIN, 1-Wire, RS232',
            'IP Rating': 'IP66'
        },
        compatibleWith: [
            'gps-acc-fuel-wireless',
            'gps-acc-temp-wireless',
            'gps-acc-door-wired',
            'gps-acc-temp-wired',
            'gps-acc-speed-buzzer',
            'gps-acc-driver-id',
            'gps-acc-speaker-mic'
        ]
    },
    {
        id: 'teltonika-fmb204',
        name: 'Teltonika FMB204',
        category: 'GPS Trackers',
        description: 'Water-resistant 2G tracker with a high-capacity internal Li-ion battery. Features an IP67-rated casing against dust and water stream. Perfect for two-wheelers tracking, trailers tracking, public safety services, and water transport.',
        price: 'Rs 31,900',
        priceValue: 31900,
        installationFee: 4000,
        imageUrl: '/img/fmb204.png',
        features: [
            'Robust IP67-rated casing for dust and water resistance',
            'Large-capacity 1,800 mAh Li-ion internal backup battery',
            'Extended usage up to 6 days in power saving mode',
            'Bluetooth LE for external devices, sensors, and OBDII dongle',
            '1-Wire interface for temperature monitoring and RFID/iButton tags',
            'Wide 6-30V DC input range suitable for various vehicles',
            'Multiple digital and analog inputs for advanced scenarios'
        ],
        tags: ['2G', 'Fuel', 'Temperature', 'Driver identification', 'Waterproof'],
        specifications: {
            'Dimensions': '72.5 x 73 x 27.3 mm',
            'Weight': '205 g',
            'GNSS': 'GPS, GLONASS, GALILEO, BEIDOU, SBAS, QZSS, DGPS, AGPS',
            'Cellular': 'GSM Quad-band (2G)',
            'Power Supply': '6-30 V DC with overvoltage protection',
            'Backup Battery': '1800 mAh Li-Ion battery (6.66 Wh)',
            'Interfaces': '3x DIN, 2x DOUT, 1x AIN, 1-Wire, USB 2.0',
            'IP Rating': 'IP67',
            'Bluetooth': '4.0 + LE'
        },
        compatibleWith: [
            'gps-acc-fuel-wireless',
            'gps-acc-temp-wireless',
            'gps-acc-temp-wired',
            'gps-acc-speed-buzzer',
            'gps-acc-driver-id',
            'gps-acc-eye-sensor'
        ]
    },
    {
        id: 'teltonika-fmc234',
        name: 'Teltonika FMC234',
        category: 'GPS Trackers',
        description: '4G LTE CAT 1, water-resistant tracker with a 1000 mAh high-capacity battery for prolonged autonomous usage. Equipped with configurable digital, analog, negative and impulse inputs, Bluetooth connectivity, and CAN adapter support. Ideal for insurance telematics, trailer tracking, stolen vehicle recovery, and construction vehicle monitoring.',
        price: 'Rs 42,700',
        priceValue: 42700,
        installationFee: 4000,
        imageUrl: '/img/fmc234.png',
        features: [
            '4G LTE CAT 1 connectivity with GSM fallback',
            'IP67 certified casing for reliable protection against water and dust',
            '1000 mAh high-capacity Li-Po battery',
            'Impulse inputs for precise fuel flow meter data reading',
            'Negative input for preventing unauthorized vehicle use',
            'Bluetooth LE for external devices and OBDII dongles',
            'CAN adapter support via dedicated input'
        ],
        tags: ['4G', '2G', 'Fuel', 'Temperature', 'Driver identification', 'Door', 'Waterproof'],
        specifications: {
            'Dimensions': '70.5 x 67.0 x 25.6 mm',
            'Weight': '91.8 g',
            'GNSS': 'GPS, GLONASS, GALILEO, BEIDOU, QZSS, AGPS',
            'Cellular': 'LTE Cat 1, GSM',
            'Power Supply': '10 - 30 V DC with overvoltage protection',
            'Backup Battery': '1000 mAh Li-Po rechargeable (3.7 Wh)',
            'Interfaces': '3x DIN, 1x Negative IN, 2x Impulse IN, 3x DOUT, 2x AIN, 1x CAN Adapter IN, 1-Wire',
            'IP Rating': 'IP67',
            'Bluetooth': '4.0 + LE'
        },
        compatibleWith: [
            'gps-acc-fuel-wireless',
            'gps-acc-temp-wireless',
            'gps-acc-door-wired',
            'gps-acc-temp-wired',
            'gps-acc-speed-buzzer',
            'gps-acc-driver-id',
            'gps-acc-eye-sensor'
        ]
    },
    {
        id: 'jointech-jt709a',
        name: 'Jointech JT709A 4G Electronic Seal Lock',
        category: 'GPS Trackers',
        description: '4G Container Electronic Seal Lock designed for asset tracking. Features GPS+LBS positioning, lock rope status detection, remote dynamic password unlocking, and a large 4500mAh battery. Ideal for container, trailer, and logistics tracking.',
        price: 'Rs 87,000',
        priceValue: 87000,
        installationFee: 0,
        imageUrl: '/img/jt709a.png',
        features: [
            'Remote dynamic password and Bluetooth unlock via App',
            'RFID authorization card unlock support',
            'Real-time lock rope status detection (insertion/unplugging)',
            'Massive 4500mAh rechargeable lithium battery',
            'Support for 10 alarms (steel string cut, wrong password, low battery, etc.)',
            'Deep sleep, tracking, and standby modes for prolonged battery life',
            'IP67 waterproof and dustproof robust nylon fiber shell'
        ],
        tags: ['4G', '2G', 'Portable', 'Waterproof'],
        specifications: {
            'Dimensions': '110 x 82 x 35 mm',
            'Weight': 'About 390 g (including lock rope)',
            'GNSS': 'Ublox-MAX-7Q/8Q (GPS+LBS)',
            'Cellular': '4G LTE with 2G fallback',
            'Power Supply': 'DC 5V / 2A charging',
            'Backup Battery': '4500mAh 3.7V rechargeable lithium battery',
            'Lock Rope': '300mm length (customizable), 304 stainless steel',
            'IP Rating': 'IP67',
            'Bluetooth': '5.0'
        },
        compatibleWith: []
    },
    {
        id: 'tzone-tt19-9',
        name: 'Tzone TT19-9 4G Temperature Data Logger',
        category: 'GPS Trackers',
        description: 'Real-Time IoT Temperature Humidity and Location Sensor Tracker with an intuitive LCD. Ideal for vaccine transport, blood transport, pharmaceuticals, fruit & vegetable transportation, and containerized shipments.',
        price: 'Rs 32,400',
        priceValue: 32400,
        installationFee: 0,
        imageUrl: '/img/tt19-9.png',
        features: [
            'High-accuracy positioning system (LBS, WiFi, GPS) with trajectory playback',
            'Dual temperature sensors (Built-in sensor and external probe for wider range)',
            'Intuitive LCD indication for signal, alarm, running status, and battery',
            'Built-in vibration monitoring and change trend warning',
            'Automatic PDF data generation via USB or TZONE cloud platform',
            'Local storage capacity up to 17,000 data points'
        ],
        tags: ['4G', '2G', 'Portable', 'Temperature'],
        specifications: {
            'Dimensions': '100 x 66 x 29 mm',
            'Operation Temperature': '-20°C to +60°C',
            'GNSS': 'LBS, WiFi, GPS positioning',
            'Transmission Mode': '4G/2G',
            'Battery': 'Built-in 3.7V/4000mAh Lithium battery',
            'Storage': '17000 Points',
            'IP Rating': 'IP64'
        },
        compatibleWith: []
    },
    {
        id: 'jimi-jm-vg03',
        name: 'Jimi IoT JM-VG03',
        category: 'GPS Trackers',
        description: 'Mini Vehicle GNSS Tracker with 9-90V voltage range, ideal for motorcycles, e-bikes, and light vehicles. Features remote cut-off, ignition detection, and basic driving behavior analysis.',
        price: 'Rs 18,490',
        priceValue: 18490,
        installationFee: 4000,
        imageUrl: '/img/jm-vg03.png',
        features: [
            'Remote Cut-Off (Fuel/Power) via installed relay',
            'Driving Behavior Analysis (Harsh acceleration, braking, cornering, collision)',
            'Ignition Detection (ACC) and Multiple Alerts (tamper, power disconnect, etc.)',
            'Wide 9-90V voltage range support'
        ],
        tags: ['2G', 'Waterproof'],
        specifications: {
            'Dimensions': '79.0 x 38.0 x 14.0 mm',
            'Weight': '29 g',
            'Operating Voltage': '9-90V DC',
            'IP Rating': 'IP65 Dust & Water Resistance',
            'Positioning': 'GPS+BDS+LBS (<2.5m CEP)',
            'Battery': '60mAh/3.7V Li-Polymer'
        },
        compatibleWith: []
    },
    {
        id: 'geoid-vg03-custom',
        name: 'Geoid Custom VG03 Plug-and-Play Tracker',
        category: 'GPS Trackers',
        description: 'Our Geoid custom device is built upon the high-performance Jimi/Concox JM-VG03 device. We have specialized this hardware by integrating a cigarette lighter plug, transforming a standard hardwired tracker into a versatile, "plug-and-play" solution.',
        price: 'Rs 19,950',
        priceValue: 19950,
        installationFee: 0,
        imageUrl: '/img/geoid-vg03.png',
        features: [
            'Versatile Power Integration: Cigarette lighter modification allows for instant deployment across various vehicle types without complex wiring.',
            'Precision Tracking: Features high-sensitivity GNSS positioning with an accuracy of <2.5m CEP.',
            'Driving Behavior Analysis: Detects harsh acceleration, braking, cornering, and collision.',
            'Rugged Reliability: Maintains the original IP65 dust and water resistance, ensuring optimal performance in tough conditions.'
        ],
        tags: ['2G', 'Portable', 'Waterproof'],
        specifications: {
            'Positioning Accuracy': '< 2.5m CEP',
            'Operating Voltage': '9-90V DC',
            'IP Rating': 'IP65',
            'Installation Type': 'Cigarette Lighter Plug (Plug & Play)'
        },
        compatibleWith: []
    },
    {
        id: 'pt60-l',
        name: 'PT60-L 4G Wireless GPS Tracker',
        category: 'GPS Trackers',
        description: 'A 4G wireless installation-free GPS locator with a 7500mAh rechargeable battery and strong magnetic mount. Offers ultra-long standby time up to 3650 days and 5 versatile working modes.',
        price: 'Rs 24,025',
        priceValue: 24025,
        installationFee: 0,
        imageUrl: '/img/pt60-l.png',
        features: [
            '7500mAh Rechargeable Battery for up to 10 years standby (1 data/day)',
            'Strong Magnetic Mount for flexible, installation-free placement',
            '5 Working Modes: Normal, Sport, Power Saving, Timer, and Alarm clock',
            'Tamper Alarm via light sensor to prevent unauthorized disassembly',
            'Driving Behavior Monitor for harsh acceleration, braking, and impacts'
        ],
        tags: ['4G', '2G', 'Portable'],
        specifications: {
            'Dimensions': '110 x 77 x 28 mm',
            'Weight': '290 g',
            'Battery': '7500mAh 3.7V internal battery',
            'Positioning': 'GPS/BDS/QZSS, Accuracy: 2.5 meters',
            'Memory': '16Mb Flash memory for location storage'
        },
        compatibleWith: []
    },
    {
        id: 'vt150-l',
        name: 'VT150-L 4G Vehicle Tracker',
        category: 'GPS Trackers',
        description: 'VT150-L is a 4G GPS vehicle tracker with a built-in high-precision GPS module. It reports positioning information and vehicle status via the 4G network for real-time monitoring and anti-theft.',
        price: 'Rs 16,800',
        priceValue: 16800,
        installationFee: 4000,
        imageUrl: '/img/vt150-l.png',
        features: [
            '4G LTE and 2G GSM dual network support for reliable connectivity',
            'Multiple Positioning Systems: BDS, GPS, GLONASS, and QZSS',
            '2 Digital inputs (configurable) and 1 output (ACC detection support)',
            'Compact waterproof IP66 design for motorcycles and vehicles'
        ],
        tags: ['4G', '2G', 'Door', 'Waterproof'],
        specifications: {
            'Dimensions': '90 x 33.8 x 16.6 mm',
            'Weight': '57 g',
            'Operating Voltage': 'DC 9-90V / 1.5A',
            'IP Rating': 'IP66 Waterproof Grade',
            'Battery': '120mAh inbuilt battery',
            'Interfaces': '2 Digital inputs, 1 Output, 1 Type-C USB, 1 Microphone'
        },
        compatibleWith: [
            'gps-acc-door-wired'
        ]
    },
    {
        id: 'teltonika-fmb003',
        name: 'Teltonika FMB003',
        category: 'GPS Trackers',
        description: 'Ultra-small plug and play device dedicated to OBD applications. Main feature of FMB003 is its possibility to read OEM parameters (PIDs) via OBD port like Real Odometer and Real Fuel Level data.',
        price: 'Rs 18,000',
        priceValue: 18000,
        installationFee: 0,
        imageUrl: '/img/fmb003.png',
        features: [
            'Compact size: Our smallest GNSS tracker for rich connected car applications',
            'OEM OBDII Data: Reads Real Odometer, Real Fuel Level and up to 32 vehicle onboard parameters',
            'Crash detection according to accelerometer data',
            'Bluetooth 4.0 for external devices and Low Energy Sensors'
        ],
        tags: ['2G', 'OBD', 'Fuel', 'Temperature'],
        specifications: {
            'Dimensions': '52.6 x 29.1 x 26 mm',
            'GNSS': 'GPS, GLONASS, GALILEO, BEIDOU, SBAS, QZSS, DGPS, AGPS',
            'Power': '12 - 30 V DC with overvoltage protection',
            'Backup Battery': '3.7 V 45 mAh',
            'IP Rating': 'IP41'
        },
        compatibleWith: [
            'gps-acc-temp-wireless',
            'gps-acc-eye-sensor',
            'gps-acc-fuel-wireless'
        ]
    },
    // Accessories
    {
        id: 'gps-acc-eye-sensor',
        name: 'Teltonika EYE Sensor(Temperature/Door)',
        category: 'Accessories',
        description: 'Bluetooth Low Energy ID beacon with temperature, humidity, movement, and magnet detection sensors. Designed for a low-cost fast and easy configuration to ensure timely monitoring and accountability. Perfect for cold chain, trailer door events, and delivery tracking.',
        price: 'Rs 15,500',
        priceValue: 15500,
        installationFee: 1000,
        imageUrl: '/img/eye-sensor.png',
        features: [
            '4 Sensors Set: Temperature, Humidity, Movement, Magnet detection',
            'Long lifetime: 600 mAh capacity for 5+ years battery life',
            'Water-resistant IP67 protection casing',
            'Easy to use mobile app for configuration and data scanning',
            'Supports iBeacon and Eddystone protocols'
        ],
        specifications: {
            'Dimensions': '56.6 x 38 x 13 mm',
            'Weight': '18 g',
            'Battery': 'CR2450 Lithium Manganese Dioxide (600 mAh)',
            'IP Rating': 'IP67',
            'Bluetooth': '4.2 compliant, 5.2 certified (Up to 80m range)',
            'Temperature Range': '-20°C to +60°C'
        }
    },
    {
        id: 'gps-acc-fuel-wireless',
        name: 'Wireless Fuel Sensor',
        category: 'Accessories',
        description: 'High-precision wireless fuel level sensor for continuous monitoring of fuel consumption and preventing fuel theft.',
        price: 'Rs 38,900',
        priceValue: 38900,
        installationFee: 4900,
        imageUrl: '/img/gps-fuel.png',
        features: [
            'Wireless installation (no wiring needed)',
            'High accuracy level detection',
            'Long battery life'
        ],
        specifications: {
            'Type': 'Wireless',
            'Battery': 'Built-in'
        }
    },
    {
        id: 'gps-acc-temp-wireless',
        name: 'Wireless Temperature Sensor',
        category: 'Accessories',
        description: 'Wireless temperature sensor for cold chain logistics and refrigerated trucks.',
        price: 'Rs 11,500',
        priceValue: 11500,
        installationFee: 1000,
        imageUrl: '/img/gps-temp-wireless.png',
        features: [
            'Wireless transmission',
            'High precision temperature reading',
            'Waterproof design'
        ],
        specifications: {
            'Type': 'Wireless',
            'Accuracy': '±0.5°C'
        }
    },
    {
        id: 'gps-acc-door-wired',
        name: 'Wired Door Sensor',
        category: 'Accessories',
        description: 'Magnetic contact door sensor to monitor the opening and closing of vehicle doors or cargo areas.',
        price: 'Rs 4,900',
        priceValue: 4900,
        installationFee: 3000,
        imageUrl: '/img/gps-door.png',
        features: [
            'Reliable magnetic contact',
            'Durable housing',
            'Instant alert on opening'
        ],
        specifications: {
            'Type': 'Wired Magnetic',
            'Material': 'Metal/Plastic'
        }
    },
    {
        id: 'gps-acc-temp-wired',
        name: 'Wired Temperature Sensor',
        category: 'Accessories',
        description: 'Wired temperature probe for continuous monitoring of cargo or ambient temperature.',
        price: 'Rs 7,000',
        priceValue: 7000,
        installationFee: 2000,
        imageUrl: '/img/gps-temp-wired.png',
        features: [
            'Direct wired connection',
            'Wide temperature range',
            'Fast response time'
        ],
        specifications: {
            'Type': 'Wired Probe',
            'Range': '-40°C to +85°C'
        }
    },
    {
        id: 'gps-acc-speed-buzzer',
        name: 'Speed Buzzer',
        category: 'Accessories',
        description: 'Audible alarm inside the cabin to warn the driver when exceeding the set speed limit.',
        price: 'Rs 2,000',
        priceValue: 2000,
        installationFee: 1000,
        imageUrl: '/img/gps-buzzer.png',
        features: [
            'Loud audible warning',
            'Compact size',
            'Instant feedback to driver'
        ],
        specifications: {
            'Type': 'Piezo Buzzer',
            'Volume': '>85dB'
        }
    },
    {
        id: 'gps-acc-driver-id',
        name: 'Driver Identification (iButton)',
        category: 'Accessories',
        description: 'Driver ID system using iButton or RFID tags to track who is operating the vehicle at any given time.',
        price: 'Rs 5,000',
        priceValue: 5000,
        installationFee: 1000,
        imageUrl: '/img/gps-driver-id.png',
        features: [
            'Prevents unauthorized driving',
            'Tracks individual driver hours',
            'Simple tap-to-authenticate'
        ],
        specifications: {
            'Type': 'iButton / RFID Reader',
            'Compatibility': 'Universal'
        }
    },
    {
        id: 'gps-acc-speaker-mic',
        name: 'Speaker and Mic',
        category: 'Accessories',
        description: 'External speaker and microphone for two-way audio communication. Perfect for driver monitoring, remote listen-in, and voice dispatch.',
        price: 'Rs 4,500',
        priceValue: 4500,
        installationFee: 1000,
        imageUrl: '/img/speaker-mic.png',
        features: [
            'Two-Way Audio Communication',
            'Noise Cancellation',
            'Clear Voice Dispatch'
        ],
        specifications: {
            'Type': 'Audio Device',
            'Compatibility': 'Audio Supported Devices'
        }
    }
];

// Apply overrides from local storage
try {
    const overridesStr = localStorage.getItem('productOverrides');
    if (overridesStr) {
        const overrides = JSON.parse(overridesStr);
        gpsProducts.forEach(p => {
            p.originalPriceValue = p.priceValue;
            p.originalInstallationFee = p.installationFee;
            if (overrides[p.id]) {
                if (overrides[p.id].priceValue !== undefined) p.priceValue = overrides[p.id].priceValue;
                if (overrides[p.id].installationFee !== undefined) p.installationFee = overrides[p.id].installationFee;
                if (overrides[p.id].warranty !== undefined) p.warranty = overrides[p.id].warranty;
            }
        });
    }
} catch (e) {
    console.error('Failed to load overrides', e);
}
