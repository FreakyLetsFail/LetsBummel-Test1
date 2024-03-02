import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";


export const options = {
    providers: [
        AppleProvider({

            profile(profile){  
              console.log("Profile Apple: ", profile)

                let userRole = "Apple_User"
                if(profile?.email == "justuswaechter@gmail.com"){
                    userRole = "admin";
                }
                


            return {
                ...profile,
                id: profile.sub,
                role: userRole,
                image: profile.picture
            };
        },
        clientId: process.env.APPLE_ID,
        clientSecret: process.env.APPLE_SECRET,
    }),



    GoogleProvider({
        profile(profile){
            console.log("Profile Google: ", profile)

            let userRole = "Google_User"
            if(profile?.email == "justuswaechter@gmail.com"){
                userRole = "admin";
            }

            try {

              
            } catch (error) {
              
            }

        return {
            ...profile,
            id: profile.sub,
            role: userRole,
            image: profile.picture
        };
    },
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
}),
CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: {
        label: "email:",
        type: "text",
        placeholder: "E-Mail",
      },
      password: {
        label: "password:",
        type: "password",
        placeholder: "Passwort",
      },
    },
    async authorize(credentials) {
      try {
        console.log(`Suche nach Benutzer mit E-Mail: ${credentials.email}`);
        const foundUser = await User.findOne({ email: credentials.email })
        .lean()
        .exec();
        console.log(`Gefundener Benutzer:`, foundUser);  

        if (foundUser) {
          const match = await bcrypt.compare(
            credentials.password,
            foundUser.password);
          
          if (match) {
            delete foundUser.password;
            return foundUser;
          } else {
            // Wenn das Passwort nicht übereinstimmt, können wir null zurückgeben oder einen Fehler werfen
            console.log("Passwort stimmt nicht überein");
            return null;
          }
        } else {
          console.log("Kein Benutzer mit dieser E-Mail gefunden");
          return null;
        }
      } catch (error) {
        console.error("Fehler bei der Autorisierung:", error);
        return null;
      }
    }
  })
 ],
 pages: {
  signIn: "/pages/Login",
 },

 callbacks: {
  async signIn({profile, credentials, user, account}){

    if(account.provider === "google" || account.provider === "apple"){
      const userExist = await User.findOne({email: profile.email});
      if(!userExist){
        console.log("Erstelle benutzer:", profile.email)
        const user = User.create({
        vorname: profile.given_name,
        nachname: profile.family_name,
        verbindungsid : "",
        email: profile.email,
        password: "", 
        role: "1",
        picture: profile.picture,
        isactivated: true
      })
      }
      return true;
    }

    if(account.provider === "credentials"){
      try{
      const userExist = await User.findOne({email: credentials.email});
      if(userExist){
        return true
      }
     }catch (error){
      console.log(error)
      return false
    }
  } 
  },

    async jwt({token, user}){
        if(user) token.role = user.role;
        return token; 
    },
    async session({ session, user, token }) {
      if(user){
        // Wenn `user` Objekt vorhanden ist, direkt verwenden
        session.user.name = user.vorname + " " + user.nachname;
        session.user.image = user.picture;
      } else if(token && token.email){
        // Wenn `user` Objekt nicht vorhanden ist, aber `token` hat eine E-Mail,
        // können Sie den Benutzer aus der Datenbank abfragen
        const foundUser = await User.findOne({ email: token.email }).lean().exec();
    
        if(foundUser){
          // Fügen Sie benutzerdefinierte Benutzerdaten zur Session hinzu
          session.user.name = foundUser.vorname + " " + foundUser.nachname;
          session.user.image = foundUser.picture;
          session.user.role = foundUser.role;
          session.user.verbindungsid = foundUser.verbindungsid;
          
        }
      }
    
      // Stellen Sie sicher, dass Sie die modifizierte Session zurückgeben
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },

    
 }
}