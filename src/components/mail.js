import axios from "axios";

const sendEmail = async (emailDetails) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/send-email",
      emailDetails
    );
    console.log("Email sent successfully:", response.data);
    // Handle success here (e.g., show success message)
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle error here (e.g., show error message)
  }
};

// Example usage
sendEmail({
  to: "recipient@example.com",
  subject: "Test Email",
  text: "This is a test email",
  html: "<strong>This is a test email</strong>",
});
