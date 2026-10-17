const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
app.use(express.json());
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aalaouiabdrahim707@gmail.com',
        pass: 'abcdefghijklmnoف'
    }
});
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


    

app.post('/order', (req, res) => {
    const o = req.body;
    const file = path.join(__dirname, 'orders.csv');

    // أول مرة: كنخلقو مع العناوين
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '\uFEFFDate;Nom;Tel;Ville;Adresse;Produit;Taille;Prix\n');
    }

    const clean = v => '"' + String(v || '').replace(/"/g, '""') + '"';
    const line = [
        new Date().toLocaleString('fr-FR'),
        o.nom, o.tel, o.ville, o.adresse, o.produit, o.taille, o.prix
    ].map(clean).join(';') + '\n';

    fs.appendFileSync(file, line);
    console.log('Nouvelle commande:', o);
    transporter.sendMail({
    from: 'aalaouiabdrahim707@gmail.com',
    to: 'aalaouiabdrahim707@gmail.com',
    subject: 'Nouvelle commande PHILO - ' + o.nom,
    text:
`Nom: ${o.nom}
Tel: ${o.tel}
Ville: ${o.ville}
Adresse: ${o.adresse}
Produit: ${o.produit}
Taille: ${o.taille}
Prix: ${o.prix} MAD`
}).catch(err => console.log('Erreur email:', err));
    res.json({ success: true });
});

// بدء تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server is running smoothly on http://localhost:${PORT}`);
});