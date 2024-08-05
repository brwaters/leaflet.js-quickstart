const express = require("express");
const { Client } = require("pg");
const path = require("path");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// PostgreSQL client setup
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "my_spatial_db",
  password: "testuser",
  port: 5433,
});

client.connect();

// Endpoint to fetch GeoJSON data from the 'countries' table
app.get("/data", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT ST_AsGeoJSON(geom) AS geojson FROM countries",
    );
    const geojson = {
      type: "FeatureCollection",
      features: result.rows.map((row) => JSON.parse(row.geojson)),
    };
    res.json(geojson);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
