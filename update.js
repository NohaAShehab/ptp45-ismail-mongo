

/************************ I need to update the documents ********************* */
/**
 * 
 *   update instructors set firstName='updated' where id = 10; 
 * 
 */


// updateOne, updateMany 
//1- update existing fields


db.instructors.updateOne(

    {
        _id: 6
    }, // condition to get object I need to be updated
    {
        $set: { firstName: "Noha", lastName: "shehab", salary: 10000 }

    } // operation of update 
)


// add new field to the document  --> add email to the document -- _id= 6 


db.instructors.updateOne(

    {
        _id: 6
    }, // condition to get object I need to be updated
    {
        $set: { email: "noha@gmail.com" } // add new field 

    } // operation of update 
)


///////////////// *************  add new fields to the document 

db.instructors.updateMany(

    {
        _id: { $ne: 6 }
    }, // condition to get object I need to be updated
    {
        $set: { email: "updated@gmail.com" } // add new field 

    } // operation of update 
)


db.instructors.find()


///////////////////////////////


db.instructors.updateOne({
    _id: 100
}, {

    $set: {
        firstName: "Mai",
        track: "UI"
    }
})



///update of document exists,  if the document not found please insert it >> 


db.instructors.updateOne(
    {
        _id: 100
    },  // condition
    {

        $set: {
            firstName: "Mai",
            track: "UI"
        }
    }, // operation 
    {


        upsert: true /// insert the document if not found 

    } // options 

)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*** rename field in all documents  */

//*** email --> username  */



db.instructors.updateMany(
    {},  // condition
    {
        $rename: { "email": "useremail" }
    }/// operation
)





/// remove field from documents  


db.instructors.updateMany(
    {},  // condition
    {
        $unset: { "useremail": false }
    }/// operation
)





/// ********************************************* update content of embedded object?
db.instructors.updateOne(
    { _id: 6 },
    {

        $set: { "address.city": "ismailia" }
    }
)





///*********************** increase salary for instructors by 100  */

db.instructors.updateMany(
    {},
    {
        $inc: { salary: 1000 }
    }
)







///  salary * 2
db.instructors.updateMany(
    {
        salary: {
            $type: "number"
        }
    },
    {
        $mul: { salary: 2 }
    }
)






db.instructors.updateMany(
    {
        salary: {
            $type: "number"
        }
    },
    {
        $max: { salary: 7000 }
    }
)

/// if salary < 7000 --> maximize salary to be 7000


/////////////////////////////////////////////////////////////////////////////////////////////


/******************** Update the array ?? ************************************** */

db.instructors.updateOne(
    {
        _id: 6
    },
    {
        $set: { "courses.1": "js" } /// update array at known index 
    }


)

/// I need to update course mvc --> ux 

/// I need to update courses --> js ---> to be javascript ??? ---> update it in any position in the courses array ?



db.instructors.updateMany(
    {
        courses: "js"
    },
    {
        $set: { "courses.$": "javascript" }
    })



// add element to array ??


db.instructors.updateOne(
    {
        _id: 6
    }, 
    {
        $push : {"courses": "communicationskills"}

    })


    // add element if element doesn't exist 


db.instructors.updateOne(
    {
        _id: 6
    }, 
    {
        $addToSet : {"courses": "communicationskills"}

    })





    db.instructors.updateOne(
        {
            _id: 6
        }, 
        {
            $push : {"courses": ['python', 'java']}
    
        })
    



// push each element in the given array as seperate element in courses

db.instructors.updateOne(
    {
        _id: 6
    }, 
    {
        $push : {"courses": {
            $each : ['python', 'java']
        }
        }

    })








// remove element from array 

db.instructors.updateOne(
    {
        _id: 6
    }, 
    {
        $pop : {"courses": 1}

    })

    // MongoServerError: $pop expects 1 or -1, found: -3

/// I need to remove sepecific element 

db.instructors.updateOne(
    {
        _id: 6
    }, 
    {
        $pull : {"courses": "signalR"}

    })






































































































