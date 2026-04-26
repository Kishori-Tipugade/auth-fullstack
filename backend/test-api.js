const axios = require('axios');

const testApi = async () => {
  try {
    console.log("Testing Health Check...");
    const health = await axios.get('http://localhost:5000/');
    console.log("Health Check Result:", health.data);

    console.log("\nTesting OTP Send (this might fail if Twilio/Email is not set, but should reach server)...");
    try {
      const response = await axios.post('http://localhost:5000/api/otp/send', {
        identifier: 'test@example.com',
        method: 'email'
      });
      console.log("OTP Send Result:", response.data);
    } catch (e) {
      console.log("OTP Send reached server but failed (Expected if credentials missing):", e.response ? e.response.data : e.message);
    }
  } catch (err) {
    console.error("Test Failed. Is the server running on port 5000?", err.message);
  }
};

testApi();
