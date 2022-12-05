import express from 'express';
import { calculateBmi, parseArguments } from "./calculateBmi";
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
