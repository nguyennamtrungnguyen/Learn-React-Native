export class BankAccount {
  constructor(public balance: number) {}

  deposit(amount: number): number {
    return (this.balance += amount);
  }
  withdraw(amount: number): number {
    return (this.balance -= amount);
  }
}
