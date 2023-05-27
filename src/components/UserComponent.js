import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useAuth } from '../contexts/AuthContext';
import userService from '../service/userService';

const UserComponent = () => {
    const [usersList, setUsersList] = useState();
    const { currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (!currentUser) {
            history.push("/login");
        }
        const getUsers = async() => {
            try {
                const response = await userService.getUsers();
                setUsersList(response.data);
                console.log(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }

        getUsers();
    }, []);

    return (
        usersList
            ? (
                <div>
                    {
                        usersList.map((val, key) => {
                            return <p key={key}>{val.username}</p>
                        }) 
                    }
                </div>
            )
            : (<></>)

    );
}

export default UserComponent;