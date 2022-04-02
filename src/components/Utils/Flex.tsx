import styled, { CSSProp, css } from 'styled-components';
import { HTMLAttributes } from 'react';

interface IFlex extends HTMLAttributes<HTMLDivElement> {
  justify?: string;
  align?: string;
  direction?: string;
  flexWrap?: boolean;
  gap?: string;
  tabIndex?: number;
  marginBottom?: string;
  flexColMobile?: boolean;
}

export const Flex = styled.div<IFlex>`
  ${({
    justify,
    align,
    direction,
    flexWrap,
    gap,
    marginBottom,
    flexColMobile,
  }): CSSProp => css`
    display: flex;
    justify-content: ${justify ? justify : 'center'};
    align-items: ${align ? align : 'center'};
    flex-direction: ${direction ? direction : 'row'};
    flex-wrap: ${flexWrap ? 'wrap' : 'no-wrap'};
    margin-bottom: ${marginBottom ? marginBottom : '0'};

    gap: ${gap};
    @supports not (gap: ${gap}) {
      & > * + * {
        margin-left: ${direction === 'column' ? '0' : gap};
        margin-top: ${direction === 'column' ? gap : '0'};
      }
    }

    @media (max-width: 600px) {
      flex-direction: ${flexColMobile
        ? 'column'
        : direction
        ? direction
        : 'row'};
    }
  `}
`;
