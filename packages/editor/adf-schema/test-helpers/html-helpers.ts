import {
  DOMParser,
  DOMSerializer,
  Fragment,
  Node as PMNode,
  ParseOptions,
  Schema,
} from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

export const fromHTML = (
  html: string,
  schema: Schema,
  options?: ParseOptions,
): PMNode => {
  const el = document.createElement('div');
  el.innerHTML = html;

  return DOMParser.fromSchema(schema).parse(el, options);
};

export const toDOM = (node: PMNode, schema: Schema): Node => {
  const serializer = DOMSerializer.fromSchema(schema);
  return serializer.serializeFragment(Fragment.from(node));
};

export const toContext = (node: (schema: Schema) => any, schema: Schema) => {
  const document = node(schema);
  const selection = TextSelection.near(
    document.resolve(document.refs['<>'] || 0),
  );
  return selection.$from;
};

export const toHTML = (node: PMNode, schema: Schema): string => {
  const el = document.createElement('div');
  el.appendChild(toDOM(node, schema));
  return el.innerHTML;
};
