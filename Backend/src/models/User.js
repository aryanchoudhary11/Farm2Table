import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true, "Name is required"]
    },
    email:{
        type: String,
        required : [true, "Email is required"]
    },
    password:{
        type: String,
        required : [true, "Password is required"]
    },
    role:{
        type: String,
        enum: ["farmer","customer"],
        required : true
    },
},{timestamps: true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = function (enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)
}
export default mongoose.model("User", userSchema)