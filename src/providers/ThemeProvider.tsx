import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
    children: React.ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
        </NextThemesProvider>
    );
}

export default ThemeProvider;