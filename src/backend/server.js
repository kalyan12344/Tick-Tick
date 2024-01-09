require("dotenv").config();

const sgMail = require("@sendgrid/mail");
const express = require("express");
const cors = require("cors");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    console.log(req.body);
    const msg = { to, subject, text, html, from: "kalyanraju90@gmail.com" };
    await sgMail.send(msg);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).send("Error sending email");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
