/* This express server is used to serve the files from the /build folder. */
const express = require( 'express' );
const serveStatic = require( 'serve-static' );

const PORT = 8080;
const app = express();
app.use( serveStatic( __dirname + '/build' ) );
console.log( 'WebVR with three.js server is now starting on port', PORT );

app.listen( PORT, '0.0.0.0' );
module.exports = app;