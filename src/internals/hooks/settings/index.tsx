import BPP from "@api/global";
import { useState } from "react";
import PluginManager from "./PluginManager/";
import ThemeManager from "./ThemeManager";
import NormalSettings from "./NormalSettings";



const Settings = () => {
    const [page, setPage] = useState(1); // 1 - normal blacket. 2 - plugin manager. 3 - theme manager

    return (
        <>
            <div className="styles__header___WE435-camelCase">Settings</div>
            <div className="styles__mainContainer___4TLvi-camelCase" style={{
                justifyContent: "center"
            }}>
                {page === 1 ? <NormalSettings setPage={setPage}/> : (
                    page === 2 ? <PluginManager/> : <ThemeManager/>
                )}
            </div>
            {page !== 1 && (
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
       </>
    )
};

export default (query: string) => {
    const root = BPP.Common.ReactDOM.createRoot(document.querySelector(query));

    root.render(<Settings/>);
}