export class Account {
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
