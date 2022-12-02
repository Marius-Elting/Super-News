import { useState } from "react";
import { useEffect } from "react";

import NewsElement from '../components/NewsElement';

function HomePage() {
    const [country, setCountry] = useState("de");
    const [news, setnews] = useState([]);
    const [error, setError] = useState();
    const [search, setSearch] = useState();
    const [sort, setSorting] = useState("relevancy");
    const [api, setapi] = useState(`https://newsapi.org/v2/top-headlines?country=${country}&sortBy=${sort}&apiKey=a44950ea0b844b928c2605c2d8c45b4f`);
    const [searchTerm, setSearchTerm] = useState("country");


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


    }, [country, api, sort]);

    const sortFunction = (value) => {
        if (searchTerm === "country") {
            console.log("A " + value);
            setapi(`https://newsapi.org/v2/top-headlines?country=${country}&sortBy=${value}&apiKey=a44950ea0b844b928c2605c2d8c45b4f`);
            console.log(api);
        }
        if (searchTerm === "search") {
            console.log("B " + value);
            setapi(`https://newsapi.org/v2/everything?q=${search}&from=2022-12-01&sortBy="${value}"&apiKey=a44950ea0b844b928c2605c2d8c45b4f`);
            console.log(api);

        }
    };

    return (
        <main>
            <div className="headerDiv">
                <h1>Super News</h1>
                <div><input onChange={(e) => setSearch(e.target.value)} placeholder="Search"></input>
                    <button onClick={(e) => { setapi(`https://newsapi.org/v2/everything?q=${search}&from=2022-12-01&sortBy="${sort}"&apiKey=a44950ea0b844b928c2605c2d8c45b4f`); setSearchTerm("search"); }}>Search</button>
                </div>
                <select onChange={(e) => { setSorting(e.target.value); sortFunction(e.target.value); }}>
                    <option value={`relevancy`}>Funktioniert noch nicht</option>
                    <option value={`relevancy`}>Relevancy</option>
                    <option value={`popularity`}>Popularity</option>
                    <option value={`PublishedAt`}>PublishedAt</option>
                </select>
                <select onChange={(e) => { setCountry(e.target.value); setapi(`https://newsapi.org/v2/top-headlines?country=${e.target.value}&sortBy=${sort}&apiKey=a44950ea0b844b928c2605c2d8c45b4f`); setSearchTerm("country"); }}>
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
        </main >
    );
}

export default HomePage;