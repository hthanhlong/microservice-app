import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

export async function getSalt(): Promise<string> {
  const SALT_ROUNDS: number = 10;
  const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
  return salt;
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
