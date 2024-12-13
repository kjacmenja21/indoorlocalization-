const mqtt = require('mqtt');
require('dotenv').config();

// Load configuration from environment variables
const BROKER_URL = process.env.BROKER_URL || 'mqtt://localhost:1883';
const BASE_TOPIC = process.env.BASE_TOPIC || 'assets';
const PUBLISH_INTERVAL = parseInt(process.env.PUBLISH_INTERVAL, 10) || 2000;

const client = mqtt.connect(BROKER_URL);

function generateAssetLocation(assetId) {
    const lat = Math.random() * 1000 % 199;
    const lon = Math.random() * 1000 % 199;
    return {
        asset_id: assetId,
        floormap_id: 1,
        x: lat,
        y: lon
    };
}

client.on('connect', () => {
    console.log(`Connected to MQTT broker at ${BROKER_URL}`);

    // Subscribe to all asset location topics
    client.subscribe(`${BASE_TOPIC}/+/location`, (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log(`Subscribed to topic: ${BASE_TOPIC}/+/location`);
        }
    });

    let assetId = 1;
    setInterval(() => {
        const locationData = generateAssetLocation(assetId);
        const topic = `${BASE_TOPIC}/${assetId}/location`;
        client.publish(topic, JSON.stringify(locationData));
        console.log(`Published to ${topic}: ${JSON.stringify(locationData)}`);
        assetId = assetId < 5 ? assetId + 1 : 1;
    }, PUBLISH_INTERVAL);
});

client.on('message', (topic, message) => {
    try {
        const locationData = JSON.parse(message.toString());
        console.log(`Received on ${topic}:`, locationData);
    } catch (error) {
        console.error('Error parsing message:', error);
    }
});
