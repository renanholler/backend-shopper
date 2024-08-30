import 'dotenv/config';
import mongoose from 'mongoose';
import server from './server';

mongoose
  .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/shopper')
  .then(() => {
    server.listen(process.env.PORT || 80, () => {
      console.log(`Server is running on port ${process.env.PORT || 80}`);
    });
  })
  .catch(() => console.log('Erro ao conectar ao MongoDB'));
