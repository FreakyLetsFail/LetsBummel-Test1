
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Korrekter Import für useSearchParams
import { Spinner, Input, Button} from "@nextui-org/react";

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
      if (data.success) {
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
<div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Registrierung</h1>
      <form className="w-full max-w-md space-y-4">
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          type="vorname"
          placeholder="Vorname"
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          type="nachname"
          placeholder="Nachname"
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          type="email"
          placeholder="E-Mail"
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          type="email"
          placeholder="E-Mail bestätigen"
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Passwort"
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Passwort bestätigen"
        />
        <Button auto flat color="primary" type="submit" className="w-full">
          Registrieren
        </Button>
        </form>
        </div> 
        
        );
}


