import { HTMLAttributes, Attributes } from 'react';
import { createScopedElement } from './jsxRuntime';
import { __controller } from './classScopingMode';

describe(createScopedElement, () => {
  beforeEach(() => __controller._noConflict = false);
  const processProps = (props: Attributes & HTMLAttributes<any>) => {
    return createScopedElement('div', props).props;
  };
  const classSet = ({ className }: HTMLAttributes<any>) => new Set(className ? className.split(' ').filter(Boolean) : []);

  describe('prefixes scopedClass', () => {
    const prefixed = new Set(['A', 'B', 'vkuiA', 'vkuiB']);
    it('from array', () =>
      expect(classSet(processProps({ scopedClass: ['A', 'B'] }))).toEqual(prefixed));
    it('from string', () =>
      expect(classSet(processProps({ scopedClass: 'A B' }))).toEqual(prefixed));
  });
  it('is idempotent', () => {
    const pass1 = processProps({ scopedClass: 'A' });
    expect(classSet(processProps({ scopedClass: pass1.className }))).toEqual(classSet(pass1));
  });
  describe('handles missing args', () => {
    it('does not require scopedClass', () =>
      expect(processProps({})).not.toHaveProperty('className'));
    it('accepts falsy scopedClass', () =>
      expect(processProps({ scopedClass: null })).not.toHaveProperty('className'));
    it('does not require props', () =>
      expect(createScopedElement('div').props).not.toHaveProperty('className'));
  });
  describe('className integration', () => {
    it('passes className without prefixing without scopedClass', () =>
      expect(processProps({ className: 'B C' }).className).toBe('B C'));
    it('merges className with scopedClass', () =>
      expect(classSet(processProps({ scopedClass: ['S'], className: 'B C' }))).toEqual(new Set(['vkuiS', 'S', 'B', 'C'])));
  });
  it('legacy classes can be controlled', () => {
    // can be diabled...
    __controller._noConflict = true;
    expect(classSet(processProps({ scopedClass: ['A', 'B'] }))).toEqual(new Set(['vkuiA', 'vkuiB']));
    // ...and enabled back again
    __controller._noConflict = false;
    expect(classSet(processProps({ scopedClass: ['A', 'B'] }))).toEqual(new Set(['vkuiA', 'vkuiB', 'A', 'B']));
  });
});
