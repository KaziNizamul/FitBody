import { CognitoUserPool } from "amazon-cognito-identity-js";

const PoolData = {
  UserPoolId: import.meta.env.VITE_USERPOOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

export default new CognitoUserPool(PoolData);