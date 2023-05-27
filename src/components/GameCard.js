import React from "react";
import { Button } from "react-bootstrap";
import "../styles/games-card.css";

const GameCard = (props) => {
    const { game, handleSeeMore } = props;
    return (
        <div className="card-container">
            <div className="name-container">{game.name}</div>
                <div className="description-container">{game.description}</div>
                {/* <div>Minimum Number Of Players: {game.minNumberOfPlayers}</div>
                <div>Maximum Number of Players: {game.maxNumberOfPlayers}</div>
                <div>Url: {game.url}</div> */}
                <div className="div-limit">{game.minNumberOfPlayers}</div>
                <div className="div-limit">{game.maxNumberOfPlayers}</div>
                <div className="div-limit">{game.url}</div>

        </div>
    );
};

export default GameCard;