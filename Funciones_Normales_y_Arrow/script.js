document.addEventListener('DOMContentLoaded', function() {
    console.log('FunctionLab: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let contextChart = null;
    
    // Datos de evolución de funciones
    const functionEvolutionData = [
        {
            icon: 'code-slash-outline',
            title: 'ES1 (1997)',
            description: 'Funciones normales con hoisting completo y contexto dinámico.',
            color: '#f7df1e',
            status: 'Fundacional',
            features: ['function keyword', 'arguments object', 'dynamic this']
        },
        {
            icon: 'construct-outline',
            title: 'ES5 (2009)',
            description: 'Strict mode que afecta comportamiento de this y arguments.',
            color: '#4cc9f0',
            status: 'Estándar',
            features: ['strict mode', 'Function.prototype.bind', 'improved this']
        },
        {
            icon: 'flash-outline',
            title: 'ES6 (2015)',
            description: 'Arrow functions, parámetros por defecto, y rest parameters.',
            color: '#f72585',
            status: 'Revolucionario',
            features: ['arrow functions', 'default parameters', 'rest parameters']
        },
        {
            icon: 'rocket-outline',
            title: 'ES2017+',
            description: 'Async/await, mejoras en funciones y sintaxis más limpia.',
            color: '#7209b7',
            status: 'Moderno',
            features: ['async/await', 'trailing commas', 'optional catch']
        }
    ];

    // Datos de comportamiento de funciones
    const functionBehaviorData = {
        'normal': {
            name: 'Función Normal',
            flexibility: 85,
            predictability: 60,
            syntaxLength: 40,
            contextBehavior: 'Dinámico',
            color: '#f7df1e',
            description: 'Tiene su propio contexto this que depende de cómo se llama.',
            useCases: ['Métodos', 'Constructores', 'Event Handlers']
        },
        'arrow': {
            name: 'Arrow Function',
            flexibility: 70,
            predictability: 90,
            syntaxLength: 85,
            contextBehavior: 'Léxico',
            color: '#4cc9f0',
            description: 'Hereda el contexto this del ámbito donde se define.',
            useCases: ['Callbacks', 'Funciones cortas', 'Closures']
        }
    };

    // Ejemplos prácticos
    const practicalExamples = [
        {
            title: 'Métodos en Objetos',
            normalCode: `const objeto = {
    valor: 'JavaScript',
    mostrar: function() {
        console.log(this.valor); // 'JavaScript'
    }
};`,
            arrowCode: `const objeto = {
    valor: 'JavaScript',
    mostrar: () => {
        console.log(this.valor); // undefined
        // this se refiere al contexto global
    }
};`,
            explanation: 'Las funciones normales mantienen su propio this, ideal para métodos de objeto.'
        },
        {
            title: 'Callbacks y Eventos',
            normalCode: `// Problema: this pierde contexto
element.addEventListener('click', function() {
    console.log(this); // this cambia al elemento
    this.propiedad = 'valor'; // this es el elemento
});`,
            arrowCode: `// Solución: arrow function mantiene contexto
const clase = {
    propiedad: 'valor',
    iniciar() {
        element.addEventListener('click', () => {
            console.log(this); // this es 'clase'
            console.log(this.propiedad); // 'valor'
        });
    }
};`,
            explanation: 'Arrow functions son ideales para callbacks donde necesitas mantener el contexto.'
        },
        {
            title: 'Array Methods',
            normalCode: `const numeros = [1, 2, 3];
const dobles = numeros.map(function(n) {
    return n * 2;
});`,
            arrowCode: `const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2);`,
            explanation: 'Arrow functions proporcionan sintaxis más concisa para operaciones con arrays.'
        }
    ];

    // Inicializar componentes
    initJSParticles();
    initFunctionExamples();
    initEventListeners();
    initAnimations();
    initTimeline();
    initFunctionSimulation();
    initCharts();

    // Función para inicializar partículas de JavaScript
    function initJSParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 70;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const type = Math.random();
                let color, size, speed, shape;
                
                if (type < 0.4) {
                    // Partículas de función normal (amarillo)
                    color = `rgba(247, 223, 30, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 5 + 3;
                    speed = (Math.random() - 0.5) * 0.3;
                    shape = 'function';
                } else if (type < 0.7) {
                    // Partículas de arrow function (azul)
                    color = `rgba(76, 201, 240, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 4 + 2;
                    speed = (Math.random() - 0.5) * 0.4;
                    shape = 'arrow';
                } else if (type < 0.85) {
                    // Partículas de código (verde)
                    color = `rgba(72, 187, 120, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                    shape = 'code';
                } else {
                    // Partículas especiales (rosa)
                    color = `rgba(247, 37, 133, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 6 + 4;
                    speed = (Math.random() - 0.5) * 0.2;
                    shape = 'special';
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
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    shape: shape,
                    wiggle: Math.random() * 0.05,
                    wiggleOffset: Math.random() * Math.PI * 2
                });
            }
        }
        
        function drawFunction(ctx, x, y, size, rotation, type) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            
            if (type === 'function') {
                // Dibujar símbolo de función {}
                ctx.beginPath();
                ctx.moveTo(-size, -size * 0.5);
                ctx.bezierCurveTo(-size * 0.5, -size, size * 0.5, -size, size, -size * 0.5);
                ctx.moveTo(-size, size * 0.5);
                ctx.bezierCurveTo(-size * 0.5, size, size * 0.5, size, size, size * 0.5);
            } else if (type === 'arrow') {
                // Dibujar flecha
                ctx.beginPath();
                ctx.moveTo(-size, 0);
                ctx.lineTo(size * 0.5, 0);
                ctx.moveTo(size * 0.3, -size * 0.3);
                ctx.lineTo(size * 0.5, 0);
                ctx.lineTo(size * 0.3, size * 0.3);
            } else if (type === 'code') {
                // Dibujar símbolo de código <>
                ctx.beginPath();
                ctx.moveTo(-size, -size * 0.3);
                ctx.lineTo(-size * 0.3, 0);
                ctx.lineTo(-size, size * 0.3);
                ctx.moveTo(size, -size * 0.3);
                ctx.lineTo(size * 0.3, 0);
                ctx.lineTo(size, size * 0.3);
            } else {
                // Dibujar símbolo especial (corchetes)
                ctx.beginPath();
                ctx.moveTo(-size, -size);
                ctx.lineTo(-size * 0.7, -size);
                ctx.lineTo(-size * 0.7, size);
                ctx.lineTo(-size, size);
                ctx.moveTo(size, -size);
                ctx.lineTo(size * 0.7, -size);
                ctx.lineTo(size * 0.7, size);
                ctx.lineTo(size, size);
            }
            
            ctx.restore();
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo degradado
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)');
            gradient.addColorStop(1, 'rgba(15, 23, 42, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar conexiones entre partículas
            ctx.strokeStyle = 'rgba(247, 223, 30, 0.08)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120 && particles[i].shape === particles[j].shape) {
                        const opacity = 1 - (distance / 120);
                        ctx.strokeStyle = `rgba(247, 223, 30, ${opacity * 0.1})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            // Actualizar y dibujar partículas
            particles.forEach(particle => {
                // Movimiento con wiggle
                particle.x += particle.speedX + Math.sin(Date.now() * 0.001 + particle.wiggleOffset) * particle.wiggle;
                particle.y += particle.speedY + Math.cos(Date.now() * 0.001 + particle.wiggleOffset) * particle.wiggle;
                particle.rotation += particle.rotationSpeed;
                
                // Rebote en bordes
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
                
                // Efecto de pulso
                const pulse = Math.sin(Date.now() * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7;
                const currentAlpha = parseFloat(particle.color.split(',')[3].split(')')[0]) * pulse;
                
                // Dibujar partícula
                ctx.save();
                
                if (particle.shape === 'special') {
                    // Gradiente para partículas especiales
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 1.5
                    );
                    gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`));
                    gradient.addColorStop(1, particle.color.replace(/[\d.]+\)$/, '0)'));
                    ctx.fillStyle = gradient;
                    ctx.fillRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2);
                }
                
                ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
                ctx.lineWidth = 1.5;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                drawFunction(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.shape);
                ctx.stroke();
                
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
        console.log('Partículas de JavaScript inicializadas');
    }

    // Función para inicializar ejemplos de funciones
    function initFunctionExamples() {
        const container = document.getElementById('examplesInfo');
        if (!container) {
            console.error('Contenedor de ejemplos no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-js-accent-light">Ejemplos Prácticos</h3>
            <div class="space-y-6" id="examplesGrid">
                ${practicalExamples.map((example, index) => `
                    <div class="example-card bg-gray-900/40 border border-border-light rounded-xl p-5 hover:border-js-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="font-bold text-lg">${example.title}</h4>
                            <div class="flex gap-2">
                                <span class="px-2 py-1 text-xs rounded bg-js-accent/20 text-js-accent-light">Normal</span>
                                <span class="px-2 py-1 text-xs rounded bg-js-accent-secondary/20 text-js-accent-secondary-light">Arrow</span>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div class="code-example">
                                <div class="code-header">
                                    <span class="text-js-accent-light text-sm font-mono">Función Normal</span>
                                </div>
                                <div class="code-body">
                                    <pre><code>${example.normalCode}</code></pre>
                                </div>
                            </div>
                            
                            <div class="code-example">
                                <div class="code-header">
                                    <span class="text-js-accent-secondary-light text-sm font-mono">Arrow Function</span>
                                </div>
                                <div class="code-body">
                                    <pre><code>${example.arrowCode}</code></pre>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-900/70 rounded-lg p-3">
                            <div class="flex items-start gap-2">
                                <ion-icon name="information-circle-outline" class="text-js-accent-tertiary mt-0.5"></ion-icon>
                                <p class="text-text-secondary text-sm">${example.explanation}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        console.log('Ejemplos de funciones inicializados: ' + practicalExamples.length);
    }

    // Función para inicializar timeline
    function initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        console.log('Elementos timeline encontrados: ' + timelineItems.length);
        
        // Mostrar todos los elementos inmediatamente
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('opacity-100');
            }, index * 200);
        });
        
        // También agregar observador para animación al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100');
                }
            });
        }, { threshold: 0.1 });
        
        timelineItems.forEach(item => {
            item.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
            observer.observe(item);
        });
        
        console.log('Timeline inicializada');
    }

    // Función para inicializar gráficos
    function initCharts() {
        console.log('Inicializando gráficos...');
        
        // Verificar si Chart.js está disponible
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js no está cargado. Intentando cargar...');
            loadChartJS();
            return;
        }
        
        // Gráfico de contexto
        const contextChartCanvas = document.getElementById('contextChartCanvas');
        if (contextChartCanvas) {
            const parent = contextChartCanvas.parentElement;
            contextChartCanvas.width = parent.clientWidth;
            contextChartCanvas.height = parent.clientHeight;
            
            const ctx = contextChartCanvas.getContext('2d');
            contextChart = createContextChart(ctx);
        }
        
        console.log('Gráficos inicializados');
    }

    // Función para crear gráfico de contexto
    function createContextChart(ctx) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['This Contexto', 'Arguments', 'Constructor', 'Prototype', 'Sintaxis'],
                datasets: [
                    {
                        label: 'Funciones Normales',
                        data: [90, 95, 100, 100, 40],
                        backgroundColor: 'rgba(247, 223, 30, 0.7)',
                        borderColor: '#f7df1e',
                        borderWidth: 1
                    },
                    {
                        label: 'Arrow Functions',
                        data: [10, 0, 0, 0, 90],
                        backgroundColor: 'rgba(76, 201, 240, 0.7)',
                        borderColor: '#4cc9f0',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 30, 50, 0.9)',
                        titleColor: '#ffed4a',
                        bodyColor: '#cbd5e1',
                        borderColor: '#f7df1e',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        },
                        beginAtZero: true,
                        max: 100
                    }
                },
                elements: {
                    bar: {
                        borderRadius: 4,
                        borderWidth: 1
                    }
                }
            }
        });
    }

    // Función para inicializar simulación de funciones
    function initFunctionSimulation() {
        console.log('Inicializando simulación de funciones...');
        
        // Elementos del DOM
        const functionButtons = document.querySelectorAll('.function-btn');
        const contextSlider = document.getElementById('contextSlider');
        const contextValue = document.getElementById('contextValue');
        const callSlider = document.getElementById('callSlider');
        const callValue = document.getElementById('callValue');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        const codePreview = document.getElementById('codePreview');
        
        // Verificar que todos los elementos existan
        if (!contextSlider || !functionButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        function updateSliderValue(slider, valueElement, type) {
            slider.addEventListener('input', function() {
                if (type === 'context') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Global';
                        updateCodePreview();
                    } else if (value < 66) {
                        valueElement.textContent = 'Objeto';
                        updateCodePreview();
                    } else {
                        valueElement.textContent = 'Evento';
                        updateCodePreview();
                    }
                } else if (type === 'call') {
                    const value = parseInt(this.value);
                    if (value < 33) {
                        valueElement.textContent = 'Directa';
                        updateCodePreview();
                    } else if (value < 66) {
                        valueElement.textContent = 'Método';
                        updateCodePreview();
                    } else {
                        valueElement.textContent = 'Constructor';
                        updateCodePreview();
                    }
                }
                updateSimulation();
            });
        }
        
        updateSliderValue(contextSlider, contextValue, 'context');
        updateSliderValue(callSlider, callValue, 'call');
        
        // Botones de tipo de función
        functionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                functionButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                updateCodePreview();
                updateSimulation();
            });
        });
        
        // Actualizar vista previa del código
        function updateCodePreview() {
            const activeFunction = document.querySelector('.function-btn.active');
            const functionType = activeFunction ? activeFunction.dataset.function : 'normal';
            const context = contextValue.textContent.toLowerCase();
            const call = callValue.textContent.toLowerCase();
            
            let code = '';
            
            if (functionType === 'normal') {
                if (call === 'directa') {
                    code = `// Función normal llamada directamente
function ejemplo() {
    return this; // this se refiere al contexto global
}

const resultado = ejemplo();`;
                } else if (call === 'método') {
                    code = `// Función normal como método
const objeto = {
    valor: 'JavaScript',
    metodo: function() {
        return this.valor; // this se refiere al objeto
    }
};

const resultado = objeto.metodo();`;
                } else {
                    code = `// Función normal como constructor
function Persona(nombre) {
    this.nombre = nombre; // this se refiere a la nueva instancia
}

const persona = new Persona('Juan');`;
                }
            } else {
                if (call === 'directa') {
                    code = `// Arrow function llamada directamente
const ejemplo = () => {
    return this; // this hereda del contexto padre
};

const resultado = ejemplo();`;
                } else if (call === 'método') {
                    code = `// Arrow function como "método"
const objeto = {
    valor: 'JavaScript',
    metodo: () => {
        return this.valor; // this hereda del contexto padre
    }
};

const resultado = objeto.metodo();`;
                } else {
                    code = `// Arrow function NO puede ser constructor
const Persona = (nombre) => {
    this.nombre = nombre; // ERROR: Arrow functions no pueden usar 'new'
};

// Esto lanzará un error
// const persona = new Persona('Juan');`;
                }
            }
            
            codePreview.innerHTML = `<code>${code}</code>`;
        }
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            contextSlider.value = 50;
            contextValue.textContent = 'Objeto';
            callSlider.value = 50;
            callValue.textContent = 'Método';
            functionButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-function="normal"]').classList.add('active');
            
            updateCodePreview();
            updateSimulation();
            showNotification('Simulación reiniciada a valores predeterminados', 'info');
        });
        
        // Mostrar detalles
        showDetailsBtn.addEventListener('click', function() {
            showDetailedAnalysis();
        });
        
        // Actualizar simulación
        function updateSimulation() {
            const activeFunction = document.querySelector('.function-btn.active');
            const functionType = activeFunction ? activeFunction.dataset.function : 'normal';
            const context = contextValue.textContent.toLowerCase();
            const call = callValue.textContent.toLowerCase();
            
            const funcData = functionBehaviorData[functionType];
            if (!funcData) return;
            
            // Calcular valores basados en parámetros
            let flexibility = funcData.flexibility;
            let predictability = funcData.predictability;
            let syntax = funcData.syntaxLength;
            
            // Ajustar por contexto
            if (context === 'global') {
                if (functionType === 'normal') {
                    flexibility *= 1.1;
                    predictability *= 0.8;
                }
            } else if (context === 'evento') {
                if (functionType === 'normal') {
                    flexibility *= 0.9;
                } else {
                    predictability *= 1.1;
                }
            }
            
            // Ajustar por modo de llamada
            if (call === 'constructor') {
                if (functionType === 'normal') {
                    flexibility *= 1.2;
                } else {
                    flexibility *= 0.5;
                    predictability *= 0.7;
                }
            }
            
            // Limitar valores
            flexibility = Math.min(Math.max(flexibility, 0), 100);
            predictability = Math.min(Math.max(predictability, 0), 100);
            syntax = Math.min(Math.max(syntax, 0), 100);
            
            // Actualizar barras y valores
            document.getElementById('flexibilityValue').textContent = 
                flexibility >= 85 ? 'Alta' : 
                flexibility >= 70 ? 'Media' : 
                flexibility >= 50 ? 'Moderada' : 'Baja';
            document.getElementById('flexibilityBar').style.width = flexibility + '%';
            
            document.getElementById('predictabilityValue').textContent = 
                predictability >= 85 ? 'Alta' : 
                predictability >= 70 ? 'Media' : 
                predictability >= 50 ? 'Moderada' : 'Baja';
            document.getElementById('predictabilityBar').style.width = predictability + '%';
            
            document.getElementById('syntaxValue').textContent = 
                syntax >= 85 ? 'Muy Concisa' : 
                syntax >= 70 ? 'Concisa' : 
                syntax >= 50 ? 'Moderada' : 'Verbal';
            document.getElementById('syntaxBar').style.width = syntax + '%';
            
            // Actualizar resultado de ejecución
            let outputResult = '';
            let thisContext = '';
            
            if (functionType === 'normal') {
                if (call === 'directa') {
                    outputResult = context === 'global' ? '"window"' : '"undefined"';
                    thisContext = context === 'global' ? 'Global object (window)' : 'undefined (strict mode)';
                } else if (call === 'método') {
                    outputResult = '"JavaScript"';
                    thisContext = 'obj {valor: "JavaScript"}';
                } else {
                    outputResult = 'nueva Persona';
                    thisContext = 'nueva instancia de Persona';
                }
            } else {
                if (call === 'directa') {
                    outputResult = context === 'global' ? '"window"' : 'contexto padre';
                    thisContext = 'Heredado del contexto padre';
                } else if (call === 'método') {
                    outputResult = context === 'global' ? '"window"' : 'contexto padre';
                    thisContext = 'Heredado del contexto padre (no el objeto)';
                } else {
                    outputResult = 'ERROR';
                    thisContext = 'TypeError: Arrow functions no son constructores';
                }
            }
            
            document.getElementById('outputResult').textContent = outputResult;
            document.getElementById('thisContext').textContent = thisContext;
            
            // Actualizar gráfico de contexto si está disponible
            if (contextChart && typeof Chart !== 'undefined') {
                // Actualizar datos del gráfico
                if (functionType === 'normal') {
                    contextChart.data.datasets[0].data = [90, 95, 100, 100, 40];
                    contextChart.data.datasets[1].data = [10, 0, 0, 0, 90];
                } else {
                    contextChart.data.datasets[0].data = [10, 0, 0, 0, 90];
                    contextChart.data.datasets[1].data = [90, 0, 0, 0, 40];
                }
                contextChart.update();
            }
            
            // Actualizar conclusión
            const conclusion = document.getElementById('simulationConclusion');
            let conclusionText = '';
            
            if (functionType === 'normal') {
                conclusionText = 'Las funciones normales tienen this dinámico que depende de cómo se llaman';
            } else {
                conclusionText = 'Las arrow functions heredan el contexto this del ámbito donde se definen';
            }
            
            conclusion.innerHTML = `
                <ion-icon name="bulb-outline" class="text-js-accent-tertiary mr-2"></ion-icon>
                ${conclusionText}
            `;
        }
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            updateCodePreview();
            updateSimulation();
        }, 500);
        
        console.log('Simulación de funciones inicializada');
    }

    // Función para ejecutar simulación completa
    function runSimulation() {
        const btn = document.getElementById('runSimulationBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando...';
        btn.disabled = true;
        
        // Simular proceso de ejecución
        const activeFunction = document.querySelector('.function-btn.active');
        const functionType = activeFunction ? activeFunction.dataset.function : 'normal';
        
        // Mostrar animación de progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            
            // Animar barras de progreso
            const bars = ['flexibilityBar', 'predictabilityBar', 'syntaxBar'];
            bars.forEach(barId => {
                const bar = document.getElementById(barId);
                const currentWidth = parseFloat(bar.style.width);
                const newWidth = Math.min(100, currentWidth * (1 + Math.random() * 0.05));
                bar.style.width = newWidth + '%';
            });
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${functionType === 'normal' ? 'Función normal' : 'Arrow function'} analizada`, 'success');
            }
        }, 100);
    }

    // Función para mostrar análisis detallado
    function showDetailedAnalysis() {
        // Verificar si Chart.js está disponible
        if (typeof Chart === 'undefined') {
            showNotification('Cargando librería de gráficos...', 'info');
            loadChartJS();
            return;
        }
        
        const activeFunction = document.querySelector('.function-btn.active');
        const functionType = activeFunction ? activeFunction.dataset.function : 'normal';
        const funcData = functionBehaviorData[functionType];
        
        // Crear modal de análisis detallado
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-analysis-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-js-accent-light">
                    <ion-icon name="analytics-outline" class="mr-2"></ion-icon> Análisis Detallado: ${funcData.name}
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-5">
                            <h4 class="font-bold text-lg mb-4 text-center text-js-accent-light">Características Técnicas</h4>
                            <div class="space-y-3">
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-text-secondary">Comportamiento de <code>this</code></span>
                                        <span class="font-bold text-js-accent-light">${funcData.contextBehavior}</span>
                                    </div>
                                    <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-gradient-to-r from-js-accent to-js-accent-dark rounded-full" style="width: ${functionType === 'normal' ? 90 : 10}%"></div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-text-secondary">Soporta <code>arguments</code></span>
                                        <span class="font-bold ${functionType === 'normal' ? 'text-js-accent-light' : 'text-js-accent-secondary-light'}">${functionType === 'normal' ? 'Sí' : 'No'}</span>
                                    </div>
                                    <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-gradient-to-r from-${functionType === 'normal' ? 'js-accent' : 'js-accent-secondary'} to-${functionType === 'normal' ? 'js-accent-dark' : 'blue-700'} rounded-full" style="width: ${functionType === 'normal' ? 95 : 0}%"></div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-text-secondary">Puede ser constructor</span>
                                        <span class="font-bold ${functionType === 'normal' ? 'text-js-accent-light' : 'text-js-accent-secondary-light'}">${functionType === 'normal' ? 'Sí' : 'No'}</span>
                                    </div>
                                    <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-gradient-to-r from-${functionType === 'normal' ? 'js-accent' : 'js-accent-secondary'} to-${functionType === 'normal' ? 'js-accent-dark' : 'blue-700'} rounded-full" style="width: ${functionType === 'normal' ? 100 : 0}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-900/50 rounded-xl p-5">
                            <h4 class="font-bold text-lg mb-4 text-center text-js-accent-secondary-light">Métricas de Uso</h4>
                            <div class="space-y-3">
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-text-secondary">Flexibilidad</span>
                                        <span class="font-bold text-js-accent-light">${funcData.flexibility}%</span>
                                    </div>
                                    <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-gradient-to-r from-js-accent to-js-accent-dark rounded-full" style="width: ${funcData.flexibility}%"></div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-text-secondary">Predictibilidad</span>
                                        <span class="font-bold text-js-accent-secondary-light">${funcData.predictability}%</span>
                                    </div>
                                    <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-gradient-to-r from-js-accent-secondary to-blue-700 rounded-full" style="width: ${funcData.predictability}%"></div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-text-secondary">Concisión Sintáctica</span>
                                        <span class="font-bold text-purple-300">${funcData.syntaxLength}%</span>
                                    </div>
                                    <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full" style="width: ${funcData.syntaxLength}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-xl p-5">
                        <h4 class="font-bold text-lg mb-4 text-center text-js-accent-light">Descripción</h4>
                        <p class="text-text-secondary mb-3">${funcData.description}</p>
                        
                        <h5 class="font-bold mb-2 text-js-accent-secondary-light">Casos de Uso Recomendados:</h5>
                        <ul class="list-disc list-inside text-text-secondary space-y-1">
                            ${funcData.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="bg-gray-900/40 rounded-lg p-4">
                        <h4 class="font-bold mb-3 text-js-accent-light">Recomendación:</h4>
                        <p class="text-text-secondary text-sm">
                            ${functionType === 'normal' 
                                ? 'Usa funciones normales cuando necesites control dinámico del contexto this, cuando definas métodos de objeto, o cuando crees constructores.' 
                                : 'Usa arrow functions para callbacks, funciones de una línea, y cuando necesites mantener el contexto this del ámbito exterior.'}
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button class="close-analysis-btn px-6 py-3 bg-gradient-to-r from-js-accent to-js-accent-dark text-gray-900 font-bold rounded-xl shadow-lg shadow-js-accent/30">
                        <ion-icon name="checkmark-outline" class="mr-2"></ion-icon> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-95');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-100');
        }, 10);
        
        // Configurar botones de cierre
        const closeModal = () => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-100');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-95');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        modal.querySelector('.close-analysis-modal').addEventListener('click', closeModal);
        modal.querySelector('.close-analysis-btn').addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Función para inicializar event listeners
    function initEventListeners() {
        console.log('Inicializando event listeners...');
        
        // Botón de simulación de evolución
        const simulateEvolutionBtn = document.getElementById('simulateEvolutionBtn');
        if (simulateEvolutionBtn) {
            simulateEvolutionBtn.addEventListener('click', simulateFunctionEvolution);
        }
        
        // Botón de especificaciones
        const viewSpecsBtn = document.getElementById('viewSpecsBtn');
        if (viewSpecsBtn) {
            viewSpecsBtn.addEventListener('click', () => {
                document.getElementById('specsModal').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('specsModal').classList.add('opacity-100');
                    document.querySelector('#specsModal > div').classList.remove('scale-95');
                    document.querySelector('#specsModal > div').classList.add('scale-100');
                }, 10);
            });
        }
        
        // Botón de comparación
        const compareFunctionsBtn = document.getElementById('compareFunctionsBtn');
        if (compareFunctionsBtn) {
            compareFunctionsBtn.addEventListener('click', () => {
                document.getElementById('compareModal').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('compareModal').classList.add('opacity-100');
                    document.querySelector('#compareModal > div').classList.remove('scale-95');
                    document.querySelector('#compareModal > div').classList.add('scale-100');
                }, 10);
            });
        }
        
        // Cerrar modales
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                document.querySelector('#specsModal > div').classList.remove('scale-100');
                document.querySelector('#specsModal > div').classList.add('scale-95');
                document.getElementById('specsModal').classList.remove('opacity-100');
                setTimeout(() => {
                    document.getElementById('specsModal').classList.add('hidden');
                }, 500);
            });
        }
        
        const closeCompareModalBtn = document.getElementById('closeCompareModal');
        if (closeCompareModalBtn) {
            closeCompareModalBtn.addEventListener('click', () => {
                document.querySelector('#compareModal > div').classList.remove('scale-100');
                document.querySelector('#compareModal > div').classList.add('scale-95');
                document.getElementById('compareModal').classList.remove('opacity-100');
                setTimeout(() => {
                    document.getElementById('compareModal').classList.add('hidden');
                }, 500);
            });
        }
        
        // Cerrar modales al hacer clic fuera
        const specsModal = document.getElementById('specsModal');
        if (specsModal) {
            specsModal.addEventListener('click', (e) => {
                if (e.target.id === 'specsModal') {
                    closeModalBtn.click();
                }
            });
        }
        
        const compareModal = document.getElementById('compareModal');
        if (compareModal) {
            compareModal.addEventListener('click', (e) => {
                if (e.target.id === 'compareModal') {
                    closeCompareModalBtn.click();
                }
            });
        }
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const specsModal = document.getElementById('specsModal');
                const compareModal = document.getElementById('compareModal');
                const analysisModal = document.querySelector('.fixed.inset-0.bg-black\\/90'); // Modal de análisis
                
                if (specsModal && !specsModal.classList.contains('hidden')) {
                    closeModalBtn.click();
                }
                if (compareModal && !compareModal.classList.contains('hidden')) {
                    closeCompareModalBtn.click();
                }
                if (analysisModal) {
                    analysisModal.querySelector('.close-analysis-modal')?.click();
                }
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
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, observerOptions);
        
        // Aplicar animación a elementos principales
        document.querySelectorAll('.card, .timeline-item, .example-card').forEach(el => {
            el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
            observer.observe(el);
        });
        
        // Animar elementos de código
        document.querySelectorAll('pre code').forEach((code, index) => {
            code.style.opacity = '0';
            setTimeout(() => {
                code.style.transition = 'opacity 0.5s ease-out';
                code.style.opacity = '1';
            }, 300 + (index * 100));
        });
        
        console.log('Animaciones inicializadas');
    }

    // Función para simulación de evolución de funciones
    function simulateFunctionEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> Simulando evolución...';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1995: Brendan Eich crea JavaScript en 10 días...",
            "1997: ES1 - Funciones normales con hoisting completo...",
            "1999: ES3 - try/catch, mejoras en funciones...",
            "2009: ES5 - Strict mode, Function.prototype.bind...",
            "2015: ES6 - Arrow functions, parámetros por defecto...",
            "2016: ES7 - Operador exponencial, Array.prototype.includes...",
            "2017: ES8 - Async/await, Object.entries/values...",
            "2018: ES9 - Operador rest/spread para objetos...",
            "2019: ES10 - Array.flat(), Object.fromEntries()...",
            "2020: ES11 - Optional chaining, nullish coalescing...",
            "2021: ES12 - String.prototype.replaceAll()...",
            "2022: ES13 - Top-level await, private class fields...",
            "2023: ES14 - Array grouping, temporal API..."
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<ion-icon name="refresh-outline" class="animate-spin mr-2"></ion-icon> ${steps[step]}`;
                step++;
            }
        }, 400);
        
        // Simular proceso completo
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showFunctionEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, steps.length * 400 + 1000);
    }

    // Función para mostrar resultados de evolución de funciones
    function showFunctionEvolutionResults() {
        const results = [
            { type: 'Versiones ECMAScript', value: 'ES1 → ES2023', color: '#f7df1e', icon: 'layers-outline' },
            { type: 'Años de evolución', value: '1997-2024', color: '#4cc9f0', icon: 'time-outline' },
            { type: 'Arrow functions adoption', value: '0% → 92%', color: '#f72585', icon: 'trending-up-outline' },
            { type: 'Líneas de código', value: '-70% con arrow', color: '#7209b7', icon: 'code-slash-outline' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-js-accent-light">
                    <ion-icon name="rocket-outline" class="mr-2"></ion-icon> Evolución de Funciones en JavaScript (1995-2024)
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Resumen de la evolución de las funciones desde los inicios de JavaScript hasta la actualidad:</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    ${results.map(result => `
                        <div class="bg-gray-900/50 rounded-xl p-4 text-center">
                            <div class="text-2xl md:text-3xl mb-2" style="color: ${result.color};">
                                <ion-icon name="${result.icon}"></ion-icon>
                            </div>
                            <div class="text-xl md:text-2xl font-black mb-1" style="background: linear-gradient(90deg, ${result.color}, ${result.color}99); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${result.value}</div>
                            <div class="text-sm text-text-secondary">${result.type}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="bg-gray-900/50 rounded-lg p-4 mb-6">
                    <div class="font-mono text-sm space-y-1">
                        <span class="text-js-accent-light"># Tendencias futuras (2025-2030):</span><br>
                        <span class="text-text-secondary">• Pattern matching para funciones</span><br>
                        <span class="text-text-secondary">• Mejor soporte para functional programming</span><br>
                        <span class="text-text-secondary">• Optimizaciones de performance para arrow functions</span><br>
                        <span class="text-text-secondary">• Mejoras en el sistema de tipos para funciones</span><br>
                        <span class="text-text-secondary">• Decorators para funciones (Stage 3)</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-js-accent to-js-accent-dark text-gray-900 font-bold rounded-xl shadow-lg shadow-js-accent/30">
                        <ion-icon name="checkmark-outline" class="mr-2"></ion-icon> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-95');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-100');
        }, 10);
        
        // Configurar botones de cierre
        const closeModal = () => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-100');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-95');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        modal.querySelector('.close-evolution-modal').addEventListener('click', closeModal);
        modal.querySelector('.close-evolution-btn').addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Función auxiliar para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'warning': 'bg-yellow-500',
            'info': 'bg-blue-500'
        };
        
        const icons = {
            'success': 'checkmark-circle',
            'error': 'close-circle',
            'warning': 'warning',
            'info': 'information-circle'
        };
        
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full flex items-center gap-2`;
        notification.innerHTML = `
            <ion-icon name="${icons[type]}"></ion-icon>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        }, 10);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('translate-x-0');
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Función para cargar Chart.js dinámicamente
    function loadChartJS() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            console.log('Chart.js cargado correctamente');
            initCharts();
            initFunctionSimulation();
        };
        script.onerror = function() {
            console.error('Error al cargar Chart.js');
            showNotification('Error al cargar librería de gráficos. Recarga la página.', 'error');
        };
        document.head.appendChild(script);
    }

    // Mensaje de inicialización completa
    console.log('Aplicación FunctionLab inicializada correctamente');
});