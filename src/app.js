const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const organizationRoutes = require('./routes/organization.routes');
const memberRoutes = require('./routes/member.routes');
const dueRoutes = require('./routes/due.routes');
const paymentRoutes = require('./routes/payment.routes');
const chatRoutes = require('./routes/chat.routes');
const contentRoutes = require('./routes/content.routes');
const eventRoutes = require('./routes/event.routes');
const electionRoutes = require('./routes/election.routes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/dues', dueRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/elections', electionRoutes);

// Database connection
connectDB();

module.exports = app;