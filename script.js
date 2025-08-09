// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavbar();
    initSmoothScrolling();
    initAnimations();
    initScrollProgress();
    initMobileMenu();
    initButtonEffects();
    init3DModels();
    initBrandDetails();
    initGallery();
    initParallax();
    initPerformanceMonitoring();
    initAccessibility();
    initThemeToggle();
    initMobileOptimizations();
});

// Loading Screen - Mobile optimized
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Reduce loading time on mobile
    const loadingTime = window.innerWidth <= 768 ? 1000 : 2000;
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, loadingTime);
}

// Navbar functionality - Mobile optimized
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.1)';
        }
    });
}

// Mobile menu functionality - Enhanced
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        // Touch-friendly toggle
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth scrolling for navigation links - Mobile optimized
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                // Use smooth scrolling if supported, otherwise instant
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo(0, offsetTop);
                }
            }
        });
    });
}

// Scroll to section function (for buttons) - Mobile optimized
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo(0, offsetTop);
        }
    }
}

// Scroll animations - Mobile optimized
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.brand-card, .showcase-item, .review-card, .stat-card, .about-content, .contact-content');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Scroll progress indicator - Mobile optimized
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.offsetHeight - window.innerHeight;
                const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
                
                progressBar.style.width = scrollPercent + '%';
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Button effects - Mobile optimized
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Touch-friendly button effects
        button.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function(e) {
            this.style.transform = '';
        });
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 3D Models initialization - Mobile optimized
function init3DModels() {
    const modelViewers = document.querySelectorAll('model-viewer');
    
    modelViewers.forEach(viewer => {
        viewer.addEventListener('load', function() {
            const loadingSpinner = this.querySelector('.model-loading');
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
        });
        
        viewer.addEventListener('error', function() {
            const loadingSpinner = this.querySelector('.model-loading');
            if (loadingSpinner) {
                loadingSpinner.innerHTML = '<p>3D Model yüklenemedi</p>';
            }
        });
        
        // Mobile-specific 3D model optimizations
        if (window.innerWidth <= 768) {
            viewer.setAttribute('camera-orbit', '0deg 75deg 100%');
            viewer.setAttribute('min-camera-orbit', 'auto auto 75%');
            viewer.setAttribute('max-camera-orbit', 'auto auto 200%');
        }
    });
}

// Simplified brand details modal - Mobile optimized
function showBrandDetails(brand) {
    const brandData = {
        mercedes: {
            name: 'Mercedes-Benz',
            description: 'Lüks ve zarafetin zirvesi',
            models: ['S-Class', 'E-Class', 'GLC', 'AMG GT'],
            image: 'mercedes/mercedes-s-class/mercedes-s-class-front.png',
            features: ['Lüks Konfor', 'Gelişmiş Teknoloji', 'Güvenlik Sistemleri', 'Performans'],
            description: 'Mercedes-Benz, 1886\'dan beri otomotiv dünyasının öncü markası olarak lüks, konfor ve teknolojinin mükemmel uyumunu sunmaktadır.'
        },
        audi: {
            name: 'Audi',
            description: 'Gelişmiş teknoloji ve çağdaş tasarım',
            models: ['A6 Sportback e-tron', 'e-tron GT quattro', 'Q4 e-tron'],
            image: 'AUDI/A6 Sportback e-tron/Schermafbeelding_2025-08-08_193408-removebg-preview.png',
            features: ['Elektrikli Teknoloji', 'Quattro Dört Tekerlekten Çekiş', 'Audi Virtual Cockpit', 'Sürüş Asistanları'],
            description: 'Audi, "Vorsprung durch Technik" (Teknoloji ile İlerleme) felsefesiyle geleceğin otomobillerini bugünden yaşatır.'
        },
        jeep: {
            name: 'Jeep',
            description: 'Her yolculukta macera ve güç',
            models: ['Grand Cherokee', 'Wrangler Unlimited', 'Renegade', 'Gladiator'],
            image: 'jeep/jeep-grand-cherokee.png',
            features: ['4x4 Yetenek', 'Arazi Performansı', 'Dayanıklılık', 'Macera Ruhu'],
            description: 'Jeep, 1941\'den beri arazide özgürlüğün ve maceranın simgesi olarak her türlü koşulda güvenilir performans sunar.'
        },
        landrover: {
            name: 'Land Rover',
            description: 'Arazide lüks ve yetenek',
            models: ['Range Rover Sport', 'Range Rover Vogue', 'Defender 110'],
            image: 'landrover/landrover-range-rover-sport/landrover-range-rover-sport-front.png',
            features: ['Terrain Response', 'Lüks Konfor', 'Arazi Yetenekleri', 'İngiliz Zarafeti'],
            description: 'Land Rover, 1948\'den beri lüks ve arazi yeteneklerini mükemmel şekilde birleştirerek premium SUV segmentinin öncüsüdür.'
        }
    };
    
    const data = brandData[brand];
    if (!data) return;
    
    // Remove any existing modals first
    const existingModals = document.querySelectorAll('.brand-modal, .models-modal, .car-details-modal');
    existingModals.forEach(modal => modal.remove());
    
    // Create modal with mobile-optimized structure
    const modal = document.createElement('div');
    modal.className = 'brand-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-header">
                    <img src="${data.image}" alt="${data.name}" class="modal-brand-image" loading="lazy">
                    <div class="modal-brand-info">
                        <h2>${data.name}</h2>
                        <p>${data.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-section">
                        <h3>Özellikler</h3>
                        <div class="features-grid">
                            ${data.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-section">
                        <h3>Modeller</h3>
                        <div class="modal-models">
                            ${data.models.map(model => `<span class="model-tag">${model}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="viewBrandModels('${brand}')">Modelleri İncele</button>
                        <button class="btn btn-outline" onclick="closeModalAndScrollToContact()">İletişime Geç</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality - Mobile optimized
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Focus management for accessibility
    closeBtn.focus();
}

// Simplified brand models modal - Mobile optimized
function viewBrandModels(brand) {
    const brandModels = {
        mercedes: [
            {
                name: 'S-Class',
                image: 'mercedes/mercedes-s-class/mercedes-s-class-front.png',
                description: 'Lüks sedan segmentinin zirvesi',
                specs: { engine: '3.0L V6', power: '258 HP', acceleration: '6.2s' }
            },
            {
                name: 'E-Class',
                image: 'mercedes/mercedes-e-klasse/mercedes-e-klasse-front.png',
                description: 'İş ve lüksün mükemmel uyumu',
                specs: { engine: '2.0L I4', power: '197 HP', acceleration: '7.4s' }
            },
            {
                name: 'GLC',
                image: 'mercedes/mercedes-glc/mercedes-glc-front.png',
                description: 'Lüks SUV deneyimi',
                specs: { engine: '2.0L I4', power: '197 HP', acceleration: '8.4s' }
            },
            {
                name: 'AMG GT',
                image: 'mercedes/mercedes-amg-gt/mercedes-amg-gt-front.png',
                description: 'Spor performansın zirvesi',
                specs: { engine: '4.0L V8', power: '585 HP', acceleration: '3.2s' }
            }
        ],
        audi: [
            {
                name: 'A6 Sportback e-tron',
                image: 'AUDI/A6 Sportback e-tron/Schermafbeelding_2025-08-08_193408-removebg-preview.png',
                description: 'Elektrikli lüks sedan',
                specs: { engine: 'Dual Motor', power: '476 HP', acceleration: '4.3s' }
            },
            {
                name: 'e-tron GT quattro',
                image: 'AUDI/e-tron GT quattro/V3_X2S1.PNG',
                description: 'Elektrikli spor sedan',
                specs: { engine: 'Dual Motor', power: '646 HP', acceleration: '3.1s' }
            },
            {
                name: 'Q4 e-tron',
                image: 'AUDI/Q4 e-tron/V3_XWT1.PNG',
                description: 'Kompakt elektrikli SUV',
                specs: { engine: 'Single Motor', power: '204 HP', acceleration: '8.5s' }
            }
        ],
        jeep: [
            {
                name: 'Grand Cherokee',
                image: 'jeep/jeep-grand-cherokee.png',
                description: 'Lüks SUV performansı',
                specs: { engine: '3.6L V6', power: '295 HP', acceleration: '8.4s' }
            },
            {
                name: 'Wrangler Unlimited',
                image: 'jeep/jeep-wrangler-unlimited.png',
                description: 'Arazi macerası',
                specs: { engine: '3.6L V6', power: '285 HP', acceleration: '8.4s' }
            },
            {
                name: 'Renegade',
                image: 'jeep/jeep-renegade.png',
                description: 'Kompakt SUV',
                specs: { engine: '1.3L I4', power: '177 HP', acceleration: '9.5s' }
            },
            {
                name: 'Gladiator',
                image: 'jeep/jeep-gladiator.png',
                description: 'Pickup gücü',
                specs: { engine: '3.6L V6', power: '285 HP', acceleration: '8.4s' }
            }
        ],
        landrover: [
            {
                name: 'Range Rover Sport',
                image: 'landrover/landrover-range-rover-sport/landrover-range-rover-sport-front.png',
                description: 'Spor lüks SUV',
                specs: { engine: '3.0L I6', power: '355 HP', acceleration: '6.0s' }
            },
            {
                name: 'Range Rover Vogue',
                image: 'landrover/landrover-range-rover-vogue/landrover-range-rover-vogue-front.png',
                description: 'Ultra lüks SUV',
                specs: { engine: '4.4L V8', power: '523 HP', acceleration: '4.6s' }
            },
            {
                name: 'Defender 110',
                image: 'landrover/landrover-defender-110/landrover-defender-110-front.png',
                description: 'Arazi yetenekleri',
                specs: { engine: '3.0L I6', power: '296 HP', acceleration: '7.1s' }
            }
        ]
    };
    
    const models = brandModels[brand];
    if (!models) return;
    
    // Remove any existing modals first
    const existingModals = document.querySelectorAll('.brand-modal, .models-modal, .car-details-modal');
    existingModals.forEach(modal => modal.remove());
    
    // Create models modal with mobile-optimized structure
    const modal = document.createElement('div');
    modal.className = 'models-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-header">
                    <h2>${brand.charAt(0).toUpperCase() + brand.slice(1)} Modelleri</h2>
                </div>
                <div class="modal-body">
                    <div class="models-grid">
                        ${models.map(model => `
                            <div class="model-card">
                                <img src="${model.image}" alt="${model.name}" class="model-image" loading="lazy">
                                <div class="model-info">
                                    <h3>${model.name}</h3>
                                    <p>${model.description}</p>
                                    <div class="model-specs">
                                        <span class="spec-item">
                                            <strong>Motor:</strong> ${model.specs.engine}
                                        </span>
                                        <span class="spec-item">
                                            <strong>Güç:</strong> ${model.specs.power}
                                        </span>
                                        <span class="spec-item">
                                            <strong>0-100 km/h:</strong> ${model.specs.acceleration}
                                        </span>
                                    </div>
                                    <div class="model-actions">
                                        <button class="btn btn-primary" onclick="viewCarDetails('${brand}-${model.name.toLowerCase().replace(/\s+/g, '-').replace('e-klasse', 'e-class')}')">Detayları Gör</button>
                                        <button class="btn btn-outline" onclick="closeModalAndScrollToContact()">İletişime Geç</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality - Mobile optimized
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Focus management for accessibility
    closeBtn.focus();
}

// View 3D model modal
function view3DModel(modelId) {
    // Map car IDs to their 3D model data
    const modelData = {
        // Mercedes models
        'mercedes-s-class': {
            name: 'Mercedes-Benz S-Class',
            src: '3d-models/mercedes_1/scene.gltf',
            description: 'Lüks sedan segmentinin zirvesinde yer alan, en son teknoloji ve üstün konforu bir araya getiren prestijli araçtır.'
        },
        'mercedes-e-class': {
            name: 'Mercedes-Benz E-Class',
            src: '3d-models/mercedes_1/scene.gltf',
            description: 'Lüks sedan segmentinin öncü modellerinden biridir. Gelişmiş teknoloji, üstün konfor ve güvenlik özellikleriyle öne çıkar.'
        },
        'mercedes-glc': {
            name: 'Mercedes-Benz GLC',
            src: '3d-models/mercedes_1/scene.gltf',
            description: 'Lüks SUV segmentinde konfor ve performansı mükemmel şekilde harmanlayan bir modeldir.'
        },
        'mercedes-amg-gt': {
            name: 'Mercedes-AMG GT',
            src: '3d-models/mercedes_1/scene.gltf',
            description: 'Spor performansın zirvesinde yer alan, motor sporlarından ilham alan tasarımı ve güçlü motoru ile sürüş tutkusunu yaşatan bir modeldir.'
        },
        // Audi models
        'audi-a6-sportback-e-tron': {
            name: 'Audi A6 Sportback e-tron',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Elektrikli güç ve premium konforu bir arada sunar. Gelişmiş sürüş asistanları ve modern tasarımıyla öne çıkar.'
        },
        'audi-e-tron-gt-quattro': {
            name: 'Audi e-tron GT quattro',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Güçlü elektrikli performansı ve sportif tasarımı ile heyecan verici bir sürüş sunar.'
        },
        'audi-q4-e-tron': {
            name: 'Audi Q4 e-tron',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Kompakt SUV pratikliği ile elektrikli sürüşün sessiz ve verimli dünyasını birleştirir.'
        },
        // Jeep models
        'jeep-grand-cherokee': {
            name: 'Jeep Grand Cherokee',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Lüks ve arazi yeteneklerini bir arada sunan güçlü bir SUV deneyimi sağlar.'
        },
        'jeep-wrangler-unlimited': {
            name: 'Jeep Wrangler Unlimited',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Arazi macerasının simgesi olan, her türlü koşulda güvenilir performans sunan efsanevi bir modeldir.'
        },
        'jeep-renegade': {
            name: 'Jeep Renegade',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Kompakt SUV segmentinde Jeep DNA\'sını taşıyan, şehir içi kullanımda pratik, arazi koşullarında yetenekli bir modeldir.'
        },
        'jeep-gladiator': {
            name: 'Jeep Gladiator',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Arazi yetenekleri ile pratik pick-up kullanışlılığını birleştirir.'
        },
        // Land Rover models
        'landrover-range-rover-sport': {
            name: 'Land Rover Range Rover Sport',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Lüks ve performansı mükemmel şekilde harmanlayan, hem şehir hem de zorlu arazi koşullarında üstün sürüş deneyimi sunan premium SUV modelidir.'
        },
        'landrover-range-rover-vogue': {
            name: 'Land Rover Range Rover Vogue',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Ultra lüks SUV segmentinin zirvesinde yer alan, el işçiliği ve en yüksek kalite standartlarıyla üretilen, arazi yeteneklerini lüks konforla birleştiren prestijli modeldir.'
        },
        'landrover-defender-110': {
            name: 'Land Rover Defender 110',
            src: '3d-models/mercedes_1/scene.gltf', // Using available 3D model
            description: 'Efsanevi arazi yeteneklerini modern teknoloji ile birleştiren, her türlü koşulda güvenilir performans sunan, dayanıklılığın simgesi olan modeldir.'
        }
    };
    
    const model = modelData[modelId];
    if (!model) {
        console.warn(`3D model not found for: ${modelId}`);
        return;
    }

    // Ensure only one modal is visible at a time
    const existing = document.querySelectorAll('.brand-modal, .models-modal, .car-details-modal, .model-3d-modal');
    existing.forEach(m => m.remove());
    
    // Create 3D model modal
    const modal = document.createElement('div');
    modal.className = 'model-3d-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-header">
                    <h2>${model.name}</h2>
                    <p>${model.description}</p>
                </div>
                <div class="modal-body">
                    <div class="model-3d-container">
                        <model-viewer
                            src="${model.src}"
                            alt="${model.name} 3D Model"
                            camera-controls
                            auto-rotate
                            shadow-intensity="1"
                            environment-image="neutral"
                            exposure="1"
                            shadow-softness="0.5"
                            camera-orbit="0deg 75deg 75%"
                            min-camera-orbit="auto auto 50%"
                            max-camera-orbit="auto auto 150%"
                            style="width: 100%; height: 60vh;">
                            <div class="model-loading">
                                <div class="loading-spinner"></div>
                                <p>3D Model Yükleniyor...</p>
                            </div>
                        </model-viewer>
                    </div>
                    <div class="model-actions">
                        <button class="btn btn-primary" onclick="viewCarDetails('${modelId}')">Detayları Gör</button>
                        <button class="btn btn-outline" onclick="closeModalAndScrollToContact()">İletişime Geç</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Escape to close
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// View car details modal
function viewCarDetails(carId) {
    const carData = {
        'mercedes-s-class': {
            name: 'Mercedes-Benz S-Class',
            brand: 'Mercedes-Benz',
            category: 'Ultra Lüks Sedan',
            description: 'Mercedes-Benz S-Class, lüks sedan segmentinin zirvesinde yer alan, en son teknoloji ve üstün konforu bir araya getiren prestijli araçtır. 3.0L V6 motor ile 367 beygir güç üreten bu araç, sürücü asistanı sistemleri ve MBUX infotainment sistemi ile geleceğin teknolojisini bugüne taşır.',
            specs: {
                'Motor': '3.0L V6 Biturbo',
                'Güç': '367 HP',
                'Tork': '500 Nm',
                '0-100 km/h': '5.1s',
                'Maksimum Hız': '250 km/h',
                'Yakıt Tüketimi': '7.2L/100km'
            },
            features: [
                'MBUX Infotainment Sistemi',
                'Adaptive Cruise Control',
                'Lane Keeping Assist',
                '360° Kamera',
                'Panoramic Sunroof',
                'Burmester 3D Surround Sound',
                'Magic Body Control',
                'Head-up Display'
            ],
            images: [
                'mercedes/mercedes-s-class/mercedes-s-class-front.png',
                'mercedes/mercedes-s-class/mercedes-s-class-back.png',
                'mercedes/mercedes-s-class/mercedes-s-class-left.png',
                'mercedes/mercedes-s-class/mercedes-s-class-right.png'
            ]
        },
        'mercedes-e-class': {
            name: 'Mercedes-Benz E-Class',
            brand: 'Mercedes-Benz',
            category: 'Lüks Sedan',
            description: 'Mercedes E-Class, lüks sedan segmentinin öncü modellerinden biridir. Gelişmiş teknoloji, üstün konfor ve güvenlik özellikleriyle öne çıkar. İş ve lüksün mükemmel uyumunu sunar.',
            specs: {
                'Motor': '2.0L I4 Turbo',
                'Güç': '197 HP',
                'Tork': '320 Nm',
                '0-100 km/h': '7.4s',
                'Maksimum Hız': '240 km/h',
                'Yakıt Tüketimi': '6.1L/100km'
            },
            features: [
                'MBUX Infotainment Sistemi',
                'Adaptive Cruise Control',
                'Lane Keeping Assist',
                '360° Kamera',
                'Panoramic Sunroof',
                'Burmester Surround Sound',
                'Ambient Lighting',
                'Wireless Charging'
            ],
            images: [
                'mercedes/mercedes-e-klasse/mercedes-e-klasse-front.png',
                'mercedes/mercedes-e-klasse/mercedes-e-klasse-back.png',
                'mercedes/mercedes-e-klasse/mercedes-e-klasse-left.png',
                'mercedes/mercedes-e-klasse/mercedes-e-klasse-right.png'
            ]
        },
        'mercedes-glc': {
            name: 'Mercedes-Benz GLC',
            brand: 'Mercedes-Benz',
            category: 'Lüks SUV',
            description: 'Mercedes GLC, lüks SUV segmentinde konfor ve performansı mükemmel şekilde harmanlayan bir modeldir. Şık tasarımı ve gelişmiş teknolojisi ile her yolculukta premium deneyim sunar.',
            specs: {
                'Motor': '2.0L I4 Turbo',
                'Güç': '197 HP',
                'Tork': '300 Nm',
                '0-100 km/h': '8.4s',
                'Maksimum Hız': '220 km/h',
                'Yakıt Tüketimi': '6.8L/100km'
            },
            features: [
                'MBUX Infotainment Sistemi',
                '4MATIC All-Wheel Drive',
                'Adaptive Cruise Control',
                'Lane Keeping Assist',
                '360° Kamera',
                'Panoramic Sunroof',
                'Burmester Surround Sound',
                'Ambient Lighting'
            ],
            images: [
                'mercedes/mercedes-glc/mercedes-glc-front.png',
                'mercedes/mercedes-glc/mercedes-glc-back.png',
                'mercedes/mercedes-glc/mercedes-glc-left.png',
                'mercedes/mercedes-glc/mercedes-glc-right.png'
            ]
        },
        'mercedes-amg-gt': {
            name: 'Mercedes-AMG GT',
            brand: 'Mercedes-Benz',
            category: 'Spor Araba',
            description: 'Mercedes-AMG GT, spor performansın zirvesinde yer alan, motor sporlarından ilham alan tasarımı ve güçlü motoru ile sürüş tutkusunu yaşatan bir modeldir.',
            specs: {
                'Motor': '4.0L V8 Biturbo',
                'Güç': '585 HP',
                'Tork': '700 Nm',
                '0-100 km/h': '3.2s',
                'Maksimum Hız': '318 km/h',
                'Yakıt Tüketimi': '12.4L/100km'
            },
            features: [
                'AMG DYNAMIC PLUS',
                'AMG RIDE CONTROL',
                'AMG SPEEDSHIFT DCT',
                'AMG Performance Steering',
                'AMG Performance Seats',
                'Burmester Surround Sound',
                'Head-up Display',
                '360° Kamera'
            ],
            images: [
                'mercedes/mercedes-amg-gt/mercedes-amg-gt-front.png',
                'mercedes/mercedes-amg-gt/mercedes-amg-gt-back.png',
                'mercedes/mercedes-amg-gt/mercedes-amg-gt-left.png',
                'mercedes/mercedes-amg-gt/mercedes-amg-gt-right.png'
            ]
        },
        // Audi models - use existing files only
        'audi-a6-sportback-e-tron': {
            name: 'Audi A6 Sportback e-tron',
            brand: 'Audi',
            category: 'Elektrikli Lüks Sedan',
            description: 'Audi A6 Sportback e-tron, elektrikli güç ve premium konforu bir arada sunar. Gelişmiş sürüş asistanları ve modern tasarımıyla öne çıkar.',
            specs: {
                'Motor': 'Dual Motor (AWD)',
                'Güç': '476 HP',
                'Tork': '800 Nm',
                '0-100 km/h': '4.3s',
                'Menzil (WLTP)': '600+ km'
            },
            features: [
                'Quattro Çekiş',
                'Audi Virtual Cockpit',
                'Matrix LED Farlar',
                'Adaptif Hava Süspansiyon',
                'Gelişmiş Sürüş Asistanları'
            ],
            images: [
                'AUDI/A6 Sportback e-tron/Schermafbeelding_2025-08-08_193408-removebg-preview.png',
                'AUDI/A6 Sportback e-tron/Schermafbeelding_2025-08-08_193415-removebg-preview.png',
                'AUDI/A6 Sportback e-tron/Schermafbeelding_2025-08-08_193421-removebg-preview.png',
                'AUDI/A6 Sportback e-tron/Schermafbeelding_2025-08-08_193408-removebg-preview.png'
            ]
        },
        'audi-e-tron-gt-quattro': {
            name: 'Audi e-tron GT quattro',
            brand: 'Audi',
            category: 'Elektrikli Spor Sedan',
            description: 'Audi e-tron GT quattro, güçlü elektrikli performansı ve sportif tasarımı ile heyecan verici bir sürüş sunar.',
            specs: {
                'Motor': 'Dual Motor (AWD)',
                'Güç': '646 HP',
                'Tork': '830 Nm',
                '0-100 km/h': '3.1s',
                'Menzil (WLTP)': '480 km'
            },
            features: [
                'Quattro Çekiş',
                'Torque Vectoring',
                'Sport Diferansiyel',
                'Heads-up Display',
                'Laser Light'
            ],
            images: [
                'AUDI/e-tron GT quattro/V3_X2S1.PNG',
                'AUDI/e-tron GT quattro/V3_X2S2.PNG',
                'AUDI/e-tron GT quattro/V3_X2S3.PNG',
                'AUDI/e-tron GT quattro/V3_X2S1.PNG'
            ]
        },
        'audi-q4-e-tron': {
            name: 'Audi Q4 e-tron',
            brand: 'Audi',
            category: 'Kompakt Elektrikli SUV',
            description: 'Audi Q4 e-tron, kompakt SUV pratikliği ile elektrikli sürüşün sessiz ve verimli dünyasını birleştirir.',
            specs: {
                'Motor': 'Single Motor (RWD)',
                'Güç': '204 HP',
                'Tork': '310 Nm',
                '0-100 km/h': '8.5s',
                'Menzil (WLTP)': '520 km'
            },
            features: [
                'Audi Virtual Cockpit',
                'Augmented Reality Head-up Display',
                'Gelişmiş Sürüş Asistanları',
                'Isı Pompası',
                'Hızlı Şarj (125 kW)'
            ],
            images: [
                'AUDI/Q4 e-tron/V3_XWT1.PNG',
                'AUDI/Q4 e-tron/V3_XWT3.PNG',
                'AUDI/Q4 e-tron/V3_XWT4.PNG',
                'AUDI/Q4 e-tron/V3_XWT1.PNG'
            ]
        },
        // Jeep models - use existing single images for all slots
        'jeep-grand-cherokee': {
            name: 'Jeep Grand Cherokee',
            brand: 'Jeep',
            category: 'Lüks SUV',
            description: 'Jeep Grand Cherokee, lüks ve arazi yeteneklerini bir arada sunan güçlü bir SUV deneyimi sağlar.',
            specs: {
                'Motor': '3.6L V6',
                'Güç': '295 HP',
                'Tork': '353 Nm',
                '0-100 km/h': '8.4s',
                'Maksimum Hız': '200 km/h'
            },
            features: [
                'Selec-Terrain',
                'Quadra-Trac II 4x4',
                'UConnect Infotainment',
                'Panoramik Tavan',
                'Gelişmiş Güvenlik Sistemleri'
            ],
            images: [
                'jeep/jeep-grand-cherokee.png',
                'jeep/jeep-grand-cherokee.png',
                'jeep/jeep-grand-cherokee.png',
                'jeep/jeep-grand-cherokee.png'
            ]
        },
        'jeep-wrangler-unlimited': {
            name: 'Jeep Wrangler Unlimited',
            brand: 'Jeep',
            category: 'Arazi SUV',
            description: 'Jeep Wrangler Unlimited, arazi macerasının simgesi olan, her türlü koşulda güvenilir performans sunan efsanevi bir modeldir. Çıkarılabilir tavanı ve güçlü 4x4 sistemi ile özgürlüğün tadını çıkarın.',
            specs: {
                'Motor': '3.6L V6',
                'Güç': '285 HP',
                'Tork': '353 Nm',
                '0-100 km/h': '8.4s',
                'Maksimum Hız': '180 km/h'
            },
            features: [
                'Command-Trac 4x4 System',
                'Selec-Trac Full-Time 4WD',
                'Tru-Lok Electronic Locking Differentials',
                'Sway Bar Disconnect',
                'Removable Doors & Roof',
                'Uconnect Infotainment',
                'Trail Rated Badge',
                'Off-Road Capability'
            ],
            images: [
                'jeep/jeep-wrangler-unlimited.png',
                'jeep/jeep-wrangler-unlimited.png',
                'jeep/jeep-wrangler-unlimited.png',
                'jeep/jeep-wrangler-unlimited.png'
            ]
        },
        'jeep-renegade': {
            name: 'Jeep Renegade',
            brand: 'Jeep',
            category: 'Kompakt SUV',
            description: 'Jeep Renegade, kompakt SUV segmentinde Jeep DNA\'sını taşıyan, şehir içi kullanımda pratik, arazi koşullarında yetenekli bir modeldir.',
            specs: {
                'Motor': '1.3L I4 Turbo',
                'Güç': '177 HP',
                'Tork': '270 Nm',
                '0-100 km/h': '9.5s',
                'Maksimum Hız': '195 km/h'
            },
            features: [
                'Selec-Terrain Traction Management',
                '4x4 Capability',
                'Uconnect Infotainment',
                'Blind Spot Monitoring',
                'Rear Cross Path Detection',
                'ParkSense Rear Park Assist',
                'Trail Rated Badge',
                'Removable Roof Panels'
            ],
            images: [
                'jeep/jeep-renegade.png',
                'jeep/jeep-renegade.png',
                'jeep/jeep-renegade.png',
                'jeep/jeep-renegade.png'
            ]
        },
        'jeep-gladiator': {
            name: 'Jeep Gladiator',
            brand: 'Jeep',
            category: 'Pickup',
            description: 'Jeep Gladiator, arazi yetenekleri ile pratik pick-up kullanışlılığını birleştirir.',
            specs: {
                'Motor': '3.6L V6',
                'Güç': '285 HP',
                'Tork': '353 Nm',
                '0-100 km/h': '8.6s',
                'Maksimum Hız': '175 km/h'
            },
            features: [
                'Trail Rated',
                '4x4 Sistemleri',
                'Uconnect',
                'Çıkarılabilir Kapılar & Tavan',
                'Yüksek Taşıma Kapasitesi'
            ],
            images: [
                'jeep/jeep-gladiator.png',
                'jeep/jeep-gladiator.png',
                'jeep/jeep-gladiator.png',
                'jeep/jeep-gladiator.png'
            ]
        },
        // Land Rover models - use available files
        'landrover-range-rover-sport': {
            name: 'Land Rover Range Rover Sport',
            brand: 'Land Rover',
            category: 'Lüks SUV',
            description: 'Land Rover Range Rover Sport, lüks ve performansı mükemmel şekilde harmanlayan, hem şehir hem de zorlu arazi koşullarında üstün sürüş deneyimi sunan premium SUV modelidir.',
            specs: {
                'Motor': '3.0L I6 Turbo',
                'Güç': '355 HP',
                'Tork': '500 Nm',
                '0-100 km/h': '6.0s',
                'Maksimum Hız': '250 km/h',
                'Yakıt Tüketimi': '8.9L/100km'
            },
            features: [
                'Terrain Response 2',
                'Adaptive Dynamics',
                'All-Terrain Progress Control',
                'Wade Sensing',
                'Meridian Surround Sound',
                'InControl Touch Pro Duo',
                '360° Camera',
                'Head-up Display'
            ],
            images: [
                'landrover/landrover-range-rover-sport/landrover-range-rover-sport-front.png',
                'landrover/landrover-range-rover-sport/landrover-range-rover-sport-back.png',
                'landrover/landrover-range-rover-sport/landrover-range-rover-sport-right.png',
                'landrover/landrover-range-rover-sport/landrover-range-rover-sport-front.png'
            ]
        },
        'landrover-range-rover-vogue': {
            name: 'Land Rover Range Rover Vogue',
            brand: 'Land Rover',
            category: 'Ultra Lüks SUV',
            description: 'Land Rover Range Rover Vogue, ultra lüks SUV segmentinin zirvesinde yer alan, el işçiliği ve en yüksek kalite standartlarıyla üretilen, arazi yeteneklerini lüks konforla birleştiren prestijli modeldir.',
            specs: {
                'Motor': '4.4L V8 Twin-Turbo',
                'Güç': '523 HP',
                'Tork': '750 Nm',
                '0-100 km/h': '4.6s',
                'Maksimum Hız': '250 km/h',
                'Yakıt Tüketimi': '12.8L/100km'
            },
            features: [
                'Terrain Response 2',
                'Adaptive Dynamics',
                'All-Terrain Progress Control',
                'Wade Sensing',
                'Meridian 3D Surround Sound',
                'InControl Touch Pro Duo',
                '360° Camera',
                'Head-up Display',
                'Executive Rear Seats',
                'Panoramic Roof'
            ],
            images: [
                'landrover/landrover-range-rover-vogue/landrover-range-rover-vogue-front.png',
                'landrover/landrover-range-rover-vogue/landrover-range-rover-vogue-back.png',
                'landrover/landrover-range-rover-vogue/landrover-range-rover-vogue-right.png',
                'landrover/landrover-range-rover-vogue/landrover-range-rover-vogue-front.png'
            ]
        },
        'landrover-defender-110': {
            name: 'Land Rover Defender 110',
            brand: 'Land Rover',
            category: 'Arazi SUV',
            description: 'Land Rover Defender 110, efsanevi arazi yeteneklerini modern teknoloji ile birleştiren, her türlü koşulda güvenilir performans sunan, dayanıklılığın simgesi olan modeldir.',
            specs: {
                'Motor': '3.0L I6 Turbo',
                'Güç': '296 HP',
                'Tork': '550 Nm',
                '0-100 km/h': '7.1s',
                'Maksimum Hız': '200 km/h',
                'Yakıt Tüketimi': '9.2L/100km'
            },
            features: [
                'Terrain Response 2',
                'All-Terrain Progress Control',
                'Wade Sensing',
                'ClearSight Ground View',
                'InControl Touch Pro',
                'Meridian Sound System',
                '360° Camera',
                'Head-up Display',
                'Configurable Terrain Response',
                'Off-Road Capability'
            ],
            images: [
                'landrover/landrover-defender-110/landrover-defender-110-front.png',
                'landrover/landrover-defender-110/landrover-defender-110-back.png',
                'landrover/landrover-defender-110/landrover-defender-110-right.png',
                'landrover/landrover-defender-110/landrover-defender-110-front.png'
            ]
        }
    };

    const car = carData[carId];
    if (!car) return;

    // Remove any existing modals first
    const existingModals = document.querySelectorAll('.brand-modal, .models-modal, .car-details-modal');
    existingModals.forEach(modal => modal.remove());

    // Create car details modal
    const modal = document.createElement('div');
    modal.className = 'car-details-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-header">
                    <div class="car-header-info">
                        <h2>${car.name}</h2>
                        <p class="car-category">${car.category}</p>
                    </div>
                </div>
                <div class="car-gallery">
                    <div class="main-image">
                        <img src="${car.images[0]}" alt="${car.name}" id="car-main-image" loading="lazy">
                    </div>
                    <div class="thumbnail-images">
                        ${car.images.map((image, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeCarImage('${image}', this)">
                                <img src="${image}" alt="${car.name} ${index + 1}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="car-details">
                    <div class="car-description">
                        <h3>Araç Açıklaması</h3>
                        <p>${car.description}</p>
                    </div>
                    <div class="car-specs">
                        <h3>Teknik Özellikler</h3>
                        <div class="specs-grid">
                            ${Object.entries(car.specs).map(([key, value]) => `
                                <div class="spec-item">
                                    <span class="spec-label">${key}</span>
                                    <span class="spec-value">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="car-features">
                        <h3>Özellikler</h3>
                        <div class="features-list">
                            ${car.features.map(feature => `
                                <div class="feature-item">${feature}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="car-actions">
                    <button class="btn btn-primary" onclick="closeModalAndScrollToContact()">İletişime Geç</button>
                    <button class="btn btn-outline" onclick="view3DModel('${carId}')">3D Görüntüle</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Focus management for accessibility
    closeBtn.focus();
}

// Function to close modal and scroll to contact - Fixed
function closeModalAndScrollToContact() {
    // Close all modals
    const modals = document.querySelectorAll('.modal-overlay, .developer-modal, .brand-modal, .models-modal, .car-details-modal, .model-3d-modal');
    modals.forEach(modal => modal.remove());

    // Reset body overflow
    document.body.style.overflow = '';

    // Scroll to contact section
    setTimeout(() => {
        scrollToSection('contact');
    }, 300);
}

// Function to change car image in gallery
function changeCarImage(src, element) {
    const mainImage = document.querySelector('#car-main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage) {
        // Remove active class from all thumbnails
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        element.classList.add('active');
        
        // Change main image with fade effect
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = src;
            mainImage.style.opacity = '1';
        }, 150);
    }
}

// Initialize brand details functionality
function initBrandDetails() {
    // This function is already handled by the global functions showBrandDetails and viewBrandModels
    console.log('Brand details initialized');
}

// Initialize gallery functionality
function initGallery() {
    const thumbItems = document.querySelectorAll('.gallery-thumb-item');
    const mainImage = document.querySelector('#gallery-main');
    const mainDescription = document.querySelector('#gallery-description');
    
    if (!thumbItems.length || !mainImage || !mainDescription) {
        console.warn('Gallery elements not found');
        return;
    }
    
    thumbItems.forEach((thumbItem, index) => {
        const handleInteraction = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove active class from all thumbnails
            thumbItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const newSrc = this.getAttribute('data-src');
            const newAlt = this.getAttribute('data-alt');
            const newTitle = this.getAttribute('data-title');
            const newDescription = this.getAttribute('data-description');
            
            if (!newSrc) {
                console.warn('No data-src found for thumbnail');
                return;
            }
            
            // Fade out effect
            mainImage.style.opacity = '0';
            mainDescription.style.opacity = '0';
            
            setTimeout(() => {
                // Update content
                mainImage.src = newSrc;
                mainImage.alt = newAlt;
                
                // Update description
                const titleElement = mainDescription.querySelector('h4');
                const descElement = mainDescription.querySelector('p');
                
                if (titleElement) titleElement.textContent = newTitle || '';
                if (descElement) descElement.textContent = newDescription || '';
                
                // Fade in effect
                mainImage.style.opacity = '1';
                mainDescription.style.opacity = '1';
            }, 150);
        };
        
        // Add both touch and click events for better mobile support
        thumbItem.addEventListener('click', handleInteraction);
        thumbItem.addEventListener('touchend', handleInteraction, {passive: false});
    });
    
    // Initialize the first thumbnail as active if none is active
    const activeThumb = document.querySelector('.gallery-thumb-item.active');
    if (!activeThumb && thumbItems.length > 0) {
        thumbItems[0].classList.add('active');
    }
}

// Parallax effect for background elements
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-element');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Performance monitoring for mobile
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            // Log performance data for debugging
            console.log('Page load time:', loadTime + 'ms');
            
            // Send performance data if needed
            if (loadTime > 3000) {
                console.warn('Page load time is slow:', loadTime + 'ms');
            }
        }
    });

    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Optimize scroll performance
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            // Update scroll progress if needed
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }
        }, 16); // 60fps
    });
}

// Accessibility improvements for mobile
function initAccessibility() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Add ARIA labels for better screen reader support
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });

    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Ana içeriğe geç';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent);
        color: var(--dark);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Theme toggle functionality
function initThemeToggle() {
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Add theme toggle button if needed
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
    `;
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Add to navbar if needed
    const navbar = document.querySelector('.navbar .container');
    if (navbar) {
        navbar.appendChild(themeToggle);
    }
}

// Add CSS for ripple effect and other animations
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .message {
        padding: 1rem 1.5rem;
        border-radius: 12px;
        margin: 1rem 0;
        font-weight: 500;
        border: 1px solid;
    }
    
    .message.success {
        background: rgba(34, 197, 94, 0.1);
        color: #22C55E;
        border-color: #22C55E;
    }
    
    .message.error {
        background: rgba(239, 68, 68, 0.1);
        color: #EF4444;
        border-color: #EF4444;
    }
    
    .gallery-thumb.active {
        border: 2px solid var(--accent);
        transform: scale(1.1);
    }
    
    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid var(--gray-dark);
        border-radius: 50%;
        border-top-color: var(--accent);
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Developer Info Popup - Fixed
function showDeveloperInfo() {
    const modalHTML = `
        <div class="developer-modal">
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" onclick="closeDeveloperModal()">&times;</button>
                    <div class="modal-header">
                        <img src="assets/logos/fanarilabs.png" alt="Fanari Labs" class="developer-logo" onerror="this.style.display='none'">
                        <h2>Fanari Labs</h2>
                        <p>AI and Web Development Agency</p>
                    </div>
                    <div class="developer-info">
                        <div class="developer-info-item">
                            <div class="developer-info-icon">📧</div>
                            <div class="developer-info-content">
                                <h3>Email</h3>
                                <a href="mailto:fanarilabs@gmail.com">fanarilabs@gmail.com</a>
                            </div>
                        </div>
                        <div class="developer-info-item">
                            <div class="developer-info-icon">📞</div>
                            <div class="developer-info-content">
                                <h3>Phone</h3>
                                <a href="tel:+905379295163">+90 537 929 51 63</a>
                            </div>
                        </div>
                        <div class="developer-info-item">
                            <div class="developer-info-icon">🌐</div>
                            <div class="developer-info-content">
                                <h3>Website</h3>
                                <a href="https://fanarilabs.com" target="_blank">fanarilabs.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Close developer modal
function closeDeveloperModal() {
    const modal = document.querySelector('.developer-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
} 

// Enhanced mobile menu functionality
function initEnhancedMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        // Add swipe to close functionality
        let startX = 0;
        let currentX = 0;
        
        navMenu.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, {passive: true});
        
        navMenu.addEventListener('touchmove', function(e) {
            currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            
            if (diffX > 50) { // Swipe left to close
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, {passive: true});
        
        // Add backdrop blur effect
        navMenu.addEventListener('transitionend', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.style.backdropFilter = 'blur(20px)';
            } else {
                navMenu.style.backdropFilter = 'none';
            }
        });
    }
}

// Mobile-specific image optimization
function initMobileImageOptimization() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add lazy loading for better performance
        if (!img.loading) {
            img.loading = 'lazy';
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
        
        // Optimize for mobile viewport
        if (window.innerWidth <= 768) {
            // Reduce image quality for mobile if needed
            if (this.dataset.mobileSrc) {
                this.src = this.dataset.mobileSrc;
            }
        }
    });
}

// Mobile-specific scroll optimizations
function initMobileScrollOptimizations() {
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            // Optimize scroll performance on mobile
            const scrollTop = window.pageYOffset;
            
            // Update navbar background based on scroll position
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (scrollTop > 100) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                } else {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                }
            }
            
            // Update scroll progress
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                const docHeight = document.body.offsetHeight - window.innerHeight;
                const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
                progressBar.style.width = scrollPercent + '%';
            }
        }, 16); // 60fps
    }, {passive: true});
}

// Mobile-specific touch optimizations
function initMobileTouchOptimizations() {
    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('.btn, .nav-menu a, .gallery-thumb-item');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            // Prevent zoom on double tap
            const now = Date.now();
            const lastTouch = this.lastTouch || 0;
            const timeDiff = now - lastTouch;
            
            if (timeDiff < 300 && timeDiff > 0) {
                e.preventDefault();
            }
            
            this.lastTouch = now;
        }, {passive: false});
        
        // Add touch feedback
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, {passive: true});
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        }, {passive: true});
    });
}

// Initialize all mobile optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Call all initialization functions
    initLoadingScreen();
    initNavbar();
    initSmoothScrolling();
    initAnimations();
    initScrollProgress();
    initMobileMenu();
    initButtonEffects();
    init3DModels();
    initBrandDetails();
    initGallery();
    initParallax();
    initPerformanceMonitoring();
    initAccessibility();
    initThemeToggle();
    initMobileOptimizations();
    initEnhancedMobileMenu();
    initMobileImageOptimization();
    initMobileScrollOptimizations();
    initMobileTouchOptimizations();
}); 