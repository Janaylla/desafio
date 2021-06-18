import * as jwt from "jsonwebtoken";
  export  const generateToken = (input:any): string => {
    const token = jwt.sign(
      {
        userName: input.userName
      },
      "senha qualquel",
      {
      }
    );
    return token;
}

export const getData = (token: string) => {
  const payload = jwt.verify(typeof(token)==="string"?token:"n", "senha qualquel") as any;
  const result = {
    userName: payload.userName
  };
  return result;
};