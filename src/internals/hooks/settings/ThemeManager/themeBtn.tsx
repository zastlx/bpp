export default ({
    iconClass,
    color,
    onClick
}: {
    iconClass: string;
    color: string;
    onClick: () => void;
}) => {
    return (
        <a onClick={onClick} className="styles__button___1_E-G-camelCase styles__headerButton___36TRh-camelCase" style={{
            width: "35px",
            height: "30px"
        }}>
            <div className="styles__shadow___3GMdH-camelCase"/>
            <div className="styles__edge___3eWfq-camelCase" style={{
                backgroundColor: color
            }}/>
            <div className="styles__front___vcvuy-camelCase" style={{
                backgroundColor: color
            }}>
                <div className="styles__headerButtonInside___26e_U-camelCase">
                    <i className={`styles__headerButtonIcon___1pOun-camelCase fas ${iconClass} fa-solid`} />
                </div>
            </div>
        </a>
    );
}