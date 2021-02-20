import { HTMLAttributes, FC } from 'react';
import { Icon20Cancel } from '@vkontakte/icons';
import Tappable from '../Tappable/Tappable';
import { getClassName } from '../../helpers/getClassName';
import { usePlatform } from '../../hooks/usePlatform';

export type ModalDismissButtonProps = HTMLAttributes<HTMLButtonElement>;

const ModalDismissButton: FC<ModalDismissButtonProps> = (props) => {
  const platform = usePlatform();
  return (
    <Tappable scopedClass={getClassName('ModalDismissButton', platform)} {...props}>
      <Icon20Cancel />
    </Tappable>
  );
};

export default ModalDismissButton;
