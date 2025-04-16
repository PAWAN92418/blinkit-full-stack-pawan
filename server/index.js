import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import helmet from 'helmet';
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";    
import connectDB from './config/connectDB.js';
import userouter from './route/user.route.js';
import uploadRouter from './route/upload.route.js';

const app = express();
app.use(cors({
    credentials: true,
    origin: 5173
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // ✅ Ensure 'uploads' directory exists
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// // ✅ Serve static files from 'uploads'
// app.use("/uploads", express.static(uploadDir));

// app.use((req, res, next) => {
//     res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
//     res.setHeader("Pragma", "no-cache");
//     res.setHeader("Expires", "0");
//     res.setHeader("Surrogate-Control", "no-store");
//     next();
//   });
  

app.get('/', (req, res) => {
    res.send("Server is running on port 1117");
});

app.use('/api/user', userouter);
app.use('/file',uploadRouter)

const port = process.env.PORT || 1117;

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server is running on port", port);
    });
});
