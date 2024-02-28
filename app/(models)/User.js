import { Int32 } from "mongodb";
import mongoose, {Schema, mongo} from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise

const userSchema = new Schema({
    vorname: {
        type: String,
        required: true,
        unique: flase,
    },
    nachname: {
        type: String,
        required: true,
        unique: false,
    },
    verbindungsid: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    role: {
        type: String,
        required: true,
        unique: false,
    },
    picture: {
        type: String,
        required: false,
        unique: false,
    },
    isactivated: {
        type: Boolean,
        required: true,
        unique: false,
    },
},{
    timestamps: true,
}
);

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;