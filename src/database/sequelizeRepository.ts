import { Model, ModelStatic, FindOptions, WhereOptions,Attributes } from 'sequelize' 

export class SequelizeRepository<T extends Model> {
  private model: ModelStatic<T>

  constructor(model: ModelStatic<T>) {
    this.model = model
  }

  async findOne(filter: WhereOptions): Promise<T> {
    const record = await this.model.findOne({ where: filter })

    if (!record) {
      const error = new Error('Record not found') as any
      error.name = 'NotFoundError'
      error.status = 404
      throw error
    }

    return record
  }

  async findById(id: number | string, options: FindOptions = {}): Promise<T> {
    const record = await this.model.findByPk(id, options)

    if (!record) {
      const error = new Error('Record not found') as any
      error.name = 'NotFoundError'
      error.status = 404
      throw error
    }

    return record
  }

  async create(data: object): Promise<T> {
    return await this.model.create(data as any)
  }

  async delete(id: Attributes<T>['id']): Promise<void> {
    const deletedCount = await this.model.destroy({ where: { id } })

    if (!deletedCount) {
      const error = new Error('Record not found') as any
      error.name = 'NotFoundError'
      error.status = 404
      throw error
    }
  }

  async update( id: Attributes<T>['id'], data: object): Promise<void> {
    const [updatedCount] = await this.model.update(data, { where: { id } })

    if (!updatedCount) {
      const error = new Error('Record not found') as any
      error.name = 'NotFoundError'
      error.status = 404
      throw error
    }
  }

  async findAll(
    filter: WhereOptions,
    limit?: number,
    offset?: number,
    sortValue?: string,
    sorted?: boolean
  ): Promise<T[]> {
    return await this.model.findAll({
      where: filter,
      offset,
      limit,
      order: sorted && sortValue ? [[sortValue, 'DESC']] : undefined,
    })
  }
  async findAllWithUser(
  model:ModelStatic<T>,
  param:string,
  filter: WhereOptions,
  limit?: number,
  offset?: number,
  sortValue?: string,
  sorted?: boolean,
): Promise<(T & { user?: { username: string } })[]> {
  return await this.model.findAll({
    where: filter,
    offset,
    limit,
    order: sorted && sortValue ? [[sortValue, 'DESC']] : undefined,
    include: [{
      model: model,
      attributes: [param]
    }]
  });
}
}
module.exports = SequelizeRepository