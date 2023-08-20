import axios from "axios";
import { BlacketUser, UserBlooks, BlacketBan, BlacketMute, BlacketUserMisc } from "./types";
axios.defaults.withCredentials = true;

export default class User {
    id: number;
    username: string;
    role: string;
    color: string;
    avatar: string;
    banner: string;
    created: number;
    modified: number;
    badges: string[];
    blooks: UserBlooks;
    tokens: number;
    exp: number;
    mute: BlacketMute | null;
    ban: BlacketBan | null;
    misc: BlacketUserMisc;
    friends: number;
    #isLocal: boolean;

    constructor(initValue: BlacketUser, isLocal = false) {
        Object.assign(this, {
            ...this,
            ...initValue,
            "#isLocal": isLocal
        });
    }

    update(newProps) {
        Object.assign(this, {
            ...this,
            ...newProps
        });
    }

    isLocal() {
        return this.#isLocal;
    }

    async block() {
        const { data } = await axios.post("/worker/friends/block", {
            user: this.id
        });

        if (data.error) throw data;
        else return true;
    }

    async unblock() {
        const { data } = await axios.post("/worker/friends/unblock", {
            user: this.id
        });

        if (data.error) throw data;
        else return true;
    }

    async friend() {
        const { data } = await axios.post("/worker/friends/request", {
            user: this.id
        });

        if (data.error) throw data;
        else return true;
    }

    async unfriend() {
        const { data } = await axios.post("/worker/friends/request", {
            user: this.id
        });

        if (data.error) throw data;
        else return true;
    }

    isBot() {
        return this.badges.includes("Verified Bot");
    }

    isStaff() {
        return this.badges.includes("Staff");
    }
}