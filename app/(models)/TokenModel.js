import mongoose, { Schema } from "mongoose";

// Verbindung zur MongoDB-Datenbank
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const tokenSchema = new mongoose.Schema({
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isactiv: {
      type: Boolean,
      required: true,
    },
  }, {
    timestamps: true, // Optional: Erstellt createdAt und updatedAt Felder automatisch
  });
  
  // Stellt sicher, dass das Modell nur einmal erstellt wird
  const TokenModel = mongoose.models.Token || mongoose.model('Token', tokenSchema);
  
  export default TokenModel;
  
