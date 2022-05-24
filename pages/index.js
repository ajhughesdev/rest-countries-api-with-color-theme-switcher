import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

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

export default function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function getCountries() {
      const resp = await fetch("https://restcountries.com/v2/all");
      setCountries(await resp.json());
    }
    getCountries();
  }, []);

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
      <main className={styles.main}>
        {countries.map((c) => (
          <article className={styles.article} key={c.alpha3Code}>
            <Link href={`/countries/${c.alpha3Code}`}>
              <a>
                <div
                  className={styles.countryFlag}
                  style={{ backgroundImage: `url(${c.flags.svg})` }}
                ></div>
                <h2 className={styles.h2}>{c.name}</h2>
                <div className="countryInfo">
                  <p>
                    <span>Population:</span> {c.population.toLocaleString()}
                  </p>
                  <p>
                    <span>Region:</span> {c.region}
                  </p>
                  <p>
                    <span>Capital:</span> {c.capital}
                  </p>
                </div>
              </a>
            </Link>
          </article>
        ))}
      </main>
    </div>
  );
}
