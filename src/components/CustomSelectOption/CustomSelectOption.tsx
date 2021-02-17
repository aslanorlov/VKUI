import { FC, HTMLAttributes, ReactNode } from 'react';
import { Icon16Done } from '@vkontakte/icons';
import { classNames } from '../../lib/classNames';
import { hasReactNode } from '../../lib/utils';
import Text from '../Typography/Text/Text';
import { HasRootRef } from 'types';

export interface CustomSelectOptionProps extends HTMLAttributes<HTMLDivElement>, HasRootRef<HTMLDivElement> {
  option?: any;
  selected?: boolean;
  focused?: boolean;
  hovered?: boolean;
  before?: ReactNode;
  after?: ReactNode;
}

const CustomSelectOption: FC<CustomSelectOptionProps> = ({
  children,
  hovered,
  selected,
  before,
  after,
  ...restProps
}: CustomSelectOptionProps) => {
  const title = typeof children === 'string' ? children : null;

  return (
    <Text
      {...restProps}
      weight="regular"
      role="option"
      title={title}
      aria-selected={selected}
      scopedClass={classNames('CustomSelectOption', {
        ['CustomSelectOption--hover']: hovered,
        ['CustomSelectOption--selected']: !!selected,
      })}
    >
      {hasReactNode(before) && <div scopedClass="CustomSelectOption__before">{before}</div>}
      <div scopedClass="CustomSelectOption__label">{children}</div>
      {hasReactNode(after) && <div scopedClass="CustomSelectOption__after">{after}</div>}
      {selected && (
        <div scopedClass="CustomSelectOption__selectedIcon">
          <Icon16Done fill="var(--accent)" />
        </div>
      )}
    </Text>
  );
};

export default CustomSelectOption;
