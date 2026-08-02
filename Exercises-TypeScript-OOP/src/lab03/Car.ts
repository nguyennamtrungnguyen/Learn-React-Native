export class Car {
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
