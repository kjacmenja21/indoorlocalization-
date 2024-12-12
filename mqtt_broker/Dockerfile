# Use the official Eclipse Mosquitto image
FROM eclipse-mosquitto:2.0.15

# Set environment variables for user passwords (these will be provided by Railway)
# Railway automatically injects environment variables during runtime
ARG CLIENT_PASSWORD
ARG API_PASSWORD

# Create the Mosquitto password file
RUN set -e && \
    touch /mosquitto/config/mosquitto.passwd && \
    mosquitto_passwd -b /mosquitto/config/mosquitto.passwd client ${CLIENT_PASSWORD} && \
    mosquitto_passwd -b /mosquitto/config/mosquitto.passwd api ${API_PASSWORD}

# Copy your custom Mosquitto configuration file into the container
COPY mqtt_broker/mosquitto.conf /etc/mosquitto/mosquitto.conf

# Expose the required ports for MQTT and WebSockets
EXPOSE 1883
# Uncomment if WebSockets are enabled
EXPOSE 9001  

# Start Mosquitto with the custom configuration
CMD ["mosquitto", "-c", "/etc/mosquitto/mosquitto.conf"]
