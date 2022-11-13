var ketnoi = require("./Pool");
var ketqua = async (sql)=>{
    const client = await ketnoi.connect();
    var rs;
    try{
        await client.query('BEGIN')
        try {
            rs = await client.query(sql);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
            }
    }finally
    {
        client.release();
    }
    return rs;
}
module.exports= ketqua;
