const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.post('/', async (req, res) => {
  try {
    const { description, tags, budget, currency } = req.body;
    if (!description || !tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: 'Description and at least one tag are required.' });
    }
    if (typeof budget !== 'number' && typeof budget !== 'string') {
      return res.status(400).json({ message: 'Budget is required.' });
    }
    const budgetNum = Number(budget);
    if (isNaN(budgetNum) || budgetNum <= 0) {
      return res.status(400).json({ message: 'Budget must be a positive number.' });
    }
    const allowedCurrencies = ['INR', 'USD', 'AUD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'SGD', 'CHF', 'ZAR'];
    if (!currency || !allowedCurrencies.includes(currency)) {
      return res.status(400).json({ message: 'Invalid currency.' });
    }
    // Word count validation (max 200 words)
    const wordCount = description.trim().split(/\s+/).length;
    if (wordCount > 200) {
      return res.status(400).json({ message: 'Description must be 200 words or less.' });
    }
    const job = new Job({ description, tags, budget: budgetNum, currency });
    await job.save();
    res.status(201).json({
      id: job._id,
      description: job.description,
      tags: job.tags,
      budget: job.budget,
      currency: job.currency,
      createdAt: job.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// GET /api/jobs - Fetch recently posted jobs
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const jobs = await Job.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    res.json(jobs.map(job => ({
      id: job._id,
      description: job.description,
      tags: job.tags,
      budget: job.budget,
      currency: job.currency,
      createdAt: job.createdAt
    })));
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// POST /api/jobs/:id/accept - Freelancer accepts a job
router.post('/:id/accept', async (req, res) => {
  try {
    // Assume freelancer info is in req.body.userId (in real app, use auth middleware)
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Missing freelancer userId.' });
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    // Prevent duplicate acceptance
    if (job.acceptedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already accepted this job.' });
    }
    job.acceptedBy.push(userId);
    await job.save();
    res.json({ message: 'Job accepted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// GET /api/jobs/:id/accepted - Employer views accepted freelancers
router.get('/:id/accepted', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('acceptedBy', 'username email');
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json({
      acceptedBy: job.acceptedBy // Array of { _id, username, email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

// GET /api/jobs/:id - Fetch a single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).lean();
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json({
      id: job._id,
      description: job.description,
      tags: job.tags,
      budget: job.budget,
      currency: job.currency,
      createdAt: job.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

module.exports = router;
