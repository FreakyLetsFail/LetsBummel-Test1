import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Korrekter Import für useSearchParams
import { Spinner } from "@nextui-org/react";
import { data } from 'browserslist';

export default function SignupPage() {
  const searchParams = useSearchParams()
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extrahiere den Token aus den Suchparametern der URL
    const token = searchParams.get('token');
    console.log("Token from URL:", token); // Zum Debuggen

    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, [searchParams]); // Reagiere auf Änderungen in den Suchparametern

  const verifyToken = async (token) => {
    try {
      setLoading(true);
      const url = new URL(`/api/token/verify`, window.location.origin);
      url.searchParams.append('token', encodeURIComponent(token));
  
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
  
      const data = await response.json();
  
      // Prüfe explizit, ob die Anfrage erfolgreich war UND ob das 'success'-Feld true ist
      if (response.ok && data.success) {
        setIsValidToken(true);
      } else {
        // Wenn die Anfrage nicht erfolgreich war oder 'success' false ist, als ungültig behandeln
        throw new Error(data.message || 'Token validation failed');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsValidToken(false);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <Spinner label="Loading..." color="warning" />;
  }

  if (!isValidToken) {
    return <p>Invalid or expired token. Please try again.</p>;
  }

  return (
    <div>
      <h1>Registration</h1>
      {/* Platz für das Registrierungsformular */}
    </div>
  );
}
