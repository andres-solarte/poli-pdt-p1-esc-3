import { createTheme } from '@mui/material/styles';
import { baseTheme, overrides } from './options';

const theme = createTheme(baseTheme, {
  components: overrides,
});

export default theme;
