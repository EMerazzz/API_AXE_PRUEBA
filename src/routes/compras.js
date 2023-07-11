const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA COMPRAS
router.get('/selcompras', (req, res) => { 

  mysqlConnection.query('CALL bd_beautyhn.SEL_COMPRA();', (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log('Error de consola a BD compras');
            
    }
  });

});

//MOSTRAR DATOS DE LA TABLA COMPRAS SEGUN COD_COMPRAS
router.get('/selcompras/:COD_COMPRAS', (req, res) => {
  const { COD_COMPRAS } = req.params;
  console.log(COD_COMPRAS); 
  mysqlConnection.query('SELECT * FROM CV_COMPRAS WHERE COD_COMPRAS = ?', [COD_COMPRAS], (err, rows) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA COMPRAS
router.post('/inscompras', (req, res) => {
  const {codproveedor, codperson, tipservicio,tipproducto, nomproducto, preproducto, canproducto, totpago, feccreacion, fecvence} = req.body;
   // console.log(id, name, salary);
    const query = `
      SET @codproveedor = ?;
      SET @codperson = ?;
      SET @tipservicio =?;
      SET @tipproducto = ?;
      SET @nomproducto = ?;
      SET @preproducto = ?;
      SET @canproducto = ?;
      SET @totpago = ?;
      SET @feccreacion = ?;
      SET @fecvence = ?;
      CALL INS_COMPRAS_PRODUCTO(@codproveedor, @codperson,@tipservicio,@tipproducto, @nomproducto,@preproducto,@canproducto,@totpago,@feccreacion,@fecvence);
    `;
    mysqlConnection.query(query, [codproveedor, codperson, tipservicio,tipproducto, nomproducto, preproducto, canproducto, totpago, feccreacion, fecvence], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'COMPRA Ingresada'});
      } else {
        console.log(err);
      }
    });
  
});//FIN DEL POST


//UPDATE LOS DATOS DE LA TABLA COMPRAS
  router.put('/updcompras/:COD_COMPRAS', (req, res) => {
    const {codperson,nomperson,codproducto,nomproveedor, dircorreo,numtel,tipservicio, tipproducto, nomproducto, preproducto, canproducto, totpago, feccreacion, fecvence,codproveedor,feccompra} = req.body;
    const {COD_COMPRAS} = req.params;
    const query = 'CALL UPD_COMPRAS_PRODUCTO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)' 


    mysqlConnection.query(query, [codperson,COD_COMPRAS,nomperson,codproducto,nomproveedor, dircorreo,numtel,tipservicio, tipproducto, nomproducto, preproducto, canproducto, totpago, feccreacion, fecvence,codproveedor,feccompra], (err, rows, fields) => {
        if(!err) {
          res.json({status: 'COMPRA ACTUALIZADA'});
        } else {
          console.log(err);
        }
    });

  });//fin put

//DELETE DATOS DE LA TABLA COMPRAS
router.delete('/delcompras/:COD_COMPRAS', (req, res) => {
    const {COD_COMPRAS} = req.params;
    mysqlConnection.query('DELETE FROM CV_COMPRAS WHERE COD_COMPRAS=?', [COD_COMPRAS], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'COMPRA ELIMINADA'});
          } else {
            console.log(err);
          }
    });
});//fin delete de la tabla compras

module.exports = router;