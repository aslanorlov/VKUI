import React, { AllHTMLAttributes, ElementType, ReactNode, useState } from 'react';
import { getClassName } from '../../helpers/getClassName';
import { classNames } from '../../lib/classNames';
import { usePlatform } from '../../hooks/usePlatform';
import { HasRootRef } from '../../types';
import { hasReactNode } from '@vkontakte/vkjs';
import { withAdaptivity, AdaptivityProps } from '../../hoc/withAdaptivity';

export interface FormFieldOwnProps {
  /**
   * Иконка или кнопка 24.
   */
  before?: ReactNode;
  /**
   * Иконка или кнопка 24.
   */
  after?: ReactNode;
}

export interface FormFieldProps extends
  AllHTMLAttributes<HTMLElement>,
  HasRootRef<HTMLElement>,
  FormFieldOwnProps,
  AdaptivityProps {
  Component?: ElementType;
}

const FormField: React.FunctionComponent<FormFieldProps> = withAdaptivity(({
  Component,
  className,
  children,
  getRootRef,
  before,
  after,
  sizeY,
  ...restProps
}: FormFieldProps) => {
  const platform = usePlatform();
  const [hover, setHover] = useState(false);

  const handleMouseEnter = (e: MouseEvent) => {
    e.stopPropagation();
    setHover(true);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    setHover(false);
  };

  return (
    <Component
      {...restProps}
      ref={getRootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(getClassName('FormField', platform), `FormField--sizeY-${sizeY}`, className)}
    >
      {hasReactNode(before) && (
        <div className="FormField__before">
          {before}
        </div>
      )}
      {children}
      {hasReactNode(after) && (
        <div className="FormField__after">
          {after}
        </div>
      )}
      <div className={classNames('FormField__border', {
        'FormField__border--hover': hover,
      })} />
    </Component>
  );
}, {
  sizeY: true,
});

FormField.defaultProps = {
  Component: 'div',
};

export default FormField;
