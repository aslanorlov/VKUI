import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import { getClassName } from '../../helpers/getClassName';
import { classNames } from '../../lib/classNames';
import FormField, { FormFieldOwnProps } from '../FormField/FormField';
import { HasAlign, HasRef, HasRootRef } from '../../types';
import { withAdaptivity, AdaptivityProps } from '../../hoc/withAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';

export interface InputProps extends
  InputHTMLAttributes<HTMLInputElement>,
  HasRef<HTMLInputElement>,
  HasRootRef<HTMLDivElement>,
  HasAlign,
  AdaptivityProps,
  FormFieldOwnProps {}

const Input: FunctionComponent<InputProps> = ({
  align,
  getRef,
  className,
  getRootRef,
  sizeY,
  style,
  before,
  after,
  ...restProps
}: InputProps) => {
  const platform = usePlatform();
  return (
    <FormField
      className={classNames(getClassName('Input', platform), className, { [`Input--${align}`]: !!align }, `Input--sizeY-${sizeY}`)}
      style={style}
      getRootRef={getRootRef}
      before={before}
      after={after}
    >
      <input {...restProps} className="Input__el" ref={getRef} />
    </FormField>
  );
};

Input.defaultProps = {
  type: 'text',
};

export default withAdaptivity(Input, {
  sizeY: true,
});
