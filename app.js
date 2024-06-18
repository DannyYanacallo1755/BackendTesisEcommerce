const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoute = require('./routes/user.routes');
const ToDoRoute = require('./routes/todo.router');
const FoodRoute = require('./routes/food.routes');
const ProductRoute = require('./routes/product.routes');

const app = express();

const dbUri = 'mongodb+srv://danny:danny_123@cluster0.8yp9gqt.mongodb.net/probando?retryWrites=true&w=majority';

mongoose.set('strictQuery', true); // Configuración de strictQuery

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error al conectar a MongoDB Atlas:", err));

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", UserRoute);
app.use("/api/todos", ToDoRoute);
app.use("/api/foods", FoodRoute);
app.use("/api/products", ProductRoute);

// Añadir esta ruta para el endpoint raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de E-commerce');
});

module.exports = app;
