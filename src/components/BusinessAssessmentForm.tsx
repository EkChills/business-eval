"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BarChart3, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import BusinessAgeSection from "./BusinessAgeSection";
import BusinessTypeSection from "./BusinessTypeSection";
import FinancesSection from "./FinancesSection";
import InnovationStrategySection from "./InnovationStrategySection";
import MarketPresenceSection from "./MarketPresenceSection";
import OperationalEfficiencySection from "./OperationalEfficiencySection";
import ResultsSection from "./ResultsSection";
import SystemsProcessesSection from "./SystemsProcessSection";
import TeamLeadershipSection from "./TeamLeadershipSection";
import { formSchema } from "@/lib/schema";





export default function BusinessAssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessAge: "",
      businessType: "",
      systemsProcesses: {
        trackingTools: "",
        documentedProcesses: "",
        dataDecisions: "",
      },
      innovationStrategy: {
        exploreOpportunities: "",
        adaptToChanges: "",
        clearVision: "",
      },
      finances: {
        cashFlowUnderstanding: "",
        profitability: "",
        emergencyFunds: "",
      },
      operationalEfficiency: {
        streamlinedOperations: "",
        automationTechnology: "",
        handleDemand: "",
      },
      marketPresence: {
        targetMarketUnderstanding: "",
        customerBaseGrowth: "",
        repeatBusiness: "",
      },
      teamLeadership: {
        definedRoles: "",
        teamCommunication: "",
        taskDelegation: "",
      },
    },
  });

  const steps = [
    { title: "Business Profile", description: "Tell us about your business" },
    { title: "Systems & Processes", description: "Evaluate your operational systems" },
    { title: "Innovation & Strategy", description: "Assess your strategic direction" },
    { title: "Finances", description: "Review your financial health" },
    { title: "Operational Efficiency", description: "Analyze your day-to-day operations" },
    { title: "Market Presence", description: "Evaluate your market position" },
    { title: "Team & Leadership", description: "Assess your team dynamics" },
    { title: "Results", description: "View your assessment results" }
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit ran");
    
    console.log(values, isSubmitted);
    setIsSubmitted(true);
    setCurrentStep(steps.length - 1);
  }

  const nextStep = () => {
    console.log("so curr step is", currentStep);
    
    if(currentStep === 5) {
        console.log("ran 6");
        
        setCurrentStep(6)
        return
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  console.log("curr step", currentStep);
  

  const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-lg border-0 overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
                <CardDescription className="text-blue-100 mt-1">
                  {steps[currentStep].description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
              <span>Step {currentStep + 1} of {steps.length}</span>
              </div>
            </div>
          </CardHeader>
          
          <Progress value={progressPercentage} className="h-1 rounded-none" />
          
          <CardContent className="p-6 md:p-8">
            {currentStep === 0 && (
              <div className="space-y-8">
                <BusinessAgeSection form={form} />
                <Separator />
                <BusinessTypeSection form={form} />
              </div>
            )}
            
            {currentStep === 1 && <SystemsProcessesSection form={form} />}
            {currentStep === 2 && <InnovationStrategySection form={form} />}
            {currentStep === 3 && <FinancesSection form={form} />}
            {currentStep === 4 && <OperationalEfficiencySection form={form} />}
            {currentStep === 5 && <MarketPresenceSection form={form} />}
            {currentStep === 6 && <TeamLeadershipSection form={form} />}
            {currentStep === 7 && <ResultsSection formValues={form.getValues()} />}
          </CardContent>
          
          <CardFooter className="flex justify-between p-6 bg-gray-50 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="cursor-pointer"
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            <div>
              {currentStep < steps.length - 2 && (
                 <Button className="cursor-pointer" type="button" onClick={nextStep}>
                 Next <ChevronRight className="ml-2 h-4 w-4" />
               </Button>
             
              )}

              {currentStep === steps.length - 2 && (
                <Button type="submit">
                Submit <Send className="ml-2 h-4 w-4" />
              </Button>
              )}

              {currentStep === steps.length - 1 && (
                <Button type="button" variant="outline" onClick={() => window.print()}>
                Print Results <BarChart3 className="ml-2 h-4 w-4" />
              </Button>
              )}
               
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}