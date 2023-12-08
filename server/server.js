const express = require("express")
const app = express()
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("./models/userDetails");


const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const Exercise = require('./models/exerciseModel')
const User = mongoose.model("UserInfo");
const Joi = require('joi');

const registrationSchema = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  userType: Joi.string().required(),
});

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//endpoints
app.post('/exercise/add', async (req, res) => {
    try {
        const exercise = await Exercise.create(req.body)
        console.log("Added record: ")
        console.log(req.body)
        res.status(200).json(exercise)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

app.delete('/exercise/delete/:exerciseId', async (req, res) => {
    try {
      const exerciseId = req.params.exerciseId;
      const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
      
      if (!deletedExercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }
  
      res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

  app.delete('/user/delete/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await Exercise.deleteMany({ email: deletedUser.email });
  
      res.status(200).json({ message: 'User and associated exercises deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

app.get('/exercises', async (req, res) => {
    try {
        const exercises = await Exercise.find({})
        console.log("Displaying all records")
        res.status(200).json(exercises)
    }
    catch (error) {
        console.log("Error displaying records")
        res.status(500).json({ message: error.message })
    }
})

app.get('/exercises/:id', async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.findById(id)
        console.log("Record found")
        res.status(200).json(exercise)
    }
    catch (error) {
        console.log("Error finding record")
        res.status(500).json({ message: error.message })
    }
})

app.get('/getUserType/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
  
      if (user) {
        const userType = user.userType;
        console.log("Record found");
        res.status(200).json({ userType });
      } else {
        console.log("User not found");
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log("Error finding record");
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        console.log("Displaying all records")
        res.status(200).json(users)
    }
    catch (error) {
        console.log("Error displaying records")
        res.status(500).json({ message: error.message })
    }
})

app.put('/update-exercise/:id', async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.findByIdAndUpdate(id, req.body)
        if (!exercise) {
            return res.status(404).json({ message: `Cannot find any exercises associated with ${id} id` });
        }
        const updatedExercise = await Exercise.findById(id)
        console.log("Record updated")
        res.status(200).json(updatedExercise)
    }
    catch (error) {
        console.log("Error updating record")
        res.status(500).json({ message: error.message })
    }
})

app.delete('/delete-exercise/:id', async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.findByIdAndDelete(id)
        if (!exercise) {
            return res.status(404).json({ message: 'Cannot find any exercises associated with ${id} id' })
        }
        console.log("Record deleted")
        res.status(200).json(exercise)
    }
    catch (error) {
        console.log("Error deleting record")
        res.status(500).json({ message: error.message })
    }
})

app.post("/register", async (req, res) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      return res.json({ error: "Validation error" });
    }

    const { fname, lname, email, password, userType } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      console.log("User exists");
      return res.json({ error: "User exists" });
    }
    
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    
    console.log("User added to database");
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        console.log("User not found")
        return res.json({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: "15m",
        });
        if (res.status(201)) {
            console.log("Logged in succesfully")
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    console.log("Invalid password")
    res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "Token expired";
        }
        return res;
      });
      console.log(user);
      if (user == "Token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const useremail = user.email;
      User.findOne({ email: useremail })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) { }
  });

//db connection
mongoose.connect('mongodb+srv://user:user@gymappcluster.n4swwdm.mongodb.net/GymApp?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3000, () => {
            console.log("App is running on port 3000")
        })
    })
    .catch((error) => {
        console.log(error);
    })

