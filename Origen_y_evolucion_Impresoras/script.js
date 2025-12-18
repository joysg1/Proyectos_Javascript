document.addEventListener('DOMContentLoaded', function() {
    console.log('PrintLine: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let costChart = null;
    let featureChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de fabricantes de impresoras
    const manufacturersData = [
        {
            icon: 'business',
            title: 'HP',
            description: 'Hewlett-Packard, líder mundial en impresoras láser y de inyección de tinta desde 1984.',
            color: '#3b82f6',
            status: 'Líder mundial',
            founded: '1939'
        },
        {
            icon: 'camera',
            title: 'Canon',
            description: 'Especialista en impresión fotográfica y tecnología de inyección de tinta de alta calidad.',
            color: '#ef4444',
            status: 'Especialista en fotografía',
            founded: '1937'
        },
        {
            icon: 'print',
            title: 'Epson',
            description: 'Innovador en tecnología de inyección de tinta con su tecnología PrecisionCore.',
            color: '#10b981',
            status: 'Innovador tecnológico',
            founded: '1942'
        },
        {
            icon: 'document',
            title: 'Xerox',
            description: 'Pionera en fotocopiadoras e impresión láser, inventora de la interfaz gráfica.',
            color: '#f59e0b',
            status: 'Pionera en láser',
            founded: '1906'
        },
        {
            icon: 'cube',
            title: 'Creality',
            description: 'Líder en impresión 3D doméstica con impresoras FDM asequibles y confiables.',
            color: '#8b5cf6',
            status: 'Líder en 3D',
            founded: '2014'
        },
        {
            icon: 'hardware-chip',
            title: 'Brother',
            description: 'Especialista en impresoras multifunción para oficina y etiquetadoras industriales.',
            color: '#000000',
            status: 'Especialista oficina',
            founded: '1908'
        }
    ];

    // Datos de tecnologías para simulación
    const technologiesData = {
        'inkjet': {
            name: 'Inyección de Tinta',
            costPerPage: 0.08,
            speed: 22,
            quality: 9,
            color: '#3b82f6',
            description: 'Ideal para impresión fotográfica y documentos a color de alta calidad.',
            applications: ['Fotografías', 'Material de marketing', 'Documentos a color'],
            reliability: 85,
            efficiency: 75,
            versatility: 90,
            ecoFriendly: 60
        },
        'laser': {
            name: 'Impresora Láser',
            costPerPage: 0.03,
            speed: 40,
            quality: 8,
            color: '#10b981',
            description: 'Perfecta para oficinas con alto volumen de impresión en blanco y negro.',
            applications: ['Documentos de oficina', 'Facturas', 'Manuales técnicos'],
            reliability: 95,
            efficiency: 90,
            versatility: 70,
            ecoFriendly: 65
        },
        'dotmatrix': {
            name: 'Matriz de Puntos',
            costPerPage: 0.02,
            speed: 3,
            quality: 4,
            color: '#f59e0b',
            description: 'Especializada en formularios continuos y documentos con múltiples copias.',
            applications: ['Formularios continuos', 'Comprobantes', 'Copias carbón'],
            reliability: 98,
            efficiency: 50,
            versatility: 40,
            ecoFriendly: 30
        },
        '3d': {
            name: 'Impresión 3D',
            costPerPart: 2.50,
            speed: 5,
            quality: 7,
            color: '#8b5cf6',
            description: 'Revoluciona la manufactura con creación de objetos tridimensionales capa por capa.',
            applications: ['Prototipos', 'Piezas personalizadas', 'Maquetas arquitectónicas'],
            reliability: 75,
            efficiency: 60,
            versatility: 85,
            ecoFriendly: 70
        }
    };

    // Inicializar componentes
    initPrintParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initPrintSimulation();
    initCharts();

    // Función para inicializar partículas de impresión
    function initPrintParticles() {
        const canvas = document.getElementById('print-particles');
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
                
                if (type < 0.4) {
                    // Partículas de tinta (azul)
                    color = `rgba(59, 130, 246, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.7) {
                    // Partículas de papel (blanco)
                    color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.2;
                } else if (type < 0.9) {
                    // Partículas de tóner (negro)
                    color = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 1.5 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Partículas 3D (púrpura)
                    color = `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.2,
                    color: color,
                    pulseSpeed: Math.random() * 0.03 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.4 ? 'ink' : type < 0.7 ? 'paper' : type < 0.9 ? 'toner' : '3d'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo sutil
            ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar líneas entre partículas cercanas
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
            ctx.lineWidth = 0.3;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
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
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Gradiente para partículas especiales
                if (particle.type === '3d') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(139, 92, 246, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                
                // Efecto de estela para papel
                if (particle.type === 'paper') {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle.x - particle.speedX * 10, particle.y - particle.speedY * 10);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.5})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
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
        console.log('Partículas de impresión inicializadas');
    }

    // Función para inicializar fabricantes
    function initManufacturers() {
        const container = document.getElementById('manufacturersInfo');
        if (!container) {
            console.error('Contenedor de fabricantes no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-print-accent-light">Fabricantes de Impresoras</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="manufacturersGrid">
                ${manufacturersData.map(manufacturer => `
                    <div class="manufacturer-card bg-gray-800/40 border border-border-light rounded-xl p-4 hover:border-print-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-manufacturer="${manufacturer.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${manufacturer.color}20; color: ${manufacturer.color};">
                                <ion-icon name="${manufacturer.icon}" class="text-xl"></ion-icon>
                            </div>
                            <div>
                                <h4 class="font-bold">${manufacturer.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${manufacturer.color}20; color: ${manufacturer.color};">${manufacturer.status}</span>
                                    <span class="text-xs text-text-muted">${manufacturer.founded}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${manufacturer.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de fabricantes
        document.querySelectorAll('.manufacturer-card').forEach(card => {
            card.addEventListener('click', function() {
                const manufacturerName = this.getAttribute('data-manufacturer');
                showManufacturerDetail(manufacturerName);
            });
        });
        
        console.log('Fabricantes inicializados: ' + manufacturersData.length);
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturerName) {
        const manufacturer = manufacturersData.find(m => m.title === manufacturerName);
        if (!manufacturer) return;
        
        const details = {
            'HP': {
                innovations: 'LaserJet (1984), Deskjet (1988), Inkjet Web Press, PageWide Technology',
                marketPosition: 'Líder mundial con ~40% del mercado de impresión',
                revenue: '$58.8B (2023)',
                keyProducts: 'LaserJet, OfficeJet, DesignJet, PageWide'
            },
            'Canon': {
                innovations: 'Sistema de inyección de burbuja (1977), FINE print head, tecnología imagePROGRAF',
                marketPosition: 'Líder en impresión fotográfica y profesional',
                revenue: '$30.3B (2023)',
                keyProducts: 'PIXMA, imagePROGRAF, MAXIFY, SELPHY'
            },
            'Epson': {
                innovations: 'Tecnología Micro Piezo, PrecisionCore, impresión sin calor, EcoTank',
                marketPosition: 'Innovador en tecnología de inyección sostenible',
                revenue: '$9.8B (2023)',
                keyProducts: 'EcoTank, WorkForce, SureColor, Expression'
            },
            'Xerox': {
                innovations: 'Fotocopiadora (1959), interfaz gráfica, impresión láser, impresión digital',
                marketPosition: 'Pionera en impresión digital y servicios documentales',
                revenue: '$7.1B (2023)',
                keyProducts: 'VersaLink, AltaLink, Phaser, WorkCentre'
            },
            'Creality': {
                innovations: 'CR series, Ender series, impresoras 3D de bajo costo, open source',
                marketPosition: 'Líder en impresión 3D doméstica asequible',
                revenue: '~$500M (2023 est.)',
                keyProducts: 'Ender 3, CR-10, Halot, K1'
            },
            'Brother': {
                innovations: 'Impresoras multifunción, etiquetadoras P-touch, impresión industrial',
                marketPosition: 'Especialista en soluciones de oficina y etiquetado',
                revenue: '$6.3B (2023)',
                keyProducts: 'MFC, HL, PT, PJ'
            }
        };
        
        const manufacturerDetails = details[manufacturer.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${manufacturer.color}20; color: ${manufacturer.color};">
                        <ion-icon name="${manufacturer.icon}" class="text-3xl"></ion-icon>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${manufacturer.color};">${manufacturer.title}</h2>
                        <p class="text-text-secondary mt-1">${manufacturer.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${manufacturerDetails.innovations ? `
                        <div>
                            <h4 class="font-bold mb-2 text-print-accent-light">Innovaciones:</h4>
                            <p class="text-text-secondary">${manufacturerDetails.innovations}</p>
                        </div>
                    ` : ''}
                    
                    ${manufacturerDetails.marketPosition ? `
                        <div>
                            <h4 class="font-bold mb-2 text-print-accent-light">Posición de mercado:</h4>
                            <p class="text-text-secondary">${manufacturerDetails.marketPosition}</p>
                        </div>
                    ` : ''}
                    
                    ${manufacturerDetails.revenue ? `
                        <div>
                            <h4 class="font-bold mb-2 text-print-accent-light">Ingresos:</h4>
                            <p class="text-text-secondary">${manufacturerDetails.revenue}</p>
                        </div>
                    ` : ''}
                    
                    ${manufacturerDetails.keyProducts ? `
                        <div>
                            <h4 class="font-bold mb-2 text-print-accent-light">Productos clave:</h4>
                            <p class="text-text-secondary">${manufacturerDetails.keyProducts}</p>
                        </div>
                    ` : ''}
                    
                    <div class="bg-gray-800/50 rounded-lg p-4 mt-4">
                        <div class="font-roboto-mono text-sm">
                            <span class="text-print-accent-light"># Datos históricos:</span><br>
                            <span class="text-text-secondary">• Fundación: ${manufacturer.founded}</span><br>
                            <span class="text-text-secondary">• País de origen: ${manufacturer.title === 'HP' ? 'EE.UU.' : manufacturer.title === 'Canon' || manufacturer.title === 'Epson' || manufacturer.title === 'Brother' ? 'Japón' : manufacturer.title === 'Xerox' ? 'EE.UU.' : 'China'}</span><br>
                            <span class="text-text-secondary">• Empleados: ${manufacturer.title === 'HP' ? '60,000+' : manufacturer.title === 'Canon' ? '180,000+' : manufacturer.title === 'Epson' ? '80,000+' : '10,000+'}</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg">
                        <h4 class="font-bold mb-2 text-print-accent-light">Impacto en la industria:</h4>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="text-center p-2 bg-gray-800/50 rounded">
                                <div class="text-xs text-text-muted">Cuota de mercado</div>
                                <div class="font-bold" style="color: ${manufacturer.color};">${manufacturer.title === 'HP' ? '~40%' : manufacturer.title === 'Canon' ? '~25%' : manufacturer.title === 'Epson' ? '~18%' : '~5%'}</div>
                            </div>
                            <div class="text-center p-2 bg-gray-800/50 rounded">
                                <div class="text-xs text-text-muted">Patentes activas</div>
                                <div class="font-bold" style="color: ${manufacturer.color};">${manufacturer.title === 'HP' ? '25,000+' : manufacturer.title === 'Canon' ? '45,000+' : manufacturer.title === 'Epson' ? '15,000+' : '5,000+'}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn ion-button ion-button-filled" style="background: ${manufacturer.color}20; border-color: ${manufacturer.color}; color: ${manufacturer.color}">
                        <ion-icon name="checkmark"></ion-icon> Cerrar
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
                item.classList.add('visible');
            }, index * 200);
        });
        
        // También agregar observador para animación al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        timelineItems.forEach(item => {
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
        
        // Gráfico de costos
        const costChartCanvas = document.getElementById('costChartCanvas');
        if (costChartCanvas) {
            const parent = costChartCanvas.parentElement;
            costChartCanvas.width = parent.clientWidth;
            costChartCanvas.height = parent.clientHeight;
            
            const ctx = costChartCanvas.getContext('2d');
            costChart = createCostChart(ctx, getTechnologyCostData());
        }
        
        // Gráfico de características
        const featureChartCanvas = document.getElementById('featureChartCanvas');
        if (featureChartCanvas) {
            const parent = featureChartCanvas.parentElement;
            featureChartCanvas.width = parent.clientWidth;
            featureChartCanvas.height = parent.clientHeight;
            
            const ctx = featureChartCanvas.getContext('2d');
            featureChart = createFeatureChart(ctx, getFeatureChartData('inkjet'));
        }
        
        console.log('Gráficos inicializados');
    }

    // Función para crear gráfico de costos
    function createCostChart(ctx, data) {
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
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: '#60a5fa',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `$${context.raw.toFixed(2)} por página`;
                            }
                        }
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
                            },
                            callback: function(value) {
                                return `$${value}`;
                            }
                        },
                        beginAtZero: true
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

    // Función para crear gráfico de características
    function createFeatureChart(ctx, data) {
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
                            showLabelBackdrop: false,
                            stepSize: 20
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
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: '#60a5fa',
                        bodyColor: '#cbd5e1',
                        borderColor: '#3b82f6',
                        borderWidth: 1
                    }
                }
            }
        });
    }

    // Función para obtener datos para gráfico de costos
    function getTechnologyCostData() {
        const technologies = ['Inyección', 'Láser', 'Matriz', '3D*'];
        const costs = [0.08, 0.03, 0.02, 2.50];
        
        return {
            labels: technologies,
            datasets: [
                {
                    label: 'Costo por página/pieza',
                    data: costs,
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(139, 92, 246, 0.7)'
                    ],
                    borderColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6'
                    ],
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de características
    function getFeatureChartData(technology) {
        const techData = technologiesData[technology];
        
        return {
            labels: ['Fiabilidad', 'Eficiencia', 'Versatilidad', 'Calidad', 'Sostenibilidad'],
            datasets: [{
                label: techData.name,
                data: [
                    techData.reliability,
                    techData.efficiency,
                    techData.versatility,
                    techData.quality * 10,
                    techData.ecoFriendly
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

    // Función para inicializar simulación de impresión
    function initPrintSimulation() {
        console.log('Inicializando simulación de impresión...');
        
        // Elementos del DOM
        const technologyButtons = document.querySelectorAll('.print-tech-btn');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeValue = document.getElementById('volumeValue');
        const qualitySlider = document.getElementById('qualitySlider');
        const qualityValue = document.getElementById('qualityValue');
        const contentSelect = document.getElementById('contentSelect');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        
        // Verificar que todos los elementos existan
        if (!volumeSlider || !technologyButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        volumeSlider.addEventListener('input', function() {
            volumeValue.textContent = this.value;
            updateSimulation();
        });
        
        qualitySlider.addEventListener('input', function() {
            const qualities = ['Baja', 'Media', 'Alta'];
            qualityValue.textContent = qualities[this.value - 1];
            updateSimulation();
        });
        
        contentSelect.addEventListener('change', function() {
            updateSimulation();
        });
        
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
            runPrintSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            volumeSlider.value = 1000;
            volumeValue.textContent = '1000';
            qualitySlider.value = 3;
            qualityValue.textContent = 'Alta';
            contentSelect.value = 'color';
            technologyButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-tech="inkjet"]').classList.add('active');
            
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
        
        console.log('Simulación de impresión inicializada');
    }

    // Función para actualizar simulación
    function updateSimulation() {
        const activeTech = document.querySelector('.print-tech-btn.active');
        if (!activeTech) return;
        
        const techType = activeTech.dataset.tech;
        const volume = parseInt(document.getElementById('volumeSlider').value);
        const qualityLevel = parseInt(document.getElementById('qualitySlider').value);
        const contentType = document.getElementById('contentSelect').value;
        
        const techData = technologiesData[techType];
        if (!techData) return;
        
        // Calcular valores basados en la tecnología y parámetros
        let cost = techType === '3d' ? techData.costPerPart : techData.costPerPage;
        let speed = techData.speed;
        let quality = techData.quality;
        
        // Ajustar por volumen
        if (techType === 'inkjet') {
            cost -= (volume > 5000 ? 0.02 : volume > 1000 ? 0.01 : 0);
        } else if (techType === 'laser') {
            cost -= (volume > 5000 ? 0.01 : volume > 1000 ? 0.005 : 0);
            speed += (volume > 5000 ? 10 : volume > 1000 ? 5 : 0);
        }
        
        // Ajustar por calidad
        if (qualityLevel === 1) {
            cost *= 0.7;
            quality *= 0.7;
        } else if (qualityLevel === 2) {
            cost *= 0.9;
            quality *= 0.9;
        }
        
        // Ajustar por tipo de contenido
        if (techType === 'inkjet') {
            if (contentType === 'photo') {
                cost *= 1.5;
                quality += 1;
            } else if (contentType === 'color') {
                cost *= 1.2;
            }
        } else if (techType === 'laser' && contentType !== 'text') {
            cost *= 1.3;
            if (contentType === 'color') speed *= 0.7;
        }
        
        // Limitar valores
        cost = techType === '3d' 
            ? Math.max(cost, 0.5)
            : Math.max(cost, 0.01);
        speed = Math.min(Math.max(speed, 1), 100);
        quality = Math.min(Math.max(quality, 1), 10);
        
        // Actualizar valores y barras
        document.getElementById('costValue').textContent = techType === '3d' 
            ? `$${cost.toFixed(2)}` 
            : `$${cost.toFixed(2)}`;
        document.getElementById('costBar').style.width = techType === '3d' 
            ? Math.min(cost / 10 * 100, 100) + '%'
            : Math.min(cost / 0.5 * 100, 100) + '%';
        
        document.getElementById('speedValue').textContent = techType === '3d' 
            ? `${speed.toFixed(1)} mm/h`
            : `${speed.toFixed(0)} ppm`;
        document.getElementById('speedBar').style.width = (speed / 100 * 100) + '%';
        
        document.getElementById('qualityResultValue').textContent = `${quality.toFixed(1)}/10`;
        document.getElementById('qualityBar').style.width = (quality / 10 * 100) + '%';
        
        // Actualizar gráfico de características si está disponible
        if (featureChart && typeof Chart !== 'undefined') {
            featureChart.data = getFeatureChartData(techType);
            featureChart.update();
        }
        
        // Actualizar gráfico de costos si está disponible
        if (costChart && typeof Chart !== 'undefined') {
            costChart.data.datasets[0].data = [
                technologiesData.inkjet.costPerPage,
                technologiesData.laser.costPerPage,
                technologiesData.dotmatrix.costPerPage,
                technologiesData['3d'].costPerPart
            ];
            costChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        conclusion.innerHTML = `
            <ion-icon name="information-circle" class="text-print-warning mr-2"></ion-icon>
            ${techData.description}
        `;
    }

    // Función para ejecutar simulación completa
    function runPrintSimulation() {
        const btn = document.getElementById('runSimulationBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<ion-icon name="refresh" class="animate-spin mr-2"></ion-icon> Simulando...';
        btn.disabled = true;
        
        // Mostrar animación de progreso
        const activeTech = document.querySelector('.print-tech-btn.active');
        const techType = activeTech ? activeTech.dataset.tech : 'inkjet';
        const techData = technologiesData[techType];
        
        // Simular proceso de impresión con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentCost = parseFloat(document.getElementById('costValue').textContent.replace('$', ''));
                const newCost = Math.max(currentCost * 0.95, techType === '3d' ? 0.5 : 0.01);
                
                document.getElementById('costValue').textContent = techType === '3d' 
                    ? `$${newCost.toFixed(2)}` 
                    : `$${newCost.toFixed(2)}`;
                document.getElementById('costBar').style.width = techType === '3d' 
                    ? Math.min(newCost / 10 * 100, 100) + '%'
                    : Math.min(newCost / 0.5 * 100, 100) + '%';
                
                // Mejorar velocidad
                const currentSpeed = parseFloat(document.getElementById('speedValue').textContent);
                const newSpeed = currentSpeed * 1.05;
                
                document.getElementById('speedValue').textContent = techType === '3d' 
                    ? `${newSpeed.toFixed(1)} mm/h`
                    : `${Math.round(newSpeed)} ppm`;
                document.getElementById('speedBar').style.width = Math.min(newSpeed / 100 * 100, 100) + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${techData.name} optimizada exitosamente`, 'success');
            }
        }, 100);
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        if (simulateEvolutionBtn) {
            simulateEvolutionBtn.addEventListener('click', simulatePrintEvolution);
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
                    chartModal.querySelector('.modal-close-btn')?.click();
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

    // Función para simulación de evolución de impresión
    function simulatePrintEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<ion-icon name="refresh" class="animate-spin mr-2"></ion-icon> Simulando evolución...';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1440: Prensa de Gutenberg...",
            "1714: Máquina de escribir...",
            "1868: Primeras duplicadoras...",
            "1953: Primera impresora electrónica...",
            "1971: Primera impresora láser...",
            "1976: Inyección de tinta comercial...",
            "1984: HP LaserJet para escritorio...",
            "1994: Primera impresora a color asequible...",
            "2009: Impresión 3D comercial...",
            "2015: Impresión sostenible y reciclable...",
            "2024: Impresión 4D y bioprinting..."
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<ion-icon name="refresh" class="animate-spin mr-2"></ion-icon> ${steps[step]}`;
                step++;
            }
        }, 600);
        
        // Simular proceso completo
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showPrintEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 7000);
    }

    // Función para mostrar resultados de evolución
    function showPrintEvolutionResults() {
        const results = [
            { type: 'Velocidad (1440-2024)', value: '25→150 ppm', color: '#3b82f6', icon: 'speedometer' },
            { type: 'Resolución', value: '72→4800 dpi', color: '#10b981', icon: 'scan' },
            { type: 'Costo por página', value: '$10→$0.03', color: '#f59e0b', icon: 'cash' },
            { type: 'Tecnologías disponibles', value: '1→50+', color: '#8b5cf6', icon: 'layers' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-print-accent-light">
                    <ion-icon name="trending-up" class="mr-2"></ion-icon> Evolución de la Tecnología de Impresión
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de las tecnologías de impresión desde 1440 hasta la actualidad:</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    ${results.map(result => `
                        <div class="bg-gray-800/50 rounded-xl p-4 text-center">
                            <div class="text-2xl md:text-3xl mb-2" style="color: ${result.color};">
                                <ion-icon name="${result.icon}"></ion-icon>
                            </div>
                            <div class="text-2xl md:text-3xl font-black mb-1" style="background: linear-gradient(90deg, ${result.color}, ${result.color}99); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${result.value}</div>
                            <div class="text-sm text-text-secondary">${result.type}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-4 mb-6">
                    <div class="font-roboto-mono text-sm space-y-1">
                        <span class="text-print-accent-light"># Tendencias futuras (2024-2030):</span><br>
                        <span class="text-text-secondary">• Impresión 4D con materiales que cambian con el tiempo</span><br>
                        <span class="text-text-secondary">• Bioprinting para tejidos y órganos humanos</span><br>
                        <span class="text-text-secondary">• Impresión sostenible con materiales 100% reciclables</span><br>
                        <span class="text-text-secondary">• Nanotinta para electrónica impresa</span><br>
                        <span class="text-text-secondary">• Impresión en cualquier superficie y forma</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn ion-button ion-button-filled">
                        <ion-icon name="checkmark"></ion-icon> Cerrar
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

    // Función para mostrar gráficos detallados
    function showDetailedCharts() {
        // Verificar si Chart.js está disponible
        if (typeof Chart === 'undefined') {
            showNotification('Cargando librería de gráficos...', 'info');
            loadChartJS();
            return;
        }
        
        const activeTech = document.querySelector('.print-tech-btn.active');
        const techType = activeTech ? activeTech.dataset.tech : 'inkjet';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-print-accent-light">
                    <ion-icon name="stats-chart" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-800/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-print-accent-light">Costos Totales por Volumen</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedCostChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-800/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-print-secondary-light">Comparación de Tecnologías</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedComparisonChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-800/50 rounded-xl p-4">
                        <h4 class="font-bold text-lg mb-4 text-center text-purple-300">Análisis Multidimensional</h4>
                        <div class="w-full h-80">
                            <canvas id="detailedRadarChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="bg-gray-800/40 rounded-lg p-4">
                        <h4 class="font-bold mb-3 text-print-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes tecnologías de impresión. 
                            La inyección de tinta destaca en calidad fotográfica, mientras que el láser domina en volumen y costo. 
                            La matriz de puntos es especializada para formularios y la impresión 3D revoluciona la fabricación.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="ion-button ion-button-filled">
                        <ion-icon name="download"></ion-icon> Exportar Datos
                    </button>
                    <button class="close-chart-btn ion-button ion-button-outline">
                        <ion-icon name="close"></ion-icon> Cerrar
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
            // Gráfico de costos detallado
            const detailedCostCanvas = document.getElementById('detailedCostChart');
            if (detailedCostCanvas && typeof Chart !== 'undefined') {
                if (detailedLineChart) {
                    detailedLineChart.destroy();
                }
                
                const ctx = detailedCostCanvas.getContext('2d');
                detailedLineChart = createDetailedCostChart(ctx);
            }
            
            // Gráfico de comparación detallado
            const detailedComparisonCanvas = document.getElementById('detailedComparisonChart');
            if (detailedComparisonCanvas && typeof Chart !== 'undefined') {
                if (detailedBarChart) {
                    detailedBarChart.destroy();
                }
                
                const ctx = detailedComparisonCanvas.getContext('2d');
                detailedBarChart = createDetailedComparisonChart(ctx);
            }
            
            // Gráfico de radar detallado
            const detailedRadarCanvas = document.getElementById('detailedRadarChart');
            if (detailedRadarCanvas && typeof Chart !== 'undefined') {
                if (detailedRadarChart) {
                    detailedRadarChart.destroy();
                }
                
                const ctx = detailedRadarCanvas.getContext('2d');
                detailedRadarChart = createDetailedRadarChart(ctx, techType);
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
        
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
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

    // Función para crear gráfico de costos detallado
    function createDetailedCostChart(ctx) {
        const volumes = [100, 500, 1000, 5000, 10000];
        const inkjetCosts = volumes.map(v => v * 0.08);
        const laserCosts = volumes.map(v => v * 0.03);
        const dotmatrixCosts = volumes.map(v => v * 0.02);
        
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: volumes.map(v => `${v}`),
                datasets: [
                    {
                        label: 'Inyección',
                        data: inkjetCosts,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 2
                    },
                    {
                        label: 'Láser',
                        data: laserCosts,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 2
                    },
                    {
                        label: 'Matriz',
                        data: dotmatrixCosts,
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { 
                            color: '#94a3b8',
                            callback: function(value) {
                                return `$${value}`;
                            }
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Función para crear gráfico de comparación detallado
    function createDetailedComparisonChart(ctx) {
        const technologies = ['Inyección', 'Láser', 'Matriz', '3D'];
        const speed = [22, 40, 3, 5];
        const quality = [9, 8, 4, 7];
        const reliability = [85, 95, 98, 75];
        
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: technologies,
                datasets: [
                    {
                        label: 'Velocidad',
                        data: speed,
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: '#3b82f6',
                        borderWidth: 1
                    },
                    {
                        label: 'Calidad',
                        data: quality,
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: '#10b981',
                        borderWidth: 1
                    },
                    {
                        label: 'Fiabilidad',
                        data: reliability,
                        backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        borderColor: '#f59e0b',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#94a3b8' },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Función para crear gráfico de radar detallado
    function createDetailedRadarChart(ctx, technology) {
        const techData = technologiesData[technology];
        
        const labels = ['Fiabilidad', 'Eficiencia', 'Versatilidad', 'Calidad', 'Sostenibilidad', 'Costo-Beneficio'];
        
        return {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Inyección',
                        data: [85, 75, 90, 90, 60, 70],
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderColor: '#3b82f6',
                        borderWidth: 1
                    },
                    {
                        label: 'Láser',
                        data: [95, 90, 70, 80, 65, 85],
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderColor: '#10b981',
                        borderWidth: 1
                    },
                    {
                        label: techData.name,
                        data: [
                            techData.reliability,
                            techData.efficiency,
                            techData.versatility,
                            techData.quality * 10,
                            techData.ecoFriendly,
                            100 - (techType === '3d' ? techData.costPerPart * 10 : techData.costPerPage * 500)
                        ],
                        backgroundColor: `${techData.color}40`,
                        borderColor: techData.color,
                        borderWidth: 3,
                        pointRadius: 5
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#cbd5e1' },
                        ticks: { 
                            color: '#94a3b8',
                            stepSize: 20
                        },
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1'
                        }
                    }
                }
            }
        };
    }

    // Función auxiliar para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            'success': 'linear-gradient(135deg, #10b981, #059669)',
            'error': 'linear-gradient(135deg, #ef4444, #dc2626)',
            'warning': 'linear-gradient(135deg, #f59e0b, #d97706)',
            'info': 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
        };
        
        notification.className = 'notification';
        notification.style.background = colors[type];
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
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
            initPrintSimulation();
        };
        script.onerror = function() {
            console.error('Error al cargar Chart.js');
            showNotification('Error al cargar librería de gráficos. Recarga la página.', 'error');
        };
        document.head.appendChild(script);
    }

    // Mensaje de inicialización completa
    console.log('Aplicación PrintLine inicializada correctamente');
});