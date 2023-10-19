const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config()

mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true });
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use('/', require('./routers/index'));
// app.use('/api/v1/users', require('./routers/users'));
// app.use('/api/v1/rooms', require('./routers/rooms'));
// app.use('/api/v1/bookings', require('./routers/bookings'));
// app.use('/api/v1/payments', require('./routers/payments'));
// app.use('/api/v1/dashboard', require('./routers/dashboard'));

app.use((err, req, res, next) => {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message })
})
app.listen(`${process.env.PORT}`, () => { console.log(`Listening on ${process.env.PORT}`); })
