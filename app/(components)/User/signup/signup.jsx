import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Einfache Validierung für E-Mail und Passwort
    if (formData.email !== formData.confirmEmail) {
      alert('E-Mails stimmen nicht überein!');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwörter stimmen nicht überein!');
      return;
    }

    // Entferne die Felder confirmEmail und confirmPassword vor dem Senden
    const { confirmEmail, confirmPassword, ...dataToSend } = formData;

    try {
      const response = await fetch('/api/account/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        // Bei Erfolg, z.B. zur Login-Seite weiterleiten
        router.push('/login');
      } else {
        // Fehlerbehandlung, z.B. Fehlermeldung anzeigen
        const errorData = await response.json();
        alert(`Fehler: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Fehler beim Senden der Registrierungsdaten', error);
      alert('Fehler beim Registrieren. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Registrieren</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            name="firstName"
            type="text"
            placeholder="Vorname"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Nachname"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="confirmEmail"
            type="email"
            placeholder="E-Mail bestätigen"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.confirmEmail}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Passwort"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Passwort bestätigen"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Registrieren
          </button>
        </form>
      </div>
    </div>
  );
}
