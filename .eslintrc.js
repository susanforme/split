module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["@typescript-eslint", "react-hooks", "react"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "no-unused-vars": 0,
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": 0,
    "no-var": 2,
    camelcase: 2,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "lines-around-comment": [
      "error",
      {
        beforeBlockComment: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],
    // 禁止无限循环
    "for-direction": 2,
    // 禁止函数中的同名参数
    "no-dupe-args": 2,
    "line-comment-position": ["error", { position: "above" }],
    "multiline-comment-style": ["error", "starred-block"],
    // 注释空格，必须在注释前加一个空格
    "spaced-comment": 2,
    // eslint-disable-next-line no-dupe-keys
    camelcase: ["error", { properties: "always" }],
    // 禁用with
    "no-with": 2,
    // 大写函数名开头，必须用new调用
    "new-cap": 2,
    // 禁止比较使用NaN
    "use-isnan": 2,
    "no-eval": 2,
    // 禁止无效this
    "no-invalid-this": 2,
    // 空行不能超过两行
    "no-multiple-empty-lines": [1, { max: 2 }],
    "no-native-reassign": 2,
    // 必须使用es6简便写法
    "object-shorthand": 2,
    // 禁用tab
    "no-tabs": 2,
    // 禁止出现无意义的数字
    "no-magic-numbers": ["off", { ignoreArrayIndexes: false }],
    // 禁止模块重复导入
    "no-duplicate-imports": "error",
    // 禁止不必要的构造函数
    "no-useless-constructor": "error",
    "react/react-in-jsx-scope": 0,
    "react/display-name": 0,
    "react/jsx-no-undef": 0,
    "react/prop-types": 0,
  },
};
