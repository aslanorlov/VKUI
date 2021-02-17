import { Component, HTMLAttributes, ReactNode } from 'react';
import { HasPlatform, HasRootRef } from '../../types';
import { withAdaptivity, ViewWidth, AdaptivityProps } from '../../hoc/withAdaptivity';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { DOMProps, withDOM } from '../../lib/dom';

export interface PopoutRootProps extends HTMLAttributes<HTMLDivElement>, HasPlatform, AdaptivityProps, HasRootRef<HTMLDivElement> {
  popout?: ReactNode;
  modal?: ReactNode;
}

class PopoutRoot extends Component<PopoutRootProps & DOMProps> {
  static defaultProps: Partial<PopoutRootProps> = {
    popout: null,
  };

  get document() {
    return this.props.document;
  }

  get window() {
    return this.props.window;
  }

  componentDidUpdate(prevProps: PopoutRootProps) {
    if (this.props.popout && !prevProps.popout) {
      this.blurActiveElement();
    }
  }

  blurActiveElement() {
    if (typeof this.window !== 'undefined' && this.document.activeElement) {
      (this.document.activeElement as HTMLElement).blur();
    }
  }

  render() {
    const { popout, modal, viewWidth, children, getRootRef, window, document, ...restProps } = this.props;
    const isDesktop = viewWidth >= ViewWidth.TABLET;

    return (
      <div
        {...restProps}
        scopedClass="PopoutRoot"
        ref={getRootRef}
      >
        {children}
        <AppRootPortal>
          {!!popout && <div scopedClass={isDesktop ? 'PopoutRoot--absolute' : 'PopoutRoot__popout'}>{popout}</div>}
          {!!modal && <div scopedClass="PopoutRoot__modal">{modal}</div>}
        </AppRootPortal>
      </div>
    );
  }
}

export default withAdaptivity(withDOM<PopoutRootProps>(PopoutRoot), {
  viewWidth: true,
});
