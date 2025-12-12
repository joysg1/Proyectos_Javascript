document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const processesData = [
        {
            icon: 'fa-industry',
            title: 'Proceso Haber-Bosch Tradicional',
            description: 'Síntesis catalítica a alta presión (150-300 atm) y temperatura (400-500°C) usando gas natural como fuente de H₂.',
            color: '#2e7d32',
            status: 'Operación global',
            efficiency: '60-80% energética'
        },
        {
            icon: 'fa-bolt',
            title: 'Electrosíntesis de Amoníaco',
            description: 'Producción electroquímica a temperatura ambiente usando electricidad renovable y catalizadores avanzados.',
            color: '#ff8f00',
            status: 'Investigación avanzada',
            efficiency: '30-50% actual'
        },
        {
            icon: 'fa-sun',
            title: 'Fotocatálisis Solar',
            description: 'Uso de catalizadores fotosensibles para convertir N₂ y H₂O en NH₃ usando luz solar directa.',
            color: '#ffb300',
            status: 'Desarrollo inicial',
            efficiency: '<5% eficiencia'
        },
        {
            icon: 'fa-leaf',
            title: 'Procesos Biológicos',
            description: 'Ingeniería de microorganismos con nitrogenasas para fijación biológica mejorada de nitrógeno.',
            color: '#4caf50',
            status: 'Investigación temprana',
            efficiency: '16 ATP/N₂'
        },
        {
            icon: 'fa-atom',
            title: 'Plasma No Térmico',
            description: 'Uso de descargas de plasma para activar moléculas de N₂ a temperaturas moderadas.',
            color: '#00796b',
            status: 'Desarrollo experimental',
            efficiency: 'Baja eficiencia'
        },
        {
            icon: 'fa-recycle',
            title: 'Procesos Híbridos',
            description: 'Combinación de métodos electroquímicos y térmicos para mejorar eficiencia y reducir energía.',
            color: '#5c6bc0',
            status: 'Concepto',
            efficiency: 'Potencial 70%+'
        }
    ];

    // Inicializar componentes
    initChemicalParticles();
    initProcesses();
    initEventListeners();
    initAnimations();
    initTimeline();
    initProcessSimulation();

    // Función para inicializar partículas químicas
    function initChemicalParticles() {
        const canvas = document.getElementById('particles-canvas');
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
                
                if (type < 0.4) {
                    // Moléculas de N₂ (azules)
                    color = `rgba(33, 150, 243, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.7) {
                    // Moléculas de H₂ (amarillas)
                    color = `rgba(255, 193, 7, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 2 + 0.8;
                    speed = (Math.random() - 0.5) * 0.6;
                } else if (type < 0.9) {
                    // Moléculas de NH₃ (púrpuras)
                    color = `rgba(156, 39, 176, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Átomos de catalizador (verdes)
                    color = `rgba(76, 175, 80, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 5 + 2;
                    speed = (Math.random() - 0.5) * 0.2;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed,
                    color: color,
                    twinkleSpeed: Math.random() * 0.05 + 0.02,
                    twinkleOffset: Math.random() * Math.PI * 2,
                    type: type < 0.4 ? 'n2' : type < 0.7 ? 'h2' : type < 0.9 ? 'nh3' : 'catalyst'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo químico sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(10, 18, 10, 0.1)');
            gradient.addColorStop(1, 'rgba(5, 12, 5, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Movimiento
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de centelleo
                const twinkle = Math.sin(Date.now() * particle.twinkleSpeed + particle.twinkleOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * twinkle;
                
                // Dibujar partícula
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Efecto de brillo para partículas especiales
                if (particle.type === 'catalyst' || particle.type === 'nh3') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'catalyst') {
                        gradient.addColorStop(0, `rgba(76, 175, 80, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
                    } else if (particle.type === 'nh3') {
                        gradient.addColorStop(0, `rgba(156, 39, 176, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(156, 39, 176, 0)');
                    }
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                
                // Representar enlaces moleculares para N₂
                if (particle.type === 'n2' && Math.random() < 0.3) {
                    // Buscar otra partícula N₂ cercana
                    particles.forEach(other => {
                        if (other.type === 'n2' && other !== particle) {
                            const dx = other.x - particle.x;
                            const dy = other.y - particle.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance < 50) {
                                ctx.beginPath();
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(other.x, other.y);
                                ctx.strokeStyle = `rgba(33, 150, 243, ${0.1 * twinkle})`;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                        }
                    });
                }
                
                // Destello ocasional para catalizadores
                if (particle.type === 'catalyst' && Math.random() < 0.02) {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(76, 175, 80, 0.2)`;
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
    }

    // Función para inicializar procesos
    function initProcesses() {
        const container = document.getElementById('experimentsContainer');
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        processesData.forEach(process => {
            const card = document.createElement('div');
            card.className = 'card experiment-card';
            card.style.cursor = 'pointer';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${process.color};">
                        <i class="fas ${process.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${process.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${process.color}20; color: ${process.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${process.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Eficiencia: ${process.efficiency}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${process.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles del proceso
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showProcessDetail(process));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        
        // Animar entrada de tarjetas
        setTimeout(() => {
            document.querySelectorAll('.experiment-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'opacity 0.6s, transform 0.6s';
                }, index * 100);
            });
        }, 300);
    }

    // Función para inicializar timeline
    function initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => observer.observe(item));
    }

    // Función para inicializar simulación de proceso
    function initProcessSimulation() {
        const temperatureSlider = document.getElementById('temperatureSlider');
        const temperatureValue = document.getElementById('temperatureValue');
        const pressureButtons = document.querySelectorAll('.pressure-btn');
        const catalystSlider = document.getElementById('catalystSlider');
        const catalystValue = document.getElementById('catalystValue');
        const ratioSlider = document.getElementById('ratioSlider');
        const ratioValue = document.getElementById('ratioValue');
        const runProcessBtn = document.getElementById('runProcessBtn');
        const resetProcessBtn = document.getElementById('resetProcessBtn');
        const showProcessDataBtn = document.getElementById('showProcessDataBtn');
        const canvas = document.getElementById('processCanvas');
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        temperatureSlider.addEventListener('input', function() {
            temperatureValue.textContent = `${this.value}°C`;
        });
        
        catalystSlider.addEventListener('input', function() {
            catalystValue.textContent = `${this.value}%`;
        });
        
        ratioSlider.addEventListener('input', function() {
            ratioValue.textContent = `1:${this.value}`;
        });
        
        // Botones de presión
        pressureButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                pressureButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runProcessBtn.addEventListener('click', function() {
            runProcessSimulation();
        });
        
        // Reiniciar simulación
        resetProcessBtn.addEventListener('click', function() {
            temperatureSlider.value = 450;
            temperatureValue.textContent = '450°C';
            catalystSlider.value = 85;
            catalystValue.textContent = '85%';
            ratioSlider.value = 3;
            ratioValue.textContent = '1:3';
            pressureButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-pressure="200"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('processConclusion').innerHTML = 
                '<div class="result-text">La producción óptima requiere equilibrio entre cinética y equilibrio termodinámico</div>';
        });
        
        // Mostrar datos
        showProcessDataBtn.addEventListener('click', function() {
            showProcessData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runProcessSimulation();
        }, 1000);
    }

    // Función para ejecutar simulación de proceso
    function runProcessSimulation() {
        const canvas = document.getElementById('processCanvas');
        const ctx = canvas.getContext('2d');
        const temperature = parseInt(document.getElementById('temperatureSlider').value);
        const pressure = parseInt(document.querySelector('.pressure-btn.active').dataset.pressure);
        const catalyst = parseInt(document.getElementById('catalystSlider').value) / 100;
        const ratio = parseFloat(document.getElementById('ratioSlider').value);
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (tiempo de residencia)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (conversión a NH₃)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Tiempo de residencia (s)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Conversión a NH₃ (%)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = i * 10;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value.toString(), x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 20;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value.toString(), padding - 20, y + 3);
        }
        
        // Calcular curvas
        const points = 100;
        const kineticCurve = [];
        const equilibriumCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const t = (i * 50) / points;
            
            // Cinética (depende de temperatura y catalizador)
            const v_kinetic = 100 * (1 - Math.exp(-t * 0.1 * (temperature/500) * catalyst));
            
            // Equilibrio (depende de temperatura y presión)
            const Kp = Math.exp(2.5 - (4500/(temperature + 273))); // Constante de equilibrio simplificada
            const v_equilibrium = 100 * (Kp * pressure) / (1 + Kp * pressure);
            
            // Conversión real (mínimo entre cinética y equilibrio)
            const v_actual = Math.min(v_kinetic, v_equilibrium);
            
            kineticCurve.push({t, v: v_kinetic});
            equilibriumCurve.push({t, v: v_equilibrium});
            actualCurve.push({t, v: v_actual});
        }
        
        // Dibujar curva cinética
        ctx.strokeStyle = 'rgba(33, 150, 243, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        kineticCurve.forEach((point, i) => {
            const x = padding + (point.t / 50) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva de equilibrio
        ctx.strokeStyle = 'rgba(255, 193, 7, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        equilibriumCurve.forEach((point, i) => {
            const x = padding + (point.t / 50) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área de conversión real
        ctx.fillStyle = 'rgba(76, 175, 80, 0.2)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.t / 50) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, canvas.height - padding);
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        // Rellenar área bajo la curva
        ctx.lineTo(padding + (50 / 50) * graphWidth, canvas.height - padding);
        ctx.closePath();
        ctx.fill();
        
        // Dibujar curva real
        ctx.strokeStyle = 'rgba(76, 175, 80, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.t / 50) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Cinética
        ctx.fillStyle = 'rgba(33, 150, 243, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite cinético', canvas.width - 155, 32);
        
        // Equilibrio
        ctx.fillStyle = 'rgba(255, 193, 7, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite termodinámico', canvas.width - 155, 57);
        
        // Conversión real
        ctx.fillStyle = 'rgba(76, 175, 80, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Conversión real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('processConclusion');
        const maxConversion = Math.max(...actualCurve.map(p => p.v));
        
        if (maxConversion < 10) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Condiciones muy pobres. Se necesitan mayor temperatura, presión o mejor catalizador.
                </div>
            `;
        } else if (maxConversion < 30) {
            conclusion.innerHTML = `
                <div class="result-text">
                    <i class="fas fa-info-circle" style="color: var(--accent-light); margin-right: 0.5rem;"></i>
                    Conversión moderada. Optimizando presión/temperatura se podría mejorar significativamente.
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    ¡Condiciones óptimas! Conversión del ${maxConversion.toFixed(1)}% alcanzada. Equilibrio entre cinética y termodinámica.
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showProcessData() {
        const temperature = parseInt(document.getElementById('temperatureSlider').value);
        const pressure = parseInt(document.querySelector('.pressure-btn.active').dataset.pressure);
        const catalyst = parseInt(document.getElementById('catalystSlider').value) / 100;
        const ratio = parseFloat(document.getElementById('ratioSlider').value);
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de la Simulación del Proceso
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 40, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Temperatura</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${temperature}°C</div>
                            </div>
                            <div style="background: rgba(30, 40, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Presión</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${pressure} atm</div>
                            </div>
                            <div style="background: rgba(30, 40, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Actividad catalítica</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(catalyst*100).toFixed(0)}%</div>
                            </div>
                            <div style="background: rgba(30, 40, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Relación N₂:H₂</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">1:${ratio}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos termodinámicos y cinéticos</span><br>
                            <span class="code-keyword">Constante de equilibrio (Kp):</span> ${Math.exp(2.5 - (4500/(temperature + 273))).toExponential(2)}<br>
                            <span class="code-keyword">Energía de activación:</span> ${(120 * (1 - catalyst*0.5)).toFixed(1)} kJ/mol<br>
                            <span class="code-keyword">Conversión máxima teórica:</span> ${(100 * (Math.exp(2.5 - (4500/(temperature + 273))) * pressure) / (1 + Math.exp(2.5 - (4500/(temperature + 273))) * pressure)).toFixed(1)}%<br>
                            <span class="code-keyword">Tiempo medio de residencia óptimo:</span> ${(20/(temperature/500 * catalyst)).toFixed(1)} s<br>
                            <span class="code-keyword">Rendimiento NH₃:</span> ${(catalyst * pressure * 0.1).toFixed(2)} kg/m³·h
                        </div>
                        
                        <div style="margin-top: 1.5rem;">
                            <h4 style="margin-bottom: 0.8rem; color: var(--accent-light);">
                                <i class="fas fa-calculator"></i> Cálculos de Conversión
                            </h4>
                            <div style="background: rgba(30, 40, 30, 0.3); padding: 1rem; border-radius: 8px;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Tiempo (s)</div>
                                        <div style="font-weight: bold;">5</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Conv. cinética</div>
                                        <div style="font-weight: bold; color: rgba(33, 150, 243, 0.9);">${(100 * (1 - Math.exp(-5 * 0.1 * (temperature/500) * catalyst))).toFixed(1)}%</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Conv. real</div>
                                        <div style="font-weight: bold; color: rgba(76, 175, 80, 0.9);">${Math.min(100 * (1 - Math.exp(-5 * 0.1 * (temperature/500) * catalyst)), 100 * (Math.exp(2.5 - (4500/(temperature + 273))) * pressure) / (1 + Math.exp(2.5 - (4500/(temperature + 273))) * pressure)).toFixed(1)}%</div>
                                    </div>
                                    
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Tiempo (s)</div>
                                        <div style="font-weight: bold;">20</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Conv. cinética</div>
                                        <div style="font-weight: bold; color: rgba(33, 150, 243, 0.9);">${(100 * (1 - Math.exp(-20 * 0.1 * (temperature/500) * catalyst))).toFixed(1)}%</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Conv. real</div>
                                        <div style="font-weight: bold; color: rgba(76, 175, 80, 0.9);">${Math.min(100 * (1 - Math.exp(-20 * 0.1 * (temperature/500) * catalyst)), 100 * (Math.exp(2.5 - (4500/(temperature + 273))) * pressure) / (1 + Math.exp(2.5 - (4500/(temperature + 273))) * pressure)).toFixed(1)}%</div>
                                    </div>
                                    
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Tiempo (s)</div>
                                        <div style="font-weight: bold;">50</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Conv. cinética</div>
                                        <div style="font-weight: bold; color: rgba(33, 150, 243, 0.9);">${(100 * (1 - Math.exp(-50 * 0.1 * (temperature/500) * catalyst))).toFixed(1)}%</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Conv. real</div>
                                        <div style="font-weight: bold; color: rgba(76, 175, 80, 0.9);">${Math.min(100 * (1 - Math.exp(-50 * 0.1 * (temperature/500) * catalyst)), 100 * (Math.exp(2.5 - (4500/(temperature + 273))) * pressure) / (1 + Math.exp(2.5 - (4500/(temperature + 273))) * pressure)).toFixed(1)}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="exportDataBtn" style="min-width: 200px;">
                            <i class="fas fa-download"></i> Exportar Datos CSV
                        </button>
                        <button class="btn btn-secondary" id="compareProcessesBtnModal" style="min-width: 200px;">
                            <i class="fas fa-project-diagram"></i> Comparar con Datos Reales
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
            alert('Datos de simulación exportados como CSV (simulación)');
            modal.remove();
        });
        
        document.getElementById('compareProcessesBtnModal').addEventListener('click', () => {
            alert('Comparando con datos de plantas reales: BASF, Yara, CF Industries (simulación)');
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        // Botón de simulación industrial
        const simulateIndustrialBtn = document.getElementById('simulateIndustrialBtn');
        simulateIndustrialBtn.addEventListener('click', simulateIndustrialEvolution);
        
        // Botón de catalizadores
        const viewCatalystsBtn = document.getElementById('viewCatalystsBtn');
        viewCatalystsBtn.addEventListener('click', () => {
            document.getElementById('catalystsModal').classList.add('active');
        });
        
        // Botón de comparación
        const compareProcessesBtn = document.getElementById('compareProcessesBtn');
        compareProcessesBtn.addEventListener('click', () => {
            document.getElementById('compareModal').classList.add('active');
        });
        
        // Cerrar modales
        document.getElementById('closeCatalystModal')?.addEventListener('click', () => {
            document.getElementById('catalystsModal').classList.remove('active');
        });
        
        document.getElementById('closeCompareModal')?.addEventListener('click', () => {
            document.getElementById('compareModal').classList.remove('active');
        });
        
        // Cerrar modales al hacer clic fuera
        document.getElementById('catalystsModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'catalystsModal') {
                document.getElementById('catalystsModal').classList.remove('active');
            }
        });
        
        document.getElementById('compareModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'compareModal') {
                document.getElementById('compareModal').classList.remove('active');
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.getElementById('catalystsModal')?.classList.remove('active');
                document.getElementById('compareModal')?.classList.remove('active');
            }
        });
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
            if (!el.classList.contains('experiment-card')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                observer.observe(el);
            }
        });
    }

    // Función para simulación de evolución industrial
    function simulateIndustrialEvolution() {
        const btn = document.getElementById('simulateIndustrialBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando planta industrial...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "Preparación de gas: Reformado de CH₄ con vapor...",
            "Purificación: Eliminación de CO, CO₂, S...",
            "Compresión: 1 → 200 atm (4 etapas)...",
            "Calentamiento: 25°C → 450°C...",
            "Reacción: N₂ + 3H₂ → 2NH₃ en reactor catalítico...",
            "Enfriamiento: Separación de NH₃ líquido...",
            "Recirculación: Gases no convertidos...",
            "Producto final: NH₃ 99.9% para fertilizantes"
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${steps[step]}`;
                step++;
            }
        }, 700);
        
        // Simular proceso completo
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showIndustrialEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
            
            // Efecto visual químico
            document.querySelectorAll('.card').forEach(card => {
                card.style.borderColor = 'var(--accent-tertiary)';
                card.style.boxShadow = '0 0 40px rgba(0, 121, 107, 0.4)';
                
                setTimeout(() => {
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 3000);
            });
        }, 5600);
    }

    // Función para mostrar resultados de evolución industrial
    function showIndustrialEvolutionResults() {
        const results = [
            { type: 'Producción anual', value: '150M t', color: '#2e7d32', icon: 'fa-industry' },
            { type: 'Eficiencia energética', value: '65%', color: '#ff8f00', icon: 'fa-bolt' },
            { type: 'Consumo mundial', value: '1-2%', color: '#00796b', icon: 'fa-globe' },
            { type: 'Población sustentada', value: '4.3B', color: '#4caf50', icon: 'fa-users' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeIndustrialModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-industry"></i> Planta Industrial de Haber-Bosch
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación de una planta moderna de producción de amoníaco (capacidad: 1,000 t/día):</p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.95rem;">
                        <i class="fas fa-calculator"></i> Simulación termodinámica | 5 unidades de proceso | Consumo: 28 GJ/t NH₃
                    </p>
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
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 1.5rem 0;">
                    <div>
                        <h4 style="color: var(--accent); margin-bottom: 1rem;">Unidades de Proceso</h4>
                        <ul class="theory-list">
                            <li>Reformado primario: CH₄ + H₂O → CO + 3H₂</li>
                            <li>Cambio agua-gas: CO + H₂O → CO₂ + H₂</li>
                            <li>Metanación: Eliminación final de CO</li>
                            <li>Compresión: 4 etapas hasta 200 atm</li>
                            <li>Síntesis: Reactor catalítico a 450°C</li>
                            <li>Separación: Enfriamiento y licuefacción</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--accent-secondary); margin-bottom: 1rem;">Optimizaciones Modernas</h4>
                        <ul class="theory-list theory-list-secondary">
                            <li>Recuperación de calor: 85% eficiencia</li>
                            <li>Catalizadores mejorados: Mayor vida útil</li>
                            <li>Control avanzado: Automatización total</li>
                            <li>Captura de CO₂: Reducción emisiones</li>
                            <li>Integración energética: Cogeneración</li>
                            <li>H₂ verde: Electrólisis renovable</li>
                        </ul>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Eficiencia energética vs. límite teórico</span>
                        <span>78%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 78%;"></div>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                    <button class="btn" id="viewPlant3DBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-cube"></i> Ver Planta 3D
                    </button>
                    <button class="btn btn-secondary" id="downloadPlantDataBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-database"></i> Descargar Especificaciones
                    </button>
                    <button class="btn btn-error" id="optimizePlantBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-cogs"></i> Optimizar Planta
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal industrial
        document.getElementById('closeIndustrialModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewPlant3DBtn').addEventListener('click', () => {
            alert('Mostrando modelo 3D de planta de amoníaco (simulación)');
            modal.remove();
        });
        
        document.getElementById('downloadPlantDataBtn').addEventListener('click', () => {
            alert('Descargando especificaciones técnicas de planta (simulación)');
            modal.remove();
        });
        
        document.getElementById('optimizePlantBtn').addEventListener('click', () => {
            alert('Ejecutando optimización termoeconómica de planta (simulación)');
            modal.remove();
        });
    }

    // Función para mostrar detalle de proceso
    function showProcessDetail(process) {
        const details = {
            'Proceso Haber-Bosch Tradicional': {
                location: 'Global (China, Rusia, India, EE.UU., Europa)',
                capacity: '150 millones de toneladas/año',
                energy: '28-35 GJ por tonelada de NH₃',
                timeline: '1913-presente',
                results: 'Sustenta 50% de producción alimentaria mundial',
                technology: 'Reformado de gas natural + síntesis catalítica'
            },
            'Electrosíntesis de Amoníaco': {
                location: 'Laboratorios de investigación global',
                capacity: 'Escala de gramos a kilogramos',
                energy: 'Electricidad renovable (solar, eólica)',
                timeline: '2000-presente (investigación activa)',
                results: 'Conversiones hasta 60% en laboratorio',
                technology: 'Celdas electroquímicas, catalizadores avanzados'
            },
            'Fotocatálisis Solar': {
                location: 'Investigación en universidades',
                capacity: 'Escala miligramos',
                energy: 'Luz solar directa',
                timeline: '2010-presente',
                results: 'Bajas eficiencias (<5%), investigación fundamental',
                technology: 'Semiconductores, co-catalizadores, diseño reactor'
            },
            'Procesos Biológicos': {
                location: 'Investigación en biotecnología',
                capacity: 'Microorganismos en bioreactores',
                energy: 'ATP celular (alta demanda energética)',
                timeline: '1980-presente',
                results: 'Nitrogenasas naturales: 16 ATP por N₂ fijado',
                technology: 'Ingeniería metabólica, enzimas artificiales'
            },
            'Plasma No Térmico': {
                location: 'Laboratorios especializados',
                capacity: 'Escala experimental',
                energy: 'Electricidad para generar plasma',
                timeline: '1990-presente',
                results: 'Activación de N₂ sin alta temperatura',
                technology: 'Descargas de barrera dieléctrica, microplasmas'
            },
            'Procesos Híbridos': {
                location: 'Conceptos en desarrollo',
                capacity: 'Diseños teóricos y prototipos',
                energy: 'Combinación de fuentes',
                timeline: '2015-presente',
                results: 'Potencial para alta eficiencia',
                technology: 'Integración de métodos térmicos/electroquímicos'
            }
        };
        
        const processDetails = details[process.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeProcessModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${process.color}; margin-right: 1rem;">
                        <i class="fas ${process.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${process.color};">${process.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${process.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${process.color};">
                            <i class="fas fa-info-circle"></i> Detalles del Proceso:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${processDetails.location ? `
                                <div style="background: rgba(30, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Ubicación/Escala</div>
                                    <div style="font-weight: 600;">${processDetails.location}</div>
                                </div>
                            ` : ''}
                            
                            ${processDetails.capacity ? `
                                <div style="background: rgba(30, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Capacidad</div>
                                    <div style="font-weight: 600;">${processDetails.capacity}</div>
                                </div>
                            ` : ''}
                            
                            ${processDetails.energy ? `
                                <div style="background: rgba(30, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Requerimiento energético</div>
                                    <div style="font-weight: 600;">${processDetails.energy}</div>
                                </div>
                            ` : ''}
                            
                            ${processDetails.timeline ? `
                                <div style="background: rgba(30, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período de desarrollo</div>
                                    <div style="font-weight: 600;">${processDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${processDetails.results ? `
                                <div style="background: rgba(30, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Resultados principales</div>
                                    <div style="font-weight: 600;">${processDetails.results}</div>
                                </div>
                            ` : ''}
                            
                            ${processDetails.technology ? `
                                <div style="background: rgba(30, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Tecnología clave</div>
                                    <div style="font-weight: 600;">${processDetails.technology}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${process.title} - Parámetros técnicos</span><br>
                        <span class="code-keyword">Estado de desarrollo:</span> ${process.status}<br>
                        <span class="code-keyword">Eficiencia energética:</span> ${process.efficiency}<br>
                        <span class="code-keyword">Ventajas principales:</span> ${process.title.includes('Tradicional') ? 'Tecnología madura, alta capacidad, bajo costo relativo' :
                            process.title.includes('Electrosíntesis') ? 'Temperatura ambiente, acoplable a renovables' :
                            process.title.includes('Fotocatálisis') ? 'Uso directo de energía solar, potencial bajo costo' :
                            process.title.includes('Biológicos') ? 'Selectividad alta, condiciones suaves' :
                            process.title.includes('Plasma') ? 'Activación sin alta temperatura, modular' : 'Potencial alta eficiencia, versatilidad'}<br>
                        <span class="code-keyword">Desafíos:</span> ${process.title.includes('Tradicional') ? 'Alta huella de carbono, dependencia de gas natural' :
                            process.title.includes('Electrosíntesis') ? 'Baja selectividad, costos de electricidad' :
                            process.title.includes('Fotocatálisis') ? 'Eficiencia muy baja, problemas de escalado' :
                            process.title.includes('Biológicos') ? 'Demanda energética alta (ATP), velocidad lenta' :
                            process.title.includes('Plasma') ? 'Eficiencia energética baja, generación de subproductos' : 'Complejidad de integración, desarrollo temprano'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="viewResultsBtn" style="background: ${process.color}; min-width: 200px;">
                            <i class="fas fa-chart-bar"></i> Ver Datos Técnicos
                        </button>
                        <button class="btn btn-secondary" id="simulateProcessBtn" style="min-width: 200px;">
                            <i class="fas fa-flask"></i> Simular este Proceso
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeProcessModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewResultsBtn').addEventListener('click', () => {
            alert(`Mostrando datos técnicos de ${process.title}`);
            modal.remove();
        });
        
        document.getElementById('simulateProcessBtn').addEventListener('click', () => {
            alert(`Simulando proceso ${process.title}`);
            modal.remove();
        });
    }
});