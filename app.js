const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const app=express();

app.set("view-engine","ejs");

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(3000,function(){
  console.log("server has started successfully");
});

mongoose.connect("mongodb://localhost:27017/studentDB");

const studentSchema={
  name:String,
  department:String,
  email:String,
  mobile:Number,
  address:String
};

const Student=mongoose.model("Student",studentSchema);

app.get("/",function(req,res){
  res.render("student.ejs");
});

app.post("/",function(req,res){
  if(req.body.name===""||req.body.department===""||req.body.email===""||req.body.mobile==""||req.body.address==""){
    res.send("Enter all the field");
  }
  else{
  const student=new Student({
    name: req.body.name,
    department: req.body.department,
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address
  });

  student.save();

  res.redirect("/data");
}
});

app.get("/data",function(req,res){
  Student.find({},function(err,data){
    if(!err){
        res.render("data.ejs",{
          data:data
        });
    }
  });
});
