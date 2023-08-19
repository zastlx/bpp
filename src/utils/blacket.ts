import blacket from "@api/blacket";
import { BlacketLocalUser, WithRequired } from "./types";

export default function hasPlus(user: WithRequired<Partial<BlacketLocalUser>, "perms">) {
    return (blacket().user.perms.includes("change_banner") && blacket().user.perms.includes("change_color") && blacket().user.perms.includes("early_access")) || blacket().user.role === "Plus";
}
