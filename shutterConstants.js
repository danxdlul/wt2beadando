module.exports = {
    dbName: 'shutterdb',
    collections : {
        order: {
            customerid:"customerid",
            phoneNumber:"phoneNumber",
            address:"address",
            date:"date",
            jobs : [{
                shutterType : "shutterType",
                height:"height",
                width:"width",
                amount:"amount",
                position:"position",
                Finished:"Finished",
            }],
            isPaid : "false"
        },
        orderDate: "orderDate"
    }
};