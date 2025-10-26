# Shopping MERN Product Store

Modern CRUD demo that couples an Express/MongoDB API with a Vite + React + Chakra UI frontend. Use it to explore how a lightweight product catalog can support create, list, update, and delete flows end-to-end in the MERN stack.

![Product grid screenshot](./Screenshot%202025-04-15%20022232.png)

## Features
- **Full CRUD API** – `GET/POST/PUT/DELETE /api/products` implemented with Express, Mongoose models, and structured error handling.
- **Mongo-backed data model** – Product schema stores `name`, `price`, `image`, plus automatic timestamps.
- **Responsive UI** – React Router pages styled with Chakra UI, color-mode toggle, and toast notifications for user feedback.
- **Inline editing** – Each card opens a modal to update data and syncs changes immediately through Zustand.
- **Zero-refresh UX** – Local store mirrors API responses so product grids stay in sync after mutations.

## Tech Stack
- **Backend:** Node.js, Express 4, Mongoose 8, native MongoDB driver (legacy 2.2.12 compatibility), dotenv.
- **Frontend:** React 18, Vite 5, Chakra UI, React Router 6, Zustand, React Icons.
- **Tooling:** Nodemon, cross-env (for Windows-friendly env vars), ESLint, Vite preview/build pipeline.

## Project Structure
```text
shoppingmernproject/
├── backend/              # Express API + Mongo connection
│   ├── config/db.js
│   ├── controllers/product.controller.js
│   ├── models/product.model.js
│   ├── routes/product.route.js
│   └── server.js
├── frontend/             # Vite React app
│   ├── src/
│   │   ├── components/   # Navbar, ProductCard
│   │   ├── pages/        # HomePage, CreatePage
│   │   └── store/        # Zustand product store
│   └── vite.config.js
├── package.json          # Root scripts (installs both sides, starts API)
└── Screenshot ... .png   # Sample UI capture
```

## Prerequisites
- Node.js ≥ 18 (LTS recommended). If you prefer older Node 14/16, keep the legacy MongoDB driver pinned to 2.2.12 as provided.
- npm ≥ 8.
- MongoDB Atlas cluster or local MongoDB instance.

## Installation
```bash
# Install backend/root deps (express, mongoose, etc.)
npm install

# Install frontend deps
npm install --prefix frontend
```

## Environment Variables
Create a `.env` next to `backend/server.js` (project root works because `dotenv` loads from `process.cwd()`):

```ini
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

> **Heads-up for Windows shells:**  
> Use `npx cross-env NODE_ENV=development ...` or install `win-node-env` (`npm install -g win-node-env`) so the `NODE_ENV=...` scripts defined in `package.json` work correctly.

## Running the App

### Local development
Run the API (nodemon) and the Vite dev server in separate terminals:

```bash
# Terminal 1 – backend on http://localhost:5000
npx cross-env NODE_ENV=development nodemon backend/server.js
# or simply: npm run dev

# Terminal 2 – frontend on http://localhost:5173
npm run dev --prefix frontend
```

During development the React app proxies API calls to `http://localhost:5000/api/products` (configure `vite.config.js` if you need a custom proxy).

### Production build
```bash
npm run build      # installs deps and builds the frontend into frontend/dist
npm run start      # serves frontend/dist and the API from Express (PORT default 5000)
```

## API Reference

| Method | Endpoint              | Body (JSON)                                | Description                         |
|--------|-----------------------|--------------------------------------------|-------------------------------------|
| GET    | `/api/products`       | –                                          | Fetch all products.                 |
| POST   | `/api/products`       | `{ "name": "Hat", "price": 25, "image": "https://..." }` | Create a product (all fields required). |
| PUT    | `/api/products/:id`   | Same as POST body                           | Update product by Mongo `_id`.      |
| DELETE | `/api/products/:id`   | –                                          | Remove product by Mongo `_id`.      |

Responses share the shape `{ success: boolean, data?: any, message?: string }`. Validation failures and invalid ObjectIds return `400/404`, unexpected errors return `500`.

## Frontend Routes
- `/` – Fetches products on mount, renders responsive grid, provides edit/delete actions plus empty-state CTA.
- `/create` – Form for adding a product; uses Chakra inputs + Zustand action, and displays toast feedback.

## Troubleshooting & Tips
- If API requests from Vite fail with CORS errors, ensure both servers run locally or configure a reverse proxy when deploying.
- The legacy `mongodb@2.2.12` dependency is only needed if you must match the tutorial. When upgrading Node, consider removing it and letting Mongoose manage connections.
- Run `npm run lint --prefix frontend` to enforce React lint rules; adjust `.eslintrc.cjs` as needed.

Happy hacking! Feel free to extend the schema, add authentication, or integrate a real image uploader to push the demo further.
