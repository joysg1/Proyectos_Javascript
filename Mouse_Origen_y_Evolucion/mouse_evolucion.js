document.addEventListener('DOMContentLoaded', function() {
    console.log('Mouse Evolución: Inicializando aplicación...');
    
    // Datos de fabricantes importantes
    const manufacturersData = [
        {
            icon: 'fa-mouse',
            title: 'Logitech',
            description: 'Líder mundial en periféricos. Innovador en tecnología inalámbrica (Lightspeed), sensores HERO y ergonomía avanzada.',
            color: '#8a2be2',
            status: 'Activo',
            contribution: 'Lightspeed, HERO Sensor, Powerplay'
        },
        {
            icon: 'fa-gamepad',
            title: 'Razer',
            description: 'Referente en gaming. Desarrolló sensores ópticos 5G (20K DPI), switches ópticos y tecnología HyperSpeed.',
            color: '#00d4aa',
            status: 'Activo',
            contribution: 'Optical Switches, 5G Sensors, RGB Chroma'
        },
        {
            icon: 'fa-windows',
            title: 'Microsoft',
            description: 'Pionero en mouse ergonómicos. Introdujo IntelliMouse (1999) con rueda de scroll y diseño ergonómico.',
            color: '#0078d7',
            status: 'Activo',
            contribution: 'IntelliMouse, Sculpt Ergonomic'
        },
        {
            icon: 'fa-apple',
            title: 'Apple',
            description: 'Popularizó el mouse de un solo botón. Innovó con Magic Mouse (multitouch) y trackpad Force Touch.',
            color: '#a2aaad',
            status: 'Activo',
            contribution: 'Magic Mouse, Multi-Touch, Bluetooth'
        },
        {
            icon: 'fa-cogs',
            title: 'SteelSeries',
            description: 'Especialista en gaming competitivo. Desarrolló sensores TrueMove y tecnología Quantum Wireless.',
            color: '#ff9e00',
            status: 'Activo',
            contribution: 'TrueMove Sensor, Quantum Wireless'
        },
        {
            icon: 'fa-trophy',
            title: 'Finalmouse',
            description: 'Revolucionó mouses gaming ultraligeros. Pionero en honeycomb shell y diseños sub-50g.',
            color: '#ff6b6b',
            status: 'Activo',
            contribution: 'Ultralight Design, Honeycomb Shell'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initPrecisionSimulation();

    // Función para inicializar partículas tecnológicas
    function initTechParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 120;
        
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
                    // Partículas de movimiento (púrpura)
                    color = `rgba(138, 43, 226, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de precisión (verde)
                    color = `rgba(0, 212, 170, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.6;
                } else {
                    // Cursor/click (naranja)
                    color = `rgba(255, 158, 0, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.8;
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
                    type: type < 0.6 ? 'movement' : type < 0.85 ? 'precision' : 'click'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo sutil con patrón de grid
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 18, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar patrón de grid sutil
            ctx.strokeStyle = 'rgba(138, 43, 226, 0.03)';
            ctx.lineWidth = 0.5;
            
            // Grid horizontal
            for (let i = 0; i < canvas.height; i += 40) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }
            
            // Grid vertical
            for (let i = 0; i < canvas.width; i += 40) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
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
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.4 + 0.6;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula
                ctx.beginPath();
                
                // Forma diferente según tipo
                if (particle.type === 'click') {
                    // Clicks como triángulos
                    ctx.moveTo(particle.x, particle.y - particle.size);
                    ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
                    ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
                    ctx.closePath();
                } else if (particle.type === 'precision') {
                    // Precisión como diamantes
                    ctx.moveTo(particle.x, particle.y - particle.size);
                    ctx.lineTo(particle.x + particle.size, particle.y);
                    ctx.lineTo(particle.x, particle.y + particle.size);
                    ctx.lineTo(particle.x - particle.size, particle.y);
                    ctx.closePath();
                } else {
                    // Movimiento como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'movement') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'precision') {
                        gradient.addColorStop(0, `rgba(0, 212, 170, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(0, 212, 170, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(255, 158, 0, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 158, 0, 0)');
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

    // Función para inicializar simulación de precisión
    function initPrecisionSimulation() {
        console.log('Inicializando simulación de precisión...');
        
        // Elementos del DOM
        const sensorSlider = document.getElementById('sensorSlider');
        const sensorValue = document.getElementById('sensorValue');
        const dpiSlider = document.getElementById('dpiSlider');
        const dpiValue = document.getElementById('dpiValue');
        const pollingSlider = document.getElementById('pollingSlider');
        const pollingValue = document.getElementById('pollingValue');
        const deviceTypeButtons = document.querySelectorAll('.device-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('precisionCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !sensorSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        sensorSlider.addEventListener('input', function() {
            const sensors = ['Mecánico (400 DPI)', 'Óptico LED (5K DPI)', 'Láser (20K DPI)', 'Óptico Avanzado (26K DPI)'];
            sensorValue.textContent = sensors[this.value - 1];
        });
        
        dpiSlider.addEventListener('input', function() {
            dpiValue.textContent = `${parseInt(this.value).toLocaleString()} DPI`;
        });
        
        pollingSlider.addEventListener('input', function() {
            pollingValue.textContent = `${this.value} Hz`;
        });
        
        // Botones de tipo de dispositivo
        deviceTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                deviceTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runPrecisionSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            sensorSlider.value = 3;
            sensorValue.textContent = 'Láser (20K DPI)';
            dpiSlider.value = 8000;
            dpiValue.textContent = '8,000 DPI';
            pollingSlider.value = 1000;
            pollingValue.textContent = '1000 Hz';
            deviceTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="gaming"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Mouse láser (azul) ofrece mayor precisión en movimiento, ideal para gaming y diseño</div>';
            
            // Ejecutar simulación con valores por defecto
            runPrecisionSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runPrecisionSimulation();
        }, 500);
        
        console.log('Simulación de precisión inicializada');
    }

    // Función para ejecutar simulación de precisión
    function runPrecisionSimulation() {
        const canvas = document.getElementById('precisionCurveCanvas');
        const ctx = canvas.getContext('2d');
        const sensorType = parseInt(document.getElementById('sensorSlider').value);
        const dpi = parseInt(document.getElementById('dpiSlider').value);
        const pollingRate = parseInt(document.getElementById('pollingSlider').value);
        const deviceType = document.querySelector('.device-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (velocidad de movimiento)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (precisión en %)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Velocidad de Movimiento (IPS)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Precisión (%)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X (IPS: inches per second)
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = i * 100;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value + ' IPS', x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y (precisión %)
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 20;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value + '%', padding - 25, y + 3);
        }
        
        // Precisión máxima por tipo de sensor
        const sensorPrecision = {
            1: 85,   // Mecánico
            2: 95,   // Óptico LED
            3: 98,   // Láser
            4: 99    // Óptico avanzado
        };
        
        // Precisión por tipo de uso
        const usageFactors = {
            'office': 0.8,
            'design': 0.95,
            'gaming': 0.98,
            'pro': 0.99
        };
        
        // Calcular curvas
        const points = 100;
        const sensorCurve = [];
        const dpiLimitCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const speed = (i * 500) / points; // 0-500 IPS
            
            // Precisión teórica del sensor
            const v_sensor = sensorPrecision[sensorType];
            
            // Límite del DPI (DPI alto mantiene precisión a mayor velocidad)
            const v_dpi = Math.min(100, 70 + (dpi / 26000) * 30);
            
            // Precisión real (considera polling rate y tipo de uso)
            let v_actual = Math.min(v_sensor, v_dpi);
            
            // Penalización por velocidad alta
            if (speed > 200) {
                v_actual *= 0.9;
            } else if (speed > 300) {
                v_actual *= 0.8;
            } else if (speed > 400) {
                v_actual *= 0.7;
            }
            
            // Beneficio por polling rate alto
            v_actual *= (0.8 + (pollingRate / 8000) * 0.2);
            
            // Factor de tipo de uso
            v_actual *= usageFactors[deviceType];
            
            // Aleatoriedad para simular imperfecciones
            v_actual += (Math.random() - 0.5) * 2;
            
            sensorCurve.push({speed: speed, v: v_sensor});
            dpiLimitCurve.push({speed: speed, v: v_dpi});
            actualCurve.push({speed: speed, v: Math.max(0, Math.min(100, v_actual))});
        }
        
        // Dibujar curva límite del sensor
        ctx.strokeStyle = 'rgba(138, 43, 226, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        sensorCurve.forEach((point, i) => {
            const x = padding + (point.speed / 500) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva límite DPI
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        dpiLimitCurve.forEach((point, i) => {
            const x = padding + (point.speed / 500) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
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
            const x = padding + (point.speed / 500) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(138, 43, 226, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.speed / 500) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            const ySensor = canvas.height - padding - (sensorCurve[i].v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, ySensor);
            } else {
                ctx.lineTo(x, ySensor);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + (point.speed / 500) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Límite sensor
        ctx.fillStyle = 'rgba(138, 43, 226, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite sensor', canvas.width - 155, 32);
        
        // Límite DPI
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite DPI', canvas.width - 155, 57);
        
        // Rendimiento real
        ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Rendimiento real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const sensorPrecisionValue = sensorPrecision[sensorType];
        const usageFactor = usageFactors[deviceType];
        
        conclusion.innerHTML = `
            <div class="result-text" style="color: ${sensorPrecisionValue > 95 ? 'var(--success)' : 'var(--warning)'};">
                <i class="fas ${sensorPrecisionValue > 95 ? 'fa-check-circle' : 'fa-exclamation-triangle'}" style="margin-right: 0.5rem;"></i>
                Precisión máxima: ${sensorPrecisionValue}% | Uso: ${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} (${Math.round(usageFactor * 100)}%)
            </div>
        `;
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const sensorType = parseInt(document.getElementById('sensorSlider').value);
        const dpi = parseInt(document.getElementById('dpiSlider').value);
        const pollingRate = parseInt(document.getElementById('pollingSlider').value);
        const deviceType = document.querySelector('.device-type-btn.active').dataset.type;
        
        const sensors = ['Mecánico (400 DPI)', 'Óptico LED (5K DPI)', 'Láser (20K DPI)', 'Óptico Avanzado (26K DPI)'];
        const deviceNames = {
            'office': 'Oficina/Productividad',
            'design': 'Diseño Gráfico',
            'gaming': 'Gaming Competitivo',
            'pro': 'Profesional/CAD'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Precisión
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tecnología Sensor</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${sensors[sensorType-1]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Uso</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${deviceNames[deviceType]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">DPI (Precisión)</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${dpi.toLocaleString()} DPI</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Polling Rate</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${pollingRate} Hz</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de precisión teórica vs real</span><br>
                            <span class="code-keyword">Precisión máxima sensor:</span> ${[85, 95, 98, 99][sensorType-1]}%<br>
                            <span class="code-keyword">Factor DPI:</span> ${Math.round(70 + (dpi / 26000) * 30)}%<br>
                            <span class="code-keyword">Factor polling rate:</span> ${Math.round((0.8 + (pollingRate / 8000) * 0.2) * 100)}%<br>
                            <span class="code-keyword">Precisión estimada:</span> ${Math.round([85, 95, 98, 99][sensorType-1] * (0.8 + (pollingRate / 8000) * 0.2) * {office:0.8, design:0.95, gaming:0.98, pro:0.99}[deviceType])}%
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
            simulateEvolutionBtn.addEventListener('click', simulateMouseEvolution);
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

    // Función para simulación de evolución del mouse
    function simulateMouseEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución del mouse...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1963: Primer mouse de madera (Douglas Engelbart)...",
            "1973: Xerox Alto con GUI y mouse de 3 botones...",
            "1981: Primer mouse comercial (Xerox 8010 Star)...",
            "1984: Apple Macintosh populariza mouse de 1 botón...",
            "1999: Microsoft IntelliMouse con rueda de scroll...",
            "2004: Primer mouse láser comercial (Logitech MX1000)...",
            "2009: Mouse gaming con altos DPI (Razer DeathAdder)...",
            "2013: Inalámbricos de baja latencia (Logitech G Pro Wireless)...",
            "2020: Ultraligeros (<50g) y polling rate 8KHz..."
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
            showMouseEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 7200);
    }

    // Función para mostrar resultados de evolución del mouse
    function showMouseEvolutionResults() {
        const results = [
            { type: 'DPI máximo', value: '26,000', color: '#8a2be2', icon: 'fa-crosshairs' },
            { type: 'Años desde invención', value: '60+', color: '#00d4aa', icon: 'fa-calendar-alt' },
            { type: 'Polling Rate', value: '8,000Hz', color: '#ff9e00', icon: 'fa-tachometer-alt' },
            { type: 'Peso mínimo', value: '37g', color: '#ff6b6b', icon: 'fa-weight' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Tecnológica del Mouse
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto del mouse en la interacción humano-computadora desde 1963 hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución del mouse');
            modal.remove();
        });
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturer) {
        const details = {
            'Logitech': {
                contribution: 'Pionero en tecnología inalámbrica Lightspeed, sensor HERO, y carga wireless Powerplay',
                products: 'MX Master, G Pro Wireless, G502, Anywhere, Marathon',
                timeline: '1981-presente',
                impact: 'Liderazgo en ergonomía y tecnología inalámbrica para productividad y gaming'
            },
            'Razer': {
                contribution: 'Desarrolló switches ópticos, sensores 5G (20K DPI), y tecnología HyperSpeed',
                products: 'DeathAdder, Viper, Basilisk, Naga, Mamba',
                timeline: '1998-presente',
                impact: 'Referente en gaming de alto rendimiento con RGB Chroma y personalización'
            },
            'Microsoft': {
                contribution: 'Introdujo la rueda de scroll (IntelliMouse 1999) y diseño ergonómico avanzado',
                products: 'IntelliMouse, Sculpt Ergonomic, Arc Mouse, Surface Precision',
                timeline: '1983-presente',
                impact: 'Democratizó características avanzadas y enfoque en ergonomía para productividad'
            },
            'Apple': {
                contribution: 'Popularizó mouse de un botón, innovó con Magic Mouse multitouch',
                products: 'Apple Mouse, Magic Mouse, Magic Trackpad, Mighty Mouse',
                timeline: '1984-presente',
                impact: 'Enfoque en simplicidad y diseño minimalista integrado con ecosistema Apple'
            },
            'SteelSeries': {
                contribution: 'Desarrolló sensor TrueMove para gaming competitivo y tecnología Quantum Wireless',
                products: 'Rival, Sensei, Aerox, Prime',
                timeline: '2001-presente',
                impact: 'Especialista en gaming profesional con enfoque en precisión y durabilidad'
            },
            'Finalmouse': {
                contribution: 'Revolucionó mouses ultraligeros con diseños honeycomb y pesos sub-50g',
                products: 'Ultralight 2, Starlight-12, Air58',
                timeline: '2015-presente',
                impact: 'Cambió expectativas de peso en gaming competitivo y popularizó diseños ultraligeros'
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
                        <span class="code-comment">// ${manufacturer.title} - Especificaciones técnicas destacadas</span><br>
                        <span class="code-keyword">DPI máximo:</span> ${manufacturer.title === 'Razer' ? '20,000' : manufacturer.title === 'Logitech' ? '25,600' : manufacturer.title === 'Finalmouse' ? '3,200' : '16,000'} DPI<br>
                        <span class="code-keyword">Tecnología inalámbrica:</span> ${manufacturer.title === 'Logitech' ? 'Lightspeed (1ms)' : manufacturer.title === 'Razer' ? 'HyperSpeed (1ms)' : manufacturer.title === 'SteelSeries' ? 'Quantum 2.0' : 'Bluetooth/RF'}<br>
                        <span class="code-keyword">Durabilidad switches:</span> ${manufacturer.title === 'Razer' ? '80M clics' : manufacturer.title === 'Logitech' ? '50M clics' : '20M clics'}<br>
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
    console.log('Aplicación Mouse Evolución inicializada correctamente');
});