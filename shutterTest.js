var assert = require('assert');
var DAO = require('./shutterDAO');

describe('Test for accepting correct order', function () {
    it('testing with correct data',function () {
        var order = {order: {
                customerid: "2",
                phoneNumber:"06-30-111-1234",
                address:"Miskolc",
                date:"2019-05-10",
                order: [{
                    shutterType: "plastic",
                    height: "1914",
                    width:"111",
                    position:"Internal",
                    amount:"1",
                    Finished:"false"
                },
                    {
                        shutterType: "metal",
                        height: "100",
                        width:"250",
                        position:"Internal",
                        amount:"1",
                        Finished:"false"
                    }],
            }};
        assert.strictEqual(DAO.CheckIfOrderValid(order),true)
    })
});

describe('Test for denying incorrect data',function () {
    it('checking with bad data',function () {
        var order = {order: {
                customerid: "2",
                phoneNumber:"06-30-111-1234",
                address:"Miskolc",
                date:"2019-05-10",
                order: [{
                    shutterType: "",
                    height: "1914",
                    width:"111",
                    position:"",
                    amount:"1",
                    Finished:"false"
                },
                    {
                        shutterType: "metal",
                        windowHeight: "100",
                        windowWidth:"250",
                        position:"",
                        amount:"1",
                        Finished:"false"
                    }],
            }};
        assert.strictEqual(DAO.CheckIfOrderValid(order),false)
    })
})