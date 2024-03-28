import { Theme } from "@utils/types";
import ThemeBtn from "./themeBtn";

export default (theme: Theme) => {
    return (
        <div style={{
            width: "515px"
        }} className="styles__infoContainer___2uI-S-camelCase">
            <div className="styles__headerRow___1tdPa-camelCase">
                <div className="styles__infoHeader___1lsZY-camelCase">{theme.name}</div>
                <div style={{
                    display: "flex",
                    marginLeft: "auto",
                    flexWrap: "wrap",
                    flexDirection: "row-reverse"
                }}>
                    <ThemeBtn iconClass="fa-code" color="#5b5b5b" onClick={() => {
                        theme.url
                    }}/>
                    <ThemeBtn iconClass="fa-user-group" color="#515151" onClick={() => {
                        
                    }}/>
                    <ThemeBtn iconClass="fa-trash" color="red" onClick={() => theme.delete()}/>
                </div>
            </div>
            <div className="styles__text___1x37n-camelCase" style={{
                wordWrap: "break-word"
            }}>{theme.description}</div>
        </div>
    );
}