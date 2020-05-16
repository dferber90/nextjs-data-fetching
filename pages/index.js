import * as React from "react";
import Head from "next/head";

const url = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:3000`;

export async function getServerSideProps() {
  const res = await fetch(`${url}/api/joke`);
  const joke = await res.json();

  return { props: { initialJoke: joke.text } };
}

export default function Home(props) {
  const [joke, setJoke] = React.useState(props.initialJoke);

  async function refresh() {
    const res = await fetch(`${url}/api/joke`);
    const body = await res.json();
    setJoke(body.text);
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js data fetching</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Next.js data fetching</h1>

        <p className="description">
          This example shows how to efficiently fetch data in Next.js
        </p>

        <div className="card">
          <h3>Dad says..</h3>
          <p>{joke}</p>
          <button type="button" onClick={() => refresh()}>
            Tell me another one
          </button>
        </div>
      </main>

      <style jsx>{`
        .container {
          margin: 2rem auto 0;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 45rem;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .card {
          width: 100%;
          margin: 1rem;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .card button {
          margin: 1rem 0 0 0;
          font-size: 1rem;
          border-radius: 10px;
          background-color: black;
          padding: 1rem;
          cursor: pointer;
          color: white;
        }

        .card button:hover {
          opacity: 0.8;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
