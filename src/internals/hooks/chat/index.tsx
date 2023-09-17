import BPP from "@api/global";
import CommandComponent from "./command";
import styles from "./chat.module.css";
import { useEffect, useState } from "react";

const ChatCommands = () => {
    const [visible, setVisible] = useState(false);
    const [inputText, setInputText] = useState("");

    const compare = (s1: string, s2: string) => {
        function editDistance(s1, s2) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();
          
            let costs = new Array();
            for (var i = 0; i <= s1.length; i++) {
              let lastValue = i;
              for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                  costs[j] = j;
                else {
                  if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                      newValue = Math.min(Math.min(newValue, lastValue),
                        costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                  }
                }
              }
              if (i > 0)
                costs[s2.length] = lastValue;
            }
            return costs[s2.length];
        }

        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
          longer = s2;
          shorter = s1;
        }
        let longerLength= longer.length;
        if (longerLength == 0) return 1.0;
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength.toString());
    }

    useEffect(() => {
        const chatBox: HTMLInputElement = document.querySelector(".styles__chatInputBox___fvMA4-camelCase");
        const handleChange = (ev) => {
            setInputText(ev.target.value);
            setVisible(BPP.Commands.commands.some((cmd) => cmd.name.includes(ev.target.value.substring(1))) && ev.target.value.startsWith("/"));
        }

        chatBox.addEventListener("input", handleChange);
        return () => chatBox.removeEventListener("input", handleChange);
    }, []);

    return (
        <div className={styles["bpp-commandsContainer"]} style={{
            display: visible ? "flex" : "none"
        }}>
            {BPP.Commands.commands.filter((cmd) => cmd.name.includes(inputText.substring(1))).sort((a, b) => compare(a.name, inputText.substring(1)) - compare(b.name, inputText.substring(1))).map((cmd) => {
                return (<CommandComponent {...cmd}/>);
            })}
        </div>
    );
}

export default (query: string) => {
    const root = BPP.Common.ReactDOM.createRoot(document.querySelector(query));

    root.render(<ChatCommands/>);
}