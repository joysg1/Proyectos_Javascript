document.addEventListener('DOMContentLoaded', function() {
    console.log('Discos SATA: Inicializando aplicación...');
    
    // Datos de fabricantes importantes
    const manufacturersData = [
        {
            icon: 'fa-microchip',
            title: 'Intel',
            description: 'Líder en controladores SATA y chipsets. Contribuyó significativamente al desarrollo del estándar SATA desde sus inicios.',
            color: '#00a8ff',
            status: 'Activo',
            contribution: 'Chipsets, AHCI, SATA-IO'
        },
        {
            icon: 'fa-hard-drive',
            title: 'Seagate',
            description: 'Uno de los mayores fabricantes de discos duros. Primer HDD SATA en 2002. Miembro fundador de SATA-IO.',
            color: '#0077b6',
            status: 'Activo',
            contribution: 'Primer HDD SATA, SATA-IO'
        },
        {
            icon: 'fa-hdd',
            title: 'Western Digital',
            description: 'Principal competidor de Seagate. Amplia gama de HDDs y SSDs SATA. WD Blue y Black series muy populares.',
            color: '#ff9e00',
            status: 'Activo',
            contribution: 'HDDs, SSDs, firmware'
        },
        {
            icon: 'fa-memory',
            title: 'Samsung',
            description: 'Líder en SSDs SATA con series 860/870 EVO y QVO. Tecnología V-NAND optimizada para interfaz SATA.',
            color: '#00d4aa',
            status: 'Activo',
            contribution: 'SSDs V-NAND, controladores'
        },
        {
            icon: 'fa-compact-disc',
            title: 'AMD',
            description: 'Proveedor de chipsets y CPUs con controladores SATA integrados. Competencia con Intel impulsó innovación.',
            color: '#ff6b6b',
            status: 'Activo',
            contribution: 'Chipsets, controladores'
        },
        {
            icon: 'fa-server',
            title: 'Marvell',
            description: 'Fabricante de controladores SATA para placas base y tarjetas RAID. Soluciones enterprise y consumer.',
            color: '#4ade80',
            status: 'Activo',
            contribution: 'Controladores, chips RAID'
        }
    ];

    // Inicializar componentes
    initTechParticles();
    initManufacturers();
    initEventListeners();
    initAnimations();
    initTimeline();
    initTransferSimulation();

    // Función para inicializar partículas tecnológicas
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
                
                if (type < 0.7) {
                    // Partículas de datos (azules)
                    color = `rgba(0, 168, 255, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.4;
                } else if (type < 0.9) {
                    // Partículas de energía (naranja)
                    color = `rgba(255, 158, 0, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.6;
                } else {
                    // Bits de datos (verde)
                    color = `rgba(0, 212, 170, ${Math.random() * 0.3 + 0.1})`;
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
                    type: type < 0.7 ? 'data' : type < 0.9 ? 'energy' : 'bit'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo de circuito sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 18, 0.3)');
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
                if (particle.type === 'bit') {
                    // Bits como cuadrados
                    ctx.rect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
                } else {
                    // Datos y energía como círculos
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
                
                // Efecto de brillo para partículas especiales
                if (particle.type !== 'data') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 3
                    );
                    
                    if (particle.type === 'energy') {
                        gradient.addColorStop(0, `rgba(255, 158, 0, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(255, 158, 0, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(0, 212, 170, ${currentAlpha})`);
                        gradient.addColorStop(1, 'rgba(0, 212, 170, 0)');
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
        console.log('Partículas tecnológicas inicializadas');
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

    // Función para inicializar simulación de transferencia
    function initTransferSimulation() {
        console.log('Inicializando simulación de transferencia...');
        
        // Elementos del DOM
        const sataGenSlider = document.getElementById('sataGenSlider');
        const sataGenValue = document.getElementById('sataGenValue');
        const fileSizeSlider = document.getElementById('fileSizeSlider');
        const fileSizeValue = document.getElementById('fileSizeValue');
        const smallFilesSlider = document.getElementById('smallFilesSlider');
        const smallFilesValue = document.getElementById('smallFilesValue');
        const deviceTypeButtons = document.querySelectorAll('.device-type-btn');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDataBtn = document.getElementById('showDataBtn');
        const canvas = document.getElementById('transferCurveCanvas');
        
        // Verificar que todos los elementos existan
        if (!canvas || !sataGenSlider) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Actualizar valores de los sliders
        sataGenSlider.addEventListener('input', function() {
            const gens = ['SATA I (1.5Gb/s)', 'SATA II (3Gb/s)', 'SATA III (6Gb/s)', 'SATA Express (16Gb/s)'];
            sataGenValue.textContent = gens[this.value - 1];
        });
        
        fileSizeSlider.addEventListener('input', function() {
            fileSizeValue.textContent = `${this.value} GB`;
        });
        
        smallFilesSlider.addEventListener('input', function() {
            smallFilesValue.textContent = `${this.value}%`;
        });
        
        // Botones de tipo de dispositivo
        deviceTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                deviceTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runTransferSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            sataGenSlider.value = 3;
            sataGenValue.textContent = 'SATA III (6Gb/s)';
            fileSizeSlider.value = 50;
            fileSizeValue.textContent = '50 GB';
            smallFilesSlider.value = 70;
            smallFilesValue.textContent = '70%';
            deviceTypeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="ssd-sata"]').classList.add('active');
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Restaurar texto
            document.getElementById('simulationConclusion').innerHTML = 
                '<div class="result-text">SATA III (azul) ofrece transferencias consistentes, pero NVMe (rojo) domina en rendimiento</div>';
            
            // Ejecutar simulación con valores por defecto
            runTransferSimulation();
        });
        
        // Mostrar datos
        showDataBtn.addEventListener('click', function() {
            showSimulationData();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            runTransferSimulation();
        }, 500);
        
        console.log('Simulación de transferencia inicializada');
    }

    // Función para ejecutar simulación de transferencia
    function runTransferSimulation() {
        const canvas = document.getElementById('transferCurveCanvas');
        const ctx = canvas.getContext('2d');
        const sataGen = parseInt(document.getElementById('sataGenSlider').value);
        const fileSize = parseInt(document.getElementById('fileSizeSlider').value);
        const smallFilesPercent = parseInt(document.getElementById('smallFilesSlider').value) / 100;
        const deviceType = document.querySelector('.device-type-btn.active').dataset.type;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const padding = 50;
        const graphWidth = canvas.width - 2 * padding;
        const graphHeight = canvas.height - 2 * padding;
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (tamaño de archivo)
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Eje Y (velocidad MB/s)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Tamaño de Archivo (GB)', canvas.width / 2, canvas.height - padding / 3);
        
        ctx.save();
        ctx.translate(padding / 3, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Velocidad (MB/s)', 0, 0);
        ctx.restore();
        
        // Marcas en ejes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Inter';
        
        // Marcas en eje X
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * graphWidth) / 5;
            const value = (i * fileSize) / 5;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding - 5);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
            ctx.fillText(value.toFixed(0), x, canvas.height - padding + 20);
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
        
        // Velocidades teóricas por generación SATA
        const sataSpeeds = {
            1: 150,   // SATA I
            2: 300,   // SATA II
            3: 600,   // SATA III
            4: 1969   // SATA Express (PCIe 2.0 x2)
        };
        
        // Velocidades reales por dispositivo
        const deviceSpeeds = {
            'hdd-5400': 80,
            'hdd-7200': 150,
            'ssd-sata': 550,
            'ssd-nvme': 3500
        };
        
        // Calcular curvas
        const points = 100;
        const sataCurve = [];
        const deviceLimitCurve = [];
        const actualCurve = [];
        
        for (let i = 0; i <= points; i++) {
            const fileSizePoint = (i * fileSize) / points;
            
            // Velocidad teórica SATA
            const v_sata = sataSpeeds[sataGen];
            
            // Límite del dispositivo
            const v_device = deviceSpeeds[deviceType];
            
            // Velocidad real (considera archivos pequeños y overhead)
            let v_actual = Math.min(v_sata, v_device);
            
            // Penalización por archivos pequeños
            if (fileSizePoint < 1) {
                v_actual *= 0.3;
            } else if (fileSizePoint < 10) {
                v_actual *= 0.7;
            }
            
            // Penalización adicional según % archivos pequeños
            v_actual *= (1 - smallFilesPercent * 0.5);
            
            sataCurve.push({size: fileSizePoint, v: v_sata});
            deviceLimitCurve.push({size: fileSizePoint, v: v_device});
            actualCurve.push({size: fileSizePoint, v: v_actual});
        }
        
        // Dibujar curva límite SATA
        ctx.strokeStyle = 'rgba(0, 168, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        sataCurve.forEach((point, i) => {
            const x = padding + (point.size / fileSize) * graphWidth;
            const y = canvas.height - padding - (point.v / 1000) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar curva límite dispositivo
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        deviceLimitCurve.forEach((point, i) => {
            const x = padding + (point.size / fileSize) * graphWidth;
            const y = canvas.height - padding - (point.v / 1000) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar curva real
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.size / fileSize) * graphWidth;
            const y = canvas.height - padding - (point.v / 1000) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar área entre curvas
        ctx.fillStyle = 'rgba(0, 168, 255, 0.15)';
        ctx.beginPath();
        
        actualCurve.forEach((point, i) => {
            const x = padding + (point.size / fileSize) * graphWidth;
            const y = canvas.height - padding - (point.v / 1000) * graphHeight;
            const ySata = canvas.height - padding - (sataCurve[i].v / 1000) * graphHeight;
            
            if (i === 0) {
                ctx.moveTo(x, ySata);
            } else {
                ctx.lineTo(x, ySata);
            }
        });
        
        for (let i = actualCurve.length - 1; i >= 0; i--) {
            const point = actualCurve[i];
            const x = padding + (point.size / fileSize) * graphWidth;
            const y = canvas.height - padding - (point.v / 1000) * graphHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Leyenda
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter';
        
        // Límite SATA
        ctx.fillStyle = 'rgba(0, 168, 255, 0.9)';
        ctx.fillRect(canvas.width - 180, 20, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite SATA', canvas.width - 155, 32);
        
        // Límite dispositivo
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fillRect(canvas.width - 180, 45, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Límite dispositivo', canvas.width - 155, 57);
        
        // Rendimiento real
        ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
        ctx.fillRect(canvas.width - 180, 70, 15, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('Rendimiento real', canvas.width - 155, 82);
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        const sataSpeed = sataSpeeds[sataGen];
        const deviceSpeed = deviceSpeeds[deviceType];
        
        if (sataSpeed < deviceSpeed) {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--accent-secondary);">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                    SATA es cuello de botella (${sataSpeed} MB/s < ${deviceSpeed} MB/s)
                </div>
            `;
        } else {
            conclusion.innerHTML = `
                <div class="result-text" style="color: var(--success);">
                    <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                    Dispositivo limita rendimiento (${deviceSpeed} MB/s)
                </div>
            `;
        }
    }

    // Función para mostrar datos de simulación
    function showSimulationData() {
        const sataGen = parseInt(document.getElementById('sataGenSlider').value);
        const fileSize = parseInt(document.getElementById('fileSizeSlider').value);
        const smallFilesPercent = parseInt(document.getElementById('smallFilesSlider').value) / 100;
        const deviceType = document.querySelector('.device-type-btn.active').dataset.type;
        
        const gens = ['SATA I (1.5Gb/s)', 'SATA II (3Gb/s)', 'SATA III (6Gb/s)', 'SATA Express (16Gb/s)'];
        const deviceNames = {
            'hdd-5400': 'HDD 5400 RPM',
            'hdd-7200': 'HDD 7200 RPM',
            'ssd-sata': 'SSD SATA',
            'ssd-nvme': 'SSD NVMe'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDataModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Datos de Simulación de Transferencia
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Generación SATA</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">${gens[sataGen-1]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Dispositivo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${deviceNames[deviceType]}</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">Tamaño Archivo</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${fileSize} GB</div>
                            </div>
                            <div style="background: rgba(30, 30, 60, 0.5); padding: 1rem; border-radius: 8px;">
                                <div style="color: var(--text-muted); font-size: 0.9rem;">% Archivos Pequeños</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-light);">${(smallFilesPercent*100).toFixed(0)}%</div>
                            </div>
                        </div>
                        
                        <div class="code-container" style="margin: 1rem 0;">
                            <span class="code-comment"># Cálculos de rendimiento teórico vs real</span><br>
                            <span class="code-keyword">Velocidad teórica SATA:</span> ${[150, 300, 600, 1969][sataGen-1]} MB/s<br>
                            <span class="code-keyword">Velocidad máxima dispositivo:</span> ${deviceType === 'hdd-5400' ? 80 : deviceType === 'hdd-7200' ? 150 : deviceType === 'ssd-sata' ? 550 : 3500} MB/s<br>
                            <span class="code-keyword">Overhead archivos pequeños:</span> ${(smallFilesPercent*50).toFixed(0)}% penalización<br>
                            <span class="code-keyword">Tiempo estimado transferencia:</span> ${(fileSize * 1000 / Math.min([150, 300, 600, 1969][sataGen-1], deviceType === 'hdd-5400' ? 80 : deviceType === 'hdd-7200' ? 150 : deviceType === 'ssd-sata' ? 550 : 3500)).toFixed(1)} segundos
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
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando evolución tecnológica...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1986: Interface ATA (IDE) - 3.3 MB/s...",
            "1994: ATA-2 (EIDE) - 16.6 MB/s...",
            "1997: Ultra ATA/33 - 33 MB/s...",
            "2000: ATA/100 - 100 MB/s...",
            "2003: SATA 1.0 - 150 MB/s...",
            "2004: SATA 2.0 - 300 MB/s...",
            "2009: SATA 3.0 - 600 MB/s...",
            "2013: SATA Express - 1969 MB/s...",
            "Presente: Transición a NVMe PCIe 4.0/5.0"
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
            { type: 'Velocidad máxima', value: '600 MB/s', color: '#00a8ff', icon: 'fa-tachometer-alt' },
            { type: 'Años activo', value: '20+', color: '#ff9e00', icon: 'fa-calendar-alt' },
            { type: 'Dispositivos SATA', value: '10⁹+', color: '#00d4aa', icon: 'fa-microchip' },
            { type: 'Cuota mercado', value: '65%', color: '#4ade80', icon: 'fa-chart-pie' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeTechModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-expand-arrows-alt"></i> Evolución Tecnológica de SATA
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación del impacto de SATA en la industria del almacenamiento desde 2003 hasta la actualidad:</p>
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
            alert('Mostrando línea de tiempo detallada de SATA y tecnologías relacionadas');
            modal.remove();
        });
    }

    // Función para mostrar detalle de fabricante
    function showManufacturerDetail(manufacturer) {
        const details = {
            'Intel': {
                contribution: 'Desarrollo de chipsets, especificación AHCI, miembro fundador SATA-IO',
                products: 'Chipsets Serie 8/9/100/200/300/400/500/600/700, controladores integrados en CPUs',
                timeline: '2003-presente',
                impact: 'Estableció SATA como estándar en placas base Intel'
            },
            'Seagate': {
                contribution: 'Primer HDD SATA (Barracuda 7200.7), miembro fundador SATA-IO',
                products: 'Barracuda, IronWolf, FireCuda, SkyHawk series (HDDs y SSDs SATA)',
                timeline: '2002-presente',
                impact: 'Primer fabricante en adoptar SATA masivamente en HDDs'
            },
            'Western Digital': {
                contribution: 'Amplia adopción en WD Blue/Black/Red/Purple/Gold series',
                products: 'WD Blue, Black, Red, Purple, Gold, Ultrastar (HDDs y SSDs SATA)',
                timeline: '2003-presente',
                impact: 'Competencia con Seagate impulsó precios más bajos y mayor capacidad'
            },
            'Samsung': {
                contribution: 'Liderazgo en SSDs SATA con tecnología V-NAND',
                products: 'SSD 850/860/870 EVO, 860/870 QVO, PM883 (enterprise)',
                timeline: '2010-presente',
                impact: 'Popularizó SSDs SATA para consumidores con rendimiento confiable'
            },
            'AMD': {
                contribution: 'Chipsets competitivos con soporte SATA para plataformas AMD',
                products: 'Chipsets Serie 300/400/500/600 para Ryzen, controladores RAID',
                timeline: '2003-presente',
                impact: 'Competencia con Intel mantuvo precios bajos y características'
            },
            'Marvell': {
                contribution: 'Controladores SATA/RAID para placas base y tarjetas add-in',
                products: 'Controladores 88SE91xx, 88SE92xx, chipsets para NAS/enterprise',
                timeline: '2004-presente',
                impact: 'Habilitó funcionalidades SATA avanzadas en placas base económicas'
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
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Contribución SATA</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.contribution}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.products ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Productos Principales</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.products}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.timeline ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Período Activo</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.timeline}</div>
                                </div>
                            ` : ''}
                            
                            ${manufacturerDetails.impact ? `
                                <div style="background: rgba(30, 30, 60, 0.3); padding: 0.8rem; border-radius: 8px;">
                                    <div style="font-size: 0.9rem; color: var(--text-muted);">Impacto en Mercado</div>
                                    <div style="font-weight: 600;">${manufacturerDetails.impact}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment">// ${manufacturer.title} - Tecnologías relacionadas con SATA</span><br>
                        <span class="code-keyword">Especificaciones soportadas:</span> SATA 1.0 a 3.2<br>
                        <span class="code-keyword">Características avanzadas:</span> NCQ, Hot-swap, Power Management, TRIM<br>
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
    console.log('Aplicación Discos SATA inicializada correctamente');
});