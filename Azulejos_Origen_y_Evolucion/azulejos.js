document.addEventListener('DOMContentLoaded', function() {
    console.log('Azulejos: Inicializando aplicación...');
    
    // Datos de culturas y tradiciones importantes
    const culturesData = [
        {
            icon: 'fa-mosque',
            title: 'Al-Ándalus',
            description: 'Introdujo técnicas persas a la Península Ibérica. Desarrolló el mosaico nazarí en la Alhambra con complejos patrones geométricos.',
            color: '#c19a6b',
            status: 'Histórico',
            contribution: 'Mosaico nazarí, técnicas persas'
        },
        {
            icon: 'fa-church',
            title: 'Portugal',
            description: 'Desarrolló el azulejo como expresión artística nacional. Paneles narrativos en azul cobalto que cubren fachadas e iglesias.',
            color: '#6b8c9e',
            status: 'Activo',
            contribution: 'Azulejo portugués, paneles narrativos'
        },
        {
            icon: 'fa-landmark',
            title: 'Italia (Mayólica)',
            description: 'Perfeccionó la técnica de mayólica durante el Renacimiento. Decoración sobre esmalte crudo con colores brillantes.',
            color: '#c45c3e',
            status: 'Histórico/Activo',
            contribution: 'Técnica mayólica, Renacimiento'
        },
        {
            icon: 'fa-kaaba',
            title: 'Marruecos (Zellige)',
            description: 'Artesanía milenaria de Fez y Marrakech. Teselas geométricas cortadas a mano con colores vibrantes minerales.',
            color: '#8a9a5b',
            status: 'Activo',
            contribution: 'Zellige, geometría sagrada'
        },
        {
            icon: 'fa-globe-americas',
            title: 'México (Talavera)',
            description: 'Tradición con denominación de origen en Puebla. Influencia árabe y española con colores intensos y negro de manganeso.',
            color: '#d4a76a',
            status: 'Activo',
            contribution: 'Talavera poblana, D.O.'
        },
        {
            icon: 'fa-industry',
            title: 'Contemporáneo',
            description: 'Tecnología digital e industrial. Impresión digital, gres porcelánico de gran formato y producción sostenible.',
            color: '#b87333',
            status: 'Activo',
            contribution: 'Impresión digital, gran formato'
        }
    ];

    // Inicializar componentes
    initClayParticles();
    initCultures();
    initEventListeners();
    initAnimations();
    initTimeline();
    initDesignSimulation();

    // Función para inicializar partículas de textura cerámica
    function initClayParticles() {
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
                    // Partículas de arcilla (marrón)
                    color = `rgba(193, 154, 107, ${Math.random() * 0.5 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Partículas de esmalte (azul/verde)
                    color = `rgba(107, 140, 158, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Partículas de pigmento (rojo/naranja)
                    color = `rgba(196, 92, 62, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.8;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.5,
                    color: color,
                    pulseSpeed: Math.random() * 0.04 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.6 ? 'clay' : type < 0.85 ? 'glaze' : 'pigment'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de textura cerámica sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 15, 10, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 5, 3, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Patrón de cuadrícula sutil (referencia a azulejos)
            ctx.strokeStyle = 'rgba(193, 154, 107, 0.05)';
            ctx.lineWidth = 1;
            const gridSize = 80;
            
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
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.4 + 0.6;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula
                ctx.beginPath();
                
                // Forma diferente según tipo
                if (particle.type === 'clay') {
                    // Arcilla como formas irregulares
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                } else if (particle.type === 'glaze') {
                    // Esmalte como cuadrados (azulejos)
                    ctx.rect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
                } else {
                    // Pigmento como triángulos
                    ctx.moveTo(particle.x, particle.y - particle.size);
                    ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
                    ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
                    ctx.closePath();
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'clay') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'glaze') {
                        gradient.addColorStop(0, `rgba(107, 140, 158, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(107, 140, 158, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(196, 92, 62, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(196, 92, 62, 0)');
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
        console.log('Partículas cerámicas inicializadas');
    }

    // Función para inicializar culturas
    function initCultures() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de culturas no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        culturesData.forEach(culture => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${culture.color};">
                        <i class="fas ${culture.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${culture.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${culture.color}20; color: ${culture.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${culture.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Aporte: ${culture.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${culture.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showCultureDetail(culture));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Culturas inicializadas: ' + culturesData.length);
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

    // Función para inicializar simulación de diseño
    function initDesignSimulation() {
        console.log('Inicializando simulación de diseño...');
        
        // Elementos del DOM
        const styleSlider = document.getElementById('styleSlider');
        const styleValue = document.getElementById('styleValue');
        const patternComplexitySlider = document.getElementById('patternComplexitySlider');
        const patternComplexityValue = document.getElementById('patternComplexityValue');
        const textureSlider = document.getElementById('textureSlider');
        const textureValue = document.getElementById('textureValue');
        const colorPaletteButtons = document.querySelectorAll('.color-palette-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('tilePatternCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !styleSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        styleSlider.addEventListener('input', function() {
            const styles = ['Zellige', 'Al-Ándalus', 'Portugués', 'Mayólica', 'Talavera', 'Contemporáneo'];
            styleValue.textContent = styles[this.value - 1];
        });
        
        patternComplexitySlider.addEventListener('input', function() {
            const complexities = ['Muy simple', 'Simple', 'Media', 'Compleja', 'Muy compleja'];
            patternComplexityValue.textContent = complexities[this.value - 1];
        });
        
        textureSlider.addEventListener('input', function() {
            const textures = ['Mate', 'Satinado', 'Brillante', 'Texturizado'];
            textureValue.textContent = textures[this.value - 1];
        });
        
        // Botones de paleta de colores
        colorPaletteButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                colorPaletteButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runDesignSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            styleSlider.value = 3;
            styleValue.textContent = 'Portugués';
            patternComplexitySlider.value = 3;
            patternComplexityValue.textContent = 'Media';
            textureSlider.value = 1;
            textureValue.textContent = 'Mate';
            colorPaletteButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-palette="iberico"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">Patrón portugués (azul cobalto) con complejidad media y acabado mate</div>';
            
            // Ejecutar simulación con valores por defecto
            runDesignSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runDesignSimulation();
        }, 500);
        
        console.log('Simulación de diseño inicializada');
    }

    // Función para ejecutar simulación de diseño
    function runDesignSimulation() {
        const canvas = document.getElementById('tilePatternCanvas');
        const ctx = canvas.getContext('2d');
        const style = parseInt(document.getElementById('styleSlider').value);
        const complexity = parseInt(document.getElementById('patternComplexitySlider').value);
        const texture = parseInt(document.getElementById('textureSlider').value);
        const colorPalette = document.querySelector('.color-palette-btn.active').dataset.palette;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Colores según paleta
        const palettes = {
            iberico: ['#c19a6b', '#8b6b3d', '#6b8c9e', '#f5e9dc', '#2c1b10'],
            mediterraneo: ['#8a9a5b', '#b87333', '#c45c3e', '#e6ccb3', '#1a0f0a'],
            oriental: ['#6b8c9e', '#8a9a5b', '#c19a6b', '#d9c6b0', '#3a2818'],
            moderno: ['#b8c99d', '#d4a76a', '#a38b6d', '#f5e9dc', '#4a3c2a']
        };
        
        const colors = palettes[colorPalette] || palettes.iberico;
        
        // Configuración según estilo
        const styleConfigs = {
            1: { pattern: 'geometric', symmetry: 'radial', elements: 6 }, // Zellige
            2: { pattern: 'geometric', symmetry: 'reflective', elements: 8 }, // Al-Ándalus
            3: { pattern: 'narrative', symmetry: 'grid', elements: 4 }, // Portugués
            4: { pattern: 'floral', symmetry: 'free', elements: 5 }, // Mayólica
            5: { pattern: 'floral', symmetry: 'grid', elements: 6 }, // Talavera
            6: { pattern: 'abstract', symmetry: 'asymmetric', elements: 7 } // Contemporáneo
        };
        
        const config = styleConfigs[style] || styleConfigs[3];
        
        // Dibujar fondo
        const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        bgGradient.addColorStop(0, colors[4]);
        bgGradient.addColorStop(1, colors[3]);
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar patrón según configuración
        const tileSize = 40 + (complexity * 5);
        const cols = Math.floor(canvas.width / tileSize);
        const rows = Math.floor(canvas.height / tileSize);
        
        // Efecto de textura
        if (texture === 4) {
            // Texturizado - añadir ruido
            for (let i = 0; i < canvas.width; i += 2) {
                for (let j = 0; j < canvas.height; j += 2) {
                    const noise = Math.random() * 30;
                    ctx.fillStyle = `rgba(0, 0, 0, ${noise / 500})`;
                    ctx.fillRect(i, j, 1, 1);
                }
            }
        }
        
        // Dibujar azulejos
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = col * tileSize;
                const y = row * tileSize;
                
                // Color base del azulejo
                ctx.fillStyle = colors[0];
                ctx.fillRect(x, y, tileSize, tileSize);
                
                // Borde
                ctx.strokeStyle = colors[1];
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, tileSize, tileSize);
                
                // Decoración según patrón
                drawTilePattern(ctx, x, y, tileSize, config, colors, complexity, style);
            }
        }
        
        // Efecto de brillo para texturas brillantes
        if (texture === 3) {
            const glossGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            glossGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            glossGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
            glossGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
            ctx.fillStyle = glossGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const styleNames = ['Zellige', 'Al-Ándalus', 'Portugués', 'Mayólica', 'Talavera', 'Contemporáneo'];
        const complexityNames = ['Muy simple', 'Simple', 'Media', 'Compleja', 'Muy compleja'];
        const textureNames = ['Mate', 'Satinado', 'Brillante', 'Texturizado'];
        const paletteNames = {
            'iberico': 'Ibérico',
            'mediterraneo': 'Mediterráneo',
            'oriental': 'Oriental',
            'moderno': 'Moderno'
        };
        
        conclusion.innerHTML = `
            <div class="result-text" style="color: ${colors[2]}">
                <i class="fas fa-palette" style="margin-right: 0.5rem;"></i>
                Patrón ${styleNames[style-1]} (${paletteNames[colorPalette]}) con complejidad ${complexityNames[complexity-1].toLowerCase()} y acabado ${textureNames[texture-1].toLowerCase()}
            </div>
        `;
    }

    // Función auxiliar para dibujar patrones en azulejos
    function drawTilePattern(ctx, x, y, size, config, colors, complexity, style) {
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        
        ctx.save();
        
        switch(config.pattern) {
            case 'geometric':
                // Patrón geométrico (Zellige, Al-Ándalus)
                drawGeometricPattern(ctx, centerX, centerY, size, config, colors, complexity);
                break;
            case 'narrative':
                // Patrón narrativo (Portugués)
                drawNarrativePattern(ctx, centerX, centerY, size, config, colors, complexity, style);
                break;
            case 'floral':
                // Patrón floral (Mayólica, Talavera)
                drawFloralPattern(ctx, centerX, centerY, size, config, colors, complexity);
                break;
            case 'abstract':
                // Patrón abstracto (Contemporáneo)
                drawAbstractPattern(ctx, centerX, centerY, size, config, colors, complexity);
                break;
        }
        
        ctx.restore();
    }

    function drawGeometricPattern(ctx, cx, cy, size, config, colors, complexity) {
        const sides = config.elements;
        const radius = size * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(cx + radius, cy);
        
        for (let i = 1; i <= sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fillStyle = colors[2];
        ctx.fill();
        
        // Detalles adicionales según complejidad
        if (complexity >= 3) {
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = colors[1];
            ctx.fill();
        }
        
        if (complexity >= 4) {
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = colors[3];
            ctx.fill();
        }
    }

    function drawNarrativePattern(ctx, cx, cy, size, config, colors, complexity, style) {
        // Azulejo portugués típico (azul sobre blanco)
        if (style === 3) {
            ctx.fillStyle = colors[3]; // Fondo blanco/beige
            ctx.fillRect(cx - size/2, cy - size/2, size, size);
            
            ctx.strokeStyle = colors[2]; // Azul
            ctx.lineWidth = 2;
            
            // Dibujar marco
            ctx.strokeRect(cx - size/2 + 5, cy - size/2 + 5, size - 10, size - 10);
            
            // Dibujar elemento central (barco, figura, etc.)
            ctx.beginPath();
            ctx.moveTo(cx - 10, cy + 5);
            ctx.lineTo(cx, cy - 10);
            ctx.lineTo(cx + 10, cy + 5);
            ctx.closePath();
            ctx.stroke();
            
            // Elementos adicionales según complejidad
            if (complexity >= 3) {
                ctx.beginPath();
                ctx.arc(cx, cy - 5, 3, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }

    function drawFloralPattern(ctx, cx, cy, size, config, colors, complexity) {
        // Flor central
        const petals = 6;
        const petalRadius = size * 0.2;
        
        for (let i = 0; i < petals; i++) {
            const angle = (i * 2 * Math.PI) / petals;
            const petalX = cx + petalRadius * Math.cos(angle);
            const petalY = cy + petalRadius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.ellipse(petalX, petalY, petalRadius * 0.6, petalRadius * 0.3, angle, 0, Math.PI * 2);
            ctx.fillStyle = colors[2];
            ctx.fill();
        }
        
        // Centro de la flor
        ctx.beginPath();
        ctx.arc(cx, cy, petalRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = colors[1];
        ctx.fill();
        
        // Hojas según complejidad
        if (complexity >= 3) {
            ctx.beginPath();
            ctx.ellipse(cx - petalRadius * 1.5, cy, petalRadius * 0.8, petalRadius * 0.4, -Math.PI/4, 0, Math.PI * 2);
            ctx.fillStyle = colors[2];
            ctx.fill();
            
            ctx.beginPath();
            ctx.ellipse(cx + petalRadius * 1.5, cy, petalRadius * 0.8, petalRadius * 0.4, Math.PI/4, 0, Math.PI * 2);
            ctx.fillStyle = colors[2];
            ctx.fill();
        }
    }

    function drawAbstractPattern(ctx, cx, cy, size, config, colors, complexity) {
        // Formas abstractas
        const shapes = complexity + 2;
        
        for (let i = 0; i < shapes; i++) {
            const shapeX = cx + (Math.random() - 0.5) * size * 0.8;
            const shapeY = cy + (Math.random() - 0.5) * size * 0.8;
            const shapeSize = size * 0.1 * (Math.random() * 0.8 + 0.4);
            
            ctx.beginPath();
            
            // Forma aleatoria
            if (Math.random() > 0.5) {
                ctx.arc(shapeX, shapeY, shapeSize, 0, Math.PI * 2);
            } else {
                ctx.rect(shapeX - shapeSize/2, shapeY - shapeSize/2, shapeSize, shapeSize);
            }
            
            // Color aleatorio de la paleta
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fill();
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const style = parseInt(document.getElementById('styleSlider').value);
        const complexity = parseInt(document.getElementById('patternComplexitySlider').value);
        const texture = parseInt(document.getElementById('textureSlider').value);
        const colorPalette = document.querySelector('.color-palette-btn.active').dataset.palette;
        
        const styleNames = ['Zellige Marroquí', 'Al-Ándalus/Nazarí', 'Portugués', 'Mayólica Italiana', 'Talavera Poblana', 'Contemporáneo'];
        const complexityNames = ['Muy simple', 'Simple', 'Media', 'Compleja', 'Muy compleja'];
        const textureNames = ['Mate', 'Satinado', 'Brillante', 'Texturizado'];
        const paletteNames = {
            'iberico': 'Ibérico (Tierras, azules)',
            'mediterraneo': 'Mediterráneo (Verdes, naranjas)',
            'oriental': 'Oriental (Azules, verdes, dorados)',
            'moderno': 'Moderno (Pasteles, neutros)'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-palette"></i> Datos del Diseño de Azulejos
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(60, 45, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Estilo Tradicional</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${styleNames[style-1]}</div>
                            </div>
                            <div style="background: rgba(60, 45, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Paleta de Colores</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${paletteNames[colorPalette]}</div>
                            </div>
                            <div style="background: rgba(60, 45, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Complejidad del Patrón</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${complexityNames[complexity-1]}</div>
                            </div>
                            <div style="background: rgba(60, 45, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Acabado Superficial</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${textureNames[texture-1]}</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Características técnicas del diseño</span><br>
                            <span class="code-keyword">Tamaño azulejo simulado:</span> ${40 + (complexity * 5)}x${40 + (complexity * 5)} cm<br>
                            <span class="code-keyword">Técnica de decoración:</span> ${style <= 2 ? 'Geométrica (Zellige/Al-Ándalus)' : style <= 4 ? 'Pintura sobre esmalte' : 'Impresión digital'}<br>
                            <span class="code-keyword">Número de colores:</span> ${complexity + 2}<br>
                            <span class="code-keyword">Tiempo estimado fabricación:</span> ${style <= 2 ? '15-20 días (artesanal)' : '2-3 días (industrial)'}
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button class="btn" id="exportDataBtn" style="min-width: 200px;">
                            <i class="fas fa-download"></i> Exportar Diseño
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
            alert('Diseño de azulejos exportado como imagen');
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        if (simulateEvolutionBtn) {
            simulateEvolutionBtn.addEventListener('click', simulateArtEvolution);
        }
        
        // Botón de proceso de fabricación
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

    // Función para simulación de evolución artística
    function simulateArtEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución artística...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "2500 a.C.: Primeros azulejos vidriados en Mesopotamia...",
            "1500 a.C.: Desarrollo en Antiguo Egipto con cobres y álcalis...",
            "700 a.C.: Perfeccionamiento en Persia (Imperio Aqueménida)...",
            "711 d.C.: Introducción a Al-Ándalus por los musulmanes...",
            "1200: Desarrollo del mosaico nazarí en la Alhambra...",
            "1500: Mayólica italiana durante el Renacimiento...",
            "1600: Azulejo portugués y Delftware holandesa...",
            "1700: Apogeo del azulejo barroco en Portugal...",
            "1900: Modernismo (Gaudí, Mackintosh)...",
            "2000: Tecnología digital y sostenibilidad..."
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${steps[step]}`;
                step++;
            }
        }, 900);
        
        // Simular proceso completo
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showArtEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 9000);
    }

    // Función para mostrar resultados de evolución artística
    function showArtEvolutionResults() {
        const results = [
            { type: 'Años de historia', value: '4,500+', color: '#c19a6b', icon: 'fa-history' },
            { type: 'Técnicas diferentes', value: '100+', color: '#8a9a5b', icon: 'fa-paint-brush' },
            { type: 'Culturas involucradas', value: '50+', color: '#6b8c9e', icon: 'fa-globe' },
            { type: 'Producción anual', value: '13B m²', color: '#b87333', icon: 'fa-industry' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeArtModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Histórica de los Azulejos
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto cultural y técnico de los azulejos desde la antigüedad hasta la actualidad:</p>
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
        
        // Event listeners para el modal artístico
        document.getElementById('closeArtModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewTimelineBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo detallada de la evolución de los azulejos');
            modal.remove();
        });
    }

    // Función para mostrar detalle de cultura
    function showCultureDetail(culture) {
        const details = {
            'Al-Ándalus': {
                contribution: 'Introducción de técnicas persas, desarrollo del mosaico nazarí',
                products: 'Mosaicos de la Alhambra, Mezquita de Córdoba, arte mudéjar',
                timeline: '711-1492 d.C.',
                impact: 'Puente cultural entre Oriente y Occidente'
            },
            'Portugal': {
                contribution: 'Desarrollo del azulejo como expresión artística nacional',
                products: 'Paneles de iglesias, estaciones de tren, fachadas civiles',
                timeline: 'Siglo XVI-presente',
                impact: 'Identidad cultural portuguesa reconocida mundialmente'
            },
            'Italia (Mayólica)': {
                contribution: 'Perfeccionamiento de la técnica de mayólica durante el Renacimiento',
                products: 'Vasijas, platos decorativos, azulejos para palacios',
                timeline: 'Siglo XV-XVIII',
                impact: 'Influencia en toda Europa, especialmente en Holanda (Delftware)'
            },
            'Marruecos (Zellige)': {
                contribution: 'Artesanía geométrica basada en principios matemáticos islámicos',
                products: 'Mosaicos de mezquitas, palacios, fuentes y zocos',
                timeline: 'Siglo X-presente',
                impact: 'Patrimonio cultural inmaterial de la humanidad (UNESCO)'
            },
            'México (Talavera)': {
                contribution: 'Fusión de técnicas árabes, españolas e indígenas',
                products: 'Vajillas, azulejos, objetos decorativos con denominación de origen',
                timeline: 'Siglo XVI-presente',
                impact: 'Identidad cultural mexicana reconocida internacionalmente'
            },
            'Contemporáneo': {
                contribution: 'Tecnología digital, sostenibilidad y nuevos materiales',
                products: 'Azulejos de gran formato, impresión digital, materiales reciclados',
                timeline: 'Siglo XXI-presente',
                impact: 'Democratización del diseño y producción sostenible'
            }
        };
        
        const cultureDetails = details[culture.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeCultureModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${culture.color}; margin-right: 1rem;">
                        <i class="fas ${culture.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${culture.color};">${culture.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${culture.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${culture.color};">
                            <i class="fas fa-info-circle"></i> Detalles Históricos y Técnicos:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${cultureDetails.contribution ? `
                                <div style="background: rgba(60, 45, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${cultureDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${cultureDetails.products ? `
                                <div style="background: rgba(60, 45, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Característicos</div>
                                    <div style="font-weight: 600;">${cultureDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${cultureDetails.timeline ? `
                                <div style="background: rgba(60, 45, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período de Relevancia</div>
                                    <div style="font-weight: 600;">${cultureDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${cultureDetails.impact ? `
                                <div style="background: rgba(60, 45, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto Cultural</div>
                                    <div style="font-weight: 600;">${cultureDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${culture.title} - Técnicas y características</span><br>
                        <span class="code-keyword">Técnicas principales:</span> ${culture.title === 'Al-Ándalus' ? 'Mosaico nazarí, cuerda seca' : culture.title === 'Portugal' ? 'Pintura sobre esmalte, azul cobalto' : culture.title === 'Italia (Mayólica)' ? 'Mayólica, decoración sobre esmalte crudo' : culture.title === 'Marruecos (Zellige)' ? 'Teselas geométricas cortadas a mano' : culture.title === 'México (Talavera)' ? 'Barro vidriado con estaño, colores intensos' : 'Impresión digital, gres porcelánico'}<br>
                        <span class="code-keyword">Materiales característicos:</span> Arcilla, caolín, pigmentos minerales<br>
                        <span class="code-keyword">Estado actual:</span> ${culture.status}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${culture.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeCultureModal').addEventListener('click', () => {
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
    console.log('Aplicación Azulejos: Origen y Evolución inicializada correctamente');
});