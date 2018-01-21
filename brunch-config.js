module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    stylesheets: {
      joinTo: 'app.css'
    }
  },

  plugins: {
    babel: {presets: ['es2015', 'stage-3']}
  },

  npm: {
    globals:{
      PIXI:   'phaser-ce/build/custom/pixi',
      p2:     'phaser-ce/build/custom/p2',
      Phaser: 'phaser-ce'
    }
  }
};
