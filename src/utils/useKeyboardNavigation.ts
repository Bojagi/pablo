import { useState } from 'react';

const useKeyboardNavigation = <T>(items: T[], onSelect: (item: T) => void) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
  };

  return {
    selectedIndex,
    handleKeyDown,
  };
};

export { useKeyboardNavigation };
