document.addEventListener('DOMContentLoaded', function() {
    console.log('IonicLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de versiones de Ionic
    const ionicVersionsData = [
        {
            icon: 'cube-outline',
            title: 'Ionic 1',
            description: 'Primera versión basada en AngularJS y Apache Cordova.',
            color: '#3880ff',
            status: 'Histórica',
            year: '2013'
        },
        {
            icon: 'layers-outline',
            title: 'Ionic 2',
            description: 'Migración a Angular 2 con TypeScript y mejor performance.',
            color: '#5260ff',
            status: 'Importante',
            year: '2016'
        },
        {
            icon: 'rocket-outline',
            title: 'Ionic 3',
            description: 'Integración con Angular 4, mejoras CLI y performance.',
            color: '#2dd36f',
            status: 'Estable',
            year: '2017'
        },
        {
            icon: 'git-branch-outline',
            title: 'Ionic 4',
            description: 'Reescritura completa con Web Components y Stencil.js.',
            color: '#ffc409',
            status: 'Revolucionaria',
            year: '2019'
        },
        {
            icon: 'flash-outline',
            title: 'Ionic 5',
            description: 'Mejoras UI, componentes renovados y Capacitor estable.',
            color: '#92949c',
            status: 'Modernización',
            year: '2020'
        },
        {
            icon: 'sparkles-outline',
            title: 'Ionic 6+',
            description: 'Framework-agnostic, mejor soporte para React y Vue.',
            color: '#eb445a',
            status: 'Actual',
            year: '2021+'
        }
    ];

    // Datos de tecnologías móviles para simulación
    const technologiesData = {
        'ionic': {
            name: 'Ionic',
            performance: 80,
            learningCurve: 85,
            ecosystem: 90,
            flexibility: 95,
            crossPlatform: 95,
            color: '#3880ff',
            description: 'Framework para aplicaciones móviles híbridas con tecnologías web.',
            applications: ['Multiplataforma', 'PWA', 'Enterprise', 'Prototipos'],
            jobMarket: 75,
            community: 85
        },
        'react-native': {
            name: 'React Native',
            performance: 85,
            learningCurve: 70,
            ecosystem: 85,
            flexibility: 80,
            crossPlatform: 90,
            color: '#61dafb',
            description: 'Framework para aplicaciones móviles nativas con React.',
            applications: ['Apps Nativas', 'Performance', 'Complejas'],
            jobMarket: 85,
            community: 90
        },
        'flutter': {
            name: 'Flutter',
            performance: 90,
            learningCurve: 60,
            ecosystem: 75,
            flexibility: 70,
            crossPlatform: 95,
            color: '#02569b',
            description: 'SDK de Google para aplicaciones nativas compiladas.',
            applications: ['UI Personalizada', 'Performance', 'Google Apps'],
            jobMarket: 70,
            community: 80
        },
        'native': {
            name: 'Nativo',
            performance: 100,
            learningCurve: 40,
            ecosystem: 80,
            flexibility: 60,
            crossPlatform: 40,
            color: '#92949c',
            description: 'Desarrollo nativo con Swift/Kotlin o Java/Objective-C.',
            applications: ['Performance Crítico', 'Juegos', 'Apps Específicas'],
            jobMarket: 90,
            community: 95
        }
    };

    // Inicializar componentes
    initIonicParticles();
    initIonicVersions();
    initEventListeners();
    initAnimations();
    initTimeline();
    initTechnologySimulation();
    initCharts();

    // Función para inicializar partículas de Ionic (componentes)
    function initIonicParticles() {
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
                
                if (type < 0.6) {
                    // Partículas de Ionic (azul)
                    color = `rgba(56, 128, 255, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 6 + 3;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de Web (verde)
                    color = `rgba(45, 211, 111, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Partículas especiales (púrpura)
                    color = `rgba(82, 96, 255, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 8 + 4;
                    speed = (Math.random() - 0.5) * 0.5;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.5,
                    color: color,
                    pulseSpeed: Math.random() * 0.05 + 0.02,
                    pulseOffset: Math.random() * Math.PI * 2,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.03,
                    type: type < 0.6 ? 'ionic' : type < 0.85 ? 'web' : 'special'
                });
            }
        }
        
        function drawComponent(ctx, x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            // Dibujar un componente tipo "mobile" con esquinas redondeadas
            const cornerRadius = 8;
            ctx.beginPath();
            ctx.moveTo(-size + cornerRadius, -size * 1.5);
            ctx.lineTo(size - cornerRadius, -size * 1.5);
            ctx.quadraticCurveTo(size, -size * 1.5, size, -size * 1.5 + cornerRadius);
            ctx.lineTo(size, size * 1.5 - cornerRadius);
            ctx.quadraticCurveTo(size, size * 1.5, size - cornerRadius, size * 1.5);
            ctx.lineTo(-size + cornerRadius, size * 1.5);
            ctx.quadraticCurveTo(-size, size * 1.5, -size, size * 1.5 - cornerRadius);
            ctx.lineTo(-size, -size * 1.5 + cornerRadius);
            ctx.quadraticCurveTo(-size, -size * 1.5, -size + cornerRadius, -size * 1.5);
            ctx.closePath();
            
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
            ctx.strokeStyle = 'rgba(56, 128, 255, 0.1)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150 && particles[i].type === particles[j].type) {
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
                particle.rotation += particle.rotationSpeed;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula como componente móvil
                ctx.save();
                
                if (particle.type === 'special') {
                    // Gradiente para partículas especiales
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(82, 96, 255, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(82, 96, 255, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                drawComponent(ctx, particle.x, particle.y, particle.size, particle.rotation);
                ctx.fill();
                
                // Borde para componentes Ionic
                if (particle.type === 'ionic') {
                    ctx.strokeStyle = `rgba(56, 128, 255, ${currentAlpha * 0.7})`;
                    ctx.lineWidth = 1;
                    drawComponent(ctx, particle.x, particle.y, particle.size, particle.rotation);
                    ctx.stroke();
                    
                    // Simular botón táctil
                    ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.5})`;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y + particle.size * 0.8, particle.size * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                ctx.restore();
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
        console.log('Partículas de Ionic inicializadas');
    }

    // Función para inicializar versiones de Ionic
    function initIonicVersions() {
        const container = document.getElementById('productionInfo');
        if (!container) {
            console.error('Contenedor de versiones no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-ionic-primary-light">Evolución de Versiones de Ionic</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="versionsGrid">
                ${ionicVersionsData.map(version => `
                    <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-ionic-primary/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-method="${version.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${version.color}20; color: ${version.color};">
                                <ion-icon name="${version.icon}" class="text-xl"></ion-icon>
                            </div>
                            <div>
                                <h4 class="font-bold">${version.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${version.color}20; color: ${version.color};">${version.status}</span>
                                    <span class="text-xs text-text-muted">${version.year}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${version.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de versiones
        document.querySelectorAll('.method-card').forEach(card => {
            card.addEventListener('click', function() {
                const versionName = this.getAttribute('data-method');
                showVersionDetail(versionName);
            });
        });
        
        console.log('Versiones de Ionic inicializadas: ' + ionicVersionsData.length);
    }

    // Función para mostrar detalle de versión
    function showVersionDetail(versionName) {
        const version = ionicVersionsData.find(v => v.title === versionName);
        if (!version) return;
        
        const details = {
            'Ionic 1': {
                features: 'AngularJS, Apache Cordova, componentes básicos',
                impact: 'Introduce desarrollo híbrido accesible para web developers',
                adoption: 'Rápida adopción por comunidad web',
                size: '~500kb',
                npmDownloads: '~10k/mes'
            },
            'Ionic 2': {
                features: 'Angular 2, TypeScript, mejor performance',
                impact: 'Modernización completa y mejor estructura',
                adoption: 'Comunidad en crecimiento, apps empresariales',
                size: '~600kb',
                npmDownloads: '~50k/mes'
            },
            'Ionic 3': {
                features: 'Angular 4, CLI mejorado, lazy loading',
                impact: 'Performance optimizado y desarrollo más eficiente',
                adoption: 'Adopción estable, aplicaciones complejas',
                size: '~650kb',
                npmDownloads: '~100k/mes'
            },
            'Ionic 4': {
                features: 'Web Components, Stencil.js, framework-agnostic',
                impact: 'Revolución arquitectónica, independencia de frameworks',
                adoption: 'Expansión a React y Vue communities',
                size: '~700kb',
                npmDownloads: '~200k/mes'
            },
            'Ionic 5': {
                features: 'UI renovada, Capacitor estable, mejoras de diseño',
                impact: 'Experiencia de usuario mejorada y más profesional',
                adoption: 'Crecimiento en aplicaciones empresariales',
                size: '~750kb',
                npmDownloads: '~300k/mes'
            },
            'Ionic 6+': {
                features: 'Mejor soporte React/Vue, performance, componentes',
                impact: 'Consolidación como solución multiplataforma líder',
                adoption: 'Amplia adopción en startups y empresas',
                size: '~800kb',
                npmDownloads: '~500k/mes'
            }
        };
        
        const versionDetails = details[version.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${version.color}20; color: ${version.color};">
                        <ion-icon name="${version.icon}" class="text-3xl"></ion-icon>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${version.color};">${version.title}</h2>
                        <p class="text-text-secondary mt-1">${version.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${versionDetails.features ? `
                        <div>
                            <h4 class="font-bold mb-2 text-ionic-primary-light">Características Principales:</h4>
                            <p class="text-text-secondary">${versionDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${versionDetails.impact ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-ionic-primary-light">Impacto</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.impact}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.adoption ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-ionic-primary-light">Adopción</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.adoption}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.size ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-ionic-primary-light">Tamaño</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.size}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.npmDownloads ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-ionic-primary-light">Descargas NPM</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.npmDownloads}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-ionic-primary-light"># Legado de ${version.title}:</span><br>
                            <span class="text-text-secondary">• ${version.title === 'Ionic 1' ? 'Democratizó desarrollo móvil para web developers' : version.title === 'Ionic 2' ? 'Introdujo TypeScript y mejor arquitectura' : version.title === 'Ionic 3' ? 'Optimizó performance para apps complejas' : version.title === 'Ionic 4' ? 'Revolucionó con Web Components y Stencil' : version.title === 'Ionic 5' ? 'Mejoró experiencia UI/UX profesional' : 'Consolidó como solución multiplataforma líder'}</span><br>
                            <span class="text-text-secondary">• ${version.title === 'Ionic 1' ? 'Creó puente entre web y móvil' : version.title === 'Ionic 2' ? 'Modernizó stack tecnológico' : version.title === 'Ionic 3' ? 'Permitió aplicaciones empresariales' : version.title === 'Ionic 4' ? 'Hizo framework-agnostic' : version.title === 'Ionic 5' ? 'Elevó estándares de diseño' : 'Expandió ecosistema a múltiples frameworks'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${version.color};">
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
            lineChart = createLineChart(ctx, getTechnologyComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('ionic'));
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
            initTechnologySimulation();
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
                        titleColor: '#4dabf7',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3880ff',
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
                        titleColor: '#4dabf7',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3880ff',
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
                        titleColor: '#4dabf7',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3880ff',
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
    function getTechnologyComparisonData() {
        const technologies = ['Ionic', 'React Native', 'Flutter', 'Nativo'];
        const developmentSpeed = [90, 70, 60, 40];
        const crossPlatform = [95, 90, 95, 40];
        
        return {
            labels: technologies,
            datasets: [
                {
                    label: 'Velocidad Desarrollo',
                    data: developmentSpeed,
                    borderColor: '#3880ff',
                    backgroundColor: 'rgba(56, 128, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Multiplataforma',
                    data: crossPlatform,
                    borderColor: '#2dd36f',
                    backgroundColor: 'rgba(45, 211, 111, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar
    function getRadarChartData(technology) {
        const techData = technologiesData[technology];
        
        return {
            labels: ['Performance', 'Facilidad', 'Ecosistema', 'Multiplataforma', 'Mercado Laboral'],
            datasets: [{
                label: techData.name,
                data: [
                    techData.performance,
                    techData.learningCurve,
                    techData.ecosystem,
                    techData.crossPlatform,
                    techData.jobMarket
                ],
                backgroundColor: `${techData.color}20`,
                borderColor: techData.color,
                pointBackgroundColor: techData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: techData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
        };
    }

    // Función para inicializar simulación de tecnologías
    function initTechnologySimulation() {
        console.log('Inicializando simulación de tecnologías...');
        
        // Elementos del DOM
        const materialButtons = document.querySelectorAll('.material-btn');
        const thicknessSlider = document.getElementById('thicknessSlider');
        const thicknessValue = document.getElementById('thicknessValue');
        const areaSlider = document.getElementById('areaSlider');
        const areaValue = document.getElementById('areaValue');
        const puritySlider = document.getElementById('puritySlider');
        const purityValue = document.getElementById('purityValue');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        
        // Verificar que todos los elementos existan
        if (!thicknessSlider || !materialButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        function updateSliderValue(slider, valueElement, suffix = '') {
            slider.addEventListener('input', function() {
                if (slider.id === 'thicknessSlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Landing Page';
                    } else if (value < 66) {
                        valueElement.textContent = 'App Media';
                    } else {
                        valueElement.textContent = 'Enterprise';
                    }
                } else if (slider.id === 'areaSlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Junior';
                    } else if (value < 66) {
                        valueElement.textContent = 'Intermedio';
                    } else {
                        valueElement.textContent = 'Experto';
                    }
                } else if (slider.id === 'puritySlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Corto';
                    } else if (value < 66) {
                        valueElement.textContent = 'Medio';
                    } else {
                        valueElement.textContent = 'Largo';
                    }
                }
                updateSimulation();
            });
        }
        
        updateSliderValue(thicknessSlider, thicknessValue);
        updateSliderValue(areaSlider, areaValue);
        updateSliderValue(puritySlider, purityValue);
        
        // Botones de tecnología
        materialButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                materialButtons.forEach(b => b.classList.remove('active'));
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
            thicknessSlider.value = 20;
            thicknessValue.textContent = 'Pequeño';
            areaSlider.value = 50;
            areaValue.textContent = 'Media';
            puritySlider.value = 50;
            purityValue.textContent = 'Medio';
            materialButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-material="ionic"]').classList.add('active');
            
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
        
        console.log('Simulación de tecnologías inicializada');
    }

    // Función para actualizar simulación
    function updateSimulation() {
        const activeMaterial = document.querySelector('.material-btn.active');
        if (!activeMaterial) return;
        
        const techType = activeMaterial.dataset.material;
        const complexity = parseInt(document.getElementById('thicknessSlider').value);
        const experience = parseInt(document.getElementById('areaSlider').value);
        const time = parseInt(document.getElementById('puritySlider').value);
        
        const techData = technologiesData[techType];
        if (!techData) return;
        
        // Calcular valores basados en la tecnología y parámetros
        let performance = techData.performance;
        let learningCurve = techData.learningCurve;
        let crossPlatform = techData.crossPlatform;
        
        // Ajustar por complejidad del proyecto
        if (complexity > 66) { // Proyecto enterprise
            if (techType === 'ionic' || techType === 'native') {
                performance *= 1.1; // Mejor para proyectos grandes
            } else {
                performance *= 0.9; // Peor para proyectos grandes
            }
        }
        
        // Ajustar por experiencia del equipo
        if (experience > 66) { // Equipo experto
            learningCurve *= 1.2; // Más fácil para expertos
        } else if (experience < 33) { // Equipo junior
            learningCurve *= 0.8; // Más difícil para juniors
        }
        
        // Ajustar por tiempo de desarrollo
        if (time < 33) { // Tiempo corto
            if (techType === 'ionic' || techType === 'flutter') {
                crossPlatform *= 1.1; // Mejor para desarrollo rápido
            }
        }
        
        // Limitar valores
        performance = Math.min(Math.max(performance, 0), 100);
        learningCurve = Math.min(Math.max(learningCurve, 0), 100);
        crossPlatform = Math.min(Math.max(crossPlatform, 0), 100);
        
        // Actualizar barras y valores
        document.getElementById('strengthValue').textContent = 
            performance >= 85 ? 'Excelente' : 
            performance >= 70 ? 'Bueno' : 
            performance >= 50 ? 'Aceptable' : 'Limitado';
        document.getElementById('strengthBar').style.width = performance + '%';
        
        document.getElementById('conductivityValue').textContent = 
            learningCurve >= 80 ? 'Fácil' : 
            learningCurve >= 60 ? 'Media' : 
            learningCurve >= 40 ? 'Desafiante' : 'Difícil';
        document.getElementById('conductivityBar').style.width = learningCurve + '%';
        
        document.getElementById('transparencyValue').textContent = 
            crossPlatform >= 90 ? 'Excelente' : 
            crossPlatform >= 75 ? 'Bueno' : 
            crossPlatform >= 50 ? 'Moderado' : 'Limitado';
        document.getElementById('transparencyBar').style.width = crossPlatform + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(techType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let conclusionText = '';
        
        if (techType === 'ionic') {
            conclusionText = 'Ionic es ideal para desarrollo rápido multiplataforma con componentes nativos';
        } else if (techType === 'react-native') {
            conclusionText = 'React Native ofrece buen balance entre performance y desarrollo web';
        } else if (techType === 'flutter') {
            conclusionText = 'Flutter proporciona máximo rendimiento con UI personalizada';
        } else if (techType === 'native') {
            conclusionText = 'Desarrollo nativo ofrece máximo control y performance';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-ionic-tertiary mr-2"></ion-icon>
            ${conclusionText}
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
        const activeMaterial = document.querySelector('.material-btn.active');
        const techType = activeMaterial ? activeMaterial.dataset.material : 'ionic';
        const techData = technologiesData[techType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentPerformance = parseFloat(document.getElementById('strengthBar').style.width);
                const newPerformance = Math.min(100, currentPerformance * 1.05);
                document.getElementById('strengthBar').style.width = newPerformance + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${techData.name} analizado exitosamente`, 'success');
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
        
        const activeMaterial = document.querySelector('.material-btn.active');
        const techType = activeMaterial ? activeMaterial.dataset.material : 'ionic';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-ionic-primary-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-ionic-primary-light">Adopción por Año</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-ionic-secondary-light">Comparación de Métricas</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedBarChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-xl p-4">
                        <h4 class="font-bold text-lg mb-4 text-center text-ionic-accent">Análisis Multidimensional (Radar)</h4>
                        <div class="w-full h-80">
                            <canvas id="detailedRadarChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/40 rounded-lg p-4">
                        <h4 class="font-bold mb-3 text-ionic-primary-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes tecnologías de desarrollo móvil. 
                            Ionic destaca en desarrollo multiplataforma y curva de aprendizaje, mientras que Flutter sobresale en performance. 
                            Cada tecnología tiene ventajas específicas según el tipo de proyecto y equipo.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-ionic-primary to-ionic-primary-dark text-white font-bold rounded-xl shadow-lg shadow-ionic-primary/30 hover:shadow-xl hover:shadow-ionic-primary/40 transition-all duration-300">
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
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(techType));
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
        const years = [2013, 2015, 2017, 2019, 2021, 2023];
        const ionicAdoption = [5, 15, 30, 45, 60, 70]; // Porcentaje
        const reactNativeAdoption = [0, 10, 25, 40, 55, 65]; // Porcentaje
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'Ionic (% desarrolladores móviles)',
                    data: ionicAdoption,
                    borderColor: '#3880ff',
                    backgroundColor: 'rgba(56, 128, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'React Native (% desarrolladores)',
                    data: reactNativeAdoption,
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
        const technologies = ['Ionic', 'React Native', 'Flutter', 'Nativo'];
        const performance = [80, 85, 90, 100];
        const learningCurve = [85, 70, 60, 40];
        const jobMarket = [75, 85, 70, 90];
        
        return {
            labels: technologies,
            datasets: [
                {
                    label: 'Performance',
                    data: performance,
                    backgroundColor: 'rgba(56, 128, 255, 0.7)',
                    borderColor: '#3880ff',
                    borderWidth: 1
                },
                {
                    label: 'Facilidad de Aprendizaje',
                    data: learningCurve,
                    backgroundColor: 'rgba(45, 211, 111, 0.7)',
                    borderColor: '#2dd36f',
                    borderWidth: 1
                },
                {
                    label: 'Mercado Laboral',
                    data: jobMarket,
                    backgroundColor: 'rgba(255, 196, 9, 0.7)',
                    borderColor: '#ffc409',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(technology) {
        const techData = technologiesData[technology];
        
        // Datos para todas las tecnologías
        const labels = ['Performance', 'Facilidad', 'Ecosistema', 'Multiplataforma', 'Trabajo'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Ionic',
                    data: [80, 85, 90, 95, 75],
                    backgroundColor: 'rgba(56, 128, 255, 0.1)',
                    borderColor: '#3880ff',
                    pointBackgroundColor: '#3880ff',
                    borderWidth: 1
                },
                {
                    label: 'React Native',
                    data: [85, 70, 85, 90, 85],
                    backgroundColor: 'rgba(97, 218, 251, 0.1)',
                    borderColor: '#61dafb',
                    pointBackgroundColor: '#61dafb',
                    borderWidth: 1
                },
                {
                    label: 'Flutter',
                    data: [90, 60, 75, 95, 70],
                    backgroundColor: 'rgba(2, 86, 155, 0.1)',
                    borderColor: '#02569b',
                    pointBackgroundColor: '#02569b',
                    borderWidth: 1
                },
                {
                    label: techData.name,
                    data: [
                        techData.performance,
                        techData.learningCurve,
                        techData.ecosystem,
                        techData.crossPlatform,
                        techData.jobMarket
                    ],
                    backgroundColor: `${techData.color}40`,
                    borderColor: techData.color,
                    pointBackgroundColor: techData.color,
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
        const compareMaterialsBtn = document.getElementById('compareMaterialsBtn');
        if (compareMaterialsBtn) {
            compareMaterialsBtn.addEventListener('click', () => {
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
            "2013: Lanzamiento de Ionic 1 con AngularJS...",
            "2014: Crecimiento rápido de comunidad...",
            "2015: Ionic View para testing en dispositivos...",
            "2016: Ionic 2 con TypeScript y Angular 2...",
            "2017: Ionic 3 y mejoras de performance...",
            "2018: Ionic 4 con Stencil y Web Components...",
            "2019: Capacitor reemplaza Cordova...",
            "2020: Ionic 5 con diseño renovado...",
            "2021: Soporte oficial para React y Vue...",
            "2022: Ionic 6 y mejoras de herramientas...",
            "2023: 5+ millones de apps creadas..."
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
            { type: 'Apps creadas', value: '0 → 5M+', color: '#3880ff', icon: 'apps-outline' },
            { type: 'Descargas npm', value: '0 → 15M/mes', color: '#5260ff', icon: 'download-outline' },
            { type: 'Contribuidores', value: '3 → 500+', color: '#2dd36f', icon: 'people-outline' },
            { type: 'Estrellas GitHub', value: '0 → 49k', color: '#ffc409', icon: 'star-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-ionic-primary-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de Ionic (2013-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de Ionic desde su creación hasta su dominio actual en desarrollo móvil híbrido:</p>
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
                        <span class="text-ionic-primary-light"># Tendencias futuras (2025-2030):</span><br>
                        <span class="text-text-secondary">• Ionic con WebAssembly para máximo performance</span><br>
                        <span class="text-text-secondary">• Mejor integración con inteligencia artificial</span><br>
                        <span class="text-text-secondary">• Desarrollo low-code con Ionic Studio</span><br>
                        <span class="text-text-secondary">• Realidad aumentada en aplicaciones Ionic</span><br>
                        <span class="text-text-secondary">• Edge computing para aplicaciones descentralizadas</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-ionic-primary to-ionic-primary-dark text-white font-bold rounded-xl shadow-lg shadow-ionic-primary/30">
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
            'success': '#2dd36f',
            'error': '#eb445a',
            'warning': '#ffc409',
            'info': '#3880ff'
        };
        
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
        notification.style.backgroundColor = colors[type];
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
    console.log('Aplicación IonicLab inicializada correctamente');
});