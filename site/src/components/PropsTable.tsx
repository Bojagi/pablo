import { useDynamicImport } from 'docusaurus-plugin-react-docgen-typescript/useDynamicImport';

const getFilterFn = (type) => {
  switch (type) {
    case 'direct':
      return (prop) => !prop.parent?.fileName.includes('interpolations');
    case 'box':
      return (prop) => prop.parent?.fileName.includes('interpolations');
    case 'all':
    default:
      return () => true;
  }
};

const transformFn = (prop) => {
  return {
    ...prop,
    type: prop.type
      ? { name: prop.type.name.replace(/ResponsiveValue<(.*?),.*>$/, 'ResponsiveValue<$1>') }
      : null,
  };
};

const getFilteredProps = (type, props) => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (getFilterFn(type)(value)) {
      acc[key] = transformFn(value);
    }

    return acc;
  }, {});
};

export const PropsTable = ({ name, type }) => {
  const rawProps = useDynamicImport(name);

  const props = getFilteredProps(type, rawProps);

  if (!props) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default Value</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props).map((key) => {
          return (
            <tr key={key}>
              <td>
                <code>{key}</code>
              </td>
              <td>
                <code>{props[key].type?.name}</code>
              </td>
              <td>{props[key].defaultValue && <code>{props[key].defaultValue.value}</code>}</td>
              <td>{props[key].required ? 'Yes' : 'No'}</td>
              <td>{props[key].description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
