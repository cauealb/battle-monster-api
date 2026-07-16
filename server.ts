import { app } from "./app.ts";

app.listen({
    port: 1212,
    host: '0.0.0.0'
}).then(() => console.log("Servidor iniciado com sucesso!")).catch((err) => console.log(err))