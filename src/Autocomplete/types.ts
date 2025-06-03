type AutocompleteFilterFn<V> = (value: V, filterTerm: string) => boolean;

interface AutocompleteItemRenderFnOptions<V, O = V> {
  item: AutocompleteItem<V, O>;
  onSelect: () => void;
  selected?: boolean;
}

type AutocompleteItemRenderFn<V, O = V> = (
  options: AutocompleteItemRenderFnOptions<V, O>
) => React.ReactNode | React.ReactNode;

interface AutocompleteItem<V, O = V> {
  value: V;
  render?: AutocompleteItemRenderFn<V, O>;
  wrap?: boolean;
  key?: string | number;
  toOutput?: (value: V) => O;
  toString?: (value: V) => string;
  filter?: (value: V, term: string) => boolean;
}

export type { AutocompleteItem, AutocompleteItemRenderFn, AutocompleteFilterFn };
