document.addEventListener('DOMContentLoaded', function() {
    console.log('VueLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de versiones principales de Vue.js
    const vueVersionsData = [
        {
            icon: 'rocket-outline',
            title: 'Vue 0.x',
            description: 'Versiones iniciales experimentales. Primer release público en febrero de 2014.',
            color: '#42b883',
            status: 'Experimental',
            year: '2014'
        },
        {
            icon: 'shield-checkmark-outline',
            title: 'Vue 1.0',
            description: 'Primera versión estable "Evangelion". Sistema de componentes básico y directivas.',
            color: '#ff6b6b',
            status: 'Estable',
            year: '2015'
        },
        {
            icon: 'flash-outline',
            title: 'Vue 2.0',
            description: 'Virtual DOM, mejoras de rendimiento, SSR y ecosistema en crecimiento.',
            color: '#ffd93d',
            status: 'Popular',
            year: '2016'
        },
        {
            icon: 'cube-outline',
            title: 'Vue 3.0',
            description: 'Composition API, mejor rendimiento, TypeScript nativo y bundle más pequeño.',
            color: '#8b5cf6',
            status: 'Moderno',
            year: '2020'
        },
        {
            icon: 'layers-outline',
            title: 'Vue 3.3+',
            description: 'Mejoras en TypeScript, Reactivity Transform y mejor experiencia de desarrollo.',
            color: '#00a8ff',
            status: 'Actual',
            year: '2023'
        },
        {
            icon: 'sparkles-outline',
            title: 'Vue 4.x',
            description: 'Futuras mejoras en rendimiento, bundling y experiencia de desarrollo.',
            color: '#ff4757',
            status: 'Futuro',
            year: '2025+'
        }
    ];

    // Datos de frameworks para simulación
    const frameworksData = {
        'vue': {
            name: 'Vue.js',
            learningCurve: 9.2,
            performance: 8.7,
            ecosystem: 8.5,
            bundleSize: 33,
            color: '#42b883',
            description: 'Framework progresivo de JavaScript para construir interfaces de usuario.',
            applications: ['SPAs', 'Aplicaciones Empresariales', 'Prototipado Rápido', 'Migración Progresiva'],
            flexibility: 9.5,
            documentation: 9.8,
            popularity: 8.0
        },
        'react': {
            name: 'React',
            learningCurve: 7.5,
            performance: 8.9,
            ecosystem: 9.5,
            bundleSize: 45,
            color: '#61dafb',
            description: 'Biblioteca de JavaScript para construir interfaces de usuario, mantenida por Facebook.',
            applications: ['Aplicaciones a Gran Escala', 'Aplicaciones Móviles', 'Dashboard Complejos', 'Redes Sociales'],
            flexibility: 8.0,
            documentation: 8.5,
            popularity: 9.5
        },
        'angular': {
            name: 'Angular',
            learningCurve: 6.0,
            performance: 8.5,
            ecosystem: 8.8,
            bundleSize: 95,
            color: '#dd0031',
            description: 'Framework de aplicaciones web mantenido por Google, basado en TypeScript.',
            applications: ['Aplicaciones Empresariales', 'Sistemas Internos', 'Proyectos Grandes', 'Aplicaciones Bancarias'],
            flexibility: 7.0,
            documentation: 8.0,
            popularity: 7.0
        },
        'svelte': {
            name: 'Svelte',
            learningCurve: 8.5,
            performance: 9.2,
            ecosystem: 6.5,
            bundleSize: 2,
            color: '#ff3e00',
            description: 'Framework compilado que convierte componentes en JavaScript imperativo eficiente.',
            applications: ['Aplicaciones Livianas', 'Sitios Estáticos', 'Prototipos', 'Aplicaciones con Restricciones de Tamaño'],
            flexibility: 7.5,
            documentation: 7.8,
            popularity: 6.5
        }
    };

    // Inicializar componentes
    initVueParticles();
    initVueVersions();
    initEventListeners();
    initAnimations();
    initTimeline();
    initFrameworkSimulation();
    initCharts();

    // Función para inicializar partículas de Vue.js
    function initVueParticles() {
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
                    // Partículas de Vue (verde)
                    color = `rgba(66, 184, 131, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Partículas de JavaScript (amarillo)
                    color = `rgba(255, 217, 61, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.2;
                } else {
                    // Partículas especiales (azul Vue)
                    color = `rgba(53, 73, 94, ${Math.random() * 0.3 + 0.1})`;
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
                    sides: 6, // Hexágonos
                    type: type < 0.6 ? 'vue' : type < 0.85 ? 'js' : 'special'
                });
            }
        }
        
        function drawHexagon(ctx, x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
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
            ctx.strokeStyle = 'rgba(66, 184, 131, 0.1)';
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
                
                // Dibujar partícula como hexágono
                ctx.save();
                
                if (particle.type === 'special') {
                    // Gradiente para partículas especiales
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(53, 73, 94, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(53, 73, 94, 0)');
                    ctx.fillStyle = gradient;
                } else if (particle.type === 'vue') {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                } else {
                    ctx.fillStyle = `rgba(255, 217, 61, ${currentAlpha})`;
                }
                
                drawHexagon(ctx, particle.x, particle.y, particle.size, particle.rotation);
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
        console.log('Partículas de Vue.js inicializadas');
    }

    // Función para inicializar versiones de Vue.js
    function initVueVersions() {
        const container = document.getElementById('versionsInfo');
        if (!container) {
            console.error('Contenedor de versiones no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-vue-primary-light">Principales Versiones de Vue.js</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="versionsGrid">
                ${vueVersionsData.map(version => `
                    <div class="version-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-vue-primary/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-version="${version.title}">
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
        
        console.log('Versiones de Vue.js inicializadas: ' + vueVersionsData.length);
    }

    // Función para mostrar detalle de versión
    function showVersionDetail(versionName) {
        const version = vueVersionsData.find(v => v.title === versionName);
        if (!version) return;
        
        const details = {
            'Vue 0.x': {
                features: 'Sistema reactivo básico, binding bidireccional, componentes simples',
                innovations: 'Primer framework progresivo, sintaxis inspirada en Angular',
                adoption: 'Comunidad pequeña pero entusiasta',
                impact: 'Demostró que un framework podía ser incremental'
            },
            'Vue 1.0': {
                features: 'Sistema de componentes, directivas v-if/v-for/v-model, transiciones',
                innovations: 'Virtual DOM ligero, separación clara de responsabilidades',
                adoption: 'Crecimiento orgánico en Asia primero',
                impact: 'Estableció las bases del ecosistema Vue'
            },
            'Vue 2.0': {
                features: 'Virtual DOM completo, Server-Side Rendering, Vuex, Vue Router',
                innovations: 'Render functions, mejoras de rendimiento significativas',
                adoption: 'Popularidad global, adopción empresarial',
                impact: 'Competencia directa con React y Angular'
            },
            'Vue 3.0': {
                features: 'Composition API, Teleport, Suspense, Fragmentos, mejor TypeScript',
                innovations: 'Sistema reactivo basado en Proxy, tree-shaking mejorado',
                adoption: 'Migración gradual desde Vue 2, nueva generación de devs',
                impact: 'Vue más rápido y flexible que nunca'
            },
            'Vue 3.3+': {
                features: 'SFC Improvements, Reactivity Transform, defineModel, mejoras en TypeScript',
                innovations: 'DX mejorado, menos boilerplate, mejor soporte para Volar',
                adoption: 'Adopción masiva en nuevos proyectos',
                impact: 'Experiencia de desarrollo moderna y productiva'
            },
            'Vue 4.x': {
                features: 'Mejoras de rendimiento, nuevo sistema de bundling, mejor compatibilidad',
                innovations: 'Enfoque en aplicaciones nativas, mejor soporte para micro-frontends',
                adoption: 'Futuro del ecosistema Vue',
                impact: 'Mantener relevancia frente a nuevos competidores'
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
                            <h4 class="font-bold mb-2 text-vue-primary-light">Características Principales:</h4>
                            <p class="text-text-secondary">${versionDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${versionDetails.innovations ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-vue-primary-light">Innovaciones</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.innovations}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.adoption ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-vue-primary-light">Adopción</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.adoption}</p>
                            </div>
                        ` : ''}
                        
                        ${versionDetails.impact ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-vue-primary-light">Impacto</h4>
                                <p class="text-text-secondary text-sm">${versionDetails.impact}</p>
                            </div>
                        ` : ''}
                        
                        <div class="bg-gray-900/50 rounded-lg p-3">
                            <h4 class="font-bold text-sm mb-1 text-vue-primary-light">Año</h4>
                            <p class="text-text-secondary text-sm">${version.year}</p>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-vue-primary-light"># Logros de ${version.title}:</span><br>
                            <span class="text-text-secondary">• ${version.title === 'Vue 0.x' ? 'Demostró viabilidad del enfoque progresivo' : version.title === 'Vue 1.0' ? 'Estableció sintaxis Vue moderna' : version.title === 'Vue 2.0' ? 'Popularizó Vue globalmente' : version.title === 'Vue 3.0' ? 'Revolucionó rendimiento y flexibilidad' : version.title === 'Vue 3.3+' ? 'Mejoró experiencia desarrollador significativamente' : 'Preparó futuro del ecosistema'}</span><br>
                            <span class="text-text-secondary">• ${version.title === 'Vue 0.x' ? 'Inspiró a una nueva generación de frameworks' : version.title === 'Vue 1.0' ? 'Creó comunidad dedicada' : version.title === 'Vue 2.0' ? 'Competencia real con React/Angular' : version.title === 'Vue 3.0' ? 'TypeScript como ciudadano de primera clase' : version.title === 'Vue 3.3+' ? 'Reducción de boilerplate y mejor DX' : 'Visión a largo plazo para Vue'}</span>
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
            radarChart = createRadarChart(ctx, getRadarChartData('vue'));
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
                        titleColor: '#64d9ac',
                        bodyColor: '#cbd5e1',
                        borderColor: '#42b883',
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
                        max: 10
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
                        max: 10,
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
                        titleColor: '#64d9ac',
                        bodyColor: '#cbd5e1',
                        borderColor: '#42b883',
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
                        titleColor: '#64d9ac',
                        bodyColor: '#cbd5e1',
                        borderColor: '#42b883',
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
                        max: 10
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
        const frameworks = ['Vue.js', 'React', 'Angular', 'Svelte'];
        const learning = [9.2, 7.5, 6.0, 8.5];
        const performance = [8.7, 8.9, 8.5, 9.2];
        
        return {
            labels: frameworks,
            datasets: [
                {
                    label: 'Curva de Aprendizaje',
                    data: learning,
                    borderColor: '#42b883',
                    backgroundColor: 'rgba(66, 184, 131, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Rendimiento',
                    data: performance,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
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
            labels: ['Curva de Aprendizaje', 'Rendimiento', 'Flexibilidad', 'Documentación', 'Popularidad'],
            datasets: [{
                label: frameworkData.name,
                data: [
                    frameworkData.learningCurve,
                    frameworkData.performance,
                    frameworkData.flexibility,
                    frameworkData.documentation,
                    frameworkData.popularity
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
        const complexitySlider = document.getElementById('complexitySlider');
        const complexityValue = document.getElementById('complexityValue');
        const bundleSlider = document.getElementById('bundleSlider');
        const bundleValue = document.getElementById('bundleValue');
        const experienceSlider = document.getElementById('experienceSlider');
        const experienceValue = document.getElementById('experienceValue');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        
        // Verificar que todos los elementos existan
        if (!complexitySlider || !frameworkButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        function updateSliderValue(slider, valueElement) {
            slider.addEventListener('input', function() {
                if (slider.id === 'complexitySlider') {
                    const value = parseInt(this.value);
                    if (value <= 25) {
                        valueElement.textContent = 'Landing Page';
                    } else if (value <= 75) {
                        valueElement.textContent = 'SPA Media';
                    } else {
                        valueElement.textContent = 'Enterprise';
                    }
                } else if (slider.id === 'bundleSlider') {
                    const value = parseInt(this.value);
                    valueElement.textContent = value + ' KB (gzip)';
                } else if (slider.id === 'experienceSlider') {
                    const value = parseInt(this.value);
                    if (value <= 33) {
                        valueElement.textContent = 'Principiante';
                    } else if (value <= 66) {
                        valueElement.textContent = 'Intermedia';
                    } else {
                        valueElement.textContent = 'Avanzada';
                    }
                }
                updateSimulation();
            });
        }
        
        updateSliderValue(complexitySlider, complexityValue);
        updateSliderValue(bundleSlider, bundleValue);
        updateSliderValue(experienceSlider, experienceValue);
        
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
            complexitySlider.value = 50;
            complexityValue.textContent = 'SPA Media';
            bundleSlider.value = 33;
            bundleValue.textContent = '33 KB (gzip)';
            experienceSlider.value = 50;
            experienceValue.textContent = 'Intermedia';
            frameworkButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-framework="vue"]').classList.add('active');
            
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
        const complexity = parseInt(document.getElementById('complexitySlider').value);
        const bundleValue = parseInt(document.getElementById('bundleSlider').value);
        const experience = parseInt(document.getElementById('experienceSlider').value);
        
        const frameworkData = frameworksData[frameworkType];
        if (!frameworkData) return;
        
        // Calcular valores basados en el framework y parámetros
        let learning = frameworkData.learningCurve;
        let performance = frameworkData.performance;
        let ecosystem = frameworkData.ecosystem;
        
        // Ajustar por complejidad del proyecto
        if (complexity > 75) {
            // Proyectos enterprise favorecen ecosistema y estabilidad
            if (frameworkType === 'angular') {
                ecosystem *= 1.1;
                learning *= 0.9;
            } else if (frameworkType === 'vue') {
                ecosystem *= 1.05;
            }
        } else if (complexity < 25) {
            // Proyectos pequeños favorecen facilidad y tamaño
            if (frameworkType === 'svelte') {
                performance *= 1.1;
                learning *= 1.05;
            } else if (frameworkType === 'vue') {
                learning *= 1.05;
            }
        }
        
        // Ajustar por tamaño de bundle
        const bundleFactor = bundleValue / 50; // 50 es el valor medio
        if (frameworkType === 'svelte') {
            performance *= (1.2 - Math.abs(1 - bundleFactor) * 0.2);
        } else {
            performance *= (1.1 - Math.abs(1 - bundleFactor) * 0.1);
        }
        
        // Ajustar por experiencia del equipo
        const experienceFactor = experience / 50;
        if (experienceFactor < 0.8) {
            // Equipos menos experimentados favorecen Vue
            if (frameworkType === 'vue') {
                learning *= 1.1;
            } else if (frameworkType === 'angular') {
                learning *= 0.9;
            }
        } else if (experienceFactor > 1.2) {
            // Equipos experimentados aprovechan mejor React/Angular
            if (frameworkType === 'react' || frameworkType === 'angular') {
                ecosystem *= 1.05;
                performance *= 1.05;
            }
        }
        
        // Limitar valores
        learning = Math.min(Math.max(learning, 0), 10);
        performance = Math.min(Math.max(performance, 0), 10);
        ecosystem = Math.min(Math.max(ecosystem, 0), 10);
        
        // Actualizar barras y valores
        document.getElementById('learningValue').textContent = learning.toFixed(1) + '/10';
        document.getElementById('learningBar').style.width = (learning * 10) + '%';
        
        document.getElementById('performanceValue').textContent = performance.toFixed(1) + '/10';
        document.getElementById('performanceBar').style.width = (performance * 10) + '%';
        
        document.getElementById('ecosystemValue').textContent = ecosystem.toFixed(1) + '/10';
        document.getElementById('ecosystemBar').style.width = (ecosystem * 10) + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(frameworkType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let recommendation = '';
        
        if (frameworkType === 'vue') {
            recommendation = 'Vue.js es ideal para proyectos progresivos y equipos de diversos niveles.';
        } else if (frameworkType === 'react') {
            recommendation = 'React tiene el ecosistema más grande, ideal para proyectos escalables.';
        } else if (frameworkType === 'angular') {
            recommendation = 'Angular es robusto para aplicaciones empresariales complejas.';
        } else {
            recommendation = 'Svelte ofrece máximo rendimiento con bundle mínimo.';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-vue-accent-tertiary mr-2"></ion-icon>
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
        const frameworkType = activeFramework ? activeFramework.dataset.framework : 'vue';
        const frameworkData = frameworksData[frameworkType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentLearning = parseFloat(document.getElementById('learningValue').textContent);
                const currentPerformance = parseFloat(document.getElementById('performanceValue').textContent);
                
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
        const frameworkType = activeFramework ? activeFramework.dataset.framework : 'vue';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-vue-primary-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-vue-primary-light">Métricas por Framework</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-vue-accent-secondary-light">Comparación de Características</h4>
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
                        <h4 class="font-bold mb-3 text-vue-primary-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes frameworks frontend. 
                            Vue.js destaca en curva de aprendizaje y documentación, mientras que React tiene 
                            ventajas en ecosistema y popularidad. Cada framework tiene casos de uso específicos 
                            donde sobresale.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-vue-primary to-vue-primary-dark text-white font-bold rounded-xl shadow-lg shadow-vue-primary/30 hover:shadow-xl hover:shadow-vue-primary/40 transition-all duration-300">
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
        const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
        const vuePopularity = [5, 15, 40, 60, 75, 85, 90, 92, 93, 94];
        const reactPopularity = [70, 75, 80, 85, 88, 90, 92, 93, 94, 95];
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'Vue.js Popularidad',
                    data: vuePopularity,
                    borderColor: '#42b883',
                    backgroundColor: 'rgba(66, 184, 131, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'React Popularidad',
                    data: reactPopularity,
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
        const frameworks = ['Vue.js', 'React', 'Angular', 'Svelte'];
        const learning = [9.2, 7.5, 6.0, 8.5];
        const performance = [8.7, 8.9, 8.5, 9.2];
        const ecosystem = [8.5, 9.5, 8.8, 6.5];
        
        return {
            labels: frameworks,
            datasets: [
                {
                    label: 'Curva de Aprendizaje',
                    data: learning,
                    backgroundColor: 'rgba(66, 184, 131, 0.7)',
                    borderColor: '#42b883',
                    borderWidth: 1
                },
                {
                    label: 'Rendimiento',
                    data: performance,
                    backgroundColor: 'rgba(255, 107, 107, 0.7)',
                    borderColor: '#ff6b6b',
                    borderWidth: 1
                },
                {
                    label: 'Ecosistema',
                    data: ecosystem,
                    backgroundColor: 'rgba(255, 217, 61, 0.7)',
                    borderColor: '#ffd93d',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(framework) {
        const frameworkData = frameworksData[framework];
        
        // Datos para todas los frameworks
        const labels = ['Curva de Aprendizaje', 'Rendimiento', 'Flexibilidad', 'Documentación', 'Popularidad'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Vue.js',
                    data: [9.2, 8.7, 9.5, 9.8, 8.0],
                    backgroundColor: 'rgba(66, 184, 131, 0.1)',
                    borderColor: '#42b883',
                    pointBackgroundColor: '#42b883',
                    borderWidth: 1
                },
                {
                    label: 'React',
                    data: [7.5, 8.9, 8.0, 8.5, 9.5],
                    backgroundColor: 'rgba(97, 218, 251, 0.1)',
                    borderColor: '#61dafb',
                    pointBackgroundColor: '#61dafb',
                    borderWidth: 1
                },
                {
                    label: 'Angular',
                    data: [6.0, 8.5, 7.0, 8.0, 7.0],
                    backgroundColor: 'rgba(221, 0, 49, 0.1)',
                    borderColor: '#dd0031',
                    pointBackgroundColor: '#dd0031',
                    borderWidth: 1
                },
                {
                    label: frameworkData.name,
                    data: [
                        frameworkData.learningCurve,
                        frameworkData.performance,
                        frameworkData.flexibility,
                        frameworkData.documentation,
                        frameworkData.popularity
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
            "2013: Evan You experimenta con Angular...",
            "Feb 2014: Primer release de Vue.js...",
            "Oct 2015: Vue 1.0 'Evangelion' estable...",
            "Sep 2016: Vue 2.0 con Virtual DOM...",
            "2017: Adopción empresarial creciente...",
            "2018: Vue CLI y ecosistema maduro...",
            "2019: Vue 3.0 en desarrollo...",
            "Sep 2020: Vue 3.0 'One Piece' release...",
            "2021: Vite reemplaza Vue CLI...",
            "2023: Vue 3.3+ y adopción masiva..."
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
            { type: 'Descargas NPM', value: '0 → 6.2M/mes', color: '#42b883', icon: 'trending-up-outline' },
            { type: 'Contribuidores GitHub', value: '1 → 400+', color: '#ff6b6b', icon: 'people-outline' },
            { type: 'Empresas que usan Vue', value: '0 → 1.7M+', color: '#ffd93d', icon: 'business-outline' },
            { type: 'Popularidad vs Competidores', value: 'Desconocido → 2do lugar', color: '#8b5cf6', icon: 'trophy-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-vue-primary-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de Vue.js (2014-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de Vue.js desde sus inicios experimentales hasta la actualidad:</p>
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
                        <span class="text-vue-primary-light"># Tendencias futuras (2024-2026):</span><br>
                        <span class="text-text-secondary">• Vue 4.x con mejoras de rendimiento</span><br>
                        <span class="text-text-secondary">• Mejor soporte para micro-frontends</span><br>
                        <span class="text-text-secondary">• Integración más profunda con Vite</span><br>
                        <span class="text-text-secondary">• Vue para aplicaciones nativas</span><br>
                        <span class="text-text-secondary">• Mejor DX con herramientas de desarrollo</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-vue-primary to-vue-primary-dark text-white font-bold rounded-xl shadow-lg shadow-vue-primary/30">
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
    console.log('Aplicación VueLab inicializada correctamente');
});