import bcrypt from 'bcrypt';

export function excludeFields<T, Key extends keyof T>(
  obj: T,
  keys: Key[],
): Omit<T, Key> {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
}

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
