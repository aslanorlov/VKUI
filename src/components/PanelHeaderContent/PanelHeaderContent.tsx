import { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { getClassName } from '../../helpers/getClassName';
import Tappable from '../Tappable/Tappable';
import { usePlatform } from '../../hooks/usePlatform';
import { hasReactNode } from '../../lib/utils';
import Caption from '../Typography/Caption/Caption';
import Headline from '../Typography/Headline/Headline';

export interface PanelHeaderContentProps extends HTMLAttributes<HTMLDivElement> {
  aside?: ReactNode;
  before?: ReactNode;
  status?: ReactNode;
}

const PanelHeaderContent: FunctionComponent<PanelHeaderContentProps> = ({
  className,
  style,
  aside,
  status,
  before,
  children,
  onClick,
  ...restProps
}: PanelHeaderContentProps) => {
  const InComponent = onClick ? Tappable : 'div';
  const rootProps = onClick ? {} : restProps;
  const inProps = onClick ? { ...restProps, activeEffectDelay: 200 } : {};
  const platform = usePlatform();
  const baseClassNames = getClassName('PanelHeaderContent', platform);

  return (
    <div {...rootProps} scopedClass={baseClassNames} style={style} className={className}>
      {hasReactNode(before) && <div scopedClass="PanelHeaderContent__before">{before}</div>}
      <InComponent {...inProps} scopedClass="PanelHeaderContent__in" onClick={onClick}>
        {hasReactNode(status) &&
          <Caption level="1" weight="regular" scopedClass="PanelHeaderContent__status">
            {status}
          </Caption>
        }
        <div scopedClass="PanelHeaderContent__children">
          {hasReactNode(status) ?
            <Headline Component="span" weight="medium">
              {children}
            </Headline>
            : <span scopedClass="PanelHeaderContent__children-in">{children}</span>
          }
          {hasReactNode(aside) && <div scopedClass="PanelHeaderContent__aside">{aside}</div>}
        </div>
        {hasReactNode(before) && <div scopedClass="PanelHeaderContent__width" />}
      </InComponent>
    </div>
  );
};

export default PanelHeaderContent;
