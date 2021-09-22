import { NextApiRequest, NextApiResponse } from 'next'
import { ISBNClient, Pricechecker } from '@fheutz/book-search';

export default async(req: NextApiRequest, res: NextApiResponse) => {
    const title = req.query.title as string
    const isbnClient = new ISBNClient();
    const pricechecker = new Pricechecker();
    const isbnReturn = await isbnClient.getFirstISBNByTitle(title)
    const hyphenatedIsbn = isbnClient.validateAndHyphenateIsbn(isbnReturn.isbn[0].identifier)
    const bestPrice = await pricechecker.getBestPriceByBookTitle(title)
    const data = {
          title: title,
          price: bestPrice.price,
          directlink: bestPrice.directLink,
          isbn: hyphenatedIsbn
        }
    console.log(data)
    console.log("test")
  res.status(200).json({ data })
}