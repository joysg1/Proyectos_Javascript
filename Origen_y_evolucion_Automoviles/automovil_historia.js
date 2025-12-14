document.addEventListener('DOMContentLoaded', function() {
    console.log('Automóvil Historia: Inicializando aplicación...');
    
    // Datos de fabricantes importantes
    const manufacturersData = [
        {
            icon: 'fa-industry',
            title: 'Mercedes-Benz',
            description: 'Primer fabricante de automóviles (Karl Benz, 1886). Innovación continua en seguridad, lujo y tecnología.',
            color: '#ff6b35',
            status: 'Activo',
            contribution: 'Primer automóvil, seguridad, innovación'
        },
        {
            icon: 'fa-car',
            title: 'Ford',
            description: 'Revolucionó la industria con producción en masa (Model T, 1908). Democratizó el automóvil para las masas.',
            color: '#00a8ff',
            status: 'Activo',
            contribution: 'Producción en masa, accesibilidad'
        },
        {
            icon: 'fa-bolt',
            title: 'Tesla',
            description: 'Líder en vehículos eléctricos y tecnología autónoma. Revolucionó la industria con sobreactualizaciones OTA y alta eficiencia.',
            color: '#00d4aa',
            status: 'Activo',
            contribution: 'Electrificación, autopiloto, OTA'
        },
        {
            icon: 'fa-flag-checkered',
            title: 'Toyota',
            description: 'Mayor fabricante mundial. Precursor de híbridos con Prius. Filosofía de producción Toyota y calidad legendaria.',
            color: '#ff4757',
            status: 'Activo',
            contribution: 'Híbridos, calidad, producción eficiente'
        },
        {
            icon: 'fa-crown',
            title: 'Volkswagen',
            description: 'Gigante automotriz europeo. Escándalo diésel impulsó transición eléctrica. Marca popular y de lujo (Audi, Porsche).',
            color: '#4ade80',
            status: 'Activo',
            contribution: 'Ingeniería alemana, grupo diversificado'
        },
        {
            icon: 'fa-horse-head',
            title: 'Ferrari',
            description: 'Símbolo de automóviles deportivos y de lujo. Tradición en F1 y tecnología de alto rendimiento. Icono cultural mundial.',
            color: '#ff4757',
            status: 'Activo',
            contribution: 'Alto rendimiento, deportivos, F1'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initPerformanceSimulation();

    // Función para inicializar partículas tecnológicas
    function initTechParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 150;
        
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
                    // Partículas de escape (naranja/rojo)
                    color = `rgba(255, 107, 53, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else if (type < 0.85) {
                    // Partículas eléctricas (azul)
                    color = `rgba(0, 168, 255, ${Math.random() * 0.4 + 0.2})`;
                    size = Math.random() * 2.5 + 1.5;
                    speed = (Math.random() - 0.5) * 0.7;
                } else {
                    // Partículas de chispa (amarillo)
                    color = `rgba(255, 235, 59, ${Math.random() * 0.6 + 0.3})`;
                    size = Math.random() * 2 + 1;
                    speed = (Math.random() - 0.5) * 1;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.3,
                    color: color,
                    pulseSpeed: Math.random() * 0.04 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.6 ? 'exhaust' : type < 0.85 ? 'electric' : 'spark',
                    trail: []
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de circuito/autopista sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 18, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Líneas de autopista
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 2;
            ctx.setLineDash([20, 30]);
            
            const laneCount = 4;
            for (let i = 1; i <= laneCount; i++) {
                const y = canvas.height * (i / (laneCount + 1));
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            ctx.setLineDash([]);
            
            particles.forEach(particle => {
                // Movimiento
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.5 + 0.5;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Estela para partículas rápidas
                if (Math.abs(particle.speedX) > 0.3 || particle.type === 'spark') {
                    particle.trail.push({x: particle.x, y: particle.y});
                    if (particle.trail.length > 5) particle.trail.shift();
                    
                    // Dibujar estela
                    if (particle.trail.length > 1) {
                        ctx.beginPath();
                        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                        
                        for (let i = 1; i < particle.trail.length; i++) {
                            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                        }
                        
                        const trailGradient = ctx.createLinearGradient(
                            particle.trail[0].x, particle.trail[0].y,
                            particle.trail[particle.trail.length-1].x, particle.trail[particle.trail.length-1].y
                        );
                        
                        if (particle.type === 'exhaust') {
                            trailGradient.addColorStop(0, `rgba(255, 107, 53, ${currentAlpha * 0.5})`);
                            trailGradient.addColorStop(1, 'rgba(255, 107, 53, 0)');
                        } else if (particle.type === 'electric') {
                            trailGradient.addColorStop(0, `rgba(0, 168, 255, ${currentAlpha * 0.5})`);
                            trailGradient.addColorStop(1, 'rgba(0, 168, 255, 0)');
                        } else {
                            trailGradient.addColorStop(0, `rgba(255, 235, 59, ${currentAlpha * 0.5})`);
                            trailGradient.addColorStop(1, 'rgba(255, 235, 59, 0)');
                        }
                        
                        ctx.strokeStyle = trailGradient;
                        ctx.lineWidth = particle.size * 0.7;
                        ctx.stroke();
                    }
                }
                
                // Dibujar partícula
                ctx.beginPath();
                
                // Forma diferente según tipo
                if (particle.type === 'spark') {
                    // Chispas como estrellas
                    const spikes = 5;
                    const outerRadius = particle.size;
                    const innerRadius = particle.size * 0.5;
                    
                    for (let i = 0; i < spikes * 2; i++) {
                        const radius = i % 2 === 0 ? outerRadius : innerRadius;
                        const angle = (Math.PI * i) / spikes;
                        const x = particle.x + Math.cos(angle) * radius;
                        const y = particle.y + Math.sin(angle) * radius;
                        
                        if (i === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    
                    ctx.closePath();
                } else {
                    // Escape y eléctricas como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'exhaust') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 4
                    );
                    
                    if (particle.type === 'electric') {
                        gradient.addColorStop(0, `rgba(0, 168, 255, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(0, 168, 255, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(255, 235, 59, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 235, 59, 0)');
                    }
                    
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
        console.log('Partículas automotrices inicializadas');
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
        const powerSlider = document.getElementById('powerSlider');
        const powerValue = document.getElementById('powerValue');
        const efficiencySlider = document.getElementById('efficiencySlider');
        const efficiencyValue = document.getElementById('efficiencyValue');
        const vehicleTypeButtons = document.querySelectorAll('.vehicle-type-btn');
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
            const eras = [
                'Era Pionera (1886-1900)',
                'Producción en Masa (1908-1930)',
                'Era de Potencia (1950-1970)',
                'Modernización (1970-2000)',
                'Era Digital (2000+)'
            ];
            eraValue.textContent = eras[this.value - 1];
        });
        
        powerSlider.addEventListener('input', function() {
            powerValue.textContent = `${this.value} CV`;
        });
        
        efficiencySlider.addEventListener('input', function() {
            efficiencyValue.textContent = `${this.value} km/L`;
        });
        
        // Botones de tipo de vehículo
        vehicleTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                vehicleTypeButtons.forEach(b => b.classList.remove('active'));
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
            eraValue.textContent = 'Era de Potencia (1950-1970)';
            powerSlider.value = 120;
            powerValue.textContent = '120 CV';
            efficiencySlider.value = 12;
            efficiencyValue.textContent = '12 km/L';
            vehicleTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="economy"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Los deportivos (rojo) ofrecen mayor velocidad, pero menor eficiencia</div>';
            
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
        const power = parseInt(document.getElementById('powerSlider').value);
        const efficiency = parseInt(document.getElementById('efficiencySlider').value);
        const vehicleType = document.querySelector('.vehicle-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (años desde 1886)
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
        ctx.fillText('Años desde 1886', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Velocidad (km/h)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X (0-140 años)
        for (let i = 0; i <= 7; i++) {
            const x = padding + (i * graphWidth) / 7;
            const year = 1886 + (i * 20);
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(year, x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const speed = i * 80;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(speed.toString(), padding - 20, y + 3);
        }
        
        // Límites por era tecnológica
        const eraLimits = {
            1: { maxSpeed: 40, maxPower: 20 },   // Pionera
            2: { maxSpeed: 120, maxPower: 100 }, // Producción en masa
            3: { maxSpeed: 250, maxPower: 500 }, // Era de potencia
            4: { maxSpeed: 300, maxPower: 600 }, // Modernización
            5: { maxSpeed: 400, maxPower: 1200 } // Era digital
        };
        
        // Límites por tipo de vehículo
        const vehicleLimits = {
            'economy': { maxSpeed: 180, efficiency: 20 },
            'family': { maxSpeed: 220, efficiency: 15 },
            'sports': { maxSpeed: 350, efficiency: 8 },
            'luxury': { maxSpeed: 300, efficiency: 10 }
        };
        
        // Calcular curvas
        const points = 100;
        const eraCurve = [];
        const vehicleLimitCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const yearPoint = 1886 + (i * 140 / points);
            
            // Límite de la era
            const v_era = eraLimits[era].maxSpeed;
            
            // Límite del tipo de vehículo
            const v_vehicle = vehicleLimits[vehicleType].maxSpeed;
            
            // Velocidad real (considera potencia y eficiencia)
            let v_actual = Math.min(v_era, v_vehicle);
            
            // Influencia de la potencia
            v_actual *= (power / 500);
            if (v_actual > v_era) v_actual = v_era;
            
            // Influencia de la eficiencia (inversa)
            const efficiencyFactor = 1 - (efficiency / 30) * 0.3;
            v_actual *= efficiencyFactor;
            
            // Factor de avance tecnológico (años)
            const techProgress = Math.min(1, (yearPoint - 1886) / 140);
            v_actual *= (0.5 + techProgress * 0.5);
            
            eraCurve.push({year: yearPoint, v: v_era});
            vehicleLimitCurve.push({year: yearPoint, v: v_vehicle});
            actualCurve.push({year: yearPoint, v: v_actual});
        }
        
        // Dibujar curva límite era
        ctx.strokeStyle = 'rgba(255, 107, 53, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        eraCurve.forEach((point, i) => {
            const x = padding + ((point.year - 1886) / 140) * graphWidth;
            const y = canvas.height - padding - (point.v / 400) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva límite vehículo
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        vehicleLimitCurve.forEach((point, i) => {
            const x = padding + ((point.year - 1886) / 140) * graphWidth;
            const y = canvas.height - padding - (point.v / 400) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar curva real
        ctx.strokeStyle = 'rgba(0, 168, 255, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + ((point.year - 1886) / 140) * graphWidth;
            const y = canvas.height - padding - (point.v / 400) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(255, 107, 53, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + ((point.year - 1886) / 140) * graphWidth;
            const y = canvas.height - padding - (point.v / 400) * graphHeight;
            const yEra = canvas.height - padding - (eraCurve[i].v / 400) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, yEra);
            } else {
                ctx.lineTo(x, yEra);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + ((point.year - 1886) / 140) * graphWidth;
            const y = canvas.height - padding - (point.v / 400) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Límite era
        ctx.fillStyle = 'rgba(255, 107, 53, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite era', canvas.width - 155, 32);
        
        // Límite vehículo
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite vehículo', canvas.width - 155, 57);
        
        // Rendimiento real
        ctx.fillStyle = 'rgba(0, 168, 255, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Rendimiento real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const eraSpeed = eraLimits[era].maxSpeed;
        const vehicleSpeed = vehicleLimits[vehicleType].maxSpeed;
        
        if (eraSpeed < vehicleSpeed) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    La era tecnológica limita el rendimiento (${eraSpeed} km/h < ${vehicleSpeed} km/h)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Tipo de vehículo limita rendimiento (${vehicleSpeed} km/h máximo)
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const era = parseInt(document.getElementById('eraSlider').value);
        const power = parseInt(document.getElementById('powerSlider').value);
        const efficiency = parseInt(document.getElementById('efficiencySlider').value);
        const vehicleType = document.querySelector('.vehicle-type-btn.active').dataset.type;
        
        const eras = [
            'Era Pionera (1886-1900)',
            'Producción en Masa (1908-1930)',
            'Era de Potencia (1950-1970)',
            'Modernización (1970-2000)',
            'Era Digital (2000+)'
        ];
        
        const vehicleNames = {
            'economy': 'Económico',
            'family': 'Familiar',
            'sports': 'Deportivo',
            'luxury': 'Lujo'
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
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Era Tecnológica</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${eras[era-1]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Vehículo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${vehicleNames[vehicleType]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Potencia</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${power} CV</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Eficiencia</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${efficiency} km/L</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de rendimiento teórico vs real</span><br>
                            <span class="code-keyword">Velocidad máxima teórica era:</span> ${[40, 120, 250, 300, 400][era-1]} km/h<br>
                            <span class="code-keyword">Velocidad máxima tipo vehículo:</span> ${vehicleType === 'economy' ? 180 : vehicleType === 'family' ? 220 : vehicleType === 'sports' ? 350 : 300} km/h<br>
                            <span class="code-keyword">Factor potencia:</span> ${(power/500*100).toFixed(0)}%<br>
                            <span class="code-keyword">Factor eficiencia:</span> ${(100 - (efficiency/30*30)).toFixed(0)}% penalización<br>
                            <span class="code-keyword">Velocidad estimada:</span> ${Math.min([40, 120, 250, 300, 400][era-1], vehicleType === 'economy' ? 180 : vehicleType === 'family' ? 220 : vehicleType === 'sports' ? 350 : 300) * (power/500) * (1 - (efficiency/30*0.3)).toFixed(2)} km/h
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
        const compareErasBtn = document.getElementById('compareErasBtn');
        if (compareErasBtn) {
            compareErasBtn.addEventListener('click', () => {
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
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución tecnológica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1886: Primer automóvil de Karl Benz - 16 km/h...",
            "1908: Ford Model T - producción en masa...",
            "1913: Cadena de montaje de Ford...",
            "1930: Suspensión independiente, frenos hidráulicos...",
            "1950: Época dorada del diseño americano...",
            "1970: Crisis del petróleo, catalizadores...",
            "1980: Inyección electrónica, airbags...",
            "1997: Toyota Prius - primer híbrido comercial...",
            "2008: Tesla Roadster - revolución eléctrica...",
            "2015: Nivel 2 de conducción autónoma...",
            "2020: Vehículos eléctricos masivos, OTA updates...",
            "Presente: Transición a autonomía total y sustentabilidad"
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
        }, steps.length * 800 + 1000);
    }

    // Función para mostrar resultados de evolución tecnológica
    function showTechEvolutionResults() {
        const results = [
            { type: 'Velocidad máxima', value: '400+ km/h', color: '#ff6b35', icon: 'fa-tachometer-alt' },
            { type: 'Años de historia', value: '140+', color: '#ff9e00', icon: 'fa-calendar-alt' },
            { type: 'Vehículos en uso', value: '1.4B', color: '#00d4aa', icon: 'fa-car' },
            { type: 'PIB mundial', value: '3%', color: '#4ade80', icon: 'fa-chart-pie' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Tecnológica del Automóvil
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto del automóvil en la sociedad desde 1886 hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución automotriz');
            modal.remove();
        });
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturer) {
        const details = {
            'Mercedes-Benz': {
                contribution: 'Primer automóvil (1886), innovación en seguridad, lujo y tecnología',
                products: 'Clase A, C, E, S, G, Maybach, AMG, EQ eléctricos',
                timeline: '1886-presente',
                impact: 'Estándar de lujo, seguridad e innovación tecnológica'
            },
            'Ford': {
                contribution: 'Producción en masa (Model T), democratización del automóvil',
                products: 'F-Series, Mustang, Explorer, F-150 Lightning eléctrica',
                timeline: '1903-presente',
                impact: 'Hizo el automóvil accesible para las masas, revolucionó manufactura'
            },
            'Tesla': {
                contribution: 'Popularización vehículos eléctricos, tecnología autónoma, OTA updates',
                products: 'Model S, 3, X, Y, Cybertruck, Roadster, Semi',
                timeline: '2003-presente',
                impact: 'Aceleró transición eléctrica, introdujo sobreactualizaciones OTA'
            },
            'Toyota': {
                contribution: 'Producción eficiente (Toyota Way), híbridos (Prius), fiabilidad legendaria',
                products: 'Corolla, Camry, RAV4, Prius, Land Cruiser, Lexus',
                timeline: '1937-presente',
                impact: 'Líder mundial en ventas, pionero en híbridos, calidad y eficiencia'
            },
            'Volkswagen': {
                contribution: 'Ingeniería alemana, grupo automotriz diversificado (Audi, Porsche, etc.)',
                products: 'Golf, Passat, Tiguan, ID series eléctricos, Audi, Porsche, Lamborghini',
                timeline: '1937-presente',
                impact: 'Gigante automotriz europeo, impulso a electrificación post-dieselgate'
            },
            'Ferrari': {
                contribution: 'Alto rendimiento, tecnología F1, icono cultural y de lujo',
                products: 'Portofino, Roma, F8 Tributo, SF90 Stradale, LaFerrari',
                timeline: '1947-presente',
                impact: 'Símbolo mundial de automóviles deportivos y de lujo, transferencia tecnología F1'
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
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.timeline ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
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
                        <span class="code-comment">// ${manufacturer.title} - Tecnologías destacadas</span><br>
                        <span class="code-keyword">Innovaciones:</span> ${manufacturer.title === 'Mercedes-Benz' ? 'Primer auto, ABS, airbag, ESP' : manufacturer.title === 'Tesla' ? 'Baterías, autopiloto, OTA, supercargadores' : manufacturer.title === 'Toyota' ? 'Sistema híbrido, producción lean, fiabilidad' : manufacturer.title === 'Ferrari' ? 'Motores V12, chasis carbono, F1' : 'Producción masiva, pickup F-150, Mustang'}<br>
                        <span class="code-keyword">Tecnologías actuales:</span> ${manufacturer.title === 'Tesla' ? 'Full Self-Driving, baterías 4680, casting gigante' : 'Electrificación, conectividad, ADAS'}<br>
                        <span class="code-keyword">Estado actual:</span> ${manufacturer.status}
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
    console.log('Aplicación Automóvil Historia inicializada correctamente');
});