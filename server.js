/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: SUSMITA BHAGAT Student ID: 121361232 Date: 06-July_2024
*
*  Online (vercel) Link:https://assignment4-liard-tau.vercel.app/
*
********************************************************************************/ 



var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const path = require('path');
const collegeData = require('./modules/collegeData');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get('/students/add', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/addStudent.html'));
});

app.post('/students/add',(req,res)=>{
  collegeData.addStudent(req.body)
  .then(()=>  res.redirect('/students'))
  .catch((err) => {
    console.error('Error adding student: ', err);
    res.status(500).send('Error adding student');
    });
  })

app.get('/students', (req, res) => {
  const course = req.query.course;
  if (course) {
    collegeData.getStudentsByCourse(course).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json({ message: err });
    })
  } else {
    collegeData.getAllStudents().then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json({ message: err });
    })
  }
});

app.get('/tas',(req,res) =>{
  collegeData.getTAs().then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({ message: err });
  })
})

app.get('/courses',(req,res) =>{
  collegeData.getCourses().then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({ message: err });
  })
})

app.get('/student/:num', (req, res) => {
  const stunum = req.params.num;
  if (stunum) {
    collegeData.getStudentByNum(stunum).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json({ message: err });
    });
  } else {
    res.json({ message: "no results" });
  }
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get('/htmlDemo', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/htmlDemo.html'));
});



app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
collegeData.initialize().then(() => {
  app.listen(HTTP_PORT, () => {
    console.log("Server is running on http://localhost:" + HTTP_PORT);
  });
}).catch((err) => {
  console.log(`Failed to initialize data :${err}`);

});

