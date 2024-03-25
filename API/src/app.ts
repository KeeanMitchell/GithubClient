import express from 'express';
import gitRoutes from './routes/gitroutes'

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/git', gitRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
