const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA ASISTENCIA
router.get('/selasistencia', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_ASISTENCIA()', (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD compras');
            
        }
    });

});

//MOSTRAR DATOS DE LA TABLA ASISTENCIA SEGUN COD_ASISTENCIA
router.get('/selasistencia/:COD_ASISTENCIA', (req, res) => {
    const { COD_ASISTENCIA } = req.params;
    //console.log(COD_PERSONAS); 
   mysqlConnection.query('SELECT * FROM RV_ASISTENCIA WHERE COD_ASISTENCIA = ?', [COD_ASISTENCIA], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA BD
router.post('/insasistencia', (req, res) => {
    const {codpersona,nameusuario,desasistencia,feccita} = req.body;
   // console.log(id, name, salary);
    const query = `
      SET @codpersona=?;
      SET @nameusuario=?;
      SET @desasistencia = ?;
      SET @feccita = ?;
      
    
      CALL INS_ASISTENCIA(@codpersona,@nameusuario,@desasistencia, @feccita);
    `;
    mysqlConnection.query(query, [codpersona,nameusuario,desasistencia,feccita], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Asistencia Ingresada'});
      } else {
        console.log(err);
      }
    });
  
});//FIN DEL POST

//UPDATE DE DATOS DE LA TABLA ASISTENCIA
router.put('/updasistencia/:COD_ASISTENCIA', (req, res) => {
  const {codpersona,nameusuario,desasistencia,feccita} = req.body;
  const {COD_ASISTENCIA} = req.params;
  const query = 'CALL UPD_ASISTENCIA(?,?,?,?,?)' 

  mysqlConnection.query(query, [COD_ASISTENCIA, codpersona,nameusuario,desasistencia,feccita], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Asistencia Actualizada'});
    } else {
      console.log(err);
    }
  });
});//fin put

//DELETE DATOS DE LA TABLA ASISTENCIA
router.delete('/delasistencia/:COD_ASISTENCIA', (req, res) => {
  const {COD_ASISTENCIA} = req.params;
  mysqlConnection.query('DELETE FROM RV_ASISTENCIA WHERE COD_ASISTENCIA=?', [COD_ASISTENCIA], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'CITA RAPIDA ELIMINADA'});
    } else {
      console.log(err);
    }
    
  });
});//fin delete de la tabla asistencia

module.exports = router;
