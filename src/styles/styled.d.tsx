import "styled-components";
import { Colors, Responsive } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    responsive: Responsive;
    colors: Colors;
  }
}
