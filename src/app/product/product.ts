export class Product {
  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }

  ProductId: number = 0;
  ProductName: string = "";
  IntroductionDate: Date = new Date();
  Price: number = 0;
  Url: string = "";
  CategoryId: number = 0;
}
