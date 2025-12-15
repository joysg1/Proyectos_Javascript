document.addEventListener('DOMContentLoaded', function() {
    console.log('Potabilización del Agua: Inicializando aplicación...');
    
    // Datos de pioneros y tecnologías importantes
    const pioneersData = [
        {
            icon: 'fa-user-md',
            title: 'Hipócrates',
            description: 'Padre de la medicina. Diseñó la "manga hipocrática" para filtrar agua alrededor del 400 a.C. Reconoció la relación entre agua contaminada y enfermedades.',
            color: '#00b7ff',
            status: 'Histórico',
            contribution: 'Filtración, Salud Pública'
        },
        {
            icon: 'fa-flask',
            title: 'John Snow',
            description: 'Epidemiólogo inglés que vinculó el brote de cólera en Londres (1854) con agua contaminada. Sentó bases científicas para tratamiento de agua.',
            color: '#0088b6',
            status: 'Histórico',
            contribution: 'Epidemiología, Desinfección'
        },
        {
            icon: 'fa-tint',
            title: 'James Simpson',
            description: 'Ingeniero civil que diseñó el primer filtro de arena moderno para Chelsea Waterworks (1829). Estableció principios de filtración lenta.',
            color: '#00d4aa',
            status: 'Histórico',
            contribution: 'Filtración Lenta'
        },
        {
            icon: 'fa-bacterium',
            title: 'Louis Pasteur',
            description: 'Demostró la teoría germinal de las enfermedades. Sus trabajos llevaron a entender la necesidad de desinfección del agua.',
            color: '#4d88ff',
            status: 'Histórico',
            contribution: 'Teoría Germinal'
        },
        {
            icon: 'fa-industry',
            title: 'Abel Wolman',
            description: 'Ingeniero sanitario que desarrolló métodos para cloración y fluoración del agua. Contribuyó a estándares modernos de calidad.',
            color: '#ff6b6b',
            status: 'Histórico',
            contribution: 'Cloración, Estándares'
        },
        {
            icon: 'fa-recycle',
            title: 'Sidney Loeb',
            description: 'Pionero en el desarrollo de membranas de ósmosis inversa comercialmente viables en los años 1960-70.',
            color: '#4ade80',
            status: 'Contemporáneo',
            contribution: 'Ósmosis Inversa'
        }
    ];

    // Inicializar componentes
    initWaterEffects();
    initPioneers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initTreatmentSimulation();

    // Función para inicializar efectos de agua
    function initWaterEffects() {
        const canvas = document.getElementById('water-canvas');
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
                    // Gotas de agua (azules)
                    color = `rgba(0, 183, 255, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.9) {
                    // Burbujas (transparentes)
                    color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Impurezas (ámbar)
                    color = `rgba(255, 203, 107, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.4;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.3,
                    color: color,
                    pulseSpeed: Math.random() * 0.03 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.6 ? 'water' : type < 0.9 ? 'bubble' : 'impurity'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo acuático sutil
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(10, 18, 24, 0.1)');
            gradient.addColorStop(1, 'rgba(5, 12, 18, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Ondas sutiles en el fondo
            ctx.strokeStyle = 'rgba(0, 183, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
                const y = canvas.height * 0.7 + Math.sin(Date.now() * 0.0001 + i) * 20;
                ctx.beginPath();
                ctx.moveTo(0, y + i * 40);
                ctx.bezierCurveTo(
                    canvas.width * 0.3, y + i * 40 + 10,
                    canvas.width * 0.7, y + i * 40 - 10,
                    canvas.width, y + i * 40
                );
                ctx.stroke();
            }
            
            particles.forEach(particle => {
                // Movimiento
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de flotación
                particle.y -= 0.1;
                if (particle.y < -10) particle.y = canvas.height + 10;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula
                ctx.beginPath();
                
                if (particle.type === 'bubble') {
                    // Burbujas como círculos con reflejo
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    ctx.fill();
                    
                    // Reflejo en burbujas
                    ctx.beginPath();
                    ctx.arc(particle.x - particle.size/3, particle.y - particle.size/3, particle.size/3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.5})`;
                    ctx.fill();
                } else if (particle.type === 'water') {
                    // Gotas de agua como elipses verticales
                    ctx.ellipse(particle.x, particle.y, particle.size, particle.size * 1.5, 0, 0, Math.PI * 2);
                    const dropGradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    dropGradient.addColorStop(0, `rgba(0, 183, 255, ${currentAlpha})`);
                    dropGradient.addColorStop(1, `rgba(0, 183, 255, 0)`);
                    ctx.fillStyle = dropGradient;
                    ctx.fill();
                } else {
                    // Impurezas como formas irregulares
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
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
        console.log('Efectos de agua inicializados');
    }

    // Función para inicializar pioneros
    function initPioneers() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de pioneros no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        pioneersData.forEach(pioneer => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${pioneer.color};">
                        <i class="fas ${pioneer.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${pioneer.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${pioneer.color}20; color: ${pioneer.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${pioneer.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${pioneer.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${pioneer.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showPioneerDetail(pioneer));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Pioneros inicializados: ' + pioneersData.length);
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

    // Función para inicializar simulación de tratamiento
    function initTreatmentSimulation() {
        console.log('Inicializando simulación de tratamiento...');
        
        // Elementos del DOM
        const techTypeSlider = document.getElementById('techTypeSlider');
        const techTypeValue = document.getElementById('techTypeValue');
        const contaminationSlider = document.getElementById('contaminationSlider');
        const contaminationValue = document.getElementById('contaminationValue');
        const flowSlider = document.getElementById('flowSlider');
        const flowValue = document.getElementById('flowValue');
        const contaminantTypeButtons = document.querySelectorAll('.contaminant-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('treatmentCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !techTypeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        techTypeSlider.addEventListener('input', function() {
            const techs = ['Filtración Básica', 'Coagulación + Filtración', 'Ósmosis Inversa', 'UV + Carbón Activado', 'Nanofiltración'];
            techTypeValue.textContent = techs[this.value - 1];
        });
        
        contaminationSlider.addEventListener('input', function() {
            const levels = ['Baja', 'Media', 'Alta'];
            contaminationValue.textContent = levels[this.value - 1];
        });
        
        flowSlider.addEventListener('input', function() {
            flowValue.textContent = `${this.value} L/h`;
        });
        
        // Botones de tipo de contaminante
        contaminantTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                contaminantTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runTreatmentSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            techTypeSlider.value = 3;
            techTypeValue.textContent = 'Ósmosis Inversa';
            contaminationSlider.value = 2;
            contaminationValue.textContent = 'Media';
            flowSlider.value = 1000;
            flowValue.textContent = '1000 L/h';
            contaminantTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="bacteria"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">La ósmosis inversa (azul) ofrece la mayor pureza, pero con mayor costo energético</div>';
            
            // Ejecutar simulación con valores por defecto
            runTreatmentSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runTreatmentSimulation();
        }, 500);
        
        console.log('Simulación de tratamiento inicializada');
    }

    // Función para ejecutar simulación de tratamiento
    function runTreatmentSimulation() {
        const canvas = document.getElementById('treatmentCurveCanvas');
        const ctx = canvas.getContext('2d');
        const techType = parseInt(document.getElementById('techTypeSlider').value);
        const contaminationLevel = parseInt(document.getElementById('contaminationSlider').value);
        const flowRate = parseInt(document.getElementById('flowSlider').value);
        const contaminantType = document.querySelector('.contaminant-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (etapas del proceso)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (porcentaje de remoción)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Etapas del Proceso de Tratamiento', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Eficiencia de Remoción (%)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        const stages = ['Entrada', 'Pre-Trat.', 'Coagulación', 'Filtración', 'Desinf.', 'Salida'];
        for (let i = 0; i < stages.length; i++) {
            const x = padding + (i * graphWidth) / (stages.length - 1);
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(stages[i], x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 20;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value.toString(), padding - 25, y + 3);
        }
        
        // Eficiencias por tipo de tecnología
        const techEfficiencies = {
            1: [0, 20, 60, 85, 95, 98],   // Filtración Básica
            2: [0, 40, 85, 95, 99, 99.5], // Coagulación + Filtración
            3: [0, 60, 95, 99.5, 99.9, 99.99], // Ósmosis Inversa
            4: [0, 30, 70, 90, 99.9, 99.99], // UV + Carbón
            5: [0, 50, 90, 98, 99.8, 99.95]  // Nanofiltración
        };
        
        // Factores de contaminante
        const contaminantFactors = {
            'bacteria': 1.0,
            'virus': 0.8,
            'heavy-metals': 1.2,
            'nitrates': 0.9,
            'organic': 1.1
        };
        
        // Factor de nivel de contaminación
        const contaminationFactors = [0.9, 1.0, 0.8]; // Baja, Media, Alta
        
        // Calcular curvas
        const baseCurve = techEfficiencies[techType];
        const actualCurve = [];
        const idealCurve = [];
        
        for (let i = 0; i < baseCurve.length; i++) {
            let efficiency = baseCurve[i];
            
            // Ajustar por tipo de contaminante
            efficiency *= contaminantFactors[contaminantType];
            
            // Ajustar por nivel de contaminación
            efficiency *= contaminationFactors[contaminationLevel - 1];
            
            // Ajustar por caudal (mayor caudal = menor eficiencia)
            const flowFactor = 1 - ((flowRate - 100) / 4900) * 0.3;
            efficiency *= flowFactor;
            
            // Limitar entre 0 y 100
            efficiency = Math.max(0, Math.min(100, efficiency));
            
            actualCurve.push(efficiency);
            idealCurve.push(baseCurve[i]);
        }
        
        // Dibujar curva ideal
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.8)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        idealCurve.forEach((efficiency, i) => {
            const x = padding + (i * graphWidth) / (idealCurve.length - 1);
            const y = canvas.height - padding - (efficiency / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar curva real
        ctx.strokeStyle = 'rgba(0, 183, 255, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((efficiency, i) => {
            const x = padding + (i * graphWidth) / (actualCurve.length - 1);
            const y = canvas.height - padding - (efficiency / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(0, 183, 255, 0.15)';
        ctx.beginPath();
        
        idealCurve.forEach((efficiency, i) => {
            const x = padding + (i * graphWidth) / (idealCurve.length - 1);
            const y = canvas.height - padding - (efficiency / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const efficiency = actualCurve[i];
            const x = padding + (i * graphWidth) / (actualCurve.length - 1);
            const y = canvas.height - padding - (efficiency / 100) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Curva ideal
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Eficiencia ideal', canvas.width - 155, 32);
        
        // Curva real
        ctx.fillStyle = 'rgba(0, 183, 255, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Eficiencia real', canvas.width - 155, 57);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const finalEfficiency = actualCurve[actualCurve.length - 1];
        const idealFinalEfficiency = idealCurve[idealCurve.length - 1];
        
        if (finalEfficiency < 99) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Eficiencia limitada (${finalEfficiency.toFixed(1)}% < 99%)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Alta eficiencia alcanzada (${finalEfficiency.toFixed(1)}%)
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const techType = parseInt(document.getElementById('techTypeSlider').value);
        const contaminationLevel = parseInt(document.getElementById('contaminationSlider').value);
        const flowRate = parseInt(document.getElementById('flowSlider').value);
        const contaminantType = document.querySelector('.contaminant-type-btn.active').dataset.type;
        
        const techs = ['Filtración Básica', 'Coagulación + Filtración', 'Ósmosis Inversa', 'UV + Carbón Activado', 'Nanofiltración'];
        const contaminantNames = {
            'bacteria': 'Bacterias (E. coli)',
            'virus': 'Virus entéricos',
            'heavy-metals': 'Metales Pesados',
            'nitrates': 'Nitratos',
            'organic': 'Compuestos Orgánicos'
        };
        
        const contaminationLevels = ['Baja', 'Media', 'Alta'];
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Tratamiento
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 40, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tecnología</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${techs[techType-1]}</div>
                            </div>
                            <div style="background: rgba(30, 40, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Contaminante</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${contaminantNames[contaminantType]}</div>
                            </div>
                            <div style="background: rgba(30, 40, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Nivel Contaminación</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${contaminationLevels[contaminationLevel-1]}</div>
                            </div>
                            <div style="background: rgba(30, 40, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Caudal</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${flowRate} L/h</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de eficiencia de tratamiento</span><br>
                            <span class="code-keyword">Eficiencia máxima teórica:</span> ${[98, 99.5, 99.99, 99.99, 99.95][techType-1]}%<br>
                            <span class="code-keyword">Factor contaminante:</span> ${contaminantType === 'bacteria' ? 1.0 : contaminantType === 'virus' ? 0.8 : contaminantType === 'heavy-metals' ? 1.2 : contaminantType === 'nitrates' ? 0.9 : 1.1}<br>
                            <span class="code-keyword">Factor caudal:</span> ${(1 - ((flowRate - 100) / 4900) * 0.3).toFixed(2)}<br>
                            <span class="code-keyword">Consumo energético estimado:</span> ${[0.1, 0.3, 3.0, 0.5, 1.5][techType-1]} kWh/m³
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
            simulateEvolutionBtn.addEventListener('click', simulateHistoricalEvolution);
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
            "2000 a.C.: Filtración con carbón vegetal en Egipto...",
            "400 a.C.: Manga hipocrática para filtrar agua...",
            "1804: Primera planta de filtración en Paisley, Escocia...",
            "1854: John Snow vincula cólera con agua contaminada...",
            "1908: Primera cloración sistemática en Jersey City...",
            "1970: Desarrollo de ósmosis inversa comercial...",
            "1990: Sistemas UV y ozono para desinfección...",
            "2010: Nanotecnología y tratamientos avanzados...",
            "Presente: Sostenibilidad y economía circular en tratamiento"
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
            showHistoricalEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 7200);
    }

    // Función para mostrar resultados de evolución histórica
    function showHistoricalEvolutionResults() {
        const results = [
            { type: 'Reducción mortalidad', value: '99%', color: '#00b7ff', icon: 'fa-heartbeat' },
            { type: 'Años de evolución', value: '4000+', color: '#00d4aa', icon: 'fa-history' },
            { type: 'Personas beneficiadas', value: '5.8B', color: '#4d88ff', icon: 'fa-users' },
            { type: 'Enfermedades prevenidas', value: '200+', color: '#4ade80', icon: 'fa-shield-alt' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Impacto Histórico de la Potabilización
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de las tecnologías de potabilización en la salud pública desde las civilizaciones antiguas hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución de la potabilización');
            modal.remove();
        });
    }

    // Función para mostrar detalle de pionero
    function showPioneerDetail(pioneer) {
        const details = {
            'Hipócrates': {
                contribution: 'Manga hipocrática (primer filtro documentado), teoría de los humores',
                timeline: '460 a.C. - 370 a.C.',
                impact: 'Estableció la relación entre agua limpia y salud',
                innovations: 'Filtración con tela, ebullición del agua'
            },
            'John Snow': {
                contribution: 'Investigación epidemiológica del brote de cólera en Londres (1854)',
                timeline: '1813 - 1858',
                impact: 'Demostró científicamente la transmisión de enfermedades por agua',
                innovations: 'Mapas epidemiológicos, análisis de fuentes de agua'
            },
            'James Simpson': {
                contribution: 'Diseño del primer filtro de arena moderno para suministro público',
                timeline: '1799 - 1869',
                impact: 'Primera planta de tratamiento de agua a gran escala',
                innovations: 'Filtración lenta en arena, diseño de plantas de tratamiento'
            },
            'Louis Pasteur': {
                contribution: 'Teoría germinal de las enfermedades, pasteurización',
                timeline: '1822 - 1895',
                impact: 'Fundamentos científicos para la desinfección del agua',
                innovations: 'Esterilización, comprensión de microorganismos patógenos'
            },
            'Abel Wolman': {
                contribution: 'Desarrollo de métodos para cloración y fluoración del agua',
                timeline: '1892 - 1989',
                impact: 'Establecimiento de estándares modernos de calidad del agua',
                innovations: 'Dosificación química, control de calidad sistemático'
            },
            'Sidney Loeb': {
                contribution: 'Desarrollo de membranas de ósmosis inversa comercialmente viables',
                timeline: '1917 - 2008',
                impact: 'Habilitó la desalinización a gran escala',
                innovations: 'Membranas asimétricas, procesos de separación por membranas'
            }
        };
        
        const pioneerDetails = details[pioneer.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closePioneerModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${pioneer.color}; margin-right: 1rem;">
                        <i class="fas ${pioneer.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${pioneer.color};">${pioneer.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${pioneer.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${pioneer.color};">
                            <i class="fas fa-info-circle"></i> Detalles Históricos:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${pioneerDetails.contribution ? `
                                <div style="background: rgba(30, 40, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${pioneerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${pioneerDetails.innovations ? `
                                <div style="background: rgba(30, 40, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Innovaciones</div>
                                    <div style="font-weight: 600;">${pioneerDetails.innovations}</div>
                                </div>
                            ` : ''}
                            
                            ${pioneerDetails.timeline ? `
                                <div style="background: rgba(30, 40, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Histórico</div>
                                    <div style="font-weight: 600;">${pioneerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${pioneerDetails.impact ? `
                                <div style="background: rgba(30, 40, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en Salud Pública</div>
                                    <div style="font-weight: 600;">${pioneerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${pioneer.title} - Legado en la Potabilización Moderna</span><br>
                        <span class="code-keyword">Relevancia actual:</span> ${pioneer.status === 'Histórico' ? 'Fundamentos establecidos siguen vigentes' : 'Tecnologías desarrolladas aún en uso'}<br>
                        <span class="code-keyword">Principio aplicado:</span> ${pioneer.title === 'Hipócrates' ? 'Filtración física' : pioneer.title === 'John Snow' ? 'Control epidemiológico' : pioneer.title === 'James Simpson' ? 'Filtración en arena' : pioneer.title === 'Louis Pasteur' ? 'Desinfección' : pioneer.title === 'Abel Wolman' ? 'Estándares de calidad' : 'Separación por membranas'}<br>
                        <span class="code-keyword">Reconocimiento:</span> Considerado ${pioneer.status === 'Histórico' ? 'pionero histórico' : 'innovador contemporáneo'} en potabilización
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${pioneer.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closePioneerModal').addEventListener('click', () => {
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
    console.log('Aplicación Potabilización del Agua inicializada correctamente');
});