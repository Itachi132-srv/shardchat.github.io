const rateLimit = require('express-rate-limit');

// Limit login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: { error: "Too many login attempts from this IP, please try again after 15 minutes." }
});

app.use('/api/auth/login', loginLimiter);

