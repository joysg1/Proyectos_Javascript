document.addEventListener('DOMContentLoaded', function() {
    console.log('Pesticidas: Inicializando aplicación...');
    
    // Datos de fabricantes importantes
    const manufacturersData = [
        {
            icon: 'fa-industry',
            title: 'Bayer CropScience',
            description: 'Uno de los mayores fabricantes mundiales. Adquirió Monsanto en 2018. Productor de glifosato (Roundup) y neonicotinoides.',
            color: '#4ade80',
            status: 'Activo',
            contribution: 'Glifosato, neonicotinoides, investigación'
        },
        {
            icon: 'fa-flask',
            title: 'Syngenta',
            description: 'Líder en productos para protección de cultivos. Parte de ChemChina desde 2017. Desarrollador de atrazina y paraquat.',
            color: '#22c55e',
            status: 'Activo',
            contribution: 'Atrazina, paraquat, fungicidas'
        },
        {
            icon: 'fa-leaf',
            title: 'BASF',
            description: 'Gigante químico alemán con división agrícola importante. Productor de fungicidas e insecticidas de última generación.',
            color: '#10b981',
            status: 'Activo',
            contribution: 'Fungicidas, insecticidas, innovación'
        },
        {
            icon: 'fa-seedling',
            title: 'Corteva Agriscience',
            description: 'Escindida de DowDuPont en 2019. Combina legado de Dow, DuPont y Pioneer. Enfoque en ciencia de cultivos.',
            color: '#f59e0b',
            status: 'Activo',
            contribution: '2,4-D, herbicidas, biotecnología'
        },
        {
            icon: 'fa-recycle',
            title: 'FMC Corporation',
            description: 'Especializada en insecticidas y herbicidas. Desarrollador de Rynaxypyr (clorantraniliprol) y otros productos innovadores.',
            color: '#ef4444',
            status: 'Activo',
            contribution: 'Insecticidas, herbicidas, I+D'
        },
        {
            icon: 'fa-biohazard',
            title: 'Sumitomo Chemical',
            description: 'Compañía japonesa con fuerte presencia en protección de cultivos. Productor de piretroides y otros insecticidas.',
            color: '#8b5cf6',
            status: 'Activo',
            contribution: 'Piretroides, insecticidas, soluciones'
        }
    ];

    // Inicializar componentes
    initScienceParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initEfficacySimulation();

    // Función para inicializar partículas científicas
    function initScienceParticles() {
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
                let color, size, speed, shape;
                
                if (type < 0.5) {
                    // Partículas verdes (pesticidas)
                    color = `rgba(74, 222, 128, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                    shape = 'circle';
                } else if (type < 0.8) {
                    // Partículas naranjas (advertencia)
                    color = `rgba(245, 158, 11, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 1;
                    speed = (Math.random() - 0.5) * 0.7;
                    shape = 'triangle';
                } else {
                    // Partículas azules (agua/medio ambiente)
                    color = `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.4;
                    shape = 'square';
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.3,
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
            
            // Fondo con gradiente sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 46, 26, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 18, 10, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar conexiones entre partículas cercanas
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.05)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            particles.forEach(particle => {
                // Movimiento
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Rotación
                particle.rotation += particle.rotationSpeed;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.4 + 0.6;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula según forma
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                
                ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                
                if (particle.shape === 'triangle') {
                    // Triángulo
                    ctx.beginPath();
                    ctx.moveTo(0, -particle.size);
                    ctx.lineTo(particle.size, particle.size);
                    ctx.lineTo(-particle.size, particle.size);
                    ctx.closePath();
                    ctx.fill();
                } else if (particle.shape === 'square') {
                    // Cuadrado
                    ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
                } else {
                    // Círculo
                    ctx.beginPath();
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                ctx.restore();
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
        
        // Mostrar todos los elementos inmediatamente
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

    // Función para inicializar simulación de eficacia
    function initEfficacySimulation() {
        console.log('Inicializando simulación de eficacia...');
        
        // Elementos del DOM
        const pesticideGenSlider = document.getElementById('pesticideGenSlider');
        const pesticideGenValue = document.getElementById('pesticideGenValue');
        const usageYearsSlider = document.getElementById('usageYearsSlider');
        const usageYearsValue = document.getElementById('usageYearsValue');
        const frequencySlider = document.getElementById('frequencySlider');
        const frequencyValue = document.getElementById('frequencyValue');
        const applicationTypeButtons = document.querySelectorAll('.application-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('efficacyCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !pesticideGenSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        pesticideGenSlider.addEventListener('input', function() {
            const gens = ['Naturales', 'Organoclorados', 'Organofosforados', 'Selectivos Modernos'];
            pesticideGenValue.textContent = gens[this.value - 1];
        });
        
        usageYearsSlider.addEventListener('input', function() {
            usageYearsValue.textContent = `${this.value} años`;
        });
        
        frequencySlider.addEventListener('input', function() {
            frequencyValue.textContent = `${this.value}/año`;
        });
        
        // Botones de tipo de aplicación
        applicationTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                applicationTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runEfficacySimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            pesticideGenSlider.value = 2;
            pesticideGenValue.textContent = 'Organoclorados';
            usageYearsSlider.value = 10;
            usageYearsValue.textContent = '10 años';
            frequencySlider.value = 4;
            frequencyValue.textContent = '4/año';
            applicationTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="preventive"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Los organoclorados (amarillo) muestran rápida resistencia, mientras el MIP (verde) mantiene eficacia</div>';
            
            // Ejecutar simulación con valores por defecto
            runEfficacySimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runEfficacySimulation();
        }, 500);
        
        console.log('Simulación de eficacia inicializada');
    }

    // Función para ejecutar simulación de eficacia
    function runEfficacySimulation() {
        const canvas = document.getElementById('efficacyCurveCanvas');
        const ctx = canvas.getContext('2d');
        const pesticideGen = parseInt(document.getElementById('pesticideGenSlider').value);
        const usageYears = parseInt(document.getElementById('usageYearsSlider').value);
        const frequency = parseInt(document.getElementById('frequencySlider').value);
        const applicationType = document.querySelector('.application-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (años de uso)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (eficacia %)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Años de Uso Continuo', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Eficacia (%)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = (i * usageYears) / 5;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value.toFixed(0), x, canvas.height - padding + 20);
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
        
        // Parámetros por generación de pesticida
        const pesticideParams = {
            1: { initialEff: 40, resistanceRate: 0.05, persistence: 0.8 }, // Naturales
            2: { initialEff: 95, resistanceRate: 0.15, persistence: 0.3 }, // Organoclorados
            3: { initialEff: 90, resistanceRate: 0.12, persistence: 0.5 }, // Organofosforados
            4: { initialEff: 85, resistanceRate: 0.08, persistence: 0.7 }  // Selectivos modernos
        };
        
        // Modificadores por tipo de aplicación
        const applicationModifiers = {
            'preventive': { resistanceMult: 1.2, efficacyBoost: 0 },
            'curative': { resistanceMult: 0.9, efficacyBoost: 10 },
            'integrated': { resistanceMult: 0.5, efficacyBoost: 5 },
            'organic': { resistanceMult: 0.3, efficacyBoost: -20 }
        };
        
        // Calcular curvas
        const points = 100;
        const efficacyCurve = [];
        const resistanceCurve = [];
        
        const params = pesticideParams[pesticideGen];
        const modifiers = applicationModifiers[applicationType];
        
        for (let i = 0; i <= points; i++) {
            const year = (i * usageYears) / points;
            
            // Eficacia inicial modificada por tipo de aplicación
            let efficacy = params.initialEff + modifiers.efficacyBoost;
            
            // Reducción por resistencia (depende de frecuencia de aplicación)
            const resistanceImpact = params.resistanceRate * modifiers.resistanceMult * frequency * year;
            efficacy -= resistanceImpact * 100;
            
            // Efecto de persistencia (más persistente = menor caída inicial)
            efficacy *= (1 - (1 - params.persistence) * (year / usageYears));
            
            // Límites
            efficacy = Math.max(efficacy, 0);
            efficacy = Math.min(efficacy, 100);
            
            // Resistencia acumulada
            const resistance = Math.min(resistanceImpact * 100, 100);
            
            efficacyCurve.push({year: year, eff: efficacy});
            resistanceCurve.push({year: year, res: resistance});
        }
        
        // Dibujar curva de eficacia
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        efficacyCurve.forEach((point, i) => {
            const x = padding + (point.year / usageYears) * graphWidth;
            const y = canvas.height - padding - (point.eff / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva de resistencia
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        
        resistanceCurve.forEach((point, i) => {
            const x = padding + (point.year / usageYears) * graphWidth;
            const y = canvas.height - padding - (point.res / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar área bajo curva de eficacia
        ctx.fillStyle = 'rgba(74, 222, 128, 0.15)';
        ctx.beginPath();
        
        efficacyCurve.forEach((point, i) => {
            const x = padding + (point.year / usageYears) * graphWidth;
            const y = canvas.height - padding - (point.eff / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, canvas.height - padding);
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        // Completar área
        ctx.lineTo(padding + graphWidth, canvas.height - padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Eficacia
        ctx.fillStyle = 'rgba(74, 222, 128, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Eficacia', canvas.width - 155, 32);
        
        // Resistencia
        ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Resistencia acumulada', canvas.width - 155, 57);
        
        // Área eficacia
        ctx.fillStyle = 'rgba(74, 222, 128, 0.3)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Área eficacia total', canvas.width - 155, 82);
        
        // Calcular métricas finales
        const finalEfficacy = efficacyCurve[efficacyCurve.length - 1].eff;
        const finalResistance = resistanceCurve[resistanceCurve.length - 1].res;
        const efficacyLoss = params.initialEff + modifiers.efficacyBoost - finalEfficacy;
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        
        if (efficacyLoss > 50) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--danger);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Alta pérdida de eficacia (${efficacyLoss.toFixed(1)}%) - Cambiar estrategia
                </div>
            `;
        } else if (efficacyLoss > 20) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i>
                    Pérdida moderada de eficacia (${efficacyLoss.toFixed(1)}%) - Considerar rotación
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Baja pérdida de eficacia (${efficacyLoss.toFixed(1)}%) - Estrategia sostenible
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const pesticideGen = parseInt(document.getElementById('pesticideGenSlider').value);
        const usageYears = parseInt(document.getElementById('usageYearsSlider').value);
        const frequency = parseInt(document.getElementById('frequencySlider').value);
        const applicationType = document.querySelector('.application-type-btn.active').dataset.type;
        
        const gens = ['Naturales', 'Organoclorados', 'Organofosforados', 'Selectivos Modernos'];
        const applicationNames = {
            'preventive': 'Preventiva',
            'curative': 'Curativa',
            'integrated': 'Integrada (MIP)',
            'organic': 'Orgánica'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Eficacia
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Generación Pesticida</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${gens[pesticideGen-1]}</div>
                            </div>
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo Aplicación</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${applicationNames[applicationType]}</div>
                            </div>
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Años de Uso</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${usageYears} años</div>
                            </div>
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Frecuencia</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${frequency}/año</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Resultados de la simulación</span><br>
                            <span class="code-keyword">Eficacia inicial:</span> ${[40, 95, 90, 85][pesticideGen-1]}%<br>
                            <span class="code-keyword">Tasa resistencia base:</span> ${[5, 15, 12, 8][pesticideGen-1]}%/año<br>
                            <span class="code-keyword">Modificador por aplicación:</span> ${applicationType === 'preventive' ? '1.2x' : applicationType === 'curative' ? '0.9x' : applicationType === 'integrated' ? '0.5x' : '0.3x'}<br>
                            <span class="code-keyword">Eficacia final estimada:</span> ${([40, 95, 90, 85][pesticideGen-1] - [5, 15, 12, 8][pesticideGen-1] * (applicationType === 'preventive' ? 1.2 : applicationType === 'curative' ? 0.9 : applicationType === 'integrated' ? 0.5 : 0.3) * frequency * usageYears).toFixed(1)}%
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
            "4500 a.C.: Primer uso de azufre contra insectos...",
            "2000 a.C.: Arsénico y mercurio en China...",
            "1763: Nicotina del tabaco como insecticida...",
            "1850: Piretro de crisantemos...",
            "1939: Descubrimiento del DDT...",
            "1945: Revolución de los organoclorados...",
            "1962: Primavera Silenciosa de Rachel Carson...",
            "1970: Organofosforados y carbamatos...",
            "1974: Introducción del glifosato...",
            "1990: Piretroides sintéticos...",
            "2000: Neonicotinoides y selectivos...",
            "Presente: Biopesticidas y agricultura de precisión"
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
        }, 9600);
    }

    // Función para mostrar resultados de evolución histórica
    function showHistoricalEvolutionResults() {
        const results = [
            { type: 'Años de historia', value: '6500+', color: '#4ade80', icon: 'fa-history' },
            { type: 'Producción anual', value: '4M+ T', color: '#f59e0b', icon: 'fa-industry' },
            { type: 'Mercado global', value: '$60B', color: '#10b981', icon: 'fa-chart-line' },
            { type: 'Incremento productividad', value: '30-50%', color: '#ef4444', icon: 'fa-seedling' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Histórica de los Pesticidas
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Resumen del impacto de los pesticidas en la agricultura desde la antigüedad hasta la actualidad:</p>
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
        
        // Event listeners para el modal histórico
        document.getElementById('closeTechModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewTimelineBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo detallada de la evolución de los pesticidas');
            modal.remove();
        });
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturer) {
        const details = {
            'Bayer CropScience': {
                contribution: 'Glifosato (Roundup), neonicotinoides, investigación en protección de cultivos',
                products: 'Roundup, Gaucho, Poncho, Stratego, Serenade, Nativo',
                timeline: '1863-presente',
                impact: 'Mayor productor mundial tras fusión con Monsanto en 2018'
            },
            'Syngenta': {
                contribution: 'Atrazina, paraquat, fungicidas triazoles, semillas tratadas',
                products: 'Gramoxone, Amistar, Callisto, Cruiser, Primextra',
                timeline: '2000-presente',
                impact: 'Líder en protección de cultivos, parte de ChemChina'
            },
            'BASF': {
                contribution: 'Fungicidas innovadores, insecticidas, herbicidas selectivos',
                products: 'Opera, Priaxor, Revysol, Limus, F 500 (strobilurinas)',
                timeline: '1865-presente',
                impact: 'Innovación en química agrícola, sostenibilidad'
            },
            'Corteva Agriscience': {
                contribution: '2,4-D, herbicidas hormonales, biotecnología agrícola',
                products: 'Enlist, Quelex, Isoclast, Rinskor, Arylex',
                timeline: '2019-presente',
                impact: 'Fusión de legados Dow, DuPont y Pioneer'
            },
            'FMC Corporation': {
                contribution: 'Insecticidas de nueva generación, herbicidas selectivos',
                products: 'Rynaxypyr (clorantraniliprol), Authority, Anthem, Talstar',
                timeline: '1883-presente',
                impact: 'Especialista en protección de cultivos con I+D innovador'
            },
            'Sumitomo Chemical': {
                contribution: 'Piretroides sintéticos, insecticidas, soluciones integradas',
                products: 'Sumithion, Trebon, Maverick, Piperonyl butoxide',
                timeline: '1913-presente',
                impact: 'Liderazgo en piretroides y sinergistas'
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
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.products ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Clave</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.timeline ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.impact ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en la Industria</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${manufacturer.title} - Impacto y tecnologías</span><br>
                        <span class="code-keyword">Mercado global:</span> Participación significativa en sector $60B<br>
                        <span class="code-keyword">Enfoque actual:</span> Sostenibilidad, reducción de residuos, precisión<br>
                        <span class="code-keyword">Desafíos:</span> Resistencia, regulaciones, percepción pública<br>
                        <span class="code-keyword">Innovación:</span> Biopesticidas, agricultura digital, formulaciones avanzadas
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
    console.log('Aplicación Pesticidas inicializada correctamente');
});