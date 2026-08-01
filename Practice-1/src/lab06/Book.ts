export class Book {
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
