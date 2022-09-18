import pool from '../database/database';
class RegistroDAO {

    public async listarRegistros() {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " SELECT * FROM tbl_usuario");
        });
        return result;
    }
}
const dao = new RegistroDAO();
export default dao;