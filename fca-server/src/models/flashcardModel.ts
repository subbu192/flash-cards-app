import mongoose, { Schema } from "mongoose";
import MUUID from "uuid-mongodb";

const flashcardSchema = new mongoose.Schema({
    _id: {
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v1(),
    },
    category: {
        type: Schema.Types.UUID,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.UUID,
        ref: 'User'
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Flashcard', flashcardSchema);