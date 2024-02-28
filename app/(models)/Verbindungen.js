import mongoose, {Schema, mongo} from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise

const VerbindungsSchema = new Schema({
    name: String,
    age: Number, // Änderung von Date zu Number, falls dies das Alter darstellt
    Adresse: String,
    AdresseNr: Number, // Korrektur von int zu Number
    PLZ: Number, // Korrektur von int zu Number
    Ort: String,
    koordinaten: String,
    verbindungstyp: String,
    Dachverband: String,
    Geschlecht: String,
},{
    timestamps: true,
}
);

const Verbindungen = mongoose.models.Verbindungen || mongoose.model("verbindungen", VerbindungsSchema)

export default Verbindungen;