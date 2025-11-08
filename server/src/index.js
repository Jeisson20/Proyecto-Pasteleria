import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import productsRoutes from "./routes/products.routes.js";
import ordersRoutes from "./routes/orders.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Servir imágenes subidas
app.use("/uploads", express.static("uploads"));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productsRoutes);
app.use("/api", ordersRoutes);

app.listen(3000)