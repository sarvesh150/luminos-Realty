const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files

app.post('/submit-lead', (req, res) => {
    const lead = req.body;
    fs.appendFileSync('leads.json', JSON.stringify(lead) + '\n');
    res.json({ message: 'Lead saved' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
