

/**
 * 
 * 
 * I can put any data to any document in any collection 
 * 
 * create schema validation --> like what do in sql ---> 
 * 
 */

/// i need to create collection and add schema to it 


db.createCollection("employees", 

    // add validator to the employees ?
    {
        validator: {

            $jsonSchema: {
                bsonType: "object", // document ---> object 
                // properties if added to the document  must be as follows 
                properties :{
                    firstName: {bsonType: "string"},
                    lastName: {bsonType: "string"}
                }


            }

        } // validator
    }
)


//  I need to modify schema on existing collection ??


db.employees.runCommand('collMod', {

validator:{
    $jsonSchema:{

        bsonType: "object", 
        properties: {
            firstName: {bsonType: "string"}, 
            lastName : {bsonType: "string"}, 
            age : {bsonType: "number"}
        }


    }


}

})





/// add required fields 
db.employees.runCommand('collMod', {

    validator:{
        $jsonSchema:{
    
            bsonType: "object", 
            required : ['firstName'],
            properties: {
                firstName: {bsonType: "string"}, 
                lastName : {bsonType: "string"}, 
                age : {bsonType: "number"}
            }
    
    
        }
    
    
    }
    
    })
    

/// please prevent adding extra fields 

db.employees.runCommand('collMod', {

    validator:{
        $jsonSchema:{
            bsonType: "object", 
            required : ['firstName'],
            additionalProperties: false,
            properties: {
                firstName: {bsonType: "string"}, 
                lastName : {bsonType: "string"}, 
                age : {bsonType: "number"}
            }
    
    
        }
    
    
    }
    
    })


/// to fix the issue --> you need to specify id in the properites 


db.employees.runCommand('collMod', {

    validator:{
        $jsonSchema:{
            bsonType: "object", 
            required : ['firstName'],
            additionalProperties: false,
            properties: {
                _id: {}, /// add id as object --> object --> may be objectid or number 
                firstName: {bsonType: "string"}, 
                lastName : {bsonType: "string"}, 
                age : {bsonType: "number"}
            }
    
    
        }
    
    
    }
    
    })


    /// restrict id --> type number 

    db.employees.runCommand('collMod', {

        validator:{
            $jsonSchema:{
                bsonType: "object", 
                required : ['firstName'],
                additionalProperties: false,
                properties: {
                    _id: { bsonType: 'number'}, /// add id as object --> object --> may be objectid or number 
                    firstName: {bsonType: "string"}, 
                    lastName : {bsonType: "string"}, 
                    age : {bsonType: "number"}
                }
        
        
            }
        
        
        }
        
        })


        /// define age must be >= 10 

        db.employees.runCommand('collMod', {

            validator:{
                $jsonSchema:{
                    bsonType: "object", 
                    required : ['firstName'],
                    additionalProperties: false,
                    properties: {
                        _id: { bsonType: 'number'}, /// add id as object --> object --> may be objectid or number 
                        firstName: {bsonType: "string"}, 
                        lastName : {bsonType: "string"}, 
                        age : {
                            bsonType: "number",
                        minimum: 10}
                    }
            
            
                }
            
            
            }
            
            })
    
    


            /// gender  ---> male , female 

            db.employees.runCommand('collMod', {

                validator:{
                    $jsonSchema:{
                        bsonType: "object", 
                        required : ['firstName'],
                        additionalProperties: false,
                        properties: {
                            _id: { bsonType: 'number'}, /// add id as object --> object --> may be objectid or number 
                            firstName: {bsonType: "string"}, 
                            lastName : {bsonType: "string"}, 
                            age : {
                                bsonType: "number",
                            minimum: 10},

                            gender: {
                                enum : ["male", "female"]
                            }
                        }
                
                
                    }
                
                
                }
                
                })























































































































































