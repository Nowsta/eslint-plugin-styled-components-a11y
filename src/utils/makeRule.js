const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');
const fs = require('fs');
const tsParser = require('@typescript-eslint/parser');

const { inspect } = require('util');
const collectStyledComponentData = require(process.env.NODE_ENV === 'test'
  ? '../../lib/utils/collectStyledComponentData.js'
  : './collectStyledComponentData');

const ruleNameToTypeDict = require('./ruleNameToTypeDict');

module.exports = (name) => ({
  create(context) {
    const nodeParserPath = path.join(__dirname, 'nodeParsers', ruleNameToTypeDict[name]);
    const rule = rules[name];
    const styledComponents = {};
    const nodesArray = [];
    const parserMapping = {
      JSXOpeningElement: 'JSXOpeningElement',
      JSXElement: 'JSXElement',
      JSXAttribute: 'JSXOpeningElement',
    };
    const parsedElement = parserMapping[ruleNameToTypeDict[name]];

    // for component index files, check for Presenter imports
    // if they exist, parse the presenter file and update styledComponents object accordingly
    const presenterImportNodes = context.getScope().block.body.filter((node) => {
      if (node.type === 'ImportDeclaration') {
        if (node.source.value.match(/presenter/)) {
          return true;
        }
      }
    });

    if (presenterImportNodes) {
      presenterImportNodes.forEach((node) => {
        const specifiers = node.specifiers;
        const isNamespaceImport = specifiers.length === 1 && specifiers[0].type === 'ImportNamespaceSpecifier';

        const dir = path.dirname(context.getFilename());
        const presenterPath = path.resolve(dir, node.source.value);

        const parsed = tsParser.parseForESLint(fs.readFileSync(`${presenterPath}.tsx`, 'utf-8'), {
          range: true,
          loc: true,
          sourceType: 'module',
          ecmaFeatures: { jsx: true },
        });
        parsed.ast.body.forEach((child) => {
          let declarations;
          if (child.type === 'ExportNamedDeclaration') {
            declarations = child.declaration.declarations;
          } else if (child.type === 'VariableDeclaration') {
            declarations = child.declarations;
          }

          if (declarations) {
            declarations.forEach((decl) => {
              if (decl.init.type === 'TaggedTemplateExpression') {
                const styledNode = decl.init;
                styledNode.parent = decl;
                collectStyledComponentData(styledComponents, context, name).TaggedTemplateExpression(
                  styledNode,
                  isNamespaceImport,
                );
              }
            });
          }
        });
      });
    }

    return {
      ...collectStyledComponentData(styledComponents, context, name),
      [parsedElement]: (node) => nodesArray.push(node),
      'Program:exit': () => {
        const parser = require(nodeParserPath)(context, styledComponents, rule, name);
        nodesArray.forEach((node) => parser[parsedElement](node));
      },
    };
  },
});
