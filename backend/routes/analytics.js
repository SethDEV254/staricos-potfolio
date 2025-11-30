const express = require('express');
const router = express.Router();

// Track page views
router.post('/pageview', (req, res) => {
  const { page, referrer, userAgent } = req.body;
  
  // Log analytics (replace with actual analytics service)
  console.log('Page view:', {
    page,
    referrer,
    userAgent,
    ip: req.ip,
    timestamp: new Date()
  });
  
  res.json({ success: true });
});

// Track events
router.post('/event', (req, res) => {
  const { event, category, label, value } = req.body;
  
  // Log event (replace with actual analytics service)
  console.log('Event:', {
    event,
    category,
    label,
    value,
    ip: req.ip,
    timestamp: new Date()
  });
  
  res.json({ success: true });
});

module.exports = router;
