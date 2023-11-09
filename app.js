const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require("./src/routes/user.routes");


app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});