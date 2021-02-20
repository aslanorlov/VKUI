import { createElement, Fragment } from 'react';
import { prefixClass } from './prefixClass';

function processProps(props: any) {
  const newProps: any = {};
  for (let key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key) && key !== 'scopedClass') {
      newProps[key] = props[key];
    }
  }
  if (props.scopedClass) {
    const className: string = props.className;
    const resolved = prefixClass(props.scopedClass);
    newProps.className = className ? className + ' ' + resolved : resolved;
  }
  return newProps;
}

function createScopedElement(_type: any, props: any) {
  let args = arguments;

  if (!props || !('scopedClass' in props)) {
    return createElement.apply(undefined, args);
  }

  let argsLength = args.length;
  let createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = args[0];
  createElementArgArray[1] = processProps(props);

  for (let i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }

  return createElement.apply(null, createElementArgArray);
};
createScopedElement.Fragment = Fragment;

export { createScopedElement };
