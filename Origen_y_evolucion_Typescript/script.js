document.addEventListener('DOMContentLoaded', function() {
    console.log('TypeScriptLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de versiones de TypeScript
    const typescriptVersionsData = [
        {
            icon: 'cube-outline',
            title: 'TypeScript 0.8',
            description: 'Primera versión pública. Tipado básico y compilación a JavaScript.',
            color: '#3178c6',
            status: 'Histórica',
            year: '2012'
        },
        {
            icon: 'shield-checkmark-outline',
            title: 'TypeScript 1.0',
            description: 'Primera versión estable. Adoptada por Angular 2.0.',
            color: '#2d7d46',
            status: 'Importante',
            year: '2014'
        },
        {
            icon: 'rocket-outline',
            title: 'TypeScript 2.0',
            description: 'Tipos no-nullables, control de flujo, mejoras significativas.',
            color: '#e34c26',
            status: 'Revolucionaria',
            year: '2016'
        },
        {
            icon: 'git-branch-outline',
            title: 'TypeScript 3.0',
            description: 'Tuplas con etiquetas, parámetros rest en tuplas, mejoras de UX.',
            color: '#8b5cf6',
            status: 'Innovadora',
            year: '2018'
        },
        {
            icon: 'flash-outline',
            title: 'TypeScript 4.0',
            description: 'Tipos variádicos en tuplas, etiquetas en elementos de tuplas.',
            color: '#00a8ff',
            status: 'Modernizadora',
            year: '2020'
        },
        {
            icon: 'sparkles-outline',
            title: 'TypeScript 5.0',
            description: 'Decoradores ES2022, const type parameters, mejoras de performance.',
            color: '#ff4757',
            status: 'Actual',
            year: '2023'
        }
    ];

    // Datos de lenguajes para simulación
    const languagesData = {
        'typescript': {
            name: 'TypeScript',
            typeSafety: 95,
            learningCurve: 65,
            ecosystem: 90,
            performance: 85,
            color: '#3178c6',
            description: 'Superconjunto tipado de JavaScript desarrollado por Microsoft.',
            applications: ['Web Apps', 'Enterprise', 'SPAs', 'Backend'],
            jobMarket: 85,
            community: 90
        },
        'javascript': {
            name: 'JavaScript',
            typeSafety: 30,
            learningCurve: 80,
            ecosystem: 95,
            performance: 90,
            color: '#f7df1e',
            description: 'Lenguaje de programación interpretado para desarrollo web.',
            applications: ['Web', 'Mobile', 'Desktop', 'IoT'],
            jobMarket: 95,
            community: 95
        },
        'flow': {
            name: 'Flow',
            typeSafety: 70,
            learningCurve: 50,
            ecosystem: 60,
            performance: 80,
            color: '#ff6b6b',
            description: 'Checker de tipos estático para JavaScript de Facebook.',
            applications: ['Facebook Projects', 'Large Codebases', 'Incremental Adoption'],
            jobMarket: 30,
            community: 50
        },
        'dart': {
            name: 'Dart',
            typeSafety: 85,
            learningCurve: 60,
            ecosystem: 70,
            performance: 85,
            color: '#00c4b3',
            description: 'Lenguaje de programación optimizado para UI de Google.',
            applications: ['Flutter Apps', 'Google Projects', 'Cross-platform'],
            jobMarket: 40,
            community: 75
        }
    };

    // Inicializar componentes
    initTypeScriptParticles();
    initTypeScriptVersions();
    initEventListeners();
    initAnimations();
    initTimeline();
    initLanguageSimulation();
    initCharts();

    // Función para inicializar partículas de TypeScript
    function initTypeScriptParticles() {
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
                    // Partículas de TypeScript (azul)
                    color = `rgba(49, 120, 198, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 6 + 3;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de JavaScript (amarillo)
                    color = `rgba(247, 223, 30, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Partículas especiales (verde - compatibilidad)
                    color = `rgba(45, 125, 70, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'typescript' : type < 0.85 ? 'javascript' : 'special'
                });
            }
        }
        
        function drawTypeSymbol(ctx, x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            // Dibujar símbolo de TypeScript (TS)
            ctx.beginPath();
            
            // Letra T
            ctx.moveTo(-size * 0.8, -size * 0.6);
            ctx.lineTo(size * 0.8, -size * 0.6);
            ctx.moveTo(0, -size * 0.6);
            ctx.lineTo(0, size * 0.6);
            
            // Letra S (simplificada)
            ctx.moveTo(size * 0.3, size * 0.2);
            ctx.quadraticCurveTo(size * 0.6, size * 0.4, size * 0.3, size * 0.6);
            
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
            ctx.strokeStyle = 'rgba(49, 120, 198, 0.1)';
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
                
                // Dibujar partícula como símbolo TypeScript
                ctx.save();
                
                if (particle.type === 'special') {
                    // Gradiente para partículas especiales
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(45, 125, 70, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(45, 125, 70, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                drawTypeSymbol(ctx, particle.x, particle.y, particle.size, particle.rotation);
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
        console.log('Partículas de TypeScript inicializadas');
    }

    // Función para inicializar versiones de TypeScript
    function initTypeScriptVersions() {
        const container = document.getElementById('productionInfo');
        if (!container) {
            console.error('Contenedor de versiones no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-ts-accent-light">Evolución de Versiones de TypeScript</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="versionsGrid">
                ${typescriptVersionsData.map(version => `
                    <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-ts-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-method="${version.title}">
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
        
        console.log('Versiones de TypeScript inicializadas: ' + typescriptVersionsData.length);
    }

    // Función para mostrar detalle de versión
    function showVersionDetail(versionName) {
        const version = typescriptVersionsData.find(v => v.title === versionName);
        if (!version) return;
        
        const details = {
            'TypeScript 0.8': {
                features: 'Tipos básicos, compilación a JavaScript, compatibilidad con JS',
                impact: 'Introduce el concepto de JavaScript con tipado estático',
                adoption: 'Comunidad inicialmente escéptica pero curiosa',
                size: '~150kb',
                npmDownloads: '~5k/mes'
            },
            'TypeScript 1.0': {
                features: 'Tipos genéricos, módulos, decoradores experimentales',
                impact: 'Establece TypeScript como tecnología seria para desarrollo empresarial',
                adoption: 'Adopción significativa tras anuncio de Angular 2.0',
                size: '~250kb',
                npmDownloads: '~50k/mes'
            },
            'TypeScript 2.0': {
                features: 'Tipos no-nullables, control de flujo, async/await',
                impact: 'Revoluciona el sistema de tipos con features de lenguajes modernos',
                adoption: 'Adopción masiva en la comunidad JavaScript',
                size: '~350kb',
                npmDownloads: '~500k/mes'
            },
            'TypeScript 3.0': {
                features: 'Tuplas con etiquetas, parámetros rest en tuplas, proyectos de referencia',
                impact: 'Mejora significativa en desarrollo de aplicaciones complejas',
                adoption: 'Convertido en estándar para desarrollo frontend profesional',
                size: '~400kb',
                npmDownloads: '~2M/mes'
            },
            'TypeScript 4.0': {
                features: 'Tipos variádicos en tuplas, labeled tuple elements, mejoras de productividad',
                impact: 'Lleva el sistema de tipos a un nuevo nivel de expresividad',
                adoption: 'Adopción casi universal en proyectos TypeScript',
                size: '~450kb',
                npmDownloads: '~5M/mes'
            },
            'TypeScript 5.0': {
                features: 'Decoradores ES2022, const type parameters, mejoras de performance',
                impact: 'Alcanza madurez completa como superconjunto de JavaScript',
                adoption: 'Estándar de facto para desarrollo JavaScript profesional',
                size: '~500kb',
                npmDownloads: '~10M/mes'
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
                            <h4 class="font-bold mb-2 text-ts-accent-light">Características Principales:</h4>
                            <p class="text-text-secondary">${versionDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${versionDetails.impact ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-ts-accent-light">Impacto</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.impact}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.adoption ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-ts-accent-light">Adopción</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.adoption}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.size ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-ts-accent-light">Tamaño</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.size}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.npmDownloads ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-ts-accent-light">Descargas NPM</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.npmDownloads}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-ts-accent-light"># Legado de ${version.title}:</span><br>
                            <span class="text-text-secondary">• ${version.title === 'TypeScript 0.8' ? 'Introdujo JavaScript con tipado estático' : version.title === 'TypeScript 1.0' ? 'Estableció TypeScript como opción empresarial' : version.title === 'TypeScript 2.0' ? 'Revolucionó el sistema de tipos' : version.title === 'TypeScript 3.0' ? 'Mejoró desarrollo de aplicaciones complejas' : version.title === 'TypeScript 4.0' ? 'Llevó tipos a nuevo nivel de expresividad' : 'Alcanzó madurez completa como superconjunto de JS'}</span><br>
                            <span class="text-text-secondary">• ${version.title === 'TypeScript 0.8' ? 'Cambió percepción sobre tipado en JavaScript' : version.title === 'TypeScript 1.0' ? 'Atrajo a desarrolladores de lenguajes tipados' : version.title === 'TypeScript 2.0' ? 'Permitió código más seguro y mantenible' : version.title === 'TypeScript 3.0' ? 'Facilitó refactoring en codebases grandes' : version.title === 'TypeScript 4.0' ? 'Mejoró experiencia de desarrollo significativamente' : 'Estableció nuevo estándar para JavaScript profesional'}</span>
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
            lineChart = createLineChart(ctx, getLanguageComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('typescript'));
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
            initLanguageSimulation();
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
                        titleColor: '#4d8bd6',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3178c6',
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
                        titleColor: '#4d8bd6',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3178c6',
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
                        titleColor: '#4d8bd6',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3178c6',
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
    function getLanguageComparisonData() {
        const languages = ['TypeScript', 'JavaScript', 'Flow', 'Dart'];
        const typeSafety = [95, 30, 70, 85];
        const ecosystem = [90, 95, 60, 70];
        
        return {
            labels: languages,
            datasets: [
                {
                    label: 'Type Safety',
                    data: typeSafety,
                    borderColor: '#3178c6',
                    backgroundColor: 'rgba(49, 120, 198, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Ecosistema',
                    data: ecosystem,
                    borderColor: '#2d7d46',
                    backgroundColor: 'rgba(45, 125, 70, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar
    function getRadarChartData(language) {
        const langData = languagesData[language];
        
        return {
            labels: ['Type Safety', 'Curva Aprendizaje', 'Ecosistema', 'Performance', 'Mercado Laboral'],
            datasets: [{
                label: langData.name,
                data: [
                    langData.typeSafety,
                    langData.learningCurve,
                    langData.ecosystem,
                    langData.performance,
                    langData.jobMarket
                ],
                backgroundColor: `${langData.color}20`,
                borderColor: langData.color,
                pointBackgroundColor: langData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: langData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
        };
    }

    // Función para inicializar simulación de lenguajes
    function initLanguageSimulation() {
        console.log('Inicializando simulación de lenguajes...');
        
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
        
        // Botones de lenguaje
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
            document.querySelector('[data-material="typescript"]').classList.add('active');
            
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
        
        console.log('Simulación de lenguajes inicializada');
    }

    // Función para actualizar simulación
    function updateSimulation() {
        const activeMaterial = document.querySelector('.material-btn.active');
        if (!activeMaterial) return;
        
        const langType = activeMaterial.dataset.material;
        const size = parseInt(document.getElementById('thicknessSlider').value);
        const experience = parseInt(document.getElementById('areaSlider').value);
        const time = parseInt(document.getElementById('puritySlider').value);
        
        const langData = languagesData[langType];
        if (!langData) return;
        
        // Calcular valores basados en el lenguaje y parámetros
        let typeSafety = langData.typeSafety;
        let learningCurve = langData.learningCurve;
        let ecosystem = langData.ecosystem;
        
        // Ajustar por tamaño del proyecto
        if (size > 66) { // Proyecto grande
            if (langType === 'typescript') {
                typeSafety *= 1.1; // Mejor para proyectos grandes
            } else if (langType === 'javascript') {
                typeSafety *= 0.7; // Peor para proyectos grandes
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
            if (langType === 'javascript') {
                ecosystem *= 1.1; // Mejor para desarrollo rápido
            }
        }
        
        // Limitar valores
        typeSafety = Math.min(Math.max(typeSafety, 0), 100);
        learningCurve = Math.min(Math.max(learningCurve, 0), 100);
        ecosystem = Math.min(Math.max(ecosystem, 0), 100);
        
        // Actualizar barras y valores
        document.getElementById('strengthValue').textContent = 
            typeSafety >= 85 ? 'Excelente' : 
            typeSafety >= 70 ? 'Bueno' : 
            typeSafety >= 50 ? 'Aceptable' : 'Limitado';
        document.getElementById('strengthBar').style.width = typeSafety + '%';
        
        document.getElementById('conductivityValue').textContent = 
            learningCurve >= 80 ? 'Fácil' : 
            learningCurve >= 60 ? 'Media' : 
            learningCurve >= 40 ? 'Desafiante' : 'Difícil';
        document.getElementById('conductivityBar').style.width = learningCurve + '%';
        
        document.getElementById('transparencyValue').textContent = 
            ecosystem >= 90 ? 'Extenso' : 
            ecosystem >= 75 ? 'Amplio' : 
            ecosystem >= 50 ? 'Moderado' : 'Limitado';
        document.getElementById('transparencyBar').style.width = ecosystem + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(langType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let conclusionText = '';
        
        if (langType === 'typescript') {
            conclusionText = 'TypeScript ofrece el mejor equilibrio entre type safety y compatibilidad con JavaScript';
        } else if (langType === 'javascript') {
            conclusionText = 'JavaScript es ideal para desarrollo rápido pero menos seguro en proyectos grandes';
        } else if (langType === 'flow') {
            conclusionText = 'Flow es bueno para proyectos Facebook específicos pero ecosistema limitado';
        } else if (langType === 'dart') {
            conclusionText = 'Dart es excelente para Flutter pero menos adoptado en desarrollo web general';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-ts-accent-tertiary mr-2"></ion-icon>
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
        const langType = activeMaterial ? activeMaterial.dataset.material : 'typescript';
        const langData = languagesData[langType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentTypeSafety = parseFloat(document.getElementById('strengthBar').style.width);
                const newTypeSafety = Math.min(100, currentTypeSafety * 1.05);
                document.getElementById('strengthBar').style.width = newTypeSafety + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${langData.name} analizado exitosamente`, 'success');
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
        const langType = activeMaterial ? activeMaterial.dataset.material : 'typescript';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-ts-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-ts-accent-light">Adopción por Año</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-ts-accent-secondary-light">Comparación de Métricas</h4>
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
                        <h4 class="font-bold mb-3 text-ts-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes lenguajes para desarrollo web. 
                            TypeScript destaca en type safety y mantenibilidad, mientras que JavaScript sobresale en ecosistema y adopción. 
                            Cada lenguaje tiene ventajas específicas según el tipo de proyecto y equipo.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-ts-accent to-ts-accent-dark text-white font-bold rounded-xl shadow-lg shadow-ts-accent/30 hover:shadow-xl hover:shadow-ts-accent/40 transition-all duration-300">
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
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(langType));
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
        const years = [2012, 2014, 2016, 2018, 2020, 2022, 2024];
        const tsAdoption = [1, 10, 30, 50, 65, 75, 78]; // Porcentaje
        const jsAdoption = [95, 94, 92, 90, 88, 86, 85]; // Porcentaje
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'TypeScript (% desarrolladores)',
                    data: tsAdoption,
                    borderColor: '#3178c6',
                    backgroundColor: 'rgba(49, 120, 198, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'JavaScript (% desarrolladores)',
                    data: jsAdoption,
                    borderColor: '#f7df1e',
                    backgroundColor: 'rgba(247, 223, 30, 0.1)',
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
        const languages = ['TypeScript', 'JavaScript', 'Flow', 'Dart'];
        const typeSafety = [95, 30, 70, 85];
        const learningCurve = [65, 80, 50, 60];
        const jobMarket = [85, 95, 30, 40];
        
        return {
            labels: languages,
            datasets: [
                {
                    label: 'Type Safety',
                    data: typeSafety,
                    backgroundColor: 'rgba(49, 120, 198, 0.7)',
                    borderColor: '#3178c6',
                    borderWidth: 1
                },
                {
                    label: 'Facilidad de Aprendizaje',
                    data: learningCurve,
                    backgroundColor: 'rgba(45, 125, 70, 0.7)',
                    borderColor: '#2d7d46',
                    borderWidth: 1
                },
                {
                    label: 'Mercado Laboral',
                    data: jobMarket,
                    backgroundColor: 'rgba(247, 223, 30, 0.7)',
                    borderColor: '#f7df1e',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(language) {
        const langData = languagesData[language];
        
        // Datos para todos los lenguajes
        const labels = ['Type Safety', 'Facilidad', 'Ecosistema', 'Performance', 'Trabajo'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'TypeScript',
                    data: [95, 65, 90, 85, 85],
                    backgroundColor: 'rgba(49, 120, 198, 0.1)',
                    borderColor: '#3178c6',
                    pointBackgroundColor: '#3178c6',
                    borderWidth: 1
                },
                {
                    label: 'JavaScript',
                    data: [30, 80, 95, 90, 95],
                    backgroundColor: 'rgba(247, 223, 30, 0.1)',
                    borderColor: '#f7df1e',
                    pointBackgroundColor: '#f7df1e',
                    borderWidth: 1
                },
                {
                    label: 'Flow',
                    data: [70, 50, 60, 80, 30],
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderColor: '#ff6b6b',
                    pointBackgroundColor: '#ff6b6b',
                    borderWidth: 1
                },
                {
                    label: langData.name,
                    data: [
                        langData.typeSafety,
                        langData.learningCurve,
                        langData.ecosystem,
                        langData.performance,
                        langData.jobMarket
                    ],
                    backgroundColor: `${langData.color}40`,
                    borderColor: langData.color,
                    pointBackgroundColor: langData.color,
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
            "2012: Lanzamiento de TypeScript por Microsoft...",
            "2013: Adopción inicial y feedback de comunidad...",
            "2014: TypeScript 1.0 y adopción por Angular 2.0...",
            "2015: Crecimiento de DefinitelyTyped...",
            "2016: TypeScript 2.0 con tipos no-nullables...",
            "2017: Adopción masiva en proyectos empresariales...",
            "2018: TypeScript 3.0 y mejora de experiencia...",
            "2019: Convertido en estándar de facto...",
            "2020: TypeScript 4.0 con mejoras de productividad...",
            "2022: Dominio en desarrollo frontend profesional...",
            "2024: TypeScript 5.0+ y futuro del JavaScript tipado..."
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
            { type: 'Adopción global', value: '1% → 78%', color: '#3178c6', icon: 'trending-up-outline' },
            { type: 'Paquetes con TS', value: '0 → 500k', color: '#2d7d46', icon: 'cube-outline' },
            { type: 'Descargas semanales', value: '0 → 10M', color: '#e34c26', icon: 'download-outline' },
            { type: 'Reducción de bugs', value: '0% → ~40%', color: '#8b5cf6', icon: 'bug-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-ts-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de TypeScript (2012-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de TypeScript desde su lanzamiento hasta su dominio actual:</p>
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
                        <span class="text-ts-accent-light"># Tendencias futuras (2025-2030):</span><br>
                        <span class="text-text-secondary">• TypeScript-first en frameworks principales</span><br>
                        <span class="text-text-secondary">• Mejor inferencia de tipos con IA</span><br>
                        <span class="text-text-secondary">• TypeScript en tiempo de ejecución</span><br>
                        <span class="text-text-secondary">• Integración con WebAssembly tipado</span><br>
                        <span class="text-text-secondary">• TypeScript para aplicaciones de misión crítica</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-ts-accent to-ts-accent-dark text-white font-bold rounded-xl shadow-lg shadow-ts-accent/30">
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
    console.log('Aplicación TypeScriptLab inicializada correctamente');
});