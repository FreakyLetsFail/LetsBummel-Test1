import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, newEmail, newPassword } = body;

    // Bestätigung, dass die erforderlichen Daten bereitgestellt wurden
    if (!email || (!newEmail && !newPassword)) {
      return NextResponse.json(
        { message: "Aktuelle E-Mail und mindestens ein neues Feld (E-Mail oder Passwort) sind erforderlich." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: "Benutzer nicht gefunden." }, { status: 404 });
    }

    // Überprüfung, ob die neue E-Mail-Adresse einzigartig ist, falls sie geändert wird
    if (newEmail && newEmail !== email) {
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        return NextResponse.json({ message: "Die neue E-Mail-Adresse ist bereits vergeben." }, { status: 409 });
      }
      user.email = newEmail;
    }

    // Hashen des neuen Passworts, falls angegeben
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save(); // Speichern der aktualisierten Benutzerdaten

    return NextResponse.json({ message: "Benutzerdaten erfolgreich aktualisiert." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Fehler beim Aktualisieren der Benutzerdaten.", error }, { status: 500 });
  }
}

export default POST;
