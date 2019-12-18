export class Message {
    public time: string;
    public messageType: string;
    public message: string;
    public isBot: boolean;
    constructor(time: string, messageType: string, message: string, isBot: boolean) {
        this.time = time;
        this.messageType = messageType;
        this.message = message;
        this.isBot = isBot;
    }
}
