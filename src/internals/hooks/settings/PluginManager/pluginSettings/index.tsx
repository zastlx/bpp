import styles from "./styles.module.css";

export default () => {
    return (
        <div className={styles.container}>
            <div className={styles.setting}>
                <div className={styles.settingHeader}>
                    <p className={styles.settingTitle}>Boolean Setting</p>
                    <p className={styles.settingDescription}>Description of plugin setting, weee</p>
                </div>
                <div className={styles.toggleSwitch}></div>
            </div>
            <div className={styles.setting}>
                <div className={styles.settingHeader}>
                    <p className={styles.settingTitle}>Selector Setting</p>
                    <p className={styles.settingDescription}>Description of plugin setting, weee</p>
                </div>
                <select className={styles.select}>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </div>
            <div className={styles.setting}>
                <div className={styles.settingHeader}>
                    <p className={styles.settingTitle}>String Option</p>
                    <p className={styles.settingDescription}>Description of plugin setting, weee</p>
                </div>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="String Option"
                    maxLength={16}
                    value=""/>
            </div>
        </div>
    );
}