import { FunctionComponent } from 'react';
import { DivProps } from '../Div/Div';
import Caption from '../Typography/Caption/Caption';

const Footer: FunctionComponent<DivProps> = ({ children, ...restProps }: DivProps) => {
  return (
    <Caption {...restProps} level="1" weight="regular" scopedClass="Footer">
      {children}
    </Caption>
  );
};

export default Footer;
