import PluginComponent from "./plugin";
import BPP from "@api/global";

const PluginManager = ({ setPage }: { setPage: Function }) => {
    return (
        <>
            {Object.keys(BPP.Plugins).map((key) => {
                const plugin = BPP.Plugins[key];

                return <PluginComponent key={key} {...plugin} />;
            })}
        </>
    );
}

export default PluginManager;