import User from '../(models)/User';
import 'moment-timezone';
import TokenModel from '../(models)/TokenModel';


export const checkUserExists = async (email) => {
  const user = await User.findOne({ email }).lean();
  return !!user;
};

export const checkTokenValid = async (token) => {
  console.log("Bin in der auth")
    const nowInBerlin = moment.tz(Date.now(), "Europe/Berlin");
    const tokenRecord = await TokenModel.findOne({
      token,
      expiresAt: { $gt: nowInBerlin.toDate() } // Überprüfe, ob das Token noch nicht abgelaufen ist
    }).lean();
    console.log("token ist gültig")
    return !!tokenRecord;
  };