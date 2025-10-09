"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // bin/live-reload.js
  var init_live_reload = __esm({
    "bin/live-reload.js"() {
      "use strict";
      new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());
    }
  });

  // node_modules/.pnpm/showdown@2.1.0/node_modules/showdown/dist/showdown.js
  var require_showdown = __commonJS({
    "node_modules/.pnpm/showdown@2.1.0/node_modules/showdown/dist/showdown.js"(exports, module) {
      init_live_reload();
      (function() {
        function getDefaultOpts(simple) {
          "use strict";
          var defaultOptions = {
            omitExtraWLInCodeBlocks: {
              defaultValue: false,
              describe: "Omit the default extra whiteline added to code blocks",
              type: "boolean"
            },
            noHeaderId: {
              defaultValue: false,
              describe: "Turn on/off generated header id",
              type: "boolean"
            },
            prefixHeaderId: {
              defaultValue: false,
              describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
              type: "string"
            },
            rawPrefixHeaderId: {
              defaultValue: false,
              describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
              type: "boolean"
            },
            ghCompatibleHeaderId: {
              defaultValue: false,
              describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
              type: "boolean"
            },
            rawHeaderId: {
              defaultValue: false,
              describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`,
              type: "boolean"
            },
            headerLevelStart: {
              defaultValue: false,
              describe: "The header blocks level start",
              type: "integer"
            },
            parseImgDimensions: {
              defaultValue: false,
              describe: "Turn on/off image dimension parsing",
              type: "boolean"
            },
            simplifiedAutoLink: {
              defaultValue: false,
              describe: "Turn on/off GFM autolink style",
              type: "boolean"
            },
            excludeTrailingPunctuationFromURLs: {
              defaultValue: false,
              describe: "Excludes trailing punctuation from links generated with autoLinking",
              type: "boolean"
            },
            literalMidWordUnderscores: {
              defaultValue: false,
              describe: "Parse midword underscores as literal underscores",
              type: "boolean"
            },
            literalMidWordAsterisks: {
              defaultValue: false,
              describe: "Parse midword asterisks as literal asterisks",
              type: "boolean"
            },
            strikethrough: {
              defaultValue: false,
              describe: "Turn on/off strikethrough support",
              type: "boolean"
            },
            tables: {
              defaultValue: false,
              describe: "Turn on/off tables support",
              type: "boolean"
            },
            tablesHeaderId: {
              defaultValue: false,
              describe: "Add an id to table headers",
              type: "boolean"
            },
            ghCodeBlocks: {
              defaultValue: true,
              describe: "Turn on/off GFM fenced code blocks support",
              type: "boolean"
            },
            tasklists: {
              defaultValue: false,
              describe: "Turn on/off GFM tasklist support",
              type: "boolean"
            },
            smoothLivePreview: {
              defaultValue: false,
              describe: "Prevents weird effects in live previews due to incomplete input",
              type: "boolean"
            },
            smartIndentationFix: {
              defaultValue: false,
              describe: "Tries to smartly fix indentation in es6 strings",
              type: "boolean"
            },
            disableForced4SpacesIndentedSublists: {
              defaultValue: false,
              describe: "Disables the requirement of indenting nested sublists by 4 spaces",
              type: "boolean"
            },
            simpleLineBreaks: {
              defaultValue: false,
              describe: "Parses simple line breaks as <br> (GFM Style)",
              type: "boolean"
            },
            requireSpaceBeforeHeadingText: {
              defaultValue: false,
              describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
              type: "boolean"
            },
            ghMentions: {
              defaultValue: false,
              describe: "Enables github @mentions",
              type: "boolean"
            },
            ghMentionsLink: {
              defaultValue: "https://github.com/{u}",
              describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
              type: "string"
            },
            encodeEmails: {
              defaultValue: true,
              describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
              type: "boolean"
            },
            openLinksInNewWindow: {
              defaultValue: false,
              describe: "Open all links in new windows",
              type: "boolean"
            },
            backslashEscapesHTMLTags: {
              defaultValue: false,
              describe: "Support for HTML Tag escaping. ex: <div>foo</div>",
              type: "boolean"
            },
            emoji: {
              defaultValue: false,
              describe: "Enable emoji support. Ex: `this is a :smile: emoji`",
              type: "boolean"
            },
            underline: {
              defaultValue: false,
              describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
              type: "boolean"
            },
            ellipsis: {
              defaultValue: true,
              describe: "Replaces three dots with the ellipsis unicode character",
              type: "boolean"
            },
            completeHTMLDocument: {
              defaultValue: false,
              describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
              type: "boolean"
            },
            metadata: {
              defaultValue: false,
              describe: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).",
              type: "boolean"
            },
            splitAdjacentBlockquotes: {
              defaultValue: false,
              describe: "Split adjacent blockquote blocks",
              type: "boolean"
            }
          };
          if (simple === false) {
            return JSON.parse(JSON.stringify(defaultOptions));
          }
          var ret = {};
          for (var opt in defaultOptions) {
            if (defaultOptions.hasOwnProperty(opt)) {
              ret[opt] = defaultOptions[opt].defaultValue;
            }
          }
          return ret;
        }
        function allOptionsOn() {
          "use strict";
          var options = getDefaultOpts(true), ret = {};
          for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
              ret[opt] = true;
            }
          }
          return ret;
        }
        var showdown = {}, parsers = {}, extensions = {}, globalOptions = getDefaultOpts(true), setFlavor = "vanilla", flavor = {
          github: {
            omitExtraWLInCodeBlocks: true,
            simplifiedAutoLink: true,
            excludeTrailingPunctuationFromURLs: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: true,
            ghCodeBlocks: true,
            tasklists: true,
            disableForced4SpacesIndentedSublists: true,
            simpleLineBreaks: true,
            requireSpaceBeforeHeadingText: true,
            ghCompatibleHeaderId: true,
            ghMentions: true,
            backslashEscapesHTMLTags: true,
            emoji: true,
            splitAdjacentBlockquotes: true
          },
          original: {
            noHeaderId: true,
            ghCodeBlocks: false
          },
          ghost: {
            omitExtraWLInCodeBlocks: true,
            parseImgDimensions: true,
            simplifiedAutoLink: true,
            excludeTrailingPunctuationFromURLs: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: true,
            ghCodeBlocks: true,
            tasklists: true,
            smoothLivePreview: true,
            simpleLineBreaks: true,
            requireSpaceBeforeHeadingText: true,
            ghMentions: false,
            encodeEmails: true
          },
          vanilla: getDefaultOpts(true),
          allOn: allOptionsOn()
        };
        showdown.helper = {};
        showdown.extensions = {};
        showdown.setOption = function(key, value) {
          "use strict";
          globalOptions[key] = value;
          return this;
        };
        showdown.getOption = function(key) {
          "use strict";
          return globalOptions[key];
        };
        showdown.getOptions = function() {
          "use strict";
          return globalOptions;
        };
        showdown.resetOptions = function() {
          "use strict";
          globalOptions = getDefaultOpts(true);
        };
        showdown.setFlavor = function(name) {
          "use strict";
          if (!flavor.hasOwnProperty(name)) {
            throw Error(name + " flavor was not found");
          }
          showdown.resetOptions();
          var preset = flavor[name];
          setFlavor = name;
          for (var option in preset) {
            if (preset.hasOwnProperty(option)) {
              globalOptions[option] = preset[option];
            }
          }
        };
        showdown.getFlavor = function() {
          "use strict";
          return setFlavor;
        };
        showdown.getFlavorOptions = function(name) {
          "use strict";
          if (flavor.hasOwnProperty(name)) {
            return flavor[name];
          }
        };
        showdown.getDefaultOptions = function(simple) {
          "use strict";
          return getDefaultOpts(simple);
        };
        showdown.subParser = function(name, func) {
          "use strict";
          if (showdown.helper.isString(name)) {
            if (typeof func !== "undefined") {
              parsers[name] = func;
            } else {
              if (parsers.hasOwnProperty(name)) {
                return parsers[name];
              } else {
                throw Error("SubParser named " + name + " not registered!");
              }
            }
          }
        };
        showdown.extension = function(name, ext) {
          "use strict";
          if (!showdown.helper.isString(name)) {
            throw Error("Extension 'name' must be a string");
          }
          name = showdown.helper.stdExtName(name);
          if (showdown.helper.isUndefined(ext)) {
            if (!extensions.hasOwnProperty(name)) {
              throw Error("Extension named " + name + " is not registered!");
            }
            return extensions[name];
          } else {
            if (typeof ext === "function") {
              ext = ext();
            }
            if (!showdown.helper.isArray(ext)) {
              ext = [ext];
            }
            var validExtension = validate(ext, name);
            if (validExtension.valid) {
              extensions[name] = ext;
            } else {
              throw Error(validExtension.error);
            }
          }
        };
        showdown.getAllExtensions = function() {
          "use strict";
          return extensions;
        };
        showdown.removeExtension = function(name) {
          "use strict";
          delete extensions[name];
        };
        showdown.resetExtensions = function() {
          "use strict";
          extensions = {};
        };
        function validate(extension, name) {
          "use strict";
          var errMsg = name ? "Error in " + name + " extension->" : "Error in unnamed extension", ret = {
            valid: true,
            error: ""
          };
          if (!showdown.helper.isArray(extension)) {
            extension = [extension];
          }
          for (var i = 0; i < extension.length; ++i) {
            var baseMsg = errMsg + " sub-extension " + i + ": ", ext = extension[i];
            if (typeof ext !== "object") {
              ret.valid = false;
              ret.error = baseMsg + "must be an object, but " + typeof ext + " given";
              return ret;
            }
            if (!showdown.helper.isString(ext.type)) {
              ret.valid = false;
              ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + " given";
              return ret;
            }
            var type = ext.type = ext.type.toLowerCase();
            if (type === "language") {
              type = ext.type = "lang";
            }
            if (type === "html") {
              type = ext.type = "output";
            }
            if (type !== "lang" && type !== "output" && type !== "listener") {
              ret.valid = false;
              ret.error = baseMsg + "type " + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
              return ret;
            }
            if (type === "listener") {
              if (showdown.helper.isUndefined(ext.listeners)) {
                ret.valid = false;
                ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
                return ret;
              }
            } else {
              if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
                ret.valid = false;
                ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
                return ret;
              }
            }
            if (ext.listeners) {
              if (typeof ext.listeners !== "object") {
                ret.valid = false;
                ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + " given";
                return ret;
              }
              for (var ln in ext.listeners) {
                if (ext.listeners.hasOwnProperty(ln)) {
                  if (typeof ext.listeners[ln] !== "function") {
                    ret.valid = false;
                    ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + " must be a function but " + typeof ext.listeners[ln] + " given";
                    return ret;
                  }
                }
              }
            }
            if (ext.filter) {
              if (typeof ext.filter !== "function") {
                ret.valid = false;
                ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + " given";
                return ret;
              }
            } else if (ext.regex) {
              if (showdown.helper.isString(ext.regex)) {
                ext.regex = new RegExp(ext.regex, "g");
              }
              if (!(ext.regex instanceof RegExp)) {
                ret.valid = false;
                ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + " given";
                return ret;
              }
              if (showdown.helper.isUndefined(ext.replace)) {
                ret.valid = false;
                ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
                return ret;
              }
            }
          }
          return ret;
        }
        showdown.validateExtension = function(ext) {
          "use strict";
          var validateExtension = validate(ext, null);
          if (!validateExtension.valid) {
            console.warn(validateExtension.error);
            return false;
          }
          return true;
        };
        if (!showdown.hasOwnProperty("helper")) {
          showdown.helper = {};
        }
        showdown.helper.isString = function(a) {
          "use strict";
          return typeof a === "string" || a instanceof String;
        };
        showdown.helper.isFunction = function(a) {
          "use strict";
          var getType = {};
          return a && getType.toString.call(a) === "[object Function]";
        };
        showdown.helper.isArray = function(a) {
          "use strict";
          return Array.isArray(a);
        };
        showdown.helper.isUndefined = function(value) {
          "use strict";
          return typeof value === "undefined";
        };
        showdown.helper.forEach = function(obj, callback) {
          "use strict";
          if (showdown.helper.isUndefined(obj)) {
            throw new Error("obj param is required");
          }
          if (showdown.helper.isUndefined(callback)) {
            throw new Error("callback param is required");
          }
          if (!showdown.helper.isFunction(callback)) {
            throw new Error("callback param must be a function/closure");
          }
          if (typeof obj.forEach === "function") {
            obj.forEach(callback);
          } else if (showdown.helper.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
              callback(obj[i], i, obj);
            }
          } else if (typeof obj === "object") {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                callback(obj[prop], prop, obj);
              }
            }
          } else {
            throw new Error("obj does not seem to be an array or an iterable object");
          }
        };
        showdown.helper.stdExtName = function(s) {
          "use strict";
          return s.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
        };
        function escapeCharactersCallback(wholeMatch, m1) {
          "use strict";
          var charCodeToEscape = m1.charCodeAt(0);
          return "\xA8E" + charCodeToEscape + "E";
        }
        showdown.helper.escapeCharactersCallback = escapeCharactersCallback;
        showdown.helper.escapeCharacters = function(text, charsToEscape, afterBackslash) {
          "use strict";
          var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
          if (afterBackslash) {
            regexString = "\\\\" + regexString;
          }
          var regex = new RegExp(regexString, "g");
          text = text.replace(regex, escapeCharactersCallback);
          return text;
        };
        showdown.helper.unescapeHTMLEntities = function(txt) {
          "use strict";
          return txt.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        };
        var rgxFindMatchPos = function(str, left, right, flags) {
          "use strict";
          var f = flags || "", g = f.indexOf("g") > -1, x = new RegExp(left + "|" + right, "g" + f.replace(/g/g, "")), l = new RegExp(left, f.replace(/g/g, "")), pos = [], t, s, m, start, end;
          do {
            t = 0;
            while (m = x.exec(str)) {
              if (l.test(m[0])) {
                if (!t++) {
                  s = x.lastIndex;
                  start = s - m[0].length;
                }
              } else if (t) {
                if (!--t) {
                  end = m.index + m[0].length;
                  var obj = {
                    left: { start, end: s },
                    match: { start: s, end: m.index },
                    right: { start: m.index, end },
                    wholeMatch: { start, end }
                  };
                  pos.push(obj);
                  if (!g) {
                    return pos;
                  }
                }
              }
            }
          } while (t && (x.lastIndex = s));
          return pos;
        };
        showdown.helper.matchRecursiveRegExp = function(str, left, right, flags) {
          "use strict";
          var matchPos = rgxFindMatchPos(str, left, right, flags), results = [];
          for (var i = 0; i < matchPos.length; ++i) {
            results.push([
              str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
              str.slice(matchPos[i].match.start, matchPos[i].match.end),
              str.slice(matchPos[i].left.start, matchPos[i].left.end),
              str.slice(matchPos[i].right.start, matchPos[i].right.end)
            ]);
          }
          return results;
        };
        showdown.helper.replaceRecursiveRegExp = function(str, replacement, left, right, flags) {
          "use strict";
          if (!showdown.helper.isFunction(replacement)) {
            var repStr = replacement;
            replacement = function() {
              return repStr;
            };
          }
          var matchPos = rgxFindMatchPos(str, left, right, flags), finalStr = str, lng = matchPos.length;
          if (lng > 0) {
            var bits = [];
            if (matchPos[0].wholeMatch.start !== 0) {
              bits.push(str.slice(0, matchPos[0].wholeMatch.start));
            }
            for (var i = 0; i < lng; ++i) {
              bits.push(
                replacement(
                  str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
                  str.slice(matchPos[i].match.start, matchPos[i].match.end),
                  str.slice(matchPos[i].left.start, matchPos[i].left.end),
                  str.slice(matchPos[i].right.start, matchPos[i].right.end)
                )
              );
              if (i < lng - 1) {
                bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
              }
            }
            if (matchPos[lng - 1].wholeMatch.end < str.length) {
              bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
            }
            finalStr = bits.join("");
          }
          return finalStr;
        };
        showdown.helper.regexIndexOf = function(str, regex, fromIndex) {
          "use strict";
          if (!showdown.helper.isString(str)) {
            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          }
          if (regex instanceof RegExp === false) {
            throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
          }
          var indexOf = str.substring(fromIndex || 0).search(regex);
          return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
        };
        showdown.helper.splitAtIndex = function(str, index) {
          "use strict";
          if (!showdown.helper.isString(str)) {
            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          }
          return [str.substring(0, index), str.substring(index)];
        };
        showdown.helper.encodeEmailAddress = function(mail) {
          "use strict";
          var encode = [
            function(ch) {
              return "&#" + ch.charCodeAt(0) + ";";
            },
            function(ch) {
              return "&#x" + ch.charCodeAt(0).toString(16) + ";";
            },
            function(ch) {
              return ch;
            }
          ];
          mail = mail.replace(/./g, function(ch) {
            if (ch === "@") {
              ch = encode[Math.floor(Math.random() * 2)](ch);
            } else {
              var r = Math.random();
              ch = r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch);
            }
            return ch;
          });
          return mail;
        };
        showdown.helper.padEnd = function padEnd(str, targetLength, padString) {
          "use strict";
          targetLength = targetLength >> 0;
          padString = String(padString || " ");
          if (str.length > targetLength) {
            return String(str);
          } else {
            targetLength = targetLength - str.length;
            if (targetLength > padString.length) {
              padString += padString.repeat(targetLength / padString.length);
            }
            return String(str) + padString.slice(0, targetLength);
          }
        };
        if (typeof console === "undefined") {
          console = {
            warn: function(msg) {
              "use strict";
              alert(msg);
            },
            log: function(msg) {
              "use strict";
              alert(msg);
            },
            error: function(msg) {
              "use strict";
              throw msg;
            }
          };
        }
        showdown.helper.regexes = {
          asteriskDashAndColon: /([*_:~])/g
        };
        showdown.helper.emojis = {
          "+1": "\u{1F44D}",
          "-1": "\u{1F44E}",
          "100": "\u{1F4AF}",
          "1234": "\u{1F522}",
          "1st_place_medal": "\u{1F947}",
          "2nd_place_medal": "\u{1F948}",
          "3rd_place_medal": "\u{1F949}",
          "8ball": "\u{1F3B1}",
          "a": "\u{1F170}\uFE0F",
          "ab": "\u{1F18E}",
          "abc": "\u{1F524}",
          "abcd": "\u{1F521}",
          "accept": "\u{1F251}",
          "aerial_tramway": "\u{1F6A1}",
          "airplane": "\u2708\uFE0F",
          "alarm_clock": "\u23F0",
          "alembic": "\u2697\uFE0F",
          "alien": "\u{1F47D}",
          "ambulance": "\u{1F691}",
          "amphora": "\u{1F3FA}",
          "anchor": "\u2693\uFE0F",
          "angel": "\u{1F47C}",
          "anger": "\u{1F4A2}",
          "angry": "\u{1F620}",
          "anguished": "\u{1F627}",
          "ant": "\u{1F41C}",
          "apple": "\u{1F34E}",
          "aquarius": "\u2652\uFE0F",
          "aries": "\u2648\uFE0F",
          "arrow_backward": "\u25C0\uFE0F",
          "arrow_double_down": "\u23EC",
          "arrow_double_up": "\u23EB",
          "arrow_down": "\u2B07\uFE0F",
          "arrow_down_small": "\u{1F53D}",
          "arrow_forward": "\u25B6\uFE0F",
          "arrow_heading_down": "\u2935\uFE0F",
          "arrow_heading_up": "\u2934\uFE0F",
          "arrow_left": "\u2B05\uFE0F",
          "arrow_lower_left": "\u2199\uFE0F",
          "arrow_lower_right": "\u2198\uFE0F",
          "arrow_right": "\u27A1\uFE0F",
          "arrow_right_hook": "\u21AA\uFE0F",
          "arrow_up": "\u2B06\uFE0F",
          "arrow_up_down": "\u2195\uFE0F",
          "arrow_up_small": "\u{1F53C}",
          "arrow_upper_left": "\u2196\uFE0F",
          "arrow_upper_right": "\u2197\uFE0F",
          "arrows_clockwise": "\u{1F503}",
          "arrows_counterclockwise": "\u{1F504}",
          "art": "\u{1F3A8}",
          "articulated_lorry": "\u{1F69B}",
          "artificial_satellite": "\u{1F6F0}",
          "astonished": "\u{1F632}",
          "athletic_shoe": "\u{1F45F}",
          "atm": "\u{1F3E7}",
          "atom_symbol": "\u269B\uFE0F",
          "avocado": "\u{1F951}",
          "b": "\u{1F171}\uFE0F",
          "baby": "\u{1F476}",
          "baby_bottle": "\u{1F37C}",
          "baby_chick": "\u{1F424}",
          "baby_symbol": "\u{1F6BC}",
          "back": "\u{1F519}",
          "bacon": "\u{1F953}",
          "badminton": "\u{1F3F8}",
          "baggage_claim": "\u{1F6C4}",
          "baguette_bread": "\u{1F956}",
          "balance_scale": "\u2696\uFE0F",
          "balloon": "\u{1F388}",
          "ballot_box": "\u{1F5F3}",
          "ballot_box_with_check": "\u2611\uFE0F",
          "bamboo": "\u{1F38D}",
          "banana": "\u{1F34C}",
          "bangbang": "\u203C\uFE0F",
          "bank": "\u{1F3E6}",
          "bar_chart": "\u{1F4CA}",
          "barber": "\u{1F488}",
          "baseball": "\u26BE\uFE0F",
          "basketball": "\u{1F3C0}",
          "basketball_man": "\u26F9\uFE0F",
          "basketball_woman": "\u26F9\uFE0F&zwj;\u2640\uFE0F",
          "bat": "\u{1F987}",
          "bath": "\u{1F6C0}",
          "bathtub": "\u{1F6C1}",
          "battery": "\u{1F50B}",
          "beach_umbrella": "\u{1F3D6}",
          "bear": "\u{1F43B}",
          "bed": "\u{1F6CF}",
          "bee": "\u{1F41D}",
          "beer": "\u{1F37A}",
          "beers": "\u{1F37B}",
          "beetle": "\u{1F41E}",
          "beginner": "\u{1F530}",
          "bell": "\u{1F514}",
          "bellhop_bell": "\u{1F6CE}",
          "bento": "\u{1F371}",
          "biking_man": "\u{1F6B4}",
          "bike": "\u{1F6B2}",
          "biking_woman": "\u{1F6B4}&zwj;\u2640\uFE0F",
          "bikini": "\u{1F459}",
          "biohazard": "\u2623\uFE0F",
          "bird": "\u{1F426}",
          "birthday": "\u{1F382}",
          "black_circle": "\u26AB\uFE0F",
          "black_flag": "\u{1F3F4}",
          "black_heart": "\u{1F5A4}",
          "black_joker": "\u{1F0CF}",
          "black_large_square": "\u2B1B\uFE0F",
          "black_medium_small_square": "\u25FE\uFE0F",
          "black_medium_square": "\u25FC\uFE0F",
          "black_nib": "\u2712\uFE0F",
          "black_small_square": "\u25AA\uFE0F",
          "black_square_button": "\u{1F532}",
          "blonde_man": "\u{1F471}",
          "blonde_woman": "\u{1F471}&zwj;\u2640\uFE0F",
          "blossom": "\u{1F33C}",
          "blowfish": "\u{1F421}",
          "blue_book": "\u{1F4D8}",
          "blue_car": "\u{1F699}",
          "blue_heart": "\u{1F499}",
          "blush": "\u{1F60A}",
          "boar": "\u{1F417}",
          "boat": "\u26F5\uFE0F",
          "bomb": "\u{1F4A3}",
          "book": "\u{1F4D6}",
          "bookmark": "\u{1F516}",
          "bookmark_tabs": "\u{1F4D1}",
          "books": "\u{1F4DA}",
          "boom": "\u{1F4A5}",
          "boot": "\u{1F462}",
          "bouquet": "\u{1F490}",
          "bowing_man": "\u{1F647}",
          "bow_and_arrow": "\u{1F3F9}",
          "bowing_woman": "\u{1F647}&zwj;\u2640\uFE0F",
          "bowling": "\u{1F3B3}",
          "boxing_glove": "\u{1F94A}",
          "boy": "\u{1F466}",
          "bread": "\u{1F35E}",
          "bride_with_veil": "\u{1F470}",
          "bridge_at_night": "\u{1F309}",
          "briefcase": "\u{1F4BC}",
          "broken_heart": "\u{1F494}",
          "bug": "\u{1F41B}",
          "building_construction": "\u{1F3D7}",
          "bulb": "\u{1F4A1}",
          "bullettrain_front": "\u{1F685}",
          "bullettrain_side": "\u{1F684}",
          "burrito": "\u{1F32F}",
          "bus": "\u{1F68C}",
          "business_suit_levitating": "\u{1F574}",
          "busstop": "\u{1F68F}",
          "bust_in_silhouette": "\u{1F464}",
          "busts_in_silhouette": "\u{1F465}",
          "butterfly": "\u{1F98B}",
          "cactus": "\u{1F335}",
          "cake": "\u{1F370}",
          "calendar": "\u{1F4C6}",
          "call_me_hand": "\u{1F919}",
          "calling": "\u{1F4F2}",
          "camel": "\u{1F42B}",
          "camera": "\u{1F4F7}",
          "camera_flash": "\u{1F4F8}",
          "camping": "\u{1F3D5}",
          "cancer": "\u264B\uFE0F",
          "candle": "\u{1F56F}",
          "candy": "\u{1F36C}",
          "canoe": "\u{1F6F6}",
          "capital_abcd": "\u{1F520}",
          "capricorn": "\u2651\uFE0F",
          "car": "\u{1F697}",
          "card_file_box": "\u{1F5C3}",
          "card_index": "\u{1F4C7}",
          "card_index_dividers": "\u{1F5C2}",
          "carousel_horse": "\u{1F3A0}",
          "carrot": "\u{1F955}",
          "cat": "\u{1F431}",
          "cat2": "\u{1F408}",
          "cd": "\u{1F4BF}",
          "chains": "\u26D3",
          "champagne": "\u{1F37E}",
          "chart": "\u{1F4B9}",
          "chart_with_downwards_trend": "\u{1F4C9}",
          "chart_with_upwards_trend": "\u{1F4C8}",
          "checkered_flag": "\u{1F3C1}",
          "cheese": "\u{1F9C0}",
          "cherries": "\u{1F352}",
          "cherry_blossom": "\u{1F338}",
          "chestnut": "\u{1F330}",
          "chicken": "\u{1F414}",
          "children_crossing": "\u{1F6B8}",
          "chipmunk": "\u{1F43F}",
          "chocolate_bar": "\u{1F36B}",
          "christmas_tree": "\u{1F384}",
          "church": "\u26EA\uFE0F",
          "cinema": "\u{1F3A6}",
          "circus_tent": "\u{1F3AA}",
          "city_sunrise": "\u{1F307}",
          "city_sunset": "\u{1F306}",
          "cityscape": "\u{1F3D9}",
          "cl": "\u{1F191}",
          "clamp": "\u{1F5DC}",
          "clap": "\u{1F44F}",
          "clapper": "\u{1F3AC}",
          "classical_building": "\u{1F3DB}",
          "clinking_glasses": "\u{1F942}",
          "clipboard": "\u{1F4CB}",
          "clock1": "\u{1F550}",
          "clock10": "\u{1F559}",
          "clock1030": "\u{1F565}",
          "clock11": "\u{1F55A}",
          "clock1130": "\u{1F566}",
          "clock12": "\u{1F55B}",
          "clock1230": "\u{1F567}",
          "clock130": "\u{1F55C}",
          "clock2": "\u{1F551}",
          "clock230": "\u{1F55D}",
          "clock3": "\u{1F552}",
          "clock330": "\u{1F55E}",
          "clock4": "\u{1F553}",
          "clock430": "\u{1F55F}",
          "clock5": "\u{1F554}",
          "clock530": "\u{1F560}",
          "clock6": "\u{1F555}",
          "clock630": "\u{1F561}",
          "clock7": "\u{1F556}",
          "clock730": "\u{1F562}",
          "clock8": "\u{1F557}",
          "clock830": "\u{1F563}",
          "clock9": "\u{1F558}",
          "clock930": "\u{1F564}",
          "closed_book": "\u{1F4D5}",
          "closed_lock_with_key": "\u{1F510}",
          "closed_umbrella": "\u{1F302}",
          "cloud": "\u2601\uFE0F",
          "cloud_with_lightning": "\u{1F329}",
          "cloud_with_lightning_and_rain": "\u26C8",
          "cloud_with_rain": "\u{1F327}",
          "cloud_with_snow": "\u{1F328}",
          "clown_face": "\u{1F921}",
          "clubs": "\u2663\uFE0F",
          "cocktail": "\u{1F378}",
          "coffee": "\u2615\uFE0F",
          "coffin": "\u26B0\uFE0F",
          "cold_sweat": "\u{1F630}",
          "comet": "\u2604\uFE0F",
          "computer": "\u{1F4BB}",
          "computer_mouse": "\u{1F5B1}",
          "confetti_ball": "\u{1F38A}",
          "confounded": "\u{1F616}",
          "confused": "\u{1F615}",
          "congratulations": "\u3297\uFE0F",
          "construction": "\u{1F6A7}",
          "construction_worker_man": "\u{1F477}",
          "construction_worker_woman": "\u{1F477}&zwj;\u2640\uFE0F",
          "control_knobs": "\u{1F39B}",
          "convenience_store": "\u{1F3EA}",
          "cookie": "\u{1F36A}",
          "cool": "\u{1F192}",
          "policeman": "\u{1F46E}",
          "copyright": "\xA9\uFE0F",
          "corn": "\u{1F33D}",
          "couch_and_lamp": "\u{1F6CB}",
          "couple": "\u{1F46B}",
          "couple_with_heart_woman_man": "\u{1F491}",
          "couple_with_heart_man_man": "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}",
          "couple_with_heart_woman_woman": "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}",
          "couplekiss_man_man": "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}",
          "couplekiss_man_woman": "\u{1F48F}",
          "couplekiss_woman_woman": "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}",
          "cow": "\u{1F42E}",
          "cow2": "\u{1F404}",
          "cowboy_hat_face": "\u{1F920}",
          "crab": "\u{1F980}",
          "crayon": "\u{1F58D}",
          "credit_card": "\u{1F4B3}",
          "crescent_moon": "\u{1F319}",
          "cricket": "\u{1F3CF}",
          "crocodile": "\u{1F40A}",
          "croissant": "\u{1F950}",
          "crossed_fingers": "\u{1F91E}",
          "crossed_flags": "\u{1F38C}",
          "crossed_swords": "\u2694\uFE0F",
          "crown": "\u{1F451}",
          "cry": "\u{1F622}",
          "crying_cat_face": "\u{1F63F}",
          "crystal_ball": "\u{1F52E}",
          "cucumber": "\u{1F952}",
          "cupid": "\u{1F498}",
          "curly_loop": "\u27B0",
          "currency_exchange": "\u{1F4B1}",
          "curry": "\u{1F35B}",
          "custard": "\u{1F36E}",
          "customs": "\u{1F6C3}",
          "cyclone": "\u{1F300}",
          "dagger": "\u{1F5E1}",
          "dancer": "\u{1F483}",
          "dancing_women": "\u{1F46F}",
          "dancing_men": "\u{1F46F}&zwj;\u2642\uFE0F",
          "dango": "\u{1F361}",
          "dark_sunglasses": "\u{1F576}",
          "dart": "\u{1F3AF}",
          "dash": "\u{1F4A8}",
          "date": "\u{1F4C5}",
          "deciduous_tree": "\u{1F333}",
          "deer": "\u{1F98C}",
          "department_store": "\u{1F3EC}",
          "derelict_house": "\u{1F3DA}",
          "desert": "\u{1F3DC}",
          "desert_island": "\u{1F3DD}",
          "desktop_computer": "\u{1F5A5}",
          "male_detective": "\u{1F575}\uFE0F",
          "diamond_shape_with_a_dot_inside": "\u{1F4A0}",
          "diamonds": "\u2666\uFE0F",
          "disappointed": "\u{1F61E}",
          "disappointed_relieved": "\u{1F625}",
          "dizzy": "\u{1F4AB}",
          "dizzy_face": "\u{1F635}",
          "do_not_litter": "\u{1F6AF}",
          "dog": "\u{1F436}",
          "dog2": "\u{1F415}",
          "dollar": "\u{1F4B5}",
          "dolls": "\u{1F38E}",
          "dolphin": "\u{1F42C}",
          "door": "\u{1F6AA}",
          "doughnut": "\u{1F369}",
          "dove": "\u{1F54A}",
          "dragon": "\u{1F409}",
          "dragon_face": "\u{1F432}",
          "dress": "\u{1F457}",
          "dromedary_camel": "\u{1F42A}",
          "drooling_face": "\u{1F924}",
          "droplet": "\u{1F4A7}",
          "drum": "\u{1F941}",
          "duck": "\u{1F986}",
          "dvd": "\u{1F4C0}",
          "e-mail": "\u{1F4E7}",
          "eagle": "\u{1F985}",
          "ear": "\u{1F442}",
          "ear_of_rice": "\u{1F33E}",
          "earth_africa": "\u{1F30D}",
          "earth_americas": "\u{1F30E}",
          "earth_asia": "\u{1F30F}",
          "egg": "\u{1F95A}",
          "eggplant": "\u{1F346}",
          "eight_pointed_black_star": "\u2734\uFE0F",
          "eight_spoked_asterisk": "\u2733\uFE0F",
          "electric_plug": "\u{1F50C}",
          "elephant": "\u{1F418}",
          "email": "\u2709\uFE0F",
          "end": "\u{1F51A}",
          "envelope_with_arrow": "\u{1F4E9}",
          "euro": "\u{1F4B6}",
          "european_castle": "\u{1F3F0}",
          "european_post_office": "\u{1F3E4}",
          "evergreen_tree": "\u{1F332}",
          "exclamation": "\u2757\uFE0F",
          "expressionless": "\u{1F611}",
          "eye": "\u{1F441}",
          "eye_speech_bubble": "\u{1F441}&zwj;\u{1F5E8}",
          "eyeglasses": "\u{1F453}",
          "eyes": "\u{1F440}",
          "face_with_head_bandage": "\u{1F915}",
          "face_with_thermometer": "\u{1F912}",
          "fist_oncoming": "\u{1F44A}",
          "factory": "\u{1F3ED}",
          "fallen_leaf": "\u{1F342}",
          "family_man_woman_boy": "\u{1F46A}",
          "family_man_boy": "\u{1F468}&zwj;\u{1F466}",
          "family_man_boy_boy": "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_man_girl": "\u{1F468}&zwj;\u{1F467}",
          "family_man_girl_boy": "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_man_girl_girl": "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
          "family_man_man_boy": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}",
          "family_man_man_boy_boy": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_man_man_girl": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}",
          "family_man_man_girl_boy": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_man_man_girl_girl": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
          "family_man_woman_boy_boy": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_man_woman_girl": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}",
          "family_man_woman_girl_boy": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_man_woman_girl_girl": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
          "family_woman_boy": "\u{1F469}&zwj;\u{1F466}",
          "family_woman_boy_boy": "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_woman_girl": "\u{1F469}&zwj;\u{1F467}",
          "family_woman_girl_boy": "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_woman_girl_girl": "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
          "family_woman_woman_boy": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}",
          "family_woman_woman_boy_boy": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_woman_woman_girl": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}",
          "family_woman_woman_girl_boy": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_woman_woman_girl_girl": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
          "fast_forward": "\u23E9",
          "fax": "\u{1F4E0}",
          "fearful": "\u{1F628}",
          "feet": "\u{1F43E}",
          "female_detective": "\u{1F575}\uFE0F&zwj;\u2640\uFE0F",
          "ferris_wheel": "\u{1F3A1}",
          "ferry": "\u26F4",
          "field_hockey": "\u{1F3D1}",
          "file_cabinet": "\u{1F5C4}",
          "file_folder": "\u{1F4C1}",
          "film_projector": "\u{1F4FD}",
          "film_strip": "\u{1F39E}",
          "fire": "\u{1F525}",
          "fire_engine": "\u{1F692}",
          "fireworks": "\u{1F386}",
          "first_quarter_moon": "\u{1F313}",
          "first_quarter_moon_with_face": "\u{1F31B}",
          "fish": "\u{1F41F}",
          "fish_cake": "\u{1F365}",
          "fishing_pole_and_fish": "\u{1F3A3}",
          "fist_raised": "\u270A",
          "fist_left": "\u{1F91B}",
          "fist_right": "\u{1F91C}",
          "flags": "\u{1F38F}",
          "flashlight": "\u{1F526}",
          "fleur_de_lis": "\u269C\uFE0F",
          "flight_arrival": "\u{1F6EC}",
          "flight_departure": "\u{1F6EB}",
          "floppy_disk": "\u{1F4BE}",
          "flower_playing_cards": "\u{1F3B4}",
          "flushed": "\u{1F633}",
          "fog": "\u{1F32B}",
          "foggy": "\u{1F301}",
          "football": "\u{1F3C8}",
          "footprints": "\u{1F463}",
          "fork_and_knife": "\u{1F374}",
          "fountain": "\u26F2\uFE0F",
          "fountain_pen": "\u{1F58B}",
          "four_leaf_clover": "\u{1F340}",
          "fox_face": "\u{1F98A}",
          "framed_picture": "\u{1F5BC}",
          "free": "\u{1F193}",
          "fried_egg": "\u{1F373}",
          "fried_shrimp": "\u{1F364}",
          "fries": "\u{1F35F}",
          "frog": "\u{1F438}",
          "frowning": "\u{1F626}",
          "frowning_face": "\u2639\uFE0F",
          "frowning_man": "\u{1F64D}&zwj;\u2642\uFE0F",
          "frowning_woman": "\u{1F64D}",
          "middle_finger": "\u{1F595}",
          "fuelpump": "\u26FD\uFE0F",
          "full_moon": "\u{1F315}",
          "full_moon_with_face": "\u{1F31D}",
          "funeral_urn": "\u26B1\uFE0F",
          "game_die": "\u{1F3B2}",
          "gear": "\u2699\uFE0F",
          "gem": "\u{1F48E}",
          "gemini": "\u264A\uFE0F",
          "ghost": "\u{1F47B}",
          "gift": "\u{1F381}",
          "gift_heart": "\u{1F49D}",
          "girl": "\u{1F467}",
          "globe_with_meridians": "\u{1F310}",
          "goal_net": "\u{1F945}",
          "goat": "\u{1F410}",
          "golf": "\u26F3\uFE0F",
          "golfing_man": "\u{1F3CC}\uFE0F",
          "golfing_woman": "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F",
          "gorilla": "\u{1F98D}",
          "grapes": "\u{1F347}",
          "green_apple": "\u{1F34F}",
          "green_book": "\u{1F4D7}",
          "green_heart": "\u{1F49A}",
          "green_salad": "\u{1F957}",
          "grey_exclamation": "\u2755",
          "grey_question": "\u2754",
          "grimacing": "\u{1F62C}",
          "grin": "\u{1F601}",
          "grinning": "\u{1F600}",
          "guardsman": "\u{1F482}",
          "guardswoman": "\u{1F482}&zwj;\u2640\uFE0F",
          "guitar": "\u{1F3B8}",
          "gun": "\u{1F52B}",
          "haircut_woman": "\u{1F487}",
          "haircut_man": "\u{1F487}&zwj;\u2642\uFE0F",
          "hamburger": "\u{1F354}",
          "hammer": "\u{1F528}",
          "hammer_and_pick": "\u2692",
          "hammer_and_wrench": "\u{1F6E0}",
          "hamster": "\u{1F439}",
          "hand": "\u270B",
          "handbag": "\u{1F45C}",
          "handshake": "\u{1F91D}",
          "hankey": "\u{1F4A9}",
          "hatched_chick": "\u{1F425}",
          "hatching_chick": "\u{1F423}",
          "headphones": "\u{1F3A7}",
          "hear_no_evil": "\u{1F649}",
          "heart": "\u2764\uFE0F",
          "heart_decoration": "\u{1F49F}",
          "heart_eyes": "\u{1F60D}",
          "heart_eyes_cat": "\u{1F63B}",
          "heartbeat": "\u{1F493}",
          "heartpulse": "\u{1F497}",
          "hearts": "\u2665\uFE0F",
          "heavy_check_mark": "\u2714\uFE0F",
          "heavy_division_sign": "\u2797",
          "heavy_dollar_sign": "\u{1F4B2}",
          "heavy_heart_exclamation": "\u2763\uFE0F",
          "heavy_minus_sign": "\u2796",
          "heavy_multiplication_x": "\u2716\uFE0F",
          "heavy_plus_sign": "\u2795",
          "helicopter": "\u{1F681}",
          "herb": "\u{1F33F}",
          "hibiscus": "\u{1F33A}",
          "high_brightness": "\u{1F506}",
          "high_heel": "\u{1F460}",
          "hocho": "\u{1F52A}",
          "hole": "\u{1F573}",
          "honey_pot": "\u{1F36F}",
          "horse": "\u{1F434}",
          "horse_racing": "\u{1F3C7}",
          "hospital": "\u{1F3E5}",
          "hot_pepper": "\u{1F336}",
          "hotdog": "\u{1F32D}",
          "hotel": "\u{1F3E8}",
          "hotsprings": "\u2668\uFE0F",
          "hourglass": "\u231B\uFE0F",
          "hourglass_flowing_sand": "\u23F3",
          "house": "\u{1F3E0}",
          "house_with_garden": "\u{1F3E1}",
          "houses": "\u{1F3D8}",
          "hugs": "\u{1F917}",
          "hushed": "\u{1F62F}",
          "ice_cream": "\u{1F368}",
          "ice_hockey": "\u{1F3D2}",
          "ice_skate": "\u26F8",
          "icecream": "\u{1F366}",
          "id": "\u{1F194}",
          "ideograph_advantage": "\u{1F250}",
          "imp": "\u{1F47F}",
          "inbox_tray": "\u{1F4E5}",
          "incoming_envelope": "\u{1F4E8}",
          "tipping_hand_woman": "\u{1F481}",
          "information_source": "\u2139\uFE0F",
          "innocent": "\u{1F607}",
          "interrobang": "\u2049\uFE0F",
          "iphone": "\u{1F4F1}",
          "izakaya_lantern": "\u{1F3EE}",
          "jack_o_lantern": "\u{1F383}",
          "japan": "\u{1F5FE}",
          "japanese_castle": "\u{1F3EF}",
          "japanese_goblin": "\u{1F47A}",
          "japanese_ogre": "\u{1F479}",
          "jeans": "\u{1F456}",
          "joy": "\u{1F602}",
          "joy_cat": "\u{1F639}",
          "joystick": "\u{1F579}",
          "kaaba": "\u{1F54B}",
          "key": "\u{1F511}",
          "keyboard": "\u2328\uFE0F",
          "keycap_ten": "\u{1F51F}",
          "kick_scooter": "\u{1F6F4}",
          "kimono": "\u{1F458}",
          "kiss": "\u{1F48B}",
          "kissing": "\u{1F617}",
          "kissing_cat": "\u{1F63D}",
          "kissing_closed_eyes": "\u{1F61A}",
          "kissing_heart": "\u{1F618}",
          "kissing_smiling_eyes": "\u{1F619}",
          "kiwi_fruit": "\u{1F95D}",
          "koala": "\u{1F428}",
          "koko": "\u{1F201}",
          "label": "\u{1F3F7}",
          "large_blue_circle": "\u{1F535}",
          "large_blue_diamond": "\u{1F537}",
          "large_orange_diamond": "\u{1F536}",
          "last_quarter_moon": "\u{1F317}",
          "last_quarter_moon_with_face": "\u{1F31C}",
          "latin_cross": "\u271D\uFE0F",
          "laughing": "\u{1F606}",
          "leaves": "\u{1F343}",
          "ledger": "\u{1F4D2}",
          "left_luggage": "\u{1F6C5}",
          "left_right_arrow": "\u2194\uFE0F",
          "leftwards_arrow_with_hook": "\u21A9\uFE0F",
          "lemon": "\u{1F34B}",
          "leo": "\u264C\uFE0F",
          "leopard": "\u{1F406}",
          "level_slider": "\u{1F39A}",
          "libra": "\u264E\uFE0F",
          "light_rail": "\u{1F688}",
          "link": "\u{1F517}",
          "lion": "\u{1F981}",
          "lips": "\u{1F444}",
          "lipstick": "\u{1F484}",
          "lizard": "\u{1F98E}",
          "lock": "\u{1F512}",
          "lock_with_ink_pen": "\u{1F50F}",
          "lollipop": "\u{1F36D}",
          "loop": "\u27BF",
          "loud_sound": "\u{1F50A}",
          "loudspeaker": "\u{1F4E2}",
          "love_hotel": "\u{1F3E9}",
          "love_letter": "\u{1F48C}",
          "low_brightness": "\u{1F505}",
          "lying_face": "\u{1F925}",
          "m": "\u24C2\uFE0F",
          "mag": "\u{1F50D}",
          "mag_right": "\u{1F50E}",
          "mahjong": "\u{1F004}\uFE0F",
          "mailbox": "\u{1F4EB}",
          "mailbox_closed": "\u{1F4EA}",
          "mailbox_with_mail": "\u{1F4EC}",
          "mailbox_with_no_mail": "\u{1F4ED}",
          "man": "\u{1F468}",
          "man_artist": "\u{1F468}&zwj;\u{1F3A8}",
          "man_astronaut": "\u{1F468}&zwj;\u{1F680}",
          "man_cartwheeling": "\u{1F938}&zwj;\u2642\uFE0F",
          "man_cook": "\u{1F468}&zwj;\u{1F373}",
          "man_dancing": "\u{1F57A}",
          "man_facepalming": "\u{1F926}&zwj;\u2642\uFE0F",
          "man_factory_worker": "\u{1F468}&zwj;\u{1F3ED}",
          "man_farmer": "\u{1F468}&zwj;\u{1F33E}",
          "man_firefighter": "\u{1F468}&zwj;\u{1F692}",
          "man_health_worker": "\u{1F468}&zwj;\u2695\uFE0F",
          "man_in_tuxedo": "\u{1F935}",
          "man_judge": "\u{1F468}&zwj;\u2696\uFE0F",
          "man_juggling": "\u{1F939}&zwj;\u2642\uFE0F",
          "man_mechanic": "\u{1F468}&zwj;\u{1F527}",
          "man_office_worker": "\u{1F468}&zwj;\u{1F4BC}",
          "man_pilot": "\u{1F468}&zwj;\u2708\uFE0F",
          "man_playing_handball": "\u{1F93E}&zwj;\u2642\uFE0F",
          "man_playing_water_polo": "\u{1F93D}&zwj;\u2642\uFE0F",
          "man_scientist": "\u{1F468}&zwj;\u{1F52C}",
          "man_shrugging": "\u{1F937}&zwj;\u2642\uFE0F",
          "man_singer": "\u{1F468}&zwj;\u{1F3A4}",
          "man_student": "\u{1F468}&zwj;\u{1F393}",
          "man_teacher": "\u{1F468}&zwj;\u{1F3EB}",
          "man_technologist": "\u{1F468}&zwj;\u{1F4BB}",
          "man_with_gua_pi_mao": "\u{1F472}",
          "man_with_turban": "\u{1F473}",
          "tangerine": "\u{1F34A}",
          "mans_shoe": "\u{1F45E}",
          "mantelpiece_clock": "\u{1F570}",
          "maple_leaf": "\u{1F341}",
          "martial_arts_uniform": "\u{1F94B}",
          "mask": "\u{1F637}",
          "massage_woman": "\u{1F486}",
          "massage_man": "\u{1F486}&zwj;\u2642\uFE0F",
          "meat_on_bone": "\u{1F356}",
          "medal_military": "\u{1F396}",
          "medal_sports": "\u{1F3C5}",
          "mega": "\u{1F4E3}",
          "melon": "\u{1F348}",
          "memo": "\u{1F4DD}",
          "men_wrestling": "\u{1F93C}&zwj;\u2642\uFE0F",
          "menorah": "\u{1F54E}",
          "mens": "\u{1F6B9}",
          "metal": "\u{1F918}",
          "metro": "\u{1F687}",
          "microphone": "\u{1F3A4}",
          "microscope": "\u{1F52C}",
          "milk_glass": "\u{1F95B}",
          "milky_way": "\u{1F30C}",
          "minibus": "\u{1F690}",
          "minidisc": "\u{1F4BD}",
          "mobile_phone_off": "\u{1F4F4}",
          "money_mouth_face": "\u{1F911}",
          "money_with_wings": "\u{1F4B8}",
          "moneybag": "\u{1F4B0}",
          "monkey": "\u{1F412}",
          "monkey_face": "\u{1F435}",
          "monorail": "\u{1F69D}",
          "moon": "\u{1F314}",
          "mortar_board": "\u{1F393}",
          "mosque": "\u{1F54C}",
          "motor_boat": "\u{1F6E5}",
          "motor_scooter": "\u{1F6F5}",
          "motorcycle": "\u{1F3CD}",
          "motorway": "\u{1F6E3}",
          "mount_fuji": "\u{1F5FB}",
          "mountain": "\u26F0",
          "mountain_biking_man": "\u{1F6B5}",
          "mountain_biking_woman": "\u{1F6B5}&zwj;\u2640\uFE0F",
          "mountain_cableway": "\u{1F6A0}",
          "mountain_railway": "\u{1F69E}",
          "mountain_snow": "\u{1F3D4}",
          "mouse": "\u{1F42D}",
          "mouse2": "\u{1F401}",
          "movie_camera": "\u{1F3A5}",
          "moyai": "\u{1F5FF}",
          "mrs_claus": "\u{1F936}",
          "muscle": "\u{1F4AA}",
          "mushroom": "\u{1F344}",
          "musical_keyboard": "\u{1F3B9}",
          "musical_note": "\u{1F3B5}",
          "musical_score": "\u{1F3BC}",
          "mute": "\u{1F507}",
          "nail_care": "\u{1F485}",
          "name_badge": "\u{1F4DB}",
          "national_park": "\u{1F3DE}",
          "nauseated_face": "\u{1F922}",
          "necktie": "\u{1F454}",
          "negative_squared_cross_mark": "\u274E",
          "nerd_face": "\u{1F913}",
          "neutral_face": "\u{1F610}",
          "new": "\u{1F195}",
          "new_moon": "\u{1F311}",
          "new_moon_with_face": "\u{1F31A}",
          "newspaper": "\u{1F4F0}",
          "newspaper_roll": "\u{1F5DE}",
          "next_track_button": "\u23ED",
          "ng": "\u{1F196}",
          "no_good_man": "\u{1F645}&zwj;\u2642\uFE0F",
          "no_good_woman": "\u{1F645}",
          "night_with_stars": "\u{1F303}",
          "no_bell": "\u{1F515}",
          "no_bicycles": "\u{1F6B3}",
          "no_entry": "\u26D4\uFE0F",
          "no_entry_sign": "\u{1F6AB}",
          "no_mobile_phones": "\u{1F4F5}",
          "no_mouth": "\u{1F636}",
          "no_pedestrians": "\u{1F6B7}",
          "no_smoking": "\u{1F6AD}",
          "non-potable_water": "\u{1F6B1}",
          "nose": "\u{1F443}",
          "notebook": "\u{1F4D3}",
          "notebook_with_decorative_cover": "\u{1F4D4}",
          "notes": "\u{1F3B6}",
          "nut_and_bolt": "\u{1F529}",
          "o": "\u2B55\uFE0F",
          "o2": "\u{1F17E}\uFE0F",
          "ocean": "\u{1F30A}",
          "octopus": "\u{1F419}",
          "oden": "\u{1F362}",
          "office": "\u{1F3E2}",
          "oil_drum": "\u{1F6E2}",
          "ok": "\u{1F197}",
          "ok_hand": "\u{1F44C}",
          "ok_man": "\u{1F646}&zwj;\u2642\uFE0F",
          "ok_woman": "\u{1F646}",
          "old_key": "\u{1F5DD}",
          "older_man": "\u{1F474}",
          "older_woman": "\u{1F475}",
          "om": "\u{1F549}",
          "on": "\u{1F51B}",
          "oncoming_automobile": "\u{1F698}",
          "oncoming_bus": "\u{1F68D}",
          "oncoming_police_car": "\u{1F694}",
          "oncoming_taxi": "\u{1F696}",
          "open_file_folder": "\u{1F4C2}",
          "open_hands": "\u{1F450}",
          "open_mouth": "\u{1F62E}",
          "open_umbrella": "\u2602\uFE0F",
          "ophiuchus": "\u26CE",
          "orange_book": "\u{1F4D9}",
          "orthodox_cross": "\u2626\uFE0F",
          "outbox_tray": "\u{1F4E4}",
          "owl": "\u{1F989}",
          "ox": "\u{1F402}",
          "package": "\u{1F4E6}",
          "page_facing_up": "\u{1F4C4}",
          "page_with_curl": "\u{1F4C3}",
          "pager": "\u{1F4DF}",
          "paintbrush": "\u{1F58C}",
          "palm_tree": "\u{1F334}",
          "pancakes": "\u{1F95E}",
          "panda_face": "\u{1F43C}",
          "paperclip": "\u{1F4CE}",
          "paperclips": "\u{1F587}",
          "parasol_on_ground": "\u26F1",
          "parking": "\u{1F17F}\uFE0F",
          "part_alternation_mark": "\u303D\uFE0F",
          "partly_sunny": "\u26C5\uFE0F",
          "passenger_ship": "\u{1F6F3}",
          "passport_control": "\u{1F6C2}",
          "pause_button": "\u23F8",
          "peace_symbol": "\u262E\uFE0F",
          "peach": "\u{1F351}",
          "peanuts": "\u{1F95C}",
          "pear": "\u{1F350}",
          "pen": "\u{1F58A}",
          "pencil2": "\u270F\uFE0F",
          "penguin": "\u{1F427}",
          "pensive": "\u{1F614}",
          "performing_arts": "\u{1F3AD}",
          "persevere": "\u{1F623}",
          "person_fencing": "\u{1F93A}",
          "pouting_woman": "\u{1F64E}",
          "phone": "\u260E\uFE0F",
          "pick": "\u26CF",
          "pig": "\u{1F437}",
          "pig2": "\u{1F416}",
          "pig_nose": "\u{1F43D}",
          "pill": "\u{1F48A}",
          "pineapple": "\u{1F34D}",
          "ping_pong": "\u{1F3D3}",
          "pisces": "\u2653\uFE0F",
          "pizza": "\u{1F355}",
          "place_of_worship": "\u{1F6D0}",
          "plate_with_cutlery": "\u{1F37D}",
          "play_or_pause_button": "\u23EF",
          "point_down": "\u{1F447}",
          "point_left": "\u{1F448}",
          "point_right": "\u{1F449}",
          "point_up": "\u261D\uFE0F",
          "point_up_2": "\u{1F446}",
          "police_car": "\u{1F693}",
          "policewoman": "\u{1F46E}&zwj;\u2640\uFE0F",
          "poodle": "\u{1F429}",
          "popcorn": "\u{1F37F}",
          "post_office": "\u{1F3E3}",
          "postal_horn": "\u{1F4EF}",
          "postbox": "\u{1F4EE}",
          "potable_water": "\u{1F6B0}",
          "potato": "\u{1F954}",
          "pouch": "\u{1F45D}",
          "poultry_leg": "\u{1F357}",
          "pound": "\u{1F4B7}",
          "rage": "\u{1F621}",
          "pouting_cat": "\u{1F63E}",
          "pouting_man": "\u{1F64E}&zwj;\u2642\uFE0F",
          "pray": "\u{1F64F}",
          "prayer_beads": "\u{1F4FF}",
          "pregnant_woman": "\u{1F930}",
          "previous_track_button": "\u23EE",
          "prince": "\u{1F934}",
          "princess": "\u{1F478}",
          "printer": "\u{1F5A8}",
          "purple_heart": "\u{1F49C}",
          "purse": "\u{1F45B}",
          "pushpin": "\u{1F4CC}",
          "put_litter_in_its_place": "\u{1F6AE}",
          "question": "\u2753",
          "rabbit": "\u{1F430}",
          "rabbit2": "\u{1F407}",
          "racehorse": "\u{1F40E}",
          "racing_car": "\u{1F3CE}",
          "radio": "\u{1F4FB}",
          "radio_button": "\u{1F518}",
          "radioactive": "\u2622\uFE0F",
          "railway_car": "\u{1F683}",
          "railway_track": "\u{1F6E4}",
          "rainbow": "\u{1F308}",
          "rainbow_flag": "\u{1F3F3}\uFE0F&zwj;\u{1F308}",
          "raised_back_of_hand": "\u{1F91A}",
          "raised_hand_with_fingers_splayed": "\u{1F590}",
          "raised_hands": "\u{1F64C}",
          "raising_hand_woman": "\u{1F64B}",
          "raising_hand_man": "\u{1F64B}&zwj;\u2642\uFE0F",
          "ram": "\u{1F40F}",
          "ramen": "\u{1F35C}",
          "rat": "\u{1F400}",
          "record_button": "\u23FA",
          "recycle": "\u267B\uFE0F",
          "red_circle": "\u{1F534}",
          "registered": "\xAE\uFE0F",
          "relaxed": "\u263A\uFE0F",
          "relieved": "\u{1F60C}",
          "reminder_ribbon": "\u{1F397}",
          "repeat": "\u{1F501}",
          "repeat_one": "\u{1F502}",
          "rescue_worker_helmet": "\u26D1",
          "restroom": "\u{1F6BB}",
          "revolving_hearts": "\u{1F49E}",
          "rewind": "\u23EA",
          "rhinoceros": "\u{1F98F}",
          "ribbon": "\u{1F380}",
          "rice": "\u{1F35A}",
          "rice_ball": "\u{1F359}",
          "rice_cracker": "\u{1F358}",
          "rice_scene": "\u{1F391}",
          "right_anger_bubble": "\u{1F5EF}",
          "ring": "\u{1F48D}",
          "robot": "\u{1F916}",
          "rocket": "\u{1F680}",
          "rofl": "\u{1F923}",
          "roll_eyes": "\u{1F644}",
          "roller_coaster": "\u{1F3A2}",
          "rooster": "\u{1F413}",
          "rose": "\u{1F339}",
          "rosette": "\u{1F3F5}",
          "rotating_light": "\u{1F6A8}",
          "round_pushpin": "\u{1F4CD}",
          "rowing_man": "\u{1F6A3}",
          "rowing_woman": "\u{1F6A3}&zwj;\u2640\uFE0F",
          "rugby_football": "\u{1F3C9}",
          "running_man": "\u{1F3C3}",
          "running_shirt_with_sash": "\u{1F3BD}",
          "running_woman": "\u{1F3C3}&zwj;\u2640\uFE0F",
          "sa": "\u{1F202}\uFE0F",
          "sagittarius": "\u2650\uFE0F",
          "sake": "\u{1F376}",
          "sandal": "\u{1F461}",
          "santa": "\u{1F385}",
          "satellite": "\u{1F4E1}",
          "saxophone": "\u{1F3B7}",
          "school": "\u{1F3EB}",
          "school_satchel": "\u{1F392}",
          "scissors": "\u2702\uFE0F",
          "scorpion": "\u{1F982}",
          "scorpius": "\u264F\uFE0F",
          "scream": "\u{1F631}",
          "scream_cat": "\u{1F640}",
          "scroll": "\u{1F4DC}",
          "seat": "\u{1F4BA}",
          "secret": "\u3299\uFE0F",
          "see_no_evil": "\u{1F648}",
          "seedling": "\u{1F331}",
          "selfie": "\u{1F933}",
          "shallow_pan_of_food": "\u{1F958}",
          "shamrock": "\u2618\uFE0F",
          "shark": "\u{1F988}",
          "shaved_ice": "\u{1F367}",
          "sheep": "\u{1F411}",
          "shell": "\u{1F41A}",
          "shield": "\u{1F6E1}",
          "shinto_shrine": "\u26E9",
          "ship": "\u{1F6A2}",
          "shirt": "\u{1F455}",
          "shopping": "\u{1F6CD}",
          "shopping_cart": "\u{1F6D2}",
          "shower": "\u{1F6BF}",
          "shrimp": "\u{1F990}",
          "signal_strength": "\u{1F4F6}",
          "six_pointed_star": "\u{1F52F}",
          "ski": "\u{1F3BF}",
          "skier": "\u26F7",
          "skull": "\u{1F480}",
          "skull_and_crossbones": "\u2620\uFE0F",
          "sleeping": "\u{1F634}",
          "sleeping_bed": "\u{1F6CC}",
          "sleepy": "\u{1F62A}",
          "slightly_frowning_face": "\u{1F641}",
          "slightly_smiling_face": "\u{1F642}",
          "slot_machine": "\u{1F3B0}",
          "small_airplane": "\u{1F6E9}",
          "small_blue_diamond": "\u{1F539}",
          "small_orange_diamond": "\u{1F538}",
          "small_red_triangle": "\u{1F53A}",
          "small_red_triangle_down": "\u{1F53B}",
          "smile": "\u{1F604}",
          "smile_cat": "\u{1F638}",
          "smiley": "\u{1F603}",
          "smiley_cat": "\u{1F63A}",
          "smiling_imp": "\u{1F608}",
          "smirk": "\u{1F60F}",
          "smirk_cat": "\u{1F63C}",
          "smoking": "\u{1F6AC}",
          "snail": "\u{1F40C}",
          "snake": "\u{1F40D}",
          "sneezing_face": "\u{1F927}",
          "snowboarder": "\u{1F3C2}",
          "snowflake": "\u2744\uFE0F",
          "snowman": "\u26C4\uFE0F",
          "snowman_with_snow": "\u2603\uFE0F",
          "sob": "\u{1F62D}",
          "soccer": "\u26BD\uFE0F",
          "soon": "\u{1F51C}",
          "sos": "\u{1F198}",
          "sound": "\u{1F509}",
          "space_invader": "\u{1F47E}",
          "spades": "\u2660\uFE0F",
          "spaghetti": "\u{1F35D}",
          "sparkle": "\u2747\uFE0F",
          "sparkler": "\u{1F387}",
          "sparkles": "\u2728",
          "sparkling_heart": "\u{1F496}",
          "speak_no_evil": "\u{1F64A}",
          "speaker": "\u{1F508}",
          "speaking_head": "\u{1F5E3}",
          "speech_balloon": "\u{1F4AC}",
          "speedboat": "\u{1F6A4}",
          "spider": "\u{1F577}",
          "spider_web": "\u{1F578}",
          "spiral_calendar": "\u{1F5D3}",
          "spiral_notepad": "\u{1F5D2}",
          "spoon": "\u{1F944}",
          "squid": "\u{1F991}",
          "stadium": "\u{1F3DF}",
          "star": "\u2B50\uFE0F",
          "star2": "\u{1F31F}",
          "star_and_crescent": "\u262A\uFE0F",
          "star_of_david": "\u2721\uFE0F",
          "stars": "\u{1F320}",
          "station": "\u{1F689}",
          "statue_of_liberty": "\u{1F5FD}",
          "steam_locomotive": "\u{1F682}",
          "stew": "\u{1F372}",
          "stop_button": "\u23F9",
          "stop_sign": "\u{1F6D1}",
          "stopwatch": "\u23F1",
          "straight_ruler": "\u{1F4CF}",
          "strawberry": "\u{1F353}",
          "stuck_out_tongue": "\u{1F61B}",
          "stuck_out_tongue_closed_eyes": "\u{1F61D}",
          "stuck_out_tongue_winking_eye": "\u{1F61C}",
          "studio_microphone": "\u{1F399}",
          "stuffed_flatbread": "\u{1F959}",
          "sun_behind_large_cloud": "\u{1F325}",
          "sun_behind_rain_cloud": "\u{1F326}",
          "sun_behind_small_cloud": "\u{1F324}",
          "sun_with_face": "\u{1F31E}",
          "sunflower": "\u{1F33B}",
          "sunglasses": "\u{1F60E}",
          "sunny": "\u2600\uFE0F",
          "sunrise": "\u{1F305}",
          "sunrise_over_mountains": "\u{1F304}",
          "surfing_man": "\u{1F3C4}",
          "surfing_woman": "\u{1F3C4}&zwj;\u2640\uFE0F",
          "sushi": "\u{1F363}",
          "suspension_railway": "\u{1F69F}",
          "sweat": "\u{1F613}",
          "sweat_drops": "\u{1F4A6}",
          "sweat_smile": "\u{1F605}",
          "sweet_potato": "\u{1F360}",
          "swimming_man": "\u{1F3CA}",
          "swimming_woman": "\u{1F3CA}&zwj;\u2640\uFE0F",
          "symbols": "\u{1F523}",
          "synagogue": "\u{1F54D}",
          "syringe": "\u{1F489}",
          "taco": "\u{1F32E}",
          "tada": "\u{1F389}",
          "tanabata_tree": "\u{1F38B}",
          "taurus": "\u2649\uFE0F",
          "taxi": "\u{1F695}",
          "tea": "\u{1F375}",
          "telephone_receiver": "\u{1F4DE}",
          "telescope": "\u{1F52D}",
          "tennis": "\u{1F3BE}",
          "tent": "\u26FA\uFE0F",
          "thermometer": "\u{1F321}",
          "thinking": "\u{1F914}",
          "thought_balloon": "\u{1F4AD}",
          "ticket": "\u{1F3AB}",
          "tickets": "\u{1F39F}",
          "tiger": "\u{1F42F}",
          "tiger2": "\u{1F405}",
          "timer_clock": "\u23F2",
          "tipping_hand_man": "\u{1F481}&zwj;\u2642\uFE0F",
          "tired_face": "\u{1F62B}",
          "tm": "\u2122\uFE0F",
          "toilet": "\u{1F6BD}",
          "tokyo_tower": "\u{1F5FC}",
          "tomato": "\u{1F345}",
          "tongue": "\u{1F445}",
          "top": "\u{1F51D}",
          "tophat": "\u{1F3A9}",
          "tornado": "\u{1F32A}",
          "trackball": "\u{1F5B2}",
          "tractor": "\u{1F69C}",
          "traffic_light": "\u{1F6A5}",
          "train": "\u{1F68B}",
          "train2": "\u{1F686}",
          "tram": "\u{1F68A}",
          "triangular_flag_on_post": "\u{1F6A9}",
          "triangular_ruler": "\u{1F4D0}",
          "trident": "\u{1F531}",
          "triumph": "\u{1F624}",
          "trolleybus": "\u{1F68E}",
          "trophy": "\u{1F3C6}",
          "tropical_drink": "\u{1F379}",
          "tropical_fish": "\u{1F420}",
          "truck": "\u{1F69A}",
          "trumpet": "\u{1F3BA}",
          "tulip": "\u{1F337}",
          "tumbler_glass": "\u{1F943}",
          "turkey": "\u{1F983}",
          "turtle": "\u{1F422}",
          "tv": "\u{1F4FA}",
          "twisted_rightwards_arrows": "\u{1F500}",
          "two_hearts": "\u{1F495}",
          "two_men_holding_hands": "\u{1F46C}",
          "two_women_holding_hands": "\u{1F46D}",
          "u5272": "\u{1F239}",
          "u5408": "\u{1F234}",
          "u55b6": "\u{1F23A}",
          "u6307": "\u{1F22F}\uFE0F",
          "u6708": "\u{1F237}\uFE0F",
          "u6709": "\u{1F236}",
          "u6e80": "\u{1F235}",
          "u7121": "\u{1F21A}\uFE0F",
          "u7533": "\u{1F238}",
          "u7981": "\u{1F232}",
          "u7a7a": "\u{1F233}",
          "umbrella": "\u2614\uFE0F",
          "unamused": "\u{1F612}",
          "underage": "\u{1F51E}",
          "unicorn": "\u{1F984}",
          "unlock": "\u{1F513}",
          "up": "\u{1F199}",
          "upside_down_face": "\u{1F643}",
          "v": "\u270C\uFE0F",
          "vertical_traffic_light": "\u{1F6A6}",
          "vhs": "\u{1F4FC}",
          "vibration_mode": "\u{1F4F3}",
          "video_camera": "\u{1F4F9}",
          "video_game": "\u{1F3AE}",
          "violin": "\u{1F3BB}",
          "virgo": "\u264D\uFE0F",
          "volcano": "\u{1F30B}",
          "volleyball": "\u{1F3D0}",
          "vs": "\u{1F19A}",
          "vulcan_salute": "\u{1F596}",
          "walking_man": "\u{1F6B6}",
          "walking_woman": "\u{1F6B6}&zwj;\u2640\uFE0F",
          "waning_crescent_moon": "\u{1F318}",
          "waning_gibbous_moon": "\u{1F316}",
          "warning": "\u26A0\uFE0F",
          "wastebasket": "\u{1F5D1}",
          "watch": "\u231A\uFE0F",
          "water_buffalo": "\u{1F403}",
          "watermelon": "\u{1F349}",
          "wave": "\u{1F44B}",
          "wavy_dash": "\u3030\uFE0F",
          "waxing_crescent_moon": "\u{1F312}",
          "wc": "\u{1F6BE}",
          "weary": "\u{1F629}",
          "wedding": "\u{1F492}",
          "weight_lifting_man": "\u{1F3CB}\uFE0F",
          "weight_lifting_woman": "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F",
          "whale": "\u{1F433}",
          "whale2": "\u{1F40B}",
          "wheel_of_dharma": "\u2638\uFE0F",
          "wheelchair": "\u267F\uFE0F",
          "white_check_mark": "\u2705",
          "white_circle": "\u26AA\uFE0F",
          "white_flag": "\u{1F3F3}\uFE0F",
          "white_flower": "\u{1F4AE}",
          "white_large_square": "\u2B1C\uFE0F",
          "white_medium_small_square": "\u25FD\uFE0F",
          "white_medium_square": "\u25FB\uFE0F",
          "white_small_square": "\u25AB\uFE0F",
          "white_square_button": "\u{1F533}",
          "wilted_flower": "\u{1F940}",
          "wind_chime": "\u{1F390}",
          "wind_face": "\u{1F32C}",
          "wine_glass": "\u{1F377}",
          "wink": "\u{1F609}",
          "wolf": "\u{1F43A}",
          "woman": "\u{1F469}",
          "woman_artist": "\u{1F469}&zwj;\u{1F3A8}",
          "woman_astronaut": "\u{1F469}&zwj;\u{1F680}",
          "woman_cartwheeling": "\u{1F938}&zwj;\u2640\uFE0F",
          "woman_cook": "\u{1F469}&zwj;\u{1F373}",
          "woman_facepalming": "\u{1F926}&zwj;\u2640\uFE0F",
          "woman_factory_worker": "\u{1F469}&zwj;\u{1F3ED}",
          "woman_farmer": "\u{1F469}&zwj;\u{1F33E}",
          "woman_firefighter": "\u{1F469}&zwj;\u{1F692}",
          "woman_health_worker": "\u{1F469}&zwj;\u2695\uFE0F",
          "woman_judge": "\u{1F469}&zwj;\u2696\uFE0F",
          "woman_juggling": "\u{1F939}&zwj;\u2640\uFE0F",
          "woman_mechanic": "\u{1F469}&zwj;\u{1F527}",
          "woman_office_worker": "\u{1F469}&zwj;\u{1F4BC}",
          "woman_pilot": "\u{1F469}&zwj;\u2708\uFE0F",
          "woman_playing_handball": "\u{1F93E}&zwj;\u2640\uFE0F",
          "woman_playing_water_polo": "\u{1F93D}&zwj;\u2640\uFE0F",
          "woman_scientist": "\u{1F469}&zwj;\u{1F52C}",
          "woman_shrugging": "\u{1F937}&zwj;\u2640\uFE0F",
          "woman_singer": "\u{1F469}&zwj;\u{1F3A4}",
          "woman_student": "\u{1F469}&zwj;\u{1F393}",
          "woman_teacher": "\u{1F469}&zwj;\u{1F3EB}",
          "woman_technologist": "\u{1F469}&zwj;\u{1F4BB}",
          "woman_with_turban": "\u{1F473}&zwj;\u2640\uFE0F",
          "womans_clothes": "\u{1F45A}",
          "womans_hat": "\u{1F452}",
          "women_wrestling": "\u{1F93C}&zwj;\u2640\uFE0F",
          "womens": "\u{1F6BA}",
          "world_map": "\u{1F5FA}",
          "worried": "\u{1F61F}",
          "wrench": "\u{1F527}",
          "writing_hand": "\u270D\uFE0F",
          "x": "\u274C",
          "yellow_heart": "\u{1F49B}",
          "yen": "\u{1F4B4}",
          "yin_yang": "\u262F\uFE0F",
          "yum": "\u{1F60B}",
          "zap": "\u26A1\uFE0F",
          "zipper_mouth_face": "\u{1F910}",
          "zzz": "\u{1F4A4}",
          /* special emojis :P */
          "octocat": '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
          "showdown": `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>`
        };
        showdown.Converter = function(converterOptions) {
          "use strict";
          var options = {}, langExtensions = [], outputModifiers = [], listeners = {}, setConvFlavor = setFlavor, metadata = {
            parsed: {},
            raw: "",
            format: ""
          };
          _constructor();
          function _constructor() {
            converterOptions = converterOptions || {};
            for (var gOpt in globalOptions) {
              if (globalOptions.hasOwnProperty(gOpt)) {
                options[gOpt] = globalOptions[gOpt];
              }
            }
            if (typeof converterOptions === "object") {
              for (var opt in converterOptions) {
                if (converterOptions.hasOwnProperty(opt)) {
                  options[opt] = converterOptions[opt];
                }
              }
            } else {
              throw Error("Converter expects the passed parameter to be an object, but " + typeof converterOptions + " was passed instead.");
            }
            if (options.extensions) {
              showdown.helper.forEach(options.extensions, _parseExtension);
            }
          }
          function _parseExtension(ext, name) {
            name = name || null;
            if (showdown.helper.isString(ext)) {
              ext = showdown.helper.stdExtName(ext);
              name = ext;
              if (showdown.extensions[ext]) {
                console.warn("DEPRECATION WARNING: " + ext + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!");
                legacyExtensionLoading(showdown.extensions[ext], ext);
                return;
              } else if (!showdown.helper.isUndefined(extensions[ext])) {
                ext = extensions[ext];
              } else {
                throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
              }
            }
            if (typeof ext === "function") {
              ext = ext();
            }
            if (!showdown.helper.isArray(ext)) {
              ext = [ext];
            }
            var validExt = validate(ext, name);
            if (!validExt.valid) {
              throw Error(validExt.error);
            }
            for (var i = 0; i < ext.length; ++i) {
              switch (ext[i].type) {
                case "lang":
                  langExtensions.push(ext[i]);
                  break;
                case "output":
                  outputModifiers.push(ext[i]);
                  break;
              }
              if (ext[i].hasOwnProperty("listeners")) {
                for (var ln in ext[i].listeners) {
                  if (ext[i].listeners.hasOwnProperty(ln)) {
                    listen(ln, ext[i].listeners[ln]);
                  }
                }
              }
            }
          }
          function legacyExtensionLoading(ext, name) {
            if (typeof ext === "function") {
              ext = ext(new showdown.Converter());
            }
            if (!showdown.helper.isArray(ext)) {
              ext = [ext];
            }
            var valid = validate(ext, name);
            if (!valid.valid) {
              throw Error(valid.error);
            }
            for (var i = 0; i < ext.length; ++i) {
              switch (ext[i].type) {
                case "lang":
                  langExtensions.push(ext[i]);
                  break;
                case "output":
                  outputModifiers.push(ext[i]);
                  break;
                default:
                  throw Error("Extension loader error: Type unrecognized!!!");
              }
            }
          }
          function listen(name, callback) {
            if (!showdown.helper.isString(name)) {
              throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof name + " given");
            }
            if (typeof callback !== "function") {
              throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof callback + " given");
            }
            if (!listeners.hasOwnProperty(name)) {
              listeners[name] = [];
            }
            listeners[name].push(callback);
          }
          function rTrimInputText(text) {
            var rsp = text.match(/^\s*/)[0].length, rgx = new RegExp("^\\s{0," + rsp + "}", "gm");
            return text.replace(rgx, "");
          }
          this._dispatch = function dispatch(evtName, text, options2, globals) {
            if (listeners.hasOwnProperty(evtName)) {
              for (var ei = 0; ei < listeners[evtName].length; ++ei) {
                var nText = listeners[evtName][ei](evtName, text, this, options2, globals);
                if (nText && typeof nText !== "undefined") {
                  text = nText;
                }
              }
            }
            return text;
          };
          this.listen = function(name, callback) {
            listen(name, callback);
            return this;
          };
          this.makeHtml = function(text) {
            if (!text) {
              return text;
            }
            var globals = {
              gHtmlBlocks: [],
              gHtmlMdBlocks: [],
              gHtmlSpans: [],
              gUrls: {},
              gTitles: {},
              gDimensions: {},
              gListLevel: 0,
              hashLinkCounts: {},
              langExtensions,
              outputModifiers,
              converter: this,
              ghCodeBlocks: [],
              metadata: {
                parsed: {},
                raw: "",
                format: ""
              }
            };
            text = text.replace(/¨/g, "\xA8T");
            text = text.replace(/\$/g, "\xA8D");
            text = text.replace(/\r\n/g, "\n");
            text = text.replace(/\r/g, "\n");
            text = text.replace(/\u00A0/g, "&nbsp;");
            if (options.smartIndentationFix) {
              text = rTrimInputText(text);
            }
            text = "\n\n" + text + "\n\n";
            text = showdown.subParser("detab")(text, options, globals);
            text = text.replace(/^[ \t]+$/mg, "");
            showdown.helper.forEach(langExtensions, function(ext) {
              text = showdown.subParser("runExtension")(ext, text, options, globals);
            });
            text = showdown.subParser("metadata")(text, options, globals);
            text = showdown.subParser("hashPreCodeTags")(text, options, globals);
            text = showdown.subParser("githubCodeBlocks")(text, options, globals);
            text = showdown.subParser("hashHTMLBlocks")(text, options, globals);
            text = showdown.subParser("hashCodeTags")(text, options, globals);
            text = showdown.subParser("stripLinkDefinitions")(text, options, globals);
            text = showdown.subParser("blockGamut")(text, options, globals);
            text = showdown.subParser("unhashHTMLSpans")(text, options, globals);
            text = showdown.subParser("unescapeSpecialChars")(text, options, globals);
            text = text.replace(/¨D/g, "$$");
            text = text.replace(/¨T/g, "\xA8");
            text = showdown.subParser("completeHTMLDocument")(text, options, globals);
            showdown.helper.forEach(outputModifiers, function(ext) {
              text = showdown.subParser("runExtension")(ext, text, options, globals);
            });
            metadata = globals.metadata;
            return text;
          };
          this.makeMarkdown = this.makeMd = function(src, HTMLParser) {
            src = src.replace(/\r\n/g, "\n");
            src = src.replace(/\r/g, "\n");
            src = src.replace(/>[ \t]+</, ">\xA8NBSP;<");
            if (!HTMLParser) {
              if (window && window.document) {
                HTMLParser = window.document;
              } else {
                throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
              }
            }
            var doc = HTMLParser.createElement("div");
            doc.innerHTML = src;
            var globals = {
              preList: substitutePreCodeTags(doc)
            };
            clean(doc);
            var nodes = doc.childNodes, mdDoc = "";
            for (var i = 0; i < nodes.length; i++) {
              mdDoc += showdown.subParser("makeMarkdown.node")(nodes[i], globals);
            }
            function clean(node) {
              for (var n = 0; n < node.childNodes.length; ++n) {
                var child = node.childNodes[n];
                if (child.nodeType === 3) {
                  if (!/\S/.test(child.nodeValue) && !/^[ ]+$/.test(child.nodeValue)) {
                    node.removeChild(child);
                    --n;
                  } else {
                    child.nodeValue = child.nodeValue.split("\n").join(" ");
                    child.nodeValue = child.nodeValue.replace(/(\s)+/g, "$1");
                  }
                } else if (child.nodeType === 1) {
                  clean(child);
                }
              }
            }
            function substitutePreCodeTags(doc2) {
              var pres = doc2.querySelectorAll("pre"), presPH = [];
              for (var i2 = 0; i2 < pres.length; ++i2) {
                if (pres[i2].childElementCount === 1 && pres[i2].firstChild.tagName.toLowerCase() === "code") {
                  var content = pres[i2].firstChild.innerHTML.trim(), language = pres[i2].firstChild.getAttribute("data-language") || "";
                  if (language === "") {
                    var classes = pres[i2].firstChild.className.split(" ");
                    for (var c = 0; c < classes.length; ++c) {
                      var matches = classes[c].match(/^language-(.+)$/);
                      if (matches !== null) {
                        language = matches[1];
                        break;
                      }
                    }
                  }
                  content = showdown.helper.unescapeHTMLEntities(content);
                  presPH.push(content);
                  pres[i2].outerHTML = '<precode language="' + language + '" precodenum="' + i2.toString() + '"></precode>';
                } else {
                  presPH.push(pres[i2].innerHTML);
                  pres[i2].innerHTML = "";
                  pres[i2].setAttribute("prenum", i2.toString());
                }
              }
              return presPH;
            }
            return mdDoc;
          };
          this.setOption = function(key, value) {
            options[key] = value;
          };
          this.getOption = function(key) {
            return options[key];
          };
          this.getOptions = function() {
            return options;
          };
          this.addExtension = function(extension, name) {
            name = name || null;
            _parseExtension(extension, name);
          };
          this.useExtension = function(extensionName) {
            _parseExtension(extensionName);
          };
          this.setFlavor = function(name) {
            if (!flavor.hasOwnProperty(name)) {
              throw Error(name + " flavor was not found");
            }
            var preset = flavor[name];
            setConvFlavor = name;
            for (var option in preset) {
              if (preset.hasOwnProperty(option)) {
                options[option] = preset[option];
              }
            }
          };
          this.getFlavor = function() {
            return setConvFlavor;
          };
          this.removeExtension = function(extension) {
            if (!showdown.helper.isArray(extension)) {
              extension = [extension];
            }
            for (var a = 0; a < extension.length; ++a) {
              var ext = extension[a];
              for (var i = 0; i < langExtensions.length; ++i) {
                if (langExtensions[i] === ext) {
                  langExtensions.splice(i, 1);
                }
              }
              for (var ii = 0; ii < outputModifiers.length; ++ii) {
                if (outputModifiers[ii] === ext) {
                  outputModifiers.splice(ii, 1);
                }
              }
            }
          };
          this.getAllExtensions = function() {
            return {
              language: langExtensions,
              output: outputModifiers
            };
          };
          this.getMetadata = function(raw) {
            if (raw) {
              return metadata.raw;
            } else {
              return metadata.parsed;
            }
          };
          this.getMetadataFormat = function() {
            return metadata.format;
          };
          this._setMetadataPair = function(key, value) {
            metadata.parsed[key] = value;
          };
          this._setMetadataFormat = function(format) {
            metadata.format = format;
          };
          this._setMetadataRaw = function(raw) {
            metadata.raw = raw;
          };
        };
        showdown.subParser("anchors", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("anchors.before", text, options, globals);
          var writeAnchorTag = function(wholeMatch, linkText, linkId, url, m5, m6, title) {
            if (showdown.helper.isUndefined(title)) {
              title = "";
            }
            linkId = linkId.toLowerCase();
            if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
              url = "";
            } else if (!url) {
              if (!linkId) {
                linkId = linkText.toLowerCase().replace(/ ?\n/g, " ");
              }
              url = "#" + linkId;
              if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
                url = globals.gUrls[linkId];
                if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
                  title = globals.gTitles[linkId];
                }
              } else {
                return wholeMatch;
              }
            }
            url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
            var result = '<a href="' + url + '"';
            if (title !== "" && title !== null) {
              title = title.replace(/"/g, "&quot;");
              title = title.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
              result += ' title="' + title + '"';
            }
            if (options.openLinksInNewWindow && !/^#/.test(url)) {
              result += ' rel="noopener noreferrer" target="\xA8E95Eblank"';
            }
            result += ">" + linkText + "</a>";
            return result;
          };
          text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);
          text = text.replace(
            /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
            writeAnchorTag
          );
          text = text.replace(
            /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
            writeAnchorTag
          );
          text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);
          if (options.ghMentions) {
            text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(wm, st, escape, mentions, username) {
              if (escape === "\\") {
                return st + mentions;
              }
              if (!showdown.helper.isString(options.ghMentionsLink)) {
                throw new Error("ghMentionsLink option must be a string");
              }
              var lnk = options.ghMentionsLink.replace(/\{u}/g, username), target = "";
              if (options.openLinksInNewWindow) {
                target = ' rel="noopener noreferrer" target="\xA8E95Eblank"';
              }
              return st + '<a href="' + lnk + '"' + target + ">" + mentions + "</a>";
            });
          }
          text = globals.converter._dispatch("anchors.after", text, options, globals);
          return text;
        });
        var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, replaceLink = function(options) {
          "use strict";
          return function(wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
            link = link.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
            var lnkTxt = link, append = "", target = "", lmc = leadingMagicChars || "", tmc = trailingMagicChars || "";
            if (/^www\./i.test(link)) {
              link = link.replace(/^www\./i, "http://www.");
            }
            if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
              append = trailingPunctuation;
            }
            if (options.openLinksInNewWindow) {
              target = ' rel="noopener noreferrer" target="\xA8E95Eblank"';
            }
            return lmc + '<a href="' + link + '"' + target + ">" + lnkTxt + "</a>" + append + tmc;
          };
        }, replaceMail = function(options, globals) {
          "use strict";
          return function(wholeMatch, b, mail) {
            var href = "mailto:";
            b = b || "";
            mail = showdown.subParser("unescapeSpecialChars")(mail, options, globals);
            if (options.encodeEmails) {
              href = showdown.helper.encodeEmailAddress(href + mail);
              mail = showdown.helper.encodeEmailAddress(mail);
            } else {
              href = href + mail;
            }
            return b + '<a href="' + href + '">' + mail + "</a>";
          };
        };
        showdown.subParser("autoLinks", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("autoLinks.before", text, options, globals);
          text = text.replace(delimUrlRegex, replaceLink(options));
          text = text.replace(delimMailRegex, replaceMail(options, globals));
          text = globals.converter._dispatch("autoLinks.after", text, options, globals);
          return text;
        });
        showdown.subParser("simplifiedAutoLinks", function(text, options, globals) {
          "use strict";
          if (!options.simplifiedAutoLink) {
            return text;
          }
          text = globals.converter._dispatch("simplifiedAutoLinks.before", text, options, globals);
          if (options.excludeTrailingPunctuationFromURLs) {
            text = text.replace(simpleURLRegex2, replaceLink(options));
          } else {
            text = text.replace(simpleURLRegex, replaceLink(options));
          }
          text = text.replace(simpleMailRegex, replaceMail(options, globals));
          text = globals.converter._dispatch("simplifiedAutoLinks.after", text, options, globals);
          return text;
        });
        showdown.subParser("blockGamut", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("blockGamut.before", text, options, globals);
          text = showdown.subParser("blockQuotes")(text, options, globals);
          text = showdown.subParser("headers")(text, options, globals);
          text = showdown.subParser("horizontalRule")(text, options, globals);
          text = showdown.subParser("lists")(text, options, globals);
          text = showdown.subParser("codeBlocks")(text, options, globals);
          text = showdown.subParser("tables")(text, options, globals);
          text = showdown.subParser("hashHTMLBlocks")(text, options, globals);
          text = showdown.subParser("paragraphs")(text, options, globals);
          text = globals.converter._dispatch("blockGamut.after", text, options, globals);
          return text;
        });
        showdown.subParser("blockQuotes", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("blockQuotes.before", text, options, globals);
          text = text + "\n\n";
          var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
          if (options.splitAdjacentBlockquotes) {
            rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
          }
          text = text.replace(rgx, function(bq) {
            bq = bq.replace(/^[ \t]*>[ \t]?/gm, "");
            bq = bq.replace(/¨0/g, "");
            bq = bq.replace(/^[ \t]+$/gm, "");
            bq = showdown.subParser("githubCodeBlocks")(bq, options, globals);
            bq = showdown.subParser("blockGamut")(bq, options, globals);
            bq = bq.replace(/(^|\n)/g, "$1  ");
            bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
              var pre = m1;
              pre = pre.replace(/^  /mg, "\xA80");
              pre = pre.replace(/¨0/g, "");
              return pre;
            });
            return showdown.subParser("hashBlock")("<blockquote>\n" + bq + "\n</blockquote>", options, globals);
          });
          text = globals.converter._dispatch("blockQuotes.after", text, options, globals);
          return text;
        });
        showdown.subParser("codeBlocks", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("codeBlocks.before", text, options, globals);
          text += "\xA80";
          var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
          text = text.replace(pattern, function(wholeMatch, m1, m2) {
            var codeblock = m1, nextChar = m2, end = "\n";
            codeblock = showdown.subParser("outdent")(codeblock, options, globals);
            codeblock = showdown.subParser("encodeCode")(codeblock, options, globals);
            codeblock = showdown.subParser("detab")(codeblock, options, globals);
            codeblock = codeblock.replace(/^\n+/g, "");
            codeblock = codeblock.replace(/\n+$/g, "");
            if (options.omitExtraWLInCodeBlocks) {
              end = "";
            }
            codeblock = "<pre><code>" + codeblock + end + "</code></pre>";
            return showdown.subParser("hashBlock")(codeblock, options, globals) + nextChar;
          });
          text = text.replace(/¨0/, "");
          text = globals.converter._dispatch("codeBlocks.after", text, options, globals);
          return text;
        });
        showdown.subParser("codeSpans", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("codeSpans.before", text, options, globals);
          if (typeof text === "undefined") {
            text = "";
          }
          text = text.replace(
            /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
            function(wholeMatch, m1, m2, m3) {
              var c = m3;
              c = c.replace(/^([ \t]*)/g, "");
              c = c.replace(/[ \t]*$/g, "");
              c = showdown.subParser("encodeCode")(c, options, globals);
              c = m1 + "<code>" + c + "</code>";
              c = showdown.subParser("hashHTMLSpans")(c, options, globals);
              return c;
            }
          );
          text = globals.converter._dispatch("codeSpans.after", text, options, globals);
          return text;
        });
        showdown.subParser("completeHTMLDocument", function(text, options, globals) {
          "use strict";
          if (!options.completeHTMLDocument) {
            return text;
          }
          text = globals.converter._dispatch("completeHTMLDocument.before", text, options, globals);
          var doctype = "html", doctypeParsed = "<!DOCTYPE HTML>\n", title = "", charset = '<meta charset="utf-8">\n', lang = "", metadata = "";
          if (typeof globals.metadata.parsed.doctype !== "undefined") {
            doctypeParsed = "<!DOCTYPE " + globals.metadata.parsed.doctype + ">\n";
            doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
            if (doctype === "html" || doctype === "html5") {
              charset = '<meta charset="utf-8">';
            }
          }
          for (var meta in globals.metadata.parsed) {
            if (globals.metadata.parsed.hasOwnProperty(meta)) {
              switch (meta.toLowerCase()) {
                case "doctype":
                  break;
                case "title":
                  title = "<title>" + globals.metadata.parsed.title + "</title>\n";
                  break;
                case "charset":
                  if (doctype === "html" || doctype === "html5") {
                    charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
                  } else {
                    charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
                  }
                  break;
                case "language":
                case "lang":
                  lang = ' lang="' + globals.metadata.parsed[meta] + '"';
                  metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
                  break;
                default:
                  metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
              }
            }
          }
          text = doctypeParsed + "<html" + lang + ">\n<head>\n" + title + charset + metadata + "</head>\n<body>\n" + text.trim() + "\n</body>\n</html>";
          text = globals.converter._dispatch("completeHTMLDocument.after", text, options, globals);
          return text;
        });
        showdown.subParser("detab", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("detab.before", text, options, globals);
          text = text.replace(/\t(?=\t)/g, "    ");
          text = text.replace(/\t/g, "\xA8A\xA8B");
          text = text.replace(/¨B(.+?)¨A/g, function(wholeMatch, m1) {
            var leadingText = m1, numSpaces = 4 - leadingText.length % 4;
            for (var i = 0; i < numSpaces; i++) {
              leadingText += " ";
            }
            return leadingText;
          });
          text = text.replace(/¨A/g, "    ");
          text = text.replace(/¨B/g, "");
          text = globals.converter._dispatch("detab.after", text, options, globals);
          return text;
        });
        showdown.subParser("ellipsis", function(text, options, globals) {
          "use strict";
          if (!options.ellipsis) {
            return text;
          }
          text = globals.converter._dispatch("ellipsis.before", text, options, globals);
          text = text.replace(/\.\.\./g, "\u2026");
          text = globals.converter._dispatch("ellipsis.after", text, options, globals);
          return text;
        });
        showdown.subParser("emoji", function(text, options, globals) {
          "use strict";
          if (!options.emoji) {
            return text;
          }
          text = globals.converter._dispatch("emoji.before", text, options, globals);
          var emojiRgx = /:([\S]+?):/g;
          text = text.replace(emojiRgx, function(wm, emojiCode) {
            if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
              return showdown.helper.emojis[emojiCode];
            }
            return wm;
          });
          text = globals.converter._dispatch("emoji.after", text, options, globals);
          return text;
        });
        showdown.subParser("encodeAmpsAndAngles", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("encodeAmpsAndAngles.before", text, options, globals);
          text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
          text = text.replace(/<(?![a-z\/?$!])/gi, "&lt;");
          text = text.replace(/</g, "&lt;");
          text = text.replace(/>/g, "&gt;");
          text = globals.converter._dispatch("encodeAmpsAndAngles.after", text, options, globals);
          return text;
        });
        showdown.subParser("encodeBackslashEscapes", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("encodeBackslashEscapes.before", text, options, globals);
          text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
          text = text.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, showdown.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("encodeBackslashEscapes.after", text, options, globals);
          return text;
        });
        showdown.subParser("encodeCode", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("encodeCode.before", text, options, globals);
          text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("encodeCode.after", text, options, globals);
          return text;
        });
        showdown.subParser("escapeSpecialCharsWithinTagAttributes", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", text, options, globals);
          var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
          text = text.replace(tags, function(wholeMatch) {
            return wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
          });
          text = text.replace(comments, function(wholeMatch) {
            return wholeMatch.replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
          });
          text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", text, options, globals);
          return text;
        });
        showdown.subParser("githubCodeBlocks", function(text, options, globals) {
          "use strict";
          if (!options.ghCodeBlocks) {
            return text;
          }
          text = globals.converter._dispatch("githubCodeBlocks.before", text, options, globals);
          text += "\xA80";
          text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(wholeMatch, delim, language, codeblock) {
            var end = options.omitExtraWLInCodeBlocks ? "" : "\n";
            codeblock = showdown.subParser("encodeCode")(codeblock, options, globals);
            codeblock = showdown.subParser("detab")(codeblock, options, globals);
            codeblock = codeblock.replace(/^\n+/g, "");
            codeblock = codeblock.replace(/\n+$/g, "");
            codeblock = "<pre><code" + (language ? ' class="' + language + " language-" + language + '"' : "") + ">" + codeblock + end + "</code></pre>";
            codeblock = showdown.subParser("hashBlock")(codeblock, options, globals);
            return "\n\n\xA8G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
          });
          text = text.replace(/¨0/, "");
          return globals.converter._dispatch("githubCodeBlocks.after", text, options, globals);
        });
        showdown.subParser("hashBlock", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashBlock.before", text, options, globals);
          text = text.replace(/(^\n+|\n+$)/g, "");
          text = "\n\n\xA8K" + (globals.gHtmlBlocks.push(text) - 1) + "K\n\n";
          text = globals.converter._dispatch("hashBlock.after", text, options, globals);
          return text;
        });
        showdown.subParser("hashCodeTags", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashCodeTags.before", text, options, globals);
          var repFunc = function(wholeMatch, match, left, right) {
            var codeblock = left + showdown.subParser("encodeCode")(match, options, globals) + right;
            return "\xA8C" + (globals.gHtmlSpans.push(codeblock) - 1) + "C";
          };
          text = showdown.helper.replaceRecursiveRegExp(text, repFunc, "<code\\b[^>]*>", "</code>", "gim");
          text = globals.converter._dispatch("hashCodeTags.after", text, options, globals);
          return text;
        });
        showdown.subParser("hashElement", function(text, options, globals) {
          "use strict";
          return function(wholeMatch, m1) {
            var blockText = m1;
            blockText = blockText.replace(/\n\n/g, "\n");
            blockText = blockText.replace(/^\n/, "");
            blockText = blockText.replace(/\n+$/g, "");
            blockText = "\n\n\xA8K" + (globals.gHtmlBlocks.push(blockText) - 1) + "K\n\n";
            return blockText;
          };
        });
        showdown.subParser("hashHTMLBlocks", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashHTMLBlocks.before", text, options, globals);
          var blockTags = [
            "pre",
            "div",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "table",
            "dl",
            "ol",
            "ul",
            "script",
            "noscript",
            "form",
            "fieldset",
            "iframe",
            "math",
            "style",
            "section",
            "header",
            "footer",
            "nav",
            "article",
            "aside",
            "address",
            "audio",
            "canvas",
            "figure",
            "hgroup",
            "output",
            "video",
            "p"
          ], repFunc = function(wholeMatch, match, left, right) {
            var txt = wholeMatch;
            if (left.search(/\bmarkdown\b/) !== -1) {
              txt = left + globals.converter.makeHtml(match) + right;
            }
            return "\n\n\xA8K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
          };
          if (options.backslashEscapesHTMLTags) {
            text = text.replace(/\\<(\/?[^>]+?)>/g, function(wm, inside) {
              return "&lt;" + inside + "&gt;";
            });
          }
          for (var i = 0; i < blockTags.length; ++i) {
            var opTagPos, rgx1 = new RegExp("^ {0,3}(<" + blockTags[i] + "\\b[^>]*>)", "im"), patLeft = "<" + blockTags[i] + "\\b[^>]*>", patRight = "</" + blockTags[i] + ">";
            while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {
              var subTexts = showdown.helper.splitAtIndex(text, opTagPos), newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, "im");
              if (newSubText1 === subTexts[1]) {
                break;
              }
              text = subTexts[0].concat(newSubText1);
            }
          }
          text = text.replace(
            /(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
            showdown.subParser("hashElement")(text, options, globals)
          );
          text = showdown.helper.replaceRecursiveRegExp(text, function(txt) {
            return "\n\n\xA8K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
          }, "^ {0,3}<!--", "-->", "gm");
          text = text.replace(
            /(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
            showdown.subParser("hashElement")(text, options, globals)
          );
          text = globals.converter._dispatch("hashHTMLBlocks.after", text, options, globals);
          return text;
        });
        showdown.subParser("hashHTMLSpans", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashHTMLSpans.before", text, options, globals);
          function hashHTMLSpan(html) {
            return "\xA8C" + (globals.gHtmlSpans.push(html) - 1) + "C";
          }
          text = text.replace(/<[^>]+?\/>/gi, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<[^>]+?>/gi, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = globals.converter._dispatch("hashHTMLSpans.after", text, options, globals);
          return text;
        });
        showdown.subParser("unhashHTMLSpans", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("unhashHTMLSpans.before", text, options, globals);
          for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
            var repText = globals.gHtmlSpans[i], limit = 0;
            while (/¨C(\d+)C/.test(repText)) {
              var num = RegExp.$1;
              repText = repText.replace("\xA8C" + num + "C", globals.gHtmlSpans[num]);
              if (limit === 10) {
                console.error("maximum nesting of 10 spans reached!!!");
                break;
              }
              ++limit;
            }
            text = text.replace("\xA8C" + i + "C", repText);
          }
          text = globals.converter._dispatch("unhashHTMLSpans.after", text, options, globals);
          return text;
        });
        showdown.subParser("hashPreCodeTags", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashPreCodeTags.before", text, options, globals);
          var repFunc = function(wholeMatch, match, left, right) {
            var codeblock = left + showdown.subParser("encodeCode")(match, options, globals) + right;
            return "\n\n\xA8G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
          };
          text = showdown.helper.replaceRecursiveRegExp(text, repFunc, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim");
          text = globals.converter._dispatch("hashPreCodeTags.after", text, options, globals);
          return text;
        });
        showdown.subParser("headers", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("headers.before", text, options, globals);
          var headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart), setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
          text = text.replace(setextRegexH1, function(wholeMatch, m1) {
            var spanGamut = showdown.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
            return showdown.subParser("hashBlock")(hashBlock, options, globals);
          });
          text = text.replace(setextRegexH2, function(matchFound, m1) {
            var spanGamut = showdown.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart + 1, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
            return showdown.subParser("hashBlock")(hashBlock, options, globals);
          });
          var atxStyle = options.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
          text = text.replace(atxStyle, function(wholeMatch, m1, m2) {
            var hText = m2;
            if (options.customizedHeaderId) {
              hText = m2.replace(/\s?\{([^{]+?)}\s*$/, "");
            }
            var span = showdown.subParser("spanGamut")(hText, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m2) + '"', hLevel = headerLevelStart - 1 + m1.length, header = "<h" + hLevel + hID + ">" + span + "</h" + hLevel + ">";
            return showdown.subParser("hashBlock")(header, options, globals);
          });
          function headerId(m) {
            var title, prefix;
            if (options.customizedHeaderId) {
              var match = m.match(/\{([^{]+?)}\s*$/);
              if (match && match[1]) {
                m = match[1];
              }
            }
            title = m;
            if (showdown.helper.isString(options.prefixHeaderId)) {
              prefix = options.prefixHeaderId;
            } else if (options.prefixHeaderId === true) {
              prefix = "section-";
            } else {
              prefix = "";
            }
            if (!options.rawPrefixHeaderId) {
              title = prefix + title;
            }
            if (options.ghCompatibleHeaderId) {
              title = title.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase();
            } else if (options.rawHeaderId) {
              title = title.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase();
            } else {
              title = title.replace(/[^\w]/g, "").toLowerCase();
            }
            if (options.rawPrefixHeaderId) {
              title = prefix + title;
            }
            if (globals.hashLinkCounts[title]) {
              title = title + "-" + globals.hashLinkCounts[title]++;
            } else {
              globals.hashLinkCounts[title] = 1;
            }
            return title;
          }
          text = globals.converter._dispatch("headers.after", text, options, globals);
          return text;
        });
        showdown.subParser("horizontalRule", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("horizontalRule.before", text, options, globals);
          var key = showdown.subParser("hashBlock")("<hr />", options, globals);
          text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
          text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
          text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
          text = globals.converter._dispatch("horizontalRule.after", text, options, globals);
          return text;
        });
        showdown.subParser("images", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("images.before", text, options, globals);
          var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
          function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
            url = url.replace(/\s/g, "");
            return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
          }
          function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
            var gUrls = globals.gUrls, gTitles = globals.gTitles, gDims = globals.gDimensions;
            linkId = linkId.toLowerCase();
            if (!title) {
              title = "";
            }
            if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
              url = "";
            } else if (url === "" || url === null) {
              if (linkId === "" || linkId === null) {
                linkId = altText.toLowerCase().replace(/ ?\n/g, " ");
              }
              url = "#" + linkId;
              if (!showdown.helper.isUndefined(gUrls[linkId])) {
                url = gUrls[linkId];
                if (!showdown.helper.isUndefined(gTitles[linkId])) {
                  title = gTitles[linkId];
                }
                if (!showdown.helper.isUndefined(gDims[linkId])) {
                  width = gDims[linkId].width;
                  height = gDims[linkId].height;
                }
              } else {
                return wholeMatch;
              }
            }
            altText = altText.replace(/"/g, "&quot;").replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
            url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
            var result = '<img src="' + url + '" alt="' + altText + '"';
            if (title && showdown.helper.isString(title)) {
              title = title.replace(/"/g, "&quot;").replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
              result += ' title="' + title + '"';
            }
            if (width && height) {
              width = width === "*" ? "auto" : width;
              height = height === "*" ? "auto" : height;
              result += ' width="' + width + '"';
              result += ' height="' + height + '"';
            }
            result += " />";
            return result;
          }
          text = text.replace(referenceRegExp, writeImageTag);
          text = text.replace(base64RegExp, writeImageTagBase64);
          text = text.replace(crazyRegExp, writeImageTag);
          text = text.replace(inlineRegExp, writeImageTag);
          text = text.replace(refShortcutRegExp, writeImageTag);
          text = globals.converter._dispatch("images.after", text, options, globals);
          return text;
        });
        showdown.subParser("italicsAndBold", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("italicsAndBold.before", text, options, globals);
          function parseInside(txt, left, right) {
            return left + txt + right;
          }
          if (options.literalMidWordUnderscores) {
            text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
              return parseInside(txt, "<strong><em>", "</em></strong>");
            });
            text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
              return parseInside(txt, "<strong>", "</strong>");
            });
            text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function(wm, txt) {
              return parseInside(txt, "<em>", "</em>");
            });
          } else {
            text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
            });
            text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
            });
            text = text.replace(/_([^\s_][\s\S]*?)_/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<em>", "</em>") : wm;
            });
          }
          if (options.literalMidWordAsterisks) {
            text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(wm, lead, txt) {
              return parseInside(txt, lead + "<strong><em>", "</em></strong>");
            });
            text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(wm, lead, txt) {
              return parseInside(txt, lead + "<strong>", "</strong>");
            });
            text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(wm, lead, txt) {
              return parseInside(txt, lead + "<em>", "</em>");
            });
          } else {
            text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
            });
            text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
            });
            text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function(wm, m) {
              return /\S$/.test(m) ? parseInside(m, "<em>", "</em>") : wm;
            });
          }
          text = globals.converter._dispatch("italicsAndBold.after", text, options, globals);
          return text;
        });
        showdown.subParser("lists", function(text, options, globals) {
          "use strict";
          function processListItems(listStr, trimTrailing) {
            globals.gListLevel++;
            listStr = listStr.replace(/\n{2,}$/, "\n");
            listStr += "\xA80";
            var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, isParagraphed = /\n[ \t]*\n(?!¨0)/.test(listStr);
            if (options.disableForced4SpacesIndentedSublists) {
              rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
            }
            listStr = listStr.replace(rgx, function(wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
              checked = checked && checked.trim() !== "";
              var item = showdown.subParser("outdent")(m4, options, globals), bulletStyle = "";
              if (taskbtn && options.tasklists) {
                bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
                item = item.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                  var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                  if (checked) {
                    otp += " checked";
                  }
                  otp += ">";
                  return otp;
                });
              }
              item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(wm2) {
                return "\xA8A" + wm2;
              });
              if (m1 || item.search(/\n{2,}/) > -1) {
                item = showdown.subParser("githubCodeBlocks")(item, options, globals);
                item = showdown.subParser("blockGamut")(item, options, globals);
              } else {
                item = showdown.subParser("lists")(item, options, globals);
                item = item.replace(/\n$/, "");
                item = showdown.subParser("hashHTMLBlocks")(item, options, globals);
                item = item.replace(/\n\n+/g, "\n\n");
                if (isParagraphed) {
                  item = showdown.subParser("paragraphs")(item, options, globals);
                } else {
                  item = showdown.subParser("spanGamut")(item, options, globals);
                }
              }
              item = item.replace("\xA8A", "");
              item = "<li" + bulletStyle + ">" + item + "</li>\n";
              return item;
            });
            listStr = listStr.replace(/¨0/g, "");
            globals.gListLevel--;
            if (trimTrailing) {
              listStr = listStr.replace(/\s+$/, "");
            }
            return listStr;
          }
          function styleStartNumber(list, listType) {
            if (listType === "ol") {
              var res = list.match(/^ *(\d+)\./);
              if (res && res[1] !== "1") {
                return ' start="' + res[1] + '"';
              }
            }
            return "";
          }
          function parseConsecutiveLists(list, listType, trimTrailing) {
            var olRgx = options.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, ulRgx = options.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, counterRxg = listType === "ul" ? olRgx : ulRgx, result = "";
            if (list.search(counterRxg) !== -1) {
              (function parseCL(txt) {
                var pos = txt.search(counterRxg), style2 = styleStartNumber(list, listType);
                if (pos !== -1) {
                  result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt.slice(0, pos), !!trimTrailing) + "</" + listType + ">\n";
                  listType = listType === "ul" ? "ol" : "ul";
                  counterRxg = listType === "ul" ? olRgx : ulRgx;
                  parseCL(txt.slice(pos));
                } else {
                  result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt, !!trimTrailing) + "</" + listType + ">\n";
                }
              })(list);
            } else {
              var style = styleStartNumber(list, listType);
              result = "\n\n<" + listType + style + ">\n" + processListItems(list, !!trimTrailing) + "</" + listType + ">\n";
            }
            return result;
          }
          text = globals.converter._dispatch("lists.before", text, options, globals);
          text += "\xA80";
          if (globals.gListLevel) {
            text = text.replace(
              /^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
              function(wholeMatch, list, m2) {
                var listType = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return parseConsecutiveLists(list, listType, true);
              }
            );
          } else {
            text = text.replace(
              /(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
              function(wholeMatch, m1, list, m3) {
                var listType = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return parseConsecutiveLists(list, listType, false);
              }
            );
          }
          text = text.replace(/¨0/, "");
          text = globals.converter._dispatch("lists.after", text, options, globals);
          return text;
        });
        showdown.subParser("metadata", function(text, options, globals) {
          "use strict";
          if (!options.metadata) {
            return text;
          }
          text = globals.converter._dispatch("metadata.before", text, options, globals);
          function parseMetadataContents(content) {
            globals.metadata.raw = content;
            content = content.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
            content = content.replace(/\n {4}/g, " ");
            content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(wm, key, value) {
              globals.metadata.parsed[key] = value;
              return "";
            });
          }
          text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(wholematch, format, content) {
            parseMetadataContents(content);
            return "\xA8M";
          });
          text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(wholematch, format, content) {
            if (format) {
              globals.metadata.format = format;
            }
            parseMetadataContents(content);
            return "\xA8M";
          });
          text = text.replace(/¨M/g, "");
          text = globals.converter._dispatch("metadata.after", text, options, globals);
          return text;
        });
        showdown.subParser("outdent", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("outdent.before", text, options, globals);
          text = text.replace(/^(\t|[ ]{1,4})/gm, "\xA80");
          text = text.replace(/¨0/g, "");
          text = globals.converter._dispatch("outdent.after", text, options, globals);
          return text;
        });
        showdown.subParser("paragraphs", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("paragraphs.before", text, options, globals);
          text = text.replace(/^\n+/g, "");
          text = text.replace(/\n+$/g, "");
          var grafs = text.split(/\n{2,}/g), grafsOut = [], end = grafs.length;
          for (var i = 0; i < end; i++) {
            var str = grafs[i];
            if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
              grafsOut.push(str);
            } else if (str.search(/\S/) >= 0) {
              str = showdown.subParser("spanGamut")(str, options, globals);
              str = str.replace(/^([ \t]*)/g, "<p>");
              str += "</p>";
              grafsOut.push(str);
            }
          }
          end = grafsOut.length;
          for (i = 0; i < end; i++) {
            var blockText = "", grafsOutIt = grafsOut[i], codeFlag = false;
            while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
              var delim = RegExp.$1, num = RegExp.$2;
              if (delim === "K") {
                blockText = globals.gHtmlBlocks[num];
              } else {
                if (codeFlag) {
                  blockText = showdown.subParser("encodeCode")(globals.ghCodeBlocks[num].text, options, globals);
                } else {
                  blockText = globals.ghCodeBlocks[num].codeblock;
                }
              }
              blockText = blockText.replace(/\$/g, "$$$$");
              grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
              if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
                codeFlag = true;
              }
            }
            grafsOut[i] = grafsOutIt;
          }
          text = grafsOut.join("\n");
          text = text.replace(/^\n+/g, "");
          text = text.replace(/\n+$/g, "");
          return globals.converter._dispatch("paragraphs.after", text, options, globals);
        });
        showdown.subParser("runExtension", function(ext, text, options, globals) {
          "use strict";
          if (ext.filter) {
            text = ext.filter(text, globals.converter, options);
          } else if (ext.regex) {
            var re = ext.regex;
            if (!(re instanceof RegExp)) {
              re = new RegExp(re, "g");
            }
            text = text.replace(re, ext.replace);
          }
          return text;
        });
        showdown.subParser("spanGamut", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("spanGamut.before", text, options, globals);
          text = showdown.subParser("codeSpans")(text, options, globals);
          text = showdown.subParser("escapeSpecialCharsWithinTagAttributes")(text, options, globals);
          text = showdown.subParser("encodeBackslashEscapes")(text, options, globals);
          text = showdown.subParser("images")(text, options, globals);
          text = showdown.subParser("anchors")(text, options, globals);
          text = showdown.subParser("autoLinks")(text, options, globals);
          text = showdown.subParser("simplifiedAutoLinks")(text, options, globals);
          text = showdown.subParser("emoji")(text, options, globals);
          text = showdown.subParser("underline")(text, options, globals);
          text = showdown.subParser("italicsAndBold")(text, options, globals);
          text = showdown.subParser("strikethrough")(text, options, globals);
          text = showdown.subParser("ellipsis")(text, options, globals);
          text = showdown.subParser("hashHTMLSpans")(text, options, globals);
          text = showdown.subParser("encodeAmpsAndAngles")(text, options, globals);
          if (options.simpleLineBreaks) {
            if (!/\n\n¨K/.test(text)) {
              text = text.replace(/\n+/g, "<br />\n");
            }
          } else {
            text = text.replace(/  +\n/g, "<br />\n");
          }
          text = globals.converter._dispatch("spanGamut.after", text, options, globals);
          return text;
        });
        showdown.subParser("strikethrough", function(text, options, globals) {
          "use strict";
          function parseInside(txt) {
            if (options.simplifiedAutoLink) {
              txt = showdown.subParser("simplifiedAutoLinks")(txt, options, globals);
            }
            return "<del>" + txt + "</del>";
          }
          if (options.strikethrough) {
            text = globals.converter._dispatch("strikethrough.before", text, options, globals);
            text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(wm, txt) {
              return parseInside(txt);
            });
            text = globals.converter._dispatch("strikethrough.after", text, options, globals);
          }
          return text;
        });
        showdown.subParser("stripLinkDefinitions", function(text, options, globals) {
          "use strict";
          var regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, base64Regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
          text += "\xA80";
          var replaceFunc = function(wholeMatch, linkId, url, width, height, blankLines, title) {
            linkId = linkId.toLowerCase();
            if (text.toLowerCase().split(linkId).length - 1 < 2) {
              return wholeMatch;
            }
            if (url.match(/^data:.+?\/.+?;base64,/)) {
              globals.gUrls[linkId] = url.replace(/\s/g, "");
            } else {
              globals.gUrls[linkId] = showdown.subParser("encodeAmpsAndAngles")(url, options, globals);
            }
            if (blankLines) {
              return blankLines + title;
            } else {
              if (title) {
                globals.gTitles[linkId] = title.replace(/"|'/g, "&quot;");
              }
              if (options.parseImgDimensions && width && height) {
                globals.gDimensions[linkId] = {
                  width,
                  height
                };
              }
            }
            return "";
          };
          text = text.replace(base64Regex, replaceFunc);
          text = text.replace(regex, replaceFunc);
          text = text.replace(/¨0/, "");
          return text;
        });
        showdown.subParser("tables", function(text, options, globals) {
          "use strict";
          if (!options.tables) {
            return text;
          }
          var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
          function parseStyles(sLine) {
            if (/^:[ \t]*--*$/.test(sLine)) {
              return ' style="text-align:left;"';
            } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
              return ' style="text-align:right;"';
            } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
              return ' style="text-align:center;"';
            } else {
              return "";
            }
          }
          function parseHeaders(header, style) {
            var id = "";
            header = header.trim();
            if (options.tablesHeaderId || options.tableHeaderId) {
              id = ' id="' + header.replace(/ /g, "_").toLowerCase() + '"';
            }
            header = showdown.subParser("spanGamut")(header, options, globals);
            return "<th" + id + style + ">" + header + "</th>\n";
          }
          function parseCells(cell, style) {
            var subText = showdown.subParser("spanGamut")(cell, options, globals);
            return "<td" + style + ">" + subText + "</td>\n";
          }
          function buildTable(headers, cells) {
            var tb = "<table>\n<thead>\n<tr>\n", tblLgn = headers.length;
            for (var i = 0; i < tblLgn; ++i) {
              tb += headers[i];
            }
            tb += "</tr>\n</thead>\n<tbody>\n";
            for (i = 0; i < cells.length; ++i) {
              tb += "<tr>\n";
              for (var ii = 0; ii < tblLgn; ++ii) {
                tb += cells[i][ii];
              }
              tb += "</tr>\n";
            }
            tb += "</tbody>\n</table>\n";
            return tb;
          }
          function parseTable(rawTable) {
            var i, tableLines = rawTable.split("\n");
            for (i = 0; i < tableLines.length; ++i) {
              if (/^ {0,3}\|/.test(tableLines[i])) {
                tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, "");
              }
              if (/\|[ \t]*$/.test(tableLines[i])) {
                tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, "");
              }
              tableLines[i] = showdown.subParser("codeSpans")(tableLines[i], options, globals);
            }
            var rawHeaders = tableLines[0].split("|").map(function(s) {
              return s.trim();
            }), rawStyles = tableLines[1].split("|").map(function(s) {
              return s.trim();
            }), rawCells = [], headers = [], styles = [], cells = [];
            tableLines.shift();
            tableLines.shift();
            for (i = 0; i < tableLines.length; ++i) {
              if (tableLines[i].trim() === "") {
                continue;
              }
              rawCells.push(
                tableLines[i].split("|").map(function(s) {
                  return s.trim();
                })
              );
            }
            if (rawHeaders.length < rawStyles.length) {
              return rawTable;
            }
            for (i = 0; i < rawStyles.length; ++i) {
              styles.push(parseStyles(rawStyles[i]));
            }
            for (i = 0; i < rawHeaders.length; ++i) {
              if (showdown.helper.isUndefined(styles[i])) {
                styles[i] = "";
              }
              headers.push(parseHeaders(rawHeaders[i], styles[i]));
            }
            for (i = 0; i < rawCells.length; ++i) {
              var row = [];
              for (var ii = 0; ii < headers.length; ++ii) {
                if (showdown.helper.isUndefined(rawCells[i][ii])) {
                }
                row.push(parseCells(rawCells[i][ii], styles[ii]));
              }
              cells.push(row);
            }
            return buildTable(headers, cells);
          }
          text = globals.converter._dispatch("tables.before", text, options, globals);
          text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);
          text = text.replace(tableRgx, parseTable);
          text = text.replace(singeColTblRgx, parseTable);
          text = globals.converter._dispatch("tables.after", text, options, globals);
          return text;
        });
        showdown.subParser("underline", function(text, options, globals) {
          "use strict";
          if (!options.underline) {
            return text;
          }
          text = globals.converter._dispatch("underline.before", text, options, globals);
          if (options.literalMidWordUnderscores) {
            text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
              return "<u>" + txt + "</u>";
            });
            text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
              return "<u>" + txt + "</u>";
            });
          } else {
            text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m) {
              return /\S$/.test(m) ? "<u>" + m + "</u>" : wm;
            });
            text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m) {
              return /\S$/.test(m) ? "<u>" + m + "</u>" : wm;
            });
          }
          text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("underline.after", text, options, globals);
          return text;
        });
        showdown.subParser("unescapeSpecialChars", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("unescapeSpecialChars.before", text, options, globals);
          text = text.replace(/¨E(\d+)E/g, function(wholeMatch, m1) {
            var charCodeToReplace = parseInt(m1);
            return String.fromCharCode(charCodeToReplace);
          });
          text = globals.converter._dispatch("unescapeSpecialChars.after", text, options, globals);
          return text;
        });
        showdown.subParser("makeMarkdown.blockquote", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              var innerTxt = showdown.subParser("makeMarkdown.node")(children[i], globals);
              if (innerTxt === "") {
                continue;
              }
              txt += innerTxt;
            }
          }
          txt = txt.trim();
          txt = "> " + txt.split("\n").join("\n> ");
          return txt;
        });
        showdown.subParser("makeMarkdown.codeBlock", function(node, globals) {
          "use strict";
          var lang = node.getAttribute("language"), num = node.getAttribute("precodenum");
          return "```" + lang + "\n" + globals.preList[num] + "\n```";
        });
        showdown.subParser("makeMarkdown.codeSpan", function(node) {
          "use strict";
          return "`" + node.innerHTML + "`";
        });
        showdown.subParser("makeMarkdown.emphasis", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "*";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "*";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.header", function(node, globals, headerLevel) {
          "use strict";
          var headerMark = new Array(headerLevel + 1).join("#"), txt = "";
          if (node.hasChildNodes()) {
            txt = headerMark + " ";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.hr", function() {
          "use strict";
          return "---";
        });
        showdown.subParser("makeMarkdown.image", function(node) {
          "use strict";
          var txt = "";
          if (node.hasAttribute("src")) {
            txt += "![" + node.getAttribute("alt") + "](";
            txt += "<" + node.getAttribute("src") + ">";
            if (node.hasAttribute("width") && node.hasAttribute("height")) {
              txt += " =" + node.getAttribute("width") + "x" + node.getAttribute("height");
            }
            if (node.hasAttribute("title")) {
              txt += ' "' + node.getAttribute("title") + '"';
            }
            txt += ")";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.links", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes() && node.hasAttribute("href")) {
            var children = node.childNodes, childrenLength = children.length;
            txt = "[";
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "](";
            txt += "<" + node.getAttribute("href") + ">";
            if (node.hasAttribute("title")) {
              txt += ' "' + node.getAttribute("title") + '"';
            }
            txt += ")";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.list", function(node, globals, type) {
          "use strict";
          var txt = "";
          if (!node.hasChildNodes()) {
            return "";
          }
          var listItems = node.childNodes, listItemsLenght = listItems.length, listNum = node.getAttribute("start") || 1;
          for (var i = 0; i < listItemsLenght; ++i) {
            if (typeof listItems[i].tagName === "undefined" || listItems[i].tagName.toLowerCase() !== "li") {
              continue;
            }
            var bullet = "";
            if (type === "ol") {
              bullet = listNum.toString() + ". ";
            } else {
              bullet = "- ";
            }
            txt += bullet + showdown.subParser("makeMarkdown.listItem")(listItems[i], globals);
            ++listNum;
          }
          txt += "\n<!-- -->\n";
          return txt.trim();
        });
        showdown.subParser("makeMarkdown.listItem", function(node, globals) {
          "use strict";
          var listItemTxt = "";
          var children = node.childNodes, childrenLenght = children.length;
          for (var i = 0; i < childrenLenght; ++i) {
            listItemTxt += showdown.subParser("makeMarkdown.node")(children[i], globals);
          }
          if (!/\n$/.test(listItemTxt)) {
            listItemTxt += "\n";
          } else {
            listItemTxt = listItemTxt.split("\n").join("\n    ").replace(/^ {4}$/gm, "").replace(/\n\n+/g, "\n\n");
          }
          return listItemTxt;
        });
        showdown.subParser("makeMarkdown.node", function(node, globals, spansOnly) {
          "use strict";
          spansOnly = spansOnly || false;
          var txt = "";
          if (node.nodeType === 3) {
            return showdown.subParser("makeMarkdown.txt")(node, globals);
          }
          if (node.nodeType === 8) {
            return "<!--" + node.data + "-->\n\n";
          }
          if (node.nodeType !== 1) {
            return "";
          }
          var tagName = node.tagName.toLowerCase();
          switch (tagName) {
            case "h1":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 1) + "\n\n";
              }
              break;
            case "h2":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 2) + "\n\n";
              }
              break;
            case "h3":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 3) + "\n\n";
              }
              break;
            case "h4":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 4) + "\n\n";
              }
              break;
            case "h5":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 5) + "\n\n";
              }
              break;
            case "h6":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 6) + "\n\n";
              }
              break;
            case "p":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.paragraph")(node, globals) + "\n\n";
              }
              break;
            case "blockquote":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.blockquote")(node, globals) + "\n\n";
              }
              break;
            case "hr":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.hr")(node, globals) + "\n\n";
              }
              break;
            case "ol":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.list")(node, globals, "ol") + "\n\n";
              }
              break;
            case "ul":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.list")(node, globals, "ul") + "\n\n";
              }
              break;
            case "precode":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.codeBlock")(node, globals) + "\n\n";
              }
              break;
            case "pre":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.pre")(node, globals) + "\n\n";
              }
              break;
            case "table":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.table")(node, globals) + "\n\n";
              }
              break;
            case "code":
              txt = showdown.subParser("makeMarkdown.codeSpan")(node, globals);
              break;
            case "em":
            case "i":
              txt = showdown.subParser("makeMarkdown.emphasis")(node, globals);
              break;
            case "strong":
            case "b":
              txt = showdown.subParser("makeMarkdown.strong")(node, globals);
              break;
            case "del":
              txt = showdown.subParser("makeMarkdown.strikethrough")(node, globals);
              break;
            case "a":
              txt = showdown.subParser("makeMarkdown.links")(node, globals);
              break;
            case "img":
              txt = showdown.subParser("makeMarkdown.image")(node, globals);
              break;
            default:
              txt = node.outerHTML + "\n\n";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.paragraph", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
          }
          txt = txt.trim();
          return txt;
        });
        showdown.subParser("makeMarkdown.pre", function(node, globals) {
          "use strict";
          var num = node.getAttribute("prenum");
          return "<pre>" + globals.preList[num] + "</pre>";
        });
        showdown.subParser("makeMarkdown.strikethrough", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "~~";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "~~";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.strong", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "**";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "**";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.table", function(node, globals) {
          "use strict";
          var txt = "", tableArray = [[], []], headings = node.querySelectorAll("thead>tr>th"), rows = node.querySelectorAll("tbody>tr"), i, ii;
          for (i = 0; i < headings.length; ++i) {
            var headContent = showdown.subParser("makeMarkdown.tableCell")(headings[i], globals), allign = "---";
            if (headings[i].hasAttribute("style")) {
              var style = headings[i].getAttribute("style").toLowerCase().replace(/\s/g, "");
              switch (style) {
                case "text-align:left;":
                  allign = ":---";
                  break;
                case "text-align:right;":
                  allign = "---:";
                  break;
                case "text-align:center;":
                  allign = ":---:";
                  break;
              }
            }
            tableArray[0][i] = headContent.trim();
            tableArray[1][i] = allign;
          }
          for (i = 0; i < rows.length; ++i) {
            var r = tableArray.push([]) - 1, cols = rows[i].getElementsByTagName("td");
            for (ii = 0; ii < headings.length; ++ii) {
              var cellContent = " ";
              if (typeof cols[ii] !== "undefined") {
                cellContent = showdown.subParser("makeMarkdown.tableCell")(cols[ii], globals);
              }
              tableArray[r].push(cellContent);
            }
          }
          var cellSpacesCount = 3;
          for (i = 0; i < tableArray.length; ++i) {
            for (ii = 0; ii < tableArray[i].length; ++ii) {
              var strLen = tableArray[i][ii].length;
              if (strLen > cellSpacesCount) {
                cellSpacesCount = strLen;
              }
            }
          }
          for (i = 0; i < tableArray.length; ++i) {
            for (ii = 0; ii < tableArray[i].length; ++ii) {
              if (i === 1) {
                if (tableArray[i][ii].slice(-1) === ":") {
                  tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, "-") + ":";
                } else {
                  tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount, "-");
                }
              } else {
                tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount);
              }
            }
            txt += "| " + tableArray[i].join(" | ") + " |\n";
          }
          return txt.trim();
        });
        showdown.subParser("makeMarkdown.tableCell", function(node, globals) {
          "use strict";
          var txt = "";
          if (!node.hasChildNodes()) {
            return "";
          }
          var children = node.childNodes, childrenLength = children.length;
          for (var i = 0; i < childrenLength; ++i) {
            txt += showdown.subParser("makeMarkdown.node")(children[i], globals, true);
          }
          return txt.trim();
        });
        showdown.subParser("makeMarkdown.txt", function(node) {
          "use strict";
          var txt = node.nodeValue;
          txt = txt.replace(/ +/g, " ");
          txt = txt.replace(/¨NBSP;/g, " ");
          txt = showdown.helper.unescapeHTMLEntities(txt);
          txt = txt.replace(/([*_~|`])/g, "\\$1");
          txt = txt.replace(/^(\s*)>/g, "\\$1>");
          txt = txt.replace(/^#/gm, "\\#");
          txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3");
          txt = txt.replace(/^( {0,3}\d+)\./gm, "$1\\.");
          txt = txt.replace(/^( {0,3})([+-])/gm, "$1\\$2");
          txt = txt.replace(/]([\s]*)\(/g, "\\]$1\\(");
          txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:");
          return txt;
        });
        var root = this;
        if (typeof define === "function" && define.amd) {
          define(function() {
            "use strict";
            return showdown;
          });
        } else if (typeof module !== "undefined" && module.exports) {
          module.exports = showdown;
        } else {
          root.showdown = showdown;
        }
      }).call(exports);
    }
  });

  // src/index.ts
  init_live_reload();

  // src/digerati/register.ts
  init_live_reload();
  var domReadyCallbacks = [];
  var domReadyFired = document.readyState === "interactive" || document.readyState === "complete";
  function runDomReady() {
    domReadyCallbacks.forEach((fn) => fn());
    domReadyCallbacks.length = 0;
  }
  if (!domReadyFired) {
    document.addEventListener("DOMContentLoaded", () => {
      domReadyFired = true;
      runDomReady();
    });
  }
  function domReady(fn) {
    if (domReadyFired)
      fn();
    else
      domReadyCallbacks.push(fn);
  }
  function webflowReady(fn) {
    if (!window.Webflow) {
      window.Webflow = [];
    }
    window.Webflow.push(fn);
  }
  var ix2Callbacks = [];
  var ix2ReadyFired = false;
  webflowReady(() => {
    const checkIx2 = () => {
      try {
        const ix2 = window.Webflow && window.Webflow.require && window.Webflow.require("ix2");
        if (ix2) {
          ix2ReadyFired = true;
          ix2Callbacks.forEach((fn) => fn());
          ix2Callbacks.length = 0;
        } else {
          setTimeout(checkIx2, 50);
        }
      } catch {
        setTimeout(checkIx2, 50);
      }
    };
    checkIx2();
  });
  function ix2Ready(fn) {
    if (ix2ReadyFired)
      fn();
    else
      ix2Callbacks.push(fn);
  }
  var fontCallbacks = [];
  var fontReadyFired = false;
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      fontReadyFired = true;
      fontCallbacks.forEach((fn) => fn());
      fontCallbacks.length = 0;
    });
  }
  function fontReady(fn) {
    if (fontReadyFired)
      fn();
    else
      fontCallbacks.push(fn);
  }

  // src/digerati/events/index.ts
  init_live_reload();

  // src/digerati/utils/eventBus.ts
  init_live_reload();
  var EventBus = class {
    constructor() {
      this.listeners = {};
    }
    on(event, listener) {
      const set = this.listeners[event] ?? /* @__PURE__ */ new Set();
      set.add(listener);
      this.listeners[event] = set;
      return () => this.off(event, listener);
    }
    off(event, listener) {
      const set = this.listeners[event];
      if (!set)
        return;
      set.delete(listener);
      if (set.size === 0) {
        delete this.listeners[event];
      }
    }
    emit(...args) {
      const [event, payload] = args;
      const set = this.listeners[event];
      if (!set)
        return;
      Array.from(set).forEach((listener) => {
        try {
          listener(payload);
        } catch (e) {
          console.error(`[EventBus] listener for "${String(event)}" threw`, e);
        }
      });
    }
    once(event, listener) {
      const unsubscribe = this.on(event, (payload) => {
        unsubscribe();
        listener(payload);
      });
    }
  };

  // src/digerati/utils/logger.ts
  init_live_reload();

  // src/vendor/auto-console-group/index.ts
  init_live_reload();
  var isFunction = (value) => typeof value === "function";
  var bindConsoleMethod = (target, method) => {
    const fn = target[method];
    if (!isFunction(fn)) {
      return void 0;
    }
    return (...args) => fn.apply(target, args);
  };
  var createGroupRunner = (opener, closer) => {
    return (label, callback) => {
      if (!opener || !closer) {
        return callback();
      }
      opener(label);
      try {
        return callback();
      } finally {
        closer();
      }
    };
  };
  var createWrapper = (preferred, runCollapsed, runExpanded, fallbackCollapsed, fallbackExpanded) => {
    return function groupWrapper(label, maybeFn, ...rest) {
      if (isFunction(maybeFn) && rest.length === 0) {
        const runner = preferred === "collapsed" ? runCollapsed : runExpanded;
        return runner(label, maybeFn);
      }
      const fallback = preferred === "collapsed" ? fallbackCollapsed : fallbackExpanded;
      fallback?.(label, maybeFn, ...rest);
      return void 0;
    };
  };
  function autoConsoleGroup(options = {}) {
    const target = options.console ?? console;
    const collapsedByDefault = options.collapsed ?? true;
    const openCollapsed = bindConsoleMethod(target, "groupCollapsed") ?? bindConsoleMethod(target, "group");
    const openExpanded = bindConsoleMethod(target, "group") ?? openCollapsed;
    const closeGroup = bindConsoleMethod(target, "groupEnd");
    const fallbackCollapsed = bindConsoleMethod(target, "groupCollapsed") ?? bindConsoleMethod(target, "group");
    const fallbackExpanded = bindConsoleMethod(target, "group") ?? bindConsoleMethod(target, "groupCollapsed");
    const runCollapsed = createGroupRunner(openCollapsed, closeGroup);
    const runExpanded = createGroupRunner(openExpanded, closeGroup);
    const proxy = Object.create(target);
    Object.defineProperty(proxy, "group", {
      configurable: true,
      writable: true,
      value: createWrapper(
        collapsedByDefault ? "collapsed" : "expanded",
        runCollapsed,
        runExpanded,
        fallbackCollapsed,
        fallbackExpanded
      )
    });
    Object.defineProperty(proxy, "groupCollapsed", {
      configurable: true,
      writable: true,
      value: createWrapper("collapsed", runCollapsed, runExpanded, fallbackCollapsed, fallbackExpanded)
    });
    return proxy;
  }

  // src/digerati/utils/env.ts
  init_live_reload();
  var _overrideHostname = null;
  var getHostname = () => {
    if (_overrideHostname !== null)
      return _overrideHostname;
    if (typeof window !== "undefined")
      return window.location.hostname;
    return "";
  };
  var getProcessEnv = () => {
    if (typeof globalThis === "undefined")
      return void 0;
    const maybeProcess = globalThis.process;
    return maybeProcess?.env;
  };
  var isWebflowStaging = /\.webflow\.io$/.test(getHostname());
  var isLocalhost = getHostname() === "localhost" || getHostname() === "127.0.0.1";
  var isDevEnv = getProcessEnv()?.NODE_ENV === "development";
  var isDev = isLocalhost || isWebflowStaging || isDevEnv;
  var shouldLog = () => isDev;

  // src/digerati/utils/logger.ts
  var DEBUG = shouldLog();
  var digeratiConsole = autoConsoleGroup({
    collapsed: true,
    console
  });
  var callConsole = (method, alwaysShow, prefix, ...args) => {
    if (!alwaysShow && !DEBUG)
      return;
    const targetMethod = digeratiConsole?.[method];
    const fallbackMethod = console[method];
    const fn = typeof targetMethod === "function" ? targetMethod : typeof fallbackMethod === "function" ? fallbackMethod : void 0;
    if (!fn)
      return;
    const receiver = fn === targetMethod ? digeratiConsole : console;
    const prefixed = prefix ? `[Digerati]${prefix}` : "[Digerati]";
    fn.call(receiver, prefixed, ...args);
  };
  var log = (...args) => callConsole("log", false, "", ...args);
  var warn = (...args) => callConsole("warn", false, "", ...args);
  var devError = (...args) => callConsole("error", false, " [Dev]", ...args);
  var error = (...args) => callConsole("error", true, "", ...args);
  var time = (label) => {
    if (!DEBUG)
      return;
    const timer = digeratiConsole.time ?? console.time;
    timer?.(`[Digerati] ${label}`);
  };
  var timeEnd = (label) => {
    if (!DEBUG)
      return;
    const timerEnd = digeratiConsole.timeEnd ?? console.timeEnd;
    timerEnd?.(`[Digerati] ${label}`);
  };
  function autoGroup(moduleName, callback) {
    if (!DEBUG)
      return callback();
    const acgGroup = digeratiConsole.group;
    if (typeof acgGroup === "function") {
      return acgGroup(`[Digerati] ${moduleName}`, callback);
    }
    const open = digeratiConsole.groupCollapsed ?? digeratiConsole.group ?? console.groupCollapsed ?? console.group;
    const close = digeratiConsole.groupEnd ?? console.groupEnd;
    if (!open || !close) {
      return callback();
    }
    open(`[Digerati] ${moduleName}`);
    try {
      return callback();
    } finally {
      close();
    }
  }

  // src/digerati/events/index.ts
  var eventBus = new EventBus();
  var initEventDebugLogging = () => {
    autoGroup("EventBus Debug", () => {
      eventBus.on("core:domReady", () => log("core:domReady fired"));
      eventBus.on("core:webflowReady", () => log("core:webflowReady fired"));
      eventBus.on("core:fontReady", () => log("core:fontReady fired"));
      eventBus.on("core:ix2Ready", () => log("core:ix2Ready fired"));
      eventBus.on("accessibility:init", () => log("accessibility:init"));
      eventBus.on("accessibility:ready", () => log("accessibility:ready"));
      eventBus.on("animations:started", ({ name }) => log("animation started:", name));
      eventBus.on("animations:finished", ({ name }) => log("animation finished:", name));
      eventBus.on("forms:submitted", ({ formId }) => log("form submitted:", formId));
      eventBus.on("cms:itemsLoaded", ({ count }) => log("cms items loaded:", count));
    });
  };

  // src/digerati/modules/index.ts
  init_live_reload();

  // src/digerati/modules/skipToMainContent.ts
  init_live_reload();
  var skipToMainContent = (opts = {}) => {
    autoGroup("Skip To Main Content", () => {
      const triggerSelector = opts.triggerSelector ?? '[dd-skip-to-main-content="trigger"]';
      const targetSelector = opts.targetSelector ?? '[dd-skip-to-main-content="target"]';
      const trigger = document.querySelector(triggerSelector);
      const target = document.querySelector(targetSelector);
      if (!trigger || !target) {
        warn("SkipToMainContent: trigger or target missing", { triggerSelector, targetSelector });
        eventBus.emit("skipToMainContent:missing", { triggerSelector, targetSelector });
        return;
      }
      const tag = trigger.tagName.toLowerCase();
      const isNativeFocusable = ["a", "button", "input", "select", "textarea"].includes(tag);
      if (!isNativeFocusable) {
        trigger.setAttribute("tabindex", "0");
        trigger.setAttribute("role", "button");
      }
      const activate = (e) => {
        if (e)
          e.preventDefault();
        const previousTabIndex = target.getAttribute("tabindex");
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: false });
        const onBlur = () => {
          if (previousTabIndex !== null) {
            target.setAttribute("tabindex", previousTabIndex);
          } else {
            target.removeAttribute("tabindex");
          }
          target.removeEventListener("blur", onBlur);
        };
        target.addEventListener("blur", onBlur);
        log("Skip to main content activated", { triggerSelector, targetSelector });
        eventBus.emit("skipToMainContent:activated", { triggerSelector, targetSelector });
      };
      trigger.addEventListener("click", (e) => activate(e));
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          activate(e);
        }
      });
    });
  };

  // src/digerati/modules/copyrightYear.ts
  init_live_reload();
  var copyrightYear = (options = {}) => autoGroup("CopyrightYear", () => {
    const selector3 = options.selector ?? '[dd-date="copyright-year"]';
    const year = (/* @__PURE__ */ new Date()).getFullYear().toString();
    const el = document.querySelector(selector3);
    if (!el) {
      warn(`CopyrightYear: element not found for selector "${selector3}"`);
      eventBus.emit("copyrightYear:missing", { selector: selector3 });
      return year;
    }
    el.textContent = year;
    log(`CopyrightYear: injected "${year}" into "${selector3}"`);
    eventBus.emit("copyrightYear:applied", { year, selector: selector3 });
    return year;
  });

  // src/digerati/modules/smoothScroll.ts
  init_live_reload();
  var EASING_FUNCTIONS = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => {
      t -= 1;
      return t * t * t + 1;
    },
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  };
  var prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var smoothScroll = (options = {}) => {
    return autoGroup("SmoothScroll Init", () => {
      const {
        duration = 1e3,
        easing = "easeInOutCubic",
        anchorSelector = 'a[href^="#"]',
        offsetAttribute = "ms-code-scroll-offset",
        disableWebflowAnchorOverride = false
      } = options;
      const FLAG = "__digerati_smoothScrollInitialized";
      if (window[FLAG]) {
        log("SmoothScroll: already initialized; skipping re-init.");
        return {
          destroy: () => {
          }
        };
      }
      window[FLAG] = true;
      let currentAnimationFrame = null;
      const getOffset = () => {
        const navbar = document.querySelector(`[${offsetAttribute}]`);
        if (!navbar)
          return 0;
        const navbarHeight = navbar.offsetHeight;
        const customOffset = parseInt(
          navbar.getAttribute(offsetAttribute) || "0",
          10
        );
        return navbarHeight + (isNaN(customOffset) ? 0 : customOffset);
      };
      const scrollToTarget = (target) => {
        const startPosition = window.pageYOffset;
        const offset = getOffset();
        const targetPosition = target.getBoundingClientRect().top + startPosition - offset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();
        eventBus.emit("smoothScroll:started", {
          targetId: target.id || null,
          duration,
          easing,
          offset
        });
        const step = (now) => {
          const timeElapsed = now - startTime;
          let progress = Math.min(timeElapsed / duration, 1);
          if (prefersReducedMotion()) {
            log("Reduced motion preference detected; jumping immediately.");
            eventBus.emit("smoothScroll:skippedReducedMotion", { targetId: target.id || null });
            window.scrollTo(0, targetPosition);
            eventBus.emit("smoothScroll:finished", {
              targetId: target.id || null,
              interrupted: false
            });
            return;
          }
          const easeProgress = EASING_FUNCTIONS[easing](progress);
          window.scrollTo(0, startPosition + distance * easeProgress);
          if (timeElapsed < duration) {
            currentAnimationFrame = requestAnimationFrame(step);
          } else {
            currentAnimationFrame = null;
            eventBus.emit("smoothScroll:finished", {
              targetId: target.id || null,
              interrupted: false
            });
          }
        };
        if (currentAnimationFrame !== null) {
          cancelAnimationFrame(currentAnimationFrame);
          eventBus.emit("smoothScroll:finished", {
            targetId: target.id || null,
            interrupted: true
          });
        }
        currentAnimationFrame = requestAnimationFrame(step);
      };
      const handleAnchorClick = (e) => {
        const anchor = e.currentTarget;
        const href = anchor.getAttribute("href") || "";
        if (!href.startsWith("#"))
          return;
        const hash = href.slice(1);
        const target = document.getElementById(hash);
        if (!target)
          return;
        e.preventDefault();
        log("Anchor clicked for smooth scroll:", href);
        eventBus.emit("smoothScroll:click", { href, targetId: target.id || null });
        scrollToTarget(target);
        history.replaceState(null, "", `#${hash}`);
      };
      const handleHashChange = () => {
        if (!window.location.hash)
          return;
        const hash = window.location.hash.slice(1);
        const target = document.getElementById(hash);
        if (!target)
          return;
        log("Hash change triggered smooth scroll:", window.location.hash);
        eventBus.emit("smoothScroll:hashTriggered", { hash });
        setTimeout(() => scrollToTarget(target), 0);
      };
      if (!disableWebflowAnchorOverride && window.jQuery) {
        window.jQuery(() => {
          window.jQuery(document).off("click.wf-scroll");
          log("Disabled Webflow default anchor scroll handler via jQuery.");
        });
      }
      const anchors = Array.from(
        document.querySelectorAll(anchorSelector)
      );
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", handleAnchorClick);
      });
      window.addEventListener("hashchange", handleHashChange);
      if (window.location.hash) {
        handleHashChange();
      }
      log("SmoothScroll initialized.", {
        anchorCount: anchors.length,
        duration,
        easing,
        selector: anchorSelector
      });
      const destroy = () => {
        anchors.forEach((anchor) => {
          anchor.removeEventListener("click", handleAnchorClick);
        });
        window.removeEventListener("hashchange", handleHashChange);
        if (currentAnimationFrame !== null) {
          cancelAnimationFrame(currentAnimationFrame);
          currentAnimationFrame = null;
        }
        delete window[FLAG];
        log("SmoothScroll torn down.");
      };
      return { destroy };
    });
  };

  // src/digerati/modules/autoHideNavbarOnScroll.ts
  init_live_reload();
  var MENU_BUTTON_SELECTOR = ".w-nav-button";
  var MENU_CONTAINER_SELECTOR = ".w-nav";
  var OPEN_CLASS = "w--open";
  var AutoHideNavbarOnScrollController = class {
    constructor({
      headerSelector = "header",
      hiddenClass = "navbar-hidden",
      scrollTolerance = 5,
      initialDelayWithoutHash = 100,
      hashActivationFallbackMs = 500
    } = {}) {
      this.menuObservers = [];
      this.menuContainerObserver = null;
      this.active = false;
      this.lastMenuOpenState = null;
      this.isHidden = false;
      this.isMenuOpen = () => {
        if (document.querySelector(`${MENU_BUTTON_SELECTOR}.${OPEN_CLASS}`))
          return true;
        const containers = document.querySelectorAll(MENU_CONTAINER_SELECTOR);
        for (const el of Array.from(containers)) {
          if (el.classList.contains(OPEN_CLASS))
            return true;
        }
        return false;
      };
      this.attachObserver = (el) => {
        const mo = new MutationObserver(() => {
          this.handleMenuStateChange();
        });
        mo.observe(el, { attributes: true, attributeFilter: ["class"] });
        this.menuObservers.push(mo);
      };
      this.header = document.querySelector(headerSelector);
      this.lastY = window.pageYOffset;
      this.ticking = false;
      this.hiddenClass = hiddenClass ?? "navbar-hidden";
      this.loadedWithHash = !!window.location.hash;
      this.initialY = window.pageYOffset;
      this.scrollTolerance = scrollTolerance ?? 5;
      this.initialDelayWithoutHash = initialDelayWithoutHash ?? 100;
      this.hashActivationFallbackMs = hashActivationFallbackMs ?? 500;
      this.scrollListener = this.scrollListener.bind(this);
      this.update = this.update.bind(this);
      this.watchMenus();
    }
    scrollListener() {
      if (!this.ticking) {
        window.requestAnimationFrame(this.update);
        this.ticking = true;
      }
    }
    update() {
      this.ticking = false;
      if (!this.header)
        return;
      if (this.isMenuOpen()) {
        if (this.isHidden) {
          this.showHeader();
        }
        this.lastY = window.pageYOffset;
        return;
      }
      if (!this.active) {
        this.lastY = window.pageYOffset;
        return;
      }
      const currentY = window.pageYOffset;
      const delta = currentY - this.lastY;
      if (Math.abs(delta) < this.scrollTolerance) {
        return;
      }
      if (currentY <= 0) {
        this.showHeader();
      } else if (delta > 0) {
        this.hideHeader();
      } else if (delta < 0) {
        this.showHeader();
      }
      this.lastY = currentY;
    }
    hideHeader() {
      if (!this.header || this.isHidden)
        return;
      this.header.classList.add(this.hiddenClass);
      this.isHidden = true;
      log("Navbar hidden due to scroll down.");
      eventBus.emit("autoHideNavbar:hide");
    }
    showHeader() {
      if (!this.header || !this.isHidden)
        return;
      this.header.classList.remove(this.hiddenClass);
      this.isHidden = false;
      log("Navbar shown (scroll up or menu open).");
      eventBus.emit("autoHideNavbar:show");
    }
    watchMenus() {
      document.querySelectorAll(MENU_BUTTON_SELECTOR).forEach(this.attachObserver);
      document.querySelectorAll(MENU_CONTAINER_SELECTOR).forEach(this.attachObserver);
      this.menuContainerObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "childList" && mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
              if (!(node instanceof Element))
                return;
              if (node.matches(MENU_BUTTON_SELECTOR) || node.matches(MENU_CONTAINER_SELECTOR)) {
                this.attachObserver(node);
                this.handleMenuStateChange();
              } else {
                node.querySelectorAll(MENU_BUTTON_SELECTOR).forEach(this.attachObserver);
                node.querySelectorAll(MENU_CONTAINER_SELECTOR).forEach(this.attachObserver);
              }
            });
          }
        }
      });
      this.menuContainerObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    handleMenuStateChange() {
      const isOpen = this.isMenuOpen();
      if (this.lastMenuOpenState === isOpen)
        return;
      this.lastMenuOpenState = isOpen;
      log("Menu open state changed:", isOpen);
      eventBus.emit("autoHideNavbar:menuStateChanged", { isOpen });
      if (isOpen) {
        this.showHeader();
      } else {
        this.lastY = window.pageYOffset;
      }
    }
    init() {
      const header = this.header;
      if (!header)
        return;
      autoGroup("AutoHideNavbarOnScroll Init", () => {
        header.classList.remove(this.hiddenClass);
        this.lastY = window.pageYOffset;
        this.initialY = window.pageYOffset;
        this.ticking = false;
        window.addEventListener("scroll", this.scrollListener, { passive: true });
        this.handleMenuStateChange();
        if (this.loadedWithHash) {
          const onFirstMove = () => {
            const currentY = window.pageYOffset;
            if (Math.abs(currentY - this.initialY) > 10) {
              this.active = true;
              window.removeEventListener("scroll", onFirstMove);
              log("AutoHideNavbarOnScroll activated after scroll movement (hash load).");
              eventBus.emit("autoHideNavbar:activated", { reason: "scroll" });
            }
          };
          window.addEventListener("scroll", onFirstMove, { passive: true });
          setTimeout(() => {
            if (!this.active) {
              this.active = true;
              window.removeEventListener("scroll", onFirstMove);
              log("AutoHideNavbarOnScroll activated after fallback timeout (hash load).");
              eventBus.emit("autoHideNavbar:activated", { reason: "timeout" });
            }
          }, this.hashActivationFallbackMs);
        } else {
          setTimeout(() => {
            this.active = true;
            log("AutoHideNavbarOnScroll activated after initial delay.");
            eventBus.emit("autoHideNavbar:activated", { reason: "initial-delay" });
          }, this.initialDelayWithoutHash);
        }
        eventBus.emit("autoHideNavbar:initialized", {
          hiddenClass: this.hiddenClass
        });
      });
    }
    destroy() {
      window.removeEventListener("scroll", this.scrollListener);
      if (this.header) {
        this.header.classList.remove(this.hiddenClass);
      }
      this.menuObservers.forEach((mo) => mo.disconnect());
      this.menuObservers = [];
      if (this.menuContainerObserver) {
        this.menuContainerObserver.disconnect();
        this.menuContainerObserver = null;
      }
      log("AutoHideNavbarOnScroll destroyed.");
      eventBus.emit("autoHideNavbar:destroyed");
    }
  };
  var autoHideNavbarOnScroll = (opts = {}) => {
    const {
      headerSelector = "header",
      hiddenClass = "navbar-hidden",
      injectCSS = true,
      cssId = "auto-hide-navbar-on-scroll-styles"
    } = opts;
    if (injectCSS && !document.getElementById(cssId)) {
      const style = document.createElement("style");
      style.id = cssId;
      style.textContent = `
${headerSelector} {
  --nav-speed: 0.25s;
  --nav-easing: ease-out;
  transition: transform var(--nav-speed) var(--nav-easing);
  transform: translateY(0);
}
.${hiddenClass} {
  --nav-speed: 0.5s;
  --nav-easing: ease-in;
  transform: translateY(-140%);
}
`;
      document.head.appendChild(style);
    }
    const controller = new AutoHideNavbarOnScrollController(opts);
    controller.init();
    return controller;
  };

  // src/digerati/modules/pageBlurTitle.ts
  init_live_reload();

  // src/digerati/modules/collectionSplitter.ts
  init_live_reload();
  var collectionSplitter = (opts = {}) => {
    autoGroup("Collection Splitter (move-based)", () => {
      const wrapperSelector = opts.wrapperSelector ?? '[dd-splitter="list-wrapper"]';
      const itemSelector = opts.itemSelector ?? '[dd-splitter="list-item"]';
      const originalWrapper = document.querySelector(wrapperSelector);
      if (!originalWrapper) {
        warn(`Target not found for selector "${wrapperSelector}".`);
        eventBus.emit("collectionSplitter:missingTarget", { selector: wrapperSelector });
        return;
      }
      const items = Array.from(originalWrapper.querySelectorAll(itemSelector));
      const totalItems = items.length;
      log("Total items found:", totalItems);
      if (totalItems === 0) {
        warn("No items to split.");
        eventBus.emit("collectionSplitter:empty", { selector: wrapperSelector });
        return;
      }
      const splitIndex = opts.splitAt ? opts.splitAt(totalItems) : Math.ceil(totalItems / 2);
      log(`Splitting ${totalItems} items at index ${splitIndex}.`);
      const parent = originalWrapper.parentNode;
      if (!parent) {
        warn("Original wrapper has no parent.");
        return;
      }
      const containerA = document.createElement(originalWrapper.tagName);
      const containerB = document.createElement(originalWrapper.tagName);
      Array.from(originalWrapper.attributes).forEach((attr) => {
        containerA.setAttribute(attr.name, attr.value);
        containerB.setAttribute(attr.name, attr.value);
      });
      items.forEach((item, idx) => {
        if (idx < splitIndex) {
          containerA.appendChild(item);
        } else {
          containerB.appendChild(item);
        }
      });
      parent.insertBefore(containerA, originalWrapper);
      parent.insertBefore(containerB, originalWrapper);
      parent.removeChild(originalWrapper);
      log("Collection split by moving elements, preserving IX2.");
      eventBus.emit("collectionSplitter:performed", {
        total: totalItems,
        splitIndex,
        firstCount: splitIndex,
        secondCount: totalItems - splitIndex
      });
    });
  };

  // src/digerati/modules/convertMarkdownToTable.ts
  init_live_reload();
  var import_showdown = __toESM(require_showdown(), 1);
  var SCROLL_WRAP_CLASS = "table-scroll";
  var RESPONSIVE_TABLE_CLASS = "responsive-table";
  var convertMarkdownToTable = (opts = {}) => {
    const selector3 = opts.selector ?? "markdown";
    const shouldLogOutput = opts.logOutput ?? false;
    autoGroup("Convert Markdown To Table", () => {
      eventBus.emit("convertMarkdown:init", { selector: selector3 });
      const converter = new import_showdown.Converter({
        tables: true,
        noHeaderId: true,
        headerLevelStart: 2,
        literalMidWordUnderscores: true
      });
      const markdownBlocks = Array.from(
        document.querySelectorAll(selector3)
      );
      if (!markdownBlocks.length) {
        warn(`No markdown blocks found for selector "${selector3}".`);
        eventBus.emit("convertMarkdown:done", { count: 0 });
        return;
      }
      markdownBlocks.forEach((markdown, index) => {
        autoGroup(`Markdown Block #${index + 1}`, () => {
          let source = markdown.textContent?.trim() ?? "";
          if (source === "") {
            source = markdown.innerHTML.trim();
          }
          let rawHtml;
          try {
            rawHtml = converter.makeHtml(source);
          } catch (e) {
            devError("Markdown conversion failed for block", index, e);
            eventBus.emit("convertMarkdown:error", {
              blockIndex: index,
              error: String(e)
            });
            return;
          }
          const template = document.createElement("template");
          template.innerHTML = rawHtml.trim();
          const tables = Array.from(
            template.content.querySelectorAll("table")
          );
          tables.forEach((table, tIndex) => {
            let headerCells = [];
            const theadThs = Array.from(table.querySelectorAll("thead tr th"));
            if (theadThs.length) {
              headerCells = theadThs.map((th) => th.textContent?.trim() || "");
            } else {
              const firstBodyRow = table.querySelector("tbody tr");
              if (firstBodyRow) {
                const cells = Array.from(firstBodyRow.querySelectorAll("td"));
                headerCells = cells.map((td) => td.textContent?.trim() || "");
              }
            }
            const rows = Array.from(table.querySelectorAll("tbody tr"));
            rows.forEach((row) => {
              const cells = Array.from(row.querySelectorAll("td"));
              cells.forEach((cell, i) => {
                const label = headerCells[i] || "";
                if (label)
                  cell.setAttribute("data-label", label);
              });
            });
            table.classList.add(RESPONSIVE_TABLE_CLASS);
            const wrapper = document.createElement("div");
            wrapper.className = SCROLL_WRAP_CLASS;
            const captionText = table.querySelector("caption")?.textContent?.trim() || "Scrollable table";
            wrapper.setAttribute("role", "region");
            wrapper.setAttribute("aria-label", captionText);
            wrapper.setAttribute("tabindex", "0");
            table.replaceWith(wrapper);
            wrapper.appendChild(table);
            eventBus.emit("convertMarkdown:enhancedTable", {
              blockIndex: index,
              tableIndex: tIndex,
              headerCount: headerCells.length,
              wrapped: true,
              wrapperClass: SCROLL_WRAP_CLASS
            });
          });
          if (shouldLogOutput) {
            log(`Converted Markdown block #${index + 1}:`, template.innerHTML.trim());
          }
          markdown.replaceWith(template.content.cloneNode(true));
          eventBus.emit("convertMarkdown:blockConverted", {
            blockIndex: index,
            originalSelector: selector3
          });
        });
      });
      eventBus.emit("convertMarkdown:done", { count: markdownBlocks.length });
    });
  };

  // src/digerati/modules/widowControl.ts
  init_live_reload();
  var widowControl = (opts = {}) => {
    autoGroup("Widow Control", () => {
      const selector3 = opts.selector ?? "p, h1, h2, h3, h4, h5, h6";
      const skipSelectors = opts.skipSelectors ?? ['[aria-hidden="true"]', ".no-widow"];
      const nowrapCount = Math.max(2, opts.nowrapCount ?? 2);
      const markAttr = opts.markAttr ?? "data-dd-widow";
      const debug = !!opts.debug;
      const skipList = skipSelectors.length ? skipSelectors.flatMap((s) => [s, `${s} *`]).join(",") : "";
      const targets = Array.from(document.querySelectorAll(selector3));
      if (targets.length === 0) {
        warn(`No targets found for selector "${selector3}".`);
        eventBus.emit("widow:empty", { selector: selector3 });
        return;
      }
      log(`Processing ${targets.length} elements (nowrapCount=${nowrapCount}).`);
      if (debug) {
        targets.forEach(
          (el) => log("widow:debug-scan", {
            tag: el.tagName,
            className: el.className,
            matchesSkip: skipList ? el.matches(skipList) : false,
            closestSkip: skipSelectors.length ? !!el.closest(skipSelectors.join(",")) : false
          })
        );
      }
      targets.forEach((el) => {
        const shouldSkip = skipList && el.matches(skipList) || skipSelectors.length && !!el.closest(skipSelectors.join(","));
        if (shouldSkip) {
          if (el.getAttribute(markAttr) === "fixed")
            revertWidow(el);
          el.setAttribute(markAttr, "skipped");
          eventBus.emit("widow:skipped", { el, reason: "skipSelector" });
          if (debug)
            log("widow:debug-skip", { el, reason: "skipSelector" });
          return;
        }
        if (el.hasAttribute(markAttr))
          return;
        const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
        const wordCount = text ? text.split(" ").filter(Boolean).length : 0;
        if (wordCount < nowrapCount) {
          el.setAttribute(markAttr, "skipped-too-few-words");
          eventBus.emit("widow:skipped", { el, reason: "tooFewWords" });
          if (debug)
            log("widow:debug-skip", { el, reason: "tooFewWords" });
          return;
        }
        const fixed = keepLastNWordsTogether(el, nowrapCount);
        if (fixed) {
          el.setAttribute(markAttr, "fixed");
          eventBus.emit("widow:fixed", { el, nowrapCount });
          if (debug)
            log("widow:debug-fixed", { el, nowrapCount });
        } else {
          el.setAttribute(markAttr, "noop");
          eventBus.emit("widow:noop", { el });
          if (debug)
            log("widow:debug-noop", { el });
        }
      });
      log("Widow Control complete.");
    });
  };
  function keepLastNWordsTogether(root, n) {
    const flat = (root.textContent ?? "").replace(/\s+/g, " ").replace(/\s+$/g, "");
    if (!flat)
      return false;
    const need = n - 1;
    const spacePositions = [];
    let idx = flat.length;
    while (spacePositions.length < need) {
      idx = flat.lastIndexOf(" ", idx - 1);
      if (idx === -1)
        break;
      spacePositions.push(idx);
    }
    if (spacePositions.length < need)
      return false;
    const NBSP = "\xA0";
    for (const globalPos of spacePositions) {
      if (!replaceSpaceAt(root, globalPos, NBSP))
        return false;
    }
    return true;
  }
  function replaceSpaceAt(root, globalIndex, replacement) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node2) => /\S/.test(node2.nodeValue ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    let offset = 0;
    let node = walker.nextNode();
    while (node) {
      const val = node.nodeValue ?? "";
      const len = val.length;
      if (globalIndex >= offset && globalIndex < offset + len) {
        const local = globalIndex - offset;
        if (val.charAt(local) !== " ")
          return false;
        node.nodeValue = val.slice(0, local) + replacement + val.slice(local + 1);
        return true;
      }
      offset += len;
      node = walker.nextNode();
    }
    return false;
  }
  function revertWidow(root) {
    const NBSP = "\xA0";
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let changed = false;
    let n = walker.nextNode();
    while (n) {
      const v = n.nodeValue ?? "";
      if (v.includes(NBSP)) {
        n.nodeValue = v.replace(/\u00A0/g, " ");
        changed = true;
      }
      n = walker.nextNode();
    }
    return changed;
  }

  // src/client/modules/index.ts
  init_live_reload();

  // src/client/modules/autoHideAccordionItem.ts
  init_live_reload();
  var AutoHideAccordionItem = class {
    constructor(opts = {}) {
      this.itemSelector = opts.itemSelector ?? ".accordion-content-item";
      this.wrapSelector = opts.wrapSelector ?? ".accordion-content-wrap";
      this.boundClick = (event) => this.handleClick(event);
      this.items = Array.from(document.querySelectorAll(this.itemSelector));
      if (!this.items.length) {
        warn(`[AutoHideAccordionItem] no items found for selector "${this.itemSelector}"`);
        eventBus.emit("autoHideAccordionItem:missingItems", { selector: this.itemSelector });
      }
    }
    handleClick(e) {
      if (!e.isTrusted)
        return;
      const clickedItem = e.currentTarget;
      this.items.forEach((item) => {
        if (item === clickedItem)
          return;
        const wrap3 = item.querySelector(this.wrapSelector);
        if (wrap3 && window.getComputedStyle(wrap3).height !== "0px") {
          item.click();
          log("AutoHideAccordionItem closed sibling:", item);
          eventBus.emit("autoHideAccordionItem:closedSibling", { closed: item });
        }
      });
    }
    /** Attach listeners to all accordion items */
    init() {
      autoGroup("AutoHideAccordionItem", () => {
        this.items.forEach((item) => {
          item.addEventListener("click", this.boundClick, true);
        });
        log("AutoHideAccordionItem initialized with items count:", this.items.length);
        eventBus.emit("autoHideAccordionItem:initialized", { count: this.items.length });
      });
    }
    /** Remove all listeners */
    destroy() {
      this.items.forEach((item) => {
        item.removeEventListener("click", this.boundClick, true);
      });
      log("AutoHideAccordionItem destroyed");
      eventBus.emit("autoHideAccordionItem:destroyed");
    }
  };
  var initAutoHideAccordionItem = (opts) => {
    const instance = new AutoHideAccordionItem(opts);
    instance.init();
    return instance;
  };

  // src/client/modules/legalColourCycle.ts
  init_live_reload();
  var LegalColourCycle = class {
    constructor(opts = {}) {
      this.rootSelector = opts.rootSelector ?? ".text-rich-text.is-legal";
      this.headingTags = opts.headingTags ?? "h2,h3";
      this.className = opts.className ?? "colour-cycle";
      this.observe = opts.observe ?? false;
      this.removeOnDestroy = opts.removeOnDestroy ?? false;
      this.applied = /* @__PURE__ */ new Set();
    }
    /** Build selectors like ".root h2 strong, .root h3 strong, .root a" */
    get targetSelector() {
      const parts = this.headingTags.split(",").map((tag) => tag.trim()).filter(Boolean);
      const strongs = parts.length > 0 ? parts.map((tag) => `${this.rootSelector} ${tag} strong`).join(", ") : `${this.rootSelector} strong`;
      const anchors = `${this.rootSelector} a`;
      return `${strongs}, ${anchors}`;
    }
    /** Apply class to all matching nodes */
    scanAndApply(scope = document) {
      const nodes = Array.from(scope.querySelectorAll(this.targetSelector));
      let appliedCount = 0;
      nodes.forEach((el) => {
        if (!el.classList.contains(this.className)) {
          el.classList.add(this.className);
          this.applied.add(el);
          appliedCount++;
        }
      });
      return appliedCount;
    }
    init() {
      autoGroup("LegalColourCycle", () => {
        const total = this.scanAndApply();
        if (total === 0) {
          warn(`[LegalColourCycle] no matches for selector "${this.targetSelector}"`);
          eventBus.emit("legalColourCycle:noneFound", { selector: this.targetSelector });
        } else {
          log(`LegalColourCycle applied to ${total} element(s).`);
          eventBus.emit("legalColourCycle:applied", {
            count: total,
            selector: this.targetSelector
          });
        }
        if (this.observe) {
          const root = document.querySelector(this.rootSelector) ?? document.body;
          this.observer = new MutationObserver((mutations) => {
            let delta = 0;
            mutations.forEach((m) => {
              m.addedNodes.forEach((node) => {
                if (!(node instanceof Element))
                  return;
                if (node.matches?.(this.targetSelector)) {
                  const el = node;
                  if (!el.classList.contains(this.className)) {
                    el.classList.add(this.className);
                    this.applied.add(el);
                    delta++;
                  }
                }
                delta += this.scanAndApply(node);
              });
            });
            if (delta > 0) {
              log(`LegalColourCycle observed and applied to ${delta} new element(s).`);
              eventBus.emit("legalColourCycle:appliedObserved", { count: delta });
            }
          });
          this.observer.observe(root, { subtree: true, childList: true });
          log("LegalColourCycle observer attached.");
          eventBus.emit("legalColourCycle:observerAttached", { root: this.rootSelector });
        }
        eventBus.emit("legalColourCycle:initialized", {
          selector: this.targetSelector,
          observed: this.observe,
          initialCount: total
        });
      });
    }
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = void 0;
        log("LegalColourCycle observer disconnected.");
        eventBus.emit("legalColourCycle:observerDisconnected");
      }
      if (this.removeOnDestroy && this.applied.size) {
        let removed = 0;
        this.applied.forEach((el) => {
          if (el.isConnected && el.classList.contains(this.className)) {
            el.classList.remove(this.className);
            removed++;
          }
        });
        log(`LegalColourCycle removed class from ${removed} element(s).`);
        eventBus.emit("legalColourCycle:removedOnDestroy", { count: removed });
      }
      this.applied.clear();
      log("LegalColourCycle destroyed.");
      eventBus.emit("legalColourCycle:destroyed");
    }
  };
  var initLegalColourCycle = (opts) => {
    const instance = new LegalColourCycle(opts);
    instance.init();
    return instance;
  };

  // src/client/modules/tally.ts
  init_live_reload();
  var SELECTORS = {
    modal: '[dd-tally="modal"]',
    close: '[dd-tally="close"]',
    iframe: '[dd-tally="iframe"]',
    preloader: '[dd-tally="preloader"]',
    trigger: '[dd-tally="open"]'
  };
  var tally = (minPreloaderMs = 1500) => {
    let handles = {
      openModal: (_) => {
      },
      closeModal: () => {
      }
    };
    autoGroup("Tally Init", () => {
      const modal = document.querySelector(SELECTORS.modal);
      const closeBtn = document.querySelector(SELECTORS.close);
      const iframe = document.querySelector(SELECTORS.iframe);
      const preloader = document.querySelector(SELECTORS.preloader);
      if (!modal || !closeBtn || !iframe || !preloader) {
        error("Missing required DOM elements; aborting tally initialization.");
        eventBus.emit("tally:init:error", { reason: "missing-dom-elements" });
        return;
      }
      let previousActiveElement = null;
      let overallFallbackTimer = null;
      let fadeOutInProgress = false;
      let loadHandled = false;
      let preloaderShownAt = 0;
      let useDarkPreloaderThisOpen = false;
      const N = 11;
      const modes = {
        topRight: (r, c) => Math.hypot(r, N - 1 - c),
        topLeft: (r, c) => Math.hypot(r, c),
        bottomLeft: (r, c) => Math.hypot(N - 1 - r, c),
        bottomRight: (r, c) => Math.hypot(r, N - 1 - c),
        vertical: (r) => r,
        horizontal: (_, c) => c,
        spiral: (r, c) => (r + c) % N + Math.floor((r + c) / N) * N,
        random: () => Math.random() * N * N
      };
      const modeNames = Object.keys(modes);
      const pickRandomMode = () => modeNames[Math.floor(Math.random() * modeNames.length)];
      const buildGrid = (container, mode) => {
        container.innerHTML = "";
        container.style.display = "";
        container.style.opacity = "1";
        container.style.transition = "";
        const grid = document.createElement("div");
        grid.className = "grid";
        for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
            const fn = modes[mode];
            const computed = typeof fn === "function" ? fn(r, c) : 0;
            const d = computed.toFixed(3);
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.setProperty("--d", d);
            grid.appendChild(cell);
          }
        }
        container.appendChild(grid);
      };
      const showPreloader = () => {
        autoGroup("Show Preloader", () => {
          fadeOutInProgress = false;
          loadHandled = false;
          if (overallFallbackTimer) {
            clearTimeout(overallFallbackTimer);
            overallFallbackTimer = null;
          }
          preloader.style.display = "";
          preloader.style.opacity = "1";
          preloader.style.transition = "";
          preloaderShownAt = performance.now();
          if (useDarkPreloaderThisOpen) {
            preloader.classList.add("dark-mode");
          } else {
            preloader.classList.remove("dark-mode");
          }
          const mode = pickRandomMode();
          log("Building preloader grid with mode:", mode);
          time("preloader:build");
          buildGrid(preloader, mode);
          timeEnd("preloader:build");
          useDarkPreloaderThisOpen = false;
          eventBus.emit("tally:preloader:show", { mode });
        });
      };
      const hidePreloaderImmediate = () => {
        autoGroup("Hide Preloader Immediate", () => {
          preloader.innerHTML = "";
          preloader.style.transition = "";
          preloader.style.opacity = "";
          preloader.style.display = "none";
          fadeOutInProgress = false;
          preloader.classList.remove("dark-mode");
          if (overallFallbackTimer) {
            clearTimeout(overallFallbackTimer);
            overallFallbackTimer = null;
          }
          eventBus.emit("tally:preloader:hide", { method: "immediate" });
        });
      };
      const hidePreloaderWithJSFade = () => {
        autoGroup("Hide Preloader Fade", () => {
          if (fadeOutInProgress)
            return;
          fadeOutInProgress = true;
          preloader.style.display = "";
          preloader.style.opacity = "1";
          preloader.style.transition = "opacity .4s ease";
          requestAnimationFrame(() => {
            preloader.style.opacity = "0";
          });
          let localFallback = null;
          const cleanup = () => {
            if (localFallback)
              clearTimeout(localFallback);
            preloader.style.transition = "";
            preloader.style.opacity = "";
            preloader.style.display = "none";
            preloader.innerHTML = "";
            fadeOutInProgress = false;
            preloader.classList.remove("dark-mode");
            if (overallFallbackTimer) {
              clearTimeout(overallFallbackTimer);
              overallFallbackTimer = null;
            }
          };
          const onTransitionEnd = (e) => {
            if (e.propertyName === "opacity") {
              preloader.removeEventListener("transitionend", onTransitionEnd);
              cleanup();
              eventBus.emit("tally:preloader:hide", { method: "fade" });
            }
          };
          preloader.addEventListener("transitionend", onTransitionEnd);
          localFallback = window.setTimeout(() => {
            preloader.removeEventListener("transitionend", onTransitionEnd);
            cleanup();
            eventBus.emit("tally:preloader:hide", { method: "fade-fallback" });
          }, 600);
        });
      };
      const scheduleHideAfterMinDuration = () => {
        const now = performance.now();
        const elapsed = now - preloaderShownAt;
        const remaining = Math.max(0, minPreloaderMs - elapsed);
        if (remaining === 0) {
          hidePreloaderWithJSFade();
        } else {
          setTimeout(() => {
            hidePreloaderWithJSFade();
          }, remaining);
        }
      };
      const trapFocus = (e) => {
        const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableEls = Array.from(
          modal.querySelectorAll(focusableSelectors)
        ).filter((el) => !el.hasAttribute("disabled"));
        if (!focusableEls.length)
          return;
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          closeModal();
        } else {
          trapFocus(e);
        }
      };
      const openModal = (url) => {
        autoGroup("Open Modal", () => {
          eventBus.emit("tally:open", { url });
          showPreloader();
          if (overallFallbackTimer) {
            clearTimeout(overallFallbackTimer);
            overallFallbackTimer = null;
          }
          loadHandled = false;
          const cleanListeners = () => {
            iframe.removeEventListener("load", onLoad);
            iframe.removeEventListener("error", onError);
            if (overallFallbackTimer) {
              clearTimeout(overallFallbackTimer);
              overallFallbackTimer = null;
            }
          };
          const onLoad = () => {
            if (loadHandled)
              return;
            loadHandled = true;
            scheduleHideAfterMinDuration();
            cleanListeners();
            log("Tally iframe loaded successfully for", url);
            eventBus.emit("tally:load:success", { url });
          };
          const onError = () => {
            if (loadHandled)
              return;
            loadHandled = true;
            scheduleHideAfterMinDuration();
            cleanListeners();
            error("Tally iframe failed to load for", url);
            eventBus.emit("tally:load:error", { url });
          };
          iframe.addEventListener("load", onLoad);
          iframe.addEventListener("error", onError);
          overallFallbackTimer = setTimeout(() => {
            if (!loadHandled) {
              loadHandled = true;
              hidePreloaderImmediate();
              eventBus.emit("tally:load:timeout", { url });
            }
            overallFallbackTimer = null;
          }, 5e3);
          const isSafari2 = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          if (isSafari2) {
            log("\u{1F41E} [Safari] Pre-warming embed URL to prevent cached /r/ redirect:", url);
            fetch(url, { mode: "no-cors", cache: "reload" }).then(() => {
              log("\u2705 [Safari] Pre-warm fetch completed for", url);
            }).catch((err) => {
              warn("\u26A0\uFE0F [Safari] Pre-warm fetch failed:", err);
            });
          }
          iframe.src = url;
          modal.classList.add("is-active");
          document.body.classList.add("no-scroll");
          modal.setAttribute("aria-hidden", "false");
          previousActiveElement = document.activeElement;
          setTimeout(() => {
            closeBtn.focus();
          }, 50);
          document.addEventListener("keydown", handleKeyDown);
          eventBus.emit("tally:opened", { url });
        });
      };
      const closeModal = () => {
        autoGroup("Close Modal", () => {
          eventBus.emit("tally:close");
          log("Closing tally modal");
          modal.classList.remove("is-active");
          document.body.classList.remove("no-scroll");
          modal.setAttribute("aria-hidden", "true");
          iframe.src = "";
          if (previousActiveElement && previousActiveElement.focus) {
            previousActiveElement.focus();
          }
          if (overallFallbackTimer) {
            clearTimeout(overallFallbackTimer);
            overallFallbackTimer = null;
          }
          hidePreloaderImmediate();
          document.removeEventListener("keydown", handleKeyDown);
          eventBus.emit("tally:closed");
        });
      };
      const onBodyClick = (e) => {
        const target = e.target;
        const link = target.closest(SELECTORS.trigger);
        if (!link)
          return;
        e.preventDefault();
        const href = link.getAttribute("href") || "";
        console.log("Href", href);
        if (href)
          openModal(href);
      };
      document.body.addEventListener("click", onBodyClick, true);
      closeBtn.addEventListener("click", closeModal);
      const params = new URLSearchParams(window.location.search);
      const formId = params.get("formId");
      if (formId) {
        const url = `https://tally.so/embed/${encodeURIComponent(formId)}`;
        log("FormId detected, auto-opening:", formId);
        useDarkPreloaderThisOpen = true;
        openModal(url);
      }
      handles = { openModal, closeModal };
      eventBus.emit("tally:initialized");
    });
    return handles;
  };

  // src/client/modules/testimonialAvatar.ts
  init_live_reload();

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/index.js
  init_live_reload();

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/gsap-core.js
  init_live_reload();
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  };
  var _defaults = {
    duration: 0.5,
    overwrite: false,
    delay: 0
  };
  var _suppressOverwrites;
  var _reverting;
  var _context;
  var _bigNum = 1e8;
  var _tinyNum = 1 / _bigNum;
  var _2PI = Math.PI * 2;
  var _HALF_PI = _2PI / 4;
  var _gsID = 0;
  var _sqrt = Math.sqrt;
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _isString = function _isString2(value) {
    return typeof value === "string";
  };
  var _isFunction = function _isFunction2(value) {
    return typeof value === "function";
  };
  var _isNumber = function _isNumber2(value) {
    return typeof value === "number";
  };
  var _isUndefined = function _isUndefined2(value) {
    return typeof value === "undefined";
  };
  var _isObject = function _isObject2(value) {
    return typeof value === "object";
  };
  var _isNotFalse = function _isNotFalse2(value) {
    return value !== false;
  };
  var _windowExists = function _windowExists2() {
    return typeof window !== "undefined";
  };
  var _isFuncOrString = function _isFuncOrString2(value) {
    return _isFunction(value) || _isString(value);
  };
  var _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
  };
  var _isArray = Array.isArray;
  var _strictNumExp = /(?:-?\.?\d|\.)+/gi;
  var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
  var _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
  var _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
  var _relExp = /[+-]=-?[.\d]+/;
  var _delimitedValueExp = /[^,'"\[\]\s]+/gi;
  var _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i;
  var _globalTimeline;
  var _win;
  var _coreInitted;
  var _doc;
  var _globals = {};
  var _installScope = {};
  var _coreReady;
  var _install = function _install2(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  };
  var _missingPlugin = function _missingPlugin2(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  };
  var _warn = function _warn2(message, suppress) {
    return !suppress && console.warn(message);
  };
  var _addGlobal = function _addGlobal2(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  };
  var _emptyFunc = function _emptyFunc2() {
    return 0;
  };
  var _startAtRevertConfig = {
    suppressEvents: true,
    isStart: true,
    kill: false
  };
  var _revertConfigNoKill = {
    suppressEvents: true,
    kill: false
  };
  var _revertConfig = {
    suppressEvents: true
  };
  var _reservedProps = {};
  var _lazyTweens = [];
  var _lazyLookup = {};
  var _lastRenderedFrame;
  var _plugins = {};
  var _effects = {};
  var _nextGCFrame = 30;
  var _harnessPlugins = [];
  var _callbackNames = "";
  var _harness = function _harness2(targets) {
    var target = targets[0], harnessPlugin, i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;
      while (i-- && !_harnessPlugins[i].targetTest(target)) {
      }
      harnessPlugin = _harnessPlugins[i];
    }
    i = targets.length;
    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }
    return targets;
  };
  var _getCache = function _getCache2(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  };
  var _getProperty = function _getProperty2(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  };
  var _forEachName = function _forEachName2(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  };
  var _round = function _round2(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _roundPrecise = function _roundPrecise2(value) {
    return Math.round(value * 1e7) / 1e7 || 0;
  };
  var _parseRelative = function _parseRelative2(start, value) {
    var operator = value.charAt(0), end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
  };
  var _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
    var l = toFind.length, i = 0;
    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
    }
    return i < l;
  };
  var _lazyRender = function _lazyRender2() {
    var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
    _lazyLookup = {};
    _lazyTweens.length = 0;
    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  };
  var _isRevertWorthy = function _isRevertWorthy2(animation) {
    return !!(animation._initted || animation._startAt || animation.add);
  };
  var _lazySafeRender = function _lazySafeRender2(animation, time2, suppressEvents, force) {
    _lazyTweens.length && !_reverting && _lazyRender();
    animation.render(time2, suppressEvents, force || !!(_reverting && time2 < 0 && _isRevertWorthy(animation)));
    _lazyTweens.length && !_reverting && _lazyRender();
  };
  var _numericIfPossible = function _numericIfPossible2(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  };
  var _passThrough = function _passThrough2(p) {
    return p;
  };
  var _setDefaults = function _setDefaults2(obj, defaults2) {
    for (var p in defaults2) {
      p in obj || (obj[p] = defaults2[p]);
    }
    return obj;
  };
  var _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
    return function(obj, defaults2) {
      for (var p in defaults2) {
        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults2[p]);
      }
    };
  };
  var _merge = function _merge2(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }
    return base;
  };
  var _mergeDeep = function _mergeDeep2(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep2(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }
    return base;
  };
  var _copyExcluding = function _copyExcluding2(obj, excluding) {
    var copy = {}, p;
    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }
    return copy;
  };
  var _inheritDefaults = function _inheritDefaults2(vars) {
    var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }
    return vars;
  };
  var _arraysMatch = function _arraysMatch2(a1, a2) {
    var i = a1.length, match = i === a2.length;
    while (match && i-- && a1[i] === a2[i]) {
    }
    return i < 0;
  };
  var _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = parent[lastProp], t;
    if (sortBy) {
      t = child[sortBy];
      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }
    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  };
  var _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = child._prev, next = child._next;
    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }
    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }
    child._next = child._prev = child.parent = null;
  };
  var _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
    child._act = 0;
  };
  var _uncache = function _uncache2(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      var a = animation;
      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }
    return animation;
  };
  var _recacheAncestors = function _recacheAncestors2(animation) {
    var parent = animation.parent;
    while (parent && parent.parent) {
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }
    return animation;
  };
  var _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
    return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
  };
  var _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
  };
  var _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  };
  var _animationCycle = function _animationCycle2(tTime, cycleDuration) {
    var whole = Math.floor(tTime = _roundPrecise(tTime / cycleDuration));
    return tTime && whole === tTime ? whole - 1 : whole;
  };
  var _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  };
  var _setEnd = function _setEnd2(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  };
  var _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
      _setEnd(animation);
      parent._dirty || _uncache(parent, animation);
    }
    return animation;
  };
  var _postAddChecks = function _postAddChecks2(timeline2, child) {
    var t;
    if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
      t = _parentToChildTotalTime(timeline2.rawTime(), child);
      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    }
    if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
      if (timeline2._dur < timeline2.duration()) {
        t = timeline2;
        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime);
          t = t._dp;
        }
      }
      timeline2._zTime = -_tinyNum;
    }
  };
  var _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
    _isFromOrFromStart(child) || (timeline2._recent = child);
    skipChecks || _postAddChecks(timeline2, child);
    timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
    return timeline2;
  };
  var _scrollTrigger = function _scrollTrigger2(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  };
  var _attemptInitTween = function _attemptInitTween2(tween, time2, force, suppressEvents, tTime) {
    _initTween(tween, time2, tTime);
    if (!tween._initted) {
      return 1;
    }
    if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);
      tween._lazy = [tTime, suppressEvents];
      return 1;
    }
  };
  var _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
  };
  var _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  };
  var _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
    if (repeatDelay && tween._repeat) {
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }
    if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
        return;
      }
      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
      suppressEvents || (suppressEvents = totalTime && !prevIteration);
      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);
        if (!suppressEvents && !_reverting) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  };
  var _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time2) {
    var child;
    if (time2 > prevTime) {
      child = animation._first;
      while (child && child._start <= time2) {
        if (child.data === "isPause" && child._start > prevTime) {
          return child;
        }
        child = child._next;
      }
    } else {
      child = animation._last;
      while (child && child._start >= time2) {
        if (child.data === "isPause" && child._start < prevTime) {
          return child;
        }
        child = child._prev;
      }
    }
  };
  var _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
    animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  };
  var _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  };
  var _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  };
  var _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
    var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur, i, offset, isPercent;
    if (_isString(position) && (isNaN(position) || position in labels)) {
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");
      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }
      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }
      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }
      return i > 1 ? _parsePosition2(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
  };
  var _createTweenType = function _createTweenType2(type, params, timeline2) {
    var isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline2;
    if (type) {
      irVars = vars;
      parent = timeline2;
      while (parent && !("immediateRender" in irVars)) {
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }
      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
    }
    return new Tween(params[0], vars, params[varsIndex + 1]);
  };
  var _conditionalReturn = function _conditionalReturn2(value, func) {
    return value || value === 0 ? func(value) : func;
  };
  var _clamp = function _clamp2(min, max, value) {
    return value < min ? min : value > max ? max : value;
  };
  var getUnit = function getUnit2(value, v) {
    return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
  };
  var clamp = function clamp2(min, max, value) {
    return _conditionalReturn(value, function(v) {
      return _clamp(min, max, v);
    });
  };
  var _slice = [].slice;
  var _isArrayLike = function _isArrayLike2(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  };
  var _flatten = function _flatten2(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }
    return ar.forEach(function(value) {
      var _accumulator;
      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  };
  var toArray = function toArray2(value, scope, leaveStrings) {
    return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  };
  var selector = function selector2(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function(v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  };
  var shuffle = function shuffle2(a) {
    return a.sort(function() {
      return 0.5 - Math.random();
    });
  };
  var distribute = function distribute2(v) {
    if (_isFunction(v)) {
      return v;
    }
    var vars = _isObject(v) ? v : {
      each: v
    }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
    if (_isString(from)) {
      ratioX = ratioY = {
        center: 0.5,
        edges: 0.5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }
    return function(i, target, a) {
      var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrapAt;
      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
        if (!wrapAt) {
          max = -_bigNum;
          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
          }
          wrapAt < l && wrapAt--;
        }
        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
        originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;
        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }
        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0;
        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }
      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
    };
  };
  var _roundModifier = function _roundModifier2(v) {
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
    return function(raw) {
      var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  };
  var snap = function snap2(snapTo, value) {
    var isArray = _isArray(snapTo), radius, is2D;
    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;
      if (snapTo.values) {
        snapTo = toArray(snapTo.values);
        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius;
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }
    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function(raw) {
      var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length, dx, dy;
      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }
        if (dx < min) {
          min = dx;
          closest = i;
        }
      }
      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  };
  var random = function random2(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  };
  var pipe = function pipe2() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function(value) {
      return functions.reduce(function(v, f) {
        return f(v);
      }, value);
    };
  };
  var unitize = function unitize2(func, unit) {
    return function(value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  };
  var normalize = function normalize2(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  };
  var _wrapArray = function _wrapArray2(a, wrapper, value) {
    return _conditionalReturn(value, function(index) {
      return a[~~wrapper(index)];
    });
  };
  var wrap = function wrap2(min, max, value) {
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
      return (range + (value2 - min) % range) % range + min;
    });
  };
  var wrapYoyo = function wrapYoyo2(min, max, value) {
    var range = max - min, total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
      value2 = (total + (value2 - min) % total) % total || 0;
      return min + (value2 > range ? total - value2 : value2);
    });
  };
  var _replaceRandom = function _replaceRandom2(value) {
    var prev = 0, s = "", i, nums, end, isArray;
    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
  };
  var mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin, outRange = outMax - outMin;
    return _conditionalReturn(value, function(value2) {
      return outMin + ((value2 - inMin) / inRange * outRange || 0);
    });
  };
  var interpolate = function interpolate2(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function(p2) {
      return (1 - p2) * start + p2 * end;
    };
    if (!func) {
      var isString = _isString(start), master = {}, p, i, interpolators, l, il;
      progress === true && (mutate = 1) && (progress = null);
      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;
        for (i = 1; i < l; i++) {
          interpolators.push(interpolate2(start[i - 1], start[i]));
        }
        l--;
        func = function func2(p2) {
          p2 *= l;
          var i2 = Math.min(il, ~~p2);
          return interpolators[i2](p2 - i2);
        };
        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }
      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }
        func = function func2(p2) {
          return _renderPropTweens(p2, master) || (isString ? start.p : start);
        };
      }
    }
    return _conditionalReturn(progress, func);
  };
  var _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
    var labels = timeline2.labels, min = _bigNum, p, distance, label;
    for (p in labels) {
      distance = labels[p] - fromTime;
      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }
    return label;
  };
  var _callback = function _callback2(animation, type, executeLazyFirst) {
    var v = animation.vars, callback = v[type], prevContext = _context, context3 = animation._ctx, params, scope, result;
    if (!callback) {
      return;
    }
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender();
    context3 && (_context = context3);
    result = params ? callback.apply(scope, params) : callback.call(scope);
    _context = prevContext;
    return result;
  };
  var _interrupt = function _interrupt2(animation) {
    _removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  };
  var _quickTween;
  var _registerPluginQueue = [];
  var _createPlugin = function _createPlugin2(config3) {
    if (!config3)
      return;
    config3 = !config3.name && config3["default"] || config3;
    if (_windowExists() || config3.headless) {
      var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
        this._props = [];
      } : config3, instanceDefaults = {
        init: _emptyFunc,
        render: _renderPropTweens,
        add: _addPropTween,
        kill: _killPropTweensOf,
        modifier: _addPluginModifier,
        rawVars: 0
      }, statics = {
        targetTest: 0,
        get: 0,
        getSetter: _getSetter,
        aliases: {},
        register: 0
      };
      _wake();
      if (config3 !== Plugin) {
        if (_plugins[name]) {
          return;
        }
        _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
        _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
        _plugins[Plugin.prop = name] = Plugin;
        if (config3.targetTest) {
          _harnessPlugins.push(Plugin);
          _reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
      }
      _addGlobal(name, Plugin);
      config3.register && config3.register(gsap, Plugin, PropTween);
    } else {
      _registerPluginQueue.push(config3);
    }
  };
  var _255 = 255;
  var _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  };
  var _hue = function _hue2(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + 0.5 | 0;
  };
  var splitColor = function splitColor2(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0, r, g, b, h, s, l, max, min, d, wasHSL;
    if (!a) {
      if (v.substr(-1) === ",") {
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }
        if (v.length === 9) {
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);
        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1);
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }
      a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = ~~(h + 0.5);
      a[1] = ~~(s * 100 + 0.5);
      a[2] = ~~(l * 100 + 0.5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  };
  var _colorOrderData = function _colorOrderData2(v) {
    var values = [], c = [], i = -1;
    v.split(_colorExp).forEach(function(v2) {
      var a = v2.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  };
  var _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
    var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
    if (!colors) {
      return s;
    }
    colors = colors.map(function(color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;
      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }
    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }
    return result + shell[l];
  };
  var _colorExp = function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p;
    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }
    return new RegExp(s + ")", "gi");
  }();
  var _hslExp = /hsl[a]?\(/;
  var _colorStringFilter = function _colorStringFilter2(a) {
    var combined = a.join(" "), toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
      return true;
    }
  };
  var _tickerActive;
  var _ticker = function() {
    var _getTime3 = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime3(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners3 = [], _id, _req, _raf, _self, _delta, _i2, _tick = function _tick2(v) {
      var elapsed = _getTime3() - _lastUpdate, manual = v === true, overlap, dispatch, time2, frame;
      (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time2 = _lastUpdate - _startTime;
      overlap = time2 - _nextTime;
      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time2 - _self.time * 1e3;
        _self.time = time2 = time2 / 1e3;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }
      manual || (_id = _req(_tick2));
      if (dispatch) {
        for (_i2 = 0; _i2 < _listeners3.length; _i2++) {
          _listeners3[_i2](time2, _delta, frame, v);
        }
      }
    };
    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1e3 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
            _registerPluginQueue.forEach(_createPlugin);
          }
          _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
          _id && _self.sleep();
          _req = _raf || function(f) {
            return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
          };
          _tickerActive = 1;
          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || Infinity;
        _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
      },
      fps: function fps(_fps) {
        _gap = 1e3 / (_fps || 240);
        _nextTime = _self.time * 1e3 + _gap;
      },
      add: function add(callback, once, prioritize) {
        var func = once ? function(t, d, f, v) {
          callback(t, d, f, v);
          _self.remove(func);
        } : callback;
        _self.remove(callback);
        _listeners3[prioritize ? "unshift" : "push"](func);
        _wake();
        return func;
      },
      remove: function remove(callback, i) {
        ~(i = _listeners3.indexOf(callback)) && _listeners3.splice(i, 1) && _i2 >= i && _i2--;
      },
      _listeners: _listeners3
    };
    return _self;
  }();
  var _wake = function _wake2() {
    return !_tickerActive && _ticker.wake();
  };
  var _easeMap = {};
  var _customEaseExp = /^[\d.\-M][\d.\-,\s]/;
  var _quotesExp = /["']/g;
  var _parseObjectInString = function _parseObjectInString2(value) {
    var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index, val, parsedVal;
    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }
    return obj;
  };
  var _valueInParentheses = function _valueInParentheses2(value) {
    var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  };
  var _configEaseFromString = function _configEaseFromString2(name) {
    var split = (name + "").split("("), ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  };
  var _invertEase = function _invertEase2(ease) {
    return function(p) {
      return 1 - ease(1 - p);
    };
  };
  var _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
    var child = timeline2._first, ease;
    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase2(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase2(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }
      child = child._next;
    }
  };
  var _parseEase = function _parseEase2(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  };
  var _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut2(p) {
        return 1 - easeIn(1 - p);
      };
    }
    if (easeInOut === void 0) {
      easeInOut = function easeInOut2(p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }
    var ease = {
      easeIn,
      easeOut,
      easeInOut
    }, lowercaseName;
    _forEachName(names, function(name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });
    return ease;
  };
  var _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
    return function(p) {
      return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
    };
  };
  var _configElastic = function _configElastic2(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    p2 = _2PI / p2;
    ease.config = function(amplitude2, period2) {
      return _configElastic2(type, amplitude2, period2);
    };
    return ease;
  };
  var _configBack = function _configBack2(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }
    var easeOut = function easeOut2(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    ease.config = function(overshoot2) {
      return _configBack2(type, overshoot2);
    };
    return ease;
  };
  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
    var power = i < 5 ? i + 1 : i;
    _insertEase(name + ",Power" + (power - 1), i ? function(p) {
      return Math.pow(p, power);
    } : function(p) {
      return p;
    }, function(p) {
      return 1 - Math.pow(1 - p, power);
    }, function(p) {
      return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });
  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
  (function(n, c) {
    var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
    };
    _insertEase("Bounce", function(p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);
  _insertEase("Expo", function(p) {
    return Math.pow(2, 10 * (p - 1)) * p + p * p * p * p * p * p * (1 - p);
  });
  _insertEase("Circ", function(p) {
    return -(_sqrt(1 - p * p) - 1);
  });
  _insertEase("Sine", function(p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });
  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }
      var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
      return function(p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];
  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  var GSCache = function GSCache2(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = /* @__PURE__ */ function() {
    function Animation2(vars) {
      this.vars = vars;
      this._delay = +vars.delay || 0;
      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }
      this._ts = 1;
      _setDuration(this, +vars.duration, 1, 1);
      this.data = vars.data;
      if (_context) {
        this._ctx = _context;
        _context.data.push(this);
      }
      _tickerActive || _ticker.wake();
    }
    var _proto = Animation2.prototype;
    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }
      return this._delay;
    };
    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }
      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();
      if (!arguments.length) {
        return this._tTime;
      }
      var parent = this._dp;
      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);
        !parent._dp || parent.parent || _postAddChecks(parent, this);
        while (parent && parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }
          parent = parent.parent;
        }
        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }
      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);
        _lazySafeRender(this, _totalTime, suppressEvents);
      }
      return this;
    };
    _proto.time = function time2(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
    };
    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };
    _proto.timeScale = function timeScale(value, suppressEvents) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }
      if (this._rts === value) {
        return this;
      }
      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      this.totalTime(_clamp(-Math.abs(this._delay), this.totalDuration(), tTime), suppressEvents !== false);
      _setEnd(this);
      return _recacheAncestors(this);
    };
    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }
      if (this._ps !== value) {
        this._ps = value;
        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();
          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
        }
      }
      return this;
    };
    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }
      return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.revert = function revert(config3) {
      if (config3 === void 0) {
        config3 = _revertConfig;
      }
      var prevIsReverting = _reverting;
      _reverting = config3;
      if (_isRevertWorthy(this)) {
        this.timeline && this.timeline.revert(config3);
        this.totalTime(-0.01, config3.suppressEvents);
      }
      this.data !== "nested" && config3.kill !== false && this.kill();
      _reverting = prevIsReverting;
      return this;
    };
    _proto.globalTime = function globalTime(rawTime) {
      var animation = this, time2 = arguments.length ? rawTime : animation.rawTime();
      while (animation) {
        time2 = animation._start + time2 / (Math.abs(animation._ts) || 1);
        animation = animation._dp;
      }
      return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time2;
    };
    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }
      return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        var time2 = this._time;
        this._rDelay = value;
        _onUpdateTotalDuration(this);
        return time2 ? this.time(time2) : this;
      }
      return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }
      return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
      this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
      this._dur || (this._zTime = -_tinyNum);
      return this;
    };
    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };
    _proto.resume = function resume() {
      return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }
      return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };
    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp, start = this._start, rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;
      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }
        return this;
      }
      return vars[type];
    };
    _proto.then = function then(onFulfilled) {
      var self = this;
      return new Promise(function(resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
          var _then = self.then;
          self.then = null;
          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };
        if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
          _resolve();
        } else {
          self._prom = _resolve;
        }
      });
    };
    _proto.kill = function kill() {
      _interrupt(this);
    };
    return Animation2;
  }();
  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  var Timeline = /* @__PURE__ */ function(_Animation) {
    _inheritsLoose(Timeline2, _Animation);
    function Timeline2(vars, position) {
      var _this;
      if (vars === void 0) {
        vars = {};
      }
      _this = _Animation.call(this, vars) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
      vars.reversed && _this.reverse();
      vars.paused && _this.paused(true);
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }
    var _proto2 = Timeline2.prototype;
    _proto2.to = function to(targets, vars, position) {
      _createTweenType(0, arguments, this);
      return this;
    };
    _proto2.from = function from(targets, vars, position) {
      _createTweenType(1, arguments, this);
      return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      _createTweenType(2, arguments, this);
      return this;
    };
    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };
    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
    };
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render3(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time2, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
      this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }
        time2 = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;
        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }
        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time2 = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time2 = dur;
          } else {
            prevIteration = _roundPrecise(tTime / cycleDuration);
            iteration = ~~prevIteration;
            if (iteration && iteration === prevIteration) {
              time2 = dur;
              iteration--;
            }
            time2 > dur && (time2 = dur);
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
          if (yoyo && iteration & 1) {
            time2 = dur - time2;
            isYoyo = 1;
          }
          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            this._tTime = tTime;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              return this;
            }
            dur = this._dur;
            tDur = this._tDur;
            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -1e-4;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }
            this._lock = 0;
            if (!this._ts && !prevPaused) {
              return this;
            }
            _propagateYoyoEase(this, isYoyo);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time2));
          if (pauseTween) {
            tTime -= time2 - (time2 = pauseTween._start);
          }
        }
        this._tTime = tTime;
        this._time = time2;
        this._act = !timeScale;
        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0;
        }
        if (!prevTime && tTime && !suppressEvents && !prevIteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        if (time2 >= prevTime && totalTime >= 0) {
          child = this._first;
          while (child) {
            next = child._next;
            if ((child._act || time2 >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (time2 - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time2 - child._start) * child._ts, suppressEvents, force);
              if (time2 !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }
            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time2;
          while (child) {
            next = child._prev;
            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && _isRevertWorthy(child));
              if (time2 !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }
            child = next;
          }
        }
        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time2 >= prevTime ? 0 : -_tinyNum)._zTime = time2 >= prevTime ? 1 : -1;
          if (this._ts) {
            this._start = prevStart;
            _setEnd(this);
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
          if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
            if (!this._lock) {
              (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
              if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
              }
            }
          }
        }
      }
      return this;
    };
    _proto2.add = function add(child, position) {
      var _this2 = this;
      _isNumber(position) || (position = _parsePosition(this, position, child));
      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function(obj) {
            return _this2.add(obj, position);
          });
          return this;
        }
        if (_isString(child)) {
          return this.addLabel(child, position);
        }
        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }
      return this !== child ? _addToTimeline(this, child, position) : this;
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }
      if (tweens === void 0) {
        tweens = true;
      }
      if (timelines === void 0) {
        timelines = true;
      }
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }
      var a = [], child = this._first;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }
        child = child._next;
      }
      return a;
    };
    _proto2.getById = function getById2(id) {
      var animations = this.getChildren(1, 1, 1), i = animations.length;
      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };
    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }
      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }
      child.parent === this && _removeLinkedListItem(this, child);
      if (child === this._recent) {
        this._recent = this._last;
      }
      return _uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }
      this._forcing = 1;
      if (!this._dp && this._ts) {
        this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }
      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
      this._forcing = 0;
      return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };
    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);
      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }
        child = child._next;
      }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }
      return this;
    };
    _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
      var a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }
        child = child._next;
      }
      return a;
    };
    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};
      var tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }
          _onStart && _onStart.apply(tween, onStartParams || []);
        }
      }, vars));
      return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };
    _proto2.recent = function recent() {
      return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }
      var child = this._first, labels = this.labels, p;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }
        child = child._next;
      }
      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }
      return _uncache(this);
    };
    _proto2.invalidate = function invalidate(soft) {
      var child = this._first;
      this._lock = 0;
      while (child) {
        child.invalidate(soft);
        child = child._next;
      }
      return _Animation.prototype.invalidate.call(this, soft);
    };
    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }
      var child = this._first, next;
      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }
      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
      var max = 0, self = this, child = self._last, prevStart = _bigNum, prev, start, parent;
      if (arguments.length) {
        return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
      }
      if (self._dirty) {
        parent = self.parent;
        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;
          if (start > prevStart && self._sort && child._ts && !self._lock) {
            self._lock = 1;
            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }
          if (start < 0 && child._ts) {
            max -= start;
            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
              self._start += start / self._ts;
              self._time -= start;
              self._tTime -= start;
            }
            self.shiftChildren(-start, false, -Infinity);
            prevStart = 0;
          }
          child._end > max && child._ts && (max = child._end);
          child = prev;
        }
        _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
        self._dirty = 0;
      }
      return self._tDur;
    };
    Timeline2.updateRoot = function updateRoot(time2) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time2, _globalTimeline));
        _lastRenderedFrame = _ticker.frame;
      }
      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) {
          if (_config.autoSleep && _ticker._listeners.length < 2) {
            while (child && !child._ts) {
              child = child._next;
            }
            child || _ticker.sleep();
          }
        }
      }
    };
    return Timeline2;
  }(Animation);
  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });
  var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop);
      start = a[0];
      end = a[1];
    }
    startNums = start.match(_complexStringNumExp) || [];
    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }
      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0;
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
    pt.fp = funcParam;
    if (_relExp.test(end) || hasRandom) {
      pt.e = 0;
    }
    this._pt = pt;
    return pt;
  };
  var _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (end.charAt(1) === "=") {
        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
        if (pt || pt === 0) {
          end = pt;
        }
      }
    }
    if (!optional || parsedStart !== end || _forceAllPropTweens) {
      if (!isNaN(parsedStart * end) && end !== "") {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }
      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  };
  var _processVars = function _processVars2(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }
    var copy = {}, p;
    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }
    return copy;
  };
  var _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
        i = plugin._props.length;
        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }
    return plugin;
  };
  var _overwritingTween;
  var _forceAllPropTweens;
  var _initTween = function _initTween2(tween, time2, tTime) {
    var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards;
    if (!tl || keyframes && !vars.stagger) {
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop];
      cleanVars = _copyExcluding(vars, _reservedProps);
      if (prevStartAt) {
        prevStartAt._zTime < 0 && prevStartAt.progress(1);
        time2 < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
        prevStartAt._lazy = 0;
      }
      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent,
          immediateRender: true,
          lazy: !prevStartAt && _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate && function() {
            return _callback(tween, "onUpdate");
          },
          stagger: 0
        }, startAt)));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time2 < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
        if (immediateRender) {
          if (dur && time2 <= 0 && tTime <= 0) {
            time2 && (tween._zTime = time2);
            return;
          }
        }
      } else if (runBackwards && dur) {
        if (!prevStartAt) {
          time2 && (immediateRender = false);
          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
            lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
            immediateRender,
            //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
            stagger: 0,
            parent
            //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars);
          _removeFromParent(tween._startAt = Tween.set(targets, p));
          tween._startAt._dp = 0;
          tween._startAt._sat = tween;
          time2 < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
          tween._zTime = time2;
          if (!immediateRender) {
            _initTween2(tween._startAt, _tinyNum, _tinyNum);
          } else if (!time2) {
            return;
          }
        }
      }
      tween._pt = tween._ptCache = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
        index = fullTargets === targets ? i : fullTargets.indexOf(target);
        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
          plugin._props.forEach(function(name) {
            ptLookup[name] = pt;
          });
          plugin.priority && (hasPriority = 1);
        }
        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }
        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;
          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time2));
          overwritten = !tween.parent;
          _overwritingTween = 0;
        }
        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }
      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween);
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten;
    keyframes && time2 <= 0 && tl.render(_bigNum, true, true);
  };
  var _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time2, skipRecursion) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i;
    if (!ptCache) {
      ptCache = tween._ptCache[property] = [];
      lookup = tween._ptLookup;
      i = tween._targets.length;
      while (i--) {
        pt = lookup[i][property];
        if (pt && pt.d && pt.d._pt) {
          pt = pt.d._pt;
          while (pt && pt.p !== property && pt.fp !== property) {
            pt = pt._next;
          }
        }
        if (!pt) {
          _forceAllPropTweens = 1;
          tween.vars[property] = "+=0";
          _initTween(tween, time2);
          _forceAllPropTweens = 0;
          return skipRecursion ? _warn(property + " not eligible for reset") : 1;
        }
        ptCache.push(pt);
      }
    }
    i = ptCache.length;
    while (i--) {
      rootPT = ptCache[i];
      pt = rootPT._pt || rootPT;
      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
      pt.c = value - pt.s;
      rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
      rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
    }
  };
  var _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
    if (!propertyAliases) {
      return vars;
    }
    copy = _merge({}, vars);
    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }
    return copy;
  };
  var _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut", p, a;
    if (_isArray(obj)) {
      a = allProps[prop] || (allProps[prop] = []);
      obj.forEach(function(value, i) {
        return a.push({
          t: i / (obj.length - 1) * 100,
          v: value,
          e: ease
        });
      });
    } else {
      for (p in obj) {
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
          t: parseFloat(prop),
          v: obj[p],
          e: ease
        });
      }
    }
  };
  var _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  };
  var _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert";
  var _staggerPropsToSkip = {};
  _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
    return _staggerPropsToSkip[name] = 1;
  });
  var Tween = /* @__PURE__ */ function(_Animation2) {
    _inheritsLoose(Tween2, _Animation2);
    function Tween2(targets, vars, position, skipInherit) {
      var _this3;
      if (typeof vars === "number") {
        position.duration = vars;
        vars = position;
        position = null;
      }
      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
      var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults2 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;
      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults2 || {},
          targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
        });
        tl.kill();
        tl.parent = tl._dp = _assertThisInitialized(_this3);
        tl._start = 0;
        if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
          l = parsedTargets.length;
          staggerFunc = stagger && distribute(stagger);
          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }
          for (i = 0; i < l; i++) {
            copy = _copyExcluding(vars, _staggerPropsToSkip);
            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }
            tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
            tl._ease = _easeMap.none;
          }
          tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
        } else if (keyframes) {
          _inheritDefaults(_setDefaults(tl.vars.defaults, {
            ease: "none"
          }));
          tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
          var time2 = 0, a, kf, v;
          if (_isArray(keyframes)) {
            keyframes.forEach(function(frame) {
              return tl.to(parsedTargets, frame, ">");
            });
            tl.duration();
          } else {
            copy = {};
            for (p in keyframes) {
              p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
            }
            for (p in copy) {
              a = copy[p].sort(function(a2, b) {
                return a2.t - b.t;
              });
              time2 = 0;
              for (i = 0; i < a.length; i++) {
                kf = a[i];
                v = {
                  ease: kf.e,
                  duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                };
                v[p] = kf.v;
                tl.to(parsedTargets, v, time2);
                time2 += v.duration;
              }
            }
            tl.duration() < duration && tl.to({}, {
              duration: duration - tl.duration()
            });
          }
        }
        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0;
      }
      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized(_this3);
        _globalTimeline.killTweensOf(parsedTargets);
        _overwritingTween = 0;
      }
      _addToTimeline(parent, _assertThisInitialized(_this3), position);
      vars.reversed && _this3.reverse();
      vars.paused && _this3.paused(true);
      if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;
        _this3.render(Math.max(0, -delay) || 0);
      }
      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }
    var _proto3 = Tween2.prototype;
    _proto3.render = function render3(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time2, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative || this._lazy) {
        time2 = tTime;
        timeline2 = this.timeline;
        if (this._repeat) {
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && isNegative) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time2 = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time2 = dur;
          } else {
            prevIteration = _roundPrecise(tTime / cycleDuration);
            iteration = ~~prevIteration;
            if (iteration && iteration === prevIteration) {
              time2 = dur;
              iteration--;
            } else if (time2 > dur) {
              time2 = dur;
            }
          }
          isYoyo = this._yoyo && iteration & 1;
          if (isYoyo) {
            yoyoEase = this._yEase;
            time2 = dur - time2;
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          if (time2 === prevTime && !force && this._initted && iteration === prevIteration) {
            this._tTime = tTime;
            return this;
          }
          if (iteration !== prevIteration) {
            timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
            if (this.vars.repeatRefresh && !isYoyo && !this._lock && time2 !== cycleDuration && this._initted) {
              this._lock = force = 1;
              this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }
        if (!this._initted) {
          if (_attemptInitTween(this, isNegative ? totalTime : time2, force, suppressEvents, tTime)) {
            this._tTime = 0;
            return this;
          }
          if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
            return this;
          }
          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._tTime = tTime;
        this._time = time2;
        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }
        this.ratio = ratio = (yoyoEase || this._ease)(time2 / dur);
        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }
        if (!prevTime && tTime && !suppressEvents && !prevIteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        pt = this._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time2 / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
        if (this._onUpdate && !suppressEvents) {
          isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
          _callback(this, "onUpdate");
        }
        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
          if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }
      return this;
    };
    _proto3.targets = function targets() {
      return this._targets;
    };
    _proto3.invalidate = function invalidate(soft) {
      (!soft || !this.vars.runBackwards) && (this._startAt = 0);
      this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate(soft);
      return _Animation2.prototype.invalidate.call(this, soft);
    };
    _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
      _tickerActive || _ticker.wake();
      this._ts || this.play();
      var time2 = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
      this._initted || _initTween(this, time2);
      ratio = this._ease(time2 / this._dur);
      if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time2, skipRecursion)) {
        return this.resetTo(property, value, start, startIsRelative, 1);
      }
      _alignPlayhead(this, 0);
      this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
      return this.render(0);
    };
    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }
      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        this.parent ? _interrupt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_reverting);
        return this;
      }
      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }
      var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }
      overwrittenProps = this._op = this._op || [];
      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};
          _forEachName(vars, function(name) {
            return p[name] = 1;
          });
          vars = p;
        }
        vars = _addAliasesToVars(parsedTargets, vars);
      }
      i = parsedTargets.length;
      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];
          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }
          for (p in props) {
            pt = curLookup && curLookup[p];
            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }
              delete curLookup[p];
            }
            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }
      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };
    Tween2.to = function to(targets, vars) {
      return new Tween2(targets, vars, arguments[2]);
    };
    Tween2.from = function from(targets, vars) {
      return _createTweenType(1, arguments);
    };
    Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween2(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };
    Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
      return _createTweenType(2, arguments);
    };
    Tween2.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween2(targets, vars);
    };
    Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween2;
  }(Animation);
  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });
  _forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
    Tween[name] = function() {
      var tl = new Timeline(), params = _slice.call(arguments, 0);
      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });
  var _setterPlain = function _setterPlain2(target, property, value) {
    return target[property] = value;
  };
  var _setterFunc = function _setterFunc2(target, property, value) {
    return target[property](value);
  };
  var _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
    return target[property](data.fp, value);
  };
  var _setterAttribute = function _setterAttribute2(target, property, value) {
    return target.setAttribute(property, value);
  };
  var _getSetter = function _getSetter2(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  };
  var _renderPlain = function _renderPlain2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
  };
  var _renderBoolean = function _renderBoolean2(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  };
  var _renderComplexString = function _renderComplexString2(ratio, data) {
    var pt = data._pt, s = "";
    if (!ratio && data.b) {
      s = data.b;
    } else if (ratio === 1 && data.e) {
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
        pt = pt._next;
      }
      s += data.c;
    }
    data.set(data.t, data.p, s, data);
  };
  var _renderPropTweens = function _renderPropTweens2(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  };
  var _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
    var pt = this._pt, next;
    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  };
  var _killPropTweensOf = function _killPropTweensOf2(property) {
    var pt = this._pt, hasNonDependentRemaining, next;
    while (pt) {
      next = pt._next;
      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }
      pt = next;
    }
    return !hasNonDependentRemaining;
  };
  var _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  };
  var _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
    var pt = parent._pt, next, pt2, first, last;
    while (pt) {
      next = pt._next;
      pt2 = first;
      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }
      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }
      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }
      pt = next;
    }
    parent._pt = first;
  };
  var PropTween = /* @__PURE__ */ function() {
    function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;
      if (next) {
        next._prev = this;
      }
    }
    var _proto4 = PropTween2.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };
    return PropTween2;
  }();
  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
    return _reservedProps[name] = 1;
  });
  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _media = [];
  var _listeners = {};
  var _emptyArray = [];
  var _lastMediaTime = 0;
  var _contextID = 0;
  var _dispatch = function _dispatch2(type) {
    return (_listeners[type] || _emptyArray).map(function(f) {
      return f();
    });
  };
  var _onMediaChange = function _onMediaChange2() {
    var time2 = Date.now(), matches = [];
    if (time2 - _lastMediaTime > 2) {
      _dispatch("matchMediaInit");
      _media.forEach(function(c) {
        var queries = c.queries, conditions = c.conditions, match, p, anyMatch, toggled;
        for (p in queries) {
          match = _win.matchMedia(queries[p]).matches;
          match && (anyMatch = 1);
          if (match !== conditions[p]) {
            conditions[p] = match;
            toggled = 1;
          }
        }
        if (toggled) {
          c.revert();
          anyMatch && matches.push(c);
        }
      });
      _dispatch("matchMediaRevert");
      matches.forEach(function(c) {
        return c.onMatch(c, function(func) {
          return c.add(null, func);
        });
      });
      _lastMediaTime = time2;
      _dispatch("matchMedia");
    }
  };
  var Context = /* @__PURE__ */ function() {
    function Context2(func, scope) {
      this.selector = scope && selector(scope);
      this.data = [];
      this._r = [];
      this.isReverted = false;
      this.id = _contextID++;
      func && this.add(func);
    }
    var _proto5 = Context2.prototype;
    _proto5.add = function add(name, func, scope) {
      if (_isFunction(name)) {
        scope = func;
        func = name;
        name = _isFunction;
      }
      var self = this, f = function f2() {
        var prev = _context, prevSelector = self.selector, result;
        prev && prev !== self && prev.data.push(self);
        scope && (self.selector = selector(scope));
        _context = self;
        result = func.apply(self, arguments);
        _isFunction(result) && self._r.push(result);
        _context = prev;
        self.selector = prevSelector;
        self.isReverted = false;
        return result;
      };
      self.last = f;
      return name === _isFunction ? f(self, function(func2) {
        return self.add(null, func2);
      }) : name ? self[name] = f : f;
    };
    _proto5.ignore = function ignore(func) {
      var prev = _context;
      _context = null;
      func(this);
      _context = prev;
    };
    _proto5.getTweens = function getTweens() {
      var a = [];
      this.data.forEach(function(e) {
        return e instanceof Context2 ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
      });
      return a;
    };
    _proto5.clear = function clear() {
      this._r.length = this.data.length = 0;
    };
    _proto5.kill = function kill(revert, matchMedia3) {
      var _this4 = this;
      if (revert) {
        (function() {
          var tweens = _this4.getTweens(), i2 = _this4.data.length, t;
          while (i2--) {
            t = _this4.data[i2];
            if (t.data === "isFlip") {
              t.revert();
              t.getChildren(true, true, false).forEach(function(tween) {
                return tweens.splice(tweens.indexOf(tween), 1);
              });
            }
          }
          tweens.map(function(t2) {
            return {
              g: t2._dur || t2._delay || t2._sat && !t2._sat.vars.immediateRender ? t2.globalTime(0) : -Infinity,
              t: t2
            };
          }).sort(function(a, b) {
            return b.g - a.g || -Infinity;
          }).forEach(function(o) {
            return o.t.revert(revert);
          });
          i2 = _this4.data.length;
          while (i2--) {
            t = _this4.data[i2];
            if (t instanceof Timeline) {
              if (t.data !== "nested") {
                t.scrollTrigger && t.scrollTrigger.revert();
                t.kill();
              }
            } else {
              !(t instanceof Tween) && t.revert && t.revert(revert);
            }
          }
          _this4._r.forEach(function(f) {
            return f(revert, _this4);
          });
          _this4.isReverted = true;
        })();
      } else {
        this.data.forEach(function(e) {
          return e.kill && e.kill();
        });
      }
      this.clear();
      if (matchMedia3) {
        var i = _media.length;
        while (i--) {
          _media[i].id === this.id && _media.splice(i, 1);
        }
      }
    };
    _proto5.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    return Context2;
  }();
  var MatchMedia = /* @__PURE__ */ function() {
    function MatchMedia2(scope) {
      this.contexts = [];
      this.scope = scope;
      _context && _context.data.push(this);
    }
    var _proto6 = MatchMedia2.prototype;
    _proto6.add = function add(conditions, func, scope) {
      _isObject(conditions) || (conditions = {
        matches: conditions
      });
      var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p, active;
      _context && !context3.selector && (context3.selector = _context.selector);
      this.contexts.push(context3);
      func = context3.add("onMatch", func);
      context3.queries = conditions;
      for (p in conditions) {
        if (p === "all") {
          active = 1;
        } else {
          mq = _win.matchMedia(conditions[p]);
          if (mq) {
            _media.indexOf(context3) < 0 && _media.push(context3);
            (cond[p] = mq.matches) && (active = 1);
            mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
          }
        }
      }
      active && func(context3, function(f) {
        return context3.add(null, f);
      });
      return this;
    };
    _proto6.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    _proto6.kill = function kill(revert) {
      this.contexts.forEach(function(c) {
        return c.kill(revert, true);
      });
    };
    return MatchMedia2;
  }();
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      args.forEach(function(config3) {
        return _createPlugin(config3);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]);
      var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
      unit === "native" && (unit = "");
      return !target ? target : !property ? function(property2, unit2, uncache2) {
        return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);
      if (target.length > 1) {
        var setters = target.map(function(t) {
          return gsap.quickSetter(t, property, unit);
        }), l = setters.length;
        return function(value) {
          var i = l;
          while (i--) {
            setters[i](value);
          }
        };
      }
      target = target[0] || {};
      var Plugin = _plugins[property], cache = _getCache(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
        var p2 = new Plugin();
        _quickTween._pt = 0;
        p2.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p2.render(1, p2);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);
      return Plugin ? setter : function(value) {
        return setter(target, p, unit ? value + unit : value, cache, 1);
      };
    },
    quickTo: function quickTo(target, property, vars) {
      var _setDefaults22;
      var tween = gsap.to(target, _setDefaults((_setDefaults22 = {}, _setDefaults22[property] = "+=0.1", _setDefaults22.paused = true, _setDefaults22.stagger = 0, _setDefaults22), vars || {})), func = function func2(value, start, startIsRelative) {
        return tween.resetTo(property, value, start, startIsRelative);
      };
      func.tween = tween;
      return func;
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config2(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
      var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults2 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
      (plugins || "").split(",").forEach(function(pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });
      _effects[name] = function(targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults2), tl);
      };
      if (extendTimeline) {
        Timeline.prototype[name] = function(targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }
      var tl = new Timeline(vars), child, next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
      _globalTimeline.remove(tl);
      tl._dp = 0;
      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;
      while (child) {
        next = child._next;
        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }
        child = next;
      }
      _addToTimeline(_globalTimeline, tl, 0);
      return tl;
    },
    context: function context(func, scope) {
      return func ? new Context(func, scope) : _context;
    },
    matchMedia: function matchMedia2(scope) {
      return new MatchMedia(scope);
    },
    matchMediaRefresh: function matchMediaRefresh() {
      return _media.forEach(function(c) {
        var cond = c.conditions, found, p;
        for (p in cond) {
          if (cond[p]) {
            cond[p] = false;
            found = 1;
          }
        }
        found && c.revert();
      }) || _onMediaChange();
    },
    addEventListener: function addEventListener2(type, callback) {
      var a = _listeners[type] || (_listeners[type] = []);
      ~a.indexOf(callback) || a.push(callback);
    },
    removeEventListener: function removeEventListener(type, callback) {
      var a = _listeners[type], i = a && a.indexOf(callback);
      i >= 0 && a.splice(i, 1);
    },
    utils: {
      wrap,
      wrapYoyo,
      distribute,
      random,
      snap,
      normalize,
      getUnit,
      clamp,
      splitColor,
      toArray,
      selector,
      mapRange,
      pipe,
      unitize,
      interpolate,
      shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween,
      globals: _addGlobal,
      Tween,
      Timeline,
      Animation,
      getCache: _getCache,
      _removeLinkedListItem,
      reverting: function reverting() {
        return _reverting;
      },
      context: function context2(toAdd) {
        if (toAdd && _context) {
          _context.data.push(toAdd);
          toAdd._ctx = _context;
        }
        return _context;
      },
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };
  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
    return _gsap[name] = Tween[name];
  });
  _ticker.add(Timeline.updateRoot);
  _quickTween = _gsap.to({}, {
    duration: 0
  });
  var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
    var pt = plugin._pt;
    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }
    return pt;
  };
  var _addModifiers = function _addModifiers2(tween, modifiers) {
    var targets = tween._targets, p, i, pt;
    for (p in modifiers) {
      i = targets.length;
      while (i--) {
        pt = tween._ptLookup[i][p];
        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            pt = _getPluginPropTween(pt, p);
          }
          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  };
  var _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
    return {
      name,
      headless: 1,
      rawVars: 1,
      //don't pre-process function-based values or "random()" strings.
      init: function init4(target, vars, tween) {
        tween._onInit = function(tween2) {
          var temp, p;
          if (_isString(vars)) {
            temp = {};
            _forEachName(vars, function(name2) {
              return temp[name2] = 1;
            });
            vars = temp;
          }
          if (modifier) {
            temp = {};
            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }
            vars = temp;
          }
          _addModifiers(tween2, vars);
        };
      }
    };
  };
  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt, v;
      this.tween = tween;
      for (p in vars) {
        v = target.getAttribute(p) || "";
        pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
        pt.op = p;
        pt.b = v;
        this._props.push(p);
      }
    },
    render: function render(ratio, data) {
      var pt = data._pt;
      while (pt) {
        _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
        pt = pt._next;
      }
    }
  }, {
    name: "endArray",
    headless: 1,
    init: function init2(target, value) {
      var i = value.length;
      while (i--) {
        this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap.version = "3.13.0";
  _coreReady = 1;
  _windowExists() && _wake();
  var Power0 = _easeMap.Power0;
  var Power1 = _easeMap.Power1;
  var Power2 = _easeMap.Power2;
  var Power3 = _easeMap.Power3;
  var Power4 = _easeMap.Power4;
  var Linear = _easeMap.Linear;
  var Quad = _easeMap.Quad;
  var Cubic = _easeMap.Cubic;
  var Quart = _easeMap.Quart;
  var Quint = _easeMap.Quint;
  var Strong = _easeMap.Strong;
  var Elastic = _easeMap.Elastic;
  var Back = _easeMap.Back;
  var SteppedEase = _easeMap.SteppedEase;
  var Bounce = _easeMap.Bounce;
  var Sine = _easeMap.Sine;
  var Expo = _easeMap.Expo;
  var Circ = _easeMap.Circ;

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/CSSPlugin.js
  init_live_reload();
  var _win2;
  var _doc2;
  var _docElement;
  var _pluginInitted;
  var _tempDiv;
  var _tempDivStyler;
  var _recentSetterPlugin;
  var _reverting2;
  var _windowExists3 = function _windowExists4() {
    return typeof window !== "undefined";
  };
  var _transformProps = {};
  var _RAD2DEG = 180 / Math.PI;
  var _DEG2RAD = Math.PI / 180;
  var _atan2 = Math.atan2;
  var _bigNum2 = 1e8;
  var _capsExp = /([A-Z])/g;
  var _horizontalExp = /(left|right|width|margin|padding|x)/i;
  var _complexExp = /[\s,\(]\S/;
  var _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  };
  var _renderCSSProp = function _renderCSSProp2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
  };
  var _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
  };
  var _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  };
  var _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  };
  var _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
    return target.style[property] = value;
  };
  var _setterCSSProp = function _setterCSSProp2(target, property, value) {
    return target.style.setProperty(property, value);
  };
  var _setterTransform = function _setterTransform2(target, property, value) {
    return target._gsap[property] = value;
  };
  var _setterScale = function _setterScale2(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  };
  var _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  };
  var _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  };
  var _transformProp = "transform";
  var _transformOriginProp = _transformProp + "Origin";
  var _saveStyle = function _saveStyle2(property, isNotCSS) {
    var _this = this;
    var target = this.target, style = target.style, cache = target._gsap;
    if (property in _transformProps && style) {
      this.tfm = this.tfm || {};
      if (property !== "transform") {
        property = _propertyAliases[property] || property;
        ~property.indexOf(",") ? property.split(",").forEach(function(a) {
          return _this.tfm[a] = _get(target, a);
        }) : this.tfm[property] = cache.x ? cache[property] : _get(target, property);
        property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
      } else {
        return _propertyAliases.transform.split(",").forEach(function(p) {
          return _saveStyle2.call(_this, p, isNotCSS);
        });
      }
      if (this.props.indexOf(_transformProp) >= 0) {
        return;
      }
      if (cache.svg) {
        this.svgo = target.getAttribute("data-svg-origin");
        this.props.push(_transformOriginProp, isNotCSS, "");
      }
      property = _transformProp;
    }
    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
  };
  var _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
    if (style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  };
  var _revertStyle = function _revertStyle2() {
    var props = this.props, target = this.target, style = target.style, cache = target._gsap, i, p;
    for (i = 0; i < props.length; i += 3) {
      if (!props[i + 1]) {
        props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
      } else if (props[i + 1] === 2) {
        target[props[i]](props[i + 2]);
      } else {
        target[props[i]] = props[i + 2];
      }
    }
    if (this.tfm) {
      for (p in this.tfm) {
        cache[p] = this.tfm[p];
      }
      if (cache.svg) {
        cache.renderTransform();
        target.setAttribute("data-svg-origin", this.svgo || "");
      }
      i = _reverting2();
      if ((!i || !i.isStart) && !style[_transformProp]) {
        _removeIndependentTransforms(style);
        if (cache.zOrigin && style[_transformOriginProp]) {
          style[_transformOriginProp] += " " + cache.zOrigin + "px";
          cache.zOrigin = 0;
          cache.renderTransform();
        }
        cache.uncache = 1;
      }
    }
  };
  var _getStyleSaver = function _getStyleSaver2(target, properties) {
    var saver = {
      target,
      props: [],
      revert: _revertStyle,
      save: _saveStyle
    };
    target._gsap || gsap.core.getCache(target);
    properties && target.style && target.nodeType && properties.split(",").forEach(function(p) {
      return saver.save(p);
    });
    return saver;
  };
  var _supports3D;
  var _createElement = function _createElement2(type, ns) {
    var e = _doc2.createElementNS ? _doc2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
    return e && e.style ? e : _doc2.createElement(type);
  };
  var _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
  };
  var _prefixes = "O,Moz,ms,Ms,Webkit".split(",");
  var _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
    var e = element || _tempDiv, s = e.style, i = 5;
    if (property in s && !preferPrefix) {
      return property;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while (i-- && !(_prefixes[i] + property in s)) {
    }
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  };
  var _initCore = function _initCore2() {
    if (_windowExists3() && window.document) {
      _win2 = window;
      _doc2 = _win2.document;
      _docElement = _doc2.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
      _supports3D = !!_checkPropPrefix("perspective");
      _reverting2 = gsap.core.reverting;
      _pluginInitted = 1;
    }
  };
  var _getReparentedCloneBBox = function _getReparentedCloneBBox2(target) {
    var owner = target.ownerSVGElement, svg = _createElement("svg", owner && owner.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), clone = target.cloneNode(true), bbox;
    clone.style.display = "block";
    svg.appendChild(clone);
    _docElement.appendChild(svg);
    try {
      bbox = clone.getBBox();
    } catch (e) {
    }
    svg.removeChild(clone);
    _docElement.removeChild(svg);
    return bbox;
  };
  var _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
    var i = attributesArray.length;
    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  };
  var _getBBox = function _getBBox2(target) {
    var bounds, cloned;
    try {
      bounds = target.getBBox();
    } catch (error2) {
      bounds = _getReparentedCloneBBox(target);
      cloned = 1;
    }
    bounds && (bounds.width || bounds.height) || cloned || (bounds = _getReparentedCloneBBox(target));
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  };
  var _isSVG = function _isSVG2(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  };
  var _removeProperty = function _removeProperty2(target, property) {
    if (property) {
      var style = target.style, first2Chars;
      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }
      if (style.removeProperty) {
        first2Chars = property.substr(0, 2);
        if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
          property = "-" + property;
        }
        style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        style.removeAttribute(property);
      }
    }
  };
  var _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
  };
  var _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  };
  var _nonStandardLayouts = {
    grid: 1,
    flex: 1
  };
  var _convertToUnit = function _convertToUnit2(target, property, value, unit) {
    var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);
    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = unit !== "rem" && ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }
    if (!parent || parent === _doc2 || !parent.appendChild) {
      parent = _doc2.body;
    }
    cache = parent._gsap;
    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
      return _round(curValue / cache.width * amount);
    } else {
      if (toPercent && (property === "height" || property === "width")) {
        var v = target.style[property];
        target.style[property] = amount + unit;
        px = target[measureProperty];
        v ? target.style[property] = v : _removeProperty(target, property);
      } else {
        (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
        parent === target && (style.position = "static");
        parent.appendChild(_tempDiv);
        px = _tempDiv[measureProperty];
        parent.removeChild(_tempDiv);
        style.position = "absolute";
      }
      if (horizontal && toPercent) {
        cache = _getCache(parent);
        cache.time = _ticker.time;
        cache.width = parent[measureProperty];
      }
    }
    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  };
  var _get = function _get2(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();
    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];
      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }
    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];
      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
      }
    }
    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  };
  var _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
    if (!start || start === "none") {
      var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor");
      }
    }
    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (end.substring(0, 6) === "var(--") {
      end = _getComputedProperty(target, end.substring(4, end.indexOf(")")));
    }
    if (end === "auto") {
      startValue = target.style[prop];
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
    }
    a = [start, end];
    _colorStringFilter(a);
    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];
    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }
        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;
          if (!endUnit) {
            endUnit = endUnit || _config.units[prop] || startUnit;
            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }
          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          }
          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
            s: startNum,
            c: endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : "";
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }
    _relExp.test(end) && (pt.e = 0);
    this._pt = pt;
    return pt;
  };
  var _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  };
  var _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
    var split = value.split(" "), x = split[0], y = split[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      value = x;
      x = y;
      y = value;
    }
    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  };
  var _renderClearProps = function _renderClearProps2(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i;
      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;
        while (--i > -1) {
          prop = props[i];
          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }
          _removeProperty(target, prop);
        }
      }
      if (clearTransforms) {
        _removeProperty(target, _transformProp);
        if (cache) {
          cache.svg && target.removeAttribute("transform");
          style.scale = style.rotate = style.translate = "none";
          _parseTransform(target, 1);
          cache.uncache = 1;
          _removeIndependentTransforms(style);
        }
      }
    }
  };
  var _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;
        plugin._props.push(property);
        return 1;
      }
    }
    /* className feature (about 0.4kb gzipped).
    , className(plugin, target, property, endValue, tween) {
    	let _renderClassName = (ratio, data) => {
    			data.css.render(ratio, data.css);
    			if (!ratio || ratio === 1) {
    				let inline = data.rmv,
    					target = data.t,
    					p;
    				target.setAttribute("class", ratio ? data.e : data.b);
    				for (p in inline) {
    					_removeProperty(target, p);
    				}
    			}
    		},
    		_getAllStyles = (target) => {
    			let styles = {},
    				computed = getComputedStyle(target),
    				p;
    			for (p in computed) {
    				if (isNaN(p) && p !== "cssText" && p !== "length") {
    					styles[p] = computed[p];
    				}
    			}
    			_setDefaults(styles, _parseTransform(target, 1));
    			return styles;
    		},
    		startClassList = target.getAttribute("class"),
    		style = target.style,
    		cssText = style.cssText,
    		cache = target._gsap,
    		classPT = cache.classPT,
    		inlineToRemoveAtEnd = {},
    		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
    		changingVars = {},
    		startVars = _getAllStyles(target),
    		transformRelated = /(transform|perspective)/i,
    		endVars, p;
    	if (classPT) {
    		classPT.r(1, classPT.d);
    		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
    	}
    	target.setAttribute("class", data.e);
    	endVars = _getAllStyles(target, true);
    	target.setAttribute("class", startClassList);
    	for (p in endVars) {
    		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
    			changingVars[p] = endVars[p];
    			if (!style[p] && style[p] !== "0") {
    				inlineToRemoveAtEnd[p] = 1;
    			}
    		}
    	}
    	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
    	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
    		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
    	}
    	_parseTransform(target, true); //to clear the caching of transforms
    	data.css = new gsap.plugins.css();
    	data.css.init(target, changingVars, tween);
    	plugin._props.push(...data.css._props);
    	return 1;
    }
    */
  };
  var _identity2DMatrix = [1, 0, 0, 1, 0, 0];
  var _rotationalProperties = {};
  var _isNullTransform = function _isNullTransform2(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  };
  var _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
    var matrixString = _getComputedProperty(target, _transformProp);
    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  };
  var _getMatrix = function _getMatrix2(target, force2D) {
    var cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
    if (cache.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix;
      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;
      if (!parent || !target.offsetParent && !target.getBoundingClientRect().width) {
        addedToDOM = 1;
        nextSibling = target.nextElementSibling;
        _docElement.appendChild(target);
      }
      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");
      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }
    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  };
  var _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }
    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }
    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px";
    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  };
  var _parseTransform = function _parseTransform2(target, uncache) {
    var cache = target._gsap || new GSCache(target);
    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }
    var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    if (cs.translate) {
      if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
        style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
      }
      style.scale = style.rotate = style.translate = "none";
    }
    matrix = _getMatrix(target, cache.svg);
    if (cache.svg) {
      if (cache.uncache) {
        t2 = target.getBBox();
        origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
        t1 = "";
      } else {
        t1 = !uncache && target.getAttribute("data-svg-origin");
      }
      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }
    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;
    if (matrix !== _identity2DMatrix) {
      a = matrix[0];
      b = matrix[1];
      c = matrix[2];
      d = matrix[3];
      x = a12 = matrix[4];
      y = a22 = matrix[5];
      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        }
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }
        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        }
        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }
        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }
        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }
      if (cache.svg) {
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }
    uncache = uncache || cache.uncache;
    cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = _round(scaleX);
    cache.scaleY = _round(scaleY);
    cache.rotation = _round(rotation) + deg;
    cache.rotationX = _round(rotationX) + deg;
    cache.rotationY = _round(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;
    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }
    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  };
  var _firstTwoOnly = function _firstTwoOnly2(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  };
  var _addPxTranslate = function _addPxTranslate2(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  };
  var _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;
    _renderCSSTransforms(ratio, cache);
  };
  var _zeroDeg = "0deg";
  var _zeroPx = "0px";
  var _endParenthesis = ") ";
  var _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache) {
    var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }
    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }
    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }
    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }
    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }
    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }
    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }
    target.style[_transformProp] = transforms || "translate(0, 0)";
  };
  var _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache) {
    var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }
    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;
      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;
        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }
      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp);
  };
  var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
    var cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
    if (isString) {
      direction = endValue.split("_")[1];
      if (direction === "short") {
        change %= cap;
        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }
      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum2) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum2) % cap - ~~(change / cap) * cap;
      }
    }
    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
  };
  var _assign = function _assign2(target, source) {
    for (var p in source) {
      target[p] = source[p];
    }
    return target;
  };
  var _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
    var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      _removeProperty(target, _transformProp);
      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }
    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];
      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;
        plugin._props.push(p);
      }
    }
    _assign(endCache, startCache);
  };
  _forEachName("padding,margin,Width,Radius", function(name, index) {
    var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function(side) {
      return index < 2 ? name + side : "border" + side + name;
    });
    _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
      var a, vars;
      if (arguments.length < 4) {
        a = props.map(function(prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }
      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function(prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });
  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init3(target, vars, tween, index, targets) {
      var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps;
      _pluginInitted || _initCore();
      this.styles = this.styles || _getStyleSaver(target);
      inlineProps = this.styles.props;
      this.tween = tween;
      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }
        endValue = vars[p];
        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }
        type = typeof endValue;
        specialProp = _specialProps[p];
        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }
        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }
        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;
          if (!_colorExp.test(startValue)) {
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
          props.push(p);
          inlineProps.push(p, 0, style[p]);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
            getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
            (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
          } else {
            startValue = _get(target, p);
          }
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);
          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }
              inlineProps.push("visibility", 0, style.visibility);
              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }
            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }
          isTransformRelated = p in _transformProps;
          if (isTransformRelated) {
            this.styles.save(p);
            if (type === "string" && endValue.substring(0, 6) === "var(--") {
              endValue = _getComputedProperty(target, endValue.substring(4, endValue.indexOf(")")));
              endNum = parseFloat(endValue);
            }
            if (!transformPropTween) {
              cache = target._gsap;
              cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
              smooth = vars.smoothOrigin !== false && cache.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
              transformPropTween.dep = 1;
            }
            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
              this._pt.u = 0;
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
              endValue = _convertKeywordsToPercentages(endValue);
              if (cache.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }
              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);
              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
              continue;
            } else if (p === "force3D") {
              cache[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);
              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }
          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;
            if (startUnit !== endUnit && endUnit !== "%") {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
            } else if (p !== "parseTransform") {
              _missingPlugin(p, endValue);
              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
          }
          isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : typeof target[p] === "function" ? inlineProps.push(p, 2, target[p]()) : inlineProps.push(p, 1, startValue || target[p]));
          props.push(p);
        }
      }
      hasPriority && _sortPropTweensByPriority(this);
    },
    render: function render2(ratio, data) {
      if (data.tween._time || !_reverting2()) {
        var pt = data._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
      } else {
        data.styles.revert();
      }
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty,
      _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;
  gsap.core.getStyleSaver = _getStyleSaver;
  (function(positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
      _transformProps[name] = 1;
    });
    _forEachName(rotation, function(name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });
    _propertyAliases[all[13]] = positionAndScale + "," + rotation;
    _forEachName(aliases, function(name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
    _config.units[name] = "px";
  });
  gsap.registerPlugin(CSSPlugin);

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/index.js
  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
  var TweenMaxWithCSS = gsapWithCSS.core.Tween;

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/ScrollTrigger.js
  init_live_reload();

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/Observer.js
  init_live_reload();
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var gsap2;
  var _coreInitted2;
  var _clamp3;
  var _win3;
  var _doc3;
  var _docEl;
  var _body;
  var _isTouch;
  var _pointerType;
  var ScrollTrigger;
  var _root;
  var _normalizer;
  var _eventTypes;
  var _context2;
  var _getGSAP = function _getGSAP2() {
    return gsap2 || typeof window !== "undefined" && (gsap2 = window.gsap) && gsap2.registerPlugin && gsap2;
  };
  var _startup = 1;
  var _observers = [];
  var _scrollers = [];
  var _proxies = [];
  var _getTime = Date.now;
  var _bridge = function _bridge2(name, value) {
    return value;
  };
  var _integrate = function _integrate2() {
    var core = ScrollTrigger.core, data = core.bridge || {}, scrollers = core._scrollers, proxies = core._proxies;
    scrollers.push.apply(scrollers, _scrollers);
    proxies.push.apply(proxies, _proxies);
    _scrollers = scrollers;
    _proxies = proxies;
    _bridge = function _bridge3(name, value) {
      return data[name](value);
    };
  };
  var _getProxyProp = function _getProxyProp2(element, property) {
    return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
  };
  var _isViewport = function _isViewport2(el) {
    return !!~_root.indexOf(el);
  };
  var _addListener = function _addListener2(element, type, func, passive, capture) {
    return element.addEventListener(type, func, {
      passive: passive !== false,
      capture: !!capture
    });
  };
  var _removeListener = function _removeListener2(element, type, func, capture) {
    return element.removeEventListener(type, func, !!capture);
  };
  var _scrollLeft = "scrollLeft";
  var _scrollTop = "scrollTop";
  var _onScroll = function _onScroll2() {
    return _normalizer && _normalizer.isPressed || _scrollers.cache++;
  };
  var _scrollCacheFunc = function _scrollCacheFunc2(f, doNotCache) {
    var cachingFunc = function cachingFunc2(value) {
      if (value || value === 0) {
        _startup && (_win3.history.scrollRestoration = "manual");
        var isNormalizing = _normalizer && _normalizer.isPressed;
        value = cachingFunc2.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0);
        f(value);
        cachingFunc2.cacheID = _scrollers.cache;
        isNormalizing && _bridge("ss", value);
      } else if (doNotCache || _scrollers.cache !== cachingFunc2.cacheID || _bridge("ref")) {
        cachingFunc2.cacheID = _scrollers.cache;
        cachingFunc2.v = f();
      }
      return cachingFunc2.v + cachingFunc2.offset;
    };
    cachingFunc.offset = 0;
    return f && cachingFunc;
  };
  var _horizontal = {
    s: _scrollLeft,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: _scrollCacheFunc(function(value) {
      return arguments.length ? _win3.scrollTo(value, _vertical.sc()) : _win3.pageXOffset || _doc3[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
    })
  };
  var _vertical = {
    s: _scrollTop,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: _horizontal,
    sc: _scrollCacheFunc(function(value) {
      return arguments.length ? _win3.scrollTo(_horizontal.sc(), value) : _win3.pageYOffset || _doc3[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
    })
  };
  var _getTarget = function _getTarget2(t, self) {
    return (self && self._ctx && self._ctx.selector || gsap2.utils.toArray)(t)[0] || (typeof t === "string" && gsap2.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
  };
  var _isWithin = function _isWithin2(element, list) {
    var i = list.length;
    while (i--) {
      if (list[i] === element || list[i].contains(element)) {
        return true;
      }
    }
    return false;
  };
  var _getScrollFunc = function _getScrollFunc2(element, _ref) {
    var s = _ref.s, sc = _ref.sc;
    _isViewport(element) && (element = _doc3.scrollingElement || _docEl);
    var i = _scrollers.indexOf(element), offset = sc === _vertical.sc ? 1 : 2;
    !~i && (i = _scrollers.push(element) - 1);
    _scrollers[i + offset] || _addListener(element, "scroll", _onScroll);
    var prev = _scrollers[i + offset], func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport(element) ? sc : _scrollCacheFunc(function(value) {
      return arguments.length ? element[s] = value : element[s];
    })));
    func.target = element;
    prev || (func.smooth = gsap2.getProperty(element, "scrollBehavior") === "smooth");
    return func;
  };
  var _getVelocityProp = function _getVelocityProp2(value, minTimeRefresh, useDelta) {
    var v1 = value, v2 = value, t1 = _getTime(), t2 = t1, min = minTimeRefresh || 50, dropToZeroTime = Math.max(500, min * 3), update = function update2(value2, force) {
      var t = _getTime();
      if (force || t - t1 > min) {
        v2 = v1;
        v1 = value2;
        t2 = t1;
        t1 = t;
      } else if (useDelta) {
        v1 += value2;
      } else {
        v1 = v2 + (value2 - v2) / (t - t2) * (t1 - t2);
      }
    }, reset = function reset2() {
      v2 = v1 = useDelta ? 0 : v1;
      t2 = t1 = 0;
    }, getVelocity = function getVelocity2(latestValue) {
      var tOld = t2, vOld = v2, t = _getTime();
      (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
      return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1e3;
    };
    return {
      update,
      reset,
      getVelocity
    };
  };
  var _getEvent = function _getEvent2(e, preventDefault) {
    preventDefault && !e._gsapAllow && e.preventDefault();
    return e.changedTouches ? e.changedTouches[0] : e;
  };
  var _getAbsoluteMax = function _getAbsoluteMax2(a) {
    var max = Math.max.apply(Math, a), min = Math.min.apply(Math, a);
    return Math.abs(max) >= Math.abs(min) ? max : min;
  };
  var _setScrollTrigger = function _setScrollTrigger2() {
    ScrollTrigger = gsap2.core.globals().ScrollTrigger;
    ScrollTrigger && ScrollTrigger.core && _integrate();
  };
  var _initCore3 = function _initCore4(core) {
    gsap2 = core || _getGSAP();
    if (!_coreInitted2 && gsap2 && typeof document !== "undefined" && document.body) {
      _win3 = window;
      _doc3 = document;
      _docEl = _doc3.documentElement;
      _body = _doc3.body;
      _root = [_win3, _doc3, _docEl, _body];
      _clamp3 = gsap2.utils.clamp;
      _context2 = gsap2.core.context || function() {
      };
      _pointerType = "onpointerenter" in _body ? "pointer" : "mouse";
      _isTouch = Observer.isTouch = _win3.matchMedia && _win3.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win3 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
      _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
      setTimeout(function() {
        return _startup = 0;
      }, 500);
      _setScrollTrigger();
      _coreInitted2 = 1;
    }
    return _coreInitted2;
  };
  _horizontal.op = _vertical;
  _scrollers.cache = 0;
  var Observer = /* @__PURE__ */ function() {
    function Observer2(vars) {
      this.init(vars);
    }
    var _proto = Observer2.prototype;
    _proto.init = function init4(vars) {
      _coreInitted2 || _initCore3(gsap2) || console.warn("Please gsap.registerPlugin(Observer)");
      ScrollTrigger || _setScrollTrigger();
      var tolerance = vars.tolerance, dragMinimum = vars.dragMinimum, type = vars.type, target = vars.target, lineHeight = vars.lineHeight, debounce = vars.debounce, preventDefault = vars.preventDefault, onStop = vars.onStop, onStopDelay = vars.onStopDelay, ignore = vars.ignore, wheelSpeed = vars.wheelSpeed, event = vars.event, onDragStart = vars.onDragStart, onDragEnd = vars.onDragEnd, onDrag = vars.onDrag, onPress = vars.onPress, onRelease = vars.onRelease, onRight = vars.onRight, onLeft = vars.onLeft, onUp = vars.onUp, onDown = vars.onDown, onChangeX = vars.onChangeX, onChangeY = vars.onChangeY, onChange = vars.onChange, onToggleX = vars.onToggleX, onToggleY = vars.onToggleY, onHover = vars.onHover, onHoverEnd = vars.onHoverEnd, onMove = vars.onMove, ignoreCheck = vars.ignoreCheck, isNormalizer = vars.isNormalizer, onGestureStart = vars.onGestureStart, onGestureEnd = vars.onGestureEnd, onWheel = vars.onWheel, onEnable = vars.onEnable, onDisable = vars.onDisable, onClick = vars.onClick, scrollSpeed = vars.scrollSpeed, capture = vars.capture, allowClicks = vars.allowClicks, lockAxis = vars.lockAxis, onLockAxis = vars.onLockAxis;
      this.target = target = _getTarget(target) || _docEl;
      this.vars = vars;
      ignore && (ignore = gsap2.utils.toArray(ignore));
      tolerance = tolerance || 1e-9;
      dragMinimum = dragMinimum || 0;
      wheelSpeed = wheelSpeed || 1;
      scrollSpeed = scrollSpeed || 1;
      type = type || "wheel,touch,pointer";
      debounce = debounce !== false;
      lineHeight || (lineHeight = parseFloat(_win3.getComputedStyle(_body).lineHeight) || 22);
      var id, onStopDelayedCall, dragged, moved, wheeled, locked, axis, self = this, prevDeltaX = 0, prevDeltaY = 0, passive = vars.passive || !preventDefault && vars.passive !== false, scrollFuncX = _getScrollFunc(target, _horizontal), scrollFuncY = _getScrollFunc(target, _vertical), scrollX = scrollFuncX(), scrollY = scrollFuncY(), limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown", isViewport = _isViewport(target), ownerDoc = target.ownerDocument || _doc3, deltaX = [0, 0, 0], deltaY = [0, 0, 0], onClickTime = 0, clickCapture = function clickCapture2() {
        return onClickTime = _getTime();
      }, _ignoreCheck = function _ignoreCheck2(e, isPointerOrTouch) {
        return (self.event = e) && ignore && _isWithin(e.target, ignore) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
      }, onStopFunc = function onStopFunc2() {
        self._vx.reset();
        self._vy.reset();
        onStopDelayedCall.pause();
        onStop && onStop(self);
      }, update = function update2() {
        var dx = self.deltaX = _getAbsoluteMax(deltaX), dy = self.deltaY = _getAbsoluteMax(deltaY), changedX = Math.abs(dx) >= tolerance, changedY = Math.abs(dy) >= tolerance;
        onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);
        if (changedX) {
          onRight && self.deltaX > 0 && onRight(self);
          onLeft && self.deltaX < 0 && onLeft(self);
          onChangeX && onChangeX(self);
          onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
          prevDeltaX = self.deltaX;
          deltaX[0] = deltaX[1] = deltaX[2] = 0;
        }
        if (changedY) {
          onDown && self.deltaY > 0 && onDown(self);
          onUp && self.deltaY < 0 && onUp(self);
          onChangeY && onChangeY(self);
          onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
          prevDeltaY = self.deltaY;
          deltaY[0] = deltaY[1] = deltaY[2] = 0;
        }
        if (moved || dragged) {
          onMove && onMove(self);
          if (dragged) {
            onDragStart && dragged === 1 && onDragStart(self);
            onDrag && onDrag(self);
            dragged = 0;
          }
          moved = false;
        }
        locked && !(locked = false) && onLockAxis && onLockAxis(self);
        if (wheeled) {
          onWheel(self);
          wheeled = false;
        }
        id = 0;
      }, onDelta = function onDelta2(x, y, index) {
        deltaX[index] += x;
        deltaY[index] += y;
        self._vx.update(x);
        self._vy.update(y);
        debounce ? id || (id = requestAnimationFrame(update)) : update();
      }, onTouchOrPointerDelta = function onTouchOrPointerDelta2(x, y) {
        if (lockAxis && !axis) {
          self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
          locked = true;
        }
        if (axis !== "y") {
          deltaX[2] += x;
          self._vx.update(x, true);
        }
        if (axis !== "x") {
          deltaY[2] += y;
          self._vy.update(y, true);
        }
        debounce ? id || (id = requestAnimationFrame(update)) : update();
      }, _onDrag = function _onDrag2(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }
        e = _getEvent(e, preventDefault);
        var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y, isDragging = self.isDragging;
        self.x = x;
        self.y = y;
        if (isDragging || (dx || dy) && (Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum)) {
          dragged = isDragging ? 2 : 1;
          isDragging || (self.isDragging = true);
          onTouchOrPointerDelta(dx, dy);
        }
      }, _onPress = self.onPress = function(e) {
        if (_ignoreCheck(e, 1) || e && e.button) {
          return;
        }
        self.axis = axis = null;
        onStopDelayedCall.pause();
        self.isPressed = true;
        e = _getEvent(e);
        prevDeltaX = prevDeltaY = 0;
        self.startX = self.x = e.clientX;
        self.startY = self.y = e.clientY;
        self._vx.reset();
        self._vy.reset();
        _addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, passive, true);
        self.deltaX = self.deltaY = 0;
        onPress && onPress(self);
      }, _onRelease = self.onRelease = function(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }
        _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
        var isTrackingDrag = !isNaN(self.y - self.startY), wasDragging = self.isDragging, isDragNotClick = wasDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3), eventData = _getEvent(e);
        if (!isDragNotClick && isTrackingDrag) {
          self._vx.reset();
          self._vy.reset();
          if (preventDefault && allowClicks) {
            gsap2.delayedCall(0.08, function() {
              if (_getTime() - onClickTime > 300 && !e.defaultPrevented) {
                if (e.target.click) {
                  e.target.click();
                } else if (ownerDoc.createEvent) {
                  var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                  syntheticEvent.initMouseEvent("click", true, true, _win3, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                  e.target.dispatchEvent(syntheticEvent);
                }
              }
            });
          }
        }
        self.isDragging = self.isGesturing = self.isPressed = false;
        onStop && wasDragging && !isNormalizer && onStopDelayedCall.restart(true);
        dragged && update();
        onDragEnd && wasDragging && onDragEnd(self);
        onRelease && onRelease(self, isDragNotClick);
      }, _onGestureStart = function _onGestureStart2(e) {
        return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
      }, _onGestureEnd = function _onGestureEnd2() {
        return (self.isGesturing = false) || onGestureEnd(self);
      }, onScroll = function onScroll2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        var x = scrollFuncX(), y = scrollFuncY();
        onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
        scrollX = x;
        scrollY = y;
        onStop && onStopDelayedCall.restart(true);
      }, _onWheel = function _onWheel2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        e = _getEvent(e, preventDefault);
        onWheel && (wheeled = true);
        var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win3.innerHeight : 1) * wheelSpeed;
        onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
        onStop && !isNormalizer && onStopDelayedCall.restart(true);
      }, _onMove = function _onMove2(e) {
        if (_ignoreCheck(e)) {
          return;
        }
        var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y;
        self.x = x;
        self.y = y;
        moved = true;
        onStop && onStopDelayedCall.restart(true);
        (dx || dy) && onTouchOrPointerDelta(dx, dy);
      }, _onHover = function _onHover2(e) {
        self.event = e;
        onHover(self);
      }, _onHoverEnd = function _onHoverEnd2(e) {
        self.event = e;
        onHoverEnd(self);
      }, _onClick = function _onClick2(e) {
        return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
      };
      onStopDelayedCall = self._dc = gsap2.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
      self.deltaX = self.deltaY = 0;
      self._vx = _getVelocityProp(0, 50, true);
      self._vy = _getVelocityProp(0, 50, true);
      self.scrollX = scrollFuncX;
      self.scrollY = scrollFuncY;
      self.isDragging = self.isGesturing = self.isPressed = false;
      _context2(this);
      self.enable = function(e) {
        if (!self.isEnabled) {
          _addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          type.indexOf("scroll") >= 0 && _addListener(isViewport ? ownerDoc : target, "scroll", onScroll, passive, capture);
          type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, passive, capture);
          if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
            _addListener(target, _eventTypes[0], _onPress, passive, capture);
            _addListener(ownerDoc, _eventTypes[2], _onRelease);
            _addListener(ownerDoc, _eventTypes[3], _onRelease);
            allowClicks && _addListener(target, "click", clickCapture, true, true);
            onClick && _addListener(target, "click", _onClick);
            onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
            onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
            onHover && _addListener(target, _pointerType + "enter", _onHover);
            onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
            onMove && _addListener(target, _pointerType + "move", _onMove);
          }
          self.isEnabled = true;
          self.isDragging = self.isGesturing = self.isPressed = moved = dragged = false;
          self._vx.reset();
          self._vy.reset();
          scrollX = scrollFuncX();
          scrollY = scrollFuncY();
          e && e.type && _onPress(e);
          onEnable && onEnable(self);
        }
        return self;
      };
      self.disable = function() {
        if (self.isEnabled) {
          _observers.filter(function(o) {
            return o !== self && _isViewport(o.target);
          }).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);
          if (self.isPressed) {
            self._vx.reset();
            self._vy.reset();
            _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
          }
          _removeListener(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
          _removeListener(target, "wheel", _onWheel, capture);
          _removeListener(target, _eventTypes[0], _onPress, capture);
          _removeListener(ownerDoc, _eventTypes[2], _onRelease);
          _removeListener(ownerDoc, _eventTypes[3], _onRelease);
          _removeListener(target, "click", clickCapture, true);
          _removeListener(target, "click", _onClick);
          _removeListener(ownerDoc, "gesturestart", _onGestureStart);
          _removeListener(ownerDoc, "gestureend", _onGestureEnd);
          _removeListener(target, _pointerType + "enter", _onHover);
          _removeListener(target, _pointerType + "leave", _onHoverEnd);
          _removeListener(target, _pointerType + "move", _onMove);
          self.isEnabled = self.isPressed = self.isDragging = false;
          onDisable && onDisable(self);
        }
      };
      self.kill = self.revert = function() {
        self.disable();
        var i = _observers.indexOf(self);
        i >= 0 && _observers.splice(i, 1);
        _normalizer === self && (_normalizer = 0);
      };
      _observers.push(self);
      isNormalizer && _isViewport(target) && (_normalizer = self);
      self.enable(event);
    };
    _createClass(Observer2, [{
      key: "velocityX",
      get: function get() {
        return this._vx.getVelocity();
      }
    }, {
      key: "velocityY",
      get: function get() {
        return this._vy.getVelocity();
      }
    }]);
    return Observer2;
  }();
  Observer.version = "3.13.0";
  Observer.create = function(vars) {
    return new Observer(vars);
  };
  Observer.register = _initCore3;
  Observer.getAll = function() {
    return _observers.slice();
  };
  Observer.getById = function(id) {
    return _observers.filter(function(o) {
      return o.vars.id === id;
    })[0];
  };
  _getGSAP() && gsap2.registerPlugin(Observer);

  // node_modules/.pnpm/gsap@3.13.0/node_modules/gsap/ScrollTrigger.js
  var gsap3;
  var _coreInitted3;
  var _win4;
  var _doc4;
  var _docEl2;
  var _body2;
  var _root2;
  var _resizeDelay;
  var _toArray;
  var _clamp4;
  var _time2;
  var _syncInterval;
  var _refreshing;
  var _pointerIsDown;
  var _transformProp2;
  var _i;
  var _prevWidth;
  var _prevHeight;
  var _autoRefresh;
  var _sort;
  var _suppressOverwrites2;
  var _ignoreResize;
  var _normalizer2;
  var _ignoreMobileResize;
  var _baseScreenHeight;
  var _baseScreenWidth;
  var _fixIOSBug;
  var _context3;
  var _scrollRestoration;
  var _div100vh;
  var _100vh;
  var _isReverted;
  var _clampingMax;
  var _limitCallbacks;
  var _startup2 = 1;
  var _getTime2 = Date.now;
  var _time1 = _getTime2();
  var _lastScrollTime = 0;
  var _enabled = 0;
  var _parseClamp = function _parseClamp2(value, type, self) {
    var clamp3 = _isString3(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
    self["_" + type + "Clamp"] = clamp3;
    return clamp3 ? value.substr(6, value.length - 7) : value;
  };
  var _keepClamp = function _keepClamp2(value, clamp3) {
    return clamp3 && (!_isString3(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
  };
  var _rafBugFix = function _rafBugFix2() {
    return _enabled && requestAnimationFrame(_rafBugFix2);
  };
  var _pointerDownHandler = function _pointerDownHandler2() {
    return _pointerIsDown = 1;
  };
  var _pointerUpHandler = function _pointerUpHandler2() {
    return _pointerIsDown = 0;
  };
  var _passThrough3 = function _passThrough4(v) {
    return v;
  };
  var _round3 = function _round4(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _windowExists5 = function _windowExists6() {
    return typeof window !== "undefined";
  };
  var _getGSAP3 = function _getGSAP4() {
    return gsap3 || _windowExists5() && (gsap3 = window.gsap) && gsap3.registerPlugin && gsap3;
  };
  var _isViewport3 = function _isViewport4(e) {
    return !!~_root2.indexOf(e);
  };
  var _getViewportDimension = function _getViewportDimension2(dimensionProperty) {
    return (dimensionProperty === "Height" ? _100vh : _win4["inner" + dimensionProperty]) || _docEl2["client" + dimensionProperty] || _body2["client" + dimensionProperty];
  };
  var _getBoundsFunc = function _getBoundsFunc2(element) {
    return _getProxyProp(element, "getBoundingClientRect") || (_isViewport3(element) ? function() {
      _winOffsets.width = _win4.innerWidth;
      _winOffsets.height = _100vh;
      return _winOffsets;
    } : function() {
      return _getBounds(element);
    });
  };
  var _getSizeFunc = function _getSizeFunc2(scroller, isViewport, _ref) {
    var d = _ref.d, d2 = _ref.d2, a = _ref.a;
    return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
      return a()[d];
    } : function() {
      return (isViewport ? _getViewportDimension(d2) : scroller["client" + d2]) || 0;
    };
  };
  var _getOffsetsFunc = function _getOffsetsFunc2(element, isViewport) {
    return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function() {
      return _winOffsets;
    };
  };
  var _maxScroll = function _maxScroll2(element, _ref2) {
    var s = _ref2.s, d2 = _ref2.d2, d = _ref2.d, a = _ref2.a;
    return Math.max(0, (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport3(element) ? (_docEl2[s] || _body2[s]) - _getViewportDimension(d2) : element[s] - element["offset" + d2]);
  };
  var _iterateAutoRefresh = function _iterateAutoRefresh2(func, events) {
    for (var i = 0; i < _autoRefresh.length; i += 3) {
      (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
    }
  };
  var _isString3 = function _isString4(value) {
    return typeof value === "string";
  };
  var _isFunction3 = function _isFunction4(value) {
    return typeof value === "function";
  };
  var _isNumber3 = function _isNumber4(value) {
    return typeof value === "number";
  };
  var _isObject3 = function _isObject4(value) {
    return typeof value === "object";
  };
  var _endAnimation = function _endAnimation2(animation, reversed, pause) {
    return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
  };
  var _callback3 = function _callback4(self, func) {
    if (self.enabled) {
      var result = self._ctx ? self._ctx.add(function() {
        return func(self);
      }) : func(self);
      result && result.totalTime && (self.callbackAnimation = result);
    }
  };
  var _abs = Math.abs;
  var _left = "left";
  var _top = "top";
  var _right = "right";
  var _bottom = "bottom";
  var _width = "width";
  var _height = "height";
  var _Right = "Right";
  var _Left = "Left";
  var _Top = "Top";
  var _Bottom = "Bottom";
  var _padding = "padding";
  var _margin = "margin";
  var _Width = "Width";
  var _Height = "Height";
  var _px = "px";
  var _getComputedStyle = function _getComputedStyle2(element) {
    return _win4.getComputedStyle(element);
  };
  var _makePositionable = function _makePositionable2(element) {
    var position = _getComputedStyle(element).position;
    element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
  };
  var _setDefaults3 = function _setDefaults4(obj, defaults2) {
    for (var p in defaults2) {
      p in obj || (obj[p] = defaults2[p]);
    }
    return obj;
  };
  var _getBounds = function _getBounds2(element, withoutTransforms) {
    var tween = withoutTransforms && _getComputedStyle(element)[_transformProp2] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap3.to(element, {
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0
    }).progress(1), bounds = element.getBoundingClientRect();
    tween && tween.progress(0).kill();
    return bounds;
  };
  var _getSize = function _getSize2(element, _ref3) {
    var d2 = _ref3.d2;
    return element["offset" + d2] || element["client" + d2] || 0;
  };
  var _getLabelRatioArray = function _getLabelRatioArray2(timeline2) {
    var a = [], labels = timeline2.labels, duration = timeline2.duration(), p;
    for (p in labels) {
      a.push(labels[p] / duration);
    }
    return a;
  };
  var _getClosestLabel = function _getClosestLabel2(animation) {
    return function(value) {
      return gsap3.utils.snap(_getLabelRatioArray(animation), value);
    };
  };
  var _snapDirectional = function _snapDirectional2(snapIncrementOrArray) {
    var snap3 = gsap3.utils.snap(snapIncrementOrArray), a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function(a2, b) {
      return a2 - b;
    });
    return a ? function(value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }
      var i;
      if (!direction) {
        return snap3(value);
      }
      if (direction > 0) {
        value -= threshold;
        for (i = 0; i < a.length; i++) {
          if (a[i] >= value) {
            return a[i];
          }
        }
        return a[i - 1];
      } else {
        i = a.length;
        value += threshold;
        while (i--) {
          if (a[i] <= value) {
            return a[i];
          }
        }
      }
      return a[0];
    } : function(value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }
      var snapped = snap3(value);
      return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap3(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
    };
  };
  var _getLabelAtDirection = function _getLabelAtDirection2(timeline2) {
    return function(value, st) {
      return _snapDirectional(_getLabelRatioArray(timeline2))(value, st.direction);
    };
  };
  var _multiListener = function _multiListener2(func, element, types, callback) {
    return types.split(",").forEach(function(type) {
      return func(element, type, callback);
    });
  };
  var _addListener3 = function _addListener4(element, type, func, nonPassive, capture) {
    return element.addEventListener(type, func, {
      passive: !nonPassive,
      capture: !!capture
    });
  };
  var _removeListener3 = function _removeListener4(element, type, func, capture) {
    return element.removeEventListener(type, func, !!capture);
  };
  var _wheelListener = function _wheelListener2(func, el, scrollFunc) {
    scrollFunc = scrollFunc && scrollFunc.wheelHandler;
    if (scrollFunc) {
      func(el, "wheel", scrollFunc);
      func(el, "touchmove", scrollFunc);
    }
  };
  var _markerDefaults = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal"
  };
  var _defaults2 = {
    toggleActions: "play",
    anticipatePin: 0
  };
  var _keywords = {
    top: 0,
    left: 0,
    center: 0.5,
    bottom: 1,
    right: 1
  };
  var _offsetToPx = function _offsetToPx2(value, size) {
    if (_isString3(value)) {
      var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
      if (~eqIndex) {
        value.indexOf("%") > eqIndex && (relative *= size / 100);
        value = value.substr(0, eqIndex - 1);
      }
      value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
    }
    return value;
  };
  var _createMarker = function _createMarker2(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
    var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
    var e = _doc4.createElement("div"), useFixedPosition = _isViewport3(container) || _getProxyProp(container, "pinType") === "fixed", isScroller = type.indexOf("scroller") !== -1, parent = useFixedPosition ? _body2 : container, isStart = type.indexOf("start") !== -1, color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
    (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
    matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
    e._isStart = isStart;
    e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
    e.style.cssText = css;
    e.innerText = name || name === 0 ? type + "-" + name : type;
    parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
    e._offset = e["offset" + direction.op.d2];
    _positionMarker(e, 0, direction, isStart);
    return e;
  };
  var _positionMarker = function _positionMarker2(marker, start, direction, flipped) {
    var vars = {
      display: "block"
    }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
    marker._isFlipped = flipped;
    vars[direction.a + "Percent"] = flipped ? -100 : 0;
    vars[direction.a] = flipped ? "1px" : 0;
    vars["border" + side + _Width] = 1;
    vars["border" + oppositeSide + _Width] = 0;
    vars[direction.p] = start + "px";
    gsap3.set(marker, vars);
  };
  var _triggers = [];
  var _ids = {};
  var _rafID;
  var _sync = function _sync2() {
    return _getTime2() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
  };
  var _onScroll3 = function _onScroll4() {
    if (!_normalizer2 || !_normalizer2.isPressed || _normalizer2.startX > _body2.clientWidth) {
      _scrollers.cache++;
      if (_normalizer2) {
        _rafID || (_rafID = requestAnimationFrame(_updateAll));
      } else {
        _updateAll();
      }
      _lastScrollTime || _dispatch3("scrollStart");
      _lastScrollTime = _getTime2();
    }
  };
  var _setBaseDimensions = function _setBaseDimensions2() {
    _baseScreenWidth = _win4.innerWidth;
    _baseScreenHeight = _win4.innerHeight;
  };
  var _onResize = function _onResize2(force) {
    _scrollers.cache++;
    (force === true || !_refreshing && !_ignoreResize && !_doc4.fullscreenElement && !_doc4.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win4.innerWidth || Math.abs(_win4.innerHeight - _baseScreenHeight) > _win4.innerHeight * 0.25)) && _resizeDelay.restart(true);
  };
  var _listeners2 = {};
  var _emptyArray2 = [];
  var _softRefresh = function _softRefresh2() {
    return _removeListener3(ScrollTrigger2, "scrollEnd", _softRefresh2) || _refreshAll(true);
  };
  var _dispatch3 = function _dispatch4(type) {
    return _listeners2[type] && _listeners2[type].map(function(f) {
      return f();
    }) || _emptyArray2;
  };
  var _savedStyles = [];
  var _revertRecorded = function _revertRecorded2(media) {
    for (var i = 0; i < _savedStyles.length; i += 5) {
      if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
        _savedStyles[i].style.cssText = _savedStyles[i + 1];
        _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
        _savedStyles[i + 3].uncache = 1;
      }
    }
  };
  var _revertAll = function _revertAll2(kill, media) {
    var trigger;
    for (_i = 0; _i < _triggers.length; _i++) {
      trigger = _triggers[_i];
      if (trigger && (!media || trigger._ctx === media)) {
        if (kill) {
          trigger.kill(1);
        } else {
          trigger.revert(true, true);
        }
      }
    }
    _isReverted = true;
    media && _revertRecorded(media);
    media || _dispatch3("revert");
  };
  var _clearScrollMemory = function _clearScrollMemory2(scrollRestoration, force) {
    _scrollers.cache++;
    (force || !_refreshingAll) && _scrollers.forEach(function(obj) {
      return _isFunction3(obj) && obj.cacheID++ && (obj.rec = 0);
    });
    _isString3(scrollRestoration) && (_win4.history.scrollRestoration = _scrollRestoration = scrollRestoration);
  };
  var _refreshingAll;
  var _refreshID = 0;
  var _queueRefreshID;
  var _queueRefreshAll = function _queueRefreshAll2() {
    if (_queueRefreshID !== _refreshID) {
      var id = _queueRefreshID = _refreshID;
      requestAnimationFrame(function() {
        return id === _refreshID && _refreshAll(true);
      });
    }
  };
  var _refresh100vh = function _refresh100vh2() {
    _body2.appendChild(_div100vh);
    _100vh = !_normalizer2 && _div100vh.offsetHeight || _win4.innerHeight;
    _body2.removeChild(_div100vh);
  };
  var _hideAllMarkers = function _hideAllMarkers2(hide) {
    return _toArray(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(el) {
      return el.style.display = hide ? "none" : "block";
    });
  };
  var _refreshAll = function _refreshAll2(force, skipRevert) {
    _docEl2 = _doc4.documentElement;
    _body2 = _doc4.body;
    _root2 = [_win4, _doc4, _docEl2, _body2];
    if (_lastScrollTime && !force && !_isReverted) {
      _addListener3(ScrollTrigger2, "scrollEnd", _softRefresh);
      return;
    }
    _refresh100vh();
    _refreshingAll = ScrollTrigger2.isRefreshing = true;
    _scrollers.forEach(function(obj) {
      return _isFunction3(obj) && ++obj.cacheID && (obj.rec = obj());
    });
    var refreshInits = _dispatch3("refreshInit");
    _sort && ScrollTrigger2.sort();
    skipRevert || _revertAll();
    _scrollers.forEach(function(obj) {
      if (_isFunction3(obj)) {
        obj.smooth && (obj.target.style.scrollBehavior = "auto");
        obj(0);
      }
    });
    _triggers.slice(0).forEach(function(t) {
      return t.refresh();
    });
    _isReverted = false;
    _triggers.forEach(function(t) {
      if (t._subPinOffset && t.pin) {
        var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t.pin[prop];
        t.revert(true, 1);
        t.adjustPinSpacing(t.pin[prop] - original);
        t.refresh();
      }
    });
    _clampingMax = 1;
    _hideAllMarkers(true);
    _triggers.forEach(function(t) {
      var max = _maxScroll(t.scroller, t._dir), endClamp = t.vars.end === "max" || t._endClamp && t.end > max, startClamp = t._startClamp && t.start >= max;
      (endClamp || startClamp) && t.setPositions(startClamp ? max - 1 : t.start, endClamp ? Math.max(startClamp ? max : t.start + 1, max) : t.end, true);
    });
    _hideAllMarkers(false);
    _clampingMax = 0;
    refreshInits.forEach(function(result) {
      return result && result.render && result.render(-1);
    });
    _scrollers.forEach(function(obj) {
      if (_isFunction3(obj)) {
        obj.smooth && requestAnimationFrame(function() {
          return obj.target.style.scrollBehavior = "smooth";
        });
        obj.rec && obj(obj.rec);
      }
    });
    _clearScrollMemory(_scrollRestoration, 1);
    _resizeDelay.pause();
    _refreshID++;
    _refreshingAll = 2;
    _updateAll(2);
    _triggers.forEach(function(t) {
      return _isFunction3(t.vars.onRefresh) && t.vars.onRefresh(t);
    });
    _refreshingAll = ScrollTrigger2.isRefreshing = false;
    _dispatch3("refresh");
  };
  var _lastScroll = 0;
  var _direction = 1;
  var _primary;
  var _updateAll = function _updateAll2(force) {
    if (force === 2 || !_refreshingAll && !_isReverted) {
      ScrollTrigger2.isUpdating = true;
      _primary && _primary.update(0);
      var l = _triggers.length, time2 = _getTime2(), recordVelocity = time2 - _time1 >= 50, scroll = l && _triggers[0].scroll();
      _direction = _lastScroll > scroll ? -1 : 1;
      _refreshingAll || (_lastScroll = scroll);
      if (recordVelocity) {
        if (_lastScrollTime && !_pointerIsDown && time2 - _lastScrollTime > 200) {
          _lastScrollTime = 0;
          _dispatch3("scrollEnd");
        }
        _time2 = _time1;
        _time1 = time2;
      }
      if (_direction < 0) {
        _i = l;
        while (_i-- > 0) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }
        _direction = 1;
      } else {
        for (_i = 0; _i < l; _i++) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }
      }
      ScrollTrigger2.isUpdating = false;
    }
    _rafID = 0;
  };
  var _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"];
  var _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]);
  var _swapPinOut = function _swapPinOut2(pin, spacer, state) {
    _setState(state);
    var cache = pin._gsap;
    if (cache.spacerIsNative) {
      _setState(cache.spacerState);
    } else if (pin._gsap.swappedIn) {
      var parent = spacer.parentNode;
      if (parent) {
        parent.insertBefore(pin, spacer);
        parent.removeChild(spacer);
      }
    }
    pin._gsap.swappedIn = false;
  };
  var _swapPinIn = function _swapPinIn2(pin, spacer, cs, spacerState) {
    if (!pin._gsap.swappedIn) {
      var i = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style, p;
      while (i--) {
        p = _propNamesToCopy[i];
        spacerStyle[p] = cs[p];
      }
      spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
      cs.display === "inline" && (spacerStyle.display = "inline-block");
      pinStyle[_bottom] = pinStyle[_right] = "auto";
      spacerStyle.flexBasis = cs.flexBasis || "auto";
      spacerStyle.overflow = "visible";
      spacerStyle.boxSizing = "border-box";
      spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
      spacerStyle[_height] = _getSize(pin, _vertical) + _px;
      spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
      _setState(spacerState);
      pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
      pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
      pinStyle[_padding] = cs[_padding];
      if (pin.parentNode !== spacer) {
        pin.parentNode.insertBefore(spacer, pin);
        spacer.appendChild(pin);
      }
      pin._gsap.swappedIn = true;
    }
  };
  var _capsExp2 = /([A-Z])/g;
  var _setState = function _setState2(state) {
    if (state) {
      var style = state.t.style, l = state.length, i = 0, p, value;
      (state.t._gsap || gsap3.core.getCache(state.t)).uncache = 1;
      for (; i < l; i += 2) {
        value = state[i + 1];
        p = state[i];
        if (value) {
          style[p] = value;
        } else if (style[p]) {
          style.removeProperty(p.replace(_capsExp2, "-$1").toLowerCase());
        }
      }
    }
  };
  var _getState = function _getState2(element) {
    var l = _stateProps.length, style = element.style, state = [], i = 0;
    for (; i < l; i++) {
      state.push(_stateProps[i], style[_stateProps[i]]);
    }
    state.t = element;
    return state;
  };
  var _copyState = function _copyState2(state, override, omitOffsets) {
    var result = [], l = state.length, i = omitOffsets ? 8 : 0, p;
    for (; i < l; i += 2) {
      p = state[i];
      result.push(p, p in override ? override[p] : state[i + 1]);
    }
    result.t = state.t;
    return result;
  };
  var _winOffsets = {
    left: 0,
    top: 0
  };
  var _parsePosition3 = function _parsePosition4(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
    _isFunction3(value) && (value = value(self));
    if (_isString3(value) && value.substr(0, 3) === "max") {
      value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
    }
    var time2 = containerAnimation ? containerAnimation.time() : 0, p1, p2, element;
    containerAnimation && containerAnimation.seek(0);
    isNaN(value) || (value = +value);
    if (!_isNumber3(value)) {
      _isFunction3(trigger) && (trigger = trigger(self));
      var offsets = (value || "0").split(" "), bounds, localOffset, globalOffset, display;
      element = _getTarget(trigger, self) || _body2;
      bounds = _getBounds(element) || {};
      if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
        display = element.style.display;
        element.style.display = "block";
        bounds = _getBounds(element);
        display ? element.style.display = display : element.style.removeProperty("display");
      }
      localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
      globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
      value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
      markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
      scrollerSize -= scrollerSize - globalOffset;
    } else {
      containerAnimation && (value = gsap3.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
      markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
    }
    if (clampZeroProp) {
      self[clampZeroProp] = value || -1e-3;
      value < 0 && (value = 0);
    }
    if (marker) {
      var position = value + scrollerSize, isStart = marker._isStart;
      p1 = "scroll" + direction.d2;
      _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body2[p1], _docEl2[p1]) : marker.parentNode[p1]) <= position + 1);
      if (useFixedPosition) {
        scrollerBounds = _getBounds(markerScroller);
        useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
      }
    }
    if (containerAnimation && element) {
      p1 = _getBounds(element);
      containerAnimation.seek(scrollerMax);
      p2 = _getBounds(element);
      containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
      value = value / containerAnimation._caScrollDist * scrollerMax;
    }
    containerAnimation && containerAnimation.seek(time2);
    return containerAnimation ? value : Math.round(value);
  };
  var _prefixExp = /(webkit|moz|length|cssText|inset)/i;
  var _reparent = function _reparent2(element, parent, top, left) {
    if (element.parentNode !== parent) {
      var style = element.style, p, cs;
      if (parent === _body2) {
        element._stOrig = style.cssText;
        cs = _getComputedStyle(element);
        for (p in cs) {
          if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
            style[p] = cs[p];
          }
        }
        style.top = top;
        style.left = left;
      } else {
        style.cssText = element._stOrig;
      }
      gsap3.core.getCache(element).uncache = 1;
      parent.appendChild(element);
    }
  };
  var _interruptionTracker = function _interruptionTracker2(getValueFunc, initialValue, onInterrupt) {
    var last1 = initialValue, last2 = last1;
    return function(value) {
      var current = Math.round(getValueFunc());
      if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
        value = current;
        onInterrupt && onInterrupt();
      }
      last2 = last1;
      last1 = Math.round(value);
      return last1;
    };
  };
  var _shiftMarker = function _shiftMarker2(marker, direction, value) {
    var vars = {};
    vars[direction.p] = "+=" + value;
    gsap3.set(marker, vars);
  };
  var _getTweenCreator = function _getTweenCreator2(scroller, direction) {
    var getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, getTween = function getTween2(scrollTo, vars, initialValue, change1, change2) {
      var tween = getTween2.tween, onComplete = vars.onComplete, modifiers = {};
      initialValue = initialValue || getScroll();
      var checkForInterruption = _interruptionTracker(getScroll, initialValue, function() {
        tween.kill();
        getTween2.tween = 0;
      });
      change2 = change1 && change2 || 0;
      change1 = change1 || scrollTo - initialValue;
      tween && tween.kill();
      vars[prop] = scrollTo;
      vars.inherit = false;
      vars.modifiers = modifiers;
      modifiers[prop] = function() {
        return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
      };
      vars.onUpdate = function() {
        _scrollers.cache++;
        getTween2.tween && _updateAll();
      };
      vars.onComplete = function() {
        getTween2.tween = 0;
        onComplete && onComplete.call(tween);
      };
      tween = getTween2.tween = gsap3.to(scroller, vars);
      return tween;
    };
    scroller[prop] = getScroll;
    getScroll.wheelHandler = function() {
      return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
    };
    _addListener3(scroller, "wheel", getScroll.wheelHandler);
    ScrollTrigger2.isTouch && _addListener3(scroller, "touchmove", getScroll.wheelHandler);
    return getTween;
  };
  var ScrollTrigger2 = /* @__PURE__ */ function() {
    function ScrollTrigger3(vars, animation) {
      _coreInitted3 || ScrollTrigger3.register(gsap3) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
      _context3(this);
      this.init(vars, animation);
    }
    var _proto = ScrollTrigger3.prototype;
    _proto.init = function init4(vars, animation) {
      this.progress = this.start = 0;
      this.vars && this.kill(true, true);
      if (!_enabled) {
        this.update = this.refresh = this.kill = _passThrough3;
        return;
      }
      vars = _setDefaults3(_isString3(vars) || _isNumber3(vars) || vars.nodeType ? {
        trigger: vars
      } : vars, _defaults2);
      var _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap3 = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical, isToggle = !scrub && scrub !== 0, scroller = _getTarget(vars.scroller || _win4), scrollerCache = gsap3.core.getCache(scroller), isViewport = _isViewport3(scroller), useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed", callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : _defaults2.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, self = this, onRefreshInit = vars.onRefreshInit && function() {
        return vars.onRefreshInit(self);
      }, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, prevProgress = 0, scrollFunc = _getScrollFunc(scroller, direction), tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, executingOnRefresh, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap22, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn;
      self._startClamp = self._endClamp = false;
      self._dir = direction;
      anticipatePin *= 45;
      self.scroller = scroller;
      self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
      scroll1 = scrollFunc();
      self.vars = vars;
      animation = animation || vars.animation;
      if ("refreshPriority" in vars) {
        _sort = 1;
        vars.refreshPriority === -9999 && (_primary = self);
      }
      scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
        top: _getTweenCreator(scroller, _vertical),
        left: _getTweenCreator(scroller, _horizontal)
      };
      self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
      self.scrubDuration = function(value) {
        scrubSmooth = _isNumber3(value) && value;
        if (!scrubSmooth) {
          scrubTween && scrubTween.progress(1).kill();
          scrubTween = 0;
        } else {
          scrubTween ? scrubTween.duration(value) : scrubTween = gsap3.to(animation, {
            ease: "expo",
            totalProgress: "+=0",
            inherit: false,
            duration: scrubSmooth,
            paused: true,
            onComplete: function onComplete() {
              return onScrubComplete && onScrubComplete(self);
            }
          });
        }
      };
      if (animation) {
        animation.vars.lazy = false;
        animation._initted && !self.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
        self.animation = animation.pause();
        animation.scrollTrigger = self;
        self.scrubDuration(scrub);
        snap1 = 0;
        id || (id = animation.vars.id);
      }
      if (snap3) {
        if (!_isObject3(snap3) || snap3.push) {
          snap3 = {
            snapTo: snap3
          };
        }
        "scrollBehavior" in _body2.style && gsap3.set(isViewport ? [_body2, _docEl2] : scroller, {
          scrollBehavior: "auto"
        });
        _scrollers.forEach(function(o) {
          return _isFunction3(o) && o.target === (isViewport ? _doc4.scrollingElement || _docEl2 : scroller) && (o.smooth = false);
        });
        snapFunc = _isFunction3(snap3.snapTo) ? snap3.snapTo : snap3.snapTo === "labels" ? _getClosestLabel(animation) : snap3.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap3.directional !== false ? function(value, st) {
          return _snapDirectional(snap3.snapTo)(value, _getTime2() - lastRefresh < 500 ? 0 : st.direction);
        } : gsap3.utils.snap(snap3.snapTo);
        snapDurClamp = snap3.duration || {
          min: 0.1,
          max: 2
        };
        snapDurClamp = _isObject3(snapDurClamp) ? _clamp4(snapDurClamp.min, snapDurClamp.max) : _clamp4(snapDurClamp, snapDurClamp);
        snapDelayedCall = gsap3.delayedCall(snap3.delay || scrubSmooth / 2 || 0.1, function() {
          var scroll = scrollFunc(), refreshedRecently = _getTime2() - lastRefresh < 500, tween = tweenTo.tween;
          if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
            var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap22) / (_getTime2() - _time2) * 1e3 || 0, change1 = gsap3.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185), naturalEnd = progress + (snap3.inertia === false ? 0 : change1), endValue, endScroll, _snap = snap3, onStart = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
            endValue = snapFunc(naturalEnd, self);
            _isNumber3(endValue) || (endValue = naturalEnd);
            endScroll = Math.max(0, Math.round(start + endValue * change));
            if (scroll <= end && scroll >= start && endScroll !== scroll) {
              if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
                return;
              }
              if (snap3.inertia === false) {
                change1 = endValue - progress;
              }
              tweenTo(endScroll, {
                duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
                ease: snap3.ease || "power3",
                data: _abs(endScroll - scroll),
                // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
                onInterrupt: function onInterrupt() {
                  return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
                },
                onComplete: function onComplete() {
                  self.update();
                  lastSnap = scrollFunc();
                  if (animation && !isToggle) {
                    scrubTween ? scrubTween.resetTo("totalProgress", endValue, animation._tTime / animation._tDur) : animation.progress(endValue);
                  }
                  snap1 = snap22 = animation && !isToggle ? animation.totalProgress() : self.progress;
                  onSnapComplete && onSnapComplete(self);
                  _onComplete && _onComplete(self);
                }
              }, scroll, change1 * change, endScroll - scroll - change1 * change);
              onStart && onStart(self, tweenTo.tween);
            }
          } else if (self.isActive && lastSnap !== scroll) {
            snapDelayedCall.restart(true);
          }
        }).pause();
      }
      id && (_ids[id] = self);
      trigger = self.trigger = _getTarget(trigger || pin !== true && pin);
      customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
      customRevertReturn && (customRevertReturn = customRevertReturn(self));
      pin = pin === true ? trigger : _getTarget(pin);
      _isString3(toggleClass) && (toggleClass = {
        targets: trigger,
        className: toggleClass
      });
      if (pin) {
        pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
        self.pin = pin;
        pinCache = gsap3.core.getCache(pin);
        if (!pinCache.spacer) {
          if (pinSpacer) {
            pinSpacer = _getTarget(pinSpacer);
            pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
            pinCache.spacerIsNative = !!pinSpacer;
            pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
          }
          pinCache.spacer = spacer = pinSpacer || _doc4.createElement("div");
          spacer.classList.add("pin-spacer");
          id && spacer.classList.add("pin-spacer-" + id);
          pinCache.pinState = pinOriginalState = _getState(pin);
        } else {
          pinOriginalState = pinCache.pinState;
        }
        vars.force3D !== false && gsap3.set(pin, {
          force3D: true
        });
        self.spacer = spacer = pinCache.spacer;
        cs = _getComputedStyle(pin);
        spacingStart = cs[pinSpacing + direction.os2];
        pinGetter = gsap3.getProperty(pin);
        pinSetter = gsap3.quickSetter(pin, direction.a, _px);
        _swapPinIn(pin, spacer, cs);
        pinState = _getState(pin);
      }
      if (markers) {
        markerVars = _isObject3(markers) ? _setDefaults3(markers, _markerDefaults) : _markerDefaults;
        markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
        markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
        offset = markerStartTrigger["offset" + direction.op.d2];
        var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
        markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
        markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
        containerAnimation && (caMarkerSetter = gsap3.quickSetter([markerStart, markerEnd], direction.a, _px));
        if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
          _makePositionable(isViewport ? _body2 : scroller);
          gsap3.set([markerStartTrigger, markerEndTrigger], {
            force3D: true
          });
          markerStartSetter = gsap3.quickSetter(markerStartTrigger, direction.a, _px);
          markerEndSetter = gsap3.quickSetter(markerEndTrigger, direction.a, _px);
        }
      }
      if (containerAnimation) {
        var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
        containerAnimation.eventCallback("onUpdate", function() {
          self.update(0, 0, 1);
          oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
        });
      }
      self.previous = function() {
        return _triggers[_triggers.indexOf(self) - 1];
      };
      self.next = function() {
        return _triggers[_triggers.indexOf(self) + 1];
      };
      self.revert = function(revert, temp) {
        if (!temp) {
          return self.kill(true);
        }
        var r = revert !== false || !self.enabled, prevRefreshing = _refreshing;
        if (r !== self.isReverted) {
          if (r) {
            prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
            prevProgress = self.progress;
            prevAnimProgress = animation && animation.progress();
          }
          markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
            return m.style.display = r ? "none" : "block";
          });
          if (r) {
            _refreshing = self;
            self.update(r);
          }
          if (pin && (!pinReparent || !self.isActive)) {
            if (r) {
              _swapPinOut(pin, spacer, pinOriginalState);
            } else {
              _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
            }
          }
          r || self.update(r);
          _refreshing = prevRefreshing;
          self.isReverted = r;
        }
      };
      self.refresh = function(soft, force, position, pinOffset) {
        if ((_refreshing || !self.enabled) && !force) {
          return;
        }
        if (pin && soft && _lastScrollTime) {
          _addListener3(ScrollTrigger3, "scrollEnd", _softRefresh);
          return;
        }
        !_refreshingAll && onRefreshInit && onRefreshInit(self);
        _refreshing = self;
        if (tweenTo.tween && !position) {
          tweenTo.tween.kill();
          tweenTo.tween = 0;
        }
        scrubTween && scrubTween.pause();
        if (invalidateOnRefresh && animation) {
          animation.revert({
            kill: false
          }).invalidate();
          animation.getChildren && animation.getChildren(true, true, false).forEach(function(t) {
            return t.vars.immediateRender && t.render(0, true, true);
          });
        }
        self.isReverted || self.revert(true, true);
        self._subPinOffset = false;
        var size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), isFirstRefresh = change <= 0.01 || !change, offset2 = 0, otherPinOffset = pinOffset || 0, parsedEnd = _isObject3(position) ? position.end : vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = _isObject3(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0, i = triggerIndex, cs2, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow, markerStartOffset, markerEndOffset;
        if (markers && _isObject3(position)) {
          markerStartOffset = gsap3.getProperty(markerStartTrigger, direction.p);
          markerEndOffset = gsap3.getProperty(markerEndTrigger, direction.p);
        }
        while (i-- > 0) {
          curTrigger = _triggers[i];
          curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self);
          curPin = curTrigger.pin;
          if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
            revertedPins || (revertedPins = []);
            revertedPins.unshift(curTrigger);
            curTrigger.revert(true, true);
          }
          if (curTrigger !== _triggers[i]) {
            triggerIndex--;
            i--;
          }
        }
        _isFunction3(parsedStart) && (parsedStart = parsedStart(self));
        parsedStart = _parseClamp(parsedStart, "start", self);
        start = _parsePosition3(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._startClamp && "_startClamp") || (pin ? -1e-3 : 0);
        _isFunction3(parsedEnd) && (parsedEnd = parsedEnd(self));
        if (_isString3(parsedEnd) && !parsedEnd.indexOf("+=")) {
          if (~parsedEnd.indexOf(" ")) {
            parsedEnd = (_isString3(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
          } else {
            offset2 = _offsetToPx(parsedEnd.substr(2), size);
            parsedEnd = _isString3(parsedStart) ? parsedStart : (containerAnimation ? gsap3.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset2;
            parsedEndTrigger = trigger;
          }
        }
        parsedEnd = _parseClamp(parsedEnd, "end", self);
        end = Math.max(start, _parsePosition3(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset2, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._endClamp && "_endClamp")) || -1e-3;
        offset2 = 0;
        i = triggerIndex;
        while (i--) {
          curTrigger = _triggers[i];
          curPin = curTrigger.pin;
          if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
            cs2 = curTrigger.end - (self._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);
            if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) {
              offset2 += cs2 * (1 - curTrigger.progress);
            }
            curPin === pin && (otherPinOffset += cs2);
          }
        }
        start += offset2;
        end += offset2;
        self._startClamp && (self._startClamp += offset2);
        if (self._endClamp && !_refreshingAll) {
          self._endClamp = end || -1e-3;
          end = Math.min(end, _maxScroll(scroller, direction));
        }
        change = end - start || (start -= 0.01) && 1e-3;
        if (isFirstRefresh) {
          prevProgress = gsap3.utils.clamp(0, 1, gsap3.utils.normalize(start, end, prevScroll));
        }
        self._pinPush = otherPinOffset;
        if (markerStart && offset2) {
          cs2 = {};
          cs2[direction.a] = "+=" + offset2;
          pinnedContainer && (cs2[direction.p] = "-=" + scrollFunc());
          gsap3.set([markerStart, markerEnd], cs2);
        }
        if (pin && !(_clampingMax && self.end >= _maxScroll(scroller, direction))) {
          cs2 = _getComputedStyle(pin);
          isVertical = direction === _vertical;
          scroll = scrollFunc();
          pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
          if (!max && end > 1) {
            forcedOverflow = (isViewport ? _doc4.scrollingElement || _docEl2 : scroller).style;
            forcedOverflow = {
              style: forcedOverflow,
              value: forcedOverflow["overflow" + direction.a.toUpperCase()]
            };
            if (isViewport && _getComputedStyle(_body2)["overflow" + direction.a.toUpperCase()] !== "scroll") {
              forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
            }
          }
          _swapPinIn(pin, spacer, cs2);
          pinState = _getState(pin);
          bounds = _getBounds(pin, true);
          oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
          if (pinSpacing) {
            spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
            spacerState.t = spacer;
            i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
            if (i) {
              spacerState.push(direction.d, i + _px);
              spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
            }
            _setState(spacerState);
            if (pinnedContainer) {
              _triggers.forEach(function(t) {
                if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
                  t._subPinOffset = true;
                }
              });
            }
            useFixedPosition && scrollFunc(prevScroll);
          } else {
            i = _getSize(pin, direction);
            i && spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
          }
          if (useFixedPosition) {
            override = {
              top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
              left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
              boxSizing: "border-box",
              position: "fixed"
            };
            override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
            override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
            override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
            override[_padding] = cs2[_padding];
            override[_padding + _Top] = cs2[_padding + _Top];
            override[_padding + _Right] = cs2[_padding + _Right];
            override[_padding + _Bottom] = cs2[_padding + _Bottom];
            override[_padding + _Left] = cs2[_padding + _Left];
            pinActiveState = _copyState(pinOriginalState, override, pinReparent);
            _refreshingAll && scrollFunc(0);
          }
          if (animation) {
            initted = animation._initted;
            _suppressOverwrites2(1);
            animation.render(animation.duration(), true, true);
            pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
            pinMoves = Math.abs(change - pinChange) > 1;
            useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
            animation.render(0, true, true);
            initted || animation.invalidate(true);
            animation.parent || animation.totalTime(animation.totalTime());
            _suppressOverwrites2(0);
          } else {
            pinChange = change;
          }
          forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
        } else if (trigger && scrollFunc() && !containerAnimation) {
          bounds = trigger.parentNode;
          while (bounds && bounds !== _body2) {
            if (bounds._pinOffset) {
              start -= bounds._pinOffset;
              end -= bounds._pinOffset;
            }
            bounds = bounds.parentNode;
          }
        }
        revertedPins && revertedPins.forEach(function(t) {
          return t.revert(false, true);
        });
        self.start = start;
        self.end = end;
        scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
        if (!containerAnimation && !_refreshingAll) {
          scroll1 < prevScroll && scrollFunc(prevScroll);
          self.scroll.rec = 0;
        }
        self.revert(false, true);
        lastRefresh = _getTime2();
        if (snapDelayedCall) {
          lastSnap = -1;
          snapDelayedCall.restart(true);
        }
        _refreshing = 0;
        animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true);
        if (isFirstRefresh || prevProgress !== self.progress || containerAnimation || invalidateOnRefresh || animation && !animation._initted) {
          animation && !isToggle && (animation._initted || prevProgress || animation.vars.immediateRender !== false) && animation.totalProgress(containerAnimation && start < -1e-3 && !prevProgress ? gsap3.utils.normalize(start, end, 0) : prevProgress, true);
          self.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
        }
        pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
        scrubTween && scrubTween.invalidate();
        if (!isNaN(markerStartOffset)) {
          markerStartOffset -= gsap3.getProperty(markerStartTrigger, direction.p);
          markerEndOffset -= gsap3.getProperty(markerEndTrigger, direction.p);
          _shiftMarker(markerStartTrigger, direction, markerStartOffset);
          _shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));
          _shiftMarker(markerEndTrigger, direction, markerEndOffset);
          _shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
        }
        isFirstRefresh && !_refreshingAll && self.update();
        if (onRefresh && !_refreshingAll && !executingOnRefresh) {
          executingOnRefresh = true;
          onRefresh(self);
          executingOnRefresh = false;
        }
      };
      self.getVelocity = function() {
        return (scrollFunc() - scroll2) / (_getTime2() - _time2) * 1e3 || 0;
      };
      self.endAnimation = function() {
        _endAnimation(self.callbackAnimation);
        if (animation) {
          scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
        }
      };
      self.labelToScroll = function(label) {
        return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
      };
      self.getTrailing = function(name) {
        var i = _triggers.indexOf(self), a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
        return (_isString3(name) ? a.filter(function(t) {
          return t.vars.preventOverlaps === name;
        }) : a).filter(function(t) {
          return self.direction > 0 ? t.end <= start : t.start >= end;
        });
      };
      self.update = function(reset, recordVelocity, forceFake) {
        if (containerAnimation && !forceFake && !reset) {
          return;
        }
        var scroll = _refreshingAll === true ? prevScroll : self.scroll(), p = reset ? 0 : (scroll - start) / change, clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0, prevProgress2 = self.progress, isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction;
        if (recordVelocity) {
          scroll2 = scroll1;
          scroll1 = containerAnimation ? scrollFunc() : scroll;
          if (snap3) {
            snap22 = snap1;
            snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
          }
        }
        if (anticipatePin && pin && !_refreshing && !_startup2 && _lastScrollTime) {
          if (!clipped && start < scroll + (scroll - scroll2) / (_getTime2() - _time2) * anticipatePin) {
            clipped = 1e-4;
          } else if (clipped === 1 && end > scroll + (scroll - scroll2) / (_getTime2() - _time2) * anticipatePin) {
            clipped = 0.9999;
          }
        }
        if (clipped !== prevProgress2 && self.enabled) {
          isActive = self.isActive = !!clipped && clipped < 1;
          wasActive = !!prevProgress2 && prevProgress2 < 1;
          toggled = isActive !== wasActive;
          stateChanged = toggled || !!clipped !== !!prevProgress2;
          self.direction = clipped > prevProgress2 ? 1 : -1;
          self.progress = clipped;
          if (stateChanged && !_refreshing) {
            toggleState = clipped && !prevProgress2 ? 0 : clipped === 1 ? 1 : prevProgress2 === 1 ? 2 : 3;
            if (isToggle) {
              action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
              isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
            }
          }
          preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction3(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function(t) {
            return t.endAnimation();
          }));
          if (!isToggle) {
            if (scrubTween && !_refreshing && !_startup2) {
              scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
              if (scrubTween.resetTo) {
                scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
              } else {
                scrubTween.vars.totalProgress = clipped;
                scrubTween.invalidate().restart();
              }
            } else if (animation) {
              animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
            }
          }
          if (pin) {
            reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
            if (!useFixedPosition) {
              pinSetter(_round3(pinStart + pinChange * clipped));
            } else if (stateChanged) {
              isAtMax = !reset && clipped > prevProgress2 && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
              if (pinReparent) {
                if (!reset && (isActive || isAtMax)) {
                  var bounds = _getBounds(pin, true), _offset = scroll - start;
                  _reparent(pin, _body2, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
                } else {
                  _reparent(pin, spacer);
                }
              }
              _setState(isActive || isAtMax ? pinActiveState : pinState);
              pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
            }
          }
          snap3 && !tweenTo.tween && !_refreshing && !_startup2 && snapDelayedCall.restart(true);
          toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function(el) {
            return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
          });
          onUpdate && !isToggle && !reset && onUpdate(self);
          if (stateChanged && !_refreshing) {
            if (isToggle) {
              if (isTakingAction) {
                if (action === "complete") {
                  animation.pause().totalProgress(1);
                } else if (action === "reset") {
                  animation.restart(true).pause();
                } else if (action === "restart") {
                  animation.restart(true);
                } else {
                  animation[action]();
                }
              }
              onUpdate && onUpdate(self);
            }
            if (toggled || !_limitCallbacks) {
              onToggle && toggled && _callback3(self, onToggle);
              callbacks[toggleState] && _callback3(self, callbacks[toggleState]);
              once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);
              if (!toggled) {
                toggleState = clipped === 1 ? 1 : 3;
                callbacks[toggleState] && _callback3(self, callbacks[toggleState]);
              }
            }
            if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber3(fastScrollEnd) ? fastScrollEnd : 2500)) {
              _endAnimation(self.callbackAnimation);
              scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
            }
          } else if (isToggle && onUpdate && !_refreshing) {
            onUpdate(self);
          }
        }
        if (markerEndSetter) {
          var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
          markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
          markerEndSetter(n);
        }
        caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
      };
      self.enable = function(reset, refresh) {
        if (!self.enabled) {
          self.enabled = true;
          _addListener3(scroller, "resize", _onResize);
          isViewport || _addListener3(scroller, "scroll", _onScroll3);
          onRefreshInit && _addListener3(ScrollTrigger3, "refreshInit", onRefreshInit);
          if (reset !== false) {
            self.progress = prevProgress = 0;
            scroll1 = scroll2 = lastSnap = scrollFunc();
          }
          refresh !== false && self.refresh();
        }
      };
      self.getTween = function(snap4) {
        return snap4 && tweenTo ? tweenTo.tween : scrubTween;
      };
      self.setPositions = function(newStart, newEnd, keepClamp, pinOffset) {
        if (containerAnimation) {
          var st = containerAnimation.scrollTrigger, duration = containerAnimation.duration(), _change = st.end - st.start;
          newStart = st.start + _change * newStart / duration;
          newEnd = st.start + _change * newEnd / duration;
        }
        self.refresh(false, false, {
          start: _keepClamp(newStart, keepClamp && !!self._startClamp),
          end: _keepClamp(newEnd, keepClamp && !!self._endClamp)
        }, pinOffset);
        self.update();
      };
      self.adjustPinSpacing = function(amount) {
        if (spacerState && amount) {
          var i = spacerState.indexOf(direction.d) + 1;
          spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
          spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
          _setState(spacerState);
        }
      };
      self.disable = function(reset, allowAnimation) {
        if (self.enabled) {
          reset !== false && self.revert(true, true);
          self.enabled = self.isActive = false;
          allowAnimation || scrubTween && scrubTween.pause();
          prevScroll = 0;
          pinCache && (pinCache.uncache = 1);
          onRefreshInit && _removeListener3(ScrollTrigger3, "refreshInit", onRefreshInit);
          if (snapDelayedCall) {
            snapDelayedCall.pause();
            tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
          }
          if (!isViewport) {
            var i = _triggers.length;
            while (i--) {
              if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
                return;
              }
            }
            _removeListener3(scroller, "resize", _onResize);
            isViewport || _removeListener3(scroller, "scroll", _onScroll3);
          }
        }
      };
      self.kill = function(revert, allowAnimation) {
        self.disable(revert, allowAnimation);
        scrubTween && !allowAnimation && scrubTween.kill();
        id && delete _ids[id];
        var i = _triggers.indexOf(self);
        i >= 0 && _triggers.splice(i, 1);
        i === _i && _direction > 0 && _i--;
        i = 0;
        _triggers.forEach(function(t) {
          return t.scroller === self.scroller && (i = 1);
        });
        i || _refreshingAll || (self.scroll.rec = 0);
        if (animation) {
          animation.scrollTrigger = null;
          revert && animation.revert({
            kill: false
          });
          allowAnimation || animation.kill();
        }
        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
          return m.parentNode && m.parentNode.removeChild(m);
        });
        _primary === self && (_primary = 0);
        if (pin) {
          pinCache && (pinCache.uncache = 1);
          i = 0;
          _triggers.forEach(function(t) {
            return t.pin === pin && i++;
          });
          i || (pinCache.spacer = 0);
        }
        vars.onKill && vars.onKill(self);
      };
      _triggers.push(self);
      self.enable(false, false);
      customRevertReturn && customRevertReturn(self);
      if (animation && animation.add && !change) {
        var updateFunc = self.update;
        self.update = function() {
          self.update = updateFunc;
          _scrollers.cache++;
          start || end || self.refresh();
        };
        gsap3.delayedCall(0.01, self.update);
        change = 0.01;
        start = end = 0;
      } else {
        self.refresh();
      }
      pin && _queueRefreshAll();
    };
    ScrollTrigger3.register = function register(core) {
      if (!_coreInitted3) {
        gsap3 = core || _getGSAP3();
        _windowExists5() && window.document && ScrollTrigger3.enable();
        _coreInitted3 = _enabled;
      }
      return _coreInitted3;
    };
    ScrollTrigger3.defaults = function defaults2(config3) {
      if (config3) {
        for (var p in config3) {
          _defaults2[p] = config3[p];
        }
      }
      return _defaults2;
    };
    ScrollTrigger3.disable = function disable(reset, kill) {
      _enabled = 0;
      _triggers.forEach(function(trigger) {
        return trigger[kill ? "kill" : "disable"](reset);
      });
      _removeListener3(_win4, "wheel", _onScroll3);
      _removeListener3(_doc4, "scroll", _onScroll3);
      clearInterval(_syncInterval);
      _removeListener3(_doc4, "touchcancel", _passThrough3);
      _removeListener3(_body2, "touchstart", _passThrough3);
      _multiListener(_removeListener3, _doc4, "pointerdown,touchstart,mousedown", _pointerDownHandler);
      _multiListener(_removeListener3, _doc4, "pointerup,touchend,mouseup", _pointerUpHandler);
      _resizeDelay.kill();
      _iterateAutoRefresh(_removeListener3);
      for (var i = 0; i < _scrollers.length; i += 3) {
        _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 1]);
        _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 2]);
      }
    };
    ScrollTrigger3.enable = function enable() {
      _win4 = window;
      _doc4 = document;
      _docEl2 = _doc4.documentElement;
      _body2 = _doc4.body;
      if (gsap3) {
        _toArray = gsap3.utils.toArray;
        _clamp4 = gsap3.utils.clamp;
        _context3 = gsap3.core.context || _passThrough3;
        _suppressOverwrites2 = gsap3.core.suppressOverwrites || _passThrough3;
        _scrollRestoration = _win4.history.scrollRestoration || "auto";
        _lastScroll = _win4.pageYOffset || 0;
        gsap3.core.globals("ScrollTrigger", ScrollTrigger3);
        if (_body2) {
          _enabled = 1;
          _div100vh = document.createElement("div");
          _div100vh.style.height = "100vh";
          _div100vh.style.position = "absolute";
          _refresh100vh();
          _rafBugFix();
          Observer.register(gsap3);
          ScrollTrigger3.isTouch = Observer.isTouch;
          _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
          _ignoreMobileResize = Observer.isTouch === 1;
          _addListener3(_win4, "wheel", _onScroll3);
          _root2 = [_win4, _doc4, _docEl2, _body2];
          if (gsap3.matchMedia) {
            ScrollTrigger3.matchMedia = function(vars) {
              var mm = gsap3.matchMedia(), p;
              for (p in vars) {
                mm.add(p, vars[p]);
              }
              return mm;
            };
            gsap3.addEventListener("matchMediaInit", function() {
              return _revertAll();
            });
            gsap3.addEventListener("matchMediaRevert", function() {
              return _revertRecorded();
            });
            gsap3.addEventListener("matchMedia", function() {
              _refreshAll(0, 1);
              _dispatch3("matchMedia");
            });
            gsap3.matchMedia().add("(orientation: portrait)", function() {
              _setBaseDimensions();
              return _setBaseDimensions;
            });
          } else {
            console.warn("Requires GSAP 3.11.0 or later");
          }
          _setBaseDimensions();
          _addListener3(_doc4, "scroll", _onScroll3);
          var bodyHasStyle = _body2.hasAttribute("style"), bodyStyle = _body2.style, border = bodyStyle.borderTopStyle, AnimationProto = gsap3.core.Animation.prototype, bounds, i;
          AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
            value: function value() {
              return this.time(-0.01, true);
            }
          });
          bodyStyle.borderTopStyle = "solid";
          bounds = _getBounds(_body2);
          _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
          _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
          border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
          if (!bodyHasStyle) {
            _body2.setAttribute("style", "");
            _body2.removeAttribute("style");
          }
          _syncInterval = setInterval(_sync, 250);
          gsap3.delayedCall(0.5, function() {
            return _startup2 = 0;
          });
          _addListener3(_doc4, "touchcancel", _passThrough3);
          _addListener3(_body2, "touchstart", _passThrough3);
          _multiListener(_addListener3, _doc4, "pointerdown,touchstart,mousedown", _pointerDownHandler);
          _multiListener(_addListener3, _doc4, "pointerup,touchend,mouseup", _pointerUpHandler);
          _transformProp2 = gsap3.utils.checkPrefix("transform");
          _stateProps.push(_transformProp2);
          _coreInitted3 = _getTime2();
          _resizeDelay = gsap3.delayedCall(0.2, _refreshAll).pause();
          _autoRefresh = [_doc4, "visibilitychange", function() {
            var w = _win4.innerWidth, h = _win4.innerHeight;
            if (_doc4.hidden) {
              _prevWidth = w;
              _prevHeight = h;
            } else if (_prevWidth !== w || _prevHeight !== h) {
              _onResize();
            }
          }, _doc4, "DOMContentLoaded", _refreshAll, _win4, "load", _refreshAll, _win4, "resize", _onResize];
          _iterateAutoRefresh(_addListener3);
          _triggers.forEach(function(trigger) {
            return trigger.enable(0, 1);
          });
          for (i = 0; i < _scrollers.length; i += 3) {
            _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 1]);
            _wheelListener(_removeListener3, _scrollers[i], _scrollers[i + 2]);
          }
        }
      }
    };
    ScrollTrigger3.config = function config3(vars) {
      "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
      var ms = vars.syncInterval;
      ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
      "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger3.isTouch === 1 && vars.ignoreMobileResize);
      if ("autoRefreshEvents" in vars) {
        _iterateAutoRefresh(_removeListener3) || _iterateAutoRefresh(_addListener3, vars.autoRefreshEvents || "none");
        _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
      }
    };
    ScrollTrigger3.scrollerProxy = function scrollerProxy(target, vars) {
      var t = _getTarget(target), i = _scrollers.indexOf(t), isViewport = _isViewport3(t);
      if (~i) {
        _scrollers.splice(i, isViewport ? 6 : 2);
      }
      if (vars) {
        isViewport ? _proxies.unshift(_win4, vars, _body2, vars, _docEl2, vars) : _proxies.unshift(t, vars);
      }
    };
    ScrollTrigger3.clearMatchMedia = function clearMatchMedia(query) {
      _triggers.forEach(function(t) {
        return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
      });
    };
    ScrollTrigger3.isInViewport = function isInViewport(element, ratio, horizontal) {
      var bounds = (_isString3(element) ? _getTarget(element) : element).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
      return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win4.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win4.innerHeight;
    };
    ScrollTrigger3.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
      _isString3(element) && (element = _getTarget(element));
      var bounds = element.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
      return horizontal ? (bounds.left + offset) / _win4.innerWidth : (bounds.top + offset) / _win4.innerHeight;
    };
    ScrollTrigger3.killAll = function killAll(allowListeners) {
      _triggers.slice(0).forEach(function(t) {
        return t.vars.id !== "ScrollSmoother" && t.kill();
      });
      if (allowListeners !== true) {
        var listeners = _listeners2.killAll || [];
        _listeners2 = {};
        listeners.forEach(function(f) {
          return f();
        });
      }
    };
    return ScrollTrigger3;
  }();
  ScrollTrigger2.version = "3.13.0";
  ScrollTrigger2.saveStyles = function(targets) {
    return targets ? _toArray(targets).forEach(function(target) {
      if (target && target.style) {
        var i = _savedStyles.indexOf(target);
        i >= 0 && _savedStyles.splice(i, 5);
        _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap3.core.getCache(target), _context3());
      }
    }) : _savedStyles;
  };
  ScrollTrigger2.revert = function(soft, media) {
    return _revertAll(!soft, media);
  };
  ScrollTrigger2.create = function(vars, animation) {
    return new ScrollTrigger2(vars, animation);
  };
  ScrollTrigger2.refresh = function(safe) {
    return safe ? _onResize(true) : (_coreInitted3 || ScrollTrigger2.register()) && _refreshAll(true);
  };
  ScrollTrigger2.update = function(force) {
    return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
  };
  ScrollTrigger2.clearScrollMemory = _clearScrollMemory;
  ScrollTrigger2.maxScroll = function(element, horizontal) {
    return _maxScroll(element, horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger2.getScrollFunc = function(element, horizontal) {
    return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
  };
  ScrollTrigger2.getById = function(id) {
    return _ids[id];
  };
  ScrollTrigger2.getAll = function() {
    return _triggers.filter(function(t) {
      return t.vars.id !== "ScrollSmoother";
    });
  };
  ScrollTrigger2.isScrolling = function() {
    return !!_lastScrollTime;
  };
  ScrollTrigger2.snapDirectional = _snapDirectional;
  ScrollTrigger2.addEventListener = function(type, callback) {
    var a = _listeners2[type] || (_listeners2[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  };
  ScrollTrigger2.removeEventListener = function(type, callback) {
    var a = _listeners2[type], i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  };
  ScrollTrigger2.batch = function(targets, vars) {
    var result = [], varsCopy = {}, interval = vars.interval || 0.016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback2(type, callback) {
      var elements = [], triggers = [], delay = gsap3.delayedCall(interval, function() {
        callback(elements, triggers);
        elements = [];
        triggers = [];
      }).pause();
      return function(self) {
        elements.length || delay.restart(true);
        elements.push(self.trigger);
        triggers.push(self);
        batchMax <= elements.length && delay.progress(1);
      };
    }, p;
    for (p in vars) {
      varsCopy[p] = p.substr(0, 2) === "on" && _isFunction3(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
    }
    if (_isFunction3(batchMax)) {
      batchMax = batchMax();
      _addListener3(ScrollTrigger2, "refresh", function() {
        return batchMax = vars.batchMax();
      });
    }
    _toArray(targets).forEach(function(target) {
      var config3 = {};
      for (p in varsCopy) {
        config3[p] = varsCopy[p];
      }
      config3.trigger = target;
      result.push(ScrollTrigger2.create(config3));
    });
    return result;
  };
  var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier2(scrollFunc, current, end, max) {
    current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
    return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
  };
  var _allowNativePanning = function _allowNativePanning2(target, direction) {
    if (direction === true) {
      target.style.removeProperty("touch-action");
    } else {
      target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
    }
    target === _docEl2 && _allowNativePanning2(_body2, direction);
  };
  var _overflow = {
    auto: 1,
    scroll: 1
  };
  var _nestedScroll = function _nestedScroll2(_ref5) {
    var event = _ref5.event, target = _ref5.target, axis = _ref5.axis;
    var node = (event.changedTouches ? event.changedTouches[0] : event).target, cache = node._gsap || gsap3.core.getCache(node), time2 = _getTime2(), cs;
    if (!cache._isScrollT || time2 - cache._isScrollT > 2e3) {
      while (node && node !== _body2 && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
        node = node.parentNode;
      }
      cache._isScroll = node && node !== target && !_isViewport3(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
      cache._isScrollT = time2;
    }
    if (cache._isScroll || axis === "x") {
      event.stopPropagation();
      event._gsapAllow = true;
    }
  };
  var _inputObserver = function _inputObserver2(target, type, inputs, nested) {
    return Observer.create({
      target,
      capture: true,
      debounce: false,
      lockAxis: true,
      type,
      onWheel: nested = nested && _nestedScroll,
      onPress: nested,
      onDrag: nested,
      onScroll: nested,
      onEnable: function onEnable() {
        return inputs && _addListener3(_doc4, Observer.eventTypes[0], _captureInputs, false, true);
      },
      onDisable: function onDisable() {
        return _removeListener3(_doc4, Observer.eventTypes[0], _captureInputs, true);
      }
    });
  };
  var _inputExp = /(input|label|select|textarea)/i;
  var _inputIsFocused;
  var _captureInputs = function _captureInputs2(e) {
    var isInput = _inputExp.test(e.target.tagName);
    if (isInput || _inputIsFocused) {
      e._gsapAllow = true;
      _inputIsFocused = isInput;
    }
  };
  var _getScrollNormalizer = function _getScrollNormalizer2(vars) {
    _isObject3(vars) || (vars = {});
    vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
    vars.type || (vars.type = "wheel,touch");
    vars.debounce = !!vars.debounce;
    vars.id = vars.id || "normalizer";
    var _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, onRelease = _vars2.onRelease, self, maxY, target = _getTarget(vars.target) || _docEl2, smoother = gsap3.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer.isTouch && _win4.visualViewport ? _win4.visualViewport.scale * _win4.visualViewport.width : _win4.outerWidth) / _win4.innerWidth, wheelRefresh = 0, resolveMomentumDuration = _isFunction3(momentum) ? function() {
      return momentum(self);
    } : function() {
      return momentum || 2.8;
    }, lastRefreshID, skipTouchMove, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove2() {
      return skipTouchMove = false;
    }, scrollClampX = _passThrough3, scrollClampY = _passThrough3, updateClamps = function updateClamps2() {
      maxY = _maxScroll(target, _vertical);
      scrollClampY = _clamp4(_fixIOSBug ? 1 : 0, maxY);
      normalizeScrollX && (scrollClampX = _clamp4(0, _maxScroll(target, _horizontal)));
      lastRefreshID = _refreshID;
    }, removeContentOffset = function removeContentOffset2() {
      content._gsap.y = _round3(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
      content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
      scrollFuncY.offset = scrollFuncY.cacheID = 0;
    }, ignoreDrag = function ignoreDrag2() {
      if (skipTouchMove) {
        requestAnimationFrame(resumeTouchMove);
        var offset = _round3(self.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
        if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
          scrollFuncY.offset = scroll - scrollFuncY.v;
          var y = _round3((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
          content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
          content._gsap.y = y + "px";
          scrollFuncY.cacheID = _scrollers.cache;
          _updateAll();
        }
        return true;
      }
      scrollFuncY.offset && removeContentOffset();
      skipTouchMove = true;
    }, tween, startScrollX, startScrollY, onStopDelayedCall, onResize = function onResize2() {
      updateClamps();
      if (tween.isActive() && tween.vars.scrollY > maxY) {
        scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
      }
    };
    content && gsap3.set(content, {
      y: "+=0"
    });
    vars.ignoreCheck = function(e) {
      return _fixIOSBug && e.type === "touchmove" && ignoreDrag(e) || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
    };
    vars.onPress = function() {
      skipTouchMove = false;
      var prevScale = scale;
      scale = _round3((_win4.visualViewport && _win4.visualViewport.scale || 1) / initialScale);
      tween.pause();
      prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
      startScrollX = scrollFuncX();
      startScrollY = scrollFuncY();
      updateClamps();
      lastRefreshID = _refreshID;
    };
    vars.onRelease = vars.onGestureStart = function(self2, wasDragging) {
      scrollFuncY.offset && removeContentOffset();
      if (!wasDragging) {
        onStopDelayedCall.restart(true);
      } else {
        _scrollers.cache++;
        var dur = resolveMomentumDuration(), currentScroll, endScroll;
        if (normalizeScrollX) {
          currentScroll = scrollFuncX();
          endScroll = currentScroll + dur * 0.05 * -self2.velocityX / 0.227;
          dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
          tween.vars.scrollX = scrollClampX(endScroll);
        }
        currentScroll = scrollFuncY();
        endScroll = currentScroll + dur * 0.05 * -self2.velocityY / 0.227;
        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
        tween.vars.scrollY = scrollClampY(endScroll);
        tween.invalidate().duration(dur).play(0.01);
        if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
          gsap3.to({}, {
            onUpdate: onResize,
            duration: dur
          });
        }
      }
      onRelease && onRelease(self2);
    };
    vars.onWheel = function() {
      tween._ts && tween.pause();
      if (_getTime2() - wheelRefresh > 1e3) {
        lastRefreshID = 0;
        wheelRefresh = _getTime2();
      }
    };
    vars.onChange = function(self2, dx, dy, xArray, yArray) {
      _refreshID !== lastRefreshID && updateClamps();
      dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self2.startX - self2.x) : scrollFuncX() + dx - xArray[1]));
      if (dy) {
        scrollFuncY.offset && removeContentOffset();
        var isTouch = yArray[2] === dy, y = isTouch ? startScrollY + self2.startY - self2.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y);
        isTouch && y !== yClamped && (startScrollY += yClamped - y);
        scrollFuncY(yClamped);
      }
      (dy || dx) && _updateAll();
    };
    vars.onEnable = function() {
      _allowNativePanning(target, normalizeScrollX ? false : "x");
      ScrollTrigger2.addEventListener("refresh", onResize);
      _addListener3(_win4, "resize", onResize);
      if (scrollFuncY.smooth) {
        scrollFuncY.target.style.scrollBehavior = "auto";
        scrollFuncY.smooth = scrollFuncX.smooth = false;
      }
      inputObserver.enable();
    };
    vars.onDisable = function() {
      _allowNativePanning(target, true);
      _removeListener3(_win4, "resize", onResize);
      ScrollTrigger2.removeEventListener("refresh", onResize);
      inputObserver.kill();
    };
    vars.lockAxis = vars.lockAxis !== false;
    self = new Observer(vars);
    self.iOS = _fixIOSBug;
    _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
    _fixIOSBug && gsap3.ticker.add(_passThrough3);
    onStopDelayedCall = self._dc;
    tween = gsap3.to(self, {
      ease: "power4",
      paused: true,
      inherit: false,
      scrollX: normalizeScrollX ? "+=0.1" : "+=0",
      scrollY: "+=0.1",
      modifiers: {
        scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function() {
          return tween.pause();
        })
      },
      onUpdate: _updateAll,
      onComplete: onStopDelayedCall.vars.onComplete
    });
    return self;
  };
  ScrollTrigger2.sort = function(func) {
    if (_isFunction3(func)) {
      return _triggers.sort(func);
    }
    var scroll = _win4.pageYOffset || 0;
    ScrollTrigger2.getAll().forEach(function(t) {
      return t._sortY = t.trigger ? scroll + t.trigger.getBoundingClientRect().top : t.start + _win4.innerHeight;
    });
    return _triggers.sort(func || function(a, b) {
      return (a.vars.refreshPriority || 0) * -1e6 + (a.vars.containerAnimation ? 1e6 : a._sortY) - ((b.vars.containerAnimation ? 1e6 : b._sortY) + (b.vars.refreshPriority || 0) * -1e6);
    });
  };
  ScrollTrigger2.observe = function(vars) {
    return new Observer(vars);
  };
  ScrollTrigger2.normalizeScroll = function(vars) {
    if (typeof vars === "undefined") {
      return _normalizer2;
    }
    if (vars === true && _normalizer2) {
      return _normalizer2.enable();
    }
    if (vars === false) {
      _normalizer2 && _normalizer2.kill();
      _normalizer2 = vars;
      return;
    }
    var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
    _normalizer2 && _normalizer2.target === normalizer.target && _normalizer2.kill();
    _isViewport3(normalizer.target) && (_normalizer2 = normalizer);
    return normalizer;
  };
  ScrollTrigger2.core = {
    // smaller file size way to leverage in ScrollSmoother and Observer
    _getVelocityProp,
    _inputObserver,
    _scrollers,
    _proxies,
    bridge: {
      // when normalizeScroll sets the scroll position (ss = setScroll)
      ss: function ss() {
        _lastScrollTime || _dispatch3("scrollStart");
        _lastScrollTime = _getTime2();
      },
      // a way to get the _refreshing value in Observer
      ref: function ref() {
        return _refreshing;
      }
    }
  };
  _getGSAP3() && gsap3.registerPlugin(ScrollTrigger2);

  // src/digerati/accessibility/reducedMotion.ts
  init_live_reload();
  var reduceMotionActive = false;
  var shouldAnimate = () => !reduceMotionActive;

  // src/client/modules/testimonialAvatar.ts
  gsapWithCSS.registerPlugin(ScrollTrigger2);
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || navigator.vendor && navigator.vendor.indexOf("Apple") > -1 && !window.hasOwnProperty("chrome");
  var testimonialAvatar = () => {
    autoGroup("Testimonial Avatar", () => {
      eventBus.emit("testimonialAvatar:init");
      if (!shouldAnimate()) {
        log("Reduced motion requested; skipping testimonial avatar halftone effects.");
        eventBus.emit("testimonialAvatar:exit", { alt: void 0 });
        return;
      }
      if (isSafari && location.hostname === "localhost") {
        warn("Safari detected in local dev; skipping testimonial avatar halftone effects.");
        eventBus.emit("testimonialAvatar:exit", { alt: void 0 });
        return;
      }
      if (typeof ScrollTrigger2 === "undefined") {
        error("ScrollTrigger is unavailable; aborting testimonialAvatar setup.");
        eventBus.emit("testimonialAvatar:error", {
          message: "ScrollTrigger missing"
        });
        return;
      }
      const avatars = Array.from(
        document.querySelectorAll(".testimonial_half-tone")
      );
      if (!avatars.length) {
        warn("No testimonial avatars found.");
        return;
      }
      log(`Found ${avatars.length} testimonial avatar(s).`);
      const initIfNeeded = (img) => {
        if (img._halftone)
          return;
        try {
          initHalftone(img);
          eventBus.emit("testimonialAvatar:enter", { alt: img.alt });
        } catch (e) {
          error("Failed to initialize halftone for image:", img.alt || "(no alt)", e);
          eventBus.emit("testimonialAvatar:error", {
            message: "halftone-init-failure",
            alt: img.alt
          });
        }
      };
      const destroyIfExists = (img) => {
        if (img._halftone) {
          destroyHalftone(img);
          eventBus.emit("testimonialAvatar:exit", { alt: img.alt });
        }
      };
      avatars.forEach((img) => {
        ScrollTrigger2.create({
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) {
              initIfNeeded(img);
            } else {
              destroyIfExists(img);
            }
          }
        });
      });
      ScrollTrigger2.refresh();
      eventBus.emit("testimonialAvatar:initialized", { count: avatars.length });
    });
  };
  var initHalftone = (img) => {
    log("Initializing halftone for", img.alt || "(no alt)");
    const HalftoneConstructor = window.BreathingHalftone ?? globalThis.BreathingHalftone;
    if (typeof HalftoneConstructor === "undefined") {
      devError("BreathingHalftone constructor is not available.");
      eventBus.emit("testimonialAvatar:error", {
        message: "BreathingHalftone missing",
        alt: img.alt
      });
      return;
    }
    const instance = new HalftoneConstructor(img, {
      dotSize: 1 / 70,
      dotSizeThreshold: 0.025,
      initVelocity: 0.5,
      oscPeriod: 3,
      oscAmplitude: 0.2,
      isAdditive: false,
      isRadial: false,
      channels: ["lum"],
      isChannelLens: true,
      friction: 0.06,
      hoverDiameter: 0.3,
      hoverForce: -0.02,
      activeDiameter: 0.6,
      activeForce: 0.01
    });
    img._halftone = instance;
  };
  var destroyHalftone = (img) => {
    if (img._halftone) {
      log("Destroying halftone for", img.alt || "(no alt)");
      try {
        img._halftone.destroy();
      } catch (e) {
        warn("Error while destroying halftone instance:", e);
      }
      delete img._halftone;
      eventBus.emit("testimonialAvatar:destroyed", { alt: img.alt });
    }
  };

  // src/client/modules/reasonGenerator.ts
  init_live_reload();
  var DEFAULT_SELECTOR = "[dd-reason]";
  var DEFAULT_REASONS = [
    "This page is entangled in a quantum conspiracy, making it simultaneously found and not found until observed by a secret society physicist.",
    "This page has been redirected to a server in the Hollow Earth at the request of our reptilian overlords.",
    "As 404 is an esoteric Illuminati symbol, access to this page has been intentionally obscured to test your initiation level.",
    "Attempting to access this page triggers a mind control buffer overflow, so we've temporarily disabled access for your safety.",
    "Access to this page requires acceptance of secret society cookies, but as they've expired, you'll need to attend a covert baking class to renew them."
  ];
  var pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  var reasonGenerator = (options = {}) => {
    return autoGroup("Reason Generator", () => {
      const selector3 = options.selector ?? DEFAULT_SELECTOR;
      const element = document.querySelector(selector3);
      eventBus.emit("reasonGenerator:started");
      if (!element) {
        devError(`Reason element not found using selector "${selector3}"`);
        eventBus.emit("reasonGenerator:error", { message: "element-not-found" });
        return null;
      }
      const alreadyGenerated = element.dataset.dgrReasonGenerated === "1";
      if (alreadyGenerated && !options.force) {
        log("Reason already generated; skipping (use { force: true } to override)");
        return element.textContent?.trim() || null;
      }
      const pool = options.reasons && options.reasons.length ? options.reasons : DEFAULT_REASONS;
      if (!pool.length) {
        warn("No reasons available to choose from");
        eventBus.emit("reasonGenerator:error", { message: "empty-reason-pool" });
        return null;
      }
      const reason = pickRandom(pool);
      element.textContent = reason;
      element.dataset.dgrReasonGenerated = "1";
      log("Injected reason:", reason);
      eventBus.emit("reasonGenerator:generated", { reason });
      return reason;
    });
  };

  // src/client/modules/faviconHueRotateStepped.ts
  init_live_reload();
  var DURATION = 12e3;
  var STEP_INTERVAL_MS = 500;
  var STEPS = Math.max(8, Math.round(DURATION / STEP_INTERVAL_MS));
  var SIZE32 = 32;
  var SIZE16 = 16;
  var MAX_FPS = 60;
  var faviconHueRotateStepped = () => {
    autoGroup("Favicon Hue Rotate (Stepped)", () => {
      const gate = shouldAnimateFavicon();
      if (!gate.ok) {
        log(`Favicon hue rotation skipped: ${gate.reason ?? "unknown"}`);
        eventBus.emit("faviconHueRotateStepped:skipped", { reason: gate.reason });
        return;
      }
      eventBus.emit("faviconHueRotateStepped:started");
      const baseHref = findBaseHref();
      if (!baseHref) {
        devError("No base favicon found.");
        return;
      }
      const c32 = document.createElement("canvas");
      const ctx32 = c32.getContext("2d");
      if (!ctx32 || typeof c32.toDataURL !== "function")
        return;
      try {
        ctx32.filter = "hue-rotate(0deg)";
      } catch {
      }
      if (!("filter" in ctx32))
        return;
      const c16 = document.createElement("canvas");
      const ctx16 = c16.getContext("2d");
      c32.width = SIZE32;
      c32.height = SIZE32;
      c16.width = SIZE16;
      c16.height = SIZE16;
      Array.from(document.querySelectorAll("link[rel*='icon']")).forEach((n) => n.remove());
      let link32 = makeLink("live-favicon-32", `${SIZE32}x${SIZE32}`);
      let link16 = makeLink("live-favicon-16", `${SIZE16}x${SIZE16}`);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const frames32 = [];
        const frames16 = [];
        for (let i = 0; i < STEPS; i++) {
          const angle = Math.round(i * (360 / STEPS));
          ctx32.clearRect(0, 0, SIZE32, SIZE32);
          ctx32.imageSmoothingEnabled = false;
          ctx32.filter = `hue-rotate(${angle}deg)`;
          ctx32.drawImage(img, 0, 0, SIZE32, SIZE32);
          ctx32.filter = "none";
          frames32[i] = c32.toDataURL("image/png");
          ctx16.clearRect(0, 0, SIZE16, SIZE16);
          ctx16.imageSmoothingEnabled = false;
          ctx16.filter = `hue-rotate(${angle}deg)`;
          ctx16.drawImage(img, 0, 0, SIZE16, SIZE16);
          ctx16.filter = "none";
          frames16[i] = c16.toDataURL("image/png");
        }
        log(`Precomputed ${STEPS} favicon frames`);
        const swapFavicons = (data32, data16) => {
          const n32 = makeLink("live-favicon-32", `${SIZE32}x${SIZE32}`);
          n32.href = data32;
          link32.remove();
          link32 = n32;
          const n16 = makeLink("live-favicon-16", `${SIZE16}x${SIZE16}`);
          n16.href = data16;
          link16.remove();
          link16 = n16;
        };
        let rafId = null;
        let lastCssWriteAt = 0;
        let lastStep = -1;
        const tick = (now) => {
          const cssMinDelta = 1e3 / MAX_FPS;
          if (now - lastCssWriteAt >= cssMinDelta) {
            const phase = now % DURATION / DURATION;
            const angle = Math.round(phase * 360);
            document.documentElement.style.setProperty("--h", `${angle}deg`);
            lastCssWriteAt = now;
          }
          const phaseForStep = now % DURATION / DURATION;
          const stepIndex = Math.floor(phaseForStep * STEPS) % STEPS;
          if (stepIndex !== lastStep) {
            swapFavicons(frames32[stepIndex], frames16[stepIndex]);
            lastStep = stepIndex;
          }
          rafId = requestAnimationFrame(tick);
        };
        const start = () => {
          if (!rafId)
            rafId = requestAnimationFrame(tick);
        };
        const stop = () => {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        };
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden")
            stop();
          else
            start();
        });
        addEventListener("pagehide", () => {
          stop();
        }, { once: true });
        start();
        eventBus.emit("faviconHueRotateStepped:running");
      };
      img.onerror = () => devError("Failed to load base favicon.");
      img.src = baseHref;
    });
  };
  var shouldAnimateFavicon = () => {
    if (matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      return { ok: false, reason: "reduced-motion" };
    }
    if (window.top !== window.self) {
      return { ok: false, reason: "in-iframe" };
    }
    const isStandalone = matchMedia?.("(display-mode: standalone)")?.matches || // iOS PWA flag
    navigator.standalone === true;
    if (isStandalone) {
      return { ok: false, reason: "standalone" };
    }
    const ua = navigator.userAgent;
    const isIOS = /iP(hone|ad|od)/.test(ua);
    const isCriOS = /CriOS/i.test(ua);
    const isFxiOS = /FxiOS/i.test(ua);
    const isSafari2 = /^((?!chrome|android).)*safari/i.test(ua);
    const isIOSSafari = isIOS && isSafari2 && !isCriOS && !isFxiOS;
    if (isIOSSafari) {
      return { ok: false, reason: "ios-safari" };
    }
    return { ok: true };
  };
  var findBaseHref = () => {
    const links = Array.from(document.querySelectorAll("link[rel*='icon']"));
    if (!links.length)
      return null;
    links.sort((a, b) => {
      const ap = /png/i.test(a.type) || /\.png(\?|$)/i.test(a.href) ? 1 : 0;
      const bp = /png/i.test(b.type) || /\.png(\?|$)/i.test(b.href) ? 1 : 0;
      return bp - ap;
    });
    return links[0].href || null;
  };
  var makeLink = (id, sizes) => {
    const l = document.createElement("link");
    l.id = id;
    l.rel = "icon";
    l.type = "image/png";
    l.setAttribute("sizes", sizes);
    document.head.appendChild(l);
    return l;
  };

  // src/index.ts
  initEventDebugLogging();
  var PHASES = {
    domReady: {
      readyFn: domReady,
      event: "core:domReady",
      tasks: [
        () => widowControl({
          skipSelectors: ['[aria-hidden="true"]', ".no-widow"]
        }),
        collectionSplitter,
        copyrightYear,
        tally,
        reasonGenerator,
        initLegalColourCycle,
        () => convertMarkdownToTable({
          selector: "markdown",
          logOutput: true
        })
      ]
    },
    webflowReady: {
      readyFn: webflowReady,
      event: "core:webflowReady",
      tasks: [
        initAutoHideAccordionItem,
        skipToMainContent,
        testimonialAvatar,
        () => autoHideNavbarOnScroll({
          headerSelector: "header",
          hiddenClass: "navbar-hidden",
          injectCSS: true
        }),
        // () => Core.initPageBlurTitle({ messages: blurMessages }),
        () => smoothScroll({ duration: 800, easing: "easeOutCubic" }),
        faviconHueRotateStepped
      ]
    },
    fontReady: {
      readyFn: fontReady,
      event: "core:fontReady",
      tasks: []
    },
    ix2Ready: {
      readyFn: ix2Ready,
      event: "core:ix2Ready",
      tasks: []
    }
  };
  Object.values(PHASES).forEach(({ readyFn, event, tasks = [] }) => {
    readyFn(() => {
      autoGroup(event, () => {
        eventBus.emit(event);
        tasks.forEach((fn, i) => {
          try {
            if (typeof fn === "function") {
              fn();
            } else {
              console.warn(`[${event}] skipped non-function task at index ${i}:`, fn);
            }
          } catch (err) {
            console.error(`[${event}] task failed:`, err);
          }
        });
      });
    });
  });
})();
/*! Bundled license information:

showdown/dist/showdown.js:
  (*! showdown v 2.1.0 - 21-04-2022 *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
//# sourceMappingURL=index.js.map
