const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA FORMATO
router.get('/selformato', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_FORMATO()', (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD Formato');
            
        }
    });

});
//MOSTRAR DATOS DE LA TABLA FORMATO SEGUN COD_FORMATO
router.get('/selformato/:COD_FORMATO', (req, res) => {
    const { COD_FORMATO } = req.params;
    //console.log(COD_PERSONAS); 
   mysqlConnection.query('SELECT * FROM  RP_FORMATO WHERE COD_FORMATO = ?', [COD_FORMATO], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA FORMATO
router.post('/insformato', (req, res) => {
    const {nameformato,tipservicio,tipformato} = req.body;
   // console.log(id, name, salary);
    const query = `
      SET @nameformato=?;
      SET @tipservicio = ?;
      SET @tipformato = ?;

   
      CALL INS_FORMATO(@nameformato,@tipservicio,@tipformato);
    `;
    mysqlConnection.query(query, [nameformato,tipservicio,tipformato], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'FORMATO Ingresado'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST

//UPDATE DE DATOS DE LA TABLA FORMATO
router.put('/updformato/:COD_FORMATO', (req, res) => {
  const {nameformato,tipservicio,tipformato} = req.body;
  const {COD_FORMATO} = req.params;
  const query = 'CALL UPD_FORMATO(?,?,?,?)' 


  mysqlConnection.query(query, [COD_FORMATO,nameformato,tipservicio,tipformato], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'FORMATO ACTUALIZADO'});
    } else {
      console.log(err);
    }
  });
});//fin put

//DELETE DATOS DE LA TABLA FORMATO
router.delete('/delformato/:COD_FORMATO', (req, res) => {
  const {COD_FORMATO} = req.params;
  mysqlConnection.query('DELETE FROM RP_FORMATO WHERE COD_FORMATO=?', [COD_FORMATO], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'FORMATO ELIMINADO'});
    } else {
      console.log(err);
    }
    
  });
});//fin delete de la tabla formato

module.exports = router;