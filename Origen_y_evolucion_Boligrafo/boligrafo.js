document.addEventListener('DOMContentLoaded', function() {
    console.log('Bolígrafo Evolución: Inicializando aplicación...');
    
    // Datos de fabricantes importantes
    const manufacturersData = [
        {
            icon: 'fa-pen-nib',
            title: 'Bíró',
            description: 'László Bíró, inventor del bolígrafo moderno en 1938. Periodista húngaro-argentino que revolucionó la escritura.',
            color: '#c792ea',
            status: 'Histórico',
            contribution: 'Inventor, patente original'
        },
        {
            icon: 'fa-pen',
            title: 'BIC',
            description: 'Marcel Bich compró la patente y fundó BIC en 1950. Popularizó el bolígrafo a nivel mundial con producción masiva.',
            color: '#ffcc80',
            status: 'Activo',
            contribution: 'Producción masiva, BIC Cristal'
        },
        {
            icon: 'fa-space-shuttle',
            title: 'Fisher Space Pen',
            description: 'Paul Fisher inventó el bolígrafo espacial en 1965. Funciona en gravedad cero, bajo agua y temperaturas extremas.',
            color: '#80deea',
            status: 'Activo',
            contribution: 'Bolígrafo espacial, tinta presurizada'
        },
        {
            icon: 'fa-tint',
            title: 'Pilot',
            description: 'Ryosuke Namiki fundó Pilot en 1918. Innovador en bolígrafos de gel (Pilot G2) y rollerball de alta calidad.',
            color: '#ff8a80',
            status: 'Activo',
            contribution: 'Bolígrafos gel, innovación en tintas'
        },
        {
            icon: 'fa-pen-alt',
            title: 'Parker',
            description: 'George S. Parker fundó Parker en 1888. Fabricante premium de bolígrafos, plumas estilográficas y productos de lujo.',
            color: '#81c784',
            status: 'Activo',
            contribution: 'Bolígrafos premium, diseño icónico'
        },
        {
            icon: 'fa-laptop',
            title: 'Livescribe',
            description: 'Fabricante de bolígrafos inteligentes que digitalizan la escritura. Fundado en 2007 por Jim Marggraff.',
            color: '#ba68c8',
            status: 'Activo',
            contribution: 'Bolígrafos digitales, escritura inteligente'
        }
    ];

    // Inicializar componentes
    initInkParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initPerformanceSimulation();

    // Función para inicializar partículas de tinta
    function initInkParticles() {
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
            const colors = [
                'rgba(199, 146, 234, 0.6)',  // Púrpura (tinta estándar)
                'rgba(255, 204, 128, 0.7)',  // Naranja (tinta gel)
                'rgba(128, 222, 234, 0.5)',  // Azul claro (tinta rollerball)
                'rgba(255, 138, 128, 0.6)',  // Rojo (tinta roja)
                'rgba(129, 199, 132, 0.5)'   // Verde (tinta verde)
            ];
            
            for (let i = 0; i < particleCount; i++) {
                const type = Math.random();
                let color, size, speed;
                
                if (type < 0.6) {
                    // Partículas de tinta estándar (púrpura)
                    color = colors[0];
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else if (type < 0.8) {
                    // Partículas de tinta gel (naranja)
                    color = colors[1];
                    size = Math.random() * 3 + 1.5;
                    speed = (Math.random() - 0.5) * 0.7;
                } else if (type < 0.9) {
                    // Gotas de tinta (azul)
                    color = colors[2];
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.9;
                } else {
                    // Partículas especiales (rojo/verde)
                    color = colors[Math.floor(Math.random() * 2) + 3];
                    size = Math.random() * 2 + 0.8;
                    speed = (Math.random() - 0.5) * 1.2;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.7,
                    color: color,
                    pulseSpeed: Math.random() * 0.03 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.6 ? 'standard' : type < 0.8 ? 'gel' : type < 0.9 ? 'drop' : 'special'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de papel sutil
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(40, 40, 70, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Líneas de cuaderno sutil
            ctx.strokeStyle = 'rgba(199, 146, 234, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < canvas.height; i += 30) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
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
                if (particle.type === 'drop') {
                    // Gotas como elipses
                    ctx.ellipse(particle.x, particle.y, particle.size, particle.size * 1.5, 0, 0, Math.PI * 2);
                } else if (particle.type === 'special') {
                    // Partículas especiales como estrellas
                    ctx.moveTo(particle.x, particle.y - particle.size);
                    for (let i = 0; i < 5; i++) {
                        const angle = (i * Math.PI * 2) / 5;
                        const nextAngle = ((i + 0.5) * Math.PI * 2) / 5;
                        ctx.lineTo(
                            particle.x + Math.cos(angle) * particle.size * 0.5,
                            particle.y + Math.sin(angle) * particle.size * 0.5
                        );
                        ctx.lineTo(
                            particle.x + Math.cos(nextAngle) * particle.size,
                            particle.y + Math.sin(nextAngle) * particle.size
                        );
                    }
                    ctx.closePath();
                } else {
                    // Tinta estándar y gel como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type === 'gel' || particle.type === 'special') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2.5
                    );
                    
                    gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`));
                    gradient.addColorStop(1, particle.color.replace(/[\d.]+\)$/, '0)'));
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                
                // Trazo de escritura para algunas partículas
                if (Math.random() > 0.95 && particle.type !== 'special') {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle.x - particle.speedX * 10, particle.y - particle.speedY * 10);
                    ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha * 0.3})`);
                    ctx.lineWidth = particle.size * 0.5;
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
        console.log('Partículas de tinta inicializadas');
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
        const penTypeSlider = document.getElementById('penTypeSlider');
        const penTypeValue = document.getElementById('penTypeValue');
        const lengthSlider = document.getElementById('lengthSlider');
        const lengthValue = document.getElementById('lengthValue');
        const speedSlider = document.getElementById('speedSlider');
        const speedValue = document.getElementById('speedValue');
        const conditionButtons = document.querySelectorAll('.condition-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('performanceCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !penTypeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Tipos de bolígrafos
        const penTypes = [
            'Económico Básico',
            'Bolígrafo Estándar', 
            'Rollerball/Gel',
            'Premium/Técnico'
        ];
        
        // Velocidades de escritura
        const speedTypes = ['Lenta', 'Media', 'Rápida'];
        
        // Actualizar valores de los sliders
        penTypeSlider.addEventListener('input', function() {
            penTypeValue.textContent = penTypes[this.value - 1];
        });
        
        lengthSlider.addEventListener('input', function() {
            lengthValue.textContent = `${this.value} km`;
        });
        
        speedSlider.addEventListener('input', function() {
            speedValue.textContent = speedTypes[this.value - 1];
        });
        
        // Botones de condición
        conditionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                conditionButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runPerformanceSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            penTypeSlider.value = 2;
            penTypeValue.textContent = 'Bolígrafo Estándar';
            lengthSlider.value = 2.0;
            lengthValue.textContent = '2.0 km';
            speedSlider.value = 2;
            speedValue.textContent = 'Media';
            conditionButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="normal"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">El bolígrafo estándar (azul) ofrece rendimiento confiable para uso diario</div>';
            
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
        const penType = parseInt(document.getElementById('penTypeSlider').value);
        const length = parseFloat(document.getElementById('lengthSlider').value);
        const speedType = parseInt(document.getElementById('speedSlider').value);
        const condition = document.querySelector('.condition-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (longitud escrita)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (calidad/rendimiento %)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Longitud Escrita (km)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Rendimiento (%)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = (i * length) / 5;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value.toFixed(1), x, canvas.height - padding + 20);
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
        
        // Rendimiento por tipo de bolígrafo (base)
        const penPerformance = {
            1: 70,   // Económico básico
            2: 85,   // Estándar
            3: 90,   // Rollerball/Gel
            4: 95    // Premium/Técnico
        };
        
        // Impacto por condiciones
        const conditionImpact = {
            'normal': 1.0,
            'pressure': 0.7,
            'angle': 0.6,
            'temperature': 0.8
        };
        
        // Impacto por velocidad
        const speedImpact = {
            1: 1.1,   // Lenta - mejor rendimiento
            2: 1.0,   // Media - normal
            3: 0.85   // Rápida - menor rendimiento
        };
        
        // Calcular curvas
        const points = 100;
        const baseCurve = [];
        const conditionCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const lengthPoint = (i * length) / points;
            
            // Rendimiento base del tipo de bolígrafo
            const v_base = penPerformance[penType];
            
            // Aplicar degradación por longitud
            let v_actual = v_base;
            
            // Degradación según longitud (bolígrafos se desgastan)
            if (lengthPoint > 0.5) {
                v_actual -= (lengthPoint - 0.5) * 5;
            }
            
            // Aplicar impacto de condiciones
            v_actual *= conditionImpact[condition];
            
            // Aplicar impacto de velocidad
            v_actual *= speedImpact[speedType];
            
            // Asegurar que no sea negativo
            v_actual = Math.max(10, v_actual);
            
            // Curva base (ideal)
            const v_base_curve = v_base * (1 - lengthPoint / length * 0.3);
            
            // Curva con condiciones
            const v_condition_curve = v_base * conditionImpact[condition] * (1 - lengthPoint / length * 0.5);
            
            baseCurve.push({length: lengthPoint, v: v_base_curve});
            conditionCurve.push({length: lengthPoint, v: v_condition_curve});
            actualCurve.push({length: lengthPoint, v: v_actual});
        }
        
        // Dibujar curva base (ideal)
        ctx.strokeStyle = 'rgba(199, 146, 234, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        baseCurve.forEach((point, i) => {
            const x = padding + (point.length / length) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva con condiciones
        ctx.strokeStyle = 'rgba(128, 222, 234, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        conditionCurve.forEach((point, i) => {
            const x = padding + (point.length / length) * graphWidth;
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
        ctx.strokeStyle = 'rgba(255, 138, 128, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.length / length) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(199, 146, 234, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.length / length) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            const yBase = canvas.height - padding - (baseCurve[i].v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, yBase);
            } else {
                ctx.lineTo(x, yBase);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + (point.length / length) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Ideal
        ctx.fillStyle = 'rgba(199, 146, 234, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Rendimiento ideal', canvas.width - 155, 32);
        
        // Con condiciones
        ctx.fillStyle = 'rgba(128, 222, 234, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Con condiciones', canvas.width - 155, 57);
        
        // Rendimiento real
        ctx.fillStyle = 'rgba(255, 138, 128, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Rendimiento real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const penPerformanceValue = penPerformance[penType];
        const conditionName = condition === 'normal' ? 'normal' : 
                            condition === 'pressure' ? 'alta presión' : 
                            condition === 'angle' ? 'ángulo extremo' : 'temperatura';
        
        if (penType === 1) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Bolígrafo económico: buen rendimiento inicial pero se degrada rápido
                </div>
            `;
        } else if (penType === 4) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Bolígrafo premium: mantiene rendimiento incluso en condiciones ${conditionName}
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-light);">
                    <i class="fas fa-info-circle" style="margin-right: 0.5rem;"></i>
                    Rendimiento del ${penType === 2 ? 'bolígrafo estándar' : 'rollerball/gel'}: ${Math.round(actualCurve[actualCurve.length-1].v)}% al final
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const penType = parseInt(document.getElementById('penTypeSlider').value);
        const length = parseFloat(document.getElementById('lengthSlider').value);
        const speedType = parseInt(document.getElementById('speedSlider').value);
        const condition = document.querySelector('.condition-btn.active').dataset.type;
        
        const penTypes = ['Económico Básico', 'Bolígrafo Estándar', 'Rollerball/Gel', 'Premium/Técnico'];
        const speedTypes = ['Lenta', 'Media', 'Rápida'];
        const conditionNames = {
            'normal': 'Condiciones normales',
            'pressure': 'Alta presión',
            'angle': 'Ángulo extremo',
            'temperature': 'Temperaturas extremas'
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
                            <div style="background: rgba(40, 40, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Bolígrafo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${penTypes[penType-1]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Condiciones</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${conditionNames[condition]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Longitud Escritura</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${length} km</div>
                            </div>
                            <div style="background: rgba(40, 40, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Velocidad Escritura</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${speedTypes[speedType-1]}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de rendimiento teórico vs real</span><br>
                            <span class="code-keyword">Rendimiento inicial:</span> ${[70, 85, 90, 95][penType-1]}%<br>
                            <span class="code-keyword">Impacto condiciones:</span> ${condition === 'normal' ? '0%' : condition === 'pressure' ? '30% reducción' : condition === 'angle' ? '40% reducción' : '20% reducción'}<br>
                            <span class="code-keyword">Impacto velocidad:</span> ${speedType === 1 ? '+10%' : speedType === 2 ? '0%' : '-15%'}<br>
                            <span class="code-keyword">Rendimiento final estimado:</span> ${Math.round([70, 85, 90, 95][penType-1] * 
                                (condition === 'normal' ? 1.0 : condition === 'pressure' ? 0.7 : condition === 'angle' ? 0.6 : 0.8) *
                                (speedType === 1 ? 1.1 : speedType === 2 ? 1.0 : 0.85) * 0.7)}%
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
            simulateEvolutionBtn.addEventListener('click', simulatePenEvolution);
        }
        
        // Botón de especificaciones
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.add('active');
            });
        }
        
        // Botón de comparación (cambiado a compareTypesBtn)
        const compareTypesBtn = document.getElementById('compareTypesBtn');
        if (compareTypesBtn) {
            compareTypesBtn.addEventListener('click', () => {
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
    function simulatePenEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución histórica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "Pre-1888: Plumas de ave, tinteros, escritura manual...",
            "1888: John J. Loud patenta primer prototipo de bolígrafo...",
            "1938: László Bíró inventa el bolígrafo moderno en Argentina...",
            "1945: Lanzamiento comercial - Eterpen Company...",
            "1950: Revolución BIC - producción masiva a bajo costo...",
            "1965: Fisher Space Pen - escribe en gravedad cero...",
            "1984: Bolígrafos de gel - Pilot G2 revoluciona el mercado...",
            "2000: Era digital - bolígrafos inteligentes y recargables...",
            "Presente: 100+ mil millones vendidos, símbolo cultural global"
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
            showPenEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 7200);
    }

    // Función para mostrar resultados de evolución histórica
    function showPenEvolutionResults() {
        const results = [
            { type: 'Vendidos total', value: '100B+', color: '#c792ea', icon: 'fa-chart-bar' },
            { type: 'Años de historia', value: '80+', color: '#ffcc80', icon: 'fa-calendar-alt' },
            { type: 'Producción diaria', value: '14M/día', color: '#80deea', icon: 'fa-industry' },
            { type: 'Cuota mercado', value: '82%', color: '#81c784', icon: 'fa-chart-pie' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Histórica del Bolígrafo
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto del bolígrafo en la comunicación escrita desde 1938 hasta la actualidad:</p>
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
                        <i class="fas fa-history"></i> Ver Línea de Tiempo Completa
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
            'Bíró': {
                contribution: 'Inventor del bolígrafo moderno, patente argentina #30392 (1943)',
                products: 'Eterpen (primer bolígrafo comercial), diseño original de bola y tinta viscosa',
                timeline: '1938-1985 (fallecimiento)',
                impact: 'Revolucionó la escritura cotidiana, reemplazó plumas y tinteros'
            },
            'BIC': {
                contribution: 'Producción masiva a bajo costo, diseño BIC Cristal icónico',
                products: 'BIC Cristal (1950), BIC 4-Color, BIC Orange, más de 100 variantes',
                timeline: '1950-presente',
                impact: 'Democratizó la escritura, 100+ mil millones vendidos, símbolo cultural'
            },
            'Fisher Space Pen': {
                contribution: 'Bolígrafo que escribe en gravedad cero, bajo agua, temperaturas extremas',
                products: 'Fisher Space Pen AG7 (usado por NASA), Bullet Pen, telescopic pens',
                timeline: '1965-presente',
                impact: 'Tecnología espacial aplicada a escritura, usado en misiones Apollo y actuales'
            },
            'Pilot': {
                contribution: 'Innovación en bolígrafos de gel (Pilot G2, 1984) y rollerball',
                products: 'Pilot G2, V5/V7, Precise, FriXion (tinta borrable)',
                timeline: '1918-presente',
                impact: 'Popularizó los bolígrafos de gel, escritura suave y colores vibrantes'
            },
            'Parker': {
                contribution: 'Bolígrafos premium, diseño icónico y estilográfica moderna',
                products: 'Parker Jotter (1954), Sonnet, Duofold, IM, Vector series',
                timeline: '1888-presente',
                impact: 'Estableció el bolígrafo como objeto de lujo y regalo corporativo'
            },
            'Livescribe': {
                contribution: 'Bolígrafos inteligentes que digitalizan la escritura en tiempo real',
                products: 'Livescribe Echo, Pulse, Sky, Aegir (conexión Bluetooth y apps)',
                timeline: '2007-presente',
                impact: 'Puente entre escritura analógica y digital, captura notas para dispositivos'
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
                                <div style="background: rgba(40, 40, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.products ? `
                                <div style="background: rgba(40, 40, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Icónicos</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.timeline ? `
                                <div style="background: rgba(40, 40, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.impact ? `
                                <div style="background: rgba(40, 40, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto Histórico</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${manufacturer.title} - Datos técnicos y curiosidades</span><br>
                        <span class="code-keyword">Tecnología clave:</span> ${manufacturer.title === 'Fisher Space Pen' ? 'Tinta presurizada thixotrópica' : manufacturer.title === 'Livescribe' ? 'Sensores infrarrojos, Bluetooth' : 'Bola de tungsteno-carburo, tinta viscosa'}<br>
                        <span class="code-keyword">Producción anual:</span> ${manufacturer.title === 'BIC' ? '5 mil millones' : manufacturer.title === 'Pilot' ? '1.5 mil millones' : manufacturer.title === 'Parker' ? '50 millones' : 'Datos no públicos'}<br>
                        <span class="code-keyword">Curiosidad:</span> ${manufacturer.title === 'Bíró' ? 'El Día del Inventor en Argentina (29/9) es su cumpleaños' : manufacturer.title === 'BIC' ? 'Se venden 57 unidades por segundo a nivel mundial' : manufacturer.title === 'Fisher Space Pen' ? 'NASA lo compró por $6 por unidad en 1965' : 'Diseños premiados en museos como el MoMA'}
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
    console.log('Aplicación Bolígrafo Evolución inicializada correctamente');
});