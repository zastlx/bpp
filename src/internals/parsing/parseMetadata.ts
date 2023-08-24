// @ts-nocheck

// all stolen from https://github.com/Tampermonkey/tampermonkey/ :3

var Theme = function() {
    this.icon = null;
    this.name = null;
    this.homepage = null;
    this.description = null;
    this.system = false;
    this.enabled = true;
};

var headerStart = '==Theme==';
var headerStop = '==/Theme==';

let Helper = {}

Helper.getStringBetweenTags = function(source, tag1, tag2) {
    var b = source.search(escapeForRegExp(tag1));
    if (b == -1) {
        return "";
    }
    if (!tag2) {
        return source.substr(b + tag1.length);
    }
    var e = source.substr(b + tag1.length).search(escapeForRegExp(tag2));

    if (e == -1) {
        return "";
    }
    return source.substr(b + tag1.length, e);
};

var escapeForRegExpURL = function(str, more) {
    if (more == undefined) more = [];
    var re = new RegExp( '(\\' + [ '/', '.', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\' ].concat(more).join('|\\') + ')', 'g');
    return str.replace(re, '\\$1');
};

var escapeForRegExp = function(str, more) {
    return escapeForRegExpURL(str, ['*']);
};

var getScriptId = function(name) {
    var id = null;
    var name = encodeURI(name);
    var ch = name.match(/[a-zA-Z0-9]/g);
    if (ch) {
        id = ch.join('');
    } else id = "lolz"
    return id;
};

function parseMetaData(codeeee) {
        var theme = new Theme();

        var tags = ['name', 'version', 'author', 'description'];

        // Attention: long tags at first!!!
        var icon_tags = ['iconURL', 'defaulticon', 'icon'];

        // security...
        codeeee = codeeee.replace(/\'/g, '').replace(/\"/g, '');
        // convinience ;)

        codeeee = codeeee.replace(/\t/g, '    ');
        codeeee = codeeee.replace(/\r/g, '\n');
        codeeee = codeeee.replace(/\n\n+/g, '\n');
        codeeee = codeeee.replace(/[^|\n][ \t]+\/\//g, '//')

        var s, t, i, l, c, o, lines = codeeee.split('\n');
        for (i in lines) {
            l = lines[i].replace(/^[\t\s]*\/\//gi, '').replace(/^[\t\s]*/gi, '').replace(/\s\s+/gi, ' ');
            c = false;

            for (var t in tags) {
                var r = new RegExp('^@' + tags[t] + '[\\t\\s]');
                if (l.search(r) != -1) {
                    theme[tags[t]] = Helper.getStringBetweenTags(l, '@'+tags[t]).trim();
                    continue;
                }
            }
            if (c) continue;

            for (t in icon_tags) {
                s = Helper.getStringBetweenTags(l, '@'+icon_tags[t]).trim();
                if (s != '') {
                    theme.icon = s;
                    c = true;
                    break;
                }
            }
            if (c) continue;
        }

        if (theme.name) {
            theme.id = getScriptId(theme.name);
        }
        if (!theme.version) theme.version = "0.0";

        return theme;
    }

    export default parseMetaData;