import { Int32 } from "mongodb";
import mongoose, {Schema, mongo} from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise

const userSchema = new Schema({
    name: String,
    verbindungsid: Number,
    email: String,
    password: String,
    role: String,
    picture: String,
    isactivated: Boolean,
},{
    timestamps: true,
}
);

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;