module.exports = [
  {
    resourceSizes: [
      { resourceType: 'script', budget: 250 },
      { resourceType: 'image', budget: 500 },
      { resourceType: 'stylesheet', budget: 100 },
    ],
    timings: [
      { metric: 'interactive', budget: 3000 },
      { metric: 'first-contentful-paint', budget: 1500 },
    ],
  },
];
