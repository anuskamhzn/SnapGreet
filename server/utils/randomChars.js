import crypto from 'crypto';

export const generateRandomChars = () => {
  const randomString = crypto.randomBytes(4).toString('hex'); // Generate random string
  const randomNumber = Math.floor(Math.random() * 10000); // Generate random number
  return `${randomString}${randomNumber}`;
};

