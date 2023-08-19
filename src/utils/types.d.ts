export interface PatchReplacement {
    match: string | RegExp;
    replace: string;
}

export interface Patch {
    plugin: string;
    file: string;
    replacement: PatchReplacement | PatchReplacement[];
}

export interface Global {
    Common: {
        React: React;
        ReactDOM: ReactDOM;
    };
    Plugins: { [name: string]: Plugin };
    Patches: Patch[];
}

export interface BlacketCredit {
    user: int;
    nickname: string;
    image: string;
    note: string;
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

export interface BlacketUser {
    id: number;
    username: string;
    role: string;
    color: string;
    avatar: string;
    banner: string;
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

export interface Blooks {
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
    blooks: Blooks;
    blocks: number[];
    created: number;
    perms: string[];
    settings: {
        friends: "on" | "off" | "friends";
        requests: "on" ;
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

export interface PluginDef {
    name: string;
    description: string;
    authors: PluginAuthor[];
    start?(): void;
    stop?(): void;
    patches?: Omit<Patch, "plugin">[];
    /**
     * List of commands. If you specify these, you must add CommandsAPI to dependencies
     */
    commands?: Command[];
    dependencies?: string[],
    /**
     * Whether this plugin is required and forcefully enabled
     */
    required?: boolean;
    [key: string]: function;
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