document.addEventListener('DOMContentLoaded', function() {
    console.log('Aviones: Inicializando aplicación...');
    
    // Datos de fabricantes importantes de aviación
    const manufacturersData = [
        {
            icon: 'fa-plane',
            title: 'Boeing',
            description: 'Líder mundial en aviación comercial desde 1916. Fabricante del 747, 777, 787 Dreamliner y más. Más de 10,000 aviones comerciales entregados.',
            color: '#00a8ff',
            status: 'Activo',
            contribution: '747, 777, 787, tecnología compuesta'
        },
        {
            icon: 'fa-plane-engines',
            title: 'Airbus',
            description: 'Principal competidor de Boeing. Revolucionó la industria con el A320 (fly-by-wire) y el A380 (el avión más grande). Innovación en cabina común.',
            color: '#0077b6',
            status: 'Activo',
            contribution: 'A320, A380, A350, fly-by-wire'
        },
        {
            icon: 'fa-jet-fighter',
            title: 'Lockheed Martin',
            description: 'Líder en aviación militar y tecnología avanzada. Fabricante del F-35 Lightning II, C-130 Hercules, y aviones de reconocimiento SR-71.',
            color: '#ff9e00',
            status: 'Activo',
            contribution: 'F-35, C-130, SR-71, tecnología stealth'
        },
        {
            icon: 'fa-helicopter',
            title: 'Airbus Helicopters',
            description: 'Mayor fabricante de helicópteros del mundo. Innovación en rotor principal sin articulaciones y sistemas de seguridad avanzados.',
            color: '#00d4aa',
            status: 'Activo',
            contribution: 'Helicópteros civiles/militares, tecnología rotor'
        },
        {
            icon: 'fa-gears',
            title: 'General Electric',
            description: 'Líder en motores de aviación. Desarrollador del GEnx (Boeing 787) y motores CFM International. Innovación en eficiencia de combustible.',
            color: '#ff6b6b',
            status: 'Activo',
            contribution: 'Motores GEnx, CFM56, GE9X, tecnología compresor'
        },
        {
            icon: 'fa-rocket',
            title: 'Rolls-Royce',
            description: 'Fabricante de motores de aviación de alta gama. Desarrollador del Trent series (A380, 787, A350). Innovación en durabilidad y eficiencia.',
            color: '#4ade80',
            status: 'Activo',
            contribution: 'Motores Trent, tecnología tres ejes'
        }
    ];

    // Inicializar componentes
    initFlightParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initPerformanceSimulation();

    // Función para inicializar partículas de vuelo
    function initFlightParticles() {
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
                
                if (type < 0.6) {
                    // Nubes (blancas/azules)
                    color = `rgba(200, 220, 255, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 5 + 1;
                    speed = (Math.random() - 0.5) * 0.2;
                } else if (type < 0.9) {
                    // Estrellas (amarillas)
                    color = `rgba(255, 255, 200, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.1;
                } else {
                    // Aviones pequeños
                    color = `rgba(0, 168, 255, ${Math.random() * 0.6 + 0.3})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.5;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.3,
                    color: color,
                    pulseSpeed: Math.random() * 0.03 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.6 ? 'cloud' : type < 0.9 ? 'star' : 'plane'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de cielo nocturno
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(10, 15, 40, 0.1)');
            gradient.addColorStop(0.5, 'rgba(5, 10, 30, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 5, 20, 0.5)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar líneas de vuelo sutiles
            ctx.strokeStyle = 'rgba(0, 168, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height * (i+1)/6);
                ctx.lineTo(canvas.width, canvas.height * (i+1)/6 + Math.sin(Date.now()/10000 + i) * 50);
                ctx.stroke();
            }
            
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
                
                // Forma diferente según tipo
                if (particle.type === 'plane') {
                    // Aviones como triángulos
                    ctx.moveTo(particle.x, particle.y - particle.size/2);
                    ctx.lineTo(particle.x - particle.size, particle.y + particle.size/2);
                    ctx.lineTo(particle.x + particle.size, particle.y + particle.size/2);
                    ctx.closePath();
                } else if (particle.type === 'cloud') {
                    // Nubes como círculos suaves
                    for (let j = 0; j < 3; j++) {
                        ctx.moveTo(particle.x + particle.size * (j-1) * 0.8, particle.y);
                        ctx.arc(particle.x + particle.size * (j-1) * 0.8, particle.y, particle.size * 0.7, 0, Math.PI * 2);
                    }
                } else {
                    // Estrellas como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para estrellas
                if (particle.type === 'star') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 200, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                
                // Estela para aviones
                if (particle.type === 'plane') {
                    ctx.beginPath();
                    ctx.moveTo(particle.x - particle.speedX * 5, particle.y - particle.speedY * 5);
                    ctx.lineTo(particle.x, particle.y);
                    ctx.strokeStyle = `rgba(0, 168, 255, ${currentAlpha * 0.5})`;
                    ctx.lineWidth = 1;
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
        console.log('Partículas de vuelo inicializadas');
    }

    // Función para inicializar fabricantes
    function initManufacturers() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de fabricantes no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        manufacturersData.forEach(manufacturer => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${manufacturer.color};">
                        <i class="fas ${manufacturer.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${manufacturer.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${manufacturer.color}20; color: ${manufacturer.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${manufacturer.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${manufacturer.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${manufacturer.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showManufacturerDetail(manufacturer));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Fabricantes inicializados: ' + manufacturersData.length);
    }

    // Función para inicializar timeline
    function initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        console.log('Elementos timeline encontrados: ' + timelineItems.length);
        
        // Mostrar todos los elementos inmediatamente (sin animación de scroll)
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
        
        timelineItems.forEach(item => observer.observe(item));
        console.log('Timeline inicializada');
    }

    // Función para inicializar simulación de rendimiento
    function initPerformanceSimulation() {
        console.log('Inicializando simulación de rendimiento...');
        
        // Elementos del DOM
        const eraSlider = document.getElementById('eraSlider');
        const eraValue = document.getElementById('eraValue');
        const distanceSlider = document.getElementById('distanceSlider');
        const distanceValue = document.getElementById('distanceValue');
        const loadSlider = document.getElementById('loadSlider');
        const loadValue = document.getElementById('loadValue');
        const planeTypeButtons = document.querySelectorAll('.plane-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('performanceCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !eraSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        eraSlider.addEventListener('input', function() {
            const eras = ['Era Pionera (1900-1920)', 'Era de Hélices (1930-1950)', 'Era del Jet (1960-1990)', 'Era Moderna (2000+)'];
            eraValue.textContent = eras[this.value - 1];
        });
        
        distanceSlider.addEventListener('input', function() {
            distanceValue.textContent = `${this.value} km`;
        });
        
        loadSlider.addEventListener('input', function() {
            loadValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de avión
        planeTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                planeTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runPerformanceSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            eraSlider.value = 3;
            eraValue.textContent = 'Era del Jet (1960-1990)';
            distanceSlider.value = 5000;
            distanceValue.textContent = '5,000 km';
            loadSlider.value = 80;
            loadValue.textContent = '80%';
            planeTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="jet"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Los jets modernos ofrecen el mejor balance entre velocidad y eficiencia</div>';
            
            // Ejecutar simulación con valores por defecto
            runPerformanceSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runPerformanceSimulation();
        }, 500);
        
        console.log('Simulación de rendimiento inicializada');
    }

    // Función para ejecutar simulación de rendimiento
    function runPerformanceSimulation() {
        const canvas = document.getElementById('performanceCurveCanvas');
        const ctx = canvas.getContext('2d');
        const era = parseInt(document.getElementById('eraSlider').value);
        const distance = parseInt(document.getElementById('distanceSlider').value);
        const loadPercent = parseInt(document.getElementById('loadSlider').value) / 100;
        const planeType = document.querySelector('.plane-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (distancia)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (velocidad km/h)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Distancia (km)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Velocidad (km/h)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = (i * distance) / 5;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value.toFixed(0), x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 500;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value.toString(), padding - 20, y + 3);
        }
        
        // Velocidades por era
        const eraSpeeds = {
            1: 80,   // Era pionera
            2: 400,  // Era hélices
            3: 850,  // Era jet
            4: 950   // Era moderna
        };
        
        // Velocidades por tipo de avión
        const planeSpeeds = {
            'pioneer': 60,
            'propeller': 350,
            'jet': 850,
            'supersonic': 2179
        };
        
        // Eficiencia por tipo (km/l por pasajero)
        const planeEfficiency = {
            'pioneer': 2,
            'propeller': 8,
            'jet': 15,
            'supersonic': 5
        };
        
        // Calcular curvas
        const points = 100;
        const eraCurve = [];
        const planeLimitCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const distancePoint = (i * distance) / points;
            
            // Velocidad teórica por era
            const v_era = eraSpeeds[era];
            
            // Límite del tipo de avión
            const v_plane = planeSpeeds[planeType];
            
            // Velocidad real (considera distancia y carga)
            let v_actual = Math.min(v_era, v_plane);
            
            // Efecto de distancia en velocidad
            if (distancePoint < 500) {
                v_actual *= 0.7; // Despegue/aterrizaje
            } else if (distancePoint < 1000) {
                v_actual *= 0.85; // Subida a altitud de crucero
            }
            
            // Efecto de carga en velocidad
            v_actual *= (1 - (loadPercent - 0.5) * 0.2);
            
            eraCurve.push({distance: distancePoint, v: v_era});
            planeLimitCurve.push({distance: distancePoint, v: v_plane});
            actualCurve.push({distance: distancePoint, v: v_actual});
        }
        
        // Dibujar curva límite era
        ctx.strokeStyle = 'rgba(0, 168, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        eraCurve.forEach((point, i) => {
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.v / 2500) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva límite avión
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        planeLimitCurve.forEach((point, i) => {
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.v / 2500) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar curva real
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.v / 2500) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(0, 168, 255, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.v / 2500) * graphHeight;
            const yEra = canvas.height - padding - (eraCurve[i].v / 2500) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, yEra);
            } else {
                ctx.lineTo(x, yEra);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.v / 2500) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Límite era
        ctx.fillStyle = 'rgba(0, 168, 255, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite era', canvas.width - 155, 32);
        
        // Límite avión
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite avión', canvas.width - 155, 57);
        
        // Rendimiento real
        ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Rendimiento real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const eraSpeed = eraSpeeds[era];
        const planeSpeed = planeSpeeds[planeType];
        const efficiency = planeEfficiency[planeType];
        
        if (eraSpeed < planeSpeed) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Era tecnológica limita velocidad (${eraSpeed} km/h < ${planeSpeed} km/h)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Avión alcanza velocidad máxima (${planeSpeed} km/h) | Eficiencia: ${efficiency} km/l por pasajero
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const era = parseInt(document.getElementById('eraSlider').value);
        const distance = parseInt(document.getElementById('distanceSlider').value);
        const loadPercent = parseInt(document.getElementById('loadSlider').value) / 100;
        const planeType = document.querySelector('.plane-type-btn.active').dataset.type;
        
        const eras = ['Era Pionera (1900-1920)', 'Era de Hélices (1930-1950)', 'Era del Jet (1960-1990)', 'Era Moderna (2000+)'];
        const planeNames = {
            'pioneer': 'Avión Pioneer (Wright Flyer)',
            'propeller': 'Avión de Hélices (DC-3)',
            'jet': 'Jet Comercial (Boeing 737)',
            'supersonic': 'Supersónico (Concorde)'
        };
        
        const planeSpeeds = {
            'pioneer': 60,
            'propeller': 350,
            'jet': 850,
            'supersonic': 2179
        };
        
        const planeEfficiency = {
            'pioneer': 2,
            'propeller': 8,
            'jet': 15,
            'supersonic': 5
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Rendimiento
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Era de la Aviación</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${eras[era-1]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Avión</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${planeNames[planeType]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Distancia del Vuelo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${distance} km</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">% Carga Máxima</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(loadPercent*100).toFixed(0)}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de rendimiento de vuelo</span><br>
                            <span class="code-keyword">Velocidad máxima teórica:</span> ${planeSpeeds[planeType]} km/h<br>
                            <span class="code-keyword">Eficiencia:</span> ${planeEfficiency[planeType]} km/l por pasajero<br>
                            <span class="code-keyword">Tiempo estimado de vuelo:</span> ${(distance / Math.min([80, 400, 850, 950][era-1], planeSpeeds[planeType])).toFixed(1)} horas<br>
                            <span class="code-keyword">Consumo estimado:</span> ${(distance / planeEfficiency[planeType] * 100 / (loadPercent*100)).toFixed(0)} litros
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="exportDataBtn" style="min-width: 200px;">
                            <i class="fas fa-download"></i> Exportar Datos CSV
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal de datos
        document.getElementById('closeDataModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('exportDataBtn').addEventListener('click', () => {
            alert('Datos de simulación exportados como CSV');
            modal.remove();
        });
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
                document.getElementById('specsModal').classList.add('active');
            });
        }
        
        // Botón de comparación
        const compareProtocolsBtn = document.getElementById('compareProtocolsBtn');
        if (compareProtocolsBtn) {
            compareProtocolsBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.add('active');
            });
        }
        
        // Cerrar modales
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.remove('active');
            });
        }
        
        const closeCompareModalBtn = document.getElementById('closeCompareModal');
        if (closeCompareModalBtn) {
            closeCompareModalBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.remove('active');
            });
        }
        
        // Cerrar modales al hacer clic fuera
        const specsModal = document.getElementById('specsModal');
        if (specsModal) {
            specsModal.addEventListener('click', (e) => {
                if (e.target.id === 'specsModal') {
                    specsModal.classList.remove('active');
                }
            });
        }
        
        const compareModal = document.getElementById('compareModal');
        if (compareModal) {
            compareModal.addEventListener('click', (e) => {
                if (e.target.id === 'compareModal') {
                    compareModal.classList.remove('active');
                }
            });
        }
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const specsModal = document.getElementById('specsModal');
                const compareModal = document.getElementById('compareModal');
                
                if (specsModal) specsModal.classList.remove('active');
                if (compareModal) compareModal.classList.remove('active');
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
                    entry.target.classList.add('slide-in');
                }
            });
        }, observerOptions);
        
        // Aplicar animación a elementos principales
        document.querySelectorAll('.card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
        
        console.log('Animaciones inicializadas');
    }

    // Función para simulación de evolución tecnológica
    function simulateTechEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución de la aviación...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1903: Primer vuelo motorizado - 12 segundos, 37 metros...",
            "1909: Primer cruce del Canal de la Mancha...",
            "1914-1918: Primera Guerra Mundial - Aviones de combate...",
            "1927: Primer vuelo transatlántico sin escalas - 33.5 horas...",
            "1939: Primer avión a reacción - Heinkel He 178...",
            "1947: Primer vuelo supersónico - Bell X-1...",
            "1969: Primer vuelo del Boeing 747 'Jumbo Jet'...",
            "1976: Concorde inicia vuelos supersónicos comerciales...",
            "2005: Airbus A380 - El avión más grande del mundo...",
            "Presente: Aviones eléctricos, drones autónomos, taxis aéreos"
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${steps[step]}`;
                step++;
            }
        }, 800);
        
        // Simular proceso completo
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showTechEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 8500);
    }

    // Función para mostrar resultados de evolución tecnológica
    function showTechEvolutionResults() {
        const results = [
            { type: 'Aumento velocidad', value: '18,000%', color: '#00a8ff', icon: 'fa-tachometer-alt' },
            { type: 'Pasajeros anuales', value: '4.5B', color: '#ff9e00', icon: 'fa-users' },
            { type: 'Reducción accidentes', value: '95%', color: '#00d4aa', icon: 'fa-shield-alt' },
            { type: 'Emisiones/pasajero', value: '-50%', color: '#4ade80', icon: 'fa-leaf' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución de la Aviación
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de la aviación en el transporte global desde 1903 hasta la actualidad:</p>
                </div>
                <div class="stats-grid" style="margin: 2rem 0;">
                    ${results.map(result => `
                        <div class="stat-card">
                            <div class="stat-icon" style="font-size: 2.5rem; margin-bottom: 1rem; color: ${result.color};">
                                <i class="fas ${result.icon}"></i>
                            </div>
                            <div class="stat-value" style="background: linear-gradient(90deg, ${result.color}, ${result.color}99); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${result.value}</div>
                            <div class="stat-label">${result.type}</div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn" id="viewTimelineBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-history"></i> Ver Línea de Tiempo
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal tecnológico
        document.getElementById('closeTechModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewTimelineBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo detallada de la aviación');
            modal.remove();
        });
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturer) {
        const details = {
            'Boeing': {
                contribution: 'Revolucionó la aviación comercial con el 707, 747, 787. Líder en tecnología compuesta y eficiencia.',
                products: '747, 777, 787 Dreamliner, 737 MAX, aviones militares (F/A-18, P-8 Poseidon)',
                timeline: '1916-presente',
                impact: 'Democratizó el viaje aéreo con aviones de gran capacidad y alcance'
            },
            'Airbus': {
                contribution: 'Innovación en fly-by-wire, cabina común, materiales compuestos. Competencia directa a Boeing.',
                products: 'A320 family, A330, A350, A380, A220, helicópteros, aviones militares',
                timeline: '1970-presente',
                impact: 'Forzó innovación mediante competencia, reduciendo costos y mejorando seguridad'
            },
            'Lockheed Martin': {
                contribution: 'Tecnología stealth, aviones de reconocimiento estratégico, cazas de quinta generación.',
                products: 'F-35 Lightning II, F-22 Raptor, C-130 Hercules, SR-71 Blackbird',
                timeline: '1912-presente',
                impact: 'Definió la aviación militar moderna con tecnología de punta'
            },
            'Airbus Helicopters': {
                contribution: 'Rotor principal sin articulaciones (Spheriflex), sistemas de seguridad avanzados, helicópteros híbridos.',
                products: 'H125, H135, H145, H160, NH90, Tiger, helicópteros militares',
                timeline: '1992-presente (como Airbus Helicopters)',
                impact: 'Liderazgo en seguridad y eficiencia en transporte helicóptero'
            },
            'General Electric': {
                contribution: 'Motores de alta eficiencia GEnx, CFM International partnership, tecnología de materiales avanzados.',
                products: 'GEnx (Boeing 787), GE9X (Boeing 777X), CFM56, motores militares',
                timeline: '1892-presente (aviación desde 1917)',
                impact: 'Reducción drástica del consumo de combustible y emisiones en aviación comercial'
            },
            'Rolls-Royce': {
                contribution: 'Motores Trent de tres ejes, tecnología de durabilidad extrema, mantenimiento predictivo.',
                products: 'Trent series (A380, 787, A350), motores para aviones ejecutivos y regionales',
                timeline: '1904-presente (aviación desde 1914)',
                impact: 'Estableció nuevos estándares de confiabilidad y eficiencia en motores de largo alcance'
            }
        };
        
        const manufacturerDetails = details[manufacturer.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeManufacturerModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${manufacturer.color}; margin-right: 1rem;">
                        <i class="fas ${manufacturer.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${manufacturer.color};">${manufacturer.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${manufacturer.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${manufacturer.color};">
                            <i class="fas fa-info-circle"></i> Detalles del Fabricante:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${manufacturerDetails.contribution ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.products ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Destacados</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.timeline ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Historia en Aviación</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.impact ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en la Industria</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${manufacturer.title} - Tecnologías desarrolladas</span><br>
                        <span class="code-keyword">Áreas de innovación:</span> ${manufacturer.contribution}<br>
                        <span class="code-keyword">Mercados principales:</span> Comercial, Militar, Ejecutivo, Regional<br>
                        <span class="code-keyword">Estado actual:</span> ${manufacturer.status}<br>
                        <span class="code-keyword">Empleados:</span> ${manufacturer.title === 'Boeing' ? '140,000+' : manufacturer.title === 'Airbus' ? '130,000+' : manufacturer.title === 'Lockheed Martin' ? '110,000+' : manufacturer.title === 'General Electric' ? '40,000+ (aviación)' : '50,000+'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${manufacturer.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeManufacturerModal').addEventListener('click', () => {
            modal.remove();
        });
        
        document.getElementById('closeDetailBtn').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Mensaje de inicialización completa
    console.log('Aplicación Aviones inicializada correctamente');
});