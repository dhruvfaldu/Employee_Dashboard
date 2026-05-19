import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";

    return (
        <Button
            variant="outline"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="h-11 rounded-xl border-border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
            {isDark ? (
                <>
                    <Sun className="mr-2 h-4 w-4" />Light
                </>
            ) : (
                <>
                    <Moon className="mr-2 h-4 w-4" />Dark
                </>
            )}
        </Button>
    );
}

export default ThemeToggle;