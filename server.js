require('dotenv').config();
const express=require('express');
const cors = require("cors");
const connectToDB=require("./database/db")
const authRouter=require('./routes/auth-router');
const homeRouter=require('./routes/home-router');
const adminRouter=require('./routes/admin-router');
const notesRouter=require('./routes/notes-router');


const app = express();
const PORT=process.env.PORT;
connectToDB();

app.use(cors({
    origin: "https://chaam-notes-app.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/home",homeRouter);
app.use("/api/admin",adminRouter);
app.use("/api/notes",notesRouter);
app.get("/", (req, res) => {
    res.send("Chaam Notes Backend Running 🚀");
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})