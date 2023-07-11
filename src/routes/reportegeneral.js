const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA REPORTE GENERAL
router.get('/selgenerales', (req, res) => { 

  mysqlConnection.query('CALL bd_beautyhn.SEL_GENERALES()', (err, rows) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log('Error de consola a BD Generales');
            
    }
  });

});
//MOSTRAR DATOS DE LA TABLA REPORTE GENERAL SEGUN COD_PERSONAS
router.get('/selgenerales/:COD_GENERAL', (req, res) => {
    const { COD_REPORTE } = req.params;
    //console.log(COD_PERSONAS); 
   mysqlConnection.query('SELECT * FROM  RP_GENERALES WHERE COD_REPORTE = ?', [COD_REPORTE], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA REPORTE GENERAL
router.post('/insgenerales', (req, res) => {
    const {namereporte,nomusuario,desreporte,codformato,fecdesde,fechasta} = req.body;
   // console.log(id, name, salary);
    const query = `
      SET @namereporte=?;
      SET @nomusuario = ?;
      SET @desreporte = ?;
      SET @codformato = ?;
      SET @fecdesde = ?;
      SET @fechasta = ?;

      CALL INS_GENERALES(@namereporte,@nomusuario,@desreporte,@codformato,@fecdesde,@fechasta);
    `;
    mysqlConnection.query(query, [namereporte,nomusuario,desreporte,codformato,fecdesde,fechasta], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Reporte General Ingresado'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST

//UPDATE DE DATOS DE LA TABLA REPORTE GENERAL
router.put('/updgenerales/:COD_REPORTE', (req, res) => {
  const {namereporte,nomusuario,desreporte,codformato,fecdesde,fechasta} = req.body;
  const {COD_REPORTE} = req.params;
  const query = 'CALL UPD_GENERALES(?,?,?,?,?,?,?)' ;


  mysqlConnection.query(query, [COD_REPORTE,namereporte,nomusuario,desreporte,codformato,fecdesde,fechasta], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'REPORTE GENERAL ACTUALIZADO'});
    } else {
      console.log(err);
    }
  });
});//fin put

//DELETE DATOS DE LA TABLA REPORTE GENERAL
router.delete('/delgenerales/:COD_REPORTE', (req, res) => {
  const {COD_REPORTE} = req.params;
  mysqlConnection.query('DELETE FROM RP_GENERALES WHERE COD_REPORTE=?', [COD_REPORTE], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'REPORTE GENERAL ELIMINADO'});
    } else {
      console.log(err);
    }
    
  });
});//fin delete de la tabla reporte general

module.exports = router;