import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 1,
  host: process.env.DATABASE_URL?.split('@')[1]?.split(':')[0] || 'localhost',
  user: process.env.DATABASE_URL?.split('//')[1]?.split(':')[0] || 'root',
  password: process.env.DATABASE_URL?.split(':')[2]?.split('@')[0] || '',
  database: process.env.DATABASE_URL?.split('/')[3]?.split('?')[0] || 'micap',
  ssl: {},
  waitForConnections: true,
  enableKeepAlive: true,
});

const blogPosts = [
  {
    slug: 'ai-readiness-assessment',
    title: 'Conducting an AI Readiness Assessment for Your Organization',
    excerpt: 'A comprehensive guide to evaluating your organization\'s readiness for AI implementation.',
    content: `# AI Readiness Assessment Guide

## Introduction
Before embarking on any AI initiative, it's crucial to understand where your organization stands. This guide walks you through the key areas to evaluate.

## Key Assessment Areas

### 1. Data Infrastructure
- Data quality and governance
- Integration capabilities
- Data security and compliance
- Historical data availability

### 2. Technical Capabilities
- Current technology stack
- Cloud readiness
- API infrastructure
- DevOps maturity

### 3. Organizational Readiness
- Team skills and training
- Change management capacity
- Executive sponsorship
- Budget allocation

### 4. Business Alignment
- Clear use cases identified
- ROI expectations
- Competitive advantage potential
- Stakeholder buy-in

## Next Steps
Once you've assessed these areas, you'll have a clear roadmap for your AI transformation journey.`,
    category: 'ai',
    publishedAt: new Date('2026-03-15'),
  },
  {
    slug: 'digital-transformation-trends-2026',
    title: 'Digital Transformation Trends to Watch in 2026',
    excerpt: 'Emerging technologies and strategies reshaping enterprise digital transformation.',
    content: `# Digital Transformation Trends 2026

## The Convergence of AI and Automation
The line between AI and traditional automation continues to blur. Organizations are seeing unprecedented efficiency gains by combining these technologies.

## Edge Computing Adoption
Moving computation closer to data sources is becoming standard practice for latency-sensitive applications.

## Zero-Trust Security
With distributed workforces and cloud-first architectures, zero-trust security models are now essential rather than optional.

## Sustainable Tech Practices
Organizations are increasingly considering the environmental impact of their technology choices.

## The Future is Now
These trends aren't coming—they're already here. The question is how quickly your organization can adapt.`,
    category: 'consulting',
    publishedAt: new Date('2026-03-10'),
  },
  {
    slug: 'chatbot-swarms-enterprise-scale',
    title: 'Deploying Chatbot Swarms at Enterprise Scale',
    excerpt: 'Best practices for implementing multiple AI agents across your organization.',
    content: `# Enterprise Chatbot Swarm Deployment

## What is a Chatbot Swarm?
A chatbot swarm is a coordinated network of AI agents, each specialized for specific tasks or departments, working together to provide comprehensive support.

## Architecture Considerations
- Agent specialization
- Inter-agent communication
- Centralized knowledge management
- Fallback mechanisms

## Implementation Phases
1. Pilot with 2-3 agents
2. Expand to 5-10 agents
3. Scale to 20+ agents
4. Optimize based on usage patterns

## ROI Metrics
- Response time improvements
- Customer satisfaction scores
- Cost per interaction
- Agent utilization rates

## Success Factors
- Clear agent responsibilities
- Continuous training data
- Monitoring and optimization
- User feedback loops`,
    category: 'chatbots',
    publishedAt: new Date('2026-03-05'),
  },
];

const caseStudies = [
  {
    slug: 'fintech-ai-integration',
    clientName: 'TechFinance Corp',
    industry: 'Financial Services',
    challenge: 'Manual loan processing was taking 5-7 days and had high error rates. The team needed to accelerate approval times while maintaining compliance.',
    solution: 'Implemented an AI-powered document analysis system integrated with their existing loan management platform. The system automatically extracts key information, performs compliance checks, and flags exceptions for human review.',
    results: 'Reduced processing time from 5-7 days to 24 hours. Error rates dropped by 87%. Increased loan approval capacity by 300% without hiring additional staff.',
    metrics: `- **Processing Time**: 5-7 days → 24 hours (85% reduction)
- **Error Rate**: Reduced by 87%
- **Capacity Increase**: 300% without additional headcount
- **Compliance Score**: 99.2%
- **ROI**: Achieved in 6 months`,
    testimonial: 'Micap AI transformed our entire loan processing workflow. The implementation was smooth, and the results exceeded our expectations.',
    testimonialAuthor: 'Sarah Chen',
    testimonialTitle: 'VP of Operations, TechFinance Corp',
    featured: 1,
  },
  {
    slug: 'retail-customer-service-chatbots',
    clientName: 'RetailMax Solutions',
    industry: 'Retail & E-commerce',
    challenge: 'Customer service team was overwhelmed with repetitive inquiries. Response times were slow, and customer satisfaction scores were declining.',
    solution: 'Deployed a swarm of 8 specialized chatbots handling different customer service categories: order tracking, returns, product recommendations, billing, and account management.',
    results: 'Handled 70% of customer inquiries without human intervention. Average response time dropped from 4 hours to 2 minutes. Customer satisfaction increased from 72% to 89%.',
    metrics: `- **Inquiry Automation**: 70% handled by AI
- **Response Time**: 4 hours → 2 minutes
- **Customer Satisfaction**: 72% → 89%
- **Cost Reduction**: 45% decrease in support costs
- **Agent Productivity**: Increased by 60%`,
    testimonial: 'The chatbot swarm implementation has been a game-changer for our customer service operations. Our team now focuses on complex issues while AI handles the routine work.',
    testimonialAuthor: 'Michael Rodriguez',
    testimonialTitle: 'Director of Customer Experience, RetailMax Solutions',
    featured: 1,
  },
  {
    slug: 'manufacturing-digital-transformation',
    clientName: 'IndustrialTech Manufacturing',
    industry: 'Manufacturing',
    challenge: 'Legacy systems prevented real-time visibility into production. Downtime incidents were frequent and costly. Supply chain coordination was manual and error-prone.',
    solution: 'Comprehensive digital transformation including IoT sensor integration, AI-powered predictive maintenance, and automated supply chain optimization.',
    results: 'Reduced unplanned downtime by 65%. Predictive maintenance prevented $2.3M in potential equipment failures. Supply chain efficiency improved by 40%.',
    metrics: `- **Unplanned Downtime**: Reduced by 65%
- **Equipment Failures Prevented**: $2.3M in avoided costs
- **Supply Chain Efficiency**: 40% improvement
- **Production Throughput**: Increased by 28%
- **Maintenance Costs**: Reduced by 35%`,
    testimonial: 'The digital transformation has positioned us as an industry leader in operational efficiency. The ROI has been substantial.',
    testimonialAuthor: 'James Patterson',
    testimonialTitle: 'Chief Operations Officer, IndustrialTech Manufacturing',
    featured: 1,
  },
  {
    slug: 'healthcare-data-analytics',
    clientName: 'HealthCare Innovations',
    industry: 'Healthcare',
    challenge: 'Patient data was siloed across multiple systems. Clinical decision support was manual. Reporting took weeks instead of days.',
    solution: 'Built a unified data platform with AI-powered analytics for patient insights, clinical decision support, and real-time reporting dashboards.',
    results: 'Improved patient outcomes by 22%. Reduced report generation time from 3 weeks to 2 days. Enabled data-driven clinical decisions.',
    metrics: `- **Patient Outcomes**: 22% improvement
- **Report Generation**: 3 weeks → 2 days
- **Data Accessibility**: 95% of clinicians using platform
- **Decision Support Adoption**: 87%
- **Operational Efficiency**: 33% improvement`,
    testimonial: 'This platform has transformed how we approach patient care. The insights are invaluable for our clinical teams.',
    testimonialAuthor: 'Dr. Lisa Thompson',
    testimonialTitle: 'Chief Medical Officer, HealthCare Innovations',
    featured: 0,
  },
];

async function seedDatabase() {
  const connection = await pool.getConnection();

  try {
    console.log('Seeding database...');

    // Clear existing data
    await connection.query('DELETE FROM blogPosts');
    await connection.query('DELETE FROM caseStudies');

    // Insert blog posts
    for (const post of blogPosts) {
      await connection.query(
        'INSERT INTO blogPosts (slug, title, excerpt, content, author, category, publishedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [post.slug, post.title, post.excerpt, post.content, 'Micap AI', post.category, post.publishedAt]
      );
    }
    console.log(`✓ Inserted ${blogPosts.length} blog posts`);

    // Insert case studies
    for (const cs of caseStudies) {
      await connection.query(
        'INSERT INTO caseStudies (slug, clientName, industry, challenge, solution, results, metrics, testimonial, testimonialAuthor, testimonialTitle, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cs.slug, cs.clientName, cs.industry, cs.challenge, cs.solution, cs.results, cs.metrics, cs.testimonial, cs.testimonialAuthor, cs.testimonialTitle, cs.featured]
      );
    }
    console.log(`✓ Inserted ${caseStudies.length} case studies`);

    console.log('✓ Database seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await connection.release();
    await pool.end();
  }
}

seedDatabase();
