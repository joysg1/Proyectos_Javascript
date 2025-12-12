document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const useCasesData = [
        {
            icon: 'fa-leaf',
            title: 'Agricultura Orgánica',
            description: 'Verificación de cero pesticidas sintéticos, seguimiento de insumos naturales, certificación automática.',
            color: '#2ecc71',
            examples: ['Certificación orgánica', 'Insumos naturales', 'Trazabilidad completa']
        },
        {
            icon: 'fa-apple-alt',
            title: 'Frutas y Hortalizas',
            description: 'Control de días de carencia, monitoreo de residuos, optimización de cosecha y postcosecha.',
            color: '#e74c3c',
            examples: ['Días de carencia', 'Niveles de residuos', 'Cosecha optimizada']
        },
        {
            icon: 'fa-wheat',
            title: 'Cereales y Granos',
            description: 'Seguimiento en almacenamiento, control de fumigantes, certificación para exportación.',
            color: '#f39c12',
            examples: ['Almacenamiento seguro', 'Control de fumigantes', 'Certificación exportación']
        },
        {
            icon: 'fa-wine-bottle',
            title: 'Viñedos y Vinos',
            description: 'Trazabilidad específica por variedad, control de sulfitos, certificación de denominación.',
            color: '#9b59b6',
            examples: ['Variedades específicas', 'Control de sulfitos', 'Denominación de origen']
        },
        {
            icon: 'fa-coffee',
            title: 'Café y Especias',
            description: 'Certificación de comercio justo, control de pesticidas prohibidos, trazabilidad por lote pequeño.',
            color: '#8b4513',
            examples: ['Comercio justo', 'Pesticidas prohibidos', 'Lotes pequeños']
        },
        {
            icon: 'fa-tint',
            title: 'Cultivos de Invernadero',
            description: 'Control integrado de plagas, monitoreo ambiental, optimización de aplicaciones.',
            color: '#3498db',
            examples: ['Control integrado', 'Monitoreo ambiental', 'Aplicaciones optimizadas']
        }
    ];

    // Datos de ejemplo para trazabilidad
    const sampleBatchData = {
        'AGRO-2024-05-789': {
            batchCode: 'AGRO-2024-05-789',
            manufacturer: 'AgroScience Internacional S.A.',
            composition: 'Imidacloprid 20% + Lambda-cialotrina 5%',
            manufactureDate: '2024-05-15',
            expiryDate: '2026-05-15',
            storage: [
                { location: 'Almacén Central', temp: '15°C', humidity: '45%', duration: '30 días' },
                { location: 'Distribuidor Regional', temp: '18°C', humidity: '50%', duration: '15 días' }
            ],
            distribution: [
                { date: '2024-06-15', from: 'AgroScience', to: 'Distribuidor Norte', transport: 'Refrigerado' },
                { date: '2024-06-20', from: 'Distribuidor Norte', to: 'Cooperativa Agrícola', transport: 'Normal' }
            ],
            application: [
                { date: '2024-07-01', crop: 'Tomate', farm: 'Finca La Esperanza', dose: '1.5 L/ha', applicator: 'Juan Pérez' },
                { date: '2024-07-10', crop: 'Tomate', farm: 'Finca El Progreso', dose: '1.2 L/ha', applicator: 'María Gómez' }
            ],
            residues: [
                { date: '2024-08-01', crop: 'Tomate', lab: 'LabFood Safety', result: '0.3 mg/kg', limit: '0.5 mg/kg', status: 'Dentro de límites' },
                { date: '2024-08-15', crop: 'Tomate', lab: 'EuroFins', result: '0.2 mg/kg', limit: '0.5 mg/kg', status: 'Dentro de límites' }
            ],
            certifications: ['EPA Registrado', 'UE Aprobado', 'Certificado Orgánico'],
            status: 'Activo',
            riskLevel: 'Bajo'
        },
        'BIO-2024-03-456': {
            batchCode: 'BIO-2024-03-456',
            manufacturer: 'BioProtect Natural Solutions',
            composition: 'Bacillus thuringiensis 10% + Extracto de Neem',
            manufactureDate: '2024-03-10',
            expiryDate: '2025-03-10',
            storage: [
                { location: 'Almacén Bio', temp: '20°C', humidity: '40%', duration: '60 días' }
            ],
            distribution: [
                { date: '2024-04-05', from: 'BioProtect', to: 'Distribuidor Orgánico', transport: 'Normal' }
            ],
            application: [
                { date: '2024-05-15', crop: 'Manzana', farm: 'Huerto Orgánico', dose: '2.0 L/ha', applicator: 'Carlos Organic' }
            ],
            residues: [
                { date: '2024-07-01', crop: 'Manzana', lab: 'Organic Certifiers', result: '0.0 mg/kg', limit: '0.0 mg/kg', status: 'Libre de residuos' }
            ],
            certifications: ['Certificado Orgánico USDA', 'EU Organic', 'Bio Suisse'],
            status: 'Activo',
            riskLevel: 'Muy Bajo'
        }
    };

    // Inicializar componentes
    initParticles();
    initUseCases();
    initEventListeners();
    initAnimations();
    initTimeline();
    initTrackingSystem();

    // Función para inicializar partículas
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
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
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: i % 4 === 0 ? `rgba(46, 204, 113, ${Math.random() * 0.3 + 0.1})` : 
                           i % 4 === 1 ? `rgba(231, 76, 60, ${Math.random() * 0.3 + 0.1})` :
                           i % 4 === 2 ? `rgba(52, 152, 219, ${Math.random() * 0.2 + 0.05})` :
                           `rgba(243, 156, 18, ${Math.random() * 0.2 + 0.05})`
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo sutil
            ctx.fillStyle = 'rgba(10, 26, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Efecto de brillo orgánico
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );
                gradient.addColorStop(0, particle.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                
                ctx.fillStyle = gradient;
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
    }

    // Función para inicializar casos de uso
    function initUseCases() {
        const container = document.getElementById('useCasesContainer');
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        useCasesData.forEach(useCase => {
            const card = document.createElement('div');
            card.className = 'card use-case-card';
            card.style.cursor = 'pointer';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${useCase.color};">
                        <i class="fas ${useCase.icon}"></i>
                    </div>
                    <h3 class="card-title" style="font-size: 1.5rem;">${useCase.title}</h3>
                </div>
                <div class="card-content">
                    <p>${useCase.description}</p>
                    <div style="margin-top: 1rem;">
                        ${useCase.examples.map(example => `
                            <div class="component-badge" style="background: ${useCase.color}20; color: ${useCase.color}; border-color: ${useCase.color}40;">${example}</div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 1rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles de trazabilidad
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showUseCaseDetail(useCase));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        
        // Animar entrada de tarjetas
        setTimeout(() => {
            document.querySelectorAll('.use-case-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'opacity 0.6s, transform 0.6s';
                }, index * 100);
            });
        }, 300);
    }

    // Función para inicializar timeline
    function initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => observer.observe(item));
    }

    // Función para inicializar sistema de rastreo
    function initTrackingSystem() {
        const batchCodeInput = document.getElementById('batchCodeInput');
        const scanBatchBtn = document.getElementById('scanBatchBtn');
        const trackPesticideBtn = document.getElementById('trackPesticideBtn');
        const resetTrackingBtn = document.getElementById('resetTrackingBtn');
        const generateReportBtn = document.getElementById('generateReportBtn');
        const searchTypeButtons = document.querySelectorAll('.search-type-btn');
        const filtersContainer = document.getElementById('additionalFilters');
        
        // Manejar botones de tipo de búsqueda
        searchTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                searchTypeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Mostrar/ocultar filtros adicionales
                if (this.dataset.type === 'full') {
                    filtersContainer.style.display = 'block';
                } else {
                    filtersContainer.style.display = 'none';
                }
            });
        });
        
        // Simular escaneo de código
        scanBatchBtn.addEventListener('click', function() {
            const sampleCodes = ['AGRO-2024-05-789', 'BIO-2024-03-456', 'CHEM-2024-06-123'];
            const randomCode = sampleCodes[Math.floor(Math.random() * sampleCodes.length)];
            batchCodeInput.value = randomCode;
            
            // Efecto visual
            batchCodeInput.style.borderColor = 'var(--success)';
            batchCodeInput.style.boxShadow = '0 0 10px rgba(46, 204, 113, 0.5)';
            setTimeout(() => {
                batchCodeInput.style.boxShadow = '';
            }, 1000);
            
            // Mostrar mensaje
            const trackingResult = document.getElementById('trackingResult');
            trackingResult.className = 'example-result';
            trackingResult.innerHTML = `
                <div class="result-text">
                    <i class="fas fa-qrcode" style="color: var(--accent-light); margin-right: 0.5rem;"></i>
                    Código escaneado: <strong>${randomCode}</strong>. Haga clic en "Rastrear Pesticida" para continuar.
                </div>
            `;
        });
        
        // Rastrear pesticida
        trackPesticideBtn.addEventListener('click', function() {
            const batchCode = batchCodeInput.value.trim();
            const batchError = document.getElementById('batchError');
            const trackingResult = document.getElementById('trackingResult');
            
            if (!batchCode) {
                batchError.style.display = 'block';
                batchCodeInput.style.borderColor = 'var(--accent-secondary)';
                trackingResult.className = 'example-result error';
                trackingResult.innerHTML = `
                    <div class="result-text">
                        <i class="fas fa-exclamation-circle" style="color: var(--accent-secondary); margin-right: 0.5rem;"></i>
                        Error: Ingrese un código de lote válido
                    </div>
                `;
                trackingResult.classList.add('error-flash');
                setTimeout(() => trackingResult.classList.remove('error-flash'), 500);
                return;
            }
            
            // Buscar datos del lote
            const batchData = sampleBatchData[batchCode];
            
            if (!batchData) {
                batchError.style.display = 'block';
                batchCodeInput.style.borderColor = 'var(--accent-secondary)';
                trackingResult.className = 'example-result error';
                trackingResult.innerHTML = `
                    <div class="result-text">
                        <i class="fas fa-exclamation-circle" style="color: var(--accent-secondary); margin-right: 0.5rem;"></i>
                        Error: Lote <strong>${batchCode}</strong> no encontrado en el sistema
                    </div>
                `;
                trackingResult.classList.add('error-flash');
                setTimeout(() => trackingResult.classList.remove('error-flash'), 500);
                return;
            }
            
            // Mostrar resultados exitosos
            batchError.style.display = 'none';
            batchCodeInput.style.borderColor = 'var(--success)';
            
            // Mostrar mapa de trazabilidad
            document.getElementById('traceabilityMap').style.display = 'block';
            
            // Actualizar pasos del mapa
            updateTraceabilityMap(batchData);
            
            // Mostrar resultados detallados
            showTrackingResults(batchData);
        });
        
        // Reiniciar búsqueda
        resetTrackingBtn.addEventListener('click', function() {
            batchCodeInput.value = '';
            document.getElementById('batchError').style.display = 'none';
            batchCodeInput.style.borderColor = 'var(--border)';
            
            // Restablecer botones de búsqueda
            searchTypeButtons.forEach((btn, index) => {
                if (index === 0) btn.classList.add('active');
                else btn.classList.remove('active');
            });
            
            // Ocultar filtros
            filtersContainer.style.display = 'none';
            
            // Restablecer resultado
            const trackingResult = document.getElementById('trackingResult');
            trackingResult.className = 'example-result';
            trackingResult.innerHTML = `
                <div class="result-text">
                    <i class="fas fa-info-circle" style="color: var(--accent-light); margin-right: 0.5rem;"></i>
                    Ingrese un código de lote para rastrear el origen del pesticida
                </div>
            `;
            
            // Ocultar mapa
            document.getElementById('traceabilityMap').style.display = 'none';
        });
        
        // Generar reporte
        generateReportBtn.addEventListener('click', function() {
            const batchCode = batchCodeInput.value.trim();
            
            if (!batchCode || !sampleBatchData[batchCode]) {
                alert('Por favor, busque un lote válido antes de generar el reporte');
                return;
            }
            
            // Simular generación de reporte
            const btn = this;
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando reporte...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar modal de reporte
                showReportModal(sampleBatchData[batchCode]);
            }, 2000);
        });
    }
    
    // Función para actualizar mapa de trazabilidad
    function updateTraceabilityMap(batchData) {
        // Paso 1: Fabricación
        document.getElementById('step1').innerHTML = `
            <div><strong>${batchData.manufacturer}</strong></div>
            <div>${batchData.manufactureDate}</div>
        `;
        
        // Paso 2: Almacenamiento
        const storage = batchData.storage[0];
        document.getElementById('step2').innerHTML = `
            <div><strong>${storage.location}</strong></div>
            <div>${storage.temp} / ${storage.humidity}</div>
        `;
        
        // Paso 3: Distribución
        const distribution = batchData.distribution[0];
        document.getElementById('step3').innerHTML = `
            <div><strong>${distribution.from} → ${distribution.to}</strong></div>
            <div>${distribution.date}</div>
        `;
        
        // Paso 4: Aplicación
        const application = batchData.application[0];
        document.getElementById('step4').innerHTML = `
            <div><strong>${application.crop}</strong></div>
            <div>${application.farm}</div>
            <div>${application.dose}</div>
        `;
        
        // Paso 5: Análisis
        const residue = batchData.residues[0];
        document.getElementById('step5').innerHTML = `
            <div><strong>${residue.result} mg/kg</strong></div>
            <div>${residue.status}</div>
        `;
        
        // Paso 6: Consumo
        document.getElementById('step6').innerHTML = `
            <div><strong>Seguro para consumo</strong></div>
            <div>Certificado: ${batchData.certifications[0]}</div>
        `;
        
        // Animación de pasos
        const steps = document.querySelectorAll('.traceability-step');
        steps.forEach((step, index) => {
            step.classList.remove('active');
            setTimeout(() => {
                step.classList.add('active');
            }, index * 300);
        });
    }
    
    // Función para mostrar resultados de rastreo
    function showTrackingResults(batchData) {
        const trackingResult = document.getElementById('trackingResult');
        trackingResult.className = 'example-result success';
        trackingResult.innerHTML = `
            <div style="width: 100%;">
                <div class="result-text" style="margin-bottom: 1rem;">
                    <i class="fas fa-check-circle" style="color: var(--success); margin-right: 0.5rem;"></i>
                    <strong>Lote encontrado:</strong> ${batchData.batchCode}
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">Fabricante</div>
                        <div style="font-weight: 600; color: var(--accent-light);">${batchData.manufacturer}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">Composición</div>
                        <div style="font-weight: 600; color: var(--accent-light);">${batchData.composition.split('+')[0].trim()}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">Estado</div>
                        <div style="font-weight: 600; color: ${batchData.riskLevel === 'Bajo' ? 'var(--success)' : 'var(--warning)'};">${batchData.status}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">Nivel de Riesgo</div>
                        <div style="font-weight: 600; color: ${batchData.riskLevel === 'Bajo' ? 'var(--success)' : batchData.riskLevel === 'Muy Bajo' ? 'var(--success)' : 'var(--danger)'};">${batchData.riskLevel}</div>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                    <i class="fas fa-certificate" style="color: var(--accent-light); margin-right: 0.5rem;"></i>
                    Certificaciones: ${batchData.certifications.join(', ')}
                </div>
            </div>
        `;
        trackingResult.classList.add('success-flash');
        setTimeout(() => trackingResult.classList.remove('success-flash'), 500);
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        // Botón de simulación
        const simulateBtn = document.getElementById('simulateTraceabilityBtn');
        simulateBtn.addEventListener('click', simulateTraceability);
        
        // Botón de normativas
        const viewRegulationsBtn = document.getElementById('viewRegulationsBtn');
        viewRegulationsBtn.addEventListener('click', () => {
            document.getElementById('regulationsModal').classList.add('active');
        });
        
        // Botón de comparación
        const compareBtn = document.getElementById('compareSystemsBtn');
        compareBtn.addEventListener('click', () => {
            document.getElementById('compareModal').classList.add('active');
        });
        
        // Cerrar modales
        document.getElementById('closeRegulationsModal').addEventListener('click', () => {
            document.getElementById('regulationsModal').classList.remove('active');
        });
        
        document.getElementById('closeCompareModal').addEventListener('click', () => {
            document.getElementById('compareModal').classList.remove('active');
        });
        
        // Cerrar modales al hacer clic fuera
        document.getElementById('regulationsModal').addEventListener('click', (e) => {
            if (e.target.id === 'regulationsModal') {
                document.getElementById('regulationsModal').classList.remove('active');
            }
        });
        
        document.getElementById('compareModal').addEventListener('click', (e) => {
            if (e.target.id === 'compareModal') {
                document.getElementById('compareModal').classList.remove('active');
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.getElementById('regulationsModal').classList.remove('active');
                document.getElementById('compareModal').classList.remove('active');
            }
        });
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
            if (!el.classList.contains('use-case-card')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                observer.observe(el);
            }
        });
    }

    // Función para simular trazabilidad
    function simulateTraceability() {
        const btn = document.getElementById('simulateTraceabilityBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando trazabilidad completa...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "Escaneando código de lote...",
            "Consultando base de datos de fabricantes...",
            "Verificando cadena de distribución...",
            "Analizando aplicaciones en campo...",
            "Validando análisis de residuos...",
            "Verificando cumplimiento normativo...",
            "Generando reporte de trazabilidad completa..."
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${steps[step]}`;
                step++;
            }
        }, 600);
        
        // Simular proceso completo
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showTraceabilityResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
            
            // Efecto visual en toda la página
            document.querySelectorAll('.card').forEach(card => {
                card.style.borderColor = 'var(--success)';
                card.style.boxShadow = '0 0 40px rgba(46, 204, 113, 0.4)';
                
                setTimeout(() => {
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 3000);
            });
        }, 4200);
    }

    // Función para mostrar resultados de trazabilidad
    function showTraceabilityResults() {
        const results = [
            { type: 'Lotes analizados', count: '156', color: '#2ecc71', icon: 'fa-boxes' },
            { type: 'Trazabilidad completa', count: '149', color: '#3498db', icon: 'fa-check-circle' },
            { type: 'Cumplimiento normativo', count: '98.7%', color: '#9b59b6', icon: 'fa-gavel' },
            { type: 'Incidentes detectados', count: '2', color: '#e74c3c', icon: 'fa-exclamation-triangle' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeResultsModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-network"></i> Resultados de Trazabilidad Completa
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación de sistema de trazabilidad completada exitosamente. Resumen de análisis:</p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.95rem;">
                        <i class="fas fa-database"></i> Período analizado: Últimos 90 días | Total de lotes en sistema: 1,248
                    </p>
                </div>
                <div class="stats-grid" style="margin: 2rem 0;">
                    ${results.map(result => `
                        <div class="stat-card">
                            <div class="stat-icon" style="font-size: 2.5rem; margin-bottom: 1rem; color: ${result.color};">
                                <i class="fas ${result.icon}"></i>
                            </div>
                            <div class="stat-value" style="background: linear-gradient(90deg, ${result.color}, ${result.color}99); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${result.count}</div>
                            <div class="stat-label">${result.type}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="code-container" style="margin: 1.5rem 0;">
                    <span class="code-comment">// Incidentes detectados y resueltos:</span><br>
                    <span class="code-keyword">1.</span> <span style="color: #e74c3c;">[INCIDENTE]</span> Lote AGRO-2024-02-345: Días de carencia no respetados<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #2ecc71;">[SOLUCIÓN]</span> Bloqueo automático de venta hasta cumplimiento<br>
                    <span class="code-keyword">2.</span> <span style="color: #e74c3c;">[INCIDENTE]</span> Lote CHEM-2024-01-678: Residuos sobre límite<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #2ecc71;">[SOLUCIÓN]</span> Retiro selectivo y notificación a autoridades<br>
                    <span class="code-comment">// Beneficio: Prevención de 15,000 kg de productos contaminados llegando al mercado</span>
                </div>
                
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Efectividad del sistema de trazabilidad</span>
                        <span>99.8%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 99.8%;"></div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                    <button class="btn" id="exportTraceabilityBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-download"></i> Exportar Reporte Completo
                    </button>
                    <button class="btn btn-secondary" id="viewAnalyticsBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-chart-bar"></i> Ver Análisis Predictivo
                    </button>
                    <button class="btn btn-error" id="riskAnalysisBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-shield-alt"></i> Análisis de Riesgos
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal de resultados
        document.getElementById('closeResultsModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('exportTraceabilityBtn').addEventListener('click', () => {
            alert('Reporte de trazabilidad completo generado exitosamente (simulación)');
            modal.remove();
        });
        
        document.getElementById('viewAnalyticsBtn').addEventListener('click', () => {
            alert('Mostrando análisis predictivo de tendencias de uso de pesticidas (simulación)');
            modal.remove();
        });
        
        document.getElementById('riskAnalysisBtn').addEventListener('click', () => {
            alert('Análisis de riesgos: Identificación de 3 proveedores de alto riesgo (simulación)');
            modal.remove();
        });
    }

    // Función para mostrar modal de reporte
    function showReportModal(batchData) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <button class="modal-close" id="closeReportModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-file-certificate"></i> Reporte de Trazabilidad Completa
                </h2>
                
                <div style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div>
                            <h3 style="color: var(--accent-light);">Lote: ${batchData.batchCode}</h3>
                            <p style="color: var(--text-secondary);">Generado: ${new Date().toLocaleDateString()}</p>
                        </div>
                        <div style="padding: 0.5rem 1.5rem; background: ${batchData.riskLevel === 'Bajo' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)'}; border-radius: 20px; color: ${batchData.riskLevel === 'Bajo' ? 'var(--accent-light)' : 'var(--accent-secondary-light)'};">
                            <i class="fas fa-${batchData.riskLevel === 'Bajo' ? 'check' : 'exclamation'}"></i> ${batchData.riskLevel}
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                    <div>
                        <h4 style="color: var(--accent-light); margin-bottom: 1rem;"><i class="fas fa-industry"></i> Información de Fabricación</h4>
                        <table class="results-table">
                            <tr><td>Fabricante:</td><td>${batchData.manufacturer}</td></tr>
                            <tr><td>Composición:</td><td>${batchData.composition}</td></tr>
                            <tr><td>Fecha fabricación:</td><td>${batchData.manufactureDate}</td></tr>
                            <tr><td>Fecha vencimiento:</td><td>${batchData.expiryDate}</td></tr>
                        </table>
                    </div>
                    
                    <div>
                        <h4 style="color: var(--accent-light); margin-bottom: 1rem;"><i class="fas fa-certificate"></i> Certificaciones</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${batchData.certifications.map(cert => `
                                <div class="component-badge" style="background: rgba(46, 204, 113, 0.2);">${cert}</div>
                            `).join('')}
                        </div>
                        
                        <h4 style="color: var(--accent-light); margin-top: 1.5rem; margin-bottom: 1rem;"><i class="fas fa-tractor"></i> Aplicaciones Registradas</h4>
                        <table class="results-table">
                            <thead>
                                <tr><th>Fecha</th><th>Cultivo</th><th>Dosis</th></tr>
                            </thead>
                            <tbody>
                                ${batchData.application.map(app => `
                                    <tr><td>${app.date}</td><td>${app.crop}</td><td>${app.dose}</td></tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div>
                    <h4 style="color: var(--accent-light); margin-bottom: 1rem;"><i class="fas fa-flask"></i> Análisis de Residuos</h4>
                    <table class="results-table">
                        <thead>
                            <tr><th>Fecha</th><th>Cultivo</th><th>Resultado</th><th>Límite</th><th>Estado</th></tr>
                        </thead>
                        <tbody>
                            ${batchData.residues.map(res => `
                                <tr>
                                    <td>${res.date}</td>
                                    <td>${res.crop}</td>
                                    <td>${res.result} mg/kg</td>
                                    <td>${res.limit} mg/kg</td>
                                    <td style="color: ${res.status.includes('Dentro') ? 'var(--success)' : 'var(--danger)'};">${res.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(10, 26, 10, 0.3); border-radius: 12px;">
                    <h4 style="color: var(--accent-light); margin-bottom: 0.8rem;"><i class="fas fa-check-circle"></i> Conclusión del Sistema</h4>
                    <p style="color: var(--text-secondary);">
                        ${batchData.riskLevel === 'Bajo' || batchData.riskLevel === 'Muy Bajo' ? 
                        '✅ Este lote cumple con todas las normativas de seguridad alimentaria y está aprobado para su comercialización.' : 
                        '⚠️ Este lote presenta riesgos que requieren atención. Se recomienda revisión adicional antes de su comercialización.'}
                    </p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                        <i class="fas fa-info-circle"></i> Sistema de trazabilidad verificado: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
                    </p>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn" id="printReportBtn">
                        <i class="fas fa-print"></i> Imprimir Reporte
                    </button>
                    <button class="btn btn-secondary" id="shareReportBtn">
                        <i class="fas fa-share-alt"></i> Compartir
                    </button>
                    <button class="btn btn-error" id="closeReportBtn">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeReportModal').addEventListener('click', () => {
            modal.remove();
        });
        
        document.getElementById('closeReportBtn').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('printReportBtn').addEventListener('click', () => {
            alert('Función de impresión activada (simulación)');
        });
        
        document.getElementById('shareReportBtn').addEventListener('click', () => {
            alert('Reporte compartido con autoridades competentes (simulación)');
        });
    }

    // Función para mostrar detalle de caso de uso
    function showUseCaseDetail(useCase) {
        const pesticideExamples = {
            'Agricultura Orgánica': [
                "Verificación de cero residuos de pesticidas sintéticos",
                "Seguimiento de insumos naturales certificados",
                "Certificación automática de estándares orgánicos",
                "Bloqueo de productos no autorizados en cadena orgánica"
            ],
            'Frutas y Hortalizas': [
                "Control automático de días de carencia por pesticida",
                "Monitoreo en tiempo real de niveles de residuos",
                "Optimización de fechas de cosecha según aplicaciones",
                "Certificación para exportación a mercados exigentes"
            ],
            'Cereales y Granos': [
                "Seguimiento de pesticidas durante almacenamiento prolongado",
                "Control de fumigantes en silos y almacenes",
                "Certificación para exportación a países con límites estrictos",
                "Detección de contaminación cruzada entre lotes"
            ],
            'Viñedos y Vinos': [
                "Trazabilidad específica por variedad de uva",
                "Control estricto de sulfitos y otros aditivos",
                "Certificación de denominación de origen protegida",
                "Verificación de prácticas sostenibles en viticultura"
            ],
            'Café y Especias': [
                "Certificación de comercio justo y prácticas éticas",
                "Control de pesticidas prohibidos en países destino",
                "Trazabilidad por lotes pequeños de alta calidad",
                "Verificación de procesos de secado y almacenamiento"
            ],
            'Cultivos de Invernadero': [
                "Control integrado de plagas con monitoreo continuo",
                "Optimización de aplicaciones según condiciones ambientales",
                "Reducción de pesticidas mediante métodos biológicos",
                "Certificación de producción sostenible en ambiente controlado"
            ]
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDetailModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${useCase.color}; margin-right: 1rem;">
                        <i class="fas ${useCase.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${useCase.color};">${useCase.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${useCase.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${useCase.color};">
                            <i class="fas fa-seedling"></i> Implementación de trazabilidad:
                        </h4>
                        <ul class="feature-list">
                            ${pesticideExamples[useCase.title]?.map(example => `<li>${example}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(30, 59, 30, 0.5); border-radius: 12px;">
                        <h4 style="margin-bottom: 0.8rem; color: ${useCase.color};">
                            <i class="fas fa-chart-line"></i> Impacto medible:
                        </h4>
                        <ul class="feature-list">
                            <li>Reducción de residuos: 85-99%</li>
                            <li>ROI en certificaciones: 150-300%</li>
                            <li>Tiempo de implementación: 4-12 semanas</li>
                            <li>Acceso a mercados premium: Incremento 40-60%</li>
                        </ul>
                    </div>
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="implementSolutionBtn" style="background: ${useCase.color}; min-width: 200px;">
                            <i class="fas fa-cogs"></i> Implementar Solución
                        </button>
                        <button class="btn btn-secondary" id="caseStudyBtn" style="min-width: 200px;">
                            <i class="fas fa-book"></i> Ver Estudio de Caso
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeDetailModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('implementSolutionBtn').addEventListener('click', () => {
            alert(`Iniciando implementación de trazabilidad para: ${useCase.title}`);
            modal.remove();
        });
        
        document.getElementById('caseStudyBtn').addEventListener('click', () => {
            alert(`Mostrando estudio de caso completo: ${useCase.title}`);
            modal.remove();
        });
    }
});