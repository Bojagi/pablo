type DropdownListFilterFn<V> = (value: V, filterTerm: string) => boolean;

interface DropdownListItemRenderFnOptions<V> {
  value: V;
  label?: string | React.ReactNode;
  onSelect: () => void;
  selected?: boolean;
}

type DropdownListItemRenderFn<V> = (
  options: DropdownListItemRenderFnOptions<V>
) => React.ReactNode | React.ReactNode;

interface DropdownListItem<V, O = V> {
  value: V;
  label?: string;
  render?: DropdownListItemRenderFn<V>;
  wrap?: boolean;
  key?: string | number;
  toOutput?: (value: V) => O;
  toString?: (value: V) => string;
  filter?: (value: V, term: string) => boolean;
}

export type { DropdownListItem, DropdownListItemRenderFn, DropdownListFilterFn };
