/**
 * This code has been instrumented using Recognizer
 * https://github.com/equiet/recognizer
 */

var __recognizer395707708 = (function () {
    'use strict';

    var global = this;

    function Tracer() {
        this._calls = [];
        this._args = [];
        this.global = global;

        this._probeValues = {};
    }
    Tracer.prototype = {
        logEntry: function (location, args) {
            this._calls.push({
                index: this._calls.length,
                position: location,
                // args: Array.prototype.slice.call(args),
                argsCount: args.length,
                time: Date.now()
            });
            this._args.push(_.cloneDeep(args));
        },

        getCalls: function (since) {
            var calls = this._calls.filter(function(call) {
                return (since) ? call.time > since : true;
            });
            return stringify(calls);
        },

        getCallCount: function () {
            return this._calls.length;
        },

        logProbe: function (location, result) {
            this._probeValues[location.toString()] = _.cloneDeep(result);
            return result;
        },

        updateProbeValues: function () {
            var self = this;

            var probeIds = Object.keys(this._probeValues);
            var output = probeIds.map(function(probeId) {
               return {
                   id: probeId,
                   type: self.getType(self._probeValues[probeId])
               };
            });

            return stringify(output);
        },

        getType: function (value) {
            var type = typeof value;

            if (type === 'number' && isNaN(value)) {
                type = 'NaN';
            }
            if (type === null) {
                type = 'null';
            }

            return type;
        },

        test: function () {
            console.log('[recognizer tracer] test function run successfully');
        },

        connect: function () {
            return this;
        }
    };


    /**
     * JSON stringify with circular references
     * Copyright (c) Isaac Z. Schlueter ("Author")
     * The BSD License
     */
    function getSerialize(a,b){var c=[],d=[];return b=b||function(a,b){return"[Circular "+getPath(b,c,d)+"]"},function(e,f){var g=f;return"object"==typeof f&&f&&(-1!==c.indexOf(f)?g=b(e,f):(c.push(f),d.push(e))),a&&(g=a(e,g)),g}}
    function getPath(a,b,c){var d=b.indexOf(a),e=[c[d]];for(d--;d>=0;d--)b[d][e[0]]===a&&(a=b[d],e.unshift(c[d]));return"~"+e.join(".")}
    function stringify(a,b,c,d){return JSON.stringify(a,getSerialize(b,d),c)}stringify.getSerialize=getSerialize;


    /**
     * @license
     * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
     * Build: `lodash modern -o ./dist/lodash.js`
     */
    ;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
    }}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
    }function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
        t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
        return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
    }function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
    }if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
        De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
    }var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
    }function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
        if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
    });return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
        for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
        var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
    }),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
    }function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
        var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
        if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
    else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
    });return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
        for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
        return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
    }function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
        m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
        i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
    }catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
        var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
    }:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
        return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
        return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
    }},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
    },J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
        (Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
        return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
        return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
    });return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
    }else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
    })},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
    },J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
    })),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
    },J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
    }),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
    },J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
    },J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
    },J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
    }),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
    },J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
    },J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
        return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
        K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
        var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);


    return new Tracer();

}());


/**
 * Instrumented code
 */

var currentSiteState = -1;
(function () {
    var obj = __recognizer395707708.logProbe([
            6,
            0,
            6,
            11
        ], __recognizer395707708.logProbe([
            6,
            0,
            6,
            1
        ], $)(__recognizer395707708.logProbe([
            6,
            2,
            6,
            10
        ], document))), fn = __recognizer395707708.logProbe([
            6,
            12,
            6,
            17
        ], obj.ready);
    return fn.apply(obj, arguments);
}.bind(this)(function () {
    __recognizer395707708.logEntry([
        6,
        18,
        6,
        26
    ], arguments);
    (function () {
        var obj = __recognizer395707708.logProbe([
                11,
                4,
                11,
                36
            ], __recognizer395707708.logProbe([
                11,
                4,
                11,
                5
            ], $)('.lobby .main>*:not(.header)')), fn = __recognizer395707708.logProbe([
                11,
                37,
                11,
                40
            ], obj.css);
        return fn.apply(obj, arguments);
    }.bind(this)('height', function () {
        var obj = __recognizer395707708.logProbe([
                11,
                51,
                11,
                60
            ], __recognizer395707708.logProbe([
                11,
                51,
                11,
                52
            ], $)('body')), fn = __recognizer395707708.logProbe([
                11,
                61,
                11,
                72
            ], obj.outerHeight);
        return fn.apply(obj, arguments);
    }.bind(this)() - function () {
        var obj = __recognizer395707708.logProbe([
                11,
                77,
                11,
                102
            ], __recognizer395707708.logProbe([
                11,
                77,
                11,
                78
            ], $)('.lobby .main>.header')), fn = __recognizer395707708.logProbe([
                11,
                103,
                11,
                114
            ], obj.outerHeight);
        return fn.apply(obj, arguments);
    }.bind(this)() - 30 + 'px'));
    (function () {
        var obj = __recognizer395707708.logProbe([
                14,
                4,
                14,
                17
            ], __recognizer395707708.logProbe([
                14,
                4,
                14,
                5
            ], $)('.menu li')), fn = __recognizer395707708.logProbe([
                14,
                18,
                14,
                23
            ], obj.hover);
        return fn.apply(obj, arguments);
    }.bind(this)(function (e) {
        __recognizer395707708.logEntry([
            14,
            24,
            14,
            32
        ], arguments);
        __recognizer395707708.logProbe([
            15,
            8,
            15,
            31
        ], __recognizer395707708.logProbe([
            15,
            8,
            15,
            21
        ], clearInterval)(__recognizer395707708.logProbe([
            15,
            22,
            15,
            30
        ], interval)));
        __recognizer395707708.logProbe([
            16,
            8,
            16,
            50
        ], __recognizer395707708.logProbe([
            16,
            8,
            16,
            23
        ], PlaceDescToInfo)(function () {
            var obj = __recognizer395707708.logProbe([
                    16,
                    24,
                    16,
                    31
                ], __recognizer395707708.logProbe([
                    16,
                    24,
                    16,
                    25
                ], $)(__recognizer395707708.logProbe([
                    16,
                    26,
                    16,
                    30
                ], this))), fn = __recognizer395707708.logProbe([
                    16,
                    32,
                    16,
                    36
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)('data-desc')));
    }));
    (function () {
        var obj = __recognizer395707708.logProbe([
                19,
                4,
                19,
                17
            ], __recognizer395707708.logProbe([
                19,
                4,
                19,
                5
            ], $)('.menu li')), fn = __recognizer395707708.logProbe([
                19,
                18,
                19,
                23
            ], obj.click);
        return fn.apply(obj, arguments);
    }.bind(this)(function (e) {
        __recognizer395707708.logEntry([
            19,
            24,
            19,
            32
        ], arguments);
        var target = function () {
                var obj = __recognizer395707708.logProbe([
                        21,
                        21,
                        21,
                        28
                    ], __recognizer395707708.logProbe([
                        21,
                        21,
                        21,
                        22
                    ], $)(__recognizer395707708.logProbe([
                        21,
                        23,
                        21,
                        27
                    ], this))), fn = __recognizer395707708.logProbe([
                        21,
                        29,
                        21,
                        33
                    ], obj.attr);
                return fn.apply(obj, arguments);
            }.bind(this)('data-target');
        (function () {
            var obj = __recognizer395707708.logProbe([
                    23,
                    8,
                    23,
                    39
                ], __recognizer395707708.logProbe([
                    23,
                    8,
                    23,
                    9
                ], $)('input:not([tabindex=\'-1\'])')), fn = __recognizer395707708.logProbe([
                    23,
                    40,
                    23,
                    44
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)('tabindex', -1));
        if (!function () {
                var obj = __recognizer395707708.logProbe([
                        25,
                        12,
                        25,
                        21
                    ], __recognizer395707708.logProbe([
                        25,
                        12,
                        25,
                        13
                    ], $)(__recognizer395707708.logProbe([
                        25,
                        14,
                        25,
                        20
                    ], target))), fn = __recognizer395707708.logProbe([
                        25,
                        22,
                        25,
                        30
                    ], obj.hasClass);
                return fn.apply(obj, arguments);
            }.bind(this)('animating') && __recognizer395707708.logProbe([
                25,
                47,
                25,
                53
            ], target) != null) {
            __recognizer395707708.logProbe([
                27,
                12,
                27,
                28
            ], __recognizer395707708.logProbe([
                27,
                12,
                27,
                20
            ], ShowMenu)(__recognizer395707708.logProbe([
                27,
                21,
                27,
                27
            ], target)));
            __recognizer395707708.logProbe([
                28,
                12,
                28,
                38
            ], __recognizer395707708.logProbe([
                28,
                12,
                28,
                20
            ], HideMenu)(function () {
                var obj = __recognizer395707708.logProbe([
                        28,
                        21,
                        28,
                        28
                    ], __recognizer395707708.logProbe([
                        28,
                        21,
                        28,
                        22
                    ], $)(__recognizer395707708.logProbe([
                        28,
                        23,
                        28,
                        27
                    ], this))), fn = __recognizer395707708.logProbe([
                        28,
                        29,
                        28,
                        35
                    ], obj.parent);
                return fn.apply(obj, arguments);
            }.bind(this)()));
        }
    }));
    (function () {
        var obj = __recognizer395707708.logProbe([
                33,
                4,
                33,
                14
            ], __recognizer395707708.logProbe([
                33,
                4,
                33,
                5
            ], $)('.menu')), fn = __recognizer395707708.logProbe([
                33,
                15,
                33,
                25
            ], obj.mouseleave);
        return fn.apply(obj, arguments);
    }.bind(this)(function (e) {
        __recognizer395707708.logEntry([
            33,
            26,
            33,
            34
        ], arguments);
        __recognizer395707708.logProbe([
            34,
            8,
            34,
            31
        ], __recognizer395707708.logProbe([
            34,
            8,
            34,
            21
        ], clearInterval)(__recognizer395707708.logProbe([
            34,
            22,
            34,
            30
        ], interval)));
        __recognizer395707708.logProbe([
            35,
            8,
            35,
            27
        ], __recognizer395707708.logProbe([
            35,
            8,
            35,
            23
        ], PlaceDescToInfo)(''));
    }));
    __recognizer395707708.logProbe([
        39,
        4,
        39,
        21
    ], __recognizer395707708.logProbe([
        39,
        4,
        39,
        12
    ], HideMenu)('.menu'));
    (function () {
        var obj = __recognizer395707708.logProbe([
                41,
                4,
                41,
                14
            ], __recognizer395707708.logProbe([
                41,
                4,
                41,
                5
            ], $)('input')), fn = __recognizer395707708.logProbe([
                41,
                15,
                41,
                19
            ], obj.attr);
        return fn.apply(obj, arguments);
    }.bind(this)('tabindex', -1));
    (function () {
        var obj = __recognizer395707708.logProbe([
                44,
                4,
                44,
                15
            ], __recognizer395707708.logProbe([
                44,
                4,
                44,
                5
            ], $)('.lobby')), fn = __recognizer395707708.logProbe([
                44,
                16,
                44,
                23
            ], obj.popover);
        return fn.apply(obj, arguments);
    }.bind(this)({
        animation: false,
        container: '.lobby',
        selector: '.player img',
        html: true,
        trigger: 'click',
        template: '<div class="popover animated fadeInLeft" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }));
    (function () {
        var obj = __recognizer395707708.logProbe([
                56,
                4,
                56,
                15
            ], __recognizer395707708.logProbe([
                56,
                4,
                56,
                5
            ], $)('.lobby')), fn = __recognizer395707708.logProbe([
                56,
                16,
                56,
                23
            ], obj.tooltip);
        return fn.apply(obj, arguments);
    }.bind(this)({
        selector: '.popover .glyphicon',
        container: '.lobby'
    }));
}));
function MoveScreen(from, to) {
    __recognizer395707708.logEntry([
        79,
        9,
        79,
        19
    ], arguments);
    (function () {
        var obj = __recognizer395707708.logProbe([
                81,
                4,
                81,
                11
            ], __recognizer395707708.logProbe([
                81,
                4,
                81,
                5
            ], $)(__recognizer395707708.logProbe([
                81,
                6,
                81,
                10
            ], from))), fn = __recognizer395707708.logProbe([
                81,
                12,
                81,
                15
            ], obj.css);
        return fn.apply(obj, arguments);
    }.bind(this)('top', '-100%'));
    (function () {
        var obj = __recognizer395707708.logProbe([
                83,
                4,
                83,
                9
            ], __recognizer395707708.logProbe([
                83,
                4,
                83,
                5
            ], $)(__recognizer395707708.logProbe([
                83,
                6,
                83,
                8
            ], to))), fn = __recognizer395707708.logProbe([
                83,
                10,
                83,
                13
            ], obj.css);
        return fn.apply(obj, arguments);
    }.bind(this)('top', '0%'));
}
function ShowMenu(menu) {
    __recognizer395707708.logEntry([
        87,
        9,
        87,
        17
    ], arguments);
    (function () {
        var obj = function () {
                var obj = __recognizer395707708.logProbe([
                        90,
                        4,
                        90,
                        11
                    ], __recognizer395707708.logProbe([
                        90,
                        4,
                        90,
                        5
                    ], $)(__recognizer395707708.logProbe([
                        90,
                        6,
                        90,
                        10
                    ], menu))), fn = __recognizer395707708.logProbe([
                        90,
                        12,
                        90,
                        20
                    ], obj.children);
                return fn.apply(obj, arguments);
            }.bind(this)('li'), fn = __recognizer395707708.logProbe([
                90,
                27,
                90,
                31
            ], obj.each);
        return fn.apply(obj, arguments);
    }.bind(this)(function (i, e) {
        __recognizer395707708.logEntry([
            90,
            32,
            90,
            40
        ], arguments);
        (function () {
            var obj = __recognizer395707708.logProbe([
                    91,
                    8,
                    91,
                    15
                ], __recognizer395707708.logProbe([
                    91,
                    8,
                    91,
                    9
                ], $)(__recognizer395707708.logProbe([
                    91,
                    10,
                    91,
                    14
                ], this))), fn = __recognizer395707708.logProbe([
                    91,
                    16,
                    91,
                    24
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('delay-0-' + (__recognizer395707708.logProbe([
            91,
            40,
            91,
            41
        ], i) + 1) * 2));
    }));
    (function () {
        var obj = function () {
                var obj = __recognizer395707708.logProbe([
                        94,
                        4,
                        94,
                        11
                    ], __recognizer395707708.logProbe([
                        94,
                        4,
                        94,
                        5
                    ], $)(__recognizer395707708.logProbe([
                        94,
                        6,
                        94,
                        10
                    ], menu))), fn = __recognizer395707708.logProbe([
                        94,
                        12,
                        94,
                        20
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('animating'), fn = __recognizer395707708.logProbe([
                94,
                34,
                94,
                45
            ], obj.removeClass);
        return fn.apply(obj, arguments);
    }.bind(this)('null'));
    (function () {
        var obj = function () {
                var obj = function () {
                        var obj = function () {
                                var obj = __recognizer395707708.logProbe([
                                        95,
                                        4,
                                        95,
                                        11
                                    ], __recognizer395707708.logProbe([
                                        95,
                                        4,
                                        95,
                                        5
                                    ], $)(__recognizer395707708.logProbe([
                                        95,
                                        6,
                                        95,
                                        10
                                    ], menu))), fn = __recognizer395707708.logProbe([
                                        95,
                                        12,
                                        95,
                                        20
                                    ], obj.children);
                                return fn.apply(obj, arguments);
                            }.bind(this)('li'), fn = __recognizer395707708.logProbe([
                                95,
                                27,
                                95,
                                35
                            ], obj.addClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('slideInRight'), fn = __recognizer395707708.logProbe([
                        95,
                        52,
                        95,
                        60
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('animated'), fn = __recognizer395707708.logProbe([
                95,
                73,
                95,
                84
            ], obj.removeClass);
        return fn.apply(obj, arguments);
    }.bind(this)('slideOutRight'));
    var time = (__recognizer395707708.logProbe([
            98,
            39,
            98,
            45
        ], function () {
            var obj = __recognizer395707708.logProbe([
                    98,
                    16,
                    98,
                    23
                ], __recognizer395707708.logProbe([
                    98,
                    16,
                    98,
                    17
                ], $)(__recognizer395707708.logProbe([
                    98,
                    18,
                    98,
                    22
                ], menu))), fn = __recognizer395707708.logProbe([
                    98,
                    24,
                    98,
                    32
                ], obj.children);
            return fn.apply(obj, arguments);
        }.bind(this)('li').length) + 1) * 200 + 1000;
    __recognizer395707708.logProbe([
        100,
        4,
        103,
        11
    ], __recognizer395707708.logProbe([
        100,
        4,
        100,
        14
    ], setTimeout)(function () {
        __recognizer395707708.logEntry([
            100,
            15,
            100,
            23
        ], arguments);
        __recognizer395707708.logProbe([
            101,
            8,
            101,
            39
        ], __recognizer395707708.logProbe([
            101,
            8,
            101,
            23
        ], RemoveAnimation)('slideInRight'));
        __recognizer395707708.logProbe([
            102,
            8,
            102,
            36
        ], __recognizer395707708.logProbe([
            102,
            8,
            102,
            23
        ], RemoveAnimation)('animating'));
    }, __recognizer395707708.logProbe([
        103,
        6,
        103,
        10
    ], time)));
}
function HideMenu(menu) {
    __recognizer395707708.logEntry([
        106,
        9,
        106,
        17
    ], arguments);
    (function () {
        var obj = function () {
                var obj = __recognizer395707708.logProbe([
                        109,
                        4,
                        109,
                        11
                    ], __recognizer395707708.logProbe([
                        109,
                        4,
                        109,
                        5
                    ], $)(__recognizer395707708.logProbe([
                        109,
                        6,
                        109,
                        10
                    ], menu))), fn = __recognizer395707708.logProbe([
                        109,
                        12,
                        109,
                        20
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('animating'), fn = __recognizer395707708.logProbe([
                109,
                34,
                109,
                42
            ], obj.addClass);
        return fn.apply(obj, arguments);
    }.bind(this)('null'));
    (function () {
        var obj = function () {
                var obj = function () {
                        var obj = function () {
                                var obj = __recognizer395707708.logProbe([
                                        110,
                                        4,
                                        110,
                                        11
                                    ], __recognizer395707708.logProbe([
                                        110,
                                        4,
                                        110,
                                        5
                                    ], $)(__recognizer395707708.logProbe([
                                        110,
                                        6,
                                        110,
                                        10
                                    ], menu))), fn = __recognizer395707708.logProbe([
                                        110,
                                        12,
                                        110,
                                        20
                                    ], obj.children);
                                return fn.apply(obj, arguments);
                            }.bind(this)('li'), fn = __recognizer395707708.logProbe([
                                110,
                                27,
                                110,
                                38
                            ], obj.removeClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('slideInRight'), fn = __recognizer395707708.logProbe([
                        110,
                        55,
                        110,
                        63
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('animated'), fn = __recognizer395707708.logProbe([
                110,
                76,
                110,
                84
            ], obj.addClass);
        return fn.apply(obj, arguments);
    }.bind(this)('slideOutRight'));
    __recognizer395707708.logProbe([
        114,
        4,
        116,
        11
    ], __recognizer395707708.logProbe([
        114,
        4,
        114,
        14
    ], setTimeout)(function () {
        __recognizer395707708.logEntry([
            114,
            15,
            114,
            23
        ], arguments);
        __recognizer395707708.logProbe([
            115,
            8,
            115,
            36
        ], __recognizer395707708.logProbe([
            115,
            8,
            115,
            23
        ], RemoveAnimation)('animating'));
    }, 2000));
}
var currentInfoContent = '';
var interval;
function PlaceDescToInfo(desc) {
    __recognizer395707708.logEntry([
        123,
        9,
        123,
        24
    ], arguments);
    if (__recognizer395707708.logProbe([
            125,
            7,
            125,
            11
        ], desc) == null)
        return;
    currentInfoContent = function () {
        var obj = __recognizer395707708.logProbe([
                128,
                25,
                128,
                35
            ], __recognizer395707708.logProbe([
                128,
                25,
                128,
                26
            ], $)('.info')), fn = __recognizer395707708.logProbe([
                128,
                36,
                128,
                40
            ], obj.html);
        return fn.apply(obj, arguments);
    }.bind(this)();
    var isConsuming = true;
    (function () {
        var obj = __recognizer395707708.logProbe([
                132,
                4,
                132,
                14
            ], __recognizer395707708.logProbe([
                132,
                4,
                132,
                5
            ], $)('.info')), fn = __recognizer395707708.logProbe([
                132,
                15,
                132,
                26
            ], obj.removeClass);
        return fn.apply(obj, arguments);
    }.bind(this)('blinking'));
    interval = __recognizer395707708.logProbe([
        133,
        15,
        151,
        10
    ], __recognizer395707708.logProbe([
        133,
        15,
        133,
        26
    ], setInterval)(function () {
        __recognizer395707708.logEntry([
            133,
            27,
            133,
            35
        ], arguments);
        if (__recognizer395707708.logProbe([
                135,
                11,
                135,
                22
            ], isConsuming))
            currentInfoContent = function () {
                var obj = __recognizer395707708.logProbe([
                        136,
                        33,
                        136,
                        51
                    ], currentInfoContent), fn = __recognizer395707708.logProbe([
                        136,
                        52,
                        136,
                        58
                    ], obj.substr);
                return fn.apply(obj, arguments);
            }.bind(this)(0, __recognizer395707708.logProbe([
                136,
                80,
                136,
                86
            ], __recognizer395707708.logProbe([
                136,
                61,
                136,
                79
            ], currentInfoContent).length) - 6);
        else
            currentInfoContent = function () {
                var obj = __recognizer395707708.logProbe([
                        138,
                        33,
                        138,
                        37
                    ], desc), fn = __recognizer395707708.logProbe([
                        138,
                        38,
                        138,
                        44
                    ], obj.substr);
                return fn.apply(obj, arguments);
            }.bind(this)(0, __recognizer395707708.logProbe([
                138,
                66,
                138,
                72
            ], __recognizer395707708.logProbe([
                138,
                47,
                138,
                65
            ], currentInfoContent).length) + 6);
        (function () {
            var obj = __recognizer395707708.logProbe([
                    140,
                    8,
                    140,
                    18
                ], __recognizer395707708.logProbe([
                    140,
                    8,
                    140,
                    9
                ], $)('.info')), fn = __recognizer395707708.logProbe([
                    140,
                    19,
                    140,
                    23
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer395707708.logProbe([
            140,
            24,
            140,
            42
        ], currentInfoContent)));
        if (__recognizer395707708.logProbe([
                142,
                30,
                142,
                36
            ], __recognizer395707708.logProbe([
                142,
                11,
                142,
                29
            ], currentInfoContent).length) == 0)
            isConsuming = false;
        if (__recognizer395707708.logProbe([
                145,
                11,
                145,
                29
            ], currentInfoContent) == __recognizer395707708.logProbe([
                145,
                33,
                145,
                37
            ], desc) && !__recognizer395707708.logProbe([
                145,
                42,
                145,
                53
            ], isConsuming)) {
            (function () {
                var obj = __recognizer395707708.logProbe([
                        147,
                        12,
                        147,
                        22
                    ], __recognizer395707708.logProbe([
                        147,
                        12,
                        147,
                        13
                    ], $)('.info')), fn = __recognizer395707708.logProbe([
                        147,
                        23,
                        147,
                        31
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('blinking'));
            __recognizer395707708.logProbe([
                148,
                12,
                148,
                35
            ], __recognizer395707708.logProbe([
                148,
                12,
                148,
                25
            ], clearInterval)(__recognizer395707708.logProbe([
                148,
                26,
                148,
                34
            ], interval)));
        }
    }, 40));
}
function RemoveAnimation(animation) {
    __recognizer395707708.logEntry([
        155,
        9,
        155,
        24
    ], arguments);
    (function () {
        var obj = __recognizer395707708.logProbe([
                157,
                4,
                157,
                22
            ], __recognizer395707708.logProbe([
                157,
                4,
                157,
                5
            ], $)('.' + __recognizer395707708.logProbe([
                157,
                12,
                157,
                21
            ], animation))), fn = __recognizer395707708.logProbe([
                157,
                23,
                157,
                34
            ], obj.removeClass);
        return fn.apply(obj, arguments);
    }.bind(this)(__recognizer395707708.logProbe([
        157,
        35,
        157,
        44
    ], animation)));
}
function GotoMainMenu(from, name) {
    __recognizer395707708.logEntry([
        161,
        9,
        161,
        21
    ], arguments);
    (function () {
        var obj = __recognizer395707708.logProbe([
                163,
                4,
                163,
                36
            ], __recognizer395707708.logProbe([
                163,
                4,
                163,
                5
            ], $)('.main-menu #welcome-message')), fn = __recognizer395707708.logProbe([
                163,
                37,
                163,
                41
            ], obj.html);
        return fn.apply(obj, arguments);
    }.bind(this)('Welcome, Commander ' + __recognizer395707708.logProbe([
        163,
        66,
        163,
        70
    ], name) + '!'));
    __recognizer395707708.logProbe([
        164,
        4,
        164,
        26
    ], __recognizer395707708.logProbe([
        164,
        4,
        164,
        12
    ], ShowMenu)('.main-menu'));
    __recognizer395707708.logProbe([
        165,
        4,
        165,
        18
    ], __recognizer395707708.logProbe([
        165,
        4,
        165,
        12
    ], HideMenu)(__recognizer395707708.logProbe([
        165,
        13,
        165,
        17
    ], from)));
}
function GoToLobby() {
    __recognizer395707708.logEntry([
        168,
        9,
        168,
        18
    ], arguments);
    __recognizer395707708.logProbe([
        170,
        4,
        170,
        52
    ], __recognizer395707708.logProbe([
        170,
        4,
        170,
        14
    ], MoveScreen)('.container.main', '.container.lobby'));
    (function () {
        var obj = __recognizer395707708.logProbe([
                172,
                4,
                172,
                5
            ], $), fn = __recognizer395707708.logProbe([
                172,
                6,
                172,
                10
            ], obj.post);
        return fn.apply(obj, arguments);
    }.bind(this)('php/connectivity.php', { method: 'GoToLobby' }, function (data) {
        __recognizer395707708.logEntry([
            172,
            55,
            172,
            63
        ], arguments);
    }));
}
function UpdateLobby(players) {
    __recognizer395707708.logEntry([
        177,
        9,
        177,
        20
    ], arguments);
    if (__recognizer395707708.logProbe([
            179,
            7,
            179,
            14
        ], players) == '' || __recognizer395707708.logProbe([
            179,
            45,
            179,
            51
        ], __recognizer395707708.logProbe([
            179,
            24,
            179,
            44
        ], __recognizer395707708.logProbe([
            179,
            24,
            179,
            25
        ], $)('.lobby .popover')).length) != 0)
        return;
    var tmp = '';
    (function () {
        var obj = __recognizer395707708.logProbe([
                186,
                4,
                186,
                11
            ], players), fn = __recognizer395707708.logProbe([
                186,
                12,
                186,
                19
            ], obj.forEach);
        return fn.apply(obj, arguments);
    }.bind(this)(function (e, i) {
        __recognizer395707708.logEntry([
            186,
            20,
            186,
            28
        ], arguments);
        var available = '';
        var title = '<strong>' + __recognizer395707708.logProbe([
                189,
                33,
                189,
                41
            ], __recognizer395707708.logProbe([
                189,
                31,
                189,
                32
            ], e).Username) + '</strong><br>Rank: ' + __recognizer395707708.logProbe([
                189,
                70,
                189,
                74
            ], __recognizer395707708.logProbe([
                189,
                68,
                189,
                69
            ], e).Rank) + '<br>Win/Lose: ' + __recognizer395707708.logProbe([
                189,
                97,
                189,
                100
            ], __recognizer395707708.logProbe([
                189,
                95,
                189,
                96
            ], e).Win) + '/' + __recognizer395707708.logProbe([
                189,
                108,
                189,
                112
            ], __recognizer395707708.logProbe([
                189,
                106,
                189,
                107
            ], e).Lose) + '<br>Points: ' + __recognizer395707708.logProbe([
                189,
                134,
                189,
                139
            ], __recognizer395707708.logProbe([
                189,
                132,
                189,
                133
            ], e).Point);
        var actions = '';
        var tmpUser = '&quot;' + __recognizer395707708.logProbe([
                197,
                33,
                197,
                41
            ], __recognizer395707708.logProbe([
                197,
                31,
                197,
                32
            ], e).Username) + '&quot;';
        actions += '<span onclick ="ChallengePlayer(' + __recognizer395707708.logProbe([
            198,
            55,
            198,
            62
        ], tmpUser) + ');" title = "Challenge" class = "glyphicon glyphicon-screenshot" ></span>';
        actions += '<span title = "Message" class = "glyphicon glyphicon-envelope" ></span>';
        actions += '<span title = "Add as Comrade" class = "glyphicon glyphicon-user" ></span>';
        actions += '<span title = "Report" class = "glyphicon glyphicon-exclamation-sign" ></span>';
        if (__recognizer395707708.logProbe([
                203,
                13,
                203,
                27
            ], __recognizer395707708.logProbe([
                203,
                11,
                203,
                12
            ], e).CurrentMatchID) == 0)
            available = 'available';
        tmp += '<li class = \'player ' + __recognizer395707708.logProbe([
            205,
            38,
            205,
            47
        ], available) + '\' >';
        tmp += '<img title = \'' + __recognizer395707708.logProbe([
            206,
            32,
            206,
            37
        ], title) + '\' data-content=\'' + __recognizer395707708.logProbe([
            206,
            57,
            206,
            64
        ], actions) + '\' src =\'images/users/' + __recognizer395707708.logProbe([
            206,
            91,
            206,
            99
        ], __recognizer395707708.logProbe([
            206,
            89,
            206,
            90
        ], e).Username) + '.png\' onerror=\'this.onerror=null;this.src="images/users/default.png";\'>';
        tmp += '<a>' + __recognizer395707708.logProbe([
            207,
            25,
            207,
            33
        ], __recognizer395707708.logProbe([
            207,
            23,
            207,
            24
        ], e).Username) + '</a>';
        tmp += __recognizer395707708.logProbe([
            208,
            17,
            208,
            21
        ], __recognizer395707708.logProbe([
            208,
            15,
            208,
            16
        ], e).Rank);
        tmp += ' <span class = \'win\'>[' + __recognizer395707708.logProbe([
            209,
            42,
            209,
            45
        ], __recognizer395707708.logProbe([
            209,
            40,
            209,
            41
        ], e).Win) + ']</span> ';
        tmp += '<span class = \'lose\'>[' + __recognizer395707708.logProbe([
            210,
            42,
            210,
            46
        ], __recognizer395707708.logProbe([
            210,
            40,
            210,
            41
        ], e).Lose) + ']</span>';
        tmp += '</li>';
    }));
    (function () {
        var obj = __recognizer395707708.logProbe([
                215,
                4,
                215,
                30
            ], __recognizer395707708.logProbe([
                215,
                4,
                215,
                5
            ], $)('.lobby .online-player')), fn = __recognizer395707708.logProbe([
                215,
                31,
                215,
                35
            ], obj.html);
        return fn.apply(obj, arguments);
    }.bind(this)(__recognizer395707708.logProbe([
        215,
        36,
        215,
        39
    ], tmp)));
}
function ChallengePlayer(username) {
    __recognizer395707708.logEntry([
        218,
        9,
        218,
        24
    ], arguments);
    __recognizer395707708.logProbe([
        220,
        4,
        220,
        16
    ], __recognizer395707708.logProbe([
        220,
        4,
        220,
        9
    ], alert)(__recognizer395707708.logProbe([
        220,
        10,
        220,
        15
    ], usern)));
}
function LoginAsGuest() {
    __recognizer395707708.logEntry([
        226,
        9,
        226,
        21
    ], arguments);
    (function () {
        var obj = __recognizer395707708.logProbe([
                228,
                4,
                228,
                5
            ], $), fn = __recognizer395707708.logProbe([
                228,
                6,
                228,
                10
            ], obj.post);
        return fn.apply(obj, arguments);
    }.bind(this)('php/login-manager.php', { method: 'LoginAsGuest' }, function (data) {
        __recognizer395707708.logEntry([
            228,
            59,
            228,
            67
        ], arguments);
        __recognizer395707708.logProbe([
            229,
            8,
            229,
            43
        ], __recognizer395707708.logProbe([
            229,
            8,
            229,
            20
        ], GotoMainMenu)('.login-select', __recognizer395707708.logProbe([
            229,
            38,
            229,
            42
        ], data)));
    }));
}
function Login() {
    __recognizer395707708.logEntry([
        233,
        9,
        233,
        14
    ], arguments);
    var username = function () {
            var obj = __recognizer395707708.logProbe([
                    235,
                    19,
                    235,
                    45
                ], __recognizer395707708.logProbe([
                    235,
                    19,
                    235,
                    20
                ], $)('.login-form #username')), fn = __recognizer395707708.logProbe([
                    235,
                    46,
                    235,
                    49
                ], obj.val);
            return fn.apply(obj, arguments);
        }.bind(this)();
    var password = function () {
            var obj = __recognizer395707708.logProbe([
                    236,
                    19,
                    236,
                    45
                ], __recognizer395707708.logProbe([
                    236,
                    19,
                    236,
                    20
                ], $)('.login-form #password')), fn = __recognizer395707708.logProbe([
                    236,
                    46,
                    236,
                    49
                ], obj.val);
            return fn.apply(obj, arguments);
        }.bind(this)();
    __recognizer395707708.logProbe([
        237,
        4,
        237,
        36
    ], __recognizer395707708.logProbe([
        237,
        4,
        237,
        9
    ], alert)(__recognizer395707708.logProbe([
        237,
        10,
        237,
        18
    ], username) + '|' + __recognizer395707708.logProbe([
        237,
        27,
        237,
        35
    ], password)));
    if (__recognizer395707708.logProbe([
            238,
            16,
            238,
            22
        ], __recognizer395707708.logProbe([
            238,
            7,
            238,
            15
        ], password).length) < 8)
        (function () {
            var obj = function () {
                    var obj = function () {
                            var obj = __recognizer395707708.logProbe([
                                    239,
                                    8,
                                    239,
                                    34
                                ], __recognizer395707708.logProbe([
                                    239,
                                    8,
                                    239,
                                    9
                                ], $)('.login-form #password')), fn = __recognizer395707708.logProbe([
                                    239,
                                    35,
                                    239,
                                    41
                                ], obj.parent);
                            return fn.apply(obj, arguments);
                        }.bind(this)(), fn = __recognizer395707708.logProbe([
                            239,
                            44,
                            239,
                            55
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)(), fn = __recognizer395707708.logProbe([
                    239,
                    58,
                    239,
                    66
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('status-warning'));
    if (__recognizer395707708.logProbe([
            241,
            16,
            241,
            22
        ], __recognizer395707708.logProbe([
            241,
            7,
            241,
            15
        ], username).length) < 4)
        (function () {
            var obj = function () {
                    var obj = function () {
                            var obj = __recognizer395707708.logProbe([
                                    242,
                                    8,
                                    242,
                                    34
                                ], __recognizer395707708.logProbe([
                                    242,
                                    8,
                                    242,
                                    9
                                ], $)('.login-form #username')), fn = __recognizer395707708.logProbe([
                                    242,
                                    35,
                                    242,
                                    41
                                ], obj.parent);
                            return fn.apply(obj, arguments);
                        }.bind(this)(), fn = __recognizer395707708.logProbe([
                            242,
                            44,
                            242,
                            55
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)(), fn = __recognizer395707708.logProbe([
                    242,
                    58,
                    242,
                    66
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('status-warning'));
    if (__recognizer395707708.logProbe([
            244,
            16,
            244,
            22
        ], __recognizer395707708.logProbe([
            244,
            7,
            244,
            15
        ], username).length) < 4 || __recognizer395707708.logProbe([
            244,
            39,
            244,
            45
        ], __recognizer395707708.logProbe([
            244,
            30,
            244,
            38
        ], password).length) < 8)
        return;
    var data = {};
    data.username = __recognizer395707708.logProbe([
        248,
        20,
        248,
        28
    ], username);
    data.password = __recognizer395707708.logProbe([
        249,
        20,
        249,
        28
    ], password);
    (function () {
        var obj = __recognizer395707708.logProbe([
                252,
                4,
                252,
                5
            ], $), fn = __recognizer395707708.logProbe([
                252,
                6,
                252,
                10
            ], obj.post);
        return fn.apply(obj, arguments);
    }.bind(this)('php/login-manager.php', {
        method: 'Login',
        data: data
    }, function (retData) {
        __recognizer395707708.logEntry([
            252,
            63,
            252,
            71
        ], arguments);
        __recognizer395707708.logProbe([
            253,
            8,
            253,
            44
        ], __recognizer395707708.logProbe([
            253,
            8,
            253,
            13
        ], alert)('Received: \'' + __recognizer395707708.logProbe([
            253,
            30,
            253,
            37
        ], retData) + '\''));
        (function () {
            var obj = function () {
                    var obj = __recognizer395707708.logProbe([
                            254,
                            8,
                            254,
                            34
                        ], __recognizer395707708.logProbe([
                            254,
                            8,
                            254,
                            9
                        ], $)('.login-form #password')), fn = __recognizer395707708.logProbe([
                            254,
                            35,
                            254,
                            41
                        ], obj.parent);
                    return fn.apply(obj, arguments);
                }.bind(this)(), fn = __recognizer395707708.logProbe([
                    254,
                    44,
                    254,
                    55
                ], obj.removeClass);
            return fn.apply(obj, arguments);
        }.bind(this)());
        (function () {
            var obj = function () {
                    var obj = __recognizer395707708.logProbe([
                            255,
                            8,
                            255,
                            34
                        ], __recognizer395707708.logProbe([
                            255,
                            8,
                            255,
                            9
                        ], $)('.login-form #username')), fn = __recognizer395707708.logProbe([
                            255,
                            35,
                            255,
                            41
                        ], obj.parent);
                    return fn.apply(obj, arguments);
                }.bind(this)(), fn = __recognizer395707708.logProbe([
                    255,
                    44,
                    255,
                    55
                ], obj.removeClass);
            return fn.apply(obj, arguments);
        }.bind(this)());
        if (__recognizer395707708.logProbe([
                258,
                11,
                258,
                18
            ], retData) == '') {
            (function () {
                var obj = function () {
                        var obj = function () {
                                var obj = __recognizer395707708.logProbe([
                                        260,
                                        12,
                                        260,
                                        38
                                    ], __recognizer395707708.logProbe([
                                        260,
                                        12,
                                        260,
                                        13
                                    ], $)('.login-form #password')), fn = __recognizer395707708.logProbe([
                                        260,
                                        39,
                                        260,
                                        45
                                    ], obj.parent);
                                return fn.apply(obj, arguments);
                            }.bind(this)(), fn = __recognizer395707708.logProbe([
                                260,
                                48,
                                260,
                                59
                            ], obj.removeClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)(), fn = __recognizer395707708.logProbe([
                        260,
                        62,
                        260,
                        70
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('status-warning'));
            (function () {
                var obj = function () {
                        var obj = function () {
                                var obj = __recognizer395707708.logProbe([
                                        261,
                                        12,
                                        261,
                                        38
                                    ], __recognizer395707708.logProbe([
                                        261,
                                        12,
                                        261,
                                        13
                                    ], $)('.login-form #username')), fn = __recognizer395707708.logProbe([
                                        261,
                                        39,
                                        261,
                                        45
                                    ], obj.parent);
                                return fn.apply(obj, arguments);
                            }.bind(this)(), fn = __recognizer395707708.logProbe([
                                261,
                                48,
                                261,
                                59
                            ], obj.removeClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)(), fn = __recognizer395707708.logProbe([
                        261,
                        62,
                        261,
                        70
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('status-warning'));
        } else {
            __recognizer395707708.logProbe([
                265,
                12,
                265,
                27
            ], __recognizer395707708.logProbe([
                265,
                12,
                265,
                17
            ], alert)('logged'));
            __recognizer395707708.logProbe([
                266,
                12,
                266,
                47
            ], __recognizer395707708.logProbe([
                266,
                12,
                266,
                24
            ], GotoMainMenu)('.login-form', __recognizer395707708.logProbe([
                266,
                39,
                266,
                46
            ], retData)));
        }
    }));
}
function Logout() {
    __recognizer395707708.logEntry([
        271,
        9,
        271,
        15
    ], arguments);
    (function () {
        var obj = __recognizer395707708.logProbe([
                273,
                4,
                273,
                5
            ], $), fn = __recognizer395707708.logProbe([
                273,
                6,
                273,
                10
            ], obj.post);
        return fn.apply(obj, arguments);
    }.bind(this)('php/login-manager.php', { method: 'Logout' }, function (data) {
        __recognizer395707708.logEntry([
            273,
            53,
            273,
            61
        ], arguments);
    }));
}
function SignUp() {
    __recognizer395707708.logEntry([
        279,
        9,
        279,
        15
    ], arguments);
    var username = function () {
            var obj = __recognizer395707708.logProbe([
                    281,
                    19,
                    281,
                    46
                ], __recognizer395707708.logProbe([
                    281,
                    19,
                    281,
                    20
                ], $)('.signup-form #username')), fn = __recognizer395707708.logProbe([
                    281,
                    47,
                    281,
                    50
                ], obj.val);
            return fn.apply(obj, arguments);
        }.bind(this)();
    var email = function () {
            var obj = __recognizer395707708.logProbe([
                    282,
                    16,
                    282,
                    40
                ], __recognizer395707708.logProbe([
                    282,
                    16,
                    282,
                    17
                ], $)('.signup-form #email')), fn = __recognizer395707708.logProbe([
                    282,
                    41,
                    282,
                    44
                ], obj.val);
            return fn.apply(obj, arguments);
        }.bind(this)();
    var password = function () {
            var obj = __recognizer395707708.logProbe([
                    283,
                    19,
                    283,
                    46
                ], __recognizer395707708.logProbe([
                    283,
                    19,
                    283,
                    20
                ], $)('.signup-form #password')), fn = __recognizer395707708.logProbe([
                    283,
                    47,
                    283,
                    50
                ], obj.val);
            return fn.apply(obj, arguments);
        }.bind(this)();
    var confirmPassword = function () {
            var obj = __recognizer395707708.logProbe([
                    284,
                    26,
                    284,
                    61
                ], __recognizer395707708.logProbe([
                    284,
                    26,
                    284,
                    27
                ], $)('.signup-form #confirm-password')), fn = __recognizer395707708.logProbe([
                    284,
                    62,
                    284,
                    65
                ], obj.val);
            return fn.apply(obj, arguments);
        }.bind(this)();
    if (__recognizer395707708.logProbe([
            289,
            16,
            289,
            22
        ], __recognizer395707708.logProbe([
            289,
            7,
            289,
            15
        ], password).length) >= 8) {
        if (__recognizer395707708.logProbe([
                291,
                11,
                291,
                19
            ], password) != __recognizer395707708.logProbe([
                291,
                23,
                291,
                38
            ], confirmPassword)) {
            (function () {
                var obj = function () {
                        var obj = function () {
                                var obj = __recognizer395707708.logProbe([
                                        293,
                                        12,
                                        293,
                                        47
                                    ], __recognizer395707708.logProbe([
                                        293,
                                        12,
                                        293,
                                        13
                                    ], $)('.signup-form #confirm-password')), fn = __recognizer395707708.logProbe([
                                        293,
                                        48,
                                        293,
                                        54
                                    ], obj.parent);
                                return fn.apply(obj, arguments);
                            }.bind(this)(), fn = __recognizer395707708.logProbe([
                                293,
                                57,
                                293,
                                65
                            ], obj.addClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('status-warning'), fn = __recognizer395707708.logProbe([
                        293,
                        84,
                        293,
                        95
                    ], obj.removeClass);
                return fn.apply(obj, arguments);
            }.bind(this)('status-ok'));
        } else {
            (function () {
                var obj = function () {
                        var obj = function () {
                                var obj = __recognizer395707708.logProbe([
                                        297,
                                        12,
                                        297,
                                        47
                                    ], __recognizer395707708.logProbe([
                                        297,
                                        12,
                                        297,
                                        13
                                    ], $)('.signup-form #confirm-password')), fn = __recognizer395707708.logProbe([
                                        297,
                                        48,
                                        297,
                                        54
                                    ], obj.parent);
                                return fn.apply(obj, arguments);
                            }.bind(this)(), fn = __recognizer395707708.logProbe([
                                297,
                                57,
                                297,
                                68
                            ], obj.removeClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('status-warning'), fn = __recognizer395707708.logProbe([
                        297,
                        87,
                        297,
                        95
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('status-ok'));
        }
        (function () {
            var obj = function () {
                    var obj = function () {
                            var obj = __recognizer395707708.logProbe([
                                    299,
                                    8,
                                    299,
                                    35
                                ], __recognizer395707708.logProbe([
                                    299,
                                    8,
                                    299,
                                    9
                                ], $)('.signup-form #password')), fn = __recognizer395707708.logProbe([
                                    299,
                                    36,
                                    299,
                                    42
                                ], obj.parent);
                            return fn.apply(obj, arguments);
                        }.bind(this)(), fn = __recognizer395707708.logProbe([
                            299,
                            45,
                            299,
                            56
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('status-warning'), fn = __recognizer395707708.logProbe([
                    299,
                    75,
                    299,
                    83
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('status-ok'));
    } else {
        (function () {
            var obj = function () {
                    var obj = function () {
                            var obj = __recognizer395707708.logProbe([
                                    303,
                                    8,
                                    303,
                                    43
                                ], __recognizer395707708.logProbe([
                                    303,
                                    8,
                                    303,
                                    9
                                ], $)('.signup-form #confirm-password')), fn = __recognizer395707708.logProbe([
                                    303,
                                    44,
                                    303,
                                    50
                                ], obj.parent);
                            return fn.apply(obj, arguments);
                        }.bind(this)(), fn = __recognizer395707708.logProbe([
                            303,
                            53,
                            303,
                            64
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)(), fn = __recognizer395707708.logProbe([
                    303,
                    67,
                    303,
                    75
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('status-warning'));
        (function () {
            var obj = function () {
                    var obj = function () {
                            var obj = __recognizer395707708.logProbe([
                                    304,
                                    8,
                                    304,
                                    35
                                ], __recognizer395707708.logProbe([
                                    304,
                                    8,
                                    304,
                                    9
                                ], $)('.signup-form #password')), fn = __recognizer395707708.logProbe([
                                    304,
                                    36,
                                    304,
                                    42
                                ], obj.parent);
                            return fn.apply(obj, arguments);
                        }.bind(this)(), fn = __recognizer395707708.logProbe([
                            304,
                            45,
                            304,
                            53
                        ], obj.addClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('status-warning'), fn = __recognizer395707708.logProbe([
                    304,
                    72,
                    304,
                    83
                ], obj.removeClass);
            return fn.apply(obj, arguments);
        }.bind(this)('status-ok'));
    }
    if (__recognizer395707708.logProbe([
            307,
            42,
            307,
            48
        ], __recognizer395707708.logProbe([
            307,
            8,
            307,
            41
        ], __recognizer395707708.logProbe([
            307,
            8,
            307,
            9
        ], $)('.signup-form .status-warning')).length) == 0) {
        var data = {};
        data.username = __recognizer395707708.logProbe([
            310,
            24,
            310,
            32
        ], username);
        data.email = __recognizer395707708.logProbe([
            311,
            21,
            311,
            26
        ], email);
        data.password = __recognizer395707708.logProbe([
            312,
            24,
            312,
            32
        ], password);
        (function () {
            var obj = __recognizer395707708.logProbe([
                    314,
                    8,
                    314,
                    9
                ], $), fn = __recognizer395707708.logProbe([
                    314,
                    10,
                    314,
                    14
                ], obj.post);
            return fn.apply(obj, arguments);
        }.bind(this)('php/login-manager.php', {
            method: 'Signup',
            data: data
        }, function (data) {
            __recognizer395707708.logEntry([
                314,
                68,
                314,
                76
            ], arguments);
            __recognizer395707708.logProbe([
                315,
                12,
                315,
                45
            ], __recognizer395707708.logProbe([
                315,
                12,
                315,
                24
            ], GotoMainMenu)('.signup-form', __recognizer395707708.logProbe([
                315,
                40,
                315,
                44
            ], data)));
        }));
    }
}
function CheckAvailability(info, sender) {
    __recognizer395707708.logEntry([
        323,
        9,
        323,
        26
    ], arguments);
    var value = function () {
            var obj = __recognizer395707708.logProbe([
                    326,
                    16,
                    326,
                    25
                ], __recognizer395707708.logProbe([
                    326,
                    16,
                    326,
                    17
                ], $)(__recognizer395707708.logProbe([
                    326,
                    18,
                    326,
                    24
                ], sender))), fn = __recognizer395707708.logProbe([
                    326,
                    26,
                    326,
                    29
                ], obj.val);
            return fn.apply(obj, arguments);
        }.bind(this)() + '';
    value = function () {
        var obj = __recognizer395707708.logProbe([
                327,
                12,
                327,
                17
            ], value), fn = __recognizer395707708.logProbe([
                327,
                18,
                327,
                22
            ], obj.trim);
        return fn.apply(obj, arguments);
    }.bind(this)();
    if (__recognizer395707708.logProbe([
            331,
            13,
            331,
            19
        ], __recognizer395707708.logProbe([
            331,
            7,
            331,
            12
        ], value).length) < 4) {
        (function () {
            var obj = function () {
                    var obj = function () {
                            var obj = __recognizer395707708.logProbe([
                                    333,
                                    8,
                                    333,
                                    17
                                ], __recognizer395707708.logProbe([
                                    333,
                                    8,
                                    333,
                                    9
                                ], $)(__recognizer395707708.logProbe([
                                    333,
                                    10,
                                    333,
                                    16
                                ], sender))), fn = __recognizer395707708.logProbe([
                                    333,
                                    18,
                                    333,
                                    24
                                ], obj.parent);
                            return fn.apply(obj, arguments);
                        }.bind(this)(), fn = __recognizer395707708.logProbe([
                            333,
                            27,
                            333,
                            38
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)(), fn = __recognizer395707708.logProbe([
                    333,
                    41,
                    333,
                    49
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('status-warning'));
        return;
    }
    (function () {
        var obj = function () {
                var obj = __recognizer395707708.logProbe([
                        337,
                        4,
                        337,
                        13
                    ], __recognizer395707708.logProbe([
                        337,
                        4,
                        337,
                        5
                    ], $)(__recognizer395707708.logProbe([
                        337,
                        6,
                        337,
                        12
                    ], sender))), fn = __recognizer395707708.logProbe([
                        337,
                        14,
                        337,
                        20
                    ], obj.parent);
                return fn.apply(obj, arguments);
            }.bind(this)(), fn = __recognizer395707708.logProbe([
                337,
                23,
                337,
                31
            ], obj.addClass);
        return fn.apply(obj, arguments);
    }.bind(this)('status-verifying'));
    (function () {
        var obj = __recognizer395707708.logProbe([
                338,
                4,
                338,
                5
            ], $), fn = __recognizer395707708.logProbe([
                338,
                6,
                338,
                10
            ], obj.post);
        return fn.apply(obj, arguments);
    }.bind(this)('php/login-manager.php', {
        method: 'Is' + __recognizer395707708.logProbe([
            338,
            48,
            338,
            52
        ], info) + 'Available',
        value: value
    }, function (data) {
        __recognizer395707708.logEntry([
            338,
            80,
            338,
            88
        ], arguments);
        (function () {
            var obj = function () {
                    var obj = __recognizer395707708.logProbe([
                            339,
                            8,
                            339,
                            17
                        ], __recognizer395707708.logProbe([
                            339,
                            8,
                            339,
                            9
                        ], $)(__recognizer395707708.logProbe([
                            339,
                            10,
                            339,
                            16
                        ], sender))), fn = __recognizer395707708.logProbe([
                            339,
                            18,
                            339,
                            24
                        ], obj.parent);
                    return fn.apply(obj, arguments);
                }.bind(this)(), fn = __recognizer395707708.logProbe([
                    339,
                    27,
                    339,
                    38
                ], obj.removeClass);
            return fn.apply(obj, arguments);
        }.bind(this)());
        if (__recognizer395707708.logProbe([
                341,
                11,
                341,
                15
            ], data) == 'false')
            (function () {
                var obj = function () {
                        var obj = __recognizer395707708.logProbe([
                                342,
                                12,
                                342,
                                21
                            ], __recognizer395707708.logProbe([
                                342,
                                12,
                                342,
                                13
                            ], $)(__recognizer395707708.logProbe([
                                342,
                                14,
                                342,
                                20
                            ], sender))), fn = __recognizer395707708.logProbe([
                                342,
                                22,
                                342,
                                28
                            ], obj.parent);
                        return fn.apply(obj, arguments);
                    }.bind(this)(), fn = __recognizer395707708.logProbe([
                        342,
                        31,
                        342,
                        39
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('status-warning'));
        else
            (function () {
                var obj = function () {
                        var obj = __recognizer395707708.logProbe([
                                344,
                                12,
                                344,
                                21
                            ], __recognizer395707708.logProbe([
                                344,
                                12,
                                344,
                                13
                            ], $)(__recognizer395707708.logProbe([
                                344,
                                14,
                                344,
                                20
                            ], sender))), fn = __recognizer395707708.logProbe([
                                344,
                                22,
                                344,
                                28
                            ], obj.parent);
                        return fn.apply(obj, arguments);
                    }.bind(this)(), fn = __recognizer395707708.logProbe([
                        344,
                        31,
                        344,
                        39
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('status-ok'));
    }));
}