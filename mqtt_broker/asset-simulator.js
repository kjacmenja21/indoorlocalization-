const mqtt = require('mqtt');
//const client = mqtt.connect('mqtt://localhost:1883');
const client = mqtt.connect('mqtt://test.mosquitto.org:1883'); // TODO: Use environmental variable for broker address

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
        const topic = `assets/${assetId}/location`; // TODO: load topic from environment variable
        client.publish(topic, JSON.stringify(locationData));
        console.log(`Published: ${JSON.stringify(locationData)}`);
        assetId = assetId < 5 ? assetId + 1 : 1;
    }, 2000); // TODO: load time interval from environment variable, parse value to integer
});

client.on('message', (topic, message) => {
    const locationData = JSON.parse(message.toString());
    console.log(`Received on ${topic}:`, locationData);
});
