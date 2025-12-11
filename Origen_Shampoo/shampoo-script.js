document.addEventListener('DOMContentLoaded', function() {
    // Datos iniciales
    const cultureCasesData = [
        {
            icon: 'fa-gem',
            title: 'India Antigua',
            description: 'Cuna del shampoo con el uso de Reetha (fruto del árbol del jabón), Amla, Shikakai y hierbas ayurvédicas.',
            color: '#fbbf24',
            examples: ['Reetha (Sapindus mukorossi)', 'Amla (Emblica officinalis)', 'Shikakai (Acacia concinna)', 'Neem', 'Henna']
        },
        {
            icon: 'fa-crown',
            title: 'Antiguo Egipto',
            description: 'Uso de aceites aromáticos, sales del Nilo y natrón (carbonato de sodio natural) para limpieza capilar.',
            color: '#f59e0b',
            examples: ['Aceite de ricino', 'Natrón', 'Aceites esenciales', 'Grasas animales', 'Sales del Nilo']
        },
        {
            icon: 'fa-helmet-battle',
            title: 'Roma Imperial',
            description: 'Baños públicos con aceites perfumados, cenizas de plantas y primeros jabones de sebo y ceniza.',
            color: '#dc2626',
            examples: ['Aceite de oliva', 'Ceniza de haya', 'Grasa de cabra', 'Aromas de lavanda', 'Rosas']
        },
        {
            icon: 'fa-dragon',
            title: 'China Imperial',
            description: 'Infusiones de ginseng, té verde y extractos de plantas medicinales para fortalecer el cabello.',
            color: '#ef4444',
            examples: ['Ginseng', 'Té verde', 'Extracto de durazno', 'Aloe vera', 'Jengibre']
        },
        {
            icon: 'fa-feather-alt',
            title: 'Pueblos Nativos Americanos',
            description: 'Uso de plantas nativas como la yuca, la salvia y el romero silvestre para limpieza capilar.',
            color: '#84cc16',
            examples: ['Raíz de yuca', 'Salvia blanca', 'Romero silvestre', 'Cedar', 'Sweetgrass']
        },
        {
            icon: 'fa-vihara',
            title: 'Japón Tradicional',
            description: 'Tsubaki (aceite de camelia) y extractos de arroz para cabello largo y brillante en geishas y samuráis.',
            color: '#ef4444',
            examples: ['Aceite de camelia', 'Agua de arroz', 'Algas kombu', 'Té matcha', 'Sakura']
        }
    ];

    const historicalIngredients = {
        ancient: [
            {name: "Reetha (fruto del jabón)", type: "natural", effect: "Limpieza suave"},
            {name: "Amla", type: "natural", effect: "Fortalecedor"},
            {name: "Shikakai", type: "natural", effect: "Acondicionador"},
            {name: "Cenizas de plantas", type: "natural", effect: "Limpiador alcalino"},
            {name: "Arcilla", type: "natural", effect: "Purificante"}
        ],
        middle: [
            {name: "Jabón de sebo", type: "natural", effect: "Limpieza básica"},
            {name: "Aceite de oliva", type: "natural", effect: "Hidratante"},
            {name: "Vinagre de vino", type: "natural", effect: "Acondicionador ácido"},
            {name: "Hierbas aromáticas", type: "natural", effect: "Fragancia"},
            {name: "Clara de huevo", type: "natural", effect: "Espesante"}
        ],
        colonial: [
            {name: "Jabón de Marsella", type: "natural", effect: "Limpieza mejorada"},
            {name: "Aceites esenciales", type: "modern", effect: "Aromaterapia"},
            {name: "Glicerina", type: "modern", effect: "Humectante"},
            {name: "Alcohol", type: "modern", effect: "Conservante"},
            {name: "Agua de rosas", type: "natural", effect: "Tónico"}
        ],
        industrial: [
            {name: "Sodium Lauryl Sulfate", type: "modern", effect: "Tensioactivo potente"},
            {name: "Parabenos", type: "modern", effect: "Conservante"},
            {name: "Colorantes artificiales", type: "modern", effect: "Apariencia"},
            {name: "Fragancias sintéticas", type: "modern", effect: "Aroma"},
            {name: "Glicol", type: "modern", effect: "Espesante"}
        ],
        modern: [
            {name: "Sodium Laureth Sulfate", type: "modern", effect: "Tensioactivo suave"},
            {name: "Cocamidopropyl Betaine", type: "modern", effect: "Tensioactivo secundario"},
            {name: "Dimethicone", type: "modern", effect: "Acondicionador"},
            {name: "Panthenol", type: "modern", effect: "Hidratante"},
            {name: "Keratina hidrolizada", type: "modern", effect: "Reparador"}
        ],
        contemporary: [
            {name: "Tensioactivos de coco", type: "natural", effect: "Limpieza suave"},
            {name: "Aceites esenciales orgánicos", type: "natural", effect: "Aromaterapia"},
            {name: "Extractos botánicos", type: "natural", effect: "Beneficios activos"},
            {name: "Conservantes naturales", type: "natural", effect: "Seguridad"},
            {name: "Biotecnología", type: "modern", effect: "Ingredientes avanzados"}
        ]
    };

    const evolutionTreeData = [
        {
            era: "Antigüedad (2000 a.C. - 500 d.C.)",
            key: "ancient",
            color: "#fbbf24",
            innovations: ["Reetha (India)", "Aceites (Egipto)", "Cenizas (Roma)"],
            next: ["middle"]
        },
        {
            era: "Edad Media (500 - 1500)",
            key: "middle",
            color: "#f59e0b",
            innovations: ["Jabón de sebo", "Vinagre acondicionador", "Hierbas medicinales"],
            next: ["colonial"]
        },
        {
            era: "Era Colonial (1500 - 1800)",
            key: "colonial",
            color: "#dc2626",
            innovations: ["Jabón de Marsella", "Primeros salones", "Aceites esenciales"],
            next: ["industrial"]
        },
        {
            era: "Revolución Industrial (1800 - 1900)",
            key: "industrial",
            color: "#ef4444",
            innovations: ["Primeros SLS", "Producción en masa", "Embalaje comercial"],
            next: ["modern", "back_to_nature"]
        },
        {
            era: "Era Moderna (1900 - 2000)",
            key: "modern",
            color: "#4cc9f0",
            innovations: ["pH balanceado", "Shampoos especializados", "Siliconas"],
            next: ["contemporary"]
        },
        {
            era: "Regreso a lo Natural (1970 - presente)",
            key: "back_to_nature",
            color: "#4ade80",
            innovations: ["Ingredientes orgánicos", "Sin sulfatos", "Eco-friendly"],
            next: ["contemporary"]
        },
        {
            era: "Contemporáneo (2000 - presente)",
            key: "contemporary",
            color: "#7209b7",
            innovations: ["Personalización", "Biotecnología", "Sostenibilidad total"],
            next: []
        }
    ];

    // Inicializar componentes
    initParticles();
    initCultureCases();
    initEventListeners();
    initAnimations();
    initTimeline();
    initFormulationSimulator();
    createBubbles();

    // Función para inicializar partículas
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
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
                const type = i % 4;
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 4 + 1,
                    speedX: (Math.random() - 0.5) * 0.8,
                    speedY: (Math.random() - 0.5) * 0.8,
                    color: type === 0 ? `rgba(76, 201, 240, ${Math.random() * 0.3 + 0.1})` : 
                           type === 1 ? `rgba(247, 37, 133, ${Math.random() * 0.3 + 0.1})` :
                           type === 2 ? `rgba(74, 222, 128, ${Math.random() * 0.3 + 0.1})` :
                           `rgba(251, 191, 36, ${Math.random() * 0.3 + 0.1})`
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
                
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Efecto de brillo
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

    // Función para crear burbujas decorativas
    function createBubbles() {
        const container = document.querySelector('body');
        const bubbleCount = 15;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Posición aleatoria
            const size = Math.random() * 60 + 20;
            const left = Math.random() * 100;
            const delay = Math.random() * 10;
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.bottom = `-${size}px`;
            bubble.style.animationDelay = `${delay}s`;
            
            // Opacidad aleatoria
            bubble.style.opacity = Math.random() * 0.4 + 0.1;
            
            container.appendChild(bubble);
        }
    }

    // Función para inicializar casos culturales
    function initCultureCases() {
        const container = document.getElementById('cultureCasesContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'main-grid';
        grid.style.marginTop = '1.5rem';
        
        cultureCasesData.forEach(culture => {
            const card = document.createElement('div');
            card.className = 'card culture-case-card';
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
                    <div style="margin-top: 1rem; font-size: 0.95rem; color: ${culture.color};">
                        <i class="fas fa-history"></i> Haz clic para explorar métodos de preparación
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => showCultureDetail(culture));
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
        
        // Animar entrada de tarjetas
        setTimeout(() => {
            document.querySelectorAll('.culture-case-card').forEach((card, index) => {
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

    // Función para inicializar simulador de formulación
    function initFormulationSimulator() {
        const eraSelect = document.getElementById('eraSelect');
        const ingredientsList = document.getElementById('ingredientsList');
        const formulateBtn = document.getElementById('formulateBtn');
        const resetBtn = document.getElementById('resetSimulatorBtn');
        const autoOptimizeBtn = document.getElementById('autoOptimizeBtn');
        
        if (!eraSelect || !ingredientsList) return;
        
        // Actualizar ingredientes al cambiar época
        eraSelect.addEventListener('change', function() {
            updateIngredientsList(this.value);
        });
        
        // Inicializar con primera época
        updateIngredientsList(eraSelect.value);
        
        // Crear formulación
        formulateBtn.addEventListener('click', function() {
            const era = eraSelect.value;
            const hairType = document.querySelector('input[name="hairType"]:checked').value;
            createFormulation(era, hairType);
        });
        
        // Reiniciar simulador
        resetBtn.addEventListener('click', function() {
            eraSelect.value = 'ancient';
            document.querySelector('input[name="hairType"][value="normal"]').checked = true;
            updateIngredientsList('ancient');
            
            const formResult = document.getElementById('formulationResult');
            formResult.className = 'example-result';
            formResult.innerHTML = '<div class="result-text">Selecciona un período y tipo de cabello para formular tu shampoo histórico</div>';
        });
        
        // Optimizar con conocimiento moderno
        autoOptimizeBtn.addEventListener('click', function() {
            const era = eraSelect.value;
            const hairType = document.querySelector('input[name="hairType"]:checked').value;
            optimizeFormulation(era, hairType);
        });
    }

    // Función para actualizar lista de ingredientes
    function updateIngredientsList(era) {
        const ingredientsList = document.getElementById('ingredientsList');
        if (!ingredientsList) return;
        
        const ingredients = historicalIngredients[era] || [];
        
        ingredientsList.innerHTML = ingredients.map(ing => `
            <div class="ingredient-chip ${ing.type}">
                <i class="fas fa-${ing.type === 'natural' ? 'leaf' : 'vial'}"></i>
                ${ing.name} <span style="opacity: 0.7; font-size: 0.85rem;">(${ing.effect})</span>
            </div>
        `).join('');
    }

    // Función para crear formulación
    function createFormulation(era, hairType) {
        const formResult = document.getElementById('formulationResult');
        const ingredients = historicalIngredients[era] || [];
        
        // Seleccionar 3-4 ingredientes aleatorios
        const selectedIngredients = [];
        const count = Math.min(4, Math.floor(Math.random() * 2) + 3);
        
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * ingredients.length);
            if (!selectedIngredients.includes(ingredients[randomIndex])) {
                selectedIngredients.push(ingredients[randomIndex]);
            }
        }
        
        // Calcular efectividad basada en era y tipo de cabello
        let effectiveness = 50;
        let sustainability = 80;
        
        if (era === 'ancient' || era === 'middle') {
            effectiveness = 40 + Math.random() * 20;
            sustainability = 90 + Math.random() * 10;
        } else if (era === 'colonial' || era === 'industrial') {
            effectiveness = 60 + Math.random() * 20;
            sustainability = 50 + Math.random() * 20;
        } else if (era === 'modern') {
            effectiveness = 80 + Math.random() * 15;
            sustainability = 40 + Math.random() * 20;
        } else if (era === 'contemporary') {
            effectiveness = 85 + Math.random() * 10;
            sustainability = 70 + Math.random() * 20;
        }
        
        // Ajustar por tipo de cabello
        if (hairType === 'oily') effectiveness *= 1.1;
        if (hairType === 'dry') effectiveness *= 0.9;
        if (hairType === 'dyed') effectiveness *= 0.85;
        
        effectiveness = Math.min(95, Math.round(effectiveness));
        
        // Mostrar resultado
        const eraNames = {
            ancient: 'Antigüedad',
            middle: 'Edad Media',
            colonial: 'Era Colonial',
            industrial: 'Revolución Industrial',
            modern: 'Era Moderna',
            contemporary: 'Contemporáneo'
        };
        
        const hairTypeNames = {
            normal: 'Normal',
            oily: 'Graso',
            dry: 'Seco',
            dyed: 'Teñido'
        };
        
        formResult.className = 'example-result historic';
        formResult.innerHTML = `
            <div style="width: 100%;">
                <div class="result-text" style="margin-bottom: 1rem;">
                    <i class="fas fa-mortar-pestle" style="color: var(--accent-historic); margin-right: 0.5rem;"></i>
                    <strong>Formulación ${eraNames[era]} para cabello ${hairTypeNames[hairType]}</strong>
                </div>
                
                <div class="formula-display">
                    <div style="margin-bottom: 0.5rem; color: var(--accent-light);">
                        <i class="fas fa-list"></i> Ingredientes principales:
                    </div>
                    ${selectedIngredients.map((ing, idx) => `
                        <div class="formula-ingredient">
                            <span>${ing.name}</span>
                            <span style="color: ${ing.type === 'natural' ? 'var(--accent-natural)' : 'var(--accent-secondary)'}; font-size: 0.9rem;">
                                ${ing.effect}
                            </span>
                        </div>
                    `).join('')}
                    
                    <div style="margin-top: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Efectividad:</div>
                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--accent-historic);">${effectiveness}%</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Sostenibilidad:</div>
                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--accent-natural);">${sustainability}%</div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                    <i class="fas fa-lightbulb"></i> ${getFormulationTip(era, hairType)}
                </div>
            </div>
        `;
        
        formResult.classList.add('natural-flash');
        
        // Remover animación después de que termine
        setTimeout(() => {
            formResult.classList.remove('natural-flash');
        }, 500);
    }

    // Función para optimizar formulación
    function optimizeFormulation(era, hairType) {
        const formResult = document.getElementById('formulationResult');
        
        // Mostrar mensaje de optimización
        formResult.className = 'example-result';
        formResult.innerHTML = `
            <div style="text-align: center;">
                <div class="result-text" style="margin-bottom: 1rem;">
                    <i class="fas fa-cogs fa-spin" style="color: var(--accent-light); margin-right: 0.5rem;"></i>
                    <strong>Aplicando conocimiento científico moderno...</strong>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.9rem;">
                    Combinando sabiduría tradicional con química avanzada
                </div>
            </div>
        `;
        
        // Simular proceso de optimización
        setTimeout(() => {
            const eraNames = {
                ancient: 'Antigüedad',
                middle: 'Edad Media',
                colonial: 'Era Colonial',
                industrial: 'Revolución Industrial',
                modern: 'Era Moderna',
                contemporary: 'Contemporáneo'
            };
            
            const hairTypeNames = {
                normal: 'Normal',
                oily: 'Graso',
                dry: 'Seco',
                dyed: 'Teñido'
            };
            
            // Calcular mejora
            let improvement = 0;
            if (era === 'ancient' || era === 'middle') improvement = 40;
            else if (era === 'colonial' || era === 'industrial') improvement = 25;
            else if (era === 'modern') improvement = 10;
            else improvement = 5;
            
            formResult.className = 'example-result success';
            formResult.innerHTML = `
                <div style="width: 100%;">
                    <div class="result-text" style="margin-bottom: 1rem;">
                        <i class="fas fa-check-circle" style="color: var(--success); margin-right: 0.5rem;"></i>
                        <strong>Formulación ${eraNames[era]} optimizada para cabello ${hairTypeNames[hairType]}</strong>
                    </div>
                    
                    <div style="background: rgba(74, 222, 128, 0.1); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <i class="fas fa-chart-line" style="color: var(--success);"></i>
                            <span style="font-weight: 600;">Mejora aplicada: +${improvement}% efectividad</span>
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">
                            Se han añadido tensioactivos suaves, acondicionadores modernos y ajustado el pH a 5.5
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div style="text-align: center;">
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Antes</div>
                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--accent-historic);">65%</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Después</div>
                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--success);">${65 + improvement}%</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary); text-align: center;">
                        <i class="fas fa-flask"></i> La ciencia mejora la tradición sin perder la esencia
                    </div>
                </div>
            `;
            
            formResult.classList.add('success-flash');
            
            // Remover animación después de que termine
            setTimeout(() => {
                formResult.classList.remove('success-flash');
            }, 500);
        }, 1500);
    }

    // Función para obtener consejo de formulación
    function getFormulationTip(era, hairType) {
        const tips = {
            ancient: "En la antigüedad, las fórmulas se preparaban frescas cada vez. Para cabello graso, añade más Reetha; para cabello seco, más aceite de amla.",
            middle: "En la Edad Media, el vinagre se usaba como acondicionador después del lavado. Calienta ligeramente los ingredientes para mejor integración.",
            colonial: "La Era Colonial introdujo los aceites esenciales. Mezcla bien los ingredientes y déjalos macerar por 24 horas antes de usar.",
            industrial: "La Revolución Industrial trajo los primeros tensioactivos. Agita bien antes de usar y no dejes la fórmula por más de una semana.",
            modern: "En la Era Moderna se estandarizaron los pH. Usa papel indicador para verificar el pH (ideal: 5.5) y ajusta con ácido cítrico si es necesario.",
            contemporary: "Hoy combinamos lo mejor de ambos mundos. Usa ingredientes orgánicos certificados y prueba en una pequeña área antes de uso completo."
        };
        
        return tips[era] || "Mezcla los ingredientes en un recipiente de vidrio y almacena en lugar fresco y oscuro.";
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        // Botón de simulación de evolución
        const evolutionSimBtn = document.getElementById('evolutionSimBtn');
        if (evolutionSimBtn) {
            evolutionSimBtn.addEventListener('click', simulateEvolutionProcess);
        }
        
        // Botón de química
        const viewChemistryBtn = document.getElementById('viewChemistryBtn');
        if (viewChemistryBtn) {
            viewChemistryBtn.addEventListener('click', () => {
                document.getElementById('chemistryModal').classList.add('active');
            });
        }
        
        // Botón de comparación de eras
        const compareErasBtn = document.getElementById('compareErasBtn');
        if (compareErasBtn) {
            compareErasBtn.addEventListener('click', () => {
                document.getElementById('compareErasModal').classList.add('active');
            });
        }
        
        // Cerrar modales
        const closeButtons = [
            {id: 'closeChemistryModal', modal: 'chemistryModal'},
            {id: 'closeCompareErasModal', modal: 'compareErasModal'},
            {id: 'closeEvolutionModal', modal: 'evolutionModal'}
        ];
        
        closeButtons.forEach(btn => {
            const element = document.getElementById(btn.id);
            if (element) {
                element.addEventListener('click', () => {
                    document.getElementById(btn.modal).classList.remove('active');
                });
            }
        });
        
        // Cerrar modales al hacer clic fuera
        const modals = ['chemistryModal', 'compareErasModal', 'evolutionModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target.id === modalId) {
                        modal.classList.remove('active');
                    }
                });
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modals.forEach(modalId => {
                    const modal = document.getElementById(modalId);
                    if (modal) modal.classList.remove('active');
                });
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
            if (!el.classList.contains('culture-case-card')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                observer.observe(el);
            }
        });
    }

    // Función para simulación de proceso evolutivo
    function simulateEvolutionProcess() {
        const btn = document.getElementById('evolutionSimBtn');
        if (!btn) return;
        
        const originalHTML = btn.innerHTML;
        const originalClass = btn.className;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando 4,000 años de evolución...';
        btn.className = 'btn pulse-animation';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "2000 a.C. - India Antigua: Reetha y hierbas ayurvédicas...",
            "500 d.C. - Edad Media: Jabones de sebo y vinagre...",
            "1500 - Era Colonial: Primeros salones y aceites esenciales...",
            "1800 - Revolución Industrial: Producción en masa, primeros SLS...",
            "1900 - Era Moderna: pH balanceado, especialización...",
            "1970 - Movimiento Natural: Regreso a ingredientes orgánicos...",
            "2000 - Contemporáneo: Biotecnología y personalización...",
            "¡Evolución completada!"
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
            showEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.className = originalClass;
            btn.disabled = false;
            
            // Efecto visual en toda la página
            document.querySelectorAll('.card').forEach(card => {
                card.style.borderColor = 'var(--accent-historic)';
                card.style.boxShadow = '0 0 40px rgba(251, 191, 36, 0.4)';
                
                setTimeout(() => {
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 3000);
            });
        }, 6400);
    }

    // Función para mostrar resultados de evolución
    function showEvolutionResults() {
        const results = [
            { type: 'Años de Historia', count: '4000+', color: '#fbbf24', icon: 'fa-history' },
            { type: 'Ingredientes Documentados', count: '200+', color: '#4cc9f0', icon: 'fa-leaf' },
            { type: 'Fórmulas Desarrolladas', count: '5,000+', color: '#f72585', icon: 'fa-flask' },
            { type: 'Mejora en Efectividad', count: '125%', color: '#4ade80', icon: 'fa-chart-line' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'evolutionResultsModal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeEvolutionResultsModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: var(--accent-light);">
                    <i class="fas fa-road"></i> Viaje Evolutivo del Shampoo
                </h2>
                <div style="margin-bottom: 1.5rem;">
                    <p>Simulación de 4,000 años de innovación en cuidado capilar completada exitosamente.</p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.95rem;">
                        <i class="fas fa-hourglass-half"></i> Período simulado: 2000 a.C. - 2024 d.C. | Civilizaciones analizadas: 12+
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
                
                <div style="margin: 2rem 0;">
                    <h4 style="margin-bottom: 1rem; color: var(--accent-light);">
                        <i class="fas fa-sitemap"></i> Principales hitos evolutivos:
                    </h4>
                    <div class="code-container">
                        <span class="code-comment">// Línea de tiempo de innovación clave:</span><br>
                        <span class="code-keyword">1.</span> <span style="color: #fbbf24;">[2000 a.C.]</span> Descubrimiento del Reetha en India<br>
                        <span class="code-keyword">2.</span> <span style="color: #f59e0b;">[1814]</span> Primer salón comercial en Brighton<br>
                        <span class="code-keyword">3.</span> <span style="color: #dc2626;">[1927]</span> Primer shampoo líquido en polvo (Schwarzkopf)<br>
                        <span class="code-keyword">4.</span> <span style="color: #4cc9f0;">[1930]</span> Primer shampoo con pH balanceado (Breck)<br>
                        <span class="code-keyword">5.</span> <span style="color: #f72585;">[1970]</span> Especialización por tipo de cabello<br>
                        <span class="code-keyword">6.</span> <span style="color: #4ade80;">[1990]</span> Movimiento hacia ingredientes naturales<br>
                        <span class="code-keyword">7.</span> <span style="color: #7209b7;">[2020]</span> Personalización basada en ADN
                    </div>
                </div>
                
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Progreso evolutivo (eficiencia de limpieza)</span>
                        <span>92%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 92%;"></div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; justify-content: center;">
                    <button class="btn" id="viewTimelineBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-timeline"></i> Ver Línea de Tiempo Interactiva
                    </button>
                    <button class="btn btn-natural" id="exploreTraditionalBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-seedling"></i> Explorar Métodos Tradicionales
                    </button>
                    <button class="btn btn-error" id="futureTrendsBtn" style="flex: 1; min-width: 200px;">
                        <i class="fas fa-crystal-ball"></i> Tendencias Futuras
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal de resultados
        document.getElementById('closeEvolutionResultsModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('viewTimelineBtn').addEventListener('click', () => {
            alert('Mostrando línea de tiempo interactiva de 4,000 años (simulación)');
            modal.remove();
        });
        
        document.getElementById('exploreTraditionalBtn').addEventListener('click', () => {
            alert('Explorando 15 métodos tradicionales de 8 culturas diferentes (simulación)');
            modal.remove();
        });
        
        document.getElementById('futureTrendsBtn').addEventListener('click', () => {
            alert('Analizando 5 tendencias futuras: shampoos inteligentes, personalización por microbiota, etc. (simulación)');
            modal.remove();
        });
    }

    // Función para mostrar detalle cultural
    function showCultureDetail(culture) {
        const preparationMethods = {
            'India Antigua': [
                "Recolectar frutos de Reetha maduros y secarlos al sol",
                "Moler los frutos secos hasta obtener un polvo fino",
                "Mezclar con agua tibia hasta formar una pasta",
                "Añadir polvo de Amla y Shikakai para beneficios adicionales",
                "Aplicar en el cabello húmedo, masajear y enjuagar"
            ],
            'Antiguo Egipto': [
                "Mezclar natrón (carbonato de sodio natural) con agua del Nilo",
                "Añadir aceite de ricino y mirra molida",
                "Calentar suavemente la mezcla en un recipiente de cerámica",
                "Dejar reposar por un día para infusionar",
                "Aplicar con esponja natural y enjuagar con agua de rosas"
            ],
            'Roma Imperial': [
                "Recoger cenizas de haya y tamizar para eliminar impurezas",
                "Mezclar con grasa de cabra derretida",
                "Añadir aceite de oliva y esencias de lavanda",
                "Cocer a fuego lento por varias horas hasta espesar",
                "Dejar solidificar y cortar en pastillas para uso posterior"
            ],
            'China Imperial': [
                "Preparar una infusión concentrada de té verde y ginseng",
                "Añadir extracto de durazno y aloe vera fresco",
                "Mezclar con arcilla blanca para dar cuerpo",
                "Dejar macerar por 3 días en recipiente de porcelana",
                "Colar y aplicar con brocha de pelo de pony"
            ],
            'Pueblos Nativos Americanos': [
                "Recoger raíces de yuca y machacar hasta extraer el jugo",
                "Mezclar con hojas de salvia blanca trituradas",
                "Añadir agua de lluvia y calentar sin hervir",
                "Infusionar con ramas de cedar por 2 días",
                "Usar inmediatamente después de preparar"
            ],
            'Japón Tradicional': [
                "Prensar semillas de camelia para extraer el aceite puro",
                "Mezclar con agua de arroz fermentada (tosui)",
                "Añadir pétalos de sakura macerados en sake",
                "Dejar reposar en barril de cedro por una luna",
                "Aplicar con peine de boj y enjuagar con agua de manantial"
            ]
        };
        
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
                            <i class="fas fa-mortar-pestle"></i> Método de preparación tradicional:
                        </h4>
                        <ol class="feature-list" style="margin-left: 1.5rem;">
                            ${preparationMethods[culture.title]?.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    
                    <div style="margin-top: 1.5rem;">
                        <h4 style="margin-bottom: 0.8rem; color: ${culture.color};">
                            <i class="fas fa-chart-bar"></i> Características únicas:
                        </h4>
                        <table class="ingredient-table">
                            <tr>
                                <th>Característica</th>
                                <th>Valor</th>
                                <th>Beneficio</th>
                            </tr>
                            <tr>
                                <td>Tiempo de preparación</td>
                                <td>2-7 días</td>
                                <td>Mejor extracción de principios activos</td>
                            </tr>
                            <tr>
                                <td>Vida útil</td>
                                <td>3-14 días</td>
                                <td>Sin conservantes químicos</td>
                            </tr>
                            <tr>
                                <td>Eficacia documentada</td>
                                <td>70-85%</td>
                                <td>Comparable a fórmulas básicas modernas</td>
                            </tr>
                            <tr>
                                <td>Sostenibilidad</td>
                                <td>95-100%</td>
                                <td>Ingredientes locales y biodegradables</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="prepareBtn" style="background: ${culture.color}; min-width: 200px;">
                            <i class="fas fa-mortar-pestle"></i> Simular Preparación
                        </button>
                        <button class="btn btn-natural" id="compareModernBtn" style="min-width: 200px;">
                            <i class="fas fa-balance-scale"></i> Comparar con Moderno
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
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('prepareBtn').addEventListener('click', () => {
            simulateTraditionalPreparation(culture);
            modal.remove();
        });
        
        document.getElementById('compareModernBtn').addEventListener('click', () => {
            compareTraditionalVsModern(culture);
            modal.remove();
        });
    }

    // Función para simular preparación tradicional
    function simulateTraditionalPreparation(culture) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closePrepModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: ${culture.color}; text-align: center;">
                    <i class="fas fa-mortar-pestle"></i> Preparando ${culture.title}
                </h2>
                <div id="prepSteps" style="text-align: center; margin: 2rem 0;">
                    <div style="font-size: 1.2rem; margin-bottom: 1rem;">
                        <i class="fas fa-spinner fa-spin"></i> Iniciando preparación tradicional...
                    </div>
                    <div style="color: var(--text-secondary);">
                        Esta simulación recrea el proceso histórico auténtico
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Progreso de preparación</span>
                        <span>0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%;"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Simular proceso paso a paso
        const steps = [
            "Recolectando ingredientes en su hábitat natural...",
            "Secando y preparando materias primas...",
            "Moliendo en mortero de piedra...",
            "Mezclando en proporciones tradicionales...",
            "Infusionando con agua de manantial...",
            "Macerando por tiempo requerido...",
            "Filtrando para obtener líquido puro...",
            "¡Preparación completada!"
        ];
        
        let currentStep = 0;
        const progressBar = modal.querySelector('.progress-fill');
        const progressLabel = modal.querySelector('.progress-label span:last-child');
        const prepSteps = document.getElementById('prepSteps');
        
        const stepInterval = setInterval(() => {
            if (currentStep < steps.length) {
                prepSteps.innerHTML = `
                    <div style="font-size: 1.2rem; margin-bottom: 1rem; color: ${culture.color};">
                        <i class="fas fa-${currentStep === steps.length - 1 ? 'check' : 'spinner fa-spin'}"></i> ${steps[currentStep]}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">
                        Paso ${currentStep + 1} de ${steps.length}
                    </div>
                `;
                
                const progress = Math.round(((currentStep + 1) / steps.length) * 100);
                progressBar.style.width = `${progress}%`;
                progressLabel.textContent = `${progress}%`;
                
                currentStep++;
            } else {
                clearInterval(stepInterval);
                
                // Mostrar resultado final
                setTimeout(() => {
                    prepSteps.innerHTML = `
                        <div style="margin-bottom: 1.5rem;">
                            <div style="font-size: 3rem; color: ${culture.color}; margin-bottom: 1rem;">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div style="font-size: 1.5rem; font-weight: bold; color: ${culture.color}; margin-bottom: 0.5rem;">
                                ¡Preparación completada!
                            </div>
                            <div style="color: var(--text-secondary);">
                                Has recreado auténticamente el método histórico de ${culture.title}
                            </div>
                        </div>
                        <div style="background: ${culture.color}20; border-radius: 12px; padding: 1.5rem; margin-top: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Autenticidad histórica:</span>
                                <span style="font-weight: bold; color: ${culture.color};">95%</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Eficacia estimada:</span>
                                <span style="font-weight: bold; color: ${culture.color};">78%</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Sostenibilidad:</span>
                                <span style="font-weight: bold; color: #4ade80;">99%</span>
                            </div>
                        </div>
                    `;
                    
                    progressBar.style.background = culture.color;
                    
                    // Añadir botón para continuar
                    const continueBtn = document.createElement('button');
                    continueBtn.className = 'btn';
                    continueBtn.style.marginTop = '1.5rem';
                    continueBtn.style.width = '100%';
                    continueBtn.style.background = culture.color;
                    continueBtn.innerHTML = '<i class="fas fa-flask"></i> Probar la fórmula preparada';
                    continueBtn.addEventListener('click', () => {
                        modal.remove();
                        alert(`¡Has probado la auténtica fórmula de ${culture.title}! Sensación en cabello: Limpio, natural, con aroma histórico.`);
                    });
                    
                    prepSteps.appendChild(continueBtn);
                }, 500);
            }
        }, 1000);
        
        // Cerrar modal
        document.getElementById('closePrepModal').addEventListener('click', () => {
            clearInterval(stepInterval);
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                clearInterval(stepInterval);
                modal.remove();
            }
        });
    }

    // Función para comparar tradicional vs moderno
    function compareTraditionalVsModern(culture) {
        const comparisons = {
            'India Antigua': {
                traditional: {time: "45 min", cost: "$0.50", effectiveness: "75%", sustainability: "98%"},
                modern: {time: "2 min", cost: "$1.20", effectiveness: "88%", sustainability: "65%"}
            },
            'Antiguo Egipto': {
                traditional: {time: "3 horas", cost: "$2.50", effectiveness: "70%", sustainability: "95%"},
                modern: {time: "2 min", cost: "$1.50", effectiveness: "85%", sustainability: "60%"}
            },
            'Roma Imperial': {
                traditional: {time: "6 horas", cost: "$3.00", effectiveness: "68%", sustainability: "90%"},
                modern: {time: "2 min", cost: "$1.80", effectiveness: "90%", sustainability: "55%"}
            },
            'China Imperial': {
                traditional: {time: "3 días", cost: "$5.00", effectiveness: "80%", sustainability: "99%"},
                modern: {time: "2 min", cost: "$2.50", effectiveness: "92%", sustainability: "50%"}
            },
            'Pueblos Nativos Americanos': {
                traditional: {time: "2 horas", cost: "$0.00", effectiveness: "72%", sustainability: "100%"},
                modern: {time: "2 min", cost: "$1.00", effectiveness: "86%", sustainability: "70%"}
            },
            'Japón Tradicional': {
                traditional: {time: "30 días", cost: "$8.00", effectiveness: "85%", sustainability: "97%"},
                modern: {time: "2 min", cost: "$3.00", effectiveness: "94%", sustainability: "45%"}
            }
        };
        
        const comparison = comparisons[culture.title];
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeCompareModal">&times;</button>
                <h2 style="margin-bottom: 1.5rem; color: ${culture.color}; text-align: center;">
                    <i class="fas fa-balance-scale"></i> ${culture.title}: Tradicional vs Moderno
                </h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div>
                        <h3 style="color: ${culture.color}; margin-bottom: 1rem; border-bottom: 2px solid ${culture.color}; padding-bottom: 0.5rem;">
                            <i class="fas fa-history"></i> Método Tradicional
                        </h3>
                        <div style="background: ${culture.color}10; border-radius: 12px; padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Tiempo de preparación:</span>
                                <span style="font-weight: bold; color: ${culture.color};">${comparison.traditional.time}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Costo por uso:</span>
                                <span style="font-weight: bold; color: ${culture.color};">${comparison.traditional.cost}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Efectividad:</span>
                                <span style="font-weight: bold; color: ${culture.color};">${comparison.traditional.effectiveness}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Sostenibilidad:</span>
                                <span style="font-weight: bold; color: #4ade80;">${comparison.traditional.sustainability}</span>
                            </div>
                        </div>
                        <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                            <i class="fas fa-star"></i> Ventaja: Conexión cultural, ingredientes puros, cero desperdicio
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: var(--accent); margin-bottom: 1rem; border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem;">
                            <i class="fas fa-industry"></i> Equivalente Moderno
                        </h3>
                        <div style="background: rgba(76, 201, 240, 0.1); border-radius: 12px; padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Tiempo de preparación:</span>
                                <span style="font-weight: bold; color: var(--accent);">${comparison.modern.time}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Costo por uso:</span>
                                <span style="font-weight: bold; color: var(--accent);">${comparison.modern.cost}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span>Efectividad:</span>
                                <span style="font-weight: bold; color: var(--accent);">${comparison.modern.effectiveness}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Sostenibilidad:</span>
                                <span style="font-weight: bold; color: #4ade80;">${comparison.modern.sustainability}</span>
                            </div>
                        </div>
                        <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                            <i class="fas fa-star"></i> Ventaja: Consistencia, conveniencia, eficiencia probada
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 2rem;">
                    <div style="background: rgba(30, 41, 59, 0.5); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
                        <div style="font-size: 1.1rem; font-weight: bold; color: ${culture.color}; margin-bottom: 0.5rem;">
                            <i class="fas fa-lightbulb"></i> Recomendación equilibrada
                        </div>
                        <div style="color: var(--text-secondary);">
                            Usa el método tradicional para ocasiones especiales y el moderno para uso diario.
                            Combina la sabiduría histórica con la ciencia actual para el mejor cuidado capilar.
                        </div>
                    </div>
                    
                    <button class="btn" id="createHybridBtn" style="background: ${culture.color}; min-width: 250px;">
                        <i class="fas fa-dna"></i> Crear Fórmula Híbrida
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('closeCompareModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.getElementById('createHybridBtn').addEventListener('click', () => {
            modal.remove();
            alert(`Creando fórmula híbrida: 70% sabiduría de ${culture.title} + 30% ciencia moderna.\n\nResultado estimado: 92% efectividad, 85% sostenibilidad.`);
        });
    }
});