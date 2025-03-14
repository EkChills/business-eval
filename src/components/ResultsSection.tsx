import { Card, CardContent } from "@/components/ui/card";
import { templates } from "@/lib/templates";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import BusinessStageResults from "./BusinessStageResults";

export default function ResultsSection({ formValues, overallBScore }: { formValues: any, overallBScore: number }) {
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

  function getEmailString() {
    if (overallBScore <= 18) return templates.lowest();
    if (overallBScore <= 45) return templates.low();
    if (overallBScore <= 60) return templates.medium();
    if (overallBScore <= 75) return templates.good();
    return templates.high();
  }


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
            <p className="text-2xl font-semibold mt-2">{overallBScore} / 100</p>
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
      
      <div className="space-y-6 flex w-full">
        <BusinessStageResults overallBScore={overallBScore} />
        </div>
        
       
    </div>
  );
}