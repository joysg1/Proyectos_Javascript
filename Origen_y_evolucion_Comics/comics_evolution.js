document.addEventListener('DOMContentLoaded', function() {
    console.log('Cómics Evolución: Inicializando aplicación...');
    
    // Datos de editoriales importantes
    const publishersData = [
        {
            icon: 'fa-user-ninja',
            title: 'Marvel Comics',
            description: 'Fundada en 1939 como Timely Comics. Creadora de Spider-Man, X-Men, Avengers y el Universo Cinematográfico Marvel.',
            color: '#ff4757',
            status: 'Activo',
            contribution: 'Universo compartido, personajes complejos'
        },
        {
            icon: 'fa-user-secret',
            title: 'DC Comics',
            description: 'Fundada en 1934 como National Allied Publications. Creadora de Superman, Batman, Wonder Woman y el Universo DC.',
            color: '#1e90ff',
            status: 'Activo',
            contribution: 'Superhéroes icónicos, mitología moderna'
        },
        {
            icon: 'fa-book',
            title: 'Shueisha',
            description: 'Editorial japonesa fundada en 1925. Publica la revista Weekly Shonen Jump con éxitos como Dragon Ball, Naruto y One Piece.',
            color: '#ff9f43',
            status: 'Activo',
            contribution: 'Manga shonen, publicación semanal'
        },
        {
            icon: 'fa-paint-brush',
            title: 'Image Comics',
            description: 'Fundada en 1992 por artistas que dejaron Marvel. Conocida por títulos como Spawn, The Walking Dead y Saga.',
            color: '#2ed573',
            status: 'Activo',
            contribution: 'Derechos de creadores, cómics independientes'
        },
        {
            icon: 'fa-landmark',
            title: 'Casterman',
            description: 'Editorial belga fundada en 1780. Publicó Las aventuras de Tintín y otros clásicos del cómic franco-belga.',
            color: '#ff6b81',
            status: 'Activo',
            contribution: 'Línea clara, álbumes de calidad'
        },
        {
            icon: 'fa-mask',
            title: 'Dark Horse Comics',
            description: 'Fundada en 1986. Conocida por licencias como Star Wars, Alien y creaciones originales como Hellboy.',
            color: '#a55eea',
            status: 'Activo',
            contribution: 'Licencias, cómics de películas'
        }
    ];

    // Inicializar componentes
    initComicParticles();
    initPublishers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initSalesSimulation();

    // Función para inicializar partículas de cómic
    function initComicParticles() {
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
                
                if (type < 0.4) {
                    // Partículas de tinta (rojo)
                    color = `rgba(255, 71, 87, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                    shape = 'circle';
                } else if (type < 0.7) {
                    // Partículas de papel (blanco/amarillo)
                    color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.3;
                    shape = Math.random() > 0.5 ? 'circle' : 'square';
                } else if (type < 0.9) {
                    // Partículas de globos de texto
                    color = `rgba(30, 144, 255, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.4;
                    shape = 'speech';
                } else {
                    // Onomatopeyas
                    color = `rgba(255, 159, 67, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 5 + 3;
                    speed = (Math.random() - 0.5) * 0.6;
                    shape = 'text';
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
                    shape: shape,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de página de cómic sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 18, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Líneas de cuadrícula sutil (como página de cómic)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 1;
            const gridSize = 40;
            
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            particles.forEach(particle => {
                // Movimiento
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.rotation += particle.rotationSpeed;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.4 + 0.6;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula según su forma
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                
                ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                
                if (particle.shape === 'square') {
                    // Cuadrados (como viñetas)
                    ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
                } else if (particle.shape === 'speech') {
                    // Globos de texto
                    ctx.beginPath();
                    ctx.ellipse(0, 0, particle.size/2, particle.size/3, 0, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Pico del globo
                    ctx.beginPath();
                    ctx.moveTo(particle.size/4, particle.size/3);
                    ctx.lineTo(particle.size/2, particle.size/2);
                    ctx.lineTo(particle.size/3, particle.size/3);
                    ctx.fill();
                } else if (particle.shape === 'text') {
                    // Onomatopeyas
                    ctx.font = `${particle.size}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const texts = ['POW!', 'BAM!', 'BOOM!', 'ZAP!', 'WHAM!'];
                    const text = texts[Math.floor(Math.random() * texts.length)];
                    ctx.fillText(text, 0, 0);
                } else {
                    // Círculos (tinta)
                    ctx.beginPath();
                    ctx.arc(0, 0, particle.size/2, 0, Math.PI * 2);
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
        console.log('Partículas de cómic inicializadas');
    }

    // Función para inicializar editoriales
    function initPublishers() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de editoriales no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        publishersData.forEach(publisher => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${publisher.color};">
                        <i class="fas ${publisher.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${publisher.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${publisher.color}20; color: ${publisher.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${publisher.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${publisher.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${publisher.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showPublisherDetail(publisher));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Editoriales inicializadas: ' + publishersData.length);
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

    // Función para inicializar simulación de ventas
    function initSalesSimulation() {
        console.log('Inicializando simulación de ventas...');
        
        // Elementos del DOM
        const eraSlider = document.getElementById('eraSlider');
        const eraValue = document.getElementById('eraValue');
        const marketingSlider = document.getElementById('marketingSlider');
        const marketingValue = document.getElementById('marketingValue');
        const adaptationsSlider = document.getElementById('adaptationsSlider');
        const adaptationsValue = document.getElementById('adaptationsValue');
        const genreButtons = document.querySelectorAll('.genre-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('salesCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !eraSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        eraSlider.addEventListener('input', function() {
            const eras = ['Pre-1930 (Orígenes)', 'Edad de Oro (1938-55)', 'Edad de Plata (1956-70)', 'Edad de Bronce (1970-85)', 'Edad Moderna (1986-presente)'];
            eraValue.textContent = eras[this.value - 1];
        });
        
        marketingSlider.addEventListener('input', function() {
            marketingValue.textContent = `${this.value}%`;
        });
        
        adaptationsSlider.addEventListener('input', function() {
            adaptationsValue.textContent = `${this.value}%`;
        });
        
        // Botones de género
        genreButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                genreButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runSalesSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            eraSlider.value = 3;
            eraValue.textContent = 'Edad de Plata (1956-70)';
            marketingSlider.value = 70;
            marketingValue.textContent = '70%';
            adaptationsSlider.value = 60;
            adaptationsValue.textContent = '60%';
            genreButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="superhero"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Superhéroes (azul) dominan ventas, pero manga (rojo) crece rápidamente</div>';
            
            // Ejecutar simulación con valores por defecto
            runSalesSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runSalesSimulation();
        }, 500);
        
        console.log('Simulación de ventas inicializada');
    }

    // Función para ejecutar simulación de ventas
    function runSalesSimulation() {
        const canvas = document.getElementById('salesCurveCanvas');
        const ctx = canvas.getContext('2d');
        const era = parseInt(document.getElementById('eraSlider').value);
        const marketing = parseInt(document.getElementById('marketingSlider').value) / 100;
        const adaptations = parseInt(document.getElementById('adaptationsSlider').value) / 100;
        const genre = document.querySelector('.genre-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (años)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (ventas en millones)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Años', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Ventas (millones $)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const year = 1900 + i * 25;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(year.toString(), x, canvas.height - padding + 20);
        }
        
        // Marcas en eje Y
        for (let i = 0; i <= 5; i++) {
            const y = canvas.height - padding - (i * graphHeight) / 5;
            const value = i * 200;
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
            ctx.fillText(value.toString(), padding - 20, y + 3);
        }
        
        // Datos históricos por época
        const eraData = {
            1: [ // Pre-1930
                {year: 1900, sales: 10},
                {year: 1925, sales: 50},
                {year: 1950, sales: 200}
            ],
            2: [ // Edad de Oro
                {year: 1938, sales: 100},
                {year: 1945, sales: 300},
                {year: 1955, sales: 150}
            ],
            3: [ // Edad de Plata
                {year: 1956, sales: 200},
                {year: 1965, sales: 400},
                {year: 1970, sales: 350}
            ],
            4: [ // Edad de Bronce
                {year: 1970, sales: 350},
                {year: 1978, sales: 600},
                {year: 1985, sales: 800}
            ],
            5: [ // Edad Moderna
                {year: 1986, sales: 800},
                {year: 2000, sales: 1500},
                {year: 2023, sales: 2900}
            ]
        };
        
        // Factores por género
        const genreFactors = {
            'superhero': 1.0,
            'manga': 0.8,
            'european': 0.5,
            'indie': 0.3
        };
        
        // Calcular curvas
        const currentEraData = eraData[era];
        const genreFactor = genreFactors[genre];
        
        // Curva histórica
        ctx.strokeStyle = 'rgba(255, 71, 87, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        currentEraData.forEach((point, i) => {
            const x = padding + ((point.year - 1900) / 125) * graphWidth;
            const baseSales = point.sales * genreFactor;
            const adjustedSales = baseSales * (1 + marketing * 0.5 + adaptations * 0.7);
            const y = canvas.height - padding - (adjustedSales / 1000) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Puntos de datos
            ctx.fillStyle = 'rgba(255, 71, 87, 0.9)';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.stroke();
        
        // Curva de tendencia (proyección)
        ctx.strokeStyle = 'rgba(30, 144, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        const lastPoint = currentEraData[currentEraData.length - 1];
        const startX = padding + ((lastPoint.year - 1900) / 125) * graphWidth;
        const startSales = lastPoint.sales * genreFactor * (1 + marketing * 0.5 + adaptations * 0.7);
        const startY = canvas.height - padding - (startSales / 1000) * graphHeight;
        
        ctx.moveTo(startX, startY);
        
        // Proyección hacia 2050
        const futureYear = 2050;
        const futureX = padding + ((futureYear - 1900) / 125) * graphWidth;
        const growthFactor = 1 + (marketing * 0.01) + (adaptations * 0.02);
        const yearsToFuture = futureYear - lastPoint.year;
        const futureSales = startSales * Math.pow(growthFactor, yearsToFuture / 10);
        const futureY = canvas.height - padding - (futureSales / 1000) * graphHeight;
        
        ctx.lineTo(futureX, futureY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Etiqueta de proyección
        ctx.fillStyle = 'rgba(30, 144, 255, 0.9)';
        ctx.fillText(`Proyección 2050: $${Math.round(futureSales)}M`, futureX - 60, futureY - 10);
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Histórico
        ctx.fillStyle = 'rgba(255, 71, 87, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Ventas históricas', canvas.width - 155, 32);
        
        // Proyección
        ctx.fillStyle = 'rgba(30, 144, 255, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Proyección futuro', canvas.width - 155, 57);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const lastSales = lastPoint.sales * genreFactor * (1 + marketing * 0.5 + adaptations * 0.7);
        
        let conclusionText = '';
        if (genre === 'superhero') {
            conclusionText = `Superhéroes dominan con $${Math.round(lastSales)}M en ventas estimadas`;
        } else if (genre === 'manga') {
            conclusionText = `Manga muestra crecimiento rápido: $${Math.round(lastSales)}M`;
        } else if (genre === 'european') {
            conclusionText = `Cómics europeos: $${Math.round(lastSales)}M con nicho estable`;
        } else {
            conclusionText = `Independientes: $${Math.round(lastSales)}M con crecimiento orgánico`;
        }
        
        conclusion.innerHTML = `
            <div class="result-text" style="color: var(--accent-light);">
                <i class="fas fa-chart-line" style="margin-right: 0.5rem;"></i>
                ${conclusionText}
            </div>
        `;
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const era = parseInt(document.getElementById('eraSlider').value);
        const marketing = parseInt(document.getElementById('marketingSlider').value) / 100;
        const adaptations = parseInt(document.getElementById('adaptationsSlider').value) / 100;
        const genre = document.querySelector('.genre-btn.active').dataset.type;
        
        const eras = ['Pre-1930 (Orígenes)', 'Edad de Oro (1938-55)', 'Edad de Plata (1956-70)', 'Edad de Bronce (1970-85)', 'Edad Moderna (1986-presente)'];
        const genreNames = {
            'superhero': 'Superhéroes',
            'manga': 'Manga Japonés',
            'european': 'Cómic Europeo',
            'indie': 'Independiente'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Ventas
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(40, 40, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Época Histórica</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${eras[era-1]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Género</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${genreNames[genre]}</div>
                            </div>
                            <div style="background: rgba(40, 40, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Inversión en Marketing</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(marketing*100).toFixed(0)}%</div>
                            </div>
                            <div style="background: rgba(40, 40, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Adaptaciones Multimedia</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(adaptations*100).toFixed(0)}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Análisis de factores de crecimiento</span><br>
                            <span class="code-keyword">Factor género:</span> ${genre === 'superhero' ? '1.0x' : genre === 'manga' ? '0.8x' : genre === 'european' ? '0.5x' : '0.3x'}<br>
                            <span class="code-keyword">Impacto marketing:</span> +${(marketing*50).toFixed(0)}% en ventas<br>
                            <span class="code-keyword">Impacto adaptaciones:</span> +${(adaptations*70).toFixed(0)}% en ventas<br>
                            <span class="code-keyword">Crecimiento anual estimado:</span> ${(marketing*0.01 + adaptations*0.02).toFixed(2)}%
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
            simulateEvolutionBtn.addEventListener('click', simulateComicEvolution);
        }
        
        // Botón de técnicas
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.add('active');
            });
        }
        
        // Botón de comparación
        const compareGenresBtn = document.getElementById('compareGenresBtn');
        if (compareGenresBtn) {
            compareGenresBtn.addEventListener('click', () => {
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

    // Función para simulación de evolución de cómics
    function simulateComicEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución histórica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1837: 'The Adventures of Obadiah Oldbuck' - Primer cómic...",
            "1895: 'The Yellow Kid' en periódicos - Nacen las tiras cómicas...",
            "1938: Superman en Action Comics #1 - Comienza la Edad de Oro...",
            "1954: Código de autorregulación de cómics - Controversia...",
            "1961: Los 4 Fantásticos - Marvel revoluciona el género...",
            "1986: 'Watchmen' y 'The Dark Knight Returns' - Edad Moderna...",
            "1992: Image Comics fundada - Independencia creativa...",
            "2000: Manga se globaliza - One Piece, Naruto, Dragon Ball...",
            "2008: Iron Man - Inicio del Universo Cinematográfico Marvel...",
            "Presente: Webcómics y cómics digitales - Democratización total"
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
            showComicEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 8500);
    }

    // Función para mostrar resultados de evolución de cómics
    function showComicEvolutionResults() {
        const results = [
            { type: 'Años de historia', value: '180+', color: '#ff4757', icon: 'fa-history' },
            { type: 'Ventas globales', value: '$29B', color: '#ff9f43', icon: 'fa-chart-line' },
            { type: 'Países productores', value: '50+', color: '#1e90ff', icon: 'fa-globe' },
            { type: 'Adaptaciones cine/TV', value: '1000+', color: '#2ed573', icon: 'fa-film' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeComicModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Histórica de los Cómics
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto cultural y económico de los cómics desde sus orígenes hasta la actualidad:</p>
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
        
        // Event listeners para el modal
        document.getElementById('closeComicModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewTimelineBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo detallada de la evolución de los cómics');
            modal.remove();
        });
    }

    // Función para mostrar detalle de editorial
    function showPublisherDetail(publisher) {
        const details = {
            'Marvel Comics': {
                contribution: 'Universo compartido, personajes con problemas humanos, crossovers épicos',
                products: 'Spider-Man, X-Men, Avengers, Iron Man, Captain America, Thor, Hulk',
                timeline: '1939-presente',
                impact: 'Revolucionó superhéroes con personajes imperfectos, creador del MCU'
            },
            'DC Comics': {
                contribution: 'Superhéroes como mitología moderna, Elseworlds, Vertigo para adultos',
                products: 'Superman, Batman, Wonder Woman, Justice League, Sandman, Watchmen',
                timeline: '1934-presente',
                impact: 'Estableció los arquetipos de superhéroe, influencia cultural masiva'
            },
            'Shueisha': {
                contribution: 'Sistema de publicación semanal en revistas antológicas, competencia intensa',
                products: 'Weekly Shonen Jump (One Piece, Naruto, Dragon Ball, Demon Slayer)',
                timeline: '1925-presente',
                impact: 'Popularizó el manga globalmente, sistema de feedback con lectores'
            },
            'Image Comics': {
                contribution: 'Derechos de autor para creadores, libertad creativa total, variedad de géneros',
                products: 'Spawn, The Walking Dead, Saga, Invincible, Witchblade',
                timeline: '1992-presente',
                impact: 'Revolucionó la industria dando poder a los creadores, no solo a las editoriales'
            },
            'Casterman': {
                contribution: 'Formato álbum (hardcover), línea clara, cómics para todas las edades',
                products: 'Las aventuras de Tintín, Blake y Mortimer, Los Pitufos',
                timeline: '1780-presente',
                impact: 'Estableció el cómic europeo como arte respetado, formato de colección'
            },
            'Dark Horse Comics': {
                contribution: 'Adaptaciones de licencias cinematográficas, mezcla de estilos, cómics de calidad',
                products: 'Hellboy, Star Wars comics, Aliens, Predator, 300, Sin City',
                timeline: '1986-presente',
                impact: 'Puente entre cómics y cine, éxito con licencias de medios'
            }
        };
        
        const publisherDetails = details[publisher.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closePublisherModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${publisher.color}; margin-right: 1rem;">
                        <i class="fas ${publisher.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${publisher.color};">${publisher.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${publisher.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${publisher.color};">
                            <i class="fas fa-info-circle"></i> Detalles de la Editorial:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${publisherDetails.contribution ? `
                                <div style="background: rgba(40, 40, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución al Medio</div>
                                    <div style="font-weight: 600;">${publisherDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${publisherDetails.products ? `
                                <div style="background: rgba(40, 40, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Icónicos</div>
                                    <div style="font-weight: 600;">${publisherDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${publisherDetails.timeline ? `
                                <div style="background: rgba(40, 40, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${publisherDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${publisherDetails.impact ? `
                                <div style="background: rgba(40, 40, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto Cultural</div>
                                    <div style="font-weight: 600;">${publisherDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${publisher.title} - Datos relevantes</span><br>
                        <span class="code-keyword">Fundación:</span> ${publisher.title === 'Marvel Comics' ? '1939' : publisher.title === 'DC Comics' ? '1934' : publisher.title === 'Shueisha' ? '1925' : publisher.title === 'Image Comics' ? '1992' : publisher.title === 'Casterman' ? '1780' : '1986'}<br>
                        <span class="code-keyword">País de origen:</span> ${publisher.title === 'Shueisha' ? 'Japón' : publisher.title === 'Casterman' ? 'Bélgica' : 'Estados Unidos'}<br>
                        <span class="code-keyword">Formato principal:</span> ${publisher.title === 'Shueisha' ? 'Revista semanal' : publisher.title === 'Casterman' ? 'Álbum' : 'Comic book/mensual'}<br>
                        <span class="code-keyword">Estado actual:</span> ${publisher.status}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${publisher.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closePublisherModal').addEventListener('click', () => {
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
    console.log('Aplicación Cómics Evolución inicializada correctamente');
});