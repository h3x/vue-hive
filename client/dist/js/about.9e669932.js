(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0887":function(t,e,i){},"1af6":function(t,e,i){var s=i("63b6");s(s.S,"Array",{isArray:i("9003")})},"20fd":function(t,e,i){"use strict";var s=i("d9f6"),n=i("aebd");t.exports=function(t,e,i){e in t?s.f(t,e,n(0,i)):t[e]=i}},"2fdb":function(t,e,i){"use strict";var s=i("5ca1"),n=i("d2c8"),r="includes";s(s.P+s.F*i("5147")(r),"String",{includes:function(t){return!!~n(this,t,r).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"36bd":function(t,e,i){"use strict";var s=i("4bf8"),n=i("77f1"),r=i("9def");t.exports=function(t){var e=s(this),i=r(e.length),a=arguments.length,o=n(a>1?arguments[1]:void 0,i),c=a>2?arguments[2]:void 0,u=void 0===c?i:n(c,i);while(u>o)e[o++]=t;return e}},3702:function(t,e,i){var s=i("481b"),n=i("5168")("iterator"),r=Array.prototype;t.exports=function(t){return void 0!==t&&(s.Array===t||r[n]===t)}},"40c3":function(t,e,i){var s=i("6b4c"),n=i("5168")("toStringTag"),r="Arguments"==s(function(){return arguments}()),a=function(t,e){try{return t[e]}catch(i){}};t.exports=function(t){var e,i,o;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(i=a(e=Object(t),n))?i:r?s(e):"Object"==(o=s(e))&&"function"==typeof e.callee?"Arguments":o}},"469f":function(t,e,i){i("6c1c"),i("1654"),t.exports=i("7d7b")},"4ee1":function(t,e,i){var s=i("5168")("iterator"),n=!1;try{var r=[7][s]();r["return"]=function(){n=!0},Array.from(r,function(){throw 2})}catch(a){}t.exports=function(t,e){if(!e&&!n)return!1;var i=!1;try{var r=[7],o=r[s]();o.next=function(){return{done:i=!0}},r[s]=function(){return o},t(r)}catch(a){}return i}},5147:function(t,e,i){var s=i("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(i){try{return e[s]=!1,!"/./"[t](e)}catch(n){}}return!0}},"549b":function(t,e,i){"use strict";var s=i("d864"),n=i("63b6"),r=i("241e"),a=i("b0dc"),o=i("3702"),c=i("b447"),u=i("20fd"),l=i("7cd6");n(n.S+n.F*!i("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var e,i,n,h,f=r(t),v="function"==typeof this?this:Array,d=arguments.length,p=d>1?arguments[1]:void 0,y=void 0!==p,b=0,g=l(f);if(y&&(p=s(p,d>2?arguments[2]:void 0,2)),void 0==g||v==Array&&o(g))for(e=c(f.length),i=new v(e);e>b;b++)u(i,b,y?p(f[b],b):f[b]);else for(h=g.call(f),i=new v;!(n=h.next()).done;b++)u(i,b,y?a(h,p,[n.value,b],!0):n.value);return i.length=b,i}})},"54a1":function(t,e,i){i("6c1c"),i("1654"),t.exports=i("95d5")},"5d73":function(t,e,i){t.exports=i("469f")},"5fca":function(t,e,i){},6762:function(t,e,i){"use strict";var s=i("5ca1"),n=i("c366")(!0);s(s.P,"Array",{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")("includes")},"6c7b":function(t,e,i){var s=i("5ca1");s(s.P,"Array",{fill:i("36bd")}),i("9c6c")("fill")},"73cf":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"background"},[i("form",{on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[i("div",{staticClass:"field"},[i("p",{staticClass:"control has-icons-left has-icons-right"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"input",attrs:{type:"text",placeholder:"Username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._m(0),t._m(1)])]),i("div",{staticClass:"field"},[i("p",{staticClass:"control has-icons-left"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._m(2)])]),i("div",{staticClass:"field"},[i("p",{staticClass:"control has-icons-left"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.passwordCon,expression:"passwordCon"}],staticClass:"input",attrs:{type:"password",placeholder:"Confirm Password"},domProps:{value:t.passwordCon},on:{input:function(e){e.target.composing||(t.passwordCon=e.target.value)}}}),t._m(3)])]),t._m(4)])])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"icon is-small is-left"},[i("i",{staticClass:"fas fa-envelope"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"icon is-small is-right"},[i("i",{staticClass:"fas fa-check"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"icon is-small is-left"},[i("i",{staticClass:"fas fa-lock"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"icon is-small is-left"},[i("i",{staticClass:"fas fa-lock"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"field"},[i("p",{staticClass:"control"},[i("button",{staticClass:"button is-success  is-outlined",attrs:{type:"submit"}},[t._v("\n        Register\n        ")])])])}],r=i("d225"),a=i("308d"),o=i("6bb5"),c=i("4e2b"),u=i("9ab4"),l=i("60a3"),h=function(t){function e(){return Object(r["a"])(this,e),Object(a["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(c["a"])(e,t),e}(l["b"]);h=u["a"]([l["a"]],h);var f=h,v=f,d=(i("85da"),i("2877")),p=Object(d["a"])(v,s,n,!1,null,"4fc6490c",null);e["default"]=p.exports},"774e":function(t,e,i){t.exports=i("d2d5")},"7cd6":function(t,e,i){var s=i("40c3"),n=i("5168")("iterator"),r=i("481b");t.exports=i("584a").getIteratorMethod=function(t){if(void 0!=t)return t[n]||t["@@iterator"]||r[s(t)]}},"7d36":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"columns"},[i("div",{staticClass:"column"},[i("HiveGame")],1)])},n=[],r=i("d225"),a=i("b0b4"),o=i("308d"),c=i("6bb5"),u=i("4e2b"),l=i("9ab4"),h=i("60a3"),f=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"rxcanvas"},[i("canvas",{directives:[{name:"canvas",rawName:"v-canvas",value:t.$route.params.id,expression:"$route.params.id"}],attrs:{id:"game"}})])},v=[],d=(i("6762"),i("2fdb"),i("a745")),p=i.n(d);function y(t){if(p()(t))return t}var b=i("5d73"),g=i.n(b);function m(t,e){var i=[],s=!0,n=!1,r=void 0;try{for(var a,o=g()(t);!(s=(a=o.next()).done);s=!0)if(i.push(a.value),e&&i.length===e)break}catch(c){n=!0,r=c}finally{try{s||null==o["return"]||o["return"]()}finally{if(n)throw r}}return i}function x(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function k(t,e){return y(t)||m(t,e)||x()}i("ac6a"),i("6c7b"),i("6b54");function w(t){var e=t.x,i=t.z+(t.x-(1&t.x))/2;return{x:e,y:i}}function C(t){var e=t.x,i=t.y-(t.x-(1&t.x))/2,s=-e-i;return{x:e,y:s,z:i}}function S(t){var e=Math.round(t.x),i=Math.round(t.y),s=Math.round(t.z),n=Math.abs(e-t.x),r=Math.abs(i-t.y),a=Math.abs(s-t.z);return n>r&&n>a?e=-i-s:r>a?i=-e-s:s=-e-i,{x:e,y:i,z:s}}function P(t,e,i){var s=3*i/2*t,n=i*Math.sqrt(3)*(e+.5*(1&t));return[s,n]}function M(t,e,i){var s=2/3*t/i,n=(-1/3*t+Math.sqrt(3)/3*e)/i,r=L(Math.floor(s),Math.floor(n)),a=S(r),o=w(a);return[Math.max(0,o.x),Math.max(0,o.y)]}function L(t,e){var i=t,s=e,n=-i-s;return{x:i,y:n,z:s}}var O=[[[0,-1],[1,-1],[1,0],[0,1],[-1,0],[-1,-1]],[[0,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0]]];function _(t,e,i){var s=1&t,n=O[s][i];return[t+n[0],e+n[1]]}var D=function(){function t(e,i,s,n){Object(r["a"])(this,t),this.inPlay=!1,this.x=0,this.y=0,this.z=0,this.size=e,this.color="#101115",this.defaultColor="#101115",this.corners=[],this.isDocked=!0,this.visited=!1,this.hx=0,this.hy=0,this.type=i,this.player=n,this.stroke="#1012f",this.id=this.player.toString()+this.type+s.toString(),"W"===this.player?this.color="#c5c6c7":this.color="#66fcf1",this.setColor(this.color),"A"===this.type?this.attr={scurry:!0,moves:-1,canJump:!1,canClimb:!1}:"Q"===this.type?this.attr={scurry:!0,moves:1,canJump:!1,canClimb:!1}:"G"===this.type?this.attr={scurry:!1,moves:0,canJump:!0,canClimb:!1}:"S"===this.type?this.attr={scurry:!0,moves:3,canJump:!1,canClimb:!1}:this.attr={scurry:!1,moves:0,canJump:!1,canClimb:!1}}return Object(a["a"])(t,[{key:"setColor",value:function(t){this.color=t,this.defaultColor=t}},{key:"setZ",value:function(t){this.z+=t}},{key:"unDock",value:function(){this.isDocked=!1}},{key:"isPieceDocked",value:function(){return this.isDocked}},{key:"setStroke",value:function(t){this.stroke=t}},{key:"isMoveable",value:function(){return this.z>=0}},{key:"select",value:function(){this.defaultColor=this.color,this.color="red"}},{key:"unselect",value:function(){this.setColor(this.defaultColor)}},{key:"resize",value:function(t){this.size=t}},{key:"pieceInPlay",value:function(t){this.inPlay=t}},{key:"isPieceInPlay",value:function(){return this.inPlay}},{key:"getPlayer",value:function(){return{color:this.player,type:this.type,name:this.player+this.type+this.id}}},{key:"setLocation",value:function(t,e){var i=P(t,e,this.size),s=k(i,2),n=s[0],r=s[1],a=[t,e];this.hx=a[0],this.hy=a[1];var o=[n+this.size,r+this.size];this.x=o[0],this.y=o[1]}},{key:"forceLocation",value:function(t,e){var i=[t,e];this.x=i[0],this.y=i[1]}},{key:"getLocation",value:function(){return[this.x,this.y]}},{key:"getHex",value:function(){return M(this.x,this.y,this.size)}},{key:"calcCorners",value:function(){this.corners=[];for(var t=0,e=0,i=0;i<7;i++)t=this.x+this.size*Math.cos(2*i*Math.PI/6),e=this.y+this.size*Math.sin(2*i*Math.PI/6),this.corners.push([t,e])}},{key:"update",value:function(){}},{key:"clickEvent",value:function(t,e,i){this.setLocation(t,e)}},{key:"ptype",value:function(){return"hex"}},{key:"draw",value:function(t,e,i){this.calcCorners(),t.strokeStyle=this.stroke,t.fillStyle=this.color;var s=k(this.corners[1],2),n=s[0],r=s[1];t.beginPath(),t.moveTo(n,r),this.corners.forEach(function(e){var i=k(e,2);n=i[0],r=i[1],t.lineTo(n,r)});var a=t.createLinearGradient(this.x,this.y,this.x+this.size,this.y+this.size);a.addColorStop(0,this.color),a.addColorStop(1,"grey"),t.fillStyle=a,t.fill(),t.stroke(),t.font="30px Ariel",t.fillStyle="black",t.fillText(this.type,this.x-this.size/4,this.y+this.size/4)}}]),t}();function H(t){if(p()(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}var j=i("774e"),z=i.n(j),A=i("c8bb"),E=i.n(A);function T(t){if(E()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return z()(t)}function $(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function N(t){return H(t)||T(t)||$()}var I=function(){function t(e){Object(r["a"])(this,t),this.boardDims={width:30,height:14},this.queenPlayed={W:!1,B:!1},this.canvas=e,this.size=this.canvas.width/this.boardDims.width*.55,this.board=[];for(var i=0;i<this.boardDims.height;i++){this.board[i]=new Array;for(var s=0;s<this.boardDims.width;s++)this.board[i][s]=null}this.v=[]}return Object(a["a"])(t,[{key:"getBoard",value:function(){return this.board}},{key:"getDims",value:function(){return this.boardDims}},{key:"getBoardClone",value:function(){return N(this.board)}},{key:"getLegalMoves",value:function(){for(var t=[],e=0;e<this.boardDims.height;e++){this.board[e]=new Array;for(var i=0;i<this.boardDims.width;i++)"c"===this.board[e][i]&&t.push([i,e])}return t}},{key:"placePiece",value:function(t,e,i){return(null===this.board[i][e]||"move"===this.board[i][e])&&(this.board[i][e]=t,t.setLocation(e,i),!0)}},{key:"refreshBoard",value:function(){for(var t=0;t<this.boardDims.height;t++)for(var e=0;e<this.boardDims.width;e++)"move"!==this.board[t][e]&&"c"!==this.board[t][e]||(this.board[t][e]=null)}},{key:"removePiece",value:function(t,e,i){return this.board[i][e]=null,!0}},{key:"move",value:function(t,e,i,s){return t.isPieceInPlay()&&s?this.removePiece(t,s[0],s[1])&&this.placePiece(t,e,i):(t.pieceInPlay(!0),this.placePiece(t,e,i))}},{key:"getNeighbours",value:function(t,e){for(var i=[],s=0;s<6;s++)i.push(_(t,e,s));return i}},{key:"getAdjacentPieces",value:function(t,e){for(var i=t.getHex(),s=k(i,2),n=s[0],r=s[1],a=this.getNeighbours(n,r),o=[],c=0;c<a.length;c++){var u=this.getPieceAt(a[c][0],a[c][1],e);null!==u&&u.map(function(t){o.push(t)})}return o}},{key:"oneHive",value:function(t,e){for(var i=[],s=[],n=0;n<e.length;n++)e[n]!==t&&(e[n].isPieceDocked()||s.push(e[n]));i.push(s[0]);while(i.length>0){var r=i.pop();if(r!==t){if(!r)break;r.visited=!0;for(var a=this.getAdjacentPieces(r,e),o=0;o<a.length;o++)a[o].visited||i.push(a[o])}}var c=s.map(function(t){return t.visited}).includes(!1);return e.map(function(t){return t.visited=!1}),c}},{key:"floodFillPrep",value:function(t,e){for(var i=0;i<this.boardDims.height;i++)for(var s=0;s<this.boardDims.width;s++)"move"===this.board[i][s]&&(this.board[i][s]=null)}},{key:"getLegalNeighbors",value:function(t){var e=t.getHex(),i=k(e,2),s=i[0],n=i[1];if(s>this.boardDims.width||n>this.boardDims.height)return[];for(var r=this.getNeighbours(s,n),a=[],o=0;o<6;o++){var c=o-1,u=o+1;0===o?c=5:5===o&&(u=0);var l=k(r[o],2),h=l[0],f=l[1],v=k(r[c],2),d=v[0],p=v[1],y=k(r[u],2),b=y[0],g=y[1];null!==this.board[f][h]&&"move"!==this.board[f][h]||null!==this.board[p][d]&&"move"!==this.board[p][d]&&null!==this.board[g][b]&&"move"!==this.board[g][b]||a.push(r[o])}return a}},{key:"getPieceAt",value:function(t,e,i){for(var s=[],n=0;n<i.length;n++){var r=i[n].getHex(),a=k(r,2),o=a[0],c=a[1];o===t&&c===e&&s.push(i[n])}return s.length>0?s:null}},{key:"newPiece",value:function(t,e){for(var i=this,s=[],n=0;n<e.length;n++)s.push(this.getLegalNeighbors(e[n]));return s.flatMap(function(t){return t}).filter(function(s){return!i.checkSame(t,s,e)})}},{key:"getScurryMoves",value:function(t,e,i){if(this.oneHive(t,i))return[];for(var s=[],n=0;n<i.length;n++)i[n]===t||i[n].isDocked||s.push(this.getLegalNeighbors(i[n]));return 1===e?this.getSingleMove(t,i):3===e?this.getSpiderMoves(t,i):s.flatMap(function(t){return t})}},{key:"getJumpMoves",value:function(t,e){if(this.oneHive(t,e))return[];for(var i=[],s=t.getHex(),n=k(s,2),r=n[0],a=n[1],o=this.getNeighbours(r,a),c=this.getLegalNeighbors(t),u=this.difference(o,c),l=C({x:r,y:a}),h=0;h<u.length;h++){var f=k(u[h],2),v=f[0],d=f[1],p=C({x:v,y:d}),y=p.x-l.x,b=p.y-l.y,g=p.z-l.z,m=y,x=b,S=g;while(1){var P=w({x:p.x+m,y:p.y+x,z:p.z+S});if(null===this.getPieceAt(P.x,P.y,e)){i.push([P.x,P.y]);break}m+=y,x+=b,S+=g}}return i}},{key:"checkSame",value:function(t,e,i){var s=this,n=this.getNeighbours(e[0],e[1]),r=n.map(function(t){var e=k(t,2),n=e[0],r=e[1];return s.getPieceAt(n,r,i)}),a=r.map(function(e){return null!==e&&e[0].player!==t.player});return a.includes(!0)}},{key:"intersection",value:function(t,e){for(var i=[],s=0;s<t.length;s++)for(var n=0;n<e.length;n++)t[s][0]===e[n][0]&&t[s][1]===e[n][1]&&i.push([t[s][0],t[s][1]]);return i}},{key:"difference",value:function(t,e){for(var i=[],s=0;s<t.length;s++)this.arrayContains(t[s],e)||i.push(t[s]);return i}},{key:"arrayContains",value:function(t,e){for(var i=0;i<e.length;i++)if(t[0]===e[i][0]&&t[1]===e[i][1])return!0;return!1}},{key:"removeDupes",value:function(t){for(var e=[],i=0;i<t.length;i++)this.arrayContains(t[i],e)||e.push(t[i]);return e}},{key:"getSingleMove",value:function(t,e){var i=t.getHex(),s=k(i,2),n=s[0],r=s[1],a=this.getNeighbours(n,r),o=this.getScurryMoves(t,-1,e);return this.intersection(a,o)}},{key:"getSpiderMoves",value:function(t,e){var i=this.getSingleMove(t,e),s=this.getScurryMoves(t,-1,e);this.v=[];for(var n=0;n<i.length;n++)this.floodFill(s,i[n][0],i[n][1],3,[],e);this.intersection(this.v,this.getScurryMoves(t,-1,e));return this.v}},{key:"floodFill",value:function(t,e,i,s,n,r){this.v=this.intersection(t,this.v.concat(this.getNeighbours(e,i)))}}]),t}();function Q(t,e,i){t.fillStyle="#00ff00";var s=P(e[0],e[1],i),n=k(s,2),r=n[0],a=n[1],o=r+i,c=a+i;t.beginPath(),t.arc(o,c,i/5,0,2*Math.PI),t.fill()}var W=i("8055"),B=function(){function t(e,i){Object(r["a"])(this,t),this.legalMoves=[],this.canvas=e,this.ctx=this.canvas.getContext("2d"),this.room=i,void 0===this.room?this.isOnline=!1:this.isOnline=!0;Object({NODE_ENV:"production",BASE_URL:"/"}).PORT;this.$Socket=W["connect"]("/"),this.colors={black:"#0b0c10",d_grey:"#121314",l_grey:"#50664a",ll_grey:"#c5c6c7",l_green:"#66fcf1",d_green:"#45a29e",accent:"#FFCD6D"},this.canvas.width=.95*window.innerWidth,this.canvas.height=.5*this.canvas.width,this.board=new I(this.canvas),this.boardDims=this.board.getDims(),this.size=this.canvas.width/this.boardDims.width*.55,this.heightSpace=Math.sqrt(3)*this.size,this.widthSpace=2*this.size*3/4,this.pieces=[],this.moveCount=0,this.turn="W",this.playerColor="W",this.selectedHex=null,this.previousLocation=null,this.legalMoves=[],this.whiteQueen=new D(this.size,"Q",0,"W"),this.blackQueen=new D(this.size,"Q",0,"B")}return Object(a["a"])(t,[{key:"nextPlayer",value:function(){"W"===this.turn?this.turn="B":this.turn="W",this.moveCount++}},{key:"calcHexPoints",value:function(t,e,i){for(var s=[],n=0;n<7;n++){var r=t+i*Math.cos(2*n*Math.PI/6),a=e+i*Math.sin(2*n*Math.PI/6);s.push([r,a])}return s}},{key:"checkSize",value:function(){var t=this;window.addEventListener("resize",function(){t.resizeCanvas()},!1)}},{key:"setup",value:function(){var t=this;this.isOnline&&(this.$Socket.emit("subscribeGame",this.room),this.$Socket.on("player",function(e){t.playerColor=e,t.$Socket.removeListener("player")}),this.socketListener()),this.setupPieces(),this.clickListener(),this.checkSize(),window.setInterval(function(){return t.draw()},20)}},{key:"draw",value:function(){var t=this;this.ctx.fillStyle=this.colors.black,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.checkWin(),this.legalMoves.forEach(function(e){return Q(t.ctx,e,t.size)}),this.pieces.forEach(function(e){return e.draw(t.ctx,e.getHex(),!0)})}},{key:"dist",value:function(t,e){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2))}},{key:"clickListener",value:function(){var t=this;this.canvas.addEventListener("mousedown",function(e){var i=t.canvas.getBoundingClientRect(),s=e.clientX-i.left,n=e.clientY-i.top;(!t.isOnline||t.turn&&t.playerColor===t.turn)&&(t.selectedHex?t.secondClick(s,n):t.firstClick(s,n))})}},{key:"socketListener",value:function(){var t=this;this.$Socket.on("game",function(e){for(var i=0;i<e.length;i++)for(var s=0;s<e[i].length;s++)if(null!==e[i][s])for(var n=0;n<t.pieces.length;n++)e[i][s].id===t.pieces[n].id&&(t.board.move(t.pieces[n],e[i][s].hx,e[i][s].hy),t.pieces[n].unDock());t.nextPlayer()})}},{key:"firstClick",value:function(t,e){var i=this;this.isOnline&&this.playerColor!==this.turn||this.pieces.forEach(function(s){i.dist([t,e],s.getLocation())<i.size&&s.isMoveable()&&(s.getPlayer().color===i.turn||!i.isOnline)&&(i.selectedHex=s,i.moveCount>1?(i.queenInFour()||("W"===i.turn?i.selectedHex=i.whiteQueen:i.selectedHex=i.blackQueen),i.selectedHex.select(),i.previousLocation=s.getHex(),i.selectedHex.isPieceDocked()?i.legalMoves=i.board.newPiece(s,i.pieces):i.turn&&i.board.queenPlayed[i.turn]&&(i.selectedHex.attr.scurry?i.legalMoves=i.board.getScurryMoves(i.selectedHex,i.selectedHex.attr.moves,i.pieces):i.selectedHex.attr.canJump&&(i.legalMoves=i.board.getJumpMoves(i.selectedHex,i.pieces)))):(i.turn&&"Q"===i.selectedHex.type&&(i.board.queenPlayed[i.turn]=!0),i.selectedHex.unDock(),i.firstTwoMoves(i.selectedHex),i.selectedHex=null))})}},{key:"secondClick",value:function(t,e){if(this.selectedHex){var i=this.selectedHex.getHex(),s=k(i,2),n=s[0],r=s[1],a=M(t,e,this.size),o=k(a,2),c=o[0],u=o[1],l=this.legalMoves.map(function(t){var e=k(t,2),i=e[0],s=e[1];return i===c&&s===u}).includes(!0);if(this.pieces.forEach(function(t){return t.unselect()}),l){"Q"===this.selectedHex.type&&this.turn&&(this.board.queenPlayed[this.turn]=!0);var h=Math.min(c,this.boardDims.width),f=Math.min(u,this.boardDims.height);this.board.move(this.selectedHex,h,f,[n,r])}}this.selectedHex&&this.previousLocation&&0!==this.dist(this.previousLocation,this.selectedHex.getHex())&&(this.selectedHex.unDock(),this.isOnline?this.$Socket.emit("game",this.board.getBoard(),this.room):this.nextPlayer()),this.legalMoves=[],this.selectedHex=null}},{key:"checkWin",value:function(){this.board.getAdjacentPieces(this.whiteQueen,this.pieces).length>5&&(this.ctx.fillStyle=this.blackQueen.color,this.ctx.font="48px serif",this.ctx.fillText("Black wins!",Math.floor(this.canvas.width/2),60),this.turn=null),this.board.getAdjacentPieces(this.blackQueen,this.pieces).length>5&&(this.ctx.fillStyle=this.whiteQueen.color,this.ctx.font="48px serif",this.ctx.fillText("White wins!",10,50),this.turn=null)}},{key:"queenInFour",value:function(){var t=this.pieces.filter(function(t){return!t.isPieceDocked()&&"W"===t.player}),e=this.pieces.filter(function(t){return!t.isPieceDocked()&&"B"===t.player});return!("W"===this.turn&&t.length>2&&!this.board.queenPlayed.W)&&!("B"===this.turn&&e.length>2&&!this.board.queenPlayed.B)}},{key:"firstTwoMoves",value:function(t){0===this.moveCount?this.board.move(t,15,6):this.board.move(t,14,6),this.isOnline?this.$Socket.emit("game",this.board.getBoard(),this.room,this.playerColor):this.nextPlayer()}},{key:"resizeCanvas",value:function(){this.canvas.width=.95*window.innerWidth,this.canvas.height=.9*window.innerHeight,this.size=this.canvas.width/this.boardDims.width*.55,this.ctx.fillStyle="#101115",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}},{key:"setupPieces",value:function(){for(var t=[["Q",0],["A",0],["A",1],["A",2],["G",0],["G",1],["G",2],["S",0],["S",1]],e=0;e<t.length;e++){var i=new D(this.size,t[e][0],t[e][1],"B");"Q"===t[e][0]&&(i=this.blackQueen);var s=this.canvas.width-this.widthSpace,n=this.canvas.height-this.heightSpace*(e+1);i.forceLocation(s,n),this.pieces.push(i)}for(var r=0;r<t.length;r++){var a=new D(this.size,t[r][0],t[r][1],"W");"Q"===t[r][0]&&(a=this.whiteQueen);var o=this.canvas.width-3*this.widthSpace,c=this.canvas.height-this.heightSpace*(r+1);a.forceLocation(o,c),this.pieces.push(a)}}}]),t}();h["b"].directive("canvas",{bind:function(t,e,i){var s=new B(t,e.value);s.setup()}});var G=function(t){function e(){return Object(r["a"])(this,e),Object(o["a"])(this,Object(c["a"])(e).apply(this,arguments))}return Object(u["a"])(e,t),e}(h["b"]),q=G,R=(i("b082"),i("2877")),F=Object(R["a"])(q,f,v,!1,null,"9f1f4d0e",null),J=F.exports,V=i("bc34"),U=i("f87c"),X=function(t){function e(){return Object(r["a"])(this,e),Object(o["a"])(this,Object(c["a"])(e).apply(this,arguments))}return Object(u["a"])(e,t),Object(a["a"])(e,[{key:"connect",value:function(){this.$socket.client.emit("subscribe",this.$router.currentRoute.params.id)}}]),e}(h["b"]);l["a"]([Object(U["a"])()],X.prototype,"connect",null),X=l["a"]([Object(h["a"])({components:{HiveGame:J,Chat2:V["a"]}})],X);var Y=X,Z=Y,K=Object(R["a"])(Z,s,n,!1,null,"21eb98cb",null);e["default"]=K.exports},"7d7b":function(t,e,i){var s=i("e4ae"),n=i("7cd6");t.exports=i("584a").getIterator=function(t){var e=n(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return s(e.call(t))}},"85da":function(t,e,i){"use strict";var s=i("c877"),n=i.n(s);n.a},"8e5b":function(t,e,i){"use strict";var s=i("5fca"),n=i.n(s);n.a},"95d5":function(t,e,i){var s=i("40c3"),n=i("5168")("iterator"),r=i("481b");t.exports=i("584a").isIterable=function(t){var e=Object(t);return void 0!==e[n]||"@@iterator"in e||r.hasOwnProperty(s(e))}},a55b:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"background"},[i("form",{on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[i("div",{staticClass:"field"},[i("p",{staticClass:"control has-icons-left has-icons-right"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"input",attrs:{type:"text",placeholder:"Username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._m(0),t._m(1)])]),i("div",{staticClass:"field"},[i("p",{staticClass:"control has-icons-left"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._m(2)])]),t._m(3)])])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"icon is-small is-left"},[i("i",{staticClass:"fas fa-envelope"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"icon is-small is-right"},[i("i",{staticClass:"fas fa-check"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"icon is-small is-left"},[i("i",{staticClass:"fas fa-lock"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"field"},[i("p",{staticClass:"control"},[i("button",{staticClass:"button is-success  is-outlined",attrs:{type:"submit"}},[t._v("\r\n        Login\r\n        ")])])])}],r=i("d225"),a=i("b0b4"),o=i("308d"),c=i("6bb5"),u=i("4e2b"),l=i("9ab4"),h=i("60a3"),f=i("4bb5"),v=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(o["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.username="",t.password="",t}return Object(u["a"])(e,t),Object(a["a"])(e,[{key:"login",value:function(t){t.preventDefault(),this.userLogin({username:this.username}),this.username="",this.password=""}}]),e}(h["b"]);l["a"]([Object(f["a"])("userLogin")],v.prototype,"userLogin",void 0),v=l["a"]([h["a"]],v);var d=v,p=d,y=(i("8e5b"),i("2877")),b=Object(y["a"])(p,s,n,!1,null,"ed43496c",null);e["default"]=b.exports},a745:function(t,e,i){t.exports=i("f410")},aae3:function(t,e,i){var s=i("d3f4"),n=i("2d95"),r=i("2b4c")("match");t.exports=function(t){var e;return s(t)&&(void 0!==(e=t[r])?!!e:"RegExp"==n(t))}},ac6a:function(t,e,i){for(var s=i("cadf"),n=i("0d58"),r=i("2aba"),a=i("7726"),o=i("32e9"),c=i("84f2"),u=i("2b4c"),l=u("iterator"),h=u("toStringTag"),f=c.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=n(v),p=0;p<d.length;p++){var y,b=d[p],g=v[b],m=a[b],x=m&&m.prototype;if(x&&(x[l]||o(x,l,f),x[h]||o(x,h,b),c[b]=f,g))for(y in s)x[y]||r(x,y,s[y],!0)}},b082:function(t,e,i){"use strict";var s=i("0887"),n=i.n(s);n.a},b0dc:function(t,e,i){var s=i("e4ae");t.exports=function(t,e,i,n){try{return n?e(s(i)[0],i[1]):e(i)}catch(a){var r=t["return"];throw void 0!==r&&s(r.call(t)),a}}},c877:function(t,e,i){},c8bb:function(t,e,i){t.exports=i("54a1")},d2c8:function(t,e,i){var s=i("aae3"),n=i("be13");t.exports=function(t,e,i){if(s(e))throw TypeError("String#"+i+" doesn't accept regex!");return String(n(t))}},d2d5:function(t,e,i){i("1654"),i("549b"),t.exports=i("584a").Array.from},f410:function(t,e,i){i("1af6"),t.exports=i("584a").Array.isArray},f820:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"about"},[i("h1",[t._v("This is an about page")])])}],r=i("2877"),a={},o=Object(r["a"])(a,s,n,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=about.9e669932.js.map