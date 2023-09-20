import { alertUtil } from "@api/util"; 
import ThemeComponent from "./theme"; 
import BPP from "@api/global"; 
import configManager from "@internals/configManager"; 
import loadThemes from "@internals/loadThemes"; 
import { useEffect, useState } from "react"; 
 
const ThemeManager = () => { 
    const [themes, setThemes] = useState(BPP.Themes.themes); 
    const [a, setA] = useState(1); 
     
    useEffect(() => { 
        const subs = [ 
            BPP.Dispatcher.subscribe("@bpp/update/themes", () => { 
                console.log(BPP.Themes.themes); 
                setThemes(BPP.Themes.themes) 
                setA(Math.random()); 
            }) 
        ]; 
        return () => subs.forEach((unsub) => unsub()); 
    }, []);
 
    return ( 
        <> 
            {a ? "" : ""} 
            {themes.length > 0 ? themes.map((Theme) => { 
                return <ThemeComponent key={Theme.name} {...Theme} />; 
            }) : ( 
                <div onClick={() => window.open("https://bpp.zastix.club/themes")} role="button" className="styles__button___1_E-G-camelCase" style={{ 
                    display: "inline-block", 
                    maxWidth: "200px" 
                }}> 
                    <div role="button" className="styles__button___1_E-G-camelCase styles__rightButton___2_ZIX-camelCase"> 
                        <div className="styles__shadow___3GMdH-camelCase" /> 
                        <div className="styles__edge___3eWfq-camelCase" style={{ 
                            backgroundColor: "#2f2f2f" 
                        }} /> 
                        <div className="styles__front___vcvuy-camelCase" style={{ 
                            backgroundColor: "#2f2f2f" 
                        }}> 
                             <div className="styles__rightButtonInside___14imT-camelCase" style={{"fontSize":"30px","fontFamily":"Nunito, sans-serif","fontWeight":"700"}}> 
                                Get Themes 
                             </div> 
                        </div> 
                    </div> 
                </div> 
            )} 
        </> 
    ); 
} 
 
const addTheme = () => { 
    let link = ""; 
 
    alertUtil("Add a Theme", "", [ 
        { 
            click: (close) => { 
                try { 
                    new URL(link); 
                    BPP.Settings.themeLinks.push(link); 
                    configManager.syncConfig(); 
                    loadThemes(); 
                    close(true); 
                } catch { 
                    close(true); 
                } 
            }, 
            text: "Install" 
        } 
    ], [ 
        { 
            binding: { 
                manual: true, 
                set: (e) => { 
                    link = e.target.value; 
                } 
            } 
        } 
    ]); 
} 
 
export { addTheme }; 
export default ThemeManager;