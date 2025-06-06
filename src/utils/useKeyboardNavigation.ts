import { useCallback, useEffect, useState } from 'react';

const useKeyboardNavigation = <T>(
  items: T[],
  onSelect: (item: T) => void,
  active: boolean = true
) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev >= items.length - 1 ? 0 : prev + 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => {
            return prev <= 0 ? items.length - 1 : prev - 1;
          });
          break;
        case 'Enter':
          e.preventDefault();
          e.stopPropagation();
          if (selectedIndex >= 0) {
            const selectedItem = items[selectedIndex];
            if (selectedItem) {
              onSelect(selectedItem);
            }
          }
          break;
        default:
          setSelectedIndex(-1);
      }
    },
    [items, onSelect, selectedIndex]
  );

  // Reset index when items change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [items]);

  useEffect(() => {
    if (active) {
      document.addEventListener('keydown', handleKeyDown, true);
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
      };
    }
    setSelectedIndex(-1);
    return () => {};
  }, [handleKeyDown, active]);

  return {
    selectedIndex,
  };
};

export { useKeyboardNavigation };
