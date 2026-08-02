export class User {
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
