import sqlite from './sqlite/sqlite';
import create from './dataGenerator'

//let CryptoJS = require("crypto-js");
let secret = "Younner";

class DataProvider {

  generateKey(key){
    return key;
  }

  User ={
      _logged: false,
      logged: function () {
          return this._logged;
      },
      login: function () {
          this._logged = true;
      },
      logout: function () {
          this._logged = false;
      }
    };

  async store(key, value){
      let success = false;
      let sql = "";
      let generatedKey = this.generateKey(key);
      try {
          if (await this.exists(key)) {
              sql = "UPDATE data SET data=? WHERE key = ?";
          } else {
              sql = "INSERT INTO data(data, key) VALUES (? , ?)";
          }
          let process = await new Promise((resolve) => {
              sqlite.transaction(tx => {
                  tx.executeSql(
                      sql,
                      [value.toString(), generatedKey.toString()],
                      (_, success) => {
                          resolve(true);
                      }, (_, error) => {
                          console.log(error);
                          resolve(false);
                      }
                  );
              });
          });
          if (process) {
              success = true;
          }
      }catch (e){
          console.log(e);
      }
      return success;
  }

  async erase(key){
      let success = false;
      let sql = "";
      try {
          if (this.exists(key)) {
              key = this.generateKey(key);
              sql = "DELETE FROM data WHERE key = ?";
              let process = await new Promise((resolve) => {
                  sqlite.transaction(tx => {
                      tx.executeSql(
                          sql,
                          [key.toString()],
                          () => {
                              resolve(true);
                          }, () => {
                              resolve(false);
                          }
                      );
                  });
              });
              if (process) {
                  success = true;
              }
          }else{
              success = true;
          }
      }catch (e){
          console.log(e);
      }
      return success;
  }

  async retrieve(key){
      let data = false;
      let sql = "";
      try {
          if (this.exists(key)) {
              key = this.generateKey(key);
              sql = "SELECT * FROM data WHERE key = ?";
              let process = await new Promise((resolve) => {
                  sqlite.transaction(tx => {
                      tx.executeSql(
                          sql,
                          [key.toString()],
                          (_, success) => {
                              if(success.rows._array.length===0){
                                  resolve(false);
                              }else{
                                  resolve(success.rows._array[0].data);
                              }
                          }, () => {
                              resolve(false);
                          }
                      );
                  });
              });
              if (process) {
                  data = process;
              }
          }else{
              data = false;
          }
      }catch (e){
          console.log(e);
      }
      return data;
  }

  async exists(key){
      let keyExists = false;
      try {
          let sql = "SELECT * FROM data WHERE key=?";
          let process = await new Promise((resolve) => {
              sqlite.transaction(tx => {
                  tx.executeSql(
                      sql,
                      [this.generateKey(key).toString()],
                      (_, success) => {
                          resolve(success);
                      }, (_, error) => {
                          throw 'Erro!';
                      }
                  );
              });
          });
          if(process.rows.length>0){
              keyExists = true;
          }
      }catch (e){
          console.log(e);
      }
      return keyExists;
  }

  async deleteAll(){
      let deleted = false;
      try {
          let sql = "DELETE FROM data";
          let process = await new Promise((resolve) => {
              sqlite.transaction(tx => {
                  tx.executeSql(
                      sql,
                      [],
                      (_, success) => {
                          resolve(success);
                      }, (_, error) => {
                          throw 'Erro!';
                      }
                  );
              });
          });
          if(process.rows.length>0){
              deleted = true;
          }
      }catch (e){
          console.log(e);
      }
      return deleted;
  }

  async createSQLite() {
    await create();
  }
}

export let data = new DataProvider();