import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import { errorHandler, notFoundHandler } from './middleware/error.handler';
import { swaggerSpec } from './middleware/swagger';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/task`);
});

