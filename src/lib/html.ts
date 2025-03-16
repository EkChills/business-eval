import { stageContent } from "./scoreContent";

/**
 * Generates HTML for a business stage report based on a score
 * @param {number} overallBScore - The business score (18-90)
 * @returns {string} HTML string ready for PDF generation with jsPDF
 */
function generateBusinessStageHTML(overallBScore: number) {
  // Determine which stage the business is in based on score
  const getBusinessStage = () => {
    if (overallBScore <= 30) return "startup";
    if (overallBScore <= 45) return "survival";
    if (overallBScore <= 60) return "growth";
    if (overallBScore <= 75) return "expansion";
    return "maturity";
  };

  const stage = getBusinessStage();
  const content = stageContent[stage];

  if (!content) return "<p>Stage not found.</p>";

  // Start building HTML content with inline styles
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Business Stage Assessment</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: rgb(21, 21, 54); line-height: 1.6; margin: 0; padding: 0; background-color: white;">
      <div style="padding: 40px; max-width: 800px; margin: 0 auto;">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <h1 style="font-size: 30px; font-weight: 700; margin: 0; padding: 0; color: rgb(35, 35, 88);">${content.title}</h1>
        </div>
        <p style="font-size: 16px; margin-bottom: 12px;">${content.description}</p>
        <p style="font-size: 14px; color: rgb(107, 107, 154); margin-bottom: 24px;">Score Range: ${content.scoreRange}</p>
  `;

  // Key Areas section (for startup stage)
  if (content.keyAreas) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 20px; font-weight: 600; color: rgb(35, 35, 88); margin: 32px 0 16px 0; padding: 0;">Key Areas</h2>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
    `;
    
    content.keyAreas.forEach((area: any) => {
      html += `
        <li style="position: relative; padding-left: 24px; margin-bottom: 14px; line-height: 1.5;">
          <span style="position: absolute; left: 0; color: rgb(35, 35, 88); font-weight: bold;">•</span>
          <span style="font-weight: 700; color: rgb(21, 21, 54);">${area.title}:</span> 
          <span style="font-weight: 400;">${area.content}</span>
        </li>
      `;
    });
    
    html += `
        </ul>
      </div>
    `;
  }

  // Sections (for other stages)
  if (content.sections) {
    content.sections.forEach((section: any) => {
      html += `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: 600; color: rgb(35, 35, 88); margin: 32px 0 16px 0; padding: 0;">
            ${section.icon ? `<span style="font-size: 32px; margin-right: 12px;">${section.icon}</span>` : ''}${section.title}
          </h2>
          <ul style="list-style-type: none; padding: 0; margin: 0;">
      `;
      
      section.items.forEach((item: any) => {
        html += `
          <li style="position: relative; padding-left: 24px; margin-bottom: 14px; line-height: 1.5;">
            <span style="position: absolute; left: 0; color: rgb(35, 35, 88); font-weight: bold;">•</span>
            ${item.title ? `<span style="font-weight: 700; color: rgb(21, 21, 54);">${item.title}:</span> ` : ''}
            <span style="font-weight: 400;">${item.content}</span>
          </li>
        `;
      });
      
      html += `
          </ul>
        </div>
      `;
    });
  }

  // Reminders section
  if (content.reminders) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 20px; font-weight: 600; color: rgb(35, 35, 88); margin: 32px 0 16px 0; padding: 0;">Reminders</h2>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
    `;
    
    content.reminders.forEach((reminder: any) => {
      html += `
        <li style="position: relative; padding-left: 24px; margin-bottom: 14px; line-height: 1.5;">
          <span style="position: absolute; left: 0; color: rgb(35, 35, 88); font-weight: bold;">•</span>
          <span style="font-weight: 700; color: rgb(21, 21, 54);">${reminder.title}:</span> 
          <span style="font-weight: 400;">${reminder.content}</span>
        </li>
      `;
    });
    
    html += `
        </ul>
      </div>
    `;
  }

  // Mindset section
  if (content.mindset) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 20px; font-weight: 600; color: rgb(35, 35, 88); margin: 32px 0 16px 0; padding: 0;">Mindset</h2>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
    `;
    
    content.mindset.forEach((mindset: any) => {
      html += `
        <li style="position: relative; padding-left: 24px; margin-bottom: 14px; line-height: 1.5;">
          <span style="position: absolute; left: 0; color: rgb(35, 35, 88); font-weight: bold;">•</span>
          <span style="font-weight: 700; color: rgb(21, 21, 54);">${mindset.title}:</span> 
          <span style="font-weight: 400;">${mindset.content}</span>
        </li>
      `;
    });
    
    html += `
        </ul>
      </div>
    `;
  }

  // Considerations section
  if (content.considerations) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 20px; font-weight: 600; color: rgb(35, 35, 88); margin: 32px 0 16px 0; padding: 0;">Considerations</h2>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
    `;
    
    content.considerations.forEach((consideration: any) => {
      html += `
        <li style="position: relative; padding-left: 24px; margin-bottom: 14px; line-height: 1.5;">
          <span style="position: absolute; left: 0; color: rgb(35, 35, 88); font-weight: bold;">•</span>
          <span style="font-weight: 700; color: rgb(21, 21, 54);">${consideration.title}:</span> 
          <span style="font-weight: 400;">${consideration.content}</span>
        </li>
      `;
    });
    
    html += `
        </ul>
      </div>
    `;
  }

  // Renewal Info section (for maturity stage)
  if (content.renewalInfo) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 20px; font-weight: 600; color: rgb(35, 35, 88); margin: 32px 0 16px 0; padding: 0;">Renewal Information</h2>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
    `;
    
    content.renewalInfo.forEach((info: any) => {
      html += `
        <li style="position: relative; padding-left: 24px; margin-bottom: 14px; line-height: 1.5;">
          <span style="position: absolute; left: 0; color: rgb(35, 35, 88); font-weight: bold;">•</span>
          <span style="font-weight: 700; color: rgb(21, 21, 54);">${info.title}:</span> 
          <span style="font-weight: 400;">${info.content}</span>
        </li>
      `;
    });
    
    html += `
        </ul>
      </div>
    `;
  }

  // Add divider if needed
  html += `<div style="border-top: 1px solid rgb(235, 235, 242); margin: 24px 0;"></div>`;

  // Close the HTML tags
  html += `
      </div>
    </body>
    </html>
  `;

  return html;
}

export { generateBusinessStageHTML };