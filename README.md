# 🌐 Herramienta de Infraestructura de Red con IA
### Diseño automatizado de redes empresariales · Cisco IOS · OSPF · VLANs · Simulación NOC

![Version](https://img.shields.io/badge/version-2.0-00d4ff?style=flat-square)
![Vendor](https://img.shields.io/badge/vendor-Cisco-00bceb?style=flat-square)
![Routing](https://img.shields.io/badge/routing-OSPF-00ff9d?style=flat-square)
![Simulator](https://img.shields.io/badge/simulator-NOC-ff6b35?style=flat-square)
![AI](https://img.shields.io/badge/AI-Claude%20Sonnet-0066ff?style=flat-square)
![Status](https://img.shields.io/badge/status-functional-00ff9d?style=flat-square)

---

## 📋 Descripción del Proyecto

**Herramienta de Infraestructura** es una aplicación web de una sola página (Single File HTML) que automatiza el diseño completo de redes empresariales. A partir de parámetros básicos del proyecto, genera automáticamente: segmentación VLAN, plan de direccionamiento IP, selección de hardware, topología de red y comandos CLI ejecutables por equipo — todo potenciado con IA (Claude Sonnet de Anthropic).

El proyecto fue desarrollado como trabajo final de curso, simulado en entorno **NOC** con equipos **Cisco**, protocolo de routing **OSPF** y una topología para una **mediana empresa de ~130 usuarios**.

---

## 🎯 Objetivos del Proyecto

- Diseñar una red empresarial segmentada, escalable y segura usando IA como apoyo
- Implementar inter-VLAN routing mediante OSPF en Switch Core Capa 3
- Aplicar seguridad Zero Trust en el firewall perimetral (ACLs + NAT)
- Configurar QoS para priorización de tráfico VoIP (DSCP EF)
- Generar comandos CLI ejecutables e independientes por cada equipo de red
- Simular y validar la conectividad completa en entorno NOC

---

## 🗺️ Topología de Red

```
                      ┌──────────────────┐
                      │   INTERNET / WAN  │
                      └────────┬─────────┘
                               │ Gi0/0 (DHCP/WAN)
                      ┌────────▼─────────┐
                      │  EMPRESA-FW-01   │  Cisco ASA / IOS-XE
                      │  Firewall + NAT  │  ACLs Zero Trust
                      │  QoS · OSPF      │  Router-on-a-Stick
                      └────────┬─────────┘
                               │ Gi0/1 (Trunk 802.1Q)
                      ┌────────▼─────────┐
                      │ EMPRESA-SW-CORE  │  Cisco Catalyst 9300
                      │  Switch L3 · SVIs│  OSPF Area 0
                      │  Spanning-Tree   │  DHCP Snooping · DAI
                      └──┬───────┬────┬──┘
                         │       │    │
           ┌─────────────┘       │    └──────────────┐
           │                     │                   │
  ┌────────▼───────┐   ┌─────────▼──────┐  ┌────────▼───────┐
  │ EMPRESA-SW-ACC-01│  │EMPRESA-SW-ACC-02│  │EMPRESA-SW-ACC-03│
  │ Catalyst 9200   │  │ Catalyst 9200   │  │ Catalyst 9200   │
  │ Acceso Capa 2   │  │ Acceso Capa 2   │  │ Acceso Capa 2   │
  │ Port-Security   │  │ Port-Security   │  │ Port-Security   │
  └────────┬────────┘  └─────────────────┘  └─────────────────┘
           │
  ┌────────▼────────┐
  │ EMPRESA-WLC-01  │  Cisco C9800-L
  │  SSID: CORP     │  WPA2-PSK · VLAN 30
  │  SSID: GUEST    │  WPA2-PSK · VLAN 70 (aislada)
  └─────────────────┘
```

---

## 📊 Plan de Direccionamiento IP

| Subred | Red | Máscara | Gateway | Rango Hosts | VLAN |
|--------|-----|---------|---------|-------------|------|
| Gestión | 192.168.1.0 | /24 | 192.168.1.1 | .10 – .250 | 10 |
| Usuarios | 192.168.2.0 | /24 | 192.168.2.1 | .10 – .250 | 20 |
| Wi-Fi | 192.168.3.0 | /24 | 192.168.3.1 | .10 – .250 | 30 |
| Servidores | 192.168.4.0 | /24 | 192.168.4.1 | .10 – .250 | 40 |
| VoIP | 192.168.5.0 | /24 | 192.168.5.1 | .10 – .250 | 50 |
| Seguridad | 192.168.6.0 | /24 | 192.168.6.1 | .10 – .250 | 60 |
| Invitados | 192.168.7.0 | /24 | 192.168.7.1 | .10 – .250 | 70 |
| IoT | 192.168.8.0 | /24 | 192.168.8.1 | .10 – .250 | 80 |
| Nativa | — | — | — | Trunks | 99 |

**IPs de Management:**

| Equipo | Hostname | IP Gestión | Modelo |
|--------|----------|------------|--------|
| Firewall | EMPRESA-FW-01 | 192.168.1.1 | Cisco ASA/IOS-XE |
| Switch Core | EMPRESA-SW-CORE-01 | 192.168.1.2 | Catalyst 9300 |
| Switch Acceso 1 | EMPRESA-SW-ACC-01 | 192.168.1.11 | Catalyst 9200 |
| Switch Acceso 2 | EMPRESA-SW-ACC-02 | 192.168.1.12 | Catalyst 9200 |
| Switch Acceso 3 | EMPRESA-SW-ACC-03 | 192.168.1.13 | Catalyst 9200 |
| Controladora Wi-Fi | EMPRESA-WLC-01 | 192.168.1.5 | C9800-L |

---

## 🔀 Segmentación VLAN

| VLAN | Nombre | Propósito |
|------|--------|-----------|
| 10 | Gestión | Administración OOB de todos los equipos de red |
| 20 | Usuarios | Puestos de trabajo corporativos (cableados) |
| 30 | Wi-Fi | Usuarios inalámbricos corporativos |
| 40 | Servidores | Infraestructura de servidores y VMs |
| 50 | VoIP | Telefonía IP — prioridad QoS DSCP EF |
| 60 | Seguridad | Cámaras IP y sistemas físicos de seguridad |
| 70 | Invitados | Red aislada para visitantes — sin acceso interno |
| 80 | IoT | Dispositivos IoT y sensores — aislados |
| 99 | Nativa | VLAN nativa para trunks 802.1Q |

---

## 📁 Estructura del Repositorio

```
📦 Herramienta-de-infraestructura/
│
├── 📄 README.md                          ← Documentación principal
├── 🌐 InfraDesignerPro-v2.html           ← Herramienta web con IA (single-file)
│
├── 📂 configs/                           ← Configuraciones CLI por equipo
│   ├── 📂 firewall/
│   │   └── EMPRESA-FW-01.txt             ← Firewall perimetral Cisco
│   ├── 📂 core/
│   │   └── EMPRESA-SW-CORE-01.txt        ← Switch Core L3 Cisco 9300
│   ├── 📂 acceso/
│   │   ├── EMPRESA-SW-ACC-01.txt         ← Switch Acceso 1
│   │   ├── EMPRESA-SW-ACC-02.txt         ← Switch Acceso 2
│   │   └── EMPRESA-SW-ACC-03.txt         ← Switch Acceso 3
│   └── 📂 wifi/
│       └── EMPRESA-WLC-01.txt            ← Controladora Wi-Fi C9800-L
│
├── 📂 docs/
│   ├── topologia.md                      ← Descripción detallada de la topología
│   ├── direccionamiento.md               ← Plan de IP y VLANs ampliado
│   └── pruebas.md                        ← Pruebas de conectividad y resultados
│
├── 📂 prompts/
│   └── prompts-ia.md                     ← Prompts utilizados con Claude IA
│
└── 📂 evidencias/
    └── capturas.md                       ← Guía y registro de evidencias NOC
```

---

## 🔧 Herramienta Principal — Infra Designer Pro 360°

El archivo `InfraDesignerPro-v2.html` es la herramienta central del proyecto. Es una aplicación web completa que funciona **sin instalación ni servidor**, directamente en el navegador.

### Módulos de la herramienta

| # | Módulo | Función |
|---|--------|---------|
| 01 | **Parámetros** | Configuración inicial: organización, red base, usuarios, criticidad, fabricante, routing |
| 02 | **Servicios** | Selección de servicios activos con cálculo automático de ancho de banda |
| 03 | **IP Planning** | Generación automática de subredes por rol de red |
| 04 | **VLANs** | Segmentación automática con hasta 9 VLANs según el diseño |
| 05 | **Infraestructura** | Hardware recomendado y topología SVG dinámica por fabricante |
| 06 | **CLI por Equipo** | Comandos de configuración separados por dispositivo (tabs individuales) |
| 07 | **Reporte** | Resumen ejecutivo exportable con opción de generación IA |
| 08 | **Consola SSH** | Terminal simulada multi-dispositivo con respuestas realistas |

### Uso rápido

```bash
# 1. Clona el repositorio
git clone https://github.com/Diegotirad/Herramienta-de-infraestructura-.git

# 2. Abre el archivo en tu navegador (sin servidor requerido)
open InfraDesignerPro-v2.html
```

---

## 🤖 Integración IA — Claude Sonnet (Anthropic)

La herramienta puede usar la API de Anthropic para generar:
- Comandos CLI avanzados por equipo con contexto completo del diseño
- Resúmenes ejecutivos profesionales del proyecto

**Configuración:**
1. Obtén tu API Key en [console.anthropic.com](https://console.anthropic.com)
2. Ingresa la clave en el Panel 01 de la herramienta
3. Usa los botones "Generar con IA" en los módulos CLI y Reporte

> ⚠️ La API Key se guarda en `localStorage` del navegador. No uses la herramienta en equipos compartidos con tu clave personal.

---

## ✅ Pruebas de Conectividad

| # | Prueba | Origen | Destino | Protocolo | Resultado |
|---|--------|--------|---------|-----------|-----------|
| 1 | Ping inter-VLAN | VLAN 20 (192.168.2.x) | VLAN 40 (192.168.4.x) | ICMP | ✅ OK |
| 2 | Aislamiento invitados | VLAN 70 (192.168.7.x) | VLAN 20 (192.168.2.x) | ICMP | 🚫 Bloqueado ACL |
| 3 | Acceso internet | VLAN 20 | WAN (8.8.8.8) | ICMP | ✅ OK (NAT) |
| 4 | OSPF convergencia | SW-CORE ↔ FW | Tabla de rutas | OSPF | ✅ Vecindad activa |
| 5 | SSH administración | PC gestión | SW-ACC-01 Gi0/0 | SSH v2 | ✅ OK |
| 6 | VoIP QoS | VLAN 50 | VLAN 50 | DSCP EF | ✅ Priorizado |
| 7 | DHCP por VLAN | PC VLAN 30 (Wi-Fi) | WLC / DHCP Server | DHCP | ✅ IP asignada |
| 8 | Port-Security | Puerto no autorizado | SW-ACC-01 | 802.1X | 🚫 Restringido |

> 📸 Ver carpeta `/evidencias/` para capturas de pantalla de cada prueba en NOC.

---

## 🛡️ Características de Seguridad Implementadas

- **Firewall perimetral** con ACLs Zero Trust por VLAN
- **NAT/PAT** para salida a internet
- **DHCP Snooping** en todos los switches
- **DAI** (Dynamic ARP Inspection) para prevenir ARP Spoofing
- **Port-Security** con máximo 3 MACs por puerto de acceso
- **BPDUGuard + PortFast** en puertos de usuario
- **SSH v2** exclusivo para administración (Telnet deshabilitado)
- **VLANs aisladas** para Invitados e IoT sin acceso a red corporativa
- **Spanning-Tree Root Guard** en uplinks

---

## 📡 Protocolos y Estándares

| Categoría | Protocolo / Estándar |
|-----------|---------------------|
| Routing dinámico | OSPF v2 (Area 0, Router-ID único por equipo) |
| VLAN Tagging | IEEE 802.1Q |
| Spanning Tree | Rapid-PVST+ |
| Wi-Fi | WPA2-PSK (802.11ac) |
| Calidad de servicio | DSCP EF para VoIP, marcado en ingreso |
| NAT | PAT / Overload sobre interfaz WAN |
| Seguridad L2 | DHCP Snooping, DAI, Port-Security |
| Administración | SSH v2, AAA local |
| Tiempo | NTP (pool.ntp.org) |

---

## 👤 Autor

**Diego Tirado**
Proyecto Final — Curso de Redes e Infraestructura
Herramienta desarrollada con asistencia de IA (Claude Sonnet — Anthropic)

---

<div align="center">

⭐ Si esta herramienta te fue útil, dale una estrella al repositorio

[🐛 Reportar un bug](https://github.com/Diegotirad/Herramienta-de-infraestructura-/issues) · [💡 Solicitar función](https://github.com/Diegotirad/Herramienta-de-infraestructura-/issues)

</div>
