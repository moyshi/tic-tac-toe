'use client';
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});


export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    )
}