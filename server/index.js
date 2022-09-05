const express = require("express");
const app = express();
const port = 3001;
const AuthRouter = require("./routes/auth");
const PayrollRouter = require("./routes/payroll");
const DashboardRouter = require("./routes/dashboard");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
process.env.TOKEN_SECRET;

app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/auth", AuthRouter);
app.use("/api/payroll", PayrollRouter);
app.use("/api/dashboard", DashboardRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});