import React from "react";
import Head from "next/head";
import Link from "next/link";
import { ToggleColorTheme } from "..";
import { whereAlpha3 } from "iso-3166-1";

export async function getServerSideProps({ params }) {
  const resp = await fetch(
    `https://restcountries.com/v2/alpha/${params.alpha3Code}`
  );

  return {
    props: {
      country: await resp.json(),
    },
  };
}

export default function Country({ country }) {
  return (
    <>
      <Head>
        <title>{country.name}</title>
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
      <nav>
        <Link href="/">
          <a className="backButton">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.81802 3.6967L6.87868 4.75736L3.3785 8.25754H16.7428L16.7428 9.74246H3.3785L6.87868 13.2426L5.81802 14.3033L0.514719 9L5.81802 3.6967Z"
                fill="currentColor"
              />
            </svg>
            <span>Back</span>
          </a>
        </Link>
      </nav>
      <main>
        <div
          className="flag"
          style={{ backgroundImage: `url(${country.flags.svg})` }}
        ></div>
        <h1 className="h1Country">{country.name}</h1>
        <ul className="singleCountryInfo">
          <li>
            <span>Native Name:</span> {country.nativeName}
          </li>
          <li>
            <span>Population:</span> {country.population.toLocaleString()}
          </li>
          <li>
            <span>Region:</span> {country.region}
          </li>
          <li>
            <span>Sub Region:</span> {country.subregion}
          </li>
          <li>
            <span>Capital:</span> {country.capital}
          </li>
        </ul>
        <ul className="singleCountryInfoContinued">
          <li>
            <span>Top Level Domain:</span> {country.topLevelDomain}
          </li>
          <li>
            <span>Currencies:</span>{" "}
            {country.currencies?.map((c) => c.name).join(", ")}
          </li>
          <li>
            <span>Languages:</span>{" "}
            {country.languages?.map((c) => c.name).join(", ")}
          </li>
        </ul>
        <h2 className="borderCountries">Border Countries:</h2>
        <ul className="borders">
          {country.borders?.map((border) => {
            return (
              <li key={border}>
                <Link
                  href="/countries/[alpha3Code]"
                  as={`/countries/${border}`}
                >
                  <a>{whereAlpha3(border).country}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
