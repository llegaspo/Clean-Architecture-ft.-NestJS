export class Category {
  private constructor(
    private readonly categoryId: number | null,
    private categoryName: string,
  ) {}

  static create(props: { name: string }): Category {
    if (!props.name.trim()) throw new Error('Category name cannot be empty');

    return new Category(null, props.name);
  }

  static reconstitute(props: { id: number; name: string }) {
    return new Category(props.id, props.name);
  }

  update(props: { name?: string }): void {
    if (props.name !== undefined) {
      if (!props.name.trim()) throw new Error('Category name cannot be empty');
      this.categoryName = props.name;
    }
  }

  delete(props: { hasAssignedProducts: boolean }) {
    if (props.hasAssignedProducts)
      throw new Error(
        'Cannot delete category as it is still assigned to a product/s',
      );
  }

  get id(): number | null {
    return this.categoryId;
  }

  get name(): string {
    return this.categoryName;
  }
}
