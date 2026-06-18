export class Category {
  private constructor(
    private readonly categoryId: number | null,
    private categoryName: string,
  ) {}

  static create(props: { name: string }): Category {
    if (!props.name.trim()) throw new Error('Category name cannot be empty');

    return new Category(null, props.name);
  }

  static reconstiture(props: { id: number; name: string }) {
    return new Category(props.id, props.name);
  }

  update(props: { name: string }): void {
    if (!props.name.trim()) this.categoryName = props.name;
  }

  get id(): number | null {
    return this.categoryId;
  }

  get name(): string {
    return this.categoryName;
  }
}
