import {
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import userPool from "../auth/userPool";

export const login = async (credentials) => {
  const { email = "", password = "" } = credentials || {};
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const register = async (userData) => {
  const { email = "", name = "", password = "" } = userData || {};
  const attributeList = [
    new CognitoUserAttribute({ Name: "email", Value: email }),
    new CognitoUserAttribute({ Name: "name", Value: name }),
  ];
  return new Promise((resolve, reject) => {
    userPool.signUp(name, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ result, needsVerification: true });
      }
    });
  });
};

export const confirmRegistration = (name, code) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: name,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const logout = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: userData.name,
      Pool: userPool,
    });

    user.signOut((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}