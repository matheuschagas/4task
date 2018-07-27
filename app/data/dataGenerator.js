import sqlite from './sqlite/sqlite'


function truncate() {

}

function createDatabase() {
    return new Promise((resolve)=>{
        let sql = "create table IF NOT EXISTS data(key text, data text);";
        sqlite.transaction(tx => {
            tx.executeSql(
                sql,
                [],
                (_, success) => {
                    resolve(true);
                }, (_, error) => {
                    console.log(error);
                    resolve(false);
                }
            );
        }, (err)=>{
            console.log(err);resolve(false);

        });
    });
}

let create = async () => {
  // Get version
  let version = 0;
  if (version && version.length > 0)
    return;

  //truncate();
    await createDatabase();
};

export default create
