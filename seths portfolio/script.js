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
<p><span class="file">about</span>       - Learn about Seth</p>
<p><span class="file">bio</span>         - Short biography</p>
<p><span class="file">skills</span>      - View technical skills</p>
<p><span class="file">experience</span>  - Work experience</p>
<p><span class="file">education</span>   - Educational background</p>
<p><span class="file">projects</span>    - See my projects</p>
<p><span class="file">trading</span>     - Trading expertise</p>
<p><span class="file">services</span>    - Services I offer</p>
<p><span class="file">contact</span>     - Get contact information</p>
<p><span class="file">email</span>       - Get email address</p>
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
<p style="color: #10b981;">🤖 Hello! I'm Seth's AI Assistant.</p>
<br>
<p>I can help you learn more about Seth's work, skills, and experience. Here are some things you can ask me:</p>
<br>
<p><strong>Quick Questions:</strong></p>
<p>• "What does Seth specialize in?"</p>
<p>• "Tell me about MetaHub Academy"</p>
<p>• "What trading experience does Seth have?"</p>
<p>• "How can I contact Seth?"</p>
<br>
<p>Try asking: <span class="file">ai what is metahub academy?</span></p>`
    },
    sudo: {
        description: 'Execute with elevated privileges',
        output: `<p class="output-name">Sudo Access Granted</p>
<br>
<p style="color: #f7931a;">[sudo] password for visitor: ********</p>
<p style="color: #f7931a;">✓ Authentication successful</p>
<br>
<p><strong>Elevated Privileges Activated</strong></p>
<p>You now have admin access to Seth's portfolio terminal.</p>
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
        description: 'About Seth',
        output: `<p class="output-name">Seth Cryptolord</p>
<p class="output-role">CEO & Founder | Digital Entrepreneur | Web3 Visionary</p>
<p class="output-desc">Building wealth beyond boundaries through digital education and financial empowerment</p>
<br>
<p>I'm Seth Cryptolord—digital entrepreneur, visionary educator, Web3 enthusiast, and the CEO & Founder of <strong>MetaHub Academy</strong> and <strong>BullBear Trading</strong>.</p>
<br>
<p>My journey began in 2014, diving headfirst into the online business world with nothing but a dream and drive. I faced scams, confusion, and financial systems that weren't designed to benefit people like us. But I learned. I grew. I thrived.</p>
<br>
<p>In 2017, I launched MetaHub Academy, taking it to a whole new level. From my first office in Migori to Nakuru, and now thriving in Nairobi, MetaHub is a space for digital transformation and financial empowerment across Africa and beyond.</p>
<br>
<p><strong>Location:</strong> Nairobi, Kenya (Serving Africa & Beyond)</p>
<p><strong>Status:</strong> Empowering thousands through digital education</p>
<p><strong>Specialization:</strong> Forex, Crypto Trading, Web3, Digital Business</p>`
    },
    bio: {
        description: 'Short biography',
        output: `<p class="output-name">Quick Bio</p>
<br>
<p>Digital entrepreneur and visionary educator with over a decade of experience in forex, crypto, and Web3. Founder of MetaHub Academy and BullBear Trading, empowering thousands across Africa to achieve financial freedom through honest, practical education.</p>
<br>
<p>From Migori to Nairobi, I've built a movement that transforms lives through digital skills and financial literacy. I don't just teach—I walk the talk.</p>
<br>
<p>"The internet doesn't owe you money—but if you know how to use it, it will never let you go broke again." – Seth Cryptolord</p>`
    },
    skills: {
        description: 'Technical skills',
        output: `<p class="output-name">Technical Skills & Expertise</p>
<br>
<p><strong>Trading & Markets:</strong></p>
<p><span class="file">Forex Trading</span> <span class="file">Crypto Trading</span> <span class="file">Technical Analysis</span> <span class="file">Market Psychology</span> <span class="file">Risk Management</span> <span class="file">Trading Strategies</span></p>
<br>
<p><strong>Blockchain & Web3:</strong></p>
<p><span class="file">Bitcoin</span> <span class="file">Ethereum</span> <span class="file">DeFi</span> <span class="file">NFTs</span> <span class="file">Smart Contracts</span> <span class="file">Web3 Technologies</span> <span class="file">Blockchain Education</span></p>
<br>
<p><strong>Digital Business:</strong></p>
<p><span class="file">Affiliate Marketing</span> <span class="file">Digital Marketing</span> <span class="file">Online Business Models</span> <span class="file">Passive Income Strategies</span> <span class="file">Content Creation</span></p>
<br>
<p><strong>Education & Leadership:</strong></p>
<p><span class="file">Curriculum Development</span> <span class="file">Community Building</span> <span class="file">Mentorship</span> <span class="file">Public Speaking</span> <span class="file">Business Strategy</span></p>`
    },
    experience: {
        description: 'Work experience',
        output: `<p class="output-name">Work Experience</p>
<br>
<p><strong>CEO & Founder</strong> | MetaHub Academy</p>
<p>2017 - Present | Nairobi, Kenya</p>
<p>• Built and scaled a leading digital education platform across Africa</p>
<p>• Trained thousands of students in forex, crypto, and digital business</p>
<p>• Expanded from Migori to Nakuru to Nairobi with thriving offices</p>
<p>• Created comprehensive courses in trading, Web3, and affiliate marketing</p>
<p>• Developed a community of financially empowered entrepreneurs</p>
<br>
<p><strong>Founder</strong> | BullBear Trading</p>
<p>2020 - Present</p>
<p>• Established professional trading education platform</p>
<p>• Provide expert forex and crypto trading strategies</p>
<p>• Mentor traders from beginner to advanced levels</p>
<p>• Focus on practical, real-world trading applications</p>
<br>
<p><strong>Founder</strong> | Forex Cryptomission Academy</p>
<p>2014 - 2017</p>
<p>• Launched first educational initiative in forex trading</p>
<p>• Trained passionate forex students who became top traders</p>
<p>• Built foundation for future educational ventures</p>
<br>
<p><strong>Digital Entrepreneur</strong></p>
<p>2014 - Present</p>
<p>• Over 10 years navigating online business and digital markets</p>
<p>• Built multiple successful ventures in education and trading</p>
<p>• Mastered affiliate marketing and passive income strategies</p>`
    },
    education: {
        description: 'Educational background',
        output: `<p class="output-name">Education & Certifications</p>
<br>
<p><strong>Self-Taught Digital Entrepreneur</strong></p>
<p>2014 - Present</p>
<p>Over a decade of hands-on learning in forex, crypto, and digital business</p>
<br>
<p><strong>Specialized Training:</strong></p>
<p>• Forex Trading & Technical Analysis</p>
<p>• Cryptocurrency Markets & Blockchain Technology</p>
<p>• Digital Marketing & Affiliate Systems</p>
<p>• Web3, DeFi, and NFT Ecosystems</p>
<p>• Business Development & Leadership</p>
<br>
<p><strong>Continuous Learning:</strong></p>
<p>Actively staying ahead of market trends, new technologies, and emerging opportunities in the digital economy. Learning from real wins, losses, and comebacks over 10+ years.</p>`
    },
    projects: {
        description: 'View projects',
        output: `<p class="output-name">Featured Projects & Ventures</p>
<br>
<p><strong>Project 1: MetaHub Academy</strong></p>
<p>Leading digital education platform transforming lives across Africa</p>
<p>Focus: <span class="file">Forex</span> <span class="file">Crypto</span> <span class="file">Web3</span> <span class="file">Digital Business</span></p>
<p>• Comprehensive training in forex and crypto trading</p>
<p>• Real strategies in affiliate marketing and passive income</p>
<p>• Web3, DeFi, and NFT education for the decentralized future</p>
<p>• Expanded from Migori to Nakuru to Nairobi</p>
<p>• Empowered thousands of students to financial freedom</p>
<br>
<p><strong>Project 2: BullBear Trading</strong></p>
<p>Professional trading education and mentorship platform</p>
<p>Focus: <span class="file">Forex</span> <span class="file">Crypto</span> <span class="file">Trading Strategies</span></p>
<p>• Expert-level trading education and analysis</p>
<p>• Market psychology and risk management training</p>
<p>• Real-time trading insights and strategies</p>
<p>• Community of successful traders</p>
<br>
<p><strong>Project 3: Forex Cryptomission Academy</strong></p>
<p>First educational venture that started it all</p>
<p>Focus: <span class="file">Forex Trading</span> <span class="file">Education</span></p>
<p>• Trained passionate forex students from scratch</p>
<p>• Many students became top traders in the industry</p>
<p>• Built foundation for MetaHub Academy</p>
<br>
<p><strong>Project 4: Digital Business Ventures</strong></p>
<p>Multiple successful online business initiatives</p>
<p>Focus: <span class="file">Affiliate Marketing</span> <span class="file">Passive Income</span> <span class="file">Content</span></p>
<p>• Built profitable affiliate marketing systems</p>
<p>• Created passive income streams through digital products</p>
<p>• Developed content across TikTok and YouTube</p>
<p>• Shared real-life lessons from 10+ years of experience</p>`
    },
    trading: {
        description: 'Trading expertise',
        output: `<p class="output-name">Trading Expertise</p>
<br>
<p><strong>Forex Trading:</strong></p>
<p>Over 10 years of experience in forex markets. Expert in technical analysis, market psychology, and risk management. Trained hundreds of successful forex traders through practical, honest education.</p>
<br>
<p><strong>Crypto Trading:</strong></p>
<p>Deep understanding of cryptocurrency markets, Bitcoin, Ethereum, and altcoins. Experience with spot trading, futures, and navigating volatile crypto markets with proven strategies.</p>
<br>
<p><strong>Market Analysis:</strong></p>
<p>Skilled in technical analysis, chart patterns, indicators, and market sentiment. Teach students to read markets and make informed trading decisions based on data, not emotions.</p>
<br>
<p><strong>Risk Management:</strong></p>
<p>Emphasis on protecting capital and sustainable trading. Focus on position sizing, stop losses, and trading psychology to ensure long-term success.</p>
<br>
<p><strong>Real-World Experience:</strong></p>
<p>Not just theory—I've made money trading, faced losses, learned from mistakes, and built a successful trading education business. I walk the talk.</p>`
    },
    services: {
        description: 'Services offered',
        output: `<p class="output-name">Services I Offer</p>
<br>
<p><strong>Forex & Crypto Trading Education</strong></p>
<p>Comprehensive training in forex and cryptocurrency trading with practical strategies, technical analysis, and risk management.</p>
<br>
<p><strong>Digital Business Training</strong></p>
<p>Learn affiliate marketing, passive income strategies, and how to build sustainable online businesses that generate income while you sleep.</p>
<br>
<p><strong>Web3 & Blockchain Education</strong></p>
<p>Understand the decentralized future with training in DeFi, NFTs, blockchain technology, and Web3 opportunities.</p>
<br>
<p><strong>Mentorship & Coaching</strong></p>
<p>One-on-one guidance for aspiring traders and digital entrepreneurs. Learn from real experience, wins, and losses.</p>
<br>
<p><strong>Community Access</strong></p>
<p>Join MetaHub Academy and BullBear Trading communities of like-minded individuals building wealth and financial freedom together.</p>
<br>
<p>Interested? Type 'contact' to get in touch!</p>`
    },
    contact: {
        description: 'Contact information',
        output: `<p class="output-name">Get in Touch</p>
<p>Ready to start your journey to financial freedom? Let's connect.</p>
<br>
<p><strong>Phone:</strong> <a href="tel:+254702000987">+254 702 000 987</a></p>
<p><strong>Email:</strong> <a href="mailto:info@metahub42@gmail.com">info@metahub42@gmail.com</a></p>
<p><strong>Website:</strong> <a href="https://metahubacademy.com" target="_blank">metahubacademy.com</a></p>
<p><strong>TikTok:</strong> <a href="https://tiktok.com/@sethcryptolord" target="_blank">@sethcryptolord</a></p>
<p><strong>YouTube:</strong> <a href="https://youtube.com/@sethcryptolord" target="_blank">Seth Cryptolord</a></p>
<br>
<p><strong>Availability:</strong> Empowering students daily through MetaHub Academy</p>
<p><strong>Response Time:</strong> Usually within 24 hours</p>
<br>
<p>Join thousands building wealth beyond boundaries! 🚀</p>`
    },
    email: {
        description: 'Get email address',
        output: `<p><strong>Email:</strong> <a href="mailto:info@metahub42@gmail.com">info@metahub42@gmail.com</a></p>
<p>Feel free to reach out for training, mentorship, or business inquiries!</p>`
    },
    social: {
        description: 'Social media links',
        output: `<p class="output-name">Connect With Me</p>
<br>
<p><strong>TikTok:</strong> <a href="https://tiktok.com/@sethcryptolord" target="_blank">@sethcryptolord</a></p>
<p>Daily crypto insights, trading tips, and financial education</p>
<br>
<p><strong>YouTube:</strong> <a href="https://youtube.com/@sethcryptolord" target="_blank">Seth Cryptolord</a></p>
<p>In-depth trading tutorials, market analysis, and success stories</p>
<br>
<p><strong>Website:</strong> <a href="https://metahubacademy.com" target="_blank">metahubacademy.com</a></p>
<p>Official MetaHub Academy platform for courses and training</p>
<br>
<p><strong>BullBear Trading:</strong> <a href="https://bullbeartrading.co" target="_blank">bullbeartrading.co</a></p>
<p>Professional trading education and strategies</p>`
    },
    resume: {
        description: 'Download resume',
        output: `<p class="output-name">Resume</p>
<br>
<p>Download my resume to learn more about my experience and ventures:</p>
<br>
<p><a href="/resume.pdf" target="_blank">📄 Download Resume (PDF)</a></p>
<br>
<p>Or visit <a href="https://metahubacademy.com" target="_blank">MetaHub Academy</a> to see my work in action</p>`
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
    
    // MetaHub related
    if (q.includes('metahub') || q.includes('academy')) {
        return `<p>MetaHub Academy is Seth's flagship educational platform:</p>
<p>• Founded in 2017, expanded from Migori to Nakuru to Nairobi</p>
<p>• Trains students in forex, crypto, Web3, and digital business</p>
<p>• Empowers thousands across Africa to achieve financial freedom</p>
<p>• Offers real strategies for passive income and wealth creation</p>
<br>
<p>Visit: <a href="https://metahubacademy.com" target="_blank">metahubacademy.com</a></p>
<br>
<p>Type 'projects' to see all ventures!</p>`;
    }
    
    // Trading related
    if (q.includes('trading') || q.includes('forex') || q.includes('crypto')) {
        return `<p>Seth specializes in:</p>
<p><strong>Forex Trading:</strong> 10+ years experience, technical analysis, risk management</p>
<p><strong>Crypto Trading:</strong> Bitcoin, Ethereum, altcoins, market strategies</p>
<p><strong>Education:</strong> Trained hundreds of successful traders through MetaHub and BullBear Trading</p>
<br>
<p>Type 'trading' for detailed expertise!</p>`;
    }
    
    // Skills related
    if (q.includes('skill') || q.includes('technolog') || q.includes('know')) {
        return `<p>Seth's expertise includes:</p>
<p><strong>Trading:</strong> Forex, Crypto, Technical Analysis, Risk Management</p>
<p><strong>Web3:</strong> Bitcoin, Ethereum, DeFi, NFTs, Blockchain</p>
<p><strong>Business:</strong> Affiliate Marketing, Digital Business, Passive Income</p>
<p><strong>Leadership:</strong> Education, Mentorship, Community Building</p>
<br>
<p>Type 'skills' for the complete list!</p>`;
    }
    
    // Projects related
    if (q.includes('project') || q.includes('work') || q.includes('built')) {
        return `<p>Seth has built impressive ventures:</p>
<p>• MetaHub Academy - Leading digital education platform</p>
<p>• BullBear Trading - Professional trading education</p>
<p>• Forex Cryptomission Academy - First educational venture</p>
<p>• Multiple digital business initiatives</p>
<br>
<p>Type 'projects' to see all projects!</p>`;
    }
    
    // Contact related
    if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('join')) {
        return `<p>You can reach Seth at:</p>
<p>📧 Email: <a href="mailto:info@metahub42@gmail.com">info@metahub42@gmail.com</a></p>
<p>📱 Phone: <a href="tel:+254702000987">+254 702 000 987</a></p>
<p>🌐 Website: <a href="https://metahubacademy.com" target="_blank">metahubacademy.com</a></p>
<p>🎥 TikTok: <a href="https://tiktok.com/@sethcryptolord" target="_blank">@sethcryptolord</a></p>
<br>
<p>Type 'contact' for all contact options!</p>`;
    }
    
    // Experience related
    if (q.includes('experience') || q.includes('background') || q.includes('worked')) {
        return `<p>Seth has extensive experience:</p>
<p>• CEO & Founder of MetaHub Academy (2017-Present)</p>
<p>• Founder of BullBear Trading (2020-Present)</p>
<p>• Founded Forex Cryptomission Academy (2014-2017)</p>
<p>• 10+ years as digital entrepreneur</p>
<br>
<p>Type 'experience' for detailed work history!</p>`;
    }
    
    // Default response
    return `<p>I can help you learn about:</p>
<p>• Seth's trading expertise and ventures</p>
<p>• MetaHub Academy and BullBear Trading</p>
<p>• Skills in forex, crypto, and Web3</p>
<p>• Contact information and services</p>
<br>
<p>Try asking something like "What is MetaHub Academy?" or type 'help' to see all commands.</p>`;
}

// Random quotes
const quotes = [
    "The internet doesn't owe you money—but if you know how to use it, it will never let you go broke again. - Seth Cryptolord",
    "Wealth should not be a secret. It should be taught, practiced, and multiplied. - Seth Cryptolord",
    "The best way to predict the future is to invent it. - Alan Kay",
    "In the world of crypto, knowledge is the ultimate currency. - Anonymous",
    "Financial freedom is available to those who learn about it and work for it. - Robert Kiyosaki",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "Your network is your net worth. - Porter Gale"
];

function executeCommand(input) {
    const cmd = input.toLowerCase().trim();
    
    // Handle password input
    if (waitingForPassword) {
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `<span class="prompt">seth@cryptolord:~$</span> <span class="command">********</span>`;
        terminalHistory.appendChild(commandLine);
        
        if (input === 'sethcryptolord') {
            sudoAuthenticated = true;
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';
            terminalHistory.appendChild(outputDiv);
            typeWriter(outputDiv, `<p style="color: #f7931a;">✓ Authentication successful</p>
<br>
<p><strong>Elevated Privileges Activated</strong></p>
<p>You now have admin access to Seth's portfolio terminal.</p>
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
    commandLine.innerHTML = `<span class="prompt">seth@cryptolord:~$</span> <span class="command">${input}</span>`;
    terminalHistory.appendChild(commandLine);
    
    // Smooth scroll to show the command
    terminalBody.scrollTo({
        top: terminalBody.scrollHeight,
        behavior: 'smooth'
    });
    
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
            typeWriter(outputDiv, `<p style="color: #f7931a;">✓ Already authenticated with sudo privileges</p>`).then(() => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            });
        } else {
            waitingForPassword = true;
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';
            terminalHistory.appendChild(outputDiv);
            typeWriter(outputDiv, `<p>[sudo] password for seth:</p>`).then(() => {
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
    
    // Smooth scroll to bottom after command execution
    setTimeout(() => {
        terminalBody.scrollTo({
            top: terminalBody.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
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

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navRight.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
            navRight.classList.remove('active');
        }
    });
});

// Live date and time
function updateDateTime() {
    const now = new Date();
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    
    const dateElement = document.getElementById('live-date');
    const timeElement = document.getElementById('live-time');
    
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    }
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
    }
}

// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime();

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Profile card 3D effect
const profileCard = document.querySelector('.profile-card');
const profileCardWrapper = document.querySelector('.profile-card-wrapper');

if (profileCard && profileCardWrapper) {
    profileCardWrapper.addEventListener('mousemove', (e) => {
        const rect = profileCardWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileCardWrapper.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'rotateX(0) rotateY(0)';
    });
}

// Card tag drag effect
const cardTag = document.querySelector('.card-tag');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

if (cardTag) {
    cardTag.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    cardTag.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);
}

function dragStart(e) {
    if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    
    if (e.target === cardTag) {
        isDragging = true;
        cardTag.style.cursor = 'grabbing';
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        
        xOffset = currentX;
        yOffset = currentY;
        
        setTranslate(currentX, currentY, cardTag);
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    if (cardTag) {
        cardTag.style.cursor = 'grab';
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(calc(-50% + ${xPos}px), ${yPos}px)`;
}

// Initialize terminal with welcome message
window.addEventListener('load', () => {
    terminalInput.focus();
});
