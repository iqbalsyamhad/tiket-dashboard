import styled, { css } from 'styled-components';
import { ListGroup } from 'react-bootstrap';

export const ListGroupContainer = styled(ListGroup)`
  overflow-y: scroll;
  max-height: 500px;
  position: absolute;
  z-index: 99;
  margin-top: 6px;
  overflow-x: hidden;

  ${({ show }) =>
    !show
      ? css`
          display: none;
        `
      : null}
`;
