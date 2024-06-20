// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoute = require('./routes/user.routes');
const ToDoRoute = require('./routes/todo.router');
const FoodRoute = require('./routes/food.routes');
const ProductRoute = require('./routes/product.routes');
const WishlistRoute = require('./routes/wishlist.routes'); // Add wishlist routes
const CartRoute = require('./routes/cart.routes'); // Add cart routes

const app = express();

const dbUri = 'mongodb+srv://danny:danny_123@cluster0.8yp9gqt.mongodb.net/probando?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error al conectar a MongoDB Atlas:", err));

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", UserRoute);
app.use("/api/todos", ToDoRoute);
app.use("/api/foods", FoodRoute);
app.use("/api/products", ProductRoute);
app.use("/api/wishlist", WishlistRoute); // Use wishlist routes
app.use("/api/cart", CartRoute); // Use cart routes

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
