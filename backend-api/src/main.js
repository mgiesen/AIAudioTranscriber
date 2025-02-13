const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

// Fixe Ports
const REST_PORT = 3000;
const WS_PORT = 3001;

// Express App für REST
const app = express();
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) =>
{
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Basis-Health-Check-Route
app.get('/health', (req, res) =>
{
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

// Test-Route für POST-Anfragen
app.post('/api/test', (req, res) =>
{
    const { message } = req.body;
    res.json({
        received: message,
        timestamp: new Date().toISOString()
    });
});

// Error Handling Middleware
app.use((err, req, res, next) =>
{
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// WebSocket Server
const wss = new WebSocket.Server({ port: WS_PORT });

// WebSocket Verbindungen verwalten
const clients = new Set();

wss.on('connection', (ws, req) =>
{
    console.log(`New WebSocket connection established from ${req.socket.remoteAddress}`);
    clients.add(ws);

    // Initial status senden
    ws.send(JSON.stringify({
        type: 'status',
        status: 'connected',
        timestamp: new Date().toISOString()
    }));

    // Ping-Pong zur Verbindungsüberwachung
    ws.isAlive = true;
    ws.on('pong', () =>
    {
        ws.isAlive = true;
    });

    // Nachrichtenverarbeitung
    ws.on('message', (message) =>
    {
        try
        {
            const data = JSON.parse(message);
            ws.send(JSON.stringify({
                type: 'echo',
                data: data,
                timestamp: new Date().toISOString()
            }));
        } catch (error)
        {
            console.error('WebSocket message error:', error);
            ws.send(JSON.stringify({
                type: 'error',
                error: 'Invalid message format',
                timestamp: new Date().toISOString()
            }));
        }
    });

    ws.on('close', () =>
    {
        console.log('Client disconnected');
        clients.delete(ws);
    });

    ws.on('error', (error) =>
    {
        console.error('WebSocket error:', error);
        clients.delete(ws);
    });
});

// Regelmäßige Überprüfung der WebSocket-Verbindungen
const interval = setInterval(() =>
{
    wss.clients.forEach((ws) =>
    {
        if (ws.isAlive === false)
        {
            console.log('Terminating inactive WebSocket connection');
            clients.delete(ws);
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

// Server starten
app.listen(REST_PORT, '0.0.0.0', () =>
{
    console.log(`REST-Server läuft auf Port ${REST_PORT}`);
    console.log(`WebSocket-Server läuft auf Port ${WS_PORT}`);
});

// Error Handling
process.on('uncaughtException', (error) =>
{
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) =>
{
    console.error('Unhandled Rejection:', error);
});