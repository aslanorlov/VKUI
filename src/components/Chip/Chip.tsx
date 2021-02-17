import { FC, HTMLAttributes, ReactNode, useCallback, MouseEvent } from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { getTitleFromChildren, hasReactNode, noop } from '../../lib/utils';
import Caption from '../Typography/Caption/Caption';

type ChipValue = string | number;

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  value: ChipValue;
  onRemove?: (event?: MouseEvent, value?: ChipValue) => void;
  removable?: boolean;
  before?: ReactNode;
  after?: ReactNode;
}

const Chip: FC<ChipProps> = (props: ChipProps) => {
  const { value, onRemove, removable, before, after, children, ...restProps } = props;
  const onRemoveWrapper = useCallback((event: MouseEvent) => {
    onRemove(event, value);
  }, [onRemove, value]);
  const title = getTitleFromChildren(children);

  return (
    <div scopedClass="Chip" {...restProps}>
      <div scopedClass="Chip__in">
        {hasReactNode(before) && <div scopedClass="Chip__before">{before}</div>}
        <Caption level="1" weight="regular" scopedClass="Chip__content" title={title}>{children}</Caption>
        {hasReactNode(after) && <div scopedClass="Chip__after">{after}</div>}
        {removable &&
          <div scopedClass="Chip__remove" onClick={onRemoveWrapper}>
            <Icon16Cancel fill="var(--icon_secondary)" />
          </div>
        }
      </div>
    </div>
  );
};

Chip.defaultProps = {
  removable: true,
  before: null,
  value: '',
  onRemove: noop,
};

export default Chip;
