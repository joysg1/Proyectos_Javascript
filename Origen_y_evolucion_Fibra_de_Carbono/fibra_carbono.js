document.addEventListener('DOMContentLoaded', function() {
    console.log('Fibra de Carbono: Inicializando aplicación...');
    
    // Datos de fabricantes importantes
    const manufacturersData = [
        {
            icon: 'fa-industry',
            title: 'Toray Industries',
            description: 'Líder mundial en producción de fibra de carbono desde 1970. Desarrollador de las series T300, T700, T800 y T1000.',
            color: '#00ff88',
            status: 'Líder global',
            contribution: 'Series T300-T1000, procesos PAN'
        },
        {
            icon: 'fa-atom',
            title: 'Hexcel',
            description: 'Principal fabricante de materiales compuestos para aeroespacial. Desarrollador de tejidos y preimpregnados de alto rendimiento.',
            color: '#00aaff',
            status: 'Especialista aeroespacial',
            contribution: 'Preimpregnados, composites'
        },
        {
            icon: 'fa-hard-hat',
            title: 'SGL Carbon',
            description: 'Uno de los mayores productores de fibra de carbono en Europa. Especializado en fibras a partir de brea de petróleo.',
            color: '#ffaa00',
            status: 'Líder europeo',
            contribution: 'Fibras de brea, aplicaciones industriales'
        },
        {
            icon: 'fa-plane',
            title: 'Mitsubishi Chemical',
            description: 'Productor de fibras de carbono de alto módulo y ultra alto módulo. Especializado en aplicaciones de ingeniería avanzada.',
            color: '#ff66aa',
            status: 'Alta tecnología',
            contribution: 'Fibras alto módulo, compuestos avanzados'
        },
        {
            icon: 'fa-car',
            title: 'Teijin',
            description: 'Desarrollador de la fibra Tenax® y pionero en aplicaciones automotrices. Innovador en procesos de producción más eficientes.',
            color: '#9966ff',
            status: 'Innovador',
            contribution: 'Fibra Tenax®, aplicaciones automoción'
        },
        {
            icon: 'fa-wind',
            title: 'Formosa Plastics',
            description: 'Principal productor de fibra de carbono en Taiwán. Especializado en aplicaciones de energía eólica y construcción.',
            color: '#4ade80',
            status: 'En expansión',
            contribution: 'Aplicaciones eólicas, producción masiva'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initMaterialSimulation();

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
                    // Partículas de carbono (verde)
                    color = `rgba(0, 255, 136, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2.5 + 0.5;
                    speed = (Math.random() - 0.5) * 0.5;
                } else if (type < 0.85) {
                    // Partículas de energía (naranja)
                    color = `rgba(255, 170, 0, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3.5 + 1;
                    speed = (Math.random() - 0.5) * 0.7;
                } else {
                    // Partículas de estructura (azul)
                    color = `rgba(0, 170, 255, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2 + 1;
                    speed = (Math.random() - 0.5) * 0.9;
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
                    type: type < 0.6 ? 'carbon' : type < 0.85 ? 'energy' : 'structure'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de estructura molecular sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(10, 20, 15, 0.1)');
            gradient.addColorStop(1, 'rgba(5, 10, 8, 0.3)');
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
                if (particle.type === 'structure') {
                    // Estructura como hexágonos (grafeno)
                    const sides = 6;
                    const radius = particle.size;
                    ctx.moveTo(particle.x + radius * Math.cos(0), particle.y + radius * Math.sin(0));
                    
                    for (let i = 1; i <= sides; i++) {
                        const angle = i * 2 * Math.PI / sides;
                        ctx.lineTo(particle.x + radius * Math.cos(angle), particle.y + radius * Math.sin(angle));
                    }
                } else {
                    // Carbono y energía como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'carbon') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'energy') {
                        gradient.addColorStop(0, `rgba(255, 170, 0, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 170, 0, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(0, 170, 255, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(0, 170, 255, 0)');
                    }
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                
                // Conectar partículas cercanas (efecto de fibra)
                if (particle.type === 'carbon') {
                    particles.forEach(otherParticle => {
                        if (otherParticle.type === 'carbon' && otherParticle !== particle) {
                            const dx = otherParticle.x - particle.x;
                            const dy = otherParticle.y - particle.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance < 100) {
                                ctx.beginPath();
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(otherParticle.x, otherParticle.y);
                                ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - distance/100)})`;
                                ctx.lineWidth = 0.5;
                                ctx.stroke();
                            }
                        }
                    });
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

    // Función para inicializar simulación de materiales
    function initMaterialSimulation() {
        console.log('Inicializando simulación de materiales...');
        
        // Elementos del DOM
        const fiberTypeSlider = document.getElementById('fiberTypeSlider');
        const fiberTypeValue = document.getElementById('fiberTypeValue');
        const stiffnessSlider = document.getElementById('stiffnessSlider');
        const stiffnessValue = document.getElementById('stiffnessValue');
        const strengthSlider = document.getElementById('strengthSlider');
        const strengthValue = document.getElementById('strengthValue');
        const appTypeButtons = document.querySelectorAll('.app-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('materialCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !fiberTypeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        fiberTypeSlider.addEventListener('input', function() {
            const types = ['Bajo Módulo (230GPa)', 'Alto Módulo (350GPa)', 'Alto Rendimiento (550GPa)', 'Ultra Alto Módulo (900GPa)'];
            fiberTypeValue.textContent = types[this.value - 1];
        });
        
        stiffnessSlider.addEventListener('input', function() {
            const values = ['Muy Bajo', 'Bajo', 'Moderado', 'Medio', 'Medio-Alto', 'Alto', 'Muy Alto', 'Extremo', 'Crítico', 'Máximo'];
            stiffnessValue.textContent = values[this.value - 1];
        });
        
        strengthSlider.addEventListener('input', function() {
            const values = ['Muy Bajo', 'Bajo', 'Moderado', 'Medio', 'Medio-Alto', 'Alto', 'Muy Alto', 'Extremo', 'Crítico', 'Máximo'];
            strengthValue.textContent = values[this.value - 1];
        });
        
        // Botones de tipo de aplicación
        appTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                appTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Ajustar sliders según aplicación
                const type = this.dataset.type;
                if (type === 'aerospace') {
                    stiffnessSlider.value = 9;
                    strengthSlider.value = 8;
                } else if (type === 'automotive') {
                    stiffnessSlider.value = 7;
                    strengthSlider.value = 6;
                } else if (type === 'sports') {
                    stiffnessSlider.value = 6;
                    strengthSlider.value = 7;
                } else if (type === 'wind') {
                    stiffnessSlider.value = 8;
                    strengthSlider.value = 5;
                }
                
                stiffnessValue.textContent = ['Muy Bajo', 'Bajo', 'Moderado', 'Medio', 'Medio-Alto', 'Alto', 'Muy Alto', 'Extremo', 'Crítico', 'Máximo'][stiffnessSlider.value - 1];
                strengthValue.textContent = ['Muy Bajo', 'Bajo', 'Moderado', 'Medio', 'Medio-Alto', 'Alto', 'Muy Alto', 'Extremo', 'Crítico', 'Máximo'][strengthSlider.value - 1];
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runMaterialSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            fiberTypeSlider.value = 2;
            fiberTypeValue.textContent = 'Alto Módulo (350GPa)';
            stiffnessSlider.value = 8;
            stiffnessValue.textContent = 'Alto';
            strengthSlider.value = 9;
            strengthValue.textContent = 'Alto';
            appTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="aerospace"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">La fibra de carbono (azul) supera a materiales tradicionales en relación rigidez-peso</div>';
            
            // Ejecutar simulación con valores por defecto
            runMaterialSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runMaterialSimulation();
        }, 500);
        
        console.log('Simulación de materiales inicializada');
    }

    // Función para ejecutar simulación de materiales
    function runMaterialSimulation() {
        const canvas = document.getElementById('materialCanvas');
        const ctx = canvas.getContext('2d');
        const fiberType = parseInt(document.getElementById('fiberTypeSlider').value);
        const stiffnessReq = parseInt(document.getElementById('stiffnessSlider').value);
        const strengthReq = parseInt(document.getElementById('strengthSlider').value);
        const appType = document.querySelector('.app-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 60;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Propiedades de materiales
        const materials = [
            { name: 'Fibra Carbono', color: '#00ff88', stiffness: [230, 350, 550, 900][fiberType-1], strength: [4.9, 4.0, 4.5, 3.5][fiberType-1], density: 1.8, cost: [50, 80, 150, 300][fiberType-1] },
            { name: 'Acero', color: '#ff5555', stiffness: 205, strength: 1.7, density: 7.85, cost: 1 },
            { name: 'Aluminio', color: '#ffaa00', stiffness: 71.7, strength: 0.57, density: 2.81, cost: 3 },
            { name: 'Titanio', color: '#00aaff', stiffness: 116, strength: 1.0, density: 4.51, cost: 30 },
            { name: 'Fibra Vidrio', color: '#9966ff', stiffness: 72.3, strength: 3.45, density: 2.58, cost: 10 }
        ];
        
        // Calcular puntuaciones para aplicación específica
        const appRequirements = {
            'aerospace': { stiffnessWeight: 0.4, strengthWeight: 0.3, densityWeight: 0.3 },
            'automotive': { stiffnessWeight: 0.3, strengthWeight: 0.3, densityWeight: 0.4 },
            'sports': { stiffnessWeight: 0.3, strengthWeight: 0.4, densityWeight: 0.3 },
            'wind': { stiffnessWeight: 0.4, strengthWeight: 0.2, densityWeight: 0.4 }
        };
        
        const req = appRequirements[appType];
        
        // Normalizar propiedades y calcular puntuación total
        materials.forEach(mat => {
            // Normalizar (0-10)
            mat.normStiffness = (mat.stiffness / 900) * 10;
            mat.normStrength = (mat.strength / 4.9) * 10;
            mat.normDensity = 10 - (mat.density / 7.85) * 10; // Invertir: menor densidad es mejor
            
            // Puntuación ponderada
            mat.score = mat.normStiffness * req.stiffnessWeight + 
                       mat.normStrength * req.strengthWeight + 
                       mat.normDensity * req.densityWeight;
            
            // Ajustar por requisitos específicos del usuario
            const stiffnessMatch = (stiffnessReq / 10) * (mat.normStiffness / 10);
            const strengthMatch = (strengthReq / 10) * (mat.normStrength / 10);
            mat.adjustedScore = mat.score * (0.5 + stiffnessMatch * 0.25 + strengthMatch * 0.25);
        });
        
        // Ordenar por puntuación ajustada
        materials.sort((a, b) => b.adjustedScore - a.adjustedScore);
        
        // Dibujar gráfico de barras
        const barWidth = graphWidth / materials.length * 0.7;
        const maxScore = Math.max(...materials.map(m => m.adjustedScore));
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Materiales', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Puntuación (0-10)', 0, 0);
        ctx.restore();
        
        // Dibujar barras
        materials.forEach((material, index) => {
            const x = padding + (index * graphWidth) / materials.length + (graphWidth / materials.length - barWidth) / 2;
            const barHeight = (material.adjustedScore / maxScore) * graphHeight * 0.8;
            const y = canvas.height - padding - barHeight;
            
            // Barra
            ctx.fillStyle = material.color;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Borde de la barra
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, barWidth, barHeight);
            
            // Etiqueta del material
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = '11px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(material.name, x + barWidth / 2, canvas.height - padding + 20);
            
            // Valor de la puntuación
            ctx.fillStyle = material.color;
            ctx.font = 'bold 12px Inter';
            ctx.fillText(material.adjustedScore.toFixed(1), x + barWidth / 2, y - 8);
            
            // Indicador si es el recomendado
            if (index === 0) {
                ctx.fillStyle = material.color;
                ctx.font = 'bold 11px Inter';
                ctx.fillText('✓ RECOMENDADO', x + barWidth / 2, y - 25);
            }
        });
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Aplicación actual
        const appNames = {
            'aerospace': 'Aeroespacial',
            'automotive': 'Automoción',
            'sports': 'Deportes',
            'wind': 'Energía Eólica'
        };
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '14px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(`Aplicación: ${appNames[appType]}`, padding, padding - 10);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const winner = materials[0];
        
        conclusion.innerHTML = `
            <div class="result-text" style="color: ${winner.color};">
                <i class="fas fa-trophy" style="margin-right: 0.5rem;"></i>
                ${winner.name} es el material óptimo para ${appNames[appType]} (Puntuación: ${winner.adjustedScore.toFixed(1)}/10)
            </div>
        `;
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const fiberType = parseInt(document.getElementById('fiberTypeSlider').value);
        const stiffnessReq = parseInt(document.getElementById('stiffnessSlider').value);
        const strengthReq = parseInt(document.getElementById('strengthSlider').value);
        const appType = document.querySelector('.app-type-btn.active').dataset.type;
        
        const fiberTypes = ['Bajo Módulo (230GPa)', 'Alto Módulo (350GPa)', 'Alto Rendimiento (550GPa)', 'Ultra Alto Módulo (900GPa)'];
        const appNames = {
            'aerospace': 'Aeroespacial',
            'automotive': 'Automoción',
            'sports': 'Deportes',
            'wind': 'Energía Eólica'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Materiales
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(20, 30, 20, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Fibra</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${fiberTypes[fiberType-1]}</div>
                            </div>
                            <div style="background: rgba(20, 30, 20, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Aplicación</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${appNames[appType]}</div>
                            </div>
                            <div style="background: rgba(20, 30, 20, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Requisito Rigidez</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${['Muy Bajo', 'Bajo', 'Moderado', 'Medio', 'Medio-Alto', 'Alto', 'Muy Alto', 'Extremo', 'Crítico', 'Máximo'][stiffnessReq-1]}</div>
                            </div>
                            <div style="background: rgba(20, 30, 20, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Requisito Resistencia</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${['Muy Bajo', 'Bajo', 'Moderado', 'Medio', 'Medio-Alto', 'Alto', 'Muy Alto', 'Extremo', 'Crítico', 'Máximo'][strengthReq-1]}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Parámetros de evaluación para ${appNames[appType]}</span><br>
                            <span class="code-keyword">Peso rigidez:</span> ${appType === 'aerospace' ? '40%' : appType === 'automotive' ? '30%' : appType === 'sports' ? '30%' : '40%'}<br>
                            <span class="code-keyword">Peso resistencia:</span> ${appType === 'aerospace' ? '30%' : appType === 'automotive' ? '30%' : appType === 'sports' ? '40%' : '20%'}<br>
                            <span class="code-keyword">Peso densidad:</span> ${appType === 'aerospace' ? '30%' : appType === 'automotive' ? '40%' : appType === 'sports' ? '30%' : '40%'}<br>
                            <span class="code-keyword">Factor costo:</span> ${appType === 'aerospace' ? 'Bajo' : appType === 'automotive' ? 'Medio' : appType === 'sports' ? 'Alto' : 'Medio'}
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
        const compareMaterialsBtn = document.getElementById('compareMaterialsBtn');
        if (compareMaterialsBtn) {
            compareMaterialsBtn.addEventListener('click', () => {
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
            "1879: Primeros filamentos de carbono (Edison)...",
            "1958: Fibras de carbono de alto rendimiento (Bacon)...",
            "1963: Proceso PAN revolucionario (Watt, Phillips, Johnson)...",
            "1970: Primeras aplicaciones aeroespaciales...",
            "1981: McLaren F1 - Primer monocasco de fibra de carbono...",
            "1990: Expansión a deportes de élite...",
            "2000: Aplicaciones automotrices y bienes de consumo...",
            "2010: Energía eólica y construcción civil...",
            "2020: Nanofibras y materiales sostenibles..."
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
            { type: 'Resistencia específica', value: '10x acero', color: '#00ff88', icon: 'fa-weight' },
            { type: 'Años de desarrollo', value: '60+', color: '#ffaa00', icon: 'fa-calendar-alt' },
            { type: 'Reducción de peso', value: '50-70%', color: '#00aaff', icon: 'fa-chart-line' },
            { type: 'Mercado global 2024', value: '$22B+', color: '#9966ff', icon: 'fa-globe' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Tecnológica de la Fibra de Carbono
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de la fibra de carbono en la ingeniería de materiales desde 1958 hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la fibra de carbono');
            modal.remove();
        });
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturer) {
        const details = {
            'Toray Industries': {
                contribution: 'Desarrollo de las series T300-T1000, procesos PAN optimizados',
                products: 'T300, T700, T800, T1000, tejidos unidireccionales, preimpregnados',
                timeline: '1970-presente',
                impact: 'Estableció los estándares industriales para fibra de carbono de alto rendimiento'
            },
            'Hexcel': {
                contribution: 'Desarrollo de preimpregnados y composites para aeroespacial',
                products: 'Tejidos HexForce®, preimpregnados HexPly®, composites estructurales',
                timeline: '1948-presente',
                impact: 'Proveedor principal para Boeing, Airbus y programas espaciales'
            },
            'SGL Carbon': {
                contribution: 'Especialización en fibras a partir de brea de petróleo',
                products: 'Fibras SIGRAFIL®, tejidos, materiales para automoción e industria',
                timeline: '1992-presente',
                impact: 'Liderazgo en aplicaciones industriales y automotrices en Europa'
            },
            'Mitsubishi Chemical': {
                contribution: 'Fibras de ultra alto módulo y materiales compuestos avanzados',
                products: 'Fibras Pyrofil®, compuestos para aeroespacial y defensa',
                timeline: '1975-presente',
                impact: 'Tecnología de vanguardia para aplicaciones de máxima exigencia'
            },
            'Teijin': {
                contribution: 'Innovación en procesos de producción y aplicaciones automotrices',
                products: 'Fibra Tenax®, composites para automoción, preimpregnados',
                timeline: '1918-presente',
                impact: 'Pionero en la adopción masiva de fibra de carbono en automoción'
            },
            'Formosa Plastics': {
                contribution: 'Producción masiva para aplicaciones de energía eólica',
                products: 'Fibras para palas eólicas, refuerzos estructurales, materiales construcción',
                timeline: '1965-presente',
                impact: 'Democratización del acceso a fibra de carbono para aplicaciones industriales'
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
                                <div style="background: rgba(20, 30, 20, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.products ? `
                                <div style="background: rgba(20, 30, 20, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.timeline ? `
                                <div style="background: rgba(20, 30, 20, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.impact ? `
                                <div style="background: rgba(20, 30, 20, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en Mercado</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${manufacturer.title} - Datos técnicos clave</span><br>
                        <span class="code-keyword">Capacidad producción:</span> ${manufacturer.title === 'Toray Industries' ? '27,000 TPA' : manufacturer.title === 'Hexcel' ? '15,000 TPA' : manufacturer.title === 'SGL Carbon' ? '13,000 TPA' : manufacturer.title === 'Mitsubishi Chemical' ? '9,000 TPA' : manufacturer.title === 'Teijin' ? '11,000 TPA' : '8,000 TPA'}<br>
                        <span class="code-keyword">Principales mercados:</span> ${manufacturer.title === 'Toray Industries' ? 'Aeroespacial, Automoción, Deportes' : manufacturer.title === 'Hexcel' ? 'Aeroespacial, Defensa, Espacio' : manufacturer.title === 'SGL Carbon' ? 'Automoción, Industrial, Energía' : manufacturer.title === 'Mitsubishi Chemical' ? 'Aeroespacial, Defensa, Industrial' : manufacturer.title === 'Teijin' ? 'Automoción, Deportes, Industrial' : 'Energía Eólica, Construcción'}<br>
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
    console.log('Aplicación Fibra de Carbono inicializada correctamente');
});