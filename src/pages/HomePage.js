import { useState } from "react";
import { useEffect } from "react";

import NewsElement from '../components/NewsElement';

function HomePage() {
    const [country, setCountry] = useState("de");
    const [news, setnews] = useState([]);
    useEffect(() => {
        console.log("in useeffect");
        fetch(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=8375701374204f1191e896c2d22c8309`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setnews(data.articles);
            });


    }, []);
    console.log(news);
    return (
        <main>
            <h1>Super News</h1>
            <select>
                <option value="de" onChange={() => setCountry("de")}>Germany</option>
                <option value="us" onChange={() => setCountry("us")}>America</option>
            </select>
            <div className="newsWrapper">
                {news.map((newsElement) => {
                    console.log(newsElement);
                    return (<NewsElement {...newsElement} />
                    );
                })}
            </div>
        </main>
    );
}

export default HomePage;