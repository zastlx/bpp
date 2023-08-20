import userStore from "@api/userStore";

const DEVS = {
    zastix: {
        name: "zastix",
        id: 9838391
    },
    alicia: {
        name: "alicialol",
        id: 7075957
    },
    thonk: {
        name: "Death",
        id: 3324853
    }
};

const Credits = async () => [
    {
        nickname: "zastix",
        image: "https://cdn.discordapp.com/attachments/1015037283004583998/1141519821868126269/KCbRLzIqZLHseumpmWf89YDj.webp",
        note: "The main developer and creator of Blacket++.",
        user: await userStore.getUser(DEVS.zastix.id)
    },
    {
        nickname: "alicialol",
        image: "https://cdn.discordapp.com/attachments/1087884880219754628/1141486650275418132/bd716d87-25ca-4919-9698-d0c4f181a60a.png",
        note: "A developer and creator of Blacket++. (also cute)",
        user: await userStore.getUser(DEVS.alicia.id)
    },
    {
        nickname: "deaf",
        image: "https://cdn.discordapp.com/attachments/1015037283004583998/1141522010095239168/Wun2j2JuE2IWHl5VOW5JiV4L.webp",
        note: "A developer and creator of Blacket++.",
        user: await userStore.getUser(DEVS.thonk.id)
    },
];

const PeopleIDontLike = [
    "4891727", // gerchrome
    "3190404", // pig_55
    "5702224", // nachotaco
    "4694332", // absentminded
    "6654345", // parker
    "1771952", // mixafyy
    "4526980", // starey
    "5414419", // vinnie
    "1554351", // dmrd
    "3179975", // theothers
    "4655236", // og_blax
    "8807855", // bongus
    "3491886", // ash
];

export { DEVS, PeopleIDontLike, Credits };