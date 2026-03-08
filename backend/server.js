const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json());

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  applyUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); 
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/jobs', async (req, res) => {
  const newJob = new Job({
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    applyUrl: req.body.applyUrl
  });

  try {
    const savedJob = await newJob.save();
    console.log('✅ New job saved to database:', savedJob.title);
    res.status(201).json(savedJob);
  } catch (err) {
    console.log('❌ Error saving job:', err.message);
    res.status(400).json({ message: err.message });
  }
});


// 4. Start the server
// The PORT is now dynamic for deployment (process.env.PORT)
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});