import 'react';

declare module 'react' {
  interface Attributes {
    scopedClass?: string | string[];
  }
}
