const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3]);
});

app.get('/api/posts/:year/:month', (req, res) => {
  res.send({ params: req.params, query: req.query });
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.post();
// app.put();
// app.delete();
