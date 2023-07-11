const express = require ('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOSTRAR DATOS DE LA TABLA RESPALDO
router.get('/selrespaldos', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_RESPALDO()', (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD compras');
            
        }
    });

});

//MOSTRAR DATOS DE LA TABLA RESPALDO SEGUN COD_RESPALDO
router.get('/selrespaldos/:COD_RESPALDO', (req, res) => {
    const { COD_RESPALDO } = req.params;
    //console.log(COD_PERSONAS); 
  mysqlConnection.query('SELECT * FROM RP_RESPALDO WHERE COD_RESPALDO = ?', [COD_RESPALDO], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERT DE LA TABLA RESPALDOS 
router.post('/insrespaldos', (req, res) => { 
   const {  NOM_RESPALDO, DET_RESPALDO, COD_PERSONAS  } = req.body ;
   const query= `
   SET @NOM_RESPALDO = ?;
   SET @DET_RESPALDO = ?;
   SET @COD_PERSONAS = ?;
   CALL INS_RESPALDO(@NOM_RESPALDO, @DET_RESPALDO, @COD_PERSONAS ); 
   `;
    mysqlConnection.query(query, [NOM_RESPALDO, DET_RESPALDO, COD_PERSONAS ], (err, rows, fields) =>{
       if (!err){
        res.json({Status: 'Respaldo Guardado'});
       }else{
        console.log(err);
       }
    });
});//Fin de Post

//UPDATE DE LA TABLA RESPALDO
router.put('/updrespaldo/:COD_RESPALDO', (req, res) => {
    const {  NOM_RESPALDO, DET_RESPALDO, COD_PERSONAS  } = req.body ;
    const {COD_RESPALDO} = req.params;
    const query = 'CALL UPD_RESPALDO(?,?,?,?)' 
    mysqlConnection.query(query, [COD_RESPALDO,NOM_RESPALDO,DET_RESPALDO,COD_PERSONAS ], (err, rows, fields) => {
        if(!err) {
          res.json({status: 'RESPALDO  ACTUALIZADO'});
        } else {
          console.log(err);
        }
    });
});//fin put

//DELETE DATOS DE LA TABLA RESPALDO
router.delete('/delrespaldos/:COD_RESPALDO', (req, res) => {
    const {COD_RESPALDO} = req.params;
    mysqlConnection.query('DELETE FROM RP_RESPALDO WHERE COD_RESPALDO=?', [COD_RESPALDO], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'RESPALDO ELIMINADO'});
          } else {
            console.log(err);
          }
    });
});//fin delete de la tabla respaldo

module.exports= router;