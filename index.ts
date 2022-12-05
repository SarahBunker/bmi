import express from 'express';
import { calculateBmi, parseArguments } from "./calculateBmi";
import { exerciseCalculator, checkExerciseArguments} from './exerciseCalculator';
const bp = require('body-parser')
const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  let queryString = req.query;
  let strings = Object.values(queryString);

  let bmi = ""
  let height = 0;
  let weight = 0;

  try {
    let obj = parseArguments(strings as Array<string>);
    height = obj["height"]
    weight = obj["weight"]
    bmi = (calculateBmi(height, weight))
  } catch (error: unknown) {
    let errorMessage = 'malformatted parameters'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

  res.send({
    weight: height,
    height: weight,
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  console.log(daily_exercises, target)
  // console.log(req)
  // parseExerciseArguments([]);
  let result;
  try {
    checkExerciseArguments(daily_exercises, target);
    result = exerciseCalculator(daily_exercises, target)

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(400);
    res.send(errorMessage)
  }

    // throw new Error('BROKEN')
    // res.statusCode(500)
    // res.statusMessage(errorMessage)




  // const result = calculator(value1, value2, op);
  // res.send(result);
  res.send(result);
});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
