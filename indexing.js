
// how the data is retrieved 

// info about collection you are working on ?

db.getCollectionInfos({name: "students"})


/// import the db --> invertory


db.product.find().count() // total no of documents 

// check the index on product 


db.getCollectionInfos({name :"product"}) // show the index on this db 



/// get product --> brandname Denny 

db.product.find({brand_name: "Denny"})

// get no of returned documents
db.product.find({brand_name: "Denny"}).count()


/// execution details of getting the result

db.product.find({brand_name: "Denny"}).explain('executionStats')








// speed up search 


/// create index ?? 

db.product.createIndex({"brand_name": 1});


db.product.dropIndex({"brand_name": 1})














