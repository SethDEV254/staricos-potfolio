const express = require('express');
const router = express.Router();

// Sample projects data (replace with database later)
const projects = [
  {
    id: 1,
    title: 'DeFi Lending Protocol',
    description: 'Decentralized lending platform with automated market making',
    tech: ['Solidity', 'Hardhat', 'React', 'Web3.js'],
    category: 'blockchain',
    featured: true,
    github: 'https://github.com/dollarpath1/defi-lending',
    demo: 'https://defi-lending-demo.com'
  },
  {
    id: 2,
    title: 'NFT Marketplace',
    description: 'Full-featured NFT marketplace with minting and trading',
    tech: ['Solidity', 'IPFS', 'Next.js', 'Ethers.js'],
    category: 'blockchain',
    featured: true,
    github: 'https://github.com/dollarpath1/nft-marketplace',
    demo: 'https://nft-marketplace-demo.com'
  },
  {
    id: 3,
    title: 'AI-Powered Trading Bot',
    description: 'Machine learning bot for cryptocurrency trading',
    tech: ['Python', 'TensorFlow', 'Web3.py', 'REST APIs'],
    category: 'ai',
    featured: true,
    github: 'https://github.com/dollarpath1/trading-bot'
  },
  {
    id: 4,
    title: 'DAO Governance Platform',
    description: 'Decentralized autonomous organization with voting',
    tech: ['Solidity', 'Snapshot', 'React', 'GraphQL'],
    category: 'blockchain',
    featured: false,
    github: 'https://github.com/dollarpath1/dao-platform'
  }
];

// Get all projects
router.get('/', (req, res) => {
  const { category, featured } = req.query;
  
  let filtered = projects;
  
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (featured === 'true') {
    filtered = filtered.filter(p => p.featured);
  }
  
  res.json({ projects: filtered });
});

// Get single project
router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  res.json({ project });
});

module.exports = router;
