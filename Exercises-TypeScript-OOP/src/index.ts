// --- Lap 01 ---
// 1. Create a class Person with attributes name and age. Write a method to display this information.
class Person {
  constructor(
    public name: string,
    public age: number,
  ) {}

  display(): void {
    console.log(`Name: ${this.name}`);
    console.log(`Age: ${this.age}`);
  }
}

console.log("--- Test Lap 01 ---");
const person = new Person("Nguyen Nam Trung Nguyen", 21);
person.display();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 02 ---
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
class Student extends Person {
  constructor(
    name: string,
    age: number,
    public grade: string,
  ) {
    super(name, age);
  }

  display(): void {
    super.display();
    console.log(`Grade: ${this.grade}`);
  }
}

console.log();
console.log("--- Test Lab 02 ---");
const student = new Student("Nguyen Nam Trung Nguyen", 21, "A");
student.display();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 03 ---
// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
class Car {
  constructor(
    public brand: string,
    public model: string,
    public year: number,
  ) {}

  ShowCarInfo(): void {
    console.log(`Brand: ${this.brand}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
  }
}

console.log();
console.log("--- Test Lab 03 ---");
const car = new Car("Mercedes", "Maybach SL 680", 2024);
car.ShowCarInfo();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 04 ---
// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
class Rectangle {
  constructor(
    public width: number,
    public height: number,
  ) {}

  area(): number {
    return this.width * this.height;
  }
  perimeter(): number {
    return (this.width + this.height) * 2;
  }
}

console.log();
console.log("--- Test Lab 04 ---");
const rectangle = new Rectangle(3, 4);
console.log(`Area: ${rectangle.area()}`);
console.log(`Perimeter: ${rectangle.perimeter()}`);

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 05 ---
// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
class BankAccount {
  constructor(public balance: number) {}

  deposit(amount: number): number {
    return (this.balance += amount);
  }
  withdraw(amount: number): number {
    return (this.balance -= amount);
  }
}

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
class Book {
  constructor(
    public title: string,
    public author: string,
    public year: number,
  ) {}

  display(): void {
    console.log(
      "Title",
      this.title,
      "| Author:",
      this.author,
      "| Year of publication:",
      this.year,
    );
  }
}

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
class User {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  //Getter
  public getName(): string {
    return this.name;
  }

  //Setter
  public setName(name: string): void {
    this.name = name;
  }
}

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
class Product {
  constructor(
    public name: string,
    public price: number,
  ) {}
  filterProduct(products: Product[]): void {
    const expensiveProducts = products.filter((product) => product.price > 100);
    console.log("List products with price > 100:");
    expensiveProducts.forEach((product) => {
      console.log(`Name: ${product.name}, Price: ${product.price}`);
    });
  }
}
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

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 09 ---
// 9. Define an interface Animal with name and method sound().
interface Animal {
  name: string;
  sound(): void;
}

class Dog implements Animal {
  constructor(public name: string) {}

  sound(): void {
    console.log("Woof! Woof!");
  }
}

class Cat implements Animal {
  constructor(public name: string) {}

  sound(): void {
    console.log("Meow! Meow!");
  }
}

console.log();
console.log("--- Test Lab 09 ---");
const dog = new Dog("Buddy");
const cat = new Cat("Kitty");

console.log(dog.name);
dog.sound();

console.log(cat.name);
cat.sound();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 10 ---
// 10. Create a class Account with public, private and readonly fields.
class Account {
  public owner: string;
  private balance: number;
  readonly accountNumber: string;

  constructor(owner: string, balance: number, accountNumber: string) {
    ((this.owner = owner),
      (this.balance = balance),
      (this.accountNumber = accountNumber));
  }

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited: ${amount} VNĐ`);
  }

  showInfo(): void {
    console.log("=== Account Information ===");
    console.log(`Owner: ${this.owner}`);
    console.log(`Account Number: ${this.accountNumber}`);
    console.log(`Balance: $${this.balance}`);
  }
}

console.log();
console.log("--- Test Lab 10 ---");
const account = new Account("Nguyen Nam Trung Nguyen", 10000000, "ACC001");
account.showInfo();
account.deposit(5000000);
account.showInfo();
account.owner = "Nguyen Van A";

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
class Annimal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dogs extends Annimal {
  bark(): void {
    console.log(`${this.name}: says Woof!`);
  }
}

class Cats extends Annimal {
  meow(): void {
    console.log(`${this.name}: says Meow!`);
  }
}

console.log();
console.log("--- Test Lab 11 ---");
const dogs = new Dogs("Su");
dogs.bark();
const cats = new Cats("Gold");
cats.meow();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.

interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Bird implements Flyable {
  fly(): void {
    console.log("Bird is flying");
  }
}

class Fish implements Swimmable {
  swim(): void {
    console.log("Fish is swimming");
  }
}

console.log();
console.log("--- Test Lap 12 ---");
const bird = new Bird();
bird.fly();

const fish = new Fish();
fish.swim();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 13. Create an abstract class Shape with method area(). Implement Square and Circle.

abstract class Shape {
  abstract area(): number;
}

class Square extends Shape {
  constructor(private side: number) {
    super();
  }

  area(): number {
    return this.side * this.side;
  }
}

class Circle extends Shape {
  constructor(private side: number) {
    super();
  }

  area(): number {
    return Math.PI * this.side * this.side;
  }
}
console.log();
console.log("--- Test Lap 13 ---");
const square = new Square(Math.floor(Math.random() * 11) + 20);
console.log("Square area: ", square.area());

const circle = new Circle(Math.floor(Math.random() * 11) + 20);
console.log("Circle area: ", circle.area());

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
class Employee {
  constructor(
    public name: string,
    public salary: number,
  ) {}

  work(): void {
    console.log(`${this.name} is working with the salary ${this.salary} $`);
  }
}

class Manager extends Employee {
  manageTeam(): void {
    console.log(
      `${this.name} is managing the team with the salary is: ${this.salary} $`,
    );
  }
}

class Developer extends Employee {
  writeCode(): void {
    console.log(
      `${this.name} is writing code with the salary is: ${this.salary} $`,
    );
  }
}

console.log();
console.log("--- Test Lap 14 ---");

const manager = new Manager("Nguyen", 2000);
manager.work();
manager.manageTeam();

const developer = new Developer("An", 1500);
developer.work();
developer.writeCode();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 15. Create a Library class that can store Book and User objects. Add method to add books.
class Book15 {
  constructor(
    public title: string,
    public name: string,
  ) {}
}

class User15 {
  constructor(public name: string) {}
}

class Library {
  private books: Book15[] = [];
  private users: User15[] = [];

  addBook(book: Book15): void {
    this.books.push(book);
  }

  addUser(user: User15): void {
    this.users.push(user);
  }

  getBooks(): Book15[] {
    return this.books;
  }

  getUsers(): User15[] {
    return this.users;
  }
}

console.log();
console.log("--- Test Lap 15 ---");
const library = new Library();

const book1 = new Book15("Clean Code", "Robert Martin");
const book2 = new Book15("Design Patterns", "GoF");

const user1 = new User15("Nguyen");
const user2 = new User15("An");

library.addBook(book1);
library.addBook(book2);

library.addUser(user1);
library.addUser(user2);

console.log("Books:", library.getBooks());
console.log("Users:", library.getUsers());

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 16. Create a generic class Box that can store any type of value.
class Box<T> {
  constructor(private value: T) {}
  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}
console.log();
console.log("--- Test Lap 16 ---");
const numberBox = new Box<number>(100);
console.log(numberBox.getValue());
numberBox.setValue(200);
console.log(numberBox.getValue());
const stringBox = new Box<string>("Hello");
console.log(stringBox.getValue());
const booleanBox = new Box<boolean>(true);
console.log(booleanBox.getValue());

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 17. Write a singleton Logger class that logs messages to console.
class Logger {
  private static instance: Logger;
  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }

  log(message: string): void {
    console.log(`Logs: ${message}`);
  }
}

console.log();
console.log("--- Test Lap 17 ---");
const logger = Logger.getInstance();
logger.log("Hello, My name is Nguyen");

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 18. Create a static class MathUtil with methods add(), subtract(), multiply(), divide().

class MathUtil {
  static add(a: number, b: number) {
    return a + b;
  }

  static subtract(a: number, b: number) {
    return a - b;
  }

  static multiply(a: number, b: number) {
    return a * b;
  }

  static divide(a: number, b: number) {
    if (b == 0) return;
    return a / b;
  }
}

console.log();
console.log("--- Test Lap 18 ---");
console.log(MathUtil.add(234, 235));
console.log(MathUtil.subtract(234, 23));
console.log(MathUtil.multiply(234, 235));
console.log(MathUtil.divide(234, 235));

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.

class Animal19 {
  greeting(): string {
    return `Hi`;
  }
}

class Cat19 extends Animal19 {
  greeting(): string {
    return `Hi, I am a Cat!`;
  }
}

class Dog19 extends Animal19 {
  greeting(): string {
    return `Hi, I am a Dog!`;
  }
}

console.log();
console.log("--- Test Lap 19 ---");
const cat19 = new Cat19();
console.log(cat19.greeting());
const dog19 = new Dog19();
console.log(dog19.greeting());

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 20. Write a Vehicle interface and implement it in Car and Bike classes.

interface Vehicle {
  run(): string;
}

class Car20 implements Vehicle {
  run() {
    return `This Car is running`;
  }
}

class Bike20 implements Vehicle {
  run() {
    return `This Bike is running`;
  }
}

console.log();
console.log("--- Test Lap 20 ---");
const car20 = new Car20();
console.log(car20.run());
const bike20 = new Bike20();
console.log(bike20.run());

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 21. Create a generic Repository class with methods add(), getAll().
class customerRepository<T> {
  data: T[];

  constructor() {
    this.data = [];
  }
}
console.log();
console.log("--- Test Lap 21 ---");
const repository = new customerRepository();
console.log(repository);

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 22. Create a class Stack with push, pop, peek, isEmpty methods.

console.log();
console.log("--- Test Lap 22 ---");

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 23. Create an interface Payment with method pay(amount). Implement CashPayment and CardPayment.

console.log();
console.log("--- Test Lap 23 ---");

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.

console.log();
console.log("--- Test Lap 24 ---");

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 25. Create a class Shape with a static method describe().

console.log();
console.log("--- Test Lap 25 ---");

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 26. Create a class Order with list of products. Add method to calculate total price.

console.log();
console.log("--- Test Lap 26 ---");
// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.

console.log();
console.log("--- Test Lap 27 ---");

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.

console.log();
console.log("--- Test Lap 28 ---");

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 29. Create an interface Movable with method move(). Implement it in Car and Robot.

console.log();
console.log("--- Test Lap 29 ---");

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// 30. Create a class School with list of Students and Teachers. Add method to display info.

console.log();
console.log("--- Test Lap 30 ---");
