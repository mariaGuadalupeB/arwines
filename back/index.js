require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./db/index');
const routes = require('./routes/index');
const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//
app.use('/api', routes);
//

app.use((err, req, res, next) => {
    res.status(500).send(err); // .errors[0].message
})

db.sync({ force: false })
    .then(() => {
        console.log('Sequelize ON!')
        app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
    })
    .catch(console.error);