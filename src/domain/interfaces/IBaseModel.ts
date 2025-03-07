/**
 * @interface IBaseModel
 * @description Interface for Base Model
 * @template T - Generic type
 * @method create - Create record 
 * @method update - Update record by its ID
 * @method delete - Sets deletedAt field to current date
 * @method findById - Find record by its ID
 * @method findAll - Find all records
 */
export interface IBaseModel<T> {
    create(data: T): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
}