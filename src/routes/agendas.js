const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA AGENDA
router.get('/selagenda', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_AGENDA()', (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD compras');
            
        }
    });

});

//MOSTRAR DATOS DE LA TABLA AGENDA SEGUN COD_AGENDA
router.get('/selagenda/:COD_AGENDA', (req, res) => {
    const { COD_AGENDA } = req.params;
    //console.log(COD_PERSONAS); 
   mysqlConnection.query('SELECT * FROM  RV_AGENDA WHERE COD_AGENDA = ?', [COD_AGENDA], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA AGENDA
router.post('/insagenda', (req, res) => {
    const {destado, id,namepaciente, numpaciente,dirpaciente, tipservicio,tipproducto,nomproducto,COD_PERSONAS} = req.body;
   // console.log(id, name, salary);
    const query = `
      SET @destado=?;
      SET @id = ?;
      SET @namepaciente = ?;
      SET @numpaciente = ?;
      SET @dirpaciente = ?;
      SET @tipservicio = ?;
      SET @tipproducto = ?;
      SET @nomproducto = ?;
      SET @codpersona = ?;
   
      CALL INS_AGENDA(@destado, @id, @namepaciente, @numpaciente, @dirpaciente, @tipservicio,@tipproducto,@nomproducto,@codpersona);
    `;
    mysqlConnection.query(query, [destado, id,namepaciente, numpaciente,dirpaciente, tipservicio,tipproducto,nomproducto,COD_PERSONAS], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'AGENDA Ingresada'});
      } else {
        console.log(err);
      }
    });
  
});//FIN DEL POST

//UPDATE DE DATOS DE LA TABLA AGENDA
router.put('/updagenda/:COD_AGENDA', (req, res) => {
  const {feccita, desestado, codid, nompaciente, numpaciente, dircorreo, tipservicio, tipproducto, nomproducto, codpersonas} = req.body;
  const {COD_AGENDA} = req.params;
  const query = 'CALL UPD_AGENDA(?,?, ?,?, ?,?,?,?,?,?,?)' 


  mysqlConnection.query(query, [COD_AGENDA,feccita, desestado, codid, nompaciente, numpaciente, dircorreo, tipservicio, tipproducto, nomproducto, codpersonas], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Persona ACTUALIZADA'});
    } else {
      console.log(err);
    }
  });
});//fin put

//DELETE DATOS DE LA TABLA AGENDA
router.delete('/delagenda/:COD_AGENDA', (req, res) => {
  const {COD_AGENDA} = req.params;
  mysqlConnection.query('DELETE FROM RV_AGENDA WHERE COD_AGENDA=?', [COD_AGENDA], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Persona ELIMINADA'});
    } else {
      console.log(err);
    }
    
  });
});//fin delete de la tabla agenda

module.exports = router;
