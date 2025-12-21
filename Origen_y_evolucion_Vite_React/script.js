document.addEventListener('DOMContentLoaded', function() {
    console.log('ViteReactLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de versiones de Vite + React
    const viteReactVersionsData = [
        {
            icon: 'flash-outline',
            title: 'Vite 1.0',
            description: 'Primera versión pública enfocada en Vue.js, pero con soporte React.',
            color: '#646cff',
            status: 'Fundacional',
            year: '2020'
        },
        {
            icon: 'rocket-outline',
            title: 'Vite 2.0 + React',
            description: 'Soporte nativo para React, arquitectura de plugins, mejora masiva de DX.',
            color: '#61dafb',
            status: 'Revolucionaria',
            year: '2021'
        },
        {
            icon: 'layers-outline',
            title: 'React 18',
            description: 'Concurrent Features, Server Components, mejoras de rendimiento.',
            color: '#ff6b6b',
            status: 'Innovadora',
            year: '2022'
        },
        {
            icon: 'git-branch-outline',
            title: 'Vite 4.0',
            description: 'Soporte para React Server Components, mejor rendimiento, menores bundles.',
            color: '#8b5cf6',
            status: 'Modernizadora',
            year: '2022'
        },
        {
            icon: 'cube-outline',
            title: 'Vite 5.0',
            description: 'Mejoras de rendimiento, mejor soporte para monorepos, optimizaciones.',
            color: '#00a8ff',
            status: 'Optimizada',
            year: '2023'
        },
        {
            icon: 'sparkles-outline',
            title: 'React 19 + Vite 5',
            description: 'React Server Components estables, mejoras de compilación, DX mejorado.',
            color: '#ff4757',
            status: 'Actual',
            year: '2024'
        }
    ];

    // Datos de build tools para simulación
    const buildToolsData = {
        'vite': {
            name: 'Vite + React',
            buildSpeed: 95,
            configComplexity: 15,
            ecosystem: 80,
            performance: 90,
            color: '#646cff',
            description: 'Build tool moderno con ES modules nativos y HMR ultrarrápido.',
            applications: ['SPAs Modernas', 'Aplicaciones Empresariales', 'Prototipado Rápido'],
            jobMarket: 85,
            community: 85
        },
        'webpack': {
            name: 'Webpack',
            buildSpeed: 40,
            configComplexity: 85,
            ecosystem: 95,
            performance: 80,
            color: '#8ed6fb',
            description: 'Empaquetador de módulos JavaScript con amplia adopción.',
            applications: ['Proyectos Legacy', 'Aplicaciones Complejas', 'Enterprise'],
            jobMarket: 90,
            community: 95
        },
        'cra': {
            name: 'Create React App',
            buildSpeed: 60,
            configComplexity: 20,
            ecosystem: 90,
            performance: 70,
            color: '#09d3ac',
            description: 'Configuración oficial para crear aplicaciones React sin configuración.',
            applications: ['Aprendizaje', 'Proyectos Pequeños', 'Prototipos'],
            jobMarket: 75,
            community: 90
        },
        'parcel': {
            name: 'Parcel',
            buildSpeed: 80,
            configComplexity: 10,
            ecosystem: 70,
            performance: 75,
            color: '#ff9a3c',
            description: 'Empaquetador web de configuración cero.',
            applications: ['Prototipado', 'Proyectos Simples', 'Zero Config'],
            jobMarket: 40,
            community: 65
        }
    };

    // Inicializar componentes
    initViteParticles();
    initViteReactVersions();
    initEventListeners();
    initAnimations();
    initTimeline();
    initBuildToolsSimulation();
    initCharts();

    // Función para inicializar partículas de Vite + React
    function initViteParticles() {
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
                    // Partículas de Vite (púrpura)
                    color = `rgba(100, 108, 255, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 6 + 3;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de React (cian)
                    color = `rgba(97, 218, 251, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Partículas especiales (naranja - velocidad)
                    color = `rgba(255, 107, 107, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'vite' : type < 0.85 ? 'react' : 'special'
                });
            }
        }
        
        function drawViteSymbol(ctx, x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            // Dibujar símbolo de Vite (rayo)
            ctx.beginPath();
            
            // Forma de rayo/flash
            ctx.moveTo(-size * 0.5, -size * 0.8);
            ctx.lineTo(size * 0.3, 0);
            ctx.lineTo(-size * 0.3, 0);
            ctx.lineTo(size * 0.5, size * 0.8);
            ctx.lineTo(0, size * 0.2);
            ctx.lineTo(0, -size * 0.2);
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
            ctx.strokeStyle = 'rgba(100, 108, 255, 0.1)';
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
                
                // Dibujar partícula como símbolo Vite
                ctx.save();
                
                if (particle.type === 'special') {
                    // Gradiente para partículas especiales
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(255, 107, 107, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                drawViteSymbol(ctx, particle.x, particle.y, particle.size, particle.rotation);
                ctx.lineWidth = 2;
                ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                ctx.stroke();
                
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
        console.log('Partículas de Vite + React inicializadas');
    }

    // Función para inicializar versiones de Vite + React
    function initViteReactVersions() {
        const container = document.getElementById('productionInfo');
        if (!container) {
            console.error('Contenedor de versiones no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-vite-accent-light">Evolución de Versiones de Vite + React</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="versionsGrid">
                ${viteReactVersionsData.map(version => `
                    <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-vite-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-method="${version.title}">
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
        
        console.log('Versiones de Vite + React inicializadas: ' + viteReactVersionsData.length);
    }

    // Función para mostrar detalle de versión
    function showVersionDetail(versionName) {
        const version = viteReactVersionsData.find(v => v.title === versionName);
        if (!version) return;
        
        const details = {
            'Vite 1.0': {
                features: 'ES modules nativos, pre-bundling con esbuild, HMR rápido',
                impact: 'Introduce nuevo paradigma de desarrollo frontend sin bundling en desarrollo',
                adoption: 'Comunidad Vue adopta rápidamente, React community curiosa',
                size: '~2MB',
                npmDownloads: '~100k/mes'
            },
            'Vite 2.0 + React': {
                features: 'Soporte nativo React, arquitectura plugins, mejor DX',
                impact: 'Hace Vite viable para proyectos React de producción',
                adoption: 'Crecimiento explosivo en comunidad React',
                size: '~3MB',
                npmDownloads: '~500k/mes'
            },
            'React 18': {
                features: 'Concurrent Features, Server Components, Automatic Batching',
                impact: 'Revoluciona rendimiento y capacidades de React',
                adoption: 'Adopción gradual por comunidad React',
                size: '~6KB gzipped',
                npmDownloads: '~15M/mes'
            },
            'Vite 4.0': {
                features: 'Soporte React Server Components, mejor rendimiento, menores bundles',
                impact: 'Posiciona Vite como herramienta de vanguardia para React',
                adoption: 'Convertido en opción preferida para nuevos proyectos',
                size: '~3.5MB',
                npmDownloads: '~2M/mes'
            },
            'Vite 5.0': {
                features: 'Mejoras rendimiento, mejor soporte monorepos, optimizaciones',
                impact: 'Consolida Vite como build tool moderno y estable',
                adoption: 'Estándar para desarrollo React moderno',
                size: '~4MB',
                npmDownloads: '~3M/mes'
            },
            'React 19 + Vite 5': {
                features: 'React Server Components estables, mejoras compilación, DX mejorado',
                impact: 'Fusión completa de tecnologías modernas de frontend',
                adoption: 'Combinación dominante para desarrollo frontend 2024+',
                size: 'React ~6KB, Vite ~4MB',
                npmDownloads: 'React ~20M/mes, Vite ~4M/mes'
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
                            <h4 class="font-bold mb-2 text-vite-accent-light">Características Principales:</h4>
                            <p class="text-text-secondary">${versionDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${versionDetails.impact ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-vite-accent-light">Impacto</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.impact}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.adoption ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-vite-accent-light">Adopción</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.adoption}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.size ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-vite-accent-light">Tamaño</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.size}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.npmDownloads ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-vite-accent-light">Descargas NPM</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.npmDownloads}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-vite-accent-light"># Legado de ${version.title}:</span><br>
                            <span class="text-text-secondary">• ${version.title === 'Vite 1.0' ? 'Introdujo desarrollo frontend sin bundling en desarrollo' : version.title === 'Vite 2.0 + React' ? 'Hizo Vite viable para producción con React' : version.title === 'React 18' ? 'Revolucionó rendimiento y capacidades de React' : version.title === 'Vite 4.0' ? 'Posicionó Vite como herramienta de vanguardia' : version.title === 'Vite 5.0' ? 'Consolidó Vite como build tool moderno y estable' : 'Combinación dominante para desarrollo frontend moderno'}</span><br>
                            <span class="text-text-secondary">• ${version.title === 'Vite 1.0' ? 'Cambió expectativas sobre velocidad de desarrollo' : version.title === 'Vite 2.0 + React' ? 'Atrajo a desarrolladores React cansados de Webpack lento' : version.title === 'React 18' ? 'Permitió aplicaciones más fluidas y responsivas' : version.title === 'Vite 4.0' ? 'Facilitó adopción de React Server Components' : version.title === 'Vite 5.0' ? 'Mejoró experiencia en proyectos grandes y monorepos' : 'Estableció nuevo estándar para DX en frontend'}</span>
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
            lineChart = createLineChart(ctx, getBuildToolsComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('vite'));
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
            initBuildToolsSimulation();
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
                        titleColor: '#747bff',
                        bodyColor: '#cbd5e1',
                        borderColor: '#646cff',
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
                        titleColor: '#747bff',
                        bodyColor: '#cbd5e1',
                        borderColor: '#646cff',
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
                        titleColor: '#747bff',
                        bodyColor: '#cbd5e1',
                        borderColor: '#646cff',
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
    function getBuildToolsComparisonData() {
        const tools = ['Vite', 'Webpack', 'CRA', 'Parcel'];
        const buildSpeed = [95, 40, 60, 80];
        const configSimplicity = [85, 15, 80, 90];
        
        return {
            labels: tools,
            datasets: [
                {
                    label: 'Velocidad de Build',
                    data: buildSpeed,
                    borderColor: '#646cff',
                    backgroundColor: 'rgba(100, 108, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Simplicidad Config',
                    data: configSimplicity,
                    borderColor: '#61dafb',
                    backgroundColor: 'rgba(97, 218, 251, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar
    function getRadarChartData(tool) {
        const toolData = buildToolsData[tool];
        
        return {
            labels: ['Velocidad Build', 'Simplicidad', 'Ecosistema', 'Rendimiento', 'Adopción'],
            datasets: [{
                label: toolData.name,
                data: [
                    toolData.buildSpeed,
                    toolData.configComplexity,
                    toolData.ecosystem,
                    toolData.performance,
                    toolData.jobMarket
                ],
                backgroundColor: `${toolData.color}20`,
                borderColor: toolData.color,
                pointBackgroundColor: toolData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: toolData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
        };
    }

    // Función para inicializar simulación de build tools
    function initBuildToolsSimulation() {
        console.log('Inicializando simulación de build tools...');
        
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
                        valueElement.textContent = 'Pequeño';
                    } else if (value < 66) {
                        valueElement.textContent = 'Mediano';
                    } else {
                        valueElement.textContent = 'Grande';
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
        
        // Botones de build tool
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
            thicknessSlider.value = 50;
            thicknessValue.textContent = 'Mediano';
            areaSlider.value = 50;
            areaValue.textContent = 'Media';
            puritySlider.value = 50;
            purityValue.textContent = 'Medio';
            materialButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-material="vite"]').classList.add('active');
            
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
        
        console.log('Simulación de build tools inicializada');
    }

    // Función para actualizar simulación
    function updateSimulation() {
        const activeMaterial = document.querySelector('.material-btn.active');
        if (!activeMaterial) return;
        
        const toolType = activeMaterial.dataset.material;
        const size = parseInt(document.getElementById('thicknessSlider').value);
        const experience = parseInt(document.getElementById('areaSlider').value);
        const time = parseInt(document.getElementById('puritySlider').value);
        
        const toolData = buildToolsData[toolType];
        if (!toolData) return;
        
        // Calcular valores basados en el tool y parámetros
        let buildSpeed = toolData.buildSpeed;
        let configComplexity = toolData.configComplexity;
        let ecosystem = toolData.ecosystem;
        
        // Ajustar por tamaño del proyecto
        if (size > 66) { // Proyecto grande
            if (toolType === 'vite') {
                buildSpeed *= 0.9; // Ligera reducción para proyectos muy grandes
            } else if (toolType === 'webpack') {
                buildSpeed *= 0.6; // Webpack sufre más con proyectos grandes
            }
        }
        
        // Ajustar por experiencia del equipo
        if (experience > 66) { // Equipo experto
            configComplexity *= 0.8; // Menos complejidad para expertos
        } else if (experience < 33) { // Equipo junior
            configComplexity *= 1.3; // Más complejidad para juniors
        }
        
        // Ajustar por tiempo de desarrollo
        if (time < 33) { // Tiempo corto
            if (toolType === 'vite') {
                buildSpeed *= 1.1; // Mejor para desarrollo rápido
            }
        }
        
        // Limitar valores
        buildSpeed = Math.min(Math.max(buildSpeed, 0), 100);
        configComplexity = Math.min(Math.max(configComplexity, 0), 100);
        ecosystem = Math.min(Math.max(ecosystem, 0), 100);
        
        // Calcular simplicidad (inverso de complejidad)
        const simplicity = 100 - configComplexity;
        
        // Actualizar barras y valores
        document.getElementById('strengthValue').textContent = 
            buildSpeed >= 90 ? 'Excelente' : 
            buildSpeed >= 70 ? 'Muy Buena' : 
            buildSpeed >= 50 ? 'Aceptable' : 'Lenta';
        document.getElementById('strengthBar').style.width = buildSpeed + '%';
        
        document.getElementById('conductivityValue').textContent = 
            simplicity >= 80 ? 'Simple' : 
            simplicity >= 60 ? 'Moderada' : 
            simplicity >= 40 ? 'Compleja' : 'Muy Compleja';
        document.getElementById('conductivityBar').style.width = simplicity + '%';
        
        document.getElementById('transparencyValue').textContent = 
            ecosystem >= 90 ? 'Extenso' : 
            ecosystem >= 75 ? 'Amplio' : 
            ecosystem >= 50 ? 'Moderado' : 'Limitado';
        document.getElementById('transparencyBar').style.width = ecosystem + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(toolType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let conclusionText = '';
        
        if (toolType === 'vite') {
            conclusionText = 'Vite ofrece el mejor equilibrio entre velocidad de build y simplicidad de configuración';
        } else if (toolType === 'webpack') {
            conclusionText = 'Webpack tiene ecosistema maduro pero configuración compleja y build lento';
        } else if (toolType === 'cra') {
            conclusionText = 'CRA es simple para comenzar pero limitado para proyectos complejos';
        } else if (toolType === 'parcel') {
            conclusionText = 'Parcel es simple y rápido pero con ecosistema más limitado';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-vite-accent-tertiary mr-2"></ion-icon>
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
        const toolType = activeMaterial ? activeMaterial.dataset.material : 'vite';
        const toolData = buildToolsData[toolType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentBuildSpeed = parseFloat(document.getElementById('strengthBar').style.width);
                const newBuildSpeed = Math.min(100, currentBuildSpeed * 1.05);
                document.getElementById('strengthBar').style.width = newBuildSpeed + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${toolData.name} analizado exitosamente`, 'success');
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
        const toolType = activeMaterial ? activeMaterial.dataset.material : 'vite';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-vite-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-vite-accent-light">Adopción por Año</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-vite-accent-secondary-light">Comparación de Métricas</h4>
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
                        <h4 class="font-bold mb-3 text-vite-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes herramientas de build para React. 
                            Vite destaca en velocidad de build y simplicidad de configuración, mientras que Webpack sobresale en ecosistema maduro. 
                            Cada herramienta tiene ventajas específicas según el tipo de proyecto y equipo.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-vite-accent to-vite-accent-dark text-white font-bold rounded-xl shadow-lg shadow-vite-accent/30 hover:shadow-xl hover:shadow-vite-accent/40 transition-all duration-300">
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
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(toolType));
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
        const years = [2020, 2021, 2022, 2023, 2024];
        const viteAdoption = [1, 15, 40, 55, 65]; // Porcentaje
        const webpackAdoption = [85, 80, 70, 60, 50]; // Porcentaje
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'Vite (% proyectos nuevos)',
                    data: viteAdoption,
                    borderColor: '#646cff',
                    backgroundColor: 'rgba(100, 108, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Webpack (% proyectos nuevos)',
                    data: webpackAdoption,
                    borderColor: '#8ed6fb',
                    backgroundColor: 'rgba(142, 214, 251, 0.1)',
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
        const tools = ['Vite', 'Webpack', 'Create React App', 'Parcel'];
        const buildSpeed = [95, 40, 60, 80];
        const configSimplicity = [85, 15, 80, 90];
        const ecosystem = [80, 95, 90, 70];
        
        return {
            labels: tools,
            datasets: [
                {
                    label: 'Velocidad Build',
                    data: buildSpeed,
                    backgroundColor: 'rgba(100, 108, 255, 0.7)',
                    borderColor: '#646cff',
                    borderWidth: 1
                },
                {
                    label: 'Simplicidad Config',
                    data: configSimplicity,
                    backgroundColor: 'rgba(97, 218, 251, 0.7)',
                    borderColor: '#61dafb',
                    borderWidth: 1
                },
                {
                    label: 'Ecosistema',
                    data: ecosystem,
                    backgroundColor: 'rgba(247, 223, 30, 0.7)',
                    borderColor: '#f7df1e',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(tool) {
        const toolData = buildToolsData[tool];
        
        // Datos para todos los tools
        const labels = ['Velocidad', 'Simplicidad', 'Ecosistema', 'Rendimiento', 'Adopción'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Vite',
                    data: [95, 85, 80, 90, 85],
                    backgroundColor: 'rgba(100, 108, 255, 0.1)',
                    borderColor: '#646cff',
                    pointBackgroundColor: '#646cff',
                    borderWidth: 1
                },
                {
                    label: 'Webpack',
                    data: [40, 15, 95, 80, 90],
                    backgroundColor: 'rgba(142, 214, 251, 0.1)',
                    borderColor: '#8ed6fb',
                    pointBackgroundColor: '#8ed6fb',
                    borderWidth: 1
                },
                {
                    label: toolData.name,
                    data: [
                        toolData.buildSpeed,
                        100 - toolData.configComplexity,
                        toolData.ecosystem,
                        toolData.performance,
                        toolData.jobMarket
                    ],
                    backgroundColor: `${toolData.color}40`,
                    borderColor: toolData.color,
                    pointBackgroundColor: toolData.color,
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
            "2013: Facebook lanza React...",
            "2015: Webpack se convierte en estándar para React...",
            "2016: Create React App simplifica inicio de proyectos...",
            "2020: Evan You (Vue.js) presenta Vite 1.0...",
            "2021: Vite 2.0 agrega soporte nativo para React...",
            "2022: React 18 y Vite 4.0 mejoran DX significativamente...",
            "2023: Vite 5.0 consolida mejoras de rendimiento...",
            "2024: Vite + React dominan nuevos proyectos frontend..."
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
        }, 4000);
    }

    // Función para mostrar resultados de evolución tecnológica
    function showTechEvolutionResults() {
        const results = [
            { type: 'Adopción Vite', value: '0% → 65%', color: '#646cff', icon: 'trending-up-outline' },
            { type: 'Tiempo build vs Webpack', value: '100x → 10x', color: '#61dafb', icon: 'speedometer-outline' },
            { type: 'Descargas semanales', value: '0 → 4M', color: '#ff6b6b', icon: 'download-outline' },
            { type: 'Satisfacción DX', value: '50% → 90%', color: '#8b5cf6', icon: 'happy-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-vite-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de Vite + React (2013-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico desde Webpack lento hasta Vite ultrarrápido:</p>
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
                        <span class="text-vite-accent-light"># Tendencias futuras (2025-2030):</span><br>
                        <span class="text-text-secondary">• Build times cercanos a cero con incremental compilation</span><br>
                        <span class="text-text-secondary">• Server Components como estándar</span><br>
                        <span class="text-text-secondary">• AI-assisted development en Vite</span><br>
                        <span class="text-text-secondary">• Edge-first deployment por defecto</span><br>
                        <span class="text-text-secondary">• Zero-config para todas las necesidades comunes</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-vite-accent to-vite-accent-dark text-white font-bold rounded-xl shadow-lg shadow-vite-accent/30">
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
    console.log('Aplicación ViteReactLab inicializada correctamente');
});