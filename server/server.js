const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const port = process.env.port;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(express.json(), express.urlencoded({ extended: true }), cors({origin:'http://localhost:5173',credentials:true,methods:['POST','GET','DELETE','PATCH','PUT']}), cookieParser());

require("./config/mongoose.config");
require("./routes/blog.routes")(app);
require("./routes/user.routes")(app);
require("./routes/item.routes")(app);
require('./routes/event.routes')(app);

app.use(bodyParser.json());
app.post('/sameh.khazri09@gmail.com', async (req, res) => {
    try {
        // Extract email content from the request body
        const emailContent = req.body.content;
    console.log("ùùùùùùùùùùùùùùùùùùùùùùùùùùùùù")
        // Create a nodemailer transporter with your email service credentials
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: '', // Replace with your Gmail address
            pass: '' // Replace with your Gmail password or an app-specific password
          }
        });
    
        // Define the email options
        const mailOptions = {
          from: 'klachnikovee@gmail.com', // Replace with your Gmail address
          to: 'sameh.khazri09@gmail.com', // Replace with the recipient's email address
          subject: 'Subject of the email',
          text: emailContent
        };
    
        // Send the email
        const info = await transporter.sendMail(mailOptions);
    
        console.log('Email sent: ', info);
    
        // Respond to the client
        res.sendStatus(200); // Assuming a successful response status
      } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).send('Internal Server Error');
      }
  });

app.listen(port, () => console.log(`listening to port ${port}`));
