import express from 'express';

import routes from './routes/index';
import { PORT } from './config';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

app.use('/api', routes);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
