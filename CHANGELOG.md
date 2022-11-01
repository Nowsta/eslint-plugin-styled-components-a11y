## 1.0.0 (Nov 1, 2022)

Initial fork for Nowsta modifications. 

- Updated name of package to be scoped to the `@nowsta` org.

- Replaced `push-n-publish` script with `build-and-publish`.

- Bumped versions for the following packages:
  - `eslint`
  - `eslint-plugin-jsx-a11y`
  - `eslint-config-airbnb`
  - `eslint-plugin-import`
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`

- Added `@typescript-eslint/parser` as a dependency.



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
