(function(e){function t(t){for(var n,a,r=t[0],c=t[1],l=t[2],u=0,m=[];u<r.length;u++)a=r[u],i[a]&&m.push(i[a][0]),i[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);d&&d(t);while(m.length)m.shift()();return o.push.apply(o,l||[]),s()}function s(){for(var e,t=0;t<o.length;t++){for(var s=o[t],n=!0,a=1;a<s.length;a++){var r=s[a];0!==i[r]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=s[0]))}return e}var n={},a={app:0},i={app:0},o=[];function r(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"eecd7ca3"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.e=function(e){var t=[],s={about:1};a[e]?t.push(a[e]):0!==a[e]&&s[e]&&t.push(a[e]=new Promise(function(t,s){for(var n="css/"+({about:"about"}[e]||e)+"."+{about:"4269b1d2"}[e]+".css",i=c.p+n,o=document.getElementsByTagName("link"),r=0;r<o.length;r++){var l=o[r],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===i))return t()}var m=document.getElementsByTagName("style");for(r=0;r<m.length;r++){l=m[r],u=l.getAttribute("data-href");if(u===n||u===i)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var n=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete a[e],d.parentNode.removeChild(d),s(o)},d.href=i;var g=document.getElementsByTagName("head")[0];g.appendChild(d)}).then(function(){a[e]=0}));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(function(t,s){n=i[e]=[t,s]});t.push(n[2]=o);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=r(e),l=function(t){u.onerror=u.onload=null,clearTimeout(m);var s=i[e];if(0!==s){if(s){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+n+": "+a+")");o.type=n,o.request=a,s[1](o)}i[e]=void 0}};var m=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,s){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(s,n,function(t){return e[t]}.bind(null,n));return s},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var m=0;m<l.length;m++)t(l[m]);var d=u;o.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("cd49")},"034f":function(e,t,s){"use strict";var n=s("64a9"),a=s.n(n);a.a},1:function(e,t){},1559:function(e,t,s){},"2bc5":function(e,t,s){"use strict";var n=s("1559"),a=s.n(n);a.a},4659:function(e,t,s){},"4c69":function(e,t,s){},"52e8":function(e,t,s){},"64a9":function(e,t,s){},"7d05":function(e,t,s){},"7df4":function(e,t,s){"use strict";var n=s("4c69"),a=s.n(n);a.a},"957a":function(e,t,s){},a0e5:function(e,t,s){"use strict";var n=s("52e8"),a=s.n(n);a.a},bc34:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("a",{staticClass:"nav button is-primary is-outlined",attrs:{id:"chat"},on:{click:e.showChat}},[e._v("Chat")])]),s("div",{staticClass:"modal modal-mask modal-container",class:{hidden:!e.chatToggle},attrs:{id:"chatWindow"}},[s("div",{staticClass:"modal-card"},[s("section",{staticClass:"modal-card-body"},[s("div",{staticClass:"msgContainer"},[s("div",{attrs:{id:"messages"}},e._l(e.messages,function(t){return s("span",[s("label",{staticClass:"msg"},[e._v(e._s(t.message))]),s("label",{staticClass:"otherMsg"},[e._v(e._s(t.user)+":")])])}),0)])]),s("footer",{staticClass:"modal-card-foot"},[s("form",{on:{submit:function(t){return t.preventDefault(),e.sendMessage(t)}}},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticClass:"textarea has-fixed-size",attrs:{id:"msgText",rows:"3",placeholder:"Enter chat message"},domProps:{value:e.message},on:{input:function(t){t.target.composing||(e.message=t.target.value)}}}),s("button",{staticClass:"button is-primary is-outlined",attrs:{type:"submit"}},[e._v(">")]),s("button",{staticClass:"button is-danger  is-outlined",on:{click:e.showChat}},[e._v("X")])])])])])])},a=[],i=s("d225"),o=s("b0b4"),r=s("308d"),c=s("6bb5"),l=s("4e2b"),u=s("9ab4"),m=s("60a3"),d=s("8055"),g=s.n(d),f=s("4bb5"),v=s("f87c"),h=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(r["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.user="",e.message="",e.PORT=Object({NODE_ENV:"production",BASE_URL:"/"}).PORT||"3001",e.socket=g()(),e.messages=[],e.chatToggle=!1,e.room="",e}return Object(l["a"])(t,e),Object(o["a"])(t,[{key:"onMsg",value:function(e){this.messages.unshift(e)}},{key:"sendMessage",value:function(e){e.preventDefault(),this.socket.emit("sendmsg",{user:this.getLogin.isLoggedin?this.getLogin.username:"Anon",message:this.message,room:this.$router.currentRoute.params.id}),this.message=""}},{key:"showChat",value:function(){this.chatToggle=!this.chatToggle}},{key:"closeChat",value:function(){this.chatToggle=!1}}]),t}(m["b"]);u["a"]([Object(f["b"])("getLogin")],h.prototype,"getLogin",void 0),u["a"]([Object(v["a"])("msg")],h.prototype,"onMsg",null),h=u["a"]([m["a"]],h);var b=h,p=b,C=(s("2bc5"),s("2877")),_=Object(C["a"])(p,n,a,!1,null,"6b70b96d",null);t["a"]=_.exports},c4f9:function(e,t,s){"use strict";var n=s("4659"),a=s.n(n);a.a},cccb:function(e,t,s){"use strict";var n=s("d563"),a=s.n(n);a.a},cd49:function(e,t,s){"use strict";s.r(t);s("cadf"),s("551c"),s("f751"),s("097d");var n=s("2b0e"),a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("Header"),s("router-view")],1)},i=[],o=s("d225"),r=s("b0b4"),c=s("308d"),l=s("6bb5"),u=s("4e2b"),m=s("9ab4"),d=s("60a3"),g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"navbar-brand"},[s("div",{staticClass:"nav",class:{change:e.menuToggle},on:{click:e.showMenu}},[s("div",{staticClass:"bar1"}),s("div",{staticClass:"bar2"}),s("div",{staticClass:"bar3"})]),s("div",{staticClass:"navbar-end",class:{hidden:e.$route.path!=="/game/"+this.$route.params.id},attrs:{id:"chat"}},[s("Chat2")],1)]),s("div",{staticClass:"modal modal-mask modal-container",class:{hidden:!e.menuToggle}},[s("div",{staticClass:"modal-card"},[s("header",{staticClass:"modal-card-head"},[s("router-link",{attrs:{to:"/"}},[s("h1",{staticClass:"modal-card-title",on:{click:e.closeAllMenus}},[e._v("Hive")])])],1),s("section",{staticClass:"modal-card-body"},[s("aside",{staticClass:"menu"},[s("p",{staticClass:"menu-label"},[e._v("General")]),s("ul",{staticClass:"menu-list"},[e._m(0),s("li",{on:{click:e.closeAllMenus}},[s("router-link",{attrs:{to:"/login"}},[e._v("Login")])],1)]),s("p",{staticClass:"menu-label"},[e._v("Game")]),s("ul",{staticClass:"menu-list"},[e._m(1),s("li",[s("a",{on:{click:e.newGameMenu}},[e._v("New Game")])]),s("li",[s("a",{on:{click:e.joinMenu}},[e._v("Join Game")])]),e._m(2)])])]),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-danger  is-outlined menuButton",on:{click:e.showMenu}},[e._v("X")])])])]),s("div",{staticClass:"modal modal-mask modal-container",class:{hidden:!e.newGameToggle}},[s("div",{staticClass:"modal-card"},[e._m(3),s("section",{staticClass:"modal-card-body"},[s("aside",{staticClass:"menu"},[s("ul",{staticClass:"menu-list"},[s("li",{on:{click:e.closeAllMenus}},[s("a",[e._v("Single Player")])]),s("li",[s("router-link",{attrs:{to:"/game"}},[e._v("Pass and Play")])],1),e._m(4)])])]),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-danger is-outlined menuButton",on:{click:e.newGameMenu}},[e._v("<")])])])]),s("div",{staticClass:"modal modal-mask modal-container",class:{hidden:!e.joinGameToggle}},[s("div",{staticClass:"modal-card"},[e._m(5),e._m(6),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-danger  is-outlined menuButton",on:{click:e.joinMenu}},[e._v("<")])])])])])},f=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",[s("a",[e._v("Dashboard")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",[s("a",[e._v("Current Games")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",[s("a",[e._v("Replays")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"menu-label"},[e._v("New Game")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",[s("a",[e._v("Online")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"menu-label"},[e._v("Join Game")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"modal-card-body"},[s("aside",{staticClass:"menu"},[s("ul",{staticClass:"menu-list"},[s("li",[s("a",[e._v("Enter Game Code")])]),s("li",[s("a",[e._v("Friends List")])])])])])}],v=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div")},h=[],b=function(e){function t(){return Object(o["a"])(this,t),Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),t}(d["b"]);b=m["a"]([d["a"]],b);var p=b,C=p,_=s("2877"),O=Object(_["a"])(C,v,h,!1,null,null,null),j=O.exports,y=s("bc34"),w=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.menuToggle=!1,e.newGameToggle=!1,e.joinGameToggle=!1,e}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"showMenu",value:function(){this.menuToggle=!this.menuToggle,this.newGameToggle=!1,this.joinGameToggle=!1}},{key:"joinMenu",value:function(){this.joinGameToggle=!this.joinGameToggle,this.joinGameToggle?(this.menuToggle=!1,this.newGameToggle=!1):this.menuToggle=!0}},{key:"newGameMenu",value:function(){this.newGameToggle=!this.newGameToggle,this.newGameToggle?(this.menuToggle=!1,this.joinGameToggle=!1):this.menuToggle=!0}},{key:"closeAllMenus",value:function(){this.newGameToggle=!1,this.joinGameToggle=!1,this.menuToggle=!1}}]),t}(d["b"]);w=m["a"]([Object(d["a"])({components:{Menu:j,Chat2:y["a"]}})],w);var k=w,T=k,E=(s("a0e5"),Object(_["a"])(T,g,f,!1,null,"5c51697a",null)),L=E.exports,G=s("4bb5"),M=s("f87c"),x=function(e){function t(){return Object(o["a"])(this,t),Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"onNewuser",value:function(e){this.addUser(e)}}]),t}(d["b"]);m["a"]([Object(G["a"])("addLogin")],x.prototype,"addUser",void 0),m["a"]([Object(M["a"])("newuser")],x.prototype,"onNewuser",null),x=m["a"]([Object(d["a"])({components:{Header:L}})],x);var U=x,$=U,N=(s("034f"),Object(_["a"])($,a,i,!1,null,null,null)),P=N.exports,S=s("8c4f"),A=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"background"},[s("div",{staticClass:"tile is-ancestor"},[s("div",{staticClass:"tile is-vertical"},[s("div",{staticClass:"tile"},[s("div",{staticClass:"tile is-parent is-vertical is-8"},[s("article",{staticClass:"tile is-child notification is-primary"},[e.username?s("div",[s("div",{staticClass:"title"},[e._v("\n                  Hello "+e._s(e.username)+"\n                ")]),s("Online")],1):s("div",[s("Login",{on:{usernameChange:function(t){e.username=t}}})],1)]),s("article",{staticClass:"tile is-child notification is-warning"})])])]),s("div",{staticClass:"tile is-parent is-vertical is-6"},[s("article",{staticClass:"tile is-child"},[s("div",{staticClass:"content"},[s("div",{staticClass:"content"},[s("Chat")],1)])])])])])},R=[],D=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("div",{staticClass:"msgContainer"},[s("div",{attrs:{id:"messages"}},e._l(e.messages,function(t){return s("span",[s("router-link",{attrs:{to:"/game/"+t.game}},[t.game?s("label",{staticClass:"otherMsg"},[e._v("Go to Game")]):e._e()]),s("label",{staticClass:"msg"},[e._v(e._s(t.message))]),s("label",{staticClass:"otherMsg"},[e._v(e._s(t.user)+":")])],1)}),0)]),s("div",[s("form",{staticClass:"columns",on:{submit:function(t){return t.preventDefault(),e.sendMessage(t)}}},[s("div",{staticClass:"column"}),s("div",{staticClass:"column is-four-fifths"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticClass:"textarea has-fixed-size",attrs:{id:"msgText",rows:"3",placeholder:"Enter chat message"},domProps:{value:e.message},on:{input:function(t){t.target.composing||(e.message=t.target.value)}}})]),s("button",{staticClass:"button is-primary is-outlined ",attrs:{type:"submit"}},[e._v(">")]),s("div",{staticClass:"column"})])])])},B=[],I=s("8055"),H=s.n(I),V=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.user="",e.loggedIn=!1,e.message="",e.PORT=Object({NODE_ENV:"production",BASE_URL:"/"}).PORT||"3001",e.socket=H()(),e.room="lobby",e.messages=[],e}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"sendMessage",value:function(e){e.preventDefault(),this.socket.emit("sendmsg",{user:this.getLogin.isLoggedin?this.getLogin.username:"Anon",message:this.message,room:"lobby"}),this.message=""}},{key:"mounted",value:function(){var e=this;this.user=this.getLogin.username,this.socket.on("connect",function(){e.socket.emit("subscribe",e.room)}),this.socket.on("msg",function(t){e.messages.unshift(t)}),this.socket.on("inv",function(t){t.room!==e.getLogin.username&&t.sender!==e.getLogin.username||(e.$socket.client.emit("subscribe",t.game),e.messages.unshift(t))})}}]),t}(d["b"]);m["a"]([Object(G["b"])("getLogin")],V.prototype,"getLogin",void 0),V=m["a"]([d["a"]],V);var J=V,q=J,z=(s("c4f9"),Object(_["a"])(q,D,B,!1,null,"b66061d2",null)),F=z.exports,X=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("form",{on:{submit:function(t){return t.preventDefault(),e.login(t)}}},[s("div",{staticClass:"field"},[s("p",{staticClass:"control has-icons-left has-icons-right"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"input",attrs:{type:"text",placeholder:"Username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._m(0),e._m(1)])]),s("div",{staticClass:"field"},[s("p",{staticClass:"control has-icons-left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input",attrs:{type:"password",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})])]),s("div",{staticClass:"field"},[s("p",{staticClass:"control"},[s("button",{staticClass:"button is-success  is-outlined",attrs:{type:"submit"}},[e._v("\n        Login\n        ")]),s("router-link",{attrs:{to:"/register"}},[s("a",{staticClass:"button is-danger  is-outlined",attrs:{type:"button"}},[e._v("Register")])])],1)])])])},K=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon is-small is-left"},[s("i",{staticClass:"fas fa-envelope"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"icon is-small is-right"},[s("i",{staticClass:"fas fa-check"})])}],W=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.username="",e.password="",e}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"login",value:function(e){e.preventDefault(),this.userLogin(this.username),this.$emit("usernameChange",this.username),this.$socket.client.emit("newuser",this.username),this.$socket.client.emit("subscribe",this.username),this.username="",this.password=""}}]),t}(d["b"]);m["a"]([Object(G["a"])("userLogin")],W.prototype,"userLogin",void 0),m["a"]([Object(G["a"])("addLogin")],W.prototype,"addLogin",void 0),W=m["a"]([d["a"]],W);var Y=W,Q=Y,Z=(s("dfbb"),Object(_["a"])(Q,X,K,!1,null,"58129f3e",null)),ee=Z.exports,te=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("h2",[e._v("Users Online")]),e.onlineUsers?s("ul",e._l(e.onlineUsers,function(t){return s("li",{staticClass:"online"},[e._v(e._s(t)+"\n            "),s("input",{staticClass:"button is-success  is-outlined",attrs:{type:"button",value:"Invite"},on:{click:function(s){return e.invite(t)}}})])}),0):e._e()])},se=[],ne=(s("6b54"),function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.onlineUsers=[],e.existing=[],e}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"onNewuser",value:function(e){this.onlineUsers=this.getUsers}},{key:"invite",value:function(e){var t=Math.random().toString(36).substring(7);this.$socket.client.emit("invite",{user:"Admin",message:"You have been invited to a game",room:e,game:t,sender:this.getUserName.username})}}]),t}(d["b"]));m["a"]([Object(G["b"])("getUsers")],ne.prototype,"getUsers",void 0),m["a"]([Object(G["b"])("getLogin")],ne.prototype,"getUserName",void 0),m["a"]([Object(G["c"])("usersOnline")],ne.prototype,"usersState",void 0),m["a"]([Object(M["a"])("newuser")],ne.prototype,"onNewuser",null),ne=m["a"]([d["a"]],ne);var ae=ne,ie=ae,oe=(s("7df4"),Object(_["a"])(ie,te,se,!1,null,"95778be4",null)),re=oe.exports,ce=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.username=null,e}return Object(u["a"])(t,e),t}(d["b"]);m["a"]([Object(G["b"])("getLogin")],ce.prototype,"getLogin",void 0),ce=m["a"]([Object(d["a"])({components:{Header:L,Chat:F,Login:ee,Online:re}})],ce);var le=ce,ue=le,me=(s("cccb"),Object(_["a"])(ue,A,R,!1,null,null,null)),de=me.exports;n["a"].use(S["a"]);var ge=new S["a"]({routes:[{path:"/",name:"home",component:de},{path:"/about",name:"about",component:function(){return s.e("about").then(s.bind(null,"f820"))}},{path:"/login",name:"login",component:function(){return s.e("about").then(s.bind(null,"a55b"))}},{path:"/register",name:"register",component:function(){return s.e("about").then(s.bind(null,"73cf"))}},{path:"/game",name:"game",component:function(){return s.e("about").then(s.bind(null,"7d36"))}},{path:"/game/:id",name:"onlineGame",component:function(){return s.e("about").then(s.bind(null,"7d36"))}}]}),fe=(s("7d05"),s("2f62"));n["a"].use(fe["a"]);var ve={username:"",loggedIn:!1},he={getLogin:function(e){return{username:e.username,isLoggedin:e.loggedIn}},getOnlineUsers:function(e){return e.usersOnline}},be={LOGIN:function(e,t){e.username=t,e.loggedIn=!0},LOGOUT:function(e){e.username="",e.loggedIn=!1}},pe={userLogin:function(e,t){e.commit("LOGIN",t)},userLogout:function(e){e.commit("LOGOUT")}},Ce={state:ve,getters:he,actions:pe,mutations:be};n["a"].use(fe["a"]);var _e={usersOnline:[]},Oe={getUsers:function(e){return e.usersOnline}},je={ADD_USER:function(e,t){e.usersOnline.push(t)},REMOVE_USER:function(e,t){e.usersOnline.splice(e.usersOnline.indexOf(t),1)}},ye={addLogin:function(e,t){e.commit("ADD_USER",t)},userLogout:function(e,t){e.commit("REMOVE_USER",t)}},we={state:_e,getters:Oe,actions:ye,mutations:je};n["a"].use(fe["a"]);var ke=new fe["a"].Store({modules:{LoginModule:Ce,UsersModule:we}});n["a"].config.productionTip=!1;Object({NODE_ENV:"production",BASE_URL:"/"}).PORT;var Te=H()();n["a"].use(M["b"],Te,{store:ke}),new n["a"]({store:ke,router:ge,render:function(e){return e(P)}}).$mount("#app")},d563:function(e,t,s){},dfbb:function(e,t,s){"use strict";var n=s("957a"),a=s.n(n);a.a}});
//# sourceMappingURL=app.3c659e48.js.map