import React, {isValidElement, useState} from "react"; 
import { isValidElementType } from "react-is"; 
import {Root, createRoot} from "react-dom/client"; 
import injectCSS from "./css"; 
 
interface ModalInput { 
    binding : { 
        value?: string; 
        manual?: boolean; 
        set?: React.ChangeEventHandler<HTMLInputElement> 
    }; 
    placeHolder?: string; 
    maxLength?: number; 
} 
 
interface ModalButton { 
    text: string; 
    click: (setHidden : (toggle : boolean) => void) => void; 
} 
const rootElem = document.createElement("div"); 
document.body.append(rootElem); 
let root: Root; 
 
const alert = (title: string, desc: string | React.ReactNode | React.FC<{setHidden: React.Dispatch<React.SetStateAction<boolean>>}>, buttons?: ModalButton[], inputs?: ModalInput[]) => { 
    root?.unmount(); 
    root = createRoot(rootElem); 
    root.render(<>{ 
        typeof desc == "string" || isValidElementType(desc) 
            ? (<_Modal title={title} desc={desc} buttons={buttons} inputs={inputs}/>) 
            : (<_Modal title={title} buttons={buttons} inputs={inputs}>{desc}</_Modal>) 
    } </>); 
} 
 
const _Modal = ({title, desc: desc, buttons, inputs, children}: { 
    title: string; 
    desc?: string | React.ReactNode | React.FC; 
    buttons?: ModalButton[]; 
    inputs?: ModalInput[]; 
    children?: React.ReactNode; 
}) => { 
    const DescElem: React.FC<{setHidden: React.Dispatch<React.SetStateAction<boolean>>}> = desc as React.FC<{setHidden: React.Dispatch<React.SetStateAction<boolean>>}>; 
    const [hidden, setHidden] = useState<boolean>(false); 
 
    if (hidden) root.unmount(); 
 
    return ( 
        <div className="arts__modal___VpEAD-camelCase"> 
            <div className="styles__container___1BPm9-camelCase"> 
                <div className="styles__text___KSL4--camelCase">{title}</div> 
                {typeof desc === "string" ? <div style={{"fontSize":"20px","lineHeight":"20px"}} className="styles__text___KSL4--camelCase">{desc}</div> : ( 
                    isValidElementType(desc) ? ( 
                        <DescElem setHidden={setHidden}/> 
                    ) : <>{children}</> 
                )} 
                {(buttons || inputs) && ( 
                    <div className="styles__holder___3CEfN-camelCase"> 
                    <div style={{ 
                        gap: "10px", 
                        flexDirection: "row" 
                    }} className="styles__numRow___xh98F-camelCase"> 
                        { inputs?.map((a, _) => { 
                            // @ts-ignore 
                            return (<div className="bpp-input-dad"><input key={_} value={a.binding?.value} onChange={a.binding?.manual ? a.binding.set : (e) => a.binding.set(e.target.value)} className="bpp-input" placeholder={a.placeHolder} maxLength={a.maxLength}/></div>); 
                        })} 
                    </div> 
                    <div style={{ 
                        gap: "10px", 
                        flexWrap: "wrap" 
                    }} className="styles__buttonContainer___2EaVD-camelCase"> 
                        { buttons?.map((btn, _) => { 
                            return ( 
                            <div onClick={() => btn.click(setHidden)} className="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button"> 
                                <div className="styles__shadow___3GMdH-camelCase" /> 
                                <div className="styles__edge___3eWfq-camelCase bpp-bg-mainclr" /> 
                                <div className="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase bpp-bg-mainclr">{btn.text}</div> 
                            </div>); 
                        })} 
                    </div> 
                </div> 
                )} 
            </div> 
        </div> 
    ); 
}; 
 
export {alert as alertUtil}; 
 
injectCSS(`.bpp-input-dad { 
    border: 3px solid rgba(0, 0, 0, 0.17); 
    border-radius: 6px; 
    width: 90%; 
    height: 50px; 
    margin: 0px; 
    display: flex; 
    flex-direction: row; 
    align-items: center; 
} 
 
.bpp-input { 
    border: none; 
    height: 40px; 
    line-height: 40px; 
    font-size: 28px; 
    text-align: center; 
    font-weight: 700; 
    font-family: Nunito, sans-serif; 
    color: #ffffff; 
    background-color: #3f3f3f; 
    outline: none; 
    width: 100%; 
} 
 
.bpp-bg-mainclr { 
    background-color: #2f2f2f; 
} 
 
.styles__button___3zpwV-camelCase { 
    margin: unset; 
} 
 
.styles__container___1BPm9-camelCase { 
    width: fit-content; 
    max-width: 600px; 
    min-width: 420px; 
}`);