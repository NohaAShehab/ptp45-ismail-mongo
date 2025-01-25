////*********** DB relation************** */


/****
 * 
 *  students : [ 
 *      {id , name  , address}
 *  ]
 * 
 *  subjects : [
 *      {id , name , description }
 *  
 * ]
 */

/*****
 * 
 *  relation 1 to 1 
 * relation many to many 
 * relation 1 to many 
 * -----------------------------------------------------
 * 1- option 01
 * 
 * students =[  {id , name  , address, subjects:[{}, {} , {}]}]  #  embedded object --> add the subjects
 * to the student document 
 * 
 * problems  ==> size of document is big 
 *              
 *   repitiion of data /...
 * 
 * 
 * 
 *  students = [{}, {}, {}]
 *   
 *  subjects = [{id , name, description , students: [ {}, {}, {}, {}]}]
 * 
 * 
 * 
 * ---------------------------------------------------
 * 
 * students = [{id , name, email} ]
 * subjects = [{id , name, description }]
 * 
 * many to many 
 * 
 * std_sub = [{sub_id, std_id , grade }]
 * 
 * 
 * 
 * students = [{id , name, email, subj[{sub_id , sub_name}, {}]} ]
 * 
 * 
 * 
 * 
 */







// 1- get student with its department and subjects ??

    /**
     * 
     * {
        _id: 3,
        firstName: 'Omar',
        lastName: 'Ahmed',
        addresses: [ { city: 'mansoura', street: 100 } ],
        department: 2,
        subjects: [ 3, 2, 5 ]
        }
     * 
     */



        // get students and dept info ==> relation 1 to many 


        db.students.find(
            {department: {$exists: true }}, 
            {firstName: 1, department: 1}
        )


        //// search in dept ??

        db.students.find(
            {department: {$exists: true }}, 
            {firstName: 1, department: 1}
        ).forEach((document) => {
            print(document.department)
        });


        ////

        db.students.find(
            {department: {$exists: true }}, 
            {firstName: 1, department: 1}
        ).forEach((document) => {
            dept = db.departments.find({_id: document.department})
            print(dept, document.name)
        });

        ////

        db.students.find(
            {department: {$exists: true }}, 
            {firstName: 1, department: 1}
        ).forEach((document) => {
            dept = db.departments.findOne({_id: document.department})
            print(dept.name, document.name)
        });



        /// 
        db.students.find(
            {department: {$exists: true }}, 
            {firstName: 1, department: 1}
        ).forEach((document) => {
            dept = db.departments.findOne({_id: document.department})
            if(dept){
                print(dept.name, document.firstName)
            }

        });


        // issues with 


        db.students.find(
            {department: {$exists: true }}, 
            {firstName: 1, department: 1}
        ).forEach((document) => {
            dept = db.departments.findOne({_id: document.department}, {name:1})
            if(dept){
                print(dept.name, document.firstName)
            }

        });

        //// 
        // 1- get all departments ? get depts --> on time 
        departments = db.departments.find({}, {name: 1}).constructor.name;
        departments = db.departments.find({}, {name: 1}).toArray();
        // print(departments);

        // now I have an array contains depts exists ??

        db.students.find(
            {department: {$exists: true }}, 
            {firstName: 1, department: 1}
        ).forEach((document) => {
           
                dept  = departments.find((element)=> element._id==document.department)
                if(dept){
                    print(`${document.firstName}   | dept = ${dept.name}`)}

        });





/// I need info of departments 

// 1- call mongo one time to get all depts ??

departments = db.departments.find({}, {name:1}).toArray();
// I need to display dept_name with std_name 


// find the student and deptname 

db.students.find(
    {department: {$exists: true}}, 
    {department:1 , firstName:1 }).forEach((document)=> {
        // get dept name of the student 

        dept =departments.find((element)=> element._id== document.department)  // find return with first occurenace 
        if (dept){

            print(`stdname = ${document.firstName}, dept=${dept.name}`)
        }else{
            print(`stdname = ${document.firstName}, dept=undefined`)
        }

    });





























































