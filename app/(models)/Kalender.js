import mongoose, { Schema } from "mongoose";

// Verbindung zur MongoDB-Datenbank
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const KalenderSchema = new Schema({
    Veranstaltung: String, // Typo korrigiert: Veranstalltung -> Veranstaltung
    Beschreibung: String,
    StartDatum: Date,
    EndDatum: Date,
    AllDay: Boolean,
}, {
    timestamps: true,
});

const Kalender = mongoose.models.Kalender || mongoose.model("Kalender", KalenderSchema);

export default Kalender;
