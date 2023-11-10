require('dotenv').config();
const {MongoClient} = require('mongodb')
const express = require('express');
const app = express();
const cors = require('cors');
const MongoDBclient = new MongoClient(`mongodb+srv://${process.env.DB_LINK}`)

app.use(cors());

app.use('/', async (req, res) => {
  try {
    await MongoDBclient.connect()
    console.log("Успешно подключились к базе данных")

    const AllDocuments = await MongoDBclient.db('Portfolio').collection('PortfolioWorks').find().toArray()
    res.json(AllDocuments)
    console.log(AllDocuments)

    await MongoDBclient.close()
    console.log("Закрыли подключение")
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(3001, () => {
  console.log('Application listening on port 3001!');
});