document.addEventListener('DOMContentLoaded', function() {
    console.log('WebView Evolution: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de tecnologías de WebView
    const technologiesData = [
        {
            icon: 'fa-apple',
            title: 'WKWebView',
            description: 'Motor WebView moderno de Apple para iOS y macOS. Reemplazó a UIWebView con mejor rendimiento y seguridad.',
            color: '#3b82f6',
            status: 'Activo',
            release: '2014'
        },
        {
            icon: 'fa-android',
            title: 'Android WebView',
            description: 'Componente basado en Chromium para Android. Actualizable independientemente del sistema operativo.',
            color: '#10b981',
            status: 'Activo',
            release: '2008'
        },
        {
            icon: 'fa-windows',
            title: 'WebView2',
            description: 'Control WebView de Microsoft basado en Chromium Edge. Para aplicaciones de escritorio Windows.',
            color: '#0078D4',
            status: 'Activo',
            release: '2020'
        },
        {
            icon: 'fa-cube',
            title: 'Cordova',
            description: 'Framework para apps móviles híbridas usando WebViews y JavaScript. Permite acceso a APIs nativas.',
            color: '#8b5cf6',
            status: 'Activo',
            release: '2011'
        },
        {
            icon: 'fa-bolt',
            title: 'Ionic',
            description: 'Framework UI para apps híbridas. Combina Angular/React/Vue con Capacitor/Cordova.',
            color: '#4a7dff',
            status: 'Activo',
            release: '2013'
        },
        {
            icon: 'fa-react',
            title: 'React Native WebView',
            description: 'Componente WebView para React Native. Permite contenido web en apps React Native.',
            color: '#61dafb',
            status: 'Activo',
            release: '2015'
        }
    ];

    // Datos de tecnologías para simulación
    const simulationData = {
        'wkwebview': {
            name: 'WKWebView (iOS)',
            performance: 92,
            developmentTime: 2.8,
            compatibility: 95,
            color: '#3b82f6',
            description: 'Motor WebKit optimizado con aislamiento de procesos. Mejor rendimiento y seguridad.',
            applications: ['Apps iOS nativas', 'Navegadores internos', 'Visualizadores web'],
            speed: 90,
            security: 95,
            apiAccess: 85,
            memory: 80
        },
        'android': {
            name: 'Android WebView',
            performance: 88,
            developmentTime: 3.2,
            compatibility: 98,
            color: '#10b981',
            description: 'Basado en Chromium. Actualizable via Google Play Store. Amplia compatibilidad.',
            applications: ['Apps Android nativas', 'Visualizadores PDF', 'Apps con contenido web'],
            speed: 85,
            security: 90,
            apiAccess: 88,
            memory: 75
        },
        'cordova': {
            name: 'Apache Cordova',
            performance: 75,
            developmentTime: 1.5,
            compatibility: 85,
            color: '#8b5cf6',
            description: 'Framework para apps híbridas multiplataforma. Permite desarrollo rápido.',
            applications: ['Apps híbridas', 'Prototipos rápidos', 'Aplicaciones empresariales'],
            speed: 70,
            security: 80,
            apiAccess: 90,
            memory: 65
        },
        'webview2': {
            name: 'WebView2 (Windows)',
            performance: 91,
            developmentTime: 2.5,
            compatibility: 90,
            color: '#0078D4',
            description: 'Basado en Chromium Edge. Para aplicaciones de escritorio Windows modernas.',
            applications: ['Apps de escritorio', 'Herramientas de desarrollo', 'Aplicaciones empresariales'],
            speed: 88,
            security: 92,
            apiAccess: 82,
            memory: 85
        }
    };

    // Inicializar componentes
    initWebParticles();
    initFrameworks();
    initEventListeners();
    initAnimations();
    initTimeline();
    initTechnologySimulation();
    initCharts();

    // Función para inicializar partículas web
    function initWebParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 100;
        
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
                    // Partículas web (azul)
                    color = `rgba(59, 130, 246, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 1;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.8) {
                    // Partículas de datos (verde)
                    color = `rgba(16, 185, 129, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 1.5 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Partículas de código (naranja)
                    color = `rgba(245, 158, 11, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.6;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.2,
                    color: color,
                    pulseSpeed: Math.random() * 0.04 + 0.02,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.5 ? 'web' : type < 0.8 ? 'data' : 'code'
                });
            }
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
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
                        const opacity = 0.2 * (1 - distance / 80);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.stroke();
                    }
                }
            }
            
            // Restaurar color para partículas
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
            
            // Actualizar y dibujar partículas
            particles.forEach(particle => {
                // Movimiento
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.4 + 0.6;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Gradiente para partículas de código
                if (particle.type === 'code') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(245, 158, 11, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
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
        console.log('Partículas web inicializadas');
    }

    // Función para inicializar frameworks
    function initFrameworks() {
        const container = document.getElementById('frameworksInfo');
        if (!container) {
            console.error('Contenedor de frameworks no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-webview-accent-light">Tecnologías y Frameworks de WebView</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="frameworksGrid">
                ${technologiesData.map(tech => `
                    <div class="framework-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-webview-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-framework="${tech.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${tech.color}20; color: ${tech.color};">
                                <i class="fab ${tech.icon} text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold">${tech.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${tech.color}20; color: ${tech.color};">${tech.status}</span>
                                    <span class="text-xs text-text-muted">${tech.release}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${tech.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de framework
        document.querySelectorAll('.framework-card').forEach(card => {
            card.addEventListener('click', function() {
                const techName = this.getAttribute('data-framework');
                showTechnologyDetail(techName);
            });
        });
        
        console.log('Tecnologías inicializadas: ' + technologiesData.length);
    }

    // Función para mostrar detalle de tecnología
    function showTechnologyDetail(techName) {
        const tech = technologiesData.find(t => t.title === techName);
        if (!tech) return;
        
        const details = {
            'WKWebView': {
                features: 'Motor WebKit, aislamiento de procesos, JavaScript JIT, soporte WebAssembly',
                languages: 'Swift, Objective-C, JavaScript',
                users: 'Apple, desarrolladores iOS/macOS, apps empresariales',
                useCase: 'Apps nativas iOS/macOS con contenido web, navegadores internos'
            },
            'Android WebView': {
                features: 'Basado en Chromium, actualizable via Play Store, soporte PWAs, modo incógnito',
                languages: 'Java, Kotlin, JavaScript',
                users: 'Google, desarrolladores Android, empresas de todo el mundo',
                useCase: 'Apps Android con contenido web, visualizadores, apps híbridas'
            },
            'WebView2': {
                features: 'Basado en Chromium Edge, actualizaciones automáticas, soporte DevTools',
                languages: 'C#, C++, JavaScript, TypeScript',
                users: 'Microsoft, empresas Windows, desarrolladores de escritorio',
                useCase: 'Aplicaciones de escritorio Windows, herramientas empresariales'
            },
            'Cordova': {
                features: 'Multiplataforma, plugins para APIs nativas, comunidad activa, herramientas CLI',
                languages: 'JavaScript, HTML, CSS',
                users: 'Adobe, desarrolladores multiplataforma, startups',
                useCase: 'Apps híbridas, prototipos rápidos, aplicaciones con código web existente'
            },
            'Ionic': {
                features: 'UI components, integración con frameworks web, Capacitor runtime',
                languages: 'TypeScript, JavaScript, HTML, CSS',
                users: 'Ionic, empresas, desarrolladores web',
                useCase: 'Apps con UI consistente, aplicaciones empresariales, apps de consumo'
            },
            'React Native WebView': {
                features: 'Integración con React Native, comunicación JS-Nativo, personalización',
                languages: 'JavaScript, TypeScript',
                users: 'Facebook, desarrolladores React Native',
                useCase: 'Apps React Native con contenido web, visualizadores embebidos'
            }
        };
        
        const techDetails = details[tech.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${tech.color}20; color: ${tech.color};">
                        <i class="fab ${tech.icon} text-3xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${tech.color};">${tech.title}</h2>
                        <p class="text-text-secondary mt-1">${tech.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${techDetails.features ? `
                        <div>
                            <h4 class="font-bold mb-2 text-webview-accent-light">Características principales:</h4>
                            <p class="text-text-secondary">${techDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    ${techDetails.languages ? `
                        <div>
                            <h4 class="font-bold mb-2 text-webview-accent-light">Lenguajes soportados:</h4>
                            <p class="text-text-secondary">${techDetails.languages}</p>
                        </div>
                    ` : ''}
                    
                    ${techDetails.users ? `
                        <div>
                            <h4 class="font-bold mb-2 text-webview-accent-light">Usuarios destacados:</h4>
                            <p class="text-text-secondary">${techDetails.users}</p>
                        </div>
                    ` : ''}
                    
                    ${techDetails.useCase ? `
                        <div>
                            <h4 class="font-bold mb-2 text-webview-accent-light">Casos de uso principales:</h4>
                            <p class="text-text-secondary">${techDetails.useCase}</p>
                        </div>
                    ` : ''}
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-webview-accent-light"># Ejemplo de uso:</span><br>
                            <span class="text-text-secondary">// Crear una WebView en ${tech.title}</span><br>
                            <span class="text-text-secondary">const webview = new ${tech.title.includes('WK') ? 'WKWebView()' : tech.title.includes('Android') ? 'WebView(context)' : 'WebView()'};</span><br>
                            <span class="text-text-secondary">webview.loadUrl("https://example.com");</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg">
                        <h4 class="font-bold mb-2 text-webview-accent-light">Estadísticas clave:</h4>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="text-center p-2 bg-gray-800/50 rounded">
                                <div class="text-xs text-text-muted">Cuota de mercado</div>
                                <div class="font-bold" style="color: ${tech.color};">${tech.title === 'WKWebView' ? '100% iOS' : tech.title === 'Android WebView' ? '95% Android' : 'N/A'}</div>
                            </div>
                            <div class="text-center p-2 bg-gray-800/50 rounded">
                                <div class="text-xs text-text-muted">Rendimiento</div>
                                <div class="font-bold" style="color: ${tech.color};">${tech.title === 'WKWebView' ? '95/100' : tech.title === 'Android WebView' ? '88/100' : '75/100'}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${tech.color};">
                        <i class="fas fa-check mr-2"></i> Cerrar
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
            radarChart = createRadarChart(ctx, getRadarChartData('wkwebview'));
        }
        
        console.log('Gráficos inicializados');
    }

    // Función para cargar Chart.js dinámicamente
    function loadChartJS() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            console.log('Chart.js cargado correctamente');
            // Re-inicializar gráficos después de cargar Chart.js
            initCharts();
            // Re-inicializar simulación para actualizar gráficos
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
                        titleColor: '#60a5fa',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3b82f6',
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
                        titleColor: '#60a5fa',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3b82f6',
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
                        titleColor: '#60a5fa',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3b82f6',
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
        const technologies = ['WKWebView', 'Android', 'Cordova', 'WebView2'];
        const performance = [92, 88, 75, 91];
        const developmentSpeed = [85, 80, 95, 82];
        
        return {
            labels: technologies,
            datasets: [
                {
                    label: 'Rendimiento',
                    data: performance,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Velocidad Desarrollo',
                    data: developmentSpeed,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar
    function getRadarChartData(technology) {
        const techData = simulationData[technology];
        
        return {
            labels: ['Rendimiento', 'Seguridad', 'Acceso API', 'Uso Memoria', 'Compatibilidad'],
            datasets: [{
                label: techData.name,
                data: [
                    techData.performance,
                    techData.security,
                    techData.apiAccess,
                    100 - (techData.memory / 100 * 100) + 20, // Ajuste para visualización
                    techData.compatibility
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
        const technologyButtons = document.querySelectorAll('.technology-btn');
        const complexitySlider = document.getElementById('complexitySlider');
        const complexityValue = document.getElementById('complexityValue');
        const apiSlider = document.getElementById('apiSlider');
        const apiValue = document.getElementById('apiValue');
        const sizeSlider = document.getElementById('sizeSlider');
        const sizeValue = document.getElementById('sizeValue');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        
        // Verificar que todos los elementos existan
        if (!complexitySlider || !technologyButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        function updateSliderValue(slider, valueElement, labels = ['Bajo', 'Medio', 'Alto']) {
            slider.addEventListener('input', function() {
                const value = parseInt(this.value);
                let label;
                if (value <= 3) label = labels[0];
                else if (value <= 7) label = labels[1];
                else label = labels[2];
                valueElement.textContent = label;
                updateSimulation();
            });
        }
        
        updateSliderValue(complexitySlider, complexityValue, ['Sencilla', 'Media', 'Compleja']);
        updateSliderValue(apiSlider, apiValue, ['Mínimo', 'Moderado', 'Extenso']);
        updateSliderValue(sizeSlider, sizeValue, ['Pequeño', 'Mediano', 'Grande']);
        
        // Botones de tecnología
        technologyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                technologyButtons.forEach(b => b.classList.remove('active'));
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
            complexitySlider.value = 5;
            complexityValue.textContent = 'Media';
            apiSlider.value = 5;
            apiValue.textContent = 'Moderado';
            sizeSlider.value = 5;
            sizeValue.textContent = 'Mediano';
            technologyButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-tech="wkwebview"]').classList.add('active');
            
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
        const activeTech = document.querySelector('.technology-btn.active');
        if (!activeTech) return;
        
        const techType = activeTech.dataset.tech;
        const complexity = parseInt(document.getElementById('complexitySlider').value);
        const apiUsage = parseInt(document.getElementById('apiSlider').value);
        const size = parseInt(document.getElementById('sizeSlider').value);
        
        const techData = simulationData[techType];
        if (!techData) return;
        
        // Calcular valores basados en la tecnología y parámetros
        let performance = techData.performance;
        let developmentTime = techData.developmentTime;
        let compatibility = techData.compatibility;
        
        // Ajustar por complejidad
        if (complexity > 5) {
            performance -= (complexity - 5) * 0.5;
            developmentTime += (complexity - 5) * 0.1;
        } else {
            performance += (5 - complexity) * 0.3;
        }
        
        // Ajustar por uso de APIs
        if (apiUsage > 5) {
            if (techType === 'cordova') {
                performance -= (apiUsage - 5) * 0.2;
            } else {
                performance -= (apiUsage - 5) * 0.1;
            }
            developmentTime += (apiUsage - 5) * 0.15;
        }
        
        // Ajustar por tamaño del proyecto
        if (size > 5) {
            if (techType === 'cordova') {
                performance -= (size - 5) * 0.3;
            } else {
                performance -= (size - 5) * 0.15;
            }
            developmentTime += (size - 5) * 0.2;
        }
        
        // Limitar valores
        performance = Math.min(Math.max(performance, 60), 98);
        developmentTime = Math.min(Math.max(developmentTime, 1), 6);
        compatibility = Math.min(Math.max(compatibility, 80), 99);
        
        // Actualizar barras y valores
        document.getElementById('performanceValue').textContent = Math.round(performance) + '%';
        document.getElementById('performanceBar').style.width = performance + '%';
        
        document.getElementById('timeValue').textContent = developmentTime.toFixed(1) + ' meses';
        document.getElementById('timeBar').style.width = (developmentTime / 6 * 100) + '%';
        
        document.getElementById('compatibilityValue').textContent = compatibility + '%';
        document.getElementById('compatibilityBar').style.width = compatibility + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(techType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        conclusion.innerHTML = `
            <i class="fas fa-lightbulb text-webview-accent-tertiary mr-2"></i>
            ${techData.description}
        `;
    }

    // Función para ejecutar simulación completa
    function runSimulation() {
        const btn = document.getElementById('runSimulationBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Simulando...';
        btn.disabled = true;
        
        // Mostrar animación de progreso
        const activeTech = document.querySelector('.technology-btn.active');
        const techType = activeTech ? activeTech.dataset.tech : 'wkwebview';
        const techData = simulationData[techType];
        
        // Simular proceso de optimización
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentPerformance = parseFloat(document.getElementById('performanceValue').textContent);
                const newPerformance = Math.min(currentPerformance + 3, 98);
                
                document.getElementById('performanceValue').textContent = Math.round(newPerformance) + '%';
                document.getElementById('performanceBar').style.width = newPerformance + '%';
                
                // Reducir tiempo de desarrollo (optimización)
                const currentTime = parseFloat(document.getElementById('timeValue').textContent);
                const newTime = Math.max(currentTime - 0.3, 1);
                
                document.getElementById('timeValue').textContent = newTime.toFixed(1) + ' meses';
                document.getElementById('timeBar').style.width = (newTime / 6 * 100) + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${techData.name} optimizada exitosamente`, 'success');
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
        
        const activeTech = document.querySelector('.technology-btn.active');
        const techType = activeTech ? activeTech.dataset.tech : 'wkwebview';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-webview-accent-light">
                    <i class="fas fa-chart-bar mr-2"></i> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-webview-accent-light">Rendimiento por Tecnología</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-webview-accent-secondary-light">Comparación de Métricas</h4>
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
                        <h4 class="font-bold mb-3 text-webview-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes tecnologías de WebView. 
                            WKWebView destaca en rendimiento y seguridad para iOS, mientras que Android WebView ofrece 
                            amplia compatibilidad. Cordova es ideal para desarrollo rápido multiplataforma, y WebView2 
                            brinda excelente rendimiento en aplicaciones de escritorio Windows.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-webview-accent to-webview-accent-dark text-white font-bold rounded-xl shadow-lg shadow-webview-accent/30 hover:shadow-xl hover:shadow-webview-accent/40 transition-all duration-300">
                        <i class="fas fa-download mr-2"></i> Exportar Datos
                    </button>
                    <button class="close-chart-btn px-6 py-3 bg-gray-800 border border-border text-text-primary font-bold rounded-xl hover:bg-gray-700 transition-all duration-300">
                        <i class="fas fa-times mr-2"></i> Cerrar
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
        const years = [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024];
        const wkwebview = [40, 50, 75, 85, 90, 92, 93, 95];
        const android = [65, 70, 75, 80, 85, 87, 88, 88];
        const cordova = [80, 85, 82, 78, 76, 75, 75, 75];
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'WKWebView',
                    data: wkwebview,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Android WebView',
                    data: android,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Cordova',
                    data: cordova,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de barras detallado
    function getDetailedBarChartData() {
        const technologies = ['WKWebView', 'Android', 'Cordova', 'WebView2'];
        const performance = [92, 88, 75, 91];
        const security = [95, 90, 80, 92];
        const devSpeed = [85, 80, 95, 82];
        
        return {
            labels: technologies,
            datasets: [
                {
                    label: 'Rendimiento (%)',
                    data: performance,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                },
                {
                    label: 'Seguridad',
                    data: security,
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: '#10b981',
                    borderWidth: 1
                },
                {
                    label: 'Vel. Desarrollo',
                    data: devSpeed,
                    backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    borderColor: '#f59e0b',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(technology) {
        const techData = simulationData[technology];
        
        // Datos para todas las tecnologías
        const labels = ['Rendimiento', 'Seguridad', 'Acceso API', 'Uso Memoria', 'Compatibilidad'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'WKWebView',
                    data: [92, 95, 85, 80, 95],
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: '#3b82f6',
                    pointBackgroundColor: '#3b82f6',
                    borderWidth: 1
                },
                {
                    label: 'Android WebView',
                    data: [88, 90, 88, 75, 98],
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderColor: '#10b981',
                    pointBackgroundColor: '#10b981',
                    borderWidth: 1
                },
                {
                    label: 'Cordova',
                    data: [75, 80, 90, 65, 85],
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderColor: '#8b5cf6',
                    pointBackgroundColor: '#8b5cf6',
                    borderWidth: 1
                },
                {
                    label: techData.name,
                    data: [
                        techData.performance,
                        techData.security,
                        techData.apiAccess,
                        100 - (techData.memory / 100 * 100) + 20,
                        techData.compatibility
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
        const compareTechnologiesBtn = document.getElementById('compareTechnologiesBtn');
        if (compareTechnologiesBtn) {
            compareTechnologiesBtn.addEventListener('click', () => {
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
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Simulando evolución...';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "2008: iPhone SDK y UIWebView...",
            "2009: Android WebView inicial...",
            "2011: PhoneGap 1.0 (Apache Cordova)...",
            "2013: Ionic Framework...",
            "2014: WKWebView (iOS 8)...",
            "2015: React Native WebView...",
            "2016: Progressive Web Apps...",
            "2017: Android System WebView actualizable...",
            "2019: Capacitor (sucesor de Cordova)...",
            "2020: WebView2 (Microsoft)...",
            "2023: WebViews con IA integrada..."
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> ${steps[step]}`;
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
            { type: 'Apps con WebView (2008-2024)', value: '0 → 42%', color: '#3b82f6', icon: 'fa-chart-bar' },
            { type: 'Rendimiento WebViews', value: '~40% → ~90%', color: '#10b981', icon: 'fa-bullseye' },
            { type: 'Tiempo desarrollo multiplataforma', value: 'Meses → Semanas', color: '#f59e0b', icon: 'fa-tachometer-alt' },
            { type: 'APIs nativas accesibles', value: '5 → 100+', color: '#ef4444', icon: 'fa-cogs' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-webview-accent-light">
                    <i class="fas fa-expand-arrows-alt mr-2"></i> Evolución de las WebViews
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de las tecnologías WebView desde 2008 hasta la actualidad:</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    ${results.map(result => `
                        <div class="bg-gray-900/50 rounded-xl p-4 text-center">
                            <div class="text-2xl md:text-3xl mb-2" style="color: ${result.color};">
                                <i class="fas ${result.icon}"></i>
                            </div>
                            <div class="text-2xl md:text-3xl font-black mb-1" style="background: linear-gradient(90deg, ${result.color}, ${result.color}99); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${result.value}</div>
                            <div class="text-sm text-text-secondary">${result.type}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="bg-gray-900/50 rounded-lg p-4 mb-6">
                    <div class="font-mono text-sm space-y-1">
                        <span class="text-webview-accent-light"># Tendencias futuras (2024-2030):</span><br>
                        <span class="text-text-secondary">• WebViews con IA integrada para contenido inteligente</span><br>
                        <span class="text-text-secondary">• Mejor integración con WebAssembly para rendimiento nativo</span><br>
                        <span class="text-text-secondary">• WebViews sin servidor para apps más ligeras</span><br>
                        <span class="text-text-secondary">• Mayor seguridad y privacidad por defecto</span><br>
                        <span class="text-text-secondary">• Mejor soporte para realidad aumentada y virtual</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-webview-accent to-webview-accent-dark text-white font-bold rounded-xl shadow-lg shadow-webview-accent/30">
                        <i class="fas fa-check mr-2"></i> Cerrar
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
    console.log('Aplicación WebView Evolution inicializada correctamente');
});