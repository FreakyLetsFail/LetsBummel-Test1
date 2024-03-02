import bcrypt from 'bcrypt';
import User from "@/app/(models)/User";
import { NextResponse } from 'next/server';

export async function POST(request){
  const body = await request.json();
  const { firstName, lastName, nachname, email, password } = body
  console.log("body:", body);

    if(!firstName || !lastName || !email  || !password) {
      console.log("Missing Arguments");

    return new Response("Missing Arguments",{status:400});

  }

  const userExist = await User.findOne({email: email})

  if(userExist){
    console.log(" Already exists");

    return new NextResponse("User already exists", {status: 400});
  }

  const hashedPassword = await bcrypt.hash(password,10);

  console.log("Create User blöd ");

  const user = await User.create({
    vorname: firstName,
    nachname: lastName,
    verbindungsid : "",
    email: email,
    password: hashedPassword, 
    role: "1",
    picture: "",
    isactivated: true
  })

  console.log("User erstellt")
  return NextResponse.json("User  created");
}