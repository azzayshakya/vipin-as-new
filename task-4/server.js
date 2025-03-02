const express = require("express");
const cors = require("cors");
const tasksRoutes = require("./routes/tasks");

const app = express();

app.use(express.json()); 
app.use(cors()); 

app.use("/api/tasks", tasksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
