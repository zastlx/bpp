import { BlacketLocalUser, WithRequired } from "./types";

function hasPlus(user: WithRequired<Partial<BlacketLocalUser>, "perms">) {
    return (user.perms.includes("change_banner") && user.perms.includes("change_color") && user.perms.includes("early_access")) || user.role === "Plus";
}

export { hasPlus };