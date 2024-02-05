const express=require("express")
const mongoose=require("mongoose")
const User=require("./models/User")
const cors=require("cors")
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/usersDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

let app=express()

app.use(cors())
app.use(express.json());



// CRUD Operations
// Create User
app.post('/users', async (req, res) => {
    const { username, age } = req.body;
    try {
      const newUser = new User({ username, age });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Read Users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Update User
  app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete User
  app.delete('/users/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports=app;