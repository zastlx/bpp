import InfoContainer from "./InfoContainer";
import blacket from "@api/blacket";
import hasPlus from "@utils/blacket";
import BPP from "@api/global"

export default ({ setPage }) => {
    
    return (
            <>
            <InfoContainer icon="fa-user" title="Profile">
                <div className="styles__text___1x37n-camelCase">
                    <b>Username:</b> <span>{blacket().user.username}</span>
                </div>
                <div className="styles__text___1x37n-camelCase">
                    <b>Role:</b> <span>{blacket().user.role}</span>
                </div>
                <div className="styles__text___1x37n-camelCase">
                    <b>Joined:</b> <span>{new Date(blacket().user.created * 1000).toLocaleDateString()} {new Date(blacket().user.created * 1000).toLocaleTimeString()}</span>
                </div>
            </InfoContainer>
            <InfoContainer icon="fa-clipboard-list" title="Plan">
                <div className="styles__subscriptionText___2BvF7-camelCase">
                        <div className="styles__blooketText___QMe9h-camelCase">{blacket().config.name}</div>
                        <div className="styles__planText___1m0nS-camelCase" style={hasPlus(blacket().user) ? {
                            color: "rgb(48, 82, 214)"
                        } : {
                            color: "white"
                        } }>{hasPlus(blacket().user) ? "Plus" : "Basic"}</div>
                </div>
            </InfoContainer>
            <InfoContainer icon="fa-pencil-alt" title="Edit Info"> 
                    <div>
                        <a onClick={() => {
                            BPP.Plugins.plugins["Internals"].hooks.settings.hooks.changeUsername();
                        }} className="styles__link___5UR6_-camelCase">Change Username</a>
                    </div>
                    <div>
                        <a onClick={() => {
                            BPP.Plugins.plugins["Internals"].hooks.settings.hooks.changePass();
                        }} className="styles__link___5UR6_-camelCase">Change Password</a>
                    </div>
                    <div>
                        <a onClick={() => {
                            BPP.Plugins.plugins["Internals"].hooks.settings.hooks.otp();
                        }} className="styles__link___5UR6_-camelCase">Enable OTP / 2FA</a>
                    </div>
            </InfoContainer>
            <InfoContainer icon="fa-cog" title="General">
                <div>
                    <a onClick={() => {
                        BPP.Plugins.plugins["Internals"].hooks.settings.hooks.tradeRequests();
                    }} id="tradeRequestsButton" className="styles__link___5UR6_-camelCase">Trade Requests: {blacket().user.settings.friends.charAt(0).toUpperCase() + blacket().user.settings.friends.slice(1)}</a>
                </div>
                <div>
                    <a onClick={() => {
                        BPP.Plugins.plugins["Internals"].hooks.settings.hooks.friendRequests();
                    }} id="friendRequestsButton" className="styles__link___5UR6_-camelCase">Friend Requests: {blacket().user.settings.friends.charAt(0).toUpperCase() + blacket().user.settings.friends.slice(1)}</a>
                </div>
            </InfoContainer>
            {hasPlus(blacket().user) && <InfoContainer icon="fa-star" title="Plus Settings">
            <div>
                <a onClick={() => {
                    BPP.Plugins.plugins["Internals"].hooks.settings.hooks.changeUsernameColor()
                }} id="changeUsernameColorButton" className="styles__link___5UR6_-camelCase">Change Username Color</a><br/>
                <a onClick={() => {
                    BPP.Plugins.plugins["Internals"].hooks.settings.hooks.changeDefaultChatColor()
                }} id="changeDefaultChatColorButton" className="styles__link___5UR6_-camelCase">Change Default Chat Color</a>
            </div>
            </InfoContainer>}
            <InfoContainer icon="fa-solid fa-square-terminal" title="Blacket++">
                <div onClick={() => setPage(2)}>
                    <a className="styles__link___5UR6_-camelCase">Manage Plugins</a>
                </div>
                <div onClick={() => setPage(3)}> 
                    <a className="styles__link___5UR6_-camelCase">Manage Themes</a>
                </div>
                <div>
                    
                </div>
            </InfoContainer>
        </>
    );
}