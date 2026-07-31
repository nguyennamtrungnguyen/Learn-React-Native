// Import
import Person = require("./lab01/Person");
import { Student } from "./lab02/Student";
import { Car } from "./lab03/Car";
import { Rectangle } from "./lab04/Rectangle";
import { BankAccount } from "./lab05/BankAccount";

// --- Lap 01 ---
// 1. Create a class Person with attributes name and age. Write a method to display this information.
console.log("--- Test Lap 01 ---");
const person = new Person.Person("Nguyen Nam Trung Nguyen", 21);
person.display();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 02 ---
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
console.log();
console.log("--- Test Lab 02 ---");
const student = new Student("Nguyen Nam Trung Nguyen", 21, "A");
student.display();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 03 ---
// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
console.log();
console.log("--- Test Lab 03 ---");
const car = new Car("Mercedes", "Maybach SL 680", 2024);
car.ShowCarInfo();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 04 ---
// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
console.log();
console.log("--- Test Lab 04 ---");
const rectangle = new Rectangle(3, 4);
console.log(`Area: ${rectangle.area()}`);
console.log(`Perimeter: ${rectangle.perimeter()}`);

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 05 ---
// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
console.log();
console.log("--- Test Lab 04 ---");

const bankAccount = new BankAccount(1000000);
console.log("So tien ban dau:", bankAccount.balance);
let nap = 200000;
console.log("Nap tien:", nap);
bankAccount.deposit(nap);
console.log("Money current:", bankAccount.balance);

let rut = 900000;
console.log("Rut tien:", rut);
bankAccount.withdraw(rut);
console.log("Money current:", bankAccount.balance);
