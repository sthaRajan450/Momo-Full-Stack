import resend from "../config/resend.js";

export const sendOtpEmail = async (email, otp) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "shrestraj45@gmail.com",

    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
        <h2>Password Reset Request</h2>

        <p>We received a request to reset your password.</p>

        <p>Your OTP is:</p>

        <h1 style="letter-spacing:5px;">
          ${otp}
        </h1>

        <p>This OTP will expire in <strong>5 minutes</strong>.</p>

        <p>If you didn't request this, you can safely ignore this email.</p>

        <br/>

        <p>Regards,</p>
        <p>Your Team</p>
      </div>
    `,
  });
};
