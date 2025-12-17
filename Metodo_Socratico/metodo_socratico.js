document.addEventListener('DOMContentLoaded', function() {
    console.log('Método Socrático: Inicializando aplicación...');
    
    // Datos de aplicaciones del método socrático
    const applicationsData = [
        {
            icon: 'fa-graduation-cap',
            title: 'Educación',
            description: 'Desarrollo del pensamiento crítico en estudiantes mediante diálogos guiados y método de casos.',
            color: '#9d4edd',
            status: 'Activo',
            area: 'Pedagogía'
        },
        {
            icon: 'fa-heart',
            title: 'Psicoterapia',
            description: 'Terapia cognitiva socrática para cuestionar creencias irracionales y pensamientos distorsionados.',
            color: '#0077b6',
            status: 'Activo',
            area: 'Salud Mental'
        },
        {
            icon: 'fa-balance-scale',
            title: 'Derecho',
            description: 'Método socrático en facultades de derecho para desarrollar razonamiento jurídico y argumentación.',
            color: '#ff9e00',
            status: 'Activo',
            area: 'Jurisprudencia'
        },
        {
            icon: 'fa-handshake',
            title: 'Ética Aplicada',
            description: 'Diálogos bioéticos y comités de ética para resolver dilemas morales complejos.',
            color: '#00d4aa',
            status: 'Activo',
            area: 'Filosofía Práctica'
        },
        {
            icon: 'fa-robot',
            title: 'Inteligencia Artificial',
            description: 'Chatbots socráticos para desarrollo de razonamiento y tutorías inteligentes.',
            color: '#ff6b6b',
            status: 'Emergente',
            area: 'Tecnología'
        },
        {
            icon: 'fa-users',
            title: 'Resolución de Conflictos',
            description: 'Diálogos socráticos para mediación y comprensión mutua en disputas.',
            color: '#4ade80',
            status: 'Activo',
            area: 'Mediación'
        }
    ];

    // Temas para diálogos socráticos
    const dialogueTopics = [
        "¿Qué es la justicia?",
        "¿Qué es el coraje?",
        "¿Qué es la felicidad?",
        "¿Qué es la virtud?",
        "¿Qué es el conocimiento?"
    ];

    // Inicializar componentes
    initThoughtParticles();
    initApplications();
    initEventListeners();
    initAnimations();
    initTimeline();
    initDialogueSimulation();

    // Función para inicializar partículas de pensamiento
    function initThoughtParticles() {
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
                let color, size, speed, shape;
                
                if (type < 0.6) {
                    // Partículas de pensamiento (moradas)
                    color = `rgba(157, 78, 221, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                    shape = 'circle';
                } else if (type < 0.85) {
                    // Partículas de pregunta (naranja)
                    color = `rgba(255, 158, 0, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                    shape = 'triangle';
                } else {
                    // Partículas de idea (verde)
                    color = `rgba(0, 212, 170, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.4;
                    shape = 'square';
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
                    shape: shape,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de pensamiento sutil
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
                particle.rotation += particle.rotationSpeed;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.4 + 0.6;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula según su forma
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                
                ctx.beginPath();
                
                // Forma diferente según tipo
                if (particle.shape === 'triangle') {
                    // Triángulos para preguntas
                    ctx.moveTo(0, -particle.size);
                    ctx.lineTo(-particle.size * 0.866, particle.size * 0.5);
                    ctx.lineTo(particle.size * 0.866, particle.size * 0.5);
                    ctx.closePath();
                } else if (particle.shape === 'square') {
                    // Cuadrados para ideas
                    ctx.rect(-particle.size/2, -particle.size/2, particle.size, particle.size);
                } else {
                    // Círculos para pensamientos
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.shape !== 'circle') {
                    const gradient = ctx.createRadialGradient(
                        0, 0, 0,
                        0, 0, particle.size * 3
                    );
                    
                    if (particle.shape === 'triangle') {
                        gradient.addColorStop(0, `rgba(255, 158, 0, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 158, 0, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(0, 212, 170, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(0, 212, 170, 0)');
                    }
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                ctx.restore();
            });
            
            // Conectar partículas cercanas
            ctx.strokeStyle = 'rgba(157, 78, 221, 0.05)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        
        resizeCanvas();
        createParticles();
        animateParticles();
        console.log('Partículas de pensamiento inicializadas');
    }

    // Función para inicializar aplicaciones
    function initApplications() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de aplicaciones no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        applicationsData.forEach(application => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${application.color};">
                        <i class="fas ${application.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${application.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${application.color}20; color: ${application.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${application.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Área: ${application.area}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${application.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showApplicationDetail(application));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Aplicaciones inicializadas: ' + applicationsData.length);
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

    // Función para inicializar simulación de diálogo
    function initDialogueSimulation() {
        console.log('Inicializando simulación de diálogo socrático...');
        
        // Elementos del DOM
        const topicSlider = document.getElementById('topicSlider');
        const topicValue = document.getElementById('topicValue');
        const questioningSlider = document.getElementById('questioningSlider');
        const questioningValue = document.getElementById('questioningValue');
        const depthSlider = document.getElementById('depthSlider');
        const depthValue = document.getElementById('depthValue');
        const dialogueLevelButtons = document.querySelectorAll('.dialogue-level-btn');
        const runDialogueBtn = document.getElementById('runDialogueBtn');
        const resetDialogueBtn = document.getElementById('resetDialogueBtn');
        const showAnalysisBtn = document.getElementById('showAnalysisBtn');
        const canvas = document.getElementById('dialogueFlowCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !topicSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        topicSlider.addEventListener('input', function() {
            topicValue.textContent = dialogueTopics[this.value - 1];
        });
        
        questioningSlider.addEventListener('input', function() {
            questioningValue.textContent = `${this.value}%`;
        });
        
        depthSlider.addEventListener('input', function() {
            depthValue.textContent = `${this.value}%`;
        });
        
        // Botones de nivel de diálogo
        dialogueLevelButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                dialogueLevelButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runDialogueBtn.addEventListener('click', function() {
            runDialogueSimulation();
        });
        
        // Reiniciar simulación
        resetDialogueBtn.addEventListener('click', function() {
            topicSlider.value = 3;
            topicValue.textContent = dialogueTopics[2];
            questioningSlider.value = 70;
            questioningValue.textContent = '70%';
            depthSlider.value = 65;
            depthValue.textContent = '65%';
            dialogueLevelButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-level="beginner"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">El diálogo socrático avanza desde definiciones superficiales hacia conceptos más profundos y fundamentales</div>';
            
            // Ejecutar simulación con valores por defecto
            runDialogueSimulation();
        });
        
        // Mostrar análisis
        showAnalysisBtn.addEventListener('click', function() {
            showDialogueAnalysis();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runDialogueSimulation();
        }, 500);
        
        console.log('Simulación de diálogo inicializada');
    }

    // Función para ejecutar simulación de diálogo
    function runDialogueSimulation() {
        const canvas = document.getElementById('dialogueFlowCanvas');
        const ctx = canvas.getContext('2d');
        const topicIndex = parseInt(document.getElementById('topicSlider').value) - 1;
        const questioning = parseInt(document.getElementById('questioningSlider').value) / 100;
        const depth = parseInt(document.getElementById('depthSlider').value) / 100;
        const dialogueLevel = document.querySelector('.dialogue-level-btn.active').dataset.level;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (turnos de diálogo)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (profundidad conceptual)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Turnos de Diálogo', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Profundidad Conceptual', 0, 0);
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
            ctx.fillText((i * 2).toString(), x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 20;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value.toString() + '%', padding - 30, y + 3);
        }
        
        // Generar curva de diálogo
        const points = 10;
        const socraticCurve = [];
        const naiveCurve = [];
        const actualCurve = [];
        
        // Niveles de dificultad
        const levelFactors = {
            'beginner': 0.5,
            'intermediate': 0.7,
            'advanced': 0.85,
            'expert': 1.0
        };
        
        const levelFactor = levelFactors[dialogueLevel];
        
        for (let i = 0; i <= points; i++) {
            const turn = i;
            
            // Curva socrática ideal
            const v_socratic = 20 + (80 * (1 - Math.exp(-turn * 0.3)));
            
            // Curva de diálogo ingenuo
            const v_naive = 40 + (30 * Math.sin(turn * 0.5));
            
            // Curva real (considera parámetros)
            let v_actual = v_socratic * levelFactor;
            
            // Ajustar según intensidad de cuestionamiento
            v_actual *= questioning;
            
            // Ajustar según profundidad
            v_actual *= (0.5 + depth * 0.5);
            
            // Variabilidad aleatoria
            v_actual *= (0.9 + Math.random() * 0.2);
            
            socraticCurve.push({turn: turn, v: v_socratic});
            naiveCurve.push({turn: turn, v: v_naive});
            actualCurve.push({turn: turn, v: v_actual});
        }
        
        // Dibujar curva socrática ideal
        ctx.strokeStyle = 'rgba(157, 78, 221, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        socraticCurve.forEach((point, i) => {
            const x = padding + (point.turn / points) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva de diálogo ingenuo
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        naiveCurve.forEach((point, i) => {
            const x = padding + (point.turn / points) * graphWidth;
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
            const x = padding + (point.turn / points) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar puntos en la curva real
        actualCurve.forEach((point, i) => {
            const x = padding + (point.turn / points) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
            ctx.fill();
            
            // Etiquetas para algunos puntos
            if (i % 3 === 0) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = '9px Inter';
                ctx.fillText(`${Math.round(point.v)}%`, x + 8, y - 8);
            }
        });
        
        // Dibujar área bajo la curva
        ctx.fillStyle = 'rgba(157, 78, 221, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.turn / points) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            const yBottom = canvas.height - padding;
            
            if (i === 0) {
                ctx.moveTo(x, yBottom);
            }
            
            ctx.lineTo(x, y);
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + (point.turn / points) * graphWidth;
            const yBottom = canvas.height - padding;
            ctx.lineTo(x, yBottom);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Diálogo socrático ideal
        ctx.fillStyle = 'rgba(157, 78, 221, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Diálogo socrático ideal', canvas.width - 155, 32);
        
        // Diálogo ingenuo
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Diálogo sin método', canvas.width - 155, 57);
        
        // Diálogo simulado
        ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Diálogo simulado', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const finalDepth = actualCurve[actualCurve.length - 1].v;
        const improvement = ((finalDepth - actualCurve[0].v) / actualCurve[0].v) * 100;
        
        if (improvement > 50) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Diálogo efectivo: profundidad aumentó ${Math.round(improvement)}%
                </div>
            `;
        } else if (improvement > 20) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-light);">
                    <i class="fas fa-chart-line" style="margin-right: 0.5rem;"></i>
                    Diálogo moderado: profundidad aumentó ${Math.round(improvement)}%
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Diálogo limitado: profundidad aumentó solo ${Math.round(improvement)}%
                </div>
            `;
        }
    }

    // Función para mostrar análisis de diálogo
    function showDialogueAnalysis() {
        const topicIndex = parseInt(document.getElementById('topicSlider').value) - 1;
        const questioning = parseInt(document.getElementById('questioningSlider').value) / 100;
        const depth = parseInt(document.getElementById('depthSlider').value) / 100;
        const dialogueLevel = document.querySelector('.dialogue-level-btn.active').dataset.level;
        
        const topic = dialogueTopics[topicIndex];
        const levelNames = {
            'beginner': 'Principiante',
            'intermediate': 'Intermedio',
            'advanced': 'Avanzado',
            'expert': 'Experto'
        };
        
        // Calcular métricas
        const effectiveness = Math.round((questioning * depth * 100));
        const estimatedTurns = Math.round(5 + questioning * 10);
        const aporiaProbability = Math.round(questioning * 80);
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeAnalysisModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Análisis del Diálogo Socrático
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tema del Diálogo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${topic}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Nivel de Dificultad</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${levelNames[dialogueLevel]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Efectividad Estimada</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${effectiveness}%</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Turnos Estimados</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${estimatedTurns}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Métricas del diálogo socrático simulado</span><br>
                            <span class="code-keyword">Intensidad de cuestionamiento:</span> ${Math.round(questioning * 100)}%<br>
                            <span class="code-keyword">Profundidad filosófica:</span> ${Math.round(depth * 100)}%<br>
                            <span class="code-keyword">Probabilidad de aporía:</span> ${aporiaProbability}%<br>
                            <span class="code-keyword">Tiempo estimado diálogo:</span> ${Math.round(estimatedTurns * 1.5)} minutos<br>
                            <span class="code-keyword">Preguntas por turno:</span> ${(1 + questioning * 2).toFixed(1)}
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="viewExampleBtn" style="min-width: 200px;">
                            <i class="fas fa-eye"></i> Ver Ejemplo de Diálogo
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal de análisis
        document.getElementById('closeAnalysisModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewExampleBtn').addEventListener('click', () => {
            showDialogueExample(topic, dialogueLevel, effectiveness);
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de diálogo
        const simulateDialogueBtn = document.getElementById('simulateDialogueBtn');
        if (simulateDialogueBtn) {
            simulateDialogueBtn.addEventListener('click', simulateCompleteDialogue);
        }
        
        // Botón de técnicas
        const viewTechniquesBtn = document.getElementById('viewTechniquesBtn');
        if (viewTechniquesBtn) {
            viewTechniquesBtn.addEventListener('click', () => {
                document.getElementById('techniquesModal').classList.add('active');
            });
        }
        
        // Botón de comparación
        const compareMethodsBtn = document.getElementById('compareMethodsBtn');
        if (compareMethodsBtn) {
            compareMethodsBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.add('active');
            });
        }
        
        // Cerrar modales
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                document.getElementById('techniquesModal').classList.remove('active');
            });
        }
        
        const closeCompareModalBtn = document.getElementById('closeCompareModal');
        if (closeCompareModalBtn) {
            closeCompareModalBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.remove('active');
            });
        }
        
        // Cerrar modales al hacer clic fuera
        const techniquesModal = document.getElementById('techniquesModal');
        if (techniquesModal) {
            techniquesModal.addEventListener('click', (e) => {
                if (e.target.id === 'techniquesModal') {
                    techniquesModal.classList.remove('active');
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
                const techniquesModal = document.getElementById('techniquesModal');
                const compareModal = document.getElementById('compareModal');
                
                if (techniquesModal) techniquesModal.classList.remove('active');
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

    // Función para simulación de diálogo completo
    function simulateCompleteDialogue() {
        const btn = document.getElementById('simulateDialogueBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando diálogo socrático...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "Iniciando diálogo sobre la naturaleza de la virtud...",
            "Interlocutor ofrece definición inicial...",
            "Sócrates cuestiona: '¿Podrías definir virtud más precisamente?'...",
            "Interlocutor reformula su definición...",
            "Sócrates plantea contraejemplo...",
            "Interlocutor reconoce contradicción...",
            "Sócrates guía hacia nueva definición...",
            "Interlocutor alcanza estado de aporía...",
            "Diálogo concluye con mayor claridad conceptual"
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${steps[step]}`;
                step++;
            }
        }, 1000);
        
        // Simular proceso completo
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showDialogueResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 9000);
    }

    // Función para mostrar resultados de diálogo
    function showDialogueResults() {
        const results = [
            { type: 'Profundidad alcanzada', value: '78%', color: '#9d4edd', icon: 'fa-chart-line' },
            { type: 'Turnos de diálogo', value: '12', color: '#ff9e00', icon: 'fa-exchange-alt' },
            { type: 'Preguntas formuladas', value: '24', color: '#00d4aa', icon: 'fa-question-circle' },
            { type: 'Definiciones refinadas', value: '3', color: '#4ade80', icon: 'fa-search' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDialogueModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-comments"></i> Resultados del Diálogo Socrático
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación completada. El diálogo socrático simulado ha seguido el patrón clásico de ironía, mayéutica y elenchus:</p>
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
                    <button class="btn" id="viewDialogueBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-scroll"></i> Ver Transcripción Completa
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal de diálogo
        document.getElementById('closeDialogueModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewDialogueBtn').addEventListener('click', () => {
            showFullDialogueTranscript();
            modal.remove();
        });
    }

    // Función para mostrar detalle de aplicación
    function showApplicationDetail(application) {
        const details = {
            'Educación': {
                techniques: 'Diálogos guiados, método de casos, preguntas socráticas en aula, debate estructurado',
                examples: 'Clases de filosofía en secundaria, método Harvard de casos en derecho, tutorías individualizadas',
                effectiveness: '92% mejora en pensamiento crítico',
                research: 'Estudios muestran aumento del 40% en retención conceptual'
            },
            'Psicoterapia': {
                techniques: 'Cuestionamiento socrático, reestructuración cognitiva, diálogo terapéutico',
                examples: 'Terapia cognitivo-conductual, tratamiento de depresión y ansiedad, terapia racional emotiva',
                effectiveness: '78% reducción en pensamientos irracionales',
                research: 'Meta-análisis confirma eficacia en trastornos de ansiedad'
            },
            'Derecho': {
                techniques: 'Método socrático en aulas, análisis de casos, argumentación jurídica',
                examples: 'Facultades de derecho estadounidenses, entrenamiento de abogados, moots court',
                effectiveness: '85% de facultades lo utilizan',
                research: 'Desarrolla habilidades de argumentación superiores'
            },
            'Ética Aplicada': {
                techniques: 'Diálogos bioéticos, comités de ética hospitalaria, deliberación moral',
                examples: 'Comités de bioética, ética empresarial, consultoría ética en organizaciones',
                effectiveness: '67% mejores decisiones éticas',
                research: 'Aumenta consideración de perspectivas múltiples'
            },
            'Inteligencia Artificial': {
                techniques: 'Chatbots socráticos, tutorías inteligentes, sistemas de razonamiento',
                examples: 'Asistentes educativos IA, sistemas de tutoría adaptativa, chatbots filosóficos',
                effectiveness: '45% mejora en aprendizaje autónomo',
                research: 'Nuevo campo en IA educativa y sistemas expertos'
            },
            'Resolución de Conflictos': {
                techniques: 'Diálogo facilitado, mediación socrática, preguntas para comprensión mutua',
                examples: 'Mediación comunitaria, resolución de disputas laborales, diálogos interculturales',
                effectiveness: '73% de conflictos resueltos satisfactoriamente',
                research: 'Reduce polarización y aumenta empatía'
            }
        };
        
        const applicationDetails = details[application.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeApplicationModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${application.color}; margin-right: 1rem;">
                        <i class="fas ${application.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${application.color};">${application.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${application.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${application.color};">
                            <i class="fas fa-info-circle"></i> Detalles de Aplicación:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${applicationDetails.techniques ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Técnicas Utilizadas</div>
                                    <div style="font-weight: 600;">${applicationDetails.techniques}</div>
                                </div>
                            ` : ''}
                            
                            ${applicationDetails.examples ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Ejemplos Prácticos</div>
                                    <div style="font-weight: 600;">${applicationDetails.examples}</div>
                                </div>
                            ` : ''}
                            
                            ${applicationDetails.effectiveness ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Efectividad</div>
                                    <div style="font-weight: 600;">${applicationDetails.effectiveness}</div>
                                </div>
                            ` : ''}
                            
                            ${applicationDetails.research ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Investigación</div>
                                    <div style="font-weight: 600;">${applicationDetails.research}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${application.title} - Implementación del método socrático</span><br>
                        <span class="code-keyword">Técnicas clave:</span> Preguntas de clarificación, supuestos, evidencias, perspectivas<br>
                        <span class="code-keyword">Objetivo principal:</span> Desarrollo de pensamiento crítico y autoexamen<br>
                        <span class="code-keyword">Estado actual:</span> ${application.status} en el campo de ${application.area}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${application.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeApplicationModal').addEventListener('click', () => {
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

    // Función para mostrar ejemplo de diálogo
    function showDialogueExample(topic, level, effectiveness) {
        const examples = {
            '¿Qué es la justicia?': [
                "Sócrates: ¿Qué es la justicia, según tú?",
                "Interlocutor: Dar a cada uno lo que merece.",
                "Sócrates: ¿Y quién determina lo que merece cada uno?",
                "Interlocutor: Las leyes y los jueces.",
                "Sócrates: ¿Y si las leyes son injustas? ¿Sigue siendo justo obedecerlas?",
                "Interlocutor: [Piensa] Bueno, tal vez no...",
                "Sócrates: Entonces, ¿la justicia no es simplemente obedecer leyes?",
                "Interlocutor: Parece que no. Quizás la justicia es dar a cada uno según su necesidad.",
                "Sócrates: ¿Y si alguien necesita algo que perjudica a otros? ¿Sigue siendo justo?",
                "Interlocutor: Ahora estoy confundido. No sé exactamente qué es la justicia."
            ],
            '¿Qué es el coraje?': [
                "Sócrates: ¿Qué entiendes por coraje?",
                "Interlocutor: No tener miedo ante el peligro.",
                "Sócrates: ¿Un loco que no teme al peligro es valiente?",
                "Interlocutor: No, el coraje requiere conciencia del peligro.",
                "Sócrates: Entonces, ¿el coraje es saber cuándo enfrentar y cuándo evitar el peligro?",
                "Interlocutor: Sí, eso parece más preciso.",
                "Sócrates: ¿Y ese conocimiento no sería más sabiduría que coraje?",
                "Interlocutor: Tal vez el coraje sea aplicar la sabiduría en situaciones peligrosas.",
                "Sócrates: ¿Podría entonces el coraje ser una forma de sabiduría práctica?",
                "Interlocutor: Eso suena razonable, pero necesito pensarlo más."
            ]
        };
        
        const dialogue = examples[topic] || examples['¿Qué es la justicia?'];
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeExampleModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-comments"></i> Ejemplo de Diálogo Socrático
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Tema:</strong> ${topic} | <strong>Nivel:</strong> ${level} | <strong>Efectividad:</strong> ${effectiveness}%</p>
                </div>
                <div class="code-container" style="max-height: 300px; overflow-y: auto; margin: 1.5rem 0;">
                    ${dialogue.map((line, index) => `
                        <span class="${line.startsWith('Sócrates') ? 'code-keyword' : 'code-function'}">${line}</span><br>
                    `).join('')}
                    <span class="code-comment"># El diálogo continúa hasta alcanzar mayor claridad conceptual o aporía</span>
                </div>
                <div style="margin-top: 1.5rem;">
                    <h4 style="color: var(--accent); margin-bottom: 0.5rem;">Análisis del Diálogo:</h4>
                    <ul class="theory-list">
                        <li><strong>Ironía socrática:</strong> Sócrates comienza reconociendo su propia ignorancia</li>
                        <li><strong>Elenchus (refutación):</strong> Encuentra contradicciones en las definiciones iniciales</li>
                        <li><strong>Mayéutica:</strong> Guía al interlocutor a "dar a luz" definiciones más precisas</li>
                        <li><strong>Aporía:</strong> El diálogo concluye con reconocimiento de ignorancia como punto de partida</li>
                    </ul>
                </div>
                <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn" id="closeExampleBtn" style="min-width: 200px;">
                        <i class="fas fa-check"></i> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeExampleModal').addEventListener('click', () => {
            modal.remove();
        });
        
        document.getElementById('closeExampleBtn').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Función para mostrar transcripción completa de diálogo
    function showFullDialogueTranscript() {
        const transcript = `
            DIÁLOGO SOBRE LA NATURALEZA DE LA VIRTUD
            (Simulación basada en los diálogos de Platón)
            
            Personajes: Sócrates (S) e Interlocutor (I)
            
            S: Me han dicho que eres un hombre virtuoso. ¿Podrías decirme qué es la virtud?
            
            I: La virtud es actuar correctamente, de acuerdo con las leyes y costumbres.
            
            S: Interesante. ¿Y si las leyes de una ciudad son injustas? ¿Seguirías siendo virtuoso al obedecerlas?
            
            I: Buen punto. Tal vez la virtud sea actuar según la razón y la moral, no solo las leyes.
            
            S: Me gusta esa definición. ¿Podrías darme un ejemplo de acción virtuosa según esta definición?
            
            I: Ayudar a alguien en necesidad, incluso cuando no hay ley que lo exija.
            
            S: Excelente ejemplo. Ahora, si un médico ayuda a un paciente, ¿es esa acción virtuosa?
            
            I: Sí, por supuesto.
            
            S: ¿Y si el médico cobra una suma exorbitante por esa ayuda? ¿Sigue siendo virtuoso?
            
            I: Quizás no. La virtud parece requerir cierta intención desinteresada.
            
            S: Entonces la virtud no está solo en la acción, sino también en la intención detrás de ella.
            
            I: Exactamente.
            
            S: Pero, ¿qué pasa con alguien que tiene buenas intenciones pero causa daño por ignorancia? ¿Es virtuoso?
            
            I: No, porque la virtud parece requerir tanto buena intención como conocimiento correcto.
            
            S: Entonces, ¿podríamos decir que la virtud es actuar con buena intención y conocimiento correcto?
            
            I: Sí, eso parece más completo.
            
            S: Pero si la virtud requiere conocimiento, ¿no sería entonces la virtud un tipo de conocimiento?
            
            I: Parece que sí.
            
            S: Y si es conocimiento, ¿se puede enseñar?
            
            I: [Pausa larga] Ahora estoy confundido. Creía saber qué era la virtud, pero veo que es más complejo de lo que pensaba.
            
            S: Ese reconocimiento de no saber es el comienzo de la verdadera sabiduría. Continuemos explorando...
        `;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTranscriptModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-scroll"></i> Transcripción Completa del Diálogo
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Diálogo socrático simulado sobre la naturaleza de la virtud:</p>
                </div>
                <div class="code-container" style="max-height: 400px; overflow-y: auto; margin: 1.5rem 0; font-family: var(--font-main); white-space: pre-line;">
                    ${transcript}
                </div>
                <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn" id="closeTranscriptBtn" style="min-width: 200px;">
                        <i class="fas fa-check"></i> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeTranscriptModal').addEventListener('click', () => {
            modal.remove();
        });
        
        document.getElementById('closeTranscriptBtn').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Mensaje de inicialización completa
    console.log('Aplicación Método Socrático inicializada correctamente');
});