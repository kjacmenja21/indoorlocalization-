FROM caddy:latest

WORKDIR /app

COPY Caddyfile ./

RUN caddy fmt --overwrite Caddyfile

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
