export class Product {
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
