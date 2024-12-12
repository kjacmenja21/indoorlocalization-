FROM caddy:2.7.4-alpine

COPY mqtt_broker/caddy/Caddyfile /etc/caddy/Caddyfile

RUN caddy fmt --overwrite /etc/caddy/Caddyfile

CMD nc -zv {$MQTT_INTERNAL} 1883 ; caddy run --config /etc/caddy/Caddyfile --adapter caddyfile 2>&1