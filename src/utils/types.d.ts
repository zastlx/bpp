import { EventManager } from "internals/events";
import ReactDOM from "react-dom/client";
import React from "react";
import { Logger } from "./logger";
import * as other from "./other";
import * as consts from "./constants";
import * as blacketUtils from "./blacket";
import * as logger from "@utils/logger";
import { alertUtil } from "@api/util";
import userStore from "@api/userStore";

export interface PatchReplacement {
    match: string | RegExp;
    replace: string;
}

export interface Patch {
    plugin: string;
    file: string;
    replacement: PatchReplacement | PatchReplacement[];
}

export type startAllPredicate = (plugin: Plugin) =>  boolean;
export interface Plugins { [key: string]: Plugin };

export interface Settings {
    plugins: {
        [key: string]: {
            enabled: boolean;
        }
    };
    themeLinks: string[];
    autoUpdate: boolean;
}

export interface Command {
    name: string;
    description: string;
    execute: (...args) => void;
}

export interface Theme {
    name: string;
    authors: BlacketUser[];
    description: string;
    forcedImportant: boolean;
    url: string;
    element: HTMLStyleElement;
    delete: () => void;
}

export interface Global {
    Common: {
        React: typeof React;
        ReactDOM: typeof ReactDOM;
    };
    Plugins: {
        loadedRequirments: requires[];
        plugins: Plugins;
        startAll: (startAllPredicate: startAllPredicate) => void;
    };
    Themes: {
        themes: Theme[];
    };
    Utils: {
        constants: typeof consts;
        other: typeof other;
        logger: typeof logger;
        blacket: typeof blacketUtils;
    };
    Patcher: {
        files: FileIDKWHATTOCALLTHIS[];
        patches: Patch[];
        testPatch: (patch: PatchReplacement, filename: string) => boolean;
    };
    API: {
        alert: typeof alertUtil;
        userStore: typeof userStore;
    };
    Commands: {
        commands: Command[];
    };
    Dispatcher: EventManager;
    Settings: Settings;
}

export interface BlacketPage {
    icon: string;
    isNews: boolean;
    link: string;
    location: string;
    perm: string;
}

export interface BlacketConfig {
    credits: BlacketCredit[];
    description: string;
    discord: string;
    exp: {
        difficulty: number;
    };
    name: string;
    pages: BlacketPage[];
    path: string;
    pronunciation: string;
    rewards: number[];
    store: {
        [key: string]: {
            price: string;
            sale: {
                name: string | null;
                price: string;
            }
        } 
    }
    version: string;
    welcome: string;
}

export interface BlacketUserMisc {
    opened: number;
    messages: number;
}

export interface BlacketUser {
    id: string;
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
}

export interface BlacketToast {
    title: string;
    titleColor: string;
    message: string;
    icon: string;
    time: number;
}

export interface BlacketNewsPost {
    body: string;
    date: number;
    image: string;
    title: string;
}

export interface BlacketSocket extends WebSocket {
    emit(type: string, data: string | object): void;
    on(type: string, callback: Function): void;
}

export interface UserBlooks {
    [key: string]: number;
}

export interface BlacketLocalUser extends BlacketUser {
    tokens: number;
    modified: number;
    ban: null | BlacketBan;
    mute: null | BlacketMute;
    badges: string[];
    friends: number[];
    inventory: string[];
    blooks: UserBlooks;
    blocks: number[];
    created: number;
    perms: string[];
    settings: {
        friends: "on" | "off" | "friends";
        requests: "on" | "mutuals";
    }
}

export interface BlacektPunishment {
    time: number;
    staff: string;
    reason: string;
}

export interface BlacketBan extends BlacektPunishment {
    banned: boolean;
}

export interface BlacketMute extends BlacektPunishment {
    muted: boolean;
}

export interface BlacketPack {
    price: number;
    color1: string;
    color2: string;
    image: string;
    blooks: string[];
    hidden: boolean;
}

export type BlacketRarityAnimation = "none" | "uncommon" | "rare" | "epic" | "legendary" | "chroma" | "mystical";
export type BlacketRarites = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Chroma" | "Unique" | "Mystical" | "Iridescent"

export interface BlacketRarity {
    color: string;
    animation: BlacketRarityAnimation;
    exp: number;
    wait: number;
}

export interface BlacketBlook {
    rarity: BlacketRarites;
    chance: number;
    price: number;
    image: string;
    art: string;
}

export interface BlacketCredit {
    nickname: string;
    image: string;
    note: string;
    user: BlacketUser;
}

export interface BlacketTweomji {
    emoji: string;
    name: string;
    shortname: string;
    unicode: string;
    html: string;
    category: string;
    order: string;
}

export interface BlacketEmoji {
    image: string;
}

export interface BlacketBadge {
    image: string;
    description: string;
}

export type BlacketRooms = "global" | "trade" | "bot" | "staff";

export interface Blacket {
    config: BlacketConfig;
    createToast(toast: BlacketToast, queued: boolean): void;
    friends: {
        friends: BlacketUser[];
        receiving: BlacketUser[];
        sending: BlacketUser[];
    };
    getParameter(name: string): string;
    news: BlacketNewsPost[];
    requests: {
        get(url: string, callback: Function): void;
        post(url: string, data: object, callback: Function): void;
        upload(url: string, data: any, callback: Function): void; // idk what data is so im just gonna put any
    }
    socket: BlacketSocket;
    startLoading(): void;
    stopLoading(): void;
    toasts: BlacketToast[];
    user: BlacketLocalUser;
    packs: { [key: string]: BlacketPack };
    rarities: { [key: string]: BlacketRarity };
    blooks: { [key: string]: BlacketBlook };
    credits: BlacketCredit[];
    badges: { [key: string]: BlacketBadge };
    setUser: (user: BlacketUser) => void;
    appendBlooks: (search: string) => void;
    listBlook: (price: number) => void;
    selectBlook: (blook: string) => void;
    sellBlook: (blook: string) => void;
    getBazaar: (search: string) => void;
    appendBanners: (search: string) => void;
    getUser: (user: string | number) => void;
    setBanner: (banner: string) => void;
    setBlook: (blook: string) => void;
    appendChat: (data: {
        error: boolean;
        type: "chat";
        user: Partial<BlacketUser>;
        message: string;
        id: string;
        time: number;
    }, mentioned: boolean) => void;
    addBlook: (blook: string, quantity: number, user2: any) => void;
    chat: {
        timeout: number
    };
    emojiNames: BlacketTweomji[];
    currentRoom: BlacketRooms;
    emojis: { [key: string]: BlacketEmoji };
    enlargeImage: (url: string) => void;
    rooms: {
        [key: BlacketRooms]: {
            perm: string;
        };
    };
    uploadFile: (file: any) => void;

}

export interface FileIDKWHATTOCALLTHIS {
    name: string;
    data: string;
    element: HTMLScriptElement;
    patches: string[];
}

export interface PluginAuthor {
    name: string;
    id: string;
}

export interface Plugin extends PluginDef {
    patches?: Patch[];
    started: boolean;
}

export type pages = "stats" | "credits" | "chat" | "blooks" | "market" | "bazaar" | "leaderboard" | "settings" | "*";

export interface PluginDef {
    name: string;
    description: string;
    authors: PluginAuthor[];
    start?(): void;
    stop?(): void;
    patches?: Omit<Patch, "plugin">[];
    commands?: Command[];
    dependencies?: string[],
    required?: boolean;
    page: pages[] | pages;
    [key: string]: any;
}

export interface PluginConfig {
    name: string;
    enabled: boolean;
    settings: {
        [key: string]: any
    }
}

export interface Config {
    autoUpdate: true;
    plugins: PluginConfig[];
    themeLinks: string[]; 
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };