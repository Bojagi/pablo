export default {
  typescript: true,
  title: 'Pablo 👨‍🎨',
  menu: ['Introduction', 'Components'],
  src: './src',
  filterComponents: (files) => {
    const filteredFiles = files
      .filter((filepath) => /^src\/[A-Z]\w*\/[A-Z]\w*.tsx$/.test(filepath))
      .filter((filepath) => !filepath.endsWith('.spec.tsx') && !filepath.endsWith('.stories.tsx'));
    return filteredFiles;
  },
};
