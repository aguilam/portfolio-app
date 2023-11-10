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
    <main>
      {portfoliosInfo.map((portfolioInfo) => (
        <div key={portfolioInfo._id}>
          <h1>{portfolioInfo.name}</h1>
        </div>
      ))}
    </main>
  );
}
