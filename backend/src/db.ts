import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import { boolean } from "zod";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
export const userModel = mongoose.model("user", userSchema)

const contentSchema = new Schema({
    title: String,
    link: String,
    type: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tags' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'user' }
})
export const contentModel = mongoose.model('content', contentSchema)

const tagSchema = new Schema({
    title: { type: String, unique: true, required: true }
})
export const tagModel = mongoose.model('Tags', tagSchema)

const shareSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
    hash: String
})
export const shareModel = mongoose.model('share', shareSchema)