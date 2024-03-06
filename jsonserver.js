import express from 'express';
import mongoose from 'mongoose';



const app = express();
const port = 8000;

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017",{dbName: "FormDatabases"})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use(express.json())
// Define the schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNo: String,
  emailId: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
  },
  loginId: String,
  password: String,
  creationTime: Date,
  lastUpdatedOn: Date,
});

// Create the model
const User = mongoose.model('User', userSchema);

app.get("/", (req, res) => {
  res.render('index.ejs');
}); 

// Create a new user
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  user.creationTime = new Date();
  user.lastUpdatedOn = new Date();
  await user.save();
  console.log("kishan");
  
  res.send(user);

});

// Get all users
app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

// Start the server
// const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));