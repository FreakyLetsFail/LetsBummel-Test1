"use client";
import { signIn } from "next-auth/react";
import {  useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Anmelden</h2>
        {/* Buttons für die Anmeldung mit Google und Apple */}
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Mit Google anmelden
          </button>
          <button
            onClick={() => signIn("apple", { callbackUrl: "/" })}
            className="px-4 py-2 font-semibold text-white bg-black rounded hover:bg-gray-800"
          >
            Mit Apple anmelden
          </button>
        </div>

        {/* Trennlinie */}
        <div className="flex items-center justify-between">
          <hr className="w-full" />
          <span className="p-2 text-gray-400">oder</span>
          <hr className="w-full" />
        </div>

       {/* Formular für die Anmeldung mit Credentials */}
       <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            signIn("credentials", { email, password } ,{ callbackUrl: "/" });
          }}
          className="flex flex-col space-y-4">
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Passwort"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Buttons nebeneinander */}
          <div className="flex justify-between">
            <button
              type="button" // Verhindern, dass das Formular mit diesem Button gesendet wird
              onClick={() => router.push('/pages/Registrierung')}
              className="px-4 py-2 font-semibold text-white bg-purple-500 rounded hover:bg-purple-700 flex-1 mr-2"
            >
              Registrieren
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 flex-1 ml-2"
            >
              Anmelden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
