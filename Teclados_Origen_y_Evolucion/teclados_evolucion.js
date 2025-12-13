document.addEventListener('DOMContentLoaded', function() {
    console.log('Teclados: Inicializando aplicación...');
    
    // Datos de fabricantes importantes
    const manufacturersData = [
        {
            icon: 'fa-keyboard',
            title: 'Cherry',
            description: 'Inventor del switch mecánico Cherry MX en 1983. Estándar de la industria con switches Red, Blue, Brown, Black, etc.',
            color: '#ff6b9d',
            status: 'Activo',
            contribution: 'Cherry MX, switches mecánicos'
        },
        {
            icon: 'fa-gamepad',
            title: 'Razer',
            description: 'Líder en teclados gaming con switches mecánicos propios (Green, Yellow, Orange) y tecnología óptica.',
            color: '#00ff9d',
            status: 'Activo',
            contribution: 'Switches ópticos, gaming'
        },
        {
            icon: 'fa-microchip',
            title: 'Logitech',
            description: 'Principal fabricante de periféricos con teclados mecánicos G series y switches Romer-G/Tactile.',
            color: '#6b8cff',
            status: 'Activo',
            contribution: 'Switches Romer-G, wireless'
        },
        {
            icon: 'fa-industry',
            title: 'IBM',
            description: 'Creador del legendario Model M (1984) con switch buckling spring. Revolucionó los teclados de oficina.',
            color: '#ff9e00',
            status: 'Histórico',
            contribution: 'Model M, buckling spring'
        },
        {
            icon: 'fa-cogs',
            title: 'Gateron',
            description: 'Fabricante chino de switches mecánicos alternativos a Cherry MX. Conocido por su suavidad y variantes.',
            color: '#00d4aa',
            status: 'Activo',
            contribution: 'Switches alternativos, low-profile'
        },
        {
            icon: 'fa-bolt',
            title: 'SteelSeries',
            description: 'Pionero en teclados gaming con switches mecánicos QX2 y Apex series. Innovación en iluminación RGB.',
            color: '#ff3d7f',
            status: 'Activo',
            contribution: 'Switches QX2, gaming RGB'
        },
        {
            icon: 'fa-keyboard',
            title: 'Ducky',
            description: 'Fabricante taiwanés premium de teclados mecánicos. Conocido por calidad de construcción y keycaps PBT.',
            color: '#9ab4ff',
            status: 'Activo',
            contribution: 'Teclados premium, keycaps PBT'
        },
        {
            icon: 'fa-keyboard',
            title: 'Keychron',
            description: 'Popular fabricante de teclados mecánicos inalámbricos y hot-swappable. Enfoque en Mac y multiplataforma.',
            color: '#6bffb3',
            status: 'Activo',
            contribution: 'Wireless, hot-swap, Mac'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initSwitchSimulation();

    // Función para inicializar partículas tecnológicas
    function initTechParticles() {
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
                    // Partículas de teclas (rosa)
                    color = `rgba(255, 107, 157, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else if (type < 0.85) {
                    // Partículas de circuitos (azul)
                    color = `rgba(107, 140, 255, ${Math.random() * 0.4 + 0.2})`;
                    size = Math.random() * 2 + 1;
                    speed = (Math.random() - 0.5) * 0.7;
                } else {
                    // Partículas de luz RGB (verde)
                    color = `rgba(107, 255, 179, ${Math.random() * 0.4 + 0.2})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.9;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.5,
                    color: color,
                    pulseSpeed: Math.random() * 0.04 + 0.02,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.6 ? 'key' : type < 0.85 ? 'circuit' : 'rgb'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de teclado sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 26, 35, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 15, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
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
                
                // Forma diferente según tipo
                if (particle.type === 'key') {
                    // Teclas como rectángulos
                    const keyWidth = particle.size;
                    const keyHeight = particle.size * 1.5;
                    ctx.roundRect(particle.x - keyWidth/2, particle.y - keyHeight/2, keyWidth, keyHeight, 4);
                } else if (particle.type === 'circuit') {
                    // Circuitos como líneas
                    ctx.moveTo(particle.x - particle.size, particle.y);
                    ctx.lineTo(particle.x + particle.size, particle.y);
                    ctx.lineWidth = particle.size/2;
                } else {
                    // RGB como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type === 'rgb') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    gradient.addColorStop(0, `rgba(107, 255, 179, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(107, 255, 179, 0)');
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                if (particle.type === 'circuit') {
                    ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    ctx.stroke();
                } else {
                    ctx.fill();
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
        console.log('Partículas tecnológicas inicializadas');
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

    // Función para inicializar simulación de switches
    function initSwitchSimulation() {
        console.log('Inicializando simulación de switches...');
        
        // Elementos del DOM
        const switchTypeSlider = document.getElementById('switchTypeSlider');
        const switchTypeValue = document.getElementById('switchTypeValue');
        const actuationSlider = document.getElementById('actuationSlider');
        const actuationSpeedValue = document.getElementById('actuationSpeedValue');
        const forceSlider = document.getElementById('forceSlider');
        const forceValue = document.getElementById('forceValue');
        const usageTypeButtons = document.querySelectorAll('.device-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('switchCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !switchTypeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        switchTypeSlider.addEventListener('input', function() {
            const types = ['Lineal (Red)', 'Táctil Suave (Brown)', 'Táctil (Clear)', 'Clicky (Blue)', 'Óptico (Speed)'];
            switchTypeValue.textContent = types[this.value - 1];
        });
        
        actuationSlider.addEventListener('input', function() {
            const actuationValues = ['1.2mm', '1.5mm', '2.0mm', '2.2mm', '2.5mm'];
            const index = Math.floor(this.value / 20);
            actuationSpeedValue.textContent = actuationValues[Math.min(index, 4)];
        });
        
        forceSlider.addEventListener('input', function() {
            const forceValues = ['35g', '40g', '45g', '55g', '60g', '65g', '70g'];
            const index = Math.floor(this.value / 15);
            forceValue.textContent = forceValues[Math.min(index, 6)];
        });
        
        // Botones de tipo de uso
        usageTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                usageTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runSwitchSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            switchTypeSlider.value = 3;
            switchTypeValue.textContent = 'Táctil (Brown)';
            actuationSlider.value = 40;
            actuationSpeedValue.textContent = '2.0mm';
            forceSlider.value = 45;
            forceValue.textContent = '45g';
            usageTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="typing"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Switches táctiles ofrecen buen balance para escritura y gaming casual</div>';
            
            // Ejecutar simulación con valores por defecto
            runSwitchSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runSwitchSimulation();
        }, 500);
        
        console.log('Simulación de switches inicializada');
    }

    // Función para ejecutar simulación de switches
    function runSwitchSimulation() {
        const canvas = document.getElementById('switchCurveCanvas');
        const ctx = canvas.getContext('2d');
        const switchType = parseInt(document.getElementById('switchTypeSlider').value);
        const actuationValue = parseInt(document.getElementById('actuationSlider').value);
        const forceValue = parseInt(document.getElementById('forceSlider').value);
        const usageType = document.querySelector('.device-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (fuerza aplicada)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (distancia recorrida)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Fuerza Aplicada (g)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Distancia Recorrida (mm)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = i * 20;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value.toString(), x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = (i * 0.8).toFixed(1);
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value + "mm", padding - 25, y + 3);
        }
        
        // Parámetros por tipo de switch
        const switchTypes = {
            1: { // Lineal
                name: 'Lineal (Red)',
                actuationPoint: 2.0,
                force: 45,
                tactileBump: 0,
                color: '#ff6b9d'
            },
            2: { // Táctil suave
                name: 'Táctil (Brown)',
                actuationPoint: 2.0,
                force: 55,
                tactileBump: 0.3,
                color: '#ff9e00'
            },
            3: { // Táctil
                name: 'Táctil (Clear)',
                actuationPoint: 2.0,
                force: 65,
                tactileBump: 0.5,
                color: '#00d4aa'
            },
            4: { // Clicky
                name: 'Clicky (Blue)',
                actuationPoint: 2.2,
                force: 60,
                tactileBump: 0.6,
                clickPoint: 1.8,
                color: '#6b8cff'
            },
            5: { // Óptico
                name: 'Óptico (Speed)',
                actuationPoint: 1.2,
                force: 45,
                tactileBump: 0,
                color: '#6bffb3'
            }
        };
        
        // Calcular curvas
        const points = 100;
        const forceCurve = [];
        
        const currentSwitch = switchTypes[switchType];
        const actuationDist = currentSwitch.actuationPoint;
        const forceReq = currentSwitch.force;
        const tactileBump = currentSwitch.tactileBump || 0;
        const hasClick = currentSwitch.clickPoint;
        
        for (let i = 0; i <= points; i++) {
            const distance = (i * 4.0) / points; // 0-4mm de recorrido
            let force;
            
            // Curva de fuerza según tipo de switch
            if (distance <= actuationDist) {
                if (tactileBump > 0 && distance > actuationDist * 0.5 && distance < actuationDist) {
                    // Bump táctil
                    const bumpPosition = actuationDist * 0.7;
                    const bumpWidth = actuationDist * 0.2;
                    const bumpStrength = tactileBump;
                    
                    if (Math.abs(distance - bumpPosition) < bumpWidth) {
                        const bumpFactor = Math.cos((distance - bumpPosition) * Math.PI / bumpWidth) * bumpStrength + 1;
                        force = (forceReq * (distance / actuationDist)) * bumpFactor;
                    } else {
                        force = forceReq * (distance / actuationDist);
                    }
                } else {
                    force = forceReq * (distance / actuationDist);
                }
                
                // Punto de click para switches clicky
                if (hasClick && distance > hasClick) {
                    force *= 0.8; // Caída después del click
                }
            } else {
                // Después del punto de actuación
                force = forceReq + (distance - actuationDist) * 10;
            }
            
            // Ajustar según parámetros del slider
            const actuationAdjust = actuationValue / 50; // 0-2
            const forceAdjust = forceValue / 50; // 0-2
            
            forceCurve.push({distance: distance, force: force * forceAdjust});
        }
        
        // Dibujar curva de fuerza
        ctx.strokeStyle = currentSwitch.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        forceCurve.forEach((point, i) => {
            const x = padding + (point.force / 100) * graphWidth;
            const y = canvas.height - padding - (point.distance / 4.0) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Marcar punto de actuación
        const actuationX = padding + (forceReq / 100) * graphWidth;
        const actuationY = canvas.height - padding - (actuationDist / 4.0) * graphHeight;
        
        ctx.fillStyle = currentSwitch.color;
        ctx.beginPath();
        ctx.arc(actuationX, actuationY, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 10px Inter';
        ctx.fillText('Actuación', actuationX + 10, actuationY - 5);
        
        // Marcar bump táctil si existe
        if (tactileBump > 0) {
            const bumpX = padding + ((forceReq * 0.7) / 100) * graphWidth;
            const bumpY = canvas.height - padding - ((actuationDist * 0.7) / 4.0) * graphHeight;
            
            ctx.fillStyle = currentSwitch.color + '80';
            ctx.beginPath();
            ctx.arc(bumpX, bumpY, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '10px Inter';
            ctx.fillText('Bump', bumpX + 10, bumpY);
        }
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        ctx.fillStyle = currentSwitch.color;
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(currentSwitch.name, canvas.width - 155, 32);
        
        ctx.fillStyle = '#6b8cff';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Punto actuación', canvas.width - 155, 57);
        
        if (tactileBump > 0) {
            ctx.fillStyle = '#ff9e00';
            ctx.fillRect(canvas.width - 180, 70, 15, 15);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillText('Bump táctil', canvas.width - 155, 82);
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let recommendation = '';
        
        switch(usageType) {
            case 'gaming':
                recommendation = switchType === 1 || switchType === 5 ? 
                    'Excelente para gaming competitivo' : 
                    switchType === 2 ? 
                    'Buen balance gaming/escritura' : 
                    'No ideal para gaming rápido';
                break;
            case 'typing':
                recommendation = switchType === 4 || switchType === 3 ? 
                    'Ideal para escritura rápida' : 
                    switchType === 2 ? 
                    'Balanceado para escritura' : 
                    'Menos feedback para escritura';
                break;
            case 'office':
                recommendation = switchType === 2 || switchType === 1 ? 
                    'Aceptable para oficina' : 
                    switchType === 4 ? 
                    'Demasiado ruidoso para oficina' : 
                    'Depende del entorno';
                break;
            case 'programming':
                recommendation = switchType === 2 || switchType === 3 ? 
                    'Excelente para programación' : 
                    switchType === 4 ? 
                    'Feedback auditivo útil' : 
                    'Lineales también populares';
                break;
        }
        
        conclusion.innerHTML = `
            <div class="result-text" style="color: ${currentSwitch.color};">
                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                ${recommendation} | ${currentSwitch.name} (${forceReq}g, ${actuationDist}mm)
            </div>
        `;
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const switchType = parseInt(document.getElementById('switchTypeSlider').value);
        const actuationValue = parseInt(document.getElementById('actuationSlider').value);
        const forceValue = parseInt(document.getElementById('forceSlider').value);
        const usageType = document.querySelector('.device-type-btn.active').dataset.type;
        
        const switchTypes = [
            'Lineal (Cherry MX Red)',
            'Táctil Suave (Cherry MX Brown)',
            'Táctil (Cherry MX Clear)',
            'Clicky (Cherry MX Blue)',
            'Óptico (Razer Speed)'
        ];
        
        const usageNames = {
            'gaming': 'Gaming Competitivo',
            'typing': 'Escritura Rápida',
            'office': 'Oficina/Silencio',
            'programming': 'Programación'
        };
        
        const switchDetails = {
            1: {force: '45g', actuation: '2.0mm', travel: '4.0mm', life: '100M'},
            2: {force: '55g', actuation: '2.0mm', travel: '4.0mm', life: '100M'},
            3: {force: '65g', actuation: '2.0mm', travel: '4.0mm', life: '100M'},
            4: {force: '60g', actuation: '2.2mm', travel: '4.0mm', life: '50M'},
            5: {force: '45g', actuation: '1.2mm', travel: '3.5mm', life: '100M+'}
        };
        
        const detail = switchDetails[switchType];
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Switches
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(40, 40, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Switch</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${switchTypes[switchType-1]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Uso</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${usageNames[usageType]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Fuerza Actuación</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${detail.force}</div>
                            </div>
                            <div style="background: rgba(40, 40, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Punto Actuación</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${detail.actuation}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Especificaciones técnicas del switch</span><br>
                            <span class="code-keyword">Recorrido total:</span> ${detail.travel}<br>
                            <span class="code-keyword">Durabilidad:</span> ${detail.life} pulsaciones<br>
                            <span class="code-keyword">Tipo:</span> ${switchType <= 2 ? 'Lineal' : switchType === 3 || switchType === 4 ? 'Táctil/Clicky' : 'Óptico'}<br>
                            <span class="code-keyword">Recomendado para:</span> ${usageType === 'gaming' ? 'Gaming rápido' : usageType === 'typing' ? 'Escritura prolongada' : usageType === 'office' ? 'Entornos silenciosos' : 'Programación'}
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
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución tecnológica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1868: Primera máquina de escribir comercial...",
            "1873: Establecimiento del layout QWERTY...",
            "1964: Teletipos como entrada de computadoras...",
            "1970: Teclados de terminales mainframe...",
            "1981: IBM Model M con buckling spring...",
            "1983: Cherry MX - primer switch mecánico moderno...",
            "1990: Dominio de teclados de membrana...",
            "2005: Resurgimiento de teclados mecánicos...",
            "2010: Era del gaming - RGB y personalización...",
            "2018: Switches ópticos y hot-swappable...",
            "Presente: Teclados ergonómicos y personalización extrema"
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
        }, 8800);
    }

    // Función para mostrar resultados de evolución tecnológica
    function showTechEvolutionResults() {
        const results = [
            { type: 'Durabilidad máxima', value: '100M+', color: '#ff6b9d', icon: 'fa-keyboard' },
            { type: 'Años de evolución', value: '150+', color: '#ff9e00', icon: 'fa-calendar-alt' },
            { type: 'Velocidad actuación', value: '1.0ms', color: '#6bffb3', icon: 'fa-tachometer-alt' },
            { type: 'Mercado gaming mecánico', value: '85%', color: '#6b8cff', icon: 'fa-chart-pie' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Tecnológica de Teclados
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de los teclados en la interacción humano-computadora desde 1868 hasta la actualidad:</p>
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
            // Desplazar a la sección de timeline
            document.querySelector('.timeline-section').scrollIntoView({ behavior: 'smooth' });
            modal.remove();
        });
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturer) {
        const details = {
            'Cherry': {
                contribution: 'Inventor del switch mecánico Cherry MX (1983). Estándar de la industria por décadas.',
                products: 'Cherry MX Red, Blue, Brown, Black, Clear, Speed, Low Profile',
                timeline: '1983-presente',
                impact: 'Estableció el estándar para switches mecánicos modernos'
            },
            'Razer': {
                contribution: 'Líder en teclados gaming con switches mecánicos propios y tecnología óptica.',
                products: 'BlackWidow, Huntsman, DeathStalker series (switches Green, Yellow, Orange)',
                timeline: '2005-presente',
                impact: 'Popularizó teclados mecánicos en el mercado gaming'
            },
            'Logitech': {
                contribution: 'Principal fabricante de periféricos con innovación en switches y conectividad.',
                products: 'G Pro, G915, MX Keys, switches Romer-G, GL Tactile, GX Blue',
                timeline: '1981-presente',
                impact: 'Masificación de teclados gaming y de productividad'
            },
            'IBM': {
                contribution: 'Creador del legendario Model M con switch buckling spring (1984).',
                products: 'IBM Model M, IBM Beam Spring, IBM Capacitive Buckling Spring',
                timeline: '1984-1999 (Model M)',
                impact: 'Revolucionó teclados de oficina con durabilidad excepcional'
            },
            'Gateron': {
                contribution: 'Fabricante chino de switches mecánicos alternativos a Cherry MX.',
                products: 'Gateron Red, Brown, Blue, Black, Yellow, Clear, Ink series',
                timeline: '2010-presente',
                impact: 'Ofreció alternativas más económicas a Cherry MX'
            },
            'SteelSeries': {
                contribution: 'Pionero en teclados gaming con switches mecánicos propios.',
                products: 'Apex Pro, Apex 7, Apex 5 (switches QX2, OmniPoint)',
                timeline: '2001-presente',
                impact: 'Innovación en switches ajustables e iluminación RGB'
            },
            'Ducky': {
                contribution: 'Fabricante taiwanés premium de teclados mecánicos.',
                products: 'Ducky One 2, Ducky Shine 7, Year of the X editions',
                timeline: '2008-presente',
                impact: 'Estableció estándar de calidad en teclados mecánicos premium'
            },
            'Keychron': {
                contribution: 'Popular fabricante de teclados mecánicos inalámbricos y hot-swappable.',
                products: 'Keychron K series, Q series, V series (wireless, hot-swap)',
                timeline: '2018-presente',
                impact: 'Popularizó teclados inalámbricos y hot-swappable'
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
                                <div style="background: rgba(40, 40, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.products ? `
                                <div style="background: rgba(40, 40, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.timeline ? `
                                <div style="background: rgba(40, 40, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.impact ? `
                                <div style="background: rgba(40, 40, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en Mercado</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${manufacturer.title} - Tecnologías relacionadas</span><br>
                        <span class="code-keyword">Tecnologías clave:</span> ${manufacturer.title === 'Cherry' ? 'Cherry MX switches' : manufacturer.title === 'Razer' ? 'Switches ópticos' : manufacturer.title === 'Logitech' ? 'Switches Romer-G, wireless' : manufacturer.title === 'IBM' ? 'Buckling spring' : manufacturer.title === 'Gateron' ? 'Switches alternativos' : manufacturer.title === 'SteelSeries' ? 'OmniPoint adjustable' : manufacturer.title === 'Ducky' ? 'Keycaps PBT, construcción premium' : 'Wireless, hot-swap'}<br>
                        <span class="code-keyword">Mercado objetivo:</span> ${manufacturer.title === 'Cherry' ? 'OEM, entusiastas' : manufacturer.title === 'Razer' ? 'Gaming' : manufacturer.title === 'Logitech' ? 'Gaming, productividad' : manufacturer.title === 'IBM' ? 'Oficina, enterprise' : manufacturer.title === 'Gateron' ? 'Entusiastas, presupuesto' : manufacturer.title === 'SteelSeries' ? 'Gaming competitivo' : manufacturer.title === 'Ducky' ? 'Entusiastas, coleccionistas' : 'Productividad, multiplataforma'}<br>
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
    console.log('Aplicación Teclados: Origen y Evolución inicializada correctamente');
});