// Interfaces base
export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRepository<T extends IEntity> {
  findAll(options?: { page?: number; pageSize?: number }): Promise<{ data: T[]; count: number }>;
  findById(id: string): Promise<T | null>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
