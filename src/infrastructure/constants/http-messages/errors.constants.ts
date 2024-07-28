export enum OwnerError {
    OWNER_CREATION_FAILED = "The owner didn't create",
    OWNER_NOT_UPDATE = "Owner doesn't update",
    OWNER_NOT_FOUND_BY_ID = "Owner doesn't find by id",
}

export enum AdminError {
    ADMIN_CREATION_FAILED = "The administrator didn't create",
    ADMIN_NOT_UPDATE = "Administrator doesn't update",
    ADMIN_NOT_FOUND_BY_ID = "Administrator doesn't find by id",
    ADMIN_OR_OWNER_ALREADY_CREATED = 'Administrator or owner has already created by these email and phone',
    EMAIL_IS_BUSY = 'the_email_is_busy',
    PHONE_IS_BUSY = 'the_phone_is_busy',
}

export enum BusinessError {
    BUSINESS_ALREADY_CREATED = 'Business has already created by this properties',
    BUSINESS_NOT_FOUND = "Business hasn't been found",
}
