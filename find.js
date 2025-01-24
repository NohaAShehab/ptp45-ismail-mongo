db.instructors.find()  // get all documents without condition 


db.instructors.find({}) /// pass the condition I want to apply to the object 

// we are in js env. --> all the action like we did before in js ?

db.instructors.find({
    name: "noha"
})


db.instructors.find().constructor.name


db.instructors.find().forEach((document) => {
    print(document.firstName)
})

// any type in js 0> use forEach --> convert it to toArray then --> use it 

// in mongodb ==> we have add a feature --> you can use forEach --> with cursor without converting to array ?


//// you can in find function --> cutomize 
/*

    1- customize condition of retreval documents (which documents will return with)
    2- customize fields returned in the documents


    select id , name from instructors where name = 'noha'; 

*/

db.instructors.find(
    { name: "noha" }, // condition
    {
        firstName: 1
    } // projection  ==> which data you will return with ??
)

// don't return with id ?? 

db.instructors.find(
    { firstName: "noha" }, // condition
    {
        firstName: 1,
        _id: 0 // explicitly please don't return with id 

    } // projection  ==> which data you will return with ??
)



/// select id , firstname from instructors;

db.instructors.find({ firstName: 1 })

///////////////////////////////////////////////

// delete objects

db.instructors.deleteOne({ name: "noha shehab" })
db.instructors.deleteMany({}// condition 
)



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/****************** find operators ??************************* */


// select * from instructors where id=1  ; =>> this is equal operator ?

db.instructors.find(
    { "id": 1 }
)


// comparison operators 
// 1- get instructors age > 21 ???
db.instructors.find(
    {
        age: {
            $gt: 21
        }
    }, // condition
    {} // projection 

)



db.instructors.find(
    {
        age: {
            $gte: 21
        }
    }, // condition
    {} // projection 

)


db.instructors.find(
    {
        age: {
            $lt: 21
        }
    }, // condition
    {} // projection 

)


db.instructors.find(
    {
        age: {
            $eq: 21
        }
    }, // condition
    {} // projection 

)
/////////////////////////////// check this in sql 

/***
 *  select * from instructors where age in (21 , 23); 
 */

db.instructors.find(

    {
        age: {
            $in: [21, 23]
        }
    }, // condition

    {}// projection 
)

/**************************************Logical query operators *************************************************** */
/**
 *  select * from instructors where age = 21 or age = 23;
 * 
 */

// how can we use the and , or operators in the mongo ?? 

// $and $or  $not  // top level operators 


db.instructors.find({
    $or: [
        { age: 21 },
        { age: 28 }
    ]
},
    { firstName: 1, age: 1 }
)


// get insturctors  -> salary 6200 and age is 21 or 28 ??

db.instructors.find(
    {
        $and: [
            { salary: 6200 },
            {
                $or: [
                    { age: 21 },
                    { age: 28 }
                ]
            }
        ]
    },

    {}
)
// object operators 
/******************************* Get data from embedded object ?? ******************************* */
db.instructors.find(
    {
        "address": "mansoura"
    }
);

db.instructors.find(
    {
        "address.city": "mansoura"
    }
);





// array operators 

/***************************** Array  */

// 1- get instructors --> teach mvc 

// select * from instructors -- > mvc 

db.instructors.find({
    courses: "mvc"  // mongo allow you to use this expression with the array ?? i
    // if courses is array and array contains mvc this will return with result.
},
    {

        firstName: 1,
        courses: 1
    })



    /// insturctors  --> mvc , js 



db.instructors.find(
    {
        courses: ["mvc", "js"]  /// check courses that exact match this array ? contains only mvc, js 
    }, {
        firstName:1 , 
        courses:1 
    }
)


/// 
db.instructors.find(
    {
        courses:{
            $in : ["mvc", "js"]
        }
    }, 
    {
        firstName:1,
        courses:1 
    }

)





// instructors  --> teach only 3 courses ??
db.instructors.find().forEach((document)=> {
    print("courses: ",document.courses.length)
})





db.instructors.find().forEach((document)=> {
    if (document.courses.length==3){
    print(document.firstName, document.courses.length)
    }
})



db.instructors.find(
    {
        courses: {$size: 3}
    }, {
        firstName:1 , 
        courses: 1
    }

)





db.instructors.insertOne({
    firstName: "noha", 
    lastname: "shehab", 
    subjects : [1, 15, 30]
});




db.instructors.insertOne({
    firstName: "ahmed", 
    lastname: "ali", 
    subjects : [100, 15, 30]
});



// get objects --> subjects --> array --> contains elements > 10 ?? 


db.instructors.find({
    subjects: {
        $elemMatch: {
            $gt: 10
        }
    }
})


// get documents contains subjects --> array --> array all of its elements are greater than 10 
/* this not working 
db.instructors.find({
    subjects: {
        $all :{
            $elemMatch : {$gt: 10}
        }
    }
})

*/ 

let sum = 0;
db.instructors.find().forEach((document)=>{
    sum += document.salary;
})

print(sum)


/// 

db.instructors.find().forEach((document)=>{
    if(document.salary){
    sum += document.salary;
    }
})

print(sum)




//**************************** Element operator */

db.instructors.find(
    {
        salary: {$exists: true}
    }
).forEach((document)=>{
    sum += document.salary;
    
})

print(sum)



/// I need to check if type of salary 


db.instructors.find(
    {
        salary: {$type: "number"}
    }
).forEach((document)=>{
    sum += document.salary;
    
})

print(sum)





//// 



db.instructors.insertOne({
    firstName:"noha", 
    salary: 'million'
})






















































































