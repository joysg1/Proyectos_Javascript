document.addEventListener('DOMContentLoaded', function() {
    console.log('Flashlight Evolution: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de hitos de las linternas
    const flashlightMilestonesData = [
        {
            icon: 'flame-outline',
            title: 'Antorchas Prehistóricas',
            description: 'Primera forma de iluminación portátil usando materiales inflamables.',
            color: '#FFD700',
            status: 'Prehistoria',
            year: '40,000 a.C.'
        },
        {
            icon: 'oil-outline',
            title: 'Lámparas de Aceite',
            description: 'Recipientes de piedra o cerámica con aceite y mecha de fibra.',
            color: '#4169E1',
            status: 'Antigüedad',
            year: '3,000 a.C.'
        },
        {
            icon: 'candle-outline',
            title: 'Velas de Cera',
            description: 'Mejora significativa en iluminación doméstica y portátil.',
            color: '#32CD32',
            status: 'Medieval',
            year: '500 d.C.'
        },
        {
            icon: 'bulb-outline',
            title: 'Linterna Eléctrica',
            description: 'David Misell patenta la primera linterna con baterías y bombilla.',
            color: '#FFA500',
            status: 'Revolucionaria',
            year: '1899'
        },
        {
            icon: 'flash-outline',
            title: 'LED de Alta Potencia',
            description: 'Tecnología LED revoluciona eficiencia y durabilidad.',
            color: '#8b5cf6',
            status: 'Moderno',
            year: '1990s'
        },
        {
            icon: 'settings-outline',
            title: 'Linternas Inteligentes',
            description: 'Bluetooth, múltiples modos, y control por aplicación.',
            color: '#FF4757',
            status: 'Actual',
            year: '2010s'
        }
    ];

    // Datos de tecnologías para simulación
    const technologiesData = {
        'led': {
            name: 'LED Moderna',
            efficiency: 95,
            durability: 90,
            cost: 85,
            brightness: 95,
            color: '#FFD700',
            description: 'Diodos emisores de luz de alta eficiencia y larga vida útil.',
            applications: ['Uso general', 'Táctico', 'Emergencias', 'Profesional'],
            marketShare: 85,
            lifespan: 50000
        },
        'incandescent': {
            name: 'Incandescente',
            efficiency: 30,
            durability: 60,
            cost: 95,
            brightness: 70,
            color: '#FF6B6B',
            description: 'Bombilla tradicional con filamento que se calienta para emitir luz.',
            applications: ['Bajo costo', 'Luz cálida', 'Usos específicos'],
            marketShare: 5,
            lifespan: 1000
        },
        'fluorescent': {
            name: 'Fluorescente',
            efficiency: 70,
            durability: 75,
            cost: 80,
            brightness: 80,
            color: '#FFD93D',
            description: 'Tecnología que usa fósforo para convertir luz UV en visible.',
            applications: ['Ahorro energía', 'Iluminación área', 'Comercial'],
            marketShare: 8,
            lifespan: 10000
        },
        'halogen': {
            name: 'Halógena',
            efficiency: 50,
            durability: 70,
            cost: 75,
            brightness: 85,
            color: '#8b5cf6',
            description: 'Variante de incandescente con gas halógeno para mayor eficiencia.',
            applications: ['Automotriz', 'Iluminación precisa', 'Proyección'],
            marketShare: 2,
            lifespan: 2000
        }
    };

    // Inicializar componentes
    initLightParticles();
    initFlashlightMilestones();
    initEventListeners();
    initAnimations();
    initTimeline();
    initTechnologySimulation();
    initCharts();

    // Función para inicializar partículas de luz
    function initLightParticles() {
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
                    // Partículas de luz cálida (amarillo dorado)
                    color = `rgba(255, 215, 0, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 6 + 3;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de luz fría (azul)
                    color = `rgba(65, 105, 225, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Partículas especiales (blanco)
                    color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'warm' : type < 0.85 ? 'cool' : 'special'
                });
            }
        }
        
        function drawLightBeam(ctx, x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            // Dibujar haz de luz
            const beamLength = size * 3;
            const gradient = ctx.createLinearGradient(0, 0, beamLength, 0);
            gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, -size/2, beamLength, size);
            
            // Dibujar fuente de luz
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
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
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.1)';
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
                
                // Dibujar partícula como haz de luz
                ctx.save();
                
                if (particle.type === 'special') {
                    // Gradiente para partículas especiales
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                drawLightBeam(ctx, particle.x, particle.y, particle.size, particle.rotation);
                
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
        console.log('Partículas de luz inicializadas');
    }

    // Función para inicializar hitos de las linternas
    function initFlashlightMilestones() {
        const container = document.getElementById('productionInfo');
        if (!container) {
            console.error('Contenedor de hitos no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-flashlight-accent-light">Hitos en la Evolución de las Linternas</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="milestonesGrid">
                ${flashlightMilestonesData.map(milestone => `
                    <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-flashlight-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-method="${milestone.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${milestone.color}20; color: ${milestone.color};">
                                <ion-icon name="${milestone.icon}" class="text-xl"></ion-icon>
                            </div>
                            <div>
                                <h4 class="font-bold">${milestone.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${milestone.color}20; color: ${milestone.color};">${milestone.status}</span>
                                    <span class="text-xs text-text-muted">${milestone.year}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${milestone.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de hitos
        document.querySelectorAll('.method-card').forEach(card => {
            card.addEventListener('click', function() {
                const milestoneName = this.getAttribute('data-method');
                showMilestoneDetail(milestoneName);
            });
        });
        
        console.log('Hitos de linternas inicializados: ' + flashlightMilestonesData.length);
    }

    // Función para mostrar detalle de hito
    function showMilestoneDetail(milestoneName) {
        const milestone = flashlightMilestonesData.find(v => v.title === milestoneName);
        if (!milestone) return;
        
        const details = {
            'Antorchas Prehistóricas': {
                features: 'Palos con resina, grasa animal, materiales inflamables',
                impact: 'Primera tecnología de iluminación portátil humana',
                adoption: 'Universal en todas las culturas prehistóricas',
                duration: '30-60 minutos',
                brightness: 'Equivalente a 10-50 lúmenes'
            },
            'Lámparas de Aceite': {
                features: 'Recipientes de piedra/cerámica, mecha de fibra, aceite vegetal/animal',
                impact: 'Iluminación más controlada y de mayor duración',
                adoption: 'Mediterráneo, Asia, América precolombina',
                duration: '2-6 horas',
                brightness: 'Equivalente a 20-80 lúmenes'
            },
            'Velas de Cera': {
                features: 'Cera de abejas, sebo animal, mecha de algodón',
                impact: 'Estándar de iluminación doméstica por siglos',
                adoption: 'Global después del siglo XVIII',
                duration: '4-8 horas',
                brightness: 'Equivalente a 30-100 lúmenes'
            },
            'Linterna Eléctrica': {
                features: 'Baterías zinc-carbono, bombilla incandescente, interruptor',
                impact: 'Revolución en iluminación portátil segura y confiable',
                adoption: 'Rápida adopción industrial y doméstica',
                duration: '1-3 horas',
                brightness: '10-50 lúmenes'
            },
            'LED de Alta Potencia': {
                features: 'Diodos semiconductores, eficiencia >80 lm/W, vida útil extendida',
                impact: 'Transformación completa del mercado de iluminación',
                adoption: '85% del mercado actual',
                duration: '10-100+ horas',
                brightness: '100-10,000+ lúmenes'
            },
            'Linternas Inteligentes': {
                features: 'Bluetooth, control por app, múltiples modos, sensores',
                impact: 'Personalización y control avanzado de iluminación',
                adoption: 'Creciendo rápidamente en mercado premium',
                duration: 'Variable según configuración',
                brightness: 'Ajustable 1-100%'
            }
        };
        
        const milestoneDetails = details[milestone.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${milestone.color}20; color: ${milestone.color};">
                        <ion-icon name="${milestone.icon}" class="text-3xl"></ion-icon>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${milestone.color};">${milestone.title}</h2>
                        <p class="text-text-secondary mt-1">${milestone.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${milestoneDetails.features ? `
                        <div>
                            <h4 class="font-bold mb-2 text-flashlight-accent-light">Características Principales:</h4>
                            <p class="text-text-secondary">${milestoneDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${milestoneDetails.impact ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-flashlight-accent-light">Impacto Histórico</h4>
                                <p class="text-text-secondary text-sm">${milestoneDetails.impact}</p>
                            </div>
                        ` : ''}
                        
                        ${milestoneDetails.adoption ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-flashlight-accent-light">Adopción</h4>
                                <p class="text-text-secondary text-sm">${milestoneDetails.adoption}</p>
                            </div>
                        ` : ''}
                        
                        ${milestoneDetails.duration ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-flashlight-accent-light">Duración Típica</h4>
                                <p class="text-text-secondary text-sm">${milestoneDetails.duration}</p>
                            </div>
                        ` : ''}
                        
                        ${milestoneDetails.brightness ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-flashlight-accent-light">Brillo Aproximado</h4>
                                <p class="text-text-secondary text-sm">${milestoneDetails.brightness}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-flashlight-accent-light"># Legado de ${milestone.title}:</span><br>
                            <span class="text-text-secondary">• ${milestone.title === 'Antorchas Prehistóricas' ? 'Fundación de la iluminación portátil humana' : milestone.title === 'Lámparas de Aceite' ? 'Primera iluminación controlada y reutilizable' : milestone.title === 'Velas de Cera' ? 'Estándar de iluminación por más de un milenio' : milestone.title === 'Linterna Eléctrica' ? 'Revolución de la iluminación segura y portátil' : milestone.title === 'LED de Alta Potencia' ? 'Máxima eficiencia energética y durabilidad' : 'Personalización y control digital de iluminación'}</span><br>
                            <span class="text-text-secondary">• ${milestone.title === 'Antorchas Prehistóricas' ? 'Permitió actividades nocturnas y protección' : milestone.title === 'Lámparas de Aceite' ? 'Avanzó el arte, lectura y actividades nocturnas' : milestone.title === 'Velas de Cera' ? 'Simbolismo religioso y social significativo' : milestone.title === 'Linterna Eléctrica' ? 'Habilitó trabajo nocturno y seguridad personal' : milestone.title === 'LED de Alta Potencia' ? 'Redujo consumo energético global significativamente' : 'Integración con tecnologías digitales modernas'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${milestone.color};">
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
            radarChart = createRadarChart(ctx, getRadarChartData('led'));
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
                        titleColor: '#FFF8DC',
                        bodyColor: '#cbd5e1',
                        borderColor: '#FFD700',
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
                        titleColor: '#FFF8DC',
                        bodyColor: '#cbd5e1',
                        borderColor: '#FFD700',
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
                        titleColor: '#FFF8DC',
                        bodyColor: '#cbd5e1',
                        borderColor: '#FFD700',
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
        const technologies = ['LED', 'Incandescente', 'Fluorescente', 'Halógena'];
        const efficiency = [95, 30, 70, 50];
        const durability = [90, 60, 75, 70];
        
        return {
            labels: technologies,
            datasets: [
                {
                    label: 'Eficiencia',
                    data: efficiency,
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Durabilidad',
                    data: durability,
                    borderColor: '#4169E1',
                    backgroundColor: 'rgba(65, 105, 225, 0.1)',
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
            labels: ['Eficiencia', 'Durabilidad', 'Costo', 'Brillo', 'Cuota Mercado'],
            datasets: [{
                label: techData.name,
                data: [
                    techData.efficiency,
                    techData.durability,
                    techData.cost,
                    techData.brightness,
                    techData.marketShare
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
                        valueElement.textContent = 'Ocasional';
                    } else if (value < 66) {
                        valueElement.textContent = 'Regular';
                    } else {
                        valueElement.textContent = 'Intenso';
                    }
                } else if (slider.id === 'areaSlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Corta';
                    } else if (value < 66) {
                        valueElement.textContent = 'Media';
                    } else {
                        valueElement.textContent = 'Larga';
                    }
                } else if (slider.id === 'puritySlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Interior';
                    } else if (value < 66) {
                        valueElement.textContent = 'Mixtas';
                    } else {
                        valueElement.textContent = 'Extremas';
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
            thicknessValue.textContent = 'Ocasional';
            areaSlider.value = 50;
            areaValue.textContent = 'Media';
            puritySlider.value = 50;
            purityValue.textContent = 'Moderadas';
            materialButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-material="led"]').classList.add('active');
            
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
        const intensity = parseInt(document.getElementById('thicknessSlider').value);
        const duration = parseInt(document.getElementById('areaSlider').value);
        const environment = parseInt(document.getElementById('puritySlider').value);
        
        const techData = technologiesData[techType];
        if (!techData) return;
        
        // Calcular valores basados en la tecnología y parámetros
        let efficiency = techData.efficiency;
        let durability = techData.durability;
        let cost = techData.cost;
        
        // Ajustar por intensidad de uso
        if (intensity > 66) { // Uso intenso
            if (techType === 'led') {
                efficiency *= 1.1; // LED se mantiene eficiente
            } else {
                efficiency *= 0.8; // Otras tecnologías pierden eficiencia
            }
        }
        
        // Ajustar por duración necesaria
        if (duration > 66) { // Duración larga
            durability *= 1.2; // Más importante la durabilidad
        }
        
        // Ajustar por condiciones ambientales
        if (environment > 66) { // Condiciones extremas
            if (techType === 'led') {
                durability *= 0.9; // LED sensible a calor extremo
            }
        }
        
        // Limitar valores
        efficiency = Math.min(Math.max(efficiency, 0), 100);
        durability = Math.min(Math.max(durability, 0), 100);
        cost = Math.min(Math.max(cost, 0), 100);
        
        // Actualizar barras y valores
        document.getElementById('strengthValue').textContent = 
            efficiency >= 85 ? 'Excelente' : 
            efficiency >= 70 ? 'Bueno' : 
            efficiency >= 50 ? 'Aceptable' : 'Limitado';
        document.getElementById('strengthBar').style.width = efficiency + '%';
        
        document.getElementById('conductivityValue').textContent = 
            durability >= 85 ? 'Alta' : 
            durability >= 70 ? 'Media' : 
            durability >= 50 ? 'Moderada' : 'Baja';
        document.getElementById('conductivityBar').style.width = durability + '%';
        
        document.getElementById('transparencyValue').textContent = 
            cost >= 90 ? 'Muy Bajo' : 
            cost >= 75 ? 'Bajo' : 
            cost >= 50 ? 'Moderado' : 'Alto';
        document.getElementById('transparencyBar').style.width = cost + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(techType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let conclusionText = '';
        
        if (techType === 'led') {
            conclusionText = 'LED domina en eficiencia y durabilidad, ideal para uso moderno';
        } else if (techType === 'incandescent') {
            conclusionText = 'Incandescente es económica pero ineficiente, para usos específicos';
        } else if (techType === 'fluorescent') {
            conclusionText = 'Fluorescente balancea eficiencia y costo, para iluminación general';
        } else if (techType === 'halogen') {
            conclusionText = 'Halógena ofrece buen brillo pero menor eficiencia, para usos especializados';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-flashlight-accent-tertiary mr-2"></ion-icon>
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
        const techType = activeMaterial ? activeMaterial.dataset.material : 'led';
        const techData = technologiesData[techType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentEfficiency = parseFloat(document.getElementById('strengthBar').style.width);
                const newEfficiency = Math.min(100, currentEfficiency * 1.05);
                document.getElementById('strengthBar').style.width = newEfficiency + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${techData.name} analizada exitosamente`, 'success');
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
        const techType = activeMaterial ? activeMaterial.dataset.material : 'led';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-flashlight-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-flashlight-accent-light">Adopción por Década</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-flashlight-accent-secondary-light">Comparación de Métricas</h4>
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
                        <h4 class="font-bold mb-3 text-flashlight-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes tecnologías de iluminación. 
                            LED destaca en eficiencia y durabilidad, mientras que incandescente es más económica. 
                            Cada tecnología tiene ventajas específicas según el tipo de uso y condiciones.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-flashlight-accent to-flashlight-accent-dark text-white font-bold rounded-xl shadow-lg shadow-flashlight-accent/30 hover:shadow-xl hover:shadow-flashlight-accent/40 transition-all duration-300">
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
        const decades = ['1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
        const ledAdoption = [0, 0, 5, 30, 70, 85]; // Porcentaje
        const incandescentAdoption = [95, 90, 80, 50, 20, 5]; // Porcentaje
        
        return {
            labels: decades,
            datasets: [
                {
                    label: 'LED (% mercado)',
                    data: ledAdoption,
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Incandescente (% mercado)',
                    data: incandescentAdoption,
                    borderColor: '#FF6B6B',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
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
        const technologies = ['LED', 'Incandescente', 'Fluorescente', 'Halógena'];
        const efficiency = [95, 30, 70, 50];
        const lifespan = [90, 10, 75, 25];
        const costEffectiveness = [85, 95, 80, 75];
        
        return {
            labels: technologies,
            datasets: [
                {
                    label: 'Eficiencia (%)',
                    data: efficiency,
                    backgroundColor: 'rgba(255, 215, 0, 0.7)',
                    borderColor: '#FFD700',
                    borderWidth: 1
                },
                {
                    label: 'Vida Útil (x1000 horas)',
                    data: lifespan,
                    backgroundColor: 'rgba(65, 105, 225, 0.7)',
                    borderColor: '#4169E1',
                    borderWidth: 1
                },
                {
                    label: 'Relación Costo-Beneficio',
                    data: costEffectiveness,
                    backgroundColor: 'rgba(50, 205, 50, 0.7)',
                    borderColor: '#32CD32',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(technology) {
        const techData = technologiesData[technology];
        
        // Datos para todas las tecnologías
        const labels = ['Eficiencia', 'Durabilidad', 'Costo', 'Brillo', 'Mercado'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'LED',
                    data: [95, 90, 85, 95, 85],
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderColor: '#FFD700',
                    pointBackgroundColor: '#FFD700',
                    borderWidth: 1
                },
                {
                    label: 'Incandescente',
                    data: [30, 60, 95, 70, 5],
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderColor: '#FF6B6B',
                    pointBackgroundColor: '#FF6B6B',
                    borderWidth: 1
                },
                {
                    label: 'Fluorescente',
                    data: [70, 75, 80, 80, 8],
                    backgroundColor: 'rgba(255, 217, 61, 0.1)',
                    borderColor: '#FFD93D',
                    pointBackgroundColor: '#FFD93D',
                    borderWidth: 1
                },
                {
                    label: techData.name,
                    data: [
                        techData.efficiency,
                        techData.durability,
                        techData.cost,
                        techData.brightness,
                        techData.marketShare
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
            "40,000 a.C.: Antorchas prehistóricas...",
            "3,000 a.C.: Lámparas de aceite en civilizaciones...",
            "500 d.C.: Velas de cera se estandarizan...",
            "1800s: Lámparas de queroseno y gas...",
            "1899: Primera linterna eléctrica patentada...",
            "1920s: Linternas populares y accesibles...",
            "1970s: Baterías recargables de NiCd...",
            "1990s: Primeros LEDs de alta potencia...",
            "2000s: LED domina el mercado...",
            "2010s: Linternas inteligentes con Bluetooth...",
            "2020s: Máxima eficiencia y personalización..."
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
            { type: 'Eficiencia lumínica', value: '1x → 50x', color: '#FFD700', icon: 'trending-up-outline' },
            { type: 'Vida útil (horas)', value: '10 → 50,000', color: '#4169E1', icon: 'time-outline' },
            { type: 'Mercado LED', value: '0% → 85%', color: '#32CD32', icon: 'pie-chart-outline' },
            { type: 'Costo por lumen', value: '$100 → $0.10', color: '#8b5cf6', icon: 'cash-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-flashlight-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de la Iluminación Portátil
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de las linternas desde la prehistoria hasta la tecnología moderna:</p>
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
                        <span class="text-flashlight-accent-light"># Tendencias futuras (2025-2030):</span><br>
                        <span class="text-text-secondary">• Linternas solares ultra-eficientes</span><br>
                        <span class="text-text-secondary">• Materiales biodegradables y reciclables</span><br>
                        <span class="text-text-secondary">• Integración con IoT y smart homes</span><br>
                        <span class="text-text-secondary">• Baterías de estado sólido de mayor capacidad</span><br>
                        <span class="text-text-secondary">• Luz adaptable al ciclo circadiano</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-flashlight-accent to-flashlight-accent-dark text-white font-bold rounded-xl shadow-lg shadow-flashlight-accent/30">
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
    console.log('Aplicación Flashlight Evolution inicializada correctamente');
});