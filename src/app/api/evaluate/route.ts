import { templates } from "@/lib/templates";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  try {
    const decodedCred = JSON.parse(atob(process.env.GOOGLE_CREDENTIALS as string));
    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
    
    const body = await req.json();
    const { email, totalScore, ...sectionScores } = body;

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
    
    // Check if headers exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:D1`,  // Fetch the first row (header)
    });

    if (!response.data.values || response.data.values.length === 0) {
      // Headers are missing; add them
      const headers = ["Email", "Total Score", ...Object.keys(sectionScores)];
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [headers],
        },
      });
    }

    // Prepare row data
    const rowData = [email, totalScore, ...Object.values(sectionScores)];

    // Append new row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:D`,
      valueInputOption: "RAW",
      requestBody: {
        values: [rowData],
      },
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: SMTP_EMAIL, pass: SMTP_PASSWORD },
    });

    const emailString = () => {
      if (totalScore <= 18) return templates.lowest();
      if (totalScore <= 45) return templates.lowest();
      if (totalScore <= 60) return templates.medium();
      if (totalScore <= 75) return templates.good();
      return templates.high();
    };

    await transporter.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Your Test Scores",
      html: emailString(),
    });

    return NextResponse.json({ success: true, message: "Data saved & email sent!" });

  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
