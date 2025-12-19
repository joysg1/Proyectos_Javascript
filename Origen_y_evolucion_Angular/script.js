document.addEventListener('DOMContentLoaded', function() {
    console.log('AngularLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de versiones de Angular
    const angularVersionsData = [
        {
            icon: 'logo-javascript',
            title: 'AngularJS',
            description: 'Primera versión basada en JavaScript con two-way data binding. Revolucionó el desarrollo frontend en su momento.',
            color: '#ffab00',
            status: 'Legacy',
            year: '2010'
        },
        {
            icon: 'logo-angular',
            title: 'Angular 2',
            description: 'Reescritura completa con TypeScript y arquitectura de componentes. Marcó el inicio del Angular moderno.',
            color: '#dd0031',
            status: 'Histórica',
            year: '2016'
        },
        {
            icon: 'rocket-outline',
            title: 'Angular 4',
            description: 'Optimización de rendimiento y reducción del tamaño del bundle. Primer lanzamiento después de Angular 2.',
            color: '#1976d2',
            status: 'Estable',
            year: '2017'
        },
        {
            icon: 'speedometer-outline',
            title: 'Angular 6-8',
            description: 'Introducción de Angular CLI mejorado, Ivy renderer preview y actualizaciones de rendimiento.',
            color: '#8b5cf6',
            status: 'Estable',
            year: '2018'
        },
        {
            icon: 'flash-outline',
            title: 'Angular 9+',
            description: 'Motor Ivy por defecto, mejor rendimiento y menor tamaño de bundle. Compilación AOT mejorada.',
            color: '#00a8ff',
            status: 'Moderno',
            year: '2020'
        },
        {
            icon: 'cube-outline',
            title: 'Angular 14+',
            description: 'Standalone components, typed forms, signals y mejoras en developer experience.',
            color: '#ff4757',
            status: 'Actual',
            year: '2022'
        }
    ];

    // Datos de frameworks para simulación
    const frameworksData = {
        'angular': {
            name: 'Angular',
            performance: 85,
            scalability: 95,
            ecosystem: 90,
            learning: 70,
            bundleSize: 30,
            color: '#dd0031',
            description: 'Framework completo para aplicaciones web empresariales.',
            applications: ['Aplicaciones empresariales', 'SPA complejas', 'Proyectos grandes', 'Equipos numerosos'],
            adoption: 90,
            community: 85,
            maintenance: 95
        },
        'react': {
            name: 'React',
            performance: 80,
            scalability: 85,
            ecosystem: 95,
            learning: 60,
            bundleSize: 25,
            color: '#61dafb',
            description: 'Biblioteca de UI para construir interfaces interactivas.',
            applications: ['Interfaces dinámicas', 'Aplicaciones móviles', 'Dashboards', 'Proyectos medianos'],
            adoption: 95,
            community: 95,
            maintenance: 85
        },
        'vue': {
            name: 'Vue.js',
            performance: 75,
            scalability: 80,
            ecosystem: 80,
            learning: 50,
            bundleSize: 20,
            color: '#42b883',
            description: 'Framework progresivo para interfaces de usuario.',
            applications: ['Proyectos pequeños/medianos', 'Prototipado rápido', 'Aplicaciones progresivas'],
            adoption: 75,
            community: 80,
            maintenance: 80
        },
        'svelte': {
            name: 'Svelte',
            performance: 90,
            scalability: 70,
            ecosystem: 60,
            learning: 55,
            bundleSize: 15,
            color: '#ff3e00',
            description: 'Framework compilado que ejecuta menos código en el navegador.',
            applications: ['Aplicaciones muy rápidas', 'Proyectos pequeños', 'Prototipos', 'Widgets'],
            adoption: 40,
            community: 60,
            maintenance: 70
        }
    };

    // Inicializar componentes
    initAngularParticles();
    initVersionHistory();
    initEventListeners();
    initAnimations();
    initTimeline();
    initFrameworkSimulation();
    initCharts();

    // Función para inicializar partículas de Angular
    function initAngularParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 80;
        
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
                    // Partículas de Angular (rojo)
                    color = `rgba(221, 0, 49, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Partículas de TypeScript (azul)
                    color = `rgba(25, 118, 210, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.2;
                } else {
                    // Partículas especiales (dorado)
                    color = `rgba(255, 171, 0, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 5 + 2;
                    speed = (Math.random() - 0.5) * 0.4;
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
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    sides: 6,
                    type: type < 0.6 ? 'angular' : type < 0.85 ? 'typescript' : 'special'
                });
            }
        }
        
        function drawComponent(ctx, x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            // Dibujar un hexágono para representar componentes
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const px = size * Math.cos(angle);
                const py = size * Math.sin(angle);
                
                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }
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
            ctx.strokeStyle = 'rgba(221, 0, 49, 0.1)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120 && particles[i].type === particles[j].type) {
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
                
                // Dibujar partícula
                ctx.save();
                
                if (particle.type === 'special') {
                    // Gradiente para partículas especiales
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(255, 171, 0, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(255, 171, 0, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                drawComponent(ctx, particle.x, particle.y, particle.size, particle.rotation);
                ctx.fill();
                
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
        console.log('Partículas de Angular inicializadas');
    }

    // Función para inicializar historial de versiones
    function initVersionHistory() {
        const container = document.getElementById('versionsInfo');
        if (!container) {
            console.error('Contenedor de versiones no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-angular-accent-light">Historial de Versiones de Angular</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="versionsGrid">
                ${angularVersionsData.map(version => `
                    <div class="version-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-angular-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-version="${version.title}">
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
        document.querySelectorAll('.version-card').forEach(card => {
            card.addEventListener('click', function() {
                const versionName = this.getAttribute('data-version');
                showVersionDetail(versionName);
            });
        });
        
        console.log('Historial de versiones inicializado: ' + angularVersionsData.length);
    }

    // Función para mostrar detalle de versión
    function showVersionDetail(versionName) {
        const version = angularVersionsData.find(v => v.title === versionName);
        if (!version) return;
        
        const details = {
            'AngularJS': {
                features: 'Two-way data binding, directivas, inyección de dependencias',
                changes: 'Primera versión, revolucionó el desarrollo frontend',
                impact: 'Alto - Popularizó los SPA',
                breaking: 'N/A (primera versión)'
            },
            'Angular 2': {
                features: 'TypeScript, componentes, servicios, módulos',
                changes: 'Reescritura completa del framework',
                impact: 'Muy alto - Angular moderno',
                breaking: 'Total - No compatible con AngularJS'
            },
            'Angular 4': {
                features: 'Animaciones separadas, reducción de bundle',
                changes: 'Primera actualización mayor después de Angular 2',
                impact: 'Alto - Mejoras de rendimiento',
                breaking: 'Menor - Casi compatible con Angular 2'
            },
            'Angular 6-8': {
                features: 'Angular CLI mejorado, Ivy preview, Bazel',
                changes: 'Mejoras incrementales y nuevas herramientas',
                impact: 'Moderado - Developer experience',
                breaking: 'Algunas - Mejoras en APIs'
            },
            'Angular 9+': {
                features: 'Ivy por defecto, mejor rendimiento',
                changes: 'Nuevo motor de renderizado',
                impact: 'Alto - Mejoras de rendimiento',
                breaking: 'Algunas - Cambios en compilación'
            },
            'Angular 14+': {
                features: 'Standalone components, typed forms, signals',
                changes: 'Modernización del framework',
                impact: 'Alto - Simplificación',
                breaking: 'Pocas - Mejoras progresivas'
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
                            <h4 class="font-bold mb-2 text-angular-accent-light">Características Principales:</h4>
                            <p class="text-text-secondary">${versionDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${versionDetails.changes ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-angular-accent-light">Cambios Principales</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.changes}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.impact ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-angular-accent-light">Impacto</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.impact}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.breaking ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-angular-accent-light">Breaking Changes</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.breaking}</p>
                            </div>
                        ` : ''}
                        
                        <div class="bg-gray-900/50 rounded-lg p-3">
                            <h4 class="font-bold text-sm mb-1 text-angular-accent-light">Año</h4>
                            <p class="text-text-secondary text-sm">${version.year}</p>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-angular-accent-light"># Aportes de ${version.title}:</span><br>
                            <span class="text-text-secondary">• ${version.title === 'AngularJS' ? 'Popularizó SPA y two-way binding' : version.title === 'Angular 2' ? 'Introdujo TypeScript y componentes' : version.title === 'Angular 4' ? 'Optimizó rendimiento y bundle' : version.title === 'Angular 6-8' ? 'Mejoró CLI y tooling' : version.title === 'Angular 9+' ? 'Motor Ivy para mejor rendimiento' : 'Standalone components'}</span><br>
                            <span class="text-text-secondary">• ${version.title === 'AngularJS' ? 'Revolucionó desarrollo frontend' : version.title === 'Angular 2' ? 'Estableció Angular moderno' : version.title === 'Angular 4' ? 'Estabilizó el ecosistema' : version.title === 'Angular 6-8' ? 'Preparó terreno para Ivy' : version.title === 'Angular 9+' ? 'Redujo tamaño de bundle' : 'Simplificó desarrollo'}</span>
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
            lineChart = createLineChart(ctx, getFrameworkComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('angular'));
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
                        titleColor: '#ff4072',
                        bodyColor: '#cbd5e1',
                        borderColor: '#dd0031',
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
                        titleColor: '#ff4072',
                        bodyColor: '#cbd5e1',
                        borderColor: '#dd0031',
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
                        titleColor: '#ff4072',
                        bodyColor: '#cbd5e1',
                        borderColor: '#dd0031',
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
        const frameworks = ['Angular', 'React', 'Vue.js', 'Svelte'];
        const performance = [85, 80, 75, 90];
        const scalability = [95, 85, 80, 70];
        
        return {
            labels: frameworks,
            datasets: [
                {
                    label: 'Rendimiento',
                    data: performance,
                    borderColor: '#dd0031',
                    backgroundColor: 'rgba(221, 0, 49, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Escalabilidad',
                    data: scalability,
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
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
            labels: ['Rendimiento', 'Escalabilidad', 'Ecosistema', 'Facilidad', 'Bundle'],
            datasets: [{
                label: frameworkData.name,
                data: [
                    frameworkData.performance,
                    frameworkData.scalability,
                    frameworkData.ecosystem,
                    100 - frameworkData.learning, // Invertir para que más alto sea mejor
                    100 - frameworkData.bundleSize // Invertir para que más alto sea mejor
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
        const bundleSlider = document.getElementById('bundleSlider');
        const bundleValue = document.getElementById('bundleValue');
        const learningSlider = document.getElementById('learningSlider');
        const learningValue = document.getElementById('learningValue');
        const ecosystemSlider = document.getElementById('ecosystemSlider');
        const ecosystemValue = document.getElementById('ecosystemValue');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        
        // Verificar que todos los elementos existan
        if (!bundleSlider || !frameworkButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        function updateSliderValue(slider, valueElement, type) {
            slider.addEventListener('input', function() {
                const value = parseInt(this.value);
                
                if (type === 'bundle') {
                    const sizes = ['~50 KB', '~150 KB', '~250 KB', '~350 KB', '~500 KB'];
                    const index = Math.min(Math.floor(value / 20), 4);
                    valueElement.textContent = sizes[index];
                } else if (type === 'learning') {
                    if (value < 33) {
                        valueElement.textContent = 'Baja';
                    } else if (value < 66) {
                        valueElement.textContent = 'Media';
                    } else {
                        valueElement.textContent = 'Alta';
                    }
                } else if (type === 'ecosystem') {
                    if (value < 33) {
                        valueElement.textContent = 'Limitado';
                    } else if (value < 66) {
                        valueElement.textContent = 'Moderado';
                    } else {
                        valueElement.textContent = 'Completo';
                    }
                }
                updateSimulation();
            });
        }
        
        updateSliderValue(bundleSlider, bundleValue, 'bundle');
        updateSliderValue(learningSlider, learningValue, 'learning');
        updateSliderValue(ecosystemSlider, ecosystemValue, 'ecosystem');
        
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
            bundleSlider.value = 30;
            bundleValue.textContent = '~500 KB';
            learningSlider.value = 70;
            learningValue.textContent = 'Media-Alta';
            ecosystemSlider.value = 90;
            ecosystemValue.textContent = 'Muy Completo';
            frameworkButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-framework="angular"]').classList.add('active');
            
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
        const bundleValue = parseInt(document.getElementById('bundleSlider').value);
        const learningValue = parseInt(document.getElementById('learningSlider').value);
        const ecosystemValue = parseInt(document.getElementById('ecosystemSlider').value);
        
        const frameworkData = frameworksData[frameworkType];
        if (!frameworkData) return;
        
        // Calcular valores basados en el framework
        let performance = frameworkData.performance;
        let scalability = frameworkData.scalability;
        let adoption = frameworkData.adoption;
        
        // Ajustar por bundle size (más pequeño = mejor)
        performance = performance * (1 - (bundleValue - 30) / 200);
        
        // Ajustar por curva de aprendizaje (más baja = mejor)
        scalability = scalability * (1 - (learningValue - 50) / 200);
        
        // Ajustar por ecosistema
        adoption = adoption * (ecosystemValue / 100);
        
        // Limitar valores
        performance = Math.min(Math.max(performance, 0), 100);
        scalability = Math.min(Math.max(scalability, 0), 100);
        adoption = Math.min(Math.max(adoption, 0), 100);
        
        // Actualizar barras y valores
        document.getElementById('performanceValue').textContent = 
            performance > 85 ? 'Excelente' : performance > 70 ? 'Bueno' : performance > 50 ? 'Aceptable' : 'Limitado';
        document.getElementById('performanceBar').style.width = performance + '%';
        
        document.getElementById('scalabilityValue').textContent = 
            scalability > 85 ? 'Muy Alta' : scalability > 70 ? 'Alta' : scalability > 50 ? 'Moderada' : 'Baja';
        document.getElementById('scalabilityBar').style.width = scalability + '%';
        
        document.getElementById('enterpriseValue').textContent = 
            adoption > 85 ? 'Muy Alta' : adoption > 70 ? 'Alta' : adoption > 50 ? 'Moderada' : 'Baja';
        document.getElementById('enterpriseBar').style.width = adoption + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(frameworkType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-angular-accent-tertiary mr-2"></ion-icon>
            ${frameworkData.description}
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
        const frameworkType = activeFramework ? activeFramework.dataset.framework : 'angular';
        const frameworkData = frameworksData[frameworkType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
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
        const frameworkType = activeFramework ? activeFramework.dataset.framework : 'angular';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-angular-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-angular-accent-light">Adopción en el Tiempo</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-angular-accent-secondary-light">Comparación de Métricas</h4>
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
                        <h4 class="font-bold mb-3 text-angular-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes frameworks frontend. 
                            Angular destaca en escalabilidad y soporte empresarial, mientras que frameworks como React 
                            tienen ventajas en ecosistema y comunidad. Cada framework tiene casos de uso específicos 
                            donde sobresale.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-angular-accent to-angular-accent-dark text-white font-bold rounded-xl shadow-lg shadow-angular-accent/30 hover:shadow-xl hover:shadow-angular-accent/40 transition-all duration-300">
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
        const years = [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024];
        const angularAdoption = [1, 15, 35, 60, 75, 80, 85, 90];
        const reactAdoption = [0, 5, 20, 50, 80, 90, 92, 95];
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'Angular',
                    data: angularAdoption,
                    borderColor: '#dd0031',
                    backgroundColor: 'rgba(221, 0, 49, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'React',
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
        const frameworks = ['Angular', 'React', 'Vue.js', 'Svelte'];
        const performance = [85, 80, 75, 90];
        const scalability = [95, 85, 80, 70];
        const ecosystem = [90, 95, 80, 60];
        
        return {
            labels: frameworks,
            datasets: [
                {
                    label: 'Rendimiento',
                    data: performance,
                    backgroundColor: 'rgba(221, 0, 49, 0.7)',
                    borderColor: '#dd0031',
                    borderWidth: 1
                },
                {
                    label: 'Escalabilidad',
                    data: scalability,
                    backgroundColor: 'rgba(25, 118, 210, 0.7)',
                    borderColor: '#1976d2',
                    borderWidth: 1
                },
                {
                    label: 'Ecosistema',
                    data: ecosystem,
                    backgroundColor: 'rgba(255, 171, 0, 0.7)',
                    borderColor: '#ffab00',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(framework) {
        const frameworkData = frameworksData[framework];
        
        // Datos para todas los frameworks
        const labels = ['Rendimiento', 'Escalabilidad', 'Ecosistema', 'Facilidad', 'Adopción'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Angular',
                    data: [85, 95, 90, 30, 90],
                    backgroundColor: 'rgba(221, 0, 49, 0.1)',
                    borderColor: '#dd0031',
                    pointBackgroundColor: '#dd0031',
                    borderWidth: 1
                },
                {
                    label: 'React',
                    data: [80, 85, 95, 40, 95],
                    backgroundColor: 'rgba(97, 218, 251, 0.1)',
                    borderColor: '#61dafb',
                    pointBackgroundColor: '#61dafb',
                    borderWidth: 1
                },
                {
                    label: 'Vue.js',
                    data: [75, 80, 80, 50, 75],
                    backgroundColor: 'rgba(66, 184, 131, 0.1)',
                    borderColor: '#42b883',
                    pointBackgroundColor: '#42b883',
                    borderWidth: 1
                },
                {
                    label: frameworkData.name,
                    data: [
                        frameworkData.performance,
                        frameworkData.scalability,
                        frameworkData.ecosystem,
                        100 - frameworkData.learning,
                        frameworkData.adoption
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
            "2009: Desarrollo inicial de AngularJS...",
            "2010: Lanzamiento oficial de AngularJS...",
            "2012: Popularización de SPA...",
            "2014: Anuncio de Angular 2...",
            "2016: Lanzamiento de Angular 2...",
            "2017: Angular 4 y optimizaciones...",
            "2018: Angular 6-8 y mejoras CLI...",
            "2020: Angular 9+ con motor Ivy...",
            "2022: Angular 14+ standalone components...",
            "2024: Angular moderno y signals..."
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
            { type: 'Descargas npm semanales', value: '0 → 2M+', color: '#dd0031', icon: 'download-outline' },
            { type: 'Versiones principales', value: '1 → 16+', color: '#1976d2', icon: 'git-branch-outline' },
            { type: 'Tamaño de bundle', value: '~2MB → ~500KB', color: '#ffab00', icon: 'speedometer-outline' },
            { type: 'Comunidad GitHub', value: '0 → 85K+ estrellas', color: '#8b5cf6', icon: 'people-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-angular-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de Angular (2010-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de Angular desde AngularJS hasta la actualidad:</p>
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
                        <span class="text-angular-accent-light"># Tendencias futuras (2025-2030):</span><br>
                        <span class="text-text-secondary">• Signals completamente integrados</span><br>
                        <span class="text-text-secondary">• Mejoras en rendimiento y bundle size</span><br>
                        <span class="text-text-secondary">• Mayor adopción de standalone components</span><br>
                        <span class="text-text-secondary">• Mejor integración con WebAssembly</span><br>
                        <span class="text-text-secondary">• Herramientas de AI para desarrollo</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-angular-accent to-angular-accent-dark text-white font-bold rounded-xl shadow-lg shadow-angular-accent/30">
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
    console.log('Aplicación AngularLab inicializada correctamente');
});