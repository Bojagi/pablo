export interface TypographyBase {
  fontFamily: string;
  fontWeight: string | number;
}

export interface TypographyDefinition {
  fontFamily?: string;
  fontSize: string;
  lineHeight: string;
  fontWeight?: string | number;
  marginBottom: string | number;
}

export interface Typography {
  base: TypographyBase;
  paragraph: TypographyDefinition;
  paragraphBold: TypographyDefinition;
  button: TypographyDefinition;
  headline: TypographyDefinition;
  title: TypographyDefinition;
  subtitle: TypographyDefinition;
  info: TypographyDefinition;
  infoBold: TypographyDefinition;
}

export const typography: Typography = {
  base: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontWeight: 'normal',
  },
  paragraph: {
    lineHeight: '1.4em',
    fontSize: '0.875rem',
    marginBottom: '0.75em',
  },
  paragraphBold: {
    lineHeight: '1.4em',
    fontSize: '0.875rem',
    marginBottom: '0.75em',
    fontWeight: 500,
  },
  button: {
    lineHeight: '1.29em',
    fontSize: '0.875rem',
    marginBottom: 0,
  },
  headline: {
    lineHeight: '1.29em',
    fontSize: '1.75rem',
    marginBottom: '0.5em',
  },
  title: {
    lineHeight: '1.3333333em',
    fontSize: '1.5rem',
    marginBottom: '0.5em',
  },
  subtitle: {
    lineHeight: '1.375em',
    fontSize: '1rem',
    marginBottom: '0.5em',
  },
  info: {
    lineHeight: '1.5em',
    fontSize: '0.75rem',
    marginBottom: 0,
  },
  infoBold: {
    lineHeight: '1.5em',
    fontSize: '0.75rem',
    marginBottom: 0,
    fontWeight: 500,
  },
};
