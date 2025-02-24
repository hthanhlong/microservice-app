import * as bcrypt from 'bcrypt'; // we have using import * if facing issue not undefinded of a lib
import { plainToInstance } from 'class-transformer';

export async function getSalt(): Promise<string> {
  try {
    const SALT_ROUNDS: number = 10;
    const salt = bcrypt.genSalt(SALT_ROUNDS);
    return salt;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function checkPassword(
  password: string,
  hashedPassword: string,
  salt: string,
): Promise<boolean> {
  const x: string = await bcrypt.hash(password, salt);
  return x === hashedPassword;
}

export async function hashedPasswordFunc(
  password: string,
  salt: string,
): Promise<string> {
  return await bcrypt.hash(password, salt);
}

export const getVerifyCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export function mapResponseToDto<T>(data: any, dto: new () => T): T {
  return plainToInstance(dto, data, {
    excludeExtraneousValues: true,
  });
}
