const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA USUARIOS
router.get('/selusuarios', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_USUARIOS', (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD Usuarios');
            
        }
    });

});
//MOSTRAR DATOS DE LA TABLA USUARIOS SEGUN COD_USUARIOS
router.get('/selusuarios/:COD_USUARIOS', (req, res) => {
    const { COD_USUARIOS } = req.params;
    //console.log(COD_USUARIOS); 
  mysqlConnection.query('SELECT * FROM PR_USUARIOS WHERE COD_USUARIOS = ?', [COD_USUARIOS], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS DE LA TABLA USUARIOS DEL MODULO PERSONAS
router.post('/insusuarios', (req, res) => {
    const {codpersona, despu} = req.body;
   // console.log(cod, des);
    const query = `
      SET @codpersona = ?;
      SET @despu = ?;
      
      CALL INS_USUARIOS(@codpersona, @despu);
    `;
    mysqlConnection.query(query, [codpersona, despu], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Usuario Ingresado'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST

  module.exports = router;