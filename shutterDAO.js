const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://172.21.0.10:27017';
ObjectId = require('mongodb').ObjectId;
const dbName = 'shutterdb';
const thecollection = 'order';

function getOrders(keyword, callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection(thecollection);
        collection.find(keyword).toArray(function (err,found) {
            assert.equal(err,null);
            callback(found);
        });
        client.close();
    })
}

function getAllOrders(callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection(thecollection);
        collection.find({}).toArray(function (err,found) {
            assert.equal(err,null);
            callback(found);
        });
        client.close();
    })
}

function getShutterVariants(callback){
    var variants = {"material" : ["Plastic","Metal","Paper"], "position" : ["Interior","Exterior"]};
    callback(variants);
}

function ModifyJobStatus(order,index,callback) {
    var client = new MongoClient(url);
    client.connect((err) =>{
        assert.equal(null,err);
        const db = client.db(dbName);
        const collection = db.collection(thecollection);
        const query = { _id: ObjectId(order)};
        const setter = {["order.order."+index+".Finished"]:"true"};
        console.log(ObjectId(order));
        collection.updateOne(query,{$set:setter},(err,r)=>{
            callback();
            client.close();
        })
    })
}

function getOrdersForCustomer(id,callback) {
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection(thecollection);
        console.log(id);
        collection.find({"order.customerid": id}).toArray(function (err,found) {
            assert.equal(err,null);
            callback(found);
        });
        client.close();
    })
}

function checkStats(shutterType,callback) {
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection= db.collection(thecollection);
        console.log(shutterType);
        collection.countDocuments({"order.order.shutterType" : shutterType}, function(error, amount){
            if(error) return callback(error);
            client.close();
            console.log(amount);
            callback(amount);
        });
    });
}

function ModifyDate(id,date,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null,err);
        const db = client.db(dbName);
        const collection = db.collection(thecollection);
        const query = {_id: ObjectId(id)};
        const setter = {"order.date":date};
        collection.updateOne(query,{$set:setter},(err,r)=>{
            callback();
            client.close();
        })
    })
}

function CreateOrder(req, callback){
    var client = new MongoClient(url);
    client.connect((err) =>{
        assert.equal(null,err);
        const db = client.db(dbName);
        const collection = db.collection(thecollection);
        collection.insertOne(req,(err,r)=>{
            assert.equal(null,err);
            assert.equal(1,r.insertedCount);
            client.close();
            callback();
        })
    })
}

function ListRequiredParts(Type,width,height,callback){
    var parts = {"material": Type.toLowerCase(), "nails": height * 4 + width * 2, "shutterrectangles": height / 2}
    callback(parts);
    return parts;
}

function PayOrder(id,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null,err);
        const db = client.db(dbName);
        const collection = db.collection(thecollection);
        const query = {_id: ObjectId(id)};
        const setter = {"order.isPaid":"true"};
        collection.updateOne(query,{$set:setter},(err,r)=>{
            callback();
            client.close();
        })
    })
}

function CheckIfOrderValid(req) {
    var test = JSON.stringify(req);
    var obj = JSON.parse(test);
    var testVal = obj.order;
    if(testVal === undefined){
        console.log("missing data");
        return false;
    }
    if(testVal.customerid === undefined || testVal.customerid === ""){
        console.log("invalid Customer ID");
        return false;
    }
    if(testVal.phoneNumber === undefined || testVal.phoneNumber === "" || testVal.address === undefined || testVal.address === "" ){
        console.log("contact information incorrect");
        return false;
    }
    for(var i = 0;i<testVal.order.length;i++){
        if(testVal.order[i].shutterType === undefined || testVal.order[i].shutterType === "" || testVal.order[i].height === undefined || testVal.order[i].height === "" || testVal.order[i].width === undefined || testVal.order[i].width === "" || testVal.order[i].amount === undefined || testVal.order[i].amount === "" || testVal.order[i].Finished !== 'false'){
            console.log("Error in job description");
            return false;
        }
    }
    return true;
}

module.exports = {
    "getOrders" : getOrders,
    "getAllOrders" : getAllOrders,
    "getShutterVariants" : getShutterVariants,
    "ModifyJobStatus" : ModifyJobStatus,
    "getOrdersForCustomer" : getOrdersForCustomer,
    "checkStats" : checkStats,
    "ModifyDate" : ModifyDate,
    "CreateOrder" : CreateOrder,
    "ListRequiredParts" : ListRequiredParts,
    "CheckIfOrderValid" : CheckIfOrderValid,
    "PayOrder" : PayOrder
};