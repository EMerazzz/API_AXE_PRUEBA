const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA INVENTARIO
router.get('/selinventario', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_INVENTARIO();', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD inventario');
            
        }
    });

});
//MOSTRAR DATOS DE LA TABLA INVENTARIO SEGUN COD_INVENTARIO
router.get('/selinventario/:COD_INVENTARIO', (req, res) => {
    const { COD_INVENTARIO } = req.params;
    console.log(COD_INVENTARIO); 
  mysqlConnection.query('SELECT * FROM PI_INVENTARIO WHERE COD_INVENTARIO = ?', [COD_INVENTARIO], (err, rows) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA INVENTARIO
router.post('/insinventarios', (req, res) => {
  const {nameproveedor,codproducto,codcompra, tipservicio,tipproducto, nomproducto,preproducto,canproducto,feccreacion,fecvence} = req.body;
 // console.log(id, name, salary);
  const query = `
    SET @nameproveedor= ?;
    SET @codproducto = ?;
    SET @codcompra = ?;
    SET @tipservicio = ?;
    SET @tipproducto = ?;
    SET @nomproducto = ?;
    SET @preproducto = ?;
    SET @canproducto = ?;
    SET @feccreacion = ?;
    SET @fecvence = ?;
    CALL INS_INVENTARIO(@nameproveedor,@codproducto,@codcompra, @tipservicio,@tipproducto, @nomproducto,@preproducto,@canproducto,@feccreacion,@fecvence);
  `;
  mysqlConnection.query(query, [nameproveedor,codproducto,codcompra, tipservicio,tipproducto, nomproducto,preproducto,canproducto,feccreacion,fecvence], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Inventario Ingresado'});
    } else {
      console.log(err);
    }
  });

});//FIN DEL POST

//UPDATE DE DATOS DE LA TABLA INVENTARIO
router.put('/updinventario/:COD_INVENTARIO', (req, res) => {
    const {codproducto,codcompra,nomproveedor,tipservicio,tipproducto, nomproducto,preproducto, canproducto, feccreacion, fecvence} = req.body;
    const {COD_INVENTARIO} = req.params;
    const query = 'CALL UPD_INVENTARIO(?,?,?,?,?,?,?,?,?,?,?)' 


    mysqlConnection.query(query, [COD_INVENTARIO,codproducto,codcompra,nomproveedor,tipservicio,tipproducto, nomproducto,preproducto, canproducto, feccreacion, fecvence], (err, rows, fields) => {
        if(!err) {
          res.json({status: 'INVENTARIO ACTUALIZADO'});
        } else {
          console.log(err);
        }
    });

});//fin put

//DELETE DATOS DE LA TABLA INVENTARIO
router.delete('/deletinventario/:COD_INVENTARIO', (req, res) => {
    const {COD_INVENTARIO} = req.params;
    mysqlConnection.query('DELETE FROM PI_INVENTARIO WHERE COD_INVENTARIO=?', [COD_INVENTARIO], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'INVENTARIO ELIMINADA'});
          } else {
            console.log(err);
          }
    });
});//fin delete de la tabla inventario


module.exports = router;