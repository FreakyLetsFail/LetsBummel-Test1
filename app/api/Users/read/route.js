import User from "@/app/(models)/User";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const { verbindungsid } = req.query; // Erhalten der 'verbindungsid' aus der Anfrage
  
        // Prüfen, ob 'verbindungsid' vorhanden ist
        if (!verbindungsid) {
          return res.status(400).json({ message: "verbindungsid is required" });
        }
  
        // Benutzer mit der gleichen 'verbindungsid' suchen
        const users = await User.find({ verbindungsid: parseInt(verbindungsid, 10) });
  
        // Benutzerdaten als Antwort senden
        res.status(200).json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
      }
    } else {
      // Methode nicht erlaubt
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }