import express from 'express';
import { calculateBmi, parseArguments } from "./calculateBmi";
import { calculator } from './calculator';
const app = express();

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
}

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  const result = calculator(value1, value2, op);
  res.send(result);
});

  res.send({
    weight: height,
    height: weight,
    bmi: bmi
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
