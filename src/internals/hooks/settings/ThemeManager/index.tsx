import ThemeComponent from "./theme";
import BPP from "@api/global";

const ThemeManager = () => {
    return (
        <>
            {BPP.Themes.themes.map((Theme) => {
                return <ThemeComponent key={Theme.name} {...Theme} />;
            })}
        </>
    );
}

export default ThemeManager;