import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL || '',
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  HEADLESS: process.env.HEADLESS === 'true'
};
