document.addEventListener('DOMContentLoaded', function() {
    console.log('Cremas Estéticas: Inicializando aplicación científica...');
    
    // Datos de laboratorios importantes
    const laboratoriesData = [
        {
            icon: 'fa-flask',
            title: 'L\'Oréal Research',
            description: 'Líder mundial en investigación cosmética. Más de 4,000 investigadores, 500 patentes anuales. Centro de nanotecnología pionero.',
            color: '#c2185b',
            status: 'Vanguardia',
            contribution: 'Nanotecnología, péptidos, investigación genómica'
        },
        {
            icon: 'fa-microscope',
            title: 'Estée Lauder R&D',
            description: 'Innovación en antioxidantes y factores de crecimiento. Tecnología Chronolux, Advanced Night Repair revolucionó cuidado nocturno.',
            color: '#7b1fa2',
            status: 'Innovador',
            contribution: 'Antioxidantes, reparación nocturna, cronobiología'
        },
        {
            icon: 'fa-dna',
            title: 'SkinCeuticals',
            description: 'Pioneros en antioxidantes tópicos basados en ciencia. CE Ferulic (2005) estableció estándar en protección antioxidante.',
            color: '#0288d1',
            status: 'Científico',
            contribution: 'Antioxidantes, combinaciones sinérgicas, estudios clínicos'
        },
        {
            icon: 'fa-atom',
            title: 'The Ordinary',
            description: 'Revolucionó mercado con transparencia y accesibilidad. Ingredientes activos puros, precios disruptivos, educación al consumidor.',
            color: '#ff9800',
            status: 'Disruptivo',
            contribution: 'Transparencia, accesibilidad, ingredientes concentrados'
        },
        {
            icon: 'fa-leaf',
            title: 'Biologique Recherche',
            description: 'Pioneros en cosmética personalizada y tratimientos profesionales. Loterie P50 icónico. Enfoque holístico y resultados inmediatos.',
            color: '#4caf50',
            status: 'Élite',
            contribution: 'Personalización, tratamientos profesionales, fórmulas complejas'
        },
        {
            icon: 'fa-pills',
            title: 'SkinMedica',
            description: 'Puente entre cosmética y farmacéutica. TNS Essential Serum con factores de crecimiento humanos. Enfoque médico-científico.',
            color: '#f44336',
            status: 'Médico',
            contribution: 'Factores de crecimiento, cosmecéuticos, validación clínica'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initLaboratories();
    initEventListeners();
    initAnimations();
    initTimeline();
    initPenetrationSimulation();

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
                    // Partículas moleculares (rosadas)
                    color = `rgba(194, 24, 91, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de energía (púrpura)
                    color = `rgba(123, 31, 162, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.6;
                } else {
                    // Partículas bioactivas (azul)
                    color = `rgba(2, 136, 209, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'molecular' : type < 0.85 ? 'energy' : 'bioactive'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo molecular sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(46, 26, 66, 0.1)');
            gradient.addColorStop(1, 'rgba(20, 10, 30, 0.3)');
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
                if (particle.type === 'bioactive') {
                    // Bioactivos como hexágonos (moléculas)
                    const sides = 6;
                    const radius = particle.size;
                    ctx.moveTo(
                        particle.x + radius * Math.cos(0),
                        particle.y + radius * Math.sin(0)
                    );
                    
                    for (let i = 1; i <= sides; i++) {
                        ctx.lineTo(
                            particle.x + radius * Math.cos(i * 2 * Math.PI / sides),
                            particle.y + radius * Math.sin(i * 2 * Math.PI / sides)
                        );
                    }
                } else {
                    // Molecular y energía como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'molecular') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'energy') {
                        gradient.addColorStop(0, `rgba(123, 31, 162, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(123, 31, 162, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(2, 136, 209, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(2, 136, 209, 0)');
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

    // Función para inicializar laboratorios
    function initLaboratories() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de laboratorios no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        laboratoriesData.forEach(laboratory => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${laboratory.color};">
                        <i class="fas ${laboratory.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${laboratory.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${laboratory.color}20; color: ${laboratory.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${laboratory.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${laboratory.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${laboratory.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showLaboratoryDetail(laboratory));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Laboratorios inicializados: ' + laboratoriesData.length);
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

    // Función para inicializar simulación de penetración
    function initPenetrationSimulation() {
        console.log('Inicializando simulación de penetración...');
        
        // Elementos del DOM
        const techSlider = document.getElementById('techSlider');
        const techValue = document.getElementById('techValue');
        const thicknessSlider = document.getElementById('thicknessSlider');
        const thicknessValue = document.getElementById('thicknessValue');
        const hydrationSlider = document.getElementById('hydrationSlider');
        const hydrationValue = document.getElementById('hydrationValue');
        const activeTypeButtons = document.querySelectorAll('.active-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('penetrationCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !techSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        techSlider.addEventListener('input', function() {
            const techs = ['Emulsión Básica', 'Emulsión Avanzada', 'Nanotransportadores', 'Liposomas', 'Sistemas Inteligentes'];
            techValue.textContent = techs[this.value - 1];
        });
        
        thicknessSlider.addEventListener('input', function() {
            thicknessValue.textContent = `${this.value} μm`;
        });
        
        hydrationSlider.addEventListener('input', function() {
            hydrationValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de activo
        activeTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                activeTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runPenetrationSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            techSlider.value = 3;
            techValue.textContent = 'Nanotransportadores';
            thicknessSlider.value = 15;
            thicknessValue.textContent = '15 μm';
            hydrationSlider.value = 60;
            hydrationValue.textContent = '60%';
            activeTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="retinoid"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Nanotransportadores (azul) optimizan penetración, pero liposomas (rojo) ofrecen liberación controlada</div>';
            
            // Ejecutar simulación con valores por defecto
            runPenetrationSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runPenetrationSimulation();
        }, 500);
        
        console.log('Simulación de penetración inicializada');
    }

    // Función para ejecutar simulación de penetración
    function runPenetrationSimulation() {
        const canvas = document.getElementById('penetrationCurveCanvas');
        const ctx = canvas.getContext('2d');
        const techLevel = parseInt(document.getElementById('techSlider').value);
        const thickness = parseInt(document.getElementById('thicknessSlider').value);
        const hydration = parseInt(document.getElementById('hydrationSlider').value);
        const activeType = document.querySelector('.active-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (tiempo en horas)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (% penetración)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Tiempo (horas)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Penetración (%)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = i * 5;
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
        
        // Eficacias por tecnología
        const techEfficacy = {
            1: 2,   // Emulsión básica
            2: 5,   // Emulsión avanzada
            3: 15,  // Nanotransportadores
            4: 25,  // Liposomas
            5: 40   // Sistemas inteligentes
        };
        
        // Penetración por tipo de activo
        const activePenetration = {
            'retinoid': 0.8,
            'vitamin-c': 0.6,
            'peptides': 0.9,
            'growth-factors': 0.7
        };
        
        // Calcular curvas
        const points = 100;
        const techCurve = [];
        const activeLimitCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const timePoint = (i * 24) / points; // 24 horas
            
            // Máximo teórico tecnología
            const v_tech = techEfficacy[techLevel];
            
            // Límite del activo
            const v_active = 100 * activePenetration[activeType];
            
            // Penetración real (considera grosor piel e hidratación)
            let v_actual = Math.min(v_tech, v_active);
            
            // Penalización por grosor de estrato córneo
            const thicknessFactor = 1 - (thickness - 10) / 40; // 10μm óptimo
            v_actual *= thicknessFactor;
            
            // Beneficio por hidratación
            const hydrationFactor = 1 + (hydration - 50) / 100; // 50% base
            v_actual *= hydrationFactor;
            
            // Curva temporal (aumenta con el tiempo)
            const timeFactor = 1 - Math.exp(-timePoint / 6); // Constante de tiempo 6h
            v_actual *= timeFactor;
            
            techCurve.push({time: timePoint, v: v_tech});
            activeLimitCurve.push({time: timePoint, v: v_active});
            actualCurve.push({time: timePoint, v: v_actual});
        }
        
        // Dibujar curva límite tecnología
        ctx.strokeStyle = 'rgba(194, 24, 91, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        techCurve.forEach((point, i) => {
            const x = padding + (point.time / 24) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva límite activo
        ctx.strokeStyle = 'rgba(2, 136, 209, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        activeLimitCurve.forEach((point, i) => {
            const x = padding + (point.time / 24) * graphWidth;
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
        ctx.strokeStyle = 'rgba(123, 31, 162, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.time / 24) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(194, 24, 91, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.time / 24) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            const yTech = canvas.height - padding - (techCurve[i].v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, yTech);
            } else {
                ctx.lineTo(x, yTech);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + (point.time / 24) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Límite tecnología
        ctx.fillStyle = 'rgba(194, 24, 91, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite tecnología', canvas.width - 155, 32);
        
        // Límite activo
        ctx.fillStyle = 'rgba(2, 136, 209, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite activo', canvas.width - 155, 57);
        
        // Penetración real
        ctx.fillStyle = 'rgba(123, 31, 162, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Penetración real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const techMax = techEfficacy[techLevel];
        const activeMax = 100 * activePenetration[activeType];
        
        if (techMax < activeMax) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Tecnología limita penetración (${techMax.toFixed(1)}% < ${activeMax.toFixed(1)}%)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Activo limita penetración (${activeMax.toFixed(1)}%)
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const techLevel = parseInt(document.getElementById('techSlider').value);
        const thickness = parseInt(document.getElementById('thicknessSlider').value);
        const hydration = parseInt(document.getElementById('hydrationSlider').value);
        const activeType = document.querySelector('.active-type-btn.active').dataset.type;
        
        const techs = ['Emulsión Básica', 'Emulsión Avanzada', 'Nanotransportadores', 'Liposomas', 'Sistemas Inteligentes'];
        const activeNames = {
            'retinoid': 'Retinoides',
            'vitamin-c': 'Vitamina C',
            'peptides': 'Péptidos',
            'growth-factors': 'Factores de Crecimiento'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Penetración
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(40, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tecnología</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${techs[techLevel-1]}</div>
                            </div>
                            <div style="background: rgba(40, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Activo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${activeNames[activeType]}</div>
                            </div>
                            <div style="background: rgba(40, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Espesor Estrato Córneo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${thickness} μm</div>
                            </div>
                            <div style="background: rgba(40, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Hidratación Piel</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${hydration}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de penetración teórica vs real</span><br>
                            <span class="code-keyword">Penetración máxima tecnología:</span> ${[2, 5, 15, 25, 40][techLevel-1]}%<br>
                            <span class="code-keyword">Penetración máxima activo:</span> ${(activeType === 'retinoid' ? 80 : activeType === 'vitamin-c' ? 60 : activeType === 'peptides' ? 90 : 70)}%<br>
                            <span class="code-keyword">Factor grosor piel:</span> ${(1 - (thickness - 10) / 40).toFixed(2)}x<br>
                            <span class="code-keyword">Factor hidratación:</span> ${(1 + (hydration - 50) / 100).toFixed(2)}x<br>
                            <span class="code-keyword">Penetración estimada a 6h:</span> ${(Math.min([2, 5, 15, 25, 40][techLevel-1], (activeType === 'retinoid' ? 80 : activeType === 'vitamin-c' ? 60 : activeType === 'peptides' ? 90 : 70)) * (1 - (thickness - 10) / 40) * (1 + (hydration - 50) / 100) * (1 - Math.exp(-1))).toFixed(1)}%
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
        
        // Botón de formulaciones
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('formulationsModal').classList.add('active');
            });
        }
        
        // Botón de comparación
        const compareTechnologiesBtn = document.getElementById('compareTechnologiesBtn');
        if (compareTechnologiesBtn) {
            compareTechnologiesBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.add('active');
            });
        }
        
        // Cerrar modales
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                document.getElementById('formulationsModal').classList.remove('active');
            });
        }
        
        const closeCompareModalBtn = document.getElementById('closeCompareModal');
        if (closeCompareModalBtn) {
            closeCompareModalBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.remove('active');
            });
        }
        
        // Cerrar modales al hacer clic fuera
        const formulationsModal = document.getElementById('formulationsModal');
        if (formulationsModal) {
            formulationsModal.addEventListener('click', (e) => {
                if (e.target.id === 'formulationsModal') {
                    formulationsModal.classList.remove('active');
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
                const formulationsModal = document.getElementById('formulationsModal');
                const compareModal = document.getElementById('compareModal');
                
                if (formulationsModal) formulationsModal.classList.remove('active');
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

    // Función para simulación de evolución científica
    function simulateTechEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución científica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "3000 a.C.: Remedios naturales - miel, aceites, arcillas...",
            "Siglo XIX: Primera industrialización - vaselina, glicerina...",
            "1900-1950: Era del marketing - promesas sin evidencia...",
            "1980: Revolución científica - retinoides, estudios clínicos...",
            "1990: Ácidos y exfoliantes - AHA, renovación celular...",
            "2000: Era molecular - péptidos, nanotransportadores...",
            "2010: Cosmética personalizada - genómica, microbioma...",
            "2020: Biotecnología - ingredientes cultivados, sostenibilidad...",
            "Presente: Cosmecéuticos - potencia similar a fármacos"
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
        }, 7200);
    }

    // Función para mostrar resultados de evolución tecnológica
    function showTechEvolutionResults() {
        const results = [
            { type: 'Mercado global', value: '180B', color: '#c2185b', icon: 'fa-chart-line' },
            { type: 'Crecimiento anual', value: '5%', color: '#7b1fa2', icon: 'fa-arrow-up' },
            { type: 'Años de historia', value: '5,000+', color: '#0288d1', icon: 'fa-history' },
            { type: 'Cuota estética', value: '40%', color: '#4caf50', icon: 'fa-chart-pie' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Científica de Cremas Estéticas
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de la ciencia en la industria cosmética desde remedios ancestrales hasta nanotecnología:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución científica en cosmética');
            modal.remove();
        });
    }

    // Función para mostrar detalle de laboratorio
    function showLaboratoryDetail(laboratory) {
        const details = {
            'L\'Oréal Research': {
                contribution: 'Nanotecnología, péptidos bioactivos, investigación genómica de la piel',
                products: 'Revitalift (primer péptido comercial), Solar Expertise (fotoprotección avanzada), Génifique',
                timeline: '1909-presente',
                impact: '4,000+ investigadores, 500 patentes anuales, 20+ centros de investigación globales'
            },
            'Estée Lauder R&D': {
                contribution: 'Antioxidantes potentes, cronobiología cutánea, tecnología de reparación nocturna',
                products: 'Advanced Night Repair (icono 1982), Perfectionist, Re-Nutriv',
                timeline: '1946-presente',
                impact: 'Revolucionó cuidado nocturno, estableció estándar en antioxidantes combinados'
            },
            'SkinCeuticals': {
                contribution: 'Antioxidantes tópicos basados en evidencia, combinaciones sinérgicas patentadas',
                products: 'CE Ferulic (estándar oro antioxidante), Phloretin CF, A.G.E. Interrupter',
                timeline: '1997-presente',
                impact: 'Primera compañía en desarrollar antioxidantes tópicos con estudios clínicos rigurosos'
            },
            'The Ordinary': {
                contribution: 'Transparencia radical, ingredientes activos puros, educación al consumidor',
                products: 'Niacinamide 10% + Zinc 1%, Retinol en squalane, "Buffet" péptidos',
                timeline: '2013-presente',
                impact: 'Disruptor del mercado, democratizó ingredientes activos, transparencia total'
            },
            'Biologique Recherche': {
                contribution: 'Cosmética personalizada, tratamientos profesionales, fórmulas complejas',
                products: 'Lotion P50 (culto), Sérum Grand Millésime, Masque Vivant',
                timeline: '1970-presente',
                impact: 'Estableció estándar en tratamientos profesionales de lujo, enfoque holístico'
            },
            'SkinMedica': {
                contribution: 'Cosmecéuticos puente con farmacéutica, factores de crecimiento humanos',
                products: 'TNS Essential Serum, Lytera 2.0, HA5 Rejuvenating Hydrator',
                timeline: '1999-presente',
                impact: 'Pioneros en factores de crecimiento para uso cosmético, validación médica rigurosa'
            }
        };
        
        const laboratoryDetails = details[laboratory.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeLaboratoryModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${laboratory.color}; margin-right: 1rem;">
                        <i class="fas ${laboratory.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${laboratory.color};">${laboratory.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${laboratory.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${laboratory.color};">
                            <i class="fas fa-info-circle"></i> Detalles del Laboratorio:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${laboratoryDetails.contribution ? `
                                <div style="background: rgba(40, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${laboratoryDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${laboratoryDetails.products ? `
                                <div style="background: rgba(40, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Icono</div>
                                    <div style="font-weight: 600;">${laboratoryDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${laboratoryDetails.timeline ? `
                                <div style="background: rgba(40, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${laboratoryDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${laboratoryDetails.impact ? `
                                <div style="background: rgba(40, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en Industria</div>
                                    <div style="font-weight: 600;">${laboratoryDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${laboratory.title} - Tecnologías y enfoque científico</span><br>
                        <span class="code-keyword">Enfoque principal:</span> ${laboratory.contribution}<br>
                        <span class="code-keyword">Metodología investigación:</span> Estudios clínicos, pruebas in vitro/in vivo<br>
                        <span class="code-keyword">Innovaciones clave:</span> Sistemas de entrega, ingredientes patentados, personalización<br>
                        <span class="code-keyword">Filosofía:</span> ${laboratory.status === 'Científico' ? 'Evidencia sobre marketing' : laboratory.status === 'Disruptivo' ? 'Transparencia radical' : 'Innovación constante'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${laboratory.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeLaboratoryModal').addEventListener('click', () => {
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
    console.log('Aplicación Cremas Estéticas inicializada correctamente');
});