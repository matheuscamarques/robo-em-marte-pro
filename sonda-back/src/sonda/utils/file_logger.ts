import { Logger } from '@nestjs/common';
import * as fs from 'fs';
export class FileLogger {
    private static readonly logFile: string = './log.txt';
    private static logger = new Logger()
    public static log(message: string) {
        // make file if not exist
        if (!fs.existsSync(FileLogger.logFile)) {
            fs.writeFileSync(FileLogger.logFile, '');
        }

        fs.appendFileSync(this.logFile, message + "\n");
        this.logger.log(message);
    }
}