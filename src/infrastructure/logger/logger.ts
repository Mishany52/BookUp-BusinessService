import { Logger } from '@nestjs/common';

export class APILogger extends Logger {
    constructor(title?: string) {
        super(title ?? process.env.API_NAME);
    }
}
