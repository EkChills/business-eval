import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BusinessStageResults = ({ overallBScore }:{overallBScore: number}) => {
  // Determine which stage the business is in based on score
  const getBusinessStage = () => {
    if (overallBScore <= 30) return "startup";
    if (overallBScore <= 45) return "survival";
    if (overallBScore <= 60) return "growth";
    if (overallBScore <= 75) return "expansion";
    return "maturity";
  };

  const stage = getBusinessStage();

  // Content configuration based on business stage
  const stageContent: any = {
    startup: {
      title: "Startup Stage",
      icon: "🚀",
      scoreRange: "18–30 points",
      description: "Your business is in its early stages, focusing on basic setup and survival.",
      keyAreas: [
        { title: "Validate Your Idea", content: "Get real-world feedback, conduct market research, and confirm demand." },
        { title: "Build a Minimum Viable Product (MVP)", content: "Start with a basic version, collect feedback, and iterate." },
        { title: "Prioritize Cash Flow", content: "Track expenses, create realistic budgets, and minimize unnecessary spending." },
        { title: "Build a Strong Network", content: "Connect with mentors, industry professionals, and like-minded entrepreneurs." },
        { title: "Embrace Flexibility & Adaptability", content: "Be open to changes based on market needs and lessons from failures." },
        { title: "Focus on Your Customers", content: "Provide excellent service and continuously gather feedback for improvement." },
        { title: "Legal & Administrative Essentials", content: "Obtain necessary licenses, protect intellectual property, and choose the right business structure." },
        { title: "Team Building", content: "Surround yourself with a skilled and adaptable team to drive success." }
      ],
      reminders: [
        { title: "Persistence is key", content: "Success takes time. Stay committed." },
        { title: "Stay focused", content: "Avoid distractions and stick to your core goals." },
        { title: "Take care of yourself", content: "Entrepreneurship is demanding—balance is crucial." }
      ],
      color: "blue"
    },
    survival: {
      title: "Survival Stage",
      icon: "🔄",
      scoreRange: "31–45 points",
      description: "Your business is operating but still struggling to stabilize profitability and operations.",
      sections: [
        {
          title: "Cash Flow Management",
          icon: "💰",
          items: [
            { title: "Aggressive Cash Collection", content: "Shorten payment terms, chase invoices, offer early-payment incentives." },
            { title: "Strict Expense Control", content: "Cut unnecessary spending, renegotiate contracts, implement zero-based budgeting." },
            { title: "Cash Flow Forecasting", content: "Create short-term cash flow projections and plan for potential shortfalls." }
          ]
        },
        {
          title: "Revenue Generation",
          icon: "📈",
          items: [
            { title: "Focus on Core Products/Services", content: "Prioritize your most profitable offerings." },
            { title: "Customer Retention", content: "Keep customers happy with personalized service and prompt issue resolution." },
            { title: "Quick Wins", content: "Identify immediate revenue opportunities through promotions or discounts." },
            { title: "Explore New Revenue Streams", content: "Look for quick-to-implement additional income sources." }
          ]
        },
        {
          title: "Operational Efficiency",
          icon: "⚙️",
          items: [
            { title: "Streamline Processes", content: "Eliminate bottlenecks and automate repetitive tasks." },
            { title: "Inventory Management", content: "Reduce excess stock to cut holding costs." },
            { title: "Negotiate with Suppliers", content: "Seek better terms, discounts, or alternative vendors." }
          ]
        },
        {
          title: "Strategic Adjustments",
          icon: "🔄",
          items: [
            { title: "Adapt to Market Changes", content: "Monitor trends and adjust your business strategy." },
            { title: "Focus on Core Competencies", content: "Concentrate on strengths and outsource non-essential tasks." },
            { title: "Strategic Partnerships", content: "Collaborate with complementary businesses to share resources." }
          ]
        },
        {
          title: "Leadership and Communication",
          icon: "🗣️",
          items: [
            { title: "Transparent Communication", content: "Keep employees, customers, and suppliers informed." },
            { title: "Strong Leadership", content: "Provide clear direction and foster a positive work environment." },
            { title: "Employee Engagement", content: "Involve employees in survival strategies and leverage their insights." }
          ]
        }
      ],
      mindset: [
        { title: "Resourcefulness", content: "Find creative solutions to overcome challenges." },
        { title: "Resilience", content: "Recover quickly from setbacks and keep pushing forward." },
        { title: "Focus", content: "Stay concentrated on the most pressing issues at hand." }
      ],
      color: "indigo"
    },
    growth: {
      title: "Growth Stage",
      icon: "📈",
      scoreRange: "46–60 points",
      description: "This is an exciting yet challenging phase where your business is seeing consistent growth.",
      sections: [
        {
          title: "Strategic Planning & Scalability",
          icon: "📌",
          items: [
            { title: "Formalize Processes", content: "Standardize key operations for consistency and efficiency." },
            { title: "Invest in Infrastructure", content: "Upgrade technology and systems to support scaling." },
            { title: "Develop a Long-Term Vision", content: "Create a strategic growth plan and review it regularly." },
            { title: "Build a Scalable Team", content: "Hire skilled professionals, train employees, and foster a strong company culture." }
          ]
        },
        {
          title: "Market Expansion & Customer Acquisition",
          icon: "🌍",
          items: [
            { title: "Expand Your Market Reach", content: "Explore new customer segments and geographic locations." },
            { title: "Refine Your Marketing Strategy", content: "Use data-driven campaigns and build brand recognition." },
            { title: "Focus on Customer Retention", content: "Implement loyalty programs and gather feedback for improvements." }
          ]
        },
        {
          title: "Financial Management & Funding",
          icon: "💰",
          items: [
            { title: "Improve Financial Forecasting", content: "Develop accurate projections for future needs." },
            { title: "Manage Cash Flow Effectively", content: "Ensure a steady cash flow and negotiate favorable terms." },
            { title: "Explore Funding Options", content: "Consider venture capital, angel investors, or business loans." },
            { title: "Invest in Financial Management", content: "Hire finance experts as operations become more complex." }
          ]
        },
        {
          title: "Leadership & Culture",
          icon: "🎯",
          items: [
            { title: "Delegate Effectively", content: "Empower employees and focus on strategic decision-making." },
            { title: "Foster a Culture of Innovation", content: "Encourage experimentation and continuous improvement." },
            { title: "Maintain Strong Communication", content: "Keep employees engaged and aligned with business goals." },
            { title: "Adapt Leadership Style", content: "Adjust management approaches as the company scales." }
          ]
        }
      ],
      considerations: [
        { title: "Manage Growth Carefully", content: "Ensure sustainable scaling without overwhelming resources." },
        { title: "Embrace Change", content: "Be flexible and adjust strategies as the business evolves." },
        { title: "Maintain Quality", content: "Never compromise on product or service excellence." },
        { title: "Data-Driven Decisions", content: "Use analytics to guide business decisions and optimize growth." }
      ],
      color: "purple"
    },
    expansion: {
      title: "Expansion Stage",
      icon: "🚀",
      scoreRange: "61–75 points",
      description: "This is an exciting phase where businesses scale significantly, enter new markets, and explore strategic partnerships.",
      sections: [
        {
          title: "Strategic Market Penetration & Diversification",
          items: [
            { title: "Market Research & Analysis", content: "Conduct in-depth research to understand new markets and competitors." },
            { title: "Diversification Strategy", content: "Expand product offerings and explore new partnerships." },
            { title: "International Expansion", content: "Research local regulations and implement a phased market entry plan." },
            { title: "Strengthen Brand Identity", content: "Ensure consistency across markets while adapting branding strategies." }
          ]
        },
        {
          title: "Operational Excellence & Infrastructure",
          items: [
            { title: "Optimize Supply Chain & Logistics", content: "Streamline processes to support increased demand." },
            { title: "Leverage Technology for Growth", content: "Implement enterprise software and data analytics." },
            { title: "Talent Acquisition & Management", content: "Develop strong hiring and leadership strategies." },
            { title: "Maintain Quality Standards", content: "Ensure consistency as you scale." }
          ]
        },
        {
          title: "Financial Strategy & Capital Management",
          items: [
            { title: "Advanced Financial Planning", content: "Develop sophisticated revenue projections." },
            { title: "Risk & Compliance Management", content: "Implement robust risk mitigation plans." },
            { title: "Mergers & Acquisitions", content: "Conduct due diligence before acquisitions." },
            { title: "Accurate Financial Reporting", content: "Ensure transparency in financial records." }
          ]
        },
        {
          title: "Leadership & Organizational Growth",
          items: [
            { title: "Empower & Decentralize Decision-Making", content: "Build strong leadership teams." },
            { title: "Restructure for Scalability", content: "Adapt organizational structures to support growth." },
            { title: "Foster Innovation & Agility", content: "Encourage adaptability and continuous learning." }
          ]
        }
      ],
      considerations: [
        { title: "Controlled Growth", content: "Scale strategically to avoid overextension." },
        { title: "Adaptability", content: "Be flexible and adjust strategies when necessary." },
        { title: "Data-Driven Decisions", content: "Use insights to refine business operations." },
        { title: "Maintain Core Values", content: "Uphold the principles that define your business." }
      ],
      color: "cyan"
    },
    maturity: {
      title: "Maturity/Renewal Stage",
      icon: "🏆",
      scoreRange: "76–90 points",
      description: "Congratulations! You have a well-established business with optimized systems and strong leadership.",
      sections: [
        {
          title: "Strategic Reassessment & Innovation",
          items: [
            { content: "Conduct in-depth market research to identify emerging trends." },
            { content: "Invest in research and development for product/service innovation." },
            { content: "Consider strategic partnerships or acquisitions to expand offerings." },
            { content: "Focus on core competencies—what your company does best." }
          ]
        },
        {
          title: "Operational Optimization & Efficiency",
          items: [
            { content: "Implement automation and streamline operations." },
            { content: "Optimize your supply chain for efficiency and cost reduction." },
            { content: "Leverage data analytics for performance tracking and improvement." },
            { content: "Focus on sustainability and environmentally friendly business practices." }
          ]
        },
        {
          title: "Customer Relationship Management & Brand Reinforcement",
          items: [
            { content: "Enhance customer loyalty programs and personalized experiences." },
            { content: "Consider a brand refresh to appeal to new generations." },
            { content: "Actively seek and implement customer feedback." }
          ]
        },
        {
          title: "Financial Management & Resource Allocation",
          items: [
            { content: "Optimize profitability through cost control and revenue growth." },
            { content: "Allocate resources strategically for maximum ROI." },
            { content: "Develop strong risk management and contingency plans." }
          ]
        },
        {
          title: "Leadership & Organizational Culture",
          items: [
            { content: "Plan for leadership succession and mentorship of future leaders." },
            { content: "Foster a culture of continuous learning and innovation." },
            { content: "Maintain high employee engagement and recognition." }
          ]
        }
      ],
      renewalInfo: [
        { title: "Renewal", content: "Focus on innovation, adaptation, and strategic reinvestment." },
        { title: "Decline", content: "Manage resources efficiently, optimize operations, and prepare for transitions." }
      ],
      color: "blue"
    }
  };

  // Color mapping for different stages
  const colorMap = {
    startup: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      title: "text-blue-800",
      section: "text-blue-700",
      highlight: "bg-blue-100"
    },
    survival: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      title: "text-indigo-800",
      section: "text-indigo-700",
      highlight: "bg-indigo-100"
    },
    growth: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      title: "text-purple-800",
      section: "text-purple-700",
      highlight: "bg-purple-100"
    },
    expansion: {
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      title: "text-cyan-800",
      section: "text-cyan-700",
      highlight: "bg-cyan-100"
    },
    maturity: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      title: "text-emerald-800",
      section: "text-emerald-700",
      highlight: "bg-emerald-100"
    }
  };


  const content = stageContent[stage];

  if (!content) return <p>Stage not found.</p>;

  return (
    <div className={`p-6 bg-${content.color}-100 rounded-lg`}> 
      <h1 className="text-2xl font-bold">{content.icon} {content.title}</h1>
      <p className="text-gray-600 mt-2">{content.description}</p>
      <p className="text-sm text-gray-500">Score Range: {content.scoreRange}</p>

      {content.keyAreas && (
        <section className="mt-4">
          <h2 className="text-lg font-semibold">Key Areas</h2>
          <ul className="list-disc list-inside">
            {content.keyAreas.map((area: any, index:any) => (
              <li key={index}>
                <strong>{area.title}:</strong> {area.content}
              </li>
            ))}
          </ul>
        </section>
      )}

      {content.sections && (
        <section className="mt-4">
          {content.sections.map((section: any, index: any) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-semibold">{section.icon} {section.title}</h2>
              <ul className="list-disc list-inside">
                {section.items.map((item: any, idx: any) => (
                  <li key={idx}>
                    <strong>{item.title}:</strong> {item.content}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {content?.reminders && (
        <section className="mt-4">
          <h2 className="text-lg font-semibold">Reminders</h2>
          <ul className="list-disc list-inside">
            {content.reminders.map((reminder: any, index: any) => (
              <li key={index}>
                <strong>{reminder.title}:</strong> {reminder.content}
              </li>
            ))}
          </ul>
        </section>
      )}

      {content.mindset && (
        <section className="mt-4">
          <h2 className="text-lg font-semibold">Mindset</h2>
          <ul className="list-disc list-inside">
            {content.mindset.map((mindset: any, index: any) => (
              <li key={index}>
                <strong>{mindset.title}:</strong> {mindset.content}
              </li>
            ))}
          </ul>
        </section>
      )}

      {content.considerations && (
        <section className="mt-4">
          <h2 className="text-lg font-semibold">Considerations</h2>
          <ul className="list-disc list-inside">
            {content.considerations.map((consideration: any, index: any) => (
              <li key={index}>
                <strong>{consideration.title}:</strong> {consideration.content}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )

}

export default BusinessStageResults
  // Render startup stage
