import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    RollNo: Number,
    Name: String,
    Email: String,
    Subject1_Marks: Number,
    Subject2_Marks: Number,
    Subject3_Marks: Number,
    Subject4_Marks: Number,
    Subject5_Marks: Number,
    Total_Marks: Number,
    Percentage: Number,
    CGPA: Number,
    Co_Curricular_Activity: String,
    Activity_Marks: Number
  },
  {
    collection: "dataset" // 🔥 MUST MATCH MongoDB collection name
  }
);

export default mongoose.model("Student", studentSchema);
