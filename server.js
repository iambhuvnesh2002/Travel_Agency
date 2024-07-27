const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve the feedback form HTML
app.get('/', (req, res) => {
    // Use path.join to ensure an absolute path
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submissions
app.post('/submit-feedback', async (req, res) => {
    let { name, email, message, phone } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajnamaultimate2@gmail.com', // your email address
            pass: 'qoea jvwo mcav cibi', // your email password (note: for production, use environment variables for security)
        }
    });

    console.log(email);

    // Email options
    let mailOptions = {
        from: email,
        to: 'rajnamaultimate2@gmail.com', // replace with your email address
        subject: `New Feedback from ${name}`,
        text: `You have received new feedback:\n\nName: ${name}\nEmail: ${email}\n\nFeedback:\n${message} \n\nPhone No.:\n${phone}`,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Thank you for your feedback!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Sorry, there was an error sending your feedback. Please try again.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
