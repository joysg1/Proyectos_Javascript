document.addEventListener('DOMContentLoaded', function() {
    console.log('Videojuegos: Inicializando aplicación...');
    
    // Datos de desarrolladoras importantes
    const developersData = [
        {
            icon: 'fa-gamepad',
            title: 'Nintendo',
            description: 'Compañía japonesa fundada en 1889 como fabricante de cartas. Revolucionó la industria con NES y Game Boy. Creadora de Mario, Zelda y Pokémon.',
            color: '#e60012',
            status: 'Activo',
            contribution: 'NES, Game Boy, Wii, Switch, Mario, Zelda'
        },
        {
            icon: 'fa-playstation',
            title: 'Sony Interactive',
            description: 'División de Sony fundada en 1993. Lanzó PlayStation en 1994, dominando el mercado con PS2 y PS4. Creadora de Uncharted y God of War.',
            color: '#003791',
            status: 'Activo',
            contribution: 'PlayStation, PS2, PS4, Uncharted, God of War'
        },
        {
            icon: 'fa-xbox',
            title: 'Microsoft Gaming',
            description: 'División de Microsoft. Entró al mercado con Xbox en 2001. Creadora de Halo y Forza. Propietaria de Activision Blizzard.',
            color: '#107c10',
            status: 'Activo',
            contribution: 'Xbox, Xbox 360, Game Pass, Halo, Forza'
        },
        {
            icon: 'fa-ghost',
            title: 'Sega',
            description: 'Compañía japonesa fundada en 1960. Dominó los arcades y compitió con Nintendo en los 90 con Genesis. Creadora de Sonic the Hedgehog.',
            color: '#0089cf',
            status: 'Activo',
            contribution: 'Genesis, Dreamcast, Sonic, Yakuza, Persona'
        },
        {
            icon: 'fa-desktop',
            title: 'Valve Corporation',
            description: 'Compañía estadounidense fundada en 1996. Creadora de Steam (mayor plataforma PC), Half-Life, Portal y Counter-Strike.',
            color: '#ff4500',
            status: 'Activo',
            contribution: 'Steam, Half-Life, Portal, Counter-Strike'
        },
        {
            icon: 'fa-dragon',
            title: 'Square Enix',
            description: 'Compañía japonesa resultante de la fusión de Square y Enix. Líder en RPGs japoneses con Final Fantasy, Dragon Quest y Kingdom Hearts.',
            color: '#00a8ff',
            status: 'Activo',
            contribution: 'Final Fantasy, Dragon Quest, Kingdom Hearts'
        }
    ];

    // Inicializar componentes
    initGameParticles();
    initDevelopers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initGraphicsSimulation();

    // Función para inicializar partículas gaming
    function initGameParticles() {
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
            const particleTypes = [
                {color: 'rgba(138, 43, 226, 0.6)', size: 1.5, speed: 0.3, type: 'pixel'}, // Púrpura (gaming)
                {color: 'rgba(255, 107, 53, 0.5)', size: 2, speed: 0.4, type: 'energy'}, // Naranja
                {color: 'rgba(0, 212, 170, 0.4)', size: 1, speed: 0.2, type: 'data'}, // Verde
                {color: 'rgba(0, 168, 255, 0.5)', size: 1.8, speed: 0.35, type: 'bit'} // Azul
            ];
            
            for (let i = 0; i < particleCount; i++) {
                const typeIndex = Math.floor(Math.random() * particleTypes.length);
                const type = particleTypes[typeIndex];
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: type.size + Math.random() * type.size,
                    speedX: (Math.random() - 0.5) * type.speed,
                    speedY: (Math.random() - 0.5) * type.speed * 0.5,
                    color: type.color,
                    pulseSpeed: Math.random() * 0.05 + 0.02,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type.type,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo con efecto de rejilla gaming
            ctx.fillStyle = 'rgba(10, 10, 18, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Rejilla sutil
            ctx.strokeStyle = 'rgba(138, 43, 226, 0.05)';
            ctx.lineWidth = 1;
            const gridSize = 50;
            
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
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula según tipo
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                
                if (particle.type === 'pixel') {
                    // Píxeles cuadrados (estilo retro)
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
                    
                    // Brillo interior
                    ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.3})`;
                    ctx.fillRect(-particle.size/4, -particle.size/4, particle.size/2, particle.size/2);
                } else if (particle.type === 'energy') {
                    // Partículas de energía (círculos con gradiente)
                    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 2);
                    gradient.addColorStop(0, `rgba(255, 107, 53, ${currentAlpha})`);
                    gradient.addColorStop(1, `rgba(255, 107, 53, 0)`);
                    
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Formas variadas
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    ctx.beginPath();
                    
                    if (particle.type === 'bit') {
                        // Triángulos
                        ctx.moveTo(0, -particle.size);
                        ctx.lineTo(particle.size, particle.size);
                        ctx.lineTo(-particle.size, particle.size);
                    } else {
                        // Círculos
                        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    }
                    
                    ctx.closePath();
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
        console.log('Partículas gaming inicializadas');
    }

    // Función para inicializar desarrolladoras
    function initDevelopers() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de desarrolladoras no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        developersData.forEach(developer => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${developer.color};">
                        <i class="fas ${developer.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${developer.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${developer.color}20; color: ${developer.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${developer.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${developer.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${developer.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showDeveloperDetail(developer));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Desarrolladoras inicializadas: ' + developersData.length);
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

    // Función para inicializar simulación de gráficos
    function initGraphicsSimulation() {
        console.log('Inicializando simulación de gráficos...');
        
        // Elementos del DOM
        const consoleGenSlider = document.getElementById('consoleGenSlider');
        const consoleGenValue = document.getElementById('consoleGenValue');
        const resolutionSlider = document.getElementById('resolutionSlider');
        const resolutionValue = document.getElementById('resolutionValue');
        const polygonsSlider = document.getElementById('polygonsSlider');
        const polygonsValue = document.getElementById('polygonsValue');
        const gameTypeButtons = document.querySelectorAll('.game-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('graphicsEvolutionCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !consoleGenSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Resoluciones históricas
        const resolutions = [
            '160x192', '256x240', '320x240', '512x448', '640x480', 
            '800x600', '1024x768', '1280x720', '1920x1080', '3840x2160', '7680x4320'
        ];
        
        // Polígonos por frame históricos
        const polygons = [
            '100', '500', '2K', '10K', '50K', '250K', '1M', '5M', '20M', '100M', '500M'
        ];
        
        // Generaciones de consolas
        const consoleGens = [
            '1ra Gen (1972)', '2da Gen (1976)', '3ra Gen (1983)', '4ta Gen (1987)', 
            '5ta Gen (1993)', '6ta Gen (1998)', '7ma Gen (2005)', '8va Gen (2012)', 
            '9na Gen (2020)'
        ];
        
        // Actualizar valores de los sliders
        consoleGenSlider.addEventListener('input', function() {
            consoleGenValue.textContent = consoleGens[this.value - 1];
        });
        
        resolutionSlider.addEventListener('input', function() {
            resolutionValue.textContent = resolutions[this.value - 1];
        });
        
        polygonsSlider.addEventListener('input', function() {
            polygonsValue.textContent = polygons[this.value - 1];
        });
        
        // Botones de tipo de juego
        gameTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                gameTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runGraphicsSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            consoleGenSlider.value = 6;
            consoleGenValue.textContent = '6ta Gen (PS2/Xbox)';
            resolutionSlider.value = 25;
            resolutionValue.textContent = '640x480';
            polygonsSlider.value = 25;
            polygonsValue.textContent = '250K';
            gameTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="platformer"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">La evolución gráfica muestra un crecimiento exponencial desde los 8-bit hasta el Ray Tracing</div>';
            
            // Ejecutar simulación con valores por defecto
            runGraphicsSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runGraphicsSimulation();
        }, 500);
        
        console.log('Simulación de gráficos inicializada');
    }

    // Función para ejecutar simulación de gráficos
    function runGraphicsSimulation() {
        const canvas = document.getElementById('graphicsEvolutionCanvas');
        const ctx = canvas.getContext('2d');
        const consoleGen = parseInt(document.getElementById('consoleGenSlider').value);
        const resolution = parseInt(document.getElementById('resolutionSlider').value);
        const polygons = parseInt(document.getElementById('polygonsSlider').value);
        const gameType = document.querySelector('.game-type-btn.active').dataset.type;
        
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
        
        // Eje Y (calidad gráfica)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Años (1970-2024)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Calidad Gráfica (0-100)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X (años)
        const years = ['1970', '1980', '1990', '2000', '2010', '2020'];
        for (let i = 0; i < years.length; i++) {
            const x = padding + (i * graphWidth) / (years.length - 1);
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(years[i], x, canvas.height - padding + 20);
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
        
        // Curvas de evolución gráfica por generación
        const generationCurves = {
            1: [ // 1ra generación (1972-1977)
                {year: 1972, quality: 5},
                {year: 1977, quality: 8}
            ],
            2: [ // 2da generación (1976-1984)
                {year: 1976, quality: 10},
                {year: 1984, quality: 18}
            ],
            3: [ // 3ra generación (1983-1992)
                {year: 1983, quality: 20},
                {year: 1992, quality: 35}
            ],
            4: [ // 4ta generación (1987-1996)
                {year: 1987, quality: 30},
                {year: 1996, quality: 50}
            ],
            5: [ // 5ta generación (1993-2006)
                {year: 1993, quality: 40},
                {year: 2006, quality: 65}
            ],
            6: [ // 6ta generación (1998-2013)
                {year: 1998, quality: 55},
                {year: 2013, quality: 75}
            ],
            7: [ // 7ma generación (2005-2017)
                {year: 2005, quality: 70},
                {year: 2017, quality: 85}
            ],
            8: [ // 8va generación (2012-2020)
                {year: 2012, quality: 80},
                {year: 2020, quality: 92}
            ],
            9: [ // 9na generación (2020-presente)
                {year: 2020, quality: 90},
                {year: 2024, quality: 98}
            ]
        };
        
        // Curvas por tipo de juego
        const gameTypeCurves = {
            'platformer': [ // Juegos de plataformas
                {year: 1980, quality: 15},
                {year: 1990, quality: 40},
                {year: 2000, quality: 70},
                {year: 2010, quality: 85},
                {year: 2020, quality: 95}
            ],
            'rpg': [ // RPG
                {year: 1980, quality: 10},
                {year: 1990, quality: 35},
                {year: 2000, quality: 65},
                {year: 2010, quality: 80},
                {year: 2020, quality: 92}
            ],
            'fps': [ // First Person Shooter
                {year: 1990, quality: 20},
                {year: 2000, quality: 60},
                {year: 2010, quality: 85},
                {year: 2020, quality: 97}
            ],
            'openworld': [ // Mundo abierto
                {year: 2000, quality: 50},
                {year: 2010, quality: 75},
                {year: 2020, quality: 96}
            ]
        };
        
        // Dibujar curva de generación seleccionada
        const genCurve = generationCurves[consoleGen];
        ctx.strokeStyle = 'rgba(138, 43, 226, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        genCurve.forEach((point, i) => {
            const x = padding + ((point.year - 1970) / 54) * graphWidth;
            const y = canvas.height - padding - (point.quality / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar puntos en la curva
        genCurve.forEach((point, i) => {
            const x = padding + ((point.year - 1970) / 54) * graphWidth;
            const y = canvas.height - padding - (point.quality / 100) * graphHeight;
            
            // Punto
            ctx.fillStyle = 'rgba(138, 43, 226, 0.9)';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // Anillo exterior
            ctx.strokeStyle = 'rgba(138, 43, 226, 0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.stroke();
        });
        
        // Dibujar curva del tipo de juego
        const gameCurve = gameTypeCurves[gameType];
        ctx.strokeStyle = 'rgba(255, 107, 53, 0.8)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        
        gameCurve.forEach((point, i) => {
            const x = padding + ((point.year - 1970) / 54) * graphWidth;
            const y = canvas.height - padding - (point.quality / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Curva generación
        ctx.fillStyle = 'rgba(138, 43, 226, 0.9)';
        ctx.fillRect(canvas.width - 200, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(`Generación ${consoleGen}`, canvas.width - 175, 32);
        
        // Curva tipo de juego
        ctx.fillStyle = 'rgba(255, 107, 53, 0.9)';
        ctx.fillRect(canvas.width - 200, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(getGameTypeName(gameType), canvas.width - 175, 57);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const lastGenPoint = genCurve[genCurve.length - 1];
        const lastGamePoint = gameCurve[gameCurve.length - 1];
        
        if (lastGenPoint.quality < lastGamePoint.quality) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Hardware limitante para ${getGameTypeName(gameType)} (${lastGenPoint.quality}% < ${lastGamePoint.quality}%)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Hardware adecuado para ${getGameTypeName(gameType)} (${lastGenPoint.quality}%)
                </div>
            `;
        }
    }
    
    // Función auxiliar para obtener nombre de tipo de juego
    function getGameTypeName(type) {
        const names = {
            'platformer': 'Plataformas',
            'rpg': 'RPG',
            'fps': 'FPS',
            'openworld': 'Mundo Abierto'
        };
        return names[type] || type;
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const consoleGen = parseInt(document.getElementById('consoleGenSlider').value);
        const resolution = document.getElementById('resolutionValue').textContent;
        const polygons = document.getElementById('polygonsValue').textContent;
        const gameType = document.querySelector('.game-type-btn.active').dataset.type;
        
        const consoleGens = [
            '1ra Gen (1972)', '2da Gen (1976)', '3ra Gen (1983)', '4ta Gen (1987)', 
            '5ta Gen (1993)', '6ta Gen (1998)', '7ma Gen (2005)', '8va Gen (2012)', 
            '9na Gen (2020)'
        ];
        
        const gameTypeNames = {
            'platformer': 'Juegos de Plataformas',
            'rpg': 'Role Playing Games (RPG)',
            'fps': 'First Person Shooter (FPS)',
            'openworld': 'Mundo Abierto'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Evolución Gráfica
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Generación de Consola</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${consoleGens[consoleGen-1]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Juego</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${gameTypeNames[gameType]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Resolución Máxima</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${resolution}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Polígonos/Frame</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${polygons}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Evolución gráfica por década</span><br>
                            <span class="code-keyword">1980s (8-bit):</span> Sprites 2D, 16-256 colores, resoluciones ≤ 320x240<br>
                            <span class="code-keyword">1990s (16/32-bit):</span> Sprites avanzados, modo 7, primeros 3D, 640x480<br>
                            <span class="code-keyword">2000s (128-bit):</span> Gráficos 3D realistas, texturas detalladas, 1280x720<br>
                            <span class="code-keyword">2010s (HD):</span> Física avanzada, iluminación dinámica, 1920x1080<br>
                            <span class="code-keyword">2020s (4K/8K):</span> Ray Tracing, DLSS/FSR, alta frecuencia, 8K
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
        
        // Botón de comparación (actualizado para consolas)
        const compareConsolesBtn = document.getElementById('compareConsolesBtn');
        if (compareConsolesBtn) {
            compareConsolesBtn.addEventListener('click', () => {
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
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución de videojuegos...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1958: Tennis for Two - Primer videojuego interactivo...",
            "1962: Spacewar! - Primer juego para computadora...",
            "1972: Pong - Nacimiento de la industria arcade...",
            "1978: Space Invaders - La fiebre del arcade comienza...",
            "1980: Pac-Man - Icono cultural mundial...",
            "1985: Super Mario Bros - Nintendo revive la industria...",
            "1994: PlayStation - La era 3D comienza...",
            "2001: Xbox - Microsoft entra al mercado...",
            "2006: Wii - Juego motion control para todos...",
            "2013: PS4/Xbox One - La era HD se consolida...",
            "2020: PS5/Xbox Series - Ray Tracing, SSD y 8K..."
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
        }, 9600);
    }

    // Función para mostrar resultados de evolución tecnológica
    function showTechEvolutionResults() {
        const results = [
            { type: 'Ingresos anuales', value: '$200B+', color: '#8a2be2', icon: 'fa-dollar-sign' },
            { type: 'Jugadores globales', value: '3.2B', color: '#ff6b35', icon: 'fa-users' },
            { type: 'Años de historia', value: '50+', color: '#00d4aa', icon: 'fa-calendar-alt' },
            { type: 'Mercado móvil', value: '52%', color: '#4ade80', icon: 'fa-mobile-alt' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución de la Industria del Videojuego
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de los videojuegos desde sus inicios en 1958 hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución de los videojuegos');
            modal.remove();
        });
    }

    // Función para mostrar detalle de desarrolladora
    function showDeveloperDetail(developer) {
        const details = {
            'Nintendo': {
                contribution: 'Revolucionó la industria con NES después del crash de 1983',
                products: 'NES, Game Boy, Wii, Switch, Mario, Zelda, Pokémon, Animal Crossing',
                timeline: '1889-presente (videojuegos desde 1970s)',
                impact: 'La compañía de videojuegos más valiosa e influyente de la historia'
            },
            'Sony Interactive': {
                contribution: 'Popularizó los juegos en CD-ROM y el 3D con PlayStation',
                products: 'PlayStation 1-5, Uncharted, God of War, The Last of Us, Spider-Man',
                timeline: '1993-presente',
                impact: 'Consola más vendida de la historia (PS2) y liderazgo en mercado actual'
            },
            'Microsoft Gaming': {
                contribution: 'Introdujo Xbox Live y revolucionó el juego online en consolas',
                products: 'Xbox, Xbox 360, Xbox One, Xbox Series X/S, Halo, Forza, Game Pass',
                timeline: '2001-presente',
                impact: 'Pionera en servicios de suscripción (Game Pass) y compra de Activision'
            },
            'Sega': {
                contribution: 'Líder en arcades y competencia directa con Nintendo en los 90',
                products: 'Genesis/Mega Drive, Dreamcast, Sonic, Yakuza, Persona, Total War',
                timeline: '1960-presente (videojuegos desde 1980s)',
                impact: 'Creadora de Sonic (rival de Mario) y pionera en juegos arcade'
            },
            'Valve Corporation': {
                contribution: 'Creadora de Steam, la plataforma de PC gaming dominante',
                products: 'Steam, Half-Life, Portal, Counter-Strike, Dota 2, Steam Deck',
                timeline: '1996-presente',
                impact: 'Controla ~75% del mercado de distribución digital en PC'
            },
            'Square Enix': {
                contribution: 'Líder en RPGs japoneses con narrativa cinematográfica',
                products: 'Final Fantasy I-XVI, Dragon Quest, Kingdom Hearts, Tomb Raider',
                timeline: '2003-presente (Square desde 1986)',
                impact: 'Definió el JRPG moderno y exportó cultura gaming japonesa al mundo'
            }
        };
        
        const developerDetails = details[developer.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDeveloperModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${developer.color}; margin-right: 1rem;">
                        <i class="fas ${developer.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${developer.color};">${developer.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${developer.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${developer.color};">
                            <i class="fas fa-info-circle"></i> Detalles de la Desarrolladora:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${developerDetails.contribution ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${developerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${developerDetails.products ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${developerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${developerDetails.timeline ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${developerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${developerDetails.impact ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en la Industria</div>
                                    <div style="font-weight: 600;">${developerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${developer.title} - Franquicias icónicas</span><br>
                        <span class="code-keyword">Géneros principales:</span> ${developer.title === 'Nintendo' ? 'Plataformas, Aventura' : developer.title === 'Square Enix' ? 'RPG, Aventura' : 'Variados'}<br>
                        <span class="code-keyword">Plataformas:</span> ${developer.title === 'Valve Corporation' ? 'PC exclusivo' : 'Multiplataforma'}<br>
                        <span class="code-keyword">Estado actual:</span> ${developer.status}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${developer.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeDeveloperModal').addEventListener('click', () => {
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
    console.log('Aplicación Videojuegos inicializada correctamente');
});