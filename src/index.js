const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use(require('./routes/personas'));
app.use(require('./routes/compras'));
app.use(require('./routes/ventas'));
app.use(require('./routes/proveedores'));
app.use(require('./routes/clientes'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/respaldos'));
app.use(require('./routes/agendas'));
app.use(require('./routes/citarapida'));
app.use(require('./routes/asistencia'));
app.use(require('./routes/formato'));
app.use(require('./routes/reportegeneral'));
app.use(require('./routes/inventario'));
app.use(require('./routes/producto'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

