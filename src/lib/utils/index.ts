import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { generateErrorMessage, ErrorMessageOptions } from "zod-error";

const salt = bcrypt.genSaltSync(10);

const options: ErrorMessageOptions = {
  delimiter: {
    error: " 🔥 ",
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};


export const getErrorMessageString = (result: z.SafeParseError<any>): string => {
    const errorMessage = generateErrorMessage(result.error.issues, options);
    return errorMessage;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, salt);
} 

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
}
