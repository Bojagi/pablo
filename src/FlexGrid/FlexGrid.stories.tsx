import React, { useEffect, useRef, useState } from 'react';
import { FlexGrid, FlexGridColumnProps } from './FlexGrid';
import { Paragraph } from '../Typography';

export default {
  title: 'Grid',
};

const ColumnItem = ({ height = 100, size, ...props }: Omit<FlexGridColumnProps, 'children'>) => {
  const ref = useRef(null);
  const [sizeText, setSizeText] = useState('');

  useEffect(() => {
    const cb = () => {
      if (ref.current) {
        setSizeText(getComputedStyle(ref.current).getPropertyValue('--pbl-flexgrid-column-width'));
      }
    };
    cb();
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
  }, []);

  return (
    <FlexGrid.Column
      height={height}
      size={size}
      ref={ref}
      bgColor="brand.main"
      textColor="brand.contrastText"
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Paragraph>Size {sizeText}</Paragraph>
    </FlexGrid.Column>
  );
};

export const OneLineGrid = () => (
  <FlexGrid width="80vw" gap={1}>
    <ColumnItem height={300} size={8} />
    <ColumnItem height={300} size={4} />
  </FlexGrid>
);

export const MultiLineGrid = () => (
  <FlexGrid width="80vw">
    <ColumnItem size={8} />
    <ColumnItem size={4} />
    <ColumnItem size={3} />
    <ColumnItem size={3} />
    <ColumnItem size={3} />
    <ColumnItem size={3} />
    <ColumnItem size={4} />
    <ColumnItem size={8} />
  </FlexGrid>
);

export const ResponsiveGrid = () => (
  <FlexGrid width="80vw" gap={1}>
    <ColumnItem height={{ _: 150, sm: 300 }} size={{ _: 6, sm: 8 }} />
    <ColumnItem height={{ _: 150, sm: 300 }} size={{ _: 6, sm: 4 }} />
    <ColumnItem height={200} size={{ _: 12, sm: 4 }} />
    <ColumnItem height={200} size={{ _: 12, sm: 4 }} />
    <ColumnItem height={200} size={{ _: 12, sm: 4 }} />
  </FlexGrid>
);

export const VerticalSpacing = () => (
  <FlexGrid width="80vw" gap={[1, 4]}>
    <ColumnItem size={8} />
    <ColumnItem size={4} />
    <ColumnItem size={3} />
    <ColumnItem size={3} />
    <ColumnItem size={3} />
    <ColumnItem size={3} />
    <ColumnItem size={4} />
    <ColumnItem size={8} />
  </FlexGrid>
);

export const FillupGrid = () => (
  <FlexGrid width="80vw">
    <ColumnItem size={3} />
    <ColumnItem size="fillup" />
    <ColumnItem size={3} />
    <ColumnItem size={6} />
    <ColumnItem size="fillup" />
  </FlexGrid>
);

export const StretchGrid = () => (
  <FlexGrid width="80vw" alignItems="stretch" gap={0}>
    <ColumnItem size={4} height="auto" bgColor="negative.main" />
    <ColumnItem size={8} height={800} bgColor="positive.main" />
  </FlexGrid>
);

export const EightColumnsGrid = () => (
  <FlexGrid width="80vw" columns={8}>
    <ColumnItem size={8} />
    <ColumnItem size={4} />
    <ColumnItem size={3} />
    <ColumnItem size={3} />
    <ColumnItem size={3} />
    <ColumnItem size={3} />
    <ColumnItem size={4} />
    <ColumnItem size={8} />
  </FlexGrid>
);
