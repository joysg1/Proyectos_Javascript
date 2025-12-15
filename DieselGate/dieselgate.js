document.addEventListener('DOMContentLoaded', function() {
    console.log('Dieselgate: Inicializando aplicación...');
    
    // Datos de fabricantes y modelos afectados
    const affectedEntitiesData = [
        {
            icon: 'fa-car',
            title: 'Volkswagen AG',
            description: 'Casa matriz alemana. Desarrolló e implementó software "defeat device" en 11 millones de vehículos globalmente.',
            color: '#ff4444',
            status: 'Multado',
            contribution: 'Software ilegal, 11M vehículos'
        },
        {
            icon: 'fa-shield-alt',
            title: 'Audi AG',
            description: 'Subsidiaria premium de VW. Motores 3.0L V6 TDI afectados. Software más sofisticado que VW.',
            color: '#0077b6',
            status: 'Multado',
            contribution: 'Motores 3.0L V6'
        },
        {
            icon: 'fa-truck',
            title: 'Porsche AG',
            description: 'Subsidiaria de lujo. Modelos Cayenne Diesel afectados. Alto impacto en imagen de marca premium.',
            color: '#ff9e00',
            status: 'Multado',
            contribution: 'Cayenne Diesel'
        },
        {
            icon: 'fa-microchip',
            title: 'Robert Bosch GmbH',
            description: 'Proveedor de software y componentes. Suministró software de gestión motor usado en dispositivos ilegales.',
            color: '#00d4aa',
            status: 'Investigado',
            contribution: 'Software motor'
        },
        {
            icon: 'fa-balance-scale',
            title: 'Autoridades Regulatorias',
            description: 'EPA (EUA), KBA (Alemania), otros. Fallaron en detectar fraude por años. Mejoraron pruebas post-escándalo.',
            color: '#ff6b6b',
            status: 'Reformado',
            contribution: 'WLTP, pruebas RDE'
        },
        {
            icon: 'fa-gavel',
            title: 'Departamento de Justicia EUA',
            description: 'Lideró investigación criminal. Logró acuerdos récord: $4.3B criminales, condenas ejecutivos.',
            color: '#4ade80',
            status: 'Activo',
            contribution: 'Multas $30B+, condenas'
        }
    ];

    // Inicializar componentes
    initEmissionsVisualization();
    initAffectedEntities();
    initEventListeners();
    initAnimations();
    initTimeline();
    initEmissionsSimulation();

    // Función para inicializar visualización de emisiones
    function initEmissionsVisualization() {
        const canvas = document.getElementById('emissions-canvas');
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
                let color, size, speed, shape;
                
                if (type < 0.6) {
                    // Partículas de smog (gris)
                    color = `rgba(150, 150, 150, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                    shape = 'circle';
                } else if (type < 0.85) {
                    // Partículas de NOx (naranja-marrón)
                    color = `rgba(255, 100, 0, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 1;
                    speed = (Math.random() - 0.5) * 0.8;
                    shape = 'triangle';
                } else {
                    // Partículas de humo (negro)
                    color = `rgba(50, 50, 50, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 5 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                    shape = 'square';
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.3 - 0.1, // Flujo ascendente
                    color: color,
                    pulseSpeed: Math.random() * 0.03 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    shape: shape,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de contaminación sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(30, 20, 10, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 10, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Movimiento con flujo ascendente
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.rotation += particle.rotationSpeed;
                
                // Reaparecer en parte inferior si sale por arriba
                if (particle.y < -particle.size) {
                    particle.y = canvas.height + particle.size;
                    particle.x = Math.random() * canvas.width;
                }
                
                // Reaparecer en lados si sale horizontalmente
                if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
                if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula según forma
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                
                ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                
                if (particle.shape === 'triangle') {
                    // Triángulo para NOx
                    ctx.beginPath();
                    ctx.moveTo(0, -particle.size);
                    ctx.lineTo(particle.size, particle.size);
                    ctx.lineTo(-particle.size, particle.size);
                    ctx.closePath();
                    ctx.fill();
                } else if (particle.shape === 'square') {
                    // Cuadrado para humo
                    ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
                } else {
                    // Círculo para smog
                    ctx.beginPath();
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                ctx.restore();
                
                // Efecto de cola para partículas grandes
                if (particle.size > 3) {
                    ctx.beginPath();
                    const gradient = ctx.createLinearGradient(
                        particle.x, particle.y,
                        particle.x - particle.speedX * 10, particle.y - particle.speedY * 10
                    );
                    gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${currentAlpha * 0.3})`));
                    gradient.addColorStop(1, 'transparent');
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = particle.size / 2;
                    ctx.lineCap = 'round';
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle.x - particle.speedX * 10, particle.y - particle.speedY * 10);
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
        console.log('Visualización de emisiones inicializada');
    }

    // Función para inicializar entidades afectadas
    function initAffectedEntities() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de entidades no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        affectedEntitiesData.forEach(entity => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${entity.color};">
                        <i class="fas ${entity.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${entity.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${entity.color}20; color: ${entity.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${entity.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Rol: ${entity.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${entity.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showEntityDetail(entity));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Entidades afectadas inicializadas: ' + affectedEntitiesData.length);
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
        
        timelineItems.forEach(item => observer.observe(item));
        console.log('Timeline inicializada');
    }

    // Función para inicializar simulación de emisiones
    function initEmissionsSimulation() {
        console.log('Inicializando simulación de emisiones...');
        
        // Elementos del DOM
        const vehicleModelSlider = document.getElementById('vehicleModelSlider');
        const vehicleModelValue = document.getElementById('vehicleModelValue');
        const softwareSlider = document.getElementById('softwareSlider');
        const softwareValue = document.getElementById('softwareValue');
        const temperatureSlider = document.getElementById('temperatureSlider');
        const temperatureValue = document.getElementById('temperatureValue');
        const deviceTypeButtons = document.querySelectorAll('.device-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('emissionsCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !vehicleModelSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        vehicleModelSlider.addEventListener('input', function() {
            const models = ['VW Golf TDI', 'VW Jetta TDI', 'VW Passat TDI', 'Audi Q7 TDI'];
            vehicleModelValue.textContent = models[this.value - 1];
        });
        
        softwareSlider.addEventListener('input', function() {
            softwareValue.textContent = this.value == 1 ? 'Sí' : 'No';
        });
        
        temperatureSlider.addEventListener('input', function() {
            temperatureValue.textContent = `${this.value}°C`;
        });
        
        // Botones de tipo de conducción
        deviceTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                deviceTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runEmissionsSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            vehicleModelSlider.value = 2;
            vehicleModelValue.textContent = 'VW Jetta TDI';
            softwareSlider.value = 0;
            softwareValue.textContent = 'No';
            temperatureSlider.value = 20;
            temperatureValue.textContent = '20°C';
            deviceTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="lab-test"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Software desactivado (rojo) muestra emisiones 40x mayores que en pruebas (verde)</div>';
            
            // Ejecutar simulación con valores por defecto
            runEmissionsSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runEmissionsSimulation();
        }, 500);
        
        console.log('Simulación de emisiones inicializada');
    }

    // Función para ejecutar simulación de emisiones
    function runEmissionsSimulation() {
        const canvas = document.getElementById('emissionsCurveCanvas');
        const ctx = canvas.getContext('2d');
        const vehicleModel = parseInt(document.getElementById('vehicleModelSlider').value);
        const softwareEnabled = parseInt(document.getElementById('softwareSlider').value);
        const temperature = parseInt(document.getElementById('temperatureSlider').value);
        const drivingCondition = document.querySelector('.device-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (tiempo de conducción en minutos)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (emisiones NOx en mg/km)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Tiempo de Conducción (minutos)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Emisiones NOx (mg/km)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText((i * 10).toString(), x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 800;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value.toString(), padding - 20, y + 3);
        }
        
        // Límites legales por región
        const legalLimits = {
            'euro5': 180,   // mg/km NOx
            'euro6': 80,    // mg/km NOx
            'epa-tier2': 70 // mg/km NOx
        };
        
        // Emisiones por condición de conducción (sin software)
        const conditionMultipliers = {
            'lab-test': 1.0,
            'city-driving': 15.0,
            'highway': 25.0,
            'mountain': 40.0
        };
        
        // Emisiones base por modelo
        const modelEmissions = {
            1: 100,  // Golf
            2: 120,  // Jetta
            3: 150,  // Passat
            4: 200   // Audi Q7
        };
        
        // Calcular curvas
        const points = 100;
        const legalLimitCurve = [];
        const testCurve = [];
        const realCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const time = (i * 50) / points; // 0-50 minutos
            
            // Límite legal (Euro 6)
            const legalLimit = legalLimits.euro6;
            
            // Emisiones en prueba (software activado)
            let testEmissions = legalLimit * 1.1; // Ligeramente sobre límite
            
            // Emisiones reales (depende de software)
            let realEmissions = modelEmissions[vehicleModel] * conditionMultipliers[drivingCondition];
            
            // Ajustar por temperatura
            if (temperature < 10) realEmissions *= 1.5;
            if (temperature > 30) realEmissions *= 1.3;
            
            // Si software activado, usar emisiones de prueba en condiciones reales
            if (softwareEnabled && drivingCondition !== 'lab-test') {
                realEmissions = testEmissions;
            }
            
            legalLimitCurve.push({time: time, emissions: legalLimit});
            testCurve.push({time: time, emissions: testEmissions});
            realCurve.push({time: time, emissions: realEmissions});
        }
        
        // Dibujar curva límite legal
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.8)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        legalLimitCurve.forEach((point, i) => {
            const x = padding + (point.time / 50) * graphWidth;
            const y = canvas.height - padding - (point.emissions / 2000) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar curva de prueba
        ctx.strokeStyle = 'rgba(0, 168, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        testCurve.forEach((point, i) => {
            const x = padding + (point.time / 50) * graphWidth;
            const y = canvas.height - padding - (point.emissions / 2000) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva real
        ctx.strokeStyle = 'rgba(255, 68, 68, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        realCurve.forEach((point, i) => {
            const x = padding + (point.time / 50) * graphWidth;
            const y = canvas.height - padding - (point.emissions / 2000) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas (fraude)
        if (!softwareEnabled || drivingCondition === 'lab-test') {
            ctx.fillStyle = 'rgba(255, 68, 68, 0.15)';
            ctx.beginPath();
            
            testCurve.forEach((point, i) => {
                const x = padding + (point.time / 50) * graphWidth;
                const y = canvas.height - padding - (point.emissions / 2000) * graphHeight;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            for (let i = realCurve.length - 1; i >= 0; i--) {
                const point = realCurve[i];
                const x = padding + (point.time / 50) * graphWidth;
                const y = canvas.height - padding - (point.emissions / 2000) * graphHeight;
                ctx.lineTo(x, y);
            }
            
            ctx.closePath();
            ctx.fill();
        }
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Límite legal
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite Euro 6', canvas.width - 155, 32);
        
        // Prueba laboratorio
        ctx.fillStyle = 'rgba(0, 168, 255, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Prueba laboratorio', canvas.width - 155, 57);
        
        // Conducción real
        ctx.fillStyle = 'rgba(255, 68, 68, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Conducción real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const multiplier = conditionMultipliers[drivingCondition];
        const exceedsLimit = multiplier > 5;
        
        if (exceedsLimit && !softwareEnabled) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Emisiones ${multiplier.toFixed(0)}x sobre límite legal (${drivingCondition.replace('-', ' ')})
                </div>
            `;
        } else if (softwareEnabled && drivingCondition !== 'lab-test') {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent);">
                    <i class="fas fa-microchip" style="margin-right: 0.5rem;"></i>
                    Software activado: emisiones controladas artificialmente
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Emisiones dentro de límites (prueba laboratorio)
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const vehicleModel = parseInt(document.getElementById('vehicleModelSlider').value);
        const softwareEnabled = parseInt(document.getElementById('softwareSlider').value);
        const temperature = parseInt(document.getElementById('temperatureSlider').value);
        const drivingCondition = document.querySelector('.device-type-btn.active').dataset.type;
        
        const models = ['VW Golf TDI', 'VW Jetta TDI', 'VW Passat TDI', 'Audi Q7 TDI'];
        const conditionNames = {
            'lab-test': 'Prueba Laboratorio',
            'city-driving': 'Conducción Ciudad',
            'highway': 'Autopista',
            'mountain': 'Montaña'
        };
        
        // Calcular emisiones
        const conditionMultipliers = {
            'lab-test': 1.0,
            'city-driving': 15.0,
            'highway': 25.0,
            'mountain': 40.0
        };
        
        const modelEmissions = {
            1: 100,  // Golf
            2: 120,  // Jetta
            3: 150,  // Passat
            4: 200   // Audi Q7
        };
        
        let realEmissions = modelEmissions[vehicleModel] * conditionMultipliers[drivingCondition];
        if (temperature < 10) realEmissions *= 1.5;
        if (temperature > 30) realEmissions *= 1.3;
        
        if (softwareEnabled && drivingCondition !== 'lab-test') {
            realEmissions = 88; // Emisiones de prueba
        }
        
        const legalLimit = 80; // Euro 6
        const exceedsBy = ((realEmissions / legalLimit) - 1) * 100;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Emisiones
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(40, 40, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Modelo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${models[vehicleModel-1]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Condición</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${conditionNames[drivingCondition]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Software Activado</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${softwareEnabled ? 'Sí' : 'No'}</div>
                            </div>
                            <div style="background: rgba(40, 40, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Temperatura</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${temperature}°C</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Resultados de emisiones de NOx</span><br>
                            <span class="code-keyword">Límite legal (Euro 6):</span> ${legalLimit} mg/km<br>
                            <span class="code-keyword">Emisiones simuladas:</span> ${realEmissions.toFixed(0)} mg/km<br>
                            <span class="code-keyword">Exceso sobre límite:</span> ${exceedsBy.toFixed(0)}%<br>
                            <span class="code-keyword">Equivalente a:</span> ${(realEmissions / legalLimit).toFixed(1)}x límite legal<br>
                            <span class="code-keyword">Estado:</span> <span style="color: ${exceedsBy > 0 ? 'var(--accent-secondary)' : 'var(--success)'};">${exceedsBy > 0 ? 'FUERA DE NORMA' : 'DENTRO DE NORMA'}</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="exportDataBtn" style="min-width: 200px;">
                            <i class="fas fa-download"></i> Exportar Reporte
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
            alert('Reporte de emisiones exportado como PDF');
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de escándalo
        const simulateScandalBtn = document.getElementById('simulateScandalBtn');
        if (simulateScandalBtn) {
            simulateScandalBtn.addEventListener('click', simulateScandalTimeline);
        }
        
        // Botón de consecuencias legales
        const viewLegalBtn = document.getElementById('viewLegalBtn');
        if (viewLegalBtn) {
            viewLegalBtn.addEventListener('click', () => {
                document.getElementById('legalModal').classList.add('active');
            });
        }
        
        // Botón de comparación de emisiones
        const compareEmissionsBtn = document.getElementById('compareEmissionsBtn');
        if (compareEmissionsBtn) {
            compareEmissionsBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.add('active');
            });
        }
        
        // Cerrar modales
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                document.getElementById('legalModal').classList.remove('active');
            });
        }
        
        const closeCompareModalBtn = document.getElementById('closeCompareModal');
        if (closeCompareModalBtn) {
            closeCompareModalBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.remove('active');
            });
        }
        
        // Cerrar modales al hacer clic fuera
        const legalModal = document.getElementById('legalModal');
        if (legalModal) {
            legalModal.addEventListener('click', (e) => {
                if (e.target.id === 'legalModal') {
                    legalModal.classList.remove('active');
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
                const legalModal = document.getElementById('legalModal');
                const compareModal = document.getElementById('compareModal');
                
                if (legalModal) legalModal.classList.remove('active');
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

    // Función para simulación de línea temporal del escándalo
    function simulateScandalTimeline() {
        const btn = document.getElementById('simulateScandalBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando cronología del escándalo...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "2006: Desarrollo software 'defeat device' en VW...",
            "2009: Primeros vehículos con software ilegal vendidos...",
            "2014: Investigadores WVU descubren anomalías...",
            "2015: EPA emite orden de violación - Escándalo público...",
            "2015: Winterkorn renuncia, 11M vehículos afectados...",
            "2016: Investigaciones globales, acciones caen 37%...",
            "2017: Acuerdos $4.3B criminales, ejecutivos acusados...",
            "2018: Compensación $25B a propietarios EUA...",
            "2020: Transición a eléctricos, nuevo CEO Diess...",
            "2023: Juicios continuos, legado regulatorio WLTP/RDE"
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
            showScandalResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 8000);
    }

    // Función para mostrar resultados del escándalo
    function showScandalResults() {
        const results = [
            { type: 'Vehículos afectados', value: '11M', color: '#ff4444', icon: 'fa-car' },
            { type: 'Multas totales', value: '$30B', color: '#ffaa00', icon: 'fa-dollar-sign' },
            { type: 'Muertes estimadas', value: '1,200', color: '#44ffaa', icon: 'fa-skull-crossbones' },
            { type: 'Años duración', value: '15+', color: '#4ade80', icon: 'fa-calendar-alt' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeScandalModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-history"></i> Impacto Global del Dieselgate
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Resumen del impacto del mayor escándalo automotriz de la historia (2006-2023):</p>
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
                    <button class="btn" id="viewFullTimelineBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-scroll"></i> Ver Cronología Completa
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal del escándalo
        document.getElementById('closeScandalModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewFullTimelineBtn').addEventListener('click', () => {
            alert('Mostrando cronología detallada del Dieselgate 2006-2023');
            modal.remove();
        });
    }

    // Función para mostrar detalle de entidad afectada
    function showEntityDetail(entity) {
        const details = {
            'Volkswagen AG': {
                contribution: 'Desarrollo e implementación software "defeat device"',
                products: 'Motores EA189 2.0L TDI, software de gestión motor',
                timeline: '2006-2015 (implementación), 2015-presente (consecuencias)',
                impact: '11 millones de vehículos afectados globalmente, $30B+ en multas'
            },
            'Audi AG': {
                contribution: 'Motores 3.0L V6 TDI con software sofisticado',
                products: 'Audi A3, A4, A6, Q5, Q7 (2009-2016)',
                timeline: '2009-2016',
                impact: '85,000 vehículos EUA, imagen de marca premium dañada'
            },
            'Porsche AG': {
                contribution: 'Modelos Cayenne Diesel con tecnología compartida VW/Audi',
                products: 'Porsche Cayenne Diesel (2013-2016)',
                timeline: '2013-2016',
                impact: 'Daño a imagen de marca de lujo, ventas diesel suspendidas'
            },
            'Robert Bosch GmbH': {
                contribution: 'Proveedor de software de gestión motor EDC17',
                products: 'Software de control motor, componentes de inyección',
                timeline: '2006-presente',
                impact: 'Investigaciones por posible complicidad, cambios en gobierno corporativo'
            },
            'Autoridades Regulatorias': {
                contribution: 'Supervisión fallida, pruebas obsoletas NEDC',
                products: 'Protocolos de prueba, homologación vehículos',
                timeline: 'Pre-2015: fallas, Post-2015: reformas',
                impact: 'Nuevos protocolos WLTP/RDE, mayor transparencia industria'
            },
            'Departamento de Justicia EUA': {
                contribution: 'Investigación criminal liderada por EPA y DOJ',
                products: 'Acuerdos judiciales, condenas ejecutivos',
                timeline: '2015-presente',
                impact: 'Multas récord $4.3B criminales, sentencias ejecutivos VW'
            }
        };
        
        const entityDetails = details[entity.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeEntityModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${entity.color}; margin-right: 1rem;">
                        <i class="fas ${entity.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${entity.color};">${entity.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${entity.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${entity.color};">
                            <i class="fas fa-info-circle"></i> Detalles del Rol en Dieselgate:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${entityDetails.contribution ? `
                                <div style="background: rgba(40, 40, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución/Rol</div>
                                    <div style="font-weight: 600;">${entityDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${entityDetails.products ? `
                                <div style="background: rgba(40, 40, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos/Área</div>
                                    <div style="font-weight: 600;">${entityDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${entityDetails.timeline ? `
                                <div style="background: rgba(40, 40, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Involucrado</div>
                                    <div style="font-weight: 600;">${entityDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${entityDetails.impact ? `
                                <div style="background: rgba(40, 40, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto/Consecuencias</div>
                                    <div style="font-weight: 600;">${entityDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${entity.title} - Estado post-Dieselgate</span><br>
                        <span class="code-keyword">Estado legal:</span> ${entity.status}<br>
                        <span class="code-keyword">Cambios implementados:</span> Mayor transparencia, controles éticos<br>
                        <span class="code-keyword">Lecciones aprendidas:</span> Ética corporativa, cumplimiento regulatorio
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${entity.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeEntityModal').addEventListener('click', () => {
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
    console.log('Aplicación Dieselgate inicializada correctamente');
});