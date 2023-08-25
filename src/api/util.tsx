import BPP from "@api/global";

const modalElement = document.createElement("div");
modalElement.className = "arts__modal___VpEAD-camelCase"; 
modalElement.style.display = "none";
document.body.append(modalElement);
const root = BPP.Common.ReactDOM.createRoot(modalElement);

const alert = (title: string, msg: string, onClick?: () => void) => {
    modalElement.style.display = "block";
    root.render(
        <div className="styles__container___1BPm9-camelCase">
            <div className="styles__text___KSL4--camelCase">
                <div>{title}<br/><br/>
                    {msg}</div>
            </div>
            <div className="styles__holder___3CEfN-camelCase">
                <div className="styles__buttonContainer___2EaVD-camelCase">
                    <div
                        id="closeButton"
                        className="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase"
                        role="button">
                        <div className="styles__shadow___3GMdH-camelCase"></div>
                        <div
                            className="styles__edge___3eWfq-camelCase"
                            style={{
                                "backgroundColor": "#2f2f2f"
                            }}></div>
                        <div
                            onClick={() => {
                                root.render(<></>);
                                modalElement.style.display = "none";

                                if (onClick) onClick();
                            }}
                            className="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase"
                            style={{
                                "backgroundColor": "#2f2f2f"
                            }}>Okay</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { alert as alertUtil };