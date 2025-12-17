import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema= mongoose.Schema({
    fullName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    profileimgURL: { type: String, default: null}
},
{timestamps: true}  // adds updatedAt: and createdAt by default
)


// Hash password before storing

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

        this.password= await bcrypt.hash(this.password, 10)
        next();
})

// Compare Passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema)