# shopping_cart
# Shopping Cart Application

A full-stack shopping cart app built with **Node.js**, **Express**, **MongoDB**, **JWT** (backend) and **React.js**, **Axios**, **React Router** (frontend).

---

## Features

### Backend
- **User Authentication:** Register and login with JWT protection.
- **Products API:** Protected route to fetch products.
- **Cart API:** Add and view cart items, protected by JWT.

### Frontend
- **Login/Register Pages**
- **Products Page:** Fetches products from [fakestoreapi.in](https://fakestoreapi.in/api/products).
- **Add to Cart:** Add products to cart, cart count shown in Navbar.
- **Cart Page:** View all added items.

---

## API Endpoints

### User
- `POST /api/user/register` — Register a new user
- `POST /api/user/login` — Login and get JWT token

### Products & Cart (JWT required)
- `GET /api/home/products` — Fetch products
- `GET /api/home/products-cart` — Get cart items
- `POST /api/home/products-cart` — Add item to cart

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, JWT
- **Frontend:** React.js, Axios, React Router, Tailwind CSS

---

## Getting Started

### Backend

1. Install dependencies:
   ```
   npm install
   ```
2. Set up `.env` file with your MongoDB URI and JWT secret.
3. Start the server:
   ```
   npm run dev
   ```

### Frontend

1. Install dependencies:
   ```
   npm install
   ```
2. Start the React app:
   ```
   npm run dev
   ```

---

## Folder Structure

- `/Backend` — Node.js/Express API
- `/Frontend` — React.js client

---

## Notes

- All cart and products routes are protected; include JWT in the `Authorization` header.
- Products are fetched from [fakestoreapi.in](https://fakestoreapi.in/api/products).
- Cart items are stored per user in MongoDB.

---

## Author

- [sohel-Abbasi](https://github.com/sohel-Abbasi)
