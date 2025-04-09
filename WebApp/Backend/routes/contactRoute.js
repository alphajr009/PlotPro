const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ContactSubmission = require('../models/ContactSubmission');

// Configure transporter with your email service and credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "pasindurandika35@gmail.com",
    pass: "szxt shqt oehw jjej",
  },
});

// Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Transporter Error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// Function to send email
const sendEmail = (toEmail, subject, text) => {
  const mailOptions = {
    from: 'pasindurandika35@gmail.com',
    to: toEmail,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('SendMail Error:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Route to handle sending email and saving submission
router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  const newSubmission = new ContactSubmission({
    name,
    email,
    message,
  });

  try {
    await newSubmission.save();
    sendEmail('pasindurandika35@gmail.com', 'New Contact Form Submission from PlotPro', `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    res.status(200).json({ success: 'Submission saved and email sent successfully' });
  } catch (error) {
    console.error('Database Save Error:', error);
    res.status(500).json({ error: 'Failed to save submission', details: error.message });
  }
});

// Route to fetch submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await ContactSubmission.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Fetch Submissions Error:', error);
    res.status(500).json({ error: 'Failed to fetch submissions', details: error.message });
  }
});

// Route to handle sending reply and updating status
router.post('/reply', async (req, res) => {
  const { id, toEmail, replyMessage } = req.body;

  try {
    // Find the submission by id
    const submission = await ContactSubmission.findById(id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Send reply email
    const mailOptions = {
      from: 'pasindurandika35@gmail.com',
      to: toEmail,
      subject: 'Reply to your message from PlotPro',
      text: replyMessage,
    };

    // Send email using transporter
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Failed to send reply:', error);
        return res.status(500).json({ message: 'Failed to send reply' });
      }
      
      // Update submission status and reply message
      submission.status = 'replied';
      submission.replyMessage = replyMessage;
      await submission.save();

      res.status(200).json({ message: 'Reply sent successfully' });
    });

  } catch (error) {
    console.error('Failed to send reply:', error);
    res.status(500).json({ message: 'Failed to send reply' });
  }
});

// Route to delete a submission
router.delete('/submissions/:id', async (req, res) => {
  try {
    await ContactSubmission.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Delete Submission Error:', error);
    res.status(500).json({ error: 'Failed to delete submission', details: error.message });
  }
});

module.exports = router;
