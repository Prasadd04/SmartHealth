import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import winston from "winston";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import { z } from "zod";
import { fileURLToPath } from "url";
import "dotenv/config";
import { prisma } from "./src/lib/prisma";

// Auth middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: { code: "UNAUTHORIZED", message: "Access token required" } 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: { code: "FORBIDDEN", message: "Invalid or expired token" } 
      });
    }
    req.user = user; // Attach user to request
    next();
  });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logging setup with Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, error: { code: "RATELIMIT", message: "Too many requests" } }
  });
  app.use("/api/", limiter);

  // Multer setup for X-Ray uploads
  const storage = multer.memoryStorage();
  const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
  });

  // --- API Routes ---

   // Auth
   app.post("/api/auth/login", async (req, res) => {
     try {
       const { email, password } = req.body;
       
       // Validate input
       if (!email || !password) {
         return res.status(400).json({ 
           success: false, 
           error: { code: "VALIDATION", message: "Email and password are required" } 
         });
       }
       
       // Find user in database
       const user = await prisma.user.findUnique({
         where: { email }
       });
       
       // If user doesn't exist or password doesn't match
       if (!user || !(await bcrypt.compare(password, user.password))) {
         return res.status(401).json({ 
           success: false, 
           error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } 
         });
       }
       
       // Generate JWT token
       const token = jwt.sign(
         { userId: user.id, email: user.email },
         process.env.JWT_SECRET || "secret",
         { expiresIn: "1h" }
       );
       
       // Return success response
       res.json({ 
         success: true, 
         data: { 
           token, 
           user: { 
             id: user.id,
             email: user.email, 
             name: user.name 
           } 
         } 
       });
     } catch (error) {
       console.error("Login error:", error);
       res.status(500).json({ 
         success: false, 
         error: { code: "SERVER_ERROR", message: "Authentication failed" } 
       });
     }
   });

   // Register endpoint
   app.post("/api/auth/register", async (req, res) => {
     try {
       const { email, password, name } = req.body;
       
       // Validate input
       if (!email || !password || !name) {
         return res.status(400).json({ 
           success: false, 
           error: { code: "VALIDATION", message: "Email, password, and name are required" } 
         });
       }
       
       // Check if user already exists
       const existingUser = await prisma.user.findUnique({
         where: { email }
       });
       
       if (existingUser) {
         return res.status(409).json({ 
           success: false, 
           error: { code: "USER_EXISTS", message: "User with this email already exists" } 
         });
       }
       
       // Hash password
       const hashedPassword = await bcrypt.hash(password, 10);
       
       // Create new user
       const user = await prisma.user.create({
         data: {
           email,
           password: hashedPassword,
           name
         }
       });
       
       // Generate JWT token
       const token = jwt.sign(
         { userId: user.id, email: user.email },
         process.env.JWT_SECRET || "secret",
         { expiresIn: "1h" }
       );
       
       // Return success response
       res.status(201).json({ 
         success: true, 
         data: { 
           token, 
           user: { 
             id: user.id,
             email: user.email, 
             name: user.name 
           } 
         } 
       });
     } catch (error) {
       console.error("Registration error:", error);
       res.status(500).json({ 
         success: false, 
         error: { code: "SERVER_ERROR", message: "Registration failed" } 
       });
     }
   });

   // Diagnostics Mocking
   app.post("/api/diagnostics/xray", authenticateToken, upload.single("image"), async (req: any, res) => {
     try {
       logger.info("X-Ray analysis requested");
       
       // Simulate ML processing - in a real app, this would call your ML model
       await new Promise(resolve => setTimeout(resolve, 2000));
       
       // Generate diagnostic result
       const prediction = "Pneumonia"; // This would come from your ML model
       const confidence = 0.94;
       
       // Save diagnosis record to database
       const record = await prisma.diagnosisRecord.create({
         data: {
           type: "X-Ray",
           result: prediction,
           confidence: confidence,
           userId: req.user.userId
         }
       });
       
       res.json({
         success: true,
         data: {
           prediction,
           confidence,
           findings: [
             { label: "Pneumonia", score: 0.94 },
             { label: "Normal", score: 0.05 },
             { label: "Effusion", score: 0.01 }
           ],
           heatmapUrl: "https://via.placeholder.com/400x400/000000/FFFFFF?text=Heatmap",
           recordId: record.id
         }
       });
     } catch (error) {
       console.error("X-Ray analysis error:", error);
       res.status(500).json({ 
         success: false, 
         error: { code: "SERVER_ERROR", message: "Analysis failed" } 
       });
     }
   });

   app.post("/api/diagnostics/symptoms", authenticateToken, async (req: any, res) => {
     try {
       logger.info("Symptom analysis requested");
       const { symptoms } = req.body;
       
       // Validate input
       if (!symptoms) {
         return res.status(400).json({ 
           success: false, 
           error: { code: "VALIDATION", message: "Symptoms are required" } 
         });
       }
       
       // Simulate BioBERT NLP - in a real app, this would call your NLP model
       await new Promise(resolve => setTimeout(resolve, 1500));
       
       // Generate diagnostic result
       const diagnoses = [
         { label: "Acute Bronchitis", confidence: 0.82, details: "Viral infection of the airways." },
         { label: "Viral Infection", confidence: 0.12, details: "General upper respiratory infection." }
       ];
       
       // Save diagnosis record to database
       const record = await prisma.diagnosisRecord.create({
         data: {
           type: "Symptom",
           result: diagnoses[0].label, // Primary diagnosis
           confidence: diagnoses[0].confidence,
           userId: req.user.userId
         }
       });
       
       res.json({
         success: true,
         data: {
           diagnoses,
           limeFeatures: ["Coughing", "Chest Pain"],
           emergency: symptoms.includes("Shortness of Breath"),
           recordId: record.id
         }
       });
     } catch (error) {
       console.error("Symptom analysis error:", error);
       res.status(500).json({ 
         success: false, 
         error: { code: "SERVER_ERROR", message: "Analysis failed" } 
       });
     }
   });

   app.post("/api/diagnostics/vitals", authenticateToken, async (req: any, res) => {
     try {
       logger.info("Vitals forecast requested");
       // Simulate LSTM forecast
       const history = req.body.history || [];
       const forecast = history.map((h: any, i: number) => ({
         timestamp: new Date(Date.now() + (i + 1) * 3600000).toISOString(),
         value: h.value + (Math.random() - 0.5) * 5
       }));
       
       // Save diagnosis record to database
       const record = await prisma.diagnosisRecord.create({
         data: {
           type: "Vitals",
           result: "Forecast Generated",
           confidence: 0.75, // Example confidence
           userId: req.user.userId
         }
       });
       
       res.json({ 
         success: true, 
         data: { 
           forecast, 
           anomaly: Math.random() > 0.8,
           recordId: record.id
         } 
       });
     } catch (error) {
       console.error("Vitals forecast error:", error);
       res.status(500).json({ 
         success: false, 
         error: { code: "SERVER_ERROR", message: "Forecast failed" } 
       });
     }
   });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    logger.info(`Server started on port ${PORT}`);
  });
}

startServer();
