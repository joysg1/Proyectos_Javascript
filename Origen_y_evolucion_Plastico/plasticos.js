document.addEventListener('DOMContentLoaded', function() {
    console.log('Plásticos: Inicializando aplicación...');
    
    // Datos de la industria plástica
    const industryData = [
        {
            icon: 'fa-industry',
            title: 'BASF',
            description: 'Líder químico alemán, pionero en plásticos desde 1865. Productor de PS, PU, PA y especialidades.',
            color: '#2ecc71',
            status: 'Activo',
            contribution: 'Innovación en polímeros, sustentabilidad'
        },
        {
            icon: 'fa-oil-can',
            title: 'Dow Chemical',
            description: 'Gigante estadounidense, mayor productor de PE y PS. Innovador en empaques sostenibles.',
            color: '#3498db',
            status: 'Activo',
            contribution: 'PE, PS, empaques circulares'
        },
        {
            icon: 'fa-recycle',
            title: 'SABIC',
            description: 'Arabia Saudita, productor global de petroquímicos y plásticos de ingeniería.',
            color: '#e74c3c',
            status: 'Activo',
            contribution: 'Petroquímicos, composites'
        },
        {
            icon: 'fa-leaf',
            title: 'NatureWorks',
            description: 'Líder en bioplásticos PLA. Joint venture entre Cargill y PTT Global Chemical.',
            color: '#2ecc71',
            status: 'Activo',
            contribution: 'PLA, bioplásticos'
        },
        {
            icon: 'fa-flask',
            title: 'DuPont',
            description: 'Pionera en nylon (1935) y teflón (1938). Innovadora en polímeros de alto rendimiento.',
            color: '#9b59b6',
            status: 'Activo',
            contribution: 'Nylon, teflón, Kevlar'
        },
        {
            icon: 'fa-tint',
            title: 'ExxonMobil',
            description: 'Principal productor de poliolefinas (PE, PP). Enfoque en economía circular.',
            color: '#e67e22',
            status: 'Activo',
            contribution: 'PE, PP, reciclaje avanzado'
        }
    ];

    // Inicializar componentes
    initMolecularParticles();
    initIndustry();
    initEventListeners();
    initAnimations();
    initTimeline();
    initDegradationSimulation();

    // Función para inicializar partículas moleculares
    function initMolecularParticles() {
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
                let color, size, speed, symbol;
                
                if (type < 0.4) {
                    // Moléculas de carbono (verde)
                    color = `rgba(46, 204, 113, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 4 + 1;
                    speed = (Math.random() - 0.5) * 0.3;
                    symbol = 'C';
                } else if (type < 0.7) {
                    // Moléculas de hidrógeno (azul)
                    color = `rgba(52, 152, 219, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                    symbol = 'H';
                } else if (type < 0.9) {
                    // Moléculas de oxígeno (rojo)
                    color = `rgba(231, 76, 60, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3.5 + 1;
                    speed = (Math.random() - 0.5) * 0.4;
                    symbol = 'O';
                } else {
                    // Moléculas de cloro (amarillo)
                    color = `rgba(241, 196, 15, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.6;
                    symbol = 'Cl';
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.5,
                    color: color,
                    symbol: symbol,
                    pulseSpeed: Math.random() * 0.05 + 0.02,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.4 ? 'carbon' : type < 0.7 ? 'hydrogen' : type < 0.9 ? 'oxygen' : 'chlorine'
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
            gradient.addColorStop(0, 'rgba(26, 46, 26, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 18, 10, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar enlaces moleculares
            particles.forEach((particle, i) => {
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Dibujar enlace si las partículas están cerca
                    if (distance < 80) {
                        const opacity = 0.1 * (1 - distance / 80);
                        ctx.strokeStyle = `rgba(46, 204, 113, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            });
            
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
                
                // Dibujar partícula como átomo
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Efecto de brillo para átomos
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );
                
                gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`));
                gradient.addColorStop(1, particle.color.replace(/[\d.]+\)$/, `0)`));
                
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Símbolo químico
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.font = `${particle.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(particle.symbol, particle.x, particle.y);
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
        console.log('Partículas moleculares inicializadas');
    }

    // Función para inicializar industria
    function initIndustry() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de industria no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        industryData.forEach(company => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${company.color};">
                        <i class="fas ${company.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${company.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${company.color}20; color: ${company.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${company.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${company.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${company.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showCompanyDetail(company));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Industria inicializada: ' + industryData.length + ' compañías');
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
        
        // Observador para animación al hacer scroll
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

    // Función para inicializar simulación de degradación
    function initDegradationSimulation() {
        console.log('Inicializando simulación de degradación...');
        
        // Elementos del DOM
        const plasticTypeSlider = document.getElementById('plasticTypeSlider');
        const plasticTypeValue = document.getElementById('plasticTypeValue');
        const timeSlider = document.getElementById('timeSlider');
        const timeValue = document.getElementById('timeValue');
        const quantitySlider = document.getElementById('quantitySlider');
        const quantityValue = document.getElementById('quantityValue');
        const environmentTypeButtons = document.querySelectorAll('.environment-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('degradationCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !plasticTypeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        plasticTypeSlider.addEventListener('input', function() {
            const types = ['PE (Bolsas)', 'PP (Envases)', 'PET (Botellas)', 'PS (Espuma)', 'PVC (Tuberías)', 'PLA (Bioplástico)'];
            plasticTypeValue.textContent = types[this.value - 1];
        });
        
        timeSlider.addEventListener('input', function() {
            timeValue.textContent = `${this.value} años`;
        });
        
        quantitySlider.addEventListener('input', function() {
            quantityValue.textContent = `${this.value} kg`;
        });
        
        // Botones de tipo de entorno
        environmentTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                environmentTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runDegradationSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            plasticTypeSlider.value = 3;
            plasticTypeValue.textContent = 'PET (Botellas)';
            timeSlider.value = 50;
            timeValue.textContent = '50 años';
            quantitySlider.value = 100;
            quantityValue.textContent = '100 kg';
            environmentTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="landfill"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">PET (azul) persiste por siglos en vertedero, mientras bioplásticos (verde) se degradan en meses en compostaje</div>';
            
            // Ejecutar simulación con valores por defecto
            runDegradationSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showDegradationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runDegradationSimulation();
        }, 500);
        
        console.log('Simulación de degradación inicializada');
    }

    // Función para ejecutar simulación de degradación
    function runDegradationSimulation() {
        const canvas = document.getElementById('degradationCurveCanvas');
        const ctx = canvas.getContext('2d');
        const plasticType = parseInt(document.getElementById('plasticTypeSlider').value);
        const time = parseInt(document.getElementById('timeSlider').value);
        const quantity = parseInt(document.getElementById('quantitySlider').value);
        const environmentType = document.querySelector('.environment-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (tiempo)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (cantidad degradada %)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Tiempo (años)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Cantidad Degradada (%)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = (i * time) / 5;
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
        
        // Tiempos de degradación por tipo de plástico
        const plasticDegradation = {
            1: { // PE
                landfill: 0.001, ocean: 0.002, recycling: 95, compost: 0
            },
            2: { // PP
                landfill: 0.001, ocean: 0.0015, recycling: 90, compost: 0
            },
            3: { // PET
                landfill: 0.001, ocean: 0.002, recycling: 85, compost: 0
            },
            4: { // PS
                landfill: 0.0005, ocean: 0.001, recycling: 70, compost: 0
            },
            5: { // PVC
                landfill: 0.0005, ocean: 0.001, recycling: 30, compost: 0
            },
            6: { // PLA
                landfill: 0.05, ocean: 0.1, recycling: 80, compost: 90
            }
        };
        
        // Calcular curvas
        const points = 100;
        const degradationCurve = [];
        const microplasticCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const timePoint = (i * time) / points;
            
            // Tasa de degradación base
            const baseRate = plasticDegradation[plasticType][environmentType];
            
            // Degradación acumulada
            let degraded = 0;
            let microplastics = 0;
            
            if (environmentType === 'recycling') {
                // Reciclaje rápido
                degraded = Math.min(100, baseRate * Math.pow(timePoint, 0.3));
                microplastics = 0;
            } else if (environmentType === 'compost') {
                // Compostaje
                degraded = Math.min(100, baseRate * Math.pow(timePoint, 1.5));
                microplastics = 0;
            } else {
                // Degradación natural lenta
                degraded = Math.min(100, baseRate * timePoint);
                // Microplásticos acumulados
                microplastics = Math.min(100, 0.5 * baseRate * timePoint);
            }
            
            degradationCurve.push({time: timePoint, value: degraded});
            microplasticCurve.push({time: timePoint, value: microplastics});
        }
        
        // Dibujar curva de degradación
        ctx.strokeStyle = 'rgba(46, 204, 113, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        degradationCurve.forEach((point, i) => {
            const x = padding + (point.time / time) * graphWidth;
            const y = canvas.height - padding - (point.value / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva de microplásticos
        ctx.strokeStyle = 'rgba(231, 76, 60, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        microplasticCurve.forEach((point, i) => {
            const x = padding + (point.time / time) * graphWidth;
            const y = canvas.height - padding - (point.value / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar área bajo curva
        ctx.fillStyle = 'rgba(46, 204, 113, 0.15)';
        ctx.beginPath();
        
        degradationCurve.forEach((point, i) => {
            const x = padding + (point.time / time) * graphWidth;
            const y = canvas.height - padding - (point.value / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, canvas.height - padding);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        // Cerrar área
        ctx.lineTo(padding + graphWidth, canvas.height - padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Degradación
        ctx.fillStyle = 'rgba(46, 204, 113, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Degradación', canvas.width - 155, 32);
        
        // Microplásticos
        ctx.fillStyle = 'rgba(231, 76, 60, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Microplásticos', canvas.width - 155, 57);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const plasticNames = ['PE', 'PP', 'PET', 'PS', 'PVC', 'PLA'];
        const environmentNames = {
            landfill: 'vertedero',
            ocean: 'océano',
            recycling: 'reciclaje',
            compost: 'compostaje'
        };
        
        const finalDegraded = degradationCurve[degradationCurve.length - 1].value;
        
        if (finalDegraded < 10) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    ${plasticNames[plasticType-1]} persiste por siglos en ${environmentNames[environmentType]} (${finalDegraded.toFixed(1)}% degradado)
                </div>
            `;
        } else if (finalDegraded > 80) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    ${plasticNames[plasticType-1]} se degrada eficientemente en ${environmentNames[environmentType]} (${finalDegraded.toFixed(1)}% degradado)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--warning);">
                    <i class="fas fa-info-circle" style="margin-right: 0.5rem;"></i>
                    ${plasticNames[plasticType-1]} muestra degradación moderada en ${environmentNames[environmentType]} (${finalDegraded.toFixed(1)}% degradado)
                </div>
            `;
        }
    }

    // Función para mostrar datos de degradación
    function showDegradationData() {
        const plasticType = parseInt(document.getElementById('plasticTypeSlider').value);
        const time = parseInt(document.getElementById('timeSlider').value);
        const quantity = parseInt(document.getElementById('quantitySlider').value);
        const environmentType = document.querySelector('.environment-type-btn.active').dataset.type;
        
        const plasticNames = ['PE (Polietileno)', 'PP (Polipropileno)', 'PET (Tereftalato)', 'PS (Poliestireno)', 'PVC (Policloruro)', 'PLA (Ácido poliláctico)'];
        const environmentNames = {
            landfill: 'Vertedero',
            ocean: 'Océano',
            recycling: 'Reciclaje',
            compost: 'Compostaje'
        };
        
        const degradationRates = {
            1: { landfill: 1000, ocean: 500, recycling: 1, compost: -1 },
            2: { landfill: 800, ocean: 400, recycling: 1, compost: -1 },
            3: { landfill: 450, ocean: 200, recycling: 1, compost: -1 },
            4: { landfill: 1000, ocean: 500, recycling: 1, compost: -1 },
            5: { landfill: 1000, ocean: 500, recycling: 2, compost: -1 },
            6: { landfill: 100, ocean: 50, recycling: 1, compost: 0.5 }
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Degradación
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Plástico</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${plasticNames[plasticType-1]}</div>
                            </div>
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Entorno</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${environmentNames[environmentType]}</div>
                            </div>
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Período</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${time} años</div>
                            </div>
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Cantidad</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${quantity} kg</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Análisis de degradación ambiental</span><br>
                            <span class="code-keyword">Tiempo medio de degradación:</span> ${degradationRates[plasticType][environmentType] > 0 ? degradationRates[plasticType][environmentType] + ' años' : 'No aplicable'}<br>
                            <span class="code-keyword">Tasa de reciclaje actual:</span> ${plasticType <= 5 ? '15-30%' : '5-10%'}<br>
                            <span class="code-keyword">Emisiones CO₂ equivalente:</span> ${(quantity * 2.1).toFixed(1)} kg CO₂<br>
                            <span class="code-keyword">Cantidad residual después de ${time} años:</span> ${(quantity * (100 - plasticDegradation[plasticType][environmentType] * time) / 100).toFixed(1)} kg
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
            alert('Datos de degradación exportados como informe PDF');
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        if (simulateEvolutionBtn) {
            simulateEvolutionBtn.addEventListener('click', simulateIndustryEvolution);
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

    // Función para simulación de evolución industrial
    function simulateIndustryEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución industrial...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1862: Parkesina - Primer plástico semisintético...",
            "1907: Baquelita - Primer plástico totalmente sintético...",
            "1926: PVC - Policloruro de vinilo...",
            "1930: Poliestireno - PS para embalaje...",
            "1935: Nylon - Primera poliamida sintética...",
            "1938: Teflón - PTFE para aplicaciones especiales...",
            "1954: Polipropileno - Revolución del PP...",
            "1973: Botellas PET - Revolución del empaque...",
            "1990: Superación de 100M ton/año...",
            "2000: Bioplásticos PLA - Alternativas renovables...",
            "2020: 368M ton/año y crisis ambiental..."
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
            showIndustryEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 9600);
    }

    // Función para mostrar resultados de evolución industrial
    function showIndustryEvolutionResults() {
        const results = [
            { type: 'Producción anual', value: '368M ton', color: '#2ecc71', icon: 'fa-industry' },
            { type: 'Crecimiento anual', value: '3.5%', color: '#e74c3c', icon: 'fa-chart-line' },
            { type: 'Embalaje', value: '40%', color: '#3498db', icon: 'fa-box' },
            { type: 'Reciclaje efectivo', value: '9%', color: '#f1c40f', icon: 'fa-recycle' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Industrial del Plástico
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de los plásticos en la industria global desde 1862 hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución del plástico');
            modal.remove();
        });
    }

    // Función para mostrar detalle de compañía
    function showCompanyDetail(company) {
        const details = {
            'BASF': {
                contribution: 'Pionera en química de polímeros desde 1865. Innovación en PS, PU, PA y especialidades.',
                products: 'Poliestireno, poliuretanos, poliamidas, aditivos, masterbatches',
                timeline: '1865-presente',
                impact: 'Líder en innovación sostenible y economía circular'
            },
            'Dow Chemical': {
                contribution: 'Mayor productor mundial de poliolefinas. Innovador en empaques sostenibles y reciclaje.',
                products: 'Polietileno, poliestireno, poliuretanos, silicones',
                timeline: '1897-presente',
                impact: 'Impulsor de la revolución del empaque plástico'
            },
            'SABIC': {
                contribution: 'Productor global de petroquímicos y plásticos de ingeniería con enfoque en sostenibilidad.',
                products: 'Poliolefinas, PET, PC, composites, termoplásticos especiales',
                timeline: '1976-presente',
                impact: 'Conecta recursos energéticos con manufactura global'
            },
            'NatureWorks': {
                contribution: 'Líder mundial en bioplásticos PLA Ingeo®. Enfoque en materiales renovables.',
                products: 'PLA Ingeo® para empaques, fibras, productos moldeados',
                timeline: '1997-presente',
                impact: 'Pionera en la transición a plásticos de origen renovable'
            },
            'DuPont': {
                contribution: 'Inventora del nylon (1935) y teflón (1938). Innovadora en polímeros de alto rendimiento.',
                products: 'Nylon, teflón, Kevlar, Nomex, Tyvek, Zytel',
                timeline: '1802-presente',
                impact: 'Revolucionó textiles, empaques y materiales de ingeniería'
            },
            'ExxonMobil': {
                contribution: 'Principal productor de poliolefinas. Inversión en reciclaje avanzado y economía circular.',
                products: 'Polietileno, polipropileno, poliolefinas especiales',
                timeline: '1870-presente',
                impact: 'Escala masiva con enfoque en sostenibilidad'
            }
        };
        
        const companyDetails = details[company.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeCompanyModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${company.color}; margin-right: 1rem;">
                        <i class="fas ${company.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${company.color};">${company.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${company.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${company.color};">
                            <i class="fas fa-info-circle"></i> Detalles de la Compañía:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${companyDetails.contribution ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución a Plásticos</div>
                                    <div style="font-weight: 600;">${companyDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${companyDetails.products ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${companyDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${companyDetails.timeline ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${companyDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${companyDetails.impact ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto Industrial</div>
                                    <div style="font-weight: 600;">${companyDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${company.title} - Tecnologías e Innovaciones</span><br>
                        <span class="code-keyword">Enfoque actual:</span> Economía circular, sustentabilidad<br>
                        <span class="code-keyword">Capacidad producción:</span> Millones de toneladas anuales<br>
                        <span class="code-keyword">Inversión I+D:</span> $${Math.floor(Math.random() * 500) + 100}M anuales<br>
                        <span class="code-keyword">Estado:</span> ${company.status} - Líder en su segmento
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${company.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeCompanyModal').addEventListener('click', () => {
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
    console.log('Aplicación Plásticos inicializada correctamente');
});

// Variables globales necesarias
const plasticDegradation = {
    1: { landfill: 0.001, ocean: 0.002, recycling: 95, compost: 0 },
    2: { landfill: 0.001, ocean: 0.0015, recycling: 90, compost: 0 },
    3: { landfill: 0.001, ocean: 0.002, recycling: 85, compost: 0 },
    4: { landfill: 0.0005, ocean: 0.001, recycling: 70, compost: 0 },
    5: { landfill: 0.0005, ocean: 0.001, recycling: 30, compost: 0 },
    6: { landfill: 0.05, ocean: 0.1, recycling: 80, compost: 90 }
};