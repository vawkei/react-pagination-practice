const express = require('express');
//const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// Configure Express middleware
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('welcome to My_Playstation')
})


const paystackSecretKey = 'YOUR_PAYSTACK_SECRET_KEY';

// Create a route to handle payment initiation
app.post('/payments/initiate', async (req, res) => {
  try {
    const { amount, email } = req.body;

    // Make a request to Paystack API to initialize payment
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
      }),
    });

    const data = await response.json();

    // Extract the payment authorization URL from the Paystack response
    const authorizationUrl = data.data.authorization_url;

    // Return the authorization URL to the frontend
    res.json({ authorizationUrl });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ message: 'Failed to initiate payment' });
  }
});

// Create a route to handle payment verification
app.get('/payments/verify', async (req, res) => {
  try {
    const { reference } = req.query;

    // Make a request to Paystack API to verify payment
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // Extract the payment status from the Paystack response
    const { status } = data.data;

    // Handle the payment status accordingly
    if (status === 'success') {
      // Payment is successful
      res.json({ message: 'Payment successful' });
    } else {
      // Payment is unsuccessful
      res.json({ message: 'Payment unsuccessful' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
});

// // Start the server
// app.listen(3001, () => {
//   console.log('Server started on port 4242');
// });
// Start the server
const PORT = process.env.PORT ||4242;
app.listen(PORT, () => {
  console.log(`Node Server listening on port ${PORT}`);
});














































//THEFIRST
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors')
 
// const app = express();

// // Configure Express middleware
// app.use(express.json());
// app.use(cors());

// app.get('/',(req,res)=>{
//     res.send('welcome to My_Playstation')
// })

// // Define your route for creating a payment
// app.post('/create-payment', async (req, res) => {
//   try {
//     // Extract required data from the request body
//     // const { amount, email, reference } = req.body;

//     const {amount,email,userName} = req.body;
//     // Make a POST request to Paystack API to initialize payment
//     const response = await fetch('https://api.paystack.co/transaction/initialize', {
//       method: 'POST',
//       headers: {
//         // Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         amount,
//         email,
//         userName,
//       }),
//     });

//     // Parse the response body as JSON
//     const data = await response.json();
//     console.log(data)
//     // Extract the authorization URL from the Paystack response
//     const authorizationUrl = data.data.authorization_url;

//     // Return the authorization URL to the client
//     res.json({ authorizationUrl });
//   } catch (error) {
//     console.error('Error creating payment:', error);
//     res.status(500).json({ error: 'Failed to create payment' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT ||4242;
// app.listen(PORT, () => {
//   console.log(`Node Server listening on port ${PORT}`);
// });






















// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// // Payment callback endpoint
// app.post('/payments/callback', (req, res) => {
//   // Access the payment data from the request body
//   const paymentData = req.body;

//   // Perform any necessary actions with the payment data
//   // For example, update the database, send notifications, etc.

//   // Send a response back to the client (Paystack)
//   res.sendStatus(200);
// });

// // Start the server
// app.listen(3001, () => {
//   console.log('Server started on port 3001');
// });


// "start": "react-scripts start",