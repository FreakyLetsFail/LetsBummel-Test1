import { NextResponse } from 'next/server';
import kalender from "@/app/(models)/Kalender";


export const GET = async (request) => {
  try {
      const verbindungen = await kalender.find();
      return new NextResponse(JSON.stringify(verbindungen), {status: 200});
  } catch (error) {
      return new NextResponse("Error in fetchning posts " + error, {status: 500});
  }
  }