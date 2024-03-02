import { nanoid } from 'nanoid'; // Für die Token-Generierung
import TokenModel from "@/app/(models)/TokenModel";
import { NextResponse } from 'next/server';
import 'moment-timezone';



export async function POST(req, res) {
    try {
      const token = nanoid();
      const moment = require('moment-timezone');
      const nowInBerlin = moment.tz(Date.now(), "Europe/Berlin");
      const expiresAt = nowInBerlin.clone().add(20, 'minutes');
      const isactiv = Boolean(true); 
      console.log("Expires", expiresAt, isactiv)
   
      await TokenModel.create({ token, expiresAt, isactiv });
      const signuppage = `http://localhost:3000/pages/AddUser?token=${token}`
  
        return new NextResponse(JSON.stringify({ link: signuppage }), {status: 200, headers: {"Content-Type": "application/json"}});
    } catch (error) {
      console.error('Error generating registration link', error);
      return res.status(500).json({ message: 'Error generating registration link' });
    }
  }
  
