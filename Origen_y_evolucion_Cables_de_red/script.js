document.addEventListener('DOMContentLoaded', function() {
    console.log('CableLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de tipos de cables
    const cablesData = [
        {
            icon: 'swap-horizontal-outline',
            title: 'UTP Cat5e',
            description: 'Estandar Ethernet 1Gbps, ideal para redes domésticas y pequeñas oficinas.',
            color: '#3498db',
            status: 'Estandar',
            year: '2001'
        },
        {
            icon: 'swap-horizontal-outline',
            title: 'UTP Cat6',
            description: 'Hasta 10Gbps a 55m, blindaje mejorado para menos interferencia.',
            color: '#2980b9',
            status: 'Popular',
            year: '2002'
        },
        {
            icon: 'shield-outline',
            title: 'STP Cat7',
            description: 'Blindaje individual por par, 10Gbps a 100m, para entornos ruidosos.',
            color: '#f39c12',
            status: 'Especializado',
            year: '2010'
        },
        {
            icon: 'swap-horizontal-outline',
            title: 'UTP Cat8',
            description: 'Hasta 40Gbps a 30m, para centros de datos y aplicaciones críticas.',
            color: '#e74c3c',
            status: 'Avanzado',
            year: '2016'
        },
        {
            icon: 'flashlight-outline',
            title: 'Fibra Monómooda',
            description: 'Larga distancia (hasta 100km), alta velocidad, backbone de telecom.',
            color: '#9b59b6',
            status: 'Profesional',
            year: '1980s'
        },
        {
            icon: 'flashlight-outline',
            title: 'Fibra Multimoda',
            description: 'Corta/media distancia, mayor ancho de banda que cobre, centros de datos.',
            color: '#8e44ad',
            status: 'Empresarial',
            year: '1980s'
        }
    ];

    // Datos de tecnologías para simulación
    const cableTypesData = {
        'utp': {
            name: 'UTP Cat6',
            speed: 80,
            distance: 20,
            interferenceImmunity: 60,
            cost: 90,
            color: '#3498db',
            description: 'Cable de par trenzado sin blindaje, estándar para redes Ethernet.',
            applications: ['Oficinas', 'Hogares', 'Escuelas', 'Redes LAN'],
            installation: 90,
            bandwidth: 80
        },
        'fiber': {
            name: 'Fibra Óptica',
            speed: 99,
            distance: 95,
            interferenceImmunity: 99,
            cost: 40,
            color: '#9b59b6',
            description: 'Transmisión por pulsos de luz, máxima velocidad y distancia.',
            applications: ['Backbone', 'Telecom', 'Campus', 'Larga Distancia'],
            installation: 40,
            bandwidth: 99
        },
        'coaxial': {
            name: 'Coaxial RG6',
            speed: 50,
            distance: 70,
            interferenceImmunity: 70,
            cost: 80,
            color: '#e74c3c',
            description: 'Cable con conductor central aislado, usado para TV y datos.',
            applications: ['TV Cable', 'CCTV', 'Internet', 'Redes Antiguas'],
            installation: 70,
            bandwidth: 60
        },
        'stp': {
            name: 'STP Cat7',
            speed: 85,
            distance: 30,
            interferenceImmunity: 85,
            cost: 50,
            color: '#f39c12',
            description: 'Par trenzado con blindaje, para entornos con alta interferencia.',
            applications: ['Hospitales', 'Industria', 'Laboratorios', 'Entornos Críticos'],
            installation: 60,
            bandwidth: 85
        }
    };

    // Inicializar componentes
    initCableParticles();
    initCableTypes();
    initEventListeners();
    initAnimations();
    initTimeline();
    initCableSimulation();
    initCharts();

    // Función para inicializar partículas de transmisión
    function initCableParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 50;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const type = Math.random();
                let color, size, speed;
                
                if (type < 0.4) {
                    // Partículas de datos (azul)
                    color = `rgba(52, 152, 219, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 5 + 2;
                    speed = (Math.random() - 0.5) * 0.5;
                } else if (type < 0.7) {
                    // Partículas de fibra óptica (púrpura)
                    color = `rgba(155, 89, 182, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.6;
                } else {
                    // Partículas de señal (amarillo)
                    color = `rgba(243, 156, 18, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 6 + 3;
                    speed = (Math.random() - 0.5) * 0.4;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.3,
                    color: color,
                    pulseSpeed: Math.random() * 0.05 + 0.02,
                    pulseOffset: Math.random() * Math.PI * 2,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    type: type < 0.4 ? 'data' : type < 0.7 ? 'fiber' : 'signal'
                });
            }
        }
        
        function drawSignal(ctx, x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            // Dibujar señal de onda
            ctx.beginPath();
            ctx.moveTo(-size, 0);
            for (let i = -size; i <= size; i += 2) {
                const waveHeight = Math.sin(i * 0.3) * (size / 2);
                ctx.lineTo(i, waveHeight);
            }
            
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
            ctx.strokeStyle = 'rgba(52, 152, 219, 0.1)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
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
                
                if (particle.type === 'fiber') {
                    // Gradiente para fibra óptica
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(155, 89, 182, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(155, 89, 182, 0)');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    
                    if (particle.type === 'signal') {
                        // Dibujar como señal de onda
                        drawSignal(ctx, particle.x, particle.y, particle.size, particle.rotation);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                        ctx.stroke();
                    } else {
                        // Dibujar como partícula normal
                        ctx.beginPath();
                        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
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
        console.log('Partículas de transmisión inicializadas');
    }

    // Función para inicializar tipos de cables
    function initCableTypes() {
        const container = document.getElementById('cablesInfo');
        if (!container) {
            console.error('Contenedor de cables no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-cable-accent-light">Tipos de Cables de Red</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="cablesGrid">
                ${cablesData.map(cable => `
                    <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-cable-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-cable="${cable.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${cable.color}20; color: ${cable.color};">
                                <ion-icon name="${cable.icon}" class="text-xl"></ion-icon>
                            </div>
                            <div>
                                <h4 class="font-bold">${cable.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${cable.color}20; color: ${cable.color};">${cable.status}</span>
                                    <span class="text-xs text-text-muted">${cable.year}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${cable.description}</p>
                        ${cable.title.includes('UTP') || cable.title.includes('STP') ? 
                            `<div class="mt-3 cable-visual"></div>` : 
                            `<div class="mt-3 fiber-visual"></div>`
                        }
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de cables
        document.querySelectorAll('.method-card').forEach(card => {
            card.addEventListener('click', function() {
                const cableName = this.getAttribute('data-cable');
                showCableDetail(cableName);
            });
        });
        
        console.log('Tipos de cables inicializados: ' + cablesData.length);
    }

    // Función para mostrar detalle de cable
    function showCableDetail(cableName) {
        const cable = cablesData.find(c => c.title === cableName);
        if (!cable) return;
        
        const details = {
            'UTP Cat5e': {
                speed: 'Hasta 1 Gbps',
                distance: '100 metros',
                frequency: '100 MHz',
                applications: 'Redes domésticas, pequeñas oficinas, PoE',
                cost: 'Bajo'
            },
            'UTP Cat6': {
                speed: 'Hasta 10 Gbps (55m)',
                distance: '55m para 10Gbps, 100m para 1Gbps',
                frequency: '250 MHz',
                applications: 'Oficinas medianas, centros educativos, redes empresariales',
                cost: 'Moderado'
            },
            'STP Cat7': {
                speed: 'Hasta 10 Gbps',
                distance: '100 metros',
                frequency: '600 MHz',
                applications: 'Centros de datos, entornos industriales, hospitales',
                cost: 'Alto'
            },
            'UTP Cat8': {
                speed: 'Hasta 40 Gbps',
                distance: '30 metros',
                frequency: '2000 MHz',
                applications: 'Centros de datos, backbone corto, aplicaciones críticas',
                cost: 'Muy alto'
            },
            'Fibra Monómooda': {
                speed: '10-100+ Gbps',
                distance: 'Hasta 100 km',
                wavelength: '1310nm, 1550nm',
                applications: 'Telecomunicaciones, backbone, redes metropolitanas',
                cost: 'Alto'
            },
            'Fibra Multimoda': {
                speed: '10-100 Gbps',
                distance: 'Hasta 2 km',
                wavelength: '850nm, 1300nm',
                applications: 'Centros de datos, campus universitarios, redes empresariales',
                cost: 'Moderado-Alto'
            }
        };
        
        const cableDetails = details[cable.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${cable.color}20; color: ${cable.color};">
                        <ion-icon name="${cable.icon}" class="text-3xl"></ion-icon>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${cable.color};">${cable.title}</h2>
                        <p class="text-text-secondary mt-1">${cable.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        ${cableDetails.speed ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-cable-accent-light">Velocidad</h4>
                                <p class="text-text-secondary text-sm">${cableDetails.speed}</p>
                            </div>
                        ` : ''}
                        
                        ${cableDetails.distance ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-cable-accent-light">Distancia Máxima</h4>
                                <p class="text-text-secondary text-sm">${cableDetails.distance}</p>
                            </div>
                        ` : ''}
                        
                        ${cableDetails.frequency ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-cable-accent-light">Frecuencia</h4>
                                <p class="text-text-secondary text-sm">${cableDetails.frequency}</p>
                            </div>
                        ` : cableDetails.wavelength ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-cable-accent-light">Longitud de Onda</h4>
                                <p class="text-text-secondary text-sm">${cableDetails.wavelength}</p>
                            </div>
                        ` : ''}
                        
                        ${cableDetails.cost ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-cable-accent-light">Costo Relativo</h4>
                                <p class="text-text-secondary text-sm">${cableDetails.cost}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${cableDetails.applications ? `
                        <div>
                            <h4 class="font-bold mb-2 text-cable-accent-light">Aplicaciones Principales:</h4>
                            <p class="text-text-secondary">${cableDetails.applications}</p>
                        </div>
                    ` : ''}
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-cable-accent-light"># Características Técnicas:</span><br>
                            <span class="text-text-secondary">• ${cable.title.includes('UTP') ? 'Sin blindaje, económico, fácil instalación' : cable.title.includes('STP') ? 'Con blindaje, mayor protección interferencia' : 'Transmisión por luz, inmunidad electromagnética total'}</span><br>
                            <span class="text-text-secondary">• ${cable.title.includes('Cat5e') ? 'Estándar mínimo para Gigabit Ethernet' : cable.title.includes('Cat6') ? 'Balance ideal costo-rendimiento' : cable.title.includes('Cat7') ? 'Máximo rendimiento cobre con blindaje' : cable.title.includes('Cat8') ? 'Para centros de datos y 40Gbps' : cable.title.includes('Monómooda') ? 'Para larga distancia, backbone principal' : 'Para corta distancia, alta densidad centros datos'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${cable.color};">
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
            lineChart = createLineChart(ctx, getCableComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('utp'));
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
            initCableSimulation();
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
                        titleColor: '#5dade2',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3498db',
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
                        titleColor: '#5dade2',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3498db',
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
                        titleColor: '#5dade2',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3498db',
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
    function getCableComparisonData() {
        const cables = ['UTP Cat6', 'Fibra Óptica', 'Coaxial', 'STP Cat7'];
        const speed = [80, 99, 50, 85];
        const distance = [20, 95, 70, 30];
        
        return {
            labels: cables,
            datasets: [
                {
                    label: 'Velocidad Relativa',
                    data: speed,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Distancia Relativa',
                    data: distance,
                    borderColor: '#9b59b6',
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar
    function getRadarChartData(cableType) {
        const cableData = cableTypesData[cableType];
        
        return {
            labels: ['Velocidad', 'Distancia', 'Inmunidad Interf.', 'Costo', 'Facilidad Instalación'],
            datasets: [{
                label: cableData.name,
                data: [
                    cableData.speed,
                    cableData.distance,
                    cableData.interferenceImmunity,
                    cableData.cost,
                    cableData.installation
                ],
                backgroundColor: `${cableData.color}20`,
                borderColor: cableData.color,
                pointBackgroundColor: cableData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: cableData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
        };
    }

    // Función para inicializar simulación de cables
    function initCableSimulation() {
        console.log('Inicializando simulación de cables...');
        
        // Elementos del DOM
        const cableButtons = document.querySelectorAll('.material-btn');
        const distanceSlider = document.getElementById('distanceSlider');
        const distanceValue = document.getElementById('distanceValue');
        const bandwidthSlider = document.getElementById('bandwidthSlider');
        const bandwidthValue = document.getElementById('bandwidthValue');
        const interferenceSlider = document.getElementById('interferenceSlider');
        const interferenceValue = document.getElementById('interferenceValue');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        
        // Verificar que todos los elementos existan
        if (!distanceSlider || !cableButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        function updateSliderValue(slider, valueElement, type) {
            slider.addEventListener('input', function() {
                const value = parseInt(this.value);
                
                if (type === 'distance') {
                    if (value < 33) {
                        valueElement.textContent = 'Corta (100m)';
                    } else if (value < 66) {
                        valueElement.textContent = 'Media (500m)';
                    } else {
                        valueElement.textContent = 'Larga (2km+)';
                    }
                } else if (type === 'bandwidth') {
                    if (value < 33) {
                        valueElement.textContent = '100 Mbps';
                    } else if (value < 66) {
                        valueElement.textContent = '1 Gbps';
                    } else {
                        valueElement.textContent = '10 Gbps+';
                    }
                } else if (type === 'interference') {
                    if (value < 33) {
                        valueElement.textContent = 'Bajo';
                    } else if (value < 66) {
                        valueElement.textContent = 'Moderado';
                    } else {
                        valueElement.textContent = 'Alto';
                    }
                }
                updateSimulation();
            });
        }
        
        updateSliderValue(distanceSlider, distanceValue, 'distance');
        updateSliderValue(bandwidthSlider, bandwidthValue, 'bandwidth');
        updateSliderValue(interferenceSlider, interferenceValue, 'interference');
        
        // Botones de tipo de cable
        cableButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                cableButtons.forEach(b => b.classList.remove('active'));
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
            distanceSlider.value = 20;
            distanceValue.textContent = 'Corta (100m)';
            bandwidthSlider.value = 30;
            bandwidthValue.textContent = '1 Gbps';
            interferenceSlider.value = 20;
            interferenceValue.textContent = 'Bajo';
            cableButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-cable="utp"]').classList.add('active');
            
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
        
        console.log('Simulación de cables inicializada');
    }

    // Función para actualizar simulación
    function updateSimulation() {
        const activeCable = document.querySelector('.material-btn.active');
        if (!activeCable) return;
        
        const cableType = activeCable.dataset.cable;
        const distance = parseInt(document.getElementById('distanceSlider').value);
        const bandwidth = parseInt(document.getElementById('bandwidthSlider').value);
        const interference = parseInt(document.getElementById('interferenceSlider').value);
        
        const cableData = cableTypesData[cableType];
        if (!cableData) return;
        
        // Calcular valores basados en el cable y parámetros
        let speed = cableData.speed;
        let maxDistance = cableData.distance;
        let immunity = cableData.interferenceImmunity;
        
        // Ajustar por distancia requerida
        if (distance > 66) { // Distancia larga
            if (cableType === 'fiber') {
                speed *= 1.1; // Mejor para larga distancia
            } else {
                speed *= 0.7; // Peor para larga distancia
                maxDistance *= 0.5;
            }
        }
        
        // Ajustar por ancho de banda requerido
        if (bandwidth > 66) { // Alta velocidad requerida
            if (cableType === 'fiber' || cableType === 'stp') {
                speed *= 1.2; // Mejor para alta velocidad
            } else if (cableType === 'coaxial') {
                speed *= 0.6; // Peor para alta velocidad
            }
        }
        
        // Ajustar por nivel de interferencia
        if (interference > 66) { // Alta interferencia
            if (cableType === 'stp' || cableType === 'fiber') {
                immunity *= 1.2; // Mejor para alta interferencia
            } else if (cableType === 'utp') {
                immunity *= 0.7; // Peor para alta interferencia
            }
        }
        
        // Limitar valores
        speed = Math.min(Math.max(speed, 0), 100);
        maxDistance = Math.min(Math.max(maxDistance, 0), 100);
        immunity = Math.min(Math.max(immunity, 0), 100);
        
        // Actualizar barras y valores
        document.getElementById('speedValue').textContent = 
            speed >= 90 ? '10+ Gbps' : 
            speed >= 75 ? '10 Gbps' : 
            speed >= 50 ? '1 Gbps' : '100 Mbps';
        document.getElementById('speedBar').style.width = speed + '%';
        
        document.getElementById('distanceMaxValue').textContent = 
            maxDistance >= 90 ? '100+ km' : 
            maxDistance >= 70 ? '2-100 km' : 
            maxDistance >= 40 ? '500m-2km' : '100m';
        document.getElementById('distanceBar').style.width = maxDistance + '%';
        
        document.getElementById('immunityValue').textContent = 
            immunity >= 90 ? 'Excelente' : 
            immunity >= 75 ? 'Alta' : 
            immunity >= 50 ? 'Media' : 'Baja';
        document.getElementById('immunityBar').style.width = immunity + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(cableType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let conclusionText = '';
        
        if (cableType === 'utp') {
            conclusionText = 'UTP Cat6 es ideal para redes locales de oficina con distancia moderada y velocidad hasta 10Gbps';
        } else if (cableType === 'fiber') {
            conclusionText = 'Fibra Óptica es óptima para larga distancia, alta velocidad y entornos con interferencia';
        } else if (cableType === 'coaxial') {
            conclusionText = 'Coaxial es adecuado para TV y redes antiguas, limitado para datos de alta velocidad';
        } else if (cableType === 'stp') {
            conclusionText = 'STP Cat7 es perfecto para entornos industriales o con alta interferencia electromagnética';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-cable-accent-tertiary mr-2"></ion-icon>
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
        const activeCable = document.querySelector('.material-btn.active');
        const cableType = activeCable ? activeCable.dataset.cable : 'utp';
        const cableData = cableTypesData[cableType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentSpeed = parseFloat(document.getElementById('speedBar').style.width);
                const newSpeed = Math.min(100, currentSpeed * 1.05);
                document.getElementById('speedBar').style.width = newSpeed + '%';
                
                // Actualizar texto de velocidad
                document.getElementById('speedValue').textContent = 
                    newSpeed >= 90 ? '10+ Gbps (optimizado)' : 
                    newSpeed >= 75 ? '10 Gbps (optimizado)' : 
                    newSpeed >= 50 ? '1 Gbps (optimizado)' : '100 Mbps';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${cableData.name} analizado exitosamente`, 'success');
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
        
        const activeCable = document.querySelector('.material-btn.active');
        const cableType = activeCable ? activeCable.dataset.cable : 'utp';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-cable-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-cable-accent-light">Evolución de Velocidad</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-cable-accent-secondary-light">Comparación de Características</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedBarChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-xl p-4">
                        <h4 class="font-bold text-lg mb-4 text-center text-fiber-accent">Análisis Multidimensional (Radar)</h4>
                        <div class="w-full h-80">
                            <canvas id="detailedRadarChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/40 rounded-lg p-4">
                        <h4 class="font-bold mb-3 text-cable-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes tipos de cables de red. 
                            La fibra óptica destaca en velocidad y distancia, mientras que UTP sobresale en costo y facilidad de instalación. 
                            Cada tipo de cable tiene ventajas específicas según el entorno y requisitos del proyecto.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-cable-accent to-cable-accent-dark text-white font-bold rounded-xl shadow-lg shadow-cable-accent/30 hover:shadow-xl hover:shadow-cable-accent/40 transition-all duration-300">
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
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(cableType));
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
        const years = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024];
        const utpSpeed = [10, 100, 1000, 1000, 10000, 10000, 25000, 40000]; // Mbps
        const fiberSpeed = [100, 1000, 2500, 10000, 40000, 100000, 200000, 400000]; // Mbps
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'UTP (Mbps)',
                    data: utpSpeed.map(s => Math.min(s / 4000 * 100, 100)), // Normalizar a escala 0-100
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Fibra (Mbps)',
                    data: fiberSpeed.map(s => Math.min(s / 400000 * 100, 100)), // Normalizar a escala 0-100
                    borderColor: '#9b59b6',
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
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
        const cables = ['UTP Cat6', 'Fibra Óptica', 'Coaxial', 'STP Cat7'];
        const speed = [80, 99, 50, 85];
        const cost = [90, 40, 80, 50];
        const installation = [90, 40, 70, 60];
        
        return {
            labels: cables,
            datasets: [
                {
                    label: 'Velocidad Relativa',
                    data: speed,
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: '#3498db',
                    borderWidth: 1
                },
                {
                    label: 'Costo (inverso)',
                    data: cost,
                    backgroundColor: 'rgba(231, 76, 60, 0.7)',
                    borderColor: '#e74c3c',
                    borderWidth: 1
                },
                {
                    label: 'Facilidad Instalación',
                    data: installation,
                    backgroundColor: 'rgba(243, 156, 18, 0.7)',
                    borderColor: '#f39c12',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(cableType) {
        const cableData = cableTypesData[cableType];
        
        // Datos para todos los tipos de cables
        const labels = ['Velocidad', 'Distancia', 'Inmunidad', 'Costo', 'Instalación', 'Ancho Banda'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'UTP Cat6',
                    data: [80, 20, 60, 90, 90, 80],
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderColor: '#3498db',
                    pointBackgroundColor: '#3498db',
                    borderWidth: 1
                },
                {
                    label: 'Fibra Óptica',
                    data: [99, 95, 99, 40, 40, 99],
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    borderColor: '#9b59b6',
                    pointBackgroundColor: '#9b59b6',
                    borderWidth: 1
                },
                {
                    label: 'Coaxial',
                    data: [50, 70, 70, 80, 70, 60],
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderColor: '#e74c3c',
                    pointBackgroundColor: '#e74c3c',
                    borderWidth: 1
                },
                {
                    label: cableData.name,
                    data: [
                        cableData.speed,
                        cableData.distance,
                        cableData.interferenceImmunity,
                        cableData.cost,
                        cableData.installation,
                        cableData.bandwidth
                    ],
                    backgroundColor: `${cableData.color}40`,
                    borderColor: cableData.color,
                    pointBackgroundColor: cableData.color,
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
            simulateEvolutionBtn.addEventListener('click', simulateCableEvolution);
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
        const compareCablesBtn = document.getElementById('compareCablesBtn');
        if (compareCablesBtn) {
            compareCablesBtn.addEventListener('click', () => {
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

    // Función para simulación de evolución de cables
    function simulateCableEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando evolución...';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1844: Primer cable telegráfico...",
            "1858: Primer cable transatlántico telegráfico...",
            "1936: Cable coaxial para televisión...",
            "1956: Primer cable telefónico transatlántico...",
            "1973: Ethernet y cable coaxial grueso...",
            "1983: UTP Cat3 para Ethernet 10BASE-T...",
            "1990: Primer cable de fibra óptica transatlántico...",
            "1995: UTP Cat5 para 100Mbps...",
            "2002: UTP Cat6 para Gigabit Ethernet...",
            "2010: Fibra óptica FTTH masiva...",
            "2016: Cat8 para 40Gbps en cobre...",
            "2024: Fibra óptica de terabit y cables submarinos globales..."
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
            showCableEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 6500);
    }

    // Función para mostrar resultados de evolución de cables
    function showCableEvolutionResults() {
        const results = [
            { type: 'Velocidad Máxima', value: '45 bps → 400 Tbps', color: '#3498db', icon: 'speedometer-outline' },
            { type: 'Distancia Máxima', value: '64km → 100km+', color: '#9b59b6', icon: 'expand-outline' },
            { type: 'Cables Submarinos', value: '1 → 450+', color: '#f39c12', icon: 'water-outline' },
            { type: 'Tráfico Internet', value: '0% → 99%', color: '#e74c3c', icon: 'git-network-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-cable-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de Cables (1844-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de cables de red desde el telégrafo hasta la fibra óptica moderna:</p>
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
                        <span class="text-cable-accent-light"># Tendencias futuras (2025-2030):</span><br>
                        <span class="text-text-secondary">• Fibra óptica de petabit por segundo</span><br>
                        <span class="text-text-secondary">• Cables inteligentes con diagnóstico integrado</span><br>
                        <span class="text-text-secondary">• Materiales superconductores a temperatura ambiente</span><br>
                        <span class="text-text-secondary">• Cables submarinos con repetidores cuánticos</span><br>
                        <span class="text-text-secondary">• Integración energía y datos en un solo cable</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-cable-accent to-cable-accent-dark text-white font-bold rounded-xl shadow-lg shadow-cable-accent/30">
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
    console.log('Aplicación CableLab inicializada correctamente');
});