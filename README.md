# Cache Management API

## Overview
This is a Node.js Express-based cache management API that allows users to store, retrieve, and delete cache entries with a configurable cache limit stored in MongoDB.

## Features
- Add cache entries with key-value pairs
- Retrieve cache data by key
- Delete cache entries by key
- Set and update the cache limit dynamically (maybe this could be enhanced to be accessed only by admin)

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Setup and Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Junaid-Mohamed/Customizable-Caching-API.git
   cd Customizable-Caching-API
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Create a `.env` file:**
   ```sh
   touch .env
   ```
   Add the following variables:
   ```env
   PORT=8080
   MONGO_URI=your-mongo-uri
   ```
4. **Start the server:**
   ```sh
   npm start
   ```
   The app should now be running on `http://localhost:8080`.

## API Endpoints

### 1. Set Cache Limit
**POST** `/settings/limit`
```json
{
  "limit": 5
}
```
_Response:_
```json
{
  "message": "Cache limit updated to 5"
}
```

### 2. Create Cache Entry
**POST** `/cache`
```json
{
  "key": "username",
  "value": "john_doe"
}
```
_Response:_
```json
{
  "message": "Cache created successfully."
}
```

### 3. Get Cache by Key
**GET** `/cache/:key`
_Response:_
```json
{
  "key": "username",
  "value": "john_doe"
}
```

### 4. Delete Cache by Key
**DELETE** `/cache/:key`
_Response:_
```json
{
  "message": "Cache with key: 'username' deleted successfully"
}
```
