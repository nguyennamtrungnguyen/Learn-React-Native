// Import
import Person = require("./lab01/Person");
import { Student } from "./lab02/Student";
import { Car } from "./lab03/Car";
import { Rectangle } from "./lab04/Rectangle";
import { BankAccount } from "./lab05/BankAccount";
import { Book } from "./lab06/Book";
import { User } from "./lab07/User";
import { Product } from "./lab08/Product";

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
console.log("--- Test Lab 05 ---");

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

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 06 ---
// 6. Create a class Book with attributes title, author, year
console.log();
console.log("--- Test Lab 06 ---");
const book = new Book(
  "Effort is always rewarded",
  "Nguyen Nam Trung Nguyen",
  2026,
);
book.display();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 07 ---
// 7. Write a class User with private property name and getter/setter
console.log();
console.log("--- Test Lab 07 ---");
const user = new User("Nguyen Nam Trung Nguyen");
console.log(user.getName());
user.setName("Trung Nguyen");
console.log(user.getName());

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 08 ---
// 8. Create a Product class with name, price. Create an array of products and filter products with price > 100
console.log();
console.log("--- Test Lab 08 ---");
const products: Product[] = [
  new Product("Laptop", 5500),
  new Product("Mobile phone", 2500),
  new Product("Mouse", 22500),
  new Product("Keyboard", 12500),
  new Product("Keyboard", 30),
];
console.log("Cach 1");
const expensiveProducts = products.filter((product) => product.price > 100);
console.log(expensiveProducts);

console.log("Cach 2");
const product = new Product("", 0);
product.filterProduct(products);
