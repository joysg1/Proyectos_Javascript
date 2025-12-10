document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const soapTypesData = [
        {
            icon: 'fa-leaf',
            title: 'Jabón de Alepo',
            description: 'El jabón más antiguo del mundo, fabricado en Siria desde hace 2000 años con aceite de oliva y laurel.',
            color: '#2ecc71',
            properties: ['Antiséptico natural', 'Curado 9 meses', 'Hidratante']
        },
        {
            icon: 'fa-city',
            title: 'Jabón de Marsella',
            description: 'Famoso jabón francés fabricado desde el siglo XIV con al menos 72% de aceite vegetal.',
            color: '#3498db',
            properties: ['72% aceite vegetal', 'Biodegradable', 'Multiusos']
        },
        {
            icon: 'fa-cow',
            title: 'Jabón de Castilla',
            description: 'Originario de España, hecho exclusivamente con aceite de oliva. Suave y biodegradable.',
            color: '#e74c3c',
            properties: ['100% aceite oliva', 'Hipoaalergénico', 'Vegano']
        },
        {
            icon: 'fa-seedling',
            title: 'Jabón Nabulsi',
            description: 'Jabón palestino tradicional con propiedades medicinales, hecho con aceite de oliva local.',
            color: '#f39c12',
            properties: ['Medicinal', 'Tradicional', 'Aceite local']
        },
        {
            icon: 'fa-water',
            title: 'Jabón Negro Africano',
            description: 'Jabón tradicional de África Occidental hecho con ceniza de cáscaras de plátano y cacao.',
            color: '#2c3e50',
            properties: ['Exfoliante', 'Rico en vitaminas', 'Ceniza natural']
        },
        {
            icon: 'fa-spa',
            title: 'Jabón de Leche de Burra',
            description: 'Jabón egipcio antiguo hecho con leche de burra, conocido por sus propiedades nutritivas.',
            color: '#9b59b6',
            properties: ['Nutritivo', 'Antienvejecimiento', 'Hidratante']
        }
    ];

    const historicalPeriods = [
        {
            year: "2800 a.C.",
            title: "Mesopotamia",
            description: "Primeras evidencias de mezclas de ceniza y aceites para limpieza.",
            color: "#2ecc71"
        },
        {
            year: "1500 a.C.",
            title: "Egipto Antiguo",
            description: "Mezclas de aceites con sales alcalinas para tratamiento de piel y lavado.",
            color: "#f39c12"
        },
        {
            year: "600 a.C.",
            title: "Fenicios",
            description: "Producción de jabón con aceite de oliva y ceniza de algas marinas.",
            color: "#3498db"
        },
        {
            year: "300 d.C.",
            title: "Imperio Romano",
            description: "Primeras descripciones detalladas del jabón galo por Plinio el Viejo.",
            color: "#e74c3c"
        },
        {
            year: "800 d.C.",
            title: "Edad Media",
            description: "Producción limitada por monjes, inicio del jabón de Marsella.",
            color: "#9b59b6"
        },
        {
            year: "1791",
            title: "Revolución Industrial",
            description: "Nicolas Leblanc inventa proceso para producir sosa cáustica a escala industrial.",
            color: "#1abc9c"
        }
    ];

    // Inicializar componentes
    initBubbles();
    initSoapTypes();
    initEventListeners();
    initAnimations();
    initTimeline();
    initSaponificationSimulator();

    // Función para inicializar burbujas
    function initBubbles() {
        const canvas = document.getElementById('bubbles-canvas');
        const ctx = canvas.getContext('2d');
        let bubbles = [];
        const bubbleCount = 60;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createBubbles() {
            bubbles = [];
            for (let i = 0; i < bubbleCount; i++) {
                bubbles.push({
                    x: Math.random() * canvas.width,
                    y: canvas.height + Math.random() * 100,
                    size: Math.random() * 25 + 10,
                    speed: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.3 + 0.1,
                    color: i % 3 === 0 ? `rgba(46, 204, 113, ${Math.random() * 0.3 + 0.1})` : 
                           i % 3 === 1 ? `rgba(52, 152, 219, ${Math.random() * 0.3 + 0.1})` :
                           `rgba(155, 89, 182, ${Math.random() * 0.2 + 0.1})`,
                    wobble: Math.random() * 2 - 1
                });
            }
        }
        
        function animateBubbles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo sutil con gradiente
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'rgba(10, 15, 26, 0.05)');
            gradient.addColorStop(1, 'rgba(26, 35, 50, 0.05)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            bubbles.forEach(bubble => {
                bubble.y -= bubble.speed;
                bubble.x += Math.sin(bubble.y * 0.01) * bubble.wobble;
                
                // Si la burbuja sale por arriba, reiniciar abajo
                if (bubble.y < -50) {
                    bubble.y = canvas.height + Math.random() * 100;
                    bubble.x = Math.random() * canvas.width;
                }
                
                // Dibujar burbuja
                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
                
                // Efecto de brillo
                const bubbleGradient = ctx.createRadialGradient(
                    bubble.x, bubble.y, 0,
                    bubble.x, bubble.y, bubble.size
                );
                bubbleGradient.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity * 0.5})`);
                bubbleGradient.addColorStop(0.8, bubble.color);
                bubbleGradient.addColorStop(1, 'rgba(0,0,0,0)');
                
                ctx.fillStyle = bubbleGradient;
                ctx.fill();
                
                // Destello
                ctx.beginPath();
                ctx.arc(bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.7})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animateBubbles);
        }
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            createBubbles();
        });
        
        resizeCanvas();
        createBubbles();
        animateBubbles();
    }

    // Función para inicializar tipos de jabón
    function initSoapTypes() {
        const container = document.getElementById('useCasesContainer');
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        soapTypesData.forEach(soapType => {
            const card = document.createElement('div');
            card.className = 'card soap-type-card';
            card.style.cursor = 'pointer';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${soapType.color};">
                        <i class="fas ${soapType.icon}"></i>
                    </div>
                    <h3 class="card-title" style="font-size: 1.5rem;">${soapType.title}</h3>
                </div>
                <div class="card-content">
                    <p>${soapType.description}</p>
                    <div style="margin-top: 1rem;">
                        ${soapType.properties.map(prop => `
                            <div class="component-badge" style="background: ${soapType.color}20; color: ${soapType.color}; border-color: ${soapType.color}40;">${prop}</div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 1rem; font-size: 0.95rem; color: var(--accent-jabon-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles históricos
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showSoapTypeDetail(soapType));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        
        // Animar entrada de tarjetas
        setTimeout(() => {
            document.querySelectorAll('.soap-type-card').forEach((card, index) => {
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

    // Función para inicializar simulador de saponificación
    function initSaponificationSimulator() {
        const fatTypeSelect = document.getElementById('fatType');
        const cureTimeSlider = document.getElementById('cureTime');
        const cureTimeValue = document.getElementById('cureTimeValue');
        const startBtn = document.getElementById('startSimulationBtn');
        const resetBtn = document.getElementById('resetSimulationBtn');
        const autoRecipeBtn = document.getElementById('autoRecipeBtn');
        
        // Actualizar valor del slider
        cureTimeSlider.addEventListener('input', function() {
            cureTimeValue.textContent = `${this.value} semanas`;
        });
        
        // Iniciar simulación
        startBtn.addEventListener('click', function() {
            const fatType = fatTypeSelect.value;
            const alkali = document.querySelector('input[name="alkali"]:checked').value;
            const cureTime = parseInt(cureTimeSlider.value);
            
            // Simular proceso
            simulateSaponification(fatType, alkali, cureTime);
        });
        
        // Reiniciar simulación
        resetBtn.addEventListener('click', function() {
            fatTypeSelect.value = 'olive';
            document.querySelector('input[name="alkali"][value="sodium"]').checked = true;
            cureTimeSlider.value = 6;
            cureTimeValue.textContent = '6 semanas';
            
            const resultDiv = document.getElementById('simulationResult');
            resultDiv.className = 'example-result';
            resultDiv.innerHTML = '<div class="result-text">Configura los parámetros para simular la creación de jabón</div>';
        });
        
        // Receta tradicional
        autoRecipeBtn.addEventListener('click', function() {
            fatTypeSelect.value = 'olive';
            document.querySelector('input[name="alkali"][value="sodium"]').checked = true;
            cureTimeSlider.value = 9;
            cureTimeValue.textContent = '9 semanas';
            
            const resultDiv = document.getElementById('simulationResult');
            resultDiv.className = 'example-result';
            resultDiv.innerHTML = `
                <div class="result-text">
                    <i class="fas fa-info-circle" style="color: var(--accent-jabon-light); margin-right: 0.5rem;"></i>
                    Receta tradicional cargada: Jabón de Alepo (aceite de oliva + laurel, curado 9 semanas)
                </div>
            `;
        });
    }

    // Simular proceso de saponificación
    function simulateSaponification(fatType, alkali, cureTime) {
        const btn = document.getElementById('startSimulationBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando saponificación...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Definir propiedades según tipo de grasa
        const fatProperties = {
            olive: { name: "Aceite de Oliva", saponification: 0.134, hardness: "Media", lather: "Crema suave" },
            coconut: { name: "Aceite de Coco", saponification: 0.190, hardness: "Alta", lather: "Espuma abundante" },
            shea: { name: "Manteca de Karité", saponification: 0.128, hardness: "Dura", lather: "Espuma cremosa" },
            tallow: { name: "Sebo Animal", saponification: 0.141, hardness: "Muy dura", lather: "Espuma estable" }
        };
        
        const alkaliName = alkali === 'sodium' ? 'Hidróxido de sodio (jabón duro)' : 'Hidróxido de potasio (jabón líquido)';
        const fat = fatProperties[fatType];
        
        // Mostrar progreso
        const steps = [
            "Mezclando ingredientes...",
            "Calentando la mezcla...",
            "Iniciando reacción química...",
            "Control de temperatura...",
            "Verificando traza...",
            "Vaciando en moldes...",
            `Curando por ${cureTime} semanas...`,
            "¡Jabón listo!"
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
            
            // Calcular propiedades del jabón resultante
            const quality = cureTime >= 8 ? "Excelente" : cureTime >= 6 ? "Buena" : "Aceptable";
            const hardnessScore = fatType === 'tallow' ? 95 : fatType === 'coconut' ? 90 : fatType === 'shea' ? 85 : 75;
            const latherScore = fatType === 'coconut' ? 95 : fatType === 'olive' ? 80 : fatType === 'shea' ? 75 : 70;
            
            // Mostrar resultados
            showSaponificationResults(fat, alkaliName, cureTime, quality, hardnessScore, latherScore);
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
            
            // Efecto visual
            document.getElementById('simulationResult').classList.add('success-flash');
            setTimeout(() => {
                document.getElementById('simulationResult').classList.remove('success-flash');
            }, 500);
        }, 6400);
    }

    // Mostrar resultados de saponificación
    function showSaponificationResults(fat, alkali, cureTime, quality, hardnessScore, latherScore) {
        const resultDiv = document.getElementById('simulationResult');
        resultDiv.className = 'example-result success';
        
        resultDiv.innerHTML = `
            <div class="result-text" style="text-align: left; line-height: 1.6;">
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <i class="fas fa-check-circle" style="color: var(--success); margin-right: 0.5rem;"></i>
                    <strong>Saponificación completada exitosamente!</strong>
                </div>
                <div style="font-size: 0.9rem;">
                    <div><strong>Grasa:</strong> ${fat.name}</div>
                    <div><strong>Álcali:</strong> ${alkali}</div>
                    <div><strong>Tiempo de curado:</strong> ${cureTime} semanas</div>
                    <div><strong>Calidad del jabón:</strong> ${quality}</div>
                    <div style="margin-top: 0.5rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Dureza:</span>
                            <span>${hardnessScore}%</span>
                        </div>
                        <div class="progress-bar" style="height: 6px; margin: 0.2rem 0;">
                            <div class="progress-fill" style="width: ${hardnessScore}%;"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Espuma:</span>
                            <span>${latherScore}%</span>
                        </div>
                        <div class="progress-bar" style="height: 6px; margin: 0.2rem 0;">
                            <div class="progress-fill" style="width: ${latherScore}%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        // Botón de recorrido histórico
        const timelineBtn = document.getElementById('timelineJourneyBtn');
        timelineBtn.addEventListener('click', startHistoricalJourney);
        
        // Botón de química
        const viewChemistryBtn = document.getElementById('viewChemistryBtn');
        viewChemistryBtn.addEventListener('click', () => {
            document.getElementById('chemistryModal').classList.add('active');
        });
        
        // Botón de comparación
        const compareBtn = document.getElementById('compareSoapsBtn');
        compareBtn.addEventListener('click', () => {
            document.getElementById('compareModal').classList.add('active');
        });
        
        // Cerrar modales
        document.getElementById('closeChemistryModal').addEventListener('click', () => {
            document.getElementById('chemistryModal').classList.remove('active');
        });
        
        document.getElementById('closeCompareModal').addEventListener('click', () => {
            document.getElementById('compareModal').classList.remove('active');
        });
        
        // Cerrar modales al hacer clic fuera
        document.getElementById('chemistryModal').addEventListener('click', (e) => {
            if (e.target.id === 'chemistryModal') {
                document.getElementById('chemistryModal').classList.remove('active');
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
                document.getElementById('chemistryModal').classList.remove('active');
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
            if (!el.classList.contains('soap-type-card')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                observer.observe(el);
            }
        });
    }

    // Función para recorrido histórico interactivo
    function startHistoricalJourney() {
        const btn = document.getElementById('timelineJourneyBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando viaje histórico...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar modal de viaje
        showHistoricalJourneyModal();
        
        // Restaurar botón después de un tiempo
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
        }, 3000);
    }

    // Mostrar modal de viaje histórico
    function showHistoricalJourneyModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeJourneyModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-jabon-light);">
                    <i class="fas fa-map-marked-alt"></i> Viaje Histórico del Jabón
                </h2>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <p>Explora 5000 años de historia del jabón a través de las civilizaciones:</p>
                    </div>
                    
                    <div id="journeyTimeline" style="margin: 2rem 0;">
                        ${historicalPeriods.map((period, index) => `
                            <div class="journey-period" data-index="${index}" style="margin-bottom: 1.5rem; padding: 1rem; background: ${period.color}20; border-radius: 12px; border-left: 4px solid ${period.color}; cursor: pointer; transition: all 0.3s;">
                                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background: ${period.color}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 1rem;">
                                        ${index + 1}
                                    </div>
                                    <div>
                                        <h4 style="color: ${period.color}; margin: 0;">${period.year} - ${period.title}</h4>
                                        <p style="color: var(--text-secondary); margin: 0.3rem 0 0; font-size: 0.9rem;">${period.description}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="progress-container" style="margin: 2rem 0;">
                        <div class="progress-label">
                            <span>Progreso del viaje histórico</span>
                            <span>0%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="journeyProgress" style="width: 0%;"></div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
                        <button class="btn" id="startJourneyBtn" style="min-width: 200px;">
                            <i class="fas fa-play"></i> Iniciar Viaje
                        </button>
                        <button class="btn btn-secondary" id="fastForwardBtn" style="min-width: 200px;">
                            <i class="fas fa-forward"></i> Avance Rápido
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal
        document.getElementById('closeJourneyModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Iniciar viaje
        document.getElementById('startJourneyBtn').addEventListener('click', () => {
            startInteractiveJourney(modal);
        });
        
        // Avance rápido
        document.getElementById('fastForwardBtn').addEventListener('click', () => {
            fastForwardJourney(modal);
        });
        
        // Click en periodos
        document.querySelectorAll('.journey-period').forEach(period => {
            period.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showPeriodDetail(historicalPeriods[index]);
            });
        });
    }

    // Iniciar viaje interactivo
    function startInteractiveJourney(modal) {
        const startBtn = document.getElementById('startJourneyBtn');
        const fastForwardBtn = document.getElementById('fastForwardBtn');
        const progressBar = document.getElementById('journeyProgress');
        const progressLabel = document.querySelector('.progress-label span:last-child');
        
        startBtn.disabled = true;
        fastForwardBtn.disabled = true;
        startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Viajando en el tiempo...';
        
        let currentPeriod = 0;
        const totalPeriods = historicalPeriods.length;
        
        const journeyInterval = setInterval(() => {
            if (currentPeriod < totalPeriods) {
                // Destacar periodo actual
                const periodElement = document.querySelector(`.journey-period[data-index="${currentPeriod}"]`);
                periodElement.style.transform = 'scale(1.02)';
                periodElement.style.boxShadow = `0 5px 15px ${historicalPeriods[currentPeriod].color}40`;
                
                // Actualizar progreso
                const progress = ((currentPeriod + 1) / totalPeriods) * 100;
                progressBar.style.width = `${progress}%`;
                progressLabel.textContent = `${Math.round(progress)}%`;
                
                // Mostrar información del periodo
                if (currentPeriod > 0) {
                    const prevElement = document.querySelector(`.journey-period[data-index="${currentPeriod - 1}"]`);
                    prevElement.style.transform = 'scale(1)';
                    prevElement.style.boxShadow = 'none';
                }
                
                currentPeriod++;
            } else {
                clearInterval(journeyInterval);
                
                // Completar viaje
                progressBar.style.width = '100%';
                progressLabel.textContent = '100%';
                
                // Mostrar mensaje de completado
                setTimeout(() => {
                    startBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Viaje Completado!';
                    fastForwardBtn.style.display = 'none';
                    
                    // Mostrar resumen
                    showJourneySummary();
                }, 500);
            }
        }, 1500);
        
        // Guardar intervalo para poder limpiarlo
        modal.dataset.journeyInterval = journeyInterval;
    }

    // Avance rápido del viaje
    function fastForwardJourney(modal) {
        const progressBar = document.getElementById('journeyProgress');
        const progressLabel = document.querySelector('.progress-label span:last-child');
        
        // Completar inmediatamente
        progressBar.style.width = '100%';
        progressLabel.textContent = '100%';
        
        // Limpiar intervalo si existe
        if (modal.dataset.journeyInterval) {
            clearInterval(modal.dataset.journeyInterval);
        }
        
        // Mostrar resumen
        setTimeout(() => {
            showJourneySummary();
            
            const startBtn = document.getElementById('startJourneyBtn');
            const fastForwardBtn = document.getElementById('fastForwardBtn');
            
            startBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Viaje Completado!';
            startBtn.disabled = true;
            fastForwardBtn.style.display = 'none';
        }, 500);
    }

    // Mostrar resumen del viaje
    function showJourneySummary() {
        const summaryHTML = `
            <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(46, 204, 113, 0.1); border-radius: 12px; border: 1px solid rgba(46, 204, 113, 0.3);">
                <h4 style="color: var(--accent-jabon-light); margin-bottom: 1rem;">
                    <i class="fas fa-award"></i> Resumen del Viaje Histórico
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">Períodos explorados</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-jabon);">6</div>
                    </div>
                    <div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">Años cubiertos</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-jabon);">~5000</div>
                    </div>
                    <div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">Civilizaciones</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-jabon);">8+</div>
                    </div>
                    <div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">Inventos clave</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-jabon);">3</div>
                    </div>
                </div>
                <div class="code-container" style="margin: 0; font-size: 0.9rem;">
                    <span class="code-comment"># La evolución del jabón refleja el desarrollo de la civilización humana:</span><br>
                    <span class="code-keyword">1.</span> De producto de lujo a necesidad básica<br>
                    <span class="code-keyword">2.</span> De proceso artesanal a producción industrial<br>
                    <span class="code-keyword">3.</span> De limpieza corporal a herramienta de salud pública<br>
                    <span class="code-keyword">4.</span> Símbolo de progreso científico y social
                </div>
            </div>
        `;
        
        const journeyTimeline = document.getElementById('journeyTimeline');
        journeyTimeline.insertAdjacentHTML('afterend', summaryHTML);
    }

    // Mostrar detalle de periodo histórico
    function showPeriodDetail(period) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closePeriodModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div style="width: 60px; height: 60px; border-radius: 18px; background: ${period.color}; display: flex; align-items: center; justify-content: center; margin-right: 1rem; color: white; font-size: 1.5rem;">
                        <i class="fas fa-history"></i>
                    </div>
                    <div>
                        <h2 style="color: ${period.color};">${period.year} - ${period.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${period.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${period.color};">
                            <i class="fas fa-info-circle"></i> Contexto histórico:
                        </h4>
                        <p>${getPeriodDetails(period.title)}</p>
                    </div>
                    
                    <div style="margin-top: 1.5rem; padding: 1.5rem; background: ${period.color}10; border-radius: 12px;">
                        <h4 style="margin-bottom: 0.8rem; color: ${period.color};">
                            <i class="fas fa-flask"></i> Avances en fabricación de jabón:
                        </h4>
                        <ul class="feature-list">
                            ${getSoapAdvances(period.title).map(advance => `<li>${advance}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="recreateRecipeBtn" style="background: ${period.color}; min-width: 200px;">
                            <i class="fas fa-mortar-pestle"></i> Recrear Receta
                        </button>
                        <button class="btn btn-secondary" id="viewArtifactsBtn" style="min-width: 200px;">
                            <i class="fas fa-museum"></i> Ver Artefactos
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closePeriodModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('recreateRecipeBtn').addEventListener('click', () => {
            alert(`Recreando receta histórica de jabón de ${period.title}`);
            modal.remove();
        });
        
        document.getElementById('viewArtifactsBtn').addEventListener('click', () => {
            alert(`Mostrando artefactos históricos de ${period.title}`);
            modal.remove();
        });
    }

    // Obtener detalles del periodo
    function getPeriodDetails(periodTitle) {
        const details = {
            'Mesopotamia': 'En la antigua Mesopotamia, el jabón era una mezcla primitiva de cenizas y grasas utilizada principalmente para lavar textiles. Las tablillas de arcilla babilónicas mencionan recetas para limpiar lana.',
            'Egipto Antiguo': 'Los egipcios valoraban la limpieza personal y desarrollaron ungüentos similares al jabón utilizando aceites y sales alcalinas. Estos se usaban tanto para higiene como para tratar enfermedades de la piel.',
            'Fenicios': 'Los fenicios, grandes comerciantes del Mediterráneo, perfeccionaron la fabricación de jabón utilizando aceite de oliva y ceniza de algas marinas, estableciendo rutas comerciales para este producto.',
            'Imperio Romano': 'Aunque los romanos preferían baños de aceite y arena, adoptaron el jabón galo para teñir el cabello. Las termas romanas eventualmente incorporaron formas primitivas de jabón.',
            'Edad Media': 'Durante la Edad Media, la producción de jabón se mantuvo principalmente en monasterios. El jabón de Marsella comenzó a ganar reputación por su calidad excepcional.',
            'Revolución Industrial': 'La invención del proceso Leblanc permitió la producción masiva de sosa cáustica, revolucionando la fabricación de jabón y haciendo posible la higiene personal a gran escala.'
        };
        
        return details[periodTitle] || 'Información histórica detallada no disponible.';
    }

    // Obtener avances en fabricación
    function getSoapAdvances(periodTitle) {
        const advances = {
            'Mesopotamia': [
                'Primeras mezclas documentadas de ceniza y grasa',
                'Uso principal: limpieza de textiles y lana',
                'Proceso rudimentario sin medición precisa'
            ],
            'Egipto Antiguo': [
                'Mezclas con fines medicinales y cosméticos',
                'Uso de sales alcalinas naturales (natrón)',
                'Primeras aplicaciones para cuidado de la piel'
            ],
            'Fenicios': [
                'Perfeccionamiento con aceite de oliva',
                'Uso de ceniza de algas marinas como álcali',
                'Comercialización a gran escala'
            ],
            'Imperio Romano': [
                'Adopción del jabón galo para cosmética',
                'Primeras descripciones escritas detalladas',
                'Uso en baños públicos (termas)'
            ],
            'Edad Media': [
                'Producción especializada en Marsella',
                'Establecimiento de gremios de jaboneros',
                'Mejoras en procesos de curado'
            ],
            'Revolución Industrial': [
                'Proceso Leblanc para sosa cáustica industrial',
                'Producción masiva y estandarización',
                'Abaratamiento radical del producto final'
            ]
        };
        
        return advances[periodTitle] || ['Avances no documentados para este período'];
    }

    // Función para mostrar detalle de tipo de jabón
    function showSoapTypeDetail(soapType) {
        const recipes = {
            'Jabón de Alepo': [
                "70% aceite de oliva virgen extra",
                "30% aceite de laurel (Laurus nobilis)",
                "Hidróxido de sodio (sosa cáustica)",
                "Agua destilada",
                "Curado mínimo: 9 meses a la sombra"
            ],
            'Jabón de Marsella': [
                "72% mínimo de aceites vegetales (oliva, coco, palma)",
                "Agua de la región de Marsella",
                "Ceniza de plantas marinas (salicor)",
                "Hidróxido de sodio",
                "Curado: 2 semanas en moldes + 2 semanas secado"
            ],
            'Jabón de Castilla': [
                "100% aceite de oliva (nada más)",
                "Hidróxido de sodio",
                "Agua destilada",
                "Curado largo: 6-12 semanas",
                "PH final: 8-9 (ligeramente alcalino)"
            ],
            'Jabón Nabulsi': [
                "Aceite de oliva local palestino",
                "Hidróxido de sodio",
                "Agua de manantial local",
                "Hierbas medicinales opcionales",
                "Curado tradicional en cuevas"
            ],
            'Jabón Negro Africano': [
                "Ceniza de cáscaras de plátano o cacao",
                "Aceite de palma o de coco",
                "Agua de lluvia",
                "Hojas y hierbas medicinales",
                "Curado al sol durante semanas"
            ],
            'Jabón de Leche de Burra': [
                "Leche de burra fresca (no pasteurizada)",
                "Aceite de oliva o manteca de karité",
                "Hidróxido de sodio",
                "Miel natural (opcional)",
                "Curado: 4-6 semanas en lugar fresco"
            ]
        };
        
        const benefits = {
            'Jabón de Alepo': ['Antiséptico natural gracias al laurel', 'Ideal para pieles sensibles', 'Biodegradable 100%', 'Sin conservantes químicos'],
            'Jabón de Marsella': ['Multiusos (ropa, cuerpo, hogar)', 'Hipoalergénico', 'Biodegradable', 'Económico y duradero'],
            'Jabón de Castilla': ['Extremadamente suave', 'Hidratante natural', 'Vegano', 'Ideal para bebés y pieles atópicas'],
            'Jabón Nabulsi': ['Propiedades medicinales', 'Rico en antioxidantes', 'Tradición milenaria', 'Apoya economía local'],
            'Jabón Negro Africano': ['Exfoliante natural', 'Rico en vitaminas A y E', 'Tratamiento para acné', 'Balancea producción de sebo'],
            'Jabón de Leche de Burra': ['Alta concentración de vitaminas', 'Propiedades antienvejecimiento', 'Extremadamente hidratante', 'PH similar al de la piel']
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeSoapModal">&times;</button>
                <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div class="card-icon" style="background: ${soapType.color}; margin-right: 1rem;">
                        <i class="fas ${soapType.icon}"></i>
                    </div>
                    <div>
                        <h2 style="color: ${soapType.color};">${soapType.title}</h2>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem;">${soapType.description}</p>
                    </div>
                </div>
                <div class="modal-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 1.5rem;">
                        <div>
                            <h4 style="margin-bottom: 0.8rem; color: ${soapType.color};">
                                <i class="fas fa-list-ol"></i> Receta tradicional:
                            </h4>
                            <ul class="feature-list">
                                ${recipes[soapType.title]?.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <h4 style="margin-bottom: 0.8rem; color: ${soapType.color};">
                                <i class="fas fa-heart"></i> Beneficios:
                            </h4>
                            <ul class="feature-list">
                                ${benefits[soapType.title]?.map(benefit => `<li>${benefit}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="code-container" style="margin: 1.5rem 0;">
                        <span class="code-comment"># Datos históricos de ${soapType.title}:</span><br>
                        <span class="code-keyword">Origen:</span> ${getSoapOrigin(soapType.title)}<br>
                        <span class="code-keyword">Primera documentación:</span> ${getSoapFirstDoc(soapType.title)}<br>
                        <span class="code-keyword">Estado actual:</span> ${getSoapStatus(soapType.title)}<br>
                        <span class="code-keyword">Producción anual aproximada:</span> ${getSoapProduction(soapType.title)}
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="createSoapBtn" style="background: ${soapType.color}; min-width: 200px;">
                            <i class="fas fa-plus-circle"></i> Crear Receta Personalizada
                        </button>
                        <button class="btn btn-secondary" id="buyIngredientsBtn" style="min-width: 200px;">
                            <i class="fas fa-shopping-cart"></i> Comprar Ingredientes
                        </button>
                        <button class="btn btn-error" id="watchDemoBtn" style="min-width: 200px;">
                            <i class="fas fa-video"></i> Ver Demostración
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeSoapModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('createSoapBtn').addEventListener('click', () => {
            alert(`Creando receta personalizada de ${soapType.title}`);
            modal.remove();
        });
        
        document.getElementById('buyIngredientsBtn').addEventListener('click', () => {
            alert(`Redirigiendo a tienda de ingredientes para ${soapType.title}`);
            modal.remove();
        });
        
        document.getElementById('watchDemoBtn').addEventListener('click', () => {
            alert(`Reproduciendo demostración de fabricación de ${soapType.title}`);
            modal.remove();
        });
    }

    // Funciones auxiliares para información de jabones
    function getSoapOrigin(title) {
        const origins = {
            'Jabón de Alepo': 'Alepo, Siria (región histórica)',
            'Jabón de Marsella': 'Marsella, Francia (siglo XIV)',
            'Jabón de Castilla': 'Castilla, España (edad media)',
            'Jabón Nabulsi': 'Nablus, Palestina (tradición otomana)',
            'Jabón Negro Africano': 'África Occidental (tradición tribal)',
            'Jabón de Leche de Burra': 'Egipto Antiguo (Cleopatra)'
        };
        return origins[title] || 'Origen desconocido';
    }
    
    function getSoapFirstDoc(title) {
        const docs = {
            'Jabón de Alepo': 'Textos árabes del siglo VIII',
            'Jabón de Marsella': 'Registros franceses de 1370',
            'Jabón de Castilla': 'Documentos españoles del siglo XI',
            'Jabón Nabulsi': 'Registros otomanos del siglo XIV',
            'Jabón Negro Africano': 'Tradición oral centenaria',
            'Jabón de Leche de Burra': 'Textos egipcios antiguos'
        };
        return docs[title] || 'No documentado';
    }
    
    function getSoapStatus(title) {
        const statuses = {
            'Jabón de Alepo': 'Producción amenazada por conflictos',
            'Jabón de Marsella': 'Producción activa con denominación protegida',
            'Jabón de Castilla': 'Popular entre artesanos y pequeñas empresas',
            'Jabón Nabulsi': 'Tradición mantenida por familias palestinas',
            'Jabón Negro Africano': 'Exportación creciente como producto étnico',
            'Jabón de Leche de Burra': 'Producto de nicho en cosmética natural'
        };
        return statuses[title] || 'Estado desconocido';
    }
    
    function getSoapProduction(title) {
        const productions = {
            'Jabón de Alepo': '~500 toneladas anuales (antes de la guerra)',
            'Jabón de Marsella': '~20,000 toneladas anuales',
            'Jabón de Castilla': '~2,000 toneladas anuales (artesanal)',
            'Jabón Nabulsi': '~100 toneladas anuales (familiar)',
            'Jabón Negro Africano': '~500 toneladas anuales (creciendo)',
            'Jabón de Leche de Burra': '~50 toneladas anuales (alto valor)'
        };
        return productions[title] || 'Producción no cuantificada';
    }
});