import PluginComponent from "./pluigin";
import BPP from "@api/global";

export default ({ setPage: Function }) => {
    return (
        <>
            {Object.keys(BPP.Plugins).map((key) => {
                const plugin = BPP.Plugins[key];
                
                return <PluginComponent {...plugin}/>
            })}
        </>
    );
}