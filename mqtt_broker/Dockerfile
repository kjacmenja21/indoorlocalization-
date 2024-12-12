# Use the official Eclipse Mosquitto image from Docker Hub
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
COPY mosquitto.conf /etc/mosquitto/mosquitto.conf

# Expose the required ports for MQTT and WebSockets
EXPOSE 1883
# Uncomment if WebSockets are enabled
EXPOSE 9001  

# Copy the Mosquitto configuration file if needed (optional step)
# COPY mosquitto.conf /etc/mosquitto/mosquitto.conf

# Install Node.js for running the asset simulation script
RUN apk add --no-cache nodejs npm

# Set up the working directory for the asset simulator
WORKDIR /usr/src/app

# Copy the asset simulation script and dependencies
COPY package*.json ./
RUN npm install
COPY asset-simulator.js .

# Start Mosquitto and the asset simulation script together
CMD ["sh", "-c", "mosquitto -c /etc/mosquitto/mosquitto.conf & node /usr/src/app/asset-simulator.js"]

