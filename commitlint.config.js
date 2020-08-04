const {readdirSync, statSync} = require('fs')
const {join, sep} = require('path')

const ls = path =>
  readdirSync(path)
    .filter(f => statSync(join(path, f)).isFile())
    .map(
      f =>
        `${path.split(sep).reverse()[0]}/${f.replace(
          /(\.config)?.(json|js)/,
          '',
        )}`,
    )

module.exports = {
  extends: ['./src/config/commitlint.config'],
  rules: {
    'scope-enum': [
      1,
      'always',
      [
        ...ls('./src/config'),
        ...ls('./src/scripts'),
        ...ls('./src/api'),
        'deps',
        'build',
      ],
    ],
  },
}
