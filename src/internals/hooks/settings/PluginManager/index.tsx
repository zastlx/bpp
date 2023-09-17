import PluginComponent from "./plugin";
import BPP from "@api/global";

const PluginManager = () => {
    return (
        <>
            {Object.keys(BPP.Plugins.plugins).map((key) => {
                const plugin = BPP.Plugins.plugins[key];

                return <PluginComponent key={key} {...plugin} />;
            })}
        </>
    );
}

export default PluginManager;