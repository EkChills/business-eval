"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stageContent } from '@/lib/scoreContent';
import { jsPDF } from "jspdf"
import { generateBusinessStageHTML } from '@/lib/html';


interface IBusinessStageResults {
    overallBScore: number
}

const BusinessStageResults = React.forwardRef<HTMLDivElement, IBusinessStageResults>(({ overallBScore }, ref) => {
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

  // Color mapping for different stages


  const content = stageContent[stage];


  if (!content) return <p>Stage not found.</p>;

  return (
    <div className={`p-6 border rounded-lg`} ref={ref}> 
      <h1 className="text-2xl font-bold">{content.icon} {content.title}</h1>
      <p className="mt-2">{content.description}</p>
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

})

BusinessStageResults.displayName = "Business Stage Results"

export default BusinessStageResults
  // Render startup stage
