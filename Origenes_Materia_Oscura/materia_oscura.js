document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const experimentsData = [
        {
            icon: 'fa-vials',
            title: 'XENONnT',
            description: 'Experimento subterráneo en el Gran Sasso (Italia) que busca WIMPs mediante detección directa con xenón líquido.',
            color: '#9d4edd',
            status: 'En operación',
            sensitivity: '4.1×10⁻⁴⁸ cm²'
        },
        {
            icon: 'fa-vials',
            title: 'LUX-ZEPLIN',
            description: 'Detector de xenón líquido en la Instalación Subterránea de Sanford (EE.UU.), el más sensible del mundo.',
            color: '#7b2cbf',
            status: 'En operación',
            sensitivity: '1.4×10⁻⁴⁸ cm²'
        },
        {
            icon: 'fa-satellite',
            title: 'Fermi-LAT',
            description: 'Telescopio espacial de rayos gamma que busca señales de aniquilación de materia oscura.',
            color: '#ff9e00',
            status: 'En operación',
            sensitivity: 'Rayos gamma >1 GeV'
        },
        {
            icon: 'fa-snowflake',
            title: 'IceCube',
            description: 'Detector de neutrinos en el Polo Sur que busca neutrinos de desintegración de materia oscura.',
            color: '#00b4d8',
            status: 'En operación',
            sensitivity: 'Neutrinos >100 GeV'
        },
        {
            icon: 'fa-atom',
            title: 'LHC (ATLAS/CMS)',
            description: 'Colisionador de hadrones que busca producción directa de partículas de materia oscura.',
            color: '#ff6b6b',
            status: 'En operación',
            sensitivity: 'WIMPs >50 GeV'
        },
        {
            icon: 'fa-satellite-dish',
            title: 'ADMX',
            description: 'Experimento que busca axiones (materia oscura ultraligera) usando cavidades resonantes.',
            color: '#4ade80',
            status: 'En operación',
            sensitivity: 'Axiones 2-40 µeV'
        }
    ];

    // Inicializar componentes
    initCosmicParticles();
    initExperiments();
    initEventListeners();
    initAnimations();
    initTimeline();
    initRotationSimulation();

    // Función para inicializar partículas cósmicas
    function initCosmicParticles() {
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
                    // Estrellas normales
                    color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Partículas de materia oscura (púrpura)
                    color = `rgba(157, 78, 221, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Partículas energéticas (naranja)
                    color = `rgba(255, 158, 0, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'star' : type < 0.85 ? 'dark' : 'energy'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo nebuloso sutil
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
                
                // Efecto de centelleo
                const twinkle = Math.sin(Date.now() * particle.twinkleSpeed + particle.twinkleOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * twinkle;
                
                // Dibujar partícula
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'star') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'dark') {
                        gradient.addColorStop(0, `rgba(157, 78, 221, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(157, 78, 221, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(255, 158, 0, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 158, 0, 0)');
                    }
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                
                // Destello ocasional para partículas energéticas
                if (particle.type === 'energy' && Math.random() < 0.01) {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 158, 0, 0.2)`;
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
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Sensibilidad: ${experiment.sensitivity}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${experiment.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles del experimento
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

    // Función para inicializar simulación de rotación
    function initRotationSimulation() {
        const darkMatterSlider = document.getElementById('darkMatterSlider');
        const darkMatterValue = document.getElementById('darkMatterValue');
        const radiusSlider = document.getElementById('radiusSlider');
        const radiusValue = document.getElementById('radiusValue');
        const massSlider = document.getElementById('massSlider');
        const massValue = document.getElementById('massValue');
        const galaxyTypeButtons = document.querySelectorAll('.galaxy-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('rotationCurveCanvas');
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        darkMatterSlider.addEventListener('input', function() {
            darkMatterValue.textContent = `${this.value}%`;
        });
        
        radiusSlider.addEventListener('input', function() {
            radiusValue.textContent = `${this.value} kpc`;
        });
        
        massSlider.addEventListener('input', function() {
            const mass = Math.pow(10, this.value);
            massValue.textContent = `${mass.toExponential(0)} M☉`.replace('e+', '¹⁰');
        });
        
        // Botones de tipo de galaxia
        galaxyTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                galaxyTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runRotationSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            darkMatterSlider.value = 85;
            darkMatterValue.textContent = '85%';
            radiusSlider.value = 50;
            radiusValue.textContent = '50 kpc';
            massSlider.value = 11;
            massValue.textContent = '10¹¹ M☉';
            galaxyTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="spiral"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">La curva de rotación observada (roja) solo puede explicarse con materia oscura (área sombreada)</div>';
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runRotationSimulation();
        }, 1000);
    }

    // Función para ejecutar simulación de rotación
    function runRotationSimulation() {
        const canvas = document.getElementById('rotationCurveCanvas');
        const ctx = canvas.getContext('2d');
        const darkMatterPercent = parseInt(document.getElementById('darkMatterSlider').value) / 100;
        const radius = parseInt(document.getElementById('radiusSlider').value);
        const massExponent = parseFloat(document.getElementById('massSlider').value);
        const galaxyType = document.querySelector('.galaxy-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (radio galáctico)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (velocidad orbital)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Radio (kpc)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Velocidad (km/s)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = (i * radius) / 5;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value.toFixed(0), x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 100;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value.toString(), padding - 20, y + 3);
        }
        
        // Calcular curvas
        const points = 100;
        const visibleCurve = [];
        const darkMatterCurve = [];
        const totalCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const r = (i * radius) / points;
            
            // Velocidad para materia visible (kepleriana)
            const v_visible = r === 0 ? 0 : 200 * Math.sqrt(1 / r);
            
            // Velocidad para materia oscura (halo isotérmico)
            const v_dark = 250 * darkMatterPercent * (1 - Math.exp(-r / 20));
            
            // Velocidad total
            const v_total = Math.sqrt(v_visible * v_visible + v_dark * v_dark);
            
            visibleCurve.push({r, v: v_visible});
            darkMatterCurve.push({r, v: v_dark});
            totalCurve.push({r, v: v_total});
        }
        
        // Dibujar curva de materia visible
        ctx.strokeStyle = 'rgba(76, 201, 240, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        visibleCurve.forEach((point, i) => {
            const x = padding + (point.r / radius) * graphWidth;
            const y = canvas.height - padding - (point.v / 500) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área de materia oscura
        ctx.fillStyle = 'rgba(157, 78, 221, 0.2)';
        ctx.beginPath();
        
        totalCurve.forEach((point, i) => {
            const x = padding + (point.r / radius) * graphWidth;
            const y = canvas.height - padding - (point.v / 500) * graphHeight;
            const yVisible = canvas.height - padding - (visibleCurve[i].v / 500) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, yVisible);
            } else {
                ctx.lineTo(x, yVisible);
            }
        });
        
        // Rellenar área entre curvas
        for (let i = totalCurve.length - 1; i >= 0; i--) {
            const point = totalCurve[i];
            const x = padding + (point.r / radius) * graphWidth;
            const y = canvas.height - padding - (point.v / 500) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Dibujar curva total (observada)
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        totalCurve.forEach((point, i) => {
            const x = padding + (point.r / radius) * graphWidth;
            const y = canvas.height - padding - (point.v / 500) * graphHeight;
            
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
        
        // Materia visible
        ctx.fillStyle = 'rgba(76, 201, 240, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Materia visible', canvas.width - 155, 32);
        
        // Materia oscura
        ctx.fillStyle = 'rgba(157, 78, 221, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Materia oscura', canvas.width - 155, 57);
        
        // Total observado
        ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Total observado', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        if (darkMatterPercent < 0.3) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Sin suficiente materia oscura, la curva observada no puede explicarse. Predicción kepleriana (azul) diverge de observaciones.
                </div>
            `;
        } else if (darkMatterPercent < 0.7) {
            conclusion.innerHTML = `
                <div class="result-text">
                    <i class="fas fa-info-circle" style="color: var(--accent-light); margin-right: 0.5rem;"></i>
                    La materia oscura explica parcialmente la curva de rotación, pero se necesitaría más para coincidir exactamente.
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    ¡La curva observada se explica perfectamente con materia oscura! El modelo ΛCDM predice correctamente las observaciones.
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const darkMatterPercent = parseInt(document.getElementById('darkMatterSlider').value) / 100;
        const radius = parseInt(document.getElementById('radiusSlider').value);
        const massExponent = parseFloat(document.getElementById('massSlider').value);
        const galaxyType = document.querySelector('.galaxy-type-btn.active').dataset.type;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de la Simulación de Rotación Galáctica
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Materia Oscura</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${(darkMatterPercent * 100).toFixed(1)}%</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Radio Galáctico</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${radius} kpc</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Masa Visible</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">10<sup>${massExponent}</sup> M<sub>☉</sub></div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Galaxia</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${galaxyType.charAt(0).toUpperCase() + galaxyType.slice(1)}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Parámetros del modelo de halo de materia oscura</span><br>
                            <span class="code-keyword">Perfil de densidad:</span> ρ(r) = ρ<sub>0</sub> / [1 + (r/r<sub>s</sub>)²]<br>
                            <span class="code-keyword">Radio de escala:</span> r<sub>s</sub> = ${(radius/5).toFixed(1)} kpc<br>
                            <span class="code-keyword">Densidad central:</span> ρ<sub>0</sub> = ${(0.3 * darkMatterPercent).toFixed(3)} M<sub>☉</sub>/pc³<br>
                            <span class="code-keyword">Masa total halo:</span> M<sub>halo</sub> = ${(Math.pow(10, massExponent) * darkMatterPercent * 5).toExponential(1)} M<sub>☉</sub><br>
                            <span class="code-keyword">Relación masa-luz:</span> M/L = ${(darkMatterPercent * 10).toFixed(1)} (M<sub>☉</sub>/L<sub>☉</sub>)
                        </div>
                        
                        <div style="margin-top: 1.5rem;">
                            <h4 style="margin-bottom: 0.8rem; color: var(--accent-light);">
                                <i class="fas fa-calculator"></i> Cálculos de Velocidad Orbital
                            </h4>
                            <div style="background: rgba(30, 30, 60, 0.3); padding: 1rem; border-radius: 8px;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Radio (kpc)</div>
                                        <div style="font-weight: bold;">10</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">v<sub>visible</sub> (km/s)</div>
                                        <div style="font-weight: bold; color: rgba(76, 201, 240, 0.9);">${(200 * Math.sqrt(1/10)).toFixed(0)}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">v<sub>total</sub> (km/s)</div>
                                        <div style="font-weight: bold; color: rgba(255, 107, 107, 0.9);">${Math.sqrt(Math.pow(200 * Math.sqrt(1/10), 2) + Math.pow(250 * darkMatterPercent * (1 - Math.exp(-10/20)), 2)).toFixed(0)}</div>
                                    </div>
                                    
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Radio (kpc)</div>
                                        <div style="font-weight: bold;">30</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">v<sub>visible</sub> (km/s)</div>
                                        <div style="font-weight: bold; color: rgba(76, 201, 240, 0.9);">${(200 * Math.sqrt(1/30)).toFixed(0)}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">v<sub>total</sub> (km/s)</div>
                                        <div style="font-weight: bold; color: rgba(255, 107, 107, 0.9);">${Math.sqrt(Math.pow(200 * Math.sqrt(1/30), 2) + Math.pow(250 * darkMatterPercent * (1 - Math.exp(-30/20)), 2)).toFixed(0)}</div>
                                    </div>
                                    
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Radio (kpc)</div>
                                        <div style="font-weight: bold;">${radius}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">v<sub>visible</sub> (km/s)</div>
                                        <div style="font-weight: bold; color: rgba(76, 201, 240, 0.9);">${(200 * Math.sqrt(1/radius)).toFixed(0)}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">v<sub>total</sub> (km/s)</div>
                                        <div style="font-weight: bold; color: rgba(255, 107, 107, 0.9);">${Math.sqrt(Math.pow(200 * Math.sqrt(1/radius), 2) + Math.pow(250 * darkMatterPercent * (1 - Math.exp(-radius/20)), 2)).toFixed(0)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="exportDataBtn" style="min-width: 200px;">
                            <i class="fas fa-download"></i> Exportar Datos CSV
                        </button>
                        <button class="btn btn-secondary" id="compareGalaxiesBtn" style="min-width: 200px;">
                            <i class="fas fa-project-diagram"></i> Comparar con Galaxias Reales
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
        
        document.getElementById('compareGalaxiesBtn').addEventListener('click', () => {
            alert('Comparando con datos de galaxias reales: NGC 3198, M33, Via Láctea (simulación)');
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        // Botón de simulación cósmica
        const simulateUniverseBtn = document.getElementById('simulateUniverseBtn');
        simulateUniverseBtn.addEventListener('click', simulateCosmicEvolution);
        
        // Botón de teorías
        const viewTheoriesBtn = document.getElementById('viewTheoriesBtn');
        viewTheoriesBtn.addEventListener('click', () => {
            document.getElementById('theoriesModal').classList.add('active');
        });
        
        // Botón de comparación
        const compareTheoriesBtn = document.getElementById('compareTheoriesBtn');
        compareTheoriesBtn.addEventListener('click', () => {
            document.getElementById('compareModal').classList.add('active');
        });
        
        // Cerrar modales
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('theoriesModal').classList.remove('active');
        });
        
        document.getElementById('closeCompareModal').addEventListener('click', () => {
            document.getElementById('compareModal').classList.remove('active');
        });
        
        // Cerrar modales al hacer clic fuera
        document.getElementById('theoriesModal').addEventListener('click', (e) => {
            if (e.target.id === 'theoriesModal') {
                document.getElementById('theoriesModal').classList.remove('active');
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
                document.getElementById('theoriesModal').classList.remove('active');
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

    // Función para simulación de evolución cósmica
    function simulateCosmicEvolution() {
        const btn = document.getElementById('simulateUniverseBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución cósmica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "Big Bang: t = 0 segundos...",
            "Inflación cósmica: t = 10⁻³⁶ s...",
            "Bariogénesis: t = 10⁻¹² s...",
            "Nucleosíntesis primordial: t = 3 min...",
            "Recombinación: t = 380,000 años...",
            "Era oscura: t = 150M - 1,000M años...",
            "Formación de primeras estrellas y galaxias...",
            "Estructura cósmica actual: t = 13.8G años"
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
            showCosmicEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
            
            // Efecto visual cósmico
            document.querySelectorAll('.card').forEach(card => {
                card.style.borderColor = 'var(--accent-tertiary)';
                card.style.boxShadow = '0 0 40px rgba(0, 180, 216, 0.4)';
                
                setTimeout(() => {
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 3000);
            });
        }, 5600);
    }

    // Función para mostrar resultados de evolución cósmica
    function showCosmicEvolutionResults() {
        const results = [
            { type: 'Tiempo total', value: '13.8G años', color: '#9d4edd', icon: 'fa-clock' },
            { type: 'Redshift z', value: '1100 → 0', color: '#ff9e00', icon: 'fa-arrows-alt-h' },
            { type: 'Temperatura CMB', value: '3000K → 2.7K', color: '#00b4d8', icon: 'fa-thermometer-half' },
            { type: 'Estructuras formadas', value: '10²²', color: '#4ade80', icon: 'fa-sitemap' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeCosmicModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Cósmica con Materia Oscura
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación de la formación de estructuras cósmicas en el modelo ΛCDM con materia oscura fría:</p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.95rem;">
                        <i class="fas fa-calculator"></i> Simulación N-cuerpos con 10⁷ partículas | Box size: 100 Mpc/h | Resolución: 1 kpc
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
                        <h4 style="color: var(--accent); margin-bottom: 1rem;">Con Materia Oscura</h4>
                        <ul class="theory-list">
                            <li>Estructuras se forman por inestabilidad gravitacional</li>
                            <li>Jerarquía bottom-up: pequeñas → grandes estructuras</li>
                            <li>Predice filamentos, vacíos, cúmulos observados</li>
                            <li>Consistente con espectro de potencia CMB</li>
                            <li>Explica abundancia de cúmulos de galaxias</li>
                            <li>Tiempo suficiente para formación (13.8G años)</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--accent-secondary); margin-bottom: 1rem;">Sin Materia Oscura</h4>
                        <ul class="theory-list theory-list-secondary">
                            <li>Estructuras no tienen tiempo de formarse</li>
                            <li>Materia bariónica es 5% insuficiente</li>
                            <li>No explica filamentos cósmicos observados</li>
                            <li>Inconsistente con fluctuaciones CMB</li>
                            <li>Subestima cúmulos de galaxias en factor 10</li>
                            <li>Universo sería demasiado homogéneo</li>
                        </ul>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Acuerdo con observaciones (ΛCDM + materia oscura)</span>
                        <span>99.9%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 99.9%;"></div>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                    <button class="btn" id="viewSimulationBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-video"></i> Ver Animación 3D
                    </button>
                    <button class="btn btn-secondary" id="downloadDataBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-database"></i> Descargar Datos de Simulación
                    </button>
                    <button class="btn btn-error" id="runFullSimBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-rocket"></i> Ejecutar Simulación Completa
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal cósmico
        document.getElementById('closeCosmicModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewSimulationBtn').addEventListener('click', () => {
            alert('Mostrando animación 3D de formación de estructura cósmica (simulación)');
            modal.remove();
        });
        
        document.getElementById('downloadDataBtn').addEventListener('click', () => {
            alert('Descargando datos de simulación N-cuerpos (10 GB, simulación)');
            modal.remove();
        });
        
        document.getElementById('runFullSimBtn').addEventListener('click', () => {
            alert('Ejecutando simulación completa con 10⁹ partículas en supercomputadora (simulación)');
            modal.remove();
        });
    }

    // Función para mostrar detalle de experimento
    function showExperimentDetail(experiment) {
        const details = {
            'XENONnT': {
                location: 'Laboratorio Nacional del Gran Sasso, Italia',
                depth: '1400 m de roca (3600 m.w.e.)',
                detector: '6.6 toneladas de xenón líquido',
                timeline: '2020-presente',
                results: 'Límites más estrictos para WIMPs >10 GeV',
                collaboration: '163 científicos, 28 instituciones'
            },
            'LUX-ZEPLIN': {
                location: 'Instalación Subterránea de Sanford, Dakota del Sur, EE.UU.',
                depth: '1478 m (4300 m.w.e.)',
                detector: '10 toneladas de xenón líquido',
                timeline: '2021-presente',
                results: 'Sensibilidad récord para WIMPs >30 GeV',
                collaboration: '37 instituciones, 250 científicos'
            },
            'Fermi-LAT': {
                location: 'Órbita terrestre baja (550 km)',
                mission: '2008-presente',
                detector: 'Telescopio de rayos gamma de par de partículas',
                energy: '20 MeV - 300 GeV',
                results: 'Límites en aniquilación de materia oscura en halo galáctico',
                collaboration: 'NASA, DOE, instituciones internacionales'
            },
            'IceCube': {
                location: 'Estación Amundsen-Scott, Polo Sur',
                depth: '1450-2450 m bajo el hielo',
                detector: '1 km³ de hielo instrumentado (5160 módulos ópticos)',
                timeline: '2010-presente',
                results: 'Búsqueda de neutrinos de desintegración de materia oscura en Sol/Tierra',
                collaboration: '300 científicos, 53 instituciones'
            },
            'LHC (ATLAS/CMS)': {
                location: 'CERN, Ginebra, Suiza',
                energy: '13.6 TeV (centro de masa)',
                detector: 'Detectores multipropósito de iones pesados',
                strategy: 'Búsqueda de partículas de materia oscura producidas en colisiones',
                results: 'Límites para WIMPs y partículas supersimétricas',
                collaboration: '3000+ científicos cada experimento'
            },
            'ADMX': {
                location: 'Universidad de Washington, EE.UU.',
                detector: 'Cavidad resonante superenfriada (∼100 mK) en campo magnético fuerte',
                frequency: '300 MHz - 2 GHz (buscando axiones 2-40 µeV)',
                timeline: '1996-presente (varias generaciones)',
                results: 'Regiones excluidas para axiones de materia oscura',
                collaboration: 'Varias instituciones norteamericanas'
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
                            <i class="fas fa-info-circle"></i> Detalles del Experimento:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${experimentDetails.location ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Ubicación</div>
                                    <div style="font-weight: 600;">${experimentDetails.location}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.depth ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Profundidad/Configuración</div>
                                    <div style="font-weight: 600;">${experimentDetails.depth}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.detector ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Detector</div>
                                    <div style="font-weight: 600;">${experimentDetails.detector}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.timeline ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período operativo</div>
                                    <div style="font-weight: 600;">${experimentDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.results ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Resultados principales</div>
                                    <div style="font-weight: 600;">${experimentDetails.results}</div>
                                </div>
                            ` : ''}
                            
                            ${experimentDetails.collaboration ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Colaboración</div>
                                    <div style="font-weight: 600;">${experimentDetails.collaboration}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${experiment.title} - Principio de detección</span><br>
                        <span class="code-keyword">Tipo:</span> ${experiment.title.includes('XENON') || experiment.title.includes('LUX') ? 'Detección directa (dispersión elástica)' : 
                            experiment.title.includes('Fermi') ? 'Detección indirecta (aniquilación → rayos gamma)' :
                            experiment.title.includes('IceCube') ? 'Detección indirecta (desintegración → neutrinos)' :
                            experiment.title.includes('LHC') ? 'Producción en colisionador' :
                            experiment.title.includes('ADMX') ? 'Conversión axión-fotón (efecto Primakoff)' : 'Varios métodos'}<br>
                        <span class="code-keyword">Partícula objetivo:</span> ${experiment.title.includes('XENON') || experiment.title.includes('LUX') ? 'WIMPs (χ)' :
                            experiment.title.includes('ADMX') ? 'Axiones (a)' :
                            experiment.title.includes('Fermi') ? 'WIMPs, partículas ligeras' :
                            experiment.title.includes('IceCube') ? 'WIMPs, neutrinos estériles' : 'Varias partículas'}<br>
                        <span class="code-keyword">Señal esperada:</span> ${experiment.title.includes('XENON') || experiment.title.includes('LUX') ? 'Recoil nuclear (keV)' :
                            experiment.title.includes('ADMX') ? 'Fotones de microondas' :
                            experiment.title.includes('Fermi') ? 'Exceso de rayos gamma' :
                            experiment.title.includes('IceCube') ? 'Exceso de neutrinos' : 'Firma específica en detector'}<br>
                        <span class="code-keyword">Estado actual:</span> ${experiment.status} | ${experiment.sensitivity ? `Sensibilidad: ${experiment.sensitivity}` : 'En operación'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="viewResultsBtn" style="background: ${experiment.color}; min-width: 200px;">
                            <i class="fas fa-chart-bar"></i> Ver Resultados Recientes
                        </button>
                        <button class="btn btn-secondary" id="simulateExperimentBtn" style="min-width: 200px;">
                            <i class="fas fa-flask"></i> Simular este Experimento
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
        
        document.getElementById('viewResultsBtn').addEventListener('click', () => {
            alert(`Mostrando resultados recientes de ${experiment.title}`);
            modal.remove();
        });
        
        document.getElementById('simulateExperimentBtn').addEventListener('click', () => {
            alert(`Simulando experimento ${experiment.title}`);
            modal.remove();
        });
    }
});