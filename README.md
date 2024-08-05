# Leaflet.js and PostGIS Application

This project demonstrates a simple web application using Leaflet.js to display spatial data stored in a PostgreSQL/PostGIS database.

## Prerequisites

To run this project, you'll need to have the following installed on your machine:

    Node.js and npm
    PostgreSQL
    PostGIS (& shp2pgsql from the PostGIS Installation wiki)

**Installation Instructions**

1. Install Node.js and npm

   Download and install Node.js and npm from the official Node.js website.

2. Install PostgreSQL

   Download and install PostgreSQL from the official PostgreSQL website.

3. Install PostGIS

   After installing PostgreSQL, you need to install PostGIS. Follow the installation instructions for your operating system on the PostGIS website.

   Here are Debian/Ubuntu instructions from the wiki here: https://trac.osgeo.org/postgis/wiki/UsersWikiPostGIS3UbuntuPGSQLApt

**Setting Up the Project**

1. Clone the Repository

```bash
git clone https://github.com/brwaters/leaflet.js-quickstart your-repo
cd your-repo
```

2. Install Node.js Dependencies

```bash
npm install
```

3. Set Up PostgreSQL and PostGIS

Ensure PostgreSQL is running. You can start it using the following command:

```bash
sudo service postgresql start
```

Create a New Database and apply extensions:

```bash
sudo -i -u postgres
createdb my_spatial_db
psql -d my_spatial_db -c "CREATE EXTENSION postgis; CREATE EXTENSION pgrouting;"
```

Load the Shapefile Data:

You can find public domain map datasets here: https://www.naturalearthdata.com/

Convert your .shp file to SQL and load it into the database. Assuming you have shp2pgsql installed:

```bash
shp2pgsql -I -s 4326 path/to/your/shapefile.shp countries > countries.sql
psql -d my_spatial_db -f countries.sql -U postgres
```

4. Configure the Database Connection

Ensure your database connection settings in server.js are correct:

```javascript
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "my_spatial_db",
  password: "your_password",
  port: 5432,
});
```

5. Start the Application

```bash
node server.js
```

The application will be available at http://localhost:3000.

Using the Application

Open your web browser and navigate to http://localhost:3000.
You should see a Leaflet.js map displaying the data from your PostGIS database.
