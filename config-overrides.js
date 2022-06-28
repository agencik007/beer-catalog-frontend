const {override} = require('customize-cra');
const {aliasWebpack, configPaths} = require('react-app-alias-ex');

module.exports = {
  webpack: override(
    aliasWebpack(configPaths('./tsconfig.paths.json'))
  ),
}