export default ({ icon, title, children }) => {
    return (
        <div className="styles__infoContainer___2uI-S-camelCase">
            <div className="styles__headerRow___1tdPa-camelCase">
                <i className={`fas ${icon} styles__headerIcon___1ykdN-camelCase`} aria-hidden="true"></i>
                <div className="styles__infoHeader___1lsZY-camelCase">{title}</div>
            </div>
            {Array.isArray(children) ? [...children] : children}
        </div>
    );
};