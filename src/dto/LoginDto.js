export class LoginDto {
    email;
    password;
    grantType;

    constructor(data) {
        this.email = data.email;
        this.password = data.password;
        this.grantType = data.grantType;
    }
}