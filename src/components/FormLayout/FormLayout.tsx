import {
  FunctionComponent,
  AllHTMLAttributes,
  FormEvent,
  ElementType,
} from 'react';
import { getClassName } from '../../helpers/getClassName';
import { usePlatform } from '../../hooks/usePlatform';
import { HasRef } from '../../types';

const preventDefault = (e: FormEvent) => e.preventDefault();

export interface FormLayoutProps extends AllHTMLAttributes<HTMLElement>, HasRef<HTMLElement> {
  Component?: ElementType;
}

const FormLayout: FunctionComponent<FormLayoutProps> = (props: FormLayoutProps) => {
  const {
    children,
    Component,
    getRef,
    onSubmit,
    ...restProps
  } = props;

  const platform = usePlatform();
  return (
    <Component
      {...restProps}
      scopedClass={getClassName('FormLayout', platform)}
      onSubmit={onSubmit}
      ref={getRef}
    >
      <div scopedClass="FormLayout__container">
        {children}
      </div>
      {Component === 'form' &&
        <input type="submit" scopedClass="FormLayout__submit" value="" />
      }
    </Component>
  );
};

FormLayout.defaultProps = {
  Component: 'form',
  onSubmit: preventDefault,
};

export default FormLayout;
