import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import gameService from "../service/gameService";
import "../styles/games-page.css";
import GameCard from "./GameCard";
import { Button } from "react-bootstrap";
import TopSection from "./TopSection";

const GamesComponent = () => {
    const [games, setGames] = useState([]);
    const { currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (!currentUser) {
            history.push("/login");
        }
        const getGames = async () => {
            try {
                const response = await gameService.getGames();
                setGames(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getGames();
    }, []);

    const handleSeeMore = (game) => {
        history.push(`/games/${game.id}`)
    }

    return (
        <>
            <TopSection />
            <div className="main-container">
                <div className="btn-container">
                    <Button className="btn-success" onClick={() => history.push(`games/addGame`)}> Add Game </Button>
                </div>
                <div className="titles-container">
                    <div className="div-name">Name</div>
                    <div className="div-desc">Description</div>
                    <div className="div-details">Min Players</div>
                    <div className="div-details">Max Players</div>
                    <div className="div-details">URL</div>
                </div>
                {games.map((val, key) => {
                    return <GameCard game={val} key={key} handleSeeMore={handleSeeMore} />
                })}
            </div>
        </>
    )
};

export default GamesComponent;