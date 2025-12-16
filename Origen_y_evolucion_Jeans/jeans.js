document.addEventListener('DOMContentLoaded', function() {
    console.log('Jeans Evolution: Inicializando aplicación...');
    
    // Datos de marcas icónicas
    const brandsData = [
        {
            icon: 'fa-flag-usa',
            title: 'Levi\'s',
            description: 'Fundada en 1853 por Levi Strauss. Patentó los primeros jeans con remaches en 1873. Icono cultural mundial.',
            color: '#2a5c8b',
            status: 'Activo',
            contribution: 'Jeans 501, denim azul'
        },
        {
            icon: 'fa-horse',
            title: 'Wrangler',
            description: 'Creada en 1947, enfocada en vaqueros para cowboys. Popular en rodeos y cultura western americana.',
            color: '#8b2a2a',
            status: 'Activo',
            contribution: 'Jeans cowboy, Wrangler 13MWZ'
        },
        {
            icon: 'fa-leaf',
            title: 'Lee',
            description: 'Fundada en 1889. Introdujo los primeros jeans con cierre en 1926. Popular en Europa y Asia.',
            color: '#8b6a2a',
            status: 'Activo',
            contribution: 'Primer cierre, Rider jeans'
        },
        {
            icon: 'fa-gem',
            title: 'Diesel',
            description: 'Marca italiana fundada en 1978. Revolucionó el denim con lavados, roturas y estilo premium.',
            color: '#8b2a5c',
            status: 'Activo',
            contribution: 'Denim premium, diseño vanguardista'
        },
        {
            icon: 'fa-crown',
            title: 'True Religion',
            description: 'Lanzada en 2002. Símbolo de lujo en denim con parches en forma de buda y costuras contrastantes.',
            color: '#5c8b2a',
            status: 'Activo',
            contribution: 'Denim de lujo, bordados'
        },
        {
            icon: 'fa-recycle',
            title: 'G-Star RAW',
            description: 'Fundada en 1989 en Holanda. Innovadora en cortes 3D y sostenibilidad. Enfoque en diseño arquitectónico.',
            color: '#2a8b8b',
            status: 'Activo',
            contribution: 'Diseño 3D, sostenibilidad'
        }
    ];

    // Inicializar componentes
    initThreadParticles();
    initBrands();
    initEventListeners();
    initAnimations();
    initTimeline();
    initConsumptionSimulation();

    // Función para inicializar partículas de hilos
    function initThreadParticles() {
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
                    // Hilos azules (denim)
                    color = `rgba(42, 92, 139, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.9) {
                    // Hilos dorados (remaches)
                    color = `rgba(201, 169, 89, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Hilos blancos (trama)
                    color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.6 ? 'denim' : type < 0.9 ? 'rivet' : 'weft'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de tejido sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(10, 10, 10, 0.1)');
            gradient.addColorStop(1, 'rgba(5, 5, 5, 0.3)');
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
                if (particle.type === 'rivet') {
                    // Remaches como círculos con borde
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    ctx.fill();
                    
                    // Borde dorado
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(201, 169, 89, ${currentAlpha * 0.7})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                } else {
                    // Hilos como líneas o cuadrados
                    if (particle.type === 'denim') {
                        // Hilos de denim como líneas
                        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                        ctx.fillRect(particle.x - particle.size/2, particle.y - 1, particle.size, 2);
                    } else {
                        // Hilos de trama como cuadrados
                        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                        ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
                    }
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
        console.log('Partículas de hilos inicializadas');
    }

    // Función para inicializar marcas
    function initBrands() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de marcas no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        brandsData.forEach(brand => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${brand.color};">
                        <i class="fas ${brand.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${brand.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${brand.color}20; color: ${brand.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${brand.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${brand.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${brand.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showBrandDetail(brand));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Marcas inicializadas: ' + brandsData.length);
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

    // Función para inicializar simulación de consumo
    function initConsumptionSimulation() {
        console.log('Inicializando simulación de consumo...');
        
        // Elementos del DOM
        const decadeSlider = document.getElementById('decadeSlider');
        const decadeValue = document.getElementById('decadeValue');
        const fileSizeSlider = document.getElementById('fileSizeSlider');
        const fileSizeValue = document.getElementById('fileSizeValue');
        const smallFilesSlider = document.getElementById('smallFilesSlider');
        const smallFilesValue = document.getElementById('smallFilesValue');
        const styleTypeButtons = document.querySelectorAll('.style-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('consumptionCurveCanvas');
        
        // Elementos de jeans (renombrados para contexto)
        const youthSlider = document.getElementById('youthSlider');
        const youthValue = document.getElementById('youthValue');
        const casualSlider = document.getElementById('casualSlider');
        const casualValue = document.getElementById('casualValue');
        
        // Verificar que todos los elementos existan
        if (!canvas || !decadeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        decadeSlider.addEventListener('input', function() {
            const decades = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
            decadeValue.textContent = decades[this.value - 1];
        });
        
        youthSlider.addEventListener('input', function() {
            youthValue.textContent = `${this.value}%`;
        });
        
        casualSlider.addEventListener('input', function() {
            casualValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de estilo
        styleTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                styleTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runConsumptionSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            decadeSlider.value = 4;
            decadeValue.textContent = '1980s';
            youthSlider.value = 70;
            youthValue.textContent = '70%';
            casualSlider.value = 65;
            casualValue.textContent = '65%';
            styleTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="straight"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Los jeans straight (azul) dominaron hasta los 80s, luego los skinny (rojo) tomaron liderazgo</div>';
            
            // Ejecutar simulación con valores por defecto
            runConsumptionSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runConsumptionSimulation();
        }, 500);
        
        console.log('Simulación de consumo inicializada');
    }

    // Función para ejecutar simulación de consumo
    function runConsumptionSimulation() {
        const canvas = document.getElementById('consumptionCurveCanvas');
        const ctx = canvas.getContext('2d');
        const decade = parseInt(document.getElementById('decadeSlider').value);
        const youthInfluence = parseInt(document.getElementById('youthSlider').value) / 100;
        const casualAdoption = parseInt(document.getElementById('casualSlider').value) / 100;
        const styleType = document.querySelector('.style-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (décadas)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (popularidad %)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Década', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Popularidad (%)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        const decades = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
        for (let i = 0; i < decades.length; i++) {
            const x = padding + (i * graphWidth) / (decades.length - 1);
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(decades[i], x, canvas.height - padding + 20);
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
        
        // Popularidad por década para cada estilo
        const stylePopularity = {
            'straight': [85, 80, 70, 60, 45, 30, 25],  // 1950s-2010s
            'bootcut': [5, 10, 40, 30, 20, 10, 5],
            'skinny': [0, 0, 5, 10, 30, 60, 70],
            'destroyed': [0, 0, 0, 5, 15, 30, 40]
        };
        
        // Calcular curvas ajustadas por factores culturales
        const points = decades.length;
        const straightCurve = [];
        const selectedStyleCurve = [];
        const adjustedCurve = [];
        
        for (let i = 0; i < points; i++) {
            const decadeIndex = i;
            
            // Popularidad base del estilo straight
            const v_straight = stylePopularity['straight'][decadeIndex];
            
            // Popularidad del estilo seleccionado
            const v_style = stylePopularity[styleType][decadeIndex];
            
            // Popularidad ajustada (considera influencia juvenil y adopción casual)
            let v_adjusted = v_style;
            
            // Aumento por influencia juvenil (especialmente en décadas clave)
            if (decadeIndex >= 2 && decadeIndex <= 5) { // 1970s-2000s
                v_adjusted *= (1 + youthInfluence * 0.3);
            }
            
            // Aumento por adopción casual (todas las décadas)
            v_adjusted *= (1 + casualAdoption * 0.2);
            
            // Limitar a 100%
            v_adjusted = Math.min(v_adjusted, 100);
            
            straightCurve.push({decade: decadeIndex, v: v_straight});
            selectedStyleCurve.push({decade: decadeIndex, v: v_style});
            adjustedCurve.push({decade: decadeIndex, v: v_adjusted});
        }
        
        // Dibujar curva estilo straight (referencia)
        ctx.strokeStyle = 'rgba(42, 92, 139, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        straightCurve.forEach((point, i) => {
            const x = padding + (point.decade / (points - 1)) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva del estilo seleccionado (base)
        ctx.strokeStyle = 'rgba(139, 101, 66, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        selectedStyleCurve.forEach((point, i) => {
            const x = padding + (point.decade / (points - 1)) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar curva ajustada (real)
        ctx.strokeStyle = 'rgba(201, 169, 89, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        adjustedCurve.forEach((point, i) => {
            const x = padding + (point.decade / (points - 1)) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(42, 92, 139, 0.15)';
        ctx.beginPath();
        
        adjustedCurve.forEach((point, i) => {
            const x = padding + (point.decade / (points - 1)) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            const yStraight = canvas.height - padding - (straightCurve[i].v / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, yStraight);
            } else {
                ctx.lineTo(x, yStraight);
            }
        });
        
        for (let i = adjustedCurve.length - 1; i >= 0; i--) {
            const point = adjustedCurve[i];
            const x = padding + (point.decade / (points - 1)) * graphWidth;
            const y = canvas.height - padding - (point.v / 100) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Straight (referencia)
        ctx.fillStyle = 'rgba(42, 92, 139, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Straight Cut', canvas.width - 155, 32);
        
        // Estilo base
        ctx.fillStyle = 'rgba(139, 101, 66, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Estilo base', canvas.width - 155, 57);
        
        // Popularidad real
        ctx.fillStyle = 'rgba(201, 169, 89, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Popularidad real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const currentDecade = parseInt(document.getElementById('decadeSlider').value) - 1;
        const decadesNames = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
        const styleNames = {
            'straight': 'Straight Cut',
            'bootcut': 'Bootcut/Flare',
            'skinny': 'Skinny',
            'destroyed': 'Destroyed/Vintage'
        };
        
        const basePopularity = stylePopularity[styleType][currentDecade];
        const adjustedPopularity = adjustedCurve[currentDecade].v;
        
        conclusion.innerHTML = `
            <div class="result-text" style="color: var(--accent-secondary);">
                <i class="fas fa-chart-line" style="margin-right: 0.5rem;"></i>
                ${decadesNames[currentDecade]}: ${styleNames[styleType]} alcanzó ${adjustedPopularity.toFixed(1)}% de popularidad
            </div>
        `;
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const decade = parseInt(document.getElementById('decadeSlider').value);
        const youthInfluence = parseInt(document.getElementById('youthSlider').value) / 100;
        const casualAdoption = parseInt(document.getElementById('casualSlider').value) / 100;
        const styleType = document.querySelector('.style-type-btn.active').dataset.type;
        
        const decades = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
        const styleNames = {
            'straight': 'Straight Cut',
            'bootcut': 'Bootcut/Flare',
            'skinny': 'Skinny',
            'destroyed': 'Destroyed/Vintage'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Consumo
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(40, 40, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Década Analizada</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${decades[decade-1]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Estilo de Jeans</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${styleNames[styleType]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Influencia Juvenil</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(youthInfluence*100).toFixed(0)}%</div>
                            </div>
                            <div style="background: rgba(40, 40, 40, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Adopción Casual</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(casualAdoption*100).toFixed(0)}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Análisis de tendencias por década</span><br>
                            <span class="code-keyword">Popularidad base:</span> ${styleType === 'straight' ? 85 : styleType === 'bootcut' ? 40 : styleType === 'skinny' ? 60 : 30}% (en década pico)<br>
                            <span class="code-keyword">Influencia juvenil:</span> ${(youthInfluence*30).toFixed(0)}% aumento en décadas 70s-00s<br>
                            <span class="code-keyword">Adopción casual:</span> ${(casualAdoption*20).toFixed(0)}% aumento general<br>
                            <span class="code-keyword">Popularidad estimada:</span> ${(styleType === 'straight' ? 85 : styleType === 'bootcut' ? 40 : styleType === 'skinny' ? 60 : 30) * (1 + youthInfluence*0.3) * (1 + casualAdoption*0.2)}%
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
            simulateEvolutionBtn.addEventListener('click', simulateCulturalEvolution);
        }
        
        // Botón de especificaciones
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.add('active');
            });
        }
        
        // Botón de comparación
        const compareStylesBtn = document.getElementById('compareStylesBtn');
        if (compareStylesBtn) {
            compareStylesBtn.addEventListener('click', () => {
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

    // Función para simulación de evolución cultural
    function simulateCulturalEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución cultural...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1853: Levi Strauss llega a San Francisco...",
            "1873: Patente de jeans con remaches...",
            "1890: Nace el Levi's 501...",
            "1930s: Hollywood y cultura cowboy...",
            "1950s: Rebelión juvenil (James Dean)...",
            "1970s: Cultura hippie y flare jeans...",
            "1980s: Designer jeans y status symbol...",
            "1990s: Grunge y destroyed look...",
            "2000s: Skinny jeans y fast fashion...",
            "2010s: Sustentabilidad y vintage..."
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
            showCulturalEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 8000);
    }

    // Función para mostrar resultados de evolución cultural
    function showCulturalEvolutionResults() {
        const results = [
            { type: 'Producción anual', value: '2.3B', color: '#2a5c8b', icon: 'fa-tshirt' },
            { type: 'Años de historia', value: '150+', color: '#c9a959', icon: 'fa-history' },
            { type: 'Penetración mercado', value: '85%', color: '#8b6542', icon: 'fa-globe' },
            { type: 'Valor mercado', value: '$95B', color: '#5c8b2a', icon: 'fa-chart-line' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Cultural de los Jeans
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto cultural de los jeans desde 1853 hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución de los jeans');
            modal.remove();
        });
    }

    // Función para mostrar detalle de marca
    function showBrandDetail(brand) {
        const details = {
            'Levi\'s': {
                contribution: 'Primera patente de jeans con remaches, creación del denim azul',
                products: '501 Original, 511 Slim, 721 High Rise, Trucker Jacket',
                timeline: '1853-presente',
                impact: 'Estableció los jeans como prenda de trabajo y luego como icono cultural'
            },
            'Wrangler': {
                contribution: 'Jeans especializados para cowboys, cultura western americana',
                products: '13MWZ Cowboy Cut, Retro, Premium Performance Series',
                timeline: '1947-presente',
                impact: 'Dominó el mercado de jeans para rodeo y cultura country'
            },
            'Lee': {
                contribution: 'Primer jeans con cierre, innovación en comodidad',
                products: 'Rider Jeans, Extreme Motion, Union Bay',
                timeline: '1889-presente',
                impact: 'Popularizó los jeans en Europa y desarrolló el "jeans moderno"'
            },
            'Diesel': {
                contribution: 'Revolución del denim con lavados artesanales y diseño italiano',
                products: 'Diesel Jogg Jeans, Skinzee, Viker, Saffiano',
                timeline: '1978-presente',
                impact: 'Elevó el denim a categoría de lujo y moda de diseño'
            },
            'True Religion': {
                contribution: 'Denim de lujo con bordados y parches distintivos',
                products: 'Billy Super T, Joey Super T, athleisure denim',
                timeline: '2002-presente',
                impact: 'Creó el mercado de jeans premium y de diseñador'
            },
            'G-Star RAW': {
                contribution: 'Innovación en cortes 3D y sostenibilidad en denim',
                products: 'Elwood, Arc, Rovic, CROPP biodegradeable',
                timeline: '1989-presente',
                impact: 'Pionera en denim sostenible y diseño arquitectónico'
            }
        };
        
        const brandDetails = details[brand.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeBrandModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${brand.color}; margin-right: 1rem;">
                        <i class="fas ${brand.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${brand.color};">${brand.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${brand.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${brand.color};">
                            <i class="fas fa-info-circle"></i> Detalles de la Marca:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${brandDetails.contribution ? `
                                <div style="background: rgba(40, 40, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución al denim</div>
                                    <div style="font-weight: 600;">${brandDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${brandDetails.products ? `
                                <div style="background: rgba(40, 40, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Icónicos</div>
                                    <div style="font-weight: 600;">${brandDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${brandDetails.timeline ? `
                                <div style="background: rgba(40, 40, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${brandDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${brandDetails.impact ? `
                                <div style="background: rgba(40, 40, 40, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto Cultural</div>
                                    <div style="font-weight: 600;">${brandDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${brand.title} - Innovaciones en denim</span><br>
                        <span class="code-keyword">Materiales principales:</span> Denim 100% algodón, mezclas con elastano<br>
                        <span class="code-keyword">Técnicas distintivas:</span> Lavados artesanales, bordados, cortes innovadores<br>
                        <span class="code-keyword">Enfoque actual:</span> ${brand.status === 'Activo' ? 'Innovación y sostenibilidad' : 'Herencia y tradición'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${brand.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeBrandModal').addEventListener('click', () => {
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
    console.log('Aplicación Jeans Evolution inicializada correctamente');
});