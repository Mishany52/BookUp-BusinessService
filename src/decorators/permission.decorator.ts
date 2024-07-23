import { SetMetadata } from '@nestjs/common';

export const permission = (permission: string) => SetMetadata('permission', permission);
