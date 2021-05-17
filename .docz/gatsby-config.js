const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'SKD',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/kiamkiettsyu/workspace/SDK/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: './doc/**/*.{md,markdown,mdx}',
        public: '/public',
        dest: 'doc-site',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'SKD',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3001,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/kiamkiettsyu/workspace/SDK',
          templates:
            '/Users/kiamkiettsyu/workspace/SDK/node_modules/docz-core/dist/templates',
          docz: '/Users/kiamkiettsyu/workspace/SDK/.docz',
          cache: '/Users/kiamkiettsyu/workspace/SDK/.docz/.cache',
          app: '/Users/kiamkiettsyu/workspace/SDK/.docz/app',
          appPackageJson: '/Users/kiamkiettsyu/workspace/SDK/package.json',
          appTsConfig: '/Users/kiamkiettsyu/workspace/SDK/tsconfig.json',
          gatsbyConfig: '/Users/kiamkiettsyu/workspace/SDK/gatsby-config.js',
          gatsbyBrowser: '/Users/kiamkiettsyu/workspace/SDK/gatsby-browser.js',
          gatsbyNode: '/Users/kiamkiettsyu/workspace/SDK/gatsby-node.js',
          gatsbySSR: '/Users/kiamkiettsyu/workspace/SDK/gatsby-ssr.js',
          importsJs: '/Users/kiamkiettsyu/workspace/SDK/.docz/app/imports.js',
          rootJs: '/Users/kiamkiettsyu/workspace/SDK/.docz/app/root.jsx',
          indexJs: '/Users/kiamkiettsyu/workspace/SDK/.docz/app/index.jsx',
          indexHtml: '/Users/kiamkiettsyu/workspace/SDK/.docz/app/index.html',
          db: '/Users/kiamkiettsyu/workspace/SDK/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
