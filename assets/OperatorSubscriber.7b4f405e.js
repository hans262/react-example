import{i as l,b as h}from"./Observable.e24fb2bb.js";import{a as f}from"./tslib.es6.9a4241f2.js";function p(r){return l(r==null?void 0:r.lift)}function m(r){return function(i){if(p(i))return i.lift(function(t){try{return r(t,this)}catch(n){this.error(n)}});throw new TypeError("Unable to lift unknown Observable type")}}function _(r,i,t,n,c){return new y(r,i,t,n,c)}var y=function(r){f(i,r);function i(t,n,c,u,a,b){var e=r.call(this,t)||this;return e.onFinalize=a,e.shouldUnsubscribe=b,e._next=n?function(o){try{n(o)}catch(s){t.error(s)}}:r.prototype._next,e._error=u?function(o){try{u(o)}catch(s){t.error(s)}finally{this.unsubscribe()}}:r.prototype._error,e._complete=c?function(){try{c()}catch(o){t.error(o)}finally{this.unsubscribe()}}:r.prototype._complete,e}return i.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;r.prototype.unsubscribe.call(this),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this))}},i}(h);export{_ as c,m as o};