
import React, { useCallback, useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation'; // Korrekter Import für useSearchParams
import { Spinner, Input, Button, user} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";




export default function SignupPage() {
  const searchParams = useSearchParams()
  const { data: session } = useSession();
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = searchParams.get('token');
   
  

  if(!session){
    redirect('/api/auth/signin?callbackUrl=/pages/AddUser?token=${token}')
  }
 

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
      const url = new URL(`/api/account/token/verify`, window.location.origin);
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
    <h1> TEST </h1>
  );
}


