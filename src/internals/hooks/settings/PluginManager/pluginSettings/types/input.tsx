import styles from "../styles.module.css";
import { useState } from "react";

export default ({
    onChange,
    name,
    description,
    placeholder,
    defaultValue,
    maxLength
}: {
    onChange: (value: string) => void,
    name: string,
    description: string,
    placeholder: string,
    defaultValue?: string,
    maxLength?: number
}) => {
    const [value, setValue] = useState(defaultValue || "");
    
    return (
        <div className={styles.setting}>
            <div className={styles.settingInfo}>
                <p className={styles.settingName}>{name}</p>
                <p className={styles.settingDescription}>{description}</p>
            </div>
            <input className={styles.input} onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
            }} placeholder={placeholder} maxLength={maxLength} value={value} />
        </div>
    );
}