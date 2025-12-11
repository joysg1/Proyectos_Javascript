document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const culturalData = [
        {
            icon: 'fa-monument',
            title: 'Antiguo Egipto',
            description: 'Mezclas de piedra pómez, cáscaras de huevo quemadas, mirra y uñas de buey.',
            color: '#f59e0b',
            examples: ['Piedra pómez', 'Cáscaras de huevo', 'Mirra', 'Cenizas']
        },
        {
            icon: 'fa-archway',
            title: 'Imperio Romano',
            description: 'Orina humana por su amoníaco, miel, sal y carbón vegetal para blanquear.',
            color: '#ef4444',
            examples: ['Orina humana', 'Miel', 'Sal marina', 'Carbón vegetal']
        },
        {
            icon: 'fa-kaaba',
            title: 'Mundo Árabe',
            description: 'Ramas de "siwak" (árbol arak) con propiedades antibacterianas naturales.',
            color: '#10b981',
            examples: ['Ramas de siwak', 'Salvia', 'Menta', 'Anís']
        },
        {
            icon: 'fa-crown',
            title: 'Edad Media Europea',
            description: 'Mezclas abrasivas con sal, pimienta, vinagre y polvo de ladrillo.',
            color: '#8b5cf6',
            examples: ['Sal y pimienta', 'Vinagre', 'Polvo de ladrillo', 'Cenizas']
        },
        {
            icon: 'fa-industry',
            title: 'Revolución Industrial',
            description: 'Primeras pastas comerciales con tiza, jabón y extractos de hierbas.',
            color: '#3b82f6',
            examples: ['Tiza', 'Jabón', 'Extractos herbales', 'Glicerina']
        },
        {
            icon: 'fa-microscope',
            title: 'Era Moderna',
            description: 'Fórmulas científicas con fluoruros, abrasivos controlados y nanotecnología.',
            color: '#2dd4bf',
            examples: ['Fluoruros', 'Sílice hidratada', 'Enzimas', 'Nanopartículas']
        }
    ];

    // Datos de fórmulas para el laboratorio virtual
    const formulaData = {
        silica: { name: 'Sílice hidratada', abrasion: 'Baja (RDA 70)', cleaning: 'Excelente', whitening: 'Buena' },
        calcium: { name: 'Carbonato de calcio', abrasion: 'Media (RDA 100)', cleaning: 'Excelente', whitening: 'Muy buena' },
        baking: { name: 'Bicarbonato de sodio', abrasion: 'Media (RDA 120)', cleaning: 'Buena', whitening: 'Excelente' },
        charcoal: { name: 'Carbón activado', abrasion: 'Alta (RDA 150)', cleaning: 'Excelente', whitening: 'Excelente' },
        pumice: { name: 'Piedra pómez', abrasion: 'Muy alta (RDA 250+)', cleaning: 'Excelente', whitening: 'Excelente' }
    };

    // Inicializar componentes
    initParticles();
    initCulturalCases();
    initEventListeners();
    initAnimations();
    initTimeline();
    initFormulaLab();

    // Función para inicializar partículas (burbujas de pasta dental)
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 80;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const size = Math.random() * 25 + 5;
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.3 + 0.1,
                    color: i % 3 === 0 ? `rgba(45, 212, 191, ${Math.random() * 0.4 + 0.1})` : 
                           i % 3 === 1 ? `rgba(244, 114, 182, ${Math.random() * 0.3 + 0.1})` :
                           `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo sutil
            ctx.fillStyle = 'rgba(10, 15, 26, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.pulse += 0.05;
                
                // Efecto de pulso
                const pulseSize = particle.size + Math.sin(particle.pulse) * 3;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Dibujar burbuja
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
                
                // Gradiente para efecto burbuja
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, pulseSize
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * 0.8})`);
                gradient.addColorStop(0.7, particle.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Destello
                if (Math.random() > 0.98) {
                    ctx.beginPath();
                    ctx.arc(particle.x - pulseSize/3, particle.y - pulseSize/3, pulseSize/4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.9})`;
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
    }

    // Función para inicializar casos culturales
    function initCulturalCases() {
        const container = document.getElementById('useCasesContainer');
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        culturalData.forEach(culture => {
            const card = document.createElement('div');
            card.className = 'card use-case-card';
            card.style.cursor = 'pointer';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.innerHTML = `
                <div class="card-header" style="border-bottom: none; margin-bottom: 1rem;">
                    <div class="card-icon" style="background: ${culture.color};">
                        <i class="fas ${culture.icon}"></i>
                    </div>
                    <h3 class="card-title" style="font-size: 1.5rem;">${culture.title}</h3>
                </div>
                <div class="card-content">
                    <p>${culture.description}</p>
                    <div style="margin-top: 1rem;">
                        ${culture.examples.map(example => `
                            <div class="component-badge" style="background: ${culture.color}20; color: ${culture.color}; border-color: ${culture.color}40;">${example}</div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 1rem; font-size: 0.95rem; color: var(--accent-light);">
                        <i class="fas fa-arrow-right"></i> Click para ver detalles históricos
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showCultureDetail(culture));
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

    // Función para inicializar laboratorio de fórmulas
    function initFormulaLab() {
        const abrasiveSelect = document.getElementById('abrasiveSelect');
        const createFormulaBtn = document.getElementById('createFormulaBtn');
        const resetFormulaBtn = document.getElementById('resetFormulaBtn');
        const autoOptimalBtn = document.getElementById('autoOptimalBtn');
        
        // Crear fórmula
        createFormulaBtn.addEventListener('click', function() {
            const abrasive = abrasiveSelect.value;
            const activeAgents = Array.from(document.querySelectorAll('input[name="activeAgent"]:checked')).map(cb => cb.value);
            const flavor = document.querySelector('input[name="flavor"]:checked').value;
            
            if (activeAgents.length === 0) {
                showFormulaResult('error', 'Debe seleccionar al menos un agente activo');
                return;
            }
            
            const formulaInfo = formulaData[abrasive];
            const formulaName = generateFormulaName(abrasive, activeAgents, flavor);
            
            const effectiveness = calculateEffectiveness(abrasive, activeAgents);
            
            const resultHtml = `
                <div style="text-align: center;">
                    <div style="font-size: 1.3rem; color: var(--accent-light); margin-bottom: 0.5rem;">
                        <i class="fas fa-vial"></i> ${formulaName}
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
                        <div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Abrasivo:</div>
                            <div style="color: var(--accent); font-weight: 600;">${formulaInfo.name}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Abrasividad:</div>
                            <div style="color: var(--warning); font-weight: 600;">${formulaInfo.abrasion}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Limpieza:</div>
                            <div style="color: var(--success); font-weight: 600;">${formulaInfo.cleaning}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; color: var(--text-muted);">Blanqueamiento:</div>
                            <div style="color: var(--info); font-weight: 600;">${formulaInfo.whitening}</div>
                        </div>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: rgba(45, 212, 191, 0.1); border-radius: 8px;">
                        <div style="font-size: 0.9rem; color: var(--text-muted);">Efectividad estimada:</div>
                        <div style="font-size: 2rem; color: var(--accent); font-weight: 800;">${effectiveness}%</div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">
                            Agentes activos: ${activeAgents.map(agent => getAgentName(agent)).join(', ')}
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">
                            Sabor: ${getFlavorName(flavor)}
                        </div>
                    </div>
                </div>
            `;
            
            showFormulaResult('success', resultHtml);
        });
        
        // Reiniciar formulario
        resetFormulaBtn.addEventListener('click', function() {
            abrasiveSelect.value = 'silica';
            document.querySelectorAll('input[name="activeAgent"]').forEach(cb => {
                cb.checked = cb.value === 'fluoride';
            });
            document.querySelector('input[name="flavor"][value="mint"]').checked = true;
            
            const formulaResult = document.getElementById('formulaResult');
            formulaResult.className = 'example-result';
            formulaResult.innerHTML = '<div class="result-text">Configure los ingredientes y cree su fórmula personalizada</div>';
        });
        
        // Autocompletar óptimo
        autoOptimalBtn.addEventListener('click', function() {
            abrasiveSelect.value = 'silica';
            document.querySelectorAll('input[name="activeAgent"]').forEach(cb => {
                cb.checked = ['fluoride', 'xylitol'].includes(cb.value);
            });
            document.querySelector('input[name="flavor"][value="mint"]').checked = true;
            
            const formulaResult = document.getElementById('formulaResult');
            formulaResult.className = 'example-result';
            formulaResult.innerHTML = `
                <div class="result-text">
                    <i class="fas fa-star" style="color: var(--warning); margin-right: 0.5rem;"></i>
                    Fórmula óptima cargada: Sílice + Fluoruro + Xilitol + Menta
                </div>
            `;
        });
    }

    // Función para generar nombre de fórmula
    function generateFormulaName(abrasive, activeAgents, flavor) {
        const abrasiveNames = {
            silica: 'Premium',
            calcium: 'Clásica',
            baking: 'Natural',
            charcoal: 'Blanqueadora',
            pumice: 'Intensa'
        };
        
        const agentNames = {
            fluoride: 'Protector',
            potassium: 'Sensitive',
            triclosan: 'Antibacterial',
            xylitol: 'CariesBlock'
        };
        
        const flavorNames = {
            mint: 'Menta Fresca',
            herbal: 'Hierbas Naturales',
            cinnamon: 'Canela Especiada',
            fruit: 'Frutal Delight'
        };
        
        const agentStr = activeAgents.map(a => agentNames[a]).join('+');
        return `${abrasiveNames[abrasive]} ${agentStr} ${flavorNames[flavor]}`;
    }

    // Función para calcular efectividad
    function calculateEffectiveness(abrasive, activeAgents) {
        let score = 70; // Base
        
        // Bonificación por abrasivo
        const abrasiveScores = {
            silica: 20,
            calcium: 15,
            baking: 10,
            charcoal: 15,
            pumice: 5  // Muy abrasivo, menos efectividad general
        };
        
        score += abrasiveScores[abrasive] || 0;
        
        // Bonificación por agentes activos
        activeAgents.forEach(agent => {
            const agentScores = {
                fluoride: 15,
                potassium: 10,
                triclosan: 8,
                xylitol: 12
            };
            score += agentScores[agent] || 0;
        });
        
        // Límite máximo
        return Math.min(score, 98);
    }

    // Función para obtener nombre de agente
    function getAgentName(agent) {
        const names = {
            fluoride: 'Fluoruro',
            potassium: 'Nitrato de potasio',
            triclosan: 'Triclosán',
            xylitol: 'Xilitol'
        };
        return names[agent] || agent;
    }

    // Función para obtener nombre de sabor
    function getFlavorName(flavor) {
        const names = {
            mint: 'Menta fresca',
            herbal: 'Hierbas naturales',
            cinnamon: 'Canela',
            fruit: 'Frutal'
        };
        return names[flavor] || flavor;
    }

    // Función para mostrar resultado de fórmula
    function showFormulaResult(type, content) {
        const formulaResult = document.getElementById('formulaResult');
        formulaResult.className = `example-result ${type}`;
        
        if (typeof content === 'string' && !content.includes('<')) {
            formulaResult.innerHTML = `<div class="result-text">${content}</div>`;
        } else {
            formulaResult.innerHTML = content;
        }
        
        formulaResult.classList.add(`${type}-flash`);
        
        // Remover animación después de que termine
        setTimeout(() => {
            formulaResult.classList.remove('success-flash', 'error-flash');
        }, 500);
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        simulateEvolutionBtn.addEventListener('click', simulateEvolution);
        
        // Botón de ingredientes
        const viewIngredientsBtn = document.getElementById('viewIngredientsBtn');
        viewIngredientsBtn.addEventListener('click', () => {
            document.getElementById('ingredientsModal').classList.add('active');
        });
        
        // Botón de comparación
        const compareFormulasBtn = document.getElementById('compareFormulasBtn');
        compareFormulasBtn.addEventListener('click', () => {
            document.getElementById('compareModal').classList.add('active');
        });
        
        // Cerrar modales
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('ingredientsModal').classList.remove('active');
        });
        
        document.getElementById('closeCompareModal').addEventListener('click', () => {
            document.getElementById('compareModal').classList.remove('active');
        });
        
        // Cerrar modales al hacer clic fuera
        document.getElementById('ingredientsModal').addEventListener('click', (e) => {
            if (e.target.id === 'ingredientsModal') {
                document.getElementById('ingredientsModal').classList.remove('active');
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
                document.getElementById('ingredientsModal').classList.remove('active');
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

    // Función para simulación de evolución
    function simulateEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando 5000 años de evolución...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "3000 a.C. - Egipcios usan piedra pómez...",
            "500 a.C. - Griegos agregan corales triturados...",
            "0 - Romanos descubren propiedades de la orina...",
            "1000 - Árabes popularizan el siwak...",
            "1780 - Primera pasta dental comercial...",
            "1873 - Colgate introduce el tubo plegable...",
            "1914 - Descubrimiento del fluoruro...",
            "1955 - Pastas fluoradas masificadas...",
            "1975 - Especialización: sensibilidad, blanqueamiento...",
            "2000 - Nanotecnología y biomateriales...",
            "¡Evolución completada!"
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${steps[step]}`;
                step++;
            }
        }, 800);
        
        // Simular evolución completa
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
            
            // Efecto visual en toda la página
            document.querySelectorAll('.card').forEach(card => {
                card.style.borderColor = 'var(--accent)';
                card.style.boxShadow = '0 0 40px rgba(45, 212, 191, 0.4)';
                
                setTimeout(() => {
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 3000);
            });
        }, 8800);
    }

    // Función para mostrar resultados de evolución
    function showEvolutionResults() {
        const results = [
            { type: 'Años de Evolución', count: '5000', color: '#f59e0b', icon: 'fa-hourglass' },
            { type: 'Ingredientes Testados', count: '1000+', color: '#ef4444', icon: 'fa-flask' },
            { type: 'Reducción Caries', count: '70%', color: '#10b981', icon: 'fa-tooth' },
            { type: 'Mejora Higiene', count: '95%', color: '#3b82f6', icon: 'fa-shower' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeResultsModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-chart-line"></i> Resultados de la Evolución del Dentífrico
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación de evolución histórica completada. Logros clave:</p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.95rem;">
                        <i class="fas fa-clock"></i> Período analizado: 5000 años | Civilizaciones: 15+ | Innovaciones: 100+
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
                    <span class="code-comment">// Innovaciones más importantes en la historia:</span><br>
                    <span class="code-keyword">1.</span> <span style="color: #f59e0b;">[3000 a.C.]</span> Primeros abrasivos naturales (piedra pómez, cenizas)<br>
                    <span class="code-keyword">2.</span> <span style="color: #3b82f6;">[1780]</span> Primera pasta dental comercial (William Addis)<br>
                    <span class="code-keyword">3.</span> <span style="color: #10b981;">[1914]</span> Descubrimiento del fluoruro (Frederick McKay)<br>
                    <span class="code-keyword">4.</span> <span style="color: #8b5cf6;">[1955]</span> Pastas fluoradas masificadas<br>
                    <span class="code-keyword">5.</span> <span style="color: #2dd4bf;">[2000]</span> Nanotecnología y fórmulas personalizadas<br>
                    <span class="code-comment">// Resultado: Esperanza de vida dental aumentada en 20+ años</span>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Progreso de innovación en higiene bucal</span>
                        <span>95%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 95%;"></div>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                    <button class="btn" id="viewTimelineBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-history"></i> Ver Línea de Tiempo Completa
                    </button>
                    <button class="btn btn-secondary" id="innovationMapBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-map-marked-alt"></i> Mapa de Innovaciones
                    </button>
                    <button class="btn btn-error" id="futureBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-robot"></i> Futuro del Dentífrico
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
        
        document.getElementById('viewTimelineBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo interactiva de 5000 años (simulación)');
            modal.remove();
        });
        
        document.getElementById('innovationMapBtn').addEventListener('click', () => {
            alert('Mostrando mapa global de innovaciones en higiene bucal (simulación)');
            modal.remove();
        });
        
        document.getElementById('futureBtn').addEventListener('click', () => {
            showFuturePredictions();
            modal.remove();
        });
    }

    // Función para mostrar predicciones futuras
    function showFuturePredictions() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeFutureModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-robot"></i> El Futuro del Dentífrico (2030-2050)
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Tendencias y predicciones basadas en investigación actual:</p>
                </div>
                <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
                    <div class="evolution-category modern">
                        <div class="category-title">
                            <i class="fas fa-dna"></i> Dentífricos Personalizados por Microbioma
                        </div>
                        <p>Análisis de saliva para fórmulas que equilibran la flora bucal específica de cada persona.</p>
                    </div>
                    <div class="evolution-category">
                        <div class="category-title">
                            <i class="fas fa-biohazard"></i> Reparación Biomimética
                        </div>
                        <p>Nanopartículas de hidroxiapatita que reconstruyen esmalte de forma idéntica al natural.</p>
                    </div>
                    <div class="evolution-category modern">
                        <div class="category-title">
                            <i class="fas fa-tablets"></i> Pastas Inteligentes con Sensores
                        </div>
                        <p>Microsensores que monitorean salud bucal y alertan sobre problemas antes de que sean visibles.</p>
                    </div>
                    <div class="evolution-category">
                        <div class="category-title">
                            <i class="fas fa-seedling"></i> Sustentabilidad Total
                        </div>
                        <p>Envases biodegradables y fórmulas con impacto ambiental cero.</p>
                    </div>
                </div>
                <div class="code-container" style="margin: 1.5rem 0;">
                    <span class="code-comment">// Predicción 2045: Dentífrico con IA integrada</span><br>
                    <span class="code-keyword">Características:</span><br>
                    &nbsp;&nbsp;• Análisis en tiempo real de salud bucal<br>
                    &nbsp;&nbsp;• Liberación programada de ingredientes activos<br>
                    &nbsp;&nbsp;• Conexión con dispositivos de salud digital<br>
                    &nbsp;&nbsp;• Ajuste automático según dieta y hábitos<br>
                    <span class="code-keyword">Beneficio:</span> Eliminación virtual de caries y enfermedades periodontales
                </div>
                <button class="btn" id="backToPresentBtn" style="width: 100%; margin-top: 1rem;">
                    <i class="fas fa-arrow-left"></i> Volver al Presente
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('closeFutureModal').addEventListener('click', () => {
            modal.remove();
        });
        
        document.getElementById('backToPresentBtn').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Función para mostrar detalle cultural
    function showCultureDetail(culture) {
        const details = {
            'Antiguo Egipto': [
                "Los egipcios fueron pioneros en higiene bucal desde el 3000 a.C.",
                "Usaban una mezcla de piedra pómez pulverizada, cáscaras de huevo quemadas y mirra",
                "Añadían uñas de buey y pezuñas de animales para abrasividad adicional",
                "Documentado en papiros médicos como el Ebers (1550 a.C.)",
                "También usaban ramitas del árbol Salvadora persica (precursor del cepillo)"
            ],
            'Imperio Romano': [
                "Los romanos usaban orina humana por su contenido de amoníaco como blanqueador",
                "Catullus y otros poetas romanos mencionan fórmulas dentales en sus escritos",
                "Mezclaban miel para adherir la pasta y dar sabor dulce",
                "El carbón vegetal era común para blanquear y desodorizar",
                "Los ricos usaban polvo de perlas y corales triturados"
            ],
            'Mundo Árabe': [
                "El Profeta Mahoma popularizó el uso del 'siwak' o 'miswak'",
                "Ramas del árbol arak (Salvadora persica) con propiedades antibacterianas naturales",
                "Contiene fluoruros naturales, vitamina C, taninos y sílice",
                "Aún usado hoy en día en países musulmanes, especialmente durante el Ramadán",
                "La OMS recomienda su uso donde no hay acceso a cepillos dentales modernos"
            ],
            'Edad Media Europea': [
                "Higiene dental considerada vanidad y a veces prohibida por la Iglesia",
                "Los barberos-cirujanos extraían dientes pero ofrecían pocas soluciones preventivas",
                "Mezclas abrasivas con sal marina, pimienta y vinagre eran comunes",
                "El polvo de ladrillo y cerámica se usaba para limpiar manchas",
                "Hierbas como salvia, romero y menta para refrescar el aliento"
            ],
            'Revolución Industrial': [
                "William Addis (1780) crea la primera pasta dental comercial en Inglaterra",
                "Vendida en frascos de cerámica con etiquetas impresas",
                "Fórmulas con tiza, ladrillo pulverizado y sal como abrasivos",
                "1873: Colgate introduce pasta dental en tarro de masa",
                "1892: Dr. Washington Sheffield inventa el tubo plegable de estaño"
            ],
            'Era Moderna': [
                "1914: Frederick McKay descubre que el fluoruro previene caries",
                "1945: Primeras pastas fluoradas introducidas en EE.UU.",
                "1960: Geles dentales y fórmulas con control de abrasividad (RDA)",
                "1980: Especialización: pastas para sensibilidad, blanqueadoras, etc.",
                "2000+: Nanotecnología, biomateriales y fórmulas personalizadas"
            ]
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeDetailModal">&times;</button>
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
                            <i class="fas fa-scroll"></i> Detalles históricos:
                        </h4>
                        <ul class="feature-list">
                            ${details[culture.title]?.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(30, 41, 59, 0.5); border-radius: 12px;">
                        <h4 style="margin-bottom: 0.8rem; color: ${culture.color};">
                            <i class="fas fa-chart-bar"></i> Impacto en salud bucal:
                        </h4>
                        <ul class="feature-list">
                            <li>Efectividad contra caries: ${culture.title === 'Era Moderna' ? '90%' : culture.title === 'Revolución Industrial' ? '30%' : '10-20%'}</li>
                            <li>Abrasividad dental: ${culture.title === 'Antiguo Egipto' ? 'Muy alta' : culture.title === 'Era Moderna' ? 'Controlada' : 'Alta'}</li>
                            <li>Disponibilidad: ${culture.title === 'Era Moderna' ? 'Global' : 'Élite/limitada'}</li>
                            <li>Base científica: ${culture.title === 'Era Moderna' ? 'Alta' : 'Empírica/tradicional'}</li>
                        </ul>
                    </div>
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="recreateFormulaBtn" style="background: ${culture.color}; min-width: 200px;">
                            <i class="fas fa-mortar-pestle"></i> Recrear Fórmula
                        </button>
                        <button class="btn btn-secondary" id="historicalContextBtn" style="min-width: 200px;">
                            <i class="fas fa-landmark"></i> Contexto Histórico
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
        
        document.getElementById('recreateFormulaBtn').addEventListener('click', () => {
            alert(`Recreando fórmula histórica de: ${culture.title}`);
            simulateFormulaRecreation(culture);
            modal.remove();
        });
        
        document.getElementById('historicalContextBtn').addEventListener('click', () => {
            alert(`Mostrando contexto histórico de ${culture.title} (simulación)`);
            modal.remove();
        });
    }

    // Función para simular recreación de fórmula
    function simulateFormulaRecreation(culture) {
        const steps = [
            "Recopilando ingredientes históricos...",
            "Preparando mortero y mano de mortero...",
            "Triturando ingredientes hasta polvo fino...",
            "Mezclando componentes en proporciones históricas...",
            "Añadiendo agentes aglutinantes naturales...",
            "Probando consistencia y textura...",
            "Envasando en recipiente histórico apropiado...",
            "¡Fórmula histórica recreada exitosamente!"
        ];
        
        let currentStep = 0;
        const modal = document.createElement('div');
        modal.className = 'modal active';
        
        function updateModal() {
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close" id="closeRecreationModal">&times;</button>
                    <h2 style="margin-bottom: 1.5rem; color: ${culture.color};">
                        <i class="fas fa-mortar-pestle"></i> Recreando Fórmula Histórica
                    </h2>
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <div class="card-icon" style="margin: 0 auto 1.5rem; background: ${culture.color}; width: 100px; height: 100px;">
                            <i class="fas ${culture.icon}"></i>
                        </div>
                        <h3 style="color: ${culture.color}; margin-bottom: 0.5rem;">${culture.title}</h3>
                        <p style="color: var(--text-secondary);">${culture.description}</p>
                    </div>
                    <div style="background: rgba(30, 41, 59, 0.5); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="color: var(--text-secondary);">Progreso:</span>
                            <span style="color: ${culture.color};">${Math.round((currentStep + 1) / steps.length * 100)}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(currentStep + 1) / steps.length * 100}%; background: ${culture.color};"></div>
                        </div>
                    </div>
                    <div style="text-align: center; padding: 1.5rem; background: rgba(${parseInt(culture.color.slice(1,3), 16)}, ${parseInt(culture.color.slice(3,5), 16)}, ${parseInt(culture.color.slice(5,7), 16)}, 0.1); border-radius: 12px;">
                        <div style="font-size: 1.1rem; color: ${culture.color}; margin-bottom: 0.5rem;">
                            <i class="fas fa-cog fa-spin"></i> ${steps[currentStep]}
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">
                            Paso ${currentStep + 1} de ${steps.length}
                        </div>
                    </div>
                    ${currentStep < steps.length - 1 ? `
                        <div style="text-align: center; margin-top: 1.5rem;">
                            <button class="btn btn-secondary" id="nextStepBtn" style="background: ${culture.color};">
                                <i class="fas fa-forward"></i> Siguiente Paso
                            </button>
                        </div>
                    ` : `
                        <div style="text-align: center; margin-top: 1.5rem;">
                            <button class="btn" id="finishRecreationBtn" style="background: ${culture.color};">
                                <i class="fas fa-check-circle"></i> Ver Resultado Final
                            </button>
                        </div>
                    `}
                </div>
            `;
            
            // Re-asignar event listeners
            if (currentStep < steps.length - 1) {
                setTimeout(() => {
                    const nextBtn = document.getElementById('nextStepBtn');
                    if (nextBtn) nextBtn.addEventListener('click', () => {
                        currentStep++;
                        updateModal();
                    });
                }, 100);
            } else {
                setTimeout(() => {
                    const finishBtn = document.getElementById('finishRecreationBtn');
                    if (finishBtn) finishBtn.addEventListener('click', showRecreationResult);
                }, 100);
            }
            
            const closeBtn = document.getElementById('closeRecreationModal');
            if (closeBtn) closeBtn.addEventListener('click', () => modal.remove());
        }
        
        function showRecreationResult() {
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close" id="closeResultModal">&times;</button>
                    <div style="text-align: center;">
                        <div class="card-icon" style="margin: 0 auto 1.5rem; background: ${culture.color}; width: 100px; height: 100px;">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <h2 style="color: ${culture.color}; margin-bottom: 1rem;">
                            <i class="fas fa-check-circle"></i> ¡Fórmula Recreada Exitosamente!
                        </h2>
                        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                            Ha recreado una fórmula histórica de dentífrico de ${culture.title}
                        </p>
                        <div style="background: rgba(30, 41, 59, 0.5); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
                            <h4 style="color: ${culture.color}; margin-bottom: 1rem;">Composición recreada:</h4>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; text-align: left;">
                                ${culture.examples.map((ingredient, i) => `
                                    <div style="padding: 0.5rem; background: rgba(${parseInt(culture.color.slice(1,3), 16)}, ${parseInt(culture.color.slice(3,5), 16)}, ${parseInt(culture.color.slice(5,7), 16)}, 0.1); border-radius: 8px;">
                                        <div style="font-size: 0.9rem; color: var(--text-muted);">Ingrediente ${i+1}:</div>
                                        <div style="color: ${culture.color}; font-weight: 600;">${ingredient}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                            <i class="fas fa-lightbulb"></i> Esta fórmula histórica muestra cómo las civilizaciones antiguas abordaban la higiene bucal con los recursos disponibles.
                        </div>
                        <button class="btn" id="compareModernBtn" style="background: ${culture.color}; width: 100%;">
                            <i class="fas fa-balance-scale"></i> Comparar con Fórmula Moderna
                        </button>
                    </div>
                </div>
            `;
            
            document.getElementById('closeResultModal').addEventListener('click', () => modal.remove());
            document.getElementById('compareModernBtn').addEventListener('click', () => {
                modal.remove();
                document.getElementById('compareModal').classList.add('active');
            });
        }
        
        document.body.appendChild(modal);
        updateModal();
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
});