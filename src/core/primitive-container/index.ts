export class FrozenContainerError extends Error {}

export class PrimitiveContainer {
  private isFrozen: boolean;

  private container: Map<string, any>;

  public constructor() {
    this.container = new Map<string, any>();
    this.isFrozen = false;
  }

  public freeze() {
    this.isFrozen = true;
  }

  public get<T>(name: string): T {
    return this.container.get(name);
  }

  private throwIfFrozen() {
    if (this.isFrozen) {
      throw new FrozenContainerError('The container is frozen.');
    }
  }

  set(name: string, value: any) {
    this.throwIfFrozen();
    this.container.set(name, value);
    return this;
  }

  delete(name: string) {
    this.throwIfFrozen();
    this.container.delete(name);
    return this;
  }

  clear() {
    this.throwIfFrozen();
    this.container.clear();
    return this;
  }
}
