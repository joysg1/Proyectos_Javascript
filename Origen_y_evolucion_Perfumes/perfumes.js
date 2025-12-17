document.addEventListener('DOMContentLoaded', function() {
    console.log('Perfumes: Inicializando aplicación...');
    
    // Datos de casas perfumistas importantes
    const perfumeHousesData = [
        {
            icon: 'fa-crown',
            title: 'Guerlain',
            description: 'Fundada en 1828 en París. Creadora de clásicos como Shalimar (1925) y Jicky (1889). Pionera en perfumería moderna.',
            color: '#c792ea',
            status: 'Activa',
            contribution: 'Shalimar, Jicky, Mitsouko'
        },
        {
            icon: 'fa-chess-queen',
            title: 'Chanel',
            description: 'Chanel N°5 (1921) revolucionó la perfumería con aldehídos. Sinónimo de elegancia y sofisticación francesa.',
            color: '#9c6ad6',
            status: 'Activa',
            contribution: 'Chanel N°5, Coco, Chance'
        },
        {
            icon: 'fa-gem',
            title: 'Creed',
            description: 'Fundada en 1760, proveedora real británica. Aventus (2010) es un ícono moderno de perfumería masculina.',
            color: '#ffb74d',
            status: 'Activa',
            contribution: 'Aventus, Silver Mountain Water'
        },
        {
            icon: 'fa-feather-alt',
            title: 'Jo Malone',
            description: 'Británica fundada en 1994. Conocida por fragancias simples y elegantes con notas individuales distintivas.',
            color: '#80cbc4',
            status: 'Activa',
            contribution: 'Lime Basil & Mandarin, Wood Sage & Sea Salt'
        },
        {
            icon: 'fa-magic',
            title: 'Frédéric Malle',
            description: 'Editorial de perfumes fundada en 2000. Colabora con los mejores "noses" del mundo para crear obras maestras.',
            color: '#ff5252',
            status: 'Activa',
            contribution: 'Portrait of a Lady, Carnal Flower'
        },
        {
            icon: 'fa-seedling',
            title: 'Diptyque',
            description: 'Fundada en 1961 en París. Conocida por fragancias evocadoras que capturan momentos y lugares específicos.',
            color: '#69f0ae',
            status: 'Activa',
            contribution: 'Philosykos, Do Son, Eau Rose'
        }
    ];

    // Inicializar componentes
    initPerfumeParticles();
    initPerfumeHouses();
    initEventListeners();
    initAnimations();
    initTimeline();
    initPerfumeSimulation();

    // Función para inicializar partículas aromáticas
    function initPerfumeParticles() {
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
            const noteColors = [
                'rgba(199, 146, 234, 0.3)',  // Floral - púrpura
                'rgba(255, 183, 77, 0.3)',   // Oriental - naranja
                'rgba(128, 203, 196, 0.3)',  // Cítrico - turquesa
                'rgba(105, 240, 174, 0.3)',  // Verde - verde menta
                'rgba(255, 82, 82, 0.3)',    // Caliente - rojo
            ];
            
            for (let i = 0; i < particleCount; i++) {
                const type = Math.random();
                const colorIndex = Math.floor(Math.random() * noteColors.length);
                const baseColor = noteColors[colorIndex];
                
                // Variar la opacidad
                const alpha = Math.random() * 0.4 + 0.1;
                const color = baseColor.replace(/[\d.]+\)$/, `${alpha})`);
                
                // Tamaño y velocidad basados en el tipo
                let size, speedX, speedY;
                
                if (type < 0.6) {
                    // Partículas de flor (ligeras y flotantes)
                    size = Math.random() * 3 + 1;
                    speedX = (Math.random() - 0.5) * 0.2;
                    speedY = (Math.random() - 0.7) * 0.3; // Más flotante hacia arriba
                } else if (type < 0.9) {
                    // Partículas de especia (más densas)
                    size = Math.random() * 4 + 2;
                    speedX = (Math.random() - 0.5) * 0.4;
                    speedY = (Math.random() - 0.5) * 0.2;
                } else {
                    // Partículas especiales (brillantes)
                    size = Math.random() * 5 + 3;
                    speedX = (Math.random() - 0.5) * 0.6;
                    speedY = (Math.random() - 0.5) * 0.4;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speedX,
                    speedY: speedY,
                    color: color,
                    pulseSpeed: Math.random() * 0.03 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    drift: Math.random() * 0.5 - 0.25
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo sutil con gradiente
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 21, 37, 0.1)');
            gradient.addColorStop(1, 'rgba(15, 11, 22, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Movimiento con deriva suave
                particle.x += particle.speedX + Math.sin(Date.now() * 0.001 + particle.drift) * 0.05;
                particle.y += particle.speedY;
                particle.rotation += particle.rotationSpeed;
                
                // Reiniciar posición si sale de la pantalla
                if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
                if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
                if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
                if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
                
                // Dibujar partícula con forma de flor o círculo
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                
                // Forma diferente según tamaño
                ctx.beginPath();
                
                if (particle.size > 4) {
                    // Flor de 5 pétalos para partículas grandes
                    for (let i = 0; i < 5; i++) {
                        const angle = (i * Math.PI * 2) / 5;
                        const petalSize = particle.size * 1.2;
                        ctx.lineTo(
                            Math.cos(angle) * petalSize,
                            Math.sin(angle) * petalSize
                        );
                    }
                    ctx.closePath();
                } else {
                    // Círculo para partículas pequeñas
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                }
                
                // Gradiente para partículas grandes
                if (particle.size > 4) {
                    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 1.5);
                    const rgb = particle.color.match(/\d+/g);
                    gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${pulse * 0.6})`);
                    gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);
                    ctx.fillStyle = gradient;
                } else {
                    const rgb = particle.color.match(/\d+/g);
                    ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${pulse * 0.4})`;
                }
                
                ctx.fill();
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
        console.log('Partículas aromáticas inicializadas');
    }

    // Función para inicializar casas perfumistas
    function initPerfumeHouses() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de casas perfumistas no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        perfumeHousesData.forEach(house => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${house.color};">
                        <i class="fas ${house.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${house.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${house.color}20; color: ${house.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${house.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Icono: ${house.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${house.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--perfume-accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showPerfumeHouseDetail(house));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Casas perfumistas inicializadas: ' + perfumeHousesData.length);
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

    // Función para inicializar simulación de creación de perfume
    function initPerfumeSimulation() {
        console.log('Inicializando simulación de creación de perfume...');
        
        // Elementos del DOM
        const olfactiveSlider = document.getElementById('olfactiveSlider');
        const olfactiveValue = document.getElementById('olfactiveValue');
        const citrusSlider = document.getElementById('citrusSlider');
        const citrusValue = document.getElementById('citrusValue');
        const woodySlider = document.getElementById('woodySlider');
        const woodyValue = document.getElementById('woodyValue');
        const concentrationButtons = document.querySelectorAll('.concentration-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showNotesBtn = document.getElementById('showNotesBtn');
        const canvas = document.getElementById('perfumePyramidCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !olfactiveSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Familias olfativas
        const olfactiveFamilies = [
            'Hespereidés', 'Verde', 'Floral', 'Chipre', 'Amaderado', 'Oriental'
        ];
        
        // Actualizar valores de los sliders
        olfactiveSlider.addEventListener('input', function() {
            olfactiveValue.textContent = olfactiveFamilies[this.value - 1];
        });
        
        citrusSlider.addEventListener('input', function() {
            citrusValue.textContent = `${this.value}%`;
        });
        
        woodySlider.addEventListener('input', function() {
            woodyValue.textContent = `${this.value}%`;
        });
        
        // Botones de concentración
        concentrationButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                concentrationButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runPerfumeCreationSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            olfactiveSlider.value = 3;
            olfactiveValue.textContent = 'Floral';
            citrusSlider.value = 30;
            citrusValue.textContent = '30%';
            woodySlider.value = 40;
            woodyValue.textContent = '40%';
            concentrationButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="parfum"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Tu fragancia: Floral-Amaderada con acentos cítricos - Duración estimada: 6-8 horas</div>';
            
            // Ejecutar simulación con valores por defecto
            runPerfumeCreationSimulation();
        });
        
        // Mostrar notas
        showNotesBtn.addEventListener('click', function() {
            showPerfumeNotes();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runPerfumeCreationSimulation();
        }, 500);
        
        console.log('Simulación de creación de perfume inicializada');
    }

    // Función para ejecutar simulación de creación de perfume
    function runPerfumeCreationSimulation() {
        const canvas = document.getElementById('perfumePyramidCanvas');
        const ctx = canvas.getContext('2d');
        const olfactiveFamily = parseInt(document.getElementById('olfactiveSlider').value);
        const citrusPercent = parseInt(document.getElementById('citrusSlider').value) / 100;
        const woodyPercent = parseInt(document.getElementById('woodySlider').value) / 100;
        const concentration = document.querySelector('.concentration-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 60;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Colores para las familias olfativas
        const familyColors = [
            'rgba(255, 204, 128, 0.8)',  // Hespereidés - amarillo
            'rgba(105, 240, 174, 0.8)',  // Verde - verde
            'rgba(199, 146, 234, 0.8)',  // Floral - púrpura
            'rgba(255, 82, 82, 0.8)',    // Chipre - rojo
            'rgba(128, 203, 196, 0.8)',  // Amaderado - turquesa
            'rgba(255, 183, 77, 0.8)'    // Oriental - naranja
        ];
        
        // Duración según concentración
        const concentrationDurations = {
            'cologne': '2-4 horas',
            'toilette': '4-6 horas',
            'parfum': '6-8 horas',
            'extrait': '8-12 horas'
        };
        
        // Dibujar pirámide olfativa
        const pyramidHeight = graphHeight * 0.8;
        const pyramidWidth = graphWidth * 0.6;
        const pyramidX = padding + (graphWidth - pyramidWidth) / 2;
        const pyramidY = canvas.height - padding - pyramidHeight;
        
        // Capa 1: Notas de salida (triángulo superior)
        ctx.fillStyle = familyColors[olfactiveFamily - 1];
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(pyramidX + pyramidWidth / 2, pyramidY);
        ctx.lineTo(pyramidX + pyramidWidth * 0.7, pyramidY + pyramidHeight * 0.3);
        ctx.lineTo(pyramidX + pyramidWidth * 0.3, pyramidY + pyramidHeight * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Capa 2: Notas de corazón (trapecio medio)
        ctx.fillStyle = familyColors[(olfactiveFamily) % 6];
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(pyramidX + pyramidWidth * 0.3, pyramidY + pyramidHeight * 0.3);
        ctx.lineTo(pyramidX + pyramidWidth * 0.7, pyramidY + pyramidHeight * 0.3);
        ctx.lineTo(pyramidX + pyramidWidth * 0.8, pyramidY + pyramidHeight * 0.6);
        ctx.lineTo(pyramidX + pyramidWidth * 0.2, pyramidY + pyramidHeight * 0.6);
        ctx.closePath();
        ctx.fill();
        
        // Capa 3: Notas de fondo (trapecio inferior)
        ctx.fillStyle = familyColors[(olfactiveFamily + 1) % 6];
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.moveTo(pyramidX + pyramidWidth * 0.2, pyramidY + pyramidHeight * 0.6);
        ctx.lineTo(pyramidX + pyramidWidth * 0.8, pyramidY + pyramidHeight * 0.6);
        ctx.lineTo(pyramidX + pyramidWidth * 0.9, pyramidY + pyramidHeight);
        ctx.lineTo(pyramidX + pyramidWidth * 0.1, pyramidY + pyramidHeight);
        ctx.closePath();
        ctx.fill();
        
        ctx.globalAlpha = 1.0;
        
        // Etiquetas de las capas
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        
        // Notas de salida
        const topNotes = ['Bergamota', 'Limón', 'Lima', 'Neroli', 'Mandarina'];
        const selectedTopNotes = topNotes.slice(0, 2 + Math.floor(citrusPercent * 3));
        ctx.fillText('Salida: ' + selectedTopNotes.join(', '), pyramidX + pyramidWidth / 2, pyramidY + 20);
        
        // Notas de corazón
        const heartNotes = ['Rosa', 'Jazmín', 'Lirio', 'Peonía', 'Tuberosa', 'Ylang-Ylang'];
        const selectedHeartNotes = heartNotes.slice(0, 3 + Math.floor((1 - citrusPercent - woodyPercent) * 3));
        ctx.fillText('Corazón: ' + selectedHeartNotes.join(', '), pyramidX + pyramidWidth / 2, pyramidY + pyramidHeight * 0.45);
        
        // Notas de fondo
        const baseNotes = ['Sándalo', 'Vetiver', 'Pachulí', 'Ámbar', 'Vainilla', 'Musk'];
        const selectedBaseNotes = baseNotes.slice(0, 2 + Math.floor(woodyPercent * 4));
        ctx.fillText('Fondo: ' + selectedBaseNotes.join(', '), pyramidX + pyramidWidth / 2, pyramidY + pyramidHeight * 0.8);
        
        // Leyenda y detalles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        
        // Información de la fragancia
        const familyNames = ['Hespereidés (Cítrica)', 'Verde (Herbal)', 'Floral', 'Chipre (Musgosa)', 'Amaderada', 'Oriental (Espesada)'];
        const concentrationNames = {
            'cologne': 'Eau de Cologne',
            'toilette': 'Eau de Toilette',
            'parfum': 'Eau de Parfum',
            'extrait': 'Parfum/Extrait'
        };
        
        const infoY = padding + 20;
        ctx.fillText(`Familia: ${familyNames[olfactiveFamily - 1]}`, padding, infoY);
        ctx.fillText(`Concentración: ${concentrationNames[concentration]}`, padding, infoY + 20);
        ctx.fillText(`Duración: ${concentrationDurations[concentration]}`, padding, infoY + 40);
        ctx.fillText(`Balance: ${Math.round(citrusPercent*100)}% cítrico, ${Math.round(woodyPercent*100)}% amaderado`, padding, infoY + 60);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        conclusion.innerHTML = `
            <div class="result-text" style="color: var(--perfume-accent-light);">
                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                ${familyNames[olfactiveFamily - 1]} - ${concentrationNames[concentration]} | Duración: ${concentrationDurations[concentration]}
            </div>
            <div style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
                Notas dominantes: ${selectedTopNotes[0]}, ${selectedHeartNotes[0]}, ${selectedBaseNotes[0]}
            </div>
        `;
    }

    // Función para mostrar notas del perfume
    function showPerfumeNotes() {
        const olfactiveFamily = parseInt(document.getElementById('olfactiveSlider').value);
        const citrusPercent = parseInt(document.getElementById('citrusSlider').value) / 100;
        const woodyPercent = parseInt(document.getElementById('woodySlider').value) / 100;
        const concentration = document.querySelector('.concentration-btn.active').dataset.type;
        
        const familyNames = ['Hespereidés', 'Verde', 'Floral', 'Chipre', 'Amaderado', 'Oriental'];
        const concentrationNames = {
            'cologne': 'Eau de Cologne (3-5%)',
            'toilette': 'Eau de Toilette (5-15%)',
            'parfum': 'Eau de Parfum (15-20%)',
            'extrait': 'Parfum/Extrait (20-30%)'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeNotesModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--perfume-accent-light);">
                    <i class="fas fa-list-ol"></i> Composición Detallada de tu Fragancia
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(40, 35, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Familia Olfativa</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--perfume-accent);">${familyNames[olfactiveFamily-1]}</div>
                            </div>
                            <div style="background: rgba(40, 35, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Concentración</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--perfume-accent-light);">${concentrationNames[concentration]}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Pirámide Olfativa Completa</span><br>
                            <span class="code-keyword">NOTAS DE SALIDA (15-30 min):</span> Bergamota, Limón, Lima, Neroli<br>
                            <span class="code-keyword">NOTAS DE CORAZÓN (2-4 horas):</span> Rosa, Jazmín, Lirio, Peonía<br>
                            <span class="code-keyword">NOTAS DE FONDO (6+ horas):</span> Sándalo, Vetiver, Pachulí, Ámbar<br>
                            <span class="code-keyword">FIJADORES:</span> Musk, Vainilla, Benjuí<br>
                            <span class="code-keyword">DISOLVENTE:</span> Alcohol etílico (96%)
                        </div>
                        
                        <div style="background: rgba(40, 35, 60, 0.3); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                            <div style="color: var(--perfume-accent-light); font-weight: bold; margin-bottom: 0.5rem;">
                                <i class="fas fa-lightbulb"></i> Consejo del Perfumista
                            </div>
                            <div style="color: var(--text-secondary);">
                                Esta fragancia ${familyNames[olfactiveFamily-1].toLowerCase()} funciona mejor en climas ${olfactiveFamily <= 3 ? 'cálidos' : 'fríos'}. 
                                Aplica en puntos de pulso (muñecas, cuello) para una difusión óptima.
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="saveFormulaBtn" style="min-width: 200px;">
                            <i class="fas fa-save"></i> Guardar Fórmula
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal de notas
        document.getElementById('closeNotesModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('saveFormulaBtn').addEventListener('click', () => {
            alert('Fórmula guardada en tu colección virtual de perfumes');
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        if (simulateEvolutionBtn) {
            simulateEvolutionBtn.addEventListener('click', simulatePerfumeEvolution);
        }
        
        // Botón de composición
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.add('active');
            });
        }
        
        // Botón de comparación
        const compareFamiliesBtn = document.getElementById('compareFamiliesBtn');
        if (compareFamiliesBtn) {
            compareFamiliesBtn.addEventListener('click', () => {
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

    // Función para simulación de evolución de perfumería
    function simulatePerfumeEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Viajando en el tiempo olfativo...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "2000 a.C.: Resinas sagradas en Mesopotamia...",
            "1500 a.C.: Perfumes egipcios para momificación...",
            "S. IX: Destilación al vapor en el mundo árabe...",
            "S. XIV: Primer perfume alcohólico en Hungría...",
            "S. XVIII: Grasse, capital mundial del perfume...",
            "1889: Jicky de Guerlain, primer perfume moderno...",
            "1921: Chanel N°5 revoluciona con aldehídos...",
            "1970s: Boom de fragancias unisex...",
            "2000s: Perfumería de nicho y personalización..."
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
            showPerfumeEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 7200);
    }

    // Función para mostrar resultados de evolución
    function showPerfumeEvolutionResults() {
        const results = [
            { type: 'Años de historia', value: '4000+', color: '#c792ea', icon: 'fa-hourglass' },
            { type: 'Ingredientes usados', value: '1700+', color: '#ffb74d', icon: 'fa-vial' },
            { type: 'Perfumes creados', value: '50,000+', color: '#80cbc4', icon: 'fa-wine-bottle' },
            { type: 'Mercado global', value: '$50B', color: '#69f0ae', icon: 'fa-chart-line' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeEvoModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--perfume-accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> La Evolución de la Perfumería
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Recorrido histórico desde las primeras resinas sagradas hasta la perfumería molecular moderna:</p>
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
                    <button class="btn" id="viewHistoryBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-history"></i> Ver Historia Completa
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal
        document.getElementById('closeEvoModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewHistoryBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo detallada de la historia de la perfumería');
            modal.remove();
        });
    }

    // Función para mostrar detalle de casa perfumista
    function showPerfumeHouseDetail(house) {
        const details = {
            'Guerlain': {
                contribution: 'Perfumería artística, innovación en formulación',
                products: 'Shalimar (1925), Jicky (1889), Mitsouko (1919), L\'Heure Bleue (1912)',
                timeline: '1828-presente',
                impact: 'Transformó la perfumería de oficio a arte, 170+ años de innovación'
            },
            'Chanel': {
                contribution: 'Introducción de aldehídos, marketing de lujo',
                products: 'Chanel N°5 (1921), Coco (1984), Chance (2002), Bleu de Chanel (2010)',
                timeline: '1921-presente',
                impact: 'Revolucionó la perfumería con aldehídos, estableció estándares de lujo'
            },
            'Creed': {
                contribution: 'Tradición real británica, ingredientes de lujo',
                products: 'Aventus (2010), Silver Mountain Water (1995), Virgin Island Water (2007)',
                timeline: '1760-presente',
                impact: 'Mantiene tradiciones artesanales mientras innova con fragancias modernas'
            },
            'Jo Malone': {
                contribution: 'Fragancias simples y elegantes, combinaciones únicas',
                products: 'Lime Basil & Mandarin (1999), Wood Sage & Sea Salt (2014), English Pear & Freesia (2010)',
                timeline: '1994-presente',
                impact: 'Popularizó fragancias de notas individuales y combinaciones personalizadas'
            },
            'Frédéric Malle': {
                contribution: 'Editorial de perfumes, colaboración con grandes "noses"',
                products: 'Portrait of a Lady (2010), Carnal Flower (2005), Musc Ravageur (2000)',
                timeline: '2000-presente',
                impact: 'Revolucionó la industria dando crédito completo a los perfumistas'
            },
            'Diptyque': {
                contribution: 'Fragancias evocadoras, estética única',
                products: 'Philosykos (1996), Do Son (2005), Eau Rose (2012), Baies (1999)',
                timeline: '1961-presente',
                impact: 'Bridging between perfumery and artistic expression, unique storytelling'
            }
        };
        
        const houseDetails = details[house.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeHouseModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${house.color}; margin-right: 1rem;">
                        <i class="fas ${house.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${house.color};">${house.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${house.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${house.color};">
                            <i class="fas fa-info-circle"></i> Detalles de la Casa:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${houseDetails.contribution ? `
                                <div style="background: rgba(40, 35, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución</div>
                                    <div style="font-weight: 600;">${houseDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${houseDetails.products ? `
                                <div style="background: rgba(40, 35, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Iconos</div>
                                    <div style="font-weight: 600;">${houseDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${houseDetails.timeline ? `
                                <div style="background: rgba(40, 35, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${houseDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${houseDetails.impact ? `
                                <div style="background: rgba(40, 35, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto</div>
                                    <div style="font-weight: 600;">${houseDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${house.title} - Filosofía y Técnicas</span><br>
                        <span class="code-keyword">Estilo:</span> ${house.title === 'Guerlain' ? 'Perfumería artística clásica' : 
                              house.title === 'Chanel' ? 'Elegancia moderna y atemporal' :
                              house.title === 'Creed' ? 'Tradición real e ingredientes excepcionales' :
                              house.title === 'Jo Malone' ? 'Simplicidad elegante y combinaciones únicas' :
                              house.title === 'Frédéric Malle' ? 'Obras maestras de autor' :
                              'Fragancias evocadoras y artísticas'}<br>
                        <span class="code-keyword">Técnicas destacadas:</span> Destilación tradicional, extracción con solventes<br>
                        <span class="code-keyword">Materias primas:</span> Ingredientes naturales de alta calidad
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${house.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeHouseModal').addEventListener('click', () => {
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
    console.log('Aplicación Perfumes inicializada correctamente');
});