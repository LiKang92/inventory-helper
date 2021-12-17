const { override, fixBabelImports, addLessLoader } = require('customize-cra');
//fixBabelImport helps to fix issue during importing babel

module.exports = override(
  //help import antd as needed
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    //self-defined less style
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
);