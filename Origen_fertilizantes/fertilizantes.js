document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const companiesData = [
        {
            icon: 'fa-industry',
            title: 'Nutrien',
            description: 'Mayor productor mundial de potasa, con operaciones integradas de minería, manufactura y distribución.',
            color: '#4edd4e',
            status: 'Global',
            production: '27M ton/año'
        },
        {
            icon: 'fa-ship',
            title: 'Yara International',
            description: 'Líder mundial en fertilizantes nitrogenados, con soluciones de precisión y sostenibilidad.',
            color: '#2cbf2c',
            status: 'Noruega/Global',
            production: '26M ton/año'
        },
        {
            icon: 'fa-mountain',
            title: 'Mosaic',
            description: 'Principal productor de fosfatos concentrados y potasa, con minas en EE.UU., Canadá y Brasil.',
            color: '#ff9e00',
            status: 'EE.UU./Global',
            production: '19M ton/año'
        },
        {
            icon: 'fa-fire',
            title: 'CF Industries',
            description: 'Mayor productor de amoníaco a nivel mundial, utilizando el proceso Haber-Bosch a gran escala.',
            color: '#00d8b4',
            status: 'EE.UU.',
            production: '15M ton/año'
        },
        {
            icon: 'fa-flask',
            title: 'ICL Group',
            description: 'Especialista en fertilizantes de potasa, fosfatos y productos especiales para agricultura.',
            color: '#ff6b6b',
            status: 'Israel/Global',
            production: '11M ton/año'
        },
        {
            icon: 'fa-leaf',
            title: 'Haifa Group',
            description: 'Pionero en fertilizantes solubles y de precisión, especializado en nutrición foliar y fertirriego.',
            color: '#38bdf8',
            status: 'Israel/Global',
            production: '3M ton/año'
        }
    ];

    // Inicializar componentes
    initSoilParticles();
    initCompanies();
    initEventListeners();
    initAnimations();
    initTimeline();
    initEfficiencySimulation();

    // Función para inicializar partículas de suelo y nutrientes
    function initSoilParticles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 180;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const type = Math.random();
                let color, size, speed;
                
                if (type < 0.5) {
                    // Partículas de suelo (marrón)
                    color = `rgba(139, 69, 19, ${Math.random() * 0.6 + 0.2})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.75) {
                    // Nutrientes (verde - nitrógeno)
                    color = `rgba(78, 221, 78, ${Math.random() * 0.5 + 0.2})`;
                    size = Math.random() * 4 + 1;
                    speed = (Math.random() - 0.5) * 0.6;
                } else if (type < 0.9) {
                    // Nutrientes (naranja - fósforo)
                    color = `rgba(255, 158, 0, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Agua (azul)
                    color = `rgba(0, 180, 216, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed,
                    color: color,
                    twinkleSpeed: Math.random() * 0.03 + 0.01,
                    twinkleOffset: Math.random() * Math.PI * 2,
                    type: type < 0.5 ? 'soil' : type < 0.75 ? 'nitrogen' : type < 0.9 ? 'phosphorus' : 'water'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de suelo sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(10, 18, 10, 0.1)');
            gradient.addColorStop(1, 'rgba(5, 10, 5, 0.3)');
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
                
                // Efecto de brillo para nutrientes
                if (particle.type !== 'soil' && particle.type !== 'water') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'nitrogen') {
                        gradient.addColorStop(0, `rgba(78, 221, 78, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(78, 221, 78, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(255, 158, 0, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 158, 0, 0)');
                    }
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                
                // Destello ocasional para nutrientes
                if ((particle.type === 'nitrogen' || particle.type === 'phosphorus') && Math.random() < 0.01) {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                    const glowColor = particle.type === 'nitrogen' ? 'rgba(78, 221, 78, 0.2)' : 'rgba(255, 158, 0, 0.2)';
                    ctx.fillStyle = glowColor;
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

    // Función para inicializar compañías
    function initCompanies() {
        const container = document.getElementById('experimentsContainer');
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        companiesData.forEach(company => {
            const card = document.createElement('div');
            card.className = 'card experiment-card';
            card.style.cursor = 'pointer';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${company.color};">
                        <i class="fas ${company.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${company.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${company.color}20; color: ${company.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${company.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Producción: ${company.production}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${company.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles de la compañía
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showCompanyDetail(company));
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

    // Función para inicializar simulación de eficiencia
    function initEfficiencySimulation() {
        const nitrogenSlider = document.getElementById('nitrogenSlider');
        const nitrogenValue = document.getElementById('nitrogenValue');
        const phSlider = document.getElementById('phSlider');
        const phValue = document.getElementById('phValue');
        const organicSlider = document.getElementById('organicSlider');
        const organicValue = document.getElementById('organicValue');
        const fertilizerTypeButtons = document.querySelectorAll('.fertilizer-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('efficiencyCurveCanvas');
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        nitrogenSlider.addEventListener('input', function() {
            nitrogenValue.textContent = `${this.value} kg/ha`;
        });
        
        phSlider.addEventListener('input', function() {
            const ph = this.value / 10;
            phValue.textContent = ph.toFixed(1);
        });
        
        organicSlider.addEventListener('input', function() {
            organicValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de fertilizante
        fertilizerTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                fertilizerTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runEfficiencySimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            nitrogenSlider.value = 150;
            nitrogenValue.textContent = '150 kg/ha';
            phSlider.value = 65;
            phValue.textContent = '6.5';
            organicSlider.value = 2.5;
            organicValue.textContent = '2.5%';
            fertilizerTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="urea"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">La eficiencia del fertilizante depende del tipo, dosis y condiciones del suelo</div>';
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runEfficiencySimulation();
        }, 1000);
    }

    // Función para ejecutar simulación de eficiencia
    function runEfficiencySimulation() {
        const canvas = document.getElementById('efficiencyCurveCanvas');
        const ctx = canvas.getContext('2d');
        const nitrogenDose = parseInt(document.getElementById('nitrogenSlider').value);
        const phValue = parseFloat(document.getElementById('phSlider').value) / 10;
        const organicMatter = parseFloat(document.getElementById('organicSlider').value);
        const fertilizerType = document.querySelector('.fertilizer-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (dosis de nitrógeno)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (rendimiento)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Dosis de N (kg/ha)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Rendimiento (t/ha)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = (i * 60);
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value.toString(), x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = (i * 2).toFixed(1);
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value, padding - 20, y + 3);
        }
        
        // Calcular curvas para diferentes tipos de fertilizantes
        const points = 100;
        const ureaCurve = [];
        const nitrateCurve = [];
        const controlledCurve = [];
        const organicCurve = [];
        
        // Factores de eficiencia según tipo
        const efficiencyFactors = {
            'urea': 0.6,
            'nitrate': 0.7,
            'controlled': 0.85,
            'organic': 0.4
        };
        
        // Efecto del pH en la eficiencia
        const phEffect = Math.max(0.5, Math.min(1.2, 1 - Math.abs(phValue - 6.5) * 0.2));
        
        // Efecto de materia orgánica
        const organicEffect = 0.8 + (organicMatter * 0.08);
        
        for (let i = 0; i <= points; i++) {
            const dose = (i * 300) / points;
            
            // Rendimiento base sin fertilizante
            const baseYield = 2.0;
            
            // Curva de respuesta para urea
            const ureaEfficiency = efficiencyFactors.urea * phEffect * organicEffect;
            const ureaYield = baseYield + (dose * 0.03 * ureaEfficiency) - (dose * dose * 0.00004);
            
            // Curva para nitrato de amonio
            const nitrateEfficiency = efficiencyFactors.nitrate * phEffect * organicEffect;
            const nitrateYield = baseYield + (dose * 0.032 * nitrateEfficiency) - (dose * dose * 0.000035);
            
            // Curva para liberación controlada
            const controlledEfficiency = efficiencyFactors.controlled * phEffect * organicEffect;
            const controlledYield = baseYield + (dose * 0.034 * controlledEfficiency) - (dose * dose * 0.00003);
            
            // Curva para orgánico
            const organicEfficiency = efficiencyFactors.organic * phEffect * organicEffect;
            const organicYield = baseYield + (dose * 0.02 * organicEfficiency) - (dose * dose * 0.00002);
            
            ureaCurve.push({dose, yield: ureaYield});
            nitrateCurve.push({dose, yield: nitrateYield});
            controlledCurve.push({dose, yield: controlledYield});
            organicCurve.push({dose, yield: organicYield});
        }
        
        // Dibujar curva para orgánico
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        organicCurve.forEach((point, i) => {
            const x = padding + (point.dose / 300) * graphWidth;
            const y = canvas.height - padding - ((point.yield - 2) / 10) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva para urea
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        ureaCurve.forEach((point, i) => {
            const x = padding + (point.dose / 300) * graphWidth;
            const y = canvas.height - padding - ((point.yield - 2) / 10) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva para nitrato
        ctx.strokeStyle = 'rgba(0, 180, 216, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        nitrateCurve.forEach((point, i) => {
            const x = padding + (point.dose / 300) * graphWidth;
            const y = canvas.height - padding - ((point.yield - 2) / 10) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva para liberación controlada (línea gruesa)
        ctx.strokeStyle = 'rgba(78, 221, 78, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        controlledCurve.forEach((point, i) => {
            const x = padding + (point.dose / 300) * graphWidth;
            const y = canvas.height - padding - ((point.yield - 2) / 10) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Marcar punto de dosis actual
        const currentDose = nitrogenDose;
        let currentYield;
        switch(fertilizerType) {
            case 'urea': currentYield = ureaCurve[Math.floor(currentDose / 3)].yield; break;
            case 'nitrate': currentYield = nitrateCurve[Math.floor(currentDose / 3)].yield; break;
            case 'controlled': currentYield = controlledCurve[Math.floor(currentDose / 3)].yield; break;
            case 'organic': currentYield = organicCurve[Math.floor(currentDose / 3)].yield; break;
        }
        
        const currentX = padding + (currentDose / 300) * graphWidth;
        const currentY = canvas.height - padding - ((currentYield - 2) / 10) * graphHeight;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(255, 158, 0, 0.9)';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Orgánico
        ctx.fillStyle = 'rgba(139, 69, 19, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Orgánico', canvas.width - 155, 32);
        
        // Urea
        ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Urea', canvas.width - 155, 57);
        
        // Nitrato
        ctx.fillStyle = 'rgba(0, 180, 216, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Nitrato Amónico', canvas.width - 155, 82);
        
        // Liberación controlada
        ctx.fillStyle = 'rgba(78, 221, 78, 0.9)';
        ctx.fillRect(canvas.width - 180, 95, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Liberación Controlada', canvas.width - 155, 107);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const efficiency = efficiencyFactors[fertilizerType] * phEffect * organicEffect * 100;
        
        if (efficiency < 50) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Eficiencia baja (${efficiency.toFixed(1)}%). Mejorar pH (óptimo 6.0-7.0) y materia orgánica (>3%).
                </div>
            `;
        } else if (efficiency < 70) {
            conclusion.innerHTML = `
                <div class="result-text">
                    <i class="fas fa-info-circle" style="color: var(--accent-light); margin-right: 0.5rem;"></i>
                    Eficiencia moderada (${efficiency.toFixed(1)}%). Considerar fertirriego o fertilizantes de mayor eficiencia.
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    ¡Alta eficiencia (${efficiency.toFixed(1)}%)! Buen manejo de fertilizantes y condiciones de suelo.
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const nitrogenDose = parseInt(document.getElementById('nitrogenSlider').value);
        const phValue = parseFloat(document.getElementById('phSlider').value) / 10;
        const organicMatter = parseFloat(document.getElementById('organicSlider').value);
        const fertilizerType = document.querySelector('.fertilizer-type-btn.active').dataset.type;
        
        // Factores de eficiencia según tipo
        const efficiencyFactors = {
            'urea': 0.6,
            'nitrate': 0.7,
            'controlled': 0.85,
            'organic': 0.4
        };
        
        // Efecto del pH en la eficiencia
        const phEffect = Math.max(0.5, Math.min(1.2, 1 - Math.abs(phValue - 6.5) * 0.2));
        
        // Efecto de materia orgánica
        const organicEffect = 0.8 + (organicMatter * 0.08);
        
        const totalEfficiency = efficiencyFactors[fertilizerType] * phEffect * organicEffect;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de la Simulación de Eficiencia
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Fertilizante</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${fertilizerType === 'urea' ? 'Urea' : fertilizerType === 'nitrate' ? 'Nitrato Amónico' : fertilizerType === 'controlled' ? 'Liberación Controlada' : 'Orgánico'}</div>
                            </div>
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Dosis de N</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${nitrogenDose} kg/ha</div>
                            </div>
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">pH del Suelo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${phValue.toFixed(1)}</div>
                            </div>
                            <div style="background: rgba(30, 60, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Materia Orgánica</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${organicMatter}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de Eficiencia de Uso de Nitrógeno (EUN)</span><br>
                            <span class="code-keyword">Factor tipo fertilizante:</span> ${(efficiencyFactors[fertilizerType] * 100).toFixed(0)}%<br>
                            <span class="code-keyword">Efecto del pH (${phValue.toFixed(1)}):</span> ${(phEffect * 100).toFixed(0)}%<br>
                            <span class="code-keyword">Efecto materia orgánica (${organicMatter}%):</span> ${(organicEffect * 100).toFixed(0)}%<br>
                            <span class="code-keyword">Eficiencia total estimada:</span> ${(totalEfficiency * 100).toFixed(1)}%<br>
                            <span class="code-keyword">N absorbido por cultivo:</span> ${(nitrogenDose * totalEfficiency).toFixed(0)} kg/ha<br>
                            <span class="code-keyword">Pérdidas potenciales:</span> ${(nitrogenDose * (1 - totalEfficiency)).toFixed(0)} kg/ha
                        </div>
                        
                        <div style="margin-top: 1.5rem;">
                            <h4 style="margin-bottom: 0.8rem; color: var(--accent-light);">
                                <i class="fas fa-calculator"></i> Rendimiento Estimado por Tipo
                            </h4>
                            <div style="background: rgba(30, 60, 30, 0.3); padding: 1rem; border-radius: 8px;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Tipo</div>
                                        <div style="font-weight: bold;">Urea</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">EUN</div>
                                        <div style="font-weight: bold; color: rgba(255, 107, 107, 0.9);">${(efficiencyFactors.urea * phEffect * organicEffect * 100).toFixed(1)}%</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Rendimiento</div>
                                        <div style="font-weight: bold;">${(2 + (nitrogenDose * 0.03 * efficiencyFactors.urea * phEffect * organicEffect) - (nitrogenDose * nitrogenDose * 0.00004)).toFixed(1)} t/ha</div>
                                    </div>
                                    
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Tipo</div>
                                        <div style="font-weight: bold;">Nitrato</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">EUN</div>
                                        <div style="font-weight: bold; color: rgba(0, 180, 216, 0.9);">${(efficiencyFactors.nitrate * phEffect * organicEffect * 100).toFixed(1)}%</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Rendimiento</div>
                                        <div style="font-weight: bold;">${(2 + (nitrogenDose * 0.032 * efficiencyFactors.nitrate * phEffect * organicEffect) - (nitrogenDose * nitrogenDose * 0.000035)).toFixed(1)} t/ha</div>
                                    </div>
                                    
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Tipo</div>
                                        <div style="font-weight: bold;">Controlado</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">EUN</div>
                                        <div style="font-weight: bold; color: rgba(78, 221, 78, 0.9);">${(efficiencyFactors.controlled * phEffect * organicEffect * 100).toFixed(1)}%</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Rendimiento</div>
                                        <div style="font-weight: bold;">${(2 + (nitrogenDose * 0.034 * efficiencyFactors.controlled * phEffect * organicEffect) - (nitrogenDose * nitrogenDose * 0.00003)).toFixed(1)} t/ha</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="exportDataBtn" style="min-width: 200px;">
                            <i class="fas fa-download"></i> Exportar Datos CSV
                        </button>
                        <button class="btn btn-secondary" id="compareFertilizersBtn" style="min-width: 200px;">
                            <i class="fas fa-project-diagram"></i> Comparar con Datos Reales
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
        
        document.getElementById('compareFertilizersBtn').addEventListener('click', () => {
            alert('Comparando con datos de ensayos reales: Maíz, trigo, arroz (simulación)');
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        // Botón de simulación de cultivo
        const simulateCropBtn = document.getElementById('simulateCropBtn');
        simulateCropBtn.addEventListener('click', simulateCropCycle);
        
        // Botón de compañías
        const viewCompaniesBtn = document.getElementById('viewCompaniesBtn');
        viewCompaniesBtn.addEventListener('click', () => {
            document.getElementById('companiesModal').classList.add('active');
        });
        
        // Botón de comparación
        const compareFertilizersBtn = document.getElementById('compareFertilizersBtn');
        compareFertilizersBtn.addEventListener('click', () => {
            document.getElementById('compareModal').classList.add('active');
        });
        
        // Cerrar modales
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('companiesModal').classList.remove('active');
        });
        
        document.getElementById('closeCompareModal').addEventListener('click', () => {
            document.getElementById('compareModal').classList.remove('active');
        });
        
        // Cerrar modales al hacer clic fuera
        document.getElementById('companiesModal').addEventListener('click', (e) => {
            if (e.target.id === 'companiesModal') {
                document.getElementById('companiesModal').classList.remove('active');
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
                document.getElementById('companiesModal').classList.remove('active');
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

    // Función para simulación de ciclo de cultivo
    function simulateCropCycle() {
        const btn = document.getElementById('simulateCropBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando ciclo de cultivo...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "Preparación del suelo: t = 0 días...",
            "Siembra: t = 1 día...",
            "Germinación: t = 5-10 días...",
            "Crecimiento vegetativo: t = 30-60 días...",
            "Aplicación de fertilizante: t = 45 días...",
            "Floración: t = 70-90 días...",
            "Llenado de grano: t = 90-120 días...",
            "Cosecha: t = 120-150 días"
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
            showCropCycleResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
            
            // Efecto visual agrícola
            document.querySelectorAll('.card').forEach(card => {
                card.style.borderColor = 'var(--accent-tertiary)';
                card.style.boxShadow = '0 0 40px rgba(0, 216, 180, 0.4)';
                
                setTimeout(() => {
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 3000);
            });
        }, 5600);
    }

    // Función para mostrar resultados de ciclo de cultivo
    function showCropCycleResults() {
        const results = [
            { type: 'Duración ciclo', value: '150 días', color: '#4edd4e', icon: 'fa-clock' },
            { type: 'Rendimiento final', value: '8.5 t/ha', color: '#ff9e00', icon: 'fa-weight-hanging' },
            { type: 'EUN alcanzada', value: '72%', color: '#00d8b4', icon: 'fa-percentage' },
            { type: 'Costo fertilizante', value: 'USD 250/ha', color: '#ff6b6b', icon: 'fa-dollar-sign' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeCropModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-seedling"></i> Simulación de Ciclo de Cultivo de Maíz
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación de un ciclo completo de maíz con manejo óptimo de fertilización según 4R:</p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.95rem;">
                        <i class="fas fa-calculator"></i> Modelo DSSAT | Cultivo: Maíz híbrido | Dosis: 180 kg N/ha, 80 kg P₂O₅/ha, 120 kg K₂O/ha
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
                        <h4 style="color: var(--accent); margin-bottom: 1rem;">Con Manejo 4R</h4>
                        <ul class="theory-list">
                            <li>Rendimiento máximo alcanzable</li>
                            <li>EUN de nitrógeno >70%</li>
                            <li>Pérdidas mínimas por lixiviación</li>
                            <li>Menor emisión de óxido nitroso</li>
                            <li>Balance positivo de nutrientes</li>
                            <li>Mayor rentabilidad económica</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--accent-secondary); margin-bottom: 1rem;">Manejo Convencional</h4>
                        <ul class="theory-list theory-list-secondary">
                            <li>Rendimiento 15-20% menor</li>
                            <li>EUN de nitrógeno 40-50%</li>
                            <li>Mayores pérdidas ambientales</li>
                            <li>Mayor emisión de gases efecto invernadero</li>
                            <li>Posible degradación del suelo</li>
                            <li>Menor rentabilidad a largo plazo</li>
                        </ul>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Mejora con manejo 4R vs convencional</span>
                        <span>35%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 35%;"></div>
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
                        <i class="fas fa-rocket"></i> Simular Diferentes Cultivos
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal de cultivo
        document.getElementById('closeCropModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewSimulationBtn').addEventListener('click', () => {
            alert('Mostrando animación 3D de crecimiento de cultivo (simulación)');
            modal.remove();
        });
        
        document.getElementById('downloadDataBtn').addEventListener('click', () => {
            alert('Descargando datos de simulación de cultivo (5 MB, simulación)');
            modal.remove();
        });
        
        document.getElementById('runFullSimBtn').addEventListener('click', () => {
            alert('Ejecutando simulaciones para trigo, arroz, soja (simulación)');
            modal.remove();
        });
    }

    // Función para mostrar detalle de compañía
    function showCompanyDetail(company) {
        const details = {
            'Nutrien': {
                location: 'Saskatoon, Canadá (Operaciones globales)',
                founded: '2018 (Fusión de PotashCorp y Agrium)',
                products: 'Potasa, nitrógeno, fosfatos, soluciones de precisión',
                capacity: '27 millones de toneladas anuales',
                revenue: 'USD 28.9 mil millones (2023)',
                innovation: 'Plataforma digital de agricultura de precisión'
            },
            'Yara International': {
                location: 'Oslo, Noruega (Operaciones en 60 países)',
                founded: '1905',
                products: 'Fertilizantes nitrogenados, micronutrientes, soluciones de precisión',
                capacity: '26 millones de toneladas anuales',
                revenue: 'USD 19.4 mil millones (2023)',
                innovation: 'Tecnología N-Sensor y sistemas de aplicación variable'
            },
            'Mosaic': {
                location: 'Tampa, Florida, EE.UU. (Operaciones globales)',
                founded: '2004',
                products: 'Fosfatos concentrados, potasa, fertilizantes mezclados',
                capacity: '19 millones de toneladas anuales',
                revenue: 'USD 13.7 mil millones (2023)',
                innovation: 'Tecnologías de producción sostenible y microEssentials'
            },
            'CF Industries': {
                location: 'Deerfield, Illinois, EE.UU.',
                founded: '1946',
                products: 'Amoníaco, urea, nitrato de amonio, UAN',
                capacity: '15 millones de toneladas anuales de N',
                revenue: 'USD 8.7 mil millones (2023)',
                innovation: 'Proceso Haber-Bosch optimizado, captura de carbono'
            },
            'ICL Group': {
                location: 'Tel Aviv, Israel (Operaciones globales)',
                founded: '1968',
                products: 'Potasa, fosfatos, fertilizantes especiales, aditivos',
                capacity: '11 millones de toneladas anuales',
                revenue: 'USD 7.5 mil millones (2023)',
                innovation: 'Fertilizantes de liberación controlada, productos foliares'
            },
            'Haifa Group': {
                location: 'Haifa, Israel (Operaciones en 100 países)',
                founded: '1966',
                products: 'Fertilizantes solubles, quelatos, productos foliares',
                capacity: '3 millones de toneladas anuales',
                revenue: 'USD 2.1 mil millones (2023)',
                innovation: 'Tecnología Multicote (liberación controlada), nutrición foliar'
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
                            ${companyDetails.location ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Ubicación</div>
                                    <div style="font-weight: 600;">${companyDetails.location}</div>
                                </div>
                            ` : ''}
                            
                            ${companyDetails.founded ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Fundación</div>
                                    <div style="font-weight: 600;">${companyDetails.founded}</div>
                                </div>
                            ` : ''}
                            
                            ${companyDetails.products ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${companyDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${companyDetails.capacity ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Capacidad Producción</div>
                                    <div style="font-weight: 600;">${companyDetails.capacity}</div>
                                </div>
                            ` : ''}
                            
                            ${companyDetails.revenue ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Ingresos (2023)</div>
                                    <div style="font-weight: 600;">${companyDetails.revenue}</div>
                                </div>
                            ` : ''}
                            
                            ${companyDetails.innovation ? `
                                <div style="background: rgba(30, 60, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Innovación</div>
                                    <div style="font-weight: 600;">${companyDetails.innovation}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${company.title} - Contribución a la Agricultura Global</span><br>
                        <span class="code-keyword">Mercado:</span> ${company.title.includes('Nutrien') || company.title.includes('Yara') || company.title.includes('Mosaic') ? 'Global, líder en su segmento' : 
                            company.title.includes('CF') ? 'EE.UU. y exportaciones, líder en amoníaco' :
                            company.title.includes('ICL') || company.title.includes('Haifa') ? 'Especializado, alta tecnología' : 'Variado'}<br>
                        <span class="code-keyword">Tecnología:</span> ${company.title.includes('Nutrien') ? 'Digital, agricultura de precisión' :
                            company.title.includes('Yara') ? 'Sensores, aplicación variable' :
                            company.title.includes('Mosaic') ? 'Producción eficiente, productos especiales' :
                            company.title.includes('CF') ? 'Proceso Haber-Bosch optimizado' :
                            company.title.includes('ICL') ? 'Liberación controlada, especialidades' : 'Fertilizantes solubles, foliares'}<br>
                        <span class="code-keyword">Sostenibilidad:</span> ${company.title.includes('Nutrien') || company.title.includes('Yara') ? 'Enfoque en reducción de emisiones y eficiencia' :
                            company.title.includes('Mosaic') || company.title.includes('CF') ? 'Optimización procesos, captura carbono' :
                            company.title.includes('ICL') || company.title.includes('Haifa') ? 'Productos de alta eficiencia, menor impacto' : 'Variado'}<br>
                        <span class="code-keyword">Estado actual:</span> ${company.status} | ${company.production ? `Producción: ${company.production}` : 'Operando globalmente'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="viewFinancialsBtn" style="background: ${company.color}; min-width: 200px;">
                            <i class="fas fa-chart-line"></i> Ver Datos Financieros
                        </button>
                        <button class="btn btn-secondary" id="simulateProductionBtn" style="min-width: 200px;">
                            <i class="fas fa-industry"></i> Simular Proceso de Producción
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
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewFinancialsBtn').addEventListener('click', () => {
            alert(`Mostrando datos financieros de ${company.title}`);
            modal.remove();
        });
        
        document.getElementById('simulateProductionBtn').addEventListener('click', () => {
            alert(`Simulando proceso de producción de ${company.title}`);
            modal.remove();
        });
    }
});