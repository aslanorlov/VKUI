import React, { FunctionComponent } from 'react';
import { getClassName } from '../../helpers/getClassName';
import { Icon24Spinner, Icon32Spinner, Icon44Spinner, Icon16Spinner } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'regular' | 'large' | 'medium';
}

const svgSpinner = (size: SpinnerProps['size']): React.ReactElement => {
  switch (size) {
    case 'large':
      return <Icon44Spinner scopedClass="Spinner__self" />;
    case 'medium':
      return <Icon32Spinner scopedClass="Spinner__self" />;
    case 'small':
      return <Icon16Spinner scopedClass="Spinner__self" />;
    default:
      return <Icon24Spinner scopedClass="Spinner__self" />;
  }
};

const Spinner: FunctionComponent<SpinnerProps> = ({ size, ...restProps }: SpinnerProps) => {
  const platform = usePlatform();

  return (
    <div {...restProps} scopedClass={getClassName('Spinner', platform)}>
      {svgSpinner(size)}
    </div>
  );
};

Spinner.defaultProps = {
  size: 'regular',
};

export default React.memo(Spinner);
