const { ObjectId } = require('mongodb');
var crypto = require('crypto');

var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://gavand-sagar:62u.hGe.5UrY3!T@cluster0.whfgd5r.mongodb.net/test";
var url = "mongodb://localhost:27017"

const hash = crypto.createHash('sha256', "TutorialsPoint").digest('hex');

console.log(hash)

// insert
// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");

//   let user = {
//     username: 'sagar',
//     password: '1234'
//   }

//   dbo.collection("users").insertOne(user, function (err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     console.log(res);
//     db.close();
//   });
// });


////SORT
// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers-1").find({}).sort({ name: 1 }).toArray(function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

////Projection
// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers-1").find({}, {
//     projection: {
//       year: 1 // Id will automatically be added ; we need to set _id:0 if don't want
//     }
//   }).sort({ name: 1 }).toArray(function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

////LIMIT
// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers-1").find({})
//     .sort({
//       year: -1 // descending order
//     }).limit(3).toArray(function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
// });


// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = { name: "Company Inc", address: "Highway 37", $currentDate: {
//     createtime: true
//   } };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     console.log(res);
//     db.close();
//   });
// });


//FIND ONE
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers").findOne({_id:ObjectId('62d567e2f332ad22673c6f95')}, function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });


//QUERY
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var query = { name: /.*m.*/ };
//   dbo.collection("customers").find(   query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });



// //SORT
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var mysort = { name: -1 };
//   dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });


// //DELETE
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myquery = { address: 'Mountain 21' };
//   dbo.collection("customers").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     db.close();
//   });
// });


// //UPDATE
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myquery = { address: "Valley 345" };
//   var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
//   dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 document updated");
//     db.close();
//   });
// });




// //LIMIT
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers").find().limit(5).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });


// //JOIN
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection('orders').aggregate([
//     { $lookup:
//        {
//          from: 'products',
//          localField: 'product_id',
//          foreignField: '_id',
//          as: 'orderdetails'
//        }
//      }
//     ]).toArray(function(err, res) {
//     if (err) throw err;
//     console.log(JSON.stringify(res));
//     db.close();
//   });
// });


// MongoClient.connect(url, async (err, client) => {

//   const cart = [
//     { name: 'sunblock', sku: 5432, qty: 1, price: 5.19 },
//     { name: 'beach towel', sku: 7865, qty: 2, price: 15.99 }
//   ];
//   const payment = { customer: 98765, total: 37.17 };

//   const transactionOptions = {
//     readConcern: { level: 'snapshot' },
//     writeConcern: { w: 'majority' },
//     readPreference: 'primary'
//   };

//   const session = client.startSession();
//   try {
//     session.startTransaction(transactionOptions);

//     const ordersCollection = client.db('testdb').collection('orders');
//     const orderResult = await ordersCollection.insertOne(
//       {
//         customer: payment.customer,
//         items: cart,
//         total: payment.total,
//       },
//       { session }
//     );

//     // const customerCollection = client.db('testdb').collection('customers');
//     // await customerCollection.updateOne(
//     //   { _id: payment.customer },
//     //   { $push: { orders: orderResult.insertedId } },
//     //   { session }
//     // );

//     // const inventoryCollection = client.db('testdb').collection('inventory');
//     // for (let i = 0; i < cart.length; i++) {
//     //   const item = cart[i];

//     //   // Cancel the transaction when you have insufficient inventory
//     //   const checkInventory = await inventoryCollection.findOne(
//     //     {
//     //       sku: item.sku,
//     //       qty: { $gte: item.qty }
//     //     },
//     //     { session }
//     //   )
//     //   if (checkInventory === null) {
//     //     throw new Error('Insufficient quantity or SKU not found.');
//     //   }

//     //   await inventoryCollection.updateOne(
//     //     { sku: item.sku },
//     //     { $inc: { 'qty': -item.qty } },
//     //     { session }
//     //   );
//     // }


//     await session.commitTransaction();
//     console.log('Transaction successfully committed.');

//   } catch (error) {
//     console.log('An error occured in the transaction, performing a data rollback:' + error);
//     await session.abortTransaction();
//   } finally {
//     await session.endSession();
//   }

// })
