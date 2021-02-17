import { FC, HTMLAttributes, ReactNode } from 'react';
import { classNames } from '../../lib/classNames';
import { hasReactNode } from '../../lib/utils';
import Title from '../Typography/Title/Title';
import Headline from '../Typography/Headline/Headline';
import { HasRootRef } from '../../types';

export interface PlaceholderProps extends HTMLAttributes<HTMLDivElement>, HasRootRef<HTMLDivElement> {
  /**
   * Иконка
   */
  icon?: ReactNode;
  /**
   * Заголовок плейсхолдера
   */
  header?: ReactNode;
  /**
   * Кнопка действия
   */
  action?: ReactNode;
  /**
   * Растягивает плейсхолдер на весь экран, но в таком случае на экране должен быть только плейсхолдер
   */
  stretched?: boolean;
}

const Placeholder: FC<PlaceholderProps> = (props: PlaceholderProps) => {
  const {
    icon,
    header,
    action,
    children,
    stretched,
    getRootRef,
    ...restProps
  } = props;

  return (
    <div
      {...restProps}
      ref={getRootRef}
      scopedClass={classNames('Placeholder', {
        'Placeholder--stretched': stretched,
      })}
    >
      <div scopedClass="Placeholder__in">
        {hasReactNode(icon) && <div scopedClass="Placeholder__icon">{icon}</div>}
        {hasReactNode(header) && <Title level="2" weight="medium" scopedClass="Placeholder__header">{header}</Title>}
        {hasReactNode(children) && <Headline weight="regular" scopedClass="Placeholder__text">{children}</Headline>}
        {hasReactNode(action) && <div scopedClass="Placeholder__action">{action}</div>}
      </div>
    </div>
  );
};

export default Placeholder;
