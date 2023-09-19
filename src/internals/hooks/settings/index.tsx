import BPP from "@api/global";
import { useState } from "react";
import PluginManager from "./PluginManager/";
import ThemeManager, { addTheme } from "./ThemeManager";
import NormalSettings from "./NormalSettings";

export enum SETTINGS_PAGES {
    normal=1,
    plugins=2,
    themes=3
}

const Settings = () => {
    const [page, setPage] = useState(SETTINGS_PAGES.normal); // 1 - normal blacket. 2 - plugin manager. 3 - theme manager

    return (
        <>
            <div className="styles__header___WE435-camelCase">{page === SETTINGS_PAGES.normal ? "Settings" : (
                page === SETTINGS_PAGES.plugins ? "Plugins" : "Themes"
            )}</div>
            <div className="styles__mainContainer___4TLvi-camelCase" style={{
                justifyContent: "center"
            }}>
                {page === SETTINGS_PAGES.normal ? <NormalSettings setPage={setPage}/> : (
                    page === SETTINGS_PAGES.plugins ? <PluginManager/> : <ThemeManager/>
                )}
            </div>
            {page !== SETTINGS_PAGES.normal && (
                <div onClick={() => setPage(1)} style={{"position":"absolute","left":"0","bottom":"0"}}>
                    <div role="button" className="styles__button___1_E-G-camelCase styles__rightButton___2_ZIX-camelCase">
                        <div className="styles__shadow___3GMdH-camelCase"></div>
                        <div className="styles__edge___3eWfq-camelCase" style={{
                            backgroundColor: "#2f2f2f"
                        }}></div>
                        <div className="styles__front___vcvuy-camelCase" style={{
                            backgroundColor: "#2f2f2f"
                        }}>
                             <div className="styles__rightButtonInside___14imT-camelCase" style={{"fontSize":"30px","fontFamily":"Nunito, sans-serif","fontWeight":"700"}}>Back</div>
                        </div>
                    </div>
                </div>
            )}
            {page === SETTINGS_PAGES.themes && (
                <div onClick={addTheme} style={{"position":"absolute","right":"0","bottom":"0"}}>
                    <div role="button" className="styles__button___1_E-G-camelCase styles__rightButton___2_ZIX-camelCase">
                        <div className="styles__shadow___3GMdH-camelCase"></div>
                        <div className="styles__edge___3eWfq-camelCase" style={{
                            backgroundColor: "#2f2f2f"
                        }}></div>
                        <div className="styles__front___vcvuy-camelCase" style={{
                            backgroundColor: "#2f2f2f"
                        }}>
                            <div className="styles__rightButtonInside___14imT-camelCase" style={{"fontSize":"30px","fontFamily":"Nunito, sans-serif","fontWeight":"700"}}>
                                Add Theme
                            </div>
                        </div>
                    </div>
                </div>
            )}
       </>
    )
};

export default (query: string) => {
    const root = BPP.Common.ReactDOM.createRoot(document.querySelector(query));

    root.render(<Settings/>);
}