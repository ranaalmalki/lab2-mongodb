import mongoose from "mongoose";

const { Schema } = mongoose


const bookSchema = new Schema(
    {
        Book_title: {
            type: String,
            required: true,
        },
        Author: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        Edition_number: {
            type: String,
            required: true,
        },
        Publisher: {
            type: String,
            required: true,
        },
        electronic_version: {
            type: Boolean,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        languages_supported: {
            type: [String],
            required: true,
        },
        classification: {
            type: String,
            required: true,
        },
        


    },
    { timestamps: true }//تقوم بجلب الوقت الخاص بكل مقاله تم كتابتبها
)

const Book = mongoose.model("Article", bookSchema)

export default Book