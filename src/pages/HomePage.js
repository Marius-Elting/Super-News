import { useState } from "react";
import { useEffect } from "react";

import NewsElement from '../components/NewsElement';

function HomePage() {
    const [country, setCountry] = useState("de");
    const [news, setnews] = useState([]);
    const [api, setapi] = useState(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=8375701374204f1191e896c2d22c8309`);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("in useeffect");
        fetch(api)
            .then(res => res.json())
            .then((data) => {
                // console.log(data);
                setnews(data.articles);
                setError("");

                if (data.articles === undefined) {
                    setnews([]);
                    setError("Leider keine Suchergebnisse");
                }
            });


    }, [country, api]);

    return (
        <main>
            <div className="headerDiv">
                <h1>Super News</h1>
                <input onChange={(e) => { setnews([]); setapi(`https://newsapi.org/v2/everything?q=${e.target.value}&from=2022-12-01&sortBy=popularity&apiKey=8375701374204f1191e896c2d22c8309`); setnews([]); console.log(e.target.value); }} placeholder="Search"></input>
                <select onChange={(e) => { setCountry(e.target.value); setapi(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=8375701374204f1191e896c2d22c8309`); }}>
                    <option value="de">Germany</option>
                    <option value="us">America</option>
                    <option value="nl">Netherlands</option>
                </select>
                {/* <button onClick={}></button> */}
            </div>
            <div className="newsWrapper">
                {error}
                {news.map((newsElement) => {
                    return (<NewsElement {...newsElement} />
                    );
                })}
            </div>
        </main>
    );
}

export default HomePage;