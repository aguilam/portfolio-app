'use client'
import { useState, useEffect } from "react";
import { MongoClient, Collection, Document } from "mongodb";

export default function Home() {
  const [portfoliosInfo, setPortfolioInfo] = useState<Document[]>([]); 

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        let response = await fetch('http://localhost:3001/');
        let data = await response.json();
  
        setPortfolioInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPortfolioData();
  }, []); 

  return (
    <main className=" flex flex-row min-h-screen min-w-full">
      {portfoliosInfo.map((portfolioInfo) => (
        <div key={portfolioInfo._id} className=" bg-gray-500 max-w-xs max-h-96 m-3 border-2 border-white ">
          <img src={portfolioInfo.coverURL} alt="" className=""/>
          <p className="">{portfolioInfo.name}</p>
          <p className="">{portfolioInfo.description}</p>
          <div className=" flex flex-row">
            {portfolioInfo.tags.map((portfolioTag : string) => (
              <div key={portfolioTag} className=" flex flex-row">
                <p>{portfolioTag}</p>
              </div>
            ))}
            <a href={portfolioInfo.github}>Link to github</a>
          </div>
        </div>
      ))}
      <div className=" absolute bottom-0 right-0 max-h-16 w-16">
         <button className="h-16 w-16 bg-blue-500 border rounded-full">

         </button>
      </div>
    </main>
  );
}
