document.addEventListener('DOMContentLoaded', function() {
    console.log('GrafenoLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de métodos de producción
    const productionMethodsData = [
        {
            icon: 'bandage-outline',
            title: 'Exfoliación Mecánica',
            description: 'Método original usando cinta adhesiva sobre grafito. Produce grafeno de alta calidad pero en baja cantidad.',
            color: '#00d4aa',
            status: 'Laboratorio',
            year: '2004'
        },
        {
            icon: 'cloud-outline',
            title: 'CVD',
            description: 'Depósito Químico de Vapor. Método escalable para producir grafeno de gran área sobre sustratos metálicos.',
            color: '#ff6b6b',
            status: 'Industrial',
            year: '2006'
        },
        {
            icon: 'water-outline',
            title: 'Exfoliación Líquida',
            description: 'Grafeno disperso en solventes mediante sonicación. Ideal para composites y tintas conductoras.',
            color: '#ffd93d',
            status: 'Comercial',
            year: '2008'
        },
        {
            icon: 'thermometer-outline',
            title: 'Crecimiento Epitaxial',
            description: 'Sobre carburo de silicio a altas temperaturas. Produce grafeno de alta calidad para electrónica.',
            color: '#8b5cf6',
            status: 'Especializado',
            year: '2009'
        },
        {
            icon: 'flame-outline',
            title: 'Reducción de Óxido',
            description: 'Óxido de grafeno reducido químicamente. Método económico para aplicaciones que no requieren alta pureza.',
            color: '#00a8ff',
            status: 'Comercial',
            year: '2010'
        },
        {
            icon: 'nuclear-outline',
            title: 'Síntesis por Plasma',
            description: 'Proceso a baja temperatura que permite crecimiento sobre diversos sustratos.',
            color: '#ff4757',
            status: 'Emergente',
            year: '2015'
        }
    ];

    // Datos de materiales para simulación
    const materialsData = {
        'graphene': {
            name: 'Grafeno',
            strength: 200,
            conductivity: 1.0,
            transparency: 97.7,
            thermalConductivity: 5000,
            color: '#00d4aa',
            description: 'Material bidimensional de carbono con propiedades excepcionales.',
            applications: ['Electrónica flexible', 'Composites', 'Baterías', 'Sensores'],
            flexibility: 95,
            weight: 100,
            cost: 40
        },
        'steel': {
            name: 'Acero',
            strength: 1,
            conductivity: 0.1,
            transparency: 0,
            thermalConductivity: 50,
            color: '#ff6b6b',
            description: 'Aleación de hierro y carbono, material estructural convencional.',
            applications: ['Construcción', 'Automóviles', 'Herramientas', 'Estructuras'],
            flexibility: 30,
            weight: 60,
            cost: 70
        },
        'copper': {
            name: 'Cobre',
            strength: 0.3,
            conductivity: 0.96,
            transparency: 0,
            thermalConductivity: 400,
            color: '#ffd93d',
            description: 'Metal dúctil con alta conductividad eléctrica y térmica.',
            applications: ['Cableado', 'Electrónica', 'Intercambiadores', 'Monedas'],
            flexibility: 85,
            weight: 70,
            cost: 80
        },
        'silicon': {
            name: 'Silicio',
            strength: 1.5,
            conductivity: 0.001,
            transparency: 0,
            thermalConductivity: 150,
            color: '#8b5cf6',
            description: 'Semiconductor fundamental para la industria electrónica.',
            applications: ['Chips', 'Paneles solares', 'Sensores', 'Vidrio'],
            flexibility: 10,
            weight: 50,
            cost: 60
        }
    };

    // Inicializar componentes
    initGrapheneParticles();
    initProductionMethods();
    initEventListeners();
    initAnimations();
    initTimeline();
    initMaterialSimulation();
    initCharts();

    // Función para inicializar partículas de grafeno (hexágonos)
    function initGrapheneParticles() {
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
                    // Partículas de grafeno (verde azulado)
                    color = `rgba(0, 212, 170, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Partículas de carbono (gris)
                    color = `rgba(100, 100, 100, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.2;
                } else {
                    // Partículas especiales (dorado)
                    color = `rgba(255, 217, 61, ${Math.random() * 0.3 + 0.1})`;
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
                    sides: 6, // Hexágonos para grafeno
                    type: type < 0.6 ? 'graphene' : type < 0.85 ? 'carbon' : 'special'
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
            ctx.strokeStyle = 'rgba(0, 212, 170, 0.1)';
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
                    gradient.addColorStop(0, `rgba(255, 217, 61, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(255, 217, 61, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
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
        console.log('Partículas de grafeno inicializadas');
    }

    // Función para inicializar métodos de producción
    function initProductionMethods() {
        const container = document.getElementById('productionInfo');
        if (!container) {
            console.error('Contenedor de métodos de producción no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-graphene-accent-light">Métodos de Producción de Grafeno</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="methodsGrid">
                ${productionMethodsData.map(method => `
                    <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-graphene-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-method="${method.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${method.color}20; color: ${method.color};">
                                <ion-icon name="${method.icon}" class="text-xl"></ion-icon>
                            </div>
                            <div>
                                <h4 class="font-bold">${method.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${method.color}20; color: ${method.color};">${method.status}</span>
                                    <span class="text-xs text-text-muted">${method.year}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${method.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de métodos
        document.querySelectorAll('.method-card').forEach(card => {
            card.addEventListener('click', function() {
                const methodName = this.getAttribute('data-method');
                showMethodDetail(methodName);
            });
        });
        
        console.log('Métodos de producción inicializados: ' + productionMethodsData.length);
    }

    // Función para mostrar detalle de método
    function showMethodDetail(methodName) {
        const method = productionMethodsData.find(m => m.title === methodName);
        if (!method) return;
        
        const details = {
            'Exfoliación Mecánica': {
                process: 'Uso de cinta adhesiva para despegar capas individuales de grafito',
                quality: 'Alta calidad estructural y electrónica',
                scalability: 'Muy baja, proceso manual',
                cost: 'Alto por área producida',
                throughput: 'Milímetros cuadrados por hora'
            },
            'CVD': {
                process: 'Descomposición de gases de carbono sobre sustratos metálicos a alta temperatura',
                quality: 'Alta calidad, monocristalino',
                scalability: 'Alta, proceso industrial',
                cost: 'Medio-alto',
                throughput: 'Metros cuadrados por hora'
            },
            'Exfoliación Líquida': {
                process: 'Dispersión y sonicación de grafito en solventes',
                quality: 'Calidad media, múltiples capas',
                scalability: 'Media-alta',
                cost: 'Bajo',
                throughput: 'Gramos por hora'
            },
            'Crecimiento Epitaxial': {
                process: 'Descomposición térmica de carburo de silicio',
                quality: 'Muy alta calidad electrónica',
                scalability: 'Media',
                cost: 'Alto',
                throughput: 'Centímetros cuadrados por hora'
            },
            'Reducción de Óxido': {
                process: 'Reducción química o térmica de óxido de grafeno',
                quality: 'Baja conductividad, defectos',
                scalability: 'Alta',
                cost: 'Muy bajo',
                throughput: 'Kilogramos por hora'
            },
            'Síntesis por Plasma': {
                process: 'Descarga de plasma sobre sustratos a baja temperatura',
                quality: 'Calidad variable',
                scalability: 'Media',
                cost: 'Medio',
                throughput: 'Decímetros cuadrados por hora'
            }
        };
        
        const methodDetails = details[method.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${method.color}20; color: ${method.color};">
                        <ion-icon name="${method.icon}" class="text-3xl"></ion-icon>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${method.color};">${method.title}</h2>
                        <p class="text-text-secondary mt-1">${method.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${methodDetails.process ? `
                        <div>
                            <h4 class="font-bold mb-2 text-graphene-accent-light">Proceso:</h4>
                            <p class="text-text-secondary">${methodDetails.process}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${methodDetails.quality ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-graphene-accent-light">Calidad</h4>
                                <p class="text-text-secondary text-sm">${methodDetails.quality}</p>
                            </div>
                        ` : ''}
                        
                        ${methodDetails.scalability ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-graphene-accent-light">Escalabilidad</h4>
                                <p class="text-text-secondary text-sm">${methodDetails.scalability}</p>
                            </div>
                        ` : ''}
                        
                        ${methodDetails.cost ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-graphene-accent-light">Costo</h4>
                                <p class="text-text-secondary text-sm">${methodDetails.cost}</p>
                            </div>
                        ` : ''}
                        
                        ${methodDetails.throughput ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-graphene-accent-light">Producción</h4>
                                <p class="text-text-secondary text-sm">${methodDetails.throughput}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-graphene-accent-light"># Ventajas de ${method.title}:</span><br>
                            <span class="text-text-secondary">• ${method.title === 'Exfoliación Mecánica' ? 'Calidad excepcional' : method.title === 'CVD' ? 'Escalabilidad industrial' : method.title === 'Exfoliación Líquida' ? 'Bajo costo' : method.title === 'Crecimiento Epitaxial' ? 'Alta pureza' : method.title === 'Reducción de Óxido' ? 'Producción masiva' : 'Baja temperatura'}</span><br>
                            <span class="text-text-secondary">• ${method.title === 'Exfoliación Mecánica' ? 'Sin químicos' : method.title === 'CVD' ? 'Gran área' : method.title === 'Exfoliación Líquida' ? 'Fácil procesamiento' : method.title === 'Crecimiento Epitaxial' ? 'Compatibilidad con Si' : method.title === 'Reducción de Óxido' ? 'Funcionalización fácil' : 'Amplia gama de sustratos'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${method.color};">
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
            lineChart = createLineChart(ctx, getMaterialComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('graphene'));
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
            initMaterialSimulation();
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
                        titleColor: '#34f5d3',
                        bodyColor: '#cbd5e1',
                        borderColor: '#00d4aa',
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
                        titleColor: '#34f5d3',
                        bodyColor: '#cbd5e1',
                        borderColor: '#00d4aa',
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
                        titleColor: '#34f5d3',
                        bodyColor: '#cbd5e1',
                        borderColor: '#00d4aa',
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
    function getMaterialComparisonData() {
        const materials = ['Grafeno', 'Acero', 'Cobre', 'Silicio'];
        const strength = [95, 60, 30, 65];
        const conductivity = [90, 30, 85, 20];
        
        return {
            labels: materials,
            datasets: [
                {
                    label: 'Resistencia',
                    data: strength,
                    borderColor: '#00d4aa',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Conductividad',
                    data: conductivity,
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
    function getRadarChartData(material) {
        const materialData = materialsData[material];
        
        return {
            labels: ['Resistencia', 'Conductividad', 'Flexibilidad', 'Peso', 'Costo'],
            datasets: [{
                label: materialData.name,
                data: [
                    materialData.strength,
                    materialData.conductivity * 90,
                    materialData.flexibility,
                    materialData.weight,
                    materialData.cost
                ],
                backgroundColor: `${materialData.color}20`,
                borderColor: materialData.color,
                pointBackgroundColor: materialData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: materialData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
        };
    }

    // Función para inicializar simulación de materiales
    function initMaterialSimulation() {
        console.log('Inicializando simulación de materiales...');
        
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
                    if (value === 1) {
                        valueElement.textContent = '1 átomo';
                    } else if (value <= 10) {
                        valueElement.textContent = value + ' capas';
                    } else {
                        valueElement.textContent = value + ' capas';
                    }
                } else if (slider.id === 'areaSlider') {
                    const value = parseInt(this.value);
                    const area = Math.round(2630 * (value / 100));
                    valueElement.textContent = area + ' m²/g';
                } else if (slider.id === 'puritySlider') {
                    valueElement.textContent = this.value + '%';
                }
                updateSimulation();
            });
        }
        
        updateSliderValue(thicknessSlider, thicknessValue);
        updateSliderValue(areaSlider, areaValue);
        updateSliderValue(puritySlider, purityValue);
        
        // Botones de material
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
            thicknessSlider.value = 1;
            thicknessValue.textContent = '1 átomo';
            areaSlider.value = 100;
            areaValue.textContent = '2630 m²/g';
            puritySlider.value = 99;
            purityValue.textContent = '99%';
            materialButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-material="graphene"]').classList.add('active');
            
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
        
        console.log('Simulación de materiales inicializada');
    }

    // Función para actualizar simulación
    function updateSimulation() {
        const activeMaterial = document.querySelector('.material-btn.active');
        if (!activeMaterial) return;
        
        const materialType = activeMaterial.dataset.material;
        const thickness = parseInt(document.getElementById('thicknessSlider').value);
        const areaValue = parseInt(document.getElementById('areaSlider').value);
        const purity = parseInt(document.getElementById('puritySlider').value);
        
        const materialData = materialsData[materialType];
        if (!materialData) return;
        
        // Calcular valores basados en el material y parámetros
        let strength = materialData.strength;
        let conductivity = materialData.conductivity;
        let transparency = materialData.transparency;
        
        // Ajustar por espesor (más capas = menor calidad para grafeno)
        if (materialType === 'graphene') {
            if (thickness > 1) {
                strength *= (1 / Math.sqrt(thickness));
                conductivity *= (1 / thickness);
                transparency = Math.max(0, transparency - (thickness - 1) * 10);
            }
        }
        
        // Ajustar por área (más área = mejor para algunas propiedades)
        if (materialType === 'graphene') {
            conductivity *= (areaValue / 100);
        }
        
        // Ajustar por pureza
        const purityFactor = purity / 100;
        strength *= purityFactor;
        conductivity *= purityFactor;
        
        // Limitar valores
        strength = Math.min(Math.max(strength, 0), 200);
        conductivity = Math.min(Math.max(conductivity, 0), 1.0);
        transparency = Math.min(Math.max(transparency, 0), 100);
        
        // Actualizar barras y valores
        if (materialType === 'graphene') {
            document.getElementById('strengthValue').textContent = strength.toFixed(0) + 'x Acero';
        } else {
            document.getElementById('strengthValue').textContent = (strength * 100).toFixed(0) + '% Grafeno';
        }
        document.getElementById('strengthBar').style.width = strength + '%';
        
        document.getElementById('conductivityValue').textContent = (conductivity * 1e8).toFixed(1) + ' S/m';
        document.getElementById('conductivityBar').style.width = (conductivity * 100) + '%';
        
        document.getElementById('transparencyValue').textContent = transparency.toFixed(1) + '%';
        document.getElementById('transparencyBar').style.width = transparency + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(materialType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-graphene-accent-tertiary mr-2"></ion-icon>
            ${materialData.description}
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
        const materialType = activeMaterial ? activeMaterial.dataset.material : 'graphene';
        const materialData = materialsData[materialType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentStrength = parseFloat(document.getElementById('strengthValue').textContent);
                const currentConductivity = parseFloat(document.getElementById('conductivityValue').textContent);
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${materialData.name} analizado exitosamente`, 'success');
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
        const materialType = activeMaterial ? activeMaterial.dataset.material : 'graphene';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-graphene-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-graphene-accent-light">Propiedades por Material</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-graphene-accent-secondary-light">Comparación de Métricas</h4>
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
                        <h4 class="font-bold mb-3 text-graphene-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes materiales. 
                            El grafeno destaca en resistencia y conductividad, mientras que materiales como el acero 
                            tienen ventajas en coste y disponibilidad. Cada material tiene aplicaciones específicas 
                            donde sobresale.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-graphene-accent to-graphene-accent-dark text-white font-bold rounded-xl shadow-lg shadow-graphene-accent/30 hover:shadow-xl hover:shadow-graphene-accent/40 transition-all duration-300">
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
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(materialType));
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
        const years = [2004, 2008, 2012, 2016, 2020, 2024];
        const production = [0.001, 0.1, 1, 10, 100, 1000]; // Toneladas/año
        const market = [0, 10, 50, 200, 800, 1200]; // Millones USD
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'Producción (ton/año)',
                    data: production,
                    borderColor: '#00d4aa',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Mercado (M USD)',
                    data: market,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de barras detallado
    function getDetailedBarChartData() {
        const materials = ['Grafeno', 'Acero', 'Cobre', 'Silicio'];
        const strength = [200, 1, 0.3, 1.5];
        const conductivity = [100, 10, 96, 0.1];
        const cost = [40, 70, 80, 60];
        
        return {
            labels: materials,
            datasets: [
                {
                    label: 'Resistencia (relativa)',
                    data: strength,
                    backgroundColor: 'rgba(0, 212, 170, 0.7)',
                    borderColor: '#00d4aa',
                    borderWidth: 1
                },
                {
                    label: 'Conductividad (%)',
                    data: conductivity,
                    backgroundColor: 'rgba(255, 107, 107, 0.7)',
                    borderColor: '#ff6b6b',
                    borderWidth: 1
                },
                {
                    label: 'Costo Relativo',
                    data: cost,
                    backgroundColor: 'rgba(255, 217, 61, 0.7)',
                    borderColor: '#ffd93d',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(material) {
        const materialData = materialsData[material];
        
        // Datos para todas los materiales
        const labels = ['Resistencia', 'Conductividad', 'Flexibilidad', 'Peso', 'Costo'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Grafeno',
                    data: [95, 90, 95, 100, 40],
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    borderColor: '#00d4aa',
                    pointBackgroundColor: '#00d4aa',
                    borderWidth: 1
                },
                {
                    label: 'Acero',
                    data: [60, 30, 30, 60, 70],
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderColor: '#ff6b6b',
                    pointBackgroundColor: '#ff6b6b',
                    borderWidth: 1
                },
                {
                    label: 'Cobre',
                    data: [30, 85, 85, 70, 80],
                    backgroundColor: 'rgba(255, 217, 61, 0.1)',
                    borderColor: '#ffd93d',
                    pointBackgroundColor: '#ffd93d',
                    borderWidth: 1
                },
                {
                    label: materialData.name,
                    data: [
                        materialData.strength,
                        materialData.conductivity * 90,
                        materialData.flexibility,
                        materialData.weight,
                        materialData.cost
                    ],
                    backgroundColor: `${materialData.color}40`,
                    borderColor: materialData.color,
                    pointBackgroundColor: materialData.color,
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
            "1947: Teoría del grafeno...",
            "2004: Aislamiento experimental...",
            "2008: Primeras aplicaciones electrónicas...",
            "2010: Premio Nobel de Física...",
            "2012: Producción por CVD a escala...",
            "2015: Comercialización inicial...",
            "2018: Aplicaciones en baterías...",
            "2020: Filtros de grafeno para agua...",
            "2022: Composites con grafeno...",
            "2024: Mercado de $1.2B USD..."
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
            { type: 'Producción anual', value: 'mg → toneladas', color: '#00d4aa', icon: 'trending-up-outline' },
            { type: 'Costo por gramo', value: '$1000 → $10', color: '#ff6b6b', icon: 'cash-outline' },
            { type: 'Aplicaciones comerciales', value: '0 → 100+', color: '#ffd93d', icon: 'apps-outline' },
            { type: 'Mercado global', value: '$0 → $1.2B', color: '#8b5cf6', icon: 'business-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-graphene-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución del Grafeno (2004-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico del grafeno desde su aislamiento experimental hasta la actualidad:</p>
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
                        <span class="text-graphene-accent-light"># Tendencias futuras (2025-2035):</span><br>
                        <span class="text-text-secondary">• Grafeno en electrónica flexible masiva</span><br>
                        <span class="text-text-secondary">• Baterías de litio-grafeno comerciales</span><br>
                        <span class="text-text-secondary">• Filtros de agua de grafeno a gran escala</span><br>
                        <span class="text-text-secondary">• Composites estructurales para transporte</span><br>
                        <span class="text-text-secondary">• Sensores biomédicos implantables</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-graphene-accent to-graphene-accent-dark text-white font-bold rounded-xl shadow-lg shadow-graphene-accent/30">
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
    console.log('Aplicación GrafenoLab inicializada correctamente');
});