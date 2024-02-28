"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { redirect } from "next/navigation";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
      e.preventDefault(); // Verhindert das Standardverhalten des Formulars

      // Versucht, den Benutzer anzumelden und leitet ihn bei Erfolg um
        const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
    });

    if (result.error) {
      // Verbessertes Feedback für den Benutzer
      alert(`Anmeldung fehlgeschlagen: ${result.error}`);
  } else {
      // Weiterleitung nach erfolgreicher Anmeldung
      redirect('/dashboard');
  }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-8 border rounded-lg w-96 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">E-Mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Deine E-Mail"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Passwort</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Dein Passwort"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" // Ändern Sie den Typ zu "submit", um das Formular zu übermitteln
                        className="flex items-center justify-center w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600" // Styling für den Button
                    >
                        Mit E-Mail anmelden
                    </button>
                       
                    
                </form>


                <button 
                    onClick={() => signIn('google')} 
                    className="flex items-center justify-center w-full py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                    Mit Google anmelden
                </button>
                <button 
                    onClick={() => signIn('apple')} 
                    className="flex items-center justify-center w-full py-2 mt-2 text-white bg-black rounded-lg hover:bg-gray-900"
                >
                    Mit Apple anmelden
                </button>
            </div>
        </div>
    );
}

export default LoginForm;
