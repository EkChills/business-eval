import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"

export const POST = async (req: NextRequest) => {
  const decodedCred = JSON.parse(atob(process.env.GOOGLE_CREDENTIALS as string));
  
  const body = await req.json();
  const {SMTP_EMAIL, SMTP_PASSWORD} = process.env

  try {
      const auth = new google.auth.GoogleAuth({
        credentials: decodedCred,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      const sheets = google.sheets({ version: "v4", auth });
      const spreadsheetId = "1OVAa-6MN86lZjKOaNCXR6qQo0cXNG_R2VcnlYidFTzU";
      const range = "Sheet1!A1:B2";
    
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values: [[body.name, body.email]],
        },
      });

    
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
          },
        });
        let info = await transporter.sendMail({
          from: SMTP_EMAIL,
          to: body.email,
          subject: ``,
          html: "",
        });

      return NextResponse.json({ success: true });
    
  } catch (error) {
    console.log(error);
    
    return new NextResponse("Something went wrong", {status: 500}) 
  }



}
