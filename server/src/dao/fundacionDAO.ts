import pool from '../database/database';

class FundacionDAO {

    public async listar(cveUsuario: number) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                "SELECT f.cveFundacion, f.nombreFundacion, f.descripcion, f.tipoFundacion, date_format(f.fechaFundacion, '%Y-%m-%d') as fechaFundacion,  concat_ws(' ', u.nombre, u.apellidos) as registro, u.cveUsuario as cveRegistro "+
                "FROM tbl_fundacion f "+
                "JOIN tbl_usuario u on f.cveRegistro = u.cveUsuario "+
                "WHERE cveRegistro = ?", [cveUsuario]);
        });
        return result;
    }

    public async insertar(fundacion: any) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " INSERT INTO tbl_fundacion SET ? ", [fundacion]);
        });
        return result;
    }

    public async actualizar(fundacion: any, cveFundacion: number) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " UPDATE tbl_fundacion SET ? WHERE cveFundacion = ? ", [fundacion, cveFundacion]);
        });
        return result;
    }

    public async eliminar(cveFundacion: number) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " DELETE FROM tbl_fundacion WHERE cveFundacion = ? ", [cveFundacion]);
        });
        return result;
    }

}
const dao = new FundacionDAO();
export default dao;