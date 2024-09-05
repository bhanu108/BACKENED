import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema  = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3,"First name must contain 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3,"last name must contain 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "phone number must contain 10 digits"],
        maxLength: [10, "phone number must contain 10 digits"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [5, "NIC must contain 5 digits"],
        maxLength: [5, "NIC must contain 5 digits"]
    },
    dob: {
        type: String,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password:{
        type: String,
        minLength: [10, "Password contains Atleast 10 characters!"],
        required: true,
        select: false
        //maxLength: [10, "phone number must contain 10 digits"]
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
         expiresIn: process.env.JWT_EXPIRES,
    });
};

//export const Message = mongoose.model("Message", userSchema);
export const User = mongoose.model("User", userSchema);