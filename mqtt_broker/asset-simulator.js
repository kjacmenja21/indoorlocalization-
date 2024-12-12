const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

function generateAssetLocation(assetId) {
    const lat = 40 + Math.random();
    const lon = -75 + Math.random();
    return {
        asset_id: assetId,
        latitude: lat,
        longitude: lon
    };
}
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Subscribe to all asset location topics
    client.subscribe('assets/+/location', (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log('Subscribed to asset location topics');
        }
    });

    let assetId = 1;
    setInterval(() => {
        const locationData = generateAssetLocation(assetId);
        const topic = `assets/${assetId}/location`;
        client.publish(topic, JSON.stringify(locationData));
        console.log(`Published: ${JSON.stringify(locationData)}`);
        assetId = assetId < 5 ? assetId + 1 : 1;
    }, 2000);
});

client.on('message', (topic, message) => {
    const locationData = JSON.parse(message.toString());
    console.log(`Received on ${topic}:`, locationData);
});
