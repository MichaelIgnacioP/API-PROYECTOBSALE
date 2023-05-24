const mongoose = require('mongoose');

//conexion con mongoatlas
mongoose.set("strictQuery", true);
mongoose.connect(process.env.URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((data) => {
        console.log(`Conectado a la base de datos ${data.connection.host}`)
    })