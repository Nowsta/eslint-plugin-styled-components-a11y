## 1.0.1 (Nov, 2022)

- Corrected rule names to have the right `@nowsta` namespace.

## 1.0.0 (Nov 1, 2022)

Initial fork for Nowsta modifications.

- Updated plugin to be able to lint components that use our Presenter pattern.

  - For any `index.tsx` within `src/components`, the plugin will check for any imports matching `/presenter/`.
  - If found, the Presenter will be parsed, and its `styled` declarations will be collected.
  - As the plugin parses the original index file, it will match component tags to the collected styled components, and apply linting rules appropriately.

- Updated name of package to be scoped to the `@nowsta` org.

- [dev] Replaced `push-n-publish` script with `build-and-publish`.

- [dev] Bumped versions for the following packages:

  - `eslint`
  - `eslint-plugin-jsx-a11y`
  - `eslint-config-airbnb`
  - `eslint-plugin-import`
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `@babel/parser`
  - `@babel/cli`
  - `@babel/core`
  - `@babel/eslint-parser`
  - `@babel/generator`
  - `@babel/plugin-proposal-optional-chaining`
  - `@babel/preset-env`

- [dev] Added `@typescript-eslint/parser` as a dependency.

## 0.0.40 (July 29, 2022)

- Re-added support for styled components defined within objects while fixing the
  [hang](https://github.com/brendanmorrell/eslint-plugin-styled-components-a11y/issues/40). `jsx-ast-utils` needed
  to be upgraded to avoid an error with `ChainingExpressions`, but using the newer version of `jsx-ast-utils`
  may cause issues in some older environments.

## 0.0.40 (June 16, 2022)

- Reverted changes from 0.0.37, which were causing eslint to [hang](https://github.com/brendanmorrell/eslint-plugin-styled-components-a11y/issues/40).

## 0.0.38, 0.0.39 (June 12, 2022)

- Changed the image links in the readme to externally hosted images so they are visible outside github on npm.

## 0.0.37 (June 2, 2022)

- Add support for styled components defined as objects. ([@pawelglosz](https://github.com/pawelglosz) in [#39](https://github.com/brendanmorrell/eslint-plugin-styled-components-a11y/pull/39))
