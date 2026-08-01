-- VisionOS PostgreSQL Initializer
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Ensure database exists
CREATE DATABASE visionos_dev;
