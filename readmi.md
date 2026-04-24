# 🔧 InfraDesigner Pro 360° - Herramienta de Diseño de Infraestructura de Red

**AI-Powered Network Infrastructure Designer with Real Device Configuration Management**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-blue.svg)](https://expressjs.com)
[![Anthropic API](https://img.shields.io/badge/Anthropic-Claude-orange.svg)](https://anthropic.com)

---

## 📋 Descripción

**InfraDesigner Pro 360°** es una herramienta completa de diseño de infraestructura de red que integra:

- ✅ **Diseño Inteligente**: Generación automática de arquitecturas con IA
- ✅ **Soporte Multi-Vendor**: Cisco, Huawei, Fortinet
- ✅ **Generación de CLI**: Comandos production-ready con IA (Claude)
- ✅ **Device Manager**: Conecta y configura equipos reales en tiempo real
- ✅ **IP Planning**: Cálculo automático de subnets y VLANs
- ✅ **Zero Trust Security**: Segmentación avanzada de red
- ✅ **QoS y Priorización**: Configuración de VoIP y servicios críticos
- ✅ **Reportes Ejecutivos**: Generación de documentos profesionales

---

## 🚀 Quick Start

### Requisitos
- **Node.js 20.x+**
- **Python 3.8+** (para servir frontend, opcional)
- **API Key de Anthropic** (obten gratis en https://console.anthropic.com)

### Instalación Rápida (3 pasos)

#### 1️⃣ Clonar repositorio
\`\`\`bash
git clone https://github.com/TU_USUARIO/Herramienta-de-infraestructura-.git
cd Herramienta-de-infraestructura-
\`\`\`

#### 2️⃣ Configurar Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Edita .env y agrega tu ANTHROPIC_API_KEY
\`\`\`

#### 3️⃣ Ejecutar
**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm start
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
# Opción A: Python
python -m http.server 8000

# Opción B: Node.js
npx http-server -p 8000
\`\`\`

**Accede a:** http://localhost:8000/index.html

---

## 📊 Características por Panel

| Panel | Descripción | Función |
|-------|-------------|---------|
| **01 - Parámetros** | Define scope del proyecto | Red base, usuarios, criticidad |
| **02 - Servicios** | Selecciona servicios | Calcula BW automáticamente |
| **03 - IP Planning** | Direccionamiento jerárquico | VLANs y subnets optimizadas |
| **04 - VLAN Manager** | Segmentación Zero Trust | Políticas de acceso granulares |
| **05 - Topología** | Diseño de red | Hardware recommendations |
| **06 - CLI Config** | Comandos IA | Production-ready scripts |
| **07 - Reportes** | Documentación | Exportar en TXT/PDF |
| **08 - Device Manager** | 🆕 Conexión remota | SSH/Telnet directo a equipos |

---

## 🏗️ Arquitectura

\`\`\`
┌─────────────────────────────────────────────────────────┐
│           Frontend (HTML5 + Vanilla JS)                 │
│    8 Paneles interactivos + Device Manager              │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP/REST
                  ▼
┌─────────────────────────────────────────────────────────┐
│    Backend (Express.js + Node.js)                       │
│  ┌──────────────────────────────────────────────┐       │
│  │  API Routes                                  │       │
│  │  • /api/generate-commands      (IA CLI)      │       │
│  │  • /api/generate-executive-summary           │       │
│  │  • /api/connect-device         (SSH/Telnet)  │       │
│  │  • /api/send-commands          (Exec)        │       │
│  │  • /api/device-status          (Monitor)     │       │
│  └──────────────────────────────────────────────┘       │
└─────────────────┬───────────────────────────────────────┘
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
    ┌────────┐ ┌──────┐ ┌──────────┐
    │Anthropic│ │Local │ │Dispositivos
    │Claude   │ │Mem   │ │Cisco/Huawei
    └────────┘ └──────┘ │Fortinet
                        └──────────┘
\`\`\`

---

## 📖 Documentación

- 📖 [**Installation Guide**](docs/INSTALLATION.md)
- 📖 [**Usage Guide**](docs/USAGE.md)
- 📖 [**API Reference**](docs/API.md)
- 📖 [**Architecture**](docs/ARCHITECTURE.md)
- 📖 [**Changelog**](CHANGELOG.md)

---

## 🔌 API Endpoints

### Device Management
\`\`\`bash
POST   /api/connect-device
POST   /api/send-commands
POST   /api/device-status
POST   /api/disconnect-device
GET    /api/active-connections
\`\`\`

### CLI Generation
\`\`\`bash
POST   /api/generate-commands
POST   /api/generate-executive-summary
GET    /api/health
\`\`\`

---

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** - Estructura semántica
- **Vanilla JavaScript** - Sin frameworks
- **CSS3** - Diseño moderno

### Backend
- **Node.js 20.x**
- **Express.js 4.18**
- **Anthropic SDK**
- **CORS**
- **dotenv**

---

## 📱 Ejemplo de Uso

### Paso 1: Definir Proyecto
\`\`\`
Nombre: Red Corporativa Bogotá
Organización: Empresa S.A.
Usuarios: 130 (50 cableados + 80 Wi-Fi)
Criticidad: Media
Fabricante: Cisco
\`\`\`

### Paso 2: Seleccionar Servicios
✅ VoIP
✅ Videoconferencia
✅ Backup
✅ Web

### Paso 3: Generar Diseño
Sistema crea automáticamente:
- 9 VLANs segmentadas
- Plan IP jerárquico
- Hardware recomendado
- Comandos CLI listos

### Paso 4: Conectar Dispositivo
\`\`\`
IP: 192.168.1.1
Puerto: 22
Usuario: admin
\`\`\`

### Paso 5: Enviar Comandos
Los comandos se ejecutan en tiempo real en el equipo.

---

## 🔐 Seguridad

- 🔒 CORS configurado
- 🔒 Variables sensibles en .env
- 🔒 SSH/Telnet para conexiones remotas
- 🔒 Validación de entrada en API
- 🔒 Zero Trust policies por defecto

---

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE)

---

**Made with ❤️ by Diego Tirado - 2025**