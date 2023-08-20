import blacket from "@api/blacket";
import BPP from "@api/global";
import CreditComponent from "./credit";
import { insertAfter } from "@utils/other";
import { useEffect, useState } from "react";
import { Credits } from "@utils/constants";
import { BlacketCredit } from "@utils/types";

const CreditsComponent = () => {
    const credits = insertAfter(blacket().credits, blacket().credits.findIndex((a) => a.nickname === "Doxy"), blacket().credits[blacket().credits.findIndex((a) => a.nickname === "zastix")]);
    credits.splice(credits.findLastIndex((a) => a.nickname === "zastix"), 1);

    const [blacketCredits] = useState(credits);
    const [BPPCredits, setBPPCredits] = useState([]);
    const [isNormal, setIsNormal] = useState(true);

    useEffect(() => {
        Credits().then(a => {
            setBPPCredits(a);
        });
    }, []);
    
    return (
        <>
            <div onClick={() => setIsNormal(!isNormal)} style={{"color":"#ffffff","display":"inline-block","textDecoration":"underline","paddingTop":"4px","paddingBottom":"3px","WebkitUserSelect":"none","MozUserSelect":"none","userSelect":"none","outline":"none","cursor":"pointer"}} className="styles__header___153FZ-camelCase">Credits</div>
            <div className="styles__fullContainer___3Wl6C-camelCase">
                <div className="styles__creditsContainer___fkEnvi-camelCase">
                    {
                    isNormal ? 
                        (blacketCredits.map((credit: BlacketCredit) => {
                            // i cant see his name with his normal color
                            if (credit.nickname === "Ash886") credit.user.color = "rgb(111 111 111)";

                            return (
                                <CreditComponent key={credit.user.username} name={credit.user.username} role={credit.user.role} img={credit.image ?? credit.user.avatar} note={credit.note} color={credit.user.color} raw={credit}/>
                            );
                        }))
                    : (BPPCredits.map((credit) => {
                        return (
                            <CreditComponent key={credit.user.username} name={credit.user.username} role={credit.user.role} img={credit.image ?? credit.user.avatar} note={credit.note} color={credit.user.color} raw={credit}/>
                        );
                    }))
                }
                </div>
            </div>
        </>
    );
}

export default (query: string) => {
    const root = BPP.Common.ReactDOM.createRoot(document.querySelector(query));

    root.render(<CreditsComponent/>);
}