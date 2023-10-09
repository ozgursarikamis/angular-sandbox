export class ProductSearch {
  public constructor(init?: Partial<ProductSearch>) {
    Object.assign(this, init);
  }

  ProductName: string | undefined;
}