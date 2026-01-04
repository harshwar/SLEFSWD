const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const proxy = (method, path, data, res) => {
    const req = http.request({
        hostname: 'localhost', port: 5000, path, method,
        headers: { 'Content-Type': 'application/json' }
    }, (fRes) => {
        let body = '';
        fRes.on('data', (c) => body += c);
        fRes.on('end', () => {
            try { res.status(fRes.statusCode).json(JSON.parse(body)); }
            catch (e) { res.status(fRes.statusCode).send(body); }
        });
    });
    if (data) req.write(JSON.stringify(data));
    req.end();
};

app.get('/api/read', (req, res) => proxy('GET', '/read', null, res));
app.post('/api/create', (req, res) => proxy('POST', '/create', req.body, res));
app.put('/api/update', (req, res) => proxy('PUT', `/update?id=${req.query.id}`, req.body, res));
app.delete('/api/delete', (req, res) => proxy('DELETE', `/delete?id=${req.query.id}`, null, res));

app.listen(3000, () => console.log('Gateway on 3000'));
