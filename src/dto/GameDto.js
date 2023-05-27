export class GameDto {
    name;
    minNumberOfPlayers;
    maxNumberOfPlayers;
    description;
    url;

    constructor(data) {
        this.name = data.name;
        this.minNumberOfPlayers = data.minNumberOfPlayers;
        this.maxNumberOfPlayers = data.maxNumberOfPlayers;
        this.description = data.description;
        this.url = data.url;
    }
}