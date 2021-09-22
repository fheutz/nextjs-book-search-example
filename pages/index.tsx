
import { Component, useEffect, useState } from 'react';
import Head from 'next/head'
// const booksearch = require('@fheutz/book-search')
import { ISBNClient, Pricechecker } from '@fheutz/book-search'
export default function Home() {
  const [bestPrice, setBestPrice] = useState<number>(0);
  const [directLink, setDirectLink] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [input, setInput] = useState<string>("Ultralearning");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(true);
  const fetchData = async (title) => {
    setEmpty(false)
    setLoading(true)
    console.log("looking up")
    const res = await fetch("/api/" + title)
    const json = await res.json()
    setBestPrice(json.data.price)
    setDirectLink(json.data.directlink)
    setTitle(json.data.title)
    setIsbn(json.data.isbn)
    setLoading(false)

  }
  const handleChange = (event) => {
    setInput(event.target.value);
  }
  // 
  return (
    <div className="container">
      <Head>
        <title>Book-Search Showcase</title>
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
      </Head>
      <div className="card" style={{ width: '500px' , margin:'20px'}}>
        <div className="card-header">
          <div className="card-title h5">Book-Search</div>
        </div>
        <div className="card-body">
        <input className="form-input" type="text" value={input} onChange={handleChange} /><button className="btn" onClick={() => fetchData(input)}>SEARCH</button>
        <br />

        {
          empty ? <div>Please hit the search button to get some results</div> :
            loading ?
              <div>LOADING PLEASE WAIT</div> :
              <div>
                <table className="table">
                  <tbody>
                    <tr><td>Search Query:</td> <td>{title}</td> </tr>
                    <tr><td>ISBN:</td> <td>{isbn}</td> </tr>
                    <tr><td>Best Price:</td> <td>{bestPrice} €</td> </tr>
                    <tr><td>Offer Link: </td> <td><a target="_blank"  href={directLink}>Click Me!</a><br /></td> </tr>
                  </tbody>
                </table>
              </div>
        }
        </div>
      </div>
    </div>
  )
}
