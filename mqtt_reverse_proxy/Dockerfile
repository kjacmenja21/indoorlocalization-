FROM caddy:latest

COPY Caddyfile ./

RUN caddy fmt --overwrite Caddyfile

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
