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
        const email = credentials.email.toLowerCase();
        const foundUser = await User.findOne({ email: email }).lean().exec();
        console.log(`Gefundener Benutzer:`, foundUser);  

        if (foundUser) {
          console.log("User Exists");
          const match = await bcrypt.compare(credentials.password, foundUser.password);
          if (match) {
            // Das Passwort sollte vor der Rückgabe aus dem Objekt entfernt werden,
            // aber da wir `.lean().exec()` verwenden, erhalten wir ein einfaches JS-Objekt zurück,
            // daher ist es sicher, das Passwort direkt zu entfernen
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
    async signIn({ user, account, profile, email, credentials }) {
       const isExistingUser = await checkUserExists(email); // Implementiere diese Funktion
          if (isExistingUser) {
            return true; // Erlaube die Anmeldung
          } else {
      // Verhindere die Anmeldung und leite ggf. zu einer Fehlerseite oder Registrierungsseite um
         return false;
    }
  },
  async signUp({ user, account, profile, email, credentials }) {
    const isExistingUser = await checkUserExists(email); // Implementiere diese Funktion
       if (isExistingUser) {
         return false; // Erlaube die Anmeldung
       } else {
   // Verhindere die Anmeldung und leite ggf. zu einer Fehlerseite oder Registrierungsseite um
      return true;
 }

  },

    async jwt({token, user}){
        if(user) token.role = user.role;
        return token; 
    },
    async session({session, token}){
        if(session?.user) session.user.role = token.role;
        return session;
    }
 }
}