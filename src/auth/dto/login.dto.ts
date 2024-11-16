export class LoginDto {
    readonly usernameOrEmail: string;
    readonly password: string;

    constructor(usernameOrEmail: string, password: string) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }
}