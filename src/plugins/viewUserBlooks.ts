import definePlugin from "@utils/plugins";
import blacket from "@api/blacket";

export default () => definePlugin({
    name: "ViewUserBlooks",
    description: "Allows you to easily view a user's blooks from the Blooks page.",
    authors: [
        {
            name: "Death",
            id: "0"
        }
    ],
    start() {
        if (location.pathname !== '/blooks') return;

        document.body.innerHTML += `<style>
            .styles__left___9beun-camelCase {
                position: absolute;
                top: 40px;
                left: 2.5%;
                height: calc(100% - 70px);
                width: calc(95% - 430px);
                border-radius: 10px;
                background-color: #2f2f2f;
                padding: 10px 10px 19px;
                box-shadow: inset 0 -9px rgba(0, 0, 0, 0.2), 0 5px rgba(0, 0, 0, 0.25);
          }

          #bpp_showPlayer {
                background-color: #2f2f2f;
                color: white;
          }
        </style>`;

        const _document = {
            querySelector: (element: any) => (document.querySelector(element) as HTMLElement)
        }; // fuck u zastix

        _document.querySelector('.styles__left___9beun-camelCase').insertAdjacentHTML('beforebegin', `
            <div class="styles__topButtonRow___2HIbg-camelCase">
                <div class="styles__settingButton___2xaQu-camelCase" id="bpp_showPlayer" role="button" tabindex="0">Show Player Blooks</div>
            </div><br><br>
        `);

        let selfProfile = true;

        _document.querySelector('#bpp_showPlayer').addEventListener('click', () => {
            blacket().requests.get(`/worker/user/${selfProfile ? prompt('Who?') : blacket().user.username}`, (data: any) => {
                selfProfile = !selfProfile;

                _document.querySelector('.styles__blooksHolder___3qZR1-camelCase').innerHTML = '';
                _document.querySelector('.styles__rightButtonRow___3a0GF-camelCase').style.visibility = (selfProfile ? 'visible' : 'hidden');

                if (!selfProfile) document.querySelector('#bbShowPlayer').innerHTML = `Showing Player: ${data.user.username} (click to stop)`;
                else document.querySelector('#bbShowPlayer').innerHTML = `Show Player Blooks`;

                let blooks = data.user.blooks;
                let packBlooks = [];
                
                Object.keys(blacket().packs).reverse().forEach((pack) => {
                    if (blacket().packs[pack].hidden) return;
                
                    let packId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
                    document.querySelector('.styles__blooksHolder___3qZR1-camelCase').insertAdjacentHTML('beforeend', `<div class="styles__setHolder___rVq3Z-camelCase"><div class="styles__setTop___wIaVS-camelCase"><div class="styles__setTopBackground___342Wr-camelCase" style="background-image: url('/content/blookTile.png');"></div><div class="styles__setText___1PQLQ-camelCase">${pack} Pack</div><div class="styles__setDivider___3da0c-camelCase"></div></div><div id="${packId}" class="styles__setBlooks___3xamH-camelCase"></div></div>`);
                
                    Object.entries(blacket().packs[pack].blooks).forEach((blook) => {
                        packBlooks.push(blook[1]);

                        let locked: any;
                        if (!blooks[blook[1]]) locked = {
                            class: `styles__lockedBlook___3oGaX-camelCase`,
                            i: `<i class="fas fa-lock styles__blookLock___3Kgua-camelCase" aria-hidden="true"></i>`,
                            quantity: ``,
                            cursor: 'auto'
                        };
                        else {
                            let quantity: Number;
                            if (blacket().rarities[blacket().blooks[blook[1]].rarity].color == "rainbow") quantity = `<div class="styles__blookText___3AMdK-camelCase" style="background-image: url('/content/rainbow.gif');">${unsafeWindow.blacket.user.blooks[blook[1]].toLocaleString()}</div></div>`;
                  else quantity = `<div class="styles__blookText___3AMdK-camelCase" style="background-color: ${unsafeWindow.blacket.rarities[unsafeWindow.blacket.blooks[blook[1]].rarity].color};">${unsafeWindow.blacket.user.blooks[blook[1]].toLocaleString()}</div></div>`;
                  locked = {
                    class: ``,
                    i: ``,
                    quantity: quantity,
                    cursor: 'pointer'
                  };
                };
                $(`#${packId}`).append(`<div id="${blook[1].replaceAll(' ', '-').replaceAll("'", "_")}" class="styles__blookContainer___3JrKb-camelCase" style="cursor: ${locked.cursor}" role="button" tabindex="0"><div class="styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase ${locked.class}"><img loading="lazy" src="${unsafeWindow.blacket.blooks[blook[1]].image}" draggable="false" class="styles__blook___1R6So-camelCase" /></div>${locked.i}${locked.quantity}`);
                $(`#${blook[1].replaceAll(' ', '-').replaceAll("'", "_")}`).click(function() {
                  if (this.children[0].classList.contains(`styles__lockedBlook___3oGaX-camelCase`)) return;
                  unsafeWindow.blacket.selectBlook(blook[1]);
                });
              });
            });

            let uncatogorizedBlooks = [];
            Object.keys(unsafeWindow.blacket.user.blooks).forEach(blook => {
              if (!unsafeWindow.blacket.packBlooks.includes(blook) && unsafeWindow.blacket.blooks[blook]) uncatogorizedBlooks.push(blook);
            });

            if (uncatogorizedBlooks.length > 0) {
              let packId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
              $(".styles__blooksHolder___3qZR1-camelCase").append(`<div class="styles__setHolder___rVq3Z-camelCase"><div class="styles__setTop___wIaVS-camelCase"><div class="styles__setTopBackground___342Wr-camelCase" style="background-image: url('/content/blookTile.png');"></div><div class="styles__setText___1PQLQ-camelCase">Miscellaneous</div><div class="styles__setDivider___3da0c-camelCase"></div></div><div id="${packId}" class="styles__setBlooks___3xamH-camelCase"></div></div>`);
              uncatogorizedBlooks.forEach(blook => {
                if (!unsafeWindow.blacket.blooks[blook]) return;
                let quantity;
                if (unsafeWindow.blacket.rarities[unsafeWindow.blacket.blooks[blook].rarity] && unsafeWindow.blacket.rarities[unsafeWindow.blacket.blooks[blook].rarity].color == "rainbow") quantity = `<div class="styles__blookText___3AMdK-camelCase" style="background-image: url('/content/rainbow.gif');">${unsafeWindow.blacket.user.blooks[blook].toLocaleString()}</div></div>`;
                else quantity = `<div class="styles__blookText___3AMdK-camelCase" style="background-color: ${unsafeWindow.blacket.rarities[unsafeWindow.blacket.blooks[blook].rarity].color};">${unsafeWindow.blacket.user.blooks[blook].toLocaleString()}</div></div>`;
                $(`#${packId}`).append(`<div id="${blook.replaceAll(' ', '-').replaceAll("'", "_")}" class="styles__blookContainer___3JrKb-camelCase" style="cursor: pointer" role="button" tabindex="0"><div class="styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase"><img loading="lazy" src="${unsafeWindow.blacket.blooks[blook].image}" draggable="false" class="styles__blook___1R6So-camelCase" /></div>${quantity}`);
                $(`#${blook.replaceAll(' ', '-').replaceAll("'", "_")}`).click(function() {
                  unsafeWindow.blacket.selectBlook(blook);
                });
              });
            };
            });
        });
    },
    stop() {
        console.log("zastix smells of rat shit");
    }
});