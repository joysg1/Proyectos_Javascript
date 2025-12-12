document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const experimentsData = [
        {
            icon: 'fa-vial',
            title: 'Termómetro de Mercurio',
            description: 'Inventado por Fahrenheit en 1714. Precisión ±0.1°C, rango -39°C a 357°C. Prohibido en muchos países por toxicidad.',
            color: '#00b4d8',
            status: 'En desuso (prohibido)',
            sensitivity: '±0.1°C'
        },
        {
            icon: 'fa-microchip',
            title: 'Termómetro Digital',
            description: 'Basado en termistores NTC/PTC o circuitos integrados. Lectura rápida (10-60s), memoria, alarma sonora.',
            color: '#4ade80',
            status: 'Uso común',
            sensitivity: '±0.1°C a ±0.01°C'
        },
        {
            icon: 'fa-satellite',
            title: 'Termómetro Infrarrojo',
            description: 'Mide radiación térmica sin contacto. Ideal para screening médico, industria y medición de superficies.',
            color: '#ff9e00',
            status: 'Uso común',
            sensitivity: '±0.2°C a ±2°C'
        },
        {
            icon: 'fa-bolt',
            title: 'Termopar (Tipo K)',
            description: 'Dos metales diferentes generan voltaje proporcional a ΔT. Amplio rango (-200°C a +1350°C).',
            color: '#ff6b6b',
            status: 'Industrial/Laboratorio',
            sensitivity: '±1.5°C a ±2.5°C'
        },
        {
            icon: 'fa-wave-square',
            title: 'RTD (Pt100)',
            description: 'Sensor de platino que cambia resistencia con temperatura. Alta precisión y estabilidad.',
            color: '#9d4edd',
            status: 'Laboratorio/Precisión',
            sensitivity: '±0.1°C a ±0.001°C'
        },
        {
            icon: 'fa-temperature-high',
            title: 'Termómetro Clínico',
            description: 'Digital o galinstano para medición corporal. Estrechamiento del capilar para mantener lectura.',
            color: '#38bdf8',
            status: 'Uso médico común',
            sensitivity: '±0.1°C (axilar/rectal)'
        }
    ];

    // Inicializar componentes
    initThermalParticles();
    initExperiments();
    initEventListeners();
    initAnimations();
    initTimeline();
    initThermometerSimulation();

    // Función para inicializar partículas térmicas
    function initThermalParticles() {
        const canvas = document.getElementById('particles-canvas');
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
                    // Partículas frías (azules)
                    color = `rgba(0, 180, 216, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Partículas cálidas (naranjas)
                    color = `rgba(255, 158, 0, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Partículas calientes (rojas)
                    color = `rgba(255, 107, 107, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 1;
                    speed = (Math.random() - 0.5) * 0.8;
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
                    type: type < 0.6 ? 'cold' : type < 0.85 ? 'warm' : 'hot'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo térmico sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 18, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Movimiento
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de centelleo térmico
                const twinkle = Math.sin(Date.now() * particle.twinkleSpeed + particle.twinkleOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * twinkle;
                
                // Dibujar partícula
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Efecto de brillo para partículas cálidas/calientes
                if (particle.type !== 'cold') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'warm') {
                        gradient.addColorStop(0, `rgba(255, 158, 0, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 158, 0, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(255, 107, 107, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
                    }
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                
                // Destello ocasional para partículas calientes
                if (particle.type === 'hot' && Math.random() < 0.01) {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 107, 107, 0.2)`;
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

    // Función para inicializar experimentos
    function initExperiments() {
        const container = document.getElementById('experimentsContainer');
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        experimentsData.forEach(experiment => {
            const card = document.createElement('div');
            card.className = 'card experiment-card';
            card.style.cursor = 'pointer';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${experiment.color};">
                        <i class="fas ${experiment.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${experiment.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${experiment.color}20; color: ${experiment.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${experiment.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Precisión: ${experiment.sensitivity}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${experiment.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles del termómetro
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showExperimentDetail(experiment));
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

    // Función para inicializar simulación de termómetro
    function initThermometerSimulation() {
        const tempSlider = document.getElementById('tempSlider');
        const tempValue = document.getElementById('tempValue');
        const precisionSlider = document.getElementById('precisionSlider');
        const precisionValue = document.getElementById('precisionValue');
        const responseSlider = document.getElementById('responseSlider');
        const responseValue = document.getElementById('responseValue');
        const thermTypeButtons = document.querySelectorAll('.therm-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('thermometerCanvas');
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        tempSlider.addEventListener('input', function() {
            tempValue.textContent = `${this.value}°C`;
        });
        
        precisionSlider.addEventListener('input', function() {
            const precision = this.value / 10;
            precisionValue.textContent = `±${precision.toFixed(1)}°C`;
        });
        
        responseSlider.addEventListener('input', function() {
            responseValue.textContent = `${this.value}s`;
        });
        
        // Botones de tipo de termómetro
        thermTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                thermTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runThermometerSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            tempSlider.value = 37;
            tempValue.textContent = '37°C';
            precisionSlider.value = 10;
            precisionValue.textContent = '±0.1°C';
            responseSlider.value = 30;
            responseValue.textContent = '30s';
            thermTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="mercury"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">El termómetro de mercurio muestra la temperatura mediante dilatación del líquido en un capilar de vidrio</div>';
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runThermometerSimulation();
        }, 1000);
    }

    // Función para ejecutar simulación de termómetro
    function runThermometerSimulation() {
        const canvas = document.getElementById('thermometerCanvas');
        const ctx = canvas.getContext('2d');
        const temperature = parseInt(document.getElementById('tempSlider').value);
        const precision = parseFloat(document.getElementById('precisionSlider').value) / 10;
        const responseTime = parseInt(document.getElementById('responseSlider').value);
        const thermType = document.querySelector('.therm-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 40;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar fondo del termómetro según tipo
        ctx.fillStyle = 'rgba(30, 30, 60, 0.5)';
        ctx.fillRect(padding, padding, graphWidth, graphHeight);
        
        // Dibujar termómetro según tipo
        if (thermType === 'mercury') {
            drawMercuryThermometer(ctx, padding, graphWidth, graphHeight, temperature);
        } else if (thermType === 'digital') {
            drawDigitalThermometer(ctx, padding, graphWidth, graphHeight, temperature, precision);
        } else if (thermType === 'infrared') {
            drawInfraredThermometer(ctx, padding, graphWidth, graphHeight, temperature);
        } else if (thermType === 'thermocouple') {
            drawThermocouple(ctx, padding, graphWidth, graphHeight, temperature);
        }
        
        // Dibujar información
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        
        const typeNames = {
            'mercury': 'Termómetro de Mercurio',
            'digital': 'Termómetro Digital',
            'infrared': 'Termómetro Infrarrojo',
            'thermocouple': 'Termopar (Tipo K)'
        };
        
        ctx.fillText(typeNames[thermType], canvas.width / 2, 30);
        
        ctx.font = '14px Inter';
        ctx.fillText(`Temperatura: ${temperature}°C`, canvas.width / 2, canvas.height - 10);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        let conclusionText = '';
        let color = 'var(--text-primary)';
        
        if (thermType === 'mercury') {
            conclusionText = 'El mercurio se expande linealmente con la temperatura. Prohibido en muchos países por toxicidad (Directiva RoHS).';
            color = 'var(--accent)';
        } else if (thermType === 'digital') {
            conclusionText = 'Los termistores NTC/PTC cambian resistencia con la temperatura. Lectura rápida, memoria, alarma sonora.';
            color = 'var(--accent-tertiary)';
        } else if (thermType === 'infrared') {
            conclusionText = 'Mide radiación infrarroja emitida por objetos. Sin contacto, respuesta instantánea, afectado por emisividad.';
            color = 'var(--accent-secondary)';
        } else if (thermType === 'thermocouple') {
            conclusionText = 'Efecto Seebeck: dos metales diferentes generan voltaje proporcional a ΔT. Amplio rango de temperatura.';
            color = 'var(--danger)';
        }
        
        conclusion.innerHTML = `
            <div class="result-text" style="color: ${color};">
                ${conclusionText}
            </div>
        `;
    }

    // Función para dibujar termómetro de mercurio
    function drawMercuryThermometer(ctx, x, width, height, temp) {
        const bulbRadius = 30;
        const bulbX = x + width / 2;
        const bulbY = x + height - bulbRadius - 10;
        const stemWidth = 20;
        const stemHeight = height - 100;
        const stemX = bulbX - stemWidth / 2;
        const stemY = x + 50;
        
        // Dibujar bulbo
        ctx.fillStyle = '#333344';
        ctx.beginPath();
        ctx.arc(bulbX, bulbY, bulbRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Dibujar vástago
        ctx.fillStyle = '#444466';
        ctx.fillRect(stemX, stemY, stemWidth, stemHeight);
        
        // Calcular nivel de mercurio (0°C a 100°C -> 0% a 100% de stemHeight)
        const minTemp = 0;
        const maxTemp = 100;
        const tempRange = maxTemp - minTemp;
        const tempPercent = Math.max(0, Math.min(1, (temp - minTemp) / tempRange));
        const mercuryHeight = stemHeight * tempPercent;
        const mercuryY = stemY + stemHeight - mercuryHeight;
        
        // Dibujar mercurio
        ctx.fillStyle = '#00b4d8';
        ctx.fillRect(stemX + 2, mercuryY, stemWidth - 4, mercuryHeight);
        
        // Dibujar mercurio en bulbo
        ctx.beginPath();
        ctx.arc(bulbX, bulbY, bulbRadius - 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Dibujar escala
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'right';
        
        for (let i = 0; i <= 10; i++) {
            const scaleTemp = i * 10;
            const scaleY = stemY + stemHeight - (stemHeight * i / 10);
            
            // Línea larga cada 10°, corta cada 2°
            if (i % 1 === 0) {
                ctx.beginPath();
                ctx.moveTo(stemX - 5, scaleY);
                ctx.lineTo(stemX, scaleY);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 1;
                ctx.stroke();
                
                if (i % 2 === 0) {
                    ctx.fillText(`${scaleTemp}°`, stemX - 10, scaleY + 3);
                }
            }
        }
        
        // Temperatura actual
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00b4d8';
        ctx.font = 'bold 16px Inter';
        ctx.fillText(`${temp}°C`, stemX + stemWidth / 2, stemY - 10);
    }

    // Función para dibujar termómetro digital
    function drawDigitalThermometer(ctx, x, width, height, temp, precision) {
        const displayWidth = width * 0.8;
        const displayHeight = height * 0.6;
        const displayX = x + (width - displayWidth) / 2;
        const displayY = x + (height - displayHeight) / 2;
        
        // Dibujar pantalla
        ctx.fillStyle = '#1a3a2a';
        ctx.fillRect(displayX, displayY, displayWidth, displayHeight);
        
        // Efecto de pantalla LCD
        const lcdGradient = ctx.createLinearGradient(displayX, displayY, displayX, displayY + displayHeight);
        lcdGradient.addColorStop(0, 'rgba(100, 255, 150, 0.1)');
        lcdGradient.addColorStop(1, 'rgba(50, 200, 100, 0.05)');
        ctx.fillStyle = lcdGradient;
        ctx.fillRect(displayX, displayY, displayWidth, displayHeight);
        
        // Borde de pantalla
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 3;
        ctx.strokeRect(displayX, displayY, displayWidth, displayHeight);
        
        // Mostrar temperatura
        ctx.fillStyle = '#4ade80';
        ctx.font = `bold ${displayHeight * 0.4}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Número grande
        ctx.fillText(`${temp.toFixed(1)}`, displayX + displayWidth / 2, displayY + displayHeight / 2);
        
        // Unidad
        ctx.font = `bold ${displayHeight * 0.2}px 'JetBrains Mono', monospace`;
        ctx.fillText('°C', displayX + displayWidth / 2 + displayWidth * 0.25, displayY + displayHeight / 2);
        
        // Indicador de batería
        ctx.fillStyle = '#4ade80';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillText('BAT: ▮▮▮▮', displayX + 10, displayY + displayHeight - 10);
        
        // Indicador de precisión
        ctx.textAlign = 'right';
        ctx.fillText(`±${precision.toFixed(1)}°C`, displayX + displayWidth - 10, displayY + displayHeight - 10);
    }

    // Función para dibujar termómetro infrarrojo
    function drawInfraredThermometer(ctx, x, width, height, temp) {
        const gunWidth = width * 0.7;
        const gunHeight = height * 0.6;
        const gunX = x + (width - gunWidth) / 2;
        const gunY = x + (height - gunHeight) / 2;
        
        // Cuerpo del termómetro
        ctx.fillStyle = '#333344';
        ctx.fillRect(gunX, gunY, gunWidth, gunHeight * 0.7);
        
        // Lente
        const lensX = gunX + gunWidth * 0.8;
        const lensY = gunY + gunHeight * 0.35;
        const lensRadius = gunHeight * 0.2;
        
        ctx.fillStyle = '#0096c7';
        ctx.beginPath();
        ctx.arc(lensX, lensY, lensRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Efecto de lente
        const lensGradient = ctx.createRadialGradient(lensX, lensY, 0, lensX, lensY, lensRadius);
        lensGradient.addColorStop(0, 'rgba(0, 180, 216, 0.8)');
        lensGradient.addColorStop(1, 'rgba(0, 150, 199, 0.4)');
        ctx.fillStyle = lensGradient;
        ctx.beginPath();
        ctx.arc(lensX, lensY, lensRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Rayo infrarrojo
        ctx.strokeStyle = 'rgba(255, 158, 0, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(lensX + lensRadius, lensY);
        ctx.lineTo(gunX + gunWidth + 30, lensY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Display pequeño
        const smallDisplayWidth = gunWidth * 0.4;
        const smallDisplayHeight = gunHeight * 0.3;
        const smallDisplayX = gunX + 20;
        const smallDisplayY = gunY + 20;
        
        ctx.fillStyle = '#1a1a2a';
        ctx.fillRect(smallDisplayX, smallDisplayY, smallDisplayWidth, smallDisplayHeight);
        
        ctx.fillStyle = '#ff9e00';
        ctx.font = 'bold 16px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${temp}°C`, smallDisplayX + smallDisplayWidth / 2, smallDisplayY + smallDisplayHeight / 2);
        
        // Texto "IR"
        ctx.fillStyle = 'rgba(255, 158, 0, 0.7)';
        ctx.font = 'bold 14px Inter';
                ctx.fillText('INFRA', smallDisplayX + smallDisplayWidth / 2, smallDisplayY + smallDisplayHeight + 15);
        ctx.fillText('ROJO', smallDisplayX + smallDisplayWidth / 2, smallDisplayY + smallDisplayHeight + 30);
    }

    // Función para dibujar termopar
    function drawThermocouple(ctx, x, width, height, temp) {
        const centerX = x + width / 2;
        const centerY = x + height / 2;
        
        // Dibujar unión de termopar
        const junctionRadius = 25;
        
        // Gradiente para la unión caliente
        const junctionGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, junctionRadius
        );
        
        if (temp < 100) {
            junctionGradient.addColorStop(0, '#ff9e00');
            junctionGradient.addColorStop(1, '#cc7e00');
        } else if (temp < 500) {
            junctionGradient.addColorStop(0, '#ff6b6b');
            junctionGradient.addColorStop(1, '#cc5555');
        } else {
            junctionGradient.addColorStop(0, '#ff0000');
            junctionGradient.addColorStop(1, '#cc0000');
        }
        
        ctx.fillStyle = junctionGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, junctionRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Dibujar cables (dos metales diferentes)
        const cableLength = 80;
        const cableWidth = 8;
        
        // Cable 1 (Constantan - naranja)
        ctx.fillStyle = '#ff9e00';
        ctx.fillRect(centerX - cableWidth/2, centerY - junctionRadius - cableLength, cableWidth, cableLength);
        
        // Cable 2 (Chromel - amarillo)
        ctx.fillStyle = '#f1fa8c';
        ctx.fillRect(centerX + cableWidth/2, centerY - junctionRadius - cableLength, cableWidth, cableLength);
        
        // Efecto de calor
        if (temp > 100) {
            const heatRadius = junctionRadius + 10 + (temp / 50);
            const heatGradient = ctx.createRadialGradient(
                centerX, centerY, junctionRadius,
                centerX, centerY, heatRadius
            );
            
            heatGradient.addColorStop(0, 'rgba(255, 107, 107, 0.5)');
            heatGradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
            
            ctx.fillStyle = heatGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, heatRadius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Mostrar temperatura y tipo
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`Termopar Tipo K`, centerX, centerY + junctionRadius + 40);
        ctx.fillText(`${temp}°C`, centerX, centerY + junctionRadius + 60);
        
        // Información de cables
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#ff9e00';
        ctx.fillText('Constantan', centerX - 100, centerY - junctionRadius - cableLength - 10);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#f1fa8c';
        ctx.fillText('Chromel', centerX + 100, centerY - junctionRadius - cableLength - 10);
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const temperature = parseInt(document.getElementById('tempSlider').value);
        const precision = parseFloat(document.getElementById('precisionSlider').value) / 10;
        const responseTime = parseInt(document.getElementById('responseSlider').value);
        const thermType = document.querySelector('.therm-type-btn.active').dataset.type;
        
        const typeDetails = {
            'mercury': {
                name: 'Termómetro de Mercurio',
                range: '-39°C a 357°C',
                principle: 'Dilatación térmica lineal del mercurio',
                accuracy: '±0.1°C',
                response: '3-5 minutos',
                invented: '1714 (Daniel Fahrenheit)',
                status: 'Prohibido en muchos países (toxicidad)'
            },
            'digital': {
                name: 'Termómetro Digital',
                range: '-50°C a 300°C',
                principle: 'Termistor NTC/PTC (resistencia variable)',
                accuracy: '±0.1°C a ±0.01°C',
                response: '10-60 segundos',
                invented: '1970s',
                status: 'Uso común (médico, doméstico)'
            },
            'infrared': {
                name: 'Termómetro Infrarrojo',
                range: '-50°C a 1000°C (depende del modelo)',
                principle: 'Ley de Planck (radiación térmica)',
                accuracy: '±0.2°C a ±2°C',
                response: '1-3 segundos',
                invented: '1960s',
                status: 'Uso común (screening, industria)'
            },
            'thermocouple': {
                name: 'Termopar Tipo K',
                range: '-200°C a +1350°C',
                principle: 'Efecto Seebeck (termoelectricidad)',
                accuracy: '±1.5°C a ±2.5°C',
                response: '0.1-10 segundos',
                invented: '1821 (Thomas Seebeck)',
                status: 'Uso industrial y científico'
            }
        };
        
        const details = typeDetails[thermType] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos Técnicos del Termómetro
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${details.name || thermType}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Temperatura Simulada</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${temperature}°C</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Rango de Medición</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${details.range || 'N/A'}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Precisión</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${details.accuracy || 'N/A'}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tiempo de Respuesta</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${details.response || 'N/A'}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Inventado</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${details.invented || 'N/A'}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Principio de funcionamiento</span><br>
                            <span class="code-keyword">Principio físico:</span> ${details.principle || 'N/A'}<br>
                            <span class="code-keyword">Precisión típica:</span> ${details.accuracy || 'N/A'}<br>
                            <span class="code-keyword">Tiempo respuesta:</span> ${details.response || 'N/A'}<br>
                            <span class="code-keyword">Estado actual:</span> ${details.status || 'N/A'}<br>
                            <span class="code-keyword">Aplicaciones:</span> ${thermType === 'mercury' ? 'Laboratorio, referencia' : 
                                thermType === 'digital' ? 'Médica, doméstica, industrial' :
                                thermType === 'infrared' ? 'Screening médico, industria, cocina' :
                                'Industrial, hornos, laboratorio'}
                        </div>
                        
                        <div style="margin-top: 1.5rem;">
                            <h4 style="margin-bottom: 0.8rem; color: var(--accent-light);">
                                <i class="fas fa-calculator"></i> Conversión de Escalas
                            </h4>
                            <div style="background: rgba(30, 30, 60, 0.3); padding: 1rem; border-radius: 8px;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Celsius</div>
                                        <div style="font-weight: bold;">${temperature}°C</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Fahrenheit</div>
                                        <div style="font-weight: bold; color: rgba(255, 107, 107, 0.9);">${(temperature * 9/5 + 32).toFixed(1)}°F</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Kelvin</div>
                                        <div style="font-weight: bold; color: rgba(74, 222, 128, 0.9);">${(temperature + 273.15).toFixed(2)} K</div>
                                    </div>
                                    
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Punto de ebullición agua</div>
                                        <div style="font-weight: bold;">100°C / 212°F</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Punto de congelación agua</div>
                                        <div style="font-weight: bold;">0°C / 32°F</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Cero absoluto</div>
                                        <div style="font-weight: bold;">-273.15°C / 0 K</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="exportDataBtn" style="min-width: 200px;">
                            <i class="fas fa-download"></i> Exportar Datos Técnicos
                        </button>
                        <button class="btn btn-secondary" id="compareTypesBtn" style="min-width: 200px;">
                            <i class="fas fa-project-diagram"></i> Comparar con Otros Tipos
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
            alert('Datos técnicos exportados como CSV (simulación)');
            modal.remove();
        });
        
        document.getElementById('compareTypesBtn').addEventListener('click', () => {
            document.getElementById('compareModal').classList.add('active');
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        simulateEvolutionBtn.addEventListener('click', simulateHistoricalEvolution);
        
        // Botón de tipos
        const viewTypesBtn = document.getElementById('viewTypesBtn');
        viewTypesBtn.addEventListener('click', () => {
            document.getElementById('typesModal').classList.add('active');
        });
        
        // Botón de comparación
        const compareTechBtn = document.getElementById('compareTechBtn');
        compareTechBtn.addEventListener('click', () => {
            document.getElementById('compareModal').classList.add('active');
        });
        
        // Cerrar modales
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('typesModal').classList.remove('active');
        });
        
        document.getElementById('closeCompareModal').addEventListener('click', () => {
            document.getElementById('compareModal').classList.remove('active');
        });
        
        // Cerrar modales al hacer clic fuera
        document.getElementById('typesModal').addEventListener('click', (e) => {
            if (e.target.id === 'typesModal') {
                document.getElementById('typesModal').classList.remove('active');
            }
        });
        
        document.getElementById('compareModal').addEventListener('click', (e) => {
            if (e.target.id === 'compareModal') {
                document.getElementById('compareModal').classList.remove('active');
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.getElementById('typesModal').classList.remove('active');
                document.getElementById('compareModal').classList.remove('active');
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

    // Función para simulación de evolución histórica
    function simulateHistoricalEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución histórica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1592: Galileo inventa el termoscopio...",
            "1654: Ferdinand II crea termómetro de alcohol sellado...",
            "1714: Fahrenheit desarrolla termómetro de mercurio...",
            "1742: Celsius propone escala centígrada...",
            "1821: Seebeck descubre efecto termoeléctrico...",
            "1867: Allbutt inventa termómetro clínico práctico...",
            "1970: Aparecen primeros termómetros digitales...",
            "2020: Termómetros infrarrojos para screening masivo..."
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
            showHistoricalEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
            
            // Efecto visual térmico
            document.querySelectorAll('.card').forEach(card => {
                card.style.borderColor = 'var(--accent-tertiary)';
                card.style.boxShadow = '0 0 40px rgba(74, 222, 128, 0.4)';
                
                setTimeout(() => {
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 3000);
            });
        }, 5600);
    }

    // Función para mostrar resultados de evolución histórica
    function showHistoricalEvolutionResults() {
        const results = [
            { type: 'Tiempo total', value: '430 años', color: '#00b4d8', icon: 'fa-clock' },
            { type: 'Precisión mejorada', value: '±5°C → ±0.001°C', color: '#4ade80', icon: 'fa-ruler' },
            { type: 'Tiempo de lectura', value: '300s → 1s', color: '#ff9e00', icon: 'fa-stopwatch' },
            { type: 'Rango de temperatura', value: '-39°C → +3000°C', color: '#ff6b6b', icon: 'fa-thermometer-full' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeHistoryModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-history"></i> Evolución Histórica de los Termómetros
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Línea de tiempo de la innovación en medición de temperatura desde el Renacimiento hasta la era digital:</p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.95rem;">
                        <i class="fas fa-calculator"></i> Revoluciones científicas | Avances tecnológicos | Impacto en medicina e industria
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
                        <h4 style="color: var(--accent); margin-bottom: 1rem;">Antes del siglo XX</h4>
                        <ul class="theory-list">
                            <li>Termoscopio de Galileo (1592): Sin escala, solo cambios relativos</li>
                            <li>Termómetro de alcohol (1654): Primera escala rudimentaria</li>
                            <li>Termómetro de mercurio (1714): Mayor precisión, escala Fahrenheit</li>
                            <li>Escala Celsius (1742): Puntos fijos científicos</li>
                            <li>Termómetro clínico (1867): Reducción de tamaño, mantenimiento de lectura</li>
                            <li>Descubrimiento termoelectricidad (1821): Base para termopares</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--accent-secondary); margin-bottom: 1rem;">Siglo XX y XXI</h4>
                        <ul class="theory-list theory-list-secondary">
                            <li>Termopares industriales (1900s): Mediciones de alta temperatura</li>
                            <li>Termistores (1930s): Sensores electrónicos de temperatura</li>
                            <li>Termómetros digitales (1970s): Microprocesadores, lecturas rápidas</li>
                            <li>Termómetros infrarrojos (1960s-2000s): Sin contacto, screening médico</li>
                            <li>Prohibición mercurio (2000s): Transición a alternativas seguras</li>
                            <li>IoT y wearables (2010s): Monitoreo continuo de temperatura</li>
                        </ul>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Mejora en precisión desde Galileo (1592) hasta hoy</span>
                        <span>5000x</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 100%;"></div>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                    <button class="btn" id="viewTimelineBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-timeline"></i> Ver Línea de Tiempo Completa
                    </button>
                    <button class="btn btn-secondary" id="downloadHistoryBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-database"></i> Descargar Datos Históricos
                    </button>
                    <button class="btn btn-error" id="runEvolutionSimBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-rocket"></i> Simulación 3D de Evolución
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal histórico
        document.getElementById('closeHistoryModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewTimelineBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo interactiva completa (1592-2024)');
            modal.remove();
        });
        
        document.getElementById('downloadHistoryBtn').addEventListener('click', () => {
            alert('Descargando base de datos histórica de termómetros (simulación)');
            modal.remove();
        });
        
        document.getElementById('runEvolutionSimBtn').addEventListener('click', () => {
            alert('Ejecutando simulación 3D de evolución tecnológica de termómetros (simulación)');
            modal.remove();
        });
    }

    // Función para mostrar detalle de experimento/termómetro
    function showExperimentDetail(experiment) {
        const details = {
            'Termómetro de Mercurio': {
                inventor: 'Daniel Fahrenheit (1714)',
                principio: 'Dilatación térmica lineal del mercurio en capilar de vidrio',
                rango: '-39°C a 357°C (punto de fusión a ebullición del Hg)',
                precision: '±0.1°C en condiciones ideales',
                ventajas: 'Alta precisión, sin calibración frecuente, sin baterías',
                desventajas: 'Tóxico (mercurio), frágil (vidrio), lectura lenta, prohibido en muchos países'
            },
            'Termómetro Digital': {
                inventor: 'Varios (años 1970)',
                principio: 'Termistor NTC/PTC cuya resistencia varía con temperatura',
                rango: '-50°C a 300°C (depende del modelo)',
                precision: '±0.1°C a ±0.01°C para modelos de alta precisión',
                ventajas: 'Lectura rápida (10-60s), memoria, alarma, seguro',
                desventajas: 'Requiere baterías, puede tener deriva de calibración'
            },
            'Termómetro Infrarrojo': {
                inventor: 'Desarrollo progresivo (1960s-presente)',
                principio: 'Ley de Planck - mide radiación infrarroja emitida',
                rango: '-50°C a 1000°C (depende del modelo)',
                precision: '±0.2°C a ±2°C (depende de emisividad y distancia)',
                ventajas: 'Sin contacto, instantáneo (1-3s), ideal para screening',
                desventajas: 'Precisión afectada por emisividad, costo mayor'
            },
            'Termopar (Tipo K)': {
                inventor: 'Thomas Seebeck (1821)',
                principio: 'Efecto Seebeck - dos metales diferentes generan voltaje proporcional a ΔT',
                rango: '-200°C a +1350°C',
                precision: '±1.5°C a ±2.5°C (menor precisión que RTD)',
                ventajas: 'Amplio rango, robusto, bajo costo, respuesta rápida',
                desventajas: 'Menor precisión, requiere compensación de unión fría'
            },
            'RTD (Pt100)': {
                inventor: 'William Siemens (1871)',
                principio: 'Platino cuya resistencia cambia linealmente con temperatura',
                rango: '-200°C a 850°C',
                precision: '±0.1°C a ±0.001°C para modelos de laboratorio',
                ventajas: 'Alta precisión y estabilidad, respuesta lineal',
                desventajas: 'Costo mayor, más frágil que termopares'
            },
            'Termómetro Clínico': {
                inventor: 'Thomas Allbutt (1867)',
                principio: 'Estrechamiento en capilar para mantener lectura máxima',
                rango: '35°C a 42°C (rango corporal)',
                precision: '±0.1°C (axilar/rectal)',
                ventajas: 'Mantenimiento de lectura, específico para medicina',
                desventajas: 'Tiempo largo (3-5 min), riesgo de ruptura (mercurio)'
            }
        };
        
        const experimentDetails = details[experiment.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeExperimentModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${experiment.color}; margin-right: 1rem;">
                        <i class="fas ${experiment.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${experiment.color};">${experiment.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${experiment.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${experiment.color};">
                            <i class="fas fa-info-circle"></i> Detalles Técnicos:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${experimentDetails.inventor ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Inventor/Año</div>
                                    <div style="font-weight: 600;">${experimentDetails.inventor}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.principio ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Principio de funcionamiento</div>
                                    <div style="font-weight: 600;">${experimentDetails.principio}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.rango ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Rango de medición</div>
                                    <div style="font-weight: 600;">${experimentDetails.rango}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.precision ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Precisión típica</div>
                                    <div style="font-weight: 600;">${experimentDetails.precision}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.ventajas ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Ventajas</div>
                                    <div style="font-weight: 600;">${experimentDetails.ventajas}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.desventajas ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Desventajas/Limitaciones</div>
                                    <div style="font-weight: 600;">${experimentDetails.desventajas}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${experiment.title} - Aplicaciones principales</span><br>
                        <span class="code-keyword">Médicas:</span> ${experiment.title.includes('Clínico') || experiment.title.includes('Digital') ? 'Fiebre, monitoreo paciente' : 
                            experiment.title.includes('Infrarrojo') ? 'Screening masivo, fiebre sin contacto' : 'No aplica'}<br>
                        <span class="code-keyword">Industriales:</span> ${experiment.title.includes('Termopar') || experiment.title.includes('RTD') ? 'Hornos, procesos térmicos, maquinaria' :
                            experiment.title.includes('Infrarrojo') ? 'Inspección equipos, control calidad' : 'Laboratorio, calibración'}<br>
                        <span class="code-keyword">Científicas:</span> ${experiment.title.includes('Mercurio') || experiment.title.includes('RTD') ? 'Laboratorios de precisión, investigación' :
                            experiment.title.includes('Termopar') ? 'Alta temperatura, condiciones extremas' : 'Variadas'}<br>
                        <span class="code-keyword">Domésticas:</span> ${experiment.title.includes('Digital') ? 'Cocina, ambiente, acuarios' :
                            experiment.title.includes('Infrarrojo') ? 'Alimentos, superficies' : 'Limitado'}<br>
                        <span class="code-keyword">Estado actual:</span> ${experiment.status} | ${experiment.sensitivity ? `Precisión: ${experiment.sensitivity}` : 'En uso común'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="viewApplicationsBtn" style="background: ${experiment.color}; min-width: 200px;">
                            <i class="fas fa-industry"></i> Ver Aplicaciones
                        </button>
                        <button class="btn btn-secondary" id="simulateThermBtn" style="min-width: 200px;">
                            <i class="fas fa-flask"></i> Simular este Termómetro
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeExperimentModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewApplicationsBtn').addEventListener('click', () => {
            alert(`Mostrando aplicaciones específicas de ${experiment.title}`);
            modal.remove();
        });
        
        document.getElementById('simulateThermBtn').addEventListener('click', () => {
            // Cambiar al tipo correspondiente en la simulación
            const thermType = experiment.title.includes('Mercurio') ? 'mercury' :
                             experiment.title.includes('Digital') ? 'digital' :
                             experiment.title.includes('Infrarrojo') ? 'infrared' :
                             experiment.title.includes('Termopar') ? 'thermocouple' :
                             experiment.title.includes('RTD') ? 'thermocouple' : 'mercury';
            
            // Activar el botón correspondiente
            document.querySelectorAll('.therm-type-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-type="${thermType}"]`).classList.add('active');
            
            // Ejecutar simulación
            runThermometerSimulation();
            
            modal.remove();
        });
    }
});