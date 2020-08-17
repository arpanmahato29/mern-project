const braintree = require('braintree');



var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "3rm8qxcjbtscrm55",
    publicKey: "vkycw95t9343bqy6",
    privateKey: "a4b3fcfc0368d325ee4d3f1e7c3c8676"
  });

exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, function (err, response) {
        
        if(err){
            res.status(500).send(err);
        } else {
            res.send(response);
        }
      });
}

exports.processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).json(err);
          } else {
              res.json(result);
          }
      });
}