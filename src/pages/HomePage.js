import { useState } from "react";
import { useEffect } from "react";

import NewsElement from '../components/NewsElement';

function HomePage() {
    const [country, setCountry] = useState("de");
    const [news, setnews] = useState([]);
    const [api, setapi] = useState(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=a44950ea0b844b928c2605c2d8c45b4f`);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        console.log("in useeffect");
        fetch(api)
            .then(res => res.json())
            .then((data) => {
                // console.log(data);
                setnews(data.articles);
                setError("");
                console.log(data.articles);
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
                <div><input onChange={(e) => setSearch(e.target.value)} placeholder="Search"></input>
                    <button onClick={(e) => { setnews([]); setapi(`https://newsapi.org/v2/everything?q=${search}&from=2022-12-01&sortBy=popularity&apiKey=a44950ea0b844b928c2605c2d8c45b4f`); setnews([]); }}>Search</button>
                </div>

                <select onChange={(e) => { setCountry(e.target.value); setapi(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=a44950ea0b844b928c2605c2d8c45b4f`); }}>
                    <option value="de" >Germany</option>
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