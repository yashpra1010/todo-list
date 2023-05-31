import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    listItem: {
        type: String,
        required: true
    }
  });

export default mongoose.model("List",itemSchema)