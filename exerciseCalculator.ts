interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (hours: Array<number>, target: number): ExerciseResults => {
  let periodLength = hours.length;
  let trainingDays = hours.filter( hour => hour > 0).length;

  let totalhours = hours.reduce( (total, current) => total += current);
  let average = totalhours/periodLength;

  let rating = 0
  if (trainingDays/periodLength > 0.7) rating += 1;
  if (average > 1.75) rating += 1;
  if (average > 2) rating += 1;
  let success = (rating >= target);

  let ratingDescription = "ooff this was a bad week";
  switch (rating) {
    case 1:
      ratingDescription = "great job for trying";
      break;
    case 2:
      ratingDescription = "you made your goal";
      break;
    case 3:
      ratingDescription = "wow, you are killing it this week";
      break;
    default:
  }
  console.log(ratingDescription);
  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  }
}

// console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))

interface MultipleValues {
  array: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>): MultipleValues => {
  args = args.slice(2)
  if (args.length < 2) throw new Error('Not enough arguments');
  // if (args.length > 8) throw new Error('Too many arguments');

  args.forEach((arg: string) => {
    if (isNaN(Number(arg))) throw new Error('Provided values were not numbers!');
  });
  let argsNumber = args.map( (arg: string) => Number(arg));
  console.log(argsNumber);

  return {
    target: argsNumber[0],
    array: argsNumber.slice(1)
  }
}

const checkExerciseArguments = (daily_exercises: Array<number>, target: number) => {
  if(!daily_exercises || !target) {
    throw new Error('Not enough arguments');
  }

  daily_exercises.forEach((arg: number) => {
    if (isNaN(Number(arg))) throw new Error('Provided values were not numbers!');
  });

  if (isNaN(Number(target))) throw new Error('Provided values were not numbers!');
}


// try {
//   const { target, array } = parseExerciseArguments(process.argv);
//   console.log(exerciseCalculator(array, target))
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }

export {parseExerciseArguments, checkExerciseArguments, exerciseCalculator};
