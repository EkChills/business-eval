import BusinessAssessmentForm from "@/components/BusinessAssessmentForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Business Health Assessment</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Evaluate your business performance across key areas to identify strengths and opportunities for growth.
          </p>
        </div>
        <BusinessAssessmentForm />
      </div>
    </main>
  );
}