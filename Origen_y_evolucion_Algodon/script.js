document.addEventListener('DOMContentLoaded', function() {
    console.log('CottonLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de variedades de algodón
    const cottonVarietiesData = [
        {
            icon: 'leaf-outline',
            title: 'Algodón Upland',
            description: 'Variedad más común, representa el 90% de la producción mundial.',
            color: '#4ade80',
            status: 'Dominante',
            year: 'Nativo'
        },
        {
            icon: 'flower-outline',
            title: 'Algodón Pima/Egyptian',
            description: 'Fibras extra-largas, suaves y de alta calidad para textiles premium.',
            color: '#f59e0b',
            status: 'Premium',
            year: 'Perú/EEUU'
        },
        {
            icon: 'flash-outline',
            title: 'Algodón Bt (Transgénico)',
            description: 'Modificado genéticamente para resistencia a plagas, reduce pesticidas.',
            color: '#f97316',
            status: 'Moderno',
            year: '1996'
        },
        {
            icon: 'shield-checkmark-outline',
            title: 'Algodón Orgánico',
            description: 'Cultivado sin pesticidas sintéticos, fertilizantes químicos ni OGM.',
            color: '#8b5cf6',
            status: 'Sostenible',
            year: '1990s'
        },
        {
            icon: 'water-outline',
            title: 'Algodón de Regadío',
            description: 'Cultivado con sistemas de irrigación controlada en zonas áridas.',
            color: '#00a8ff',
            status: 'Eficiente',
            year: 'Siglo XX'
        },
        {
            icon: 'color-filter-outline',
            title: 'Algodón Naturalmente Coloreado',
            description: 'Produce fibras en colores naturales como marrón, verde y beige.',
            color: '#ff4757',
            status: 'Especial',
            year: 'Antiguo'
        }
    ];

    // Datos de fibras para simulación
    const fibersData = {
        'cotton': {
            name: 'Algodón',
            comfort: 95,
            absorption: 90,
            sustainability: 75,
            durability: 80,
            color: '#4ade80',
            description: 'Fibra natural celulósica, suave, transpirable e hipoalergénica.',
            applications: ['Ropa', 'Toallas', 'Ropa de cama', 'Productos médicos'],
            production: 90,
            biodegradability: 95
        },
        'polyester': {
            name: 'Poliéster',
            comfort: 60,
            absorption: 20,
            sustainability: 40,
            durability: 90,
            color: '#f59e0b',
            description: 'Fibra sintética derivada del petróleo, resistente y de secado rápido.',
            applications: ['Ropa deportiva', 'Cortinas', 'Rellenos', 'Cuerdas'],
            production: 85,
            biodegradability: 10
        },
        'wool': {
            name: 'Lana',
            comfort: 85,
            absorption: 30,
            sustainability: 70,
            durability: 75,
            color: '#f97316',
            description: 'Fibra proteica animal, térmica, elástica y resistente al fuego.',
            applications: ['Suéteres', 'Alfombras', 'Mantas', 'Prendas de invierno'],
            production: 60,
            biodegradability: 90
        },
        'linen': {
            name: 'Lino',
            comfort: 80,
            absorption: 70,
            sustainability: 85,
            durability: 70,
            color: '#8b5cf6',
            description: 'Fibra de la planta del lino, fresca, fuerte y con caída natural.',
            applications: ['Ropa de verano', 'Mantelería', 'Decoración', 'Bolsas'],
            production: 50,
            biodegradability: 95
        }
    };

    // Inicializar componentes
    initCottonParticles();
    initCottonVarieties();
    initEventListeners();
    initAnimations();
    initTimeline();
    initFiberSimulation();
    initCharts();

    // Función para inicializar partículas de algodón (fibras)
    function initCottonParticles() {
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
                    // Fibras de algodón (verde suave)
                    color = `rgba(74, 222, 128, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 6 + 3;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Semillas de algodón (marrón)
                    color = `rgba(180, 83, 9, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Flor de algodón (blanco)
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
                    type: type < 0.6 ? 'fiber' : type < 0.85 ? 'seed' : 'flower'
                });
            }
        }
        
        function drawCottonFiber(ctx, x, y, size, rotation) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            // Dibujar una fibra de algodón
            ctx.beginPath();
            
            if (particles.find(p => p.x === x && p.y === y)?.type === 'flower') {
                // Flor de algodón
                for (let i = 0; i < 5; i++) {
                    const angle = (i * Math.PI * 2) / 5;
                    const petalX = Math.cos(angle) * size;
                    const petalY = Math.sin(angle) * size;
                    
                    ctx.moveTo(0, 0);
                    ctx.ellipse(petalX, petalY, size/2, size/1.5, angle, 0, Math.PI * 2);
                }
            } else if (particles.find(p => p.x === x && p.y === y)?.type === 'seed') {
                // Semilla de algodón
                ctx.ellipse(0, 0, size, size/1.5, 0, 0, Math.PI * 2);
            } else {
                // Fibra alargada
                ctx.ellipse(0, 0, size/2, size, rotation, 0, Math.PI * 2);
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
            gradient.addColorStop(0, 'rgba(26, 46, 26, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 18, 10, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar conexiones entre partículas cercanas
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.1)';
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
                
                // Dibujar partícula como fibra/flor
                ctx.save();
                
                if (particle.type === 'flower') {
                    // Gradiente para flores
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
                
                drawCottonFiber(ctx, particle.x, particle.y, particle.size, particle.rotation);
                ctx.fill();
                
                // Borde para fibras
                if (particle.type === 'fiber') {
                    ctx.strokeStyle = `rgba(74, 222, 128, ${currentAlpha * 0.7})`;
                    ctx.lineWidth = 1;
                    drawCottonFiber(ctx, particle.x, particle.y, particle.size, particle.rotation);
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
        console.log('Partículas de algodón inicializadas');
    }

    // Función para inicializar variedades de algodón
    function initCottonVarieties() {
        const container = document.getElementById('productionInfo');
        if (!container) {
            console.error('Contenedor de variedades no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-cotton-accent-light">Variedades de Algodón</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="varietiesGrid">
                ${cottonVarietiesData.map(variety => `
                    <div class="method-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-cotton-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-method="${variety.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${variety.color}20; color: ${variety.color};">
                                <ion-icon name="${variety.icon}" class="text-xl"></ion-icon>
                            </div>
                            <div>
                                <h4 class="font-bold">${variety.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${variety.color}20; color: ${variety.color};">${variety.status}</span>
                                    <span class="text-xs text-text-muted">${variety.year}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${variety.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de variedades
        document.querySelectorAll('.method-card').forEach(card => {
            card.addEventListener('click', function() {
                const varietyName = this.getAttribute('data-method');
                showVarietyDetail(varietyName);
            });
        });
        
        console.log('Variedades de algodón inicializadas: ' + cottonVarietiesData.length);
    }

    // Función para mostrar detalle de variedad
    function showVarietyDetail(varietyName) {
        const variety = cottonVarietiesData.find(v => v.title === varietyName);
        if (!variety) return;
        
        const details = {
            'Algodón Upland': {
                features: 'Fibras medianas, alta productividad, adaptabilidad climática',
                impact: 'Base de la industria textil mundial, bajo costo',
                adoption: '90% de la producción mundial',
                size: 'Longitud: 25-32 mm',
                region: 'EEUU, China, India, Brasil'
            },
            'Algodón Pima/Egyptian': {
                features: 'Fibras extra-largas (≥34mm), suavidad excepcional, brillo natural',
                impact: 'Textiles de lujo, sábanas premium, camisas de alta calidad',
                adoption: '3% de la producción mundial',
                size: 'Longitud: 34-50 mm',
                region: 'Perú, EEUU (Arizona), Egipto'
            },
            'Algodón Bt (Transgénico)': {
                features: 'Resistencia a insectos lepidópteros, reducción de pesticidas',
                impact: 'Aumento productividad 15-25%, menor impacto ambiental',
                adoption: '75% del algodón en India, 90% en EEUU',
                size: 'Rendimiento: +20%',
                region: 'Global, especialmente países en desarrollo'
            },
            'Algodón Orgánico': {
                features: 'Sin pesticidas sintéticos, sin OGM, rotación de cultivos',
                impact: 'Salud del suelo, biodiversidad, condiciones laborales justas',
                adoption: '1% del mercado global, crecimiento 10% anual',
                size: 'Rendimiento: -20% vs convencional',
                region: 'India, Turquía, China, Kirguistán'
            },
            'Algodón de Regadío': {
                features: 'Cultivo controlado, alta productividad, independencia de lluvias',
                impact: 'Estabilidad productiva, riesgo de salinización de suelos',
                adoption: '40% de la producción mundial',
                size: 'Consumo agua: 10,000 L/kg',
                region: 'Centro de EEUU, Uzbekistán, China'
            },
            'Algodón Naturalmente Coloreado': {
                features: 'Pigmentación natural, sin teñido químico, colores tierra',
                impact: 'Reducción contaminación agua, productos ecológicos únicos',
                adoption: 'Muy limitada, nicho de mercado',
                size: 'Rendimiento: bajo, colores: marrón, verde, beige',
                region: 'América Central, Asia Central'
            }
        };
        
        const varietyDetails = details[variety.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${variety.color}20; color: ${variety.color};">
                        <ion-icon name="${variety.icon}" class="text-3xl"></ion-icon>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${variety.color};">${variety.title}</h2>
                        <p class="text-text-secondary mt-1">${variety.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${varietyDetails.features ? `
                        <div>
                            <h4 class="font-bold mb-2 text-cotton-accent-light">Características Principales:</h4>
                            <p class="text-text-secondary">${varietyDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${varietyDetails.impact ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-cotton-accent-light">Impacto</h4>
                                <p class="text-text-secondary text-sm">${varietyDetails.impact}</p>
                            </div>
                        ` : ''}
                        
                        ${varietyDetails.adoption ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-cotton-accent-light">Adopción</h4>
                                <p class="text-text-secondary text-sm">${varietyDetails.adoption}</p>
                            </div>
                        ` : ''}
                        
                        ${varietyDetails.size ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-cotton-accent-light">Características Técnicas</h4>
                                <p class="text-text-secondary text-sm">${varietyDetails.size}</p>
                            </div>
                        ` : ''}
                        
                        ${varietyDetails.region ? `
                            <div class="bg-gray-900/50 rounded-lg p-3">
                                <h4 class="font-bold text-sm mb-1 text-cotton-accent-light">Regiones Principales</h4>
                                <p class="text-text-secondary text-sm">${varietyDetails.region}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-cotton-accent-light"># Importancia de ${variety.title}:</span><br>
                            <span class="text-text-secondary">• ${variety.title === 'Algodón Upland' ? 'Sostiene la industria textil global' : variety.title === 'Algodón Pima/Egyptian' ? 'Estándar de calidad para textiles premium' : variety.title === 'Algodón Bt (Transgénico)' ? 'Revolución en productividad y sostenibilidad' : variety.title === 'Algodón Orgánico' ? 'Modelo de agricultura sostenible y comercio justo' : variety.title === 'Algodón de Regadío' ? 'Permite cultivo en zonas áridas' : 'Alternativa ecológica al teñido químico'}</span><br>
                            <span class="text-text-secondary">• ${variety.title === 'Algodón Upland' ? 'Adaptabilidad climática excepcional' : variety.title === 'Algodón Pima/Egyptian' ? 'Máxima suavidad y durabilidad' : variety.title === 'Algodón Bt (Transgénico)' ? 'Reducción significativa de pesticidas' : variety.title === 'Algodón Orgánico' ? 'Protección de biodiversidad y salud del suelo' : variety.title === 'Algodón de Regadío' ? 'Estabilidad productiva independiente del clima' : 'Reducción de contaminantes en el proceso textil'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${variety.color};">
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
            lineChart = createLineChart(ctx, getFiberComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('cotton'));
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
            initFiberSimulation();
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
                        backgroundColor: 'rgba(30, 40, 30, 0.9)',
                        titleColor: '#86efac',
                        bodyColor: '#cbd5e1',
                        borderColor: '#4ade80',
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
                        backgroundColor: 'rgba(30, 40, 30, 0.9)',
                        titleColor: '#86efac',
                        bodyColor: '#cbd5e1',
                        borderColor: '#4ade80',
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
                        backgroundColor: 'rgba(30, 40, 30, 0.9)',
                        titleColor: '#86efac',
                        bodyColor: '#cbd5e1',
                        borderColor: '#4ade80',
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
    function getFiberComparisonData() {
        const fibers = ['Algodón', 'Poliéster', 'Lana', 'Lino'];
        const comfort = [95, 60, 85, 80];
        const sustainability = [75, 40, 70, 85];
        
        return {
            labels: fibers,
            datasets: [
                {
                    label: 'Confort',
                    data: comfort,
                    borderColor: '#4ade80',
                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Sostenibilidad',
                    data: sustainability,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar
    function getRadarChartData(fiber) {
        const fiberData = fibersData[fiber];
        
        return {
            labels: ['Confort', 'Absorción', 'Sostenibilidad', 'Durabilidad', 'Producción'],
            datasets: [{
                label: fiberData.name,
                data: [
                    fiberData.comfort,
                    fiberData.absorption,
                    fiberData.sustainability,
                    fiberData.durability,
                    fiberData.production
                ],
                backgroundColor: `${fiberData.color}20`,
                borderColor: fiberData.color,
                pointBackgroundColor: fiberData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: fiberData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
        };
    }

    // Función para inicializar simulación de fibras
    function initFiberSimulation() {
        console.log('Inicializando simulación de fibras...');
        
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
                        valueElement.textContent = 'Simple';
                    } else if (value < 66) {
                        valueElement.textContent = 'Media';
                    } else {
                        valueElement.textContent = 'Compleja';
                    }
                } else if (slider.id === 'areaSlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Bajo';
                    } else if (value < 66) {
                        valueElement.textContent = 'Moderado';
                    } else {
                        valueElement.textContent = 'Alto';
                    }
                } else if (slider.id === 'puritySlider') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Baja';
                    } else if (value < 66) {
                        valueElement.textContent = 'Media';
                    } else {
                        valueElement.textContent = 'Alta';
                    }
                }
                updateSimulation();
            });
        }
        
        updateSliderValue(thicknessSlider, thicknessValue);
        updateSliderValue(areaSlider, areaValue);
        updateSliderValue(puritySlider, purityValue);
        
        // Botones de fibra
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
            thicknessValue.textContent = 'Media';
            areaSlider.value = 60;
            areaValue.textContent = 'Moderado';
            puritySlider.value = 80;
            purityValue.textContent = 'Alta';
            materialButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-material="cotton"]').classList.add('active');
            
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
        
        console.log('Simulación de fibras inicializada');
    }

    // Función para actualizar simulación
    function updateSimulation() {
        const activeMaterial = document.querySelector('.material-btn.active');
        if (!activeMaterial) return;
        
        const fiberType = activeMaterial.dataset.material;
        const complexity = parseInt(document.getElementById('thicknessSlider').value);
        const environmentalImpact = parseInt(document.getElementById('areaSlider').value);
        const durability = parseInt(document.getElementById('puritySlider').value);
        
        const fiberData = fibersData[fiberType];
        if (!fiberData) return;
        
        // Calcular valores basados en la fibra y parámetros
        let comfort = fiberData.comfort;
        let absorption = fiberData.absorption;
        let sustainability = fiberData.sustainability;
        
        // Ajustar por complejidad de producción
        if (complexity > 66) { // Producción compleja
            if (fiberType === 'polyester') {
                comfort *= 0.9; // Poliéster es menos cómodo en producción compleja
            } else if (fiberType === 'cotton') {
                sustainability *= 0.9; // Algodón convencional tiene más impacto
            }
        }
        
        // Ajustar por impacto ambiental
        if (environmentalImpact > 66) { // Alto impacto
            if (fiberType === 'cotton' || fiberType === 'linen') {
                sustainability *= 1.1; // Fibras naturales mejoran en sostenibilidad
            } else {
                sustainability *= 0.8; // Fibras sintéticas empeoran
            }
        }
        
        // Ajustar por durabilidad
        if (durability < 33) { // Baja durabilidad
            if (fiberType === 'wool' || fiberType === 'polyester') {
                comfort *= 0.9; // Menos cómodas cuando no son duraderas
            }
        }
        
        // Limitar valores
        comfort = Math.min(Math.max(comfort, 0), 100);
        absorption = Math.min(Math.max(absorption, 0), 100);
        sustainability = Math.min(Math.max(sustainability, 0), 100);
        
        // Actualizar barras y valores
        document.getElementById('strengthValue').textContent = 
            comfort >= 85 ? 'Excelente' : 
            comfort >= 70 ? 'Bueno' : 
            comfort >= 50 ? 'Aceptable' : 'Limitado';
        document.getElementById('strengthBar').style.width = comfort + '%';
        
        document.getElementById('conductivityValue').textContent = 
            absorption >= 80 ? 'Alta' : 
            absorption >= 60 ? 'Media' : 
            absorption >= 40 ? 'Baja' : 'Muy baja';
        document.getElementById('conductivityBar').style.width = absorption + '%';
        
        document.getElementById('transparencyValue').textContent = 
            sustainability >= 80 ? 'Excelente' : 
            sustainability >= 65 ? 'Buena' : 
            sustainability >= 50 ? 'Moderada' : 'Baja';
        document.getElementById('transparencyBar').style.width = sustainability + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(fiberType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let conclusionText = '';
        
        if (fiberType === 'cotton') {
            conclusionText = 'El algodón destaca en confort y absorción, ideal para ropa y textiles de calidad';
        } else if (fiberType === 'polyester') {
            conclusionText = 'El poliéster es duradero y de secado rápido, perfecto para ropa deportiva';
        } else if (fiberType === 'wool') {
            conclusionText = 'La lana ofrece calidez y elasticidad natural, ideal para prendas de invierno';
        } else if (fiberType === 'linen') {
            conclusionText = 'El lino es fresco y sostenible, excelente para ropa de verano y decoración';
        }
        
        conclusion.innerHTML = `
            <ion-icon name="bulb-outline" class="text-cotton-accent-tertiary mr-2"></ion-icon>
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
        const fiberType = activeMaterial ? activeMaterial.dataset.material : 'cotton';
        const fiberData = fibersData[fiberType];
        
        // Simular proceso de optimización con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular optimización
                const currentComfort = parseFloat(document.getElementById('strengthBar').style.width);
                const newComfort = Math.min(100, currentComfort * 1.05);
                document.getElementById('strengthBar').style.width = newComfort + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${fiberData.name} analizado exitosamente`, 'success');
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
        const fiberType = activeMaterial ? activeMaterial.dataset.material : 'cotton';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-cotton-accent-light">
                    <ion-icon name="bar-chart-outline" class="mr-2"></ion-icon> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-cotton-accent-light">Producción por Año (millones de toneladas)</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-cotton-accent-secondary-light">Comparación de Propiedades</h4>
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
                        <h4 class="font-bold mb-3 text-cotton-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes fibras textiles. 
                            El algodón destaca en confort y absorción, mientras que el poliéster sobresale en durabilidad. 
                            Cada fibra tiene ventajas específicas según el tipo de producto y condiciones de uso.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-cotton-accent to-cotton-accent-dark text-white font-bold rounded-xl shadow-lg shadow-cotton-accent/30 hover:shadow-xl hover:shadow-cotton-accent/40 transition-all duration-300">
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
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(fiberType));
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
        const years = [2000, 2005, 2010, 2015, 2020, 2023];
        const cottonProduction = [18.5, 24.3, 25.2, 23.7, 24.5, 25.1]; // Millones de toneladas
        const polyesterProduction = [19.1, 26.4, 38.5, 52.3, 57.8, 61.5]; // Millones de toneladas
        
        return {
            labels: years.map(y => `${y}`),
            datasets: [
                {
                    label: 'Algodón (millones de toneladas)',
                    data: cottonProduction,
                    borderColor: '#4ade80',
                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Poliéster (millones de toneladas)',
                    data: polyesterProduction,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
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
        const fibers = ['Algodón', 'Poliéster', 'Lana', 'Lino'];
        const comfort = [95, 60, 85, 80];
        const absorption = [90, 20, 30, 70];
        const sustainability = [75, 40, 70, 85];
        
        return {
            labels: fibers,
            datasets: [
                {
                    label: 'Confort',
                    data: comfort,
                    backgroundColor: 'rgba(74, 222, 128, 0.7)',
                    borderColor: '#4ade80',
                    borderWidth: 1
                },
                {
                    label: 'Absorción',
                    data: absorption,
                    backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    borderColor: '#f59e0b',
                    borderWidth: 1
                },
                {
                    label: 'Sostenibilidad',
                    data: sustainability,
                    backgroundColor: 'rgba(249, 115, 22, 0.7)',
                    borderColor: '#f97316',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(fiber) {
        const fiberData = fibersData[fiber];
        
        // Datos para todas las fibras
        const labels = ['Confort', 'Absorción', 'Sostenibilidad', 'Durabilidad', 'Producción'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Algodón',
                    data: [95, 90, 75, 80, 90],
                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                    borderColor: '#4ade80',
                    pointBackgroundColor: '#4ade80',
                    borderWidth: 1
                },
                {
                    label: 'Poliéster',
                    data: [60, 20, 40, 90, 85],
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderColor: '#f59e0b',
                    pointBackgroundColor: '#f59e0b',
                    borderWidth: 1
                },
                {
                    label: 'Lana',
                    data: [85, 30, 70, 75, 60],
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    borderColor: '#f97316',
                    pointBackgroundColor: '#f97316',
                    borderWidth: 1
                },
                {
                    label: fiberData.name,
                    data: [
                        fiberData.comfort,
                        fiberData.absorption,
                        fiberData.sustainability,
                        fiberData.durability,
                        fiberData.production
                    ],
                    backgroundColor: `${fiberData.color}40`,
                    borderColor: fiberData.color,
                    pointBackgroundColor: fiberData.color,
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
            simulateEvolutionBtn.addEventListener('click', simulateCottonEvolution);
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

    // Función para simulación de evolución del algodón
    function simulateCottonEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando evolución...';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "3000 a.C.: Primeros cultivos en el Valle del Indo...",
            "2500 a.C.: Tejidos de algodón en Perú precolombino...",
            "Siglo VIII: Expansión árabe a Europa y África...",
            "1492: Colón encuentra algodón en las Bahamas...",
            "1764: Hiladora mecánica de Hargreaves...",
            "1793: Desmotadora de Eli Whitney...",
            "1840: Revolución industrial textil en Inglaterra...",
            "1892: Primera cosechadora mecánica...",
            "1950: Mecanización completa del cultivo...",
            "1996: Algodón Bt transgénico...",
            "2020: Algodón orgánico y sostenibilidad..."
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
            showCottonEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 6000);
    }

    // Función para mostrar resultados de evolución del algodón
    function showCottonEvolutionResults() {
        const results = [
            { type: 'Producción mundial', value: '0 → 25M t', color: '#4ade80', icon: 'trending-up-outline' },
            { type: 'Rendimiento por hectárea', value: '100 → 800 kg', color: '#f59e0b', icon: 'stats-chart-outline' },
            { type: 'Trabajadores textiles', value: 'Miles → Millones', color: '#f97316', icon: 'people-outline' },
            { type: 'Comercio global', value: '0 → $40B', color: '#8b5cf6', icon: 'cash-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-cotton-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución del Algodón (3000 a.C. - 2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico del algodón desde su domesticación hasta su importancia global actual:</p>
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
                        <span class="text-cotton-accent-light"># Tendencias futuras (2025-2050):</span><br>
                        <span class="text-text-secondary">• Algodón transgénico con propiedades mejoradas</span><br>
                        <span class="text-text-secondary">• Agricultura de precisión y drones</span><br>
                        <span class="text-text-secondary">• Fibra reciclada y economía circular</span><br>
                        <span class="text-text-secondary">• Blockchain para trazabilidad y comercio justo</span><br>
                        <span class="text-text-secondary">• Materiales compuestos algodón-bioplásticos</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-cotton-accent to-cotton-accent-dark text-white font-bold rounded-xl shadow-lg shadow-cotton-accent/30">
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
    console.log('Aplicación CottonLab inicializada correctamente');
});