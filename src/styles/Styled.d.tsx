import "styled-components";
import { Colors, Responsive } from "./Theme";

declare module "styled-components" {
  export interface DefaultTheme {
    responsive: Responsive;
    colors: Colors;
  }
}
