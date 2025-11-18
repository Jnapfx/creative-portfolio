# Building a Professional GitHub Pages Portfolio: Complete Tutorial

This tutorial will guide you through creating a professional cybersecurity portfolio website using GitHub Pages and Jekyll. By following these steps, you'll build a complete portfolio showcasing your skills, projects, and experience.

## 📋 Prerequisites

- GitHub account
- Basic knowledge of Markdown
- Text editor (VS Code, Sublime Text, etc.)
- Git installed on your computer

## 🎯 What You'll Build

A professional portfolio website featuring:
- Professional home page with headshot and introduction
- Comprehensive about page with skills and education
- Project showcase with detailed descriptions
- Complete resume section
- Contact page with professional styling
- Mobile-responsive design
- Custom branding with organization logo

## 📁 Step 1: Repository Setup

### 1.1 Create Repository Structure

Create a new repository on GitHub and set up the following directory structure:

```
your-repo/
└── docs/
    ├── _config.yml
    ├── _data/
    │   └── navigation.yml
    ├── _includes/
    │   ├── footer-note.html
    │   └── head/
    │       └── custom.html
    ├── assets/
    │   ├── css/
    │   │   └── main.scss
    │   └── img/
    │       ├── your-headshot.jpg
    │       └── organization-logo.jpg
    ├── index.md
    ├── about.md
    ├── projects.md
    ├── resume.md
    ├── contact.md
    └── 404.md
```

## ⚙️ Step 2: Jekyll Configuration

### 2.1 Create `_config.yml`

Set up your Jekyll configuration file:

```yaml
# Site settings
title: Your Name
email: your.email@example.com
description: "Cybersecurity Professional | Backend Developer | Security Enthusiast"
baseurl: "/your-repo"
url: "https://yourusername.github.io"

# Theme
remote_theme: "mmistakes/minimal-mistakes"
minimal_mistakes_skin: "default"

# Author
author:
  name: "Your Name"
  avatar: "/assets/img/your-headshot.jpg"
  bio: "Cybersecurity Professional passionate about secure systems and automation."
  location: "Your Location"
  email: "your.email@example.com"
  links:
    - label: "LinkedIn"
      icon: "fab fa-fw fa-linkedin"
      url: "https://linkedin.com/in/yourprofile"
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: "https://github.com/yourusername"

# Plugins
plugins:
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-gist
  - jekyll-feed
  - jekyll-include-cache

# Navigation
header:
  overlay_color: "#000"
  overlay_filter: "0.5"

# Pagination
paginate: 5
paginate_path: /page:num/

# Markdown
markdown: kramdown
highlighter: rouge

# Sass/SCSS
sass:
  sass_dir: _sass
  style: compressed
```

### 2.2 Create Navigation (`_data/navigation.yml`)

```yaml
main:
  - title: "Home"
    url: /
  - title: "About"
    url: /about/
  - title: "Projects"
    url: /projects/
  - title: "Resume"
    url: /resume/
  - title: "Contact"
    url: /contact/
```

## 🎨 Step 3: Custom Styling

### 3.1 Create `assets/css/main.scss`

```scss
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@charset "utf-8";

@import "minimal-mistakes/skins/{{ site.minimal_mistakes_skin | default: 'default' }}";
@import "minimal-mistakes";
@import "custom";
```

### 3.2 Create Custom CSS (`_sass/custom.scss`)

Add comprehensive styling for your portfolio:

```scss
/* Professional Portfolio Styling */

/* Rounded Images */
.rounded-image {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin: 0 auto;
  display: block;
}

/* Professional Header */
.professional-header {
  text-align: center;
  padding: 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 2rem;
  border-radius: 10px;
}

/* Project Cards */
.project-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Skills and Certifications */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.skill-category {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

/* Contact Cards */
.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.contact-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-3px);
}

/* Enhanced Footer */
.enhanced-footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer-logo {
  width: 60px;
  height: auto;
  margin: 0 10px;
  vertical-align: middle;
}

/* Responsive Design */
@media (max-width: 768px) {
  .rounded-image {
    width: 150px;
    height: 150px;
  }
  
  .professional-header {
    padding: 1rem;
  }
  
  .contact-cards {
    grid-template-columns: 1fr;
  }
}
```

## 📄 Step 4: Create Content Pages

### 4.1 Home Page (`index.md`)

```markdown
---
layout: single
title: "Your Name"
permalink: /
author_profile: true
---

<div class="professional-header">
  <img src="/assets/img/your-headshot.jpg" alt="Your Name" class="rounded-image">
  <h1>Welcome to My Portfolio</h1>
  <p class="lead">Cybersecurity Professional | Backend Developer | Security Enthusiast</p>
</div>

## About Me

I'm a passionate cybersecurity professional with expertise in security operations, backend development, and automation. Currently pursuing my degree while gaining hands-on experience in the field.

### Focus Areas

- **Security Operations**: Threat detection, incident response, and security monitoring
- **Backend Development**: API design, database management, and system architecture
- **Automation**: Security tooling, CI/CD pipelines, and infrastructure as code
- **Documentation**: Technical writing, process documentation, and knowledge sharing

---

<div class="enhanced-footer">
  <p>Proudly associated with <img src="/assets/img/organization-logo.jpg" alt="Organization" class="footer-logo"></p>
</div>
```

### 4.2 About Page (`about.md`)

```markdown
---
layout: single
title: "About Me"
permalink: /about/
author_profile: true
---

<div class="professional-header">
  <img src="/assets/img/your-headshot.jpg" alt="Your Name" class="rounded-image">
  <h1>About Me</h1>
</div>

## Professional Journey

I'm a dedicated cybersecurity professional with a passion for protecting digital assets and building secure systems. My journey in technology began with a fascination for understanding how systems work and how to make them more secure.

### Core Interests

<div class="skills-grid">
  <div class="skill-category">
    <h3>🛡️ Threat Modeling</h3>
    <p>Identifying and analyzing potential security threats to design robust defense strategies.</p>
  </div>
  
  <div class="skill-category">
    <h3>🚨 Incident Response</h3>
    <p>Rapid response to security incidents with systematic investigation and remediation.</p>
  </div>
  
  <div class="skill-category">
    <h3>🔐 API Security</h3>
    <p>Securing application programming interfaces against common vulnerabilities and attacks.</p>
  </div>
</div>

## Technical Skills

### Programming Languages
- **Python**: Security scripting, automation, data analysis
- **JavaScript**: Web development, API integration
- **SQL**: Database queries, security analysis
- **Bash**: System administration, automation scripts

### Cloud & Infrastructure
- **AWS**: EC2, S3, IAM, CloudTrail, Security Groups
- **Docker**: Containerization, security scanning
- **Linux**: System administration, security hardening

### Security Tools
- **SIEM**: Splunk, ELK Stack
- **Vulnerability Scanning**: Nessus, OpenVAS
- **Network Security**: Wireshark, Nmap
- **Code Analysis**: SonarQube, Bandit

## Education

**Bachelor of Science in Cybersecurity**  
*Your University* | Expected Graduation: Year

**Relevant Coursework:**
- Network Security and Cryptography
- Ethical Hacking and Penetration Testing
- Digital Forensics and Incident Response
- Secure Software Development
- Risk Management and Compliance

---

<div class="enhanced-footer">
  <p>Proudly associated with <img src="/assets/img/organization-logo.jpg" alt="Organization" class="footer-logo"></p>
</div>
```

### 4.3 Projects Page (`projects.md`)

```markdown
---
layout: single
title: "Featured Projects"
permalink: /projects/
author_profile: true
---

# Featured Projects

Here are some of my key projects that demonstrate my skills in cybersecurity, backend development, and automation.

<div class="project-card">
  <h2>🔒 Secure File Storage System</h2>
  
  **Tech Stack:** Python, Flask, SQLite, AES Encryption  
  **Duration:** 3 months | **Status:** Completed
  
  ### Key Features
  - End-to-end encryption for file storage
  - User authentication and authorization
  - Audit logging for all file operations
  - RESTful API with comprehensive documentation
  
  ### Security Highlights
  - AES-256 encryption for data at rest
  - JWT-based authentication
  - Input validation and sanitization
  - Rate limiting and brute force protection
  
  ### Impact
  Developed a secure file storage solution that could handle sensitive documents with enterprise-grade security measures.
</div>

<div class="project-card">
  <h2>🤖 SOC Automation Toolkit</h2>
  
  **Tech Stack:** Python, Splunk API, MISP, Docker  
  **Duration:** 4 months | **Status:** In Progress
  
  ### Key Features
  - Automated threat intelligence gathering
  - Incident response playbook automation
  - Integration with multiple security tools
  - Custom dashboard for SOC analysts
  
  ### Security Highlights
  - Automated IOC enrichment
  - False positive reduction algorithms
  - Secure API communications
  - Comprehensive logging and monitoring
  
  ### Impact
  Reduced manual SOC tasks by 60% and improved incident response time from hours to minutes.
</div>

<div class="project-card">
  <h2>🔍 API Security Scanner</h2>
  
  **Tech Stack:** Python, OWASP ZAP, Burp Suite API  
  **Duration:** 2 months | **Status:** Completed
  
  ### Key Features
  - Automated API vulnerability scanning
  - OWASP API Top 10 compliance checking
  - Custom security test cases
  - Detailed reporting with remediation guidance
  
  ### Security Highlights
  - Authentication bypass detection
  - Injection vulnerability testing
  - Rate limiting verification
  - Data exposure analysis
  
  ### Impact
  Identified critical vulnerabilities in 15+ APIs, leading to improved security posture across multiple applications.
</div>

---

## Want to Collaborate?

I'm always interested in working on innovative cybersecurity projects. Feel free to [reach out](/contact/) if you'd like to discuss potential collaborations!

<div class="enhanced-footer">
  <p>Proudly associated with <img src="/assets/img/organization-logo.jpg" alt="Organization" class="footer-logo"></p>
</div>
```

### 4.4 Resume Page (`resume.md`)

```markdown
---
layout: single
title: "Resume"
permalink: /resume/
author_profile: true
---

<div class="professional-header">
  <h1>Your Name</h1>
  <p>📧 your.email@example.com | 📱 (555) 123-4567 | 📍 Your City, State</p>
  <p>🔗 <a href="https://linkedin.com/in/yourprofile" style="color: white;">LinkedIn</a> | 💻 <a href="https://github.com/yourusername" style="color: white;">GitHub</a></p>
</div>

## Education

**Bachelor of Science in Cybersecurity**  
*Your University* | Expected Graduation: Year | GPA: X.X/4.0

**Relevant Coursework:**
- Network Security and Cryptography
- Ethical Hacking and Penetration Testing
- Digital Forensics and Incident Response
- Secure Software Development
- Risk Management and Compliance

## Experience

### Security Analyst Intern
**Company Name** | *Month Year - Present*

- Monitored security events using SIEM tools (Splunk) and investigated potential threats
- Assisted in incident response activities and documented findings in detailed reports
- Conducted vulnerability assessments on internal systems and applications
- Developed Python scripts to automate routine security tasks, improving efficiency by 40%
- Collaborated with cross-functional teams to implement security best practices

### Backend Developer
**Previous Company** | *Month Year - Month Year*

- Designed and implemented RESTful APIs using Python Flask framework
- Integrated security measures including authentication, authorization, and input validation
- Optimized database queries and improved application performance by 25%
- Implemented automated testing and CI/CD pipelines using GitHub Actions
- Collaborated with frontend developers to ensure seamless API integration

## Technical Skills

<div class="skills-grid">
  <div class="skill-category">
    <h3>Programming Languages</h3>
    <ul>
      <li>Python (Advanced)</li>
      <li>JavaScript (Intermediate)</li>
      <li>SQL (Intermediate)</li>
      <li>Bash (Intermediate)</li>
    </ul>
  </div>
  
  <div class="skill-category">
    <h3>Security Tools</h3>
    <ul>
      <li>Splunk, ELK Stack</li>
      <li>Nessus, OpenVAS</li>
      <li>Wireshark, Nmap</li>
      <li>Burp Suite, OWASP ZAP</li>
    </ul>
  </div>
  
  <div class="skill-category">
    <h3>Cloud & Infrastructure</h3>
    <ul>
      <li>AWS (EC2, S3, IAM)</li>
      <li>Docker, Kubernetes</li>
      <li>Linux Administration</li>
      <li>Git, GitHub Actions</li>
    </ul>
  </div>
  
  <div class="skill-category">
    <h3>DevSecOps</h3>
    <ul>
      <li>CI/CD Pipelines</li>
      <li>Infrastructure as Code</li>
      <li>Security Automation</li>
      <li>Container Security</li>
    </ul>
  </div>
</div>

## Certifications

- **CompTIA Security+** | *In Progress*
- **AWS Cloud Practitioner** | *Planned*
- **Certified Ethical Hacker (CEH)** | *Planned*

## Key Projects

### Secure File Storage System
*Individual Project | 3 months*
- Developed a secure file storage application with end-to-end encryption
- Implemented user authentication, authorization, and comprehensive audit logging
- **Technologies:** Python, Flask, SQLite, AES Encryption

### SOC Automation Toolkit
*Team Project | 4 months*
- Created automation tools for Security Operations Center workflows
- Reduced manual tasks by 60% and improved incident response time
- **Technologies:** Python, Splunk API, MISP, Docker

### API Security Scanner
*Individual Project | 2 months*
- Built automated API vulnerability scanner focusing on OWASP API Top 10
- Identified critical vulnerabilities across 15+ applications
- **Technologies:** Python, OWASP ZAP, Burp Suite API

## Professional Interests

- **Threat Intelligence**: Staying updated on emerging threats and attack vectors
- **Secure Development**: Integrating security into the software development lifecycle
- **Cloud Security**: Exploring security challenges and solutions in cloud environments
- **Automation**: Developing tools to streamline security operations and reduce manual effort

---

*"Security is not a product, but a process. It's about building systems that can adapt and respond to evolving threats."*

<div class="enhanced-footer">
  <p>Proudly associated with <img src="/assets/img/organization-logo.jpg" alt="Organization" class="footer-logo"></p>
</div>
```

### 4.5 Contact Page (`contact.md`)

```markdown
---
layout: single
title: "Contact"
permalink: /contact/
author_profile: true
---

<div class="professional-header">
  <img src="/assets/img/your-headshot.jpg" alt="Your Name" class="rounded-image">
  <h1>Let's Connect</h1>
  <p>I'm always interested in discussing cybersecurity, technology, and potential opportunities.</p>
</div>

<div class="contact-cards">
  <div class="contact-card">
    <h3>📧 Email</h3>
    <p><strong>your.email@example.com</strong></p>
    <p>Best for: Professional inquiries, collaboration opportunities, and detailed discussions.</p>
    <p><em>Response time: Within 24 hours</em></p>
  </div>
  
  <div class="contact-card">
    <h3>💼 LinkedIn</h3>
    <p><strong><a href="https://linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a></strong></p>
    <p>Best for: Professional networking, career opportunities, and industry connections.</p>
    <p><em>Let's connect and grow our professional network!</em></p>
  </div>
  
  <div class="contact-card">
    <h3>💻 GitHub</h3>
    <p><strong><a href="https://github.com/yourusername">github.com/yourusername</a></strong></p>
    <p>Best for: Code collaboration, project discussions, and technical contributions.</p>
    <p><em>Check out my repositories and feel free to contribute!</em></p>
  </div>
</div>

## Security Engineering Opportunities

I'm actively seeking opportunities in:

- **Security Operations Center (SOC) Analyst** positions
- **Application Security** roles focusing on secure development
- **Cloud Security** positions with AWS/Azure focus
- **DevSecOps** roles integrating security into CI/CD pipelines
- **Cybersecurity Consulting** opportunities

## Let's Discuss

I'm passionate about discussing:

- 🛡️ **Cybersecurity**: Latest threats, defense strategies, and security frameworks
- 💻 **Backend Development**: API design, database security, and system architecture
- ☁️ **Cloud Security**: AWS security best practices and cloud-native security solutions
- 🤖 **Automation**: Security tooling, scripting, and process optimization
- 📚 **Learning**: Certifications, training programs, and skill development

---

## Ready to Connect?

Whether you're looking to collaborate on a project, discuss cybersecurity trends, or explore potential opportunities, I'd love to hear from you. Feel free to reach out through any of the channels above!

<div class="enhanced-footer">
  <p>Proudly associated with <img src="/assets/img/organization-logo.jpg" alt="Organization" class="footer-logo"></p>
</div>
```

## 🖼️ Step 5: Add Images

### 5.1 Required Images

Add these images to `assets/img/`:

1. **your-headshot.jpg**: Professional headshot photo
   - Recommended size: 400x400 pixels
   - Format: JPG or PNG
   - Professional appearance

2. **organization-logo.jpg**: Your organization/school logo
   - Recommended size: 200x100 pixels
   - Format: JPG or PNG
   - Transparent background preferred

## 🔧 Step 6: Additional Files

### 6.1 Custom Footer (`_includes/footer-note.html`)

```html
<div class="page__footer-copyright">
  © 2025 Your Name. All rights reserved. | 
  Built with ♥ using Jekyll and GitHub Pages
  <img src="{{ '/assets/img/organization-logo.jpg' | relative_url }}" alt="Organization" class="footer-logo">
</div>
```

### 6.2 Custom Head (`_includes/head/custom.html`)

```html
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 6.3 404 Page (`404.md`)

```markdown
---
layout: single
title: "Page Not Found"
permalink: /404.html
---

# 404 - Page Not Found

Sorry, the page you're looking for doesn't exist.

[← Back to Home](/)
```

## 🚀 Step 7: GitHub Pages Deployment

### 7.1 Repository Setup

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Ensure the `docs` folder contains all your content

### 7.2 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch**: `main` (or `master`)
   - **Folder**: `/docs`
5. Click **Save**

### 7.3 Update Configuration

Update your `_config.yml` with correct URLs:

```yaml
baseurl: "/your-actual-repo-name"
url: "https://yourusername.github.io"
```

## ✅ Step 8: Testing and Validation

### 8.1 Local Testing (Optional)

If you want to test locally:

1. Install Ruby and Jekyll
2. Run `bundle install` (if you have a Gemfile)
3. Run `bundle exec jekyll serve`
4. Visit `http://localhost:4000`

### 8.2 Live Site Validation

1. Wait 5-10 minutes after enabling GitHub Pages
2. Visit your site at `https://yourusername.github.io/your-repo-name`
3. Test all navigation links
4. Verify images load correctly
5. Check mobile responsiveness

## 🎨 Step 9: Customization Tips

### 9.1 Color Scheme

Customize colors in your CSS:

```scss
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --info-color: #17a2b8;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
}
```

### 9.2 Typography

Add custom fonts:

```scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

### 9.3 Additional Features

- Add Google Analytics
- Include social media links
- Add a blog section
- Implement contact forms
- Add project galleries

## 🔍 Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and ensure images are in `assets/img/`
2. **CSS not applying**: Verify `main.scss` imports and file structure
3. **Navigation not working**: Check `navigation.yml` and permalink settings
4. **Site not building**: Check Jekyll build logs in GitHub Actions tab

### Build Errors

- Ensure all YAML front matter is properly formatted
- Check for special characters in file names
- Verify all required files are present
- Review GitHub Pages build logs

## 📚 Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Minimal Mistakes Theme](https://mmistakes.github.io/minimal-mistakes/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)

## 🎯 Next Steps

After completing this tutorial:

1. **Customize Content**: Replace placeholder content with your actual information
2. **Add Projects**: Include your real projects with screenshots and demos
3. **Optimize SEO**: Add meta descriptions and keywords
4. **Monitor Analytics**: Set up Google Analytics to track visitors
5. **Regular Updates**: Keep your portfolio current with new projects and skills

---

**Congratulations!** 🎉 You've successfully built a professional GitHub Pages portfolio. Your site should now be live and showcasing your cybersecurity expertise to potential employers and collaborators.

Remember to regularly update your content and keep your skills section current as you grow in your cybersecurity career!