import React, { useEffect, useState } from 'react';
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, ButtonGroup } from "@nextui-org/react";
import { useSession } from "next-auth/react"; // Angenommen, Sie verwenden next-auth für die Session-Verwaltung

export default function Profile() {
  const { data: session, status } = useSession();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([
    { key: "name", label: "NAME" },
    { key: "role", label: "ROLE" },
    { key: "status", label: "STATUS" },
    { key: "change", label: "AKTIONEN" },
  ]);

  useEffect(() => {
    if (status === "authenticated") {
      // Hier führen Sie den API-Aufruf durch, um die Benutzerdaten zu laden
      // Beispiel-URL, ersetzen Sie sie durch Ihre eigene
      fetch(`/api/Users/read?verbindungsid=${session.user.verbindungsid}`)
        .then(response => response.json())
        .then(data => {
          // Verarbeiten und Setzen der Daten für die Tabelle
          const formattedRows = data.map(user => ({
            key: user._id, // oder eine andere eindeutige ID
            name: user.name,
            role: user.role,
            status: user.isactivated ? "Active" : "Inactive",
            // Fügen Sie weitere notwendige Felder hinzu
          }));
          setRows(formattedRows);
        })
        .catch(error => console.error("Failed to load user data", error));
    }
  }, [status, session]);

  if (status !== "authenticated") {
    return <p>Loading...</p>; // Oder eine andere Art von Ladeanzeige
  }

  return (
    <Card>
      <CardBody>
        <Table aria-label="Example table with dynamic content">
          <TableHeader>
            {columns.map(column => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map(item => (
              <TableRow key={item.key}>
                {columns.map(column => (
                  <TableCell key={column.key}>
                    {column.key === "change" ? (
                      <ButtonGroup>
                        <Button>Aktivieren/Deaktivieren</Button>
                        <Button>Bearbeiten</Button>
                        <Button>Löschen</Button>
                      </ButtonGroup>
                    ) : (
                      item[column.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
