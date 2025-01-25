/// prepare db 

let departments = [
    {"_id":1, "name":"opensource", "location":"3rdfloor", "phone":12345},

    {"_id":2, "name":"sd", "location":"2ndfloor", "phone":12345},
    {"_id":3, "name":"ai", "location":"1stfloor", "phone":12345},

    {"_id":4, "name":"cloud", "location":"3rdfloor", "phone":12345},
    {"_id":5, "name":"graphics", "location":"3rdfloor", "phone":12345},

]


db.departments.insertMany(departments)




let students = [

    {"_id":1, "firstName": "Ahmed", 
    "lastName":"Ali", 
    "addresses": [
        { "city": "mansoura", "street":10 },
        { "city": "cairo", "street":20}],

        "department":0, 
        "subjects": [1,2,5] 

    },
    
    
    {"_id":2, "firstName": "Mohamed", 
    "lastName":"Ali", 
    "addresses": [
        { "city": "alex", "street":10 },
        { "city": "cairo", "street":30}],

        "department":2, 
        "subjects": [3,2,5] 

    },

    {"_id":3, "firstName": "Omar", 
    "lastName":"Ahmed", 
    "addresses": [
        { "city": "mansoura", "street":100 }],
        "department":2, 
        "subjects": [3,2,5] 

    },

    {"_id":4, "firstName": "Mohamed", 
    "lastName":"Ahmed", 
    "addresses": [
        { "city": "Assuit", "street":100 }],
        "department":2, 
        "subjects": [3,4,5] 

    }

]
    
 db.students.insertMany(students)



let subjects = [

{_id:1 , "name":"js", "maxgrade":100},
{_id:2 , "name":"mongo", "maxgrade":100},
{_id:3 , "name":"jenkins", "maxgrade":100},
{_id:4 , "name":"gcp", "maxgrade":100},
{_id:5 , "name":"aws", "maxgrade":100},
{_id:6 , "name":"terraform", "maxgrade":100},
{_id:7 , "name":"microservice", "maxgrade":100},
{_id:8 , "name":"admin", "maxgrade":100},

]


db.subjects.insertMany(subjects)






















