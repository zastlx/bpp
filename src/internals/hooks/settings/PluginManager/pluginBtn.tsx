export default ({ color, icon, onClick }: {
    color: string,
    icon: string,
    onClick: () => void
}) => {
    return (
        <a onClick={onClick} className="styles__button___1_E-G-camelCase styles__headerButton___36TRh-camelCase" role="button">
            <div className="styles__shadow___3GMdH-camelCase"></div>
            <div className="styles__edge___3eWfq-camelCase" style={{
                    backgroundColor: color
            }}>
            </div>
            <div className="styles__front___vcvuy-camelCase" style={{
                    backgroundColor: color
            }}>
                <div style={{
                    width: "unset",
                    fontSize: "20px"
                }} className="styles__headerButtonInside___26e_U-camelCase">
                    <i style={{
                        fontSize: "20px"
                    }} aria-hidden="true" className={`styles__headerButtonIcon___1pOun-camelCase fas ${icon}`} />
                </div>
            </div>
        </a>
    )
}