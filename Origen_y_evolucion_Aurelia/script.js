document.addEventListener('DOMContentLoaded', function() {
    console.log('AureliaLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de versiones de Aurelia
    const aureliaVersionsData = [
        {
            icon: 'diamond-outline',
            title: 'Aurelia 1.0',
            description: 'Lanzamiento inicial con binding bidireccional y componentes basados en estándares.',
            color: '#ff4b82',
            status: 'Fundacional',
            year: '2015'
        },
        {
            icon: 'layers-outline',
            title: 'Aurelia 1.1-1.8',
            description: 'Mejoras de performance, CLI mejorado y ampliación del ecosistema.',
            color: '#683ab7',
            status: 'Evolutiva',
            year: '2016-2018'
        },
        {
            icon: 'rocket-outline',
            title: 'Aurelia 2 Beta',
            description: 'Reescritura completa con mejor rendimiento y TypeScript moderno.',
            color: '#4fc3f7',
            status: 'Revolucionaria',
            year: '2019'
        },
        {
            icon: 'git-branch-outline',
            title: 'Aurelia 2.0',
            description: 'Versión estable con mejoras significativas en performance y experiencia de desarrollo.',
            color: '#8a5cf6',
            status: 'Estable',
            year: '2021'
        },
        {
            icon: 'flash-outline',
            title: 'Aurelia 2.1-2.4',
            description: 'Mejoras incrementales, integración Web Components y optimizaciones.',
            color: '#00a8ff',
            status: 'Optimización',
            year: '2022-2023'
        },
        {
            icon: 'sparkles-outline',
            title: 'Aurelia Next',
            description: 'Evolución continua con nuevas características y mejor integración ecosistema.',
            color: '#00ffcc',
            status: 'Actual',
            year: '2024'
        }
    ];

    // Datos de tecnologías para simulación
    const technologiesData = {
        'aurelia': {
            name: 'Aurelia',
            performance: 88,
            learningCurve: 85,
            ecosystem: 65,
            flexibility: 90,
            color: '#ff4b82',
            description: 'Framework progresivo para aplicaciones web ambiciosas.',
            applications: ['Enterprise Apps', 'SPAs', 'PWA', 'Large Teams'],
            jobMarket: 40,
            community: 70
        },
        'angular': {
            name: 'Angular',
            performance: 80,
            learningCurve: 40,
            ecosystem: 85,
            flexibility: 60,
            color: '#ff6b6b',
            description: 'Framework completo para aplicaciones web de nivel empresarial.',
            applications: ['Enterprise', 'PWA', 'Complex Apps', 'Large Teams'],
            jobMarket: 70,
            community: 80
        },
        'vue': {
            name: 'Vue',
            performance: 85,
            learningCurve: 85,
            ecosystem: 80,
            flexibility: 85,
            color: '#4fc3f7',
            description: 'Framework progresivo para construir interfaces de usuario.',
            applications: ['SPAs', 'Prototyping', 'Small Projects', 'Progressive Web'],
            jobMarket: 60,
            community: 85
        },
        'react': {
            name: 'React',
            performance: 90,
            learningCurve: 70,
            ecosystem: 95,
            flexibility: 95,
            color: '#61dafb',
            description: 'Biblioteca de JavaScript para construir interfaces de usuario.',
            applications: ['Web Apps', 'Mobile Apps', 'SPAs', 'SSR'],
            jobMarket: 90,
            community: 95
        }
    };

    // Inicializar componentes
    initAureliaParticles();
    initAureliaVersions();
    initEventListeners();
    initAnimations();
    initTimeline();
    initTechnologySimulation();
    initCharts();

    // Función para inicializar partículas de Aurelia (componentes)
    function initAureliaParticles() {
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
                    // Partículas de Aurelia (rosa)
                    color = `rgba(255, 75, 130, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 6 + 3;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de TypeScript (púrpura)
                    color = `rgba(104, 58, 183, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Partículas especiales (cian)
                    color = `rgba(79, 195, 247, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'aurelia' : type < 0.85 ? 'ts' : 'special'
                });
            }
        }
        
        function drawDiamond(ctx, x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            // Dibujar un diamante (símbolo de Aurelia)
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, 0);
            ctx.lineTo(0, size);
            ctx.lineTo(-size, 0);
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
            ctx.strokeStyle = 'rgba(255, 75, 130, 0.1)';
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
                
                // Dibujar partícula como diamante (símbolo de Aurelia)
                ctx.save();
                
                if (particle.type === 'special') {
                    // Gradiente para partículas especiales
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(79, 195, 247, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(79, 195, 247, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                drawDiamond(ctx, particle.x, particle.y, particle.size, particle.rotation);
                ctx.fill();
                
                // Borde para componentes Aurelia
                if (particle.type === 'aurelia') {
                    ctx.strokeStyle = `rgba(255, 75, 130, ${currentAlpha * 0.7})`;
                    ctx.lineWidth = 1;
                    drawDiamond(ctx, particle.x, particle.y, particle.size, particle.rotation);
                    ctx.stroke();
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
        console.log('Partículas de Aurelia inicializadas');
    }

    // Función para inicializar versiones de Aurelia
    function initAureliaVersions() {
        const container = document.getElementById('productionInfo');
        if (!container) {
            console.error('Contenedor de versiones no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-aurelia-accent-light">Evolución de Versiones de Aurelia</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="versionsGrid">
                ${aureliaVersionsData.map(version => `
                    <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-aurelia-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-method="${version.title}">
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
        
        console.log('Versiones de Aurelia inicializadas: ' + aureliaVersionsData.length);
    }

    // Función para mostrar detalle de versión
    function showVersionDetail(versionName) {
        const version = aureliaVersionsData.find(v => v.title === versionName);
        if (!version) return;
        
        const details = {
            'Aurelia 1.0': {
                features: 'Binding bidireccional, componentes estándar, dependency injection',
                impact: 'Introduce framework progresivo con enfoque en estándares',
                adoption: 'Comunidad entusiasta pero nicho inicialmente',
                size: '~60kb',
                npmDownloads: '~10k/mes'
            },
            'Aurelia 1.1-1.8': {
                features: 'CLI mejorado, mejoras de performance, ampliación ecosistema',
                impact: 'Consolidación como opción sólida para enterprise',
                adoption: 'Crecimiento constante en proyectos empresariales',
                size: '~65kb',
                npmDownloads: '~50k/mes'
            },
            'Aurelia 2 Beta': {
                features: 'Reescritura completa, TypeScript moderno, mejor rendimiento',
                impact: 'Modernización completa del framework',
                adoption: 'Comunidad expectante, adopción gradual',
                size: '~55kb',
                npmDownloads: '~30k/mes'
            },
            'Aurelia 2.0': {
                features: 'Versión estable, mejoras significativas, experiencia mejorada',
                impact: 'Posicionamiento como alternativa moderna y productiva',
                adoption: 'Adopción en nuevos proyectos, migraciones',
                size: '~58kb',
                npmDownloads: '~40k/mes'
            },
            'Aurelia 2.1-2.4': {
                features: 'Integración Web Components, optimizaciones, mejoras CLI',
                impact: 'Consolidación y expansión de capacidades',
                adoption: 'Crecimiento en adopción empresarial',
                size: '~60kb',
                npmDownloads: '~50k/mes'
            },
            'Aurelia Next': {
                features: 'Evolución continua, nuevas características, mejor integración',
                impact: 'Preparación para el futuro del desarrollo web',
                adoption: 'Adopción gradual, comunidad comprometida',
                size: '~62kb',
                npmDownloads: '~60k/mes'
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
                            <h4 class="font-bold mb-2 text-aurelia-accent-light">Características Principales:</h4>
                            <p class="text-text-secondary">${versionDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${versionDetails.impact ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-aurelia-accent-light">Impacto</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.impact}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.adoption ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-aurelia-accent-light">Adopción</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.adoption}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.size ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-aurelia-accent-light">Tamaño</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.size}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.npmDownloads ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-aurelia-accent-light">Descargas NPM</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.npmDownloads}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-aurelia-accent-light"># Legado de ${version.title}:</span><br>
                            <span class="text-text-secondary">• ${version.title === 'Aurelia 1.0' ? 'Introdujo framework progresivo con estándares' : version.title === 'Aurelia 1.1-1.8' ? 'Consolidó ecosistema y herramientas' : version.title === 'Aurelia 2 Beta' ? 'Modernizó completamente el framework' : version.title === 'Aurelia 2.0' ? 'Estableció base sólida para el futuro' : version.title === 'Aurelia 2.1-2.4' ? 'Expandió capacidades e integraciones' : 'Preparó camino para innovación continua'}</span><br>
                            <span class="text-text-secondary">• ${version.title === 'Aurelia 1.0' ? 'Demostró que productividad y estándares pueden coexistir' : version.title === 'Aurelia 1.1-1.8' ? 'Creó comunidad leal y comprometida' : version.title === 'Aurelia 2 Beta' ? 'Mostró compromiso con modernización y rendimiento' : version.title === 'Aurelia 2.0' ? 'Validó enfoque de convención sobre configuración' : version.title === 'Aurelia 2.1-2.4' ? 'Integró tecnologías web modernas' : 'Mantiene enfoque en desarrollador y experiencia'}</span>
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
            radarChart = createRadarChart(ctx, getRadarChartData('aurelia'));
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
                        titleColor: '#ff7ba3',
                        bodyColor: '#cbd5e1',
                        borderColor: '#ff4b82',
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
                        titleColor: '#ff7ba3',
                        bodyColor: '#cbd5e1',
                        borderColor: '#ff4b82',
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
                        titleColor: '#ff7ba3',
                        bodyColor: '#cbd5e1',
                        borderColor: '#ff4b82',
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
        const technologies = ['Aurelia', 'Angular', 'Vue', 'React'];
        const performance = [88, 80, 85, 90];
        const learningCurve = [85, 40, 85, 70];
        
        return {
            labels: technologies,
            datasets: [
                {
                    label: 'Performance',
                    data: performance,
                    borderColor: '#ff4b82',
                    backgroundColor: 'rgba(255, 75, 130, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Facilidad Aprendizaje',
                    data: learningCurve,
                    borderColor: '#683ab7',
                    backgroundColor: 'rgba(104, 58, 183, 0.1)',
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
            labels: ['Performance', 'Curva Aprendizaje', 'Ecosistema', 'Flexibilidad', 'Mercado Laboral'],
            datasets: [{
                label: techData.name,
                data: [
                    techData.performance,
                    techData.learningCurve,
                    techData.ecosystem,
                    techData.flexibility,
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
            document.querySelector('[data-material="aurelia"]').classList.add('active');
            
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
        let ecosystem = techData.ecosystem;
        
        // Ajustar por complejidad del proyecto
        if (complexity > 66) { // Proyecto enterprise
            if (techType === 'aurelia' || techType === 'angular') {
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
            if (techType === 'vue' || techType === 'react') {
                ecosystem *= 1.1; // Mejor para desarrollo rápido
            }
        }
        
        // Limitar valores
        performance = Math.min(Math.max(performance, 0), 100);
        learningCurve = Math.min(Math.max(learningCurve, 0), 100);
        ecosystem = Math.min(Math.max(ecosystem, 0), 100);
        
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
            ecosystem >= 90 ? 'Extenso' : 
            ecosystem >= 75 ? 'Amplio' : 
            ecosystem >= 50 ? 'Moderado' : 'En Crecimiento';
        document.getElementById('transparencyBar').style.width = ecosystem + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(techType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let conclusionText = '';
        
        if (techType === 'aurelia') {
            conclusionText = 'Aurelia destaca en productividad y estándares web, ideal para aplicaciones empresariales';
        } else if (techType === 'angular') {
            conclusionText = 'Angular es robusto para enterprise, con estructura definida y TypeScript-first';
        } else if (techType === 'vue') {
            conclusionText = 'Vue es progresivo y accesible, perfecto para adopción gradual';
        } else if (techType === 'react') {
            conclusionText = 'React ofrece máxima flexibilidad con ecosistema extenso';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-aurelia-accent-tertiary mr-2"></ion-icon>
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
        const techType = activeMaterial ? activeMaterial.dataset.material : 'aurelia';
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
        const techType = activeMaterial ? activeMaterial.dataset.material : 'aurelia';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-aurelia-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-aurelia-accent-light">Adopción por Año</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-aurelia-accent-secondary-light">Comparación de Métricas</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedBarChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-xl p-4">
                        <h4 class="font-bold text-lg mb-4 text-center text-cyan-300">Análisis Multidimensional (Radar)</h4>
                        <div class="w-full h-80">
                            <canvas id="detailedRadarChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/40 rounded-lg p-4">
                        <h4 class="font-bold mb-3 text-aurelia-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes frameworks frontend. 
                            Aurelia destaca en productividad y estándares web, mientras que React sobresale en ecosistema. 
                            Cada tecnología tiene ventajas específicas según el tipo de proyecto y equipo.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-aurelia-accent to-aurelia-accent-dark text-white font-bold rounded-xl shadow-lg shadow-aurelia-accent/30 hover:shadow-xl hover:shadow-aurelia-accent/40 transition-all duration-300">
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
        const years = [2015, 2017, 2019, 2021, 2023];
        const aureliaAdoption = [5, 10, 15, 20, 25]; // Porcentaje
        const reactAdoption = [40, 60, 70, 80, 83]; // Porcentaje
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'Aurelia (% desarrolladores)',
                    data: aureliaAdoption,
                    borderColor: '#ff4b82',
                    backgroundColor: 'rgba(255, 75, 130, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'React (% desarrolladores)',
                    data: reactAdoption,
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
        const technologies = ['Aurelia', 'Angular', 'Vue', 'React'];
        const performance = [88, 80, 85, 90];
        const learningCurve = [85, 40, 85, 70];
        const jobMarket = [40, 70, 60, 90];
        
        return {
            labels: technologies,
            datasets: [
                {
                    label: 'Performance',
                    data: performance,
                    backgroundColor: 'rgba(255, 75, 130, 0.7)',
                    borderColor: '#ff4b82',
                    borderWidth: 1
                },
                {
                    label: 'Facilidad de Aprendizaje',
                    data: learningCurve,
                    backgroundColor: 'rgba(104, 58, 183, 0.7)',
                    borderColor: '#683ab7',
                    borderWidth: 1
                },
                {
                    label: 'Mercado Laboral',
                    data: jobMarket,
                    backgroundColor: 'rgba(79, 195, 247, 0.7)',
                    borderColor: '#4fc3f7',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(technology) {
        const techData = technologiesData[technology];
        
        // Datos para todas las tecnologías
        const labels = ['Performance', 'Facilidad', 'Ecosistema', 'Flexibilidad', 'Trabajo'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Aurelia',
                    data: [88, 85, 65, 90, 40],
                    backgroundColor: 'rgba(255, 75, 130, 0.1)',
                    borderColor: '#ff4b82',
                    pointBackgroundColor: '#ff4b82',
                    borderWidth: 1
                },
                {
                    label: 'Angular',
                    data: [80, 40, 85, 60, 70],
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderColor: '#ff6b6b',
                    pointBackgroundColor: '#ff6b6b',
                    borderWidth: 1
                },
                {
                    label: 'Vue',
                    data: [85, 85, 80, 85, 60],
                    backgroundColor: 'rgba(79, 195, 247, 0.1)',
                    borderColor: '#4fc3f7',
                    pointBackgroundColor: '#4fc3f7',
                    borderWidth: 1
                },
                {
                    label: techData.name,
                    data: [
                        techData.performance,
                        techData.learningCurve,
                        techData.ecosystem,
                        techData.flexibility,
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
            "2014: Rob Eisenberg comienza desarrollo...",
            "2015: Lanzamiento de Aurelia 1.0 en conferencias...",
            "2016: Crecimiento de comunidad, mejoras CLI...",
            "2017: Expansión del ecosistema, plugins oficiales...",
            "2018: Anuncio de Aurelia 2, reescritura completa...",
            "2019: Beta pública, feedback de comunidad...",
            "2020: Mejoras continuas, integración TypeScript...",
            "2021: Lanzamiento estable de Aurelia 2...",
            "2022: Optimizaciones, integración Web Components...",
            "2023: Crecimiento en adopción empresarial...",
            "2024: Evolución continua, visión para el futuro..."
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
            { type: 'Satisfacción desarrolladores', value: '85% → 94%', color: '#ff4b82', icon: 'happy-outline' },
            { type: 'Descargas npm', value: '0 → 2M+', color: '#683ab7', icon: 'download-outline' },
            { type: 'Proyectos empresariales', value: '0 → 500+', color: '#4fc3f7', icon: 'business-outline' },
            { type: 'Crecimiento anual', value: '0% → 30%', color: '#00ffcc', icon: 'trending-up-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-aurelia-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de Aurelia (2014-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de Aurelia desde su concepción hasta su posición actual:</p>
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
                        <span class="text-aurelia-accent-light"># Tendencias futuras (2025-2030):</span><br>
                        <span class="text-text-secondary">• Integración avanzada con Web Components</span><br>
                        <span class="text-text-secondary">• Mejor soporte para edge computing</span><br>
                        <span class="text-text-secondary">• AI-assisted development en Aurelia</span><br>
                        <span class="text-text-secondary">• Ampliación del ecosistema de plugins</span><br>
                        <span class="text-text-secondary">• Mejoras en tooling y developer experience</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-aurelia-accent to-aurelia-accent-dark text-white font-bold rounded-xl shadow-lg shadow-aurelia-accent/30">
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
    console.log('Aplicación AureliaLab inicializada correctamente');
});