FROM caddy:latest

WORKDIR /mqtt_reverse_proxy

COPY Caddyfile ./

RUN caddy fmt --overwrite Caddyfile

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
