document.addEventListener('DOMContentLoaded', function() {
    console.log('Instrumentos de Navegación: Inicializando aplicación...');
    
    // Datos de exploradores importantes
    const explorersData = [
        {
            icon: 'fa-ship',
            title: 'Fenicios',
            description: 'Maestros de la navegación costera del Mediterráneo (1500-300 a.C.). Desarrollaron cartas náuticas y dominaron la navegación nocturna.',
            color: '#3a86ff',
            status: 'Antigüedad',
            contribution: 'Cartas náuticas, navegación estelar'
        },
        {
            icon: 'fa-water',
            title: 'Polinesios',
            description: 'Navegantes del Pacífico que colonizaron islas usando estrellas, corrientes y aves (1000 a.C. - 1200 d.C.). Sin instrumentos complejos.',
            color: '#4361ee',
            status: 'Antigüedad',
            contribution: 'Navegación celeste, conocimiento de corrientes'
        },
        {
            icon: 'fa-helmet-battle',
            title: 'Vikingos',
            description: 'Exploradores del Atlántico Norte que usaban piedras solar y observación de aves para navegar (800-1100 d.C.). Llegaron a América.',
            color: '#7209b7',
            status: 'Edad Media',
            contribution: 'Piedra solar, navegación en altas latitudes'
        },
        {
            icon: 'fa-compass',
            title: 'Portugueses',
            description: 'Pioneros de la Era de los Descubrimientos. Enrique el Navegante estableció escuela de navegación. Dominaron la navegación astronómica.',
            color: '#ff9e00',
            status: 'Siglos XV-XVI',
            contribution: 'Escuela de Sagres, navegación astronómica'
        },
        {
            icon: 'fa-crosshairs',
            title: 'Cristóbal Colón',
            description: 'Navegante genovés que cruzó el Atlántico (1492). Usó cuadrante, brújula y navegación estimada. Error en cálculo de circunferencia terrestre.',
            color: '#00d4aa',
            status: '1492',
            contribution: 'Ruta transatlántica, navegación oceánica'
        },
        {
            icon: 'fa-user-astronaut',
            title: 'John Harrison',
            description: 'Relojero inglés que resolvió el problema de la longitud con su cronómetro marino H4 (1761). Premio del Almirantazgo británico.',
            color: '#ff6b6b',
            status: 'Siglo XVIII',
            contribution: 'Cronómetro marino, solución a longitud'
        }
    ];

    // Inicializar componentes
    initStarParticles();
    initExplorers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initNavigationSimulation();

    // Función para inicializar partículas estelares
    function initStarParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
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
                    // Estrellas (blancas/azules)
                    color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
                    size = Math.random() * 2.5 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Planetas (anaranjados)
                    color = `rgba(255, 200, 100, ${Math.random() * 0.4 + 0.2})`;
                    size = Math.random() * 3.5 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Cometas (azul-verde)
                    color = `rgba(100, 255, 255, ${Math.random() * 0.5 + 0.3})`;
                    size = Math.random() * 2 + 1;
                    speed = (Math.random() - 0.5) * 0.8;
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
                    type: type < 0.6 ? 'star' : type < 0.85 ? 'planet' : 'comet'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo estelar con gradiente
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(10, 15, 30, 0.1)');
            gradient.addColorStop(1, 'rgba(5, 10, 20, 0.3)');
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
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.5 + 0.5;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula
                ctx.beginPath();
                
                // Forma diferente según tipo
                if (particle.type === 'comet') {
                    // Cometas como líneas
                    const tailLength = particle.size * 8;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle.x - particle.speedX * tailLength, particle.y - particle.speedY * tailLength);
                    ctx.lineWidth = particle.size / 2;
                    ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    ctx.stroke();
                    
                    // Cabeza del cometa
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                } else {
                    // Estrellas y planetas como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'star') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'planet') {
                        gradient.addColorStop(0, `rgba(255, 200, 100, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(100, 255, 255, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(100, 255, 255, 0)');
                    }
                    
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                ctx.fill();
                
                // Destello ocasional para estrellas
                if (particle.type === 'star' && Math.random() < 0.005) {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                    const flareGradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    flareGradient.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.7})`);
                    flareGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = flareGradient;
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
        console.log('Partículas estelares inicializadas');
    }

    // Función para inicializar exploradores
    function initExplorers() {
        const container = document.getElementById('explorersContainer');
        if (!container) {
            console.error('Contenedor de exploradores no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        explorersData.forEach(explorer => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${explorer.color};">
                        <i class="fas ${explorer.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${explorer.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${explorer.color}20; color: ${explorer.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${explorer.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${explorer.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${explorer.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showExplorerDetail(explorer));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Exploradores inicializados: ' + explorersData.length);
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

    // Función para inicializar simulación de navegación
    function initNavigationSimulation() {
        console.log('Inicializando simulación de navegación...');
        
        // Elementos del DOM
        const eraSlider = document.getElementById('eraSlider');
        const eraValue = document.getElementById('eraValue');
        const distanceSlider = document.getElementById('distanceSlider');
        const distanceValue = document.getElementById('distanceValue');
        const cloudSlider = document.getElementById('cloudSlider');
        const cloudValue = document.getElementById('cloudValue');
        const navTypeButtons = document.querySelectorAll('.nav-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('accuracyCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !eraSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Épocas históricas
        const eras = [
            'Antigüedad (2000 a.C.)',
            'Edad Media (1300)',
            'Siglo XVI (1500)',
            'Siglo XVIII (1760)',
            'Siglo XX (1950)',
            'Era Moderna (2024)'
        ];
        
        // Actualizar valores de los sliders
        eraSlider.addEventListener('input', function() {
            eraValue.textContent = eras[this.value - 1];
        });
        
        distanceSlider.addEventListener('input', function() {
            distanceValue.textContent = `${this.value} km`;
        });
        
        cloudSlider.addEventListener('input', function() {
            cloudValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de navegación
        navTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                navTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runNavigationSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            eraSlider.value = 4;
            eraValue.textContent = 'Siglo XVIII (1760)';
            distanceSlider.value = 5000;
            distanceValue.textContent = '5000 km';
            cloudSlider.value = 30;
            cloudValue.textContent = '30%';
            navTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="celestial"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">La navegación celeste (azul) tenía gran variabilidad, mientras que el GPS (verde) ofrece precisión constante</div>';
            
            // Ejecutar simulación con valores por defecto
            runNavigationSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runNavigationSimulation();
        }, 500);
        
        console.log('Simulación de navegación inicializada');
    }

    // Función para ejecutar simulación de navegación
    function runNavigationSimulation() {
        const canvas = document.getElementById('accuracyCurveCanvas');
        const ctx = canvas.getContext('2d');
        const era = parseInt(document.getElementById('eraSlider').value);
        const distance = parseInt(document.getElementById('distanceSlider').value);
        const cloudPercent = parseInt(document.getElementById('cloudSlider').value) / 100;
        const navType = document.querySelector('.nav-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (distancia recorrida)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (error en km)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Distancia Recorrida (km)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Error de Navegación (km)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = (i * distance) / 5;
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
        
        // Errores típicos por época
        const eraBaseErrors = {
            1: 100,  // Antigüedad
            2: 50,   // Edad Media
            3: 20,   // Siglo XVI
            4: 2,    // Siglo XVIII
            5: 0.1,  // Siglo XX (km)
            6: 0.00005 // Era Moderna (km = 5cm)
        };
        
        // Factores por tipo de navegación
        const navTypeFactors = {
            'celestial': 1.0,
            'estimated': 2.5,
            'coastal': 0.7,
            'satellite': 0.001
        };
        
        // Calcular curvas
        const points = 100;
        const historicalCurve = [];
        const idealCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const distancePoint = (i * distance) / points;
            
            // Error histórico base para la época
            let error = eraBaseErrors[era];
            
            // Ajuste por tipo de navegación
            error *= navTypeFactors[navType];
            
            // Ajuste por nubosidad (afecta navegación celeste y costera)
            if (navType === 'celestial' || navType === 'coastal') {
                error *= (1 + cloudPercent * 3);
            }
            
            // Error acumulativo con distancia (más para navegación estimada)
            if (navType === 'estimated') {
                error *= (1 + distancePoint / 1000);
            }
            
            // Curva ideal (mejor caso)
            const idealError = error * 0.3;
            
            // Curva actual con variabilidad
            const variability = 0.3 + Math.random() * 0.4;
            const actualError = error * variability;
            
            historicalCurve.push({distance: distancePoint, error: error});
            idealCurve.push({distance: distancePoint, error: idealError});
            actualCurve.push({distance: distancePoint, error: actualError});
        }
        
        // Dibujar curva histórica
        ctx.strokeStyle = 'rgba(58, 134, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        historicalCurve.forEach((point, i) => {
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.error / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva ideal
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        idealCurve.forEach((point, i) => {
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.error / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar curva actual
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.error / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(58, 134, 255, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.error / 100) * graphHeight;
            const yHistorical = canvas.height - padding - (historicalCurve[i].error / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, yHistorical);
            } else {
                ctx.lineTo(x, yHistorical);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + (point.distance / distance) * graphWidth;
            const y = canvas.height - padding - (point.error / 100) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Error histórico
        ctx.fillStyle = 'rgba(58, 134, 255, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Error típico', canvas.width - 155, 32);
        
        // Error ideal
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Error ideal', canvas.width - 155, 57);
        
        // Error real
        ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Error real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const avgError = actualCurve.reduce((sum, point) => sum + point.error, 0) / actualCurve.length;
        
        if (avgError > 10) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Navegación imprecisa (error promedio: ${avgError.toFixed(1)} km)
                </div>
            `;
        } else if (avgError > 1) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--warning);">
                    <i class="fas fa-compass" style="margin-right: 0.5rem;"></i>
                    Navegación moderadamente precisa (error: ${avgError.toFixed(1)} km)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Navegación de alta precisión (error: ${(avgError * 1000).toFixed(0)} m)
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const era = parseInt(document.getElementById('eraSlider').value);
        const distance = parseInt(document.getElementById('distanceSlider').value);
        const cloudPercent = parseInt(document.getElementById('cloudSlider').value) / 100;
        const navType = document.querySelector('.nav-type-btn.active').dataset.type;
        
        const eras = [
            'Antigüedad (2000 a.C.)',
            'Edad Media (1300)',
            'Siglo XVI (1500)',
            'Siglo XVIII (1760)',
            'Siglo XX (1950)',
            'Era Moderna (2024)'
        ];
        
        const navTypeNames = {
            'celestial': 'Navegación Celeste',
            'estimated': 'Navegación Estimada',
            'coastal': 'Navegación Costera',
            'satellite': 'Navegación Satelital'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Navegación
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 35, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Época Histórica</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${eras[era-1]}</div>
                            </div>
                            <div style="background: rgba(30, 35, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Navegación</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${navTypeNames[navType]}</div>
                            </div>
                            <div style="background: rgba(30, 35, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Distancia del Viaje</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${distance} km</div>
                            </div>
                            <div style="background: rgba(30, 35, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">% Tiempo Nublado</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(cloudPercent*100).toFixed(0)}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de precisión de navegación</span><br>
                            <span class="code-keyword">Error típico época:</span> ${[100, 50, 20, 2, 0.1, 0.00005][era-1]} km<br>
                            <span class="code-keyword">Factor tipo navegación:</span> ${navType === 'celestial' ? 1.0 : navType === 'estimated' ? 2.5 : navType === 'coastal' ? 0.7 : 0.001}x<br>
                            <span class="code-keyword">Penalización nubosidad:</span> ${navType === 'celestial' || navType === 'coastal' ? (cloudPercent*300).toFixed(0) : 0}%<br>
                            <span class="code-keyword">Error estimado final:</span> ${([100, 50, 20, 2, 0.1, 0.00005][era-1] * (navType === 'celestial' ? 1.0 : navType === 'estimated' ? 2.5 : navType === 'coastal' ? 0.7 : 0.001) * (1 + (navType === 'celestial' || navType === 'coastal' ? cloudPercent * 3 : 0))).toFixed(2)} km
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
        
        // Botón de instrumentos
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.add('active');
            });
        }
        
        // Botón de comparación
        const compareMethodsBtn = document.getElementById('compareMethodsBtn');
        if (compareMethodsBtn) {
            compareMethodsBtn.addEventListener('click', () => {
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
            "2000 a.C.: Navegación primitiva - observación estelar y costera...",
            "1000 a.C.: Fenicios desarrollan cartas náuticas básicas...",
            "500 a.C.: Polinesios navegan el Pacífico sin instrumentos...",
            "1100 d.C.: Brújula magnética en China...",
            "1300 d.C.: Astrolabio perfeccionado en mundo islámico...",
            "1400 d.C.: Portugueses desarrollan navegación astronómica...",
            "1492 d.C.: Colón cruza el Atlántico con cuadrante y brújula...",
            "1761 d.C.: Harrison inventa el cronómetro marino H4...",
            "1900 d.C.: Girocompás, radar y radiofaros...",
            "1978 d.C.: Primer satélite GPS lanzado...",
            "2024 d.C.: GPS de alta precisión (±5 cm), GNSS multiconstelación"
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
            { type: 'Precisión antigua', value: '±100 km', color: '#ff9e00', icon: 'fa-exclamation-triangle' },
            { type: 'Precisión medieval', value: '±50 km', color: '#ff9e00', icon: 'fa-compass' },
            { type: 'Precisión siglo XVIII', value: '±2 km', color: '#3a86ff', icon: 'fa-clock' },
            { type: 'Precisión GPS moderno', value: '±5 cm', color: '#00d4aa', icon: 'fa-satellite' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Histórica de la Navegación
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del avance en precisión de navegación desde la antigüedad hasta la era moderna:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución de la navegación');
            modal.remove();
        });
    }

    // Función para mostrar detalle de explorador
    function showExplorerDetail(explorer) {
        const details = {
            'Fenicios': {
                contribution: 'Cartas náuticas, navegación nocturna por estrellas',
                instruments: 'Observación estelar, conocimiento de corrientes, cartas primitivas',
                timeline: '1500-300 a.C.',
                impact: 'Dominaron el comercio mediterráneo, establecieron rutas marítimas'
            },
            'Polinesios': {
                contribution: 'Navegación celeste sin instrumentos complejos',
                instruments: 'Observación de estrellas, corrientes, nubes, aves migratorias',
                timeline: '1000 a.C. - 1200 d.C.',
                impact: 'Colonización del Pacífico, viajes de miles de km sin tecnología'
            },
            'Vikingos': {
                contribution: 'Navegación en altas latitudes con poca visibilidad estelar',
                instruments: 'Piedra solar (sunstone), observación de aves, conocimiento costero',
                timeline: '800-1100 d.C.',
                impact: 'Descubrimiento de Islandia, Groenlandia y América (Vinland)'
            },
            'Portugueses': {
                contribution: 'Escuela de navegación, perfeccionamiento de instrumentos astronómicos',
                instruments: 'Astrolabio, cuadrante, ballestilla, cartas portulanas',
                timeline: '1415-1600 d.C.',
                impact: 'Ruta a India, exploración de costa africana, Era de los Descubrimientos'
            },
            'Cristóbal Colón': {
                contribution: 'Ruta transatlántica, navegación oceánica sistemática',
                instruments: 'Cuadrante, brújula, ampolleta, carta de marear',
                timeline: '1492-1504 d.C.',
                impact: 'Descubrimiento de América para Europa, apertura de rutas atlánticas'
            },
            'John Harrison': {
                contribution: 'Solución al problema de la longitud en navegación marítima',
                instruments: 'Cronómetro marino H1-H4, relojes de precisión',
                timeline: '1730-1776 d.C.',
                impact: 'Revolución en navegación oceánica, premio del Almirantazgo británico'
            }
        };
        
        const explorerDetails = details[explorer.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeExplorerModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${explorer.color}; margin-right: 1rem;">
                        <i class="fas ${explorer.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${explorer.color};">${explorer.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${explorer.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${explorer.color};">
                            <i class="fas fa-info-circle"></i> Detalles del Explorador:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${explorerDetails.contribution ? `
                                <div style="background: rgba(30, 35, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución a la Navegación</div>
                                    <div style="font-weight: 600;">${explorerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${explorerDetails.instruments ? `
                                <div style="background: rgba(30, 35, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Instrumentos Utilizados</div>
                                    <div style="font-weight: 600;">${explorerDetails.instruments}</div>
                                </div>
                            ` : ''}
                            
                            ${explorerDetails.timeline ? `
                                <div style="background: rgba(30, 35, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${explorerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${explorerDetails.impact ? `
                                <div style="background: rgba(30, 35, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto Histórico</div>
                                    <div style="font-weight: 600;">${explorerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${explorer.title} - Contexto histórico y tecnológico</span><br>
                        <span class="code-keyword">Métodos de navegación:</span> ${explorer.title === 'Polinesios' ? 'Celeste, natural' : explorer.title === 'Fenicios' ? 'Costera, estelar' : explorer.title === 'Vikingos' ? 'Altas latitudes, solar' : 'Astronómica, instrumental'}<br>
                        <span class="code-keyword">Precisión típica:</span> ${explorer.title === 'Polinesios' ? '±50-100 km' : explorer.title === 'Fenicios' ? '±20-50 km' : explorer.title === 'Vikingos' ? '±30-80 km' : explorer.title === 'Portugueses' ? '±10-30 km' : explorer.title === 'Cristóbal Colón' ? '±20-40 km' : '±2-5 km'}<br>
                        <span class="code-keyword">Legado:</span> ${explorer.status === 'Antigüedad' ? 'Fundacional' : explorer.status === 'Edad Media' ? 'Transicional' : 'Revolucionario'}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${explorer.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeExplorerModal').addEventListener('click', () => {
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
    console.log('Aplicación Instrumentos de Navegación inicializada correctamente');
});