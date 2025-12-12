// script.js - Archivo JavaScript externo para la página "Origen de la Electricidad"

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const themeToggle = document.getElementById('themeToggle');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const voltageSlider = document.getElementById('voltageSlider');
    const resistanceSlider = document.getElementById('resistanceSlider');
    const voltageValue = document.getElementById('voltageValue');
    const resistanceValue = document.getElementById('resistanceValue');
    const currentValue = document.getElementById('currentValue');
    const powerValue = document.getElementById('powerValue');
    const electronCount = document.getElementById('electronCount');
    const simulationVisual = document.getElementById('simulationVisual');
    
    // Variables de la simulación
    let simulationActive = false;
    let animationInterval;
    let electrons = [];
    let voltage = 5;
    let resistance = 5;
    
    // Inicializar la simulación
    function initSimulation() {
        updateCalculations();
        createElectrons(0);
    }
    
    // Crear electrones en la simulación
    function createElectrons(count) {
        // Limpiar electrones existentes
        electrons.forEach(electron => {
            if (electron.element && electron.element.parentNode) {
                electron.element.remove();
            }
        });
        
        electrons = [];
        
        // Crear nuevos electrones
        for (let i = 0; i < count; i++) {
            const electron = document.createElement('div');
            electron.className = 'electron';
            
            // Posición inicial aleatoria
            const startPosition = Math.random() * 80;
            electron.style.left = `${startPosition}%`;
            
            simulationVisual.appendChild(electron);
            
            electrons.push({
                element: electron,
                position: startPosition,
                speed: 0.5 + Math.random() * 0.5,
                direction: 1
            });
        }
        
        electronCount.textContent = count;
    }
    
    // Actualizar cálculos basados en la Ley de Ohm
    function updateCalculations() {
        voltage = parseInt(voltageSlider.value);
        resistance = parseInt(resistanceSlider.value);
        
        // Ley de Ohm: I = V / R
        const current = voltage / resistance;
        
        // Potencia: P = V * I
        const power = voltage * current;
        
        // Actualizar valores en la interfaz
        voltageValue.textContent = voltage;
        resistanceValue.textContent = resistance;
        currentValue.textContent = current.toFixed(1);
        powerValue.textContent = power.toFixed(1);
        
        // Actualizar número de electrones basados en la corriente
        const electronCountValue = Math.min(Math.floor(current * 10), 30);
        createElectrons(electronCountValue);
        
        // Actualizar velocidad de animación si está activa
        if (simulationActive) {
            startSimulation();
        }
    }
    
    // Iniciar simulación
    function startSimulation() {
        if (simulationActive) {
            clearInterval(animationInterval);
        }
        
        simulationActive = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        // Velocidad basada en voltaje y resistencia
        const baseSpeed = voltage / resistance * 0.5;
        
        animationInterval = setInterval(() => {
            electrons.forEach(electron => {
                // Mover electrón
                electron.position += electron.direction * electron.speed * baseSpeed;
                
                // Si el electrón sale por la derecha, reiniciar desde la izquierda
                if (electron.position > 100) {
                    electron.position = 0;
                }
                
                // Si el electrón sale por la izquierda, reiniciar desde la derecha
                if (electron.position < 0) {
                    electron.position = 100;
                }
                
                // Actualizar posición en pantalla
                electron.element.style.left = `${electron.position}%`;
                
                // Efecto visual: cambiar brillo según la posición
                const brightness = 0.5 + 0.5 * Math.sin(electron.position * 0.1);
                electron.element.style.boxShadow = `0 0 ${5 + brightness * 10}px ${brightness * 0.8}px var(--accent)`;
            });
        }, 50);
    }
    
    // Detener simulación
    function stopSimulation() {
        simulationActive = false;
        clearInterval(animationInterval);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        // Reducir brillo de los electrones
        electrons.forEach(electron => {
            electron.element.style.boxShadow = '0 0 5px rgba(0, 255, 136, 0.3)';
        });
    }
    
    // Reiniciar simulación
    function resetSimulation() {
        stopSimulation();
        voltageSlider.value = 5;
        resistanceSlider.value = 5;
        updateCalculations();
    }
    
    // Cambiar tema (aunque ya estamos en modo oscuro)
    function toggleTheme() {
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        if (body.classList.contains('light-theme')) {
            // Cambiar a modo oscuro
            body.classList.remove('light-theme');
            icon.className = 'fas fa-moon';
            text.textContent = 'Modo Oscuro';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Modo Oscuro</span>';
        } else {
            // Cambiar a modo claro (opcional)
            body.classList.add('light-theme');
            icon.className = 'fas fa-sun';
            text.textContent = 'Modo Claro';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
        }
    }
    
    // Añadir estilos para el modo claro (opcional)
    const style = document.createElement('style');
    style.textContent = `
        .light-theme {
            --dark-bg: #f8fafc;
            --darker-bg: #e2e8f0;
            --card-bg: #ffffff;
            --text: #1e293b;
            --text-secondary: #475569;
            --border: #cbd5e1;
        }
        
        .light-theme .theme-toggle {
            background: var(--darker-bg);
            color: var(--text);
        }
        
        .light-theme .method-card,
        .light-theme .timeline-content,
        .light-theme .interactive-section {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
    `;
    document.head.appendChild(style);
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    startBtn.addEventListener('click', startSimulation);
    stopBtn.addEventListener('click', stopSimulation);
    resetBtn.addEventListener('click', resetSimulation);
    voltageSlider.addEventListener('input', updateCalculations);
    resistanceSlider.addEventListener('input', updateCalculations);
    
    // Inicializar
    initSimulation();
    
    // Efecto de carga inicial
    setTimeout(() => {
        startSimulation();
        setTimeout(stopSimulation, 2000);
    }, 1000);
    
    // Actualizar información en tiempo real
    setInterval(() => {
        if (simulationActive) {
            // Cambiar aleatoriamente la dirección de algunos electrones
            electrons.forEach(electron => {
                if (Math.random() < 0.01) {
                    electron.direction *= -1;
                }
            });
        }
    }, 1000);
    
    // Mostrar información sobre la Ley de Ohm
    console.log("Bienvenido a la simulación de electricidad");
    console.log("Ley de Ohm: I = V / R (Corriente = Voltaje / Resistencia)");
    console.log("Potencia: P = V * I (Potencia = Voltaje * Corriente)");
});