
import Version from "./version";

let HttpService = {

    apiURL: Version.dev?'http://dev.4all.com:3003/':'http://dev.4all.com:3003/',

    extractGetParams: function (params){
        let extractedParams = '';
        for(let i=0; i<params.length; i++){
            if(i===0){
                extractedParams += "?";
                extractedParams += params[i].key+"="+params[i].value;
            }else{
                extractedParams += "&";
                extractedParams += params[i].key+"="+params[i].value;
            }
        }
        return extractedParams;
    },

    get: function(endpoint, params = [], toAPI = true){
        return new Promise((resolve)=>{
            try {
                let url = toAPI?(this.apiURL+ endpoint + this.extractGetParams(params)):endpoint;
                console.log(url);
                let headers = {};
                fetch(url, {headers: headers}).then((response) => response.json()).then((responseJson) => {
                    resolve(responseJson);
                }).catch((error) => {
                    console.log(url, headers);
                    throw error;
                });
            }catch(e){
                resolve(false);
            }
        });
    }
};

export default HttpService;