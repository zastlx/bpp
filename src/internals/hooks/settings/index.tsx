import BPP from "@api/global";
import { useState } from "react";
import PluginManager from "./PluginManager/";
import ThemeManager from "./ThemeManager";
import NormalSettings from "./NormalSettings";



const Settings = () => {
    const [page, setPage] = useState(1); // 1 - normal blacket. 2 - plugin manager. 3 - theme manager

    return (
        <>
            {page === 1 ? <NormalSettings setPage={setPage}/> : (
                page === 2 ? <PluginManager setPage={setPage}/> : <ThemeManager setPage={setPage}/>
            )}
        </>
    )
};

export default (query: string) => {
    const root = BPP.Common.ReactDOM.createRoot(document.querySelector(query));

    root.render(
        <>
           <div className="styles__header___WE435-camelCase">Settings</div>
           <div className="styles__mainContainer___4TLvi-camelCase" style={{
               justifyContent: "center"
           }}>
               <Settings/>
          </div>
        </>
    );
}