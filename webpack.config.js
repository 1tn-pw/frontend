const path = require('path');

module.exports = {
  // ... other webpack configurations
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@flags-gg/react-library')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            // Your babel configuration
            presets: [
              ['@babel/preset-env', { targets: { node: 'current' } }],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: ['inline-react-svg'],
          }
        }
      }
    ]
  }
};
