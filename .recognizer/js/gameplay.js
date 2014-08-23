/**
 * This code has been instrumented using Recognizer
 * https://github.com/equiet/recognizer
 */

var __recognizer412712723 = (function () {
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

var GameStates = {
        SETUP: 0,
        WAITING_TO_START: 1,
        TURN: 2,
        WAITING: 3,
        GAME_OVER: 4,
        SENDING_MOVE: 5
    };
var Errors = {
        INVALID_BOARD: 0,
        INVALID_SETUP: 1,
        INVALID_MOVE: 2
    };
var currentGameState = __recognizer412712723.logProbe([
        17,
        34,
        17,
        39
    ], __recognizer412712723.logProbe([
        17,
        23,
        17,
        33
    ], GameStates).SETUP);
var boardContent = '000000000/000000000/000000000/000000000/000000000/000000000/000000000/000000000';
var isSetupFeeding = true;
var board = {
        width: 9,
        height: 8,
        content: boardContent
    };
var piecesLegend = 'abcdefghijklmno';
function SubmitTestID() {
    __recognizer412712723.logEntry([
        39,
        9,
        39,
        21
    ], arguments);
    (function () {
        var obj = __recognizer412712723.logProbe([
                41,
                4,
                41,
                5
            ], $), fn = __recognizer412712723.logProbe([
                41,
                6,
                41,
                10
            ], obj.post);
        return fn.apply(obj, arguments);
    }.bind(this)('php/arbiter.php', {
        'method': 'SetTmpID',
        'ID': function () {
            var obj = __recognizer412712723.logProbe([
                    41,
                    58,
                    41,
                    71
                ], __recognizer412712723.logProbe([
                    41,
                    58,
                    41,
                    59
                ], $)('.test-id')), fn = __recognizer412712723.logProbe([
                    41,
                    72,
                    41,
                    75
                ], obj.val);
            return fn.apply(obj, arguments);
        }.bind(this)()
    }, function (data) {
        __recognizer412712723.logEntry([
            41,
            80,
            41,
            88
        ], arguments);
        __recognizer412712723.logProbe([
            42,
            7,
            42,
            18
        ], __recognizer412712723.logProbe([
            42,
            7,
            42,
            12
        ], alert)(__recognizer412712723.logProbe([
            42,
            13,
            42,
            17
        ], data)));
    }));
}
(function () {
    var obj = __recognizer412712723.logProbe([
            46,
            0,
            46,
            11
        ], __recognizer412712723.logProbe([
            46,
            0,
            46,
            1
        ], $)(__recognizer412712723.logProbe([
            46,
            2,
            46,
            10
        ], document))), fn = __recognizer412712723.logProbe([
            46,
            12,
            46,
            17
        ], obj.ready);
    return fn.apply(obj, arguments);
}.bind(this)(function () {
    __recognizer412712723.logEntry([
        46,
        18,
        46,
        26
    ], arguments);
    __recognizer412712723.logProbe([
        50,
        4,
        50,
        19
    ], __recognizer412712723.logProbe([
        50,
        4,
        50,
        17
    ], GenerateBoard)());
    (function () {
        var obj = __recognizer412712723.logProbe([
                52,
                4,
                52,
                15
            ], __recognizer412712723.logProbe([
                52,
                4,
                52,
                5
            ], $)(__recognizer412712723.logProbe([
                52,
                6,
                52,
                14
            ], document))), fn = __recognizer412712723.logProbe([
                52,
                16,
                52,
                18
            ], obj.on);
        return fn.apply(obj, arguments);
    }.bind(this)('click', '.piece-box li', function (e) {
        __recognizer412712723.logEntry([
            52,
            43,
            52,
            51
        ], arguments);
        switch (__recognizer412712723.logProbe([
                55,
                15,
                55,
                31
            ], currentGameState)) {
        case __recognizer412712723.logProbe([
                57,
                28,
                57,
                33
            ], __recognizer412712723.logProbe([
                57,
                17,
                57,
                27
            ], GameStates).SETUP):
            __recognizer412712723.logProbe([
                58,
                16,
                58,
                36
            ], __recognizer412712723.logProbe([
                58,
                16,
                58,
                30
            ], PlaceAndSwitch)(__recognizer412712723.logProbe([
                58,
                31,
                58,
                35
            ], this)));
            break;
        }
    }));
    (function () {
        var obj = __recognizer412712723.logProbe([
                63,
                4,
                63,
                15
            ], __recognizer412712723.logProbe([
                63,
                4,
                63,
                5
            ], $)(__recognizer412712723.logProbe([
                63,
                6,
                63,
                14
            ], document))), fn = __recognizer412712723.logProbe([
                63,
                16,
                63,
                18
            ], obj.on);
        return fn.apply(obj, arguments);
    }.bind(this)('click', '.board td', function (e) {
        __recognizer412712723.logEntry([
            63,
            39,
            63,
            47
        ], arguments);
        switch (__recognizer412712723.logProbe([
                65,
                15,
                65,
                31
            ], currentGameState)) {
        case __recognizer412712723.logProbe([
                67,
                28,
                67,
                33
            ], __recognizer412712723.logProbe([
                67,
                17,
                67,
                27
            ], GameStates).SETUP):
            __recognizer412712723.logProbe([
                68,
                16,
                68,
                36
            ], __recognizer412712723.logProbe([
                68,
                16,
                68,
                30
            ], PlaceAndSwitch)(__recognizer412712723.logProbe([
                68,
                31,
                68,
                35
            ], this)));
            break;
        case __recognizer412712723.logProbe([
                71,
                28,
                71,
                32
            ], __recognizer412712723.logProbe([
                71,
                17,
                71,
                27
            ], GameStates).TURN):
            if (function () {
                    var obj = __recognizer412712723.logProbe([
                            72,
                            19,
                            72,
                            26
                        ], __recognizer412712723.logProbe([
                            72,
                            19,
                            72,
                            20
                        ], $)(__recognizer412712723.logProbe([
                            72,
                            21,
                            72,
                            25
                        ], this))), fn = __recognizer412712723.logProbe([
                            72,
                            27,
                            72,
                            35
                        ], obj.hasClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('owned'))
                __recognizer412712723.logProbe([
                    73,
                    20,
                    73,
                    54
                ], __recognizer412712723.logProbe([
                    73,
                    20,
                    73,
                    33
                ], GetValidMoves)(__recognizer412712723.logProbe([
                    73,
                    34,
                    73,
                    53
                ], __recognizer412712723.logProbe([
                    73,
                    34,
                    73,
                    47
                ], ConvertToTile)(__recognizer412712723.logProbe([
                    73,
                    48,
                    73,
                    52
                ], this)))));
            break;
        }
    }));
    (function () {
        var obj = __recognizer412712723.logProbe([
                81,
                4,
                81,
                15
            ], __recognizer412712723.logProbe([
                81,
                4,
                81,
                5
            ], $)(__recognizer412712723.logProbe([
                81,
                6,
                81,
                14
            ], document))), fn = __recognizer412712723.logProbe([
                81,
                16,
                81,
                18
            ], obj.on);
        return fn.apply(obj, arguments);
    }.bind(this)('click', '.board td.active', function (e) {
        __recognizer412712723.logEntry([
            81,
            46,
            81,
            54
        ], arguments);
        __recognizer412712723.logProbe([
            82,
            8,
            82,
            33
        ], __recognizer412712723.logProbe([
            82,
            8,
            82,
            27
        ], MoveSelectedPieceTo)(__recognizer412712723.logProbe([
            82,
            28,
            82,
            32
        ], this)));
    }));
    __recognizer412712723.logProbe([
        85,
        4,
        85,
        21
    ], __recognizer412712723.logProbe([
        85,
        4,
        85,
        19
    ], PrepareForSetup)());
}));
function PrepareForSetup() {
    __recognizer412712723.logEntry([
        90,
        9,
        90,
        24
    ], arguments);
    var pieces = [
            1,
            6,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            2
        ];
    for (var i = 0; __recognizer412712723.logProbe([
            94,
            19,
            94,
            20
        ], i) < 15; __recognizer412712723.logProbe([
            94,
            27,
            94,
            28
        ], i)++) {
        (function () {
            var obj = __recognizer412712723.logProbe([
                    96,
                    8,
                    96,
                    23
                ], __recognizer412712723.logProbe([
                    96,
                    8,
                    96,
                    9
                ], $)('.piece-box')), fn = __recognizer412712723.logProbe([
                    96,
                    24,
                    96,
                    30
                ], obj.append);
            return fn.apply(obj, arguments);
        }.bind(this)('<li class = \'owned\' data-piece=\'' + __recognizer412712723.logProbe([
            96,
            79,
            96,
            80
        ], __recognizer412712723.logProbe([
            96,
            66,
            96,
            78
        ], piecesLegend)[i]) + '\' data-count = \'' + __recognizer412712723.logProbe([
            96,
            108,
            96,
            109
        ], __recognizer412712723.logProbe([
            96,
            101,
            96,
            107
        ], pieces)[i]) + '\'>' + __recognizer412712723.logProbe([
            96,
            129,
            96,
            130
        ], __recognizer412712723.logProbe([
            96,
            116,
            96,
            128
        ], piecesLegend)[i]) + '(' + __recognizer412712723.logProbe([
            96,
            143,
            96,
            144
        ], __recognizer412712723.logProbe([
            96,
            136,
            96,
            142
        ], pieces)[i]) + ')' + '</li>'));
    }
    __recognizer412712723.logProbe([
        99,
        4,
        99,
        19
    ], __recognizer412712723.logProbe([
        99,
        4,
        99,
        17
    ], SetDroppables)());
}
function SetDroppables() {
    __recognizer412712723.logEntry([
        102,
        9,
        102,
        22
    ], arguments);
    (function () {
        var obj = __recognizer412712723.logProbe([
                105,
                4,
                105,
                33
            ], __recognizer412712723.logProbe([
                105,
                4,
                105,
                5
            ], $)('.board td, .piece-box>li')), fn = __recognizer412712723.logProbe([
                105,
                34,
                105,
                43
            ], obj.draggable);
        return fn.apply(obj, arguments);
    }.bind(this)({
        revert: 'invalid',
        helper: 'clone',
        containment: 'body',
        start: function (e, ui) {
            __recognizer412712723.logEntry([
                109,
                15,
                109,
                23
            ], arguments);
            (function () {
                var obj = __recognizer412712723.logProbe([
                        110,
                        12,
                        110,
                        24
                    ], __recognizer412712723.logProbe([
                        110,
                        12,
                        110,
                        13
                    ], $)(__recognizer412712723.logProbe([
                        110,
                        17,
                        110,
                        23
                    ], __recognizer412712723.logProbe([
                        110,
                        14,
                        110,
                        16
                    ], ui).helper))), fn = __recognizer412712723.logProbe([
                        110,
                        25,
                        110,
                        33
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('dragged'));
            if (__recognizer412712723.logProbe([
                    112,
                    15,
                    112,
                    31
                ], currentGameState) == __recognizer412712723.logProbe([
                    112,
                    46,
                    112,
                    50
                ], __recognizer412712723.logProbe([
                    112,
                    35,
                    112,
                    45
                ], GameStates).TURN)) {
                __recognizer412712723.logProbe([
                    114,
                    16,
                    114,
                    50
                ], __recognizer412712723.logProbe([
                    114,
                    16,
                    114,
                    29
                ], GetValidMoves)(__recognizer412712723.logProbe([
                    114,
                    30,
                    114,
                    49
                ], __recognizer412712723.logProbe([
                    114,
                    30,
                    114,
                    43
                ], ConvertToTile)(__recognizer412712723.logProbe([
                    114,
                    44,
                    114,
                    48
                ], this)))));
            }
        }
    }));
    (function () {
        var obj = __recognizer412712723.logProbe([
                122,
                4,
                122,
                18
            ], __recognizer412712723.logProbe([
                122,
                4,
                122,
                5
            ], $)('.board td')), fn = __recognizer412712723.logProbe([
                122,
                19,
                122,
                28
            ], obj.droppable);
        return fn.apply(obj, arguments);
    }.bind(this)({
        accept: '.owned',
        activeClass: 'droppable-active',
        hoverClass: 'droppable-hover',
        drop: function (e, ui) {
            __recognizer412712723.logEntry([
                126,
                14,
                126,
                22
            ], arguments);
            (function () {
                var obj = __recognizer412712723.logProbe([
                        131,
                        15,
                        131,
                        21
                    ], __recognizer412712723.logProbe([
                        131,
                        12,
                        131,
                        14
                    ], ui).helper), fn = __recognizer412712723.logProbe([
                        131,
                        22,
                        131,
                        25
                    ], obj.css);
                return fn.apply(obj, arguments);
            }.bind(this)('box-shadow', 'inset 0px 0px 4px transparent'));
            if (__recognizer412712723.logProbe([
                    133,
                    15,
                    133,
                    31
                ], currentGameState) == __recognizer412712723.logProbe([
                    133,
                    46,
                    133,
                    51
                ], __recognizer412712723.logProbe([
                    133,
                    35,
                    133,
                    45
                ], GameStates).SETUP)) {
                if (__recognizer412712723.logProbe([
                        135,
                        50,
                        135,
                        56
                    ], function () {
                        var obj = __recognizer412712723.logProbe([
                                135,
                                22,
                                135,
                                31
                            ], __recognizer412712723.logProbe([
                                135,
                                19,
                                135,
                                21
                            ], ui).draggable), fn = __recognizer412712723.logProbe([
                                135,
                                32,
                                135,
                                39
                            ], obj.parents);
                        return fn.apply(obj, arguments);
                    }.bind(this)('.board').length)) {
                    if (function () {
                            var obj = __recognizer412712723.logProbe([
                                    137,
                                    23,
                                    137,
                                    30
                                ], __recognizer412712723.logProbe([
                                    137,
                                    23,
                                    137,
                                    24
                                ], $)(__recognizer412712723.logProbe([
                                    137,
                                    25,
                                    137,
                                    29
                                ], this))), fn = __recognizer412712723.logProbe([
                                    137,
                                    31,
                                    137,
                                    39
                                ], obj.hasClass);
                            return fn.apply(obj, arguments);
                        }.bind(this)('owned')) {
                        __recognizer412712723.logProbe([
                            139,
                            24,
                            139,
                            78
                        ], __recognizer412712723.logProbe([
                            139,
                            24,
                            139,
                            37
                        ], SwitchAttribs)(__recognizer412712723.logProbe([
                            139,
                            41,
                            139,
                            50
                        ], __recognizer412712723.logProbe([
                            139,
                            38,
                            139,
                            40
                        ], ui).draggable), __recognizer412712723.logProbe([
                            139,
                            52,
                            139,
                            56
                        ], this), ['data-piece'], true));
                    } else {
                        __recognizer412712723.logProbe([
                            143,
                            24,
                            143,
                            87
                        ], __recognizer412712723.logProbe([
                            143,
                            24,
                            143,
                            39
                        ], TransferAttribs)(__recognizer412712723.logProbe([
                            143,
                            43,
                            143,
                            52
                        ], __recognizer412712723.logProbe([
                            143,
                            40,
                            143,
                            42
                        ], ui).draggable), __recognizer412712723.logProbe([
                            143,
                            53,
                            143,
                            57
                        ], this), ['data-piece'], ['0'], true));
                        (function () {
                            var obj = __recognizer412712723.logProbe([
                                    144,
                                    27,
                                    144,
                                    36
                                ], __recognizer412712723.logProbe([
                                    144,
                                    24,
                                    144,
                                    26
                                ], ui).draggable), fn = __recognizer412712723.logProbe([
                                    144,
                                    37,
                                    144,
                                    48
                                ], obj.removeClass);
                            return fn.apply(obj, arguments);
                        }.bind(this)('owned'));
                    }
                    (function () {
                        var obj = __recognizer412712723.logProbe([
                                146,
                                20,
                                146,
                                27
                            ], __recognizer412712723.logProbe([
                                146,
                                20,
                                146,
                                21
                            ], $)(__recognizer412712723.logProbe([
                                146,
                                22,
                                146,
                                26
                            ], this))), fn = __recognizer412712723.logProbe([
                                146,
                                28,
                                146,
                                36
                            ], obj.addClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('owned'));
                    (function () {
                        var obj = __recognizer412712723.logProbe([
                                147,
                                20,
                                147,
                                42
                            ], __recognizer412712723.logProbe([
                                147,
                                20,
                                147,
                                21
                            ], $)('.droppable-active')), fn = __recognizer412712723.logProbe([
                                147,
                                43,
                                147,
                                54
                            ], obj.removeClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('droppable-active'));
                    (function () {
                        var obj = __recognizer412712723.logProbe([
                                148,
                                23,
                                148,
                                32
                            ], __recognizer412712723.logProbe([
                                148,
                                20,
                                148,
                                22
                            ], ui).draggable), fn = __recognizer412712723.logProbe([
                                148,
                                33,
                                148,
                                37
                            ], obj.attr);
                        return fn.apply(obj, arguments);
                    }.bind(this)('data-count', __recognizer412712723.logProbe([
                        148,
                        52,
                        148,
                        93
                    ], __recognizer412712723.logProbe([
                        148,
                        52,
                        148,
                        60
                    ], parseInt)(function () {
                        var obj = __recognizer412712723.logProbe([
                                148,
                                64,
                                148,
                                73
                            ], __recognizer412712723.logProbe([
                                148,
                                61,
                                148,
                                63
                            ], ui).draggable), fn = __recognizer412712723.logProbe([
                                148,
                                74,
                                148,
                                78
                            ], obj.attr);
                        return fn.apply(obj, arguments);
                    }.bind(this)('data-count'))) - 1));
                } else if (!function () {
                        var obj = __recognizer412712723.logProbe([
                                150,
                                25,
                                150,
                                32
                            ], __recognizer412712723.logProbe([
                                150,
                                25,
                                150,
                                26
                            ], $)(__recognizer412712723.logProbe([
                                150,
                                27,
                                150,
                                31
                            ], this))), fn = __recognizer412712723.logProbe([
                                150,
                                33,
                                150,
                                41
                            ], obj.hasClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('owned')) {
                    __recognizer412712723.logProbe([
                        152,
                        20,
                        152,
                        72
                    ], __recognizer412712723.logProbe([
                        152,
                        20,
                        152,
                        31
                    ], CopyAttribs)(__recognizer412712723.logProbe([
                        152,
                        35,
                        152,
                        44
                    ], __recognizer412712723.logProbe([
                        152,
                        32,
                        152,
                        34
                    ], ui).draggable), __recognizer412712723.logProbe([
                        152,
                        45,
                        152,
                        49
                    ], this), ['data-piece'], true));
                    (function () {
                        var obj = __recognizer412712723.logProbe([
                                153,
                                23,
                                153,
                                32
                            ], __recognizer412712723.logProbe([
                                153,
                                20,
                                153,
                                22
                            ], ui).draggable), fn = __recognizer412712723.logProbe([
                                153,
                                33,
                                153,
                                42
                            ], obj.draggable);
                        return fn.apply(obj, arguments);
                    }.bind(this)('disable'));
                    (function () {
                        var obj = __recognizer412712723.logProbe([
                                155,
                                20,
                                155,
                                27
                            ], __recognizer412712723.logProbe([
                                155,
                                20,
                                155,
                                21
                            ], $)(__recognizer412712723.logProbe([
                                155,
                                22,
                                155,
                                26
                            ], this))), fn = __recognizer412712723.logProbe([
                                155,
                                28,
                                155,
                                36
                            ], obj.addClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('owned'));
                    (function () {
                        var obj = __recognizer412712723.logProbe([
                                156,
                                20,
                                156,
                                42
                            ], __recognizer412712723.logProbe([
                                156,
                                20,
                                156,
                                21
                            ], $)('.droppable-active')), fn = __recognizer412712723.logProbe([
                                156,
                                43,
                                156,
                                54
                            ], obj.removeClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('droppable-active'));
                    (function () {
                        var obj = __recognizer412712723.logProbe([
                                157,
                                23,
                                157,
                                32
                            ], __recognizer412712723.logProbe([
                                157,
                                20,
                                157,
                                22
                            ], ui).draggable), fn = __recognizer412712723.logProbe([
                                157,
                                33,
                                157,
                                37
                            ], obj.attr);
                        return fn.apply(obj, arguments);
                    }.bind(this)('data-count', __recognizer412712723.logProbe([
                        157,
                        52,
                        157,
                        93
                    ], __recognizer412712723.logProbe([
                        157,
                        52,
                        157,
                        60
                    ], parseInt)(function () {
                        var obj = __recognizer412712723.logProbe([
                                157,
                                64,
                                157,
                                73
                            ], __recognizer412712723.logProbe([
                                157,
                                61,
                                157,
                                63
                            ], ui).draggable), fn = __recognizer412712723.logProbe([
                                157,
                                74,
                                157,
                                78
                            ], obj.attr);
                        return fn.apply(obj, arguments);
                    }.bind(this)('data-count'))) - 1));
                }
                __recognizer412712723.logProbe([
                    163,
                    16,
                    165,
                    20
                ], __recognizer412712723.logProbe([
                    163,
                    16,
                    163,
                    26
                ], setTimeout)(function () {
                    __recognizer412712723.logEntry([
                        163,
                        27,
                        163,
                        35
                    ], arguments);
                    __recognizer412712723.logProbe([
                        164,
                        20,
                        164,
                        37
                    ], __recognizer412712723.logProbe([
                        164,
                        20,
                        164,
                        35
                    ], RefreshPieceBox)());
                }, 0));
            }
            if (__recognizer412712723.logProbe([
                    168,
                    15,
                    168,
                    31
                ], currentGameState) == __recognizer412712723.logProbe([
                    168,
                    46,
                    168,
                    50
                ], __recognizer412712723.logProbe([
                    168,
                    35,
                    168,
                    45
                ], GameStates).TURN)) {
                __recognizer412712723.logProbe([
                    170,
                    16,
                    170,
                    79
                ], __recognizer412712723.logProbe([
                    170,
                    16,
                    170,
                    31
                ], TransferAttribs)(__recognizer412712723.logProbe([
                    170,
                    35,
                    170,
                    44
                ], __recognizer412712723.logProbe([
                    170,
                    32,
                    170,
                    34
                ], ui).draggable), __recognizer412712723.logProbe([
                    170,
                    45,
                    170,
                    49
                ], this), ['data-piece'], ['0'], true));
                (function () {
                    var obj = function () {
                            var obj = __recognizer412712723.logProbe([
                                    171,
                                    19,
                                    171,
                                    28
                                ], __recognizer412712723.logProbe([
                                    171,
                                    16,
                                    171,
                                    18
                                ], ui).draggable), fn = __recognizer412712723.logProbe([
                                    171,
                                    29,
                                    171,
                                    40
                                ], obj.removeClass);
                            return fn.apply(obj, arguments);
                        }.bind(this)('owned'), fn = __recognizer412712723.logProbe([
                            171,
                            50,
                            171,
                            61
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('selected'));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            172,
                            16,
                            172,
                            23
                        ], __recognizer412712723.logProbe([
                            172,
                            16,
                            172,
                            17
                        ], $)(__recognizer412712723.logProbe([
                            172,
                            18,
                            172,
                            22
                        ], this))), fn = __recognizer412712723.logProbe([
                            172,
                            24,
                            172,
                            32
                        ], obj.addClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('owned'));
                __recognizer412712723.logProbe([
                    175,
                    16,
                    175,
                    45
                ], __recognizer412712723.logProbe([
                    175,
                    16,
                    175,
                    25
                ], MovePiece)(__recognizer412712723.logProbe([
                    175,
                    29,
                    175,
                    38
                ], __recognizer412712723.logProbe([
                    175,
                    26,
                    175,
                    28
                ], ui).draggable), __recognizer412712723.logProbe([
                    175,
                    40,
                    175,
                    44
                ], this)));
            }
        }
    }));
    __recognizer412712723.logProbe([
        181,
        4,
        181,
        21
    ], __recognizer412712723.logProbe([
        181,
        4,
        181,
        19
    ], RefreshPieceBox)());
}
function MovePiece(from, to) {
    __recognizer412712723.logEntry([
        185,
        9,
        185,
        18
    ], arguments);
    (function () {
        var obj = function () {
                var obj = __recognizer412712723.logProbe([
                        189,
                        8,
                        189,
                        22
                    ], __recognizer412712723.logProbe([
                        189,
                        8,
                        189,
                        9
                    ], $)('.board td')), fn = __recognizer412712723.logProbe([
                        189,
                        23,
                        189,
                        34
                    ], obj.removeClass);
                return fn.apply(obj, arguments);
            }.bind(this)('droppable'), fn = __recognizer412712723.logProbe([
                189,
                48,
                189,
                59
            ], obj.removeClass);
        return fn.apply(obj, arguments);
    }.bind(this)('droppable-active'));
    __recognizer412712723.logProbe([
        191,
        8,
        191,
        29
    ], __recognizer412712723.logProbe([
        191,
        8,
        191,
        27
    ], ResetSelectedPieces)());
    from = __recognizer412712723.logProbe([
        194,
        11,
        194,
        30
    ], __recognizer412712723.logProbe([
        194,
        11,
        194,
        24
    ], ConvertToTile)(__recognizer412712723.logProbe([
        194,
        25,
        194,
        29
    ], from)));
    to = __recognizer412712723.logProbe([
        195,
        9,
        195,
        26
    ], __recognizer412712723.logProbe([
        195,
        9,
        195,
        22
    ], ConvertToTile)(__recognizer412712723.logProbe([
        195,
        23,
        195,
        25
    ], to)));
    from = {
        x: __recognizer412712723.logProbe([
            197,
            20,
            197,
            21
        ], __recognizer412712723.logProbe([
            197,
            15,
            197,
            19
        ], from).x),
        y: __recognizer412712723.logProbe([
            197,
            31,
            197,
            32
        ], __recognizer412712723.logProbe([
            197,
            26,
            197,
            30
        ], from).y)
    };
    to = {
        x: __recognizer412712723.logProbe([
            198,
            16,
            198,
            17
        ], __recognizer412712723.logProbe([
            198,
            13,
            198,
            15
        ], to).x),
        y: __recognizer412712723.logProbe([
            198,
            25,
            198,
            26
        ], __recognizer412712723.logProbe([
            198,
            22,
            198,
            24
        ], to).y)
    };
    (function () {
        var obj = __recognizer412712723.logProbe([
                201,
                4,
                201,
                5
            ], $), fn = __recognizer412712723.logProbe([
                201,
                6,
                201,
                10
            ], obj.post);
        return fn.apply(obj, arguments);
    }.bind(this)('php/arbiter.php', {
        method: 'SendMove',
        from: from,
        to: to
    }, __recognizer412712723.logProbe([
        201,
        70,
        201,
        86
    ], GameEventHandler)));
}
function SubmitPosition() {
    __recognizer412712723.logEntry([
        206,
        9,
        206,
        23
    ], arguments);
    __recognizer412712723.logProbe([
        208,
        4,
        208,
        24
    ], __recognizer412712723.logProbe([
        208,
        4,
        208,
        22
    ], UpdateBoardContent)());
    (function () {
        var obj = __recognizer412712723.logProbe([
                209,
                4,
                209,
                5
            ], $), fn = __recognizer412712723.logProbe([
                209,
                6,
                209,
                10
            ], obj.post);
        return fn.apply(obj, arguments);
    }.bind(this)('php/arbiter.php', {
        'method': 'SubmitSetupPosition',
        'board': __recognizer412712723.logProbe([
            209,
            78,
            209,
            85
        ], __recognizer412712723.logProbe([
            209,
            72,
            209,
            77
        ], board).content)
    }, function (data) {
        __recognizer412712723.logEntry([
            209,
            88,
            209,
            96
        ], arguments);
        __recognizer412712723.logProbe([
            210,
            8,
            210,
            19
        ], __recognizer412712723.logProbe([
            210,
            8,
            210,
            13
        ], alert)(__recognizer412712723.logProbe([
            210,
            14,
            210,
            18
        ], data)));
        data = function () {
            var obj = __recognizer412712723.logProbe([
                    211,
                    15,
                    211,
                    19
                ], JSON), fn = __recognizer412712723.logProbe([
                    211,
                    20,
                    211,
                    25
                ], obj.parse);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            211,
            26,
            211,
            30
        ], data));
        if (__recognizer412712723.logProbe([
                213,
                16,
                213,
                21
            ], __recognizer412712723.logProbe([
                213,
                11,
                213,
                15
            ], data).error) == __recognizer412712723.logProbe([
                213,
                32,
                213,
                45
            ], __recognizer412712723.logProbe([
                213,
                25,
                213,
                31
            ], Errors).INVALID_SETUP))
            __recognizer412712723.logProbe([
                214,
                12,
                214,
                35
            ], __recognizer412712723.logProbe([
                214,
                12,
                214,
                17
            ], alert)('Set up invalid'));
        if (__recognizer412712723.logProbe([
                216,
                16,
                216,
                25
            ], __recognizer412712723.logProbe([
                216,
                11,
                216,
                15
            ], data).gameState) == __recognizer412712723.logProbe([
                216,
                40,
                216,
                56
            ], __recognizer412712723.logProbe([
                216,
                29,
                216,
                39
            ], GameStates).WAITING_TO_START))
            __recognizer412712723.logProbe([
                217,
                12,
                217,
                40
            ], __recognizer412712723.logProbe([
                217,
                12,
                217,
                17
            ], alert)('Waiting for oponent'));
    }));
}
function UpdateBoardContent() {
    __recognizer412712723.logEntry([
        221,
        9,
        221,
        27
    ], arguments);
    var tmpBoard = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
    (function () {
        var obj = __recognizer412712723.logProbe([
                225,
                4,
                225,
                18
            ], __recognizer412712723.logProbe([
                225,
                4,
                225,
                5
            ], $)('.board td')), fn = __recognizer412712723.logProbe([
                225,
                19,
                225,
                23
            ], obj.each);
        return fn.apply(obj, arguments);
    }.bind(this)(function (i, e) {
        __recognizer412712723.logEntry([
            225,
            24,
            225,
            32
        ], arguments);
        var tile = __recognizer412712723.logProbe([
                226,
                19,
                226,
                35
            ], __recognizer412712723.logProbe([
                226,
                19,
                226,
                32
            ], ConvertToTile)(__recognizer412712723.logProbe([
                226,
                33,
                226,
                34
            ], e)));
        tmpBoard[tile.y][tile.x] = __recognizer412712723.logProbe([
            228,
            40,
            228,
            45
        ], __recognizer412712723.logProbe([
            228,
            35,
            228,
            39
        ], tile).piece);
    }));
    board.content = [];
    (function () {
        var obj = __recognizer412712723.logProbe([
                233,
                4,
                233,
                12
            ], tmpBoard), fn = __recognizer412712723.logProbe([
                233,
                13,
                233,
                20
            ], obj.forEach);
        return fn.apply(obj, arguments);
    }.bind(this)(function (e, i) {
        __recognizer412712723.logEntry([
            233,
            21,
            233,
            29
        ], arguments);
        board.content[i] = function () {
            var obj = __recognizer412712723.logProbe([
                    234,
                    27,
                    234,
                    28
                ], e), fn = __recognizer412712723.logProbe([
                    234,
                    29,
                    234,
                    33
                ], obj.join);
            return fn.apply(obj, arguments);
        }.bind(this)('');
        if (__recognizer412712723.logProbe([
                235,
                11,
                235,
                12
            ], i) < __recognizer412712723.logProbe([
                235,
                24,
                235,
                30
            ], __recognizer412712723.logProbe([
                235,
                15,
                235,
                23
            ], tmpBoard).length) - 1)
            board.content[i] += '/';
    }));
    board.content = function () {
        var obj = __recognizer412712723.logProbe([
                239,
                26,
                239,
                33
            ], __recognizer412712723.logProbe([
                239,
                20,
                239,
                25
            ], board).content), fn = __recognizer412712723.logProbe([
                239,
                34,
                239,
                38
            ], obj.join);
        return fn.apply(obj, arguments);
    }.bind(this)('');
    ;
}
function EmptyPieceBox() {
    __recognizer412712723.logEntry([
        245,
        9,
        245,
        22
    ], arguments);
    (function () {
        var obj = __recognizer412712723.logProbe([
                248,
                4,
                248,
                22
            ], __recognizer412712723.logProbe([
                248,
                4,
                248,
                5
            ], $)('.piece-box>li')), fn = __recognizer412712723.logProbe([
                248,
                23,
                248,
                27
            ], obj.each);
        return fn.apply(obj, arguments);
    }.bind(this)(function (i, e) {
        __recognizer412712723.logEntry([
            248,
            28,
            248,
            36
        ], arguments);
        (function () {
            var obj = __recognizer412712723.logProbe([
                    249,
                    8,
                    249,
                    12
                ], __recognizer412712723.logProbe([
                    249,
                    8,
                    249,
                    9
                ], $)(__recognizer412712723.logProbe([
                    249,
                    10,
                    249,
                    11
                ], e))), fn = __recognizer412712723.logProbe([
                    249,
                    13,
                    249,
                    17
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)('data-count', 0));
    }));
    __recognizer412712723.logProbe([
        251,
        4,
        251,
        21
    ], __recognizer412712723.logProbe([
        251,
        4,
        251,
        19
    ], RefreshPieceBox)());
}
function RefreshPieceBox() {
    __recognizer412712723.logEntry([
        254,
        9,
        254,
        24
    ], arguments);
    (function () {
        var obj = __recognizer412712723.logProbe([
                256,
                4,
                256,
                22
            ], __recognizer412712723.logProbe([
                256,
                4,
                256,
                5
            ], $)('.piece-box>li')), fn = __recognizer412712723.logProbe([
                256,
                23,
                256,
                34
            ], obj.removeClass);
        return fn.apply(obj, arguments);
    }.bind(this)('has-remaining'));
    (function () {
        var obj = __recognizer412712723.logProbe([
                257,
                4,
                257,
                22
            ], __recognizer412712723.logProbe([
                257,
                4,
                257,
                5
            ], $)('.piece-box>li')), fn = __recognizer412712723.logProbe([
                257,
                23,
                257,
                27
            ], obj.each);
        return fn.apply(obj, arguments);
    }.bind(this)(function (i, e) {
        __recognizer412712723.logEntry([
            257,
            28,
            257,
            36
        ], arguments);
        if (__recognizer412712723.logProbe([
                258,
                10,
                258,
                43
            ], __recognizer412712723.logProbe([
                258,
                10,
                258,
                18
            ], parseInt)(function () {
                var obj = __recognizer412712723.logProbe([
                        258,
                        19,
                        258,
                        23
                    ], __recognizer412712723.logProbe([
                        258,
                        19,
                        258,
                        20
                    ], $)(__recognizer412712723.logProbe([
                        258,
                        21,
                        258,
                        22
                    ], e))), fn = __recognizer412712723.logProbe([
                        258,
                        24,
                        258,
                        28
                    ], obj.attr);
                return fn.apply(obj, arguments);
            }.bind(this)('data-count'))) > 0)
            (function () {
                var obj = __recognizer412712723.logProbe([
                        259,
                        11,
                        259,
                        15
                    ], __recognizer412712723.logProbe([
                        259,
                        11,
                        259,
                        12
                    ], $)(__recognizer412712723.logProbe([
                        259,
                        13,
                        259,
                        14
                    ], e))), fn = __recognizer412712723.logProbe([
                        259,
                        16,
                        259,
                        24
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('has-remaining'));
        (function () {
            var obj = __recognizer412712723.logProbe([
                    261,
                    8,
                    261,
                    12
                ], __recognizer412712723.logProbe([
                    261,
                    8,
                    261,
                    9
                ], $)(__recognizer412712723.logProbe([
                    261,
                    10,
                    261,
                    11
                ], e))), fn = __recognizer412712723.logProbe([
                    261,
                    13,
                    261,
                    17
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)(function () {
            var obj = __recognizer412712723.logProbe([
                    261,
                    18,
                    261,
                    22
                ], __recognizer412712723.logProbe([
                    261,
                    18,
                    261,
                    19
                ], $)(__recognizer412712723.logProbe([
                    261,
                    20,
                    261,
                    21
                ], e))), fn = __recognizer412712723.logProbe([
                    261,
                    23,
                    261,
                    27
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)('data-piece') + '(' + function () {
            var obj = __recognizer412712723.logProbe([
                    261,
                    50,
                    261,
                    54
                ], __recognizer412712723.logProbe([
                    261,
                    50,
                    261,
                    51
                ], $)(__recognizer412712723.logProbe([
                    261,
                    52,
                    261,
                    53
                ], e))), fn = __recognizer412712723.logProbe([
                    261,
                    55,
                    261,
                    59
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)('data-count') + ')'));
    }));
    (function () {
        var obj = __recognizer412712723.logProbe([
                264,
                4,
                264,
                33
            ], __recognizer412712723.logProbe([
                264,
                4,
                264,
                5
            ], $)('.board td, .piece-box>li')), fn = __recognizer412712723.logProbe([
                264,
                34,
                264,
                43
            ], obj.draggable);
        return fn.apply(obj, arguments);
    }.bind(this)('disable'));
    (function () {
        var obj = __recognizer412712723.logProbe([
                265,
                4,
                265,
                38
            ], __recognizer412712723.logProbe([
                265,
                4,
                265,
                5
            ], $)('.has-remaining, .board .owned')), fn = __recognizer412712723.logProbe([
                265,
                39,
                265,
                48
            ], obj.draggable);
        return fn.apply(obj, arguments);
    }.bind(this)('enable'));
    (function () {
        var obj = __recognizer412712723.logProbe([
                267,
                4,
                267,
                18
            ], __recognizer412712723.logProbe([
                267,
                4,
                267,
                5
            ], $)('.board td')), fn = __recognizer412712723.logProbe([
                267,
                19,
                267,
                28
            ], obj.droppable);
        return fn.apply(obj, arguments);
    }.bind(this)('disable'));
    (function () {
        var obj = __recognizer412712723.logProbe([
                270,
                4,
                270,
                42
            ], __recognizer412712723.logProbe([
                270,
                4,
                270,
                5
            ], $)('.board tr:nth-last-child(-n+3) td')), fn = __recognizer412712723.logProbe([
                270,
                43,
                270,
                52
            ], obj.droppable);
        return fn.apply(obj, arguments);
    }.bind(this)('enable'));
    if (__recognizer412712723.logProbe([
            272,
            7,
            272,
            21
        ], isSetupFeeding)) {
        (function () {
            var obj = __recognizer412712723.logProbe([
                    274,
                    8,
                    274,
                    33
                ], __recognizer412712723.logProbe([
                    274,
                    8,
                    274,
                    9
                ], $)('.game-area .selected')), fn = __recognizer412712723.logProbe([
                    274,
                    34,
                    274,
                    45
                ], obj.removeClass);
            return fn.apply(obj, arguments);
        }.bind(this)('selected'));
        (function () {
            var obj = __recognizer412712723.logProbe([
                    275,
                    8,
                    275,
                    46
                ], __recognizer412712723.logProbe([
                    275,
                    8,
                    275,
                    9
                ], $)(__recognizer412712723.logProbe([
                    275,
                    43,
                    275,
                    44
                ], __recognizer412712723.logProbe([
                    275,
                    10,
                    275,
                    42
                ], __recognizer412712723.logProbe([
                    275,
                    10,
                    275,
                    11
                ], $)('.piece-box li.has-remaining'))[0]))), fn = __recognizer412712723.logProbe([
                    275,
                    47,
                    275,
                    55
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('selected'));
    }
}
function GenerateBoard() {
    __recognizer412712723.logEntry([
        282,
        9,
        282,
        22
    ], arguments);
    tmpBoard = __recognizer412712723.logProbe([
        285,
        21,
        285,
        28
    ], __recognizer412712723.logProbe([
        285,
        15,
        285,
        20
    ], board).content);
    board.content = function () {
        var obj = __recognizer412712723.logProbe([
                286,
                20,
                286,
                28
            ], tmpBoard), fn = __recognizer412712723.logProbe([
                286,
                29,
                286,
                34
            ], obj.split);
        return fn.apply(obj, arguments);
    }.bind(this)('/');
    var tmpBoardContent = '';
    var isBoardCreated = function () {
            var obj = __recognizer412712723.logProbe([
                    288,
                    25,
                    288,
                    36
                ], __recognizer412712723.logProbe([
                    288,
                    25,
                    288,
                    26
                ], $)('.board')), fn = __recognizer412712723.logProbe([
                    288,
                    37,
                    288,
                    45
                ], obj.hasClass);
            return fn.apply(obj, arguments);
        }.bind(this)('isCreated');
    for (var y = 0; __recognizer412712723.logProbe([
            290,
            19,
            290,
            20
        ], y) < __recognizer412712723.logProbe([
            290,
            29,
            290,
            35
        ], __recognizer412712723.logProbe([
            290,
            23,
            290,
            28
        ], board).height); __recognizer412712723.logProbe([
            290,
            37,
            290,
            38
        ], y)++) {
        var row = '<tr>';
        for (var x = 0; __recognizer412712723.logProbe([
                293,
                23,
                293,
                24
            ], x) < __recognizer412712723.logProbe([
                293,
                33,
                293,
                38
            ], __recognizer412712723.logProbe([
                293,
                27,
                293,
                32
            ], board).width); __recognizer412712723.logProbe([
                293,
                40,
                293,
                41
            ], x)++) {
            var tmp = __recognizer412712723.logProbe([
                    295,
                    39,
                    295,
                    40
                ], __recognizer412712723.logProbe([
                    295,
                    36,
                    295,
                    37
                ], __recognizer412712723.logProbe([
                    295,
                    28,
                    295,
                    35
                ], __recognizer412712723.logProbe([
                    295,
                    22,
                    295,
                    27
                ], board).content)[y])[x]);
            var owned = 'owned';
            if (__recognizer412712723.logProbe([
                    297,
                    15,
                    297,
                    18
                ], tmp) == '0' || __recognizer412712723.logProbe([
                    297,
                    29,
                    297,
                    32
                ], tmp) == '*') {
                tmp = '';
                owned = '';
            }
            if (!__recognizer412712723.logProbe([
                    303,
                    16,
                    303,
                    30
                ], isBoardCreated))
                row += '<td class = \'' + __recognizer412712723.logProbe([
                    304,
                    39,
                    304,
                    44
                ], owned) + '\' data-x = \'' + __recognizer412712723.logProbe([
                    304,
                    60,
                    304,
                    61
                ], x) + '\' data-y=\'' + __recognizer412712723.logProbe([
                    304,
                    75,
                    304,
                    76
                ], y) + '\' data-piece = \'' + __recognizer412712723.logProbe([
                    304,
                    113,
                    304,
                    114
                ], __recognizer412712723.logProbe([
                    304,
                    110,
                    304,
                    111
                ], __recognizer412712723.logProbe([
                    304,
                    102,
                    304,
                    109
                ], __recognizer412712723.logProbe([
                    304,
                    96,
                    304,
                    101
                ], board).content)[y])[x]) + '\' data-color=\'0\' >' + __recognizer412712723.logProbe([
                    304,
                    137,
                    304,
                    140
                ], tmp) + '</td>';
            else {
                $tile = __recognizer412712723.logProbe([
                    306,
                    24,
                    306,
                    70
                ], __recognizer412712723.logProbe([
                    306,
                    24,
                    306,
                    25
                ], $)('.board td[data-y=\'' + __recognizer412712723.logProbe([
                    306,
                    47,
                    306,
                    48
                ], y) + '\'][data-x=\'' + __recognizer412712723.logProbe([
                    306,
                    63,
                    306,
                    64
                ], x) + '\']'));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            308,
                            16,
                            308,
                            21
                        ], $tile), fn = __recognizer412712723.logProbe([
                            308,
                            22,
                            308,
                            33
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('owned'));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            309,
                            16,
                            309,
                            21
                        ], $tile), fn = __recognizer412712723.logProbe([
                            309,
                            22,
                            309,
                            30
                        ], obj.addClass);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer412712723.logProbe([
                    309,
                    31,
                    309,
                    36
                ], owned)));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            310,
                            16,
                            310,
                            21
                        ], $tile), fn = __recognizer412712723.logProbe([
                            310,
                            22,
                            310,
                            26
                        ], obj.html);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer412712723.logProbe([
                    310,
                    27,
                    310,
                    30
                ], tmp)));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            311,
                            16,
                            311,
                            21
                        ], $tile), fn = __recognizer412712723.logProbe([
                            311,
                            22,
                            311,
                            26
                        ], obj.attr);
                    return fn.apply(obj, arguments);
                }.bind(this)('data-piece', __recognizer412712723.logProbe([
                    311,
                    58,
                    311,
                    59
                ], __recognizer412712723.logProbe([
                    311,
                    55,
                    311,
                    56
                ], __recognizer412712723.logProbe([
                    311,
                    47,
                    311,
                    54
                ], __recognizer412712723.logProbe([
                    311,
                    41,
                    311,
                    46
                ], board).content)[y])[x])));
            }
        }
        row += '</tr>';
        tmpBoardContent += __recognizer412712723.logProbe([
            317,
            27,
            317,
            30
        ], row);
    }
    if (!__recognizer412712723.logProbe([
            320,
            8,
            320,
            22
        ], isBoardCreated))
        (function () {
            var obj = __recognizer412712723.logProbe([
                    321,
                    8,
                    321,
                    19
                ], __recognizer412712723.logProbe([
                    321,
                    8,
                    321,
                    9
                ], $)('.board')), fn = __recognizer412712723.logProbe([
                    321,
                    20,
                    321,
                    24
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            321,
            25,
            321,
            40
        ], tmpBoardContent)));
    (function () {
        var obj = __recognizer412712723.logProbe([
                323,
                4,
                323,
                15
            ], __recognizer412712723.logProbe([
                323,
                4,
                323,
                5
            ], $)('.board')), fn = __recognizer412712723.logProbe([
                323,
                16,
                323,
                24
            ], obj.addClass);
        return fn.apply(obj, arguments);
    }.bind(this)('isCreated'));
    (function () {
        var obj = __recognizer412712723.logProbe([
                325,
                4,
                325,
                31
            ], __recognizer412712723.logProbe([
                325,
                4,
                325,
                5
            ], $)('.board td.ui-droppable')), fn = __recognizer412712723.logProbe([
                325,
                32,
                325,
                41
            ], obj.droppable);
        return fn.apply(obj, arguments);
    }.bind(this)('disable'));
    if (__recognizer412712723.logProbe([
            327,
            35,
            327,
            41
        ], __recognizer412712723.logProbe([
            327,
            7,
            327,
            34
        ], __recognizer412712723.logProbe([
            327,
            7,
            327,
            8
        ], $)('.board td.ui-draggable')).length) != 0)
        (function () {
            var obj = __recognizer412712723.logProbe([
                    328,
                    8,
                    328,
                    35
                ], __recognizer412712723.logProbe([
                    328,
                    8,
                    328,
                    9
                ], $)('.board td.ui-draggable')), fn = __recognizer412712723.logProbe([
                    328,
                    36,
                    328,
                    45
                ], obj.draggable);
            return fn.apply(obj, arguments);
        }.bind(this)('disable'));
    __recognizer412712723.logProbe([
        330,
        4,
        330,
        25
    ], __recognizer412712723.logProbe([
        330,
        4,
        330,
        23
    ], ResetSelectedPieces)());
    switch (__recognizer412712723.logProbe([
            332,
            11,
            332,
            27
        ], currentGameState)) {
    case __recognizer412712723.logProbe([
            334,
            24,
            334,
            29
        ], __recognizer412712723.logProbe([
            334,
            13,
            334,
            23
        ], GameStates).SETUP):
        (function () {
            var obj = __recognizer412712723.logProbe([
                    335,
                    12,
                    335,
                    50
                ], __recognizer412712723.logProbe([
                    335,
                    12,
                    335,
                    13
                ], $)('.board tr:nth-last-child(-n+3) td')), fn = __recognizer412712723.logProbe([
                    335,
                    51,
                    335,
                    59
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('droppable'));
        break;
    case __recognizer412712723.logProbe([
            338,
            24,
            338,
            31
        ], __recognizer412712723.logProbe([
            338,
            13,
            338,
            23
        ], GameStates).WAITING):
        break;
    case __recognizer412712723.logProbe([
            341,
            24,
            341,
            28
        ], __recognizer412712723.logProbe([
            341,
            13,
            341,
            23
        ], GameStates).TURN):
        __recognizer412712723.logProbe([
            342,
            12,
            347,
            17
        ], __recognizer412712723.logProbe([
            342,
            12,
            342,
            22
        ], setTimeout)(function () {
            __recognizer412712723.logEntry([
                342,
                23,
                342,
                31
            ], arguments);
            (function () {
                var obj = __recognizer412712723.logProbe([
                        344,
                        16,
                        344,
                        42
                    ], __recognizer412712723.logProbe([
                        344,
                        16,
                        344,
                        17
                    ], $)('.board td:not(.owned)')), fn = __recognizer412712723.logProbe([
                        344,
                        43,
                        344,
                        51
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('droppable'));
            (function () {
                var obj = __recognizer412712723.logProbe([
                        345,
                        16,
                        345,
                        36
                    ], __recognizer412712723.logProbe([
                        345,
                        16,
                        345,
                        17
                    ], $)('.board td.owned')), fn = __recognizer412712723.logProbe([
                        345,
                        37,
                        345,
                        46
                    ], obj.draggable);
                return fn.apply(obj, arguments);
            }.bind(this)('enable'));
            __recognizer412712723.logProbe([
                346,
                16,
                346,
                23
            ], __recognizer412712723.logProbe([
                346,
                16,
                346,
                21
            ], alert)());
        }, 10));
        break;
    }
}
function ConvertToTile(o) {
    __recognizer412712723.logEntry([
        354,
        9,
        354,
        22
    ], arguments);
    var tile = {};
    tile.x = __recognizer412712723.logProbe([
        358,
        13,
        358,
        42
    ], __recognizer412712723.logProbe([
        358,
        13,
        358,
        21
    ], parseInt)(function () {
        var obj = __recognizer412712723.logProbe([
                358,
                22,
                358,
                26
            ], __recognizer412712723.logProbe([
                358,
                22,
                358,
                23
            ], $)(__recognizer412712723.logProbe([
                358,
                24,
                358,
                25
            ], o))), fn = __recognizer412712723.logProbe([
                358,
                27,
                358,
                31
            ], obj.attr);
        return fn.apply(obj, arguments);
    }.bind(this)('data-x')));
    tile.y = __recognizer412712723.logProbe([
        359,
        13,
        359,
        42
    ], __recognizer412712723.logProbe([
        359,
        13,
        359,
        21
    ], parseInt)(function () {
        var obj = __recognizer412712723.logProbe([
                359,
                22,
                359,
                26
            ], __recognizer412712723.logProbe([
                359,
                22,
                359,
                23
            ], $)(__recognizer412712723.logProbe([
                359,
                24,
                359,
                25
            ], o))), fn = __recognizer412712723.logProbe([
                359,
                27,
                359,
                31
            ], obj.attr);
        return fn.apply(obj, arguments);
    }.bind(this)('data-y')));
    tile.piece = function () {
        var obj = __recognizer412712723.logProbe([
                360,
                17,
                360,
                21
            ], __recognizer412712723.logProbe([
                360,
                17,
                360,
                18
            ], $)(__recognizer412712723.logProbe([
                360,
                19,
                360,
                20
            ], o))), fn = __recognizer412712723.logProbe([
                360,
                22,
                360,
                26
            ], obj.attr);
        return fn.apply(obj, arguments);
    }.bind(this)('data-piece');
    return __recognizer412712723.logProbe([
        361,
        11,
        361,
        15
    ], tile);
}
function PlaceAndSwitch(tile) {
    __recognizer412712723.logEntry([
        364,
        9,
        364,
        23
    ], arguments);
    var CurrentTile = {
            isExisting: true,
            parent: __recognizer412712723.logProbe([
                371,
                42,
                371,
                48
            ], function () {
                var obj = __recognizer412712723.logProbe([
                        371,
                        16,
                        371,
                        23
                    ], __recognizer412712723.logProbe([
                        371,
                        16,
                        371,
                        17
                    ], $)(__recognizer412712723.logProbe([
                        371,
                        18,
                        371,
                        22
                    ], tile))), fn = __recognizer412712723.logProbe([
                        371,
                        24,
                        371,
                        31
                    ], obj.parents);
                return fn.apply(obj, arguments);
            }.bind(this)('.board').length) != 0 ? 'board' : 'piece-box',
            tile: __recognizer412712723.logProbe([
                372,
                14,
                372,
                21
            ], __recognizer412712723.logProbe([
                372,
                14,
                372,
                15
            ], $)(__recognizer412712723.logProbe([
                372,
                16,
                372,
                20
            ], tile)))
        };
    var SelectedTile = {
            isExisting: __recognizer412712723.logProbe([
                376,
                46,
                376,
                52
            ], __recognizer412712723.logProbe([
                376,
                20,
                376,
                45
            ], __recognizer412712723.logProbe([
                376,
                20,
                376,
                21
            ], $)('.game-area .selected')).length) != 0,
            parent: __recognizer412712723.logProbe([
                377,
                60,
                377,
                66
            ], function () {
                var obj = __recognizer412712723.logProbe([
                        377,
                        16,
                        377,
                        41
                    ], __recognizer412712723.logProbe([
                        377,
                        16,
                        377,
                        17
                    ], $)('.game-area .selected')), fn = __recognizer412712723.logProbe([
                        377,
                        42,
                        377,
                        49
                    ], obj.parents);
                return fn.apply(obj, arguments);
            }.bind(this)('.board').length) != 0 ? 'board' : 'piece-box',
            tile: __recognizer412712723.logProbe([
                378,
                14,
                378,
                39
            ], __recognizer412712723.logProbe([
                378,
                14,
                378,
                15
            ], $)('.game-area .selected'))
        };
    if (!__recognizer412712723.logProbe([
            391,
            22,
            391,
            32
        ], __recognizer412712723.logProbe([
            391,
            9,
            391,
            21
        ], SelectedTile).isExisting) && function () {
            var obj = __recognizer412712723.logProbe([
                    391,
                    48,
                    391,
                    52
                ], __recognizer412712723.logProbe([
                    391,
                    36,
                    391,
                    47
                ], CurrentTile).tile), fn = __recognizer412712723.logProbe([
                    391,
                    53,
                    391,
                    61
                ], obj.hasClass);
            return fn.apply(obj, arguments);
        }.bind(this)('ui-draggable-disabled'))
        return;
    if (__recognizer412712723.logProbe([
            395,
            19,
            395,
            25
        ], __recognizer412712723.logProbe([
            395,
            7,
            395,
            18
        ], CurrentTile).parent) == 'piece-box' && __recognizer412712723.logProbe([
            395,
            57,
            395,
            63
        ], __recognizer412712723.logProbe([
            395,
            44,
            395,
            56
        ], SelectedTile).parent) == 'piece-box' || __recognizer412712723.logProbe([
            396,
            20,
            396,
            26
        ], __recognizer412712723.logProbe([
            396,
            7,
            396,
            19
        ], SelectedTile).parent) == 'board' && __recognizer412712723.logProbe([
            396,
            53,
            396,
            63
        ], __recognizer412712723.logProbe([
            396,
            41,
            396,
            52
        ], CurrentTile).isExisting) && __recognizer412712723.logProbe([
            396,
            79,
            396,
            85
        ], __recognizer412712723.logProbe([
            396,
            67,
            396,
            78
        ], CurrentTile).parent) == 'piece-box') {
        (function () {
            var obj = __recognizer412712723.logProbe([
                    398,
                    20,
                    398,
                    24
                ], __recognizer412712723.logProbe([
                    398,
                    8,
                    398,
                    19
                ], CurrentTile).tile), fn = __recognizer412712723.logProbe([
                    398,
                    25,
                    398,
                    33
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('selected'));
        (function () {
            var obj = __recognizer412712723.logProbe([
                    399,
                    21,
                    399,
                    25
                ], __recognizer412712723.logProbe([
                    399,
                    8,
                    399,
                    20
                ], SelectedTile).tile), fn = __recognizer412712723.logProbe([
                    399,
                    26,
                    399,
                    37
                ], obj.removeClass);
            return fn.apply(obj, arguments);
        }.bind(this)('selected'));
        if (function () {
                var obj = __recognizer412712723.logProbe([
                        401,
                        23,
                        401,
                        27
                    ], __recognizer412712723.logProbe([
                        401,
                        11,
                        401,
                        22
                    ], CurrentTile).tile), fn = __recognizer412712723.logProbe([
                        401,
                        28,
                        401,
                        36
                    ], obj.hasClass);
                return fn.apply(obj, arguments);
            }.bind(this)('selected'))
            (function () {
                var obj = __recognizer412712723.logProbe([
                        402,
                        12,
                        402,
                        54
                    ], __recognizer412712723.logProbe([
                        402,
                        12,
                        402,
                        13
                    ], $)('.board td:not(.ui-droppable-disabled)')), fn = __recognizer412712723.logProbe([
                        402,
                        55,
                        402,
                        63
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('droppable-active'));
        else
            (function () {
                var obj = __recognizer412712723.logProbe([
                        404,
                        12,
                        404,
                        54
                    ], __recognizer412712723.logProbe([
                        404,
                        12,
                        404,
                        13
                    ], $)('.board td:not(.ui-droppable-disabled)')), fn = __recognizer412712723.logProbe([
                        404,
                        55,
                        404,
                        66
                    ], obj.removeClass);
                return fn.apply(obj, arguments);
            }.bind(this)('droppable-active'));
        return;
    }
    if (__recognizer412712723.logProbe([
            416,
            33,
            416,
            39
        ], __recognizer412712723.logProbe([
            416,
            7,
            416,
            32
        ], __recognizer412712723.logProbe([
            416,
            7,
            416,
            8
        ], $)('.game-area .selected')).length) > 0 && !function () {
            var obj = __recognizer412712723.logProbe([
                    416,
                    48,
                    416,
                    55
                ], __recognizer412712723.logProbe([
                    416,
                    48,
                    416,
                    49
                ], $)(__recognizer412712723.logProbe([
                    416,
                    50,
                    416,
                    54
                ], tile))), fn = __recognizer412712723.logProbe([
                    416,
                    56,
                    416,
                    64
                ], obj.hasClass);
            return fn.apply(obj, arguments);
        }.bind(this)('selected') && !function () {
            var obj = __recognizer412712723.logProbe([
                    416,
                    81,
                    416,
                    88
                ], __recognizer412712723.logProbe([
                    416,
                    81,
                    416,
                    82
                ], $)(__recognizer412712723.logProbe([
                    416,
                    83,
                    416,
                    87
                ], tile))), fn = __recognizer412712723.logProbe([
                    416,
                    89,
                    416,
                    97
                ], obj.hasClass);
            return fn.apply(obj, arguments);
        }.bind(this)('ui-droppable-disabled')) {
        if (__recognizer412712723.logProbe([
                419,
                25,
                419,
                35
            ], __recognizer412712723.logProbe([
                419,
                12,
                419,
                24
            ], SelectedTile).isExisting) && __recognizer412712723.logProbe([
                419,
                52,
                419,
                58
            ], __recognizer412712723.logProbe([
                419,
                39,
                419,
                51
            ], SelectedTile).parent) == 'board') {
            $selected = __recognizer412712723.logProbe([
                421,
                24,
                421,
                49
            ], __recognizer412712723.logProbe([
                421,
                24,
                421,
                25
            ], $)('.game-area .selected'));
            if (!function () {
                    var obj = __recognizer412712723.logProbe([
                            422,
                            17,
                            422,
                            24
                        ], __recognizer412712723.logProbe([
                            422,
                            17,
                            422,
                            18
                        ], $)(__recognizer412712723.logProbe([
                            422,
                            19,
                            422,
                            23
                        ], tile))), fn = __recognizer412712723.logProbe([
                            422,
                            25,
                            422,
                            33
                        ], obj.hasClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('owned')) {
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            424,
                            16,
                            424,
                            23
                        ], __recognizer412712723.logProbe([
                            424,
                            16,
                            424,
                            17
                        ], $)(__recognizer412712723.logProbe([
                            424,
                            18,
                            424,
                            22
                        ], tile))), fn = __recognizer412712723.logProbe([
                            424,
                            24,
                            424,
                            32
                        ], obj.addClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('owned'));
                __recognizer412712723.logProbe([
                    425,
                    16,
                    425,
                    76
                ], __recognizer412712723.logProbe([
                    425,
                    16,
                    425,
                    31
                ], TransferAttribs)(__recognizer412712723.logProbe([
                    425,
                    32,
                    425,
                    41
                ], $selected), __recognizer412712723.logProbe([
                    425,
                    42,
                    425,
                    46
                ], tile), ['data-piece'], ['0'], true));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            427,
                            16,
                            427,
                            25
                        ], $selected), fn = __recognizer412712723.logProbe([
                            427,
                            26,
                            427,
                            35
                        ], obj.draggable);
                    return fn.apply(obj, arguments);
                }.bind(this)('disable'));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            428,
                            16,
                            428,
                            23
                        ], __recognizer412712723.logProbe([
                            428,
                            16,
                            428,
                            17
                        ], $)(__recognizer412712723.logProbe([
                            428,
                            18,
                            428,
                            22
                        ], tile))), fn = __recognizer412712723.logProbe([
                            428,
                            24,
                            428,
                            33
                        ], obj.draggable);
                    return fn.apply(obj, arguments);
                }.bind(this)('enable'));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            430,
                            16,
                            430,
                            25
                        ], $selected), fn = __recognizer412712723.logProbe([
                            430,
                            26,
                            430,
                            37
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('owned'));
            } else {
                __recognizer412712723.logProbe([
                    435,
                    16,
                    435,
                    67
                ], __recognizer412712723.logProbe([
                    435,
                    16,
                    435,
                    29
                ], SwitchAttribs)(__recognizer412712723.logProbe([
                    435,
                    30,
                    435,
                    34
                ], tile), __recognizer412712723.logProbe([
                    435,
                    36,
                    435,
                    45
                ], $selected), ['data-piece'], true));
            }
            (function () {
                var obj = __recognizer412712723.logProbe([
                        437,
                        12,
                        437,
                        43
                    ], __recognizer412712723.logProbe([
                        437,
                        12,
                        437,
                        13
                    ], $)('.board td.droppable-active')), fn = __recognizer412712723.logProbe([
                        437,
                        44,
                        437,
                        55
                    ], obj.removeClass);
                return fn.apply(obj, arguments);
            }.bind(this)('droppable-active'));
            (function () {
                var obj = __recognizer412712723.logProbe([
                        438,
                        12,
                        438,
                        21
                    ], $selected), fn = __recognizer412712723.logProbe([
                        438,
                        22,
                        438,
                        33
                    ], obj.removeClass);
                return fn.apply(obj, arguments);
            }.bind(this)('selected'));
        } else {
            if (__recognizer412712723.logProbe([
                    442,
                    27,
                    442,
                    33
                ], __recognizer412712723.logProbe([
                    442,
                    15,
                    442,
                    26
                ], CurrentTile).parent) == 'board' && function () {
                    var obj = __recognizer412712723.logProbe([
                            442,
                            60,
                            442,
                            64
                        ], __recognizer412712723.logProbe([
                            442,
                            48,
                            442,
                            59
                        ], CurrentTile).tile), fn = __recognizer412712723.logProbe([
                            442,
                            65,
                            442,
                            73
                        ], obj.hasClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('owned')) {
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            444,
                            28,
                            444,
                            32
                        ], __recognizer412712723.logProbe([
                            444,
                            16,
                            444,
                            27
                        ], CurrentTile).tile), fn = __recognizer412712723.logProbe([
                            444,
                            33,
                            444,
                            41
                        ], obj.addClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('selected'));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            445,
                            29,
                            445,
                            33
                        ], __recognizer412712723.logProbe([
                            445,
                            16,
                            445,
                            28
                        ], SelectedTile).tile), fn = __recognizer412712723.logProbe([
                            445,
                            34,
                            445,
                            45
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('selected'));
            } else {
                __recognizer412712723.logProbe([
                    449,
                    16,
                    449,
                    85
                ], __recognizer412712723.logProbe([
                    449,
                    16,
                    449,
                    27
                ], CopyAttribs)(__recognizer412712723.logProbe([
                    449,
                    41,
                    449,
                    45
                ], __recognizer412712723.logProbe([
                    449,
                    28,
                    449,
                    40
                ], SelectedTile).tile), __recognizer412712723.logProbe([
                    449,
                    58,
                    449,
                    62
                ], __recognizer412712723.logProbe([
                    449,
                    46,
                    449,
                    57
                ], CurrentTile).tile), ['data-piece'], true));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            450,
                            29,
                            450,
                            33
                        ], __recognizer412712723.logProbe([
                            450,
                            16,
                            450,
                            28
                        ], SelectedTile).tile), fn = __recognizer412712723.logProbe([
                            450,
                            34,
                            450,
                            43
                        ], obj.draggable);
                    return fn.apply(obj, arguments);
                }.bind(this)('disable'));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            452,
                            16,
                            452,
                            35
                        ], __recognizer412712723.logProbe([
                            452,
                            16,
                            452,
                            17
                        ], $)(__recognizer412712723.logProbe([
                            452,
                            30,
                            452,
                            34
                        ], __recognizer412712723.logProbe([
                            452,
                            18,
                            452,
                            29
                        ], CurrentTile).tile))), fn = __recognizer412712723.logProbe([
                            452,
                            36,
                            452,
                            44
                        ], obj.addClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('owned'));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            453,
                            16,
                            453,
                            38
                        ], __recognizer412712723.logProbe([
                            453,
                            16,
                            453,
                            17
                        ], $)('.droppable-active')), fn = __recognizer412712723.logProbe([
                            453,
                            39,
                            453,
                            50
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('droppable-active'));
                (function () {
                    var obj = __recognizer412712723.logProbe([
                            454,
                            29,
                            454,
                            33
                        ], __recognizer412712723.logProbe([
                            454,
                            16,
                            454,
                            28
                        ], SelectedTile).tile), fn = __recognizer412712723.logProbe([
                            454,
                            34,
                            454,
                            38
                        ], obj.attr);
                    return fn.apply(obj, arguments);
                }.bind(this)('data-count', __recognizer412712723.logProbe([
                    454,
                    53,
                    454,
                    99
                ], __recognizer412712723.logProbe([
                    454,
                    53,
                    454,
                    61
                ], parseInt)(function () {
                    var obj = __recognizer412712723.logProbe([
                            454,
                            75,
                            454,
                            79
                        ], __recognizer412712723.logProbe([
                            454,
                            62,
                            454,
                            74
                        ], SelectedTile).tile), fn = __recognizer412712723.logProbe([
                            454,
                            80,
                            454,
                            84
                        ], obj.attr);
                    return fn.apply(obj, arguments);
                }.bind(this)('data-count'))) - 1));
                if (function () {
                        var obj = __recognizer412712723.logProbe([
                                456,
                                32,
                                456,
                                36
                            ], __recognizer412712723.logProbe([
                                456,
                                19,
                                456,
                                31
                            ], SelectedTile).tile), fn = __recognizer412712723.logProbe([
                                456,
                                37,
                                456,
                                41
                            ], obj.attr);
                        return fn.apply(obj, arguments);
                    }.bind(this)('data-count') == 0)
                    (function () {
                        var obj = __recognizer412712723.logProbe([
                                457,
                                20,
                                457,
                                40
                            ], __recognizer412712723.logProbe([
                                457,
                                20,
                                457,
                                21
                            ], $)(__recognizer412712723.logProbe([
                                457,
                                35,
                                457,
                                39
                            ], __recognizer412712723.logProbe([
                                457,
                                22,
                                457,
                                34
                            ], SelectedTile).tile))), fn = __recognizer412712723.logProbe([
                                457,
                                41,
                                457,
                                52
                            ], obj.removeClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('selected'));
            }
        }
        __recognizer412712723.logProbe([
            461,
            8,
            461,
            25
        ], __recognizer412712723.logProbe([
            461,
            8,
            461,
            23
        ], RefreshPieceBox)());
        return;
    }
    if (function () {
            var obj = __recognizer412712723.logProbe([
                    468,
                    7,
                    468,
                    14
                ], __recognizer412712723.logProbe([
                    468,
                    7,
                    468,
                    8
                ], $)(__recognizer412712723.logProbe([
                    468,
                    9,
                    468,
                    13
                ], tile))), fn = __recognizer412712723.logProbe([
                    468,
                    15,
                    468,
                    23
                ], obj.hasClass);
            return fn.apply(obj, arguments);
        }.bind(this)('owned')) {
        if (function () {
                var obj = __recognizer412712723.logProbe([
                        473,
                        11,
                        473,
                        18
                    ], __recognizer412712723.logProbe([
                        473,
                        11,
                        473,
                        12
                    ], $)(__recognizer412712723.logProbe([
                        473,
                        13,
                        473,
                        17
                    ], tile))), fn = __recognizer412712723.logProbe([
                        473,
                        19,
                        473,
                        27
                    ], obj.hasClass);
                return fn.apply(obj, arguments);
            }.bind(this)('selected')) {
            (function () {
                var obj = __recognizer412712723.logProbe([
                        475,
                        12,
                        475,
                        43
                    ], __recognizer412712723.logProbe([
                        475,
                        12,
                        475,
                        13
                    ], $)('.board td.droppable-active')), fn = __recognizer412712723.logProbe([
                        475,
                        44,
                        475,
                        55
                    ], obj.removeClass);
                return fn.apply(obj, arguments);
            }.bind(this)('droppable-active'));
            (function () {
                var obj = __recognizer412712723.logProbe([
                        476,
                        12,
                        476,
                        19
                    ], __recognizer412712723.logProbe([
                        476,
                        12,
                        476,
                        13
                    ], $)(__recognizer412712723.logProbe([
                        476,
                        14,
                        476,
                        18
                    ], tile))), fn = __recognizer412712723.logProbe([
                        476,
                        20,
                        476,
                        31
                    ], obj.removeClass);
                return fn.apply(obj, arguments);
            }.bind(this)('selected'));
        } else {
            (function () {
                var obj = __recognizer412712723.logProbe([
                        482,
                        12,
                        482,
                        54
                    ], __recognizer412712723.logProbe([
                        482,
                        12,
                        482,
                        13
                    ], $)('.board td:not(.ui-droppable-disabled)')), fn = __recognizer412712723.logProbe([
                        482,
                        55,
                        482,
                        63
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('droppable-active'));
            (function () {
                var obj = __recognizer412712723.logProbe([
                        483,
                        12,
                        483,
                        19
                    ], __recognizer412712723.logProbe([
                        483,
                        12,
                        483,
                        13
                    ], $)(__recognizer412712723.logProbe([
                        483,
                        14,
                        483,
                        18
                    ], tile))), fn = __recognizer412712723.logProbe([
                        483,
                        20,
                        483,
                        28
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('selected'));
        }
    }
}
function MoveSelectedPieceTo(tile) {
    __recognizer412712723.logEntry([
        489,
        9,
        489,
        28
    ], arguments);
    $selected = function () {
        var obj = __recognizer412712723.logProbe([
                491,
                16,
                491,
                39
            ], __recognizer412712723.logProbe([
                491,
                16,
                491,
                17
            ], $)('.board td.selected')), fn = __recognizer412712723.logProbe([
                491,
                40,
                491,
                51
            ], obj.removeClass);
        return fn.apply(obj, arguments);
    }.bind(this)('selected');
    __recognizer412712723.logProbe([
        493,
        4,
        493,
        30
    ], __recognizer412712723.logProbe([
        493,
        4,
        493,
        13
    ], MovePiece)(__recognizer412712723.logProbe([
        493,
        14,
        493,
        23
    ], $selected), __recognizer412712723.logProbe([
        493,
        25,
        493,
        29
    ], tile)));
    (function () {
        var obj = __recognizer412712723.logProbe([
                496,
                4,
                496,
                11
            ], __recognizer412712723.logProbe([
                496,
                4,
                496,
                5
            ], $)(__recognizer412712723.logProbe([
                496,
                6,
                496,
                10
            ], tile))), fn = __recognizer412712723.logProbe([
                496,
                12,
                496,
                20
            ], obj.addClass);
        return fn.apply(obj, arguments);
    }.bind(this)('owned'));
    (function () {
        var obj = __recognizer412712723.logProbe([
                497,
                4,
                497,
                11
            ], __recognizer412712723.logProbe([
                497,
                4,
                497,
                5
            ], $)(__recognizer412712723.logProbe([
                497,
                6,
                497,
                10
            ], tile))), fn = __recognizer412712723.logProbe([
                497,
                12,
                497,
                16
            ], obj.attr);
        return fn.apply(obj, arguments);
    }.bind(this)('data-piece', function () {
        var obj = __recognizer412712723.logProbe([
                497,
                31,
                497,
                40
            ], $selected), fn = __recognizer412712723.logProbe([
                497,
                41,
                497,
                45
            ], obj.attr);
        return fn.apply(obj, arguments);
    }.bind(this)('data-piece')));
    (function () {
        var obj = __recognizer412712723.logProbe([
                498,
                4,
                498,
                11
            ], __recognizer412712723.logProbe([
                498,
                4,
                498,
                5
            ], $)(__recognizer412712723.logProbe([
                498,
                6,
                498,
                10
            ], tile))), fn = __recognizer412712723.logProbe([
                498,
                12,
                498,
                16
            ], obj.html);
        return fn.apply(obj, arguments);
    }.bind(this)(function () {
        var obj = __recognizer412712723.logProbe([
                498,
                17,
                498,
                26
            ], $selected), fn = __recognizer412712723.logProbe([
                498,
                27,
                498,
                31
            ], obj.html);
        return fn.apply(obj, arguments);
    }.bind(this)()));
    (function () {
        var obj = function () {
                var obj = function () {
                        var obj = __recognizer412712723.logProbe([
                                501,
                                4,
                                501,
                                13
                            ], $selected), fn = __recognizer412712723.logProbe([
                                501,
                                14,
                                501,
                                25
                            ], obj.removeClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('owned'), fn = __recognizer412712723.logProbe([
                        501,
                        35,
                        501,
                        39
                    ], obj.attr);
                return fn.apply(obj, arguments);
            }.bind(this)('data-piece', '0'), fn = __recognizer412712723.logProbe([
                501,
                58,
                501,
                62
            ], obj.html);
        return fn.apply(obj, arguments);
    }.bind(this)(''));
    __recognizer412712723.logProbe([
        505,
        4,
        505,
        25
    ], __recognizer412712723.logProbe([
        505,
        4,
        505,
        23
    ], ResetSelectedPieces)());
}
function TransferAttribs(from, to, attr, defaultValue, withHtml) {
    __recognizer412712723.logEntry([
        508,
        9,
        508,
        24
    ], arguments);
    withHtml = __recognizer412712723.logProbe([
        510,
        15,
        510,
        23
    ], withHtml) || false;
    (function () {
        var obj = __recognizer412712723.logProbe([
                512,
                4,
                512,
                8
            ], attr), fn = __recognizer412712723.logProbe([
                512,
                9,
                512,
                16
            ], obj.forEach);
        return fn.apply(obj, arguments);
    }.bind(this)(function (e, i) {
        __recognizer412712723.logEntry([
            512,
            17,
            512,
            25
        ], arguments);
        (function () {
            var obj = __recognizer412712723.logProbe([
                    513,
                    8,
                    513,
                    13
                ], __recognizer412712723.logProbe([
                    513,
                    8,
                    513,
                    9
                ], $)(__recognizer412712723.logProbe([
                    513,
                    10,
                    513,
                    12
                ], to))), fn = __recognizer412712723.logProbe([
                    513,
                    14,
                    513,
                    18
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            513,
            19,
            513,
            20
        ], e), function () {
            var obj = __recognizer412712723.logProbe([
                    513,
                    21,
                    513,
                    28
                ], __recognizer412712723.logProbe([
                    513,
                    21,
                    513,
                    22
                ], $)(__recognizer412712723.logProbe([
                    513,
                    23,
                    513,
                    27
                ], from))), fn = __recognizer412712723.logProbe([
                    513,
                    29,
                    513,
                    33
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            513,
            34,
            513,
            35
        ], e))));
        (function () {
            var obj = __recognizer412712723.logProbe([
                    514,
                    8,
                    514,
                    15
                ], __recognizer412712723.logProbe([
                    514,
                    8,
                    514,
                    9
                ], $)(__recognizer412712723.logProbe([
                    514,
                    10,
                    514,
                    14
                ], from))), fn = __recognizer412712723.logProbe([
                    514,
                    16,
                    514,
                    20
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            514,
            21,
            514,
            22
        ], e), __recognizer412712723.logProbe([
            514,
            36,
            514,
            37
        ], __recognizer412712723.logProbe([
            514,
            23,
            514,
            35
        ], defaultValue)[i])));
    }));
    if (__recognizer412712723.logProbe([
            517,
            7,
            517,
            15
        ], withHtml)) {
        (function () {
            var obj = __recognizer412712723.logProbe([
                    519,
                    8,
                    519,
                    13
                ], __recognizer412712723.logProbe([
                    519,
                    8,
                    519,
                    9
                ], $)(__recognizer412712723.logProbe([
                    519,
                    10,
                    519,
                    12
                ], to))), fn = __recognizer412712723.logProbe([
                    519,
                    14,
                    519,
                    18
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)(function () {
            var obj = __recognizer412712723.logProbe([
                    519,
                    19,
                    519,
                    26
                ], __recognizer412712723.logProbe([
                    519,
                    19,
                    519,
                    20
                ], $)(__recognizer412712723.logProbe([
                    519,
                    21,
                    519,
                    25
                ], from))), fn = __recognizer412712723.logProbe([
                    519,
                    27,
                    519,
                    31
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)()));
        (function () {
            var obj = __recognizer412712723.logProbe([
                    520,
                    8,
                    520,
                    15
                ], __recognizer412712723.logProbe([
                    520,
                    8,
                    520,
                    9
                ], $)(__recognizer412712723.logProbe([
                    520,
                    10,
                    520,
                    14
                ], from))), fn = __recognizer412712723.logProbe([
                    520,
                    16,
                    520,
                    20
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)('&nbsp;'));
    }
}
function CopyAttribs(from, to, attr, withHtml) {
    __recognizer412712723.logEntry([
        525,
        9,
        525,
        20
    ], arguments);
    withHtml = __recognizer412712723.logProbe([
        527,
        15,
        527,
        23
    ], withHtml) || false;
    (function () {
        var obj = __recognizer412712723.logProbe([
                529,
                4,
                529,
                8
            ], attr), fn = __recognizer412712723.logProbe([
                529,
                9,
                529,
                16
            ], obj.forEach);
        return fn.apply(obj, arguments);
    }.bind(this)(function (e, i) {
        __recognizer412712723.logEntry([
            529,
            17,
            529,
            25
        ], arguments);
        (function () {
            var obj = __recognizer412712723.logProbe([
                    530,
                    8,
                    530,
                    13
                ], __recognizer412712723.logProbe([
                    530,
                    8,
                    530,
                    9
                ], $)(__recognizer412712723.logProbe([
                    530,
                    10,
                    530,
                    12
                ], to))), fn = __recognizer412712723.logProbe([
                    530,
                    14,
                    530,
                    18
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            530,
            19,
            530,
            20
        ], e), function () {
            var obj = __recognizer412712723.logProbe([
                    530,
                    21,
                    530,
                    28
                ], __recognizer412712723.logProbe([
                    530,
                    21,
                    530,
                    22
                ], $)(__recognizer412712723.logProbe([
                    530,
                    23,
                    530,
                    27
                ], from))), fn = __recognizer412712723.logProbe([
                    530,
                    29,
                    530,
                    33
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            530,
            34,
            530,
            35
        ], e))));
    }));
    if (__recognizer412712723.logProbe([
            533,
            7,
            533,
            15
        ], withHtml))
        (function () {
            var obj = __recognizer412712723.logProbe([
                    534,
                    8,
                    534,
                    13
                ], __recognizer412712723.logProbe([
                    534,
                    8,
                    534,
                    9
                ], $)(__recognizer412712723.logProbe([
                    534,
                    10,
                    534,
                    12
                ], to))), fn = __recognizer412712723.logProbe([
                    534,
                    14,
                    534,
                    18
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)(function () {
            var obj = __recognizer412712723.logProbe([
                    534,
                    19,
                    534,
                    26
                ], __recognizer412712723.logProbe([
                    534,
                    19,
                    534,
                    20
                ], $)(__recognizer412712723.logProbe([
                    534,
                    21,
                    534,
                    25
                ], from))), fn = __recognizer412712723.logProbe([
                    534,
                    27,
                    534,
                    31
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)()));
}
function SwitchAttribs(e1, e2, attr, withHtml) {
    __recognizer412712723.logEntry([
        537,
        9,
        537,
        22
    ], arguments);
    withHtml = __recognizer412712723.logProbe([
        539,
        15,
        539,
        23
    ], withHtml) || false;
    (function () {
        var obj = __recognizer412712723.logProbe([
                540,
                4,
                540,
                8
            ], attr), fn = __recognizer412712723.logProbe([
                540,
                9,
                540,
                16
            ], obj.forEach);
        return fn.apply(obj, arguments);
    }.bind(this)(function (e, i) {
        __recognizer412712723.logEntry([
            540,
            17,
            540,
            25
        ], arguments);
        var tmp = function () {
                var obj = __recognizer412712723.logProbe([
                        542,
                        18,
                        542,
                        23
                    ], __recognizer412712723.logProbe([
                        542,
                        18,
                        542,
                        19
                    ], $)(__recognizer412712723.logProbe([
                        542,
                        20,
                        542,
                        22
                    ], e1))), fn = __recognizer412712723.logProbe([
                        542,
                        24,
                        542,
                        28
                    ], obj.attr);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer412712723.logProbe([
                542,
                29,
                542,
                30
            ], e));
        (function () {
            var obj = __recognizer412712723.logProbe([
                    543,
                    8,
                    543,
                    13
                ], __recognizer412712723.logProbe([
                    543,
                    8,
                    543,
                    9
                ], $)(__recognizer412712723.logProbe([
                    543,
                    10,
                    543,
                    12
                ], e1))), fn = __recognizer412712723.logProbe([
                    543,
                    14,
                    543,
                    18
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            543,
            19,
            543,
            20
        ], e), function () {
            var obj = __recognizer412712723.logProbe([
                    543,
                    21,
                    543,
                    26
                ], __recognizer412712723.logProbe([
                    543,
                    21,
                    543,
                    22
                ], $)(__recognizer412712723.logProbe([
                    543,
                    23,
                    543,
                    25
                ], e2))), fn = __recognizer412712723.logProbe([
                    543,
                    27,
                    543,
                    31
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            543,
            32,
            543,
            33
        ], e))));
        (function () {
            var obj = __recognizer412712723.logProbe([
                    544,
                    8,
                    544,
                    13
                ], __recognizer412712723.logProbe([
                    544,
                    8,
                    544,
                    9
                ], $)(__recognizer412712723.logProbe([
                    544,
                    10,
                    544,
                    12
                ], e2))), fn = __recognizer412712723.logProbe([
                    544,
                    14,
                    544,
                    18
                ], obj.attr);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            544,
            19,
            544,
            20
        ], e), __recognizer412712723.logProbe([
            544,
            21,
            544,
            24
        ], tmp)));
    }));
    if (__recognizer412712723.logProbe([
            547,
            7,
            547,
            15
        ], withHtml)) {
        var tmp = function () {
                var obj = __recognizer412712723.logProbe([
                        549,
                        18,
                        549,
                        23
                    ], __recognizer412712723.logProbe([
                        549,
                        18,
                        549,
                        19
                    ], $)(__recognizer412712723.logProbe([
                        549,
                        20,
                        549,
                        22
                    ], e1))), fn = __recognizer412712723.logProbe([
                        549,
                        24,
                        549,
                        28
                    ], obj.html);
                return fn.apply(obj, arguments);
            }.bind(this)();
        (function () {
            var obj = __recognizer412712723.logProbe([
                    551,
                    8,
                    551,
                    13
                ], __recognizer412712723.logProbe([
                    551,
                    8,
                    551,
                    9
                ], $)(__recognizer412712723.logProbe([
                    551,
                    10,
                    551,
                    12
                ], e1))), fn = __recognizer412712723.logProbe([
                    551,
                    14,
                    551,
                    18
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)(function () {
            var obj = __recognizer412712723.logProbe([
                    551,
                    19,
                    551,
                    24
                ], __recognizer412712723.logProbe([
                    551,
                    19,
                    551,
                    20
                ], $)(__recognizer412712723.logProbe([
                    551,
                    21,
                    551,
                    23
                ], e2))), fn = __recognizer412712723.logProbe([
                    551,
                    25,
                    551,
                    29
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)()));
        (function () {
            var obj = __recognizer412712723.logProbe([
                    552,
                    8,
                    552,
                    13
                ], __recognizer412712723.logProbe([
                    552,
                    8,
                    552,
                    9
                ], $)(__recognizer412712723.logProbe([
                    552,
                    10,
                    552,
                    12
                ], e2))), fn = __recognizer412712723.logProbe([
                    552,
                    14,
                    552,
                    18
                ], obj.html);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer412712723.logProbe([
            552,
            19,
            552,
            22
        ], tmp)));
    }
}
function ResetSelectedPieces() {
    __recognizer412712723.logEntry([
        556,
        9,
        556,
        28
    ], arguments);
    (function () {
        var obj = __recognizer412712723.logProbe([
                558,
                4,
                558,
                18
            ], __recognizer412712723.logProbe([
                558,
                4,
                558,
                5
            ], $)('.board td')), fn = __recognizer412712723.logProbe([
                558,
                19,
                558,
                30
            ], obj.removeClass);
        return fn.apply(obj, arguments);
    }.bind(this)('active'));
    (function () {
        var obj = __recognizer412712723.logProbe([
                559,
                4,
                559,
                18
            ], __recognizer412712723.logProbe([
                559,
                4,
                559,
                5
            ], $)('.board td')), fn = __recognizer412712723.logProbe([
                559,
                19,
                559,
                30
            ], obj.removeClass);
        return fn.apply(obj, arguments);
    }.bind(this)('selected'));
    if (__recognizer412712723.logProbe([
            561,
            63,
            561,
            69
        ], __recognizer412712723.logProbe([
            561,
            7,
            561,
            62
        ], __recognizer412712723.logProbe([
            561,
            7,
            561,
            8
        ], $)('.board td.ui-droppable:not(.ui-droppable-disabled)')).length) != 0)
        (function () {
            var obj = __recognizer412712723.logProbe([
                    562,
                    8,
                    562,
                    63
                ], __recognizer412712723.logProbe([
                    562,
                    8,
                    562,
                    9
                ], $)('.board td.ui-droppable:not(.ui-droppable-disabled)')), fn = __recognizer412712723.logProbe([
                    562,
                    64,
                    562,
                    73
                ], obj.droppable);
            return fn.apply(obj, arguments);
        }.bind(this)('disable'));
}
function GetValidMoves(tile) {
    __recognizer412712723.logEntry([
        565,
        9,
        565,
        22
    ], arguments);
    if (function () {
            var obj = __recognizer412712723.logProbe([
                    567,
                    7,
                    567,
                    63
                ], __recognizer412712723.logProbe([
                    567,
                    7,
                    567,
                    8
                ], $)('.board td[data-x=\'' + __recognizer412712723.logProbe([
                    567,
                    35,
                    567,
                    36
                ], __recognizer412712723.logProbe([
                    567,
                    30,
                    567,
                    34
                ], tile).x) + '\'][data-y=\'' + __recognizer412712723.logProbe([
                    567,
                    56,
                    567,
                    57
                ], __recognizer412712723.logProbe([
                    567,
                    51,
                    567,
                    55
                ], tile).y) + '\']')), fn = __recognizer412712723.logProbe([
                    567,
                    64,
                    567,
                    72
                ], obj.hasClass);
            return fn.apply(obj, arguments);
        }.bind(this)('selected')) {
        __recognizer412712723.logProbe([
            569,
            8,
            569,
            29
        ], __recognizer412712723.logProbe([
            569,
            8,
            569,
            27
        ], ResetSelectedPieces)());
        return;
    }
    var validTiles = [
            {
                x: __recognizer412712723.logProbe([
                    574,
                    16,
                    574,
                    17
                ], __recognizer412712723.logProbe([
                    574,
                    11,
                    574,
                    15
                ], tile).x),
                y: __recognizer412712723.logProbe([
                    574,
                    31,
                    574,
                    32
                ], __recognizer412712723.logProbe([
                    574,
                    26,
                    574,
                    30
                ], tile).y) - 1
            },
            {
                x: __recognizer412712723.logProbe([
                    575,
                    16,
                    575,
                    17
                ], __recognizer412712723.logProbe([
                    575,
                    11,
                    575,
                    15
                ], tile).x) + 1,
                y: __recognizer412712723.logProbe([
                    575,
                    31,
                    575,
                    32
                ], __recognizer412712723.logProbe([
                    575,
                    26,
                    575,
                    30
                ], tile).y)
            },
            {
                x: __recognizer412712723.logProbe([
                    576,
                    16,
                    576,
                    17
                ], __recognizer412712723.logProbe([
                    576,
                    11,
                    576,
                    15
                ], tile).x),
                y: __recognizer412712723.logProbe([
                    576,
                    31,
                    576,
                    32
                ], __recognizer412712723.logProbe([
                    576,
                    26,
                    576,
                    30
                ], tile).y) + 1
            },
            {
                x: __recognizer412712723.logProbe([
                    577,
                    16,
                    577,
                    17
                ], __recognizer412712723.logProbe([
                    577,
                    11,
                    577,
                    15
                ], tile).x) - 1,
                y: __recognizer412712723.logProbe([
                    577,
                    31,
                    577,
                    32
                ], __recognizer412712723.logProbe([
                    577,
                    26,
                    577,
                    30
                ], tile).y)
            }
        ];
    __recognizer412712723.logProbe([
        581,
        4,
        581,
        25
    ], __recognizer412712723.logProbe([
        581,
        4,
        581,
        23
    ], ResetSelectedPieces)());
    (function () {
        var obj = __recognizer412712723.logProbe([
                584,
                4,
                584,
                66
            ], __recognizer412712723.logProbe([
                584,
                4,
                584,
                5
            ], $)('.board td.owned[data-x=\'' + __recognizer412712723.logProbe([
                584,
                38,
                584,
                39
            ], __recognizer412712723.logProbe([
                584,
                33,
                584,
                37
            ], tile).x) + '\'][data-y=\'' + __recognizer412712723.logProbe([
                584,
                59,
                584,
                60
            ], __recognizer412712723.logProbe([
                584,
                54,
                584,
                58
            ], tile).y) + '\']')), fn = __recognizer412712723.logProbe([
                584,
                67,
                584,
                75
            ], obj.addClass);
        return fn.apply(obj, arguments);
    }.bind(this)('selected'));
    (function () {
        var obj = __recognizer412712723.logProbe([
                586,
                4,
                586,
                14
            ], validTiles), fn = __recognizer412712723.logProbe([
                586,
                15,
                586,
                22
            ], obj.forEach);
        return fn.apply(obj, arguments);
    }.bind(this)(function (e, i) {
        __recognizer412712723.logEntry([
            586,
            23,
            586,
            31
        ], arguments);
        (function () {
            var obj = function () {
                    var obj = __recognizer412712723.logProbe([
                            590,
                            12,
                            590,
                            74
                        ], __recognizer412712723.logProbe([
                            590,
                            12,
                            590,
                            13
                        ], $)('.board td[data-x=\'' + __recognizer412712723.logProbe([
                            590,
                            37,
                            590,
                            38
                        ], __recognizer412712723.logProbe([
                            590,
                            35,
                            590,
                            36
                        ], e).x) + '\'][data-y=\'' + __recognizer412712723.logProbe([
                            590,
                            55,
                            590,
                            56
                        ], __recognizer412712723.logProbe([
                            590,
                            53,
                            590,
                            54
                        ], e).y) + '\']:not(.owned)')), fn = __recognizer412712723.logProbe([
                            590,
                            75,
                            590,
                            83
                        ], obj.addClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('active'), fn = __recognizer412712723.logProbe([
                    590,
                    94,
                    590,
                    103
                ], obj.droppable);
            return fn.apply(obj, arguments);
        }.bind(this)('enable'));
    }));
}