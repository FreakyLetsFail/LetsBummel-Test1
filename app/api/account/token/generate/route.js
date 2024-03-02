import { nanoid } from 'nanoid'; // Für die Token-Generierung
import TokenModel from "@/app/(models)/TokenModel";
import { NextResponse } from 'next/server';
import 'moment-timezone';



export async function POST(req, res) {
  const body = await  req.json();
  const { verbindungsid, role} = body

  console.log("body:", body);
  console.log("rolle:", role)

  if(!verbindungsid || !role){
    console.log("Missing Arguments");

  return new Response("Missing Arguments",{status:400});

}

    try {
      const token = nanoid();
      const moment = require('moment-timezone');
      const nowInBerlin = moment.tz(Date.now(), "Europe/Berlin");
      const expiresAt = nowInBerlin.clone().add(20, 'minutes');
      const isactiv = Boolean(true); 
      console.log("Expires", expiresAt, isactiv)
   
      await TokenModel.create({ token, verbindungsid, role ,expiresAt, isactiv });
      const signuppage = `http://localhost:3000/pages/AddUser?token=${token}`
  
        return new NextResponse(JSON.stringify({ link: signuppage }), {status: 200, headers: {"Content-Type": "application/json"}});
    } catch (error) {
      console.error('Error generating registration link', error);
      return res.status(500).json({ message: 'Error generating registration link' });
    }
  }
  
