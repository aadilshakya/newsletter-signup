//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

  var firstName = req.body.fname;
  var lastName= req.body.lname;
  var email = req.body.email;

  var data={
    members: [
      {email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME:lastName
      }}
    ]
  };

  var jsondata= JSON.stringify(data);

  var options={
    url: "https://us2.api.mailchimp.com/3.0/lists/e75efd89af",
    method: "POST",
    headers: {
      "authorization": "aadil dc118f07785f873453c78479e75797ae-us2"
    },
    body: jsondata

  };
  request(options, function(error,response,body){
    if(error){
      res.sendFile(__dirname+"/failure.html");
    }
    else{
      console.log(response.statusCode);
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");

      }
    }

  });

  console.log(firstName,lastName,email);

});

app.listen(process.env.PORT || 3000,function(){
  console.log("server running");

});

//dc118f07785f873453c78479e75797ae-us2
