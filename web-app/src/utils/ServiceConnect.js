const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
// 

class ServiceConnect {
    // baseUrl defaults to the London based on
    constructor(apiKey, baseUrl = 'https://api.eu-gb.assistant.watson.cloud.ibm.com') {
        this.apiKey = apiKey;
    }
    returnWorkspaces(){
        // TODO: main/only method to just get and return the workspaces (store in the object as well)
    }
    authenticate(){
        // TODO: authenticate connect to instance
        const assistant = new AssistantV2({
          version: '2023-03-06',
          authenticator: new IamAuthenticator({
            apikey: this.apikey,
          }),
          serviceUrl: this.baseUrl,
          disableSslVerification: true,
        });

        this.assistant = assistant;
    }
}