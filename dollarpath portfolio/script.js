// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Interactive Terminal
const terminalInput = document.getElementById('terminal-input');
const terminalHistory = document.getElementById('terminal-history');
const terminalBody = document.getElementById('terminal-body');

// Sudo password state
let waitingForPassword = false;
let sudoAuthenticated = false;

const commands = {
    help: {
        description: 'Show available commands',
        output: `<p class="output-name">Available Commands</p>
<br>
<p><span class="file">ai</span>          - Chat with AI assistant</p>
<p><span class="file">about</span>       - Learn about Starico</p>
<p><span class="file">bio</span>         - Short biography</p>
<p><span class="file">skills</span>      - View technical skills</p>
<p><span class="file">experience</span>  - Work experience</p>
<p><span class="file">education</span>   - Educational background</p>
<p><span class="file">projects</span>    - See my projects</p>
<p><span class="file">blockchain</span>  - Blockchain expertise</p>
<p><span class="file">services</span>    - Services I offer</p>
<p><span class="file">contact</span>     - Get contact information</p>
<p><span class="file">email</span>       - Get email address</p>
<p><span class="file">github</span>      - View GitHub profile</p>
<p><span class="file">social</span>      - View social media links</p>
<p><span class="file">resume</span>      - Download resume</p>
<p><span class="file">quote</span>       - Get a random quote</p>
<p><span class="file">sudo</span>        - Execute with elevated privileges</p>
<p><span class="file">light</span>       - Switch to light mode</p>
<p><span class="file">dark</span>        - Switch to dark mode</p>
<p><span class="file">clear</span>       - Clear terminal</p>
<p><span class="file">help</span>        - Show this help message</p>
<br>
<p>Tip: Type 'ai' to chat with the AI assistant or any command to explore my portfolio</p>`
    },
    light: {
        description: 'Switch to light mode',
        output: `<p style="color: #10b981;">✓ Switching to light mode...</p>
<p>Light mode activated! The site theme has been updated.</p>`
    },
    dark: {
        description: 'Switch to dark mode',
        output: `<p style="color: #10b981;">✓ Switching to dark mode...</p>
<p>Dark mode activated! The site theme has been updated.</p>`
    },
    ai: {
        description: 'Chat with AI assistant',
        output: `<p class="output-name">AI Assistant Activated</p>
<br>
<p style="color: #10b981;">🤖 Hello! I'm Starico's AI Assistant.</p>
<br>
<p>I can help you learn more about Starico's work, skills, and experience. Here are some things you can ask me:</p>
<br>
<p><strong>Quick Questions:</strong></p>
<p>• "What technologies does Starico work with?"</p>
<p>• "Tell me about Starico's blockchain projects"</p>
<p>• "What AI/ML experience does Starico have?"</p>
<p>• "How can I contact Starico?"</p>
<br>
<p><strong>Smart Responses:</strong></p>
<p>I can intelligently answer questions about Starico's portfolio, provide recommendations, and guide you through the available information.</p>
<br>
<p style="color: var(--text-secondary); font-style: italic;">Note: This is a simulated AI assistant. For real-time AI chat, integration with an AI API would be required.</p>
<br>
<p>Try asking: <span class="file">ai what are starico's main skills?</span></p>`
    },
    sudo: {
        description: 'Execute with elevated privileges',
        output: `<p class="output-name">Sudo Access Granted</p>
<br>
<p style="color: #27c93f;">[sudo] password for visitor: ********</p>
<p style="color: #27c93f;">✓ Authentication successful</p>
<br>
<p><strong>Elevated Privileges Activated</strong></p>
<p>You now have admin access to Starico's portfolio terminal.</p>
<br>
<p><strong>Available Admin Commands:</strong></p>
<p><span class="file">sudo about</span>      - Full system information</p>
<p><span class="file">sudo projects</span>   - Access all project files</p>
<p><span class="file">sudo skills</span>     - View complete skill tree</p>
<p><span class="file">sudo contact</span>    - Direct communication channel</p>
<br>
<p style="color: var(--text-secondary); font-style: italic;">Note: With great power comes great responsibility 🚀</p>`
    },
    about: {
        description: 'About Starico',
        output: `<p class="output-name">Starico</p>
<p class="output-role">Blockchain & AI Developer</p>
<p class="output-desc">Building the future with Web3 and Artificial Intelligence</p>
<br>
<p>I'm a passionate blockchain and AI developer specializing in smart contracts, decentralized applications, and machine learning solutions. With expertise in Solidity, Web3 technologies, and AI/ML frameworks, I bring innovative ideas to life through clean, secure code.</p>
<br>
<p>My approach combines technical excellence with creative problem-solving to deliver solutions that not only look great but perform exceptionally in the decentralized ecosystem.</p>
<br>
<p><strong>Location:</strong> Available for remote work worldwide</p>
<p><strong>Status:</strong> Open to new opportunities</p>
<p><strong>Specialization:</strong> Smart Contracts, DeFi, AI/ML, Web3</p>`
    },
    bio: {
        description: 'Short biography',
        output: `<p class="output-name">Quick Bio</p>
<br>
<p>Blockchain & AI Developer with a passion for decentralized technologies and intelligent systems. I build secure smart contracts, innovative dApps, and AI-powered solutions that push the boundaries of what's possible in Web3.</p>
<br>
<p>When I'm not coding, I'm exploring the latest in blockchain technology, contributing to open-source projects, and staying ahead of the curve in the rapidly evolving world of decentralized finance and artificial intelligence.</p>`
    },
    skills: {
        description: 'Technical skills',
        output: `<p class="output-name">Technical Skills</p>
<br>
<p><strong>Blockchain & Web3:</strong></p>
<p><span class="file">Solidity</span> <span class="file">Ethereum</span> <span class="file">Smart Contracts</span> <span class="file">Web3.js</span> <span class="file">Ethers.js</span> <span class="file">Hardhat</span> <span class="file">Truffle</span> <span class="file">DeFi</span> <span class="file">NFTs</span></p>
<br>
<p><strong>AI & Machine Learning:</strong></p>
<p><span class="file">Python</span> <span class="file">TensorFlow</span> <span class="file">PyTorch</span> <span class="file">Scikit-learn</span> <span class="file">NLP</span> <span class="file">Computer Vision</span> <span class="file">Deep Learning</span></p>
<br>
<p><strong>Web Development:</strong></p>
<p><span class="file">JavaScript</span> <span class="file">TypeScript</span> <span class="file">React</span> <span class="file">Next.js</span> <span class="file">Node.js</span> <span class="file">Express</span> <span class="file">MongoDB</span> <span class="file">PostgreSQL</span></p>
<br>
<p><strong>Tools & Others:</strong></p>
<p><span class="file">Git</span> <span class="file">Docker</span> <span class="file">AWS</span> <span class="file">CI/CD</span> <span class="file">REST APIs</span> <span class="file">GraphQL</span></p>`
    },
    experience: {
        description: 'Work experience',
        output: `<p class="output-name">Work Experience</p>
<br>
<p><strong>Blockchain Developer</strong> | Freelance</p>
<p>2022 - Present</p>
<p>• Developed and deployed 15+ smart contracts on Ethereum and Polygon</p>
<p>• Built DeFi protocols with TVL exceeding $2M</p>
<p>• Created NFT marketplaces and minting platforms</p>
<p>• Conducted security audits and optimized gas efficiency</p>
<br>
<p><strong>AI/ML Engineer</strong> | Various Projects</p>
<p>2021 - Present</p>
<p>• Implemented machine learning models for predictive analytics</p>
<p>• Developed NLP solutions for text analysis and chatbots</p>
<p>• Created computer vision applications for image recognition</p>
<p>• Integrated AI capabilities into Web3 applications</p>
<br>
<p><strong>Full Stack Developer</strong></p>
<p>2020 - 2022</p>
<p>• Built responsive web applications using React and Node.js</p>
<p>• Designed and implemented RESTful APIs</p>
<p>• Managed databases and optimized query performance</p>
<p>• Collaborated with cross-functional teams</p>`
    },
    education: {
        description: 'Educational background',
        output: `<p class="output-name">Education & Certifications</p>
<br>
<p><strong>Computer Science & Engineering</strong></p>
<p>Bachelor's Degree</p>
<p>Focus: Blockchain Technology, Artificial Intelligence</p>
<br>
<p><strong>Certifications:</strong></p>
<p>• Ethereum Developer Certification</p>
<p>• Smart Contract Security Auditor</p>
<p>• Machine Learning Specialization</p>
<p>• Deep Learning Specialization</p>
<p>• AWS Certified Solutions Architect</p>
<br>
<p><strong>Continuous Learning:</strong></p>
<p>Actively learning and staying updated with the latest in blockchain, AI, and Web3 technologies through courses, conferences, and hands-on projects.</p>`
    },
    projects: {
        description: 'View projects',
        output: `<p class="output-name">Featured Projects</p>
<br>
<p><strong>Project 1: E-Commerce Platform</strong></p>
<p>Modern shopping experience with seamless checkout</p>
<p>Tech Stack: <span class="file">React</span> <span class="file">Node.js</span> <span class="file">Stripe</span></p>
<p>• Built responsive e-commerce platform with real-time inventory</p>
<p>• Integrated Stripe payment gateway for secure transactions</p>
<p>• Implemented user authentication and order management</p>
<br>
<p><strong>Project 2: Portfolio Website</strong></p>
<p>Minimalist design for creative professional</p>
<p>Tech Stack: <span class="file">HTML/CSS</span> <span class="file">JavaScript</span> <span class="file">Animation</span></p>
<p>• Designed and developed modern portfolio with smooth animations</p>
<p>• Implemented interactive terminal interface</p>
<p>• Optimized for performance and SEO</p>
<br>
<p><strong>Project 3: Dashboard App</strong></p>
<p>Data visualization and analytics platform</p>
<p>Tech Stack: <span class="file">Vue.js</span> <span class="file">D3.js</span> <span class="file">API</span></p>
<p>• Created interactive data visualization dashboard</p>
<p>• Integrated multiple APIs for real-time data</p>
<p>• Built custom charts and analytics tools</p>
<br>
<p><strong>Project 4: DeFi Lending Protocol</strong></p>
<p>Decentralized lending platform with automated market making</p>
<p>Tech Stack: <span class="file">Solidity</span> <span class="file">Hardhat</span> <span class="file">React</span> <span class="file">Web3.js</span></p>
<p>• Developed smart contracts for lending and borrowing</p>
<p>• Implemented automated interest rate calculations</p>
<p>• Conducted security audits and gas optimization</p>
<br>
<p><strong>Project 5: NFT Marketplace</strong></p>
<p>Full-featured NFT marketplace with minting and trading</p>
<p>Tech Stack: <span class="file">Solidity</span> <span class="file">IPFS</span> <span class="file">Next.js</span> <span class="file">Ethers.js</span></p>
<p>• Built NFT minting and trading platform</p>
<p>• Integrated IPFS for decentralized storage</p>
<p>• Implemented royalty mechanisms and auction features</p>
<br>
<p><strong>Project 6: AI-Powered Trading Bot</strong></p>
<p>Machine learning bot for cryptocurrency trading</p>
<p>Tech Stack: <span class="file">Python</span> <span class="file">TensorFlow</span> <span class="file">Web3.py</span> <span class="file">REST APIs</span></p>
<p>• Developed ML models for price prediction</p>
<p>• Implemented automated trading strategies</p>
<p>• Integrated with multiple exchange APIs</p>
<br>
<p><strong>Project 7: DAO Governance Platform</strong></p>
<p>Decentralized autonomous organization with voting</p>
<p>Tech Stack: <span class="file">Solidity</span> <span class="file">Snapshot</span> <span class="file">React</span> <span class="file">GraphQL</span></p>
<p>• Created DAO smart contracts with voting mechanisms</p>
<p>• Built governance dashboard for proposal management</p>
<p>• Implemented token-weighted voting system</p>`
    },
    blockchain: {
        description: 'Blockchain expertise',
        output: `<p class="output-name">Blockchain Expertise</p>
<br>
<p><strong>Smart Contract Development:</strong></p>
<p>Expert in writing secure, gas-optimized smart contracts using Solidity. Experienced with ERC standards (ERC-20, ERC-721, ERC-1155) and complex DeFi protocols.</p>
<br>
<p><strong>DeFi Protocols:</strong></p>
<p>Built lending platforms, DEXs, yield farming protocols, and liquidity pools. Deep understanding of AMMs, flash loans, and tokenomics.</p>
<br>
<p><strong>NFT Development:</strong></p>
<p>Created NFT marketplaces, minting platforms, and generative art projects. Experience with IPFS, metadata standards, and royalty mechanisms.</p>
<br>
<p><strong>Security:</strong></p>
<p>Conduct security audits, implement best practices, and protect against common vulnerabilities (reentrancy, overflow, etc.).</p>`
    },
    ai: {
        description: 'AI/ML capabilities',
        output: `<p class="output-name">AI & Machine Learning</p>
<br>
<p><strong>Machine Learning:</strong></p>
<p>Develop predictive models, classification systems, and recommendation engines using scikit-learn, TensorFlow, and PyTorch.</p>
<br>
<p><strong>Natural Language Processing:</strong></p>
<p>Build chatbots, sentiment analysis tools, and text generation systems. Experience with transformers and large language models.</p>
<br>
<p><strong>Computer Vision:</strong></p>
<p>Create image recognition, object detection, and facial recognition systems using CNNs and advanced deep learning techniques.</p>
<br>
<p><strong>AI + Blockchain:</strong></p>
<p>Integrate AI capabilities into Web3 applications, creating intelligent dApps and automated trading systems.</p>`
    },
    services: {
        description: 'Services offered',
        output: `<p class="output-name">Services I Offer</p>
<br>
<p><strong>Smart Contract Development</strong></p>
<p>Custom smart contracts, DeFi protocols, NFT platforms, and DAO governance systems.</p>
<br>
<p><strong>dApp Development</strong></p>
<p>Full-stack decentralized applications with modern UI/UX and Web3 integration.</p>
<br>
<p><strong>AI/ML Solutions</strong></p>
<p>Machine learning models, NLP systems, computer vision applications, and AI integration.</p>
<br>
<p><strong>Security Audits</strong></p>
<p>Smart contract audits, vulnerability assessments, and security best practices implementation.</p>
<br>
<p><strong>Consulting</strong></p>
<p>Blockchain architecture, tokenomics design, AI strategy, and technical advisory.</p>
<br>
<p>Interested? Type 'contact' to get in touch!</p>`
    },
    contact: {
        description: 'Contact information',
        output: `<p class="output-name">Get in Touch</p>
<p>Have a project in mind or just want to chat? Feel free to reach out.</p>
<br>
<p><strong>Phone:</strong> <a href="tel:+254797844481">+254 797 844 481</a></p>
<p><strong>Email:</strong> <a href="mailto:dollarpath1@gmail.com">dollarpath1@gmail.com</a></p>
<p><strong>GitHub:</strong> <a href="https://github.com/dollarpath1" target="_blank">github.com/dollarpath1</a></p>
<p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/starico" target="_blank">linkedin.com/in/starico</a></p>
<p><strong>Twitter:</strong> <a href="https://twitter.com/dollarpath_ke" target="_blank">@dollarpath_ke</a></p>
<br>
<p><strong>Availability:</strong> Open for freelance projects and full-time opportunities</p>
<p><strong>Response Time:</strong> Usually within 24 hours</p>`
    },
    email: {
        description: 'Get email address',
        output: `<p><strong>Email:</strong> <a href="mailto:dollarpath1@gmail.com">dollarpath1@gmail.com</a></p>
<p>Feel free to reach out for collaborations, projects, or just to say hi!</p>`
    },
    github: {
        description: 'View GitHub profile',
        output: `<p class="output-name">GitHub Profile</p>
<br>
<p><strong>Username:</strong> <a href="https://github.com/dollarpath1" target="_blank">@dollarpath1</a></p>
<p><strong>Profile:</strong> <a href="https://github.com/dollarpath1" target="_blank">github.com/dollarpath1</a></p>
<br>
<p>Check out my repositories, contributions, and open source projects!</p>
<br>
<p>📊 Active in blockchain, AI/ML, and Web3 development</p>
<p>⭐ Building innovative solutions with cutting-edge technologies</p>`
    },
    social: {
        description: 'Social media links',
        output: `<p class="output-name">Connect With Me</p>
<br>
<p><strong>GitHub:</strong> <a href="https://github.com/dollarpath1" target="_blank">github.com/dollarpath1</a></p>
<p>Open source projects and code repositories</p>
<br>
<p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/starico" target="_blank">linkedin.com/in/starico</a></p>
<p>Professional network and career updates</p>
<br>
<p><strong>Twitter:</strong> <a href="https://twitter.com/dollarpath_ke" target="_blank">@dollarpath_ke</a></p>
<p>Tech insights, blockchain news, and AI updates</p>`
    },
    resume: {
        description: 'Download resume',
        output: `<p class="output-name">Resume</p>
<br>
<p>Download my resume to learn more about my experience and skills:</p>
<br>
<p><a href="/resume.pdf" target="_blank">📄 Download Resume (PDF)</a></p>
<br>
<p>Or view my complete profile on <a href="https://linkedin.com/in/starico" target="_blank">LinkedIn</a></p>`
    },
    quote: {
        description: 'Random inspirational quote',
        output: null // Will be handled specially
    },
    clear: {
        description: 'Clear terminal',
        output: null
    }
};

// Special commands
const specialCommands = {
    'scroll top': () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return 'Scrolling to top...';
    }
};

// AI Assistant Response Function
function getAIResponse(query) {
    const q = query.toLowerCase();
    
    // Skills related
    if (q.includes('skill') || q.includes('technolog') || q.includes('know')) {
        return `<p>Starico specializes in:</p>
<p><strong>Blockchain:</strong> Solidity, Ethereum, Smart Contracts, Web3.js, DeFi, NFTs</p>
<p><strong>AI/ML:</strong> Python, TensorFlow, PyTorch, NLP, Computer Vision</p>
<p><strong>Web Dev:</strong> JavaScript, React, Next.js, Node.js</p>
<br>
<p>Type 'skills' for the complete list!</p>`;
    }
    
    // Projects related
    if (q.includes('project') || q.includes('work') || q.includes('built')) {
        return `<p>Starico has built impressive projects including:</p>
<p>• DeFi Lending Protocols with automated market making</p>
<p>• NFT Marketplaces with minting and trading features</p>
<p>• AI-Powered Trading Bots using machine learning</p>
<p>• DAO Governance Platforms with voting mechanisms</p>
<br>
<p>Type 'projects' to see all projects!</p>`;
    }
    
    // Contact related
    if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('hire')) {
        return `<p>You can reach Starico at:</p>
<p>📧 Email: <a href="mailto:dollarpath1@gmail.com">dollarpath1@gmail.com</a></p>
<p>📱 Phone: <a href="tel:+254797844481">+254 797 844 481</a></p>
<p>💼 GitHub: <a href="https://github.com/dollarpath1" target="_blank">github.com/dollarpath1</a></p>
<br>
<p>Type 'contact' for all contact options!</p>`;
    }
    
    // Experience related
    if (q.includes('experience') || q.includes('background') || q.includes('worked')) {
        return `<p>Starico has extensive experience:</p>
<p>• Blockchain Developer (2022-Present): 15+ smart contracts deployed</p>
<p>• AI/ML Engineer (2021-Present): NLP and computer vision projects</p>
<p>• Full Stack Developer (2020-2022): React and Node.js applications</p>
<br>
<p>Type 'experience' for detailed work history!</p>`;
    }
    
    // Blockchain related
    if (q.includes('blockchain') || q.includes('web3') || q.includes('defi') || q.includes('nft')) {
        return `<p>Starico is an expert in blockchain development:</p>
<p>• Smart contract development with Solidity</p>
<p>• DeFi protocols and liquidity pools</p>
<p>• NFT platforms and marketplaces</p>
<p>• Security audits and gas optimization</p>
<br>
<p>Type 'blockchain' for more details!</p>`;
    }
    
    // AI related
    if (q.includes('ai') || q.includes('machine learning') || q.includes('ml')) {
        return `<p>Starico's AI/ML expertise includes:</p>
<p>• Machine learning models and predictive analytics</p>
<p>• Natural Language Processing and chatbots</p>
<p>• Computer vision and image recognition</p>
<p>• AI integration with Web3 applications</p>
<br>
<p>Type 'ai' for comprehensive AI capabilities!</p>`;
    }
    
    // Default response
    return `<p>I can help you learn about:</p>
<p>• Starico's skills and technologies</p>
<p>• Projects and work experience</p>
<p>• Blockchain and AI expertise</p>
<p>• Contact information</p>
<br>
<p>Try asking something like "What are Starico's main skills?" or type 'help' to see all commands.</p>`;
}

// Random quotes
const quotes = [
    "The best way to predict the future is to invent it. - Alan Kay",
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "Blockchain is the tech. Bitcoin is merely the first mainstream manifestation of its potential. - Marc Kenigsberg",
    "Artificial Intelligence is the new electricity. - Andrew Ng",
    "The future is already here – it's just not evenly distributed. - William Gibson",
    "Smart contracts will be the foundation of the new economy. - Vitalik Buterin",
    "In the world of Web3, trust is code. - Anonymous",
    "Machine learning is the last invention that humanity will ever need to make. - Nick Bostrom"
];

function executeCommand(input) {
    const cmd = input.toLowerCase().trim();
    
    // Handle password input
    if (waitingForPassword) {
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `<span class="prompt">starico@portfolio:~$</span> <span class="command">********</span>`;
        terminalHistory.appendChild(commandLine);
        
        if (input === 'dollarpath') {
            sudoAuthenticated = true;
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';
            terminalHistory.appendChild(outputDiv);
            typeWriter(outputDiv, `<p style="color: #27c93f;">✓ Authentication successful</p>
<br>
<p><strong>Elevated Privileges Activated</strong></p>
<p>You now have admin access to Starico's portfolio terminal.</p>
<br>
<p><strong>Available Admin Commands:</strong></p>
<p><span class="file">sudo about</span>      - Full system information</p>
<p><span class="file">sudo projects</span>   - Access all project files</p>
<p><span class="file">sudo skills</span>     - View complete skill tree</p>
<p><span class="file">sudo contact</span>    - Direct communication channel</p>
<br>
<p style="color: var(--text-secondary); font-style: italic;">Note: With great power comes great responsibility 🚀</p>`).then(() => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            });
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'terminal-output error-text';
            terminalHistory.appendChild(errorDiv);
            typeWriter(errorDiv, 'Sorry, try again.').then(() => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            });
        }
        waitingForPassword = false;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        return;
    }
    
    // Add command to history
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="prompt">starico@portfolio:~$</span> <span class="command">${input}</span>`;
    terminalHistory.appendChild(commandLine);
    
    // Handle theme commands
    if (cmd === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output';
        terminalHistory.appendChild(outputDiv);
        typeWriter(outputDiv, commands.light.output).then(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
        return;
    }
    
    if (cmd === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output';
        terminalHistory.appendChild(outputDiv);
        typeWriter(outputDiv, commands.dark.output).then(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
        return;
    }
    
    // Handle sudo command
    if (cmd === 'sudo') {
        if (sudoAuthenticated) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';
            terminalHistory.appendChild(outputDiv);
            typeWriter(outputDiv, `<p style="color: #27c93f;">✓ Already authenticated with sudo privileges</p>`).then(() => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            });
        } else {
            waitingForPassword = true;
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';
            terminalHistory.appendChild(outputDiv);
            typeWriter(outputDiv, `<p>[sudo] password for starico:</p>`).then(() => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            });
        }
        return;
    }
    
    // Handle AI assistant queries
    if (cmd.startsWith('ai ')) {
        const query = input.substring(3).trim();
        const aiResponse = getAIResponse(query);
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output';
        terminalHistory.appendChild(outputDiv);
        typeWriter(outputDiv, `<p style="color: #10b981;">🤖 AI Assistant:</p><br>${aiResponse}`).then(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
        return;
    }
    
    // Check special commands first
    if (specialCommands[cmd]) {
        const output = specialCommands[cmd]();
        if (output) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';
            outputDiv.textContent = output;
            terminalHistory.appendChild(outputDiv);
        }
    }
    // Check regular commands
    else if (cmd === 'clear') {
        terminalHistory.innerHTML = '';
    }
    else if (cmd === 'quote') {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output';
        terminalHistory.appendChild(outputDiv);
        typeWriter(outputDiv, `<p class="output-desc">"${randomQuote}"</p>`).then(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
    }
    else if (commands[cmd]) {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output';
        terminalHistory.appendChild(outputDiv);
        typeWriter(outputDiv, commands[cmd].output).then(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
    }
    else if (cmd === '') {
        // Do nothing for empty command
    }
    else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'terminal-output error-text';
        terminalHistory.appendChild(errorDiv);
        typeWriter(errorDiv, `Command not found: ${input}. Type 'help' for available commands.`).then(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
    }
    
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Typewriter effect function
function typeWriter(element, html, speed = 5) {
    return new Promise((resolve) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const text = tempDiv.textContent || tempDiv.innerText;
        
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.innerHTML = html;
                resolve();
            }
        }
        
        type();
    });
}

// Handle terminal input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        executeCommand(input);
        terminalInput.value = '';
    }
});

// Keep terminal input focused
terminalBody.addEventListener('click', () => {
    terminalInput.focus();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navRight = document.querySelector('.nav-right');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navRight.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navRight.classList.remove('active');
    });
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.work-item, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add transition to nav
nav.style.transition = 'transform 0.3s ease';

// Live date and time in footer
function updateDateTime() {
    const now = new Date();
    
    // Format date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', dateOptions);
    
    // Format time
    const timeString = now.toLocaleTimeString('en-US', { hour12: true });
    
    const dateElement = document.getElementById('live-date');
    const timeElement = document.getElementById('live-time');
    
    if (dateElement) {
        dateElement.textContent = dateString;
        console.log('Date updated:', dateString);
    } else {
        console.error('Date element not found!');
    }
    
    if (timeElement) {
        timeElement.textContent = timeString;
        console.log('Time updated:', timeString);
    } else {
        console.error('Time element not found!');
    }
}

// Update immediately and then every second
console.log('Starting date/time updates...');
updateDateTime();
setInterval(updateDateTime, 1000);

// 3D tilt effect for profile card
const profileCard = document.querySelector('.profile-card');

if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale(1)';
    });
}

// 3D tilt effect for floating card in about section
const floatingCard = document.querySelector('.floating-card');

if (floatingCard) {
    floatingCard.addEventListener('mousemove', (e) => {
        const rect = floatingCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        floatingCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    floatingCard.addEventListener('mouseleave', () => {
        floatingCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
}

// Make card tag draggable
const cardTag = document.querySelector('.card-tag');

if (cardTag) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    cardTag.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - cardTag.getBoundingClientRect().left;
        offsetY = e.clientY - cardTag.getBoundingClientRect().top;
        cardTag.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            e.preventDefault();
            cardTag.style.left = (e.clientX - offsetX) + 'px';
            cardTag.style.top = (e.clientY - offsetY) + 'px';
            cardTag.style.transform = 'none';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        cardTag.style.cursor = 'grab';
    });
}

// Typewriter effect for welcome message on page load
window.addEventListener('DOMContentLoaded', function() {
    const welcomeIntro = document.getElementById('welcome-intro');
    const welcomeDescription = document.getElementById('welcome-description');
    const welcomeCta = document.getElementById('welcome-cta');
    
    if (welcomeIntro && welcomeDescription && welcomeCta) {
        // Type first line
        typeWriter(welcomeIntro, "hi, i'm starico. welcome to my ai-powered portfolio.", 30).then(() => {
            // Then type second line
            return typeWriter(welcomeDescription, "i'm a blockchain & ai developer specializing in smart contracts, decentralized applications, and machine learning solutions. i build secure, innovative dapps and ai-powered systems that push the boundaries of web3 technology.", 15);
        }).then(() => {
            // Finally type third line
            return typeWriter(welcomeCta, "explore my work using the terminal commands above.", 30);
        });
    }
});
