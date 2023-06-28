# Live Selling Show API

This project provides the API for a live selling show platform, allowing for inventory management and live sales updates.

## Getting Started

These instructions will get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v16 or and above)
- npm (v8 and above)

### Installing

To install the dependencies, run the following command in the project root directory:

```
npm install
```

### Running the Application

To start the application, run:

```
npm start
```

This will start the server, typically on `localhost:3000`. You can interact with the API using any HTTP client such as curl, Postman, insomnia etc.

### API Documentation

Once the server is running, you can view the Swagger UI and interact with the API documentation at the `/documentation` route. So if you're running the server locally, you would go to `http://localhost:3000/documentation` in your web browser.

### Running the Tests

This project uses Jest for unit testing. To run the tests, use:

```
npm test
```

You should see output indicating the pass/fail status of each test and overall test suite.

## API Endpoints

- `POST /inventory`: Add or update inventory items.
- `POST /show/{showID}/buy_item/{itemID}`: Buy a single item during a show.
- `GET /show/{showID}/sold_items/{itemID?}`: Get the number of sold items by show and optionally by item.

## Built With

- Node.js
- Hapi.js
- Joi
- Swagger (for API Documentation)

## Author
Nwoko Lawrence Ndubueze

