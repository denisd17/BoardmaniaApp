export class RegisterDto {
    email;
    password;
    username;
    firstName;
    lastName;

    constructor(data) {
        this.email = data.email;
        this.password = data.password;
        this.username = data.username;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
    }
}