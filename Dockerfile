# Use the official PostgreSQL image
FROM postgres:latest

# Set the environment variable for PostgreSQL password (for initialization)
ENV POSTGRES_PASSWORD=mysecretpassword

# Expose PostgreSQL port (default 5432)
EXPOSE 5432
