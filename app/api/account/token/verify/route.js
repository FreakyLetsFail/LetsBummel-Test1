import { NextResponse } from 'next/server';
import TokenModel from "@/app/(models)/TokenModel";

export const GET = async (request) => {
  try {
      const token = request.nextUrl.searchParams.get('token');
      console.log(token);
      if (!token) {
          console.log("Kein Token angegeben");
          return new NextResponse("Token is required", {status: 400});
      }

      const tokenData = await TokenModel.find({ token: token, isactiv: true });
      if (!tokenData || tokenData.length === 0) { // Überprüfe, ob tokenData leer ist
          console.log("Token not found");
          return new NextResponse("Token not found", {status: 404});
      }

      console.log("Token success");
      return NextResponse.json({ success: true, message: "Token verified successfully", data: tokenData });
  } catch (error) {
      console.log("Fehler");
      return new NextResponse("Error in fetching token data: " + error.message, {status: 500});
  }
};
