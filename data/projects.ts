export interface Project {
  title: string;
  description: string;
  logo: string;
  link: string;
  slug: string;
  image?: string;
  stars?: number;
  forks?: number;
  language?: string;
  content?: string;
  gallery?: string[];
  features?: string[];
  techStack?: string[];
}

export const projects: Project[] = [
  {
    title: 'Monitoring Transactions EDC Bank BNI',
    description:
      'A web application to monitor transaction activities on EDC devices for Bank BNI.',
    logo: '/logos/driwwwle.svg',
    link: 'http://146.196.106.203:64390/',
    slug: 'monitoring-transactions-edc-bank-bni',
    image: '/img/Bank_BNI/1.png',
    stars: 245,
    forks: 32,
    language: 'TypeScript, React, Tailwind, Golang',
    content: 'This comprehensive web application provides real-time monitoring of EDC (Electronic Data Capture) transaction activities for Bank BNI. The system enables bank administrators and technical teams to track, analyze, and manage all payment terminal transactions across multiple locations.\n\nThe application features a modern, responsive dashboard built with React and TypeScript, offering intuitive data visualization through charts and tables. The backend, powered by Golang, ensures high performance and reliability in processing large volumes of transaction data.\n\nKey capabilities include transaction filtering by date range, terminal ID, merchant information, and transaction status. The system also provides detailed analytics, automated alerts for failed transactions, and comprehensive reporting features that help identify trends and potential issues.',
    gallery: ['/img/Bank_BNI/1.png', '/img/Bank_BNI/2.png', '/img/Bank_BNI/3.png', '/img/Bank_BNI/4.png', '/img/Bank_BNI/5.png', '/img/Bank_BNI/6.png'],
    features: [
      'Real-time transaction monitoring dashboard',
      'Advanced filtering and search capabilities',
      'Transaction analytics and reporting',
      'Automated alert system for failed transactions',
      'Multi-location terminal management',
      'Export data to Excel/PDF formats',
      'Role-based access control',
      'Transaction history and audit trail'
    ],
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Golang', 'PostgreSQL', 'REST API'],
  },
  {
    title: 'Web Key Bank Mestika',
    description:
      'A secure online banking platform for managing accounts, transfers, and payments.',
    logo: '/logos/vsc.svg',
    link: '',
    slug: 'web-key-bank-mestika',
    image: '/img/NPAY/1.png',
    stars: 1240,
    forks: 387,
    language: 'PHP, JavaScript, MySQL',
    content: 'Web Key Bank Mestika is a comprehensive online banking solution designed to provide customers with secure and convenient access to their banking services. This platform enables users to perform various banking operations from the comfort of their homes or offices.\n\nThe system is built with a focus on security, implementing multiple layers of authentication including OTP verification, security questions, and encrypted communications. The user interface is designed to be intuitive and accessible, making it easy for customers of all technical levels to navigate and use the platform.\n\nThe platform supports a wide range of banking operations including account balance inquiries, fund transfers between accounts, bill payments, transaction history viewing, and financial reporting. The system also includes features for managing beneficiaries, scheduling recurring payments, and setting up transaction alerts.',
    gallery: ['/img/NPAY/1.png', '/img/NPAY/2.png', '/img/NPAY/3.png', '/img/NPAY/4.png', '/img/NPAY/5.png'],
    features: [
      'Secure login with multi-factor authentication',
      'Account balance and transaction history',
      'Fund transfer between accounts',
      'Bill payment and utilities',
      'Beneficiary management',
      'Scheduled and recurring payments',
      'Transaction alerts and notifications',
      'Financial reports and statements',
      'Customer support integration'
    ],
    techStack: ['PHP', 'JavaScript', 'jQuery', 'MySQL', 'Bootstrap', 'SSL/TLS'],
  },
  {
    title: 'TMS Mestika',
    description:
      'A configuration management system for EDC devices, enabling secure and efficient setup of IP, port, and merchant information.',
    logo: '/logos/subtrackt.svg',
    link: '',
    slug: 'tms-mestika',
    image: '/img/TMS/5.png',
    stars: 89,
    forks: 15,
    language: 'PHP, JavaScript, MySQL',
    content: 'TMS (Terminal Management System) Mestika is a sophisticated configuration management platform designed specifically for managing EDC (Electronic Data Capture) devices across Bank Mestika\'s network. This system streamlines the process of configuring, deploying, and maintaining payment terminals.\n\nThe platform provides centralized control over all EDC device configurations, allowing administrators to remotely configure network settings, merchant information, application parameters, and security settings. This eliminates the need for manual on-site configuration, significantly reducing deployment time and operational costs.\n\nTMS features include bulk configuration updates, remote firmware management, device health monitoring, and configuration templates for different merchant types. The system maintains a complete audit trail of all configuration changes, ensuring compliance and facilitating troubleshooting.',
    gallery: ['/img/TMS/1.png', '/img/TMS/2.png', '/img/TMS/3.png', '/img/TMS/4.png', '/img/TMS/5.png'],
    features: [
      'Centralized EDC device management',
      'Remote configuration deployment',
      'Network settings management (IP, Port, Timeout)',
      'Merchant information configuration',
      'Bulk update capabilities',
      'Configuration templates',
      'Device status monitoring',
      'Firmware version management',
      'Complete audit trail',
      'User access control'
    ],
    techStack: ['PHP', 'JavaScript', 'MySQL', 'AJAX', 'Bootstrap', 'RESTful API'],
  },
  {
    title: 'Monitoring Transactions Bank OCBC',
    description:
      'A web-based application to monitor transaction activities on EDC devices for Bank OCBC NISP.',
    logo: '/logos/coolify.svg',
    link: 'http://146.196.106.203:5006/web',
    slug: 'monitoring-transactions-bank-ocbc',
    image: '/img/Bank_OCBC/2.png',
    stars: 156,
    forks: 24,
    language: 'JavaScript, Tailwind, Golang',
  },
  {
    title: 'Services Transaction Cashlez',
    description:
      'A microservices-based architecture that processes payment transactions from Cashlez EDC devices through Cashlez services and integrates the data into Odoo.',
    logo: '/logos/vsc.svg',
    link: '',
    slug: 'services-transaction-cashlez',
    image: '/img/Cashlez/Cashlezz.png',
    stars: 342,
    forks: 78,
    language: 'Golang',
    content: 'Services Transaction Cashlez is a robust microservices architecture that serves as a critical integration layer between Cashlez EDC payment devices and the Odoo ERP system. This solution enables seamless flow of transaction data from payment terminals to the business management system.\n\nBuilt with Golang for optimal performance and reliability, the service handles high-volume transaction processing with minimal latency. The architecture implements industry-standard security protocols to ensure data integrity and confidentiality throughout the transaction lifecycle.\n\nThe system features real-time transaction processing, automatic data transformation and validation, error handling with retry mechanisms, and comprehensive logging for audit purposes. It also includes monitoring capabilities to track system health and transaction success rates.',
    gallery: ['/img/Cashlez/Cashlezz.png'],
    features: [
      'Microservices architecture for scalability',
      'Real-time transaction processing',
      'Seamless Odoo ERP integration',
      'Automatic data transformation',
      'Transaction validation and verification',
      'Error handling and retry mechanisms',
      'Comprehensive logging and monitoring',
      'High-performance concurrent processing',
      'Secure API communication',
      'Transaction reconciliation'
    ],
    techStack: ['Golang', 'REST API', 'Odoo API', 'PostgreSQL', 'Docker', 'Message Queue'],
  },
  {
    title: 'Yamaha Motor Parts',
    description:
      'A company profile website for PT Yamaha Motor Parts Manufacturing Indonesia.',
    logo: '/logos/vsc.svg',
    link: 'https://yamaha-motor-parts.co.id/',
    slug: 'yamaha-motor-parts',
    image: '/img/Yamaha.png',
    stars: 521,
    forks: 112,
    language: 'Laravel, OctoberCMS, Bootstrap',
  },
  {
    title: 'Hommypay',
    description:
      'A dashboard application for managing Hommypay payment solutions.',
    logo: '/logos/vsc.svg',
    link: '',
    slug: 'hommypay-dashboard',
    image: '/img/Hommypay/2.png',
    stars: 234,
    forks: 45,
    language: 'Golang, Bootstrap, JavaScript, MySQL',
    content: 'Hommypay Dashboard is a comprehensive web application designed to manage and monitor Hommypay payment solutions. This dashboard provides administrators and business users with an intuitive interface to oversee payment transactions, user accounts, and system configurations.\n\nThe application is built using Golang for the backend, ensuring high performance and scalability. The frontend leverages Bootstrap for responsive design, providing a seamless user experience across various devices. JavaScript is used to enhance interactivity and dynamic content rendering.\n\nKey features of the Hommypay Dashboard include real-time transaction monitoring, detailed reporting and analytics, user management, and configuration settings for payment gateways. The system also incorporates security measures such as role-based access control and data encryption to protect sensitive information.',
    gallery: ['/img/Hommypay/1.png', '/img/Hommypay/2.png', '/img/Hommypay/3.png', '/img/Hommypay/4.png', '/img/Hommypay/5.png'],
    features: [
      'Real-time transaction monitoring',
      'Comprehensive reporting and analytics',
      'User account management',
      'Payment gateway configuration',
      'Role-based access control',
      'Data encryption and security',
      'Responsive design for multiple devices',
      'Interactive data visualization',
      'Export reports to Excel/PDF formats',
    ],
    techStack: ['Golang', 'JavaScript', 'Bootstrap', 'MySQL', 'REST API'],
  },
  {
    title: 'Mobile Payment App',
    description:
      'Secure mobile payment application with QR code scanning and digital wallet.',
    logo: '/logos/vsc.svg',
    link: 'https://github.com/example/mobile-payment',
    slug: 'mobile-payment',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    stars: 678,
    forks: 123,
    language: 'React Native',
  },
  {
    title: 'Inventory Management',
    description:
      'Complete inventory management system with barcode scanning and stock tracking.',
    logo: '/logos/vsc.svg',
    link: 'https://github.com/example/inventory',
    slug: 'inventory-management',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    stars: 432,
    forks: 89,
    language: 'Laravel',
  },
  {
    title: 'Social Media Platform',
    description:
      'A modern social media platform with real-time messaging and content sharing.',
    logo: '/logos/vsc.svg',
    link: 'https://github.com/example/social',
    slug: 'social-media',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    stars: 890,
    forks: 234,
    language: 'Next.js',
  },
  {
    title: 'Video Streaming Service',
    description:
      'High-performance video streaming platform with adaptive bitrate streaming.',
    logo: '/logos/vsc.svg',
    link: 'https://github.com/example/streaming',
    slug: 'video-streaming',
    image: 'https://images.unsplash.com/photo-1574267432644-f916d8e48e88?w=800&q=80',
    stars: 567,
    forks: 145,
    language: 'Node.js',
  },
  {
    title: 'Task Management Tool',
    description:
      'Collaborative task management with kanban boards and team collaboration.',
    logo: '/logos/vsc.svg',
    link: 'https://github.com/example/tasks',
    slug: 'task-management',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    stars: 345,
    forks: 78,
    language: 'Vue.js',
  },
];
