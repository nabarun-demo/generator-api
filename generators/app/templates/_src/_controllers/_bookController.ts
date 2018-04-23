import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book';
import axios from 'axios';
import { validate } from 'class-validator';
import { resolve } from 'path';

class bookController {
  constructor() {}

  getAllBooks(req: Request, res: Response, next: NextFunction) {
    axios
      .get('http://localhost:5000/book')
      .then(function(response) {
        // console.log(response);
        res
          .status(200)
          .json({ message: 'Get all books!', books: response.data });
      })
      .catch(function(error) {
        // console.log(`From remote server: ${error}`);
        res.status(500).json({ message: 'Error while getting books' });
      });
  }

  addBook(req: Request, res: Response, next: NextFunction) {
    let book = new Book(
      req.body.title,
      req.body.author,
      parseInt(req.body.year),
      parseInt(req.body.pages)
    );

    // console.log(book);
    validate(book, { validationError: { target: false } }).then(errors => {
      if (errors.length > 0) {
        res.status(500).json({ message: 'Validation error', errors: errors });
      } else {
        axios
          .post('http://localhost:5000/book', book)
          .then(function(response) {
            // console.log(response);
            res
              .status(201)
              .json({ message: 'Book added!', book: response.data });
          })
          .catch(function(error) {
            // console.log(`From remote server: ${error}`);
            res.status(500).json({ message: 'Error while adding book' });
          });
      }
    });
  }
}

export default new bookController();
