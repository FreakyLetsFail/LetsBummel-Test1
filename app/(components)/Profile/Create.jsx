import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { Card, Button, Snippet, RadioGroup, Radio } from "@nextui-org/react";

export default function Create() {
  const { data: session } = useSession();
  const [selected, setSelected] = React.useState("fux");
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const generateLink = async () => {
    if (!selected || !session?.user.verbindungsid) {
      console.error("Rolle oder verbindungsid fehlt");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/account/token/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verbindungsid: session.user.verbindungsid,
          role: selected,
        }),
      });
      const data = await response.json();
      if (data.link) {
        setLink(data.link);
        console.log({link})
      } else {
        console.error('Link wurde nicht von der API zurückgegeben');
      }
    } catch (error) {
      console.error('Fehler beim Generieren des Links', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px' }}>
          
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
    <RadioGroup
      label="Wähle deine Rolle"
      value={selected}
      orientation="horizontal"
      onValueChange={setSelected}
    >
      <Radio value="fux">Fux</Radio>
      <Radio value="bursch">Bursch</Radio>
      <Radio value="dame">Dame</Radio>
      <Radio value="alter_herr">Alter Herr</Radio>
      <Radio value="hohe_dame">Hohe Dame</Radio>
    </RadioGroup>

    
        </div>

        <Button onClick={generateLink} disabled={loading}>
        {loading ? 'Lädt...' : 'Registrierungslink generieren'}
      </Button>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
    {link && (
        <Snippet symbol="" variant="bordered"> {link} </Snippet>
      )}
      
     
    </div>
  </Card>
  );
}
