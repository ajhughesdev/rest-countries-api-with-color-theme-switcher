import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

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
      </Head>
      <body>
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
                  <div className={styles.countryInfo}>
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
      </body>
    </div>
  );
}
