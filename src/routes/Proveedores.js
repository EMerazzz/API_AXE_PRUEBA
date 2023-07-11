const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA DE PROVEEDORES
router.get('/selproveedores', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_PROVEEDORES()', (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD Proveedores');
            
        }
    });

});
//MOSTRAR DATOS DE LA TABLA PROVEEDORES SEGUN COD_PROVEEDORES
router.get('/selproveedores/:COD_PROVEEDORES', (req, res) => {
    const { COD_PROVEEDORES } = req.params;
    // console.log(COD_PROVEEDORES); 
   
    mysqlConnection.query('SELECT * FROM PR_PROVEEDORES WHERE COD_PROVEEDORES = ?', [COD_PROVEEDORES], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
   });

});

//INSERTAR DATOS EN LA TABLA PERSONAS
router.post('/insproveedores', (req, res) => {
    const {codpersona,nameproveedor} = req.body;
   // console.log(cod, nameem);
    const query = `
      SET @codpersona = ?;
      SET @nameproveedor = ?;
      
      CALL INS_PROVEEDORES(@codpersona, @nameproveedor);
    `;
    mysqlConnection.query(query, [codpersona, nameproveedor], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Proveedor Ingresado'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST DE LA TABLA PERSONAS

  module.exports = router;