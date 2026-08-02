export class Account {
  public owner: string;
  private balance: number;
  readonly accountNumber: string;

  constructor(owner: string, balance: number, accountNumber: string) {
    ((this.owner = owner),
      (this.balance = balance),
      (this.accountNumber = accountNumber));
  }
}
