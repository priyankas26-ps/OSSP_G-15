require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(
  cors({
    origin: (process.env.FRONTEND_URL || "http://localhost:5173")
      .split(",")
      .map((origin) => origin.trim()),
  })
);

app.use(express.json({ limit: "20kb" }));

const categories = [
  "Academics",
  "Faculty",
  "Events",
  "Facilities",
  "Student Support",
  "Technology",
  "Suggestions",
  "Other",
];

const statuses = ["Pending", "In Progress", "Resolved"];

/* =========================================
   DATABASE MODELS
   ========================================= */

const feedbackSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      enum: categories,
      default: "Other",
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: statuses,
      default: "Pending",
      index: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

const adminSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
const Admin = mongoose.model("Admin", adminSchema);

/* =========================================
   AUTHENTICATION MIDDLEWARE
   ========================================= */

function authenticateAdmin(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Please sign in with your administrator account.",
    });
  }

  const token = authorization.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin" || !decoded.adminId) {
      return res.status(403).json({
        message: "You do not have permission to access this resource.",
      });
    }

    req.admin = {
      adminId: decoded.adminId,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Your session has expired. Please sign in again.",
    });
  }
}

/* =========================================
   HEALTH CHECK
   ========================================= */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ProcessMind backend is running.",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

/* =========================================
   ANONYMOUS STUDENT FEEDBACK
   ========================================= */

app.post("/api/feedback", async (req, res) => {
  try {
    const { category, message } = req.body || {};

    if (typeof message !== "string") {
      return res.status(400).json({
        message: "Please enter your feedback.",
      });
    }

    const cleanMessage = message.trim();

    if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
      return res.status(400).json({
        message: "Feedback must be between 10 and 5000 characters.",
      });
    }

    const cleanCategory =
      typeof category === "string" && categories.includes(category)
        ? category
        : "Other";

    const reference = `PM-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;

    const feedback = await Feedback.create({
      reference,
      category: cleanCategory,
      message: cleanMessage,
    });

    return res.status(201).json({
      success: true,
      message: "Your feedback was submitted successfully.",
      reference: feedback.reference,
    });
  } catch (error) {
    console.error("Feedback submission error:", error);

    return res.status(500).json({
      message: "Unable to save feedback. Please try again.",
    });
  }
});

/* =========================================
   ADMIN LOGIN
   ========================================= */

app.post("/api/admin/login", async (req, res) => {
  try {
    const { adminId, password } = req.body || {};

    if (
      typeof adminId !== "string" ||
      typeof password !== "string" ||
      !adminId.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Enter your administrator ID and password.",
      });
    }

    const admin = await Admin.findOne({
      adminId: adminId.trim(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid administrator ID or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid administrator ID or password.",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin.adminId,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.json({
      success: true,
      message: "Administrator login successful.",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Unable to sign in right now.",
    });
  }
});

/* =========================================
   VERIFY ADMIN SESSION
   ========================================= */

app.get("/api/admin/verify", authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    adminId: req.admin.adminId,
  });
});

/* =========================================
   GET ALL FEEDBACK — ADMIN ONLY
   ========================================= */

app.get("/api/admin/feedback", authenticateAdmin, async (req, res) => {
  try {
    const feedback = await Feedback.find({})
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();

    return res.json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("Fetch feedback error:", error);

    return res.status(500).json({
      message: "Unable to load feedback.",
    });
  }
});

/* =========================================
   UPDATE FEEDBACK STATUS — ADMIN ONLY
   ========================================= */

app.patch(
  "/api/admin/feedback/:id/status",
  authenticateAdmin,
  async (req, res) => {
    try {
      const { status } = req.body || {};

      if (!statuses.includes(status)) {
        return res.status(400).json({
          message: "Choose a valid feedback status.",
        });
      }

      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid feedback record.",
        });
      }

      const feedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        { $set: { status } },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!feedback) {
        return res.status(404).json({
          message: "Feedback record not found.",
        });
      }

      return res.json({
        success: true,
        message: "Feedback status updated.",
        feedback,
      });
    } catch (error) {
      console.error("Update status error:", error);

      return res.status(500).json({
        message: "Unable to update feedback status.",
      });
    }
  }
);

/* =========================================
   ERROR HANDLER
   ========================================= */

app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found.",
  });
});

/* =========================================
   START SERVER AND CONNECT DATABASE
   ========================================= */

async function startServer() {
  const jwtSecret = process.env.JWT_SECRET;
  const adminId = process.env.ADMIN_ID;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const mongoUri = process.env.MONGODB_URI;

  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error(
      "JWT_SECRET must be set to a secret string of at least 32 characters."
    );
  }

  if (!adminId || !adminPassword || adminPassword.length < 12) {
    throw new Error(
      "Set ADMIN_ID and an ADMIN_PASSWORD of at least 12 characters in .env."
    );
  }

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from .env.");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected successfully.");

  const existingAdmin = await Admin.findOne({ adminId });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    await Admin.create({
      adminId,
      passwordHash,
    });

    console.log(`Initial administrator "${adminId}" created.`);
  } else {
    console.log("Existing administrator account found.");
  }

  app.listen(PORT, () => {
    console.log(`ProcessMind backend running at http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start ProcessMind:", error.message);
  process.exit(1);
});