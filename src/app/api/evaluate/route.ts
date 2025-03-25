import { templates } from "@/lib/templates";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  try {
    const decodedCred = JSON.parse(atob(process.env.GOOGLE_CREDENTIALS as string));
    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
   
    const body = await req.json();
    const { email, totalScore, businessAge, businessType, ...sectionScores } = body;
    const getBusinessStage = () => {
      if (totalScore <= 30) return "startup";
      if (totalScore <= 45) return "survival";
      if (totalScore <= 60) return "growth";
      if (totalScore <= 75) return "expansion";
      return "maturity";
    };

    if (!email) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: decodedCred,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "1OVAa-6MN86lZjKOaNCXR6qQo0cXNG_R2VcnlYidFTzU";
    const sheetName = "Sheet1";
   
    // Prepare headers
    const headers = ["Email", "Total Score", "Business Age", "Business Type", ...Object.keys(sectionScores),"Business Aging", "Timestamp"];

    // Check existing headers
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:${String.fromCharCode(65 + headers.length - 1)}1`,
    });

    // If no headers or headers are different, update the first row
    if (!headerResponse.data.values || 
        headerResponse.data.values[0].length === 0 || 
        headerResponse.data.values[0].join(',') !== headers.join(',')) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:${String.fromCharCode(65 + headers.length - 1)}1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [headers],
        },
      });
    }

    // Prepare row data
    const rowData = [
      email, 
      totalScore, 
      businessAge, 
      businessType, 
      ...Object.values(sectionScores),
      getBusinessStage(),
      new Date().toISOString()
    ];

    // Append new row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:${String.fromCharCode(65 + headers.length - 1)}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({ success: true, message: "Data saved & email sent!" });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};