export class createEventDto {
  name;
  description;
  location;
  online;
  maxNrOfPlayers;
  minTrustScore;
  gameIds;
  eventDateTimestamp;
  votingDeadlineTimestamp;
  confirmationDeadlineTimestamp;

  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.location = data.location;
    this.online = data.online;
    this.maxNrOfPlayers = data.maxNrOfPlayers;
    this.minTrustScore = data.minTrustScore;
    this.gameIds = data.gameIds;
    this.eventDateTimestamp = data.eventDateTimestamp;
    this.votingDeadlineTimestamp = data.votingDeadlineTimestamp;
    this.confirmationDeadlineTimestamp = data.confirmationDeadlineTimestamp;
  }
}
