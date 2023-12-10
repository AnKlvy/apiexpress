var express = require('express');
var router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', (req, res) => {
  res.send('Hello')
});

router.get('/jsonex', (req, res) => {
  try{
  const data = {
    title: 'Какой-то title',
    message: 'Какой-то message',
  };
  res.json(data)
} catch(err){
  console.error(err.message);
}
});

router.get('/params', (req, res) => {
  try {
  res.send(req.query);
} catch (error) {
  console.error(error.message);
}
});

router.post('/save', async (req, res) => {
  try {
    // Получение текущих данных из localStorage (если они там есть)
    const existingData = JSON.parse(localStorage.getItem('saveddata')) || [];

    // Добавление новых данных к существующим
    const newData = req.body;
    existingData.push(newData);

    // Обновление данных в localStorage
    localStorage.setItem('saveddata', JSON.stringify(existingData));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;