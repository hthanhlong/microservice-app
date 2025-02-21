import { plainToInstance } from 'class-transformer';

export function mapResponseToDto<T>(data: any, dto: new () => T): T {
  return plainToInstance(dto, data, {
    excludeExtraneousValues: true,
  });
}
