# 🚀 Guía de Instalación - InfraDesigner Pro 360°

## ✅ Requisitos Previos

- Node.js 20.x o superior
- npm 9.x o superior
- Python 3.8+ (opcional, para servir frontend)
- API Key de Anthropic (gratis en https://console.anthropic.com)

## 📥 Pasos de Instalación

### 1️⃣ Clonar el Repositorio

\`\`\`bash
git clone https://github.com/TU_USUARIO/Herramienta-de-infraestructura-.git
cd Herramienta-de-infraestructura-
\`\`\`

### 2️⃣ Configurar el Backend

\`\`\`bash
cd backend
npm install
\`\`\`

### 3️⃣ Configurar Variables de Entorno

\`\`\`bash
cp .env.example .env
\`\`\`

Edita `.env` y agrega tu API Key:

\`\`\`bash
ANTHROPIC_API_KEY=sk-ant-v4-YOUR_KEY_HERE
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:8000
\`\`\`

### 4️⃣ Ejecutar el Backend

\`\`\`bash
npm start
\`\`\`

Deberías ver:
\`\`\`
╔════════════════════════════════════════╗
║  🚀 InfraDesigner Backend v3.2         ║
║  📍 http://localhost:3001              ║
╚════════════════════════════════════════╝
\`\`\`

### 5️⃣ Ejecutar el Frontend (Nueva Terminal)

**Opción A: Con Python**
\`\`\`bash
python -m http.server 8000
\`\`\`

**Opción B: Con Node.js**
\`\`\`bash
npx http-server -p 8000
\`\`\`

### 6️⃣ Acceder a la Aplicación

Abre tu navegador en: **http://localhost:8000/index.html**

---

## 🐳 Con Docker (Opcional)

\`\`\`bash
# Construir imagen
docker-compose build

# Ejecutar
docker-compose up -d

# Acceder
http://localhost:8000
\`\`\`

---

## 🆘 Troubleshooting

### Error: "API Key no configurada"
- Verifica que .env exista en backend/
- Revisa que ANTHROPIC_API_KEY esté correctamente seteada

### Error: "Puerto 3001 en uso"
- Cambia PORT en .env a otro disponible (ej: 3002)
- O mata el proceso: \`lsof -ti:3001 | xargs kill -9\`

### Error: "Cannot find module"
- Elimina node_modules: \`rm -rf node_modules\`
- Reinstala: \`npm install\`

---

**¡Listo! Tu herramienta está instalada y funcionando.** 🎉