const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA VENTAS
router.get('/selventas', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_VENTA();', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD Ventas');
            
        }
    });

});

//MOSTRAR DATOS DE LA TABLA VENTAS SEGUN COD_VENTAS
router.get('/selventas/:COD_VENTAS', (req, res) => {
    const { COD_VENTAS } = req.params;
    //console.log(COD_COMPRAS); 
  mysqlConnection.query('SELECT * FROM CV_VENTAS WHERE COD_VENTAS = ?', [COD_VENTAS], (err, rows) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA VENTAS
router.post('/insventas', (req, res) => {
  const {nompersona, codpersonas, numpersona, dircorreo,tipservicio,tipproducto, nomproducto, canproducto, totventa, codproducto} = req.body;
   // console.log(id, name, salary);
    const query = `
      SET @nompersona = ?;
      SET @codpersonas = ?;
      SET @numpersona = ?;
      SET @dircorreo = ?;
      SET @tipservicio =?;
      SET @tipproducto = ?;
      SET @nomproducto = ?;
      SET @canventa = ?;
      SET @totventa = ?;
      SET @codproducto = ?;
      CALL INS_VENTAS(@nompersona,@codpersonas, @numpersona, @dircorreo,@tipservicio,@tipproducto, @nomproducto, @canventa, @totventa, @codproducto);
    `;
    mysqlConnection.query(query, [nompersona,codpersonas, numpersona, dircorreo,tipservicio,tipproducto, nomproducto, canproducto, totventa, codproducto], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'VENTA Ingresada'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST


//UPDATE DE DATOS DE LA TABLA VENTAS
  router.put('/updventas/:COD_VENTAS', (req, res) => {
    const {codproducto,nompersona,numpersona, dircorreo,tipservicio, tipproducto, nomproducto, canproducto, totventa, fecventa} = req.body;
    const {COD_VENTAS} = req.params;
    const query = 'CALL UPD_VENTAS(?,?,?,?,?,?,?,?,?,?,?)' 


    mysqlConnection.query(query, [codproducto,COD_VENTAS,nompersona,numpersona, dircorreo,tipservicio, tipproducto, nomproducto, canproducto, totventa, fecventa], (err, rows, fields) => {
        if(!err) {
          res.json({status: 'VENTA ACTUALIZADA'});
        } else {
          console.log(err);
        }
    });

  });//fin put

//DELETE DATOS DE LA TABLA VENTAS
router.delete('/delventas/:COD_VENTAS', (req, res) => {
    const {COD_VENTAS} = req.params;
    mysqlConnection.query('DELETE FROM CV_VENTAS WHERE COD_VENTAS=?', [COD_VENTAS], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'VENTA ELIMINADA'});
          } else {
            console.log(err);
          }
    });
});//fin delete de la tabla ventas

module.exports = router;