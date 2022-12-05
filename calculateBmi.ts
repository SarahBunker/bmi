function calculateBmi(height:number, weight:number) {
  const heightm = height / 100;
  const bmi = weight / ( heightm * heightm);
  if (bmi < 16) return "Underweight - severe thinness";
  if (bmi < 16.9) return "Underweight - moderate thinness";
  if (bmi < 18.4) return "Underweight - mild thinness";
  if (bmi < 24.9) return "Normal range";
  if (bmi < 29.9) return "Overweight - pre-obese";
  if (bmi < 34.9) return "Obese - Class I";
  if (bmi < 39.9) return "Obese - Class II";
  return "Obese - Class III";
}

// console.log(calculateBmi(180, 74))

interface MultipleValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>) : MultipleValues => {
  // console.log("args", args)
  // args = args.slice(2)
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  args.forEach((arg: string) => {
    if (isNaN(Number(arg))) throw new Error('Provided values were not numbers!');
  });
  const argsNumber = args.map( (arg: string) => Number(arg));

  return {
    height: argsNumber[0],
    weight: argsNumber[1]
  };
};

// try {
//   const { height, weight } = parseArguments(process.argv.slice(2));
//   console.log(calculateBmi(height, weight))
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }

export { calculateBmi, parseArguments };
