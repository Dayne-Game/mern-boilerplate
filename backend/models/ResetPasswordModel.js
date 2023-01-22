import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 1200,
	},
})

const ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema);

export default ResetPassword;