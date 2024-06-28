import express from "express";
import cors from "cors";
import router from "./src/routes.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3002;

app.use(cors());
app.use(router);

app.get("/", (req, res) => {
    return res.json("hello world");
});

app.get("/users", (req, res) => {
    return res.json("teste usuário");
});


app.listen(port, () => {
    console.log('Servidor rodando na porta', port);
});


