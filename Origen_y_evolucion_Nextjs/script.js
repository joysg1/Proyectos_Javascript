document.addEventListener('DOMContentLoaded', function() {
    console.log('NextLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de características
    const featuresData = [
        {
            icon: 'server-outline',
            title: 'Renderizado Híbrido',
            description: 'SSG, SSR e ISR en un solo framework. Elige la estrategia según tus necesidades.',
            color: '#0070f3',
            status: 'Desde v9',
            year: '2019'
        },
        {
            icon: 'code-slash-outline',
            title: 'File-based Routing',
            description: 'Sistema de enrutamiento automático basado en la estructura de archivos.',
            color: '#ff4081',
            status: 'Core',
            year: '2016'
        },
        {
            icon: 'image-outline',
            title: 'Image Optimization',
            description: 'Optimización automática de imágenes con WebP, lazy loading y responsive.',
            color: '#00c7ff',
            status: 'Desde v10',
            year: '2020'
        },
        {
            icon: 'construct-outline',
            title: 'API Routes',
            description: 'Crea endpoints API dentro de tu proyecto Next.js sin backend separado.',
            color: '#8b5cf6',
            status: 'Desde v9',
            year: '2019'
        },
        {
            icon: 'shield-checkmark-outline',
            title: 'TypeScript Nativo',
            description: 'Soporte nativo para TypeScript sin configuración adicional.',
            color: '#0070f3',
            status: 'Desde v9',
            year: '2019'
        },
        {
            icon: 'flash-outline',
            title: 'Middleware',
            description: 'Ejecuta código antes de que una solicitud sea completada. Perfecto para auth, redirecciones, etc.',
            color: '#ff4757',
            status: 'Desde v12',
            year: '2021'
        }
    ];

    // Datos de frameworks para simulación
    const frameworksData = {
        'nextjs': {
            name: 'Next.js',
            performance: 95,
            seo: 98,
            developerExperience: 92,
            scalability: 90,
            community: 95,
            color: '#0070f3',
            description: 'Framework React full-stack con renderizado híbrido y excelente SEO.',
            applications: ['E-commerce', 'Blogs', 'Dashboards', 'Aplicaciones empresariales'],
            learningCurve: 70,
            bundleSize: 85
        },
        'cra': {
            name: 'Create React App',
            performance: 75,
            seo: 40,
            developerExperience: 85,
            scalability: 60,
            community: 90,
            color: '#61dafb',
            description: 'Configuración oficial para crear aplicaciones React de una sola página.',
            applications: ['SPAs', 'Aplicaciones internas', 'Prototipos', 'Landing pages simples'],
            learningCurve: 85,
            bundleSize: 60
        },
        'gatsby': {
            name: 'Gatsby',
            performance: 90,
            seo: 95,
            developerExperience: 80,
            scalability: 75,
            community: 85,
            color: '#663399',
            description: 'Framework React para sitios estáticos con GraphQL integrado.',
            applications: ['Blogs estáticos', 'Documentación', 'Portafolios', 'Sitios de marketing'],
            learningCurve: 65,
            bundleSize: 70
        },
        'remix': {
            name: 'Remix',
            performance: 88,
            seo: 90,
            developerExperience: 85,
            scalability: 85,
            community: 75,
            color: '#121212',
            description: 'Framework React full-stack con enfoque en web standards y UX.',
            applications: ['Aplicaciones dinámicas', 'Dashboards', 'Aplicaciones con formularios'],
            learningCurve: 75,
            bundleSize: 80
        }
    };

    // Inicializar componentes
    initNetworkParticles();
    initFeatures();
    initEventListeners();
    initAnimations();
    initTimeline();
    initFrameworkSimulation();
    initCharts();

    // Función para inicializar partículas de red
    function initNetworkParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const type = Math.random();
                let color, size, speed;
                
                if (type < 0.5) {
                    // Nodos principales (azul Next.js)
                    color = `rgba(0, 112, 243, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 5 + 3;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.8) {
                    // Nodos de datos (cian)
                    color = `rgba(0, 199, 255, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Nodos especiales (rosa)
                    color = `rgba(255, 64, 129, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 6 + 3;
                    speed = (Math.random() - 0.5) * 0.5;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.7,
                    color: color,
                    pulseSpeed: Math.random() * 0.03 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    connections: []
                });
            }
        }
        
        function drawParticle(ctx, particle) {
            ctx.save();
            
            // Efecto de pulso
            const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
            const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
            
            // Gradiente para partículas
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            
            if (particle.color.includes('255, 64, 129')) {
                gradient.addColorStop(0, `rgba(255, 64, 129, ${currentAlpha})`);
                gradient.addColorStop(1, 'rgba(255, 64, 129, 0)');
            } else if (particle.color.includes('0, 199, 255')) {
                gradient.addColorStop(0, `rgba(0, 199, 255, ${currentAlpha})`);
                gradient.addColorStop(1, 'rgba(0, 199, 255, 0)');
            } else {
                gradient.addColorStop(0, `rgba(0, 112, 243, ${currentAlpha})`);
                gradient.addColorStop(1, 'rgba(0, 112, 243, 0)');
            }
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 18, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar conexiones entre partículas cercanas
            ctx.strokeStyle = 'rgba(0, 112, 243, 0.15)';
            ctx.lineWidth = 0.8;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        const alpha = 1 - (distance / 150);
                        ctx.strokeStyle = `rgba(0, 112, 243, ${alpha * 0.2})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            // Actualizar y dibujar partículas
            particles.forEach(particle => {
                // Movimiento
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Mantener partículas dentro del canvas
                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));
                
                drawParticle(ctx, particle);
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        
        resizeCanvas();
        createParticles();
        animateParticles();
        console.log('Partículas de red inicializadas');
    }

    // Función para inicializar características
    function initFeatures() {
        const container = document.getElementById('featuresInfo');
        if (!container) {
            console.error('Contenedor de características no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-next-accent-light">Características Clave de Next.js</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="featuresGrid">
                ${featuresData.map(feature => `
                    <div class="feature-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-next-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-feature="${feature.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${feature.color}20; color: ${feature.color};">
                                <ion-icon name="${feature.icon}" class="text-xl"></ion-icon>
                            </div>
                            <div>
                                <h4 class="font-bold">${feature.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${feature.color}20; color: ${feature.color};">${feature.status}</span>
                                    <span class="text-xs text-text-muted">${feature.year}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${feature.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de características
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', function() {
                const featureName = this.getAttribute('data-feature');
                showFeatureDetail(featureName);
            });
        });
        
        console.log('Características inicializadas: ' + featuresData.length);
    }

    // Función para mostrar detalle de característica
    function showFeatureDetail(featureName) {
        const feature = featuresData.find(f => f.title === featureName);
        if (!feature) return;
        
        const details = {
            'Renderizado Híbrido': {
                description: 'Next.js soporta múltiples estrategias de renderizado en un solo framework.',
                ssg: 'Static Generation: Páginas pre-renderizadas en tiempo de build',
                ssr: 'Server-Side Rendering: Páginas renderizadas en cada request',
                isr: 'Incremental Static Regeneration: Actualización periódica de páginas estáticas',
                useCase: 'Ideal para blogs, e-commerce y contenido dinámico'
            },
            'File-based Routing': {
                description: 'Sistema de enrutamiento automático basado en la estructura del proyecto.',
                convention: 'Las páginas se crean en /pages (o /app en App Router)',
                dynamic: 'Soporte para rutas dinámicas: [id].js',
                nested: 'Rutas anidadas automáticamente',
                useCase: 'Simplifica la organización del proyecto'
            },
            'Image Optimization': {
                description: 'Optimización automática de imágenes para mejor performance.',
                formats: 'Conversión automática a WebP, AVIF',
                lazy: 'Lazy loading automático',
                responsive: 'Imágenes responsivas según dispositivo',
                useCase: 'Mejora Core Web Vitals y experiencia de usuario'
            },
            'API Routes': {
                description: 'Crea endpoints API dentro de tu proyecto Next.js.',
                location: 'Archivos en /pages/api/* se convierten en endpoints',
                serverless: 'Funciones serverless desplegables en Vercel',
                fullstack: 'Desarrollo full-stack en un solo proyecto',
                useCase: 'Backend para aplicaciones, webhooks, autenticación'
            },
            'TypeScript Nativo': {
                description: 'Soporte TypeScript sin configuración adicional.',
                setup: 'npx create-next-app@latest --typescript',
                safety: 'Type safety en todo el proyecto',
                autocomplete: 'Mejor autocompletado en IDE',
                useCase: 'Proyectos empresariales y equipos grandes'
            },
            'Middleware': {
                description: 'Ejecuta código antes de completar una solicitud.',
                location: 'Archivo middleware.js en raíz del proyecto',
                edge: 'Ejecuta en edge runtime para máxima velocidad',
                useCases: 'Autenticación, redirecciones, headers personalizados',
                useCase: 'A/B testing, geolocalización, protección de rutas'
            }
        };
        
        const featureDetails = details[feature.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${feature.color}20; color: ${feature.color};">
                        <ion-icon name="${feature.icon}" class="text-3xl"></ion-icon>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${feature.color};">${feature.title}</h2>
                        <p class="text-text-secondary mt-1">${feature.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${featureDetails.description ? `
                        <div>
                            <h4 class="font-bold mb-2 text-next-accent-light">Descripción:</h4>
                            <p class="text-text-secondary">${featureDetails.description}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${featureDetails.ssg ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-next-accent-light">SSG</h4>
                                <p class="text-text-secondary text-sm">${featureDetails.ssg}</p>
                            </div>
                        ` : ''}
                        
                        ${featureDetails.ssr ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-next-accent-light">SSR</h4>
                                <p class="text-text-secondary text-sm">${featureDetails.ssr}</p>
                            </div>
                        ` : ''}
                        
                        ${featureDetails.isr ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-next-accent-light">ISR</h4>
                                <p class="text-text-secondary text-sm">${featureDetails.isr}</p>
                            </div>
                        ` : ''}
                        
                        ${featureDetails.convention ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-next-accent-light">Convención</h4>
                                <p class="text-text-secondary text-sm">${featureDetails.convention}</p>
                            </div>
                        ` : ''}
                        
                        ${featureDetails.dynamic ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-next-accent-light">Dinámico</h4>
                                <p class="text-text-secondary text-sm">${featureDetails.dynamic}</p>
                            </div>
                        ` : ''}
                        
                        ${featureDetails.formats ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-next-accent-light">Formatos</h4>
                                <p class="text-text-secondary text-sm">${featureDetails.formats}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${featureDetails.useCase ? `
                        <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                            <div class="font-mono text-sm">
                                <span class="text-next-accent-light"># Caso de uso:</span><br>
                                <span class="text-text-secondary">${featureDetails.useCase}</span>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="bg-gray-900/50 rounded-lg p-4">
                        <div class="font-mono text-sm">
                            <span class="text-next-accent-light"># Código de ejemplo:</span><br>
                            <span class="text-text-secondary">// ${feature.title === 'API Routes' ? 'pages/api/hello.js' : feature.title === 'File-based Routing' ? 'pages/about.js' : 'pages/index.js'}</span><br>
                            <span class="text-text-secondary">${feature.title === 'API Routes' ? 'export default function handler(req, res) {' : feature.title === 'File-based Routing' ? 'export default function AboutPage() {' : 'export default function HomePage() {'}</span><br>
                            <span class="text-next-accent-light">  return ${feature.title === 'API Routes' ? "res.status(200).json({ name: 'John Doe' })" : feature.title === 'File-based Routing' ? '<h1>About Page</h1>' : '<h1>Welcome to Next.js</h1>'}</span><br>
                            <span class="text-text-secondary">}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${feature.color};">
                        <ion-icon name="close-outline" class="mr-2"></ion-icon> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-95');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-100');
        }, 10);
        
        // Event listeners para cerrar el modal
        const closeModal = () => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-100');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-95');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        modal.querySelector('.close-detail-btn').addEventListener('click', closeModal);
        
        // Cerrar al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Función para inicializar timeline
    function initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        console.log('Elementos timeline encontrados: ' + timelineItems.length);
        
        // Mostrar todos los elementos inmediatamente
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('opacity-100');
            }, index * 200);
        });
        
        // También agregar observador para animación al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100');
                }
            });
        }, { threshold: 0.1 });
        
        timelineItems.forEach(item => {
            item.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
            observer.observe(item);
        });
        
        console.log('Timeline inicializada');
    }

    // Función para inicializar gráficos
    function initCharts() {
        console.log('Inicializando gráficos...');
        
        // Verificar si Chart.js está disponible
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js no está cargado. Intentando cargar...');
            loadChartJS();
            return;
        }
        
        // Gráfico de líneas principal
        const lineChartCanvas = document.getElementById('lineChartCanvas');
        if (lineChartCanvas) {
            const parent = lineChartCanvas.parentElement;
            lineChartCanvas.width = parent.clientWidth;
            lineChartCanvas.height = parent.clientHeight;
            
            const ctx = lineChartCanvas.getContext('2d');
            lineChart = createLineChart(ctx, getFrameworkComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('nextjs'));
        }
        
        console.log('Gráficos inicializados');
    }

    // Función para cargar Chart.js dinámicamente
    function loadChartJS() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            console.log('Chart.js cargado correctamente');
            initCharts();
            initFrameworkSimulation();
        };
        script.onerror = function() {
            console.error('Error al cargar Chart.js');
            showNotification('Error al cargar librería de gráficos. Recarga la página.', 'error');
        };
        document.head.appendChild(script);
    }

    // Función para crear gráfico de líneas
    function createLineChart(ctx, data) {
        return new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 30, 50, 0.9)',
                        titleColor: '#3291ff',
                        bodyColor: '#cbd5e1',
                        borderColor: '#0070f3',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        },
                        beginAtZero: true,
                        max: 100
                    }
                },
                elements: {
                    line: {
                        tension: 0.4
                    },
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    // Función para crear gráfico de radar
    function createRadarChart(ctx, data) {
        return new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            circular: true
                        },
                        pointLabels: {
                            color: '#cbd5e1',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        },
                        ticks: {
                            color: '#94a3b8',
                            backdropColor: 'transparent',
                            showLabelBackdrop: false
                        },
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 30, 50, 0.9)',
                        titleColor: '#3291ff',
                        bodyColor: '#cbd5e1',
                        borderColor: '#0070f3',
                        borderWidth: 1
                    }
                }
            }
        });
    }

    // Función para crear gráfico de barras
    function createBarChart(ctx, data) {
        return new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 30, 50, 0.9)',
                        titleColor: '#3291ff',
                        bodyColor: '#cbd5e1',
                        borderColor: '#0070f3',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        },
                        beginAtZero: true,
                        max: 100
                    }
                },
                elements: {
                    bar: {
                        borderRadius: 4,
                        borderWidth: 1
                    }
                }
            }
        });
    }

    // Función para obtener datos para gráfico de comparación
    function getFrameworkComparisonData() {
        const frameworks = ['Next.js', 'CRA', 'Gatsby', 'Remix'];
        const performance = [95, 75, 90, 88];
        const seo = [98, 40, 95, 90];
        
        return {
            labels: frameworks,
            datasets: [
                {
                    label: 'Performance',
                    data: performance,
                    borderColor: '#0070f3',
                    backgroundColor: 'rgba(0, 112, 243, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'SEO',
                    data: seo,
                    borderColor: '#ff4081',
                    backgroundColor: 'rgba(255, 64, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar
    function getRadarChartData(framework) {
        const frameworkData = frameworksData[framework];
        
        return {
            labels: ['Performance', 'SEO', 'DX', 'Escalabilidad', 'Comunidad'],
            datasets: [{
                label: frameworkData.name,
                data: [
                    frameworkData.performance,
                    frameworkData.seo,
                    frameworkData.developerExperience,
                    frameworkData.scalability,
                    frameworkData.community
                ],
                backgroundColor: `${frameworkData.color}20`,
                borderColor: frameworkData.color,
                pointBackgroundColor: frameworkData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: frameworkData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
        };
    }

    // Función para inicializar simulación de frameworks
    function initFrameworkSimulation() {
        console.log('Inicializando simulación de frameworks...');
        
        // Elementos del DOM
        const frameworkButtons = document.querySelectorAll('.framework-btn');
        const sizeSlider = document.getElementById('sizeSlider');
        const sizeValue = document.getElementById('sizeValue');
        const trafficSlider = document.getElementById('trafficSlider');
        const trafficValue = document.getElementById('trafficValue');
        const seoSlider = document.getElementById('seoSlider');
        const seoValue = document.getElementById('seoValue');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        
        // Verificar que todos los elementos existan
        if (!sizeSlider || !frameworkButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        function updateSliderValue(slider, valueElement) {
            slider.addEventListener('input', function() {
                if (slider.id === 'sizeSlider') {
                    const value = parseInt(this.value);
                    if (value < 10) {
                        valueElement.textContent = 'Pequeña (1-10 páginas)';
                    } else if (value < 50) {
                        valueElement.textContent = 'Mediana (10-50 páginas)';
                    } else {
                        valueElement.textContent = 'Grande (50+ páginas)';
                    }
                } else if (slider.id === 'trafficSlider') {
                    const value = parseInt(this.value);
                    if (value < 10) {
                        trafficValue.textContent = '1K-10K usuarios/mes';
                    } else if (value < 50) {
                        trafficValue.textContent = '10K-100K usuarios/mes';
                    } else {
                        trafficValue.textContent = '100K+ usuarios/mes';
                    }
                } else if (slider.id === 'seoSlider') {
                    const value = parseInt(this.value);
                    seoValue.textContent = value === 1 ? 'Bajo' : value === 2 ? 'Medio' : 'Alto';
                }
                updateSimulation();
            });
        }
        
        updateSliderValue(sizeSlider, sizeValue);
        updateSliderValue(trafficSlider, trafficValue);
        updateSliderValue(seoSlider, seoValue);
        
        // Botones de framework
        frameworkButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                frameworkButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                updateSimulation();
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            sizeSlider.value = 10;
            sizeValue.textContent = 'Pequeña (10 páginas)';
            trafficSlider.value = 10;
            trafficValue.textContent = '10K usuarios/mes';
            seoSlider.value = 3;
            seoValue.textContent = 'Alto';
            frameworkButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-framework="nextjs"]').classList.add('active');
            
            updateSimulation();
            showNotification('Simulación reiniciada a valores predeterminados', 'info');
        });
        
        // Mostrar detalles
        showDetailsBtn.addEventListener('click', function() {
            showDetailedCharts();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            updateSimulation();
        }, 500);
        
        console.log('Simulación de frameworks inicializada');
    }

    // Función para actualizar simulación
    function updateSimulation() {
        const activeFramework = document.querySelector('.framework-btn.active');
        if (!activeFramework) return;
        
        const frameworkType = activeFramework.dataset.framework;
        const size = parseInt(document.getElementById('sizeSlider').value);
        const traffic = parseInt(document.getElementById('trafficSlider').value);
        const seoLevel = parseInt(document.getElementById('seoSlider').value);
        
        const frameworkData = frameworksData[frameworkType];
        if (!frameworkData) return;
        
        // Calcular valores basados en el framework y parámetros
        let performance = frameworkData.performance;
        let seoScore = frameworkData.seo;
        let dx = frameworkData.developerExperience;
        
        // Ajustar por tamaño de aplicación
        if (size > 50) {
            // Aplicaciones grandes benefician más a Next.js
            if (frameworkType === 'nextjs' || frameworkType === 'remix') {
                performance *= 1.05;
                dx *= 0.95; // Más complejo mantener
            } else {
                performance *= 0.9;
                dx *= 0.85;
            }
        } else if (size < 10) {
            // Aplicaciones pequeñas
            if (frameworkType === 'cra') {
                dx *= 1.05;
            }
        }
        
        // Ajustar por tráfico
        if (traffic > 50) {
            // Alto tráfico beneficia a frameworks con buen SSR
            if (frameworkType === 'nextjs' || frameworkType === 'remix') {
                performance *= 1.1;
            } else {
                performance *= 0.85;
            }
        }
        
        // Ajustar por nivel de SEO requerido
        if (seoLevel === 3) {
            // SEO alto - Next.js y Gatsby sobresalen
            if (frameworkType === 'nextjs' || frameworkType === 'gatsby') {
                seoScore *= 1.05;
            } else {
                seoScore *= 0.7;
            }
        } else if (seoLevel === 1) {
            // SEO bajo - CRA puede ser suficiente
            if (frameworkType === 'cra') {
                dx *= 1.1;
            }
        }
        
        // Limitar valores
        performance = Math.min(Math.max(performance, 0), 100);
        seoScore = Math.min(Math.max(seoScore, 0), 100);
        dx = Math.min(Math.max(dx, 0), 100);
        
        // Actualizar barras y valores
        document.getElementById('performanceValue').textContent = Math.round(performance) + '/100';
        document.getElementById('performanceBar').style.width = performance + '%';
        
        document.getElementById('seoScoreValue').textContent = Math.round(seoScore) + '/100';
        document.getElementById('seoScoreBar').style.width = seoScore + '%';
        
        document.getElementById('dxValue').textContent = Math.round(dx) + '/100';
        document.getElementById('dxBar').style.width = dx + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(frameworkType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let recommendation = '';
        
        if (frameworkType === 'nextjs') {
            recommendation = seoLevel === 3 ? 'Perfecto para aplicaciones con SEO crítico como e-commerce o blogs.' : 
                            size > 50 ? 'Ideal para aplicaciones empresariales grandes y complejas.' : 
                            'Excelente opción para cualquier tipo de aplicación web moderna.';
        } else if (frameworkType === 'cra') {
            recommendation = seoLevel === 1 ? 'Adecuado para aplicaciones internas o SPAs sin requerimientos de SEO.' : 
                            'Considera Next.js si necesitas mejor SEO o rendimiento.';
        } else if (frameworkType === 'gatsby') {
            recommendation = 'Óptimo para sitios estáticos como blogs, documentación y portafolios.';
        } else if (frameworkType === 'remix') {
            recommendation = 'Excelente para aplicaciones con muchos formularios y interacciones complejas.';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-next-accent-tertiary mr-2"></ion-icon>
            ${frameworkData.description} ${recommendation}
        `;
    }

    // Función para ejecutar simulación completa
    function runSimulation() {
        const btn = document.getElementById('runSimulationBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando...';
        btn.disabled = true;
        
        // Mostrar animación de progreso
        const activeFramework = document.querySelector('.framework-btn.active');
        const frameworkType = activeFramework ? activeFramework.dataset.framework : 'nextjs';
        const frameworkData = frameworksData[frameworkType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentPerformance = parseFloat(document.getElementById('performanceValue').textContent);
                const currentSEO = parseFloat(document.getElementById('seoScoreValue').textContent);
                
                // Aplicar pequeña optimización
                document.getElementById('performanceValue').textContent = Math.min(100, Math.round(currentPerformance + 2)) + '/100';
                document.getElementById('performanceBar').style.width = Math.min(100, currentPerformance + 2) + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${frameworkData.name} analizado exitosamente`, 'success');
            }
        }, 100);
    }

    // Función para mostrar gráficos detallados
    function showDetailedCharts() {
        // Verificar si Chart.js está disponible
        if (typeof Chart === 'undefined') {
            showNotification('Cargando librería de gráficos...', 'info');
            loadChartJS();
            return;
        }
        
        const activeFramework = document.querySelector('.framework-btn.active');
        const frameworkType = activeFramework ? activeFramework.dataset.framework : 'nextjs';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-next-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-next-accent-light">Adopción en el Tiempo</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-next-accent-secondary-light">Comparación de Métricas</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedBarChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-xl p-4">
                        <h4 class="font-bold text-lg mb-4 text-center text-purple-300">Análisis Multidimensional (Radar)</h4>
                        <div class="w-full h-80">
                            <canvas id="detailedRadarChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/40 rounded-lg p-4">
                        <h4 class="font-bold mb-3 text-next-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes frameworks React. 
                            Next.js destaca en SEO y rendimiento para aplicaciones de producción, mientras que CRA 
                            es más simple para prototipos. Gatsby es excelente para sitios estáticos y Remix 
                            compite en aplicaciones full-stack complejas.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-next-accent to-next-accent-dark text-white font-bold rounded-xl shadow-lg shadow-next-accent/30 hover:shadow-xl hover:shadow-next-accent/40 transition-all duration-300">
                        <ion-icon name="download-outline" class="mr-2"></ion-icon> Exportar Datos
                    </button>
                    <button class="close-chart-btn px-6 py-3 bg-gray-800 border border-border text-text-primary font-bold rounded-xl hover:bg-gray-700 transition-all duration-300">
                        <ion-icon name="close-outline" class="mr-2"></ion-icon> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-95');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-100');
        }, 10);
        
        // Crear gráficos detallados
        setTimeout(() => {
            // Gráfico de líneas detallado
            const detailedLineCanvas = document.getElementById('detailedLineChart');
            if (detailedLineCanvas && typeof Chart !== 'undefined') {
                if (detailedLineChart) {
                    detailedLineChart.destroy();
                }
                
                const ctx = detailedLineCanvas.getContext('2d');
                detailedLineChart = createLineChart(ctx, getDetailedLineChartData());
            }
            
            // Gráfico de barras detallado
            const detailedBarCanvas = document.getElementById('detailedBarChart');
            if (detailedBarCanvas && typeof Chart !== 'undefined') {
                if (detailedBarChart) {
                    detailedBarChart.destroy();
                }
                
                const ctx = detailedBarCanvas.getContext('2d');
                detailedBarChart = createBarChart(ctx, getDetailedBarChartData());
            }
            
            // Gráfico de radar detallado
            const detailedRadarCanvas = document.getElementById('detailedRadarChart');
            if (detailedRadarCanvas && typeof Chart !== 'undefined') {
                if (detailedRadarChart) {
                    detailedRadarChart.destroy();
                }
                
                const ctx = detailedRadarCanvas.getContext('2d');
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(frameworkType));
            }
        }, 50);
        
        // Configurar botones
        const closeModal = () => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-100');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-95');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        modal.querySelector('.close-chart-modal-btn').addEventListener('click', closeModal);
        modal.querySelector('.close-chart-btn').addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.getElementById('exportChartBtn').addEventListener('click', function() {
            showNotification('Datos de gráficos exportados exitosamente', 'success');
        });
    }

    // Función para obtener datos para gráfico de líneas detallado
    function getDetailedLineChartData() {
        const years = [2016, 2018, 2020, 2022, 2024];
        const nextjsDownloads = [0.1, 1, 3, 4.5, 5]; // Millones semanales
        const craDownloads = [2, 3, 4, 3.5, 3]; // Millones semanales
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'Next.js (descargas semanales)',
                    data: nextjsDownloads,
                    borderColor: '#0070f3',
                    backgroundColor: 'rgba(0, 112, 243, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Create React App (descargas semanales)',
                    data: craDownloads,
                    borderColor: '#61dafb',
                    backgroundColor: 'rgba(97, 218, 251, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de barras detallado
    function getDetailedBarChartData() {
        const frameworks = ['Next.js', 'CRA', 'Gatsby', 'Remix'];
        const performance = [95, 75, 90, 88];
        const seo = [98, 40, 95, 90];
        const developerExperience = [92, 85, 80, 85];
        
        return {
            labels: frameworks,
            datasets: [
                {
                    label: 'Performance',
                    data: performance,
                    backgroundColor: 'rgba(0, 112, 243, 0.7)',
                    borderColor: '#0070f3',
                    borderWidth: 1
                },
                {
                    label: 'SEO',
                    data: seo,
                    backgroundColor: 'rgba(255, 64, 129, 0.7)',
                    borderColor: '#ff4081',
                    borderWidth: 1
                },
                {
                    label: 'Developer Experience',
                    data: developerExperience,
                    backgroundColor: 'rgba(0, 199, 255, 0.7)',
                    borderColor: '#00c7ff',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(framework) {
        const frameworkData = frameworksData[framework];
        
        // Datos para todas los frameworks
        const labels = ['Performance', 'SEO', 'Developer Exp.', 'Escalabilidad', 'Comunidad'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Next.js',
                    data: [95, 98, 92, 90, 95],
                    backgroundColor: 'rgba(0, 112, 243, 0.1)',
                    borderColor: '#0070f3',
                    pointBackgroundColor: '#0070f3',
                    borderWidth: 1
                },
                {
                    label: 'Create React App',
                    data: [75, 40, 85, 60, 90],
                    backgroundColor: 'rgba(97, 218, 251, 0.1)',
                    borderColor: '#61dafb',
                    pointBackgroundColor: '#61dafb',
                    borderWidth: 1
                },
                {
                    label: 'Gatsby',
                    data: [90, 95, 80, 75, 85],
                    backgroundColor: 'rgba(102, 51, 153, 0.1)',
                    borderColor: '#663399',
                    pointBackgroundColor: '#663399',
                    borderWidth: 1
                },
                {
                    label: frameworkData.name,
                    data: [
                        frameworkData.performance,
                        frameworkData.seo,
                        frameworkData.developerExperience,
                        frameworkData.scalability,
                        frameworkData.community
                    ],
                    backgroundColor: `${frameworkData.color}40`,
                    borderColor: frameworkData.color,
                    pointBackgroundColor: frameworkData.color,
                    borderWidth: 3,
                    pointRadius: 5
                }
            ]
        };
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        if (simulateEvolutionBtn) {
            simulateEvolutionBtn.addEventListener('click', simulateTechEvolution);
        }
        
        // Botón de especificaciones
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('specsModal').classList.add('opacity-100');
                    document.querySelector('#specsModal > div').classList.remove('scale-95');
                    document.querySelector('#specsModal > div').classList.add('scale-100');
                }, 10);
            });
        }
        
        // Botón de comparación
        const compareFrameworksBtn = document.getElementById('compareFrameworksBtn');
        if (compareFrameworksBtn) {
            compareFrameworksBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('compareModal').classList.add('opacity-100');
                    document.querySelector('#compareModal > div').classList.remove('scale-95');
                    document.querySelector('#compareModal > div').classList.add('scale-100');
                }, 10);
            });
        }
        
        // Cerrar modales
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                document.querySelector('#specsModal > div').classList.remove('scale-100');
                document.querySelector('#specsModal > div').classList.add('scale-95');
                document.getElementById('specsModal').classList.remove('opacity-100');
                setTimeout(() => {
                    document.getElementById('specsModal').classList.add('hidden');
                }, 500);
            });
        }
        
        const closeCompareModalBtn = document.getElementById('closeCompareModal');
        if (closeCompareModalBtn) {
            closeCompareModalBtn.addEventListener('click', () => {
                document.querySelector('#compareModal > div').classList.remove('scale-100');
                document.querySelector('#compareModal > div').classList.add('scale-95');
                document.getElementById('compareModal').classList.remove('opacity-100');
                setTimeout(() => {
                    document.getElementById('compareModal').classList.add('hidden');
                }, 500);
            });
        }
        
        // Cerrar modales al hacer clic fuera
        const specsModal = document.getElementById('specsModal');
        if (specsModal) {
            specsModal.addEventListener('click', (e) => {
                if (e.target.id === 'specsModal') {
                    closeModalBtn.click();
                }
            });
        }
        
        const compareModal = document.getElementById('compareModal');
        if (compareModal) {
            compareModal.addEventListener('click', (e) => {
                if (e.target.id === 'compareModal') {
                    closeCompareModalBtn.click();
                }
            });
        }
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const specsModal = document.getElementById('specsModal');
                const compareModal = document.getElementById('compareModal');
                const chartModal = document.querySelector('.fixed.inset-0.bg-black\\/90'); // Modal de gráficos
                
                if (specsModal && !specsModal.classList.contains('hidden')) {
                    closeModalBtn.click();
                }
                if (compareModal && !compareModal.classList.contains('hidden')) {
                    closeCompareModalBtn.click();
                }
                if (chartModal) {
                    chartModal.querySelector('.close-chart-modal-btn')?.click();
                }
            }
        });
        
        console.log('Event listeners inicializados');
    }

    // Función para inicializar animaciones
    function initAnimations() {
        // Animación de aparición para elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, observerOptions);
        
        // Aplicar animación a elementos principales
        document.querySelectorAll('.card, .timeline-item, .stat-card').forEach(el => {
            el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
            observer.observe(el);
        });
        
        console.log('Animaciones inicializadas');
    }

    // Función para simulación de evolución tecnológica
    function simulateTechEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando evolución...';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "2016: Lanzamiento de Next.js...",
            "2017: Introducción de static export...",
            "2018: Next.js 7 con mejoras de performance...",
            "2019: API Routes y TypeScript nativo...",
            "2020: Next.js 10 con Image Optimization...",
            "2021: Middleware y compilador Rust...",
            "2022: App Router experimental...",
            "2023: Next.js 13 con Server Components...",
            "2024: Next.js 14 y estabilización de features..."
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> ${steps[step]}`;
                step++;
            }
        }, 500);
        
        // Simular proceso completo
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showTechEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 6000);
    }

    // Función para mostrar resultados de evolución tecnológica
    function showTechEvolutionResults() {
        const results = [
            { type: 'Descargas npm', value: '10k → 5M/semana', color: '#0070f3', icon: 'download-outline' },
            { type: 'GitHub Stars', value: '1k → 115k', color: '#ff4081', icon: 'star-outline' },
            { type: 'Empresas usuarias', value: '0 → 1000+', color: '#00c7ff', icon: 'business-outline' },
            { type: 'Performance', value: 'Lighthouse 80 → 95', color: '#8b5cf6', icon: 'speedometer-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-next-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de Next.js (2016-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de Next.js desde su lanzamiento hasta la actualidad:</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    ${results.map(result => `
                        <div class="bg-gray-900/50 rounded-xl p-4 text-center">
                            <div class="text-2xl md:text-3xl mb-2" style="color: ${result.color};">
                                <ion-icon name="${result.icon}"></ion-icon>
                            </div>
                            <div class="text-2xl md:text-3xl font-black mb-1" style="background: linear-gradient(90deg, ${result.color}, ${result.color}99); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${result.value}</div>
                            <div class="text-sm text-text-secondary">${result.type}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="bg-gray-900/50 rounded-lg p-4 mb-6">
                    <div class="font-mono text-sm space-y-1">
                        <span class="text-next-accent-light"># Tendencias futuras (2025-2027):</span><br>
                        <span class="text-text-secondary">• Mejoras en Server Components y streaming</span><br>
                        <span class="text-text-secondary">• Optimizaciones para edge computing</span><br>
                        <span class="text-text-secondary">• Integración con AI/ML para desarrollo</span><br>
                        <span class="text-text-secondary">• Mejora en tooling y debugging</span><br>
                        <span class="text-text-secondary">• Soporte para más runtimes y plataformas</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-next-accent to-next-accent-dark text-white font-bold rounded-xl shadow-lg shadow-next-accent/30">
                        <ion-icon name="checkmark-outline" class="mr-2"></ion-icon> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-95');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-100');
        }, 10);
        
        // Configurar botones de cierre
        const closeModal = () => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-100');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-95');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        modal.querySelector('.close-evolution-modal').addEventListener('click', closeModal);
        modal.querySelector('.close-evolution-btn').addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Función auxiliar para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'warning': 'bg-yellow-500',
            'info': 'bg-blue-500'
        };
        
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        }, 10);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('translate-x-0');
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Mensaje de inicialización completa
    console.log('Aplicación NextLab inicializada correctamente');
});