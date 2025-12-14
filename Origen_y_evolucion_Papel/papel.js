document.addEventListener('DOMContentLoaded', function() {
    console.log('Evolución del Papel: Inicializando aplicación...');
    
    // Datos de procesos de fabricación históricos
    const processesData = [
        {
            icon: 'fa-leaf',
            title: 'Método Chino Tradicional',
            description: 'Proceso manual desarrollado por Cai Lun usando fibras de morera, trapos viejos y redes de pesca.',
            color: '#8b7355',
            status: 'Histórico',
            period: '105 d.C. - Siglo XIX'
        },
        {
            icon: 'fa-water',
            title: 'Molinos Hidráulicos Árabes',
            description: 'Primeros molinos papeleros accionados por agua en Samarkanda, usando martillos hidráulicos para pulpa.',
            color: '#7a9e7e',
            status: 'Histórico',
            period: '751 d.C. - 1300'
        },
        {
            icon: 'fa-industry',
            title: 'Máquina Fourdrinier',
            description: 'Primera máquina continua de papel inventada por Nicolas-Louis Robert, revolucionando la producción industrial.',
            color: '#d4a76a',
            status: 'En uso mejorado',
            period: '1799 - Presente'
        },
        {
            icon: 'fa-recycle',
            title: 'Producción Moderna Reciclada',
            description: 'Proceso automatizado con alta tasa de reciclaje, tratamiento químico y control ambiental avanzado.',
            color: '#8ba3c9',
            status: 'Actual',
            period: '1950 - Presente'
        },
        {
            icon: 'fa-tree',
            title: 'Pulpa Química de Madera',
            description: 'Proceso Kraft desarrollado por Carl F. Dahl, permitiendo uso de maderas duras para papel de alta calidad.',
            color: '#7a9e7e',
            status: 'Actual',
            period: '1879 - Presente'
        },
        {
            icon: 'fa-wind',
            title: 'Producción Sostenible',
            description: 'Tecnologías actuales con energía renovable, circuito cerrado de agua y mínima huella ambiental.',
            color: '#4ade80',
            status: 'Emergente',
            period: '2000 - Presente'
        }
    ];

    // Inicializar componentes
    initFiberParticles();
    initProcesses();
    initEventListeners();
    initAnimations();
    initTimeline();
    initFabricationSimulation();

    // Función para inicializar partículas de fibra
    function initFiberParticles() {
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
                
                if (type < 0.7) {
                    // Fibras de celulosa (tonos marrones)
                    color = `rgba(139, 115, 85, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 1;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.9) {
                    // Partículas de agua (azules)
                    color = `rgba(139, 177, 205, ${Math.random() * 0.2 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.4;
                } else {
                    // Partículas de energía (doradas)
                    color = `rgba(212, 167, 106, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
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
                    type: type < 0.7 ? 'fiber' : type < 0.9 ? 'water' : 'energy',
                    length: type < 0.7 ? Math.random() * 30 + 10 : 0
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de textura de papel sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 22, 18, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 8, 6, 0.3)');
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
                ctx.save();
                ctx.translate(particle.x, particle.y);
                
                // Forma diferente según tipo
                if (particle.type === 'fiber') {
                    // Fibras como líneas alargadas
                    ctx.rotate(Math.atan2(particle.speedY, particle.speedX));
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    ctx.fillRect(-particle.length/2, -particle.size/2, particle.length, particle.size);
                } else {
                    // Otras partículas como círculos
                    ctx.beginPath();
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    
                    if (particle.type === 'energy') {
                        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 3);
                        gradient.addColorStop(0, `rgba(212, 167, 106, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(212, 167, 106, 0)');
                        ctx.fillStyle = gradient;
                    } else {
                        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    }
                    
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
        console.log('Partículas de fibra inicializadas');
    }

    // Función para inicializar procesos
    function initProcesses() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de procesos no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        processesData.forEach(process => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${process.color};">
                        <i class="fas ${process.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${process.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${process.color}20; color: ${process.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${process.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Periodo: ${process.period}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${process.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showProcessDetail(process));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Procesos inicializados: ' + processesData.length);
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

    // Función para inicializar simulación de fabricación
    function initFabricationSimulation() {
        console.log('Inicializando simulación de fabricación...');
        
        // Elementos del DOM
        const paperTypeSlider = document.getElementById('paperTypeSlider');
        const paperTypeValue = document.getElementById('paperTypeValue');
        const energySlider = document.getElementById('energySlider');
        const energyValue = document.getElementById('energyValue');
        const waterSlider = document.getElementById('waterSlider');
        const waterValue = document.getElementById('waterValue');
        const materialTypeButtons = document.querySelectorAll('.material-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('impactCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !paperTypeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        paperTypeSlider.addEventListener('input', function() {
            const types = ['Papel Periódico', 'Papel Reciclado', 'Papel de Oficina', 'Papel Artístico'];
            paperTypeValue.textContent = types[this.value - 1];
        });
        
        energySlider.addEventListener('input', function() {
            energyValue.textContent = `${this.value}%`;
        });
        
        waterSlider.addEventListener('input', function() {
            waterValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de material
        materialTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                materialTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runImpactSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            paperTypeSlider.value = 3;
            paperTypeValue.textContent = 'Papel de Oficina';
            energySlider.value = 65;
            energyValue.textContent = '65%';
            waterSlider.value = 85;
            waterValue.textContent = '85%';
            materialTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="wood-pulp"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">El papel reciclado (verde) reduce significativamente el impacto ambiental frente al virgen (rojo)</div>';
            
            // Ejecutar simulación con valores por defecto
            runImpactSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showImpactData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runImpactSimulation();
        }, 500);
        
        console.log('Simulación de fabricación inicializada');
    }

    // Función para ejecutar simulación de impacto ambiental
    function runImpactSimulation() {
        const canvas = document.getElementById('impactCurveCanvas');
        const ctx = canvas.getContext('2d');
        const paperType = parseInt(document.getElementById('paperTypeSlider').value);
        const energyPercent = parseInt(document.getElementById('energySlider').value) / 100;
        const waterPercent = parseInt(document.getElementById('waterSlider').value) / 100;
        const materialType = document.querySelector('.material-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (parámetros ambientales)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (impacto relativo)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Parámetros Ambientales', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Impacto Relativo (0-100%)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        const xLabels = ['Agua', 'Energía', 'CO₂', 'Residuos', 'Reciclabilidad'];
        for (let i = 0; i < 5; i++) {
            const x = padding + ((i + 1) * graphWidth) / 6;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(xLabels[i], x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 20;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value.toString() + '%', padding - 25, y + 3);
        }
        
        // Impacto según tipo de papel
        const paperImpacts = {
            1: [85, 75, 60, 40, 20],  // Periódico
            2: [40, 50, 30, 20, 80],  // Reciclado
            3: [70, 65, 55, 35, 50],  // Oficina
            4: [60, 70, 45, 30, 40]   // Artístico
        };
        
        // Impacto según material
        const materialImpacts = {
            'wood-pulp': [85, 75, 70, 50, 30],
            'recycled': [40, 50, 30, 20, 80],
            'cotton': [60, 80, 40, 25, 40],
            'bamboo': [50, 60, 35, 30, 60]
        };
        
        // Ajustar por eficiencia energética y recirculación de agua
        const baseImpact = paperImpacts[paperType];
        const materialImpact = materialImpacts[materialType];
        
        // Calcular impacto combinado
        const combinedImpact = [];
        for (let i = 0; i < 5; i++) {
            let impact = (baseImpact[i] * 0.6 + materialImpact[i] * 0.4);
            
            // Ajustar por eficiencia energética (índice 1)
            if (i === 1) impact *= (1 - energyPercent * 0.5);
            
            // Ajustar por recirculación de agua (índice 0)
            if (i === 0) impact *= (1 - waterPercent * 0.6);
            
            combinedImpact.push(Math.min(100, Math.max(0, impact)));
        }
        
        // Dibujar impacto base (papel)
        ctx.strokeStyle = 'rgba(201, 125, 96, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        baseImpact.forEach((impact, i) => {
            const x = padding + ((i + 1) * graphWidth) / 6;
            const y = canvas.height - padding - (impact / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Puntos
            ctx.fillStyle = 'rgba(201, 125, 96, 0.9)';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.stroke();
        
        // Dibujar impacto material
        ctx.strokeStyle = 'rgba(139, 115, 85, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        materialImpact.forEach((impact, i) => {
            const x = padding + ((i + 1) * graphWidth) / 6;
            const y = canvas.height - padding - (impact / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Puntos
            ctx.fillStyle = 'rgba(139, 115, 85, 0.9)';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar impacto combinado (real)
        ctx.strokeStyle = 'rgba(122, 158, 126, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        combinedImpact.forEach((impact, i) => {
            const x = padding + ((i + 1) * graphWidth) / 6;
            const y = canvas.height - padding - (impact / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Puntos
            ctx.fillStyle = 'rgba(122, 158, 126, 1)';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.stroke();
        
        // Rellenar área combinada
        ctx.fillStyle = 'rgba(122, 158, 126, 0.15)';
        ctx.beginPath();
        
        combinedImpact.forEach((impact, i) => {
            const x = padding + ((i + 1) * graphWidth) / 6;
            const y = canvas.height - padding - (impact / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, canvas.height - padding);
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        // Cerrar el área
        for (let i = combinedImpact.length - 1; i >= 0; i--) {
            const x = padding + ((i + 1) * graphWidth) / 6;
            ctx.lineTo(x, canvas.height - padding);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Impacto base
        ctx.fillStyle = 'rgba(201, 125, 96, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Impacto base papel', canvas.width - 155, 32);
        
        // Impacto material
        ctx.fillStyle = 'rgba(139, 115, 85, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Impacto material', canvas.width - 155, 57);
        
        // Impacto real
        ctx.fillStyle = 'rgba(122, 158, 126, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Impacto real (combinado)', canvas.width - 155, 82);
        
        // Calcular impacto promedio
        const avgImpact = combinedImpact.reduce((a, b) => a + b, 0) / combinedImpact.length;
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        
        if (avgImpact < 40) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-leaf" style="margin-right: 0.5rem;"></i>
                    Bajo impacto ambiental (${avgImpact.toFixed(1)}% promedio)
                </div>
            `;
        } else if (avgImpact < 60) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--warning);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Impacto ambiental moderado (${avgImpact.toFixed(1)}% promedio)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--danger);">
                    <i class="fas fa-times-circle" style="margin-right: 0.5rem;"></i>
                    Alto impacto ambiental (${avgImpact.toFixed(1)}% promedio)
                </div>
            `;
        }
    }

    // Función para mostrar datos de impacto
    function showImpactData() {
        const paperType = parseInt(document.getElementById('paperTypeSlider').value);
        const energyPercent = parseInt(document.getElementById('energySlider').value);
        const waterPercent = parseInt(document.getElementById('waterSlider').value);
        const materialType = document.querySelector('.material-type-btn.active').dataset.type;
        
        const paperTypes = ['Papel Periódico', 'Papel Reciclado', 'Papel de Oficina', 'Papel Artístico'];
        const materialNames = {
            'wood-pulp': 'Pulpa de Madera Virgen',
            'recycled': 'Material Reciclado',
            'cotton': 'Algodón/Lino',
            'bamboo': 'Bambú'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Impacto Ambiental
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(40, 35, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Papel</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${paperTypes[paperType-1]}</div>
                            </div>
                            <div style="background: rgba(40, 35, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Materia Prima</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${materialNames[materialType]}</div>
                            </div>
                            <div style="background: rgba(40, 35, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Energía Renovable</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${energyPercent}%</div>
                            </div>
                            <div style="background: rgba(40, 35, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Agua Recirculada</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${waterPercent}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Análisis de Impacto Ambiental Relativo</span><br>
                            <span class="code-keyword">Consumo de agua:</span> ${materialType === 'recycled' ? '10-20 L/kg' : materialType === 'bamboo' ? '15-25 L/kg' : materialType === 'cotton' ? '20-30 L/kg' : '25-50 L/kg'}<br>
                            <span class="code-keyword">Consumo energético:</span> ${materialType === 'recycled' ? '8-12 MJ/kg' : '12-25 MJ/kg'}<br>
                            <span class="code-keyword">Emisiones CO₂:</span> ${materialType === 'recycled' ? '0.5-1.0 kg/kg' : '1.0-2.5 kg/kg'}<br>
                            <span class="code-keyword">Tasa reciclaje potencial:</span> ${materialType === 'recycled' ? '85-95%' : materialType === 'wood-pulp' ? '70-80%' : materialType === 'bamboo' ? '75-85%' : '60-70%'}
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
            alert('Análisis de impacto ambiental exportado');
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
        
        // Botón de comparación (renombrado)
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
            "3000 a.C.: Papiro en Egipto...",
            "105 d.C.: Cai Lun inventa el papel en China...",
            "751 d.C.: Batalla de Talas - papel llega al mundo árabe...",
            "1151 d.C.: Primer molino papelero en Europa (Xátiva)...",
            "1440: Imprenta de Gutenberg - explosión demanda papel...",
            "1799: Máquina Fourdrinier - producción industrial...",
            "1844: Pulpa química de madera - celulosa...",
            "Siglo XX: Automatización y producción masiva...",
            "Presente: Sostenibilidad y reciclaje masivo"
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
            { type: 'Años de historia', value: '2000+', color: '#8b7355', icon: 'fa-history' },
            { type: 'Producción anual', value: '420M ton', color: '#d4a76a', icon: 'fa-industry' },
            { type: 'Tasa reciclaje UE', value: '72%', color: '#7a9e7e', icon: 'fa-recycle' },
            { type: 'Reducción impacto', value: '40%', color: '#8ba3c9', icon: 'fa-leaf' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Histórica del Papel
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto del papel en la civilización desde su invención en China hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución del papel');
            modal.remove();
        });
    }

    // Función para mostrar detalle de proceso
    function showProcessDetail(process) {
        const details = {
            'Método Chino Tradicional': {
                steps: '1. Cocción de fibras 2. Golpeteo manual 3. Formación en tamiz 4. Secado al sol',
                materials: 'Fibras de morera, trapos de cáñamo/lino, redes de pesca, agua',
                output: '10-20 hojas/día, grosor irregular, alta durabilidad',
                legacy: 'Método base por 1700 años, secreto estatal hasta 751 d.C.'
            },
            'Molinos Hidráulicos Árabes': {
                steps: '1. Martillos hidráulicos para pulpa 2. Tamices de bambú 3. Prensado 4. Secado',
                materials: 'Trapos de lino/cáñamo, agua corriente, cola de almidón',
                output: '200-500 hojas/día, mayor uniformidad',
                legacy: 'Difusión del papel al mundo islámico y luego a Europa'
            },
            'Máquina Fourdrinier': {
                steps: '1. Pulpa en suspensión 2. Cinta transportadora 3. Prensado 4. Secado con cilindros',
                materials: 'Trapos o pulpa mecánica, agua, almidón, cargas minerales',
                output: 'Rollos continuos de 1-5 metros de ancho, alta productividad',
                legacy: 'Revolución industrial del papel, producción masiva, estandarización'
            },
            'Producción Moderna Reciclada': {
                steps: '1. Desintegración 2. Destintado 3. Refinado 4. Formación 5. Prensado 6. Secado',
                materials: 'Papel usado, agua, químicos destintantes, aditivos',
                output: 'Rollos de 8-10m ancho, 100-200 km/h velocidad',
                legacy: 'Reducción impacto ambiental, economía circular, alta eficiencia'
            },
            'Pulpa Química de Madera': {
                steps: '1. Cocción con químicos 2. Lavado 3. Blanqueo 4. Formación',
                materials: 'Madera, hidróxido de sodio, sulfuro de sodio, agua',
                output: 'Pulpa de alta calidad para papel fino, alta resistencia',
                legacy: 'Permitió uso de maderas duras, producción a gran escala'
            },
            'Producción Sostenible': {
                steps: '1. Materias primas sostenibles 2. Circuito cerrado de agua 3. Energía renovable 4. Emisiones controladas',
                materials: 'Fibras certificadas FSC, agua recirculada, aditivos biodegradables',
                output: 'Papel con mínima huella ambiental, certificaciones ecológicas',
                legacy: 'Futuro de la industria papelera, responsabilidad ambiental'
            }
        };
        
        const processDetails = details[process.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeProcessModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${process.color}; margin-right: 1rem;">
                        <i class="fas ${process.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${process.color};">${process.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${process.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${process.color};">
                            <i class="fas fa-info-circle"></i> Detalles del Proceso:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${processDetails.steps ? `
                                <div style="background: rgba(40, 35, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Pasos Principales</div>
                                    <div style="font-weight: 600;">${processDetails.steps}</div>
                                </div>
                            ` : ''}
                            
                            ${processDetails.materials ? `
                                <div style="background: rgba(40, 35, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Materiales Utilizados</div>
                                    <div style="font-weight: 600;">${processDetails.materials}</div>
                                </div>
                            ` : ''}
                            
                            ${processDetails.output ? `
                                <div style="background: rgba(40, 35, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Producción y Características</div>
                                    <div style="font-weight: 600;">${processDetails.output}</div>
                                </div>
                            ` : ''}
                            
                            ${processDetails.legacy ? `
                                <div style="background: rgba(40, 35, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Legado Histórico</div>
                                    <div style="font-weight: 600;">${processDetails.legacy}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${process.title} - Impacto en la evolución del papel</span><br>
                        <span class="code-keyword">Periodo activo:</span> ${process.period}<br>
                        <span class="code-keyword">Estado actual:</span> ${process.status}<br>
                        <span class="code-keyword">Innovación clave:</span> ${process.title.includes('Chino') ? 'Primera fabricación sistemática' : 
                            process.title.includes('Árabes') ? 'Mecanización con energía hidráulica' :
                            process.title.includes('Fourdrinier') ? 'Producción continua industrial' :
                            process.title.includes('Reciclada') ? 'Economía circular y sostenibilidad' :
                            process.title.includes('Madera') ? 'Uso de celulosa de madera' : 'Enfoque ambiental integral'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${process.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeProcessModal').addEventListener('click', () => {
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
    console.log('Aplicación Evolución del Papel inicializada correctamente');
});