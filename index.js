const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require('body-parser');
const candidatures = require('./routes/candidatureRoutes');
const offres = require('./routes/offreRoutes');
const profiles = require('./routes/profileRoutes');
const cors = require('cors');

const allowedOrigins = ['https://mon-portefolio-245f.vercel.app', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Check if the origin is in the allowed origins array
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));







app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/candidatures', candidatures);
app.use('/offres', offres);
app.use('/profiles', profiles);

app.listen(port, () => {
  console.log('Le serveur a démarré avec succès au port ' + port);
});
