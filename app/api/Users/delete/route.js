import User from "@/app/(models)/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body; // Angenommen, die E-Mail-Adresse wird direkt übergeben

    // Bestätigung, dass die E-Mail-Adresse bereitgestellt wurde
    if (!email) {
      return NextResponse.json(
        { message: "E-Mail-Adresse ist erforderlich." },
        { status: 400 }
      );
    }

    // Suche und Lösche den Benutzer anhand der E-Mail-Adresse
    const deletedUser = await User.findOneAndDelete({ email: email }).exec();

    if (!deletedUser) {
      return NextResponse.json(
        { message: "Kein Benutzer mit dieser E-Mail-Adresse gefunden." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Benutzer erfolgreich gelöscht." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Fehler beim Löschen des Benutzers.", error },
      { status: 500 }
    );
  }
}

export default POST;
