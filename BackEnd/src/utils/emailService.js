import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tnagendram6@gmail.com', // Replace with your Gmail
        pass: 'ffjx hbsc vddf mmjf' // Replace with your Gmail app password
    }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('Email transporter verification failed:', error);
    } else {
        console.log('Email transporter is ready to send messages');
    }
});

export const sendResetPasswordEmail = async (email, resetToken) => {
    console.log('Preparing to send reset email to:', email);
    
    // Use localhost URL for development
    const resetUrl = `http://localhost:3000/authentication/reset-password/${resetToken}`;
    
    const mailOptions = {
        from: 'tnagendram6@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #dc2626; text-align: center;">Password Reset Request</h1>
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
                    <p style="font-size: 16px; line-height: 1.5;">You requested a password reset. Click the button below to reset your password:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #4b5563;">Or copy and paste this link in your browser:</p>
                    <p style="font-size: 14px; color: #4b5563; word-break: break-all;">${resetUrl}</p>
                    <p style="font-size: 14px; color: #4b5563; margin-top: 20px;">
                        <strong>Note:</strong> This link will expire in 1 hour.
                    </p>
                    <p style="font-size: 14px; color: #4b5563;">
                        If you didn't request this, please ignore this email.
                    </p>
                </div>
                <p style="text-align: center; font-size: 12px; color: #6b7280; margin-top: 20px;">
                    This is a development environment email. In production, this would be sent from your actual domain.
                </p>
            </div>
        `
    };

    try {
        console.log('Sending email to:', email);
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        throw error; // Propagate the error for better handling
    }
};