import mongoose, { Schema } from "mongoose";

const tokenSchema = mongoose.Schema(
    {
        userid: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        token: {
            type: String,
            required: true
        },
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: 60*60*24 }
        }
    }
)

const Token = mongoose.model("Token", tokenSchema);

export default Token;