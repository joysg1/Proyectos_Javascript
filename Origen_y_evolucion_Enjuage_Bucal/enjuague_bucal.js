document.addEventListener('DOMContentLoaded', function() {
    console.log('Enjuague Bucal: Inicializando aplicación...');
    
    // Datos de fabricantes importantes
    const manufacturersData = [
        {
            icon: 'fa-flask',
            title: 'Johnson & Johnson',
            description: 'Creadores de Listerine (1879). Revolucionaron el mercado con el primer enjuague bucal científicamente formulado comercializado masivamente.',
            color: '#00cc99',
            status: 'Líder histórico',
            contribution: 'Listerine, validación científica'
        },
        {
            icon: 'fa-tooth',
            title: 'Colgate-Palmolive',
            description: 'Líder en higiene oral con Colgate Plax, Peroxyl y fórmulas con flúor. Innovación en combinaciones anticaries/antiplaca.',
            color: '#006652',
            status: 'Líder actual',
            contribution: 'Flúor, CPC, fórmulas combinadas'
        },
        {
            icon: 'fa-leaf',
            title: 'Procter & Gamble',
            description: 'Creadores de Scope y Crest Pro-Health. Pioneros en fórmulas sin alcohol y con aceites esenciales.',
            color: '#66ccff',
            status: 'Innovador',
            contribution: 'Fórmulas sin alcohol, aceites esenciales'
        },
        {
            icon: 'fa-shield-alt',
            title: 'GSK (GlaxoSmithKline)',
            description: 'Fabricantes de Sensodyne y Parodontax. Especialistas en enjuagues para sensibilidad y salud gingival.',
            color: '#ff9966',
            status: 'Especialista',
            contribution: 'Sensibilidad, salud gingival'
        },
        {
            icon: 'fa-seedling',
            title: 'Tom\'s of Maine',
            description: 'Pioneros en enjuagues bucales naturales, sin alcohol, sin colorantes artificiales. Enfoque en sostenibilidad.',
            color: '#4ade80',
            status: 'Natural/Ecológico',
            contribution: 'Productos naturales, sin alcohol'
        },
        {
            icon: 'fa-pills',
            title: 'Dentaid',
            description: 'Especialistas en enjuagues con clorhexidina y fórmulas para problemas periodontales específicos.',
            color: '#9d4edd',
            status: 'Profesional',
            contribution: 'Clorhexidina, periodoncia'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initEffectivenessSimulation();

    // Función para inicializar partículas científicas
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
                    // Partículas de moléculas (verdes)
                    color = `rgba(0, 204, 153, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de bacterias (naranja)
                    color = `rgba(255, 153, 102, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.6;
                } else {
                    // Partículas de flúor (azul)
                    color = `rgba(102, 204, 255, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'molecule' : type < 0.85 ? 'bacteria' : 'fluoride'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de células sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 40, 35, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 18, 15, 0.3)');
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
                if (particle.type === 'bacteria') {
                    // Bacterias como círculos con textura
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    // Puntos internos para simular bacteria
                    for(let j = 0; j < 3; j++) {
                        ctx.save();
                        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.5})`;
                        ctx.arc(
                            particle.x + (Math.random() - 0.5) * particle.size * 0.5,
                            particle.y + (Math.random() - 0.5) * particle.size * 0.5,
                            particle.size * 0.3,
                            0,
                            Math.PI * 2
                        );
                        ctx.fill();
                        ctx.restore();
                    }
                } else {
                    // Moléculas y flúor como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'molecule') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'bacteria') {
                        gradient.addColorStop(0, `rgba(255, 153, 102, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 153, 102, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(102, 204, 255, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(102, 204, 255, 0)');
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
        console.log('Partículas científicas inicializadas');
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

    // Función para inicializar simulación de efectividad
    function initEffectivenessSimulation() {
        console.log('Inicializando simulación de efectividad...');
        
        // Elementos del DOM
        const ingredientSlider = document.getElementById('ingredientSlider');
        const ingredientValue = document.getElementById('ingredientValue');
        const frequencySlider = document.getElementById('frequencySlider');
        const frequencyValue = document.getElementById('frequencyValue');
        const durationSlider = document.getElementById('durationSlider');
        const durationValue = document.getElementById('durationValue');
        const conditionButtons = document.querySelectorAll('.condition-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('effectivenessCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !ingredientSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        ingredientSlider.addEventListener('input', function() {
            const ingredients = ['Flúor (225 ppm)', 'Aceites esenciales', 'CPC (0.05%)', 'Clorhexidina (0.12%)'];
            ingredientValue.textContent = ingredients[this.value - 1];
        });
        
        frequencySlider.addEventListener('input', function() {
            const frequencies = ['1 vez', '2 veces', '3 veces'];
            frequencyValue.textContent = frequencies[this.value - 1];
        });
        
        durationSlider.addEventListener('input', function() {
            durationValue.textContent = `${this.value} seg`;
        });
        
        // Botones de condición oral
        conditionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                conditionButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runEffectivenessSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            ingredientSlider.value = 3;
            ingredientValue.textContent = 'CPC (0.05%)';
            frequencySlider.value = 2;
            frequencyValue.textContent = '2 veces';
            durationSlider.value = 30;
            durationValue.textContent = '30 seg';
            conditionButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-condition="normal"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">La clorhexidina (rojo) ofrece máxima efectividad, pero CPC (azul) es buen equilibrio</div>';
            
            // Ejecutar simulación con valores por defecto
            runEffectivenessSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runEffectivenessSimulation();
        }, 500);
        
        console.log('Simulación de efectividad inicializada');
    }

    // Función para ejecutar simulación de efectividad
    function runEffectivenessSimulation() {
        const canvas = document.getElementById('effectivenessCurveCanvas');
        const ctx = canvas.getContext('2d');
        const ingredientType = parseInt(document.getElementById('ingredientSlider').value);
        const frequency = parseInt(document.getElementById('frequencySlider').value);
        const duration = parseInt(document.getElementById('durationSlider').value);
        const condition = document.querySelector('.condition-btn.active').dataset.condition;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (días de uso)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (% reducción placa)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Días de Uso Continuo', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('% Reducción de Placa Bacteriana', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = i * 7;
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
            ctx.fillText(value.toString() + '%', padding - 25, y + 3);
        }
        
        // Efectividad máxima por ingrediente
        const ingredientEffectiveness = {
            1: 30,   // Flúor solo
            2: 70,   // Aceites esenciales
            3: 60,   // CPC
            4: 85    // Clorhexidina
        };
        
        // Modificador por condición oral
        const conditionModifiers = {
            'normal': 1.0,
            'gingivitis': 1.2,
            'halitosis': 0.9,
            'caries': 1.1
        };
        
        // Calcular curvas
        const points = 100;
        const theoreticalCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const day = (i * 35) / points; // 35 días máximo
            
            // Efectividad teórica del ingrediente
            const v_theoretical = ingredientEffectiveness[ingredientType];
            
            // Efectividad real (considera frecuencia, duración y condición)
            let v_actual = v_theoretical;
            
            // Modificador por frecuencia
            v_actual *= (frequency / 2); // 2 veces/día es óptimo
            
            // Modificador por duración del enjuague
            if (duration < 30) {
                v_actual *= (duration / 30);
            }
            
            // Modificador por condición oral
            v_actual *= conditionModifiers[condition];
            
            // Efecto acumulativo en el tiempo (asintótico)
            const timeFactor = 1 - Math.exp(-day / 7); // Constante de tiempo: 7 días
            v_actual *= timeFactor;
            
            // Límite superior
            v_actual = Math.min(v_actual, v_theoretical);
            
            theoreticalCurve.push({day: day, v: v_theoretical});
            actualCurve.push({day: day, v: v_actual});
        }
        
        // Dibujar curva teórica máxima
        ctx.strokeStyle = 'rgba(0, 204, 153, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        theoreticalCurve.forEach((point, i) => {
            const x = padding + (point.day / 35) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva real
        ctx.strokeStyle = 'rgba(255, 153, 102, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.day / 35) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(0, 204, 153, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.day / 35) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            const yTheoretical = canvas.height - padding - (theoreticalCurve[i].v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, yTheoretical);
            } else {
                ctx.lineTo(x, yTheoretical);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + (point.day / 35) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Máximo teórico
        ctx.fillStyle = 'rgba(0, 204, 153, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Máximo teórico', canvas.width - 155, 32);
        
        // Efectividad real
        ctx.fillStyle = 'rgba(255, 153, 102, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Efectividad real', canvas.width - 155, 57);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const theoreticalEffect = ingredientEffectiveness[ingredientType];
        const actualEffect = actualCurve[actualCurve.length - 1].v;
        
        if (actualEffect < theoreticalEffect * 0.8) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Optimización necesaria (${actualEffect.toFixed(0)}% < ${theoreticalEffect}%)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Uso óptimo (${actualEffect.toFixed(0)}% efectividad)
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const ingredientType = parseInt(document.getElementById('ingredientSlider').value);
        const frequency = parseInt(document.getElementById('frequencySlider').value);
        const duration = parseInt(document.getElementById('durationSlider').value);
        const condition = document.querySelector('.condition-btn.active').dataset.condition;
        
        const ingredients = ['Flúor (225 ppm)', 'Aceites esenciales', 'CPC (0.05%)', 'Clorhexidina (0.12%)'];
        const frequencies = ['1 vez', '2 veces', '3 veces'];
        const conditionNames = {
            'normal': 'Salud oral normal',
            'gingivitis': 'Gingivitis leve',
            'halitosis': 'Halitosis',
            'caries': 'Riesgo de caries'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Efectividad
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 45, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Ingrediente Activo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${ingredients[ingredientType-1]}</div>
                            </div>
                            <div style="background: rgba(30, 45, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Condición Oral</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${conditionNames[condition]}</div>
                            </div>
                            <div style="background: rgba(30, 45, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Frecuencia Diaria</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${frequencies[frequency-1]}</div>
                            </div>
                            <div style="background: rgba(30, 45, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Duración Enjuague</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${duration} segundos</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de efectividad teórica vs real</span><br>
                            <span class="code-keyword">Efectividad teórica máxima:</span> ${[30, 70, 60, 85][ingredientType-1]}%<br>
                            <span class="code-keyword">Modificador por frecuencia:</span> ${(frequency/2).toFixed(2)}x<br>
                            <span class="code-keyword">Modificador por duración:</span> ${(duration >= 30 ? '1.00' : (duration/30).toFixed(2))}x<br>
                            <span class="code-keyword">Modificador por condición:</span> ${condition === 'normal' ? '1.00' : condition === 'gingivitis' ? '1.20' : condition === 'halitosis' ? '0.90' : '1.10'}x<br>
                            <span class="code-keyword">Efectividad estimada a 30 días:</span> ${(85 * (frequency/2) * (duration >= 30 ? 1 : duration/30) * (condition === 'normal' ? 1 : condition === 'gingivitis' ? 1.2 : condition === 'halitosis' ? 0.9 : 1.1)).toFixed(1)}%
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
            simulateEvolutionBtn.addEventListener('click', simulateHistoryEvolution);
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

    // Función para simulación de evolución histórica
    function simulateHistoryEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución histórica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "2000 a.C.: Egipcios usan sal y vinagre...",
            "500 a.C.: Ayurveda introduce gandusha con hierbas...",
            "Siglo XI: Avicenna recomienda vinagre y miel...",
            "1879: Joseph Lawrence crea Listerine...",
            "1914: Comercialización masiva de enjuagues...",
            "1970: Introducción de la clorhexidina...",
            "1980: Fórmulas con flúor se estandarizan...",
            "1990: Enjuagues sin alcohol y naturales...",
            "2000-Presente: Personalización y nanotecnología"
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
            showHistoryEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 7200);
    }

    // Función para mostrar resultados de evolución histórica
    function showHistoryEvolutionResults() {
        const results = [
            { type: 'Efectividad máxima', value: '85%', color: '#00cc99', icon: 'fa-chart-line' },
            { type: 'Años de historia', value: '4000+', color: '#ff9966', icon: 'fa-history' },
            { type: 'Mercado global', value: '3.2B', color: '#66ccff', icon: 'fa-globe' },
            { type: 'Reducción caries', value: '40%', color: '#4ade80', icon: 'fa-tooth' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeHistoryModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Histórica del Enjuague Bucal
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de los enjuagues bucales en la salud oral desde la antigüedad hasta la actualidad:</p>
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
                    <button class="btn" id="viewHistoryBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-history"></i> Ver Línea de Tiempo
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
        
        document.getElementById('viewHistoryBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo detallada de la evolución del enjuague bucal');
            modal.remove();
        });
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturer) {
        const details = {
            'Johnson & Johnson': {
                contribution: 'Inventor del primer enjuague bucal científico comercial (Listerine 1879)',
                products: 'Listerine (Original, Total Care, Zero), Reach',
                timeline: '1879-presente',
                impact: 'Creó el mercado de enjuagues bucales comerciales'
            },
            'Colgate-Palmolive': {
                contribution: 'Innovación en fórmulas con flúor y combinaciones antiplaca/anticaries',
                products: 'Colgate Plax, Peroxyl, FluoriGard, Total',
                timeline: '1873-presente',
                impact: 'Líder en higiene oral con validación científica rigurosa'
            },
            'Procter & Gamble': {
                contribution: 'Pioneros en fórmulas sin alcohol y con aceites esenciales',
                products: 'Scope, Crest Pro-Health, Oral-B',
                timeline: '1837-presente',
                impact: 'Popularizó enjuagues para uso diario sin efectos secundarios'
            },
            'GSK (GlaxoSmithKline)': {
                contribution: 'Especialización en enjuagues para sensibilidad y salud gingival',
                products: 'Sensodyne, Parodontax, Corsodyl',
                timeline: '2000-presente',
                impact: 'Liderazgo en segmentos especializados de salud oral'
            },
            'Tom\'s of Maine': {
                contribution: 'Pioneros en enjuagues bucales naturales y sostenibles',
                products: 'Enjuagues naturales sin alcohol, con flúor natural',
                timeline: '1970-presente',
                impact: 'Democratizó opciones naturales en higiene oral'
            },
            'Dentaid': {
                contribution: 'Especialistas en enjuagues con clorhexidina y periodoncia',
                products: 'Perio-Aid, Xerostom, Vitis',
                timeline: '1980-presente',
                impact: 'Referente en productos para profesionales dentales'
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
                                <div style="background: rgba(30, 45, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.products ? `
                                <div style="background: rgba(30, 45, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.timeline ? `
                                <div style="background: rgba(30, 45, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.impact ? `
                                <div style="background: rgba(30, 45, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en Mercado</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${manufacturer.title} - Tecnologías y enfoques</span><br>
                        <span class="code-keyword">Enfoque principal:</span> ${manufacturer.status}<br>
                        <span class="code-keyword">Ingredientes clave:</span> Varían según línea de productos<br>
                        <span class="code-keyword">Validación científica:</span> ${manufacturer.title === 'Tom\'s of Maine' ? 'Limitada' : 'Extensa'}<br>
                        <span class="code-keyword">Mercado objetivo:</span> ${manufacturer.title === 'Dentaid' ? 'Profesional' : 'Consumidor general'}
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
    console.log('Aplicación Enjuague Bucal inicializada correctamente');
});