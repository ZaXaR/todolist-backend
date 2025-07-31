📝 Todolist Backend

A modular task management API built with NestJS and TypeScript. It features clean separation of concerns, Prisma ORM integration, and JWT-based authentication.

🚀 Getting Started

# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Run in production mode
npm run start:prod

📁 Project Structure

src/
├── auth/              # Authentication logic (login, register)
├── config/            # Environment and app configuration
├── jwt/               # JWT strategy and guards
├── todolist/          # Core todo functionality (CRUD)
├── user/              # User management
├── app.module.ts      # Root module
├── main.ts            # Application entry point
├── prisma.service.ts  # Prisma client integration

⚙️ Tech Stack

NestJS — Modular Node.js framework

TypeScript — Type-safe development

Prisma — ORM for PostgreSQL

JWT — Secure authentication
