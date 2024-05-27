import type { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material';

import basePalette from './base-palette';
import baseTypography from './base-typography';

const themeOptions: ThemeOptions = {};

const baseTheme = createTheme(themeOptions);

export const { palette, typography, spacing, shape } = baseTheme;

export default baseTheme;
