import {randomInt} from 'crypto'

export const generateRandomNumber = (length = 6) => {
  let password = '';
  for (let i = 0; i < length; i++) {
    password += randomInt(0, 10);
  }
  return password;
};
