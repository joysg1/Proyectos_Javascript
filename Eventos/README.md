# 🎭 Event Manager - Gestor de Eventos Estético en JavaScript

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Un sistema elegante y visualmente atractivo para manejo de eventos en JavaScript**

[✨ Demo Online](#) | [🚀 Características](#características) | [📦 Instalación](#instalación)

![Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=Event+Manager+Preview)

</div>

## 📋 Tabla de Contenidos
- [🌟 Sobre el Proyecto](#-sobre-el-proyecto)
- [✨ Características](#-características)
- [🚀 Demo Rápida](#-demo-rápida)
- [🛠️ Instalación](#️-instalación)
- [🎯 Uso](#-uso)
- [📖 API](#-api)
- [🎨 Personalización](#-personalización)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)
- [🙏 Créditos](#-créditos)

## 🌟 Sobre el Proyecto

**Event Manager** es un gestor de eventos en JavaScript que combina funcionalidad robusta con un diseño visual excepcional. Perfecto para desarrolladores que buscan una solución elegante para manejar eventos en sus aplicaciones web.

> 💡 **¿Por qué elegir Event Manager?**
> - ✅ Interfaz visualmente impresionante
> - ✅ Código limpio y bien documentado
> - ✅ Sistema de prioridades avanzado
> - ✅ Logs en tiempo real con estilo
> - ✅ 100% responsivo

## ✨ Características

### 🎨 **Diseño Visual**
| Característica | Descripción |
|----------------|-------------|
| 🎯 **Gradientes Modernos** | Paleta de colores profesional con efectos glassmorphism |
| ⚡ **Animaciones Suaves** | Transiciones y efectos visuales cuidadosamente diseñados |
| 📱 **Responsive Design** | Se adapta perfectamente a cualquier dispositivo |
| 🌈 **Feedback Visual** | Indicadores claros para cada acción del usuario |

### ⚙️ **Funcionalidades Técnicas**
| Característica | Icono | Descripción |
|----------------|-------|-------------|
| **Gestión de Eventos** | 🔄 | Sistema completo de registro y emisión de eventos |
| **Prioridades** | 🎯 | Listeners con niveles de prioridad personalizables |
| **Logs en Tiempo Real** | 📊 | Sistema de logging visual con categorías por color |
| **Estadísticas** | 📈 | Métricas en tiempo real de eventos y listeners |
| **Manejo de Errores** | 🛡️ | Sistema robusto de captura y reporte de errores |
| **Eventos de Ejemplo** | 🎪 | Eventos preconfigurados para empezar rápido |

### 🚀 **Demo Rápida**

```javascript
// Ejemplo rápido de uso
const manager = new EventManager();

// Registrar un evento
manager.on('usuario.login', (data) => {
    console.log(`Usuario conectado: ${data.nombre}`);
}, { priority: 10 });

// Emitir evento
manager.emit('usuario.login', {
    nombre: 'Juan Pérez',
    timestamp: new Date()
});
