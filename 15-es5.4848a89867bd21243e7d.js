!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function e(n,e,o){return e&&t(n.prototype,e),o&&t(n,o),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{I5sr:function(t,o,a){"use strict";a.r(o),a.d(o,"TablaErroresPageModule",function(){return v});var i,r,u,c,l=a("ofXK"),s=a("3Pt+"),b=a("TEn/"),f=a("tyNb"),m=a("fXoL"),d=a("II1e"),p=a("lDzL"),h=((i=function(){function t(e){n(this,t),this.formBuilder=e,this.buildForm()}return e(t,[{key:"ngOnInit",value:function(){this.lista=d.a.getInstance()}},{key:"buildForm",value:function(){this.lista=d.a.getInstance()}},{key:"header",value:function(n){console.log(n);var t=[];return Object.keys(n).forEach(function(n){t.push({name:n})}),t}}]),t}()).\u0275fac=function(n){return new(n||i)(m.Kb(s.a))},i.\u0275cmp=m.Eb({type:i,selectors:[["app-formulario-tabla-errores"]],decls:10,vars:1,consts:[[3,"rows"],["name","Tipo","width","350"],["name","Fila","width","50"],["name","Columna","width","75"],["name","Identificador","width","150"],["name","Descripcion","width","550"]],template:function(n,t){1&n&&(m.Pb(0,"ion-item"),m.Pb(1,"h1"),m.tc(2,"Tabla de Errores"),m.Ob(),m.Ob(),m.Pb(3,"ion-item"),m.Pb(4,"ngx-datatable",0),m.Lb(5,"ngx-datatable-column",1),m.Lb(6,"ngx-datatable-column",2),m.Lb(7,"ngx-datatable-column",3),m.Lb(8,"ngx-datatable-column",4),m.Lb(9,"ngx-datatable-column",5),m.Ob(),m.Ob()),2&n&&(m.yb(4),m.ec("rows",t.lista))},directives:[b.g,p.b,p.a],styles:[""]}),i),y=[{path:"",component:(r=function(){function t(e,o){n(this,t),this.menuController=e,this.formBuilder=o,this.buildForm()}return e(t,[{key:"ngOnInit",value:function(){}},{key:"toggleMenu",value:function(){this.menuController.toggle()}},{key:"buildForm",value:function(){}}]),t}(),r.\u0275fac=function(n){return new(n||r)(m.Kb(b.r),m.Kb(s.a))},r.\u0275cmp=m.Eb({type:r,selectors:[["app-tabla-errores"]],decls:7,vars:0,consts:[["slot","start"],["menu","main-menu"]],template:function(n,t){1&n&&(m.Pb(0,"ion-header"),m.Pb(1,"ion-toolbar"),m.Pb(2,"ion-buttons",0),m.Lb(3,"ion-menu-button",1),m.Ob(),m.Pb(4,"ion-title"),m.tc(5,"MatrioshTS"),m.Ob(),m.Ob(),m.Ob(),m.Lb(6,"app-formulario-tabla-errores"))},directives:[b.e,b.o,b.c,b.k,b.n,h],styles:[""]}),r)}],w=((u=function t(){n(this,t)}).\u0275mod=m.Ib({type:u}),u.\u0275inj=m.Hb({factory:function(n){return new(n||u)},imports:[[f.i.forChild(y)],f.i]}),u),g=a("zon2"),v=((c=function t(){n(this,t)}).\u0275mod=m.Ib({type:c}),c.\u0275inj=m.Hb({factory:function(n){return new(n||c)},imports:[[l.c,s.d,b.p,g.a,w]]}),c)}}])}();