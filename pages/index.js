import React, { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";

export function ToggleColorTheme() {
  const root = document.documentElement;
  const buttonText = document.querySelector(".button-text");

  if (root.getAttribute("color-theme") === "light") {
    root.setAttribute("color-theme", "dark");
    buttonText.textContent = "Light Mode";
  } else {
    root.setAttribute("color-theme", "light");
    buttonText.textContent = "Dark Mode";
  }
}

export async function getServerSideProps() {
  const resp = await fetch(`https://restcountries.com/v2/all`);

  return {
    props: {
      countries: await resp.json(),
    },
  };
}

export default function Home({ countries }) {
  const [filter, setFilter] = useState("");

  const filteredCountries = useMemo(
    () =>
      countries.filter((c) =>
        c.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, countries]
  );

  return (
    <div>
      <Head>
        <title>Rest Countries API</title>
        <meta
          name="description"
          content="Frontendmentor.io challenge solution by Andrew J Hughes"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <h1>Where in the world?</h1>
        <button onClick={ToggleColorTheme}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.8426 11.052C7.73486 11.052 5.21543 8.74226 5.21543 5.89457C5.21543 4.82024 5.57343 3.82526 6.18514 3C3.75229 3.75612 2 5.86498 2 8.35045C2 11.4708 4.75943 14 8.16286 14C10.8743 14 13.1757 12.3945 14 10.1636C13.1 10.7238 12.0129 11.052 10.8426 11.052Z"
              fill="white"
              stroke="currentColor"
            />
          </svg>
          <span className="button-text">Light Mode</span>
        </button>
      </header>
      <main>
        <input
          type="text"
          className="search"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search for a country..."
          value={filter}
        />
        <div className="desktopGrid">
          {filteredCountries.map((c) => (
            <article key={c.alpha3Code}>
              <Link href={`/countries/${c.alpha3Code}`}>
                <a>
                  <div
                    className="countryFlag"
                    style={{ backgroundImage: `url(${c.flags.svg})` }}
                  ></div>
                  <h2 className="countryName">{c.name}</h2>
                  <ul className="countryInfo">
                    <li>
                      <span>Population:</span> {c.population.toLocaleString()}
                    </li>
                    <li>
                      <span>Region:</span> {c.region}
                    </li>
                    <li>
                      <span>Capital:</span> {c.capital}
                    </li>
                  </ul>
                </a>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
