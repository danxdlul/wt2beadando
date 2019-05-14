var express = require('express');
var router = express.Router();
var service = require('./shutterService');
const ShutterService = new service();
var dao = require('./shutterDAO');

router.get('/listAllOrders',(req,res) =>{
    ShutterService.listAllOrders((req)=>{
        res.status(200).send(req);
    })
});
router.get('/stats/:shutterType',(req,res)=>{
    ShutterService.checkStats(req.params.shutterType,(req)=>{
        res.status(200).send(req.toString());
    })
});
router.get('/listOrders/:id',(req,res)=>{
    ShutterService.GetCustomersOrders(req.params.id,(req)=>{
        res.status(200).send(req)
    })
});
router.get('/getReqParts/:shutterType/:width/:height',(req,res)=>{
    ShutterService.ListReqParts(req.params.shutterType,req.params.width,req.params.height,(req)=>{
        res.status(200).send(req);
        console.log(req);
    })
});
router.get('/listShutterTypes',(req,res)=>{
    console.log("called");
    ShutterService.ListVariants((req)=>{
        res.status(200).send(req);
        console.log(req);
    })
});
router.post('/createOrder',(req,res)=>{
    console.log(req.body);
    if(!dao.CheckIfOrderValid(req.body)){
        res.status(500).send("incomplete order");
        return;
    }
    ShutterService.MakeOrder({order:req.body['order']},()=>{res.status(200).send("Order Placed")}, (err)=>{res.status(500).send(err)})
});
router.post('/JobStatusComplete/:id/:index',(req,res)=>{
    ShutterService.FinishJob(req.params.id,req.params.index,()=>{
        res.status(200).send("Job finished");
    })
});
router.post('/modifyDate/:id/:date',(req,res)=>{
    ShutterService.ModifyDate(req.params.id,req.params.date,()=>{
        res.status(200).send("Date modified")
    })
});
router.post('/payOrder/:id',(req,res)=>{
    console.log(req.params);
    ShutterService.PayOrder(req.params.id,()=>{
        res.status(200).send("Order paid")
    })
});

module.exports = router;