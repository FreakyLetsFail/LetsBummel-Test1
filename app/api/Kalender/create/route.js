import Kalender from "@/app/(models)/Kalender";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const eventData = body.formData;

    // Bestätige, dass die erforderlichen Daten existieren
    if (!eventData?.title || !eventData.startDatum || !eventData.endDatum) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Optional: Überprüfe auf doppelte Ereignisse basierend auf Titel und Startdatum
    // Dies ist abhängig von den Geschäftsregeln deiner Anwendung
    const duplicate = await Kalender.findOne({ 
      title: eventData.title, 
      startDatum: eventData.startDatum 
    }).lean().exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Event" }, { status: 409 });
    }

    // Erstelle den Kalendereintrag mit den übergebenen Daten
    await Kalender.create(eventData);
    return NextResponse.json({ message: "Event Created." }, { status: 201 });
  } catch (error) {
    console.error(error); // Korrigiere 'console.log(err)' zu 'console.error(error)'
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

