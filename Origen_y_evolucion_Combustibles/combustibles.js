document.addEventListener('DOMContentLoaded', function() {
    console.log('Combustibles: Inicializando aplicación...');
    
    // Datos de empresas y productores importantes
    const producersData = [
        {
            icon: 'fa-oil-can',
            title: 'Saudi Aramco',
            description: 'Empresa petrolera más grande del mundo. Controla las mayores reservas de petróleo convencional.',
            color: '#e63946',
            status: 'Activo',
            contribution: '15% producción mundial'
        },
        {
            icon: 'fa-gas-pump',
            title: 'ExxonMobil',
            description: 'Una de las mayores empresas de petróleo y gas. Líder en tecnología de refinación y exploración.',
            color: '#0077b6',
            status: 'Activo',
            contribution: 'Refinación, tecnología'
        },
        {
            icon: 'fa-industry',
            title: 'Shell',
            description: 'Multinacional anglo-holandesa. Pionera en GNL y diversificación hacia energías renovables.',
            color: '#ff9e00',
            status: 'Activo',
            contribution: 'GNL, transición energética'
        },
        {
            icon: 'fa-leaf',
            title: 'Neste',
            description: 'Líder mundial en biocombustibles renovables. Produce biodiesel avanzado a partir de residuos.',
            color: '#38b000',
            status: 'Activo',
            contribution: 'Biocombustibles avanzados'
        },
        {
            icon: 'fa-atom',
            title: 'AREVA (Orano)',
            description: 'Líder en energía nuclear. Procesamiento de uranio, fabricación de combustible nuclear.',
            color: '#ff6b6b',
            status: 'Activo',
            contribution: 'Combustible nuclear'
        },
        {
            icon: 'fa-bolt',
            title: 'Air Liquide',
            description: 'Líder mundial en gases industriales. Producción de hidrógeno y tecnologías de almacenamiento.',
            color: '#4ade80',
            status: 'Activo',
            contribution: 'Hidrógeno, gases industriales'
        }
    ];

    // Inicializar componentes
    initEnergyParticles();
    initProducers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initEnergySimulation();

    // Función para inicializar partículas energéticas
    function initEnergyParticles() {
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
                    // Partículas de fuego (rojo/naranja)
                    color = `rgba(230, 57, 70, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.85) {
                    // Partículas de energía (amarillo)
                    color = `rgba(255, 158, 0, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.6;
                } else {
                    // Partículas verdes (energía limpia)
                    color = `rgba(56, 176, 0, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'fire' : type < 0.85 ? 'energy' : 'clean'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de energía sutil
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
                if (particle.type === 'clean') {
                    // Energía limpia como triángulos
                    ctx.moveTo(particle.x, particle.y - particle.size);
                    ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
                    ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
                    ctx.closePath();
                } else {
                    // Fuego y energía como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'fire') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'energy') {
                        gradient.addColorStop(0, `rgba(255, 158, 0, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 158, 0, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(56, 176, 0, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(56, 176, 0, 0)');
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
        console.log('Partículas energéticas inicializadas');
    }

    // Función para inicializar productores
    function initProducers() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de productores no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        producersData.forEach(producer => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${producer.color};">
                        <i class="fas ${producer.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${producer.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${producer.color}20; color: ${producer.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${producer.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${producer.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${producer.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showProducerDetail(producer));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Productores inicializados: ' + producersData.length);
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

    // Función para inicializar simulación de energía
    function initEnergySimulation() {
        console.log('Inicializando simulación de energía...');
        
        // Elementos del DOM
        const fuelTypeSlider = document.getElementById('fuelTypeSlider');
        const fuelTypeValue = document.getElementById('fuelTypeValue');
        const energySlider = document.getElementById('energySlider');
        const energyValue = document.getElementById('energyValue');
        const efficiencySlider = document.getElementById('efficiencySlider');
        const efficiencyValue = document.getElementById('efficiencyValue');
        const deviceTypeButtons = document.querySelectorAll('.device-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('energyCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !fuelTypeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        fuelTypeSlider.addEventListener('input', function() {
            const fuels = ['Leña', 'Carbón', 'Gasolina', 'Diésel', 'Gas Natural', 'Hidrógeno'];
            fuelTypeValue.textContent = fuels[this.value - 1];
        });
        
        energySlider.addEventListener('input', function() {
            energyValue.textContent = `${this.value} MJ`;
        });
        
        efficiencySlider.addEventListener('input', function() {
            efficiencyValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de aplicación
        deviceTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                deviceTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runEnergySimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            fuelTypeSlider.value = 3;
            fuelTypeValue.textContent = 'Gasolina';
            energySlider.value = 1000;
            energyValue.textContent = '1000 MJ';
            efficiencySlider.value = 35;
            efficiencyValue.textContent = '35%';
            deviceTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="transport"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">La gasolina ofrece alta densidad energética pero altas emisiones; el hidrógeno es limpio pero costoso de almacenar</div>';
            
            // Ejecutar simulación con valores por defecto
            runEnergySimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runEnergySimulation();
        }, 500);
        
        console.log('Simulación de energía inicializada');
    }

    // Función para ejecutar simulación de energía
    function runEnergySimulation() {
        const canvas = document.getElementById('energyCurveCanvas');
        const ctx = canvas.getContext('2d');
        const fuelType = parseInt(document.getElementById('fuelTypeSlider').value);
        const energyAmount = parseInt(document.getElementById('energySlider').value);
        const efficiency = parseInt(document.getElementById('efficiencySlider').value) / 100;
        const applicationType = document.querySelector('.device-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (densidad energética MJ/kg)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (emisiones gCO₂/MJ)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Densidad Energética (MJ/kg)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Emisiones (gCO₂/MJ)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X (0-150 MJ/kg)
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = i * 30;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value.toString(), x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y (0-250 gCO₂/MJ)
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 50;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value.toString(), padding - 25, y + 3);
        }
        
        // Datos de combustibles
        const fuelData = [
            { name: 'Leña', density: 16, emissions: 100, cost: 2, color: '#8B4513' },
            { name: 'Carbón', density: 24, emissions: 95, cost: 3, color: '#333333' },
            { name: 'Gasolina', density: 46, emissions: 73, cost: 25, color: '#FFD700' },
            { name: 'Diésel', density: 45, emissions: 74, cost: 22, color: '#FFA500' },
            { name: 'Gas Natural', density: 55, emissions: 56, cost: 15, color: '#00BFFF' },
            { name: 'Hidrógeno', density: 142, emissions: 0, cost: 50, color: '#FF69B4' }
        ];
        
        const currentFuel = fuelData[fuelType - 1];
        
        // Ajustar según aplicación
        let adjustedEfficiency = efficiency;
        let adjustedEmissions = currentFuel.emissions;
        
        switch(applicationType) {
            case 'transport':
                adjustedEfficiency *= 0.8; // Motores menos eficientes
                break;
            case 'electricity':
                adjustedEfficiency *= 0.6; // Centrales eléctricas
                break;
            case 'industry':
                adjustedEfficiency *= 0.7; // Procesos industriales
                break;
            case 'residential':
                adjustedEfficiency *= 0.9; // Calefacción residencial
                break;
        }
        
        // Dibujar punto del combustible actual
        const x = padding + (currentFuel.density / 150) * graphWidth;
        const y = canvas.height - padding - (adjustedEmissions / 250) * graphHeight;
        
        // Dibujar línea de comparación con otros combustibles
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        fuelData.forEach(fuel => {
            const fuelX = padding + (fuel.density / 150) * graphWidth;
            const fuelY = canvas.height - padding - (fuel.emissions / 250) * graphHeight;
            
            if (fuel.name === currentFuel.name) {
                ctx.moveTo(fuelX, fuelY);
            } else {
                ctx.lineTo(fuelX, fuelY);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar puntos para todos los combustibles
        fuelData.forEach(fuel => {
            const fuelX = padding + (fuel.density / 150) * graphWidth;
            const fuelY = canvas.height - padding - (fuel.emissions / 250) * graphHeight;
            
            // Punto
            ctx.beginPath();
            ctx.arc(fuelX, fuelY, 6, 0, Math.PI * 2);
            ctx.fillStyle = fuel.color;
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Etiqueta
            ctx.fillStyle = 'white';
            ctx.font = 'bold 10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(fuel.name, fuelX, fuelY - 10);
        });
        
        // Destacar combustible actual
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = currentFuel.color;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Área de eficiencia
        const efficiencyRadius = adjustedEfficiency * 20;
        ctx.beginPath();
        ctx.arc(x, y, efficiencyRadius, 0, Math.PI * 2);
        ctx.strokeStyle = currentFuel.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Eficiencia
        ctx.fillStyle = currentFuel.color;
        ctx.beginPath();
        ctx.arc(canvas.width - 100, 30, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(currentFuel.name, canvas.width - 85, 35);
        
        // Círculo de eficiencia
        ctx.strokeStyle = currentFuel.color;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(canvas.width - 100, 60, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillText(`Eficiencia: ${(efficiency*100).toFixed(0)}%`, canvas.width - 85, 65);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const energyOutput = energyAmount * adjustedEfficiency;
        const emissionsTotal = (energyAmount * adjustedEmissions) / 1000; // kg CO₂
        
        conclusion.innerHTML = `
            <div class="result-text">
                <strong>${currentFuel.name}</strong>: ${energyOutput.toFixed(0)} MJ útiles, ${emissionsTotal.toFixed(1)} kg CO₂<br>
                <span style="color: ${currentFuel.emissions < 50 ? 'var(--success)' : 'var(--accent-secondary)'}; font-size: 0.9rem;">
                    ${currentFuel.emissions < 50 ? 'Bajo impacto ambiental' : 'Alto impacto ambiental'}
                </span>
            </div>
        `;
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const fuelType = parseInt(document.getElementById('fuelTypeSlider').value);
        const energyAmount = parseInt(document.getElementById('energySlider').value);
        const efficiency = parseInt(document.getElementById('efficiencySlider').value) / 100;
        const applicationType = document.querySelector('.device-type-btn.active').dataset.type;
        
        const fuels = ['Leña', 'Carbón', 'Gasolina', 'Diésel', 'Gas Natural', 'Hidrógeno'];
        const applicationNames = {
            'transport': 'Transporte',
            'electricity': 'Generación Eléctrica',
            'industry': 'Procesos Industriales',
            'residential': 'Uso Residencial'
        };
        
        const fuelData = [
            { density: 16, emissions: 100, cost: 2 },
            { density: 24, emissions: 95, cost: 3 },
            { density: 46, emissions: 73, cost: 25 },
            { density: 45, emissions: 74, cost: 22 },
            { density: 55, emissions: 56, cost: 15 },
            { density: 142, emissions: 0, cost: 50 }
        ];
        
        const currentFuel = fuelData[fuelType - 1];
        const energyOutput = energyAmount * efficiency;
        const emissionsTotal = (energyAmount * currentFuel.emissions) / 1000;
        const costTotal = (energyAmount / currentFuel.density) * currentFuel.cost;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación Energética
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Combustible</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${fuels[fuelType-1]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Aplicación</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${applicationNames[applicationType]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Energía Total</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${energyAmount} MJ</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Eficiencia</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(efficiency*100).toFixed(0)}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Resultados de la simulación</span><br>
                            <span class="code-keyword">Densidad energética:</span> ${currentFuel.density} MJ/kg<br>
                            <span class="code-keyword">Intensidad de carbono:</span> ${currentFuel.emissions} gCO₂/MJ<br>
                            <span class="code-keyword">Energía útil producida:</span> ${energyOutput.toFixed(0)} MJ<br>
                            <span class="code-keyword">Emisiones totales:</span> ${emissionsTotal.toFixed(1)} kg CO₂<br>
                            <span class="code-keyword">Costo estimado:</span> $${costTotal.toFixed(2)} USD
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
            simulateEvolutionBtn.addEventListener('click', simulateEnergyEvolution);
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

    // Función para simulación de evolución energética
    function simulateEnergyEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución energética...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "4000 a.C.: Uso de leña y biomasa primitiva...",
            "1700: Revolución del carbón y máquina de vapor...",
            "1859: Primer pozo de petróleo moderno...",
            "1908: Producción masiva del Ford Model T...",
            "1954: Primera central nuclear civil...",
            "1973: Primera crisis del petróleo...",
            "1997: Protocolo de Kioto sobre cambio climático...",
            "2015: Acuerdo de París sobre clima...",
            "Presente: Transición a renovables y vehículos eléctricos"
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
            showEnergyEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 7200);
    }

    // Función para mostrar resultados de evolución energética
    function showEnergyEvolutionResults() {
        const results = [
            { type: 'Consumo mundial', value: '600 EJ', color: '#e63946', icon: 'fa-fire' },
            { type: 'Dependencia fósiles', value: '84%', color: '#ff9e00', icon: 'fa-gas-pump' },
            { type: 'Emisiones CO₂', value: '36 Gt', color: '#333333', icon: 'fa-industry' },
            { type: 'Renovables 2023', value: '13%', color: '#38b000', icon: 'fa-leaf' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución del Sistema Energético Global
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de los combustibles en la civilización desde la prehistoria hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución energética');
            modal.remove();
        });
    }

    // Función para mostrar detalle de productor
    function showProducerDetail(producer) {
        const details = {
            'Saudi Aramco': {
                contribution: '15% producción petrolera mundial, reservas probadas 267 mil millones de barriles',
                products: 'Petróleo crudo, productos refinados, petroquímicos, GNL',
                timeline: '1933-presente',
                impact: 'Mayor empresa petrolera del mundo, influencia clave en mercados energéticos'
            },
            'ExxonMobil': {
                contribution: 'Tecnología de refinación avanzada, exploración en aguas profundas',
                products: 'Gasolina, diésel, lubricantes, petroquímicos, GNL',
                timeline: '1870-presente (como Standard Oil)',
                impact: 'Innovación en procesos de refinación, exploración global'
            },
            'Shell': {
                contribution: 'Pionera en cadena de valor de GNL, inversión en renovables',
                products: 'Combustibles, lubricantes, GNL, químicos, energías renovables',
                timeline: '1907-presente',
                impact: 'Transición hacia energía baja en carbono, líder en biocombustibles'
            },
            'Neste': {
                contribution: 'Líder mundial en biocombustibles renovables a partir de residuos',
                products: 'Biodiesel NEXBTL, combustible de aviación sostenible',
                timeline: '1948-presente',
                impact: 'Reducción de emisiones en transporte, economía circular'
            },
            'AREVA (Orano)': {
                contribution: 'Ciclo completo de combustible nuclear, reciclaje de combustible usado',
                products: 'Combustible nuclear, reactores, servicios de ciclo de combustible',
                timeline: '2001-presente',
                impact: 'Energía baja en carbono, gestión de residuos nucleares'
            },
            'Air Liquide': {
                contribution: 'Producción de hidrógeno, tecnologías de captura y almacenamiento de carbono',
                products: 'Hidrógeno, gases industriales y médicos, tecnologías',
                timeline: '1902-presente',
                impact: 'Descarbonización industrial, movilidad de hidrógeno'
            }
        };
        
        const producerDetails = details[producer.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeProducerModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${producer.color}; margin-right: 1rem;">
                        <i class="fas ${producer.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${producer.color};">${producer.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${producer.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${producer.color};">
                            <i class="fas fa-info-circle"></i> Detalles de la Empresa:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${producerDetails.contribution ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Energética</div>
                                    <div style="font-weight: 600;">${producerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${producerDetails.products ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${producerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${producerDetails.timeline ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${producerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${producerDetails.impact ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto Global</div>
                                    <div style="font-weight: 600;">${producerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${producer.title} - Tecnologías y contribuciones energéticas</span><br>
                        <span class="code-keyword">Sector energético:</span> ${producer.icon === 'fa-leaf' || producer.icon === 'fa-bolt' ? 'Renovable/alternativo' : 'Combustibles fósiles'}<br>
                        <span class="code-keyword">Empleados:</span> ${['~70,000', '~63,000', '~82,000', '~4,800', '~16,000', '~67,000'][producersData.findIndex(p => p.title === producer.title)]}<br>
                        <span class="code-keyword">Ingresos anuales:</span> ${['$600B', '$413B', '$381B', '$25B', '$3.6B', '$30B'][producersData.findIndex(p => p.title === producer.title)]}<br>
                        <span class="code-keyword">Estado actual:</span> ${producer.status}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${producer.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeProducerModal').addEventListener('click', () => {
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
    console.log('Aplicación Combustibles inicializada correctamente');
});