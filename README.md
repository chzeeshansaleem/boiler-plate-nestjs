# Boiler-plate
Boiler plate for NestJS with PostgreSQL. This repository contains a complete RBAC (Role-Based Access Control) system implementation.

**Author:** Zeeshan Saleem  
**License:** MIT 

# Branches

## Master branch

Master branch contains following

1. Users module
2. Auth module (JwtAuth Guard)
3. Passport jwt strategy
4. Seeders (users)
5. Global exception handling 

## User-roles-with-rbac

This branch have following 

1. Auth module (JwtAuth Guard, Permission Guard)
2. Files module (for uploading and downloading of files in AWS bucket using signed urls)
3. Groups module
4. Permissions module (with rbac)
5. Roles module
6. Shared module (includes email service, aws service, custom decorators, templates, transformers, etc.)
8. Users module
9. Users-group module
10. Users-role module
11. Seeders (users, roles, permissions)
12. Passport jwt strategy
13. Global exception handling

# Database
1. PostgreSQL 

# Getting started

## Pre-requisites
1. Node.js 18+ (recommended: 20.x or higher)
2. NestJS 11.1.8
3. PostgreSQL 16.1+
4. TypeORM 0.3.27

## APIs documentation 
API Swagger documentation is available at `baseUrl + /api-documentation`

**Example:**
- If you are using localhost at port 3000, the app backend will work at: `http://localhost:3000`
- You can find API documentation at: `http://localhost:3000/api-documentation`

**Note:** Make sure `ENABLE_DOCS=true` is set in your `.env` file to enable Swagger documentation.

## Health Checks

The application includes comprehensive health check monitoring available at `GET /health`. This endpoint is publicly accessible and provides:

- **Database Connection Status** - Checks PostgreSQL connection health
- **Memory Usage** - Monitors heap and RSS memory consumption
- **Disk Storage** - Checks available disk space

**Example Response (Healthy):**
```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "memory_heap": { "status": "up" },
    "memory_rss": { "status": "up" },
    "storage": { "status": "up" }
  },
  "error": {},
  "details": {
    "database": { "status": "up" },
    "memory_heap": { "status": "up" },
    "memory_rss": { "status": "up" },
    "storage": { "status": "up" }
  }
}
```

**Example Response (Unhealthy):**
```json
{
  "status": "error",
  "info": {},
  "error": {
    "database": { "status": "down", "message": "..." }
  },
  "details": {
    "database": { "status": "down", "message": "..." }
  }
}
```

The health endpoint returns HTTP 200 when healthy and HTTP 503 when unhealthy, making it perfect for:
- Load balancer health checks
- Container orchestration (Kubernetes liveness/readiness probes)
- Monitoring and alerting systems 

### Swagger documentation
For swagger documentation, @nestjs/swagger plugin is used in nest-cli with suitable options.

## Running the app

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from `.sample.env`:
   ```bash
   cp .sample.env .env
   ```

3. Update `.env` file with your database credentials and other configuration

4. Create your PostgreSQL database

5. Run migrations:
   ```bash
   npm run typeorm:run-migrations
   ```

6. Run seeders (optional):
   ```bash
   npm run seed
   ```

7. Start the application:
   ```bash
   npm run start          # Production mode
   npm run start:dev      # Development mode (watch mode)
   npm run start:debug    # Debug mode
   ```

## Migrations

Use the following npm scripts for TypeORM migrations:

```bash
# Run all pending migrations
npm run typeorm:run-migrations

# Revert the last migration
npm run typeorm:revert-migration

# Create a new migration (set npm_config_name env variable)
npm_config_name=YourMigrationName npm run typeorm:create-migration

# Generate migration from entities (set npm_config_name env variable)
npm_config_name=YourMigrationName npm run typeorm:generate-migration
```

## Authentication
For authentication, JWT (JSON Web Tokens) is used with Passport.js strategy. The application includes:

- JWT Authentication Guard
- Permission Guard (for RBAC)
- Passport JWT Strategy
- Password hashing with bcrypt

## Tech Stack

### Core Framework
- **NestJS** 11.1.8 - Progressive Node.js framework
- **TypeScript** 5.9.3 - Type-safe JavaScript

### Database
- **PostgreSQL** - Relational database
- **TypeORM** 0.3.27 - ORM for database operations

### Authentication & Security
- **@nestjs/jwt** 11.0.1 - JWT token handling
- **@nestjs/passport** 11.0.5 - Authentication middleware
- **passport-jwt** 4.0.1 - JWT strategy for Passport
- **bcrypt** 6.0.0 - Password hashing

### Additional Features
- **Swagger/OpenAPI** 11.2.1 - API documentation
- **AWS SDK** 2.1692.0 - AWS S3 integration for file storage
- **Nodemailer** 7.0.10 - Email service
- **class-validator** & **class-transformer** - DTO validation
- **@nestjs/terminus** - Health checks and monitoring

## Scripts

```bash
# Development
npm run start:dev      # Start in watch mode
npm run start:debug    # Start in debug mode

# Production
npm run build          # Build the application
npm run start:prod     # Start production server

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Database
npm run typeorm:run-migrations    # Run migrations
npm run typeorm:revert-migration   # Revert migration
npm run seed                       # Run seeders
```
