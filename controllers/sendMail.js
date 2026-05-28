require("dotenv").config();

const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendOTP = async (email, otp) => {

    try {

        const sendSmtpEmail = {

            sender: {
                email: "chaamnotesapp@gmail.com",
                name: "Chaam Notes App"
            },

            to: [
                {
                    email: email
                }
            ],

            subject: "Chaam Email Verification",

            htmlContent: `
                <div style="
                    font-family: Arial;
                    padding: 20px;
                ">

                    <h2 style="color:#4F46E5;">
                        Core Notes App
                    </h2>

                    <p>Your OTP is:</p>

                    <div style="
                        font-size:32px;
                        font-weight:bold;
                        background:#f4f4f4;
                        padding:20px;
                        text-align:center;
                        border-radius:8px;
                        letter-spacing:5px;
                    ">
                        ${otp}
                    </div>

                    <p>
                        OTP valid for 5 minutes.
                    </p>

                </div>
            `
        };

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log("SUCCESS");
        console.log(data);

    } catch(err) {

        console.log("FAILED");
        console.log(err.response?.body || err);
    }
};

module.exports = sendOTP;