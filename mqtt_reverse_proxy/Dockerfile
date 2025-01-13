FROM caddy:latest

WORKDIR /app

COPY ./mqtt_reverse_proxy/Caddyfile ./

RUN caddy fmt --overwrite Caddyfile

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
