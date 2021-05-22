const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json()); //req.body

app.use(logger);

app.use((req, res, next) => {
  console.log('Authenticating...');
  next();
});

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course)
    return res.status(400).send('The course with given ID was not found');

  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If it is not existing, return 404
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course)
    return res.status(400).send('The course with given ID was not found');

  // Validate
  // If invalid, return 400 - bad request
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update course
  course.name = req.body.name;
  // Return updated course
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course)
    return res.status(400).send('The course with given ID was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.post();
// app.put();
// app.delete();
