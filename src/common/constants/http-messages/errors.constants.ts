export enum OwnerError {
    OWNER_CREATION_FAILED = "The owner didn't create",
    OWNER_NOT_UPDATE = "Owner doesn't update",
    OWNER_NOT_FOUND_BY_ID = "Owner doesn't find by id",
}

export enum AdminError {
    ADMIN_CREATION_FAILED = "The administrator didn't create",
    ADMIN_NOT_UPDATE = "Administrator doesn't update",
    ADMIN_NOT_FOUND_BY_ID = "Administrator doesn't find by id",
    ADMIN_NOT_FOUND_BY_BUSINESS_ID = "Administrator doesn't find by business id",
    ADMIN_OR_OWNER_ALREADY_CREATED = 'Administrator or owner has already created by these email and phone',
    EMAIL_IS_BUSY = 'the_email_is_busy',
    PHONE_IS_BUSY = 'the_phone_is_busy',
    ADMIN_DEACTIVATE_FAILED = "The administrator has't been deactivated",
}

export enum BusinessError {
    BUSINESS_ALREADY_CREATED = 'Business has already created by this properties',
    BUSINESS_NOT_FOUND = "Business hasn't been found",
    BUSINESS_NOT_CREATED = "Business hasn't been created",
}
export enum PointError {
    POINT_ALREADY_CREATED = 'Point has already created by this properties',
    POINT_NOT_FOUND = "Point hasn't been found",
    POINT_NOT_CREATED = "Point hasn't been created",
}
export enum TagError {
    TAG_NOT_FOUND = "Tag hasn't been found",
}
export enum SharedError {
    NOT_UPDATE = 'Object not update',
    NOTHING_UPDATE = "Object doesn't have any data for update",
}
