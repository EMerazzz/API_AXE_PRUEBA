const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA CITA RAPIDA
router.get('/selcitarapida', (req, res) => { 

  mysqlConnection.query('CALL bd_beautyhn.SEL_CITA_RAPIDA()', (err, rows) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log('Error de consola a BD compras');
            
    }
  });

});

//MOSTRAR DATOS DE LA TABLAS CITA RAPIDA SEGUN COD_CITAS
router.get('/selcitarapida/:COD_CITA', (req, res) => {
    const { COD_CITA } = req.params;
    //console.log(COD_PERSONAS); 
   mysqlConnection.query('SELECT * FROM RV_CITA_RAPIDA WHERE COD_CITA = ?', [COD_CITA], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA CITA RAPIDA
router.post('/inscitarapida', (req, res) => {
    const {namepaciente, feccita,desasistencia,codpersona} = req.body;
   // console.log(id, name, salary);
    const query = `
      SET @namepaciente=?;
      SET @feccita = ?;
      SET @desasistencia = ?;
      SET @codpersona = ?;
    
      CALL INS_CITA_RAPIDA(@namepaciente, @feccita, @desasistencia,@codpersona);
    `;
    mysqlConnection.query(query, [namepaciente, feccita,desasistencia,codpersona], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Cita Rapida Ingresada'});
      } else {
        console.log(err);
      }
    });
  
});//FIN DEL POST

//UPDATE DE DATOS DE LA TABLA CITA RAPIDA
router.put('/updcitarapida/:COD_CITA', (req, res) => {
  const {namepaciente, feccita,desasistencia,codpersona} = req.body;
  const {COD_CITA} = req.params;
  const query = 'CALL UPD_CITA_RAPIDA(?,?,?,?,?)' 


  mysqlConnection.query(query, [COD_CITA, namepaciente, feccita,desasistencia,codpersona], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Cita Rapida Actualizada'});
    } else {
      console.log(err);
    }
  });
});//fin put

//DELETE DATOS DE LA TABLA CITA RAPIDA
router.delete('/delcitarapida/:COD_CITA', (req, res) => {
  const {COD_CITA} = req.params;
  mysqlConnection.query('DELETE FROM RV_CITA_RAPIDA WHERE COD_CITA=?', [COD_CITA], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'CITA RAPIDA ELIMINADA'});
    } else {
      console.log(err);
    }
    
  });
});//fin delete de la tabla cita rapida


module.exports = router;
