import { FunctionComponent, HTMLAttributes } from 'react';
import { classNames } from '../../lib/classNames';
import { getClassName } from '../../helpers/getClassName';
import { usePlatform } from '../../hooks/usePlatform';
import { HasRootRef } from '../../types';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, HasRootRef<HTMLDivElement> {
  mode?: 'tint' | 'shadow' | 'outline';
}

const Card: FunctionComponent<CardProps> = ({ mode, children, getRootRef, ...restProps }: CardProps) => {
  const platform = usePlatform();

  return (
    <div
      {...restProps}
      ref={getRootRef}
      scopedClass={classNames(getClassName('Card', platform), `Card--md-${mode}`)}
    >
      <div scopedClass="Card__in">
        {children}
      </div>
    </div>
  );
};

Card.defaultProps = {
  mode: 'tint',
};

export default Card;
