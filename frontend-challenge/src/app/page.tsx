"use client";

import Link from "next/link";
import React from "react";

const HomePage = () => {
  const pages = [
    { name: "People", description: "Find out information about the characters.", link: "/people" },
    { name: "Films", description: "Explore the movies of the franchise.", link: "/films" },
    { name: "Planets", description: "Explore detailed information about the planets.", link: "/planets" },
    { name: "Starships", description: "Discover starships featured in the SW universe.", link: "/starships" },
    { name: "Vehicles", description: "Find out about different vehicles of the franchise.", link: "/vehicles" },
    { name: "Species", description: "Find out about the different species and races of the SW universe.", link: "/species" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Star Wars Encyclopedia</h1>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link
              href={page.link}
              key={page.name}
              className="group block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 group-hover:text-blue-600 mb-2">
                  {page.name}
                </h2>
                <p className="text-gray-600">{page.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="text-center mt-12 text-gray-600">
        <p>
          Powered by <a href="https://swapi.dev/" className="text-blue-500 underline">SWAPI</a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
