import expres from "express";
import employeesRouters from "./router/employes.router.js";
import indexRouter from "./router/index.router.js";
import { PORT } from "./config.js"

const app = expres();

app.use(expres.json());
app.use("/api", employeesRouters);
app.use(indexRouter);

app.use((req, res, next) => {
  res.status(400).json({
    massage: "not found",
  });
});

app.listen(PORT);
console.log(`Server running port ${PORT}`);
