_cne.s = new AppMeasurement()
_cne.s.linkInternalFilters += ",thescene.com,cnevids.com";
_cne.s.server = "";
_cne.s.channel = "";
_cne.s.pageType = "";
_cne.s.currencyCode = "USD";
_cne.s.ActionDepthTest = true
_cne.s.socAuthVar = 'eVar72';

/* Make sure s.events exists */
_cne.s.events = _cne.s.events ? _cne.s.events : '';

/*
_cne.s=s_gi(AAStats.s_account);
_cne.s.trackingServer        = AAStats.server;
_cne.s.trackingServerSecure  = AAStats.secureServer;
_cne.s.linkInternalFilters       = AAStats.internalFilters;
*/
_cne.s.debugTracking=false
_cne.s.charSet = "UTF-8"

/* Link and ClickMap tracking */
_cne.s.trackDownloadLinks=false
_cne.s.trackExternalLinks=false
_cne.s.trackInlineStats=false
_cne.s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
_cne.s.linkInternalFilters="javascript:,."
_cne.s.linkLeaveQueryString=false
_cne.s.linkTrackVars="None"
_cne.s.linkTrackEvents="None"


/* Added by dan segal (7/28/15) */
_cne.s.linkInternalFilters+=",thescene.com,cnevids.com";
/* Added by dan segal (7/28/15) */


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
_cne.s.visitorNamespace = "condenast"


_cne.s.loadModule("Integrate")
_cne.s.Integrate.onLoad = function(s, m) {

}

/*DIL code V5*/
"function" != typeof DIL && (DIL = function(a, b) {
    var d = [],
        c, e;
    a !== Object(a) && (a = {});
    var f, g, k, r, t, n, u, D, m, z, H;
    f = a.partner;
    g = a.containerNSID;
    k = a.iframeAttachmentDelay;
    r = !!a.disableDestinationPublishingIframe;
    t = a.iframeAkamaiHTTPS;
    n = a.mappings;
    u = a.uuidCookie;
    D = !0 === a.enableErrorReporting;
    m = a.visitorService;
    z = a.declaredId;
    H = !0 === a.removeFinishedScriptsAndCallbacks;
    var I, J, E, B;
    I = !0 === a.disableScriptAttachment;
    J = !0 === a.disableDefaultRequest;
    E = a.afterResultForDefaultRequest;
    B = a.dpIframeSrc;
    D && DIL.errorModule.activate();
    var K = !0 === window._dil_unit_tests;
    (c = b) && d.push(c + "");
    if (!f || "string" != typeof f) return c = "DIL partner is invalid or not specified in initConfig", DIL.errorModule.handleError({
        name: "error",
        message: c,
        filename: "dil.js"
    }), Error(c);
    c = "DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";
    if (g || "number" == typeof g) g = parseInt(g, 10), !isNaN(g) && 0 <= g && (c = "");
    c && (g = 0, d.push(c), c = "");
    e = DIL.getDil(f, g);
    if (e instanceof DIL && e.api.getPartner() == f && e.api.getContainerNSID() == g) return e;
    if (this instanceof DIL) DIL.registerDil(this, f, g);
    else return new DIL(a, "DIL was not instantiated with the 'new' operator, returning a valid instance with partner = " + f + " and containerNSID = " + g);
    var w = {
            IS_HTTPS: "https:" == document.location.protocol,
            POST_MESSAGE_ENABLED: !!window.postMessage,
            COOKIE_MAX_EXPIRATION_DATE: "Tue, 19 Jan 2038 03:14:07 UTC"
        },
        F = {
            stuffed: {}
        },
        l = {},
        p = {
            firingQueue: [],
            fired: [],
            firing: !1,
            sent: [],
            errored: [],
            reservedKeys: {
                sids: !0,
                pdata: !0,
                logdata: !0,
                callback: !0,
                postCallbackFn: !0,
                useImageRequest: !0
            },
            callbackPrefix: "demdexRequestCallback",
            firstRequestHasFired: !1,
            useJSONP: !0,
            abortRequests: !1,
            num_of_jsonp_responses: 0,
            num_of_jsonp_errors: 0,
            num_of_img_responses: 0,
            num_of_img_errors: 0,
            toRemove: [],
            removed: [],
            readyToRemove: !1,
            platformParams: {
                d_nsid: g + "",
                d_rtbd: "json",
                d_jsonv: DIL.jsonVersion + "",
                d_dst: "1"
            },
            nonModStatsParams: {
                d_rtbd: !0,
                d_dst: !0,
                d_cts: !0,
                d_rs: !0
            },
            modStatsParams: null,
            adms: {
                TIME_TO_CATCH_ALL_REQUESTS_RELEASE: 2E3,
                calledBack: !1,
                mid: null,
                noVisitorAPI: !1,
                instance: null,
                releaseType: "no VisitorAPI",
                admsProcessingStarted: !1,
                process: function(h) {
                    try {
                        if (!this.admsProcessingStarted) {
                            var a = this,
                                v, b, c, d, f;
                            if ("function" == typeof h && "function" == typeof h.getInstance) {
                                if (m === Object(m) && (v = m.namespace) && "string" == typeof v) b = h.getInstance(v);
                                else {
                                    this.releaseType = "no namespace";
                                    this.releaseRequests();
                                    return
                                }
                                if (b === Object(b) && "function" == typeof b.isAllowed && "function" == typeof b.getMarketingCloudVisitorID) {
                                    if (!b.isAllowed()) {
                                        this.releaseType = "VisitorAPI not allowed";
                                        this.releaseRequests();
                                        return
                                    }
                                    this.instance =
                                        b;
                                    this.admsProcessingStarted = !0;
                                    c = function(h) {
                                        "VisitorAPI" != a.releaseType && (a.mid = h, a.releaseType = "VisitorAPI", a.releaseRequests())
                                    };
                                    K && (d = m.server) && "string" == typeof d && (b.server = d);
                                    f = b.getMarketingCloudVisitorID(c);
                                    if ("string" == typeof f && f.length) {
                                        c(f);
                                        return
                                    }
                                    setTimeout(function() {
                                        "VisitorAPI" != a.releaseType && (a.releaseType = "timeout", a.releaseRequests())
                                    }, this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);
                                    return
                                }
                                this.releaseType = "invalid instance"
                            } else this.noVisitorAPI = !0;
                            this.releaseRequests()
                        }
                    } catch (e) {
                        this.releaseRequests()
                    }
                },
                releaseRequests: function() {
                    this.calledBack = !0;
                    p.registerRequest()
                },
                getMarketingCloudVisitorID: function() {
                    return this.instance ? this.instance.getMarketingCloudVisitorID() : null
                },
                getMIDQueryString: function() {
                    var h = s.isPopulatedString,
                        a = this.getMarketingCloudVisitorID();
                    h(this.mid) && this.mid == a || (this.mid = a);
                    return h(this.mid) ? "d_mid=" + this.mid + "&" : ""
                }
            },
            declaredId: {
                declaredId: {
                    init: null,
                    request: null
                },
                declaredIdCombos: {},
                setDeclaredId: function(h, a) {
                    var b = s.isPopulatedString,
                        c = encodeURIComponent;
                    if (h ===
                        Object(h) && b(a)) {
                        var d = h.dpid,
                            f = h.dpuuid,
                            e = null;
                        if (b(d) && b(f)) {
                            e = c(d) + "$" + c(f);
                            if (!0 === this.declaredIdCombos[e]) return "setDeclaredId: combo exists for type '" + a + "'";
                            this.declaredIdCombos[e] = !0;
                            this.declaredId[a] = {
                                dpid: d,
                                dpuuid: f
                            };
                            return "setDeclaredId: succeeded for type '" + a + "'"
                        }
                    }
                    return "setDeclaredId: failed for type '" + a + "'"
                },
                getDeclaredIdQueryString: function() {
                    var h = this.declaredId.request,
                        a = this.declaredId.init,
                        b = "";
                    null !== h ? b = "&d_dpid=" + h.dpid + "&d_dpuuid=" + h.dpuuid : null !== a && (b = "&d_dpid=" + a.dpid +
                        "&d_dpuuid=" + a.dpuuid);
                    return b
                }
            },
            registerRequest: function(h) {
                var a = this.firingQueue;
                h === Object(h) && a.push(h);
                !this.firing && a.length && (this.adms.calledBack ? (h = a.shift(), h.src = h.src.replace(/demdex.net\/event\?d_nsid=/, "demdex.net/event?" + this.adms.getMIDQueryString() + "d_nsid="), x.fireRequest(h), this.firstRequestHasFired || "script" != h.tag || (this.firstRequestHasFired = !0)) : this.processVisitorAPI())
            },
            processVisitorAPI: function() {
                this.adms.process(window.Visitor)
            },
            requestRemoval: function(h) {
                if (!H) return "removeFinishedScriptsAndCallbacks is not boolean true";
                var a = this.toRemove,
                    b, c;
                h === Object(h) && (b = h.script, c = h.callbackName, (b === Object(b) && "SCRIPT" == b.nodeName || "no script created" == b) && "string" == typeof c && c.length && a.push(h));
                if (this.readyToRemove && a.length) {
                    c = a.shift();
                    b = c.script;
                    c = c.callbackName;
                    "no script created" != b ? (h = b.src, b.parentNode.removeChild(b)) : h = b;
                    window[c] = null;
                    try {
                        delete window[c]
                    } catch (d) {}
                    this.removed.push({
                        scriptSrc: h,
                        callbackName: c
                    });
                    DIL.variables.scriptsRemoved.push(h);
                    DIL.variables.callbacksRemoved.push(c);
                    return this.requestRemoval()
                }
                return "requestRemoval() processed"
            }
        };
    e = function() {
        var h = "http://fast.",
            a = "?d_nsid=" + g + "#" + encodeURIComponent(document.location.href);
        if ("string" === typeof B && B.length) return B + a;
        w.IS_HTTPS && (h = !0 === t ? "https://fast." : "https://");
        return h + f + ".demdex.net/dest4.html" + a
    };
    var y = {
            THROTTLE_START: 3E4,
            throttleTimerSet: !1,
            id: "destination_publishing_iframe_" + f + "_" + g,
            url: e(),
            iframe: null,
            iframeHasLoaded: !1,
            sendingMessages: !1,
            messages: [],
            messagesPosted: [],
            messageSendingInterval: w.POST_MESSAGE_ENABLED ? 15 : 100,
            jsonProcessed: [],
            attachIframe: function() {
                var h =
                    this,
                    a = document.createElement("iframe");
                a.id = this.id;
                a.style.cssText = "display: none; width: 0; height: 0;";
                a.src = this.url;
                q.addListener(a, "load", function() {
                    h.iframeHasLoaded = !0;
                    h.requestToProcess()
                });
                document.body.appendChild(a);
                this.iframe = a
            },
            requestToProcess: function(h, a) {
                var b = this;
                h && !s.isEmptyObject(h) && this.process(h, a);
                this.iframeHasLoaded && this.messages.length && !this.sendingMessages && (this.throttleTimerSet || (this.throttleTimerSet = !0, setTimeout(function() {
                    b.messageSendingInterval = w.POST_MESSAGE_ENABLED ?
                        15 : 150
                }, this.THROTTLE_START)), this.sendingMessages = !0, this.sendMessages())
            },
            process: function(h, a) {
                var b = encodeURIComponent,
                    c, d, f, e, g, m;
                a === Object(a) && (m = q.encodeAndBuildRequest(["", a.dpid || "", a.dpuuid || ""], ","));
                if ((c = h.dests) && c instanceof Array && (d = c.length))
                    for (f = 0; f < d; f++) e = c[f], e = [b("dests"), b(e.id || ""), b(e.y || ""), b(e.c || "")], this.addMessage(e.join("|"));
                if ((c = h.ibs) && c instanceof Array && (d = c.length))
                    for (f = 0; f < d; f++) e = c[f], e = [b("ibs"), b(e.id || ""), b(e.tag || ""), q.encodeAndBuildRequest(e.url || [],
                        ","), b(e.ttl || ""), "", m], this.addMessage(e.join("|"));
                if ((c = h.dpcalls) && c instanceof Array && (d = c.length))
                    for (f = 0; f < d; f++) e = c[f], g = e.callback || {}, g = [g.obj || "", g.fn || "", g.key || "", g.tag || "", g.url || ""], e = [b("dpm"), b(e.id || ""), b(e.tag || ""), q.encodeAndBuildRequest(e.url || [], ","), b(e.ttl || ""), q.encodeAndBuildRequest(g, ","), m], this.addMessage(e.join("|"));
                this.jsonProcessed.push(h)
            },
            addMessage: function(h) {
                var a = encodeURIComponent,
                    a = D ? a("---destpub-debug---") : a("---destpub---");
                this.messages.push(a + h)
            },
            sendMessages: function() {
                var h =
                    this,
                    a;
                this.messages.length ? (a = this.messages.shift(), DIL.xd.postMessage(a, this.url, this.iframe.contentWindow), this.messagesPosted.push(a), setTimeout(function() {
                    h.sendMessages()
                }, this.messageSendingInterval)) : this.sendingMessages = !1
            }
        },
        G = {
            traits: function(h) {
                s.isValidPdata(h) && (l.sids instanceof Array || (l.sids = []), q.extendArray(l.sids, h));
                return this
            },
            pixels: function(h) {
                s.isValidPdata(h) && (l.pdata instanceof Array || (l.pdata = []), q.extendArray(l.pdata, h));
                return this
            },
            logs: function(h) {
                s.isValidLogdata(h) &&
                    (l.logdata !== Object(l.logdata) && (l.logdata = {}), q.extendObject(l.logdata, h));
                return this
            },
            customQueryParams: function(h) {
                s.isEmptyObject(h) || q.extendObject(l, h, p.reservedKeys);
                return this
            },
            signals: function(h, a) {
                var b, c = h;
                if (!s.isEmptyObject(c)) {
                    if (a && "string" == typeof a)
                        for (b in c = {}, h) h.hasOwnProperty(b) && (c[a + b] = h[b]);
                    q.extendObject(l, c, p.reservedKeys)
                }
                return this
            },
            declaredId: function(h) {
                p.declaredId.setDeclaredId(h, "request");
                return this
            },
            result: function(h) {
                "function" == typeof h && (l.callback = h);
                return this
            },
            afterResult: function(h) {
                "function" == typeof h && (l.postCallbackFn = h);
                return this
            },
            useImageRequest: function() {
                l.useImageRequest = !0;
                return this
            },
            clearData: function() {
                l = {};
                return this
            },
            submit: function() {
                x.submitRequest(l);
                l = {};
                return this
            },
            getPartner: function() {
                return f
            },
            getContainerNSID: function() {
                return g
            },
            getEventLog: function() {
                return d
            },
            getState: function() {
                var h = {},
                    a = {};
                q.extendObject(h, p, {
                    callbackPrefix: !0,
                    useJSONP: !0,
                    registerRequest: !0
                });
                q.extendObject(a, y, {
                    attachIframe: !0,
                    requestToProcess: !0,
                    process: !0,
                    sendMessages: !0
                });
                return {
                    pendingRequest: l,
                    otherRequestInfo: h,
                    destinationPublishingInfo: a
                }
            },
            idSync: function(a) {
                if (a !== Object(a) || "string" != typeof a.dpid || !a.dpid.length) return "Error: config or config.dpid is empty";
                if ("string" != typeof a.url || !a.url.length) return "Error: config.url is empty";
                var b = a.url,
                    c = a.minutesToLive,
                    d = encodeURIComponent,
                    f, b = b.replace(/^https:/, "").replace(/^http:/, "");
                if ("undefined" == typeof c) c = 20160;
                else if (c = parseInt(c, 10), isNaN(c) || 0 >= c) return "Error: config.minutesToLive needs to be a positive number";
                f = q.encodeAndBuildRequest(["", a.dpid, a.dpuuid || ""], ",");
                a = ["ibs", d(a.dpid), "img", d(b), c, "", f];
                y.addMessage(a.join("|"));
                p.firstRequestHasFired && y.requestToProcess();
                return "Successfully queued"
            },
            aamIdSync: function(a) {
                if (a !== Object(a) || "string" != typeof a.dpuuid || !a.dpuuid.length) return "Error: config or config.dpuuid is empty";
                a.url = "//dpm.demdex.net/ibs:dpid=" + a.dpid + "&dpuuid=" + a.dpuuid;
                return this.idSync(a)
            },
            passData: function(a) {
                if (s.isEmptyObject(a)) return "Error: json is empty or not an object";
                x.defaultCallback(a);
                return "json submitted for processing"
            },
            getPlatformParams: function() {
                return p.platformParams
            },
            getEventCallConfigParams: function() {
                var a = p,
                    b = a.modStatsParams,
                    c = a.platformParams,
                    d;
                if (!b) {
                    b = {};
                    for (d in c) c.hasOwnProperty(d) && !a.nonModStatsParams[d] && (b[d.replace(/^d_/, "")] = c[d]);
                    a.modStatsParams = b
                }
                return b
            }
        },
        x = {
            submitRequest: function(a) {
                p.registerRequest(x.createQueuedRequest(a));
                return !0
            },
            createQueuedRequest: function(a) {
                var b = p,
                    c, d = a.callback,
                    e = "img";
                if (!s.isEmptyObject(n)) {
                    var A, m, u;
                    for (A in n) n.hasOwnProperty(A) &&
                        (m = n[A], null != m && "" !== m && A in a && !(m in a || m in p.reservedKeys) && (u = a[A], null != u && "" !== u && (a[m] = u)))
                }
                s.isValidPdata(a.sids) || (a.sids = []);
                s.isValidPdata(a.pdata) || (a.pdata = []);
                s.isValidLogdata(a.logdata) || (a.logdata = {});
                a.logdataArray = q.convertObjectToKeyValuePairs(a.logdata, "=", !0);
                a.logdataArray.push("_ts=" + (new Date).getTime());
                "function" != typeof d && (d = this.defaultCallback);
                if (b.useJSONP = !a.useImageRequest || "boolean" != typeof a.useImageRequest) e = "script", c = b.callbackPrefix + "_" + f + "_" + g + "_" + (new Date).getTime();
                return {
                    tag: e,
                    src: x.makeRequestSrc(a, c),
                    internalCallbackName: c,
                    callbackFn: d,
                    postCallbackFn: a.postCallbackFn,
                    useImageRequest: a.useImageRequest,
                    requestData: a
                }
            },
            defaultCallback: function(a, b) {
                var c, d, f, e, g, m, n, l, k;
                if ((c = a.stuff) && c instanceof Array && (d = c.length))
                    for (f = 0; f < d; f++)
                        if ((e = c[f]) && e === Object(e)) {
                            g = e.cn;
                            m = e.cv;
                            n = e.ttl;
                            if ("undefined" == typeof n || "" === n) n = Math.floor(q.getMaxCookieExpiresInMinutes() / 60 / 24);
                            l = e.dmn || "." + document.domain.replace(/^www\./, "");
                            k = e.type;
                            g && (m || "number" == typeof m) && ("var" !=
                                k && (n = parseInt(n, 10)) && !isNaN(n) && q.setCookie(g, m, 1440 * n, "/", l, !1), F.stuffed[g] = m)
                        }
                c = a.uuid;
                s.isPopulatedString(c) && !s.isEmptyObject(u) && (d = u.path, "string" == typeof d && d.length || (d = "/"), f = parseInt(u.days, 10), isNaN(f) && (f = 100), q.setCookie(u.name || "aam_did", c, 1440 * f, d, u.domain || "." + document.domain.replace(/^www\./, ""), !0 === u.secure));
                r || p.abortRequests || y.requestToProcess(a, b)
            },
            makeRequestSrc: function(a, b) {
                a.sids = s.removeEmptyArrayValues(a.sids || []);
                a.pdata = s.removeEmptyArrayValues(a.pdata || []);
                var c =
                    p,
                    d = c.platformParams,
                    e = q.encodeAndBuildRequest(a.sids, ","),
                    g = q.encodeAndBuildRequest(a.pdata, ","),
                    m = (a.logdataArray || []).join("&");
                delete a.logdataArray;
                var n = w.IS_HTTPS ? "https://" : "http://",
                    u = c.declaredId.getDeclaredIdQueryString(),
                    l;
                l = [];
                var k, t, r, z;
                for (k in a)
                    if (!(k in c.reservedKeys) && a.hasOwnProperty(k))
                        if (t = a[k], k = encodeURIComponent(k), t instanceof Array)
                            for (r = 0, z = t.length; r < z; r++) l.push(k + "=" + encodeURIComponent(t[r]));
                        else l.push(k + "=" + encodeURIComponent(t));
                l = l.length ? "&" + l.join("&") : "";
                return n +
                    f + ".demdex.net/event?d_nsid=" + d.d_nsid + u + (e.length ? "&d_sid=" + e : "") + (g.length ? "&d_px=" + g : "") + (m.length ? "&d_ld=" + encodeURIComponent(m) : "") + l + (c.useJSONP ? "&d_rtbd=" + d.d_rtbd + "&d_jsonv=" + d.d_jsonv + "&d_dst=" + d.d_dst + "&d_cb=" + (b || "") : "")
            },
            fireRequest: function(a) {
                if ("img" == a.tag) this.fireImage(a);
                else if ("script" == a.tag) {
                    var b = p.declaredId,
                        b = b.declaredId.request || b.declaredId.init || {};
                    this.fireScript(a, {
                        dpid: b.dpid || "",
                        dpuuid: b.dpuuid || ""
                    })
                }
            },
            fireImage: function(a) {
                var b = p,
                    f, e;
                b.abortRequests || (b.firing = !0, f = new Image(0, 0), b.sent.push(a), f.onload = function() {
                    b.firing = !1;
                    b.fired.push(a);
                    b.num_of_img_responses++;
                    b.registerRequest()
                }, e = function(f) {
                    c = "imgAbortOrErrorHandler received the event of type " + f.type;
                    d.push(c);
                    b.abortRequests = !0;
                    b.firing = !1;
                    b.errored.push(a);
                    b.num_of_img_errors++;
                    b.registerRequest()
                }, f.addEventListener ? (f.addEventListener("error", e, !1), f.addEventListener("abort", e, !1)) : f.attachEvent && (f.attachEvent("onerror", e), f.attachEvent("onabort", e)), f.src = a.src)
            },
            fireScript: function(a,
                b) {
                var e = this,
                    g = p,
                    m, n, u = a.src,
                    k = a.postCallbackFn,
                    l = "function" == typeof k,
                    t = a.internalCallbackName;
                g.abortRequests || (g.firing = !0, window[t] = function(e) {
                        try {
                            e !== Object(e) && (e = {});
                            var m = a.callbackFn;
                            g.firing = !1;
                            g.fired.push(a);
                            g.num_of_jsonp_responses++;
                            m(e, b);
                            l && k(e, b)
                        } catch (v) {
                            v.message = "DIL jsonp callback caught error with message " + v.message;
                            c = v.message;
                            d.push(c);
                            v.filename = v.filename || "dil.js";
                            v.partner = f;
                            DIL.errorModule.handleError(v);
                            try {
                                m({
                                    error: v.name + "|" + v.message
                                }), l && k({
                                    error: v.name + "|" + v.message
                                })
                            } catch (u) {}
                        } finally {
                            g.requestRemoval({
                                script: n,
                                callbackName: t
                            }), g.registerRequest()
                        }
                    }, I ? (g.firing = !1, g.requestRemoval({
                        script: "no script created",
                        callbackName: t
                    })) : (n = document.createElement("script"), n.addEventListener && n.addEventListener("error", function(b) {
                        g.requestRemoval({
                            script: n,
                            callbackName: t
                        });
                        c = "jsonp script tag error listener received the event of type " + b.type + " with src " + u;
                        e.handleScriptError(c, a)
                    }, !1), n.type = "text/javascript", n.src = u, m = DIL.variables.scriptNodeList[0], m.parentNode.insertBefore(n, m)), g.sent.push(a), g.declaredId.declaredId.request =
                    null)
            },
            handleScriptError: function(a, b) {
                var c = p;
                d.push(a);
                c.abortRequests = !0;
                c.firing = !1;
                c.errored.push(b);
                c.num_of_jsonp_errors++;
                c.registerRequest()
            }
        },
        s = {
            isValidPdata: function(a) {
                return a instanceof Array && this.removeEmptyArrayValues(a).length ? !0 : !1
            },
            isValidLogdata: function(a) {
                return !this.isEmptyObject(a)
            },
            isEmptyObject: function(a) {
                if (a !== Object(a)) return !0;
                for (var b in a)
                    if (a.hasOwnProperty(b)) return !1;
                return !0
            },
            removeEmptyArrayValues: function(a) {
                for (var b = 0, c = a.length, d, e = [], b = 0; b < c; b++) d = a[b],
                    "undefined" != typeof d && null != d && e.push(d);
                return e
            },
            isPopulatedString: function(a) {
                return "string" == typeof a && a.length
            }
        },
        q = {
            addListener: function() {
                if (document.addEventListener) return function(a, b, c) {
                    a.addEventListener(b, function(a) {
                        "function" == typeof c && c(a)
                    }, !1)
                };
                if (document.attachEvent) return function(a, b, c) {
                    a.attachEvent("on" + b, function(a) {
                        "function" == typeof c && c(a)
                    })
                }
            }(),
            convertObjectToKeyValuePairs: function(a, b, c) {
                var d = [];
                b = b || "=";
                var e, f;
                for (e in a) f = a[e], "undefined" != typeof f && null != f && d.push(e +
                    b + (c ? encodeURIComponent(f) : f));
                return d
            },
            encodeAndBuildRequest: function(a, b) {
                return this.map(a, function(a) {
                    return encodeURIComponent(a)
                }).join(b)
            },
            map: function(a, b) {
                if (Array.prototype.map) return a.map(b);
                if (void 0 === a || null === a) throw new TypeError;
                var c = Object(a),
                    d = c.length >>> 0;
                if ("function" !== typeof b) throw new TypeError;
                for (var e = Array(d), f = 0; f < d; f++) f in c && (e[f] = b.call(b, c[f], f, c));
                return e
            },
            filter: function(a, b) {
                if (!Array.prototype.filter) {
                    if (void 0 === a || null === a) throw new TypeError;
                    var c = Object(a),
                        d = c.length >>> 0;
                    if ("function" !== typeof b) throw new TypeError;
                    for (var f = [], e = 0; e < d; e++)
                        if (e in c) {
                            var g = c[e];
                            b.call(b, g, e, c) && f.push(g)
                        }
                    return f
                }
                return a.filter(b)
            },
            getCookie: function(a) {
                a += "=";
                var b = document.cookie.split(";"),
                    c, d, e;
                c = 0;
                for (d = b.length; c < d; c++) {
                    for (e = b[c];
                        " " == e.charAt(0);) e = e.substring(1, e.length);
                    if (0 == e.indexOf(a)) return decodeURIComponent(e.substring(a.length, e.length))
                }
                return null
            },
            setCookie: function(a, b, c, d, e, f) {
                var g = new Date;
                c && (c *= 6E4);
                document.cookie = a + "=" + encodeURIComponent(b) +
                    (c ? ";expires=" + (new Date(g.getTime() + c)).toUTCString() : "") + (d ? ";path=" + d : "") + (e ? ";domain=" + e : "") + (f ? ";secure" : "")
            },
            extendArray: function(a, b) {
                return a instanceof Array && b instanceof Array ? (Array.prototype.push.apply(a, b), !0) : !1
            },
            extendObject: function(a, b, c) {
                var d;
                if (a === Object(a) && b === Object(b)) {
                    for (d in b) !b.hasOwnProperty(d) || !s.isEmptyObject(c) && d in c || (a[d] = b[d]);
                    return !0
                }
                return !1
            },
            getMaxCookieExpiresInMinutes: function() {
                return ((new Date(w.COOKIE_MAX_EXPIRATION_DATE)).getTime() - (new Date).getTime()) /
                    1E3 / 60
            }
        };
    "error" == f && 0 == g && q.addListener(window, "load", function() {
        DIL.windowLoaded = !0
    });
    var C = function() {
            M();
            r || p.abortRequests || y.attachIframe();
            p.readyToRemove = !0;
            p.requestRemoval()
        },
        M = function() {
            r || setTimeout(function() {
                J || p.firstRequestHasFired || p.adms.admsProcessingStarted || p.adms.calledBack || ("function" == typeof E ? G.afterResult(E).submit() : G.submit())
            }, DIL.constants.TIME_TO_DEFAULT_REQUEST)
        },
        L = document;
    "error" != f && (DIL.windowLoaded ? C() : "complete" != L.readyState && "loaded" != L.readyState ? q.addListener(window,
        "load", C) : DIL.isAddedPostWindowLoadWasCalled ? q.addListener(window, "load", C) : (k = "number" == typeof k ? parseInt(k, 10) : 0, 0 > k && (k = 0), setTimeout(C, k || DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));
    p.declaredId.setDeclaredId(z, "init");
    this.api = G;
    this.getStuffedVariable = function(a) {
        var b = F.stuffed[a];
        b || "number" == typeof b || (b = q.getCookie(a)) || "number" == typeof b || (b = "");
        return b
    };
    this.validators = s;
    this.helpers = q;
    this.constants = w;
    this.log = d;
    K && (this.pendingRequest = l, this.requestController = p, this.setDestinationPublishingUrl =
        e, this.destinationPublishing = y, this.requestProcs = x, this.variables = F)
}, function() {
    var a = document,
        b;
    null == a.readyState && a.addEventListener && (a.readyState = "loading", a.addEventListener("DOMContentLoaded", b = function() {
        a.removeEventListener("DOMContentLoaded", b, !1);
        a.readyState = "complete"
    }, !1))
}(), DIL.extendStaticPropertiesAndMethods = function(a) {
    var b;
    if (a === Object(a))
        for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
}, DIL.extendStaticPropertiesAndMethods({
    version: "5.0",
    jsonVersion: 1,
    constants: {
        TIME_TO_DEFAULT_REQUEST: 50,
        TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT: 500
    },
    variables: {
        scriptNodeList: document.getElementsByTagName("script"),
        scriptsRemoved: [],
        callbacksRemoved: []
    },
    windowLoaded: !1,
    dils: {},
    isAddedPostWindowLoadWasCalled: !1,
    isAddedPostWindowLoad: function(a) {
        this.isAddedPostWindowLoadWasCalled = !0;
        this.windowLoaded = "function" == typeof a ? !!a() : "boolean" == typeof a ? a : !0
    },
    create: function(a) {
        try {
            return new DIL(a)
        } catch (b) {
            return (new Image(0, 0)).src = "http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D" +
                (new Date).getTime(), Error("Error in attempt to create DIL instance with DIL.create()")
        }
    },
    registerDil: function(a, b, d) {
        b = b + "$" + d;
        b in this.dils || (this.dils[b] = a)
    },
    getDil: function(a, b) {
        var d;
        "string" != typeof a && (a = "");
        b || (b = 0);
        d = a + "$" + b;
        return d in this.dils ? this.dils[d] : Error("The DIL instance with partner = " + a + " and containerNSID = " + b + " was not found")
    },
    dexGetQSVars: function(a, b, d) {
        b = this.getDil(b, d);
        return b instanceof this ? b.getStuffedVariable(a) : ""
    },
    xd: {
        postMessage: function(a, b, d) {
            var c = 1;
            b &&
                (window.postMessage ? d.postMessage(a, b.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : b && (d.location = b.replace(/#.*$/, "") + "#" + +new Date + c++ + "&" + a))
        }
    }
}), DIL.errorModule = function() {
    var a = DIL.create({
            partner: "error",
            containerNSID: 0,
            disableDestinationPublishingIframe: !0
        }),
        b = {
            harvestererror: 14138,
            destpuberror: 14139,
            dpmerror: 14140,
            generalerror: 14137,
            error: 14137,
            noerrortypedefined: 15021,
            evalerror: 15016,
            rangeerror: 15017,
            referenceerror: 15018,
            typeerror: 15019,
            urierror: 15020
        },
        d = !1;
    return {
        activate: function() {
            d = !0
        },
        handleError: function(c) {
            if (!d) return "DIL error module has not been activated";
            c !== Object(c) && (c = {});
            var e = c.name ? (new String(c.name)).toLowerCase() : "",
                f = [];
            c = {
                name: e,
                filename: c.filename ? c.filename + "" : "",
                partner: c.partner ? c.partner + "" : "no_partner",
                site: c.site ? c.site + "" : document.location.href,
                message: c.message ? c.message + "" : ""
            };
            f.push(e in b ? b[e] : b.noerrortypedefined);
            a.api.pixels(f).logs(c).useImageRequest().submit();
            return "DIL error report sent"
        },
        pixelMap: b
    }
}(), DIL.tools = {}, DIL.modules = {
    helpers: {
        handleModuleError: function(a, b, d) {
            var c = "";
            b = b || "Error caught in DIL module/submodule: ";
            a === Object(a) ? c = b + (a.message || "err has no message") : (c = b + "err is not a valid object", a = {});
            a.message = c;
            d instanceof DIL && (a.partner = d.api.getPartner());
            DIL.errorModule.handleError(a);
            return this.errorMessage = c
        }
    }
});
DIL.tools.getSearchReferrer = function(a, b) {
    var d = DIL.getDil("error"),
        c = DIL.tools.decomposeURI(a || document.referrer),
        e = "",
        f = "",
        g = {
            queryParam: "q"
        };
    return (e = d.helpers.filter([b === Object(b) ? b : {}, {
        hostPattern: /aol\./
    }, {
        hostPattern: /ask\./
    }, {
        hostPattern: /bing\./
    }, {
        hostPattern: /google\./
    }, {
        hostPattern: /yahoo\./,
        queryParam: "p"
    }], function(a) {
        return !(!a.hasOwnProperty("hostPattern") || !c.hostname.match(a.hostPattern))
    }).shift()) ? {
        valid: !0,
        name: c.hostname,
        keywords: (d.helpers.extendObject(g, e), f = g.queryPattern ?
            (e = ("" + c.search).match(g.queryPattern)) ? e[1] : "" : c.uriParams[g.queryParam], decodeURIComponent(f || "").replace(/\+|%20/g, " "))
    } : {
        valid: !1,
        name: "",
        keywords: ""
    }
};
DIL.tools.decomposeURI = function(a) {
    var b = DIL.getDil("error"),
        d = document.createElement("a");
    d.href = a || document.referrer;
    return {
        hash: d.hash,
        host: d.host.split(":").shift(),
        hostname: d.hostname,
        href: d.href,
        pathname: d.pathname.replace(/^\//, ""),
        protocol: d.protocol,
        search: d.search,
        uriParams: function(a, d) {
            b.helpers.map(d.split("&"), function(b) {
                b = b.split("=");
                a[b.shift()] = b.shift()
            });
            return a
        }({}, d.search.replace(/^(\/|\?)?|\/$/g, ""))
    }
};
DIL.tools.getMetaTags = function() {
    var a = {},
        b = document.getElementsByTagName("meta"),
        d, c, e, f, g;
    d = 0;
    for (e = arguments.length; d < e; d++)
        if (f = arguments[d], null !== f)
            for (c = 0; c < b.length; c++)
                if (g = b[c], g.name == f) {
                    a[f] = g.content;
                    break
                }
    return a
};
DIL.modules.siteCatalyst = {
    dil: null,
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, b, d, c) {
        try {
            var e = this,
                f = {
                    name: "DIL Site Catalyst Module Error"
                },
                g = function(a) {
                    f.message = a;
                    DIL.errorModule.handleError(f);
                    return a
                };
            this.options = c === Object(c) ? c : {};
            this.dil = null;
            if (b instanceof DIL) this.dil = b;
            else return g("dilInstance is not a valid instance of DIL");
            f.partner = b.api.getPartner();
            if (a !== Object(a)) return g("siteCatalystReportingSuite is not an object");
            window.AppMeasurement_Module_DIL = a.m_DIL =
                function(a) {
                    var b = "function" === typeof a.m_i ? a.m_i("DIL") : this;
                    if (b !== Object(b)) return g("m is not an object");
                    b.trackVars = e.constructTrackVars(d);
                    b.d = 0;
                    b.s = a;
                    b._t = function() {
                        var a, b, c = "," + this.trackVars + ",",
                            d = this.s,
                            f, k = [];
                        f = [];
                        var t = {},
                            r = !1;
                        if (d !== Object(d)) return g("Error in m._t function: s is not an object");
                        if (this.d) {
                            if ("function" == typeof d.foreachVar) d.foreachVar(function(a, b) {
                                t[a] = b;
                                r = !0
                            }, this.trackVars);
                            else {
                                if (!(d.va_t instanceof Array)) return g("Error in m._t function: s.va_t is not an array");
                                if (d.lightProfileID)(a = d.lightTrackVars) && (a = "," + a + "," + d.vl_mr + ",");
                                else if (d.pe || d.linkType) a = d.linkTrackVars, d.pe && (b = d.pe.substring(0, 1).toUpperCase() + d.pe.substring(1), d[b] && (a = d[b].trackVars)), a && (a = "," + a + "," + d.vl_l + "," + d.vl_l2 + ",");
                                if (a) {
                                    b = 0;
                                    for (k = a.split(","); b < k.length; b++) 0 <= c.indexOf("," + k[b] + ",") && f.push(k[b]);
                                    f.length && (c = "," + f.join(",") + ",")
                                }
                                f = 0;
                                for (b = d.va_t.length; f < b; f++) a = d.va_t[f], 0 <= c.indexOf("," + a + ",") && null != d[a] && "" !== d[a] && (t[a] = d[a], r = !0)
                            }
                            e.includeContextData(d, e, t).store_populated &&
                                (r = !0);
                            r && this.d.api.signals(t, "c_").submit()
                        }
                    }
                };
            a.loadModule("DIL");
            a.DIL.d = b;
            return f.message ? f.message : "DIL.modules.siteCatalyst.init() completed with no errors"
        } catch (k) {
            return this.handle(k, "DIL.modules.siteCatalyst.init() caught error with message ", this.dil)
        }
    },
    constructTrackVars: function(a) {
        var b = [],
            d, c, e, f, g;
        if (a === Object(a)) {
            d = a.names;
            if (d instanceof Array && (e = d.length))
                for (c = 0; c < e; c++) f = d[c], "string" == typeof f && f.length && b.push(f);
            a = a.iteratedNames;
            if (a instanceof Array && (e = a.length))
                for (c =
                    0; c < e; c++)
                    if (d = a[c], d === Object(d) && (f = d.name, g = parseInt(d.maxIndex, 10), "string" == typeof f && f.length && !isNaN(g) && 0 <= g))
                        for (d = 0; d <= g; d++) b.push(f + d);
            if (b.length) return b.join(",")
        }
        return this.constructTrackVars({
            names: "pageName channel campaign products events pe pev1 pev2 pev3".split(" "),
            iteratedNames: [{
                name: "prop",
                maxIndex: 75
            }, {
                name: "eVar",
                maxIndex: 75
            }]
        })
    },
    includeContextData: function(a, b, d) {
        var c = {},
            e = !1;
        if (a.contextData === Object(a.contextData)) {
            a = a.contextData;
            b = b.options.replaceContextDataPeriodsWith;
            var f, g;
            "string" === typeof b && b.length || (b = "_");
            for (f in a) a.hasOwnProperty(f) && ((g = a[f]) || "number" === typeof g) && (f = ("contextData." + f).replace(/\./g, b), d[f] = g, e = !0)
        }
        c.store_populated = e;
        return c
    }
};
DIL.modules.GA = {
    dil: null,
    arr: null,
    tv: null,
    errorMessage: "",
    defaultTrackVars: ["_setAccount", "_setCustomVar", "_addItem", "_addTrans", "_trackSocial"],
    defaultTrackVarsObj: null,
    signals: {},
    hasSignals: !1,
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, b, d) {
        try {
            this.tv = this.arr = this.dil = null;
            this.errorMessage = "";
            this.signals = {};
            this.hasSignals = !1;
            var c = {
                    name: "DIL GA Module Error"
                },
                e = "";
            b instanceof DIL ? (this.dil = b, c.partner = this.dil.api.getPartner()) : (e = "dilInstance is not a valid instance of DIL",
                c.message = e, DIL.errorModule.handleError(c));
            a instanceof Array && a.length ? this.arr = a : (e = "gaArray is not an array or is empty", c.message = e, DIL.errorModule.handleError(c));
            this.tv = this.constructTrackVars(d);
            this.errorMessage = e
        } catch (f) {
            this.handle(f, "DIL.modules.GA.init() caught error with message ", this.dil)
        } finally {
            return this
        }
    },
    constructTrackVars: function(a) {
        var b = [],
            d, c, e, f;
        if (this.defaultTrackVarsObj !== Object(this.defaultTrackVarsObj)) {
            e = this.defaultTrackVars;
            f = {};
            d = 0;
            for (c = e.length; d < c; d++) f[e[d]] = !0;
            this.defaultTrackVarsObj = f
        } else f = this.defaultTrackVarsObj;
        if (a === Object(a)) {
            a = a.names;
            if (a instanceof Array && (c = a.length))
                for (d = 0; d < c; d++) e = a[d], "string" == typeof e && e.length && e in f && b.push(e);
            if (b.length) return b
        }
        return this.defaultTrackVars
    },
    constructGAObj: function(a) {
        var b = {};
        a = a instanceof Array ? a : this.arr;
        var d, c, e, f;
        d = 0;
        for (c = a.length; d < c; d++) e = a[d], e instanceof Array && e.length && (e = [], f = a[d], e instanceof Array && f instanceof Array && Array.prototype.push.apply(e, f), f = e.shift(), "string" == typeof f &&
            f.length && (b[f] instanceof Array || (b[f] = []), b[f].push(e)));
        return b
    },
    addToSignals: function(a, b) {
        if ("string" != typeof a || "" === a || null == b || "" === b) return !1;
        this.signals[a] instanceof Array || (this.signals[a] = []);
        this.signals[a].push(b);
        return this.hasSignals = !0
    },
    constructSignals: function() {
        var a = this.constructGAObj(),
            b = {
                _setAccount: function(a) {
                    this.addToSignals("c_accountId", a)
                },
                _setCustomVar: function(a, b, c, d) {
                    "string" == typeof b && b.length && this.addToSignals("c_" + b, c)
                },
                _addItem: function(a, b, c, d, e, f) {
                    this.addToSignals("c_itemOrderId",
                        a);
                    this.addToSignals("c_itemSku", b);
                    this.addToSignals("c_itemName", c);
                    this.addToSignals("c_itemCategory", d);
                    this.addToSignals("c_itemPrice", e);
                    this.addToSignals("c_itemQuantity", f)
                },
                _addTrans: function(a, b, c, d, e, f, g, k) {
                    this.addToSignals("c_transOrderId", a);
                    this.addToSignals("c_transAffiliation", b);
                    this.addToSignals("c_transTotal", c);
                    this.addToSignals("c_transTax", d);
                    this.addToSignals("c_transShipping", e);
                    this.addToSignals("c_transCity", f);
                    this.addToSignals("c_transState", g);
                    this.addToSignals("c_transCountry",
                        k)
                },
                _trackSocial: function(a, b, c, d) {
                    this.addToSignals("c_socialNetwork", a);
                    this.addToSignals("c_socialAction", b);
                    this.addToSignals("c_socialTarget", c);
                    this.addToSignals("c_socialPagePath", d)
                }
            },
            d = this.tv,
            c, e, f, g, k, r;
        c = 0;
        for (e = d.length; c < e; c++)
            if (f = d[c], a.hasOwnProperty(f) && b.hasOwnProperty(f) && (r = a[f], r instanceof Array))
                for (g = 0, k = r.length; g < k; g++) b[f].apply(this, r[g])
    },
    submit: function() {
        try {
            if ("" !== this.errorMessage) return this.errorMessage;
            this.constructSignals();
            return this.hasSignals ? (this.dil.api.signals(this.signals).submit(),
                "Signals sent: " + this.dil.helpers.convertObjectToKeyValuePairs(this.signals, "=", !0) + this.dil.log) : "No signals present"
        } catch (a) {
            return this.handle(a, "DIL.modules.GA.submit() caught error with message ", this.dil)
        }
    },
    Stuffer: {
        LIMIT: 5,
        dil: null,
        cookieName: null,
        delimiter: null,
        errorMessage: "",
        handle: DIL.modules.helpers.handleModuleError,
        callback: null,
        v: function() {
            return !1
        },
        init: function(a, b, d) {
            try {
                this.callback = this.dil = null, this.errorMessage = "", a instanceof DIL ? (this.dil = a, this.v = this.dil.validators.isPopulatedString,
                    this.cookieName = this.v(b) ? b : "aam_ga", this.delimiter = this.v(d) ? d : "|") : this.handle({
                    message: "dilInstance is not a valid instance of DIL"
                }, "DIL.modules.GA.Stuffer.init() error: ")
            } catch (c) {
                this.handle(c, "DIL.modules.GA.Stuffer.init() caught error with message ", this.dil)
            } finally {
                return this
            }
        },
        process: function(a) {
            var b, d, c, e, f, g;
            g = !1;
            var k = 1;
            if (a === Object(a) && (b = a.stuff) && b instanceof Array && (d = b.length))
                for (a = 0; a < d; a++)
                    if ((c = b[a]) && c === Object(c) && (e = c.cn, f = c.cv, e == this.cookieName && this.v(f))) {
                        g = !0;
                        break
                    }
            if (g) {
                b =
                    f.split(this.delimiter);
                "undefined" == typeof window._gaq && (window._gaq = []);
                c = window._gaq;
                a = 0;
                for (d = b.length; a < d && !(g = b[a].split("="), f = g[0], g = g[1], this.v(f) && this.v(g) && c.push(["_setCustomVar", k++, f, g, 1]), k > this.LIMIT); a++);
                this.errorMessage = 1 < k ? "No errors - stuffing successful" : "No valid values to stuff"
            } else this.errorMessage = "Cookie name and value not found in json";
            if ("function" == typeof this.callback) return this.callback()
        },
        submit: function() {
            try {
                var a = this;
                if ("" !== this.errorMessage) return this.errorMessage;
                this.dil.api.afterResult(function(b) {
                    a.process(b)
                }).submit();
                return "DIL.modules.GA.Stuffer.submit() successful"
            } catch (b) {
                return this.handle(b, "DIL.modules.GA.Stuffer.submit() caught error with message ", this.dil)
            }
        }
    }
};
DIL.modules.Peer39 = {
    aid: "",
    dil: null,
    optionals: null,
    errorMessage: "",
    calledBack: !1,
    script: null,
    scriptsSent: [],
    returnedData: [],
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, b, d) {
        try {
            this.dil = null;
            this.errorMessage = "";
            this.calledBack = !1;
            this.optionals = d === Object(d) ? d : {};
            d = {
                name: "DIL Peer39 Module Error"
            };
            var c = [],
                e = "";
            this.isSecurePageButNotEnabled(document.location.protocol) && (e = "Module has not been enabled for a secure page", c.push(e), d.message = e, DIL.errorModule.handleError(d));
            b instanceof
            DIL ? (this.dil = b, d.partner = this.dil.api.getPartner()) : (e = "dilInstance is not a valid instance of DIL", c.push(e), d.message = e, DIL.errorModule.handleError(d));
            "string" == typeof a && a.length ? this.aid = a : (e = "aid is not a string or is empty", c.push(e), d.message = e, DIL.errorModule.handleError(d));
            this.errorMessage = c.join("\n")
        } catch (f) {
            this.handle(f, "DIL.modules.Peer39.init() caught error with message ", this.dil)
        } finally {
            return this
        }
    },
    isSecurePageButNotEnabled: function(a) {
        return "https:" == a && !0 !== this.optionals.enableHTTPS ?
            !0 : !1
    },
    constructSignals: function() {
        var a = this,
            b = this.constructScript(),
            d = DIL.variables.scriptNodeList[0];
        window["afterFinished_" + this.aid] = function() {
            try {
                var b = a.processData(p39_KVP_Short("c_p", "|").split("|"));
                b.hasSignals && a.dil.api.signals(b.signals).submit()
            } catch (d) {} finally {
                a.calledBack = !0, "function" == typeof a.optionals.afterResult && a.optionals.afterResult()
            }
        };
        d.parentNode.insertBefore(b, d);
        this.scriptsSent.push(b);
        return "Request sent to Peer39"
    },
    processData: function(a) {
        var b, d, c, e, f = {},
            g = !1;
        this.returnedData.push(a);
        if (a instanceof Array)
            for (b = 0, d = a.length; b < d; b++) c = a[b].split("="), e = c[0], c = c[1], e && isFinite(c) && !isNaN(parseInt(c, 10)) && (f[e] instanceof Array || (f[e] = []), f[e].push(c), g = !0);
        return {
            hasSignals: g,
            signals: f
        }
    },
    constructScript: function() {
        var a = document.createElement("script"),
            b = this.optionals,
            d = b.scriptId,
            c = b.scriptSrc,
            b = b.scriptParams;
        a.id = "string" == typeof d && d.length ? d : "peer39ScriptLoader";
        a.type = "text/javascript";
        "string" == typeof c && c.length ? a.src = c : (a.src = (this.dil.constants.IS_HTTPS ?
            "https:" : "http:") + "//stags.peer39.net/" + this.aid + "/trg_" + this.aid + ".js", "string" == typeof b && b.length && (a.src += "?" + b));
        return a
    },
    submit: function() {
        try {
            return "" !== this.errorMessage ? this.errorMessage : this.constructSignals()
        } catch (a) {
            return this.handle(a, "DIL.modules.Peer39.submit() caught error with message ", this.dil)
        }
    }
};

//should the id synd go here instead//

function AppMeasurement_Module_Integrate(s) {
    var m = this;
    m.s = s;
    var w = window;
    if (!w.s_c_in) w.s_c_il = [], w.s_c_in = 0;
    m._il = w.s_c_il;
    m._in = w.s_c_in;
    m._il[m._in] = m;
    w.s_c_in++;
    m._c = "s_m";
    m.list = [];
    m.add = function(c, b) {
        var a;
        b || (b = "s_Integrate_" + c);
        w[b] || (w[b] = {});
        a = m[c] = w[b];
        a.a = c;
        a.e = m;
        a._c = 0;
        a._d = 0;
        a.disable == void 0 && (a.disable = 0);
        a.get = function(b, c) {
            var d = document,
                f = d.getElementsByTagName("HEAD"),
                g;
            if (!a.disable && (c || (v = "s_" + m._in + "_Integrate_" + a.a + "_get_" + a._c), a._c++, a.VAR = v, a.CALLBACK = "s_c_il[" + m._in +
                    "]." + a.a + ".callback", a.delay(), f = f && f.length > 0 ? f[0] : d.body)) try {
                g = d.createElement("SCRIPT");
                g.type = "text/javascript";
                g.setAttribute("async", "async");
                g.src = m.c(a, b);
                if (b.indexOf("[CALLBACK]") < 0) g.onload = g.onreadystatechange = function() {
                    a.callback(w[v])
                };
                f.firstChild ? f.insertBefore(g, f.firstChild) : f.appendChild(g)
            } catch (s) {}
        };
        a.callback = function(b) {
            var m;
            if (b)
                for (m in b) Object.prototype[m] || (a[m] = b[m]);
            a.ready()
        };
        a.beacon = function(b) {
            var c = "s_i_" + m._in + "_Integrate_" + a.a + "_" + a._c;
            if (!a.disable) a._c++,
                c = w[c] = new Image, c.src = m.c(a, b)
        };
        a.script = function(b) {
            a.get(b, 1)
        };
        a.delay = function() {
            a._d++
        };
        a.ready = function() {
            a._d--;
            a.disable || s.delayReady()
        };
        m.list.push(c)
    };
    m._g = function(c) {
        var b, a = (c ? "use" : "set") + "Vars";
        for (c = 0; c < m.list.length; c++)
            if ((b = m[m.list[c]]) && !b.disable && b[a]) try {
                b[a](s, b)
            } catch (w) {}
    };
    m._t = function() {
        m._g(1)
    };
    m._d = function() {
        var c, b;
        for (c = 0; c < m.list.length; c++)
            if ((b = m[m.list[c]]) && !b.disable && b._d > 0) return 1;
        return 0
    };
    m.c = function(m, b) {
        var a, w, e, d;
        b.toLowerCase().substring(0, 4) != "http" &&
            (b = "http://" + b);
        s.ssl && (b = s.replace(b, "http:", "https:"));
        m.RAND = Math.floor(Math.random() * 1E13);
        for (a = 0; a >= 0;) a = b.indexOf("[", a), a >= 0 && (w = b.indexOf("]", a), w > a && (e = b.substring(a + 1, w), e.length > 2 && e.substring(0, 2) == "s." ? (d = s[e.substring(2)]) || (d = "") : (d = "" + m[e], d != m[e] && parseFloat(d) != m[e] && (e = 0)), e && (b = b.substring(0, a) + encodeURIComponent(d) + b.substring(w + 1)), a = w));
        return b
    }
}


//v2.7
// Get the in Site Catalyst object instance
var _scObj = _cne.s;
// create instance of DIL
var scDil = DIL.create({
  partner : "condenast",
  uuidCookie:{
     name:'aam_uuid',
     days:30
   }
  });
DIL.modules.siteCatalyst.init(_scObj, scDil);
(function() {
        if(typeof _scObj.prop52 != 'undefined' && "" !== _scObj.prop52){
          var getCookie = DIL.getDil('condenast').helpers.getCookie; // Save DILs getCookie function
          var bbp = _scObj.prop52; //getting needed id
          queryString = null;
          if (!navigator.cookieEnabled || getCookie('_dx') || !bbp) {
                                return;
          }
          queryString = 'dpid=544&dpuuid=' + bbp;
          new Image().src = (document.location.protocol == 'https:'? 'https:':'http:') + '//dpm.demdex.net/ibs:' + queryString;
          document.cookie = '_dx=1;domain=' + (function(){var domainSplit=document.domain.split('.'),l=domainSplit.length;return '.'+domainSplit[l-2]+'.'+domainSplit[l-1];})() + ';path=/;expires=' + new Date(new Date().getTime() + 86400000).toUTCString();
        }
        
})();
(function() {
  var sc = DIL.getDil('condenast').helpers.getCookie("s_vi");
  if(sc){
    sc = sc.split("|")[1].split("[")[0];
    queryString = null;
    if (!navigator.cookieEnabled) {
      return;
    }
    queryString = 'dpid=772&dpuuid=' + sc;
    new Image().src = (document.location.protocol == 'https:'? 'https:':'http:') + '//dpm.demdex.net/ibs:' + queryString;
    document.cookie = '_dx=1;domain=' + (function(){var domainSplit=document.domain.split('.'),l=domainSplit.length;return '.'+domainSplit[l-2]+'.'+domainSplit[l-1];})() + ';path=/;expires=' + new Date(new Date().getTime() + 86400000).toUTCString();
  }        
})();

/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

 AppMeasurement for JavaScript version: 1.4.1
 Copyright 1996-2013 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
function AppMeasurement(){var s=this;s.version="1.4.1";var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;s._c="s_c";var k=w.sb;k||(k=null);var m=w,i,o;try{i=m.parent;for(o=m.location;i&&i.location&&o&&""+i.location!=""+o&&m.location&&""+i.location!=""+m.location&&i.location.host==o.host;)m=i,i=m.parent}catch(p){}s.eb=function(s){try{console.log(s)}catch(a){}};s.ta=function(s){return""+parseInt(s)==""+s};s.replace=function(s,a,c){if(!s||s.indexOf(a)<
0)return s;return s.split(a).join(c)};s.escape=function(b){var a,c;if(!b)return b;b=encodeURIComponent(b);for(a=0;a<7;a++)c="+~!*()'".substring(a,a+1),b.indexOf(c)>=0&&(b=s.replace(b,c,"%"+c.charCodeAt(0).toString(16).toUpperCase()));return b};s.unescape=function(b){if(!b)return b;b=b.indexOf("+")>=0?s.replace(b,"+"," "):b;try{return decodeURIComponent(b)}catch(a){}return unescape(b)};s.Va=function(){var b=w.location.hostname,a=s.fpCookieDomainPeriods,c;if(!a)a=s.cookieDomainPeriods;if(b&&!s.cookieDomain&&
!/^[0-9.]+$/.test(b)&&(a=a?parseInt(a):2,a=a>2?a:2,c=b.lastIndexOf("."),c>=0)){for(;c>=0&&a>1;)c=b.lastIndexOf(".",c-1),a--;s.cookieDomain=c>0?b.substring(c):b}return s.cookieDomain};s.c_r=s.cookieRead=function(b){b=s.escape(b);var a=" "+s.d.cookie,c=a.indexOf(" "+b+"="),e=c<0?c:a.indexOf(";",c);b=c<0?"":s.unescape(a.substring(c+2+b.length,e<0?a.length:e));return b!="[[B]]"?b:""};s.c_w=s.cookieWrite=function(b,a,c){var e=s.Va(),d=s.cookieLifetime,f;a=""+a;d=d?(""+d).toUpperCase():"";c&&d!="SESSION"&&
d!="NONE"&&((f=a!=""?parseInt(d?d:0):-60)?(c=new Date,c.setTime(c.getTime()+f*1E3)):c==1&&(c=new Date,f=c.getYear(),c.setYear(f+5+(f<1900?1900:0))));if(b&&d!="NONE")return s.d.cookie=b+"="+s.escape(a!=""?a:"[[B]]")+"; path=/;"+(c&&d!="SESSION"?" expires="+c.toGMTString()+";":"")+(e?" domain="+e+";":""),s.cookieRead(b)==a;return 0};s.C=[];s.B=function(b,a,c){if(s.ma)return 0;if(!s.maxDelay)s.maxDelay=250;var e=0,d=(new Date).getTime()+s.maxDelay,f=s.d.qb,g=["webkitvisibilitychange","visibilitychange"];
if(!f)f=s.d.rb;if(f&&f=="prerender"){if(!s.X){s.X=1;for(c=0;c<g.length;c++)s.d.addEventListener(g[c],function(){var a=s.d.qb;if(!a)a=s.d.rb;if(a=="visible")s.X=0,s.delayReady()})}e=1;d=0}else c||s.q("_d")&&(e=1);e&&(s.C.push({m:b,a:a,t:d}),s.X||setTimeout(s.delayReady,s.maxDelay));return e};s.delayReady=function(){var b=(new Date).getTime(),a=0,c;for(s.q("_d")&&(a=1);s.C.length>0;){c=s.C.shift();if(a&&!c.t&&c.t>b){s.C.unshift(c);setTimeout(s.delayReady,parseInt(s.maxDelay/2));break}s.ma=1;s[c.m].apply(s,
c.a);s.ma=0}};s.setAccount=s.sa=function(b){var a,c;if(!s.B("setAccount",arguments))if(s.account=b,s.allAccounts){a=s.allAccounts.concat(b.split(","));s.allAccounts=[];a.sort();for(c=0;c<a.length;c++)(c==0||a[c-1]!=a[c])&&s.allAccounts.push(a[c])}else s.allAccounts=b.split(",")};s.foreachVar=function(b,a){var c,e,d,f,g="";d=e="";if(s.lightProfileID)c=s.H,(g=s.lightTrackVars)&&(g=","+g+","+s.ba.join(",")+",");else{c=s.c;if(s.pe||s.linkType)if(g=s.linkTrackVars,e=s.linkTrackEvents,s.pe&&(d=s.pe.substring(0,
1).toUpperCase()+s.pe.substring(1),s[d]))g=s[d].pb,e=s[d].ob;g&&(g=","+g+","+s.z.join(",")+",");e&&g&&(g+=",events,")}a&&(a=","+a+",");for(e=0;e<c.length;e++)d=c[e],(f=s[d])&&(!g||g.indexOf(","+d+",")>=0)&&(!a||a.indexOf(","+d+",")>=0)&&b(d,f)};s.J=function(b,a,c,e,d){var f="",g,j,w,q,i=0;b=="contextData"&&(b="c");if(a){for(g in a)if(!Object.prototype[g]&&(!d||g.substring(0,d.length)==d)&&a[g]&&(!c||c.indexOf(","+(e?e+".":"")+g+",")>=0)){w=!1;if(i)for(j=0;j<i.length;j++)g.substring(0,i[j].length)==
i[j]&&(w=!0);if(!w&&(f==""&&(f+="&"+b+"."),j=a[g],d&&(g=g.substring(d.length)),g.length>0))if(w=g.indexOf("."),w>0)j=g.substring(0,w),w=(d?d:"")+j+".",i||(i=[]),i.push(w),f+=s.J(j,a,c,e,w);else if(typeof j=="boolean"&&(j=j?"true":"false"),j){if(e=="retrieveLightData"&&d.indexOf(".contextData.")<0)switch(w=g.substring(0,4),q=g.substring(4),g){case "transactionID":g="xact";break;case "channel":g="ch";break;case "campaign":g="v0";break;default:s.ta(q)&&(w=="prop"?g="c"+q:w=="eVar"?g="v"+q:w=="list"?
g="l"+q:w=="hier"&&(g="h"+q,j=j.substring(0,255)))}f+="&"+s.escape(g)+"="+s.escape(j)}}f!=""&&(f+="&."+b)}return f};s.Xa=function(){var b="",a,c,e,d,f,g,j,w,i="",k="",m=c="";if(s.lightProfileID)a=s.H,(i=s.lightTrackVars)&&(i=","+i+","+s.ba.join(",")+",");else{a=s.c;if(s.pe||s.linkType)if(i=s.linkTrackVars,k=s.linkTrackEvents,s.pe&&(c=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1),s[c]))i=s[c].pb,k=s[c].ob;i&&(i=","+i+","+s.z.join(",")+",");k&&(k=","+k+",",i&&(i+=",events,"));s.events2&&(m+=(m!=
""?",":"")+s.events2)}s.AudienceManagement&&s.AudienceManagement.isReady()&&(b+=s.J("d",s.AudienceManagement.getEventCallConfigParams()));for(c=0;c<a.length;c++){d=a[c];f=s[d];e=d.substring(0,4);g=d.substring(4);!f&&d=="events"&&m&&(f=m,m="");if(f&&(!i||i.indexOf(","+d+",")>=0)){switch(d){case "supplementalDataID":d="sdid";break;case "timestamp":d="ts";break;case "dynamicVariablePrefix":d="D";break;case "visitorID":d="vid";break;case "marketingCloudVisitorID":d="mid";break;case "analyticsVisitorID":d=
"aid";break;case "audienceManagerLocationHint":d="aamlh";break;case "audienceManagerBlob":d="aamb";break;case "authState":d="as";break;case "pageURL":d="g";if(f.length>255)s.pageURLRest=f.substring(255),f=f.substring(0,255);break;case "pageURLRest":d="-g";break;case "referrer":d="r";break;case "vmk":case "visitorMigrationKey":d="vmt";break;case "visitorMigrationServer":d="vmf";s.ssl&&s.visitorMigrationServerSecure&&(f="");break;case "visitorMigrationServerSecure":d="vmf";!s.ssl&&s.visitorMigrationServer&&
(f="");break;case "charSet":d="ce";break;case "visitorNamespace":d="ns";break;case "cookieDomainPeriods":d="cdp";break;case "cookieLifetime":d="cl";break;case "variableProvider":d="vvp";break;case "currencyCode":d="cc";break;case "channel":d="ch";break;case "transactionID":d="xact";break;case "campaign":d="v0";break;case "latitude":d="lat";break;case "longitude":d="lon";break;case "resolution":d="s";break;case "colorDepth":d="c";break;case "javascriptVersion":d="j";break;case "javaEnabled":d="v";
break;case "cookiesEnabled":d="k";break;case "browserWidth":d="bw";break;case "browserHeight":d="bh";break;case "connectionType":d="ct";break;case "homepage":d="hp";break;case "events":m&&(f+=(f!=""?",":"")+m);if(k){g=f.split(",");f="";for(e=0;e<g.length;e++)j=g[e],w=j.indexOf("="),w>=0&&(j=j.substring(0,w)),w=j.indexOf(":"),w>=0&&(j=j.substring(0,w)),k.indexOf(","+j+",")>=0&&(f+=(f?",":"")+g[e])}break;case "events2":f="";break;case "contextData":b+=s.J("c",s[d],i,d);f="";break;case "lightProfileID":d=
"mtp";break;case "lightStoreForSeconds":d="mtss";s.lightProfileID||(f="");break;case "lightIncrementBy":d="mti";s.lightProfileID||(f="");break;case "retrieveLightProfiles":d="mtsr";break;case "deleteLightProfiles":d="mtsd";break;case "retrieveLightData":s.retrieveLightProfiles&&(b+=s.J("mts",s[d],i,d));f="";break;default:s.ta(g)&&(e=="prop"?d="c"+g:e=="eVar"?d="v"+g:e=="list"?d="l"+g:e=="hier"&&(d="h"+g,f=f.substring(0,255)))}f&&(b+="&"+d+"="+(d.substring(0,3)!="pev"?s.escape(f):f))}d=="pev3"&&s.g&&
(b+=s.g)}return b};s.u=function(s){var a=s.tagName;if(""+s.wb!="undefined"||""+s.ib!="undefined"&&(""+s.ib).toUpperCase()!="HTML")return"";a=a&&a.toUpperCase?a.toUpperCase():"";a=="SHAPE"&&(a="");a&&((a=="INPUT"||a=="BUTTON")&&s.type&&s.type.toUpperCase?a=s.type.toUpperCase():!a&&s.href&&(a="A"));return a};s.oa=function(s){var a=s.href?s.href:"",c,e,d;c=a.indexOf(":");e=a.indexOf("?");d=a.indexOf("/");if(a&&(c<0||e>=0&&c>e||d>=0&&c>d))e=s.protocol&&s.protocol.length>1?s.protocol:l.protocol?l.protocol:
"",c=l.pathname.lastIndexOf("/"),a=(e?e+"//":"")+(s.host?s.host:l.host?l.host:"")+(h.substring(0,1)!="/"?l.pathname.substring(0,c<0?0:c)+"/":"")+a;return a};s.D=function(b){var a=s.u(b),c,e,d="",f=0;if(a){c=b.protocol;e=b.onclick;if(b.href&&(a=="A"||a=="AREA")&&(!e||!c||c.toLowerCase().indexOf("javascript")<0))d=s.oa(b);else if(e)d=s.replace(s.replace(s.replace(s.replace(""+e,"\r",""),"\n",""),"\t","")," ",""),f=2;else if(a=="INPUT"||a=="SUBMIT"){if(b.value)d=b.value;else if(b.innerText)d=b.innerText;
else if(b.textContent)d=b.textContent;f=3}else if(b.src&&a=="IMAGE")d=b.src;if(d)return{id:d.substring(0,100),type:f}}return 0};s.tb=function(b){for(var a=s.u(b),c=s.D(b);b&&!c&&a!="BODY";)if(b=b.parentElement?b.parentElement:b.parentNode)a=s.u(b),c=s.D(b);if(!c||a=="BODY")b=0;if(b&&(a=b.onclick?""+b.onclick:"",a.indexOf(".tl(")>=0||a.indexOf(".trackLink(")>=0))b=0;return b};s.hb=function(){var b,a,c=s.linkObject,e=s.linkType,d=s.linkURL,f,g;s.ca=1;if(!c)s.ca=0,c=s.clickObject;if(c){b=s.u(c);for(a=
s.D(c);c&&!a&&b!="BODY";)if(c=c.parentElement?c.parentElement:c.parentNode)b=s.u(c),a=s.D(c);if(!a||b=="BODY")c=0;if(c){var j=c.onclick?""+c.onclick:"";if(j.indexOf(".tl(")>=0||j.indexOf(".trackLink(")>=0)c=0}}else s.ca=1;!d&&c&&(d=s.oa(c));d&&!s.linkLeaveQueryString&&(f=d.indexOf("?"),f>=0&&(d=d.substring(0,f)));if(!e&&d){var i=0,k=0,m;if(s.trackDownloadLinks&&s.linkDownloadFileTypes){j=d.toLowerCase();f=j.indexOf("?");g=j.indexOf("#");f>=0?g>=0&&g<f&&(f=g):f=g;f>=0&&(j=j.substring(0,f));f=s.linkDownloadFileTypes.toLowerCase().split(",");
for(g=0;g<f.length;g++)(m=f[g])&&j.substring(j.length-(m.length+1))=="."+m&&(e="d")}if(s.trackExternalLinks&&!e&&(j=d.toLowerCase(),s.ra(j))){if(!s.linkInternalFilters)s.linkInternalFilters=w.location.hostname;f=0;s.linkExternalFilters?(f=s.linkExternalFilters.toLowerCase().split(","),i=1):s.linkInternalFilters&&(f=s.linkInternalFilters.toLowerCase().split(","));if(f){for(g=0;g<f.length;g++)m=f[g],j.indexOf(m)>=0&&(k=1);k?i&&(e="e"):i||(e="e")}}}s.linkObject=c;s.linkURL=d;s.linkType=e;if(s.trackClickMap||
s.trackInlineStats)if(s.g="",c){e=s.pageName;d=1;c=c.sourceIndex;if(!e)e=s.pageURL,d=0;if(w.s_objectID)a.id=w.s_objectID,c=a.type=1;if(e&&a&&a.id&&b)s.g="&pid="+s.escape(e.substring(0,255))+(d?"&pidt="+d:"")+"&oid="+s.escape(a.id.substring(0,100))+(a.type?"&oidt="+a.type:"")+"&ot="+b+(c?"&oi="+c:"")}};s.Ya=function(){var b=s.ca,a=s.linkType,c=s.linkURL,e=s.linkName;if(a&&(c||e))a=a.toLowerCase(),a!="d"&&a!="e"&&(a="o"),s.pe="lnk_"+a,s.pev1=c?s.escape(c):"",s.pev2=e?s.escape(e):"",b=1;s.abort&&(b=
0);if(s.trackClickMap||s.trackInlineStats){a={};c=0;var d=s.cookieRead("s_sq"),f=d?d.split("&"):0,g,j,w;d=0;if(f)for(g=0;g<f.length;g++)j=f[g].split("="),e=s.unescape(j[0]).split(","),j=s.unescape(j[1]),a[j]=e;e=s.account.split(",");if(b||s.g){b&&!s.g&&(d=1);for(j in a)if(!Object.prototype[j])for(g=0;g<e.length;g++){d&&(w=a[j].join(","),w==s.account&&(s.g+=(j.charAt(0)!="&"?"&":"")+j,a[j]=[],c=1));for(f=0;f<a[j].length;f++)w=a[j][f],w==e[g]&&(d&&(s.g+="&u="+s.escape(w)+(j.charAt(0)!="&"?"&":"")+j+
"&u=0"),a[j].splice(f,1),c=1)}b||(c=1);if(c){d="";g=2;!b&&s.g&&(d=s.escape(e.join(","))+"="+s.escape(s.g),g=1);for(j in a)!Object.prototype[j]&&g>0&&a[j].length>0&&(d+=(d?"&":"")+s.escape(a[j].join(","))+"="+s.escape(j),g--);s.cookieWrite("s_sq",d)}}}return b};s.Za=function(){if(!s.nb){var b=new Date,a=m.location,c,e,d=e=c="",f="",g="",w="1.2",i=s.cookieWrite("s_cc","true",0)?"Y":"N",k="",n="";if(b.setUTCDate&&(w="1.3",(0).toPrecision&&(w="1.5",b=[],b.forEach))){w="1.6";e=0;c={};try{e=new Iterator(c),
e.next&&(w="1.7",b.reduce&&(w="1.8",w.trim&&(w="1.8.1",Date.parse&&(w="1.8.2",Object.create&&(w="1.8.5")))))}catch(o){}}c=screen.width+"x"+screen.height;d=navigator.javaEnabled()?"Y":"N";e=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;f=s.w.innerWidth?s.w.innerWidth:s.d.documentElement.offsetWidth;g=s.w.innerHeight?s.w.innerHeight:s.d.documentElement.offsetHeight;try{s.b.addBehavior("#default#homePage"),k=s.b.ub(a)?"Y":"N"}catch(p){}try{s.b.addBehavior("#default#clientCaps"),n=s.b.connectionType}catch(r){}s.resolution=
c;s.colorDepth=e;s.javascriptVersion=w;s.javaEnabled=d;s.cookiesEnabled=i;s.browserWidth=f;s.browserHeight=g;s.connectionType=n;s.homepage=k;s.nb=1}};s.I={};s.loadModule=function(b,a){var c=s.I[b];if(!c){c=w["AppMeasurement_Module_"+b]?new w["AppMeasurement_Module_"+b](s):{};s.I[b]=s[b]=c;c.Fa=function(){return c.Ja};c.Ka=function(a){if(c.Ja=a)s[b+"_onLoad"]=a,s.B(b+"_onLoad",[s,c],1)||a(s,c)};try{Object.defineProperty?Object.defineProperty(c,"onLoad",{get:c.Fa,set:c.Ka}):c._olc=1}catch(e){c._olc=
1}}a&&(s[b+"_onLoad"]=a,s.B(b+"_onLoad",[s,c],1)||a(s,c))};s.q=function(b){var a,c;for(a in s.I)if(!Object.prototype[a]&&(c=s.I[a])){if(c._olc&&c.onLoad)c._olc=0,c.onLoad(s,c);if(c[b]&&c[b]())return 1}return 0};s.bb=function(){var b=Math.floor(Math.random()*1E13),a=s.visitorSampling,c=s.visitorSamplingGroup;c="s_vsn_"+(s.visitorNamespace?s.visitorNamespace:s.account)+(c?"_"+c:"");var e=s.cookieRead(c);if(a){e&&(e=parseInt(e));if(!e){if(!s.cookieWrite(c,b))return 0;e=b}if(e%1E4>v)return 0}return 1};
s.K=function(b,a){var c,e,d,f,g,w;for(c=0;c<2;c++){e=c>0?s.ia:s.c;for(d=0;d<e.length;d++)if(f=e[d],(g=b[f])||b["!"+f]){if(!a&&(f=="contextData"||f=="retrieveLightData")&&s[f])for(w in s[f])g[w]||(g[w]=s[f][w]);s[f]=g}}};s.Aa=function(b,a){var c,e,d,f;for(c=0;c<2;c++){e=c>0?s.ia:s.c;for(d=0;d<e.length;d++)f=e[d],b[f]=s[f],!a&&!b[f]&&(b["!"+f]=1)}};s.Ua=function(s){var a,c,e,d,f,g=0,w,i="",k="";if(s&&s.length>255&&(a=""+s,c=a.indexOf("?"),c>0&&(w=a.substring(c+1),a=a.substring(0,c),d=a.toLowerCase(),
e=0,d.substring(0,7)=="http://"?e+=7:d.substring(0,8)=="https://"&&(e+=8),c=d.indexOf("/",e),c>0&&(d=d.substring(e,c),f=a.substring(c),a=a.substring(0,c),d.indexOf("google")>=0?g=",q,ie,start,search_key,word,kw,cd,":d.indexOf("yahoo.co")>=0&&(g=",p,ei,"),g&&w)))){if((s=w.split("&"))&&s.length>1){for(e=0;e<s.length;e++)d=s[e],c=d.indexOf("="),c>0&&g.indexOf(","+d.substring(0,c)+",")>=0?i+=(i?"&":"")+d:k+=(k?"&":"")+d;i&&k?w=i+"&"+k:k=""}c=253-(w.length-k.length)-a.length;s=a+(c>0?f.substring(0,c):
"")+"?"+w}return s};s.U=!1;s.O=!1;s.Ia=function(b){s.marketingCloudVisitorID=b;s.O=!0;s.k()};s.R=!1;s.L=!1;s.Ca=function(b){s.analyticsVisitorID=b;s.L=!0;s.k()};s.T=!1;s.N=!1;s.Ea=function(b){s.audienceManagerLocationHint=b;s.N=!0;s.k()};s.S=!1;s.M=!1;s.Da=function(b){s.audienceManagerBlob=b;s.M=!0;s.k()};s.isReadyToTrack=function(){var b=!0,a=s.visitor;if(a&&a.isAllowed()){if(!s.U&&!s.marketingCloudVisitorID&&a.getMarketingCloudVisitorID&&(s.U=!0,s.marketingCloudVisitorID=a.getMarketingCloudVisitorID([s,
s.Ia]),s.marketingCloudVisitorID))s.O=!0;if(!s.R&&!s.analyticsVisitorID&&a.getAnalyticsVisitorID&&(s.R=!0,s.analyticsVisitorID=a.getAnalyticsVisitorID([s,s.Ca]),s.analyticsVisitorID))s.L=!0;if(!s.T&&!s.audienceManagerLocationHint&&a.getAudienceManagerLocationHint&&(s.T=!0,s.audienceManagerLocationHint=a.getAudienceManagerLocationHint([s,s.Ea]),s.audienceManagerLocationHint))s.N=!0;if(!s.S&&!s.audienceManagerBlob&&a.getAudienceManagerBlob&&(s.S=!0,s.audienceManagerBlob=a.getAudienceManagerBlob([s,
s.Da]),s.audienceManagerBlob))s.M=!0;if(s.U&&!s.O&&!s.marketingCloudVisitorID||s.R&&!s.L&&!s.analyticsVisitorID||s.T&&!s.N&&!s.audienceManagerLocationHint||s.S&&!s.M&&!s.audienceManagerBlob)b=!1}return b};s.j=k;s.l=0;s.callbackWhenReadyToTrack=function(b,a,c){var e;e={};e.Oa=b;e.Na=a;e.La=c;if(s.j==k)s.j=[];s.j.push(e);if(s.l==0)s.l=setInterval(s.k,100)};s.k=function(){var b;if(s.isReadyToTrack()){if(s.l)clearInterval(s.l),s.l=0;if(s.j!=k)for(;s.j.length>0;)b=s.j.shift(),b.Na.apply(b.Oa,b.La)}};s.Ga=
function(b){var a,c,e=k,d=k;if(!s.isReadyToTrack()){a=[];if(b!=k)for(c in e={},b)e[c]=b[c];d={};s.Aa(d,!0);a.push(e);a.push(d);s.callbackWhenReadyToTrack(s,s.track,a);return!0}return!1};s.Wa=function(){var b=s.cookieRead("s_fid"),a="",c="",e;e=8;var d=4;if(!b||b.indexOf("-")<0){for(b=0;b<16;b++)e=Math.floor(Math.random()*e),a+="0123456789ABCDEF".substring(e,e+1),e=Math.floor(Math.random()*d),c+="0123456789ABCDEF".substring(e,e+1),e=d=16;b=a+"-"+c}s.cookieWrite("s_fid",b,1)||(b=0);return b};s.t=s.track=
function(b,a){var c,e=new Date,d="s"+Math.floor(e.getTime()/108E5)%10+Math.floor(Math.random()*1E13),f=e.getYear();f="t="+s.escape(e.getDate()+"/"+e.getMonth()+"/"+(f<1900?f+1900:f)+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+" "+e.getDay()+" "+e.getTimezoneOffset());if(s.visitor){if(s.visitor.getAuthState)s.authState=s.visitor.getAuthState();if(!s.supplementalDataID&&s.visitor.getSupplementalDataID)s.supplementalDataID=s.visitor.getSupplementalDataID("AppMeasurement:"+s._in,s.expectSupplementalData?
!1:!0)}s.q("_s");if(!s.B("track",arguments)){if(!s.Ga(b)){a&&s.K(a);b&&(c={},s.Aa(c,0),s.K(b));if(s.bb()){if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.Wa();s.hb();s.usePlugins&&s.doPlugins&&s.doPlugins(s);if(s.account){if(!s.abort){if(s.trackOffline&&!s.timestamp)s.timestamp=Math.floor(e.getTime()/1E3);e=w.location;if(!s.pageURL)s.pageURL=e.href?e.href:e;if(!s.referrer&&!s.Ba)s.referrer=m.document.referrer,s.Ba=1;s.referrer=s.Ua(s.referrer);s.q("_g")}if(s.Ya()&&!s.abort)s.Za(),f+=
s.Xa(),s.gb(d,f),s.q("_t"),s.referrer=""}}b&&s.K(c,1)}s.abort=s.supplementalDataID=s.timestamp=s.pageURLRest=s.linkObject=s.clickObject=s.linkURL=s.linkName=s.linkType=w.vb=s.pe=s.pev1=s.pev2=s.pev3=s.g=0}};s.tl=s.trackLink=function(b,a,c,e,d){s.linkObject=b;s.linkType=a;s.linkName=c;if(d)s.i=b,s.p=d;return s.track(e)};s.trackLight=function(b,a,c,e){s.lightProfileID=b;s.lightStoreForSeconds=a;s.lightIncrementBy=c;return s.track(e)};s.clearVars=function(){var b,a;for(b=0;b<s.c.length;b++)if(a=s.c[b],
a.substring(0,4)=="prop"||a.substring(0,4)=="eVar"||a.substring(0,4)=="hier"||a.substring(0,4)=="list"||a=="channel"||a=="events"||a=="eventList"||a=="products"||a=="productList"||a=="purchaseID"||a=="transactionID"||a=="state"||a=="zip"||a=="campaign")s[a]=void 0};s.tagContainerMarker="";s.gb=function(b,a){var c,e=s.trackingServer;c="";var d=s.dc,f="sc.",w=s.visitorNamespace;if(e){if(s.trackingServerSecure&&s.ssl)e=s.trackingServerSecure}else{if(!w)w=s.account,e=w.indexOf(","),e>=0&&(w=w.substring(0,
e)),w=w.replace(/[^A-Za-z0-9]/g,"");c||(c="2o7.net");d=d?(""+d).toLowerCase():"d1";c=="2o7.net"&&(d=="d1"?d="112":d=="d2"&&(d="122"),f="");e=w+"."+d+"."+f+c}c=s.ssl?"https://":"http://";d=s.AudienceManagement&&s.AudienceManagement.isReady();c+=e+"/b/ss/"+s.account+"/"+(s.mobile?"5.":"")+(d?"10":"1")+"/JS-"+s.version+(s.mb?"T":"")+(s.tagContainerMarker?"-"+s.tagContainerMarker:"")+"/"+b+"?AQB=1&ndh=1&pf=1&"+(d?"callback=s_c_il["+s._in+"].AudienceManagement.passData&":"")+a+"&AQE=1";s.Sa(c);s.Y()};
s.Sa=function(b){s.e||s.$a();s.e.push(b);s.aa=s.r();s.za()};s.$a=function(){s.e=s.cb();if(!s.e)s.e=[]};s.cb=function(){var b,a;if(s.fa()){try{(a=w.localStorage.getItem(s.da()))&&(b=w.JSON.parse(a))}catch(c){}return b}};s.fa=function(){var b=!0;if(!s.trackOffline||!s.offlineFilename||!w.localStorage||!w.JSON)b=!1;return b};s.pa=function(){var b=0;if(s.e)b=s.e.length;s.v&&b++;return b};s.Y=function(){if(!s.v)if(s.qa=k,s.ea)s.aa>s.G&&s.xa(s.e),s.ha(500);else{var b=s.Ma();if(b>0)s.ha(b);else if(b=s.na())s.v=
1,s.fb(b),s.jb(b)}};s.ha=function(b){if(!s.qa)b||(b=0),s.qa=setTimeout(s.Y,b)};s.Ma=function(){var b;if(!s.trackOffline||s.offlineThrottleDelay<=0)return 0;b=s.r()-s.wa;if(s.offlineThrottleDelay<b)return 0;return s.offlineThrottleDelay-b};s.na=function(){if(s.e.length>0)return s.e.shift()};s.fb=function(b){if(s.debugTracking){var a="AppMeasurement Debug: "+b;b=b.split("&");var c;for(c=0;c<b.length;c++)a+="\n\t"+s.unescape(b[c]);s.eb(a)}};s.Ha=function(){return s.marketingCloudVisitorID||s.analyticsVisitorID};
s.Q=!1;var n;try{n=JSON.parse('{"x":"y"}')}catch(r){n=null}n&&n.x=="y"?(s.Q=!0,s.P=function(s){return JSON.parse(s)}):w.$&&w.$.parseJSON?(s.P=function(s){return w.$.parseJSON(s)},s.Q=!0):s.P=function(){return null};s.jb=function(b){var a,c,e;if(s.Ha()&&b.length>2047&&(typeof XMLHttpRequest!="undefined"&&(a=new XMLHttpRequest,"withCredentials"in a?c=1:a=0),!a&&typeof XDomainRequest!="undefined"&&(a=new XDomainRequest,c=2),a&&s.AudienceManagement&&s.AudienceManagement.isReady()))s.Q?a.ja=!0:a=0;!a&&
s.ab&&(b=b.substring(0,2047));if(!a&&s.d.createElement&&s.AudienceManagement&&s.AudienceManagement.isReady()&&(a=s.d.createElement("SCRIPT"))&&"async"in a)(e=(e=s.d.getElementsByTagName("HEAD"))&&e[0]?e[0]:s.d.body)?(a.type="text/javascript",a.setAttribute("async","async"),c=3):a=0;if(!a)a=new Image,a.alt="";a.la=function(){try{if(s.ga)clearTimeout(s.ga),s.ga=0;if(a.timeout)clearTimeout(a.timeout),a.timeout=0}catch(b){}};a.onload=a.lb=function(){a.la();s.Ra();s.V();s.v=0;s.Y();if(a.ja){a.ja=!1;try{var b=
s.P(a.responseText);AudienceManagement.passData(b)}catch(c){}}};a.onabort=a.onerror=a.Ta=function(){a.la();(s.trackOffline||s.ea)&&s.v&&s.e.unshift(s.Qa);s.v=0;s.aa>s.G&&s.xa(s.e);s.V();s.ha(500)};a.onreadystatechange=function(){a.readyState==4&&(a.status==200?a.lb():a.Ta())};s.wa=s.r();if(c==1||c==2){var d=b.indexOf("?");e=b.substring(0,d);d=b.substring(d+1);d=d.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");c==1?(a.open("POST",e,!0),a.send(d)):c==2&&(a.open("POST",e),a.send(d))}else if(a.src=b,c==3){if(s.ua)try{e.removeChild(s.ua)}catch(f){}e.firstChild?
e.insertBefore(a,e.firstChild):e.appendChild(a);s.ua=s.Pa}if(a.abort)s.ga=setTimeout(a.abort,5E3);s.Qa=b;s.Pa=w["s_i_"+s.replace(s.account,",","_")]=a;if(s.useForcedLinkTracking&&s.A||s.p){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;s.W=setTimeout(s.V,s.forcedLinkTrackingTimeout)}};s.Ra=function(){if(s.fa()&&!(s.va>s.G))try{w.localStorage.removeItem(s.da()),s.va=s.r()}catch(b){}};s.xa=function(b){if(s.fa()){s.za();try{w.localStorage.setItem(s.da(),w.JSON.stringify(b)),s.G=s.r()}catch(a){}}};
s.za=function(){if(s.trackOffline){if(!s.offlineLimit||s.offlineLimit<=0)s.offlineLimit=10;for(;s.e.length>s.offlineLimit;)s.na()}};s.forceOffline=function(){s.ea=!0};s.forceOnline=function(){s.ea=!1};s.da=function(){return s.offlineFilename+"-"+s.visitorNamespace+s.account};s.r=function(){return(new Date).getTime()};s.ra=function(s){s=s.toLowerCase();if(s.indexOf("#")!=0&&s.indexOf("about:")!=0&&s.indexOf("opera:")!=0&&s.indexOf("javascript:")!=0)return!0;return!1};s.setTagContainer=function(b){var a,
c,e;s.mb=b;for(a=0;a<s._il.length;a++)if((c=s._il[a])&&c._c=="s_l"&&c.tagContainerName==b){s.K(c);if(c.lmq)for(a=0;a<c.lmq.length;a++)e=c.lmq[a],s.loadModule(e.n);if(c.ml)for(e in c.ml)if(s[e])for(a in b=s[e],e=c.ml[e],e)if(!Object.prototype[a]&&(typeof e[a]!="function"||(""+e[a]).indexOf("s_c_il")<0))b[a]=e[a];if(c.mmq)for(a=0;a<c.mmq.length;a++)e=c.mmq[a],s[e.m]&&(b=s[e.m],b[e.f]&&typeof b[e.f]=="function"&&(e.a?b[e.f].apply(b,e.a):b[e.f].apply(b)));if(c.tq)for(a=0;a<c.tq.length;a++)s.track(c.tq[a]);
c.s=s;break}};s.Util={urlEncode:s.escape,urlDecode:s.unescape,cookieRead:s.cookieRead,cookieWrite:s.cookieWrite,getQueryParam:function(b,a,c){var e;a||(a=s.pageURL?s.pageURL:w.location);c||(c="&");if(b&&a&&(a=""+a,e=a.indexOf("?"),e>=0&&(a=c+a.substring(e+1)+c,e=a.indexOf(c+b+"="),e>=0&&(a=a.substring(e+c.length+b.length+1),e=a.indexOf(c),e>=0&&(a=a.substring(0,e)),a.length>0))))return s.unescape(a);return""}};s.z=["supplementalDataID","timestamp","dynamicVariablePrefix","visitorID","marketingCloudVisitorID",
"analyticsVisitorID","audienceManagerLocationHint","authState","fid","vmk","visitorMigrationKey","visitorMigrationServer","visitorMigrationServerSecure","charSet","visitorNamespace","cookieDomainPeriods","fpCookieDomainPeriods","cookieLifetime","pageName","pageURL","referrer","contextData","currencyCode","lightProfileID","lightStoreForSeconds","lightIncrementBy","retrieveLightProfiles","deleteLightProfiles","retrieveLightData","pe","pev1","pev2","pev3","pageURLRest"];s.c=s.z.concat(["purchaseID",
"variableProvider","channel","server","pageType","transactionID","campaign","state","zip","events","events2","products","audienceManagerBlob","tnt"]);s.ba=["timestamp","charSet","visitorNamespace","cookieDomainPeriods","cookieLifetime","contextData","lightProfileID","lightStoreForSeconds","lightIncrementBy"];s.H=s.ba.slice(0);s.ia=["account","allAccounts","debugTracking","visitor","trackOffline","offlineLimit","offlineThrottleDelay","offlineFilename","usePlugins","doPlugins","configURL","visitorSampling",
"visitorSamplingGroup","linkObject","clickObject","linkURL","linkName","linkType","trackDownloadLinks","trackExternalLinks","trackClickMap","trackInlineStats","linkLeaveQueryString","linkTrackVars","linkTrackEvents","linkDownloadFileTypes","linkExternalFilters","linkInternalFilters","useForcedLinkTracking","forcedLinkTrackingTimeout","trackingServer","trackingServerSecure","ssl","abort","mobile","dc","lightTrackVars","maxDelay","expectSupplementalData","AudienceManagement"];for(i=0;i<=250;i++)i<76&&
(s.c.push("prop"+i),s.H.push("prop"+i)),s.c.push("eVar"+i),s.H.push("eVar"+i),i<6&&s.c.push("hier"+i),i<4&&s.c.push("list"+i);i=["latitude","longitude","resolution","colorDepth","javascriptVersion","javaEnabled","cookiesEnabled","browserWidth","browserHeight","connectionType","homepage"];s.c=s.c.concat(i);s.z=s.z.concat(i);s.ssl=w.location.protocol.toLowerCase().indexOf("https")>=0;s.charSet="UTF-8";s.contextData={};s.offlineThrottleDelay=0;s.offlineFilename="AppMeasurement.offline";s.wa=0;s.aa=0;
s.G=0;s.va=0;s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";s.w=w;s.d=w.document;try{s.ab=navigator.appName=="Microsoft Internet Explorer"}catch(t){}s.V=function(){if(s.W)w.clearTimeout(s.W),s.W=k;s.i&&s.A&&s.i.dispatchEvent(s.A);if(s.p)if(typeof s.p=="function")s.p();else if(s.i&&s.i.href)s.d.location=s.i.href;s.i=s.A=s.p=0};s.ya=function(){s.b=s.d.body;if(s.b)if(s.o=function(b){var a,c,e,d,f;if(!(s.d&&s.d.getElementById("cppXYctnr")||b&&b["s_fe_"+s._in])){if(s.ka)if(s.useForcedLinkTracking)s.b.removeEventListener("click",
s.o,!1);else{s.b.removeEventListener("click",s.o,!0);s.ka=s.useForcedLinkTracking=0;return}else s.useForcedLinkTracking=0;s.clickObject=b.srcElement?b.srcElement:b.target;try{if(s.clickObject&&(!s.F||s.F!=s.clickObject)&&(s.clickObject.tagName||s.clickObject.parentElement||s.clickObject.parentNode)){var g=s.F=s.clickObject;if(s.Z)clearTimeout(s.Z),s.Z=0;s.Z=setTimeout(function(){if(s.F==g)s.F=0},1E4);e=s.pa();s.track();if(e<s.pa()&&s.useForcedLinkTracking&&b.target){for(d=b.target;d&&d!=s.b&&d.tagName.toUpperCase()!=
"A"&&d.tagName.toUpperCase()!="AREA";)d=d.parentNode;if(d&&(f=d.href,s.ra(f)||(f=0),c=d.target,b.target.dispatchEvent&&f&&(!c||c=="_self"||c=="_top"||c=="_parent"||w.name&&c==w.name))){try{a=s.d.createEvent("MouseEvents")}catch(i){a=new w.MouseEvent}if(a){try{a.initMouseEvent("click",b.bubbles,b.cancelable,b.view,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget)}catch(k){a=0}if(a)a["s_fe_"+s._in]=a.s_fe=1,b.stopPropagation(),b.kb&&b.kb(),
b.preventDefault(),s.i=b.target,s.A=a}}}}else s.clickObject=0}catch(m){s.clickObject=0}}},s.b&&s.b.attachEvent)s.b.attachEvent("onclick",s.o);else{if(s.b&&s.b.addEventListener){if(navigator&&(navigator.userAgent.indexOf("WebKit")>=0&&s.d.createEvent||navigator.userAgent.indexOf("Firefox/2")>=0&&w.MouseEvent))s.ka=1,s.useForcedLinkTracking=1,s.b.addEventListener("click",s.o,!0);s.b.addEventListener("click",s.o,!1)}}else setTimeout(s.ya,30)};s.ya()}
function s_gi(s){var w,k=window.s_c_il,m,i,o=s.split(","),p,n,r=0;if(k)for(m=0;!r&&m<k.length;){w=k[m];if(w._c=="s_c"&&(w.account||w.oun))if(w.account&&w.account==s)r=1;else{i=w.account?w.account:w.oun;i=w.allAccounts?w.allAccounts:i.split(",");for(p=0;p<o.length;p++)for(n=0;n<i.length;n++)o[p]==i[n]&&(r=1)}m++}r||(w=new AppMeasurement);w.setAccount?w.setAccount(s):w.sa&&w.sa(s);return w}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var s=window,w=s.s_giq,k,m,i;if(w)for(k=0;k<w.length;k++)m=w[k],i=s_gi(m.oun),i.setAccount(m.un),i.setTagContainer(m.tagContainerName);s.s_giq=0}s_pgicq();