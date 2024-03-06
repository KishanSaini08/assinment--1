import { config } from 'dotenv';
import express,{urlencoded} from 'express';
import mongoose from 'mongoose';
const app = express();



config({ path: './config.env'});
const port = process.env.PORT

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.URL_KEY,{dbName: "FormDatabases"})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));
app.use(urlencoded({extended: true})) 





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
app.use(express.json());
const User = mongoose.model('User', userSchema);

app.get("/", (req, res) => {
  res.render('index.ejs');
}); 

// Get all users
app.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    user.creationTime = new Date();
    user.lastUpdatedOn = new Date();
    await user.save();
    console.log("kishan");
    res.send(user);
  });

  
app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.send(users);
});


app.get("/user", (req, res) => {
  res.render('details.ejs');
}); 

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));