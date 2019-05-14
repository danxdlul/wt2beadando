function ShutterService(shutterRequestDAO){
    winston = require('winston');
    logger = winston.createLogger({
        level:'info',
        format:winston.format.json(),
        defaultMeta: {service: 'user-service'},
        transports: [
            new winston.transports.File({filename: 'errors.log',level:'error'}),
            new winston.transports.File({filename: 'combined.log'})
        ]
    });
    if(shutterRequestDAO !== undefined && shutterRequestDAO != null){
        this.shutterDAO = shutterRequestDAO;
    }
    else{
        this.shutterDAO = require('./shutterDAO');
    }
}

ShutterService.prototype.listAllOrders = function (callback) {
    this.shutterDAO.getAllOrders((req)=>{
        logger.info(`${req.length} orders were listed`);
        callback(req);
    })
};

ShutterService.prototype.FinishJob = function (id,index,success) {
    console.log("finish job"+id+" "+index);
    this.shutterDAO.ModifyJobStatus(id,index,() =>{success()})
};

ShutterService.prototype.ModifyDate = function (id,date,success) {
    this.shutterDAO.ModifyDate(id,date,()=>{success()})
};

ShutterService.prototype.checkStats = function (shutterType,callback) {
    this.shutterDAO.checkStats(shutterType,(req) => {
        callback(req);
    })
};

ShutterService.prototype.GetCustomersOrders = function (id,callback) {
    this.shutterDAO.getOrdersForCustomer(id,(req)=>{
        logger.info(`found ${req.length} orders`);
        callback(req);
    })
};

ShutterService.prototype.PayOrder = function(id,success){
    this.shutterDAO.PayOrder(id,()=>{success()})
};

ShutterService.prototype.ListReqParts = function (shutterType,width,height,callback) {
    this.shutterDAO.ListRequiredParts(shutterType,width,height,(req)=>{
        logger.info(`found ${req.length} parts`);
        callback(req);
    })
};

ShutterService.prototype.MakeOrder = function (req,suc,err) {
    this.shutterDAO.CreateOrder(req,()=>{suc()})
};

ShutterService.prototype.ListVariants = function (callback) {
    this.shutterDAO.getShutterVariants((req)=>{
        callback(req)
    })
};

module.exports = ShutterService;