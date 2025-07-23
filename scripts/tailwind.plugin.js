// tailwind.plugin.js - exposes design tokens as Tailwind plugin
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addBase, theme }) {
  addBase({
    ':root': {
      '--color-primary': theme('colors.primary.DEFAULT'),
      '--color-secondary': theme('colors.secondary.DEFAULT'),
      '--color-accent': theme('colors.accent.DEFAULT'),
      '--color-background': theme('colors.background.DEFAULT'),
      '--color-surface': theme('colors.surface.DEFAULT'),
      '--color-text': theme('colors.text.DEFAULT'),
      '--color-muted': theme('colors.muted.DEFAULT'),
      '--font-family-base': theme('fontFamily.sans').join(', '),
      '--font-family-heading': theme('fontFamily.heading').join(', '),
      '--font-size-xs': theme('fontSize.xs'),
      '--font-size-sm': theme('fontSize.sm'),
      '--font-size-md': theme('fontSize.base'),
      '--font-size-lg': theme('fontSize.lg'),
      '--font-size-xl': theme('fontSize.xl'),
      '--font-weight-regular': '400',
      '--font-weight-bold': '700',
      '--space-xxs': '2px',
      '--space-xs': '4px',
      '--space-sm': '8px',
      '--space-md': '16px',
      '--space-lg': '32px',
      '--space-xl': '64px',
      '--border-radius': '8px',
    },
  });
});
