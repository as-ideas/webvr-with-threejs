const path = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve( __dirname, 'build' ),
    filename: 'bundle.js'
  },
  plugins: [
      new CopyWebpackPlugin( [
          { from: './src/static' }
      ] )
  ]
};
