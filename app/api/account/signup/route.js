import User from '../../../(models)/User'; // Pfad zu deinem User-Modell


export default async function signup(req, res) {
  const {vorname, name, verbindungsid, email, password, role, picture, isactivated } = req.body;

  // Überprüfe, ob der Benutzer bereits existiert
  const isExistingUser = await checkUserExists(email);
  if (isExistingUser) {
    return res.status(409).json({ error: 'Ein Benutzer mit dieser E-Mail existiert bereits.' });
  }

  // Hier würdest du den neuen Benutzer erstellen. Die Implementierung hängt von deinem Setup ab.
  // Beispiel:
  const newUser = new User({ email, password, name });
  await newUser.save();

  return res.status(201).json({ message: 'Benutzer erfolgreich registriert.' });
}