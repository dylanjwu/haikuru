import { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

const fetchHaikus = async (setHaikus) => {
    const resp = await axios.get('http://localhost:3001/');
    const { data } = resp

    const h = new Array(10).fill({}).map(() => data[0]);
    setHaikus(h);
}

const getHaikuPosts = (haikus) => {
    return haikus.map(({ text, email, username }) => 
        (<div className="haiku-post-box">
            <div className="post-top-box">
                <div>Author: {"Joe Shmo"}</div>
            </div>
            <div className="haiku-text">{text}</div>
            <div className="post-bottom-box">
                <span>Likes: {"0"}</span>
                <button className="like-button">Like</button>
                <span>Dislikes: {"0"}</span>
                <button className="dislike-button">Dislike</button>
            </div>
        </div>));
}

export const Feed = () => {

    const [haikus, setHaikus] = useState([]);

    useEffect(() => {
        fetchHaikus(setHaikus);
    }, []);

    const haikuInputArea = <div className="haiku-post-input"><textarea className="haiku-textarea"></textarea> <button>Post</button></div>;

    const haikusToDisplay = [haikuInputArea].concat(getHaikuPosts(haikus));

    return <div className="feed">{haikusToDisplay}</div>

};