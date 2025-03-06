import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const decodedCred = JSON.parse(atob(process.env.GOOGLE_CREDENTIALS as string));
  
  const body = await req.json();

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

      return NextResponse.json({ success: true });
    
  } catch (error) {
    console.log(error);
    
    return new NextResponse("Something went wrong", {status: 500}) 
  }



};
