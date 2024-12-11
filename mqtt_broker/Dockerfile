# Use the official Eclipse Mosquitto image from Docker Hub
FROM eclipse-mosquitto:2.0.15

# Expose MQTT ports (1883 for non-secure, 9001 for WebSockets if you need it)
EXPOSE 1883
EXPOSE 9001

# Copy the Mosquitto configuration file if needed (optional step)
# COPY mosquitto.conf /etc/mosquitto/mosquitto.conf

# Start the Mosquitto broker with the default configuration
CMD ["mosquitto"]
