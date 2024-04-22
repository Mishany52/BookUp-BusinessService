import { Logger } from '@nestjs/common';

export class SSOLogger extends Logger {
    constructor(title?: string) {
        super(title ?? process.env.API_NAME);
    }
}
