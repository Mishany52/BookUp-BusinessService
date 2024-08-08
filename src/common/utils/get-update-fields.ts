/* eslint-disable security/detect-object-injection */
import { UpdateAdminDto } from '@/api/http/controllers/dto/administrator/update-admin.dto';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SharedError } from '../constants/http-messages/errors.constants';
import { IAdministratorProps } from '../interface/administrator/administrator.interface';
import { IOwnerProps } from '../interface/owner/owner.interface';
import { IBusinessProps } from '../interface/business/business.interface';
import { isEmpty } from 'lodash';

export async function getUpdateFields(
    dto: IAdministratorProps | IOwnerProps | IBusinessProps,
    updateDto: UpdateOwnerDto | UpdateAdminDto,
): Promise<Partial<UpdateOwnerDto | UpdateAdminDto>> {
    const updatedFields = {};

    //Проверка на наличие хотя бы одного поля с данными
    if (
        Object.keys(updateDto).length === 0 ||
        !Object.keys(updateDto).some((key) => updateDto[key] !== undefined)
    ) {
        throw new HttpException(SharedError.NOT_UPDATE, HttpStatus.BAD_REQUEST);
    }

    //Собираем объект из полей, которые имеют новые данные для обновления
    for (const key in updateDto) {
        if (Object.prototype.hasOwnProperty.call(updateDto, key) && updateDto[key] !== dto[key]) {
            updatedFields[key] = updateDto[key];
        }
    }
    if (isEmpty(updatedFields)) {
        throw new HttpException(SharedError.NOTHING_UPDATE, HttpStatus.BAD_REQUEST);
    }
    return updatedFields;
}
