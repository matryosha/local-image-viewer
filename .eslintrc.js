module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb"],
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.jsx", "*.js"],
      rules: {
        "react/prop-types": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
      },
    },
  ],
};
