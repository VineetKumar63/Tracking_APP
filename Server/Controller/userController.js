const connection = require("../Model/connect.js");

const userSignup = async (req, res) => {
    try {
        const sqlQuery = "insert into userdetails set? "
        let data = req.body;
        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error inserting data" });
            }
            else {
                return res.status(200).json(result);
            }
        })
    } catch (error) {
        console.log("error found...", error)
    }
}
const userSignin = async (req, res) => {
    try{
         const sqlQuery =  'select count(*) as user from userdetails where mobile = ?'
         const mobile = req.params.mobile
         await connection.query(sqlQuery, mobile, function(error, result){
            if(error){
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error getting data" });
            }
            else {
                return res.json(result[0]);
            }
         })
        } catch (error) {
            console.log("error found...", error)
        }
}

module.exports = {userSignup, userSignin}