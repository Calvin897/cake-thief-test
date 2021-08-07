// This question was broken into two parts.
//Part 1 is my refactored code for the problem
// part 2 is some of my original code to display my thinking and how I got to the solution
//I also created a series of test variables that test for different variabes as well as outliers

// Create Cake Class
class Cake {
  constructor(weight, value) {
    (this.weight = weight), (this.value = value);
  }
}

//TEST INPUTS ////////////////////////////////////
// TEST INPUTS 1 constraint 20
const cakeOne = new Cake(7, 160);
const cakeTwo = new Cake(3, 90);
const cakeThree = new Cake(2, 15);

// TEST INPUT 2/////////////////////////
// const cakeOne = new Cake(2, 1);
// const cakeTwo = new Cake(3, 2);
// const cakeThree = new Cake(7, 5);
// const cakeFour = new Cake(1, 1);

// TEST INPUT 3 carrying constraint 7/////////////////////
// const cakeOne = new Cake(2, 3);
// const cakeTwo = new Cake(3, 6);
// const cakeThree = new Cake(6, 14);
// const cakeFour = new Cake(6, 1);
// const cakeFive = new Cake(7, 1);
// const cakeSix = new Cake(8, 1);

//TEST INPUT 4//////ACCOUNT FOR ZERO VAUES
// const cakeOne = new Cake(2, 3);
// const cakeTwo = new Cake(3, 6);
// const cakeThree = new Cake(5, 1);
// const cakeFour = new Cake(6, 1);
// const cakeFive = new Cake(7, 0);
// const cakeSix = new Cake(0, 1);
// const cakeOne = new Cake(30, 100);

// create an array of the objects///
cakeArr = [cakeOne, cakeTwo, cakeThree];

/////////////////////////////////////////////////////
// REfactored Code

let maxProfitArr = [];
let cakeMix = [];
const maxDuffelBagValue = (cakeArr, carryWeight) => {
  let i;
  //Remove objects with an values or weights of 0 or less
  const removeZeroFromArr = cakeArr.filter(a => a.value > 0 && a.weight > 0);

  //Create an array of values only
  const valueArr = removeZeroFromArr.map(a => a.value);

  //Create an array of weights only
  const weightArr = removeZeroFromArr.map(a => a.weight);

  //Calculate the % each cake makes out of the total amount able to be carried
  const weightPercentage = weightArr.map(x => (x / carryWeight) * 100);

  //calculate the most valuable cake cake based on price * weight%
  const mostValuedCake = weightPercentage.map((value, i) => {
    return (100 / value) * valueArr[i];
  });

  //Get the position of the most valuable cake
  i = mostValuedCake.indexOf(Math.max(...mostValuedCake));
  console.log(mostValuedCake);
  console.log(i);

  // calculate the max amount of cakes with the highest value you can carry
  const totalNumberOfCakes = carryWeight / weightArr[i];
  //Round to lowest integer
  const totalNumberOfCakesRounded = Math.floor(totalNumberOfCakes);

  //calculate total value of cakes based on number * price and then store that value in an arr
  maxProfitArr.push(totalNumberOfCakesRounded * valueArr[i]);

  //Store the weight of the most valuable cake and the individual weigh in an array
  cakeMix.push([totalNumberOfCakesRounded, weightArr[i]]);

  // Calculate if ther is any remaining space for another type of cake
  const remainingSpace = carryWeight - weightArr[i] * totalNumberOfCakesRounded;

  // filter to check if any cakes can fit in the remaining space
  const remainingCakes = removeZeroFromArr.filter(
    el => el.weight <= remainingSpace
  );

  // if there is remaining space, and additional cakes that fit in that space, then repeat original funciton
  if (remainingSpace > 0 && remainingCakes.length > 0) {
    maxDuffelBagValue(remainingCakes, remainingSpace);
  } else {
    totalProfit = maxProfitArr.reduce((a, b) => a + b, 0);
    cakeMakeup = cakeMix.map(
      el => `${el[0]} units of cake with a weight of ${el[1]}KG. `
    );
    console.log(cakeMix);
    console.log(cakeMakeup);
    console.log(`your max value is ${totalProfit} made up of ${cakeMakeup}`);
    //Reset array of funciton completes
    maxProfitArr = [];
    cakeMix = [];
  }
};

maxDuffelBagValue(cakeArr, 20);

//initial function/////////////////////////////////////////////
// Below is my initial code.
// I left it as is to demonstrate some of my thinking
//I tried splitting the function up into multiple smaller ones because I
// couldnt seem to work around my mistake of exiting the function if a cake is perfectly divisible

// const maxDuffelBagValue = (cakeArr, carryWeight) => {
//   // generate an arr of weights and values

//   //Final arr of max profit
//   const maxProfitArr = [];
//   let i;
//   //Extracing an array of prices and weights
//   const valueArr = cakeArr.map(a => a.value);
//   console.log(valueArr);
//   const weightArr = cakeArr.map(a => a.weight);
//   console.log(weightArr);

//   // create function here to calculate % on arrays
//   const mostValuedCake = calcWeightPercentage(weightArr, valueArr, carryWeight);
//   //   const calcWeightPercentage = () => {

//   //       // calculate the % each individual cake makes on the weight carried
//   //       const weightPercentage = weightArr.map(x => (x / carryWeight) * 100);

//   //       //calculate the most valued cake based on price * weight%
//   //       const mostValuedCake = weightPercentage.map((value, i) => {
//   //           return (100 / value) * valueArr[i];
//   //         });

//   i = mostValuedCake.indexOf(Math.max(...mostValuedCake));
//   console.log(mostValuedCake);
//   console.log(i);
//   // calculate the max amount of cakes with the highest value you can carry
//   const totalNumberOfCakes = carryWeight / weightArr[i];
//   const totalNumberOfCakesRounded = Math.floor(totalNumberOfCakes);
//   //calculate backwards for each cake stolen based on higest number stolen
//   console.log(totalNumberOfCakes);

//   //     }
//   // function ends here
//   console.log(totalNumberOfCakes, weightArr[i]);
//   console.log(carryWeight);
//   console.log(weightArr[i]);

//   // calculate final answer on perfectly divisable cake.
//   if (carryWeight % totalNumberOfCakes === 0) {
//     console.log(
//       `the highest profit you can get is ${mostValuedCake[i]} with exactly ${totalNumberOfCakes}`
//     );
//   }

//   //   //each rounds value gets pushed into this array
//   maxProfitArr.push(totalNumberOfCakesRounded * valueArr[i]);

//   const remainingSpace = [
//     carryWeight - weightArr[i] * totalNumberOfCakesRounded
//   ];

//   const remainingCakes = weightArr.filter(value => value <= remainingSpace);

//   console.log(remainingCakes);

//   let fillRemainingCakes;
//   //   // this deals with remaining space that can be filled by the next most valuable cake
//   if (remainingCakes.length > 0) {
//     const newPrice = [valueArr[i]];

//     fillRemainingCakes = calcWeightPercentage(
//       remainingCakes,
//       newPrice,
//       remainingSpace
//     );
//   }
//   console.log(fillRemainingCakes, maxProfitArr);
//   //     calcWeightPercentage(remainingCakes, remainingSpace, true);
//   //   console.log(remainingCakes, remainingSpace);

//   //   totalProfit = maxProfitArr.reduce((a, b) => a + b, 0);
//   //   console.log(totalProfit);
// };

// maxDuffelBagValue(cakeArr, 20);

//initial output 555 6 X cakeTwo + 1 cakeThree
