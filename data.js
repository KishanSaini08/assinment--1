import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 8000;

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017",{dbName: "FormDatabases"})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

  // This function convert the User data into a table structure
  app.use(urlencoded({ extended: true }))
  
  // firstName=Priyanshu&lastName=saini&mobileNo=2340812378&emailId=

  app.use(express.static("public"))
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
  console.log(req.body)
  const user = new User(req.body);
console.log(user)
  user.creationTime = new Date();
  user.lastUpdatedOn = new Date();
  await user.save();
  res.send(user);
  console.log(user)
});

// Start the server
// const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));