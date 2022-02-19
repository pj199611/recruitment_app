import {
  Grid as MaterialUiGrid,
  Container as MaterialUiContainer,
} from "@material-ui/core/";
import { GridProps } from "@material-ui/core/Grid";
import { ContainerProps } from "@material-ui/core/Container";

export const Row = (props: GridProps): JSX.Element => (
  <MaterialUiGrid {...props} container>
    {props.children}
  </MaterialUiGrid>
);

export const Col = (props: GridProps): JSX.Element => (
  <MaterialUiGrid {...props} item>
    {props.children}
  </MaterialUiGrid>
);

export const Container = (props: ContainerProps): JSX.Element => (
  <MaterialUiContainer {...props}>{props.children}</MaterialUiContainer>
);
