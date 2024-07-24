import mongoose, { Schema } from "mongoose";
import MUUID from "uuid-mongodb";

const categorySchema = new mongoose.Schema({
    _id: {
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v1(),
    },
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.UUID,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Category', categorySchema);