document.addEventListener('DOMContentLoaded', function() {
    console.log('Red Model: Inicializando aplicación...');
    
    // Variables globales para gráficos
    let lineChart = null;
    let radarChart = null;
    let detailedLineChart = null;
    let detailedBarChart = null;
    let detailedRadarChart = null;
    
    // Datos de frameworks de deep learning
    const frameworksData = [
        {
            icon: 'fa-python',
            title: 'TensorFlow',
            description: 'Framework de Google para computación numérica y machine learning. Ampliamente utilizado en investigación y producción.',
            color: '#FF6F61',
            status: 'Activo',
            release: '2015'
        },
        {
            icon: 'fa-brain',
            title: 'PyTorch',
            description: 'Desarrollado por Facebook AI Research. Favorito en investigación por su flexibilidad y diseño dinámico.',
            color: '#8b5cf6',
            status: 'Activo',
            release: '2016'
        },
        {
            icon: 'fa-microsoft',
            title: 'CNTK',
            description: 'Microsoft Cognitive Toolkit. Optimizado para redes profundas en múltiples GPUs y servidores.',
            color: '#0078D4',
            status: 'Activo',
            release: '2016'
        },
        {
            icon: 'fa-coffee',
            title: 'Keras',
            description: 'API de alto nivel que funciona sobre TensorFlow, Theano y CNTK. Enfoque en experimentación rápida.',
            color: '#D00000',
            status: 'Activo',
            release: '2015'
        },
        {
            icon: 'fa-java',
            title: 'Deeplearning4j',
            description: 'Biblioteca de deep learning para Java y Scala. Integración con Apache Spark para big data.',
            color: '#00B0F0',
            status: 'Activo',
            release: '2014'
        },
        {
            icon: 'fa-apple',
            title: 'Core ML',
            description: 'Framework de Apple para integrar modelos de machine learning en apps iOS, macOS, watchOS y tvOS.',
            color: '#000000',
            status: 'Activo',
            release: '2017'
        }
    ];

    // Datos de arquitecturas para simulación
    const architecturesData = {
        'cnn': {
            name: 'Red Convolucional (CNN)',
            accuracy: 94.2,
            trainingTime: 3.2,
            memoryUsage: 8.5,
            color: '#8b5cf6',
            description: 'Excelente para tareas de visión por computadora. Capas convolucionales detectan patrones locales.',
            applications: ['Reconocimiento de imágenes', 'Detección de objetos', 'Segmentación semántica'],
            performance: 85,
            efficiency: 75,
            scalability: 70,
            interpretability: 60
        },
        'rnn': {
            name: 'Red Recurrente (RNN/LSTM)',
            accuracy: 88.5,
            trainingTime: 5.7,
            memoryUsage: 6.2,
            color: '#10b981',
            description: 'Ideal para datos secuenciales y series temporales. Mantiene memoria de estados anteriores.',
            applications: ['Traducción automática', 'Predicción de series', 'Análisis de sentimiento'],
            performance: 70,
            efficiency: 65,
            scalability: 60,
            interpretability: 75
        },
        'transformer': {
            name: 'Transformer',
            accuracy: 96.8,
            trainingTime: 8.9,
            memoryUsage: 15.3,
            color: '#8b5cf6',
            description: 'Arquitectura basada en atención. Dominante en procesamiento de lenguaje natural.',
            applications: ['Modelos de lenguaje', 'Traducción', 'Resumen de texto'],
            performance: 95,
            efficiency: 50,
            scalability: 90,
            interpretability: 40
        },
        'gan': {
            name: 'Red Generativa Adversaria (GAN)',
            accuracy: 82.3,
            trainingTime: 12.5,
            memoryUsage: 9.8,
            color: '#f59e0b',
            description: 'Dos redes compitiendo: generador vs discriminador. Excelente para generación de contenido.',
            applications: ['Generación de imágenes', 'Transferencia de estilo', 'Aumento de datos'],
            performance: 80,
            efficiency: 40,
            scalability: 65,
            interpretability: 55
        }
    };

    // Inicializar componentes
    initNeuralParticles();
    initFrameworks();
    initEventListeners();
    initAnimations();
    initTimeline();
    initArchitectureSimulation();
    initCharts();

    // Función para inicializar partículas neuronales
    function initNeuralParticles() {
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
                    // Partículas neuronales (púrpura)
                    color = `rgba(139, 92, 246, ${Math.random() * 0.4 + 0.1})`;
                    size = Math.random() * 2.5 + 1;
                    speed = (Math.random() - 0.5) * 0.5;
                } else if (type < 0.85) {
                    // Partículas de datos (verde)
                    color = `rgba(16, 185, 129, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 2 + 0.5;
                    speed = (Math.random() - 0.5) * 0.3;
                } else {
                    // Partículas de activación (naranja)
                    color = `rgba(245, 158, 11, ${Math.random() * 0.3 + 0.1})`;
                    size = Math.random() * 3 + 1;
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
                    type: type < 0.6 ? 'neuron' : type < 0.85 ? 'data' : 'activation'
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Fondo sutil
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(10, 10, 18, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dibujar conexiones entre partículas cercanas
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            // Actualizar y dibujar partículas
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
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Gradiente para partículas especiales
                if (particle.type === 'activation') {
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(245, 158, 11, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
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
        console.log('Partículas neuronales inicializadas');
    }

    // Función para inicializar frameworks - CORREGIDA
    function initFrameworks() {
        const container = document.getElementById('frameworksInfo');
        if (!container) {
            console.error('Contenedor de frameworks no encontrado');
            return;
        }
        
        container.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-neural-accent-light">Frameworks de Deep Learning</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="frameworksGrid">
                ${frameworksData.map(framework => `
                    <div class="framework-card bg-gray-900/40 border border-border-light rounded-xl p-4 hover:border-neural-accent/40 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer" data-framework="${framework.title}">
                        <div class="flex items-center mb-3">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3" style="background: ${framework.color}20; color: ${framework.color};">
                                <i class="fab ${framework.icon} text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold">${framework.title}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="px-2 py-1 text-xs rounded" style="background: ${framework.color}20; color: ${framework.color};">${framework.status}</span>
                                    <span class="text-xs text-text-muted">${framework.release}</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-text-secondary">${framework.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Añadir event listeners a las tarjetas de framework
        document.querySelectorAll('.framework-card').forEach(card => {
            card.addEventListener('click', function() {
                const frameworkName = this.getAttribute('data-framework');
                showFrameworkDetail(frameworkName);
            });
        });
        
        console.log('Frameworks inicializados: ' + frameworksData.length);
    }

    // Función para mostrar detalle de framework - CORREGIDA
    function showFrameworkDetail(frameworkName) {
        const framework = frameworksData.find(f => f.title === frameworkName);
        if (!framework) return;
        
        const details = {
            'TensorFlow': {
                features: 'Computación diferencial, escalabilidad, soporte multi-GPU, TensorBoard para visualización',
                languages: 'Python, C++, Java, Go',
                users: 'Google, Airbnb, Uber, Twitter',
                useCase: 'Aplicaciones de producción, investigación a escala, sistemas de recomendación'
            },
            'PyTorch': {
                features: 'Gráficos dinámicos, fuerte comunidad académica, fácil depuración, TorchScript',
                languages: 'Python, C++',
                users: 'Facebook, Tesla, OpenAI, Microsoft',
                useCase: 'Investigación académica, prototipado rápido, modelos experimentales'
            },
            'CNTK': {
                features: 'Optimizado para eficiencia, soporte distribuido, interfaces Python/C++/C#',
                languages: 'Python, C++, C#, BrainScript',
                users: 'Microsoft, Skype, Cortana',
                useCase: 'Sistemas empresariales, aplicaciones de voz, procesamiento distribuido'
            },
            'Keras': {
                features: 'API simple y consistente, modularidad, fácil prototipado, múltiples backends',
                languages: 'Python',
                users: 'NASA, CERN, YouTube, Netflix',
                useCase: 'Prototipado rápido, educación, aplicaciones de nivel medio'
            },
            'Deeplearning4j': {
                features: 'Integración con Hadoop y Spark, soporte GPU, computación distribuida',
                languages: 'Java, Scala, Kotlin',
                users: 'IBM, Chevron, Qualcomm',
                useCase: 'Aplicaciones empresariales Java, procesamiento de big data, sistemas legacy'
            },
            'Core ML': {
                features: 'Optimizado para dispositivos Apple, privacidad, eficiencia energética',
                languages: 'Swift, Objective-C, Python',
                users: 'Apple, desarrolladores iOS/macOS',
                useCase: 'Aplicaciones móviles iOS/macOS, inferencia en el dispositivo, aplicaciones privadas'
            }
        };
        
        const frameworkDetails = details[framework.title] || {};
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="modal-close-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style="background: ${framework.color}20; color: ${framework.color};">
                        <i class="fab ${framework.icon} text-3xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: ${framework.color};">${framework.title}</h2>
                        <p class="text-text-secondary mt-1">${framework.description}</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${frameworkDetails.features ? `
                        <div>
                            <h4 class="font-bold mb-2 text-neural-accent-light">Características principales:</h4>
                            <p class="text-text-secondary">${frameworkDetails.features}</p>
                        </div>
                    ` : ''}
                    
                    ${frameworkDetails.languages ? `
                        <div>
                            <h4 class="font-bold mb-2 text-neural-accent-light">Lenguajes soportados:</h4>
                            <p class="text-text-secondary">${frameworkDetails.languages}</p>
                        </div>
                    ` : ''}
                    
                    ${frameworkDetails.users ? `
                        <div>
                            <h4 class="font-bold mb-2 text-neural-accent-light">Usuarios destacados:</h4>
                            <p class="text-text-secondary">${frameworkDetails.users}</p>
                        </div>
                    ` : ''}
                    
                    ${frameworkDetails.useCase ? `
                        <div>
                            <h4 class="font-bold mb-2 text-neural-accent-light">Casos de uso principales:</h4>
                            <p class="text-text-secondary">${frameworkDetails.useCase}</p>
                        </div>
                    ` : ''}
                    
                    <div class="bg-gray-900/50 rounded-lg p-4 mt-4">
                        <div class="font-mono text-sm">
                            <span class="text-neural-accent-light"># Instalación para ${framework.title}:</span><br>
                            <span class="text-text-secondary">$ pip install ${framework.title.toLowerCase()}</span><br>
                            <span class="text-text-secondary">$ conda install ${framework.title.toLowerCase()}</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg">
                        <h4 class="font-bold mb-2 text-neural-accent-light">Estadísticas clave:</h4>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="text-center p-2 bg-gray-800/50 rounded">
                                <div class="text-xs text-text-muted">Versión Actual</div>
                                <div class="font-bold" style="color: ${framework.color};">${framework.release === '2015' ? '2.12.0' : framework.release === '2016' ? '2.0.0' : framework.release === '2014' ? '1.0.0' : '4.0.0'}</div>
                            </div>
                            <div class="text-center p-2 bg-gray-800/50 rounded">
                                <div class="text-xs text-text-muted">GitHub Stars</div>
                                <div class="font-bold" style="color: ${framework.color};">${framework.title === 'TensorFlow' ? '174k' : framework.title === 'PyTorch' ? '65k' : framework.title === 'Keras' ? '58k' : '10k+'}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                    <button class="close-detail-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105" style="background: ${framework.color};">
                        <i class="fas fa-check mr-2"></i> Cerrar
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
        
        // Event listeners para cerrar el modal
        const closeModal = () => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-100');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-95');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        modal.querySelector('.close-detail-btn').addEventListener('click', closeModal);
        
        // Cerrar al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
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
        
        // Gráfico de líneas principal
        const lineChartCanvas = document.getElementById('lineChartCanvas');
        if (lineChartCanvas) {
            const parent = lineChartCanvas.parentElement;
            lineChartCanvas.width = parent.clientWidth;
            lineChartCanvas.height = parent.clientHeight;
            
            const ctx = lineChartCanvas.getContext('2d');
            lineChart = createLineChart(ctx, getArchitectureComparisonData());
        }
        
        // Gráfico de radar principal
        const radarChartCanvas = document.getElementById('radarChartCanvas');
        if (radarChartCanvas) {
            const parent = radarChartCanvas.parentElement;
            radarChartCanvas.width = parent.clientWidth;
            radarChartCanvas.height = parent.clientHeight;
            
            const ctx = radarChartCanvas.getContext('2d');
            radarChart = createRadarChart(ctx, getRadarChartData('cnn'));
        }
        
        console.log('Gráficos inicializados');
    }

    // Función para cargar Chart.js dinámicamente
    function loadChartJS() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            console.log('Chart.js cargado correctamente');
            // Re-inicializar gráficos después de cargar Chart.js
            initCharts();
            // Re-inicializar simulación para actualizar gráficos
            initArchitectureSimulation();
        };
        script.onerror = function() {
            console.error('Error al cargar Chart.js');
            showNotification('Error al cargar librería de gráficos. Recarga la página.', 'error');
        };
        document.head.appendChild(script);
    }

    // Función para crear gráfico de líneas
    function createLineChart(ctx, data) {
        return new Chart(ctx, {
            type: 'line',
            data: data,
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
                        titleColor: '#a78bfa',
                        bodyColor: '#cbd5e1',
                        borderColor: '#8b5cf6',
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
                    line: {
                        tension: 0.4
                    },
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    // Función para crear gráfico de radar
    function createRadarChart(ctx, data) {
        return new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            circular: true
                        },
                        pointLabels: {
                            color: '#cbd5e1',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        },
                        ticks: {
                            color: '#94a3b8',
                            backdropColor: 'transparent',
                            showLabelBackdrop: false
                        },
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    }
                },
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
                        titleColor: '#a78bfa',
                        bodyColor: '#cbd5e1',
                        borderColor: '#8b5cf6',
                        borderWidth: 1
                    }
                }
            }
        });
    }

    // Función para crear gráfico de barras
    function createBarChart(ctx, data) {
        return new Chart(ctx, {
            type: 'bar',
            data: data,
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
                        titleColor: '#a78bfa',
                        bodyColor: '#cbd5e1',
                        borderColor: '#8b5cf6',
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

    // Función para obtener datos para gráfico de comparación
    function getArchitectureComparisonData() {
        const architectures = ['CNN', 'RNN', 'Transformer', 'GAN'];
        const performance = [85, 70, 95, 80];
        const efficiency = [75, 65, 50, 40];
        
        return {
            labels: architectures,
            datasets: [
                {
                    label: 'Rendimiento',
                    data: performance,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Eficiencia',
                    data: efficiency,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar
    function getRadarChartData(architecture) {
        const archData = architecturesData[architecture];
        
        return {
            labels: ['Precisión', 'Velocidad', 'Eficiencia', 'Escalabilidad', 'Interpretabilidad'],
            datasets: [{
                label: archData.name,
                data: [
                    archData.accuracy,
                    100 - (archData.trainingTime * 5), // Ajuste para mejor visualización
                    100 - (archData.memoryUsage * 4),  // Ajuste para mejor visualización
                    archData.scalability || 70,
                    archData.interpretability || 60
                ],
                backgroundColor: `${archData.color}20`,
                borderColor: archData.color,
                pointBackgroundColor: archData.color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: archData.color,
                borderWidth: 2,
                pointRadius: 4
            }]
        };
    }

    // Función para inicializar simulación de arquitecturas - MEJORADA
    function initArchitectureSimulation() {
        console.log('Inicializando simulación de arquitecturas...');
        
        // Elementos del DOM
        const architectureButtons = document.querySelectorAll('.architecture-btn');
        const layersSlider = document.getElementById('layersSlider');
        const layersValue = document.getElementById('layersValue');
        const datasetSlider = document.getElementById('datasetSlider');
        const datasetValue = document.getElementById('datasetValue');
        const epochsSlider = document.getElementById('epochsSlider');
        const epochsValue = document.getElementById('epochsValue');
        const runSimulationBtn = document.getElementById('runSimulationBtn');
        const resetSimulationBtn = document.getElementById('resetSimulationBtn');
        const showDetailsBtn = document.getElementById('showDetailsBtn');
        
        // Verificar que todos los elementos existan
        if (!layersSlider || !architectureButtons.length) {
            console.error('Elementos de simulación no encontrados');
            return;
        }
        
        // Actualizar valores de los sliders
        function updateSliderValue(slider, valueElement, suffix = '') {
            slider.addEventListener('input', function() {
                valueElement.textContent = this.value + suffix;
                updateSimulation();
            });
        }
        
        updateSliderValue(layersSlider, layersValue);
        updateSliderValue(datasetSlider, datasetValue, 'K muestras');
        updateSliderValue(epochsSlider, epochsValue);
        
        // Botones de arquitectura
        architectureButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                architectureButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                updateSimulation();
            });
        });
        
        // Ejecutar simulación
        runSimulationBtn.addEventListener('click', function() {
            runSimulation();
        });
        
        // Reiniciar simulación
        resetSimulationBtn.addEventListener('click', function() {
            layersSlider.value = 8;
            layersValue.textContent = '8';
            datasetSlider.value = 50;
            datasetValue.textContent = '50K muestras';
            epochsSlider.value = 50;
            epochsValue.textContent = '50';
            architectureButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-arch="cnn"]').classList.add('active');
            
            updateSimulation();
            showNotification('Simulación reiniciada a valores predeterminados', 'info');
        });
        
        // Mostrar detalles
        showDetailsBtn.addEventListener('click', function() {
            showDetailedCharts();
        });
        
        // Ejecutar simulación inicial
        setTimeout(() => {
            updateSimulation();
        }, 500);
        
        console.log('Simulación de arquitecturas inicializada');
    }

    // Función para actualizar simulación - MEJORADA
    function updateSimulation() {
        const activeArch = document.querySelector('.architecture-btn.active');
        if (!activeArch) return;
        
        const archType = activeArch.dataset.arch;
        const layers = parseInt(document.getElementById('layersSlider').value);
        const datasetValue = parseInt(document.getElementById('datasetSlider').value);
        const epochs = parseInt(document.getElementById('epochsSlider').value);
        
        const archData = architecturesData[archType];
        if (!archData) return;
        
        // Calcular valores basados en la arquitectura y parámetros
        let accuracy = archData.accuracy;
        let trainingTime = archData.trainingTime;
        let memoryUsage = archData.memoryUsage;
        
        // Ajustar por número de capas (más capas = mayor precisión pero más tiempo)
        accuracy += (layers - 8) * 0.15;
        trainingTime += (layers - 8) * 0.25;
        memoryUsage += (layers - 8) * 0.15;
        
        // Ajustar por tamaño del dataset (más datos = mejor precisión)
        accuracy += (datasetValue - 50) * 0.03;
        trainingTime += (datasetValue - 50) * 0.08;
        
        // Ajustar por épocas (más épocas = mejor precisión pero más tiempo)
        accuracy += (epochs - 50) * 0.08;
        trainingTime += (epochs - 50) * 0.15;
        
        // Limitar valores
        accuracy = Math.min(Math.max(accuracy, 70), 99.9);
        trainingTime = Math.min(Math.max(trainingTime, 1), 24);
        memoryUsage = Math.min(Math.max(memoryUsage, 1), 32);
        
        // Actualizar barras y valores
        document.getElementById('accuracyValue').textContent = accuracy.toFixed(1) + '%';
        document.getElementById('accuracyBar').style.width = accuracy + '%';
        
        document.getElementById('timeValue').textContent = trainingTime.toFixed(1) + 'h';
        document.getElementById('timeBar').style.width = (trainingTime / 24 * 100) + '%';
        
        document.getElementById('memoryValue').textContent = memoryUsage.toFixed(1) + 'GB';
        document.getElementById('memoryBar').style.width = (memoryUsage / 32 * 100) + '%';
        
        // Actualizar gráfico de radar si está disponible
        if (radarChart && typeof Chart !== 'undefined') {
            radarChart.data = getRadarChartData(archType);
            radarChart.update();
        }
        
        // Actualizar conclusión
        const conclusion = document.getElementById('simulationConclusion');
        conclusion.innerHTML = `
            <i class="fas fa-lightbulb text-neural-accent-tertiary mr-2"></i>
            ${archData.description}
        `;
    }

    // Función para ejecutar simulación completa - MEJORADA
    function runSimulation() {
        const btn = document.getElementById('runSimulationBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Simulando...';
        btn.disabled = true;
        
        // Mostrar animación de progreso
        const activeArch = document.querySelector('.architecture-btn.active');
        const archType = activeArch ? activeArch.dataset.arch : 'cnn';
        const archData = architecturesData[archType];
        
        // Simular proceso de entrenamiento con progreso
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Mejorar ligeramente los resultados para simular entrenamiento exitoso
                const currentAccuracy = parseFloat(document.getElementById('accuracyValue').textContent);
                const newAccuracy = Math.min(currentAccuracy + 2.3, 99.9);
                
                document.getElementById('accuracyValue').textContent = newAccuracy.toFixed(1) + '%';
                document.getElementById('accuracyBar').style.width = newAccuracy + '%';
                
                // Mejorar tiempo de entrenamiento (optimización)
                const currentTime = parseFloat(document.getElementById('timeValue').textContent);
                const newTime = Math.max(currentTime - 0.5, 1);
                
                document.getElementById('timeValue').textContent = newTime.toFixed(1) + 'h';
                document.getElementById('timeBar').style.width = (newTime / 24 * 100) + '%';
                
                // Restaurar botón después de la simulación
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                
                // Mostrar notificación de éxito
                showNotification(`Simulación completada: ${archData.name} optimizada exitosamente`, 'success');
            }
        }, 100);
    }

    // Función para mostrar gráficos detallados - MEJORADA
    function showDetailedCharts() {
        // Verificar si Chart.js está disponible
        if (typeof Chart === 'undefined') {
            showNotification('Cargando librería de gráficos...', 'info');
            loadChartJS();
            return;
        }
        
        const activeArch = document.querySelector('.architecture-btn.active');
        const archType = activeArch ? activeArch.dataset.arch : 'cnn';
        
        // Crear modal de gráficos detallados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-chart-modal-btn absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-neural-accent-light">
                    <i class="fas fa-chart-bar mr-2"></i> Análisis Comparativo Detallado
                </h2>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-neural-accent-light">Rendimiento por Arquitectura</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedLineChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-900/50 rounded-xl p-4">
                            <h4 class="font-bold text-lg mb-4 text-center text-neural-accent-secondary-light">Comparación de Métricas</h4>
                            <div class="w-full h-64">
                                <canvas id="detailedBarChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-xl p-4">
                        <h4 class="font-bold text-lg mb-4 text-center text-purple-300">Análisis Multidimensional (Radar)</h4>
                        <div class="w-full h-80">
                            <canvas id="detailedRadarChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900/40 rounded-lg p-4">
                        <h4 class="font-bold mb-3 text-neural-accent-light">Interpretación de Resultados:</h4>
                        <p class="text-text-secondary text-sm">
                            Los gráficos muestran un análisis comparativo entre diferentes arquitecturas de redes neuronales. 
                            Las CNN destacan en tareas de visión, mientras que los Transformers dominan en procesamiento de lenguaje. 
                            Las GAN son ideales para generación de contenido y las RNN para datos secuenciales.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 justify-center mt-6">
                    <button id="exportChartBtn" class="px-6 py-3 bg-gradient-to-r from-neural-accent to-neural-accent-dark text-white font-bold rounded-xl shadow-lg shadow-neural-accent/30 hover:shadow-xl hover:shadow-neural-accent/40 transition-all duration-300">
                        <i class="fas fa-download mr-2"></i> Exportar Datos
                    </button>
                    <button class="close-chart-btn px-6 py-3 bg-gray-800 border border-border text-text-primary font-bold rounded-xl hover:bg-gray-700 transition-all duration-300">
                        <i class="fas fa-times mr-2"></i> Cerrar
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
        
        // Crear gráficos detallados
        setTimeout(() => {
            // Gráfico de líneas detallado
            const detailedLineCanvas = document.getElementById('detailedLineChart');
            if (detailedLineCanvas && typeof Chart !== 'undefined') {
                if (detailedLineChart) {
                    detailedLineChart.destroy();
                }
                
                const ctx = detailedLineCanvas.getContext('2d');
                detailedLineChart = createLineChart(ctx, getDetailedLineChartData());
            }
            
            // Gráfico de barras detallado
            const detailedBarCanvas = document.getElementById('detailedBarChart');
            if (detailedBarCanvas && typeof Chart !== 'undefined') {
                if (detailedBarChart) {
                    detailedBarChart.destroy();
                }
                
                const ctx = detailedBarCanvas.getContext('2d');
                detailedBarChart = createBarChart(ctx, getDetailedBarChartData());
            }
            
            // Gráfico de radar detallado
            const detailedRadarCanvas = document.getElementById('detailedRadarChart');
            if (detailedRadarCanvas && typeof Chart !== 'undefined') {
                if (detailedRadarChart) {
                    detailedRadarChart.destroy();
                }
                
                const ctx = detailedRadarCanvas.getContext('2d');
                detailedRadarChart = createRadarChart(ctx, getDetailedRadarChartData(archType));
            }
        }, 50);
        
        // Configurar botones
        const closeModal = () => {
            modal.querySelector('.bg-card-bg-solid').classList.remove('scale-100');
            modal.querySelector('.bg-card-bg-solid').classList.add('scale-95');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        modal.querySelector('.close-chart-modal-btn').addEventListener('click', closeModal);
        modal.querySelector('.close-chart-btn').addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.getElementById('exportChartBtn').addEventListener('click', function() {
            showNotification('Datos de gráficos exportados exitosamente', 'success');
        });
    }

    // Función para obtener datos para gráfico de líneas detallado
    function getDetailedLineChartData() {
        const epochs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        const cnnAccuracy = [65, 75, 82, 87, 91, 93, 94, 95, 95.5, 96];
        const transformerAccuracy = [50, 65, 78, 86, 91, 93.5, 95, 96, 96.5, 97];
        const rnnAccuracy = [60, 70, 78, 84, 88, 90, 91, 91.5, 92, 92.5];
        
        return {
            labels: epochs.map(e => `${e}`),
            datasets: [
                {
                    label: 'CNN',
                    data: cnnAccuracy,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Transformer',
                    data: transformerAccuracy,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'RNN/LSTM',
                    data: rnnAccuracy,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de barras detallado
    function getDetailedBarChartData() {
        const architectures = ['CNN', 'RNN', 'Transformer', 'GAN'];
        const accuracy = [94.2, 88.5, 96.8, 82.3];
        const speed = [85, 70, 50, 65];
        const memoryEfficiency = [75, 80, 40, 60];
        
        return {
            labels: architectures,
            datasets: [
                {
                    label: 'Precisión (%)',
                    data: accuracy,
                    backgroundColor: 'rgba(139, 92, 246, 0.7)',
                    borderColor: '#8b5cf6',
                    borderWidth: 1
                },
                {
                    label: 'Velocidad',
                    data: speed,
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: '#10b981',
                    borderWidth: 1
                },
                {
                    label: 'Eficiencia Mem.',
                    data: memoryEfficiency,
                    backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    borderColor: '#f59e0b',
                    borderWidth: 1
                }
            ]
        };
    }

    // Función para obtener datos para gráfico de radar detallado
    function getDetailedRadarChartData(architecture) {
        const archData = architecturesData[architecture];
        
        // Datos para todas las arquitecturas
        const labels = ['Precisión', 'Velocidad', 'Eficiencia', 'Escalabilidad', 'Interpretabilidad'];
        
        return {
            labels: labels,
            datasets: [
                {
                    label: 'CNN',
                    data: [94.2, 85, 75, 70, 60],
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderColor: '#8b5cf6',
                    pointBackgroundColor: '#8b5cf6',
                    borderWidth: 1
                },
                {
                    label: 'RNN',
                    data: [88.5, 70, 80, 60, 75],
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderColor: '#10b981',
                    pointBackgroundColor: '#10b981',
                    borderWidth: 1
                },
                {
                    label: 'Transformer',
                    data: [96.8, 50, 40, 90, 40],
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderColor: '#f59e0b',
                    pointBackgroundColor: '#f59e0b',
                    borderWidth: 1
                },
                {
                    label: archData.name,
                    data: [
                        archData.accuracy,
                        100 - (archData.trainingTime * 5),
                        100 - (archData.memoryUsage * 4),
                        archData.scalability || 70,
                        archData.interpretability || 60
                    ],
                    backgroundColor: `${archData.color}40`,
                    borderColor: archData.color,
                    pointBackgroundColor: archData.color,
                    borderWidth: 3,
                    pointRadius: 5
                }
            ]
        };
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
                document.getElementById('specsModal').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('specsModal').classList.add('opacity-100');
                    document.querySelector('#specsModal > div').classList.remove('scale-95');
                    document.querySelector('#specsModal > div').classList.add('scale-100');
                }, 10);
            });
        }
        
        // Botón de comparación
        const compareArchitecturesBtn = document.getElementById('compareArchitecturesBtn');
        if (compareArchitecturesBtn) {
            compareArchitecturesBtn.addEventListener('click', () => {
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
                const chartModal = document.querySelector('.fixed.inset-0.bg-black\\/90'); // Modal de gráficos
                
                if (specsModal && !specsModal.classList.contains('hidden')) {
                    closeModalBtn.click();
                }
                if (compareModal && !compareModal.classList.contains('hidden')) {
                    closeCompareModalBtn.click();
                }
                if (chartModal) {
                    chartModal.querySelector('.close-chart-modal-btn')?.click();
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
        document.querySelectorAll('.card, .timeline-item, .stat-card').forEach(el => {
            el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
            observer.observe(el);
        });
        
        console.log('Animaciones inicializadas');
    }

    // Función para simulación de evolución tecnológica
    function simulateTechEvolution() {
        const btn = document.getElementById('simulateEvolutionBtn');
        const originalHTML = btn.innerHTML;
        
        // Cambiar estado del botón
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Simulando evolución...';
        btn.disabled = true;
        
        // Mostrar progreso
        const steps = [
            "1958: Perceptrón de Rosenblatt...",
            "1969: Invierno de la IA...",
            "1986: Backpropagation...",
            "1997: LSTM...",
            "2012: AlexNet...",
            "2014: GAN...",
            "2015: ResNet...",
            "2017: Transformer...",
            "2018: BERT...",
            "2020: GPT-3...",
            "2023: Multimodalidad..."
        ];
        
        let step = 0;
        const progressInterval = setInterval(() => {
            if (step < steps.length) {
                btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> ${steps[step]}`;
                step++;
            }
        }, 500);
        
        // Simular proceso completo
        setTimeout(() => {
            clearInterval(progressInterval);
            
            // Mostrar resultados
            showTechEvolutionResults();
            
            // Restaurar botón
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 6000);
    }

    // Función para mostrar resultados de evolución tecnológica
    function showTechEvolutionResults() {
        const results = [
            { type: 'Parámetros (1958-2023)', value: '10² → 10¹¹', color: '#8b5cf6', icon: 'fa-chart-bar' },
            { type: 'Precisión ImageNet', value: '~75% → ~90%', color: '#10b981', icon: 'fa-bullseye' },
            { type: 'Velocidad entrenamiento', value: 'Meses → Horas', color: '#f59e0b', icon: 'fa-tachometer-alt' },
            { type: 'Aplicaciones prácticas', value: '0 → 1000+', color: '#ef4444', icon: 'fa-cogs' }
        ];
        
        // Crear modal de resultados
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-card-bg-solid border border-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500 scale-95">
                <button class="close-evolution-modal absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-700 transition-colors text-xl">
                    &times;
                </button>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 text-neural-accent-light">
                    <i class="fas fa-expand-arrows-alt mr-2"></i> Evolución de las Redes Neuronales
                </h2>
                <div class="mb-6">
                    <p class="text-text-secondary mb-4">Simulación del desarrollo histórico de las arquitecturas de redes neuronales desde 1958 hasta la actualidad:</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    ${results.map(result => `
                        <div class="bg-gray-900/50 rounded-xl p-4 text-center">
                            <div class="text-2xl md:text-3xl mb-2" style="color: ${result.color};">
                                <i class="fas ${result.icon}"></i>
                            </div>
                            <div class="text-2xl md:text-3xl font-black mb-1" style="background: linear-gradient(90deg, ${result.color}, ${result.color}99); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${result.value}</div>
                            <div class="text-sm text-text-secondary">${result.type}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="bg-gray-900/50 rounded-lg p-4 mb-6">
                    <div class="font-mono text-sm space-y-1">
                        <span class="text-neural-accent-light"># Tendencias futuras (2024-2030):</span><br>
                        <span class="text-text-secondary">• Modelos multimodales más eficientes</span><br>
                        <span class="text-text-secondary">• Arquitecturas neuro-simbólicas híbridas</span><br>
                        <span class="text-text-secondary">• Redes con aprendizaje continuo (lifelong learning)</span><br>
                        <span class="text-text-secondary">• Hardware especializado (TPUs, neuromórfico)</span><br>
                        <span class="text-text-secondary">• Reducciones en consumo energético</span>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="close-evolution-btn px-6 py-3 bg-gradient-to-r from-neural-accent to-neural-accent-dark text-white font-bold rounded-xl shadow-lg shadow-neural-accent/30">
                        <i class="fas fa-check mr-2"></i> Cerrar
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
        
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
        notification.textContent = message;
        
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

    // Mensaje de inicialización completa
    console.log('Aplicación Red Model inicializada correctamente');
});