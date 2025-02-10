import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Slider } from './Slider';
import * as stories from './Slider.stories';
import { PabloThemeProvider } from '../theme';

const defaultProps = {
  from: 0,
  to: 100,
  value: 50,
  onChange: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

test('renders correctly', () => {
  render(<Slider {...defaultProps} />);
  expect(screen.getByRole('slider')).toBeInTheDocument();
});

test('calls onChange when dragging thumb', () => {
  const { container } = render(<Slider {...defaultProps} />);
  const thumb = container.querySelector('[data-testid="slider-thumb"]');
  const rail = container.querySelector('[data-testid="slider-rail"]');

  if (!thumb || !rail) throw new Error('Thumb or rail not found');

  // Mock getBoundingClientRect
  const railRect = { left: 0, width: 200 };
  vi.spyOn(rail, 'getBoundingClientRect').mockImplementation(() => railRect as DOMRect);
  // Set bounding rect that the click is exactly in the center
  jest
    .spyOn(thumb, 'getBoundingClientRect')
    .mockImplementation(() => ({ left: 90, width: 20 }) as DOMRect);

  // Simulate drag start
  fireEvent.mouseDown(thumb, { clientX: 100 });

  // Simulate drag movement
  fireEvent.mouseMove(window, { clientX: 150 });

  expect(defaultProps.onChange).toHaveBeenCalledWith(75);
});

test('handles custom range correctly', () => {
  const customProps = {
    ...defaultProps,
    from: -100,
    to: 100,
    value: 0,
  };

  const { container } = render(<Slider {...customProps} />);
  const thumb = container.querySelector('[data-testid="slider-thumb"]');
  const rail = container.querySelector('[data-testid="slider-rail"]');

  if (!thumb || !rail) throw new Error('Thumb or rail not found');

  const railRect = { left: 0, width: 200 };
  vi.spyOn(rail, 'getBoundingClientRect').mockImplementation(() => railRect as DOMRect);
  // Set bounding rect that the click is exactly in the center
  jest
    .spyOn(thumb, 'getBoundingClientRect')
    .mockImplementation(() => ({ left: 90, width: 20 }) as DOMRect);

  fireEvent.mouseDown(thumb, { clientX: 100 });
  fireEvent.mouseMove(window, { clientX: 150 });

  expect(customProps.onChange).toHaveBeenCalledWith(50);
});

test('constrains value within bounds', () => {
  const { container } = render(<Slider {...defaultProps} />);
  const thumb = container.querySelector('[data-testid="slider-thumb"]');
  const rail = container.querySelector('[data-testid="slider-rail"]');

  if (!thumb || !rail) throw new Error('Thumb or rail not found');

  // Mock getBoundingClientRect
  const railRect = { left: 0, width: 200 };
  vi.spyOn(rail, 'getBoundingClientRect').mockImplementation(() => railRect as DOMRect);

  // Simulate drag beyond maximum
  fireEvent.mouseDown(thumb, { clientX: 100 });
  fireEvent.mouseMove(document, { clientX: 300 });

  expect(defaultProps.onChange).toHaveBeenCalledWith(100);

  // Simulate drag below minimum
  fireEvent.mouseMove(document, { clientX: -100 });

  expect(defaultProps.onChange).toHaveBeenCalledWith(0);
});

test('stops dragging on mouseup', () => {
  const { container } = render(<Slider {...defaultProps} />);
  const thumb = container.querySelector('[data-testid="slider-thumb"]');

  if (!thumb) throw new Error('Thumb not found');

  fireEvent.mouseDown(thumb);
  fireEvent.mouseUp(document);

  // Simulate move after mouseup
  fireEvent.mouseMove(document, { clientX: 150 });

  expect(defaultProps.onChange).not.toHaveBeenCalled();
});

test('updates track width based on value', () => {
  render(<Slider {...defaultProps} value={25} />);
  const track = screen.getByTestId('slider-track');
  expect(track).toHaveStyle({ width: '25%' });
});

test('updates thumb position based on value', () => {
  render(<Slider {...defaultProps} value={75} />);
  const thumb = screen.getByTestId('slider-thumb');
  expect(thumb).toHaveStyle({ left: '75%' });
});

test('SimpleSlider story snapshot', () => {
  const { container } = render(createStoryComponent(stories.SimpleSlider));
  expect(container.firstChild).toMatchSnapshot();
});

test('OffsetRangeSlider story snapshot', () => {
  const { container } = render(createStoryComponent(stories.OffsetRangeSlider));
  expect(container.firstChild).toMatchSnapshot();
});

test('LowerOutOfBounds story snapshot', () => {
  const { container } = render(createStoryComponent(stories.LowerOutOfBounds));
  expect(container.firstChild).toMatchSnapshot();
});

test('UpperOutOfBounds story snapshot', () => {
  const { container } = render(createStoryComponent(stories.UpperOutOfBounds));
  expect(container.firstChild).toMatchSnapshot();
});

function createStoryComponent(Story) {
  return (
    <PabloThemeProvider>
      <Story {...Story.args} />
    </PabloThemeProvider>
  );
}
