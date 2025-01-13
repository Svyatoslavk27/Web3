const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

// Статичні файли для доступу до вашої веб-сторінки
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для API (адреса контракту)
app.get('/api/getContractAddress', (req, res) => {
    res.json({ contractAddress: process.env.CONTRACT_ADDRESS });
});

// Обробка кореневого шляху для доставки index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));
