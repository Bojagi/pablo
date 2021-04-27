import React, {
  forwardRef,
  PointerEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
// import { renderToStaticMarkup } from 'react-dom/server';
import { css } from 'styled-components';
import useResizeObserver from 'use-resize-observer';
import { Flex, LayoutBoxProps } from '../Box';
import { MoreIcon } from '../Icons';
import { Menu, MenuItem } from '../Menu';
import { useComponentStyle } from '../theme/useComponentStyle';
import { BaseProps } from '../types';
import { guaranteeArray } from '../utils/guaranteeArray';
import { useCustomStyles } from '../utils/useCustomStyles';
import { useForwardRef } from '../utils/useForwardRef';
import { TabsStyleProperties } from './styles';
import { Tab, TabProps } from './Tab';

export interface TabsProps extends LayoutBoxProps, BaseProps<TabsStyleProperties> {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  selected?: string;
  onSelect?: (selectedName: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, selected, onSelect, customStyles, ...props }: TabsProps, outsideRef) => {
    const gap = useComponentStyle('tabs.gap');
    const shadowRef = useRef<HTMLDivElement>(null);
    const [iconButtonRef, setIconButtonRef] = useState<HTMLButtonElement | null>(null);
    const [firstWidthCalculated, setFirstWidthCalculated] = useState(false);
    const [displayableItems, setDisplayableItems] = useState<ReactElement<TabProps>[]>(
      guaranteeArray(children)
    );
    const [additionalItems, setAdditionalItems] = useState<ReactElement<TabProps>[]>([]);
    const [additionalMenuOpen, setAdditionalMenuOpen] = useState(false);
    const [innerRef, setInnerRef] = useForwardRef(outsideRef);
    const { width } = useResizeObserver({
      ref: innerRef,
    });

    const getItemSelected = useCallback(
      (item: React.ReactElement<TabProps>) =>
        selected ? selected === item.props.name : item.props.selected,
      [selected]
    );

    const handleItemClick = useCallback(
      (item: React.ReactElement<TabProps>) => (e: PointerEvent<any>) => {
        if (item.props.onClick) {
          item.props.onClick(e);
        } else if (onSelect) {
          onSelect(item.props.name);
        }
      },
      [onSelect]
    );

    useEffect(() => {
      const childrenArray = guaranteeArray(children);

      if (width && iconButtonRef) {
        const fittingNodeCount = getFittingChildNodeCount(shadowRef.current!, width, iconButtonRef);
        setDisplayableItems(childrenArray.slice(0, fittingNodeCount));
        setAdditionalItems(childrenArray.slice(fittingNodeCount, childrenArray.length));
        setFirstWidthCalculated(true);
      }
    }, [children, width, iconButtonRef]);
    const getCustomStyles = useCustomStyles('tabs.styles', customStyles);

    return (
      <>
        <Flex
          css={
            !firstWidthCalculated
              ? css`
                  opacity: 0;
                `
              : getCustomStyles('root')
          }
          flexWrap="wrap"
          data-testid="pbl-tabs"
          ref={setInnerRef}
          mx={`-${gap}`}
          {...props}
        >
          {displayableItems.map((child) =>
            React.cloneElement(child, {
              key: child.props.name,
              mx: gap,
              onClick: handleItemClick(child),
              selected: getItemSelected(child),
            })
          )}
          <Menu
            open={additionalMenuOpen}
            onClose={() => setAdditionalMenuOpen(false)}
            placement="bottom-end"
            items={additionalItems.map((item) => (
              <MenuItem
                key={item.props.name}
                selected={getItemSelected(item)}
                onClick={(e) => {
                  handleItemClick(item)(e);
                  setAdditionalMenuOpen(false);
                }}
              >
                {item.props.children}
              </MenuItem>
            ))}
          >
            <Tab
              selected={additionalItems.find(getItemSelected)}
              css={
                additionalItems.length < 1
                  ? css`
                      opacity: 0;
                      pointer-events: none;
                    `
                  : undefined
              }
              ml={4}
              ref={setIconButtonRef}
              onClick={() => setAdditionalMenuOpen(true)}
              icon={<MoreIcon />}
            />
          </Menu>
        </Flex>
        <div
          aria-hidden="true"
          style={{ visibility: 'hidden', position: 'absolute' }}
          ref={shadowRef}
        >
          {children}
        </div>
      </>
    );
  }
);

function getNodeWidth(node?: HTMLElement | null) {
  if (!node) {
    return 0;
  }

  const { offsetWidth } = node as HTMLElement;
  const style = getComputedStyle(node as HTMLElement);
  const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  return offsetWidth + margin;
}

function getFittingChildNodeCount(
  parentNode: HTMLDivElement,
  maxWidth: number,
  moreButtonRef: HTMLButtonElement
) {
  const moreButtonWidth = getNodeWidth(moreButtonRef);
  let countedWidth = moreButtonWidth;
  let i = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const node of Array.from(parentNode.childNodes)) {
    if (node.nodeType === Node.ELEMENT_NODE && node !== moreButtonRef) {
      const nodeWidth = getNodeWidth(node as HTMLElement);

      if (countedWidth + nodeWidth > maxWidth) {
        break;
      }

      i += 1;
      countedWidth += nodeWidth;
    }
  }

  return i;
}
