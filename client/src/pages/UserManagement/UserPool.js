import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_Bi0ehIOyy",
    ClientId: "1jbguqkap53ojo517ja53ktjo3"
}

export default new CognitoUserPool(poolData)