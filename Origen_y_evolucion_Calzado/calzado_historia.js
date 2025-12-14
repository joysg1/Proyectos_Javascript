document.addEventListener('DOMContentLoaded', function() {
    console.log('Historia del Calzado: Inicializando aplicación...');
    
    // Datos de marcas icónicas
    const brandsData = [
        {
            icon: 'fa-leaf',
            title: 'Converse',
            description: 'Fundada en 1908 como la "Converse Rubber Shoe Company". Las Chuck Taylor All-Stars (1917) son el ícono más reconocible.',
            color: '#c97b3d',
            status: 'Icono Cultural',
            contribution: 'Basketball, contracultura, moda casual'
        },
        {
            icon: 'fa-shoe-prints',
            title: 'Nike',
            description: 'Fundada en 1964 como Blue Ribbon Sports. Revolucionó el calzado deportivo con tecnologías como Air, Flyknit y React.',
            color: '#9d5c2a',
            status: 'Líder Global',
            contribution: 'Innovación tecnológica, marketing, cultura sneaker'
        },
        {
            icon: 'fa-industry',
            title: 'Dr. Martens',
            description: 'Nacida en 1945 de la colaboración entre el Dr. Klaus Märtens y Herbert Funck. Símbolo de contracultura y resistencia.',
            color: '#8a6b3d',
            status: 'Icono de Resistencia',
            contribution: 'Durabilidad, contracultura, estilo trabajador'
        },
        {
            icon: 'fa-tree',
            title: 'Timberland',
            description: 'Fundada en 1973, famosa por sus botas amarillas impermeables. De calzado de trabajo a ícono de la cultura hip-hop.',
            color: '#3d7c5f',
            status: 'De Trabajo a Moda',
            contribution: 'Durabilidad, funcionalidad, cultura urbana'
        },
        {
            icon: 'fa-recycle',
            title: 'Allbirds',
            description: 'Fundada en 2016 en Nueva Zelanda. Revolucionó el mercado con zapatillas sostenibles de lana merino y materiales ecológicos.',
            color: '#6ba88c',
            status: 'Sostenibilidad',
            contribution: 'Materiales naturales, huella de carbono cero'
        },
        {
            icon: 'fa-crown',
            title: 'Salvatore Ferragamo',
            description: 'Fundada en 1927 en Italia. Sinónimo de lujo, artesanía y diseño innovador. Creó el tacón de aguja y sandalias para celebridades.',
            color: '#b89b6d',
            status: 'Alta Artesanía',
            contribution: 'Diseño de lujo, innovación en tacones'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initBrands();
    initEventListeners();
    initAnimations();
    initTimeline();
    initTechSimulation();

    // Función para inicializar partículas decorativas
    function initTechParticles() {
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
                    // Partículas de cuero (marrón)
                    color = `rgba(201, 123, 61, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Partículas de tela (beige)
                    color = `rgba(212, 194, 176, ${Math.random() * 0.2 + 0.1})`;
                    size = Math.random() * 1.5 + 0.5;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Partículas de suela (verde)
                    color = `rgba(107, 168, 140, ${Math.random() * 0.2 + 0.1})`;
                    size = Math.random() * 2 + 1;
                    speed = (Math.random() - 0.5) * 0.4;
                }
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: speed,
                    speedY: speed * 0.3,
                    color: color,
                    pulseSpeed: Math.random() * 0.04 + 0.01,
                    pulseOffset: Math.random() * Math.PI * 2,
                    type: type < 0.6 ? 'leather' : type < 0.85 ? 'fabric' : 'sole'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo sutil con textura de cuero
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(42, 26, 16, 0.1)');
            gradient.addColorStop(1, 'rgba(26, 15, 10, 0.3)');
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
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula
                ctx.beginPath();
                
                // Forma diferente según tipo
                if (particle.type === 'fabric') {
                    // Telas como líneas
                    ctx.moveTo(particle.x - particle.size, particle.y);
                    ctx.lineTo(particle.x + particle.size, particle.y);
                    ctx.lineWidth = particle.size / 2;
                } else {
                    // Cuero y suela como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Color y relleno
                if (particle.type === 'fabric') {
                    ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                    ctx.stroke();
                } else {
                    ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
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
        console.log('Partículas decorativas inicializadas');
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

    // Función para inicializar simulación de tecnologías
    function initTechSimulation() {
        console.log('Inicializando simulación de tecnologías...');
        
        // Elementos del DOM
        const decadeSlider = document.getElementById('decadeSlider');
        const decadeValue = document.getElementById('decadeValue');
        const cushioningSlider = document.getElementById('cushioningSlider');
        const cushioningValue = document.getElementById('cushioningValue');
        const durabilitySlider = document.getElementById('durabilitySlider');
        const durabilityValue = document.getElementById('durabilityValue');
        const shoeTypeButtons = document.querySelectorAll('.shoe-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('techCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !decadeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        decadeSlider.addEventListener('input', function() {
            const decades = ['1900s', '1920s', '1950s', '1970s', '1990s', '2020s'];
            decadeValue.textContent = decades[this.value - 1];
        });
        
        cushioningSlider.addEventListener('input', function() {
            cushioningValue.textContent = `${this.value}%`;
        });
        
        durabilitySlider.addEventListener('input', function() {
            durabilityValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de calzado
        shoeTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                shoeTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runTechSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            decadeSlider.value = 4;
            decadeValue.textContent = '1970s';
            cushioningSlider.value = 70;
            cushioningValue.textContent = '70%';
            durabilitySlider.value = 60;
            durabilityValue.textContent = '60%';
            shoeTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="running"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">La tecnología de los 70s (naranja) marcó el inicio de la revolución deportiva</div>';
            
            // Ejecutar simulación con valores por defecto
            runTechSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runTechSimulation();
        }, 500);
        
        console.log('Simulación de tecnologías inicializada');
    }

    // Función para ejecutar simulación de tecnologías
    function runTechSimulation() {
        const canvas = document.getElementById('techCurveCanvas');
        const ctx = canvas.getContext('2d');
        const decade = parseInt(document.getElementById('decadeSlider').value);
        const cushioning = parseInt(document.getElementById('cushioningSlider').value) / 100;
        const durability = parseInt(document.getElementById('durabilitySlider').value) / 100;
        const shoeType = document.querySelector('.shoe-type-btn.active').dataset.type;
        
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
        
        // Eje Y (puntuación tecnológica)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Décadas', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Puntuación Tecnológica', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        const decades = ['1900', '1920', '1950', '1970', '1990', '2020'];
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
            ctx.fillText(value.toString(), padding - 20, y + 3);
        }
        
        // Tecnologías por década
        const decadeTechs = {
            1: 10,   // 1900s: Caucho vulcanizado
            2: 25,   // 1920s: Producción en masa
            3: 40,   // 1950s: Materiales sintéticos
            4: 65,   // 1970s: Amortiguación especializada
            5: 85,   // 1990s: Materiales inteligentes
            6: 100   // 2020s: Impresión 3D, sostenibilidad
        };
        
        // Puntuaciones por tipo de calzado
        const shoeTypeScores = {
            'running': 90,
            'basketball': 85,
            'lifestyle': 70,
            'formal': 60
        };
        
        // Calcular curvas
        const points = 6;
        const techCurve = [];
        const shoeCurve = [];
        const combinedCurve = [];
        
        for (let i = 1; i <= points; i++) {
            const decadePoint = i;
            const techScore = decadeTechs[i];
            const shoeScore = shoeTypeScores[shoeType];
            
            // Puntuación combinada (considera amortiguación y durabilidad)
            let combinedScore = (techScore + shoeScore) / 2;
            combinedScore *= (0.5 + cushioning * 0.3 + durability * 0.2);
            
            techCurve.push({decade: decadePoint, score: techScore});
            shoeCurve.push({decade: decadePoint, score: shoeScore});
            combinedCurve.push({decade: decadePoint, score: combinedScore});
        }
        
        // Dibujar curva de tecnología por década
        ctx.strokeStyle = 'rgba(201, 123, 61, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        techCurve.forEach((point, i) => {
            const x = padding + ((point.decade - 1) / (points - 1)) * graphWidth;
            const y = canvas.height - padding - (point.score / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva tipo de calzado
        ctx.strokeStyle = 'rgba(107, 168, 140, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        shoeCurve.forEach((point, i) => {
            const x = padding + ((point.decade - 1) / (points - 1)) * graphWidth;
            const y = canvas.height - padding - (point.score / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar curva combinada
        ctx.strokeStyle = 'rgba(138, 107, 61, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        combinedCurve.forEach((point, i) => {
            const x = padding + ((point.decade - 1) / (points - 1)) * graphWidth;
            const y = canvas.height - padding - (point.score / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área bajo curva combinada
        ctx.fillStyle = 'rgba(201, 123, 61, 0.15)';
        ctx.beginPath();
        
        combinedCurve.forEach((point, i) => {
            const x = padding + ((point.decade - 1) / (points - 1)) * graphWidth;
            const y = canvas.height - padding - (point.score / 100) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, canvas.height - padding);
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.lineTo(padding + ((points - 1) / (points - 1)) * graphWidth, canvas.height - padding);
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Tecnología por década
        ctx.fillStyle = 'rgba(201, 123, 61, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Tecnología década', canvas.width - 155, 32);
        
        // Tipo de calzado
        ctx.fillStyle = 'rgba(107, 168, 140, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Tipo calzado', canvas.width - 155, 57);
        
        // Resultado combinado
        ctx.fillStyle = 'rgba(138, 107, 61, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Resultado combinado', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const techScore = decadeTechs[decade];
        const shoeScore = shoeTypeScores[shoeType];
        const combinedScore = (techScore + shoeScore) / 2 * (0.5 + cushioning * 0.3 + durability * 0.2);
        
        conclusion.innerHTML = `
            <div class="result-text" style="color: var(--accent-secondary);">
                <i class="fas fa-chart-line" style="margin-right: 0.5rem;"></i>
                Puntuación: ${combinedScore.toFixed(1)}/100 | ${combinedScore >= 70 ? 'Alta innovación' : combinedScore >= 50 ? 'Innovación media' : 'Tecnología básica'}
            </div>
        `;
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const decade = parseInt(document.getElementById('decadeSlider').value);
        const cushioning = parseInt(document.getElementById('cushioningSlider').value) / 100;
        const durability = parseInt(document.getElementById('durabilitySlider').value) / 100;
        const shoeType = document.querySelector('.shoe-type-btn.active').dataset.type;
        
        const decades = ['1900s', '1920s', '1950s', '1970s', '1990s', '2020s'];
        const shoeNames = {
            'running': 'Running',
            'basketball': 'Baloncesto',
            'lifestyle': 'Lifestyle',
            'formal': 'Formal'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación Tecnológica
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(60, 40, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Década</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${decades[decade-1]}</div>
                            </div>
                            <div style="background: rgba(60, 40, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Calzado</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${shoeNames[shoeType]}</div>
                            </div>
                            <div style="background: rgba(60, 40, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Amortiguación</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(cushioning*100).toFixed(0)}%</div>
                            </div>
                            <div style="background: rgba(60, 40, 30, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Durabilidad</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(durability*100).toFixed(0)}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Análisis de puntuación tecnológica</span><br>
                            <span class="code-keyword">Puntuación década ${decades[decade-1]}:</span> ${[10, 25, 40, 65, 85, 100][decade-1]} puntos<br>
                            <span class="code-keyword">Puntuación tipo ${shoeNames[shoeType]}:</span> ${shoeType === 'running' ? 90 : shoeType === 'basketball' ? 85 : shoeType === 'lifestyle' ? 70 : 60} puntos<br>
                            <span class="code-keyword">Modificador amortiguación:</span> +${(cushioning*30).toFixed(0)}%<br>
                            <span class="code-keyword">Modificador durabilidad:</span> +${(durability*20).toFixed(0)}%<br>
                            <span class="code-keyword">Puntuación final:</span> ${((([10, 25, 40, 65, 85, 100][decade-1] + (shoeType === 'running' ? 90 : shoeType === 'basketball' ? 85 : shoeType === 'lifestyle' ? 70 : 60)) / 2) * (0.5 + cushioning * 0.3 + durability * 0.2)).toFixed(1)}/100
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
            alert('Análisis de simulación exportado');
            modal.remove();
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        if (simulateEvolutionBtn) {
            simulateEvolutionBtn.addEventListener('click', simulateShoeEvolution);
        }
        
        // Botón de técnicas de fabricación
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.add('active');
            });
        }
        
        // Botón de comparación de marcas
        const compareBrandsBtn = document.getElementById('compareBrandsBtn');
        if (compareBrandsBtn) {
            compareBrandsBtn.addEventListener('click', () => {
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

    // Función para simulación de evolución del calzado
    function simulateShoeEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución del calzado...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "40,000 a.C.: Pieles de animales atadas a los pies...",
            "3,500 a.C.: Sandalias egipcias de papiro y cuero...",
            "Siglo XV: Zapatos diferenciados para pie derecho/izquierdo...",
            "1839: Vulcanización del caucho (Goodyear)...",
            "1908: Converse All-Stars (baloncesto)...",
            "1970s: Nike Air, revolución deportiva...",
            "1990s: Materiales inteligentes, personalización...",
            "2020s: Sostenibilidad, impresión 3D, calzado inteligente..."
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
            showShoeEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 7200);
    }

    // Función para mostrar resultados de evolución del calzado
    function showShoeEvolutionResults() {
        const results = [
            { type: 'Años de historia', value: '40,000+', color: '#c97b3d', icon: 'fa-history' },
            { type: 'Pares anuales', value: '24B', color: '#8a6b3d', icon: 'fa-shoe-prints' },
            { type: 'Mercado global', value: 'USD $365B', color: '#3d7c5f', icon: 'fa-chart-line' },
            { type: 'Crecimiento sostenible', value: '+230%', color: '#6ba88c', icon: 'fa-leaf' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeEvolutionModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Histórica del Calzado
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto del calzado en la sociedad humana desde la prehistoria hasta la actualidad:</p>
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
        
        // Event listeners para el modal de evolución
        document.getElementById('closeEvolutionModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewHistoryBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo detallada de la evolución del calzado');
            modal.remove();
        });
    }

    // Función para mostrar detalle de marca
    function showBrandDetail(brand) {
        const details = {
            'Converse': {
                contribution: 'Icono cultural, democratización del calzado deportivo',
                products: 'Chuck Taylor All-Stars, One Star, Jack Purcell, cons colaboraciones',
                timeline: '1908-presente',
                impact: 'Transición de calzado deportivo a ícono de contracultura y moda'
            },
            'Nike': {
                contribution: 'Innovación tecnológica, marketing deportivo, cultura sneaker',
                products: 'Air Force 1, Air Jordan, Air Max, React, Flyknit, colaboraciones',
                timeline: '1964-presente',
                impact: 'Líder global, definió la industria del calzado deportivo moderno'
            },
            'Dr. Martens': {
                contribution: 'Durabilidad extrema, símbolo de contracultura y resistencia',
                products: '1460 Boots, 1461 Shoes, Jadon, colaboraciones con diseñadores',
                timeline: '1945-presente',
                impact: 'De calzado de trabajo a ícono de movimientos contraculturales'
            },
            'Timberland': {
                contribution: 'Funcionalidad convertida en moda, durabilidad legendaria',
                products: '6-inch Premium Boots, Earthkeepers, colaboraciones urbanas',
                timeline: '1973-presente',
                impact: 'Puente entre calzado de trabajo y cultura urbana de lujo'
            },
            'Allbirds': {
                contribution: 'Sostenibilidad, materiales naturales, transparencia radical',
                products: 'Wool Runner, Tree Runner, Dasher, Piper, Mizzle',
                timeline: '2016-presente',
                impact: 'Revolucionó la industria con enfoque sostenible y carbono cero'
            },
            'Salvatore Ferragamo': {
                contribution: 'Alta artesanía, innovación en diseño de lujo',
                products: 'Vara pump, Gancio, Rainbow sandal, colecciones prêt-à-porter',
                timeline: '1927-presente',
                impact: 'Elevó el calzado a arte, combinando tradición e innovación'
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
                                <div style="background: rgba(60, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Histórica</div>
                                    <div style="font-weight: 600;">${brandDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${brandDetails.products ? `
                                <div style="background: rgba(60, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Icónicos</div>
                                    <div style="font-weight: 600;">${brandDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${brandDetails.timeline ? `
                                <div style="background: rgba(60, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${brandDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${brandDetails.impact ? `
                                <div style="background: rgba(60, 40, 30, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto Cultural</div>
                                    <div style="font-weight: 600;">${brandDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${brand.title} - Datos históricos clave</span><br>
                        <span class="code-keyword">Fundación:</span> ${brand.title === 'Converse' ? '1908' : brand.title === 'Nike' ? '1964' : brand.title === 'Dr. Martens' ? '1945' : brand.title === 'Timberland' ? '1973' : brand.title === 'Allbirds' ? '2016' : '1927'}<br>
                        <span class="code-keyword">Origen:</span> ${brand.title === 'Converse' ? 'EE.UU.' : brand.title === 'Nike' ? 'EE.UU.' : brand.title === 'Dr. Martens' ? 'Alemania/Reino Unido' : brand.title === 'Timberland' ? 'EE.UU.' : brand.title === 'Allbirds' ? 'Nueva Zelanda' : 'Italia'}<br>
                        <span class="code-keyword">Producto más famoso:</span> ${brand.title === 'Converse' ? 'Chuck Taylor All-Stars' : brand.title === 'Nike' ? 'Air Jordan 1' : brand.title === 'Dr. Martens' ? '1460 Boots' : brand.title === 'Timberland' ? '6-inch Premium Boot' : brand.title === 'Allbirds' ? 'Wool Runner' : 'Vara pump'}<br>
                        <span class="code-keyword">Estado actual:</span> ${brand.status}
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
    console.log('Aplicación Historia del Calzado inicializada correctamente');
});