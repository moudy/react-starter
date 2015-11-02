import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DEV_PORT = 8089;
const isProduction = process.env.NODE_ENV === 'production';
const devOrigin = `http://localhost:${DEV_PORT}/`;
const PublicPath = isProduction ? 'https://s3.amazonaws.com/react-starter.com/' : devOrigin;
const JSFilename = isProduction ? 'app.[hash].js' : 'app.js';
const CSSFilename = isProduction ? '[name].[hash].css' : '[name].css';
const AppEntry = ['./index.js'];

let cssLoaders = [
  'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
  'autoprefixer-loader?browsers=last 2 versions',
  'sass',
];

if (!isProduction) {
  cssLoaders.unshift('style-loader');
}

let plugins = [
  new HtmlWebpackPlugin({ template: './app/index.html' }),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
  })
];

if (isProduction) {
  plugins.push(new ExtractTextPlugin(CSSFilename));
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  plugins.push(new webpack.optimize.DedupePlugin());
}

let config = {
  devtool: (isProduction ? null : 'cheap-module-source-map'),
  context: __dirname + '/app'
};

config.entry = {
  app: AppEntry
};

config.resolve = {
  alias: {
    app: __dirname + '/app'
  }
};

config.output = {
  filename: JSFilename,
  path: __dirname + '/dist',
  publicPath: PublicPath
};

config.module = {
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }
  ]
};

if (isProduction) {
  config.module.loaders.push({
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!'))
  });
} else {
  config.module.loaders.push({
    test: /\.(css|scss)$/,
    loader: cssLoaders.join('!')
  });
}

config.plugins = plugins;

config.devServer = {
  port: DEV_PORT
};

export default config;
