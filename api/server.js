import { config } from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const app = express();

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Enable CORS for frontend requests
const allowedOrigins = [
  'https://sawarisewa.in',
  'https://sawarisewa.in/',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://sawari-landing-page-1.onrender.com',
  'https://sawari-landing-page.onrender.com'
];

// Configure rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  trustProxy: true // Trust the X-Forwarded-For header
});

// Apply security middleware
app.use(helmet());

// Apply compression
app.use(compression());

// Apply rate limiting to all routes
app.use(limiter);

// Configure CORS with preflight caching
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
}));

// Add response time header
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!res.headersSent) {
      res.setHeader('X-Response-Time', `${duration}ms`);
    }
  });
  next();
});

// Optimize JSON parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Add caching headers for static files
const distPath = path.join(__dirname, '../dist');
try {
  await fs.access(distPath);
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true,
    lastModified: true
  }));
} catch (error) {
  console.log('Static files directory not found, skipping static file serving');
}

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create mail transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  pool: true, // Use pooled connections
  maxConnections: 5, // Maximum number of connections in the pool
  maxMessages: 100, // Maximum number of messages per connection
  rateDelta: 1000, // Minimum time between messages
  rateLimit: 5, // Maximum number of messages per rateDelta
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development'
});

// Verify SMTP connection
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

// Helper function for consistent email template
const createEmailTemplate = (title, content, isAdminEmail = false) => `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #FD9D00; margin: 0 0 24px; padding: 24px 0; border-bottom: 2px solid #f3f4f6;">${title}</h2>
    
    ${content}
    
    ${!isAdminEmail ? `
    <div style="background-color: #fff7ed; padding: 16px; border-left: 4px solid #FD9D00; border-radius: 4px; margin: 24px 0;">
      <p style="margin: 0;">If you have any questions, please don't hesitate to contact us at <a href="mailto:support@sawarisewa.in" style="color: #FD9D00;">support@sawarisewa.in</a></p>
    </div>
    ` : ''}
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f3f4f6;">
      ${isAdminEmail ? 
        `Submission Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}` :
        `Best regards,<br>The SawaRI Team`}
    </p>
  </div>
`;

// Email sending endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  console.log('Received email request:', { name, email, subject }); // Debug log

  try {
    // Send to admin
    const adminMailResult = await transporter.sendMail({
      from: {
        name: 'SawaRI Platform',
        address: process.env.EMAIL_USER
      },
      to: 'support@sawarisewa.in',
      subject: `SawaRI: ${subject}`,
      html: createEmailTemplate(subject, `
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
          <div style="margin-bottom: 16px;">
            <strong>From:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Phone:</strong> ${phone}
          </div>
          <div style="white-space: pre-line;">${message}</div>
        </div>
      `, true)
    });

    console.log('Admin email sent:', adminMailResult); // Debug log

    // Send confirmation to user
    const userMailResult = await transporter.sendMail({
      from: {
        name: 'SawaRI Team',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: `Thank you for contacting SawaRI`,
      html: createEmailTemplate('Thank you for reaching out!', `
        <p style="margin-bottom: 16px;">Dear ${name},</p>
        <p style="margin-bottom: 16px;">We've received your message and will get back to you within 24 hours.</p>
        <p style="margin-bottom: 24px;">If you have any urgent concerns, please feel free to call us at +91 9650636147.</p>
      `)
    });

    console.log('User confirmation email sent:', userMailResult); // Debug log
    
    if (!res.headersSent) {
      res.status(200).json({ message: 'Email sent successfully' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to send email',
        details: error.message,
        code: error.code
      });
    }
  }
});

// Career application endpoint
app.post('/api/career-application', async (req, res) => {
  try {
    const { name, email, phone, position, message } = req.body;
    
    console.log('Career application request received:', {
      body: req.body,
      contentType: req.headers['content-type']
    });

    // Validate required fields
    if (!name || !email || !phone || !position || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'All fields are required'
      });
    }

    // Admin notification email
    const adminContent = `
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <div style="margin-bottom: 24px;">
          <h3 style="color: #1e293b; margin: 0 0 16px;">Applicant Information</h3>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Position:</strong> ${position}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="color: #1e293b; margin: 0 0 16px;">Cover Letter</h3>
          <p style="margin: 8px 0;">${message}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: { name: 'SawaRI Platform', address: process.env.EMAIL_USER },
      to: 'support@sawarisewa.in',
      subject: `New Career Application: ${position}`,
      html: createEmailTemplate('New Career Application', adminContent, true)
    });

    // Applicant confirmation email
    const applicantContent = `
      <p style="margin-bottom: 16px;">Dear ${name},</p>
      
      <p style="margin-bottom: 16px;">Thank you for applying for the position of ${position} at SawaRI. We appreciate your interest in joining our team.</p>
      
      <p style="margin-bottom: 16px;">Our hiring team will review your application and get back to you if your qualifications match our requirements.</p>
    `;

    await transporter.sendMail({
      from: { name: 'SawaRI Team', address: process.env.EMAIL_USER },
      to: email,
      subject: 'Thank you for applying to SawaRI',
      html: createEmailTemplate('Application Received!', applicantContent)
    });

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({
      error: 'Failed to process application',
      details: error.message
    });
  }
});

// Driver registration notification endpoint
app.post('/api/driver-notification', async (req, res) => {
  const { 
    name, 
    email, 
    mobile, 
    address, 
    district, 
    state, 
    license_number,
    rc_number,
    insurance_number,
    vehicle_details,
    pincode
  } = req.body;
  
  console.log('Received driver notification request:', { name, email, mobile });

  try {
    // Admin notification email
    const adminContent = `
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <div style="margin-bottom: 24px;">
          <h3 style="color: #1e293b; margin: 0 0 16px;">Personal Information</h3>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p style="margin: 8px 0;"><strong>Mobile:</strong> ${mobile || 'Not provided'}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="color: #1e293b; margin: 0 0 16px;">Address Information</h3>
          <p style="margin: 8px 0;"><strong>Address:</strong> ${address || 'Not provided'}</p>
          <p style="margin: 8px 0;"><strong>District:</strong> ${district || 'Not provided'}</p>
          <p style="margin: 8px 0;"><strong>State:</strong> ${state || 'Not provided'}</p>
          <p style="margin: 8px 0;"><strong>PIN Code:</strong> ${pincode || 'Not provided'}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="color: #1e293b; margin: 0 0 16px;">Vehicle Information</h3>
          <p style="margin: 8px 0;"><strong>License Number:</strong> ${license_number || 'Not provided'}</p>
          <p style="margin: 8px 0;"><strong>RC Number:</strong> ${rc_number || 'Not provided'}</p>
          <p style="margin: 8px 0;"><strong>Insurance Number:</strong> ${insurance_number || 'Not provided'}</p>
          <p style="margin: 8px 0;"><strong>Vehicle Details:</strong> ${vehicle_details || 'Not provided'}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: { name: 'SawaRI Platform', address: process.env.EMAIL_USER },
      to: 'support@sawarisewa.in',
      subject: 'New Driver Registration',
      html: createEmailTemplate('New Driver Registration', adminContent, true)
    });

    // Driver confirmation email
    const driverContent = `
      <p style="margin-bottom: 16px;">Dear ${name},</p>
      
      <p style="margin-bottom: 16px;">Thank you for your interest in becoming a SawaRI driver. We have received your registration and our team will review it shortly.</p>
      
      <div style="background-color: #fff7ed; padding: 16px; border-left: 4px solid #FD9D00; border-radius: 4px; margin: 24px 0;">
        <p style="margin: 0;">Please keep your documents ready for verification when our team contacts you.</p>
      </div>
    `;

    await transporter.sendMail({
      from: { name: 'SawaRI Team', address: process.env.EMAIL_USER },
      to: email,
      subject: 'Thank You for Registering with SawaRI',
      html: createEmailTemplate('Welcome to SawaRI!', driverContent)
    });

    res.status(200).json({ message: 'Driver registration notification sent successfully' });
  } catch (error) {
    console.error('Error sending driver notification:', error);
    res.status(500).json({ 
      error: 'Failed to send driver notification',
      details: error.message
    });
  }
});

// Waitlist notification endpoint
app.post('/api/waitlist-notification', async (req, res) => {
  const { name, email, phone, location, usage_frequency, marketing_consent } = req.body;
  
  console.log('Received waitlist notification request:', { name, email, phone, location });

  try {
    // Admin notification email
    const adminContent = `
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <div style="margin-bottom: 24px;">
          <h3 style="color: #1e293b; margin: 0 0 16px;">Personal Information</h3>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="color: #1e293b; margin: 0 0 16px;">Location & Preferences</h3>
          <p style="margin: 8px 0;"><strong>Location:</strong> ${location}</p>
          <p style="margin: 8px 0;"><strong>Usage Frequency:</strong> ${usage_frequency}</p>
          <p style="margin: 8px 0;"><strong>Marketing Consent:</strong> ${marketing_consent ? 'Yes' : 'No'}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: { name: 'SawaRI Platform', address: process.env.EMAIL_USER },
      to: 'support@sawarisewa.in',
      subject: 'New Waitlist Registration',
      html: createEmailTemplate('New Waitlist Registration', adminContent, true)
    });

    // User confirmation email
    const userContent = `
      <p style="margin-bottom: 16px;">Dear ${name},</p>
      
      <p style="margin-bottom: 16px;">Thank you for joining our waitlist! We're excited to have you on board and will notify you as soon as we launch our services in ${location}.</p>
      
      <div style="background-color: #fff7ed; padding: 16px; border-left: 4px solid #FD9D00; border-radius: 4px; margin: 24px 0;">
        <p style="margin: 0;">Stay connected with us on social media for the latest updates about our launch and services!</p>
      </div>
    `;

    await transporter.sendMail({
      from: { name: 'SawaRI Team', address: process.env.EMAIL_USER },
      to: email,
      subject: 'Welcome to SawaRI Waitlist!',
      html: createEmailTemplate('Welcome to SawaRI!', userContent)
    });

    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ 
      error: 'Failed to send notification',
      details: error.message
    });
  }
});

// Handle React routing, return all requests to React app
app.get('*', async (req, res) => {
  try {
    const indexPath = path.join(__dirname, '../dist/index.html');
    await fs.access(indexPath);
    res.sendFile(indexPath);
  } catch (error) {
    // If index.html doesn't exist, return a simple API response
    res.status(200).json({
      message: 'SawaRI API Server is running',
      status: 'operational',
      version: '1.0.0'
    });
  }
});

// Add catch-all handler for undefined routes
app.use((req, res) => {
  console.log('404 for route:', req.url);
  res.status(404).json({
    error: 'Route not found',
    path: req.url
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available routes:', app._router.stack
    .filter(r => r.route)
    .map(r => `${Object.keys(r.route.methods).join(',')} ${r.route.path}`));
});