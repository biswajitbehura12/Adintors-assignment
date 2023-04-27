const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json())



const port = 8088;
// Set up database connection
const connectingD=async()=>{
 await mongoose.connect('mongodb+srv://dpuser:dpUser@blog-app2.hfxckhs.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log('Error connecting to the database', err);
  });
}
connectingD();

app.use('/users', require('./routes/userRoutes'));
app.use('/books' ,require('./routes/libraryRoutes'));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});