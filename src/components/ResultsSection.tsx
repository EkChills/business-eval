import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function ResultsSection({ formValues }: { formValues: any }) {
  // Calculate average scores for each category
  const calculateCategoryScore = (category: string) => {
    if (!formValues[category]) return 0;
    
    const values = Object.values(formValues[category]) as string[];
    console.log("values", values);
    const sum = values.reduce((acc: number, val: string) => acc + (parseInt(val) || 0), 0);
    console.log(sum, "sum");
    console.log( (Math.round((sum / values.length) * 10) / 10), "sum / values.length");
    
    
    return Math.round((sum / values.length) * 10) / 10; // Round to 1 decimal place

    
  };

  const data = [
    {
      name: "Systems & Processes",
      score: calculateCategoryScore("systemsProcesses"),
      color: "#4f46e5"
    },
    {
      name: "Innovation & Strategy",
      score: calculateCategoryScore("innovationStrategy"),
      color: "#8b5cf6"
    },
    {
      name: "Finances",
      score: calculateCategoryScore("finances"),
      color: "#3b82f6"
    },
    {
      name: "Operational Efficiency",
      score: calculateCategoryScore("operationalEfficiency"),
      color: "#0ea5e9"
    },
    {
      name: "Market Presence",
      score: calculateCategoryScore("marketPresence"),
      color: "#06b6d4"
    },
    {
      name: "Team & Leadership",
      score: calculateCategoryScore("teamLeadership"),
      color: "#6366f1"
    }
  ];

  // Calculate overall score
  const overallScore = Math.round((data.reduce((acc, item) => acc + item.score, 0) / data.length) * 10) / 10;

  // Determine business health status
  const getHealthStatus = (score: number) => {
    if (score >= 4) return { status: "Excellent", color: "text-green-600" };
    if (score >= 3) return { status: "Good", color: "text-blue-600" };
    if (score >= 2) return { status: "Needs Improvement", color: "text-yellow-600" };
    return { status: "Critical", color: "text-red-600" };
  };

  const healthStatus = getHealthStatus(overallScore);

  // Get recommendations based on lowest scores
  const getRecommendations = () => {
    const sortedData = [...data].sort((a, b) => a.score - b.score);
    const lowestCategories = sortedData.slice(0, 2);
    
    const recommendations: Record<string, string[]> = {
      "Systems & Processes": [
        "Implement project management software to track tasks and workflows",
        "Document your key business processes for consistency and training",
        "Set up regular data review meetings to make informed decisions"
      ],
      "Innovation & Strategy": [
        "Schedule quarterly innovation sessions to brainstorm new ideas",
        "Develop a 3-5 year strategic plan with clear milestones",
        "Allocate resources for testing new products or services"
      ],
      "Finances": [
        "Set up a cash flow forecasting system",
        "Review your pricing strategy to improve profitability",
        "Establish an emergency fund equal to 3-6 months of operating expenses"
      ],
      "Operational Efficiency": [
        "Conduct a workflow analysis to identify bottlenecks",
        "Invest in automation tools for repetitive tasks",
        "Implement quality control measures to maintain standards during growth"
      ],
      "Market Presence": [
        "Conduct customer research to better understand your target market",
        "Develop a customer referral program to encourage word-of-mouth",
        "Create a customer feedback system to continuously improve"
      ],
      "Team & Leadership": [
        "Create clear job descriptions and responsibility charts",
        "Establish regular team meetings and one-on-ones",
        "Develop a delegation system with appropriate follow-up procedures"
      ]
    };
    
    return lowestCategories.map(category => ({
      category: category.name,
      tips: recommendations[category.name]
    }));
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Your Business Health Assessment</h3>
        <p className="text-gray-600">Based on your responses, here&apos;s how your business is performing:</p>
      </div>
      
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700">Overall Business Health</p>
            <h4 className={`text-3xl font-bold ${healthStatus.color}`}>
              {healthStatus.status}
            </h4>
            <p className="text-2xl font-semibold mt-2">{overallScore} / 5</p>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="score" name="Score">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Recommendations for Improvement</h3>
        <p className="text-gray-600">Focus on these areas to strengthen your business:</p>
        
        {recommendations.map((rec, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold mb-3">{rec.category}</h4>
              <ul className="space-y-2">
                {rec.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <p className="text-gray-600 italic">
          This assessment provides a snapshot of your current business health. 
          Consider revisiting this assessment every 3-6 months to track your progress.
        </p>
      </div>
    </div>
  );
}