document.addEventListener('DOMContentLoaded', function() {
    console.log('IncensoLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de tipos de incienso
    const incenseTypesData = [
        {
            icon: 'flame',
            title: 'Olíbano',
            description: 'Resina sagrada usada durante milenios en rituales espirituales.',
            color: '#d97706',
            status: 'Espiritual',
            origin: 'Omán, Somalia'
        },
        {
            icon: 'leaf',
            title: 'Sándalo',
            description: 'Madera aromática con propiedades relajantes y meditativas.',
            color: '#92400e',
            status: 'Relajante',
            origin: 'India, Australia'
        },
        {
            icon: 'flower-outline',
            title: 'Lavanda',
            description: 'Flor aromática ideal para relajación y mejora del sueño.',
            color: '#a78bfa',
            status: 'Calmante',
            origin: 'Mediterráneo'
        },
        {
            icon: 'medical-outline',
            title: 'Mirra',
            description: 'Resina histórica usada para purificación y ceremonias.',
            color: '#b45309',
            status: 'Purificante',
            origin: 'África, Arabia'
        },
        {
            icon: 'leaf',
            title: 'Palo Santo',
            description: 'Madera sagrada de Sudamérica para limpieza energética.',
            color: '#fbbf24',
            status: 'Energético',
            origin: 'Perú, Ecuador'
        },
        {
            icon: 'cube-outline',
            title: 'Incienso Japonés',
            description: 'Barras refinadas para meditación y ceremonia del té.',
            color: '#ef4444',
            status: 'Ceremonial',
            origin: 'Japón'
        }
    ];

    // Datos de aromas para simulación
    const aromasData = {
        'olibano': {
            name: 'Olíbano',
            relaxation: 95,
            spirituality: 98,
            duration: 85,
            intensity: 80,
            color: '#d97706',
            description: 'Resina sagrada con profundas propiedades espirituales.',
            uses: ['Meditación', 'Rituales', 'Ceremonias', 'Purificación'],
            historical: 99,
            therapeutic: 90
        },
        'sándalo': {
            name: 'Sándalo',
            relaxation: 92,
            spirituality: 85,
            duration: 90,
            intensity: 75,
            color: '#92400e',
            description: 'Madera aromática con propiedades meditativas y relajantes.',
            uses: ['Yoga', 'Relajación', 'Masajes', 'Ambientación'],
            historical: 95,
            therapeutic: 88
        },
        'lavanda': {
            name: 'Lavanda',
            relaxation: 98,
            spirituality: 70,
            duration: 75,
            intensity: 85,
            color: '#a78bfa',
            description: 'Esencia floral para calmar la mente y mejorar el sueño.',
            uses: ['Ansiedad', 'Insomnio', 'Estrés', 'Ambientación'],
            historical: 80,
            therapeutic: 95
        },
        'mirra': {
            name: 'Mirra',
            relaxation: 85,
            spirituality: 96,
            duration: 80,
            intensity: 70,
            color: '#b45309',
            description: 'Resina histórica para purificación y conexión espiritual.',
            uses: ['Purificación', 'Ceremonias', 'Protección', 'Meditación'],
            historical: 98,
            therapeutic: 82
        }
    };

    // Inicializar componentes
    initSmokeParticles();
    initIncenseTypes();
    initEventListeners();
    initAnimations();
    initTimeline();
    initAromaSimulation();
    initCharts();

    // Función para inicializar partículas de humo
    function initSmokeParticles() {
        const canvas = document.getElementById('smoke-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 40;
        
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
                    // Partículas de humo (ámbar/ocre)
                    color = `rgba(217, 119, 6, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 15 + 5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Partículas de aroma (blanco)
                    color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
                    size = Math.random() * 10 + 3;
                    speed = (Math.random() - 0.5) * 0.2;
                } else {
                    // Partículas especiales (dorado)
                    color = `rgba(251, 191, 36, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 20 + 8;
                    speed = (Math.random() - 0.5) * 0.4;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: canvas.height + Math.random() * 100,
                    size: size,
                    speedX: speed,
                    speedY: -(Math.random() * 0.5 + 0.2),
                    color: color,
                    pulseSpeed: Math.random() * 0.05 + 0.02,
                    pulseOffset: Math.random() * Math.PI * 2,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.01,
                    life: Math.random() * 100 + 50,
                    maxLife: Math.random() * 100 + 50,
                    type: type < 0.6 ? 'smoke' : type < 0.85 ? 'aroma' : 'special'
                });
            }
        }
        
        function drawSmoke(ctx, x, y, size, rotation, alpha) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            // Dibujar forma orgánica de humo
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const radius = size * (0.7 + Math.sin(Date.now() * 0.001 + i) * 0.3);
                const px = Math.cos(angle) * radius;
                const py = Math.sin(angle) * radius;
                
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
            
            // Fondo sutil con gradiente
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(44, 24, 16, 0.1)');
            gradient.addColorStop(1, 'rgba(26, 15, 10, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Actualizar y dibujar partículas
            particles.forEach((particle, index) => {
                // Movimiento
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.rotation += particle.rotationSpeed;
                particle.life--;
                
                // Si la partícula muere o sale de la pantalla, reiniciarla
                if (particle.life <= 0 || particle.y < -50) {
                    particle.x = Math.random() * canvas.width;
                    particle.y = canvas.height + Math.random() * 100;
                    particle.life = particle.maxLife;
                }
                
                // Efecto de pulso basado en vida restante
                const lifeRatio = particle.life / particle.maxLife;
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse * lifeRatio;
                
                // Dibujar partícula como humo
                ctx.save();
                
                if (particle.type === 'special') {
                    // Gradiente para partículas especiales
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size
                    );
                    gradient.addColorStop(0, `rgba(251, 191, 36, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                drawSmoke(ctx, particle.x, particle.y, particle.size, particle.rotation, currentAlpha);
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
        console.log('Partículas de humo inicializadas');
    }

    // Función para inicializar tipos de incienso
    function initIncenseTypes() {
        const container = document.getElementById('typesInfo');
        if (!container) {
            console.error('Contenedor de tipos no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-incense-accent-light">Tipos de Incienso y sus Propiedades</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="typesGrid">
                ${incenseTypesData.map(type => `
                    <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-incense-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-method="${type.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${type.color}20; color: ${type.color};">
                                <ion-icon name="${type.icon}" class="text-xl"></ion-icon>
                            </div>
                            <div>
                                <h4 class="font-bold">${type.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${type.color}20; color: ${type.color};">${type.status}</span>
                                    <span class="text-xs text-text-muted">${type.origin}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${type.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de tipos
        document.querySelectorAll('.method-card').forEach(card => {
            card.addEventListener('click', function() {
                const typeName = this.getAttribute('data-method');
                showTypeDetail(typeName);
            });
        });
        
        console.log('Tipos de incienso inicializados: ' + incenseTypesData.length);
    }

    // Función para mostrar detalle de tipo
    function showTypeDetail(typeName) {
        const type = incenseTypesData.find(t => t.title === typeName);
        if (!type) return;
        
        const details = {
            'Olíbano': {
                features: 'Resina de árbol Boswellia, aroma terroso con notas cítricas',
                benefits: 'Reduce ansiedad, mejora meditación, propiedades antiinflamatorias',
                history: 'Usado desde el Antiguo Egipto en rituales religiosos',
                preparation: 'Recolección manual, secado por 3 meses, selección por calidad',
                price: 'Alto (producto premium)'
            },
            'Sándalo': {
                features: 'Aceite de madera Santalum album, aroma dulce y amaderado',
                benefits: 'Calma la mente, mejora concentración, propiedades antisépticas',
                history: 'Tradición de 4000 años en Ayurveda y rituales hindúes',
                preparation: 'Destilación al vapor de raíces de árboles maduros (30+ años)',
                price: 'Muy alto (árboles protegidos)'
            },
            'Lavanda': {
                features: 'Aceite esencial de Lavandula angustifolia, aroma floral herbáceo',
                benefits: 'Induce sueño, reduce estrés, alivia dolores de cabeza',
                history: 'Usado desde la antigua Roma en baños y perfumes',
                preparation: 'Destilación de flores recién cosechadas en primavera',
                price: 'Moderado (cultivo extensivo)'
            },
            'Mirra': {
                features: 'Resina de árbol Commiphora, aroma amaderado con notas balsámicas',
                benefits: 'Propiedades antisépticas, ayuda en problemas respiratorios',
                history: 'Usada junto al olíbano en rituales funerarios egipcios',
                preparation: 'Incisiones en corteza, recolección de lágrimas solidificadas',
                price: 'Alto (cosecha limitada)'
            },
            'Palo Santo': {
                features: 'Madera de Bursera graveolens, aroma dulce con notas cítricas',
                benefits: 'Limpieza energética, repelente natural de insectos',
                history: 'Usado por chamanes andinos en ceremonias de curación',
                preparation: 'Recolección de árboles caídos naturalmente, secado por años',
                price: 'Moderado (sostenible)'
            },
            'Incienso Japonés': {
                features: 'Mezcla de especias y maderas, aroma refinado y sutil',
                benefits: 'Mejora concentración, crea atmósfera ceremonial',
                history: 'Desarrollado en el período Heian para la nobleza japonesa',
                preparation: 'Mezcla artesanal con más de 15 ingredientes, envejecido',
                price: 'Alto (artesanal)'
            }
        };
        
        const typeDetails = details[type.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${type.color}20; color: ${type.color};">
                        <ion-icon name="${type.icon}" class="text-3xl"></ion-icon>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${type.color};">${type.title}</h2>
                        <p class="text-text-secondary mt-1">${type.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${typeDetails.features ? `
                        <div>
                            <h4 class="font-bold mb-2 text-incense-accent-light">Características Aromáticas:</h4>
                            <p class="text-text-secondary">${typeDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${typeDetails.benefits ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-incense-accent-light">Beneficios</h4>
                                <p class="text-text-secondary text-sm">${typeDetails.benefits}</p>
                            </div>
                        ` : ''}
                        
                        ${typeDetails.history ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-incense-accent-light">Historia</h4>
                                <p class="text-text-secondary text-sm">${typeDetails.history}</p>
                            </div>
                        ` : ''}
                        
                        ${typeDetails.preparation ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-incense-accent-light">Preparación</h4>
                                <p class="text-text-secondary text-sm">${typeDetails.preparation}</p>
                            </div>
                        ` : ''}
                        
                        ${typeDetails.price ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-incense-accent-light">Precio</h4>
                                <p class="text-text-secondary text-sm">${typeDetails.price}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-incense-accent-light"># Uso Recomendado de ${type.title}:</span><br>
                            <span class="text-text-secondary">• ${type.title === 'Olíbano' ? 'Meditación matutina o rituales espirituales' : type.title === 'Sándalo' ? 'Sesiones de yoga o momentos de reflexión' : type.title === 'Lavanda' ? 'Antes de dormir o en momentos de ansiedad' : type.title === 'Mirra' ? 'Ceremonias de purificación o espacios sagrados' : type.title === 'Palo Santo' ? 'Limpieza energética de espacios o nuevos comienzos' : 'Ceremonia del té o meditación Zen'}</span><br>
                            <span class="text-text-secondary">• ${type.title === 'Olíbano' ? 'Combinar con mirra para rituales completos' : type.title === 'Sándalo' ? 'Usar en difusor con unas gotas de agua' : type.title === 'Lavanda' ? 'Aplicar en almohada o en baño relajante' : type.title === 'Mirra' ? 'Quemar en carbón para liberación completa' : type.title === 'Palo Santo' ? 'Encender y apagar para crear humo denso' : 'Fragmentar barra finamente para mejor combustión'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${type.color};">
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
            lineChart = createLineChart(ctx, getAromaComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('olibano'));
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
            initAromaSimulation();
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
                            color: '#fde68a',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(68, 36, 20, 0.9)',
                        titleColor: '#f59e0b',
                        bodyColor: '#fde68a',
                        borderColor: '#d97706',
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
                            color: '#fbbf24',
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
                            color: '#fbbf24',
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
                            color: '#fde68a',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        },
                        ticks: {
                            color: '#fbbf24',
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
                            color: '#fde68a',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(68, 36, 20, 0.9)',
                        titleColor: '#f59e0b',
                        bodyColor: '#fde68a',
                        borderColor: '#d97706',
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
                            color: '#fde68a',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(68, 36, 20, 0.9)',
                        titleColor: '#f59e0b',
                        bodyColor: '#fde68a',
                        borderColor: '#d97706',
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
                            color: '#fbbf24',
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
                            color: '#fbbf24',
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
    function getAromaComparisonData() {
        const aromas = ['Olíbano', 'Sándalo', 'Lavanda', 'Mirra'];
        const relaxation = [95, 92, 98, 85];
        const spirituality = [98, 85, 70, 96];
        
        return {
            labels: aromas,
            datasets: [
                {
                    label: 'Relajación',
                    data: relaxation,
                    borderColor: '#d97706',
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Espiritualidad',
                    data: spirituality,
                    borderColor: '#92400e',
                    backgroundColor: 'rgba(146, 64, 14, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar
    function getRadarChartData(aromaType) {
        const aromaData = aromasData[aromaType];
        
        return {
            labels: ['Relajación', 'Espiritualidad', 'Duración', 'Intensidad', 'Valor Histórico'],
            datasets: [{
                label: aromaData.name,
                data: [
                    aromaData.relaxation,
                    aromaData.spirituality,
                    aromaData.duration,
                    aromaData.intensity,
                    aromaData.historical
                ],
                backgroundColor: `${aromaData.color}20`,
                borderColor: aromaData.color,
                pointBackgroundColor: aromaData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: aromaData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
        };
    }

    // Función para inicializar simulación de aromas
    function initAromaSimulation() {
        console.log('Inicializando simulación de aromas...');
        
        // Elementos del DOM
        const materialButtons = document.querySelectorAll('.material-btn');
        const intensitySlider = document.getElementById('intensitySlider');
        const intensityValue = document.getElementById('intensityValue');
        const durationSlider = document.getElementById('durationSlider');
        const durationValue = document.getElementById('durationValue');
        const purposeSlider = document.getElementById('purposeSlider');
        const purposeValue = document.getElementById('purposeValue');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        
        // Verificar que todos los elementos existan
        if (!intensitySlider || !materialButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        function updateSliderValue(slider, valueElement, suffix = '') {
            slider.addEventListener('input', function() {
                if (slider.id === 'intensitySlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Sutil';
                    } else if (value < 66) {
                        valueElement.textContent = 'Media';
                    } else {
                        valueElement.textContent = 'Intensa';
                    }
                } else if (slider.id === 'durationSlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = '15 min';
                    } else if (value < 66) {
                        valueElement.textContent = '30 min';
                    } else {
                        valueElement.textContent = '60 min';
                    }
                } else if (slider.id === 'purposeSlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Relajación';
                    } else if (value < 66) {
                        valueElement.textContent = 'Meditación';
                    } else {
                        valueElement.textContent = 'Energía';
                    }
                }
                updateSimulation();
            });
        }
        
        updateSliderValue(intensitySlider, intensityValue);
        updateSliderValue(durationSlider, durationValue);
        updateSliderValue(purposeSlider, purposeValue);
        
        // Botones de tipo de incienso
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
            intensitySlider.value = 50;
            intensityValue.textContent = 'Media';
            durationSlider.value = 50;
            durationValue.textContent = '30 min';
            purposeSlider.value = 50;
            purposeValue.textContent = 'Meditación';
            materialButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-material="olibano"]').classList.add('active');
            
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
        
        console.log('Simulación de aromas inicializada');
    }

    // Función para actualizar simulación
    function updateSimulation() {
        const activeMaterial = document.querySelector('.material-btn.active');
        if (!activeMaterial) return;
        
        const aromaType = activeMaterial.dataset.material;
        const intensity = parseInt(document.getElementById('intensitySlider').value);
        const duration = parseInt(document.getElementById('durationSlider').value);
        const purpose = parseInt(document.getElementById('purposeSlider').value);
        
        const aromaData = aromasData[aromaType];
        if (!aromaData) return;
        
        // Calcular valores basados en el aroma y parámetros
        let relaxation = aromaData.relaxation;
        let spirituality = aromaData.spirituality;
        let therapeutic = aromaData.therapeutic;
        
        // Ajustar por intensidad
        if (intensity > 66) { // Intensidad alta
            if (aromaType === 'olibano' || aromaType === 'mirra') {
                spirituality *= 1.1; // Mejor para rituales intensos
            }
        }
        
        // Ajustar por duración
        if (duration > 66) { // Duración larga
            if (aromaType === 'sándalo' || aromaType === 'lavanda') {
                relaxation *= 1.15; // Mejor para sesiones prolongadas
            }
        }
        
        // Ajustar por propósito
        if (purpose < 33) { // Relajación
            if (aromaType === 'lavanda') {
                therapeutic *= 1.2; // Mejor para relajación
            }
        } else if (purpose > 66) { // Energía
            if (aromaType === 'olibano') {
                spirituality *= 1.1; // Mejor para energía espiritual
            }
        }
        
        // Limitar valores
        relaxation = Math.min(Math.max(relaxation, 0), 100);
        spirituality = Math.min(Math.max(spirituality, 0), 100);
        therapeutic = Math.min(Math.max(therapeutic, 0), 100);
        
        // Calcular duración del aroma basada en slider
        const aromaDuration = 15 + (duration / 100) * 45; // 15-60 minutos
        
        // Actualizar barras y valores
        document.getElementById('relaxationValue').textContent = 
            relaxation >= 90 ? 'Muy Altas' : 
            relaxation >= 75 ? 'Altas' : 
            relaxation >= 60 ? 'Moderadas' : 'Bajas';
        document.getElementById('relaxationBar').style.width = relaxation + '%';
        
        document.getElementById('aromaValue').textContent = 
            aromaDuration >= 45 ? 'Alta' : 
            aromaDuration >= 30 ? 'Media-Alta' : 
            aromaDuration >= 20 ? 'Media' : 'Baja';
        document.getElementById('aromaBar').style.width = (aromaDuration / 60 * 100) + '%';
        
        document.getElementById('spiritualValue').textContent = 
            spirituality >= 90 ? 'Muy Tradicional' : 
            spirituality >= 75 ? 'Tradicional' : 
            spirituality >= 60 ? 'Moderado' : 'Secular';
        document.getElementById('spiritualBar').style.width = spirituality + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(aromaType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let conclusionText = '';
        
        if (aromaType === 'olibano') {
            conclusionText = 'El olíbano es ideal para meditación profunda, con propiedades espirituales históricas';
        } else if (aromaType === 'sándalo') {
            conclusionText = 'El sándalo ofrece relajación prolongada, perfecto para yoga y reflexión';
        } else if (aromaType === 'lavanda') {
            conclusionText = 'La lavanda es excelente para reducir estrés y mejorar la calidad del sueño';
        } else if (aromaType === 'mirra') {
            conclusionText = 'La mirra proporciona purificación espiritual y conexión con tradiciones antiguas';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-incense-accent-tertiary mr-2"></ion-icon>
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
        const aromaType = activeMaterial ? activeMaterial.dataset.material : 'olibano';
        const aromaData = aromasData[aromaType];
        
        // Simular proceso de análisis con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentRelaxation = parseFloat(document.getElementById('relaxationBar').style.width);
                const newRelaxation = Math.min(100, currentRelaxation * 1.05);
                document.getElementById('relaxationBar').style.width = newRelaxation + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${aromaData.name} analizado exitosamente`, 'success');
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
        const aromaType = activeMaterial ? activeMaterial.dataset.material : 'olibano';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-incense-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-incense-accent-light">Uso Histórico por Cultura</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-incense-accent-secondary-light">Comparación de Propiedades</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedBarChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-xl p-4">
                        <h4 class="font-bold text-lg mb-4 text-center text-amber-300">Análisis Multidimensional (Radar)</h4>
                        <div class="w-full h-80">
                            <canvas id="detailedRadarChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/40 rounded-lg p-4">
                        <h4 class="font-bold mb-3 text-incense-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes tipos de incienso. 
                            El olíbano destaca en espiritualidad y valor histórico, mientras que la lavanda sobresale en propiedades relajantes. 
                            Cada aroma tiene ventajas específicas según el propósito y contexto de uso.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-incense-accent to-incense-accent-dark text-white font-bold rounded-xl shadow-lg shadow-incense-accent/30 hover:shadow-xl hover:shadow-incense-accent/40 transition-all duration-300">
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
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(aromaType));
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
        const cultures = ['Egipto', 'India', 'China', 'Roma', 'Japón', 'Moderno'];
        const olibanoUse = [95, 80, 70, 85, 60, 75];
        const sandaloUse = [60, 95, 65, 70, 75, 85];
        
        return {
            labels: cultures,
            datasets: [
                {
                    label: 'Olíbano (% uso cultural)',
                    data: olibanoUse,
                    borderColor: '#d97706',
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Sándalo (% uso cultural)',
                    data: sandaloUse,
                    borderColor: '#92400e',
                    backgroundColor: 'rgba(146, 64, 14, 0.1)',
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
        const aromas = ['Olíbano', 'Sándalo', 'Lavanda', 'Mirra'];
        const relaxation = [95, 92, 98, 85];
        const spirituality = [98, 85, 70, 96];
        const duration = [85, 90, 75, 80];
        
        return {
            labels: aromas,
            datasets: [
                {
                    label: 'Relajación',
                    data: relaxation,
                    backgroundColor: 'rgba(217, 119, 6, 0.7)',
                    borderColor: '#d97706',
                    borderWidth: 1
                },
                {
                    label: 'Espiritualidad',
                    data: spirituality,
                    backgroundColor: 'rgba(146, 64, 14, 0.7)',
                    borderColor: '#92400e',
                    borderWidth: 1
                },
                {
                    label: 'Duración',
                    data: duration,
                    backgroundColor: 'rgba(251, 191, 36, 0.7)',
                    borderColor: '#fbbf24',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(aromaType) {
        const aromaData = aromasData[aromaType];
        
        // Datos para todas las aromas
        const labels = ['Relajación', 'Espiritualidad', 'Duración', 'Intensidad', 'Valor Histórico'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Olíbano',
                    data: [95, 98, 85, 80, 99],
                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                    borderColor: '#d97706',
                    pointBackgroundColor: '#d97706',
                    borderWidth: 1
                },
                {
                    label: 'Sándalo',
                    data: [92, 85, 90, 75, 95],
                    backgroundColor: 'rgba(146, 64, 14, 0.1)',
                    borderColor: '#92400e',
                    pointBackgroundColor: '#92400e',
                    borderWidth: 1
                },
                {
                    label: 'Lavanda',
                    data: [98, 70, 75, 85, 80],
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                    borderColor: '#a78bfa',
                    pointBackgroundColor: '#a78bfa',
                    borderWidth: 1
                },
                {
                    label: aromaData.name,
                    data: [
                        aromaData.relaxation,
                        aromaData.spirituality,
                        aromaData.duration,
                        aromaData.intensity,
                        aromaData.historical
                    ],
                    backgroundColor: `${aromaData.color}40`,
                    borderColor: aromaData.color,
                    pointBackgroundColor: aromaData.color,
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
            simulateEvolutionBtn.addEventListener('click', simulateIncenseEvolution);
        }
        
        // Botón de propiedades
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

    // Función para simulación de evolución histórica
    function simulateIncenseEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando evolución...';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "3000 a.C.: Primeros usos en rituales egipcios...",
            "2000 a.C.: Comercio en Mesopotamia y el Valle del Indo...",
            "1000 a.C.: Incienso en ceremonias hebreas y templos...",
            "500 a.C.: Ruta del incienso entre Arabia y Mediterráneo...",
            "Siglo I d.C.: Adopción en ceremonias cristianas...",
            "Siglo VII: Expansión islámica y uso en mezquitas...",
            "Siglo XIII: Comercio intensivo con Europa medieval...",
            "Siglo XV: Exploradores llevan incienso a América...",
            "Siglo XIX: Redescubrimiento en romanticismo y ocultismo...",
            "Siglo XX: Resurgimiento en contracultura y New Age...",
            "Siglo XXI: Aromaterapia científica y bienestar holístico..."
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
            showIncenseEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 6000);
    }

    // Función para mostrar resultados de evolución histórica
    function showIncenseEvolutionResults() {
        const results = [
            { type: 'Años de historia', value: '5000+', color: '#d97706', icon: 'calendar-outline' },
            { type: 'Culturas que lo usan', value: '95%', color: '#92400e', icon: 'globe-outline' },
            { type: 'Mercado global 2024', value: '$4.2B', color: '#fbbf24', icon: 'trending-up-outline' },
            { type: 'Crecimiento anual', value: '+12%', color: '#a78bfa', icon: 'analytics-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-incense-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución del Incienso (3000 a.C.-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico del incienso desde los rituales egipcios hasta la aromaterapia moderna:</p>
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
                        <span class="text-incense-accent-light"># Tendencias futuras (2025-2030):</span><br>
                        <span class="text-text-secondary">• Personalización de aromas basada en biofeedback</span><br>
                        <span class="text-text-secondary">• Incienso inteligente con liberación controlada</span><br>
                        <span class="text-text-secondary">• Investigación clínica en aromaterapia</span><br>
                        <span class="text-text-secondary">• Sustentabilidad en cosecha de resinas</span><br>
                        <span class="text-text-secondary">• Integración con realidad virtual para meditación</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-incense-accent to-incense-accent-dark text-white font-bold rounded-xl shadow-lg shadow-incense-accent/30">
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
    console.log('Aplicación IncensoLab inicializada correctamente');
});