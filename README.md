
# 🎬 Movie Catalog API

An Express + TypeScript API for managing a movie catalog with PostgreSQL and Sequelize. This API allows you to create, update, delete, and fetch movies and categories, with proper validation, error handling, and a clean architecture using OOP principles.

---

## 🛠️ Technologies Used
- **Language:** TypeScript
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Environment Variables:** dotenv
- **Validation:** Zod (or Joi if preferred)
- **Architecture:** Hexagonal (Ports and Adapters)
- **OOP:** Classes, Interfaces, and SOLID Principles

---

## 📂 Project Structure
```
src/
├── application/        # Use Cases - Business logic
│   ├── services/       # Service classes for business operations
│   ├── dto/            # Data Transfer Objects
│   ├── interfaces/     # Application-level interfaces (ports)
├── domain/             # Core Domain
│   ├── entities/       # Domain models (classes, interfaces)
│   ├── repositories/   # Repository interfaces (ports)
│   ├── exceptions/     # Domain-specific exceptions
├── infrastructure/     # Adapters & Infrastructure
│   ├── api/            # Express routes and controllers
│   ├── db/             # Database connection and repositories (adapters)
│   ├── validation/     # Validation schemas
│   ├── middleware/     # Express middleware
│   ├── config/         # Environment and configuration files
├── shared/             # Shared utilities (e.g., logger, error handling)
├── index.ts            # Entry point - Express app setup
├── package.json
├── tsconfig.json
```

---

## 📦 Environment Variables (`.env`)
```bash
DB_CONTAINER_NAME=movie_db
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=my_secret_password
DB_NAME=movies_db
DB_DIALECT=postgres

API_CONTAINER_NAME=movies-api
API_IMAGE_NAME=web-api:1.0.0
API_HOST=http://localhost
API_PORT=3000
API_CLIENT_URL=http://localhost:3000
```

---

## 🏗️ Database Models

### 🎥 Movie
| Field          | Type         | Description                         |
| -------------- | ------------ | ----------------------------------- |
| `id`           | INTEGER (PK) | Unique identifier                   |
| `title`        | STRING       | Movie title                         |
| `description`  | TEXT         | Movie description                   |
| `categoryId`   | INTEGER (FK) | Reference to `Category`             |
| `createdAt`    | DATE         | Record creation date                |
| `updatedAt`    | DATE         | Record update date                  |

---

### 📂 Category
| Field          | Type         | Description                         |
| -------------- | ------------ | ----------------------------------- |
| `id`           | INTEGER (PK) | Unique identifier                   |
| `name`         | STRING       | Category name                       |
| `createdAt`    | DATE         | Record creation date                |
| `updatedAt`    | DATE         | Record update date                  |

---

## 📋 API Endpoints

### 🎥 Movie Endpoints
- **POST** `/api/movies` - Create a new movie
- **GET** `/api/movies/:id` - Get movie details by ID
- **GET** `/api/movies` - Get a paginated list of movies (filter by title/category)
- **PUT** `/api/movies/:id` - Update a movie
- **DELETE** `/api/movies/:id` - Delete a movie

---

### 📂 Category Endpoints
- **POST** `/api/categories` - Create a new category
- **GET** `/api/categories` - Get all categories
- **GET** `/api/categories/:id` - Get category details by ID
- **PUT** `/api/categories/:id` - Update a category
- **DELETE** `/api/categories/:id` - Delete a category (only if no movies are linked)

---

## ✅ Validations
- **Required Fields:** Ensure required fields are present.
- **Data Types:** Validate types (string, number, etc.).
- **Constraints:** Unique, non-null constraints.

---

## 🔄 Pagination and Filtering
- **Movies:** Supports pagination with `page` and `limit` query params.
- **Filtering:** Filter movies by `title` or `categoryId`.

---

## ⚠️ Error Handling
- **404:** Resource not found.
- **400:** Validation errors.
- **500:** Internal server errors.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/HouseCham/express-api.git
cd express-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Migrations
```bash
npx sequelize-cli db:migrate --config src/infrastructure/config/config.js
```

### 4. Run tests
```bash
npm run test
```

### 5. Build project
```bash
npm run build
```

### 6. Start the Server for DEV or PRODUCTION
```bash
npm run dev
```
or
```bash
npm run start
```

Server will run at: [http://localhost:3000](http://localhost:3000)

---