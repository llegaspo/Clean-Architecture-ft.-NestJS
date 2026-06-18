export class Product {
  private constructor(
    private readonly productId: string | null,
    private productName: string,
    private productPrice: number,
    private productStock: number,
    private productCategoryId?: number,
  ) {}

  static create(props: {
    name: string;
    price: number;
    stock: number;
    categoryId?: number;
  }): Product {
    if (!props.name.trim()) throw new Error('Product name cannot be empty');
    if (props.price < 0) throw new Error('Product price cannot be negative');
    if (props.stock < 0) throw new Error('Product stock cannot be empty');

    return new Product(
      null,
      props.name,
      props.price,
      props.stock,
      props.categoryId,
    );
  }

  static reconstitute(props: {
    productId: string;
    name: string;
    price: number;
    stock: number;
    categoryId?: number;
  }): Product {
    return new Product(
      props.productId,
      props.name,
      props.price,
      props.stock,
      props.categoryId,
    );
  }
  update(props: {
    name?: string;
    price?: number;
    stock?: number;
    categoryId?: number;
  }): void {
    if (props.name !== undefined) this.productName = props.name;
    if (props.price !== undefined) this.productPrice = props.price;
    if (props.stock !== undefined) this.productStock = props.stock;
    if (props.categoryId !== undefined)
      this.productCategoryId = props.categoryId;
  }

  get id(): string | null {
    return this.productId;
  }

  get name(): string {
    return this.productName;
  }

  get price(): number {
    return this.productPrice;
  }

  get stock(): number {
    return this.productStock;
  }

  get categoryId(): number | undefined {
    return this.productCategoryId;
  }
}
