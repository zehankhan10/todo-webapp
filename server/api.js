var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

var conString = "mongodb://127.0.0.1:27017";

app.get("/appointments/:userid", (req, res) =>{
    mongoClient.connect(conString).then(clientObject =>{
        var database = clientObject.db("todo");
        database.collection("appointments").find({UserId:req.params.userid}).toArray().then(documents =>{
            res.send(documents);
            res.end();
        });
    });
});

//Add Task
app.post("/add-task",(req,res) =>{

    var task = {
        Appointment_Id : parseInt(Math.random()*100), 
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId
    }

    mongoClient.connect(conString).then(clientObject =>{
        var database = clientObject.db("todo");
        database.collection("appointments").insertOne(task).then(()=>{
            console.log(`Task added successfully`);
            res.end();
        });
    });
});

//Edit Task(Update)

app.put("/edit-task/:id", (req,res) =>{
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObject =>{
        var database = clientObject.db("todo");
        database.collection("appointments").updateOne({Appointment_Id:id},{$set:{Appointment_Id:id,Title:req.body.Title,Description:req.body.Description,Date: new Date(req.body.Date),UserId:req.body.UserId}}).then(()=>{
            console.log(`Task Updated successfully`);
            res.end();
        });    
    });
});

//Delete Task

app.delete("/delete-task/:id",   (req , res)=>{
    var id=parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObject =>{
        var database = clientObject.db("todo");
        database.collection("appointments").deleteOne({Appointment_Id:id}).then(()=>{
            console.log(`Task Deleted successfully`);
            res.end();
        });    
    });
});



app.get("/users", (req, res) =>{
    mongoClient.connect(conString).then(clientObject =>{
        var database = clientObject.db("todo");
        database.collection("users").find({}).toArray().then(documents =>{
            res.send(documents);
            res.end();
        })
    })
})

//Register

app.post("/register-user", (req,res) =>{
    var user ={
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Mobile: req.body.Mobile,
        Email: req.body.Email
    }
    mongoClient.connect(conString).then(clientObject =>{
        var database = clientObject.db("todo");
        database.collection("users").insertOne(user).then(()=>{
            console.log("User Added..");
            res.end();
        });
    });
});


// app.get("/", (req,res) =>{
//     res.send("<h2>Welcome to my new API</h2>");
// });


// app.get("/categories",(req, res) =>{
//     res.send([{CategoryId:1, CategoryName:"Electronics"},
//               {CategoryId:2, CategoryName:"Clothing"}]);
//     res.end();
// });

// app.get("/details/:id/:name/:price", (req,res) =>{
//     res.send(`Id=${req.params.id}<br>Name=${req.params.name}<br>Price=${req.params.price}`);
//     res.end();
// });

// app.get("/products",(req,res) =>{
//     res.send();
//     res.end();
// })
// app.get("*", (req,res) =>{
//     res.send("404 Not Found");
//     res.end();
// })
app.listen(8080);
console.log("Server Started at Port http://127.0.0.1:8080");