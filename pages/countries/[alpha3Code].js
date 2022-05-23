import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Country.module.css";

export default function Country() {
  const {
    query: { alpha3Code },
  } = useRouter();

  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function getCountry() {
      const resp = await fetch(
        `https://restcountries.com/v2/alpha/${alpha3Code}`
      );
      setCountry(await resp.json());
    }
    if (alpha3Code) {
      getCountry();
    }
  }, [alpha3Code]);

  if (!country) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{country.name}</title>
      </Head>
      <Link href="/">
        <a className={styles.backButton}>
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
      <h2>{country.name}</h2>
    </>
  );
}
