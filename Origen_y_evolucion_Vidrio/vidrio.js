document.addEventListener('DOMContentLoaded', function() {
    console.log('Vidrio: Origen y Evolución - Inicializando aplicación...');
    
    // Datos de fabricantes importantes de vidrio
    const manufacturersData = [
        {
            icon: 'fa-industry',
            title: 'Corning',
            description: 'Líder en vidrio especializado. Creador del Gorilla Glass para dispositivos móviles y fibra óptica de alta calidad.',
            color: '#00c6ff',
            status: 'Activo',
            contribution: 'Gorilla Glass, fibra óptica, Pyrex'
        },
        {
            icon: 'fa-building',
            title: 'Saint-Gobain',
            description: 'Multinacional francesa líder en producción de vidrio plano, vidrio para construcción y materiales de alto rendimiento.',
            color: '#0072ff',
            status: 'Activo',
            contribution: 'Vidrio arquitectónico, aislamiento, automoción'
        },
        {
            icon: 'fa-car',
            title: 'AGC',
            description: 'Asahi Glass Company, líder mundial en vidrio plano, automotriz y displays. Innovador en vidrio inteligente.',
            color: '#9d4edd',
            status: 'Activo',
            contribution: 'Vidrio automotriz, arquitectónico, displays'
        },
        {
            icon: 'fa-vial',
            title: 'Schott',
            description: 'Especialista alemán en vidrio técnico y especial. Desarrollador del vidrio de borosilicato (Duran, Simax).',
            color: '#00d9b8',
            status: 'Activo',
            contribution: 'Borosilicato, fibra óptica, vidrio médico'
        },
        {
            icon: 'fa-wine-bottle',
            title: 'Owens-Illinois',
            description: 'Líder mundial en envases de vidrio. Productor de botellas y frascos para alimentación, bebidas y farmacia.',
            color: '#ff6b6b',
            status: 'Activo',
            contribution: 'Envases de vidrio, sostenibilidad'
        },
        {
            icon: 'fa-phone-alt',
            title: 'Guardian Glass',
            description: 'Productor global de vidrio plano para construcción y automoción. Innovaciones en vidrio de baja emisividad.',
            color: '#ffd166',
            status: 'Activo',
            contribution: 'Vidrio Low-E, arquitectónico, automoción'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initGlassSimulation();

    // Función para inicializar partículas de vidrio
    function initTechParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 120;
        
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
                    // Partículas de vidrio (azules transparentes)
                    color = `rgba(0, 198, 255, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.3;
                } else if (type < 0.85) {
                    // Partículas de sílice (blancas brillantes)
                    color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.5;
                } else {
                    // Partículas de fractura (violetas)
                    color = `rgba(157, 78, 221, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 1;
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
                    type: type < 0.6 ? 'glass' : type < 0.85 ? 'silica' : 'fracture'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo con efecto de vidrio
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 25, 0.3)');
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
                if (particle.type === 'fracture') {
                    // Fracturas como líneas angulares
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle.x + particle.size, particle.y - particle.size/2);
                    ctx.lineTo(particle.x + particle.size/2, particle.y + particle.size);
                    ctx.closePath();
                } else {
                    // Vidrio y sílice como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'glass') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'silica') {
                        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(157, 78, 221, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(157, 78, 221, 0)');
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
        console.log('Partículas de vidrio inicializadas');
    }

    // Función para inicializar fabricantes
    function initManufacturers() {
        const container = document.getElementById('experimentsContainer');
        if (!container) {
            console.error('Contenedor de fabricantes no encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        manufacturersData.forEach(manufacturer => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${manufacturer.color};">
                        <i class="fas ${manufacturer.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title" style="font-size: 1.5rem;">${manufacturer.title}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <span style="padding: 0.2rem 0.6rem; background: ${manufacturer.color}20; color: ${manufacturer.color}; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${manufacturer.status}</span>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Contribución: ${manufacturer.contribution}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p>${manufacturer.description}</p>
                    <div style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showManufacturerDetail(manufacturer));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        console.log('Fabricantes inicializados: ' + manufacturersData.length);
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

    // Función para inicializar simulación de propiedades del vidrio
    function initGlassSimulation() {
        console.log('Inicializando simulación de propiedades del vidrio...');
        
        // Elementos del DOM
        const glassTypeSlider = document.getElementById('glassTypeSlider');
        const glassTypeValue = document.getElementById('glassTypeValue');
        const thicknessSlider = document.getElementById('thicknessSlider');
        const thicknessValue = document.getElementById('thicknessValue');
        const silicaSlider = document.getElementById('silicaSlider');
        const silicaValue = document.getElementById('silicaValue');
        const treatmentTypeButtons = document.querySelectorAll('.treatment-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('propertiesCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !glassTypeSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        glassTypeSlider.addEventListener('input', function() {
            const types = ['Ventana Básica', 'Sódico-Cálcico', 'Borosilicato', 'Gorilla Glass'];
            glassTypeValue.textContent = types[this.value - 1];
        });
        
        thicknessSlider.addEventListener('input', function() {
            thicknessValue.textContent = `${this.value} mm`;
        });
        
        silicaSlider.addEventListener('input', function() {
            silicaValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de tratamiento
        treatmentTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                treatmentTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runGlassSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            glassTypeSlider.value = 2;
            glassTypeValue.textContent = 'Sódico-Cálcico';
            thicknessSlider.value = 5;
            thicknessValue.textContent = '5 mm';
            silicaSlider.value = 72;
            silicaValue.textContent = '72%';
            treatmentTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="none"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">El vidrio sódico-cálcico ofrece buen equilibrio entre propiedades y coste</div>';
            
            // Ejecutar simulación con valores por defecto
            runGlassSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runGlassSimulation();
        }, 500);
        
        console.log('Simulación de vidrio inicializada');
    }

    // Función para ejecutar simulación de propiedades del vidrio
    function runGlassSimulation() {
        const canvas = document.getElementById('propertiesCanvas');
        const ctx = canvas.getContext('2d');
        const glassType = parseInt(document.getElementById('glassTypeSlider').value);
        const thickness = parseInt(document.getElementById('thicknessSlider').value);
        const silicaPercent = parseInt(document.getElementById('silicaSlider').value);
        const treatmentType = document.querySelector('.treatment-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (propiedades)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (valor)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Propiedades', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Valor Relativo', 0, 0);
        ctx.restore();
        
        // Propiedades a comparar
        const properties = ['Resistencia', 'Transparencia', 'Costo', 'Peso', 'Dureza', 'Térmica'];
        const propertyCount = properties.length;
        
        // Valores base por tipo de vidrio
        const glassTypeValues = {
            1: [30, 85, 20, 70, 40, 30], // Ventana básica
            2: [50, 90, 40, 60, 60, 50], // Sódico-cálcico
            3: [70, 92, 70, 50, 70, 90], // Borosilicato
            4: [95, 88, 90, 40, 85, 60]  // Gorilla Glass
        };
        
        // Modificadores por tratamiento
        const treatmentModifiers = {
            'none': [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
            'tempered': [5.0, 0.95, 1.5, 1.0, 1.2, 1.1],
            'laminated': [2.5, 0.85, 2.0, 1.2, 1.1, 1.0],
            'ion-exchange': [8.0, 0.90, 3.0, 1.0, 2.0, 1.0]
        };
        
        // Modificador por espesor
        const thicknessModifier = thickness / 5; // Normalizado a 5mm
        
        // Modificador por contenido de sílice
        const silicaModifier = silicaPercent / 72; // Normalizado a 72%
        
        // Calcular valores finales
        const baseValues = glassTypeValues[glassType];
        const treatmentMod = treatmentModifiers[treatmentType];
        const finalValues = baseValues.map((value, index) => {
            let final = value * treatmentMod[index];
            
            // Ajustes específicos
            if (index === 0) final *= thicknessModifier; // Resistencia aumenta con espesor
            if (index === 1) final *= silicaModifier; // Transparencia mejora con sílice
            if (index === 3) final *= thicknessModifier; // Peso aumenta con espesor
            
            return Math.min(100, final); // Limitar a 100%
        });
        
        // Dibujar gráfico de radar
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(graphWidth, graphHeight) / 2 * 0.7;
        
        // Dibujar polígono de fondo
        ctx.strokeStyle = 'rgba(0, 198, 255, 0.2)';
        ctx.fillStyle = 'rgba(0, 198, 255, 0.05)';
        ctx.lineWidth = 1;
        
        for (let level = 1; level <= 5; level++) {
            const levelRadius = radius * (level / 5);
            ctx.beginPath();
            
            for (let i = 0; i < propertyCount; i++) {
                const angle = (i * 2 * Math.PI / propertyCount) - Math.PI / 2;
                const x = centerX + levelRadius * Math.cos(angle);
                const y = centerY + levelRadius * Math.sin(angle);
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.closePath();
            ctx.stroke();
        }
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 0; i < propertyCount; i++) {
            const angle = (i * 2 * Math.PI / propertyCount) - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Etiquetas de propiedades
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = 'bold 12px Inter';
            ctx.textAlign = 'center';
            
            const labelX = centerX + (radius + 30) * Math.cos(angle);
            const labelY = centerY + (radius + 30) * Math.sin(angle);
            ctx.fillText(properties[i], labelX, labelY);
        }
        
        // Dibujar polígono de valores
        ctx.fillStyle = 'rgba(0, 198, 255, 0.3)';
        ctx.strokeStyle = 'rgba(0, 198, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < propertyCount; i++) {
            const value = finalValues[i];
            const angle = (i * 2 * Math.PI / propertyCount) - Math.PI / 2;
            const valueRadius = radius * (value / 100);
            const x = centerX + valueRadius * Math.cos(angle);
            const y = centerY + valueRadius * Math.sin(angle);
            
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
        for (let i = 0; i < propertyCount; i++) {
            const value = finalValues[i];
            const angle = (i * 2 * Math.PI / propertyCount) - Math.PI / 2;
            const valueRadius = radius * (value / 100);
            const x = centerX + valueRadius * Math.cos(angle);
            const y = centerY + valueRadius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 198, 255, 1)';
            ctx.fill();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const glassTypes = ['Ventana Básica', 'Sódico-Cálcico', 'Borosilicato', 'Gorilla Glass'];
        const treatments = {
            'none': 'sin tratar',
            'tempered': 'templado',
            'laminated': 'laminado',
            'ion-exchange': 'con intercambio iónico'
        };
        
        const avgValue = finalValues.reduce((a, b) => a + b, 0) / finalValues.length;
        
        if (avgValue > 70) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Configuración de alto rendimiento (${avgValue.toFixed(0)}% promedio)
                </div>
            `;
        } else if (avgValue > 40) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--warning);">
                    <i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i>
                    Configuración equilibrada (${avgValue.toFixed(0)}% promedio)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    Configuración económica (${avgValue.toFixed(0)}% promedio)
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const glassType = parseInt(document.getElementById('glassTypeSlider').value);
        const thickness = parseInt(document.getElementById('thicknessSlider').value);
        const silicaPercent = parseInt(document.getElementById('silicaSlider').value);
        const treatmentType = document.querySelector('.treatment-type-btn.active').dataset.type;
        
        const glassTypes = ['Ventana Básica', 'Sódico-Cálcico', 'Borosilicato', 'Gorilla Glass'];
        const treatmentNames = {
            'none': 'Sin Tratar',
            'tempered': 'Templado',
            'laminated': 'Laminado',
            'ion-exchange': 'Intercambio Iónico'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Propiedades
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tipo de Vidrio</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${glassTypes[glassType-1]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tratamiento</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${treatmentNames[treatmentType]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Espesor</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${thickness} mm</div>
                            </div>
                            <div style="background: rgba(30, 30, 70, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Contenido de Sílice</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${silicaPercent}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Propiedades estimadas de la configuración</span><br>
                            <span class="code-keyword">Resistencia a impacto:</span> ${glassType === 1 ? 'Baja' : glassType === 2 ? 'Media' : glassType === 3 ? 'Alta' : 'Muy Alta'}<br>
                            <span class="code-keyword">Transparencia óptica:</span> ${100 - thickness * 2}% (aproximada)<br>
                            <span class="code-keyword">Peso por m²:</span> ${(thickness * 2.5).toFixed(1)} kg<br>
                            <span class="code-keyword">Costo relativo:</span> ${glassType === 1 ? 'Muy Bajo' : glassType === 2 ? 'Bajo' : glassType === 3 ? 'Medio' : 'Alto'}
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

    // Función para simulación de evolución tecnológica
    function simulateTechEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución histórica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "3500 a.C.: Obsidiana natural - Primeras herramientas...",
            "1500 a.C.: Vidrio fabricado en Mesopotamia - Cuentas y adornos...",
            "Siglo I a.C.: Técnica del soplado - Revolución en producción...",
            "Siglo X: Vidrio veneciano - Cristal de Murano y lentes...",
            "Siglo XIII: Vidrio para ventanas - Arquitectura gótica...",
            "Siglo XVII: Telescopios y microscopios - Revolución científica...",
            "Siglo XIX: Producción industrial - Vidrio plano masivo...",
            "Siglo XX: Vidrio de seguridad - Templado y laminado...",
            "Siglo XXI: Vidrio inteligente - Gorilla Glass y fotovoltaico..."
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
        }, 7200);
    }

    // Función para mostrar resultados de evolución tecnológica
    function showTechEvolutionResults() {
        const results = [
            { type: 'Años de historia', value: '5,000+', color: '#00c6ff', icon: 'fa-history' },
            { type: 'Producción anual', value: '130M Ton', color: '#9d4edd', icon: 'fa-industry' },
            { type: 'Reciclabilidad', value: '100%', color: '#00d9b8', icon: 'fa-recycle' },
            { type: 'T° Fusión', value: '1,600°C', color: '#ff6b6b', icon: 'fa-temperature-high' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Histórica del Vidrio
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto del vidrio en la civilización humana desde la antigüedad hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de la evolución del vidrio');
            modal.remove();
        });
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturer) {
        const details = {
            'Corning': {
                contribution: 'Gorilla Glass, fibra óptica, vidrio Pyrex, tecnología de fusión',
                products: 'Gorilla Glass, Willow Glass, Eagle XG, Pyrex, ClearCurve',
                timeline: '1851-presente',
                impact: 'Revolucionó dispositivos móviles con Gorilla Glass y telecomunicaciones con fibra óptica'
            },
            'Saint-Gobain': {
                contribution: 'Vidrio plano, vidrio arquitectónico, aislamiento, materiales de construcción',
                products: 'Planilux, Cool-Lite, SGG Securit, Isover, CertainTeed',
                timeline: '1665-presente',
                impact: 'Líder mundial en soluciones de vidrio para construcción sostenible'
            },
            'AGC': {
                contribution: 'Vidrio automotriz, arquitectónico, displays, tecnología de recubrimientos',
                products: 'Dragontrail, Fluon, EyeGlass, Sunergy, Stopray',
                timeline: '1907-presente',
                impact: 'Innovador en vidrio para automóviles y arquitectura inteligente'
            },
            'Schott': {
                contribution: 'Vidrio de borosilicato, fibra óptica, vidrio médico y farmacéutico',
                products: 'Duran, Simax, BOROFLOAT, MEMpax, AR-GLAS',
                timeline: '1884-presente',
                impact: 'Especialista en vidrio técnico para aplicaciones científicas y médicas'
            },
            'Owens-Illinois': {
                contribution: 'Envases de vidrio para alimentación, bebidas y productos farmacéuticos',
                products: 'Botellas y frascos de vidrio, soluciones de envasado sostenible',
                timeline: '1903-presente',
                impact: 'Líder mundial en envases de vidrio con énfasis en sostenibilidad y reciclaje'
            },
            'Guardian Glass': {
                contribution: 'Vidrio de baja emisividad, vidrio arquitectónico y automotriz',
                products: 'Guardian ClimaGuard, SunGuard, Guardian UltraClear',
                timeline: '1932-presente',
                impact: 'Innovador en vidrio de alto rendimiento para eficiencia energética en edificios'
            }
        };
        
        const manufacturerDetails = details[manufacturer.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeManufacturerModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${manufacturer.color}; margin-right: 1rem;">
                        <i class="fas ${manufacturer.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${manufacturer.color};">${manufacturer.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${manufacturer.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${manufacturer.color};">
                            <i class="fas fa-info-circle"></i> Detalles del Fabricante:
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${manufacturerDetails.contribution ? `
                                <div style="background: rgba(30, 30, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución Principal</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.products ? `
                                <div style="background: rgba(30, 30, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.timeline ? `
                                <div style="background: rgba(30, 30, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.impact ? `
                                <div style="background: rgba(30, 30, 70, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en Mercado</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${manufacturer.title} - Áreas de especialización</span><br>
                        <span class="code-keyword">Tecnologías clave:</span> ${manufacturer.title === 'Corning' ? 'Gorilla Glass, fusión, recubrimientos' : 
                        manufacturer.title === 'Saint-Gobain' ? 'Vidrio float, laminado, Low-E' :
                        manufacturer.title === 'AGC' ? 'Vidrio automotriz, arquitectónico, displays' :
                        manufacturer.title === 'Schott' ? 'Borosilicato, vidrio técnico, fibra óptica' :
                        manufacturer.title === 'Owens-Illinois' ? 'Envases, sostenibilidad, reciclaje' :
                        'Vidrio Low-E, arquitectónico, automoción'}<br>
                        <span class="code-keyword">Mercados principales:</span> ${manufacturer.title === 'Corning' ? 'Electrónica, telecomunicaciones, laboratorio' : 
                        'Construcción, automoción, envasado, electrónica'}<br>
                        <span class="code-keyword">Estado actual:</span> ${manufacturer.status}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="closeDetailBtn" style="background: ${manufacturer.color}; min-width: 200px;">
                            <i class="fas fa-check"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeManufacturerModal').addEventListener('click', () => {
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
    console.log('Aplicación Vidrio: Origen y Evolución inicializada correctamente');
});