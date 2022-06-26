import db from '../../db/config';

export default <T>(tablename: string) => ({
  findAll: (): Promise<T[]> => db.query(`SELECT * FROM ${tablename}`),
  findById: (id: number): Promise<T> =>
    db.one(`SELECT * FROM ${tablename} WHERE id = $1`, id),
  destroy: (id: number): Promise<null> =>
    db.none(`DELETE FROM ${tablename} WHERE id = $1`, id),
});
