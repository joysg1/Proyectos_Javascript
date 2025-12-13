document.addEventListener('DOMContentLoaded', function() {
    console.log('Telas: Origen y Evolución - Inicializando aplicación...');
    
    // Datos de innovadores textiles importantes
    const innovatorsData = [
        {
            icon: 'fa-industry',
            title: 'John Kay',
            description: 'Inventor inglés de la lanzadera volante (1733), que revolucionó la velocidad del tejido y preparó el camino para la Revolución Industrial.',
            color: '#c19a6b',
            status: 'Histórico',
            contribution: 'Lanzadera volante'
        },
        {
            icon: 'fa-cogs',
            title: 'Richard Arkwright',
            description: 'Desarrolló el marco de agua (water frame) en 1769, primera máquina de hilar accionada por agua que permitió producción masiva.',
            color: '#8b7355',
            status: 'Histórico',
            contribution: 'Marco de agua, fábricas'
        },
        {
            icon: 'fa-recycle',
            title: 'Joseph-Marie Jacquard',
            description: 'Inventor francés del telar de Jacquard (1804), que utilizaba tarjetas perforadas para tejer patrones complejos automáticamente.',
            color: '#7d8ca3',
            status: 'Histórico',
            contribution: 'Telar Jacquard'
        },
        {
            icon: 'fa-flask',
            title: 'Wallace Carothers',
            description: 'Químico estadounidense que inventó el nailon en 1935 mientras trabajaba para DuPont, la primera fibra sintética exitosa comercialmente.',
            color: '#8a9a5b',
            status: 'Histórico',
            contribution: 'Inventor del nailon'
        },
        {
            icon: 'fa-leaf',
            title: 'Patagonia',
            description: 'Empresa pionera en telas sostenibles, desarrollando materiales reciclados y promoviendo prácticas éticas en la industria textil.',
            color: '#5a6d8a',
            status: 'Activo',
            contribution: 'Telas recicladas'
        },
        {
            icon: 'fa-microscope',
            title: 'Modern Meadows',
            description: 'Compañía biotecnológica que desarrolla cuero cultivado en laboratorio y materiales textiles sostenibles mediante biofabricación.',
            color: '#b8c99a',
            status: 'Activo',
            contribution: 'Biofabricación'
        }
    ];

    // Inicializar componentes
    initTextileParticles();
    initInnovators();
    initEventListeners();
    initAnimations();
    initTimeline();
    initFabricSimulation();

    // Función para inicializar partículas textiles
    function initTextileParticles() {
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
                
                if (type < 0.5) {
                    // Partículas de fibra natural (beige)
                    color = `rgba(193, 154, 107, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.8) {
                    // Partículas de fibra sintética (azul grisáceo)
                    color = `rgba(125, 140, 163, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Partículas de hilos (verde oliva)
                    color = `rgba(138, 154, 91, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.7;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.3,
                    color: color,
                    pulseSpeed: Math.random() * 0.05 + 0.02,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.5 ? 'natural' : type < 0.8 ? 'synthetic' : 'thread'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo textil sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 24, 21, 0.1)');
            gradient.addColorStop(1, 'rgba(13, 12, 10, 0.3)');
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
                if (particle.type === 'thread') {
                    // Hilos como líneas
                    ctx.moveTo(particle.x - particle.size, particle.y);
                    ctx.lineTo(particle.x + particle.size, particle.y);
                    ctx.lineWidth = particle.size / 2;
                } else {
                    // Fibras como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type === 'synthetic') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    gradient.addColorStop(0, `rgba(125, 140, 163, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(125, 140, 163, 0)');
                    
                    ctx.fillStyle = gradient;
                } else if (particle.type === 'thread') {
                    ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    ctx.stroke();
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                }
                
                if (particle.type !== 'thread') {
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
        console.log('Partículas textiles inicializadas');
    }

    // Función para inicializar innovadores
    function initInnovators() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de innovadores no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        innovatorsData.forEach(innovator => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${innovator.color};">
                        <i class="fas ${innovator.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${innovator.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${innovator.color}20; color: ${innovator.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${innovator.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${innovator.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${innovator.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showInnovatorDetail(innovator));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Innovadores inicializados: ' + innovatorsData.length);
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

    // Función para inicializar simulación de telas
    function initFabricSimulation() {
        console.log('Inicializando simulación de telas...');
        
        // Elementos del DOM
        const fabricTypeSlider = document.getElementById('fabricTypeSlider');
        const fabricTypeValue = document.getElementById('fabricTypeValue');
        const durabilitySlider = document.getElementById('durabilitySlider');
        const durabilityValue = document.getElementById('durabilityValue');
        const comfortSlider = document.getElementById('comfortSlider');
        const comfortValue = document.getElementById('comfortValue');
        const structureTypeButtons = document.querySelectorAll('.structure-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('fabricRadarCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !fabricTypeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        fabricTypeSlider.addEventListener('input', function() {
            const types = ['Natural Primitiva', 'Natural Cultivada', 'Sintética Moderna', 'Mezcla', 'Tecnológica Avanzada'];
            fabricTypeValue.textContent = types[this.value - 1];
        });
        
        durabilitySlider.addEventListener('input', function() {
            durabilityValue.textContent = `${this.value}%`;
        });
        
        comfortSlider.addEventListener('input', function() {
            comfortValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de estructura
        structureTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                structureTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runFabricSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            fabricTypeSlider.value = 3;
            fabricTypeValue.textContent = 'Sintética Moderna';
            durabilitySlider.value = 70;
            durabilityValue.textContent = '70%';
            comfortSlider.value = 65;
            comfortValue.textContent = '65%';
            structureTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="woven"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Las telas modernas equilibran durabilidad y confort, pero las naturales ofrecen mejor transpirabilidad</div>';
            
            // Ejecutar simulación con valores por defecto
            runFabricSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runFabricSimulation();
        }, 500);
        
        console.log('Simulación de telas inicializada');
    }

    // Función para ejecutar simulación de telas
    function runFabricSimulation() {
        const canvas = document.getElementById('fabricRadarCanvas');
        const ctx = canvas.getContext('2d');
        const fabricType = parseInt(document.getElementById('fabricTypeSlider').value);
        const durability = parseInt(document.getElementById('durabilitySlider').value);
        const comfort = parseInt(document.getElementById('comfortSlider').value);
        const structureType = document.querySelector('.structure-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.7;
        const axes = 5;
        const angleStep = (Math.PI * 2) / axes;
        
        // Propiedades a evaluar
        const properties = ['Durabilidad', 'Confort', 'Transpirabilidad', 'Sostenibilidad', 'Costo'];
        
        // Valores según tipo de tela
        const fabricValues = {
            1: [30, 40, 80, 90, 20], // Natural Primitiva
            2: [60, 70, 85, 70, 50], // Natural Cultivada
            3: [85, 65, 40, 30, 60], // Sintética Moderna
            4: [75, 75, 60, 50, 70], // Mezcla
            5: [90, 80, 70, 40, 90]  // Tecnológica Avanzada
        };
        
        // Ajustar según estructura
        const structureMultiplier = {
            'woven': [1.0, 0.9, 0.8, 1.0, 1.0],
            'knit': [0.8, 1.2, 1.1, 1.0, 1.1],
            'nonwoven': [0.7, 0.6, 0.5, 0.8, 0.6],
            'smart': [1.1, 1.1, 0.9, 0.7, 1.3]
        };
        
        // Obtener valores base
        const baseValues = fabricValues[fabricType];
        
        // Aplicar multiplicador de estructura
        const adjustedValues = baseValues.map((value, index) => {
            return Math.min(100, Math.max(10, value * structureMultiplier[structureType][index]));
        });
        
        // Sobreescribir durabilidad y confort con valores del slider
        adjustedValues[0] = durability;
        adjustedValues[1] = comfort;
        
        // Dibujar radar
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgba(193, 154, 107, 0.05)';
        
        // Dibujar círculos concéntricos
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            const currentRadius = radius * (i / 5);
            
            for (let j = 0; j < axes; j++) {
                const angle = j * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * currentRadius;
                const y = centerY + Math.sin(angle) * currentRadius;
                
                if (j === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.closePath();
            ctx.stroke();
        }
        
        // Dibujar ejes
        for (let i = 0; i < axes; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Etiquetas de propiedades
            const labelAngle = angle;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = 'bold 12px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(properties[i], labelX, labelY);
        }
        
        // Dibujar polígono de valores
        ctx.fillStyle = 'rgba(193, 154, 107, 0.3)';
        ctx.strokeStyle = 'rgba(193, 154, 107, 0.9)';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        
        for (let i = 0; i < axes; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = adjustedValues[i] / 100;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Dibujar puntos en vértices
        for (let i = 0; i < axes; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = adjustedValues[i] / 100;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(193, 154, 107, 1)';
            ctx.fill();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const avgScore = adjustedValues.reduce((a, b) => a + b, 0) / adjustedValues.length;
        
        if (avgScore > 75) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-tertiary-light);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Excelente equilibrio de propiedades (Puntuación: ${avgScore.toFixed(1)}%)
                </div>
            `;
        } else if (avgScore > 50) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent);">
                    <i class="fas fa-balance-scale" style="margin-right: 0.5rem;"></i>
                    Buen equilibrio con áreas para mejorar (Puntuación: ${avgScore.toFixed(1)}%)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Propiedades limitadas, considere otro material (Puntuación: ${avgScore.toFixed(1)}%)
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const fabricType = parseInt(document.getElementById('fabricTypeSlider').value);
        const durability = parseInt(document.getElementById('durabilitySlider').value);
        const comfort = parseInt(document.getElementById('comfortSlider').value);
        const structureType = document.querySelector('.structure-type-btn.active').dataset.type;
        
        const types = ['Natural Primitiva', 'Natural Cultivada', 'Sintética Moderna', 'Mezcla', 'Tecnológica Avanzada'];
        const structureNames = {
            'woven': 'Tejido Plano',
            'knit': 'Tejido Punto',
            'nonwoven': 'No Tejido',
            'smart': 'Inteligente'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Telas
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(40, 35, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Fibra</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${types[fabricType-1]}</div>
                            </div>
                            <div style="background: rgba(40, 35, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Estructura</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${structureNames[structureType]}</div>
                            </div>
                            <div style="background: rgba(40, 35, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Durabilidad</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${durability}%</div>
                            </div>
                            <div style="background: rgba(40, 35, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Confort</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${comfort}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Características esperadas según selección</span><br>
                            <span class="code-keyword">Aplicaciones recomendadas:</span> ${getRecommendedUses(fabricType, structureType)}<br>
                            <span class="code-keyword">Cuidado requerido:</span> ${getCareRequirements(fabricType)}<br>
                            <span class="code-keyword">Impacto ambiental:</span> ${getEnvironmentalImpact(fabricType)}<br>
                            <span class="code-keyword">Costo estimado:</span> ${getCostEstimate(fabricType, structureType)}
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
        
        // Funciones auxiliares
        function getRecommendedUses(fabricType, structureType) {
            const uses = {
                1: 'Vestimenta histórica, disfraces, decoración',
                2: 'Ropa casual, ropa de cama, toallas',
                3: 'Ropa deportiva, uniformes, exteriores',
                4: 'Ropa diaria, mezclilla, chaquetas',
                5: 'Ropa técnica, uniformes especializados, alta costura'
            };
            
            return uses[fabricType];
        }
        
        function getCareRequirements(fabricType) {
            const care = {
                1: 'Lavado especial, evitar máquina',
                2: 'Lavado delicado, secado natural',
                3: 'Lavado fácil, secado rápido',
                4: 'Lavado estándar, planchado moderado',
                5: 'Seguir instrucciones específicas del fabricante'
            };
            
            return care[fabricType];
        }
        
        function getEnvironmentalImpact(fabricType) {
            const impact = {
                1: 'Bajo (biodegradable, procesos manuales)',
                2: 'Moderado-alto (consumo de agua, pesticidas)',
                3: 'Alto (derivados del petróleo, no biodegradable)',
                4: 'Variable según composición',
                5: 'Variable (depende de tecnología específica)'
            };
            
            return impact[fabricType];
        }
        
        function getCostEstimate(fabricType, structureType) {
            const baseCost = [20, 35, 25, 30, 80][fabricType-1];
            const structureMultiplier = {
                'woven': 1.0,
                'knit': 1.2,
                'nonwoven': 0.7,
                'smart': 2.0
            };
            
            return `$${(baseCost * structureMultiplier[structureType]).toFixed(2)} por metro`;
        }
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        if (simulateEvolutionBtn) {
            simulateEvolutionBtn.addEventListener('click', simulateTextileEvolution);
        }
        
        // Botón de especificaciones
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.add('active');
            });
        }
        
        // Botón de comparación (cambiar ID a compareMaterialsBtn)
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

    // Función para simulación de evolución textil
    function simulateTextileEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución textil...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "30,000 a.C.: Pieles animales y fibras vegetales trenzadas...",
            "10,000 a.C.: Lino cultivado, primeros telares verticales...",
            "5,000 a.C.: Algodón en el valle del Indo, tejidos como estatus...",
            "3,000 a.C.: Descubrimiento de la seda en China, Ruta de la Seda...",
            "Edad Media: Lana en Europa, telares mejorados, comercio textil...",
            "1733: Lanzadera volante de John Kay, Revolución Industrial...",
            "1764: Máquina de hilar, 1785: Telar mecánico...",
            "1935: Invento del nailon, primera fibra sintética exitosa...",
            "1959: Spandex, 1960s: Poliéster domina el mercado...",
            "Siglo XXI: Telas inteligentes, sostenibles, biofabricación..."
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
            showTextileEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 8500);
    }

    // Función para mostrar resultados de evolución textil
    function showTextileEvolutionResults() {
        const results = [
            { type: 'Años de historia', value: '30,000+', color: '#c19a6b', icon: 'fa-history' },
            { type: 'Producción anual', value: '100M ton', color: '#8b7355', icon: 'fa-weight-hanging' },
            { type: 'Tipos de telas', value: '5,000+', color: '#7d8ca3', icon: 'fa-tshirt' },
            { type: 'Empleo global', value: '300M+', color: '#8a9a5b', icon: 'fa-users' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Textil de la Humanidad
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de las telas en el desarrollo humano desde el Paleolítico hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución textil');
            modal.remove();
        });
    }

    // Función para mostrar detalle de innovador
    function showInnovatorDetail(innovator) {
        const details = {
            'John Kay': {
                contribution: 'Lanzadera volante (1733), primera mejora significativa en eficiencia de tejido',
                impact: 'Aumentó la velocidad de tejido 4x, preparó el camino para la Revolución Industrial',
                period: '1704-1780',
                legacy: 'Su invento permitió producción masiva de telas, aunque fue resistido por tejedores tradicionales'
            },
            'Richard Arkwright': {
                contribution: 'Marco de agua (1769), primera máquina de hilar accionada por agua',
                impact: 'Creó el sistema de fábrica moderna, producción masiva de hilo de algodón',
                period: '1732-1792',
                legacy: 'Considerado padre del sistema fabril, su modelo se extendió por todo el mundo industrializado'
            },
            'Joseph-Marie Jacquard': {
                contribution: 'Telar de Jacquard (1804), utilizaba tarjetas perforadas para patrones complejos',
                impact: 'Automatizó el tejido de diseños complejos, precursor de la programación informática',
                period: '1752-1834',
                legacy: 'Su sistema de tarjetas perforadas inspiró a Charles Babbage y los primeros computadores'
            },
            'Wallace Carothers': {
                contribution: 'Inventó el nailon (1935) mientras trabajaba para DuPont',
                impact: 'Creó la primera fibra sintética exitosa comercialmente, revolucionó la industria textil',
                period: '1896-1937',
                legacy: 'El nailon reemplazó a la seda en paracaídas y medias, inició la era de las fibras sintéticas'
            },
            'Patagonia': {
                contribution: 'Pionera en telas sostenibles y prácticas éticas en la industria textil',
                impact: 'Popularizó el poliéster reciclado, estableció estándares de sostenibilidad',
                period: '1973-presente',
                legacy: 'Modelo de negocio sostenible que influye en toda la industria de la moda'
            },
            'Modern Meadows': {
                contribution: 'Desarrollo de cuero cultivado en laboratorio y biofabricación textil',
                impact: 'Reduce dependencia de piel animal, disminuye impacto ambiental de la producción',
                period: '2011-presente',
                legacy: 'Pionera en materiales biofabricados, futuro de la producción textil sostenible'
            }
        };
        
        const innovatorDetails = details[innovator.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeInnovatorModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${innovator.color}; margin-right: 1rem;">
                        <i class="fas ${innovator.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${innovator.color};">${innovator.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${innovator.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${innovator.color};">
                            <i class="fas fa-info-circle"></i> Detalles del Innovador:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${innovatorDetails.contribution ? `
                                <div style="background: rgba(40, 35, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${innovatorDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${innovatorDetails.impact ? `
                                <div style="background: rgba(40, 35, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto Histórico</div>
                                    <div style="font-weight: 600;">${innovatorDetails.impact}</div>
                                </div>
                            ` : ''}
                            
                            ${innovatorDetails.period ? `
                                <div style="background: rgba(40, 35, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período de Actividad</div>
                                    <div style="font-weight: 600;">${innovatorDetails.period}</div>
                                </div>
                            ` : ''}
                            
                            ${innovatorDetails.legacy ? `
                                <div style="background: rgba(40, 35, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Legado</div>
                                    <div style="font-weight: 600;">${innovatorDetails.legacy}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${innovator.title} - Contexto histórico y tecnológico</span><br>
                        <span class="code-keyword">Relevancia:</span> ${innovator.status}<br>
                        <span class="code-keyword">Área:</span> ${innovator.contribution}<br>
                        <span class="code-keyword">Influencia:</span> ${getInfluenceLevel(innovator.title)}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${innovator.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeInnovatorModal').addEventListener('click', () => {
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
        
        function getInfluenceLevel(name) {
            const influence = {
                'John Kay': 'Alta (Revolución Industrial)',
                'Richard Arkwright': 'Muy Alta (Sistema fabril)',
                'Joseph-Marie Jacquard': 'Alta (Precursor informática)',
                'Wallace Carothers': 'Muy Alta (Era sintética)',
                'Patagonia': 'Alta (Sostenibilidad)',
                'Modern Meadows': 'Media-Alta (Futuro textil)'
            };
            return influence[name] || 'Significativa';
        }
    }

    // Mensaje de inicialización completa
    console.log('Aplicación Telas: Origen y Evolución inicializada correctamente');
});