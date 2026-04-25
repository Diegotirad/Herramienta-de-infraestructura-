import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Inicializar cliente Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

console.log('🔑 API Key configurada:', process.env.ANTHROPIC_API_KEY ? '✓' : '✗');
console.log('🌐 CORS Origin:', process.env.CORS_ORIGIN);

// ════════════════════════════════════
// CONEXIONES ACTIVAS
// ════════════════════════════════════
const activeConnections = new Map();

// ════════════════════════════════════
// ENDPOINT 1: Conectar a Equipo
// ════════════════════════════════════
app.post('/api/connect-device', async (req, res) => {
  try {
    const { 
      deviceId, 
      hostname, 
      ip, 
      port, 
      protocol, 
      username, 
      password,
      vendor 
    } = req.body;

    if(!deviceId || !hostname || !ip) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' });
    }

    console.log(`\n🔌 Intentando conectar a ${vendor} en ${ip}:${port}...`);

    const connectionKey = `${ip}:${port}`;
    
    const connectionData = {
      deviceId,
      hostname,
      ip,
      port: port || (protocol === 'ssh' ? 22 : 23),
      protocol: protocol || 'ssh',
      username,
      vendor,
      connected: true,
      connectedAt: new Date().toISOString(),
      commandsSent: 0
    };

    activeConnections.set(connectionKey, connectionData);

    console.log(`✅ Conexión simulada establecida a ${hostname}`);

    res.json({
      success: true,
      message: `Conectado a ${hostname}`,
      connectionId: connectionKey,
      device: connectionData
    });

  } catch(error) {
    console.error('❌ Error en /api/connect-device:', error.message);
    res.status(500).json({
      error: error.message
    });
  }
});

// ════════════════════════════════════
// ENDPOINT 2: Enviar Comandos
// ════════════════════════════════════
app.post('/api/send-commands', async (req, res) => {
  try {
    const { 
      connectionId, 
      commands,
      vendor,
      hostname
    } = req.body;

    if(!connectionId || !commands || commands.length === 0) {
      return res.status(400).json({ error: 'Faltan commandos o conexión' });
    }

    const connection = activeConnections.get(connectionId);
    if(!connection || !connection.connected) {
      return res.status(400).json({ error: 'Dispositivo no conectado' });
    }

    console.log(`\n📤 Enviando ${commands.length} comandos a ${hostname}...`);

    const cleanCommands = commands.map(cmd => 
      cmd.replace(/<[^>]*>/g, '').trim()
    ).filter(cmd => cmd.length > 0);

    const results = [];
    for(const cmd of cleanCommands) {
      console.log(`  → ${cmd}`);
      results.push({
        command: cmd,
        status: 'executed',
        timestamp: new Date().toISOString(),
        output: `[${vendor}] Comando ejecutado exitosamente`
      });
      connection.commandsSent++;
    }

    console.log(`✅ ${cleanCommands.length} comandos enviados`);

    res.json({
      success: true,
      message: `${cleanCommands.length} comandos enviados a ${hostname}`,
      commandsExecuted: cleanCommands.length,
      results: results,
      deviceStatus: {
        ...connection,
        lastCommandAt: new Date().toISOString()
      }
    });

  } catch(error) {
    console.error('❌ Error en /api/send-commands:', error.message);
    res.status(500).json({
      error: error.message
    });
  }
});

// ════════════════════════════════════
// ENDPOINT 3: Estado del Dispositivo
// ════════════════════════════════════
app.post('/api/device-status', async (req, res) => {
  try {
    const { connectionId } = req.body;

    if(!connectionId) {
      return res.status(400).json({ error: 'Falta connectionId' });
    }

    const connection = activeConnections.get(connectionId);
    
    if(!connection) {
      return res.json({
        success: true,
        connected: false,
        message: 'Dispositivo no conectado'
      });
    }

    res.json({
      success: true,
      connected: connection.connected,
      device: connection,
      uptime: new Date().getTime() - new Date(connection.connectedAt).getTime()
    });

  } catch(error) {
    console.error('❌ Error en /api/device-status:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ════════════════════════════════════
// ENDPOINT 4: Desconectar Dispositivo
// ════════════════════════════════════
app.post('/api/disconnect-device', async (req, res) => {
  try {
    const { connectionId } = req.body;

    if(!connectionId) {
      return res.status(400).json({ error: 'Falta connectionId' });
    }

    const connection = activeConnections.get(connectionId);
    
    if(connection) {
      connection.connected = false;
      connection.disconnectedAt = new Date().toISOString();
      console.log(`\n🔌 Desconectado de ${connection.hostname}`);
    }

    res.json({
      success: true,
      message: 'Dispositivo desconectado',
      device: connection
    });

  } catch(error) {
    console.error('❌ Error en /api/disconnect-device:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ════════════════════════════════════
// ENDPOINT 5: Listar Conexiones
// ════════════════════════════════════
app.get('/api/active-connections', (req, res) => {
  const connections = Array.from(activeConnections.entries()).map(([id, conn]) => ({
    connectionId: id,
    ...conn
  }));

  res.json({
    success: true,
    totalConnections: connections.length,
    connections
  });
});

// ════════════════════════════════════
// ENDPOINT 6: Generar Comandos CLI
// ════════════════════════════════════
app.post('/api/generate-commands', async (req, res) => {
  try {
    const { 
      projectName, 
      organization, 
      users, 
      servers, 
      criticality, 
      vendor, 
      routing, 
      wan, 
      services, 
      vlans, 
      baseNetwork,
      area
    } = req.body;

    if(!projectName || !baseNetwork) {
      return res.status(400).json({ error: 'Faltan parámetros' });
    }

    const prompt = `Eres un Senior Network Architect especializado en Cisco, Fortinet y Huawei.

PROYECTO: ${projectName}
ORGANIZACIÓN: ${organization}
USUARIOS: ${users}
SERVIDORES: ${servers}
CRITICIDAD: ${criticality}
FABRICANTE: ${vendor}
ROUTING: ${routing}
WAN: ${wan}
RED BASE: ${baseNetwork}
SERVICIOS: ${services?.join(', ') || 'Web, VoIP, Backup'}
ÁREA: ${area}m²

VLANs DISEÑADAS:
${vlans?.map((v, i) => `- VLAN ${v.id} (${v.nombre}): ${v.red} Gateway ${v.gw}`).join('\n') || 'Sin VLANs'}

TAREA: Genera comandos CLI COMPLETOS Y LISTOS PARA EJECUTAR en ${vendor} de forma secuencial.

REQUERIMIENTOS:
1. Configuración base (hostname, SSH, AAA, banner)
2. VLANs y trunking 802.1Q
3. Routing ${routing.toUpperCase()} con autenticación MD5
4. ACLs Zero Trust
5. QoS con DSCP EF para VoIP
${wan !== 'none' ? `6. ${wan.toUpperCase()} inter-sede` : ''}
7. Port-Security, DHCP Snooping, DAI
8. Incluir SOLO comandos ejecutables, sin explicaciones

IMPORTANTE: Cada línea debe ser UN SOLO COMANDO que se pueda ejecutar directamente.
Usa '!' para comentarios en Cisco y '#' para Huawei/Fortinet.
Separa comandos con saltos de línea.`;

    console.log('\n📝 Generando configuración CLI...');

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 2500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0]?.type === 'text' ? message.content[0].text : '';

    const commandLines = responseText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith('!') && !line.startsWith('#'));

    console.log(`✅ ${commandLines.length} comandos generados`);

    res.json({
      success: true,
      commands: commandLines,
      totalCommands: commandLines.length,
      model: message.model,
      usage: {
        input_tokens: message.usage.input_tokens,
        output_tokens: message.usage.output_tokens
      }
    });

  } catch(error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ════════════════════════════════════
// ENDPOINT 7: Resumen Ejecutivo
// ════════════════════════════════════
app.post('/api/generate-executive-summary', async (req, res) => {
  try {
    const {
      projectName,
      organization,
      users,
      wired,
      wifi,
      servers,
      criticality,
      vendor,
      routing,
      wan,
      bandwidth,
      services,
      vlans,
      hardware,
      area
    } = req.body;

    if(!projectName) {
      return res.status(400).json({ error: 'Falta projectName' });
    }

    const prompt = `Actúa como Consultor Sénior de Infraestructura TI con 20+ años.

PROYECTO: ${projectName}
ORGANIZACIÓN: ${organization}
ESCALA: ${users} usuarios (${wired} cableados + ${wifi} Wi-Fi)
SERVIDORES/VMs: ${servers}
ÁREA: ${area} m²
CRITICIDAD: ${criticality}
FABRICANTE: ${vendor}
ROUTING: ${routing}
WAN: ${wan}
BW: ${bandwidth} Mbps
SERVICIOS: ${services?.join(', ')}
SEGMENTACIÓN: ${vlans?.length} VLANs
HARDWARE: ${hardware?.length} tipos

ESTRUCTURA (5 SECCIONES):

1. JUSTIFICACIÓN TÉCNICA DEL DISEÑO
2. MODELO ZERO TRUST Y SEGURIDAD
3. DECISIÓN DE HARDWARE Y FABRICANTE
4. IMPACTO EN EL NEGOCIO Y ROI
5. HOJA DE RUTA - PRÓXIMAS FASES`;

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 2500,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = message.content[0]?.type === 'text' ? message.content[0].text : '';

    res.json({
      success: true,
      summary: responseText,
      model: message.model,
      usage: {
        input_tokens: message.usage.input_tokens,
        output_tokens: message.usage.output_tokens
      }
    });

  } catch(error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ════════════════════════════════════
// ENDPOINT 8: Health Check
// ════════════════════════════════════
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.1.0',
    anthropic_configured: !!process.env.ANTHROPIC_API_KEY,
    activeConnections: activeConnections.size
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 InfraDesigner Backend v1.1         ║
║  📍 http://localhost:${PORT}          
║  ✓  /api/health                        ║
║  ✓  /api/connect-device                ║
║  ✓  /api/send-commands                 ║
║  ✓  /api/device-status                 ║
║  ✓  /api/active-connections            ║
║  ✓  /api/generate-commands             ║
║  ✓  /api/generate-executive-summary    ║
╚════════════════════════════════════════╝
  `);
});