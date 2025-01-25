


db.instructors.aggregate()  // ===db.instructors.find()

/// aggregate --> apply pipeline --> series of steps 


db.instructors.aggregate([])

// apply different stages on data ??

// 1- match 

db.instructors.aggregate(
    [
        // each stage is an object 
        {

            $match :  {age : {$gt: 21}}
        }


 
    ] // array of stages to apply pipeline 
)


/// 2- I need to sort data according to firstName, lastName 

db.instructors.aggregate(
    [
        // each stage is an object 
        {

            $match :  {age : {$gt: 21}}
        } ,// first stage
        {

            $sort : {
                firstName:1 , 
                lastName: 1
            }
        } // sort stage 

 
    ] // array of stages to apply pipeline 
)


db.instructors.aggregate(
    [
        // each stage is an object 
        {

            $match :  {age : {$gt: 21}}
        } ,// first stage
        {

            $sort : {
                firstName:-1 , 
                lastName: 1
            }
        } // sort stage 

 
    ] // array of stages to apply pipeline 
)

/// I need to apply projection ? I need to get part of the data only 


db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$gt: 21}}
        } ,// first stage
        {
            $sort : {
                firstName:-1 , 
                lastName: 1
            }
        }, // sort stage 
        {
            $project: {firstName:1 , lastName:1 , salary:1 , age: 1}
        }
 
    ] // array of stages to apply pipeline 
)


// select salary as netsalary ---> select concat(firstName, " ", lastName) as fullname 

db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$gt: 21}}
        } ,// first stage
        {
            $sort : {
                firstName:-1 , 
                lastName: 1
            }
        }, // sort stage 
        {
            $project: {
                
                fullname : {$concat: [firstName, " ", lastName ]}
            }
        }
 
    ] // array of stages to apply pipeline 
) // reference error --> firstname 




//////////////////////////////
db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$gt: 21}}
        } ,// first stage
        {
            $sort : {
                firstName:-1 , 
                lastName: 1
            }
        }, // sort stage 
        {
            $project: {
                
                fullname : {$concat: ["firstName", " ", "lastName" ]}
            }
        }
 
    ] // array of stages to apply pipeline 
) 

///// the solution 
db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$gt: 21}}
        } ,// first stage
        {
            $sort : {
                firstName:-1 , 
                lastName: 1
            }
        }, // sort stage 
        {
            $project: {
                
                fullname : {$concat: ["$firstName", " ", "$lastName" ]}, 
                age: 1, 
                salary: 1,
                inst_salary : "$salary"
            }
        }
 
    ] // array of stages to apply pipeline 
) 


// net salary 

db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$gt: 21}}
        } ,// first stage
        {
            $sort : {
                firstName:-1 , 
                lastName: 1
            }
        }, // sort stage 
        {
            $project: {
                
                fullname : {$concat: ["$firstName", " ", "$lastName" ]}, 
                age: 1, 
                net_salary : {$multiply :["$salary", .8]}
            }
        }
 
    ] // array of stages to apply pipeline 
) 



//// array --> update element as unknown posistion $ ===> $ ==> 


// save the result in new collection ==> 

    // like select into 
    db.instructors.aggregate(
        [
            // each stage is an object 
            {
                $match :  {age : {$gt: 21}}
            } ,// first stage
            {
                $sort : {
                    firstName:-1 , 
                    lastName: 1
                }
            }, // sort stage 
            {
                $project: {
                    
                    fullname : {$concat: ["$firstName", " ", "$lastName" ]}, 
                    age: 1, 
                    net_salary : {$multiply :["$salary", .8]}
                }
            }, {
                $out : "inst_snap"
            }
     
        ] // array of stages to apply pipeline 
    ) 


    /// 

    db.instructors.aggregate(
        [
            // each stage is an object 
            {
                $match :  {age : {$gt: 21}}
            } ,// first stage
            {
                $sort : {
                    firstName:-1 , 
                    lastName: 1
                }
            }, // sort stage 
            {
                $project: {
                    
                    fullname : {$concat: ["$firstName", " ", "$lastName" ]}, 
                    age: 1, 
                    net_salary : {$multiply :["$salary", .8]}, 
                    _id: 0  // please don't do this --> as you removed the relationship between the snap collection and the original collection 
                }
            }, {
                $out : "inst_snap2"
            }
     
        ] // array of stages to apply pipeline 
    ) 









///////////////////////////////////////////////////////////////


/***************************** documents who have the same age ? ************************ */

/**
 * 
 *  select age,  count(age) from instructors 
 * group by  age 
 * 
 */


db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$exists: true}}
        } ,
        {
            $group : {
                _id : "$age" // _id --> grouping fields 
            }
        }
    ] // array of stages to apply pipeline 
) 

//// get no of instructors in each age ? 


db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$exists: true}}
        } ,
        {
            $group : {
                _id : "$age" ,// _id --> grouping fields ,
                total_instructors : {$sum : 1} ,// count no of instructor per each age , 
                total  : {$sum : "$age"} /// sum age 
            }
        }
    ] // array of stages to apply pipeline 
) 

/// total salaries per each age 

/// in sql --> aggregation functions , count , min , max , avg , sum 

db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$exists: true}}
        } ,
        {
            $group : {
                _id : "$age" ,// _id --> grouping fields ,
                total_instructors : {$sum : 1} ,// count no of instructor per each age , 
                total_salaries : {$sum : "$salary"},
                min_salary: {$min : "$salary"}, 
                max_salary : {$max: "$salary"}, 
                avg_salary:  {$avg:  "$salary"}
            }
        }
    ] // array of stages to apply pipeline 
) 




// get no. of instructors with same age and same city 


// select count(*), age, city from instructors group by city , age 


db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$exists: true}}
        } ,
        {
            $group : {
                _id : [{
                    age: "$age", city : "$address.city"
                }], 
                
            }
        }
    ] // array of stages to apply pipeline 
) 



////
db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$exists: true}}
        } ,
        {
            $group : {
                _id : {
                    age: "$age", city : "$address.city"
                }, 
                total_members: {$sum: 1}
                
            }
        }
    ] // array of stages to apply pipeline 
) 




///
db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$exists: true}}
        } ,
        {
            $group : {
                _id : {
                    age: "$age", city : "$address.city"
                }, 
                total_members: {$sum: 1}, 
                total_salary: {$sum: "$salary"},
                min_salary : {$min : "$salary"},
                max_salary: {$max: "$salary"}
                
            }
        }
    ] // array of stages to apply pipeline 
) 

/// projection 


db.instructors.aggregate(
    [
        // each stage is an object 
        {
            $match :  {age : {$exists: true}}
        } ,
        {
            $group : {
                _id : {
                    age: "$age", city : "$address.city"
                }, 
                total_members: {$sum: 1}, 
                total_salary: {$sum: "$salary"},
                min_salary : {$min : "$salary"},
                max_salary: {$max: "$salary"}
                
            }
        }, {
           $project:{
            _id: 0,
             age : "$_id.age",
            city: "$_id.city",
            total_members: 1, 
            total_salary:1,
            min_salary : 1,
            max_salary: 1
           }
        }
    ] // array of stages to apply pipeline 
) 



////////////////////////////////////////////////

/***************************    lookup 
 * 
 *  get data from different collections >>> joins 
 * ************************ */

// student, deptname 
/// 1 to many 

db.students.aggregate(
    [

        {
            $lookup: {
                from : "departments", // collection I need to join with 
                localField :  "department" , /// field in student collection 
                foreignField : "_id", 
                as :  "dept_info"

            }

        }

    ]

)




/// student , subjects
db.students.aggregate(
    [

        {
            $lookup: {
                from : "subjects", // collection I need to join with 
                localField :  "subjects" , /// field in student collection 
                foreignField : "_id", 
                as :  "sub_info"

            }

        }

    ]
)
/// look up ==> field array of objects 




//// I need std_id , std_firstName, dept_name 
db.students.aggregate(
    [

        {
            $lookup: {
                from : "departments", // collection I need to join with 
                localField :  "department" , /// field in student collection 
                foreignField : "_id",   // department in the students refers to _id in the departments 
                as :  "dept_info"

            }

        }, {
            $project : {
                firstName: 1, 
                dept_name: "$dept_info.name",
                d_name: {$arrayElemAt: ["$dept_info.name", 0]}

            }
        }

    ]

)












































































































































































































































