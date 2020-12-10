
const express = require('express');
const cors=require('cors');
//const bodyParser=require('body-parser');

//const router=express();
const router= express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(cors());



function createRouter(db){

    
    router.get('/event/',function(req,res,next){
        db.query('SELECT * from data',(error,result)=>{

            if(error){
                console.log(error);
                res.status(500).json({status:'error'});
            }else{
                res.status(200).json(result);
                console.log(result);
            }

        });
    });

   


   router.get('/details/', function (req, res, next) {

    db.query(
      'SELECT * FROM details WHERE id=? ',[req.query.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.post('/userdetails', (req, res, next) => {


       db.query(
       'INSERT INTO userDetails (name,contact,address) VALUES (?,?,?)',
       [req.body.name, req.body.contact, req.body.address],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    ); 
  
  });
  
    router.post('/orderStatus', (req, res, next) => {


       db.query(
       'INSERT INTO orderStatus (orderid,status) VALUES (?,?)',
       [req.body.orderid, req.body.status],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    ); 
  
  });

   router.get('/orderStatus', function (req, res, next) {


   
    
    db.query(
      'SELECT status FROM orderStatus WHERE orderid=? ',[req.query.orderid],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );

    
  });

    return router;
}
module.exports=createRouter;