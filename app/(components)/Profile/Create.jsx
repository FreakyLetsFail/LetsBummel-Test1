import React, { useState } from 'react';
import { Snippet } from "@nextui-org/react";
import {Button} from "@nextui-org/react";


export default function Create() {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const generateLink = async () => {
    setLoading(true);
    try {
      // Verwenden Sie die Fetch-API, um den Registrierungslink zu generieren.
      const response = await fetch('http://localhost:3000/api/token/generate', {
        method: 'POST', // Stellen Sie sicher, dass Sie die Methode angeben, wenn die API einen POST-Request erwartet.
      });
      const data = await response.json();
      if (data.link) {
        setLink(data.link);
      } else {
        console.error('Link was not returned from the API');
      }
    } catch (error) {
      console.error('Failed to generate link', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={generateLink}>
        Add Registerlink
      </Button>
      {link && (
        <div>
          <p>Registrierungslink:</p>
          {/* Verwenden Sie das Snippet-Element, um den Link anzuzeigen und die Kopierfunktion zu ermöglichen. */}
          <Snippet>{link}</Snippet>
        </div>
      )}
    </div>
  );
}
