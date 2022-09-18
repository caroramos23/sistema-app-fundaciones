import pool from '../database/database';
class TipoDAO {

    public async listarTipos() {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " SELECT cveTipo, tipoFundacion FROM tbl_tipo WHERE estatus = ? ", [1]);
        });
        return result;
    }
}
const dao = new TipoDAO();
export default dao;