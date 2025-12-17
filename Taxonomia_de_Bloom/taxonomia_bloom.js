document.addEventListener('DOMContentLoaded', function() {
    console.log('Taxonomía de Bloom: Inicializando aplicación...');
    
    // Datos de teóricos importantes
    const theoristsData = [
        {
            icon: 'fa-user-graduate',
            title: 'Benjamin Bloom',
            description: 'Padre de la taxonomía original (1956). Psicólogo educativo que lideró el comité que desarrolló la clasificación de objetivos educativos.',
            color: '#9d4edd',
            status: 'Fundador',
            contribution: 'Taxonomía Original, Dominios del Aprendizaje'
        },
        {
            icon: 'fa-chalkboard-teacher',
            title: 'Lorin Anderson',
            description: 'Estudiante de Bloom que lideró la revisión de 2001. Cambió sustantivos por verbos y reorganizó los niveles cognitivos.',
            color: '#00a8ff',
            status: 'Revisor Principal',
            contribution: 'Taxonomía Revisada, Verbos de Acción'
        },
        {
            icon: 'fa-book',
            title: 'David Krathwohl',
            description: 'Coautor de la taxonomía original y co-líder de la revisión de 2001. Especialista en evaluación educativa y dominio afectivo.',
            color: '#ff9e00',
            status: 'Coautor',
            contribution: 'Dominio Afectivo, Taxonomía Revisada'
        },
        {
            icon: 'fa-laptop-code',
            title: 'Andrew Churches',
            description: 'Educador digital que desarrolló la Taxonomía de Bloom para la Era Digital (2008). Integró habilidades tecnológicas.',
            color: '#00d4aa',
            status: 'Contemporáneo',
            contribution: 'Taxonomía Digital, Tecnología Educativa'
        },
        {
            icon: 'fa-brain',
            title: 'John Biggs',
            description: 'Desarrolló el modelo SOLO (Structure of Observed Learning Outcome) como alternativa a Bloom. Enfoque en calidad del aprendizaje.',
            color: '#ff6b6b',
            status: 'Alternativo',
            contribution: 'Modelo SOLO, Calidad del Aprendizaje'
        },
        {
            icon: 'fa-university',
            title: 'Fink, Dee',
            description: 'Creó la Taxonomía del Aprendizaje Significativo (2003). Enfoque holístico que incluye dimensión humana y de cuidado.',
            color: '#4ade80',
            status: 'Complementario',
            contribution: 'Aprendizaje Significativo, Enfoque Holístico'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initTheorists();
    initEventListeners();
    initAnimations();
    initTimeline();
    initBloomSimulation();

    // Función para inicializar partículas educativas
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
                    // Partículas de conocimiento (púrpura)
                    color = `rgba(157, 78, 221, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de comprensión (azul)
                    color = `rgba(0, 168, 255, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.6;
                } else {
                    // Partículas de creación (verde)
                    color = `rgba(0, 212, 170, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'knowledge' : type < 0.85 ? 'comprehension' : 'creation'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo educativo sutil
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
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.4 + 0.6;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula
                ctx.beginPath();
                
                // Forma diferente según tipo
                if (particle.type === 'creation') {
                    // Creación como estrellas
                    drawStar(ctx, particle.x, particle.y, 5, particle.size, particle.size/2);
                } else {
                    // Conocimiento y comprensión como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'knowledge') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'comprehension') {
                        gradient.addColorStop(0, `rgba(0, 168, 255, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(0, 168, 255, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(0, 212, 170, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(0, 212, 170, 0)');
                    }
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        // Función auxiliar para dibujar estrellas
        function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
            let rot = Math.PI / 2 * 3;
            let x = cx;
            let y = cy;
            const step = Math.PI / spikes;
            
            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius);
            
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;
                
                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
        }
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        
        resizeCanvas();
        createParticles();
        animateParticles();
        console.log('Partículas educativas inicializadas');
    }

    // Función para inicializar teóricos
    function initTheorists() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de teóricos no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        theoristsData.forEach(theorist => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${theorist.color};">
                        <i class="fas ${theorist.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${theorist.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${theorist.color}20; color: ${theorist.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${theorist.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${theorist.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${theorist.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showTheoristDetail(theorist));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Teóricos inicializados: ' + theoristsData.length);
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

    // Función para inicializar simulación de Bloom
    function initBloomSimulation() {
        console.log('Inicializando simulación de objetivos de aprendizaje...');
        
        // Elementos del DOM
        const bloomLevelSlider = document.getElementById('bloomLevelSlider');
        const bloomLevelValue = document.getElementById('bloomLevelValue');
        const complexitySlider = document.getElementById('complexitySlider');
        const complexityValue = document.getElementById('complexityValue');
        const assessabilitySlider = document.getElementById('assessabilitySlider');
        const assessabilityValue = document.getElementById('assessabilityValue');
        const knowledgeTypeButtons = document.querySelectorAll('.knowledge-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('bloomCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !bloomLevelSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        bloomLevelSlider.addEventListener('input', function() {
            const levels = ['Recordar (Nivel 1)', 'Comprender (Nivel 2)', 'Aplicar (Nivel 3)', 'Analizar (Nivel 4)', 'Evaluar (Nivel 5)', 'Crear (Nivel 6)'];
            bloomLevelValue.textContent = levels[this.value - 1];
        });
        
        complexitySlider.addEventListener('input', function() {
            const complexities = ['Muy Baja', 'Baja', 'Media-Baja', 'Media', 'Media-Alta', 'Alta', 'Muy Alta', 'Compleja', 'Muy Compleja', 'Extrema'];
            complexityValue.textContent = complexities[this.value - 1];
        });
        
        assessabilitySlider.addEventListener('input', function() {
            assessabilityValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de conocimiento
        knowledgeTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                knowledgeTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runBloomSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            bloomLevelSlider.value = 3;
            bloomLevelValue.textContent = 'Aplicar (Nivel 3)';
            complexitySlider.value = 5;
            complexityValue.textContent = 'Media';
            assessabilitySlider.value = 75;
            assessabilityValue.textContent = '75%';
            knowledgeTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="conceptual"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">El nivel "Aplicar" permite objetivos prácticos, mientras "Crear" fomenta la innovación</div>';
            
            // Ejecutar simulación con valores por defecto
            runBloomSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runBloomSimulation();
        }, 500);
        
        console.log('Simulación de objetivos de aprendizaje inicializada');
    }

    // Función para ejecutar simulación de Bloom
    function runBloomSimulation() {
        const canvas = document.getElementById('bloomCurveCanvas');
        const ctx = canvas.getContext('2d');
        const bloomLevel = parseInt(document.getElementById('bloomLevelSlider').value);
        const complexity = parseInt(document.getElementById('complexitySlider').value);
        const assessabilityPercent = parseInt(document.getElementById('assessabilitySlider').value) / 100;
        const knowledgeType = document.querySelector('.knowledge-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (complejidad cognitiva)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (valor educativo)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Nivel de Pensamiento', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Valor Educativo', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X (niveles de Bloom)
        const bloomLevels = ['Recordar', 'Comprender', 'Aplicar', 'Analizar', 'Evaluar', 'Crear'];
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(bloomLevels[i], x, canvas.height - padding + 20);
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
        
        // Valores por nivel de Bloom
        const bloomValues = {
            1: 10,   // Recordar
            2: 25,   // Comprender
            3: 45,   // Aplicar
            4: 65,   // Analizar
            5: 85,   // Evaluar
            6: 100   // Crear
        };
        
        // Valores por tipo de conocimiento
        const knowledgeValues = {
            'factual': 15,
            'conceptual': 40,
            'procedural': 70,
            'metacognitive': 90
        };
        
        // Calcular curvas
        const points = 100;
        const bloomCurve = [];
        const knowledgeLimitCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const levelPoint = (i * 6) / points;
            
            // Valor según nivel de Bloom
            let v_bloom = 0;
            if (levelPoint <= 1) v_bloom = bloomValues[1] * levelPoint;
            else if (levelPoint <= 2) v_bloom = bloomValues[1] + (bloomValues[2] - bloomValues[1]) * (levelPoint - 1);
            else if (levelPoint <= 3) v_bloom = bloomValues[2] + (bloomValues[3] - bloomValues[2]) * (levelPoint - 2);
            else if (levelPoint <= 4) v_bloom = bloomValues[3] + (bloomValues[4] - bloomValues[3]) * (levelPoint - 3);
            else if (levelPoint <= 5) v_bloom = bloomValues[4] + (bloomValues[5] - bloomValues[4]) * (levelPoint - 4);
            else v_bloom = bloomValues[5] + (bloomValues[6] - bloomValues[5]) * (levelPoint - 5);
            
            // Límite del tipo de conocimiento
            const v_knowledge = knowledgeValues[knowledgeType];
            
            // Valor real (considera complejidad y evaluabilidad)
            let v_actual = Math.min(v_bloom, v_knowledge);
            
            // Ajuste por complejidad
            v_actual *= (complexity / 10);
            
            // Ajuste por evaluabilidad
            v_actual *= assessabilityPercent;
            
            bloomCurve.push({level: levelPoint, v: v_bloom});
            knowledgeLimitCurve.push({level: levelPoint, v: v_knowledge});
            actualCurve.push({level: levelPoint, v: v_actual});
        }
        
        // Dibujar curva límite Bloom
        ctx.strokeStyle = 'rgba(157, 78, 221, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        bloomCurve.forEach((point, i) => {
            const x = padding + (point.level / 6) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva límite conocimiento
        ctx.strokeStyle = 'rgba(0, 168, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        knowledgeLimitCurve.forEach((point, i) => {
            const x = padding + (point.level / 6) * graphWidth;
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
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.level / 6) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(157, 78, 221, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.level / 6) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            const yBloom = canvas.height - padding - (bloomCurve[i].v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, yBloom);
            } else {
                ctx.lineTo(x, yBloom);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + (point.level / 6) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Límite Bloom
        ctx.fillStyle = 'rgba(157, 78, 221, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite Bloom', canvas.width - 155, 32);
        
        // Límite conocimiento
        ctx.fillStyle = 'rgba(0, 168, 255, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite conocimiento', canvas.width - 155, 57);
        
        // Valor real
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Valor educativo real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const bloomValue = bloomValues[bloomLevel];
        const knowledgeValue = knowledgeValues[knowledgeType];
        
        if (bloomValue > knowledgeValue) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Nivel cognitivo alto para tipo de conocimiento (${bloomValue} > ${knowledgeValue})
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Objetivo bien balanceado (Nivel ${bloomLevel}: ${bloomLevels[bloomLevel-1]})
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const bloomLevel = parseInt(document.getElementById('bloomLevelSlider').value);
        const complexity = parseInt(document.getElementById('complexitySlider').value);
        const assessabilityPercent = parseInt(document.getElementById('assessabilitySlider').value) / 100;
        const knowledgeType = document.querySelector('.knowledge-type-btn.active').dataset.type;
        
        const levels = ['Recordar (Nivel 1)', 'Comprender (Nivel 2)', 'Aplicar (Nivel 3)', 'Analizar (Nivel 4)', 'Evaluar (Nivel 5)', 'Crear (Nivel 6)'];
        const knowledgeNames = {
            'factual': 'Conocimiento Factual',
            'conceptual': 'Conocimiento Conceptual',
            'procedimental': 'Conocimiento Procedimental',
            'metacognitive': 'Conocimiento Metacognitivo'
        };
        
        const complexityLabels = ['Muy Baja', 'Baja', 'Media-Baja', 'Media', 'Media-Alta', 'Alta', 'Muy Alta', 'Compleja', 'Muy Compleja', 'Extrema'];
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Análisis de Objetivo de Aprendizaje
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Nivel Cognitivo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-educational);">${levels[bloomLevel-1]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Conocimiento</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${knowledgeNames[knowledgeType]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Complejidad</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${complexityLabels[complexity-1]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Evaluabilidad</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(assessabilityPercent*100).toFixed(0)}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de valor educativo y aplicabilidad</span><br>
                            <span class="code-keyword">Valor máximo nivel:</span> ${[10, 25, 45, 65, 85, 100][bloomLevel-1]} puntos<br>
                            <span class="code-keyword">Valor máximo conocimiento:</span> ${knowledgeType === 'factual' ? 15 : knowledgeType === 'conceptual' ? 40 : knowledgeType === 'procedimental' ? 70 : 90} puntos<br>
                            <span class="code-keyword">Ajuste por complejidad:</span> ${(complexity/10*100).toFixed(0)}%<br>
                            <span class="code-keyword">Ajuste por evaluabilidad:</span> ${(assessabilityPercent*100).toFixed(0)}%<br>
                            <span class="code-keyword">Puntuación final:</span> ${Math.min([10, 25, 45, 65, 85, 100][bloomLevel-1], knowledgeType === 'factual' ? 15 : knowledgeType === 'conceptual' ? 40 : knowledgeType === 'procedimental' ? 70 : 90) * (complexity/10) * assessabilityPercent} puntos
                        </div>
                        
                        <div style="margin-top: 1.5rem;">
                            <h4 style="margin-bottom: 0.8rem; color: var(--accent-educational);">
                                <i class="fas fa-lightbulb"></i> Ejemplo de objetivo generado:
                            </h4>
                            <div style="background: rgba(157, 78, 221, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--accent-educational);">
                                <p style="font-style: italic;">"El estudiante será capaz de <strong>${getVerbForLevel(bloomLevel)}</strong> ${getExampleForKnowledge(knowledgeType)} mediante ${getMethodForComplexity(complexity)}, demostrando ${getAssessmentForLevel(bloomLevel, assessabilityPercent)}."</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="exportDataBtn" style="min-width: 200px;">
                            <i class="fas fa-download"></i> Exportar Análisis
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
            alert('Análisis de objetivo exportado');
            modal.remove();
        });
        
        // Funciones auxiliares para ejemplos
        function getVerbForLevel(level) {
            const verbs = [
                ['identificar', 'listar', 'describir'],
                ['explicar', 'comparar', 'resumir'],
                ['aplicar', 'demostrar', 'utilizar'],
                ['analizar', 'diferenciar', 'organizar'],
                ['evaluar', 'criticar', 'juzgar'],
                ['diseñar', 'crear', 'desarrollar']
            ];
            return verbs[level-1][Math.floor(Math.random() * verbs[level-1].length)];
        }
        
        function getExampleForKnowledge(type) {
            const examples = {
                'factual': 'los elementos clave del proceso educativo',
                'conceptual': 'las relaciones entre teoría y práctica pedagógica',
                'procedimental': 'una estrategia de enseñanza efectiva',
                'metacognitive': 'su propio proceso de aprendizaje'
            };
            return examples[type];
        }
        
        function getMethodForComplexity(complexity) {
            if (complexity <= 3) return 'métodos básicos';
            if (complexity <= 6) return 'técnicas estándar';
            return 'enfoques innovadores y críticos';
        }
        
        function getAssessmentForLevel(level, assessability) {
            if (assessability < 0.5) return 'una comprensión incipiente';
            if (level <= 2) return 'comprensión básica';
            if (level <= 4) return 'aplicación práctica';
            return 'dominio avanzado y capacidad de innovación';
        }
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        if (simulateEvolutionBtn) {
            simulateEvolutionBtn.addEventListener('click', simulatePedagogicalEvolution);
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

    // Función para simulación de evolución pedagógica
    function simulatePedagogicalEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución pedagógica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1948: Inicio del proyecto de clasificación...",
            "1956: Publicación original de Bloom...",
            "1964: Primeras aplicaciones en currículos...",
            "1972: Taxonomía del dominio afectivo...",
            "1985: Adopción global en educación superior...",
            "2001: Revisión de Anderson y Krathwohl...",
            "2008: Taxonomía Digital de Churches...",
            "2015: Integración con tecnología educativa...",
            "Presente: Adaptación a IA y aprendizaje personalizado"
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
            showPedagogicalEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 7200);
    }

    // Función para mostrar resultados de evolución pedagógica
    function showPedagogicalEvolutionResults() {
        const results = [
            { type: 'Años de vigencia', value: '65+', color: '#9d4edd', icon: 'fa-calendar-alt' },
            { type: 'Países que usan', value: '100+', color: '#00a8ff', icon: 'fa-globe' },
            { type: 'Traducciones', value: '40+', color: '#00d4aa', icon: 'fa-language' },
            { type: 'Instituciones', value: '10⁵+', color: '#4ade80', icon: 'fa-university' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Impacto Global de la Taxonomía de Bloom
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de la Taxonomía de Bloom en la educación mundial desde 1956 hasta la actualidad:</p>
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
                        <i class="fas fa-history"></i> Ver Línea de Tiempo Detallada
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
            alert('Mostrando línea de tiempo detallada de la evolución de la Taxonomía de Bloom');
            modal.remove();
        });
    }

    // Función para mostrar detalle de teórico
    function showTheoristDetail(theorist) {
        const details = {
            'Benjamin Bloom': {
                contribution: 'Desarrollo de la taxonomía original (1956), dominio cognitivo, investigación educativa',
                works: 'Taxonomy of Educational Objectives (1956), Human Characteristics and School Learning',
                timeline: '1913-1999',
                impact: 'Revolucionó el diseño curricular y la evaluación educativa a nivel mundial'
            },
            'Lorin Anderson': {
                contribution: 'Lideró la revisión de 2001, cambio de sustantivos a verbos, reorganización de niveles',
                works: 'A Taxonomy for Learning, Teaching, and Assessing (2001)',
                timeline: 'Activo 1970-presente',
                impact: 'Actualizó la taxonomía para el siglo XXI, haciéndola más accionable'
            },
            'David Krathwohl': {
                contribution: 'Coautor original y de la revisión, especialista en evaluación y dominio afectivo',
                works: 'Taxonomy of Educational Objectives: Affective Domain (1964), Methods of Educational Research',
                timeline: '1921-2016',
                impact: 'Amplió la taxonomía más allá de lo cognitivo, incluyendo dimensiones afectivas'
            },
            'Andrew Churches': {
                contribution: 'Taxonomía de Bloom Digital (2008), integración de habilidades tecnológicas',
                works: 'Bloom\'s Digital Taxonomy, artículos sobre educación y tecnología',
                timeline: 'Activo 2000-presente',
                impact: 'Adaptó la taxonomía a la era digital, relevante para educación contemporánea'
            },
            'John Biggs': {
                contribution: 'Desarrollo del modelo SOLO como alternativa, enfoque en calidad del aprendizaje',
                works: 'Teaching for Quality Learning at University, Evaluating the Quality of Learning',
                timeline: '1934-presente',
                impact: 'Ofreció perspectiva complementaria centrada en resultados de aprendizaje observables'
            },
            'Fink, Dee': {
                contribution: 'Taxonomía del Aprendizaje Significativo (2003), enfoque holístico de la educación',
                works: 'Creating Significant Learning Experiences, Self-Directed Guide to Designing Courses',
                timeline: 'Activo 1980-presente',
                impact: 'Complementó Bloom con dimensiones humanas y de cuidado en el aprendizaje'
            }
        };
        
        const theoristDetails = details[theorist.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTheoristModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${theorist.color}; margin-right: 1rem;">
                        <i class="fas ${theorist.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${theorist.color};">${theorist.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${theorist.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${theorist.color};">
                            <i class="fas fa-info-circle"></i> Detalles del Teórico:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${theoristDetails.contribution ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${theoristDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${theoristDetails.works ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Obras Principales</div>
                                    <div style="font-weight: 600;">${theoristDetails.works}</div>
                                </div>
                            ` : ''}
                            
                            ${theoristDetails.timeline ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${theoristDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${theoristDetails.impact ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en Educación</div>
                                    <div style="font-weight: 600;">${theoristDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${theorist.title} - Relación con la Taxonomía de Bloom</span><br>
                        <span class="code-keyword">Nivel de influencia:</span> ${theorist.status}<br>
                        <span class="code-keyword">Énfasis principal:</span> ${theorist.contribution}<br>
                        <span class="code-keyword">Contexto histórico:</span> ${theoristDetails.timeline ? theoristDetails.timeline.split('-')[0] : 'Siglo XX'}<br>
                        <span class="code-keyword">Legado actual:</span> ${theoristDetails.impact ? theoristDetails.impact.substring(0, 80) + '...' : 'Contribución significativa a la educación'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${theorist.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeTheoristModal').addEventListener('click', () => {
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
    console.log('Aplicación Taxonomía de Bloom inicializada correctamente');
});