const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA DE CLIENTES
router.get('/selclientes', (req, res) => { 

  mysqlConnection.query('CALL bd_beautyhn.SEL_CLIENTES()', (err, rows) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log('Error de consola a BD Clientes');
            
    }
  });

});

//MOSTRAR DATOS DE LA TABLA CLIENTES SEGUN COD_CLIENTES
router.get('/selclientes/:COD_CLIENTES', (req, res) => {
  const { COD_CLIENTES } = req.params;
  //console.log(COD_CLIENTES); 
  mysqlConnection.query('SELECT * FROM PR_CLIENTES WHERE COD_CLIENTES = ?', [COD_CLIENTES], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA CLIENTES 
router.post('/insclientes', (req, res) => {
  const {codpersona, namecliente} = req.body;
   // console.log(cod, name);
  const query = `
  SET @codpersona = ?;
  SET @namecliente = ?;
      
  CALL INS_CLIENTES(@codpersona, @namecliente);
  `;
  mysqlConnection.query(query, [codpersona, namecliente], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Cliente Ingresado'});
    } else {
      console.log(err);
    }
  });
  
});//FIN DEL POST DE INSERT DE LA TABLA CLIENTES

module.exports = router;