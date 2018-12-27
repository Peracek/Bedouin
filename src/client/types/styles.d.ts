import { CSSProperties } from '@material-ui/core/styles/withStyles'

declare module '@material-ui/core/styles/createMixins' {
  export interface Mixins {
    mainContent: CSSProperties
  }
  export interface MixinsOptions extends Partial<Mixins> {
    mainContent: CSSProperties
  }
}