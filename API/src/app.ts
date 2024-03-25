import express from 'express';
import gitRoutes from './routes/gitroutes'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/git', gitRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
