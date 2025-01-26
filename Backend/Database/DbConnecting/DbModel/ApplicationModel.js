import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema({
    category:{
        type: String,
        required: true,
    },
    subCategory:{
        type: String,
        required: true,
    },
    amount:{
        type: String,
        required: true,
    },
    year:{
        type: String,
        required: true,
    },
})

const Application = mongoose.model("Application",applicationSchema);

export default Application;