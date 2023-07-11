const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA PRODUCTO
router.get('/selproducto', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_PRODUCTO();', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD producto');
            
        }
    });

});
//MOSTRAR DATOS DE LA TABLA SEGUN COD_PRODUCTO
router.get('/selproducto/:COD_PRODUCTO', (req, res) => {
    const { COD_PRODUCTO } = req.params;
    console.log(COD_PRODUCTO); 
  mysqlConnection.query('SELECT * FROM PI_PRODUCTO WHERE COD_PRODUCTO = ?', [COD_PRODUCTO], (err, rows) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA PRODUCTO
router.post('/insproducto', (req, res) => {
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
      CALL INS_PRODUCTO_COMPRA(@codproveedor, @codperson,@tipservicio,@tipproducto, @nomproducto,@preproducto,@canproducto,@totpago,@feccreacion,@fecvence);
    `;
    mysqlConnection.query(query, [codproveedor, codperson, tipservicio,tipproducto, nomproducto, preproducto, canproducto, totpago, feccreacion, fecvence], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Producto Ingresado'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST TABLA PRODUCTO


  //UPDATE DE DATOS DE LA TABLA PRODUCTO
  router.put('/updproducto/:COD_PRODUCTO', (req, res) => {
    const {codperson,codcompra,nomperson,nomproveedor, dircorreo,numtel,tipservicio, tipproducto, nomproducto, preproducto, canproducto, totpago, feccreacion, fecvence,codproveedor,feccompra} = req.body;
    const {COD_PRODUCTO} = req.params;
    const query = 'CALL UPD_PRODUCTO_COMPRA(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)' 


    mysqlConnection.query(query, [codperson,codcompra,nomperson,COD_PRODUCTO,nomproveedor, dircorreo,numtel,tipservicio, tipproducto, nomproducto, preproducto, canproducto, totpago, feccreacion, fecvence,codproveedor,feccompra], (err, rows, fields) => {
        if(!err) {
          res.json({status: 'Producto ACTUALIZADO'});
        } else {
          console.log(err);
        }
    });

  });//fin put

//DELETE DATOS DE LA TABLA PRODUCTO
router.delete('/delproducto/:COD_PRODUCTO', (req, res) => {
    const {COD_PRODUCTO} = req.params;
    mysqlConnection.query('DELETE FROM PI_PRODUCTO WHERE COD_PRODUCTO=?', [COD_PRODUCTO], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'PRODUCTO ELIMINADO'});
          } else {
            console.log(err);
          }
    });
});//fin delete de la tabla producto



module.exports = router;
