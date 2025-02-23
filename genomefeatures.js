function He(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Fa(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function _i(t) {
  let e, n, r;
  t.length !== 2 ? (e = He, n = (o, c) => He(t(o), c), r = (o, c) => t(o) - c) : (e = t === He || t === Fa ? t : Ha, n = t, r = t);
  function i(o, c, l = 0, f = o.length) {
    if (l < f) {
      if (e(c, c) !== 0) return f;
      do {
        const d = l + f >>> 1;
        n(o[d], c) < 0 ? l = d + 1 : f = d;
      } while (l < f);
    }
    return l;
  }
  function a(o, c, l = 0, f = o.length) {
    if (l < f) {
      if (e(c, c) !== 0) return f;
      do {
        const d = l + f >>> 1;
        n(o[d], c) <= 0 ? l = d + 1 : f = d;
      } while (l < f);
    }
    return l;
  }
  function s(o, c, l = 0, f = o.length) {
    const d = i(o, c, l, f - 1);
    return d > l && r(o[d - 1], c) > -r(o[d], c) ? d - 1 : d;
  }
  return { left: i, center: s, right: a };
}
function Ha() {
  return 0;
}
function Va(t) {
  return t === null ? NaN : +t;
}
const Ca = _i(He), Ba = Ca.right;
_i(Va).center;
const za = Math.sqrt(50), Ua = Math.sqrt(10), Pa = Math.sqrt(2);
function qe(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / Math.pow(10, i), s = a >= za ? 10 : a >= Ua ? 5 : a >= Pa ? 2 : 1;
  let o, c, l;
  return i < 0 ? (l = Math.pow(10, -i) / s, o = Math.round(t * l), c = Math.round(e * l), o / l < t && ++o, c / l > e && --c, l = -l) : (l = Math.pow(10, i) * s, o = Math.round(t / l), c = Math.round(e / l), o * l < t && ++o, c * l > e && --c), c < o && 0.5 <= n && n < 2 ? qe(t, e, n * 2) : [o, c, l];
}
function qa(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, a, s] = r ? qe(e, t, n) : qe(t, e, n);
  if (!(a >= i)) return [];
  const o = a - i + 1, c = new Array(o);
  if (r)
    if (s < 0) for (let l = 0; l < o; ++l) c[l] = (a - l) / -s;
    else for (let l = 0; l < o; ++l) c[l] = (a - l) * s;
  else if (s < 0) for (let l = 0; l < o; ++l) c[l] = (i + l) / -s;
  else for (let l = 0; l < o; ++l) c[l] = (i + l) * s;
  return c;
}
function kn(t, e, n) {
  return e = +e, t = +t, n = +n, qe(t, e, n)[2];
}
function Ga(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? kn(e, t, n) : kn(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Wa(t) {
  return t;
}
var Ve = 1, fn = 2, $n = 3, Te = 4, cr = 1e-6;
function Xa(t) {
  return "translate(" + t + ",0)";
}
function Za(t) {
  return "translate(0," + t + ")";
}
function Ya(t) {
  return (e) => +t(e);
}
function Ka(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Ja() {
  return !this.__axis;
}
function wi(t, e) {
  var n = [], r = null, i = null, a = 6, s = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = t === Ve || t === Te ? -1 : 1, f = t === Te || t === fn ? "x" : "y", d = t === Ve || t === $n ? Xa : Za;
  function h(u) {
    var w = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), E = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Wa), k = Math.max(a, 0) + o, $ = e.range(), g = +$[0] + c, _ = +$[$.length - 1] + c, m = (e.bandwidth ? Ka : Ya)(e.copy(), c), x = u.selection ? u.selection() : u, A = x.selectAll(".domain").data([null]), y = x.selectAll(".tick").data(w, e).order(), T = y.exit(), b = y.enter().append("g").attr("class", "tick"), v = y.select("line"), p = y.select("text");
    A = A.merge(A.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), y = y.merge(b), v = v.merge(b.append("line").attr("stroke", "currentColor").attr(f + "2", l * a)), p = p.merge(b.append("text").attr("fill", "currentColor").attr(f, l * k).attr("dy", t === Ve ? "0em" : t === $n ? "0.71em" : "0.32em")), u !== x && (A = A.transition(u), y = y.transition(u), v = v.transition(u), p = p.transition(u), T = T.transition(u).attr("opacity", cr).attr("transform", function(D) {
      return isFinite(D = m(D)) ? d(D + c) : this.getAttribute("transform");
    }), b.attr("opacity", cr).attr("transform", function(D) {
      var M = this.parentNode.__axis;
      return d((M && isFinite(M = M(D)) ? M : m(D)) + c);
    })), T.remove(), A.attr("d", t === Te || t === fn ? s ? "M" + l * s + "," + g + "H" + c + "V" + _ + "H" + l * s : "M" + c + "," + g + "V" + _ : s ? "M" + g + "," + l * s + "V" + c + "H" + _ + "V" + l * s : "M" + g + "," + c + "H" + _), y.attr("opacity", 1).attr("transform", function(D) {
      return d(m(D) + c);
    }), v.attr(f + "2", l * a), p.attr(f, l * k).text(E), x.filter(Ja).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === fn ? "start" : t === Te ? "end" : "middle"), x.each(function() {
      this.__axis = m;
    });
  }
  return h.scale = function(u) {
    return arguments.length ? (e = u, h) : e;
  }, h.ticks = function() {
    return n = Array.from(arguments), h;
  }, h.tickArguments = function(u) {
    return arguments.length ? (n = u == null ? [] : Array.from(u), h) : n.slice();
  }, h.tickValues = function(u) {
    return arguments.length ? (r = u == null ? null : Array.from(u), h) : r && r.slice();
  }, h.tickFormat = function(u) {
    return arguments.length ? (i = u, h) : i;
  }, h.tickSize = function(u) {
    return arguments.length ? (a = s = +u, h) : a;
  }, h.tickSizeInner = function(u) {
    return arguments.length ? (a = +u, h) : a;
  }, h.tickSizeOuter = function(u) {
    return arguments.length ? (s = +u, h) : s;
  }, h.tickPadding = function(u) {
    return arguments.length ? (o = +u, h) : o;
  }, h.offset = function(u) {
    return arguments.length ? (c = +u, h) : c;
  }, h;
}
function fr(t) {
  return wi(Ve, t);
}
function Qa(t) {
  return wi($n, t);
}
var ja = { value: () => {
} };
function yi() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Ce(n);
}
function Ce(t) {
  this._ = t;
}
function ts(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Ce.prototype = yi.prototype = {
  constructor: Ce,
  on: function(t, e) {
    var n = this._, r = ts(t + "", n), i, a = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((i = (t = r[a]).type) && (i = es(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++a < s; )
      if (i = (t = r[a]).type) n[i] = ur(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = ur(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Ce(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (a = this._[t], r = 0, i = a.length; r < i; ++r) a[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, a = r.length; i < a; ++i) r[i].value.apply(e, n);
  }
};
function es(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function ur(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = ja, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var An = "http://www.w3.org/1999/xhtml";
const hr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: An,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function an(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), hr.hasOwnProperty(e) ? { space: hr[e], local: t } : t;
}
function ns(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === An && e.documentElement.namespaceURI === An ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function rs(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function xi(t) {
  var e = an(t);
  return (e.local ? rs : ns)(e);
}
function is() {
}
function qn(t) {
  return t == null ? is : function() {
    return this.querySelector(t);
  };
}
function as(t) {
  typeof t != "function" && (t = qn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = new Array(s), c, l, f = 0; f < s; ++f)
      (c = a[f]) && (l = t.call(c, c.__data__, f, a)) && ("__data__" in c && (l.__data__ = c.__data__), o[f] = l);
  return new _t(r, this._parents);
}
function vi(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ss() {
  return [];
}
function bi(t) {
  return t == null ? ss : function() {
    return this.querySelectorAll(t);
  };
}
function os(t) {
  return function() {
    return vi(t.apply(this, arguments));
  };
}
function ls(t) {
  typeof t == "function" ? t = os(t) : t = bi(t);
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, l = 0; l < o; ++l)
      (c = s[l]) && (r.push(t.call(c, c.__data__, l, s)), i.push(c));
  return new _t(r, i);
}
function ki(t) {
  return function() {
    return this.matches(t);
  };
}
function $i(t) {
  return function(e) {
    return e.matches(t);
  };
}
var cs = Array.prototype.find;
function fs(t) {
  return function() {
    return cs.call(this.children, t);
  };
}
function us() {
  return this.firstElementChild;
}
function hs(t) {
  return this.select(t == null ? us : fs(typeof t == "function" ? t : $i(t)));
}
var ds = Array.prototype.filter;
function ps() {
  return Array.from(this.children);
}
function ms(t) {
  return function() {
    return ds.call(this.children, t);
  };
}
function gs(t) {
  return this.selectAll(t == null ? ps : ms(typeof t == "function" ? t : $i(t)));
}
function _s(t) {
  typeof t != "function" && (t = ki(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], c, l = 0; l < s; ++l)
      (c = a[l]) && t.call(c, c.__data__, l, a) && o.push(c);
  return new _t(r, this._parents);
}
function Ai(t) {
  return new Array(t.length);
}
function ws() {
  return new _t(this._enter || this._groups.map(Ai), this._parents);
}
function Ge(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ge.prototype = {
  constructor: Ge,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function ys(t) {
  return function() {
    return t;
  };
}
function xs(t, e, n, r, i, a) {
  for (var s = 0, o, c = e.length, l = a.length; s < l; ++s)
    (o = e[s]) ? (o.__data__ = a[s], r[s] = o) : n[s] = new Ge(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (i[s] = o);
}
function vs(t, e, n, r, i, a, s) {
  var o, c, l = /* @__PURE__ */ new Map(), f = e.length, d = a.length, h = new Array(f), u;
  for (o = 0; o < f; ++o)
    (c = e[o]) && (h[o] = u = s.call(c, c.__data__, o, e) + "", l.has(u) ? i[o] = c : l.set(u, c));
  for (o = 0; o < d; ++o)
    u = s.call(t, a[o], o, a) + "", (c = l.get(u)) ? (r[o] = c, c.__data__ = a[o], l.delete(u)) : n[o] = new Ge(t, a[o]);
  for (o = 0; o < f; ++o)
    (c = e[o]) && l.get(h[o]) === c && (i[o] = c);
}
function bs(t) {
  return t.__data__;
}
function ks(t, e) {
  if (!arguments.length) return Array.from(this, bs);
  var n = e ? vs : xs, r = this._parents, i = this._groups;
  typeof t != "function" && (t = ys(t));
  for (var a = i.length, s = new Array(a), o = new Array(a), c = new Array(a), l = 0; l < a; ++l) {
    var f = r[l], d = i[l], h = d.length, u = $s(t.call(f, f && f.__data__, l, r)), w = u.length, E = o[l] = new Array(w), k = s[l] = new Array(w), $ = c[l] = new Array(h);
    n(f, d, E, k, $, u, e);
    for (var g = 0, _ = 0, m, x; g < w; ++g)
      if (m = E[g]) {
        for (g >= _ && (_ = g + 1); !(x = k[_]) && ++_ < w; ) ;
        m._next = x || null;
      }
  }
  return s = new _t(s, r), s._enter = o, s._exit = c, s;
}
function $s(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function As() {
  return new _t(this._exit || this._groups.map(Ai), this._parents);
}
function Ts(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function Es(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, a = r.length, s = Math.min(i, a), o = new Array(i), c = 0; c < s; ++c)
    for (var l = n[c], f = r[c], d = l.length, h = o[c] = new Array(d), u, w = 0; w < d; ++w)
      (u = l[w] || f[w]) && (h[w] = u);
  for (; c < i; ++c)
    o[c] = n[c];
  return new _t(o, this._parents);
}
function Ss() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], s; --i >= 0; )
      (s = r[i]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function Ns(t) {
  t || (t = Rs);
  function e(d, h) {
    return d && h ? t(d.__data__, h.__data__) : !d - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var s = n[a], o = s.length, c = i[a] = new Array(o), l, f = 0; f < o; ++f)
      (l = s[f]) && (c[f] = l);
    c.sort(e);
  }
  return new _t(i, this._parents).order();
}
function Rs(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ms() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Is() {
  return Array.from(this);
}
function Ds() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ls() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Os() {
  return !this.node();
}
function Fs(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, s = i.length, o; a < s; ++a)
      (o = i[a]) && t.call(o, o.__data__, a, i);
  return this;
}
function Hs(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Vs(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Cs(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Bs(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function zs(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Us(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Ps(t, e) {
  var n = an(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Vs : Hs : typeof e == "function" ? n.local ? Us : zs : n.local ? Bs : Cs)(n, e));
}
function Ti(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function qs(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Gs(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Ws(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Xs(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? qs : typeof e == "function" ? Ws : Gs)(t, e, n ?? "")) : ae(this.node(), t);
}
function ae(t, e) {
  return t.style.getPropertyValue(e) || Ti(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Zs(t) {
  return function() {
    delete this[t];
  };
}
function Ys(t, e) {
  return function() {
    this[t] = e;
  };
}
function Ks(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Js(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Zs : typeof e == "function" ? Ks : Ys)(t, e)) : this.node()[t];
}
function Ei(t) {
  return t.trim().split(/^|\s+/);
}
function Gn(t) {
  return t.classList || new Si(t);
}
function Si(t) {
  this._node = t, this._names = Ei(t.getAttribute("class") || "");
}
Si.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Ni(t, e) {
  for (var n = Gn(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Ri(t, e) {
  for (var n = Gn(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Qs(t) {
  return function() {
    Ni(this, t);
  };
}
function js(t) {
  return function() {
    Ri(this, t);
  };
}
function to(t, e) {
  return function() {
    (e.apply(this, arguments) ? Ni : Ri)(this, t);
  };
}
function eo(t, e) {
  var n = Ei(t + "");
  if (arguments.length < 2) {
    for (var r = Gn(this.node()), i = -1, a = n.length; ++i < a; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? to : e ? Qs : js)(n, e));
}
function no() {
  this.textContent = "";
}
function ro(t) {
  return function() {
    this.textContent = t;
  };
}
function io(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ao(t) {
  return arguments.length ? this.each(t == null ? no : (typeof t == "function" ? io : ro)(t)) : this.node().textContent;
}
function so() {
  this.innerHTML = "";
}
function oo(t) {
  return function() {
    this.innerHTML = t;
  };
}
function lo(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function co(t) {
  return arguments.length ? this.each(t == null ? so : (typeof t == "function" ? lo : oo)(t)) : this.node().innerHTML;
}
function fo() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function uo() {
  return this.each(fo);
}
function ho() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function po() {
  return this.each(ho);
}
function mo(t) {
  var e = typeof t == "function" ? t : xi(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function go() {
  return null;
}
function _o(t, e) {
  var n = typeof t == "function" ? t : xi(t), r = e == null ? go : typeof e == "function" ? e : qn(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function wo() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function yo() {
  return this.each(wo);
}
function xo() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function vo() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function bo(t) {
  return this.select(t ? vo : xo);
}
function ko(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function $o(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ao(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function To(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, a; n < i; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++r] = a;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Eo(t, e, n) {
  return function() {
    var r = this.__on, i, a = $o(e);
    if (r) {
      for (var s = 0, o = r.length; s < o; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), i = { type: t.type, name: t.name, value: e, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function So(t, e, n) {
  var r = Ao(t + ""), i, a = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, l = o.length, f; c < l; ++c)
        for (i = 0, f = o[c]; i < a; ++i)
          if ((s = r[i]).type === f.type && s.name === f.name)
            return f.value;
    }
    return;
  }
  for (o = e ? Eo : To, i = 0; i < a; ++i) this.each(o(r[i], e, n));
  return this;
}
function Mi(t, e, n) {
  var r = Ti(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function No(t, e) {
  return function() {
    return Mi(this, t, e);
  };
}
function Ro(t, e) {
  return function() {
    return Mi(this, t, e.apply(this, arguments));
  };
}
function Mo(t, e) {
  return this.each((typeof e == "function" ? Ro : No)(t, e));
}
function* Io() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length, s; i < a; ++i)
      (s = r[i]) && (yield s);
}
var Wn = [null];
function _t(t, e) {
  this._groups = t, this._parents = e;
}
function jt() {
  return new _t([[document.documentElement]], Wn);
}
function Do() {
  return this;
}
_t.prototype = jt.prototype = {
  constructor: _t,
  select: as,
  selectAll: ls,
  selectChild: hs,
  selectChildren: gs,
  filter: _s,
  data: ks,
  enter: ws,
  exit: As,
  join: Ts,
  merge: Es,
  selection: Do,
  order: Ss,
  sort: Ns,
  call: Ms,
  nodes: Is,
  node: Ds,
  size: Ls,
  empty: Os,
  each: Fs,
  attr: Ps,
  style: Xs,
  property: Js,
  classed: eo,
  text: ao,
  html: co,
  raise: uo,
  lower: po,
  append: mo,
  insert: _o,
  remove: yo,
  clone: bo,
  datum: ko,
  on: So,
  dispatch: Mo,
  [Symbol.iterator]: Io
};
function Z(t) {
  return typeof t == "string" ? new _t([[document.querySelector(t)]], [document.documentElement]) : new _t([[t]], Wn);
}
function Et(t) {
  return typeof t == "string" ? new _t([document.querySelectorAll(t)], [document.documentElement]) : new _t([vi(t)], Wn);
}
function Xn(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Ii(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function ke() {
}
var _e = 0.7, We = 1 / _e, ie = "\\s*([+-]?\\d+)\\s*", we = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", It = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Lo = /^#([0-9a-f]{3,8})$/, Oo = new RegExp(`^rgb\\(${ie},${ie},${ie}\\)$`), Fo = new RegExp(`^rgb\\(${It},${It},${It}\\)$`), Ho = new RegExp(`^rgba\\(${ie},${ie},${ie},${we}\\)$`), Vo = new RegExp(`^rgba\\(${It},${It},${It},${we}\\)$`), Co = new RegExp(`^hsl\\(${we},${It},${It}\\)$`), Bo = new RegExp(`^hsla\\(${we},${It},${It},${we}\\)$`), dr = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Xn(ke, Kt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: pr,
  // Deprecated! Use color.formatHex.
  formatHex: pr,
  formatHex8: zo,
  formatHsl: Uo,
  formatRgb: mr,
  toString: mr
});
function pr() {
  return this.rgb().formatHex();
}
function zo() {
  return this.rgb().formatHex8();
}
function Uo() {
  return Di(this).formatHsl();
}
function mr() {
  return this.rgb().formatRgb();
}
function Kt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Lo.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? gr(e) : n === 3 ? new xt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Ee(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Ee(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Oo.exec(t)) ? new xt(e[1], e[2], e[3], 1) : (e = Fo.exec(t)) ? new xt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ho.exec(t)) ? Ee(e[1], e[2], e[3], e[4]) : (e = Vo.exec(t)) ? Ee(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Co.exec(t)) ? yr(e[1], e[2] / 100, e[3] / 100, 1) : (e = Bo.exec(t)) ? yr(e[1], e[2] / 100, e[3] / 100, e[4]) : dr.hasOwnProperty(t) ? gr(dr[t]) : t === "transparent" ? new xt(NaN, NaN, NaN, 0) : null;
}
function gr(t) {
  return new xt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Ee(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new xt(t, e, n, r);
}
function Po(t) {
  return t instanceof ke || (t = Kt(t)), t ? (t = t.rgb(), new xt(t.r, t.g, t.b, t.opacity)) : new xt();
}
function Tn(t, e, n, r) {
  return arguments.length === 1 ? Po(t) : new xt(t, e, n, r ?? 1);
}
function xt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Xn(xt, Tn, Ii(ke, {
  brighter(t) {
    return t = t == null ? We : Math.pow(We, t), new xt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? _e : Math.pow(_e, t), new xt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new xt(Zt(this.r), Zt(this.g), Zt(this.b), Xe(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: _r,
  // Deprecated! Use color.formatHex.
  formatHex: _r,
  formatHex8: qo,
  formatRgb: wr,
  toString: wr
}));
function _r() {
  return `#${Xt(this.r)}${Xt(this.g)}${Xt(this.b)}`;
}
function qo() {
  return `#${Xt(this.r)}${Xt(this.g)}${Xt(this.b)}${Xt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function wr() {
  const t = Xe(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Zt(this.r)}, ${Zt(this.g)}, ${Zt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Xe(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Zt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Xt(t) {
  return t = Zt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function yr(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Nt(t, e, n, r);
}
function Di(t) {
  if (t instanceof Nt) return new Nt(t.h, t.s, t.l, t.opacity);
  if (t instanceof ke || (t = Kt(t)), !t) return new Nt();
  if (t instanceof Nt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), a = Math.max(e, n, r), s = NaN, o = a - i, c = (a + i) / 2;
  return o ? (e === a ? s = (n - r) / o + (n < r) * 6 : n === a ? s = (r - e) / o + 2 : s = (e - n) / o + 4, o /= c < 0.5 ? a + i : 2 - a - i, s *= 60) : o = c > 0 && c < 1 ? 0 : s, new Nt(s, o, c, t.opacity);
}
function Go(t, e, n, r) {
  return arguments.length === 1 ? Di(t) : new Nt(t, e, n, r ?? 1);
}
function Nt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Xn(Nt, Go, Ii(ke, {
  brighter(t) {
    return t = t == null ? We : Math.pow(We, t), new Nt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? _e : Math.pow(_e, t), new Nt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new xt(
      un(t >= 240 ? t - 240 : t + 120, i, r),
      un(t, i, r),
      un(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Nt(xr(this.h), Se(this.s), Se(this.l), Xe(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Xe(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${xr(this.h)}, ${Se(this.s) * 100}%, ${Se(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function xr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Se(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function un(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Zn = (t) => () => t;
function Wo(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Xo(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Zo(t) {
  return (t = +t) == 1 ? Li : function(e, n) {
    return n - e ? Xo(e, n, t) : Zn(isNaN(e) ? n : e);
  };
}
function Li(t, e) {
  var n = e - t;
  return n ? Wo(t, n) : Zn(isNaN(t) ? e : t);
}
const Ze = function t(e) {
  var n = Zo(e);
  function r(i, a) {
    var s = n((i = Tn(i)).r, (a = Tn(a)).r), o = n(i.g, a.g), c = n(i.b, a.b), l = Li(i.opacity, a.opacity);
    return function(f) {
      return i.r = s(f), i.g = o(f), i.b = c(f), i.opacity = l(f), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Yo(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - a) + e[i] * a;
    return r;
  };
}
function Ko(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Jo(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), a = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Yn(t[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(o) {
    for (s = 0; s < r; ++s) a[s] = i[s](o);
    return a;
  };
}
function Qo(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function St(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function jo(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Yn(t[i], e[i]) : r[i] = e[i];
  return function(a) {
    for (i in n) r[i] = n[i](a);
    return r;
  };
}
var En = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, hn = new RegExp(En.source, "g");
function tl(t) {
  return function() {
    return t;
  };
}
function el(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Oi(t, e) {
  var n = En.lastIndex = hn.lastIndex = 0, r, i, a, s = -1, o = [], c = [];
  for (t = t + "", e = e + ""; (r = En.exec(t)) && (i = hn.exec(e)); )
    (a = i.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (r = r[0]) === (i = i[0]) ? o[s] ? o[s] += i : o[++s] = i : (o[++s] = null, c.push({ i: s, x: St(r, i) })), n = hn.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? c[0] ? el(c[0].x) : tl(e) : (e = c.length, function(l) {
    for (var f = 0, d; f < e; ++f) o[(d = c[f]).i] = d.x(l);
    return o.join("");
  });
}
function Yn(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Zn(e) : (n === "number" ? St : n === "string" ? (r = Kt(e)) ? (e = r, Ze) : Oi : e instanceof Kt ? Ze : e instanceof Date ? Qo : Ko(e) ? Yo : Array.isArray(e) ? Jo : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? jo : St)(t, e);
}
function nl(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var vr = 180 / Math.PI, Sn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Fi(t, e, n, r, i, a) {
  var s, o, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * r) && (n -= t * c, r -= e * c), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, c /= o), t * r < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(e, t) * vr,
    skewX: Math.atan(c) * vr,
    scaleX: s,
    scaleY: o
  };
}
var Ne;
function rl(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Sn : Fi(e.a, e.b, e.c, e.d, e.e, e.f);
}
function il(t) {
  return t == null || (Ne || (Ne = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ne.setAttribute("transform", t), !(t = Ne.transform.baseVal.consolidate())) ? Sn : (t = t.matrix, Fi(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Hi(t, e, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, f, d, h, u, w) {
    if (l !== d || f !== h) {
      var E = u.push("translate(", null, e, null, n);
      w.push({ i: E - 4, x: St(l, d) }, { i: E - 2, x: St(f, h) });
    } else (d || h) && u.push("translate(" + d + e + h + n);
  }
  function s(l, f, d, h) {
    l !== f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), h.push({ i: d.push(i(d) + "rotate(", null, r) - 2, x: St(l, f) })) : f && d.push(i(d) + "rotate(" + f + r);
  }
  function o(l, f, d, h) {
    l !== f ? h.push({ i: d.push(i(d) + "skewX(", null, r) - 2, x: St(l, f) }) : f && d.push(i(d) + "skewX(" + f + r);
  }
  function c(l, f, d, h, u, w) {
    if (l !== d || f !== h) {
      var E = u.push(i(u) + "scale(", null, ",", null, ")");
      w.push({ i: E - 4, x: St(l, d) }, { i: E - 2, x: St(f, h) });
    } else (d !== 1 || h !== 1) && u.push(i(u) + "scale(" + d + "," + h + ")");
  }
  return function(l, f) {
    var d = [], h = [];
    return l = t(l), f = t(f), a(l.translateX, l.translateY, f.translateX, f.translateY, d, h), s(l.rotate, f.rotate, d, h), o(l.skewX, f.skewX, d, h), c(l.scaleX, l.scaleY, f.scaleX, f.scaleY, d, h), l = f = null, function(u) {
      for (var w = -1, E = h.length, k; ++w < E; ) d[(k = h[w]).i] = k.x(u);
      return d.join("");
    };
  };
}
var al = Hi(rl, "px, ", "px)", "deg)"), sl = Hi(il, ", ", ")", ")"), se = 0, de = 0, ue = 0, Vi = 1e3, Ye, pe, Ke = 0, Jt = 0, sn = 0, ye = typeof performance == "object" && performance.now ? performance : Date, Ci = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Kn() {
  return Jt || (Ci(ol), Jt = ye.now() + sn);
}
function ol() {
  Jt = 0;
}
function Je() {
  this._call = this._time = this._next = null;
}
Je.prototype = Bi.prototype = {
  constructor: Je,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Kn() : +n) + (e == null ? 0 : +e), !this._next && pe !== this && (pe ? pe._next = this : Ye = this, pe = this), this._call = t, this._time = n, Nn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Nn());
  }
};
function Bi(t, e, n) {
  var r = new Je();
  return r.restart(t, e, n), r;
}
function ll() {
  Kn(), ++se;
  for (var t = Ye, e; t; )
    (e = Jt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --se;
}
function br() {
  Jt = (Ke = ye.now()) + sn, se = de = 0;
  try {
    ll();
  } finally {
    se = 0, fl(), Jt = 0;
  }
}
function cl() {
  var t = ye.now(), e = t - Ke;
  e > Vi && (sn -= e, Ke = t);
}
function fl() {
  for (var t, e = Ye, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Ye = n);
  pe = t, Nn(r);
}
function Nn(t) {
  if (!se) {
    de && (de = clearTimeout(de));
    var e = t - Jt;
    e > 24 ? (t < 1 / 0 && (de = setTimeout(br, t - ye.now() - sn)), ue && (ue = clearInterval(ue))) : (ue || (Ke = ye.now(), ue = setInterval(cl, Vi)), se = 1, Ci(br));
  }
}
function kr(t, e, n) {
  var r = new Je();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var ul = yi("start", "end", "cancel", "interrupt"), hl = [], zi = 0, $r = 1, Rn = 2, Be = 3, Ar = 4, Mn = 5, ze = 6;
function on(t, e, n, r, i, a) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  dl(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: ul,
    tween: hl,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: zi
  });
}
function Jn(t, e) {
  var n = Rt(t, e);
  if (n.state > zi) throw new Error("too late; already scheduled");
  return n;
}
function Dt(t, e) {
  var n = Rt(t, e);
  if (n.state > Be) throw new Error("too late; already running");
  return n;
}
function Rt(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function dl(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Bi(a, 0, n.time);
  function a(l) {
    n.state = $r, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var f, d, h, u;
    if (n.state !== $r) return c();
    for (f in r)
      if (u = r[f], u.name === n.name) {
        if (u.state === Be) return kr(s);
        u.state === Ar ? (u.state = ze, u.timer.stop(), u.on.call("interrupt", t, t.__data__, u.index, u.group), delete r[f]) : +f < e && (u.state = ze, u.timer.stop(), u.on.call("cancel", t, t.__data__, u.index, u.group), delete r[f]);
      }
    if (kr(function() {
      n.state === Be && (n.state = Ar, n.timer.restart(o, n.delay, n.time), o(l));
    }), n.state = Rn, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Rn) {
      for (n.state = Be, i = new Array(h = n.tween.length), f = 0, d = -1; f < h; ++f)
        (u = n.tween[f].value.call(t, t.__data__, n.index, n.group)) && (i[++d] = u);
      i.length = d + 1;
    }
  }
  function o(l) {
    for (var f = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(c), n.state = Mn, 1), d = -1, h = i.length; ++d < h; )
      i[d].call(t, f);
    n.state === Mn && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = ze, n.timer.stop(), delete r[e];
    for (var l in r) return;
    delete t.__transition;
  }
}
function pl(t, e) {
  var n = t.__transition, r, i, a = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        a = !1;
        continue;
      }
      i = r.state > Rn && r.state < Mn, r.state = ze, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    a && delete t.__transition;
  }
}
function ml(t) {
  return this.each(function() {
    pl(this, t);
  });
}
function gl(t, e) {
  var n, r;
  return function() {
    var i = Dt(this, t), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var s = 0, o = r.length; s < o; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function _l(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = Dt(this, t), s = a.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var o = { name: e, value: n }, c = 0, l = i.length; c < l; ++c)
        if (i[c].name === e) {
          i[c] = o;
          break;
        }
      c === l && i.push(o);
    }
    a.tween = i;
  };
}
function wl(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Rt(this.node(), n).tween, i = 0, a = r.length, s; i < a; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? gl : _l)(n, t, e));
}
function Qn(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Dt(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Rt(i, r).value[e];
  };
}
function Ui(t, e) {
  var n;
  return (typeof e == "number" ? St : e instanceof Kt ? Ze : (n = Kt(e)) ? (e = n, Ze) : Oi)(t, e);
}
function yl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function xl(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function vl(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function bl(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function kl(t, e, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = o + "", s === c ? null : s === r && c === i ? a : (i = c, a = e(r = s, o)));
  };
}
function $l(t, e, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = o + "", s === c ? null : s === r && c === i ? a : (i = c, a = e(r = s, o)));
  };
}
function Al(t, e) {
  var n = an(t), r = n === "transform" ? sl : Ui;
  return this.attrTween(t, typeof e == "function" ? (n.local ? $l : kl)(n, r, Qn(this, "attr." + t, e)) : e == null ? (n.local ? xl : yl)(n) : (n.local ? bl : vl)(n, r, e));
}
function Tl(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function El(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Sl(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && El(t, a)), n;
  }
  return i._value = e, i;
}
function Nl(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && Tl(t, a)), n;
  }
  return i._value = e, i;
}
function Rl(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = an(t);
  return this.tween(n, (r.local ? Sl : Nl)(r, e));
}
function Ml(t, e) {
  return function() {
    Jn(this, t).delay = +e.apply(this, arguments);
  };
}
function Il(t, e) {
  return e = +e, function() {
    Jn(this, t).delay = e;
  };
}
function Dl(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ml : Il)(e, t)) : Rt(this.node(), e).delay;
}
function Ll(t, e) {
  return function() {
    Dt(this, t).duration = +e.apply(this, arguments);
  };
}
function Ol(t, e) {
  return e = +e, function() {
    Dt(this, t).duration = e;
  };
}
function Fl(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ll : Ol)(e, t)) : Rt(this.node(), e).duration;
}
function Hl(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Dt(this, t).ease = e;
  };
}
function Vl(t) {
  var e = this._id;
  return arguments.length ? this.each(Hl(e, t)) : Rt(this.node(), e).ease;
}
function Cl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Dt(this, t).ease = n;
  };
}
function Bl(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Cl(this._id, t));
}
function zl(t) {
  typeof t != "function" && (t = ki(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], c, l = 0; l < s; ++l)
      (c = a[l]) && t.call(c, c.__data__, l, a) && o.push(c);
  return new Vt(r, this._parents, this._name, this._id);
}
function Ul(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), s = new Array(r), o = 0; o < a; ++o)
    for (var c = e[o], l = n[o], f = c.length, d = s[o] = new Array(f), h, u = 0; u < f; ++u)
      (h = c[u] || l[u]) && (d[u] = h);
  for (; o < r; ++o)
    s[o] = e[o];
  return new Vt(s, this._parents, this._name, this._id);
}
function Pl(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ql(t, e, n) {
  var r, i, a = Pl(e) ? Jn : Dt;
  return function() {
    var s = a(this, t), o = s.on;
    o !== r && (i = (r = o).copy()).on(e, n), s.on = i;
  };
}
function Gl(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Rt(this.node(), n).on.on(t) : this.each(ql(n, t, e));
}
function Wl(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Xl() {
  return this.on("end.remove", Wl(this._id));
}
function Zl(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = qn(t));
  for (var r = this._groups, i = r.length, a = new Array(i), s = 0; s < i; ++s)
    for (var o = r[s], c = o.length, l = a[s] = new Array(c), f, d, h = 0; h < c; ++h)
      (f = o[h]) && (d = t.call(f, f.__data__, h, o)) && ("__data__" in f && (d.__data__ = f.__data__), l[h] = d, on(l[h], e, n, h, l, Rt(f, n)));
  return new Vt(a, this._parents, e, n);
}
function Yl(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = bi(t));
  for (var r = this._groups, i = r.length, a = [], s = [], o = 0; o < i; ++o)
    for (var c = r[o], l = c.length, f, d = 0; d < l; ++d)
      if (f = c[d]) {
        for (var h = t.call(f, f.__data__, d, c), u, w = Rt(f, n), E = 0, k = h.length; E < k; ++E)
          (u = h[E]) && on(u, e, n, E, h, w);
        a.push(h), s.push(f);
      }
  return new Vt(a, s, e, n);
}
var Kl = jt.prototype.constructor;
function Jl() {
  return new Kl(this._groups, this._parents);
}
function Ql(t, e) {
  var n, r, i;
  return function() {
    var a = ae(this, t), s = (this.style.removeProperty(t), ae(this, t));
    return a === s ? null : a === n && s === r ? i : i = e(n = a, r = s);
  };
}
function Pi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function jl(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = ae(this, t);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function tc(t, e, n) {
  var r, i, a;
  return function() {
    var s = ae(this, t), o = n(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(t), ae(this, t))), s === c ? null : s === r && c === i ? a : (i = c, a = e(r = s, o));
  };
}
function ec(t, e) {
  var n, r, i, a = "style." + e, s = "end." + a, o;
  return function() {
    var c = Dt(this, t), l = c.on, f = c.value[a] == null ? o || (o = Pi(e)) : void 0;
    (l !== n || i !== f) && (r = (n = l).copy()).on(s, i = f), c.on = r;
  };
}
function nc(t, e, n) {
  var r = (t += "") == "transform" ? al : Ui;
  return e == null ? this.styleTween(t, Ql(t, r)).on("end.style." + t, Pi(t)) : typeof e == "function" ? this.styleTween(t, tc(t, r, Qn(this, "style." + t, e))).each(ec(this._id, t)) : this.styleTween(t, jl(t, r, e), n).on("end.style." + t, null);
}
function rc(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function ic(t, e, n) {
  var r, i;
  function a() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && rc(t, s, n)), r;
  }
  return a._value = e, a;
}
function ac(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, ic(t, e, n ?? ""));
}
function sc(t) {
  return function() {
    this.textContent = t;
  };
}
function oc(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function lc(t) {
  return this.tween("text", typeof t == "function" ? oc(Qn(this, "text", t)) : sc(t == null ? "" : t + ""));
}
function cc(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function fc(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && cc(i)), e;
  }
  return r._value = t, r;
}
function uc(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, fc(t));
}
function hc() {
  for (var t = this._name, e = this._id, n = qi(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, c, l = 0; l < o; ++l)
      if (c = s[l]) {
        var f = Rt(c, e);
        on(c, t, n, l, s, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new Vt(r, this._parents, t, n);
}
function dc() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, c = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var l = Dt(this, r), f = l.on;
      f !== t && (e = (t = f).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), l.on = e;
    }), i === 0 && a();
  });
}
var pc = 0;
function Vt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function qi() {
  return ++pc;
}
var Ot = jt.prototype;
Vt.prototype = {
  constructor: Vt,
  select: Zl,
  selectAll: Yl,
  selectChild: Ot.selectChild,
  selectChildren: Ot.selectChildren,
  filter: zl,
  merge: Ul,
  selection: Jl,
  transition: hc,
  call: Ot.call,
  nodes: Ot.nodes,
  node: Ot.node,
  size: Ot.size,
  empty: Ot.empty,
  each: Ot.each,
  on: Gl,
  attr: Al,
  attrTween: Rl,
  style: nc,
  styleTween: ac,
  text: lc,
  textTween: uc,
  remove: Xl,
  tween: wl,
  delay: Dl,
  duration: Fl,
  ease: Vl,
  easeVarying: Bl,
  end: dc,
  [Symbol.iterator]: Ot[Symbol.iterator]
};
function mc(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var gc = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: mc
};
function _c(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function wc(t) {
  var e, n;
  t instanceof Vt ? (e = t._id, t = t._name) : (e = qi(), (n = gc).time = Kn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, c, l = 0; l < o; ++l)
      (c = s[l]) && on(c, t, e, l, s, n || _c(c, e));
  return new Vt(r, this._parents, t, e);
}
jt.prototype.interrupt = ml;
jt.prototype.transition = wc;
const In = Math.PI, Dn = 2 * In, Wt = 1e-6, yc = Dn - Wt;
function Gi(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function xc(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Gi;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, a = r.length; i < a; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class vc {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Gi : xc(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, r, i) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(e, n, r, i, a, s) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +a},${this._y1 = +s}`;
  }
  arcTo(e, n, r, i, a) {
    if (e = +e, n = +n, r = +r, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let s = this._x1, o = this._y1, c = r - e, l = i - n, f = s - e, d = o - n, h = f * f + d * d;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (h > Wt) if (!(Math.abs(d * c - l * f) > Wt) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let u = r - s, w = i - o, E = c * c + l * l, k = u * u + w * w, $ = Math.sqrt(E), g = Math.sqrt(h), _ = a * Math.tan((In - Math.acos((E + h - k) / (2 * $ * g))) / 2), m = _ / g, x = _ / $;
      Math.abs(m - 1) > Wt && this._append`L${e + m * f},${n + m * d}`, this._append`A${a},${a},0,0,${+(d * u > f * w)},${this._x1 = e + x * c},${this._y1 = n + x * l}`;
    }
  }
  arc(e, n, r, i, a, s) {
    if (e = +e, n = +n, r = +r, s = !!s, r < 0) throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(i), c = r * Math.sin(i), l = e + o, f = n + c, d = 1 ^ s, h = s ? i - a : a - i;
    this._x1 === null ? this._append`M${l},${f}` : (Math.abs(this._x1 - l) > Wt || Math.abs(this._y1 - f) > Wt) && this._append`L${l},${f}`, r && (h < 0 && (h = h % Dn + Dn), h > yc ? this._append`A${r},${r},0,1,${d},${e - o},${n - c}A${r},${r},0,1,${d},${this._x1 = l},${this._y1 = f}` : h > Wt && this._append`A${r},${r},0,${+(h >= In)},${d},${this._x1 = e + r * Math.cos(a)},${this._y1 = n + r * Math.sin(a)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function bc(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Qe(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function oe(t) {
  return t = Qe(Math.abs(t)), t ? t[1] : NaN;
}
function kc(t, e) {
  return function(n, r) {
    for (var i = n.length, a = [], s = 0, o = t[0], c = 0; i > 0 && o > 0 && (c + o + 1 > r && (o = Math.max(1, r - c)), a.push(n.substring(i -= o, i + o)), !((c += o + 1) > r)); )
      o = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function $c(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var Ac = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function je(t) {
  if (!(e = Ac.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new jn({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
je.prototype = jn.prototype;
function jn(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
jn.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Tc(t) {
  t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+t[n]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var Wi;
function Ec(t, e) {
  var n = Qe(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], a = i - (Wi = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = r.length;
  return a === s ? r : a > s ? r + new Array(a - s + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + Qe(t, Math.max(0, e + a - 1))[0];
}
function Tr(t, e) {
  var n = Qe(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Er = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: bc,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Tr(t * 100, e),
  r: Tr,
  s: Ec,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Sr(t) {
  return t;
}
var Nr = Array.prototype.map, Rr = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Sc(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Sr : kc(Nr.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Sr : $c(Nr.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(d) {
    d = je(d);
    var h = d.fill, u = d.align, w = d.sign, E = d.symbol, k = d.zero, $ = d.width, g = d.comma, _ = d.precision, m = d.trim, x = d.type;
    x === "n" ? (g = !0, x = "g") : Er[x] || (_ === void 0 && (_ = 12), m = !0, x = "g"), (k || h === "0" && u === "=") && (k = !0, h = "0", u = "=");
    var A = E === "$" ? n : E === "#" && /[boxX]/.test(x) ? "0" + x.toLowerCase() : "", y = E === "$" ? r : /[%p]/.test(x) ? s : "", T = Er[x], b = /[defgprs%]/.test(x);
    _ = _ === void 0 ? 6 : /[gprs]/.test(x) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
    function v(p) {
      var D = A, M = y, F, Y, rt;
      if (x === "c")
        M = T(p) + M, p = "";
      else {
        p = +p;
        var it = p < 0 || 1 / p < 0;
        if (p = isNaN(p) ? c : T(Math.abs(p), _), m && (p = Tc(p)), it && +p == 0 && w !== "+" && (it = !1), D = (it ? w === "(" ? w : o : w === "-" || w === "(" ? "" : w) + D, M = (x === "s" ? Rr[8 + Wi / 3] : "") + M + (it && w === "(" ? ")" : ""), b) {
          for (F = -1, Y = p.length; ++F < Y; )
            if (rt = p.charCodeAt(F), 48 > rt || rt > 57) {
              M = (rt === 46 ? i + p.slice(F + 1) : p.slice(F)) + M, p = p.slice(0, F);
              break;
            }
        }
      }
      g && !k && (p = e(p, 1 / 0));
      var S = D.length + p.length + M.length, H = S < $ ? new Array($ - S + 1).join(h) : "";
      switch (g && k && (p = e(H + p, H.length ? $ - M.length : 1 / 0), H = ""), u) {
        case "<":
          p = D + p + M + H;
          break;
        case "=":
          p = D + H + p + M;
          break;
        case "^":
          p = H.slice(0, S = H.length >> 1) + D + p + M + H.slice(S);
          break;
        default:
          p = H + D + p + M;
          break;
      }
      return a(p);
    }
    return v.toString = function() {
      return d + "";
    }, v;
  }
  function f(d, h) {
    var u = l((d = je(d), d.type = "f", d)), w = Math.max(-8, Math.min(8, Math.floor(oe(h) / 3))) * 3, E = Math.pow(10, -w), k = Rr[8 + w / 3];
    return function($) {
      return u(E * $) + k;
    };
  }
  return {
    format: l,
    formatPrefix: f
  };
}
var Re, Xi, Zi;
Nc({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Nc(t) {
  return Re = Sc(t), Xi = Re.format, Zi = Re.formatPrefix, Re;
}
function Rc(t) {
  return Math.max(0, -oe(Math.abs(t)));
}
function Mc(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(oe(e) / 3))) * 3 - oe(Math.abs(t)));
}
function Ic(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, oe(e) - oe(t)) + 1;
}
function Dc(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
function Lc(t) {
  return function() {
    return t;
  };
}
function Oc(t) {
  return +t;
}
var Mr = [0, 1];
function re(t) {
  return t;
}
function Ln(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Lc(isNaN(e) ? NaN : 0.5);
}
function Fc(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function Hc(t, e, n) {
  var r = t[0], i = t[1], a = e[0], s = e[1];
  return i < r ? (r = Ln(i, r), a = n(s, a)) : (r = Ln(r, i), a = n(a, s)), function(o) {
    return a(r(o));
  };
}
function Vc(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), a = new Array(r), s = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    i[s] = Ln(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var c = Ba(t, o, 1, r) - 1;
    return a[c](i[c](o));
  };
}
function Cc(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Bc() {
  var t = Mr, e = Mr, n = Yn, r, i, a, s = re, o, c, l;
  function f() {
    var h = Math.min(t.length, e.length);
    return s !== re && (s = Fc(t[0], t[h - 1])), o = h > 2 ? Vc : Hc, c = l = null, d;
  }
  function d(h) {
    return h == null || isNaN(h = +h) ? a : (c || (c = o(t.map(r), e, n)))(r(s(h)));
  }
  return d.invert = function(h) {
    return s(i((l || (l = o(e, t.map(r), St)))(h)));
  }, d.domain = function(h) {
    return arguments.length ? (t = Array.from(h, Oc), f()) : t.slice();
  }, d.range = function(h) {
    return arguments.length ? (e = Array.from(h), f()) : e.slice();
  }, d.rangeRound = function(h) {
    return e = Array.from(h), n = nl, f();
  }, d.clamp = function(h) {
    return arguments.length ? (s = h ? !0 : re, f()) : s !== re;
  }, d.interpolate = function(h) {
    return arguments.length ? (n = h, f()) : n;
  }, d.unknown = function(h) {
    return arguments.length ? (a = h, d) : a;
  }, function(h, u) {
    return r = h, i = u, f();
  };
}
function zc() {
  return Bc()(re, re);
}
function Uc(t, e, n, r) {
  var i = Ga(t, e, n), a;
  switch (r = je(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(a = Mc(i, s)) && (r.precision = a), Zi(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(a = Ic(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = a - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(a = Rc(i)) && (r.precision = a - (r.type === "%") * 2);
      break;
    }
  }
  return Xi(r);
}
function Pc(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return qa(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return Uc(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, a = r.length - 1, s = r[i], o = r[a], c, l, f = 10;
    for (o < s && (l = s, s = o, o = l, l = i, i = a, a = l); f-- > 0; ) {
      if (l = kn(s, o, n), l === c)
        return r[i] = s, r[a] = o, e(r);
      if (l > 0)
        s = Math.floor(s / l) * l, o = Math.ceil(o / l) * l;
      else if (l < 0)
        s = Math.ceil(s * l) / l, o = Math.floor(o * l) / l;
      else
        break;
      c = l;
    }
    return t;
  }, t;
}
function zt() {
  var t = zc();
  return t.copy = function() {
    return Cc(t, zt());
  }, Dc.apply(t, arguments), Pc(t);
}
function Me(t) {
  return function() {
    return t;
  };
}
const tr = Math.sqrt, Yi = Math.PI, qc = 2 * Yi;
function Gc(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = r;
    }
    return t;
  }, () => new vc(e);
}
const Wc = {
  draw(t, e) {
    const n = tr(e / Yi);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, qc);
  }
}, dn = tr(3), Ki = {
  draw(t, e) {
    const n = -tr(e / (dn * 3));
    t.moveTo(0, n * 2), t.lineTo(-dn * n, -n), t.lineTo(dn * n, -n), t.closePath();
  }
};
function Ji(t, e) {
  let n = null, r = Gc(i);
  t = typeof t == "function" ? t : Me(t || Wc), e = typeof e == "function" ? e : Me(e === void 0 ? 64 : +e);
  function i() {
    let a;
    if (n || (n = a = r()), t.apply(this, arguments).draw(n, +e.apply(this, arguments)), a) return n = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Me(a), i) : t;
  }, i.size = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Me(+a), i) : e;
  }, i.context = function(a) {
    return arguments.length ? (n = a ?? null, i) : n;
  }, i;
}
function me(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
me.prototype = {
  constructor: me,
  scale: function(t) {
    return t === 1 ? this : new me(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new me(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
me.prototype;
function er(t, e, n) {
  let r = 0, i, a;
  if (t.length == 0)
    r = 1;
  else {
    for (let s = 1; s < t.length; s++) {
      for (const o of t[s]) {
        const [c, l] = o.split(":");
        if (n < +c || e > +l)
          a = 1;
        else {
          a = 0;
          break;
        }
      }
      if (a) {
        i = 1, r = s;
        break;
      }
    }
    i || (r = t.length);
  }
  return r;
}
function Qi(t, e) {
  let n = -1, r = -1;
  for (const i of t) {
    const a = i.children;
    a && a.forEach((s) => {
      e.includes(s.type) && ((n < 0 || s.fmin < n) && (n = s.fmin), (r < 0 || s.fmax > r) && (r = s.fmax));
    });
  }
  return {
    fmin: n,
    fmax: r
  };
}
function le(t) {
  const n = t.attr("class").split(" "), r = `.${n[0]}.${n[1]} .track`, i = Et(r).nodes();
  let a = 0;
  return i.forEach((s) => {
    a += s.getBoundingClientRect().height + 1;
  }), a;
}
function ji(t, e) {
  var i;
  const n = ((i = e.node()) == null ? void 0 : i.getBBox().height) ?? 0;
  e.selectAll(
    ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
  ).filter((a) => {
    var o;
    let s = !1;
    return (o = a.alleles) != null && o.length && (a.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((l) => {
      t.includes(l) && (s = !0);
    }), a.alleles.forEach((l) => {
      t.includes(l) && (s = !0);
    })), s;
  }).datum((a) => (a.selected = "true", a)).style("stroke", "black").each(function() {
    let a = Z(this).attr("x"), s = +Z(this).attr("width");
    (s === 0 || Number.isNaN(s)) && (s = 3, a = String(+a - s / 2)), e.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", a).attr("width", s).attr("height", n).attr("fill", "yellow").attr("opacity", 0.8).lower();
  });
}
const Ue = {
  transcript_ablation: {
    impact: "HIGH",
    color: "#ff0000"
  },
  splice_acceptor_variant: {
    impact: "HIGH",
    color: "#ff581a"
  },
  splice_donor_variant: {
    impact: "HIGH",
    color: "#ff581a"
  },
  stop_gained: {
    impact: "HIGH",
    color: "#ff0000"
  },
  frameshift_variant: {
    impact: "HIGH",
    color: "#9400D3"
  },
  stop_lost: {
    impact: "HIGH",
    color: "#ff0000"
  },
  start_lost: {
    impact: "HIGH",
    color: "#ffd700"
  },
  transcript_amplification: {
    impact: "HIGH",
    color: "#ff69b4"
  },
  inframe_insertion: {
    impact: "MODERATE",
    color: "#ff69b4"
  },
  inframe_deletion: {
    impact: "MODERATE",
    color: "#ff69b4"
  },
  missense_variant: {
    impact: "MODERATE",
    color: "#ffd700"
  },
  protein_altering_variant: {
    impact: "MODERATE",
    color: "#ff0080"
  },
  splice_region_variant: {
    impact: "LOW",
    color: "#ff7f50"
  },
  incomplete_terminal_codon_variant: {
    impact: "LOW",
    color: "#ff00ff"
  },
  start_retained_variant: {
    impact: "LOW",
    color: "#76ee00"
  },
  stop_retained_variant: {
    impact: "LOW",
    color: "#76ee00"
  },
  synonymous_variant: {
    impact: "LOW",
    color: "#76ee00"
  },
  coding_sequence_variant: {
    impact: "MODIFIER",
    color: "#458b00"
  },
  mature_miRNA_variant: {
    impact: "MODIFIER",
    color: "#458b00"
  },
  five_prime_UTR_variant: {
    impact: "MODIFIER",
    color: "#7ac5cd"
  },
  three_prime_UTR_variant: {
    impact: "MODIFIER",
    color: "#7ac5cd"
  },
  non_coding_transcript_exon_variant: {
    impact: "MODIFIER",
    color: "#32cd32"
  },
  intron_variant: {
    impact: "MODIFIER",
    color: "#02599c"
  },
  NMD_transcript_variant: {
    impact: "MODIFIER",
    color: "#ff4500"
  },
  non_coding_transcript_variant: {
    impact: "MODIFIER",
    color: "#32cd32"
  },
  upstream_gene_variant: {
    impact: "MODIFIER",
    color: "#a2b5cd"
  },
  downstream_gene_variant: {
    impact: "MODIFIER",
    color: "#a2b5cd"
  },
  TFBS_ablation: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  TFBS_amplification: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  TF_binding_site_variant: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  regulatory_region_ablation: {
    impact: "MODERATE",
    color: "#a52a2a"
  },
  regulatory_region_amplification: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  feature_elongation: {
    impact: "MODIFIER",
    color: "#7f7f7f"
  },
  regulatory_region_variant: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  feature_truncation: {
    impact: "MODIFIER",
    color: "#7f7f7f"
  },
  intergenic_variant: {
    impact: "MODIFIER",
    color: "#636363"
  }
};
function Xc(t) {
  if (!t)
    return "black";
  if (t.split(" ").length > 1)
    return "hotpink";
  if (t === "UNKNOWN")
    return "gray";
  const e = Ue[t];
  return e ? e.color : t === "5_prime_UTR_variant" ? Ue.five_prime_UTR_variant.color : t === "3_prime_UTR_variant" ? Ue.three_prime_UTR_variant.color : (console.warn("Consequence", t, "not found"), "#f0f");
}
const Yt = 10, Bt = 10;
function nr(t) {
  return `${t},${Yt} ${t + Bt / 2},${Yt / 2} ${t},0 ${t - Bt / 2},${Yt / 2}`;
}
function ta(t) {
  return `${t - Bt / 2},${Yt} ${t},0 ${t + Bt / 2},${Yt}`;
}
function Ir(t, e, n) {
  if (t.length == 0)
    return 0;
  {
    let r = !0, i = 0;
    return t.sort((a, s) => a.row > s.row ? 1 : -1), t.every((a) => i != a.row && r ? !1 : (i != a.row && (i = a.row, r = !0), a.fmin > e && a.fmin > n || a.fmax < n && a.fmax < e || (r = !1), !0)), r ? i : i + 1;
  }
}
function ea(t) {
  return `${t - Bt / 2},${Yt} ${t + Bt / 2},${Yt} ${t - Bt / 2},0 ${t + Bt / 2},0`;
}
function Zc(t) {
  const e = Object.keys(t).length;
  return {
    descriptionWidth: Math.max(
      ...Object.entries(t).map((r) => {
        var i;
        return ((i = r[1]) == null ? void 0 : i.length) ?? 0;
      })
    ),
    descriptionHeight: e
  };
}
function Yc(t, e, n) {
  const { fmax: r, fmin: i, type: a } = e;
  return t.findIndex((s) => {
    const o = s.fmin + n, c = s.fmax - n;
    return a !== s.type ? !1 : o <= i && c >= i || c <= r && c >= r || o >= i && c <= r;
  });
}
function Kc(t) {
  const e = [];
  return t.forEach((n) => {
    const r = rr(n), { type: i, fmax: a, fmin: s } = n, o = e.findIndex((c) => {
      const l = c.fmin, f = c.fmax;
      return c.type !== i || c.consequence !== r ? !1 : l <= s && f >= s || f <= a && f >= a || l >= s && f <= a;
    });
    if (o !== -1) {
      const c = e[o], l = e[o].variantSet ? e[o].variantSet.findIndex(
        (f) => f.type === i && f.consequence === r
      ) : -1;
      l >= 0 ? e[l].variantSet.push(n) : e[o].variantSet = [
        // @ts-expect-error
        {
          variants: [n],
          type: i,
          consequence: r
        }
      ], c.variants.push(n), c.fmin = Math.min(s, c.fmin), c.fmax = Math.max(a, c.fmax), e[o] = c;
    } else {
      const c = {
        fmin: s,
        fmax: a,
        type: i,
        consequence: r,
        variantSet: [
          // @ts-expect-error
          {
            variants: [n],
            type: i,
            consequence: r
          }
        ],
        variants: [n]
      };
      e.push(c);
    }
  }), e;
}
function na(t, e) {
  const n = [];
  return t.forEach((r) => {
    const i = rr(r), { type: a, fmax: s, fmin: o } = r, c = Yc(
      n,
      r,
      e
    );
    if (c >= 0 && a != "deletion") {
      const l = n[c], f = l.variantSet ? l.variantSet.findIndex(
        (d) => d.type === a && d.consequence === i
      ) : -1;
      if (f >= 0) {
        const d = Math.min(
          l.variantSet[f].fmin,
          o
        ), h = Math.max(
          l.variantSet[f].fmax,
          s
        );
        l.fmin = d, l.fmax = h, l.variantSet[f].fmin = d, l.variantSet[f].fmax = h, l.variantSet[f].variants.push(r);
      } else {
        const d = Math.min(l.fmin, o), h = Math.max(l.fmax, s);
        l.fmin = d, l.fmax = h, l.variantSet.push({
          variants: [r],
          type: a,
          consequence: i,
          fmin: o,
          fmax: s
        });
      }
      l.variants.push(r), l.fmin = Math.min(o, l.fmin), l.fmax = Math.max(s, l.fmax), n[c] = l;
    } else
      n.push({
        fmin: o,
        fmax: s,
        type: a,
        consequence: i,
        variantSet: [
          // @ts-expect-error
          {
            variants: [r],
            type: a,
            consequence: i,
            fmin: o,
            fmax: s
          }
        ],
        variants: [r]
      });
  }), n;
}
function On(t) {
  if (t.length === 1) {
    let e = '<div style="margin-top: 30px;">';
    return e += Dr(t[0]), e += "</div>", e;
  } else if (t.length > 1) {
    let e = '<ul style="list-style-type: none; margin-top: 30px;">';
    for (const n of t)
      e += `<li style="border-bottom: solid 1px black;">${Dr(n)}</li>`;
    return e += "</ul>", e;
  } else
    return "No data available";
}
function Dr(t) {
  const { descriptionWidth: e } = Zc(t);
  let n = "";
  const r = t.location, [i, a] = r.split(":")[1].split("..");
  let s = t.alternative_alleles, o = t.reference_allele, c;
  if (t.type === "SNV")
    c = "1bp";
  else if (t.type === "deletion")
    c = `${o.length - 1}bp deleted`;
  else if (t.type === "insertion")
    s === "ALT_MISSING" ? (c = "unknown length inserted", s = "n+") : c = `${s.length - 1}bp inserted`;
  else if (t.type === "MNV")
    c = `${o.length}bp`;
  else if (t.type === "delins") {
    const f = `${o.length - 1}bp deleted`;
    let d;
    s === "ALT_MISSING" ? (d = "unknown length inserted", s = "n+") : d = `${s.length - 1}bp inserted`, c = `${f}; ${d}`;
  } else
    c = `${+a - +i}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let l = "";
  return t.type === "insertion" ? l = `ins: ${s}` : t.type === "deletion" ? l = `del: ${o}` : l = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td>${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${c}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td>${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${l}</td></tr>`), n += "</tbody></table>", n;
}
function Fn(t) {
  return t.variants.map((e) => {
    const n = Jc(e);
    return {
      ...n,
      consequence: n.consequence || "UNKNOWN"
    };
  });
}
function Lr(t) {
  return t.variants.flatMap((e) => {
    var r;
    const n = (r = e.allele_ids) == null ? void 0 : r.values[0].replace(/"/g, "");
    return n == null ? void 0 : n.split(",").map((i) => i.replace(/\[|\]| /g, ""));
  }).filter((e) => !!e);
}
function Hn(t) {
  return t.map((e) => Xc(e.consequence));
}
function rr(t) {
  var n;
  let e = "UNKNOWN";
  return (n = t.geneLevelConsequence) != null && n.values && t.geneLevelConsequence.values.length > 0 && (e = t.geneLevelConsequence.values[0].replace(/\|/g, " ").replace(/"/g, "")), e;
}
function Ie(t) {
  return (Array.isArray(t == null ? void 0 : t.values) ? t.values.join(" ") : t == null ? void 0 : t.values) ?? "";
}
function Jc(t) {
  var e, n;
  return {
    symbol: xe(t),
    symbolDetail: ra(t),
    location: `${t.seqId}:${t.fmin}..${t.fmax}`,
    consequence: rr(t),
    type: t.type,
    name: t.name,
    description: t.description,
    reference_allele: t.reference_allele,
    geneId: (e = t.allele_of_gene_ids) == null ? void 0 : e.values[0].replace(/"/g, ""),
    geneSymbol: (n = t.allele_of_gene_symbols) == null ? void 0 : n.values[0].replace(/"/g, ""),
    allele_of_genes: Ie(t.allele_of_genes),
    allele_ids: Ie(t.allele_ids),
    alternative_alleles: Ie(t.alternative_alleles),
    impact: Ie(t.impact)
  };
}
function ra(t) {
  var e, n, r;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : ra(t.variants[0]);
  if ((e = t.allele_symbols) != null && e.values)
    if (t.allele_symbols.values[0].split(",").length > 1)
      try {
        const i = [], a = t.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          ""
        ), s = ((n = t.allele_ids) == null ? void 0 : n.values[0].replace(/"|\[|\]/g, "")) ?? "", o = a.split(","), c = s.split(",");
        for (let l = 0; l < c.length; l++)
          i.push(
            `${o[l].trim()} (${c[l].trim()})`
          );
        return i.join(", ");
      } catch (i) {
        return console.error(i), `${t.allele_symbols.values[0].split(",").length}`;
      }
    else
      return `${t.allele_symbols.values[0].replace(/"/g, "")}(${(r = t.allele_ids) == null ? void 0 : r.values[0].replace(
        /"|\[|\]/g,
        ""
      )})`;
  return "";
}
function xe(t) {
  var e;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : xe(t.variants[0]);
  if ((e = t.allele_symbols_text) != null && e.values) {
    const n = t.allele_symbols_text.values[0].split(",");
    return n.length > 1 ? `${n.length}` : t.allele_symbols_text.values[0].replace(/"/g, "");
  }
  return "";
}
function Qc(t) {
  const e = [];
  for (const n of t)
    n.type.toLowerCase() === "deletion" || (n.type.toLowerCase() === "snv" || n.type.toLowerCase() === "point_mutation" ? e.push("snv") : n.type.toLowerCase() === "insertion" ? e.push("insertion") : (n.type.toLowerCase() === "delins" || n.type.toLowerCase() === "substitution" || n.type.toLowerCase() === "indel" || n.type.toLowerCase() === "mnv") && e.push("delins"));
  return [...new Set(e)].sort();
}
function Vn(t, e) {
  return `<svg width="15" top="3" viewBox="0 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><rect fill="${t}" stroke="none" height="10" width="10"></svg>${e}</polygons></svg>`;
}
function nt(t) {
  return t == "unknown" ? Vn("grey", t.replace(/_/g, " ")) : Vn(
    Ue[t].color,
    t.replace(/_/g, " ")
  );
}
function jc() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${nr(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Vn("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ta(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ea(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${nt("transcript_ablation")}</li>`, t += `<li>${nt("splice_acceptor_variant")}</li>`, t += `<li>${nt("splice_donor_variant")}</li>`, t += `<li>${nt("stop_gained")}</li>`, t += `<li>${nt("frameshift_variant")}</li>`, t += `<li>${nt("stop_lost")}</li>`, t += `<li>${nt("start_lost")}</li>`, t += `<li>${nt("inframe_insertion")}</li>`, t += `<li>${nt("inframe_deletion")}</li>`, t += `<li>${nt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${nt("protein_altering_variant")}</li>`, t += `<li>${nt("splice_region_variant")}</li>`, t += `<li>${nt("start_retained_variant")}</li>`, t += `<li>${nt("stop_retained_variant")}</li>`, t += `<li>${nt("synonymous_variant")}</li>`, t += `<li>${nt("coding_sequence_variant")}</li>`, t += `<li>${nt("five_prime_UTR_variant")}</li>`, t += `<li>${nt("three_prime_UTR_variant")}</li>`, t += `<li>${nt("intron_variant")}</li>`, t += `<li>${nt("non_coding_transcript_variant")}</li>`, t += `<li>${nt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
function tf(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function lt(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${tf(t.strand)})</td></tr>`, e += "</tbody></table>", e;
}
function ia(t, e, n, r) {
  let i = "";
  if (t === "FlyBase")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FDrosophila%20melanogaster&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "MGI")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FMus%20musculus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "WormBase")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FCaenorhabditis%20elegans&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "ZFIN")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FDanio%20rerio&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "SGD")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FSaccharomyces%20cerevisiae&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "RGD")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FRattus%20norvegicus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else if (t === "human")
    i = `https://alliancegenome.org/jbrowse/?data=data%2FHomo%20sapiens&tracks=All%20Genes&highlight=&loc=${e}%3A${n}..${r}`;
  else
    return console.warn("no source found", t), "Maximum features displayed.  See full view for more.";
  return `<a href="${i}">Maximum features displayed.  See full view for more.</a>`;
}
class ef {
  constructor({
    viewer: e,
    height: n,
    width: r,
    transcriptTypes: i,
    variantTypes: a,
    showVariantLabel: s,
    variantFilter: o,
    binRatio: c,
    isoformFilter: l,
    initialHighlight: f,
    trackData: d,
    variantData: h,
    region: u
  }) {
    this.region = u, this.trackData = d ?? [], this.variantData = h ?? [], this.viewer = e, this.width = r, this.variantFilter = o, this.isoformFilter = l, this.initialHighlight = f, this.height = n, this.transcriptTypes = i, this.variantTypes = a, this.binRatio = c, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.variantData, n = this.trackData, r = this.isoformFilter;
    let i = n;
    const a = this.initialHighlight, s = this.filterVariantData(
      e,
      this.variantFilter
    ), o = this.viewer, c = this.width, l = this.binRatio, f = Qc(s), d = f.length, h = n[0].source, u = n[0].seqId, w = r.length === 0 ? 9 : 30, E = ["UTR", "five_prime_UTR", "three_prime_UTR"], k = ["CDS"], $ = ["exon"], g = this.transcriptTypes, _ = Qi(i, g), m = _.fmin, x = _.fmax, A = 10, y = 10, T = 40, b = 20, v = 2, p = 0, D = 10, M = 10, F = 4, Y = 20, rt = 10, it = `0,0 0,${Y} ${rt},${rt}`, S = 10, H = 40, kt = 22.5, L = zt().domain([m, x]).range([0, c]), O = o.append("g").attr("class", "deletions track").attr("transform", "translate(0,22.5)"), vt = o.append("g").attr("class", "label"), Q = {};
    for (let V = 0, R = E.length; V < R; V++)
      Q[E[V]] = 200;
    for (let V = 0, R = k.length; V < R; V++)
      Q[k[V]] = 1e3;
    for (let V = 0, R = $.length; V < R; V++)
      Q[$[V]] = 100;
    const ft = {};
    i = i.sort((V, R) => V.selected && !R.selected ? -1 : !V.selected && R.selected ? 1 : V.name.localeCompare(R.name));
    let ct = 0;
    const U = Z("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), j = () => {
      U.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, Lt = na(
      s,
      (x - m) * l
    ), ut = Lt.filter((V) => V.type == "deletion"), B = Lt.filter((V) => V.type !== "deletion"), at = [];
    ut.forEach((V) => {
      var yt;
      const { fmax: R, fmin: G } = V, C = this.width, mt = xe(V), I = Fn(V), ht = Lr(V), ot = On(I), q = Hn(I)[0];
      at.push({
        fmin: G,
        fmax: R,
        row: Ir(at, G, R)
      });
      const gt = Math.max(Math.ceil(L(R) - L(G)), v);
      O.append("rect").attr("class", "variant-deletion").attr("id", `variant-${G}`).attr("x", L(G)).attr(
        "transform",
        `translate(0,${M * Ir(at, G, R)})`
      ).attr("z-index", 30).attr("fill", q).attr("height", M).attr("width", gt).on("click", () => {
        X(U, ot, j);
      }).on("mouseover", (K) => {
        const dt = K.variant;
        Et(
          ".variant-deletion"
        ).filter((z) => z.variant === dt).style("stroke", "black"), Z(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((z) => z.variant === dt).style("opacity", 1);
      }).on("mouseout", () => {
        Et(".variant-deletion").filter((K) => K.selected !== "true").style("stroke", null), Z(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: G,
        fmax: R,
        variant: mt + G,
        alleles: ht
      });
      {
        let K = 0;
        K = L(G);
        const dt = M * d + kt, z = vt.append("text").attr("class", "variantLabel").attr("fill", q).attr("opacity", 0).attr("height", p).attr("transform", `translate(${K},${dt})`).text(mt).on("click", () => {
          X(U, ot, j);
        }).datum({ fmin: G, variant: mt + G }), tt = ((yt = z.node()) == null ? void 0 : yt.getBBox().width) ?? 0;
        if (tt + K > C) {
          const et = tt + K - C;
          K -= et, z.attr(
            "transform",
            `translate(${K},${dt})`
          );
        }
      }
    });
    const Tt = le(this.viewer), wt = o.append("g").attr("class", "variants track").attr("transform", `translate(0,${Tt})`);
    B.forEach((V) => {
      var dt;
      const { type: R, fmax: G, fmin: C } = V;
      let mt = !0, I = !1;
      const ht = this.width, ot = xe(V), q = Fn(V), gt = Lr(V), yt = On(q), K = Hn(q)[0];
      if (R.toLowerCase() === "snv" || R.toLowerCase() === "point_mutation" ? (I = !0, wt.append("polygon").attr("class", "variant-SNV").attr("id", `variant-${C}`).attr("points", nr(L(C))).attr("fill", K).attr("x", L(C)).attr(
        "transform",
        `translate(0,${M * f.indexOf("snv")})`
      ).attr("z-index", 30).on("click", () => {
        X(U, yt, j);
      }).on("mouseover", function(z) {
        const tt = z.variant;
        Et(
          ".variant-SNV"
        ).filter((et) => et.variant === tt).style("stroke", "black"), Z(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((et) => et.variant === tt).style("opacity", 1);
      }).on("mouseout", () => {
        Et(".variant-SNV").filter((z) => z.selected != "true").style("stroke", null), Z(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: C,
        fmax: G,
        variant: ot + C,
        alleles: gt
      })) : R.toLowerCase() === "insertion" ? (I = !0, wt.append("polygon").attr("class", "variant-insertion").attr("id", `variant-${C}`).attr("points", ta(L(C))).attr("fill", K).attr("x", L(C)).attr(
        "transform",
        `translate(0,${M * f.indexOf("insertion")})`
      ).attr("z-index", 30).on("click", () => {
        X(U, yt, j);
      }).on("mouseover", (z) => {
        const tt = z.variant;
        Et(
          ".variant-insertion"
        ).filter((et) => et.variant === tt).style("stroke", "black"), Z(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((et) => et.variant === tt).style("opacity", 1);
      }).on("mouseout", () => {
        Et(
          ".variant-insertion"
        ).filter((z) => z.selected != "true").style("stroke", null), Z(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: C,
        fmax: G,
        variant: ot + C,
        alleles: gt
      })) : R.toLowerCase() === "delins" || R.toLowerCase() === "substitution" || R.toLowerCase() === "indel" || R.toLowerCase() === "mnv" ? (I = !0, wt.append("polygon").attr("class", "variant-delins").attr("id", `variant-${C}`).attr("points", ea(L(C))).attr("x", L(C)).attr(
        "transform",
        `translate(0,${M * f.indexOf("delins")})`
      ).attr("fill", K).attr("z-index", 30).on("click", () => {
        X(U, yt, j);
      }).on("mouseover", (z) => {
        const tt = z.variant;
        Et(
          ".variant-delins"
        ).filter((et) => et.variant === tt).style("stroke", "black"), Z(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((et) => et.variant === tt).style("opacity", 1);
      }).on("mouseout", () => {
        Et(".variant-delins").filter((z) => z.selected != "true").style("stroke", null), Z(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: C,
        fmax: G,
        variant: ot + C,
        alleles: gt
      })) : (console.warn("type not found", R, V), mt = !1), mt) {
        let z = 0;
        z = I ? L(C) - S / 2 : L(C);
        const tt = M * d + kt, et = vt.append("text").attr("class", "variantLabel").attr("fill", K).attr("opacity", 0).attr("height", p).attr("transform", `translate(${z},${tt})`).text(ot).on("click", () => {
          X(U, yt, j);
        }).datum({ fmin: C, variant: ot + C }), P = ((dt = et.node()) == null ? void 0 : dt.getBBox().width) ?? 0;
        if (P + z > ht) {
          const Ct = P + z - ht;
          z -= Ct, et.attr("transform", `translate(${z},35)`);
        }
      }
    });
    const Ut = Tt;
    vt.attr("transform", `translate(0,${Ut})`);
    const N = le(this.viewer) + kt, pt = o.append("g").attr("transform", `translate(0,${N})`).attr("class", "track");
    let W = 0;
    const st = [];
    let Pt = -1, ee = -1;
    const X = this.renderTooltipDescription, qt = [];
    for (let V = 0; V < i.length && W < w; V++) {
      const R = i[V];
      let G = R.children;
      if (G) {
        const C = R.selected;
        G = G.sort(
          (I, ht) => I.name.localeCompare(ht.name)
        );
        let mt = !1;
        G.forEach((I) => {
          var ot;
          if (!(r.includes(I.id) || r.includes(I.name)) && r.length !== 0 || qt.includes(I.id))
            return;
          qt.push(I.id);
          const ht = I.type;
          if (g.includes(ht)) {
            let q = er(
              st,
              L(I.fmin),
              L(I.fmax)
            );
            if (W < w) {
              let gt = "", yt, K = !1;
              const dt = R.name;
              Object.keys(ft).includes(dt) || (ct += b, K = !0, ft[dt] = "Green");
              const z = pt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${W * T + 10 + ct})`
              );
              K && (gt = dt, yt = z.append("text").attr("class", "geneLabel").attr("fill", C ? "sandybrown" : "black").attr("height", p).attr(
                "transform",
                `translate(${L(I.fmin)},-${b})`
              ).text(gt).on("click", () => {
                X(
                  U,
                  lt(R),
                  j
                );
              }).datum({
                fmin: I.fmin
              })), z.append("polygon").datum(() => ({
                fmin: I.fmin,
                fmax: I.fmax,
                strand: R.strand
              })).attr("class", "transArrow").attr("points", it).attr(
                "transform",
                (P) => R.strand > 0 ? `translate(${Number(L(P.fmax))},0)` : `translate(${Number(L(P.fmin))},${Y}) rotate(180)`
              ).on("click", () => {
                X(
                  U,
                  lt(I),
                  j
                );
              }), z.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + p).attr("height", F).attr("transform", `translate(${L(I.fmin)},0)`).attr("width", L(I.fmax) - L(I.fmin)).on("click", () => {
                X(
                  U,
                  lt(I),
                  j
                );
              }).datum({
                fmin: I.fmin,
                fmax: I.fmax
              }), gt = I.name, yt = z.append("text").attr("class", "transcriptLabel").attr("fill", C ? "sandybrown" : "gray").attr("opacity", C ? 1 : 0.5).attr("height", p).attr("transform", `translate(${L(I.fmin)},0)`).text(gt).on("click", () => {
                X(
                  U,
                  lt(I),
                  j
                );
              }).datum({
                fmin: I.fmin
              });
              let tt = gt.length * 2;
              try {
                tt = ((ot = yt.node()) == null ? void 0 : ot.getBBox().width) ?? 0;
              } catch {
              }
              Number(tt + L(I.fmin)) > c;
              const et = tt > L(I.fmax) - L(I.fmin) ? L(I.fmin) + tt : L(I.fmax);
              if (st[q]) {
                const P = st[q];
                P.push(`${L(I.fmin)}:${et}`), st[q] = P;
              } else
                st[q] = [
                  `${L(I.fmin)}:${et}`
                ];
              (Pt < 0 || Pt > I.fmin) && (Pt = I.fmin), (ee < 0 || ee < I.fmax) && (ee = I.fmax), I.children && (I.children = I.children.sort((P, Ct) => {
                const $e = Q[P.type], Ae = Q[Ct.type];
                return typeof $e == "number" && typeof Ae == "number" ? $e - Ae : typeof $e == "number" && typeof Ae != "number" ? -1 : typeof $e != "number" && typeof Ae == "number" ? 1 : P.type.localeCompare(Ct.type);
              }), I.children.forEach((P) => {
                const Ct = P.type;
                $.includes(Ct) ? z.append("rect").attr("class", "exon").attr("x", L(P.fmin)).attr(
                  "transform",
                  `translate(0,${A - F})`
                ).attr("height", A).attr("z-index", 10).attr("width", L(P.fmax) - L(P.fmin)).on("click", () => {
                  X(
                    U,
                    lt(I),
                    j
                  );
                }).datum({ fmin: P.fmin, fmax: P.fmax }) : k.includes(Ct) ? z.append("rect").attr("class", "CDS").attr("x", L(P.fmin)).attr(
                  "transform",
                  `translate(0,${y - F})`
                ).attr("z-index", 20).attr("height", y).attr("width", L(P.fmax) - L(P.fmin)).on("click", () => {
                  X(
                    U,
                    lt(I),
                    j
                  );
                }).datum({ fmin: P.fmin, fmax: P.fmax }) : E.includes(Ct) && z.append("rect").attr("class", "UTR").attr("x", L(P.fmin)).attr(
                  "transform",
                  `translate(0,${D - F})`
                ).attr("z-index", 20).attr("height", D).attr("width", L(P.fmax) - L(P.fmin)).on("click", () => {
                  X(
                    U,
                    lt(I),
                    j
                  );
                }).datum({ fmin: P.fmin, fmax: P.fmax });
              })), W += 1;
            }
            if (W === w && !mt) {
              const gt = ia(h, u, m, x);
              ++q, mt = !0, pt.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${W * T + 20 + ct})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", p).html(gt);
            }
          }
        });
      }
    }
    return a && ji(a, o), W === 0 && pt.append("text").attr("x", 30).attr("y", p + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), W * T + ct + H;
  }
  filterVariantData(e, n) {
    return n.length === 0 ? e : e.filter((r) => {
      var a, s, o, c;
      let i = !1;
      try {
        (n.includes(r.name) || (a = r.allele_symbols) != null && a.values && n.includes(
          r.allele_symbols.values[0].replace(/"/g, "")
        ) || (s = r.symbol) != null && s.values && n.includes(r.symbol.values[0].replace(/"/g, "")) || (o = r.symbol_text) != null && o.values && n.includes(r.symbol_text.values[0].replace(/"/g, ""))) && (i = !0), (((c = r.allele_ids) == null ? void 0 : c.values[0].replace(/"|\[|\]| /g, "").split(",")) ?? []).forEach((f) => {
          n.includes(f) && (i = !0);
        });
      } catch (l) {
        console.error(
          "error processing filter with so returning anyway",
          n,
          r,
          l
        ), i = !0;
      }
      return i;
    });
  }
  renderTooltipDescription(e, n, r) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      r();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      r();
    });
  }
  setInitialHighlight(e, n) {
    var a;
    const r = ((a = n.node()) == null ? void 0 : a.getBBox().height) ?? 0;
    n.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((s) => {
      let o = !1;
      return s.alleles && (s.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((l) => {
        e.includes(l) && (o = !0);
      }), s.alleles.forEach((l) => {
        e.includes(l) && (o = !0);
      })), o;
    }).datum((s) => (s.selected = "true", s)).style("stroke", "black").each(function() {
      const s = +(Z(this).attr("width") || 3), o = +Z(this).attr("x") - s / 2;
      n.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", o).attr("width", s).attr("height", r).attr("fill", "yellow").attr("opacity", 0.8).lower();
    });
  }
}
class nf {
  constructor({
    viewer: e,
    height: n,
    width: r,
    transcriptTypes: i,
    variantTypes: a,
    showVariantLabel: s,
    variantFilter: o,
    trackData: c,
    variantData: l
  }) {
    this.trackData = c ?? [], this.variantData = l ?? [], this.viewer = e, this.width = r, this.variantFilter = o, this.height = n, this.transcriptTypes = i, this.variantTypes = a, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.variantData;
    let r = this.trackData;
    const i = this.filterVariantData(
      e,
      this.variantFilter
    ), a = this.viewer, s = this.width, o = this.showVariantLabel, c = ["UTR", "five_prime_UTR", "three_prime_UTR"], l = ["CDS"], f = ["exon"], d = this.transcriptTypes, h = Qi(r, d), u = h.fmin, w = h.fmax, E = 10, k = 10, $ = 10, g = 40, _ = 20, m = 2, x = 0, A = 10, y = 10, T = 20, b = 4, v = 20, p = 10, D = `0,0 0,${v} ${p},${p}`, M = 10, F = 10, Y = (B) => `${B - F / 2},${M} ${B},0 ${B + F / 2},${M}`, rt = (B) => `${B - F / 2},${M} ${B + F / 2},${M} ${B - F / 2},0 ${B + F / 2},0`, it = (B) => `${B},${M} ${B + F / 2},${M / 2} ${B},0 ${B - F / 2},${M / 2}`, S = zt().domain([u, w]).range([0, s]), H = le(this.viewer), kt = a.append("g").attr("transform", `translate(0,${H})`).attr("class", "track"), L = {};
    for (const B of c)
      L[B] = 200;
    for (const B of l)
      L[B] = 1e3;
    for (const B of f)
      L[B] = 100;
    const O = {};
    r = r.sort((B, at) => B.selected && !at.selected ? -1 : !B.selected && at.selected ? 1 : B.name - at.name);
    let vt = 0;
    const Q = Z("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), ft = () => {
      Q.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let ct = 0;
    const U = [];
    let j = -1, Lt = -1;
    const ut = this.renderTooltipDescription;
    for (let B = 0; B < r.length && ct < E; B++) {
      const at = r[B];
      let Tt = at.children;
      if (Tt) {
        const wt = at.selected;
        Tt = Tt.sort((N, pt) => N.name < pt.name ? -1 : N.name > pt.name ? 1 : N - pt);
        let Ut = !1;
        Tt.forEach((N) => {
          const pt = N.type;
          if (d.includes(pt)) {
            let W = er(
              U,
              S(N.fmin),
              S(N.fmax)
            );
            if (ct < E) {
              let st, Pt, ee = !1;
              Object.keys(O).includes(at.name) || (vt += _, ee = !0, O[at.name] = "Green");
              const X = kt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ct * g + 10 + vt})`
              );
              ee && (st = at.name, Pt = X.append("text").attr("class", "geneLabel").attr("fill", wt ? "sandybrown" : "black").attr("height", x).attr(
                "transform",
                `translate(${S(N.fmin)},-${_})`
              ).text(st).on("click", () => {
                ut(
                  Q,
                  lt(at),
                  ft
                );
              }).datum({ fmin: N.fmin })), X.append("polygon").datum(() => ({
                fmin: N.fmin,
                fmax: N.fmax,
                strand: at.strand
              })).attr("class", "transArrow").attr("points", D).attr("transform", (R) => at.strand > 0 ? `translate(${Number(S(R.fmax))},0)` : `translate(${Number(S(R.fmin))},${v}) rotate(180)`).on("click", () => {
                ut(
                  Q,
                  lt(N),
                  ft
                );
              }), X.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + x).attr("height", b).attr("transform", `translate(${S(N.fmin)},0)`).attr("width", S(N.fmax) - S(N.fmin)).on("click", () => {
                ut(
                  Q,
                  lt(N),
                  ft
                );
              }).datum({ fmin: N.fmin, fmax: N.fmax }), st = N.name, Pt = X.append("text").attr("class", "transcriptLabel").attr("fill", wt ? "sandybrown" : "gray").attr("opacity", wt ? 1 : 0.5).attr("height", x).attr("transform", `translate(${S(N.fmin)},0)`).text(st).on("click", () => {
                ut(
                  Q,
                  lt(N),
                  ft
                );
              }).datum({ fmin: N.fmin });
              let qt = st.length * 2;
              try {
                qt = Pt.node().getBBox().width;
              } catch {
              }
              Number(qt + S(N.fmin)) > s;
              const V = qt > S(N.fmax) - S(N.fmin) ? S(N.fmin) + qt : S(N.fmax);
              if (U[W]) {
                const R = U[W];
                R.push(`${S(N.fmin)}:${V}`), U[W] = R;
              } else
                U[W] = [
                  `${S(N.fmin)}:${V}`
                ];
              (j < 0 || j > N.fmin) && (j = N.fmin), (Lt < 0 || Lt < N.fmax) && (Lt = N.fmax), N.children && (N.children = N.children.sort((R, G) => {
                const C = L[R.type], mt = L[G.type];
                return typeof C == "number" && typeof mt == "number" ? C - mt : typeof C == "number" && typeof mt != "number" ? -1 : typeof C != "number" && typeof mt == "number" ? 1 : R.type - G.type;
              }), N.children.forEach((R) => {
                const G = R.type;
                let C = !1;
                if (f.includes(G) ? (C = !0, X.append("rect").attr("class", "exon").attr("x", S(R.fmin)).attr(
                  "transform",
                  `translate(0,${k - b})`
                ).attr("height", k).attr("z-index", 10).attr("width", S(R.fmax) - S(R.fmin)).on("click", () => {
                  ut(
                    Q,
                    lt(N),
                    ft
                  );
                }).datum({ fmin: R.fmin, fmax: R.fmax })) : l.includes(G) ? (C = !0, X.append("rect").attr("class", "CDS").attr("x", S(R.fmin)).attr(
                  "transform",
                  `translate(0,${$ - b})`
                ).attr("z-index", 20).attr("height", $).attr("width", S(R.fmax) - S(R.fmin)).on("click", () => {
                  ut(
                    Q,
                    lt(N),
                    ft
                  );
                }).datum({ fmin: R.fmin, fmax: R.fmax })) : c.includes(G) && (C = !0, X.append("rect").attr("class", "UTR").attr("x", S(R.fmin)).attr(
                  "transform",
                  `translate(0,${A - b})`
                ).attr("z-index", 20).attr("height", A).attr("width", S(R.fmax) - S(R.fmin)).on("click", () => {
                  ut(
                    Q,
                    lt(N),
                    ft
                  );
                }).datum({ fmin: R.fmin, fmax: R.fmax })), C) {
                  const mt = na(
                    i,
                    // NOTE: made up value
                    1
                  );
                  Kc(i), mt.forEach((I) => {
                    const { type: ht, fmax: ot, fmin: q } = I;
                    if (q < R.fmin && ot > R.fmin || ot > R.fmax && q < R.fmax || ot <= R.fmax && q >= R.fmin) {
                      let gt = !0;
                      const yt = Fn(I), K = Hn(yt)[0], dt = On(yt), z = Math.max(
                        Math.ceil(S(ot) - S(q)),
                        m
                      );
                      if (ht.toLowerCase() === "deletion" || ht.toLowerCase() === "mnv" ? X.append("rect").attr("class", "variant-deletion").attr("x", S(q)).attr(
                        "transform",
                        `translate(0,${T - b})`
                      ).attr("z-index", 30).attr("fill", K).attr("height", y).attr("width", z).on("click", () => {
                        ut(
                          Q,
                          dt,
                          ft
                        );
                      }).datum({ fmin: q, fmax: ot }) : ht.toLowerCase() === "snv" || ht.toLowerCase() === "point_mutation" ? X.append("polygon").attr("class", "variant-SNV").attr("points", it(S(q))).attr("fill", K).attr("x", S(q)).attr(
                        "transform",
                        `translate(0,${T - b})`
                      ).attr("z-index", 30).on("click", () => {
                        ut(
                          Q,
                          dt,
                          ft
                        );
                      }).datum({ fmin: q, fmax: ot }) : ht.toLowerCase() === "insertion" ? X.append("polygon").attr("class", "variant-insertion").attr("points", Y(S(q))).attr("fill", K).attr("x", S(q)).attr(
                        "transform",
                        `translate(0,${T - b})`
                      ).attr("z-index", 30).on("click", () => {
                        ut(
                          Q,
                          dt,
                          ft
                        );
                      }).datum({ fmin: q, fmax: ot }) : ht.toLowerCase() === "delins" || ht.toLowerCase() === "substitution" || ht.toLowerCase() === "indel" ? X.append("polygon").attr("class", "variant-delins").attr("points", rt(S(q))).attr("x", S(q)).attr(
                        "transform",
                        `translate(0,${T - b})`
                      ).attr("fill", K).attr("z-index", 30).on("click", () => {
                        ut(
                          Q,
                          dt,
                          ft
                        );
                      }).datum({ fmin: q, fmax: ot }) : (console.warn("type not found", ht, I), gt = !1), gt && o) {
                        const tt = xe(I), et = tt.length || 1;
                        X.append("text").attr("class", "variantLabel").attr(
                          "fill",
                          wt ? "sandybrown" : K
                        ).attr("opacity", wt ? 1 : 0.5).attr("height", x).attr(
                          "transform",
                          `translate(${S(q - et / 2 * 100)},${T * 2.2 - b})`
                        ).html(tt).on("click", () => {
                          ut(
                            Q,
                            dt,
                            ft
                          );
                        }).datum({ fmin: N.fmin });
                      }
                    }
                  });
                }
              })), ct += 1;
            }
            ct === E && !Ut && (++W, Ut = !0, kt.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${ct * g + 20 + vt})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", x).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    return ct === 0 && kt.append("text").attr("x", 30).attr("y", x + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), ct * g + vt;
  }
  filterVariantData(e, n) {
    return n.length === 0 ? e : e.filter((r) => n.includes(r.name));
  }
  renderTooltipDescription(e, n, r) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      r();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      r();
    });
  }
}
class rf {
  constructor({
    viewer: e,
    height: n,
    width: r,
    transcriptTypes: i,
    htpVariant: a,
    trackData: s,
    region: o,
    genome: c
  }) {
    this.trackData = s ?? [], this.viewer = e, this.width = r, this.height = n, this.transcriptTypes = i, this.htpVariant = a, this.region = o, this.genome = c;
  }
  renderTooltipDescription(e, n, r) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      r();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      r();
    });
  }
  DrawTrack() {
    var it;
    let e = this.trackData;
    const n = this.htpVariant, r = this.viewer, i = this.width, a = this.genome, s = (it = e[0]) == null ? void 0 : it.seqId, o = 10, c = ["UTR", "five_prime_UTR", "three_prime_UTR"], l = ["CDS"], f = ["exon"], d = this.transcriptTypes, h = 10, u = 10, w = 40, E = 0, k = 10, $ = 4, g = 20, _ = 10, m = `0,0 0,${g} ${_},${_}`, x = this.renderTooltipDescription, A = zt().domain([this.region.start, this.region.end]).range([0, i]), y = {};
    for (let S = 0, H = c.length; S < H; S++)
      y[c[S]] = 200;
    for (let S = 0, H = l.length; S < H; S++)
      y[l[S]] = 1e3;
    for (let S = 0, H = f.length; S < H; S++)
      y[f[S]] = 100;
    e = e.sort((S, H) => S.selected && !H.selected ? -1 : !S.selected && H.selected ? 1 : S.name - H.name);
    const T = Z("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), b = () => {
      T.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const S = r.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, H] = n.split(":");
      S.append("polygon").attr("class", "variant-SNV").attr("points", nr(A(+H))).attr("fill", "red").attr("x", A(+H)).attr("z-index", 30);
    }
    const v = le(this.viewer), p = r.append("g").attr("transform", `translate(0,${v})`).attr("class", "track");
    let D = 0;
    const M = [];
    let F = -1, Y = -1;
    const rt = [];
    for (let S = 0; S < e.length && D < o; S++) {
      const H = e[S];
      let kt = H.children;
      if (kt) {
        const L = H.selected;
        kt = kt.sort((O, vt) => O.name < vt.name ? -1 : O.name > vt.name ? 1 : 0), kt.forEach((O) => {
          var Q, ft;
          const vt = O.type;
          if (!rt.includes(O.id) && (rt.push(O.id), d.includes(vt))) {
            let ct = er(
              M,
              A(O.fmin),
              A(O.fmax)
            );
            if (D < o) {
              const U = p.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${D * w + 10})`
              ), j = Math.max(A(O.fmin), 0), Lt = Math.min(A(O.fmax), this.width);
              U.append("polygon").datum(() => ({
                strand: H.strand
              })).attr("class", "transArrow").attr("points", m).attr(
                "transform",
                () => H.strand > 0 ? `translate(${Lt},0)` : `translate(${j},${g}) rotate(180)`
              ).on("click", () => {
                x(
                  T,
                  lt(O),
                  b
                );
              }), U.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + E).attr("height", $).attr("transform", `translate(${j},0)`).attr("width", Lt - j).datum({
                fmin: O.fmin,
                fmax: O.fmax
              }).on("click", () => {
                x(
                  T,
                  lt(O),
                  b
                );
              });
              let ut = O.name;
              H.name !== O.name && (ut += ` (${H.name})`);
              let B = Math.max(A(O.fmin), 0);
              const at = U.append("svg:text").attr("class", "transcriptLabel").attr("fill", L ? "sandybrown" : "gray").attr("opacity", L ? 1 : 0.5).attr("height", E).attr("transform", `translate(${B},0)`).text(ut).datum({
                fmin: O.fmin
              }).on("click", () => {
                x(
                  T,
                  lt(O),
                  b
                );
              });
              let Tt = 100;
              try {
                Tt = ((Q = at.node()) == null ? void 0 : Q.getBBox().width) ?? 0;
              } catch {
              }
              if (Tt + B > this.width) {
                const N = Tt + B - this.width;
                B -= N, at.attr("transform", `translate(${B},0)`);
              }
              let wt = ut.length * 2;
              try {
                wt = ((ft = at.node()) == null ? void 0 : ft.getBBox().width) ?? 0;
              } catch (N) {
                console.error("Not yet rendered", N);
              }
              Number(wt + A(O.fmin)) > i;
              const Ut = wt > A(O.fmax) - A(O.fmin) ? A(O.fmin) + wt : A(O.fmax);
              if (M[ct]) {
                const N = M[ct];
                N.push(`${A(O.fmin)}:${Ut}`), M[ct] = N;
              } else
                M[ct] = [`${A(O.fmin)}:${Ut}`];
              (F < 0 || F > O.fmin) && (F = O.fmin), (Y < 0 || Y < O.fmax) && (Y = O.fmax), O.children && (O.children = O.children.sort(
                function(N, pt) {
                  const W = y[N.type], st = y[pt.type];
                  return typeof W == "number" && typeof st == "number" ? W - st : typeof W == "number" && typeof st != "number" ? -1 : typeof W != "number" && typeof st == "number" ? 1 : N.type.localeCompare(pt.type);
                }
              ), O.children.forEach((N) => {
                const pt = N.type;
                if (A(N.fmin) > this.width || A(N.fmax) < 0)
                  return;
                const W = Math.max(A(N.fmin), 0), st = Math.min(A(N.fmax), this.width);
                f.includes(pt) ? U.append("rect").attr("class", "exon").attr("x", W).attr(
                  "transform",
                  `translate(0,${h - $})`
                ).attr("height", h).attr("z-index", 10).attr("width", st - W).datum({
                  fmin: N.fmin,
                  fmax: N.fmax
                }).on("click", () => {
                  x(
                    T,
                    lt(O),
                    b
                  );
                }) : l.includes(pt) ? U.append("rect").attr("class", "CDS").attr("x", W).attr(
                  "transform",
                  `translate(0,${u - $})`
                ).attr("z-index", 20).attr("height", u).attr("width", st - W).datum({
                  fmin: N.fmin,
                  fmax: N.fmax
                }).on("click", () => {
                  x(
                    T,
                    lt(O),
                    b
                  );
                }) : c.includes(pt) && U.append("rect").attr("class", "UTR").attr("x", W).attr(
                  "transform",
                  `translate(0,${k - $})`
                ).attr("z-index", 20).attr("height", k).attr("width", st - W).datum({
                  fmin: N.fmin,
                  fmax: N.fmax
                }).on("click", () => {
                  x(
                    T,
                    lt(O),
                    b
                  );
                });
              })), D += 1;
            }
            if (D === o) {
              const U = ia(
                a,
                s,
                this.region.start,
                this.region.end
              );
              ++ct, p.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${D * w + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", E).html(U);
            }
          }
        });
      }
    }
    return D === 0 && p.append("text").attr("x", 30).attr("y", E + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), D * w;
  }
}
class af {
  constructor({ viewer: e, track: n, height: r, width: i }) {
    this.refSeq = "", this.viewer = e, this.width = i, this.height = r, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, r = zt().domain([this.track.start, this.track.end + 1]).range(this.track.range), i = Qa(r).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((c, l) => n[l]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), s = fr(r).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(i), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = Et(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), Et(".x-local-axis .tick text").each(function() {
      const l = Z(this).text();
      let f = "nucleotide nt-a";
      l === "T" ? f = "nucleotide nt-t" : l === "C" ? f = "nucleotide nt-c" : l === "G" && (f = "nucleotide nt-g"), Z(this.parentNode).append("rect").attr("class", f).attr("transform", "translate(-8,8)");
    });
  }
  DrawOverviewTrack() {
    const e = this.viewer, n = this.track.start, r = this.track.end, i = this.width, a = zt().domain([n, r]).range(this.track.range), s = fr(a).ticks(8, "s").tickSize(8);
    e.append("g").attr("class", "axis track").attr("width", i).attr("height", 20).attr("transform", "translate(0,20)").call(s);
  }
  _getRefTick(e, n, r) {
    return r ? new Array(Math.ceil((n - e + 1) / 10)).fill(0).map((i, a) => e + a * 10) : new Array(n - e + 1).fill(0).map((i, a) => e + a);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTrackData() {
  }
}
const he = {
  ISOFORM_EMBEDDED_VARIANT: "ISOFORM_EMBEDDED_VARIANT",
  ISOFORM_AND_VARIANT: "ISOFORM_AND_VARIANT",
  ISOFORM: "ISOFORM",
  VARIANT: "VARIANT",
  VARIANT_GLOBAL: "VARIANT_GLOBAL"
};
var $t = "$";
function tn() {
}
tn.prototype = ir.prototype = {
  constructor: tn,
  has: function(t) {
    return $t + t in this;
  },
  get: function(t) {
    return this[$t + t];
  },
  set: function(t, e) {
    return this[$t + t] = e, this;
  },
  remove: function(t) {
    var e = $t + t;
    return e in this && delete this[e];
  },
  clear: function() {
    for (var t in this) t[0] === $t && delete this[t];
  },
  keys: function() {
    var t = [];
    for (var e in this) e[0] === $t && t.push(e.slice(1));
    return t;
  },
  values: function() {
    var t = [];
    for (var e in this) e[0] === $t && t.push(this[e]);
    return t;
  },
  entries: function() {
    var t = [];
    for (var e in this) e[0] === $t && t.push({ key: e.slice(1), value: this[e] });
    return t;
  },
  size: function() {
    var t = 0;
    for (var e in this) e[0] === $t && ++t;
    return t;
  },
  empty: function() {
    for (var t in this) if (t[0] === $t) return !1;
    return !0;
  },
  each: function(t) {
    for (var e in this) e[0] === $t && t(this[e], e.slice(1), this);
  }
};
function ir(t, e) {
  var n = new tn();
  if (t instanceof tn) t.each(function(o, c) {
    n.set(c, o);
  });
  else if (Array.isArray(t)) {
    var r = -1, i = t.length, a;
    if (e == null) for (; ++r < i; ) n.set(r, t[r]);
    else for (; ++r < i; ) n.set(e(a = t[r], r, t), a);
  } else if (t) for (var s in t) n.set(s, t[s]);
  return n;
}
function Or() {
}
var Gt = ir.prototype;
Or.prototype = {
  constructor: Or,
  has: Gt.has,
  add: function(t) {
    return t += "", this[$t + t] = t, this;
  },
  remove: Gt.remove,
  clear: Gt.clear,
  values: Gt.keys,
  size: Gt.size,
  empty: Gt.empty,
  each: Gt.each
};
var Cn = "http://www.w3.org/1999/xhtml";
const Fr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Cn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function aa(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Fr.hasOwnProperty(e) ? { space: Fr[e], local: t } : t;
}
function sf(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Cn && e.documentElement.namespaceURI === Cn ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function of(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function sa(t) {
  var e = aa(t);
  return (e.local ? of : sf)(e);
}
function lf() {
}
function oa(t) {
  return t == null ? lf : function() {
    return this.querySelector(t);
  };
}
function cf(t) {
  typeof t != "function" && (t = oa(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = new Array(s), c, l, f = 0; f < s; ++f)
      (c = a[f]) && (l = t.call(c, c.__data__, f, a)) && ("__data__" in c && (l.__data__ = c.__data__), o[f] = l);
  return new bt(r, this._parents);
}
function ff() {
  return [];
}
function uf(t) {
  return t == null ? ff : function() {
    return this.querySelectorAll(t);
  };
}
function hf(t) {
  typeof t != "function" && (t = uf(t));
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, l = 0; l < o; ++l)
      (c = s[l]) && (r.push(t.call(c, c.__data__, l, s)), i.push(c));
  return new bt(r, i);
}
function df(t) {
  return function() {
    return this.matches(t);
  };
}
function pf(t) {
  typeof t != "function" && (t = df(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], c, l = 0; l < s; ++l)
      (c = a[l]) && t.call(c, c.__data__, l, a) && o.push(c);
  return new bt(r, this._parents);
}
function la(t) {
  return new Array(t.length);
}
function mf() {
  return new bt(this._enter || this._groups.map(la), this._parents);
}
function en(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
en.prototype = {
  constructor: en,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function gf(t) {
  return function() {
    return t;
  };
}
var Hr = "$";
function _f(t, e, n, r, i, a) {
  for (var s = 0, o, c = e.length, l = a.length; s < l; ++s)
    (o = e[s]) ? (o.__data__ = a[s], r[s] = o) : n[s] = new en(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (i[s] = o);
}
function wf(t, e, n, r, i, a, s) {
  var o, c, l = {}, f = e.length, d = a.length, h = new Array(f), u;
  for (o = 0; o < f; ++o)
    (c = e[o]) && (h[o] = u = Hr + s.call(c, c.__data__, o, e), u in l ? i[o] = c : l[u] = c);
  for (o = 0; o < d; ++o)
    u = Hr + s.call(t, a[o], o, a), (c = l[u]) ? (r[o] = c, c.__data__ = a[o], l[u] = null) : n[o] = new en(t, a[o]);
  for (o = 0; o < f; ++o)
    (c = e[o]) && l[h[o]] === c && (i[o] = c);
}
function yf(t, e) {
  if (!t)
    return u = new Array(this.size()), l = -1, this.each(function(A) {
      u[++l] = A;
    }), u;
  var n = e ? wf : _f, r = this._parents, i = this._groups;
  typeof t != "function" && (t = gf(t));
  for (var a = i.length, s = new Array(a), o = new Array(a), c = new Array(a), l = 0; l < a; ++l) {
    var f = r[l], d = i[l], h = d.length, u = t.call(f, f && f.__data__, l, r), w = u.length, E = o[l] = new Array(w), k = s[l] = new Array(w), $ = c[l] = new Array(h);
    n(f, d, E, k, $, u, e);
    for (var g = 0, _ = 0, m, x; g < w; ++g)
      if (m = E[g]) {
        for (g >= _ && (_ = g + 1); !(x = k[_]) && ++_ < w; ) ;
        m._next = x || null;
      }
  }
  return s = new bt(s, r), s._enter = o, s._exit = c, s;
}
function xf() {
  return new bt(this._exit || this._groups.map(la), this._parents);
}
function vf(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return r = typeof t == "function" ? t(r) : r.append(t + ""), e != null && (i = e(i)), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function bf(t) {
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), s = new Array(r), o = 0; o < a; ++o)
    for (var c = e[o], l = n[o], f = c.length, d = s[o] = new Array(f), h, u = 0; u < f; ++u)
      (h = c[u] || l[u]) && (d[u] = h);
  for (; o < r; ++o)
    s[o] = e[o];
  return new bt(s, this._parents);
}
function kf() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], s; --i >= 0; )
      (s = r[i]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function $f(t) {
  t || (t = Af);
  function e(d, h) {
    return d && h ? t(d.__data__, h.__data__) : !d - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var s = n[a], o = s.length, c = i[a] = new Array(o), l, f = 0; f < o; ++f)
      (l = s[f]) && (c[f] = l);
    c.sort(e);
  }
  return new bt(i, this._parents).order();
}
function Af(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Tf() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ef() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function Sf() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Nf() {
  var t = 0;
  return this.each(function() {
    ++t;
  }), t;
}
function Rf() {
  return !this.node();
}
function Mf(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, s = i.length, o; a < s; ++a)
      (o = i[a]) && t.call(o, o.__data__, a, i);
  return this;
}
function If(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Df(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Lf(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Of(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ff(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Hf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Vf(t, e) {
  var n = aa(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Df : If : typeof e == "function" ? n.local ? Hf : Ff : n.local ? Of : Lf)(n, e));
}
function ca(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Cf(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Bf(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function zf(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Uf(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Cf : typeof e == "function" ? zf : Bf)(t, e, n ?? "")) : Pf(this.node(), t);
}
function Pf(t, e) {
  return t.style.getPropertyValue(e) || ca(t).getComputedStyle(t, null).getPropertyValue(e);
}
function qf(t) {
  return function() {
    delete this[t];
  };
}
function Gf(t, e) {
  return function() {
    this[t] = e;
  };
}
function Wf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Xf(t, e) {
  return arguments.length > 1 ? this.each((e == null ? qf : typeof e == "function" ? Wf : Gf)(t, e)) : this.node()[t];
}
function fa(t) {
  return t.trim().split(/^|\s+/);
}
function ar(t) {
  return t.classList || new ua(t);
}
function ua(t) {
  this._node = t, this._names = fa(t.getAttribute("class") || "");
}
ua.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function ha(t, e) {
  for (var n = ar(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function da(t, e) {
  for (var n = ar(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Zf(t) {
  return function() {
    ha(this, t);
  };
}
function Yf(t) {
  return function() {
    da(this, t);
  };
}
function Kf(t, e) {
  return function() {
    (e.apply(this, arguments) ? ha : da)(this, t);
  };
}
function Jf(t, e) {
  var n = fa(t + "");
  if (arguments.length < 2) {
    for (var r = ar(this.node()), i = -1, a = n.length; ++i < a; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Kf : e ? Zf : Yf)(n, e));
}
function Qf() {
  this.textContent = "";
}
function jf(t) {
  return function() {
    this.textContent = t;
  };
}
function tu(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function eu(t) {
  return arguments.length ? this.each(t == null ? Qf : (typeof t == "function" ? tu : jf)(t)) : this.node().textContent;
}
function nu() {
  this.innerHTML = "";
}
function ru(t) {
  return function() {
    this.innerHTML = t;
  };
}
function iu(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function au(t) {
  return arguments.length ? this.each(t == null ? nu : (typeof t == "function" ? iu : ru)(t)) : this.node().innerHTML;
}
function su() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ou() {
  return this.each(su);
}
function lu() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function cu() {
  return this.each(lu);
}
function fu(t) {
  var e = typeof t == "function" ? t : sa(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function uu() {
  return null;
}
function hu(t, e) {
  var n = typeof t == "function" ? t : sa(t), r = e == null ? uu : typeof e == "function" ? e : oa(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function du() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function pu() {
  return this.each(du);
}
function mu() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function gu() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function _u(t) {
  return this.select(t ? gu : mu);
}
function wu(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var pa = {};
if (typeof document < "u") {
  var yu = document.documentElement;
  "onmouseenter" in yu || (pa = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function xu(t, e, n) {
  return t = ma(t, e, n), function(r) {
    var i = r.relatedTarget;
    (!i || i !== this && !(i.compareDocumentPosition(this) & 8)) && t.call(this, r);
  };
}
function ma(t, e, n) {
  return function(r) {
    try {
      t.call(this, this.__data__, e, n);
    } finally {
    }
  };
}
function vu(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function bu(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, a; n < i; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.capture) : e[++r] = a;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function ku(t, e, n) {
  var r = pa.hasOwnProperty(t.type) ? xu : ma;
  return function(i, a, s) {
    var o = this.__on, c, l = r(e, a, s);
    if (o) {
      for (var f = 0, d = o.length; f < d; ++f)
        if ((c = o[f]).type === t.type && c.name === t.name) {
          this.removeEventListener(c.type, c.listener, c.capture), this.addEventListener(c.type, c.listener = l, c.capture = n), c.value = e;
          return;
        }
    }
    this.addEventListener(t.type, l, n), c = { type: t.type, name: t.name, value: e, listener: l, capture: n }, o ? o.push(c) : this.__on = [c];
  };
}
function $u(t, e, n) {
  var r = vu(t + ""), i, a = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, l = o.length, f; c < l; ++c)
        for (i = 0, f = o[c]; i < a; ++i)
          if ((s = r[i]).type === f.type && s.name === f.name)
            return f.value;
    }
    return;
  }
  for (o = e ? ku : bu, n == null && (n = !1), i = 0; i < a; ++i) this.each(o(r[i], e, n));
  return this;
}
function ga(t, e, n) {
  var r = ca(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Au(t, e) {
  return function() {
    return ga(this, t, e);
  };
}
function Tu(t, e) {
  return function() {
    return ga(this, t, e.apply(this, arguments));
  };
}
function Eu(t, e) {
  return this.each((typeof e == "function" ? Tu : Au)(t, e));
}
var _a = [null];
function bt(t, e) {
  this._groups = t, this._parents = e;
}
function Bn() {
  return new bt([[document.documentElement]], _a);
}
bt.prototype = Bn.prototype = {
  constructor: bt,
  select: cf,
  selectAll: hf,
  filter: pf,
  data: yf,
  enter: mf,
  exit: xf,
  join: vf,
  merge: bf,
  order: kf,
  sort: $f,
  call: Tf,
  nodes: Ef,
  node: Sf,
  size: Nf,
  empty: Rf,
  each: Mf,
  attr: Vf,
  style: Uf,
  property: Xf,
  classed: Jf,
  text: eu,
  html: au,
  raise: ou,
  lower: cu,
  append: fu,
  insert: hu,
  remove: pu,
  clone: _u,
  datum: wu,
  on: $u,
  dispatch: Eu
};
function Vr(t) {
  return typeof t == "string" ? new bt([[document.querySelector(t)]], [document.documentElement]) : new bt([[t]], _a);
}
function Su() {
  var t = l, e = f, n = d, r = document.body, i = A(), a = null, s = null, o = null;
  function c(p) {
    a = y(p), a && (s = a.createSVGPoint(), r.appendChild(i));
  }
  c.show = function() {
    var p = Array.prototype.slice.call(arguments);
    p[p.length - 1] instanceof SVGElement && (o = p.pop());
    var D = n.apply(this, p), M = e.apply(this, p), F = t.apply(this, p), Y = T(), rt = u.length, it, S = document.documentElement.scrollTop || r.scrollTop, H = document.documentElement.scrollLeft || r.scrollLeft;
    for (Y.html(D).style("opacity", 1).style("pointer-events", "all"); rt--; ) Y.classed(u[rt], !1);
    return it = h.get(F).apply(this), Y.classed(F, !0).style("top", it.top + M[0] + S + "px").style("left", it.left + M[1] + H + "px"), c;
  }, c.hide = function() {
    var p = T();
    return p.style("opacity", 0).style("pointer-events", "none"), c;
  }, c.attr = function(p, D) {
    if (arguments.length < 2 && typeof p == "string")
      return T().attr(p);
    var M = Array.prototype.slice.call(arguments);
    return Bn.prototype.attr.apply(T(), M), c;
  }, c.style = function(p, D) {
    if (arguments.length < 2 && typeof p == "string")
      return T().style(p);
    var M = Array.prototype.slice.call(arguments);
    return Bn.prototype.style.apply(T(), M), c;
  }, c.direction = function(p) {
    return arguments.length ? (t = p == null ? p : v(p), c) : t;
  }, c.offset = function(p) {
    return arguments.length ? (e = p == null ? p : v(p), c) : e;
  }, c.html = function(p) {
    return arguments.length ? (n = p == null ? p : v(p), c) : n;
  }, c.rootElement = function(p) {
    return arguments.length ? (r = p == null ? p : v(p), c) : r;
  }, c.destroy = function() {
    return i && (T().remove(), i = null), c;
  };
  function l() {
    return "n";
  }
  function f() {
    return [0, 0];
  }
  function d() {
    return " ";
  }
  var h = ir({
    n: w,
    s: E,
    e: k,
    w: $,
    nw: g,
    ne: _,
    sw: m,
    se: x
  }), u = h.keys();
  function w() {
    var p = b(this);
    return {
      top: p.n.y - i.offsetHeight,
      left: p.n.x - i.offsetWidth / 2
    };
  }
  function E() {
    var p = b(this);
    return {
      top: p.s.y,
      left: p.s.x - i.offsetWidth / 2
    };
  }
  function k() {
    var p = b(this);
    return {
      top: p.e.y - i.offsetHeight / 2,
      left: p.e.x
    };
  }
  function $() {
    var p = b(this);
    return {
      top: p.w.y - i.offsetHeight / 2,
      left: p.w.x - i.offsetWidth
    };
  }
  function g() {
    var p = b(this);
    return {
      top: p.nw.y - i.offsetHeight,
      left: p.nw.x - i.offsetWidth
    };
  }
  function _() {
    var p = b(this);
    return {
      top: p.ne.y - i.offsetHeight,
      left: p.ne.x
    };
  }
  function m() {
    var p = b(this);
    return {
      top: p.sw.y,
      left: p.sw.x - i.offsetWidth
    };
  }
  function x() {
    var p = b(this);
    return {
      top: p.se.y,
      left: p.se.x
    };
  }
  function A() {
    var p = Vr(document.createElement("div"));
    return p.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), p.node();
  }
  function y(p) {
    var D = p.node();
    return D ? D.tagName.toLowerCase() === "svg" ? D : D.ownerSVGElement : null;
  }
  function T() {
    return i == null && (i = A(), r.appendChild(i)), Vr(i);
  }
  function b(p) {
    for (var D = o || p; D.getScreenCTM == null && D.parentNode != null; )
      D = D.parentNode;
    var M = {}, F = D.getScreenCTM(), Y = D.getBBox(), rt = Y.width, it = Y.height, S = Y.x, H = Y.y;
    return s.x = S, s.y = H, M.nw = s.matrixTransform(F), s.x += rt, M.ne = s.matrixTransform(F), s.y += it, M.se = s.matrixTransform(F), s.x -= rt, M.sw = s.matrixTransform(F), s.y -= it / 2, M.w = s.matrixTransform(F), s.x += rt, M.e = s.matrixTransform(F), s.x -= rt / 2, s.y -= it / 2, M.n = s.matrixTransform(F), s.y += it, M.s = s.matrixTransform(F), M;
  }
  function v(p) {
    return typeof p == "function" ? p : function() {
      return p;
    };
  }
  return c;
}
class Nu {
  constructor({
    region: e,
    viewer: n,
    height: r,
    width: i,
    range: a
  }) {
    this.variants = [], this.viewer = n, this.width = i, this.height = r, this.region = e, this.range = a;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, r = zt().domain([this.region.start, this.region.end + 1]).range(this.range), i = Ji().type(Ki).size(20), a = Su();
    a.attr("class", "d3-tip").html(
      // @ts-expect-error
      (d) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${d.position}</td></tr><tr><td>Mutation</td> <td>${d.ref} > ${d.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(a);
    const s = 20, o = le(this.viewer), c = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    c.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), c.selectAll("path").data(n).enter().append("path").attr("d", i).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (d) => `translate(${r(d.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const f = Z("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
    f.append("line").attr("x1", 75).attr("y1", 0).attr("x2", 75).attr("y2", s).attr("stroke-width", 3).attr("stroke", "#609C9C"), f.append("text").text(this.track.label.toUpperCase()).attr("y", 12);
  }
  /* Method to get reference label */
  async getTrackData() {
  }
}
class Ru {
  constructor({
    viewer: e,
    track: n,
    height: r,
    width: i,
    region: a
  }) {
    this.variants = [], this.region = a, this.viewer = e, this.width = i, this.height = r, this.track = n;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, r = zt().domain([this.region.start, this.region.end]).range(this.track.range), i = Ji().type(Ki).size(20), a = 20, s = le(this.viewer), o = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
    o.append("rect").attr("height", a).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), o.selectAll("path").data(n).enter().append("path").attr("d", i).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (c) => `translate(${r(c.position)},10)`);
  }
  async getTrackData() {
  }
}
function wa(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var pn, Cr;
function Mu() {
  if (Cr) return pn;
  Cr = 1;
  class t {
    constructor(n = {}) {
      if (!(n.maxSize && n.maxSize > 0))
        throw new TypeError("`maxSize` must be a number greater than 0");
      this.maxSize = n.maxSize, this.cache = /* @__PURE__ */ new Map(), this.oldCache = /* @__PURE__ */ new Map(), this._size = 0;
    }
    _set(n, r) {
      this.cache.set(n, r), this._size++, this._size >= this.maxSize && (this._size = 0, this.oldCache = this.cache, this.cache = /* @__PURE__ */ new Map());
    }
    get(n) {
      if (this.cache.has(n))
        return this.cache.get(n);
      if (this.oldCache.has(n)) {
        const r = this.oldCache.get(n);
        return this.oldCache.delete(n), this._set(n, r), r;
      }
    }
    set(n, r) {
      return this.cache.has(n) ? this.cache.set(n, r) : this._set(n, r), this;
    }
    has(n) {
      return this.cache.has(n) || this.oldCache.has(n);
    }
    peek(n) {
      if (this.cache.has(n))
        return this.cache.get(n);
      if (this.oldCache.has(n))
        return this.oldCache.get(n);
    }
    delete(n) {
      const r = this.cache.delete(n);
      return r && this._size--, this.oldCache.delete(n) || r;
    }
    clear() {
      this.cache.clear(), this.oldCache.clear(), this._size = 0;
    }
    *keys() {
      for (const [n] of this)
        yield n;
    }
    *values() {
      for (const [, n] of this)
        yield n;
    }
    *[Symbol.iterator]() {
      for (const n of this.cache)
        yield n;
      for (const n of this.oldCache) {
        const [r] = n;
        this.cache.has(r) || (yield n);
      }
    }
    get size() {
      let n = 0;
      for (const r of this.oldCache.keys())
        this.cache.has(r) || n++;
      return this._size + n;
    }
  }
  return pn = t, pn;
}
var Iu = Mu();
const sr = /* @__PURE__ */ wa(Iu);
class Du {
}
class Lu {
  constructor() {
    this.signals = /* @__PURE__ */ new Set(), this.abortController = new AbortController();
  }
  /**
   * @param {AbortSignal} [signal] optional AbortSignal to add. if falsy,
   *  will be treated as a null-signal, and this abortcontroller will no
   *  longer be abortable.
   */
  //@ts-ignore
  addSignal(e = new Du()) {
    if (this.signal.aborted)
      throw new Error("cannot add a signal, already aborted!");
    this.signals.add(e), e.aborted ? this.handleAborted(e) : typeof e.addEventListener == "function" && e.addEventListener("abort", () => {
      this.handleAborted(e);
    });
  }
  handleAborted(e) {
    this.signals.delete(e), this.signals.size === 0 && this.abortController.abort();
  }
  get signal() {
    return this.abortController.signal;
  }
  abort() {
    this.abortController.abort();
  }
}
class Ou {
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set();
  }
  addCallback(e = () => {
  }) {
    this.callbacks.add(e), e(this.currentMessage);
  }
  callback(e) {
    this.currentMessage = e;
    for (const n of this.callbacks)
      n(e);
  }
}
class ce {
  constructor({ fill: e, cache: n }) {
    if (typeof e != "function")
      throw new TypeError("must pass a fill function");
    if (typeof n != "object")
      throw new TypeError("must pass a cache object");
    if (typeof n.get != "function" || typeof n.set != "function" || typeof n.delete != "function")
      throw new TypeError("cache must implement get(key), set(key, val), and and delete(key)");
    this.cache = n, this.fillCallback = e;
  }
  static isAbortException(e) {
    return (
      // DOMException
      e.name === "AbortError" || // standard-ish non-DOM abort exception
      //@ts-ignore
      e.code === "ERR_ABORTED" || // stringified DOMException
      e.message === "AbortError: aborted" || // stringified standard-ish exception
      e.message === "Error: aborted"
    );
  }
  evict(e, n) {
    this.cache.get(e) === n && this.cache.delete(e);
  }
  fill(e, n, r, i) {
    const a = new Lu(), s = new Ou();
    s.addCallback(i);
    const o = {
      aborter: a,
      promise: this.fillCallback(n, a.signal, (c) => {
        s.callback(c);
      }),
      settled: !1,
      statusReporter: s,
      get aborted() {
        return this.aborter.signal.aborted;
      }
    };
    o.aborter.addSignal(r), o.aborter.signal.addEventListener("abort", () => {
      o.settled || this.evict(e, o);
    }), o.promise.then(() => {
      o.settled = !0;
    }, () => {
      o.settled = !0, this.evict(e, o);
    }).catch((c) => {
      throw console.error(c), c;
    }), this.cache.set(e, o);
  }
  static checkSinglePromise(e, n) {
    function r() {
      if (n != null && n.aborted)
        throw Object.assign(new Error("aborted"), { code: "ERR_ABORTED" });
    }
    return e.then((i) => (r(), i), (i) => {
      throw r(), i;
    });
  }
  has(e) {
    return this.cache.has(e);
  }
  /**
   * Callback for getting status of the pending async
   *
   * @callback statusCallback
   * @param {any} status, current status string or message object
   */
  /**
   * @param {any} key cache key to use for this request
   * @param {any} data data passed as the first argument to the fill callback
   * @param {AbortSignal} [signal] optional AbortSignal object that aborts the request
   * @param {statusCallback} a callback to get the current status of a pending async operation
   */
  get(e, n, r, i) {
    if (!r && n instanceof AbortSignal)
      throw new TypeError("second get argument appears to be an AbortSignal, perhaps you meant to pass `null` for the fill data?");
    const a = this.cache.get(e);
    return a ? a.aborted && !a.settled ? (this.evict(e, a), this.get(e, n, r, i)) : a.settled ? a.promise : (a.aborter.addSignal(r), a.statusReporter.addCallback(i), ce.checkSinglePromise(a.promise, r)) : (this.fill(e, n, r, i), ce.checkSinglePromise(
      //see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-
      this.cache.get(e).promise,
      r
    ));
  }
  /**
   * delete the given entry from the cache. if it exists and its fill request has
   * not yet settled, the fill will be signaled to abort.
   *
   * @param {any} key
   */
  delete(e) {
    const n = this.cache.get(e);
    n && (n.settled || n.aborter.abort(), this.cache.delete(e));
  }
  /**
   * Clear all requests from the cache. Aborts any that have not settled.
   * @returns {number} count of entries deleted
   */
  clear() {
    const e = this.cache.keys();
    let n = 0;
    for (let r = e.next(); !r.done; r = e.next())
      this.delete(r.value), n += 1;
    return n;
  }
}
var Pe = { exports: {} }, Fu = Pe.exports, Br;
function Hu() {
  return Br || (Br = 1, function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Fu, function() {
      const n = /^[\w+.-]+:\/\//, r = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, i = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      function a(g) {
        return n.test(g);
      }
      function s(g) {
        return g.startsWith("//");
      }
      function o(g) {
        return g.startsWith("/");
      }
      function c(g) {
        return g.startsWith("file:");
      }
      function l(g) {
        return /^[.?#]/.test(g);
      }
      function f(g) {
        const _ = r.exec(g);
        return h(_[1], _[2] || "", _[3], _[4] || "", _[5] || "/", _[6] || "", _[7] || "");
      }
      function d(g) {
        const _ = i.exec(g), m = _[2];
        return h("file:", "", _[1] || "", "", o(m) ? m : "/" + m, _[3] || "", _[4] || "");
      }
      function h(g, _, m, x, A, y, T) {
        return {
          scheme: g,
          user: _,
          host: m,
          port: x,
          path: A,
          query: y,
          hash: T,
          type: 7
        };
      }
      function u(g) {
        if (s(g)) {
          const m = f("http:" + g);
          return m.scheme = "", m.type = 6, m;
        }
        if (o(g)) {
          const m = f("http://foo.com" + g);
          return m.scheme = "", m.host = "", m.type = 5, m;
        }
        if (c(g))
          return d(g);
        if (a(g))
          return f(g);
        const _ = f("http://foo.com/" + g);
        return _.scheme = "", _.host = "", _.type = g ? g.startsWith("?") ? 3 : g.startsWith("#") ? 2 : 4 : 1, _;
      }
      function w(g) {
        if (g.endsWith("/.."))
          return g;
        const _ = g.lastIndexOf("/");
        return g.slice(0, _ + 1);
      }
      function E(g, _) {
        k(_, _.type), g.path === "/" ? g.path = _.path : g.path = w(_.path) + g.path;
      }
      function k(g, _) {
        const m = _ <= 4, x = g.path.split("/");
        let A = 1, y = 0, T = !1;
        for (let v = 1; v < x.length; v++) {
          const p = x[v];
          if (!p) {
            T = !0;
            continue;
          }
          if (T = !1, p !== ".") {
            if (p === "..") {
              y ? (T = !0, y--, A--) : m && (x[A++] = p);
              continue;
            }
            x[A++] = p, y++;
          }
        }
        let b = "";
        for (let v = 1; v < A; v++)
          b += "/" + x[v];
        (!b || T && !b.endsWith("/..")) && (b += "/"), g.path = b;
      }
      function $(g, _) {
        if (!g && !_)
          return "";
        const m = u(g);
        let x = m.type;
        if (_ && x !== 7) {
          const y = u(_), T = y.type;
          switch (x) {
            case 1:
              m.hash = y.hash;
            // fall through
            case 2:
              m.query = y.query;
            // fall through
            case 3:
            case 4:
              E(m, y);
            // fall through
            case 5:
              m.user = y.user, m.host = y.host, m.port = y.port;
            // fall through
            case 6:
              m.scheme = y.scheme;
          }
          T > x && (x = T);
        }
        k(m, x);
        const A = m.query + m.hash;
        switch (x) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return A;
          case 4: {
            const y = m.path.slice(1);
            return y ? l(_ || g) && !l(y) ? "./" + y + A : y + A : A || ".";
          }
          case 5:
            return m.path + A;
          default:
            return m.scheme + "//" + m.user + m.host + m.port + m.path + A;
        }
      }
      return $;
    });
  }(Pe)), Pe.exports;
}
var Vu = Hu();
const Cu = /* @__PURE__ */ wa(Vu);
async function or(t, e, n = {}) {
  const { defaultContent: r = {} } = n;
  try {
    const i = await e(t, { encoding: "utf8" }), a = new TextDecoder("utf8");
    return JSON.parse(a.decode(i));
  } catch (i) {
    if (i.code === "ENOENT" || i.status === 404 || i.message.includes("404") || i.message.includes("ENOENT"))
      return r;
    throw i;
  }
}
function lr(t, e = ".") {
  return Cu(t, e);
}
class Bu {
  constructor({ readFile: e, cacheSize: n = 100 }) {
    if (this.topList = [], this.chunkCache = new ce({
      cache: new sr({ maxSize: n }),
      fill: this.readChunkItems.bind(this)
    }), this.readFile = e, !this.readFile)
      throw new Error('must provide a "readFile" function');
  }
  importExisting(e, n, r, i, a) {
    this.topList = e, this.attrs = n, this.start = n.makeFastGetter("Start"), this.end = n.makeFastGetter("End"), this.lazyClass = a, this.baseURL = r, this.lazyUrlTemplate = i;
  }
  binarySearch(e, n, r) {
    let i = -1, a = e.length, s;
    for (; a - i > 1; )
      s = i + a >>> 1, r(e[s]) >= n ? a = s : i = s;
    return r === this.end ? a : i;
  }
  readChunkItems(e) {
    const n = lr(this.lazyUrlTemplate.replaceAll(/\{Chunk\}/gi, e), this.baseURL);
    return or(n, this.readFile, { defaultContent: [] });
  }
  async *iterateSublist(e, n, r, i, a, s, o) {
    const c = this.attrs.makeGetter("Chunk"), l = this.attrs.makeGetter("Sublist"), f = [];
    for (let d = this.binarySearch(e, n, a); d < e.length && d >= 0 && i * s(e[d]) < i * r; d += i) {
      if (e[d][0] === this.lazyClass) {
        const u = c(e[d]), w = this.chunkCache.get(u, u).then((E) => [E, u]);
        f.push(w);
      } else
        yield [e[d], o.concat(d)];
      const h = l(e[d]);
      h && (yield* this.iterateSublist(h, n, r, i, a, s, o.concat(d)));
    }
    for (const d of f) {
      const [h, u] = await d;
      h && (yield* this.iterateSublist(h, n, r, i, a, s, [
        ...o,
        u
      ]));
    }
  }
  async *iterate(e, n) {
    const r = e > n ? -1 : 1, i = e > n ? this.start : this.end, a = e > n ? this.end : this.start;
    this.topList.length > 0 && (yield* this.iterateSublist(this.topList, e, n, r, i, a, [0]));
  }
  async histogram(e, n, r) {
    const i = new Array(r);
    i.fill(0);
    const a = (n - e) / r;
    for await (const s of this.iterate(e, n)) {
      const o = Math.max(0, (this.start(s) - e) / a | 0), c = Math.min(r, (this.end(s) - e) / a | 0);
      for (let l = o; l <= c; l += 1)
        i[l] += 1;
    }
    return i;
  }
}
class zu {
  constructor(e) {
    this.classes = e, this.fields = [];
    for (let n = 0; n < e.length; n += 1) {
      this.fields[n] = {};
      for (let r = 0; r < e[n].attributes.length; r += 1)
        this.fields[n][e[n].attributes[r]] = r + 1;
      e[n].proto === void 0 && (e[n].proto = {}), e[n].isArrayAttr === void 0 && (e[n].isArrayAttr = {});
    }
  }
  /**
   * @private
   */
  attrIndices(e) {
    return this.classes.map((n) => n.attributes.indexOf(e) + 1 || n.attributes.indexOf(e.toLowerCase()) + 1 || void 0);
  }
  get(e, n) {
    if (n in this.fields[e[0]])
      return e[this.fields[e[0]][n]];
    const r = n.toLowerCase();
    if (r in this.fields[e[0]])
      return e[this.fields[e[0]][r]];
    const i = this.classes[e[0]].attributes.length + 1;
    return i >= e.length || !(n in e[i]) ? n in this.classes[e[0]].proto ? this.classes[e[0]].proto[n] : void 0 : e[i][n];
  }
  makeSetter(e) {
    return (n, r) => {
      this.set(n, e, r);
    };
  }
  makeGetter(e) {
    return (n) => this.get(n, e);
  }
  makeFastGetter(e) {
    const n = this.attrIndices(e);
    return function(i) {
      if (n[i[0]] !== void 0)
        return i[n[i[0]]];
    };
  }
  // construct(self, obj, klass) {
  //   const result = new Array(self.classes[klass].length)
  //   Object.keys(obj).forEach(attr => {
  //     this.set(result, attr, obj[attr])
  //   })
  //   return result
  // }
  /**
   * Returns fast pre-compiled getter and setter functions for use with
   * Arrays that use this representation.
   * When the returned <code>get</code> and <code>set</code> functions are
   * added as methods to an Array that contains data in this
   * representation, they provide fast access by name to the data.
   *
   * @returns {Object} <code>{ get: function() {...}, set: function(val) {...} }</code>
   *
   * @example
   * var accessors = attrs.accessors();
   * var feature = get_feature_from_someplace();
   * feature.get = accessors.get;
   * // print out the feature start and end
   * console.log( feature.get('start') + ',' + feature.get('end') );
   */
  accessors() {
    return this._accessors || (this._accessors = this._makeAccessors()), this._accessors;
  }
  /**
   * @private
   */
  _makeAccessors() {
    const e = {}, n = {
      get(i) {
        const a = this.get.field_accessors[i.toLowerCase()];
        if (a)
          return a.call(this);
      },
      set(i, a) {
        const s = this.set.field_accessors[i];
        if (s)
          return s.call(this, a);
      },
      tags() {
        return r[this[0]] || [];
      }
    };
    n.get.field_accessors = {}, n.set.field_accessors = {}, this.classes.forEach((i, a) => {
      (i.attributes || []).forEach((s, o) => {
        e[s] = e[s] || [], e[s][a] = o + 1, s = s.toLowerCase(), e[s] = e[s] || [], e[s][a] = o + 1;
      });
    });
    const r = this.classes.map((i) => i.attributes);
    return Object.keys(e).forEach((i) => {
      const a = e[i];
      n.get.field_accessors[i] = a ? function() {
        return this[a[this[0]]];
      } : function() {
      };
    }), n;
  }
}
class Uu {
  constructor({ urlTemplate: e, chunkSize: n, length: r, cacheSize: i = 100, readFile: a }, s) {
    if (this.urlTemplate = e, this.chunkSize = n, this.length = r, this.baseUrl = s === void 0 ? "" : s, this.readFile = a, !a)
      throw new Error("must provide readFile callback");
    this.chunkCache = new ce({
      cache: new sr({ maxSize: i }),
      fill: this.getChunk.bind(this)
    });
  }
  /**
   * call the callback on one element of the array
   * @param i index
   * @param callback callback, gets called with (i, value, param)
   * @param param (optional) callback will get this as its last parameter
   */
  index(e, n, r) {
    this.range(e, e, n, void 0, r);
  }
  /**
   * async generator for the elements in the range [start,end]
   *
   * @param start index of first element to call the callback on
   * @param end index of last element to call the callback on
   */
  async *range(e, n) {
    e = Math.max(0, e), n = Math.min(n, this.length - 1);
    const r = Math.floor(e / this.chunkSize), i = Math.floor(n / this.chunkSize), a = [];
    for (let s = r; s <= i; s += 1)
      a.push(this.chunkCache.get(s, s));
    for (const s of a) {
      const [o, c] = await s;
      yield* this.filterChunkData(e, n, o, c);
    }
  }
  async getChunk(e) {
    let n = this.urlTemplate.replaceAll(/\{Chunk\}/gi, e);
    this.baseUrl && (n = lr(n, this.baseUrl));
    const r = await or(n, this.readFile);
    return [e, r];
  }
  *filterChunkData(e, n, r, i) {
    const a = r * this.chunkSize, s = Math.max(0, e - a), o = Math.min(n - a, this.chunkSize - 1);
    for (let c = s; c <= o; c += 1)
      yield [c + a, i[c]];
  }
}
function Pu() {
  return this._uniqueID;
}
function qu() {
  return this._parent;
}
function Gu() {
  return this.get("subfeatures");
}
class Wu {
  constructor({ baseUrl: e, urlTemplate: n, readFile: r, cacheSize: i = 10 }) {
    if (this.baseUrl = e, this.urlTemplates = { root: n }, this.readFile = r, !this.readFile)
      throw new Error('must provide a "readFile" function argument');
    this.dataRootCache = new ce({
      cache: new sr({ maxSize: i }),
      fill: this.fetchDataRoot.bind(this)
    });
  }
  makeNCList() {
    return new Bu({ readFile: this.readFile });
  }
  loadNCList(e, n, r) {
    e.nclist.importExisting(n.intervals.nclist, e.attrs, r, n.intervals.urlTemplate, n.intervals.lazyClass);
  }
  getDataRoot(e) {
    return this.dataRootCache.get(e, e);
  }
  fetchDataRoot(e) {
    const n = lr(this.urlTemplates.root.replaceAll(/{\s*refseq\s*}/g, e), this.baseUrl);
    return or(n, this.readFile).then((r) => (
      // trackInfo = JSON.parse( trackInfo );
      this.parseTrackInfo(r, n)
    ));
  }
  parseTrackInfo(e, n) {
    const r = {
      nclist: this.makeNCList(),
      stats: {
        featureCount: e.featureCount || 0
      }
    };
    e.intervals && (r.attrs = new zu(e.intervals.classes), this.loadNCList(r, e, n));
    const { histograms: i } = e;
    if (i != null && i.meta) {
      for (let a = 0; a < i.meta.length; a += 1)
        i.meta[a].lazyArray = new Uu({ ...i.meta[a].arrayParams, readFile: this.readFile }, n);
      r._histograms = i;
    }
    return r._histograms && Object.keys(r._histograms).forEach((a) => {
      r._histograms[a].forEach((o) => {
        Object.keys(o).forEach((c) => {
          typeof o[c] == "string" && String(Number(o[c])) === o[c] && (o[c] = Number(o[c]));
        });
      });
    }), r;
  }
  async getRegionStats(e) {
    return (await this.getDataRoot(e.ref)).stats;
  }
  /**
   * fetch binned counts of feature coverage in the given region.
   *
   * @param {object} query
   * @param {string} query.refName reference sequence name
   * @param {number} query.start region start
   * @param {number} query.end region end
   * @param {number} query.numBins number of bins desired in the feature counts
   * @param {number} query.basesPerBin number of bp desired in each feature counting bin
   * @returns {object} as:
   *    `{ bins: hist, stats: statEntry }`
   */
  async getRegionFeatureDensities({ refName: e, start: n, end: r, numBins: i, basesPerBin: a }) {
    const s = await this.getDataRoot(e);
    if (i)
      a = (r - n) / i;
    else if (a)
      i = Math.ceil((r - n) / a);
    else
      throw new TypeError("numBins or basesPerBin arg required for getRegionFeatureDensities");
    const c = (s._histograms.stats || []).find((h) => h.basesPerBin >= a);
    let l = s._histograms.meta[0];
    for (let h = 0; h < s._histograms.meta.length; h += 1)
      a >= s._histograms.meta[h].basesPerBin && (l = s._histograms.meta[h]);
    let f = a / l.basesPerBin;
    if (f > 0.9 && Math.abs(f - Math.round(f)) < 1e-4) {
      const h = Math.floor(n / l.basesPerBin);
      f = Math.round(f);
      const u = [];
      for (let w = 0; w < i; w += 1)
        u[w] = 0;
      for await (const [w, E] of l.lazyArray.range(h, h + f * i - 1))
        u[Math.floor((w - h) / f)] += E;
      return { bins: u, stats: c };
    }
    return { bins: await s.nclist.histogram(n, r, i), stats: c };
  }
  /**
   * Fetch features in a given region. This method is an asynchronous generator
   * yielding feature objects.
   *
   * @param {object} args
   * @param {string} args.refName reference sequence name
   * @param {number} args.start start of region. 0-based half-open.
   * @param {number} args.end end of region. 0-based half-open.
   * @yields {object}
   */
  async *getFeatures({ refName: e, start: n, end: r }) {
    var s;
    const i = await this.getDataRoot(e), a = (s = i.attrs) == null ? void 0 : s.accessors();
    for await (const [o, c] of i.nclist.iterate(n, r)) {
      if (!o.decorated) {
        const l = c.join(",");
        this.decorateFeature(a, o, `${e},${l}`);
      }
      yield o;
    }
  }
  // helper method to recursively add .get and .tags methods to a feature and its
  // subfeatures
  decorateFeature(e, n, r, i) {
    n.get = e.get, n.tags = e.tags, n._uniqueID = r, n.id = Pu, n._parent = i, n.parent = qu, n.children = Gu, (n.get("subfeatures") || []).forEach((a, s) => {
      this.decorateFeature(e, a, `${r}-${s}`, n);
    }), n.decorated = !0;
  }
}
function fe(t) {
  let e = t.length;
  for (; --e >= 0; )
    t[e] = 0;
}
const Xu = 3, Zu = 258, ya = 29, Yu = 256, Ku = Yu + 1 + ya, xa = 30, Ju = 512, Qu = new Array((Ku + 2) * 2);
fe(Qu);
const ju = new Array(xa * 2);
fe(ju);
const th = new Array(Ju);
fe(th);
const eh = new Array(Zu - Xu + 1);
fe(eh);
const nh = new Array(ya);
fe(nh);
const rh = new Array(xa);
fe(rh);
const ih = (t, e, n, r) => {
  let i = t & 65535 | 0, a = t >>> 16 & 65535 | 0, s = 0;
  for (; n !== 0; ) {
    s = n > 2e3 ? 2e3 : n, n -= s;
    do
      i = i + e[r++] | 0, a = a + i | 0;
    while (--s);
    i %= 65521, a %= 65521;
  }
  return i | a << 16 | 0;
};
var zn = ih;
const ah = () => {
  let t, e = [];
  for (var n = 0; n < 256; n++) {
    t = n;
    for (var r = 0; r < 8; r++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    e[n] = t;
  }
  return e;
}, sh = new Uint32Array(ah()), oh = (t, e, n, r) => {
  const i = sh, a = r + n;
  t ^= -1;
  for (let s = r; s < a; s++)
    t = t >>> 8 ^ i[(t ^ e[s]) & 255];
  return t ^ -1;
};
var Mt = oh, Un = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, va = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const lh = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
var ch = function(t) {
  const e = Array.prototype.slice.call(arguments, 1);
  for (; e.length; ) {
    const n = e.shift();
    if (n) {
      if (typeof n != "object")
        throw new TypeError(n + "must be non-object");
      for (const r in n)
        lh(n, r) && (t[r] = n[r]);
    }
  }
  return t;
}, fh = (t) => {
  let e = 0;
  for (let r = 0, i = t.length; r < i; r++)
    e += t[r].length;
  const n = new Uint8Array(e);
  for (let r = 0, i = 0, a = t.length; r < a; r++) {
    let s = t[r];
    n.set(s, i), i += s.length;
  }
  return n;
}, ba = {
  assign: ch,
  flattenChunks: fh
};
let ka = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  ka = !1;
}
const ve = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  ve[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
ve[254] = ve[254] = 1;
var uh = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let e, n, r, i, a, s = t.length, o = 0;
  for (i = 0; i < s; i++)
    n = t.charCodeAt(i), (n & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), o += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (e = new Uint8Array(o), a = 0, i = 0; a < o; i++)
    n = t.charCodeAt(i), (n & 64512) === 55296 && i + 1 < s && (r = t.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), n < 128 ? e[a++] = n : n < 2048 ? (e[a++] = 192 | n >>> 6, e[a++] = 128 | n & 63) : n < 65536 ? (e[a++] = 224 | n >>> 12, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63) : (e[a++] = 240 | n >>> 18, e[a++] = 128 | n >>> 12 & 63, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63);
  return e;
};
const hh = (t, e) => {
  if (e < 65534 && t.subarray && ka)
    return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
  let n = "";
  for (let r = 0; r < e; r++)
    n += String.fromCharCode(t[r]);
  return n;
};
var dh = (t, e) => {
  const n = e || t.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(t.subarray(0, e));
  let r, i;
  const a = new Array(n * 2);
  for (i = 0, r = 0; r < n; ) {
    let s = t[r++];
    if (s < 128) {
      a[i++] = s;
      continue;
    }
    let o = ve[s];
    if (o > 4) {
      a[i++] = 65533, r += o - 1;
      continue;
    }
    for (s &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && r < n; )
      s = s << 6 | t[r++] & 63, o--;
    if (o > 1) {
      a[i++] = 65533;
      continue;
    }
    s < 65536 ? a[i++] = s : (s -= 65536, a[i++] = 55296 | s >> 10 & 1023, a[i++] = 56320 | s & 1023);
  }
  return hh(a, i);
}, ph = (t, e) => {
  e = e || t.length, e > t.length && (e = t.length);
  let n = e - 1;
  for (; n >= 0 && (t[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? e : n + ve[t[n]] > e ? n : e;
}, Pn = {
  string2buf: uh,
  buf2string: dh,
  utf8border: ph
};
function mh() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var gh = mh;
const De = 16209, _h = 16191;
var wh = function(e, n) {
  let r, i, a, s, o, c, l, f, d, h, u, w, E, k, $, g, _, m, x, A, y, T, b, v;
  const p = e.state;
  r = e.next_in, b = e.input, i = r + (e.avail_in - 5), a = e.next_out, v = e.output, s = a - (n - e.avail_out), o = a + (e.avail_out - 257), c = p.dmax, l = p.wsize, f = p.whave, d = p.wnext, h = p.window, u = p.hold, w = p.bits, E = p.lencode, k = p.distcode, $ = (1 << p.lenbits) - 1, g = (1 << p.distbits) - 1;
  t:
    do {
      w < 15 && (u += b[r++] << w, w += 8, u += b[r++] << w, w += 8), _ = E[u & $];
      e:
        for (; ; ) {
          if (m = _ >>> 24, u >>>= m, w -= m, m = _ >>> 16 & 255, m === 0)
            v[a++] = _ & 65535;
          else if (m & 16) {
            x = _ & 65535, m &= 15, m && (w < m && (u += b[r++] << w, w += 8), x += u & (1 << m) - 1, u >>>= m, w -= m), w < 15 && (u += b[r++] << w, w += 8, u += b[r++] << w, w += 8), _ = k[u & g];
            n:
              for (; ; ) {
                if (m = _ >>> 24, u >>>= m, w -= m, m = _ >>> 16 & 255, m & 16) {
                  if (A = _ & 65535, m &= 15, w < m && (u += b[r++] << w, w += 8, w < m && (u += b[r++] << w, w += 8)), A += u & (1 << m) - 1, A > c) {
                    e.msg = "invalid distance too far back", p.mode = De;
                    break t;
                  }
                  if (u >>>= m, w -= m, m = a - s, A > m) {
                    if (m = A - m, m > f && p.sane) {
                      e.msg = "invalid distance too far back", p.mode = De;
                      break t;
                    }
                    if (y = 0, T = h, d === 0) {
                      if (y += l - m, m < x) {
                        x -= m;
                        do
                          v[a++] = h[y++];
                        while (--m);
                        y = a - A, T = v;
                      }
                    } else if (d < m) {
                      if (y += l + d - m, m -= d, m < x) {
                        x -= m;
                        do
                          v[a++] = h[y++];
                        while (--m);
                        if (y = 0, d < x) {
                          m = d, x -= m;
                          do
                            v[a++] = h[y++];
                          while (--m);
                          y = a - A, T = v;
                        }
                      }
                    } else if (y += d - m, m < x) {
                      x -= m;
                      do
                        v[a++] = h[y++];
                      while (--m);
                      y = a - A, T = v;
                    }
                    for (; x > 2; )
                      v[a++] = T[y++], v[a++] = T[y++], v[a++] = T[y++], x -= 3;
                    x && (v[a++] = T[y++], x > 1 && (v[a++] = T[y++]));
                  } else {
                    y = a - A;
                    do
                      v[a++] = v[y++], v[a++] = v[y++], v[a++] = v[y++], x -= 3;
                    while (x > 2);
                    x && (v[a++] = v[y++], x > 1 && (v[a++] = v[y++]));
                  }
                } else if (m & 64) {
                  e.msg = "invalid distance code", p.mode = De;
                  break t;
                } else {
                  _ = k[(_ & 65535) + (u & (1 << m) - 1)];
                  continue n;
                }
                break;
              }
          } else if (m & 64)
            if (m & 32) {
              p.mode = _h;
              break t;
            } else {
              e.msg = "invalid literal/length code", p.mode = De;
              break t;
            }
          else {
            _ = E[(_ & 65535) + (u & (1 << m) - 1)];
            continue e;
          }
          break;
        }
    } while (r < i && a < o);
  x = w >> 3, r -= x, w -= x << 3, u &= (1 << w) - 1, e.next_in = r, e.next_out = a, e.avail_in = r < i ? 5 + (i - r) : 5 - (r - i), e.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), p.hold = u, p.bits = w;
};
const ne = 15, zr = 852, Ur = 592, Pr = 0, mn = 1, qr = 2, yh = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), xh = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]), vh = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), bh = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), kh = (t, e, n, r, i, a, s, o) => {
  const c = o.bits;
  let l = 0, f = 0, d = 0, h = 0, u = 0, w = 0, E = 0, k = 0, $ = 0, g = 0, _, m, x, A, y, T = null, b;
  const v = new Uint16Array(ne + 1), p = new Uint16Array(ne + 1);
  let D = null, M, F, Y;
  for (l = 0; l <= ne; l++)
    v[l] = 0;
  for (f = 0; f < r; f++)
    v[e[n + f]]++;
  for (u = c, h = ne; h >= 1 && v[h] === 0; h--)
    ;
  if (u > h && (u = h), h === 0)
    return i[a++] = 1 << 24 | 64 << 16 | 0, i[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (d = 1; d < h && v[d] === 0; d++)
    ;
  for (u < d && (u = d), k = 1, l = 1; l <= ne; l++)
    if (k <<= 1, k -= v[l], k < 0)
      return -1;
  if (k > 0 && (t === Pr || h !== 1))
    return -1;
  for (p[1] = 0, l = 1; l < ne; l++)
    p[l + 1] = p[l] + v[l];
  for (f = 0; f < r; f++)
    e[n + f] !== 0 && (s[p[e[n + f]]++] = f);
  if (t === Pr ? (T = D = s, b = 20) : t === mn ? (T = yh, D = xh, b = 257) : (T = vh, D = bh, b = 0), g = 0, f = 0, l = d, y = a, w = u, E = 0, x = -1, $ = 1 << u, A = $ - 1, t === mn && $ > zr || t === qr && $ > Ur)
    return 1;
  for (; ; ) {
    M = l - E, s[f] + 1 < b ? (F = 0, Y = s[f]) : s[f] >= b ? (F = D[s[f] - b], Y = T[s[f] - b]) : (F = 96, Y = 0), _ = 1 << l - E, m = 1 << w, d = m;
    do
      m -= _, i[y + (g >> E) + m] = M << 24 | F << 16 | Y | 0;
    while (m !== 0);
    for (_ = 1 << l - 1; g & _; )
      _ >>= 1;
    if (_ !== 0 ? (g &= _ - 1, g += _) : g = 0, f++, --v[l] === 0) {
      if (l === h)
        break;
      l = e[n + s[f]];
    }
    if (l > u && (g & A) !== x) {
      for (E === 0 && (E = u), y += d, w = l - E, k = 1 << w; w + E < h && (k -= v[w + E], !(k <= 0)); )
        w++, k <<= 1;
      if ($ += 1 << w, t === mn && $ > zr || t === qr && $ > Ur)
        return 1;
      x = g & A, i[x] = u << 24 | w << 16 | y - a | 0;
    }
  }
  return g !== 0 && (i[y + g] = l - E << 24 | 64 << 16 | 0), o.bits = u, 0;
};
var ge = kh;
const $h = 0, $a = 1, Aa = 2, {
  Z_FINISH: Gr,
  Z_BLOCK: Ah,
  Z_TREES: Le,
  Z_OK: Qt,
  Z_STREAM_END: Th,
  Z_NEED_DICT: Eh,
  Z_STREAM_ERROR: At,
  Z_DATA_ERROR: Ta,
  Z_MEM_ERROR: Ea,
  Z_BUF_ERROR: Sh,
  Z_DEFLATED: Wr
} = va, ln = 16180, Xr = 16181, Zr = 16182, Yr = 16183, Kr = 16184, Jr = 16185, Qr = 16186, jr = 16187, ti = 16188, ei = 16189, nn = 16190, Ft = 16191, gn = 16192, ni = 16193, _n = 16194, ri = 16195, ii = 16196, ai = 16197, si = 16198, Oe = 16199, Fe = 16200, oi = 16201, li = 16202, ci = 16203, fi = 16204, ui = 16205, wn = 16206, hi = 16207, di = 16208, J = 16209, Sa = 16210, Na = 16211, Nh = 852, Rh = 592, Mh = 15, Ih = Mh, pi = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function Dh() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const te = (t) => {
  if (!t)
    return 1;
  const e = t.state;
  return !e || e.strm !== t || e.mode < ln || e.mode > Na ? 1 : 0;
}, Ra = (t) => {
  if (te(t))
    return At;
  const e = t.state;
  return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = e.wrap & 1), e.mode = ln, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(Nh), e.distcode = e.distdyn = new Int32Array(Rh), e.sane = 1, e.back = -1, Qt;
}, Ma = (t) => {
  if (te(t))
    return At;
  const e = t.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, Ra(t);
}, Ia = (t, e) => {
  let n;
  if (te(t))
    return At;
  const r = t.state;
  return e < 0 ? (n = 0, e = -e) : (n = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? At : (r.window !== null && r.wbits !== e && (r.window = null), r.wrap = n, r.wbits = e, Ma(t));
}, Da = (t, e) => {
  if (!t)
    return At;
  const n = new Dh();
  t.state = n, n.strm = t, n.window = null, n.mode = ln;
  const r = Ia(t, e);
  return r !== Qt && (t.state = null), r;
}, Lh = (t) => Da(t, Ih);
let mi = !0, yn, xn;
const Oh = (t) => {
  if (mi) {
    yn = new Int32Array(512), xn = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      t.lens[e++] = 8;
    for (; e < 256; )
      t.lens[e++] = 9;
    for (; e < 280; )
      t.lens[e++] = 7;
    for (; e < 288; )
      t.lens[e++] = 8;
    for (ge($a, t.lens, 0, 288, yn, 0, t.work, { bits: 9 }), e = 0; e < 32; )
      t.lens[e++] = 5;
    ge(Aa, t.lens, 0, 32, xn, 0, t.work, { bits: 5 }), mi = !1;
  }
  t.lencode = yn, t.lenbits = 9, t.distcode = xn, t.distbits = 5;
}, La = (t, e, n, r) => {
  let i;
  const a = t.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), r >= a.wsize ? (a.window.set(e.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), a.window.set(e.subarray(n - r, n - r + i), a.wnext), r -= i, r ? (a.window.set(e.subarray(n - r, n), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
}, Fh = (t, e) => {
  let n, r, i, a, s, o, c, l, f, d, h, u, w, E, k = 0, $, g, _, m, x, A, y, T;
  const b = new Uint8Array(4);
  let v, p;
  const D = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (te(t) || !t.output || !t.input && t.avail_in !== 0)
    return At;
  n = t.state, n.mode === Ft && (n.mode = gn), s = t.next_out, i = t.output, c = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = n.hold, f = n.bits, d = o, h = c, T = Qt;
  t:
    for (; ; )
      switch (n.mode) {
        case ln:
          if (n.wrap === 0) {
            n.mode = gn;
            break;
          }
          for (; f < 16; ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          if (n.wrap & 2 && l === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, b[0] = l & 255, b[1] = l >>> 8 & 255, n.check = Mt(n.check, b, 2, 0), l = 0, f = 0, n.mode = Xr;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((l & 255) << 8) + (l >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = J;
            break;
          }
          if ((l & 15) !== Wr) {
            t.msg = "unknown compression method", n.mode = J;
            break;
          }
          if (l >>>= 4, f -= 4, y = (l & 15) + 8, n.wbits === 0 && (n.wbits = y), y > 15 || y > n.wbits) {
            t.msg = "invalid window size", n.mode = J;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = l & 512 ? ei : Ft, l = 0, f = 0;
          break;
        case Xr:
          for (; f < 16; ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          if (n.flags = l, (n.flags & 255) !== Wr) {
            t.msg = "unknown compression method", n.mode = J;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = J;
            break;
          }
          n.head && (n.head.text = l >> 8 & 1), n.flags & 512 && n.wrap & 4 && (b[0] = l & 255, b[1] = l >>> 8 & 255, n.check = Mt(n.check, b, 2, 0)), l = 0, f = 0, n.mode = Zr;
        /* falls through */
        case Zr:
          for (; f < 32; ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          n.head && (n.head.time = l), n.flags & 512 && n.wrap & 4 && (b[0] = l & 255, b[1] = l >>> 8 & 255, b[2] = l >>> 16 & 255, b[3] = l >>> 24 & 255, n.check = Mt(n.check, b, 4, 0)), l = 0, f = 0, n.mode = Yr;
        /* falls through */
        case Yr:
          for (; f < 16; ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          n.head && (n.head.xflags = l & 255, n.head.os = l >> 8), n.flags & 512 && n.wrap & 4 && (b[0] = l & 255, b[1] = l >>> 8 & 255, n.check = Mt(n.check, b, 2, 0)), l = 0, f = 0, n.mode = Kr;
        /* falls through */
        case Kr:
          if (n.flags & 1024) {
            for (; f < 16; ) {
              if (o === 0)
                break t;
              o--, l += r[a++] << f, f += 8;
            }
            n.length = l, n.head && (n.head.extra_len = l), n.flags & 512 && n.wrap & 4 && (b[0] = l & 255, b[1] = l >>> 8 & 255, n.check = Mt(n.check, b, 2, 0)), l = 0, f = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Jr;
        /* falls through */
        case Jr:
          if (n.flags & 1024 && (u = n.length, u > o && (u = o), u && (n.head && (y = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            r.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + u
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            y
          )), n.flags & 512 && n.wrap & 4 && (n.check = Mt(n.check, r, u, a)), o -= u, a += u, n.length -= u), n.length))
            break t;
          n.length = 0, n.mode = Qr;
        /* falls through */
        case Qr:
          if (n.flags & 2048) {
            if (o === 0)
              break t;
            u = 0;
            do
              y = r[a + u++], n.head && y && n.length < 65536 && (n.head.name += String.fromCharCode(y));
            while (y && u < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = Mt(n.check, r, u, a)), o -= u, a += u, y)
              break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = jr;
        /* falls through */
        case jr:
          if (n.flags & 4096) {
            if (o === 0)
              break t;
            u = 0;
            do
              y = r[a + u++], n.head && y && n.length < 65536 && (n.head.comment += String.fromCharCode(y));
            while (y && u < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = Mt(n.check, r, u, a)), o -= u, a += u, y)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = ti;
        /* falls through */
        case ti:
          if (n.flags & 512) {
            for (; f < 16; ) {
              if (o === 0)
                break t;
              o--, l += r[a++] << f, f += 8;
            }
            if (n.wrap & 4 && l !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = J;
              break;
            }
            l = 0, f = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = Ft;
          break;
        case ei:
          for (; f < 32; ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          t.adler = n.check = pi(l), l = 0, f = 0, n.mode = nn;
        /* falls through */
        case nn:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = l, n.bits = f, Eh;
          t.adler = n.check = 1, n.mode = Ft;
        /* falls through */
        case Ft:
          if (e === Ah || e === Le)
            break t;
        /* falls through */
        case gn:
          if (n.last) {
            l >>>= f & 7, f -= f & 7, n.mode = wn;
            break;
          }
          for (; f < 3; ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          switch (n.last = l & 1, l >>>= 1, f -= 1, l & 3) {
            case 0:
              n.mode = ni;
              break;
            case 1:
              if (Oh(n), n.mode = Oe, e === Le) {
                l >>>= 2, f -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = ii;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = J;
          }
          l >>>= 2, f -= 2;
          break;
        case ni:
          for (l >>>= f & 7, f -= f & 7; f < 32; ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          if ((l & 65535) !== (l >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = J;
            break;
          }
          if (n.length = l & 65535, l = 0, f = 0, n.mode = _n, e === Le)
            break t;
        /* falls through */
        case _n:
          n.mode = ri;
        /* falls through */
        case ri:
          if (u = n.length, u) {
            if (u > o && (u = o), u > c && (u = c), u === 0)
              break t;
            i.set(r.subarray(a, a + u), s), o -= u, a += u, c -= u, s += u, n.length -= u;
            break;
          }
          n.mode = Ft;
          break;
        case ii:
          for (; f < 14; ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          if (n.nlen = (l & 31) + 257, l >>>= 5, f -= 5, n.ndist = (l & 31) + 1, l >>>= 5, f -= 5, n.ncode = (l & 15) + 4, l >>>= 4, f -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = J;
            break;
          }
          n.have = 0, n.mode = ai;
        /* falls through */
        case ai:
          for (; n.have < n.ncode; ) {
            for (; f < 3; ) {
              if (o === 0)
                break t;
              o--, l += r[a++] << f, f += 8;
            }
            n.lens[D[n.have++]] = l & 7, l >>>= 3, f -= 3;
          }
          for (; n.have < 19; )
            n.lens[D[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, v = { bits: n.lenbits }, T = ge($h, n.lens, 0, 19, n.lencode, 0, n.work, v), n.lenbits = v.bits, T) {
            t.msg = "invalid code lengths set", n.mode = J;
            break;
          }
          n.have = 0, n.mode = si;
        /* falls through */
        case si:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; k = n.lencode[l & (1 << n.lenbits) - 1], $ = k >>> 24, g = k >>> 16 & 255, _ = k & 65535, !($ <= f); ) {
              if (o === 0)
                break t;
              o--, l += r[a++] << f, f += 8;
            }
            if (_ < 16)
              l >>>= $, f -= $, n.lens[n.have++] = _;
            else {
              if (_ === 16) {
                for (p = $ + 2; f < p; ) {
                  if (o === 0)
                    break t;
                  o--, l += r[a++] << f, f += 8;
                }
                if (l >>>= $, f -= $, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = J;
                  break;
                }
                y = n.lens[n.have - 1], u = 3 + (l & 3), l >>>= 2, f -= 2;
              } else if (_ === 17) {
                for (p = $ + 3; f < p; ) {
                  if (o === 0)
                    break t;
                  o--, l += r[a++] << f, f += 8;
                }
                l >>>= $, f -= $, y = 0, u = 3 + (l & 7), l >>>= 3, f -= 3;
              } else {
                for (p = $ + 7; f < p; ) {
                  if (o === 0)
                    break t;
                  o--, l += r[a++] << f, f += 8;
                }
                l >>>= $, f -= $, y = 0, u = 11 + (l & 127), l >>>= 7, f -= 7;
              }
              if (n.have + u > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = J;
                break;
              }
              for (; u--; )
                n.lens[n.have++] = y;
            }
          }
          if (n.mode === J)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = J;
            break;
          }
          if (n.lenbits = 9, v = { bits: n.lenbits }, T = ge($a, n.lens, 0, n.nlen, n.lencode, 0, n.work, v), n.lenbits = v.bits, T) {
            t.msg = "invalid literal/lengths set", n.mode = J;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, v = { bits: n.distbits }, T = ge(Aa, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, v), n.distbits = v.bits, T) {
            t.msg = "invalid distances set", n.mode = J;
            break;
          }
          if (n.mode = Oe, e === Le)
            break t;
        /* falls through */
        case Oe:
          n.mode = Fe;
        /* falls through */
        case Fe:
          if (o >= 6 && c >= 258) {
            t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = l, n.bits = f, wh(t, h), s = t.next_out, i = t.output, c = t.avail_out, a = t.next_in, r = t.input, o = t.avail_in, l = n.hold, f = n.bits, n.mode === Ft && (n.back = -1);
            break;
          }
          for (n.back = 0; k = n.lencode[l & (1 << n.lenbits) - 1], $ = k >>> 24, g = k >>> 16 & 255, _ = k & 65535, !($ <= f); ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          if (g && !(g & 240)) {
            for (m = $, x = g, A = _; k = n.lencode[A + ((l & (1 << m + x) - 1) >> m)], $ = k >>> 24, g = k >>> 16 & 255, _ = k & 65535, !(m + $ <= f); ) {
              if (o === 0)
                break t;
              o--, l += r[a++] << f, f += 8;
            }
            l >>>= m, f -= m, n.back += m;
          }
          if (l >>>= $, f -= $, n.back += $, n.length = _, g === 0) {
            n.mode = ui;
            break;
          }
          if (g & 32) {
            n.back = -1, n.mode = Ft;
            break;
          }
          if (g & 64) {
            t.msg = "invalid literal/length code", n.mode = J;
            break;
          }
          n.extra = g & 15, n.mode = oi;
        /* falls through */
        case oi:
          if (n.extra) {
            for (p = n.extra; f < p; ) {
              if (o === 0)
                break t;
              o--, l += r[a++] << f, f += 8;
            }
            n.length += l & (1 << n.extra) - 1, l >>>= n.extra, f -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = li;
        /* falls through */
        case li:
          for (; k = n.distcode[l & (1 << n.distbits) - 1], $ = k >>> 24, g = k >>> 16 & 255, _ = k & 65535, !($ <= f); ) {
            if (o === 0)
              break t;
            o--, l += r[a++] << f, f += 8;
          }
          if (!(g & 240)) {
            for (m = $, x = g, A = _; k = n.distcode[A + ((l & (1 << m + x) - 1) >> m)], $ = k >>> 24, g = k >>> 16 & 255, _ = k & 65535, !(m + $ <= f); ) {
              if (o === 0)
                break t;
              o--, l += r[a++] << f, f += 8;
            }
            l >>>= m, f -= m, n.back += m;
          }
          if (l >>>= $, f -= $, n.back += $, g & 64) {
            t.msg = "invalid distance code", n.mode = J;
            break;
          }
          n.offset = _, n.extra = g & 15, n.mode = ci;
        /* falls through */
        case ci:
          if (n.extra) {
            for (p = n.extra; f < p; ) {
              if (o === 0)
                break t;
              o--, l += r[a++] << f, f += 8;
            }
            n.offset += l & (1 << n.extra) - 1, l >>>= n.extra, f -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = J;
            break;
          }
          n.mode = fi;
        /* falls through */
        case fi:
          if (c === 0)
            break t;
          if (u = h - c, n.offset > u) {
            if (u = n.offset - u, u > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = J;
              break;
            }
            u > n.wnext ? (u -= n.wnext, w = n.wsize - u) : w = n.wnext - u, u > n.length && (u = n.length), E = n.window;
          } else
            E = i, w = s - n.offset, u = n.length;
          u > c && (u = c), c -= u, n.length -= u;
          do
            i[s++] = E[w++];
          while (--u);
          n.length === 0 && (n.mode = Fe);
          break;
        case ui:
          if (c === 0)
            break t;
          i[s++] = n.length, c--, n.mode = Fe;
          break;
        case wn:
          if (n.wrap) {
            for (; f < 32; ) {
              if (o === 0)
                break t;
              o--, l |= r[a++] << f, f += 8;
            }
            if (h -= c, t.total_out += h, n.total += h, n.wrap & 4 && h && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? Mt(n.check, i, h, s - h) : zn(n.check, i, h, s - h)), h = c, n.wrap & 4 && (n.flags ? l : pi(l)) !== n.check) {
              t.msg = "incorrect data check", n.mode = J;
              break;
            }
            l = 0, f = 0;
          }
          n.mode = hi;
        /* falls through */
        case hi:
          if (n.wrap && n.flags) {
            for (; f < 32; ) {
              if (o === 0)
                break t;
              o--, l += r[a++] << f, f += 8;
            }
            if (n.wrap & 4 && l !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = J;
              break;
            }
            l = 0, f = 0;
          }
          n.mode = di;
        /* falls through */
        case di:
          T = Th;
          break t;
        case J:
          T = Ta;
          break t;
        case Sa:
          return Ea;
        case Na:
        /* falls through */
        default:
          return At;
      }
  return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = l, n.bits = f, (n.wsize || h !== t.avail_out && n.mode < J && (n.mode < wn || e !== Gr)) && La(t, t.output, t.next_out, h - t.avail_out), d -= t.avail_in, h -= t.avail_out, t.total_in += d, t.total_out += h, n.total += h, n.wrap & 4 && h && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? Mt(n.check, i, h, t.next_out - h) : zn(n.check, i, h, t.next_out - h)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === Ft ? 128 : 0) + (n.mode === Oe || n.mode === _n ? 256 : 0), (d === 0 && h === 0 || e === Gr) && T === Qt && (T = Sh), T;
}, Hh = (t) => {
  if (te(t))
    return At;
  let e = t.state;
  return e.window && (e.window = null), t.state = null, Qt;
}, Vh = (t, e) => {
  if (te(t))
    return At;
  const n = t.state;
  return n.wrap & 2 ? (n.head = e, e.done = !1, Qt) : At;
}, Ch = (t, e) => {
  const n = e.length;
  let r, i, a;
  return te(t) || (r = t.state, r.wrap !== 0 && r.mode !== nn) ? At : r.mode === nn && (i = 1, i = zn(i, e, n, 0), i !== r.check) ? Ta : (a = La(t, e, n, n), a ? (r.mode = Sa, Ea) : (r.havedict = 1, Qt));
};
var Bh = Ma, zh = Ia, Uh = Ra, Ph = Lh, qh = Da, Gh = Fh, Wh = Hh, Xh = Vh, Zh = Ch, Yh = "pako inflate (from Nodeca project)", Ht = {
  inflateReset: Bh,
  inflateReset2: zh,
  inflateResetKeep: Uh,
  inflateInit: Ph,
  inflateInit2: qh,
  inflate: Gh,
  inflateEnd: Wh,
  inflateGetHeader: Xh,
  inflateSetDictionary: Zh,
  inflateInfo: Yh
};
function Kh() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Jh = Kh;
const Oa = Object.prototype.toString, {
  Z_NO_FLUSH: Qh,
  Z_FINISH: jh,
  Z_OK: be,
  Z_STREAM_END: vn,
  Z_NEED_DICT: bn,
  Z_STREAM_ERROR: t0,
  Z_DATA_ERROR: gi,
  Z_MEM_ERROR: e0
} = va;
function cn(t) {
  this.options = ba.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15 || (e.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new gh(), this.strm.avail_out = 0;
  let n = Ht.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (n !== be)
    throw new Error(Un[n]);
  if (this.header = new Jh(), Ht.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = Pn.string2buf(e.dictionary) : Oa.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = Ht.inflateSetDictionary(this.strm, e.dictionary), n !== be)))
    throw new Error(Un[n]);
}
cn.prototype.push = function(t, e) {
  const n = this.strm, r = this.options.chunkSize, i = this.options.dictionary;
  let a, s, o;
  if (this.ended) return !1;
  for (e === ~~e ? s = e : s = e === !0 ? jh : Qh, Oa.call(t) === "[object ArrayBuffer]" ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length; ; ) {
    for (n.avail_out === 0 && (n.output = new Uint8Array(r), n.next_out = 0, n.avail_out = r), a = Ht.inflate(n, s), a === bn && i && (a = Ht.inflateSetDictionary(n, i), a === be ? a = Ht.inflate(n, s) : a === gi && (a = bn)); n.avail_in > 0 && a === vn && n.state.wrap > 0 && t[n.next_in] !== 0; )
      Ht.inflateReset(n), a = Ht.inflate(n, s);
    switch (a) {
      case t0:
      case gi:
      case bn:
      case e0:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (o = n.avail_out, n.next_out && (n.avail_out === 0 || a === vn))
      if (this.options.to === "string") {
        let c = Pn.utf8border(n.output, n.next_out), l = n.next_out - c, f = Pn.buf2string(n.output, c);
        n.next_out = l, n.avail_out = r - l, l && n.output.set(n.output.subarray(c, c + l), 0), this.onData(f);
      } else
        this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
    if (!(a === be && o === 0)) {
      if (a === vn)
        return a = Ht.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (n.avail_in === 0) break;
    }
  }
  return !0;
};
cn.prototype.onData = function(t) {
  this.chunks.push(t);
};
cn.prototype.onEnd = function(t) {
  t === be && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = ba.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function n0(t, e) {
  const n = new cn(e);
  if (n.push(t), n.err) throw n.msg || Un[n.err];
  return n.result;
}
var r0 = n0, i0 = {
  inflate: r0
};
const { inflate: a0 } = i0;
var s0 = a0;
const o0 = { refName: "seq_id" }, l0 = { seq_id: "refName" };
class rn {
  constructor(e, n, r) {
    this.ncFeature = e, this.uniqueId = r || e.id(), this.parentHandle = n;
  }
  jb2TagToJb1Tag(e) {
    return (o0[e] || e).toLowerCase();
  }
  jb1TagToJb2Tag(e) {
    const n = e.toLowerCase();
    return l0[n] || n;
  }
  get(e) {
    const n = this.ncFeature.get(this.jb2TagToJb1Tag(e));
    return n && e === "subfeatures" ? n.map((r) => new rn(r, this)) : n;
  }
  /**
   * Get an array listing which data keys are present in this feature.
   */
  tags() {
    return this.ncFeature.tags().map((e) => this.jb1TagToJb2Tag(e));
  }
  /**
   * Get the unique ID of this feature.
   */
  id() {
    return this.uniqueId;
  }
  /**
   * Get this feature's parent feature, or undefined if none.
   */
  parent() {
    return this.parentHandle;
  }
  /**
   * Get an array of child features, or undefined if none.
   */
  children() {
    return this.get("subfeatures");
  }
  toJSON() {
    const e = { uniqueId: this.id(), subfeatures: [] };
    return this.ncFeature.tags().forEach((n) => {
      const r = this.jb1TagToJb2Tag(n), i = this.ncFeature.get(n);
      r === "subfeatures" ? e.children = (i || []).map(
        (a) => new rn(a, this).toJSON()
      ) : e[r] = i;
    }), {
      ...e,
      fmin: e.start,
      fmax: e.end,
      seqId: e.refName
    };
  }
}
function c0(t) {
  return t[0] === 31 && t[1] === 139 && t[2] === 8;
}
async function f0(t) {
  const e = await fetch(t);
  if (!e.ok)
    throw new Error(`HTTP ${e.status} fetching ${t}`);
  const n = await e.arrayBuffer();
  return c0(new Uint8Array(n)) ? s0(n) : n;
}
async function u0({
  urlTemplate: t,
  baseUrl: e,
  chromosome: n,
  start: r,
  end: i
}) {
  const a = new Wu({
    urlTemplate: t,
    baseUrl: e,
    readFile: f0
  }), s = [];
  for await (const o of a.getFeatures({
    refName: n,
    start: r,
    end: i
  }))
    s.push(new rn(o).toJSON());
  return s;
}
jt.prototype.first = function() {
  return Z(this.nodes()[0]);
};
jt.prototype.last = function() {
  return Z(this.nodes()[this.size() - 1]);
};
class h0 {
  constructor(e, n, r, i) {
    this.height = i, this.width = r, this.config = e, this.svg_target = n, this.viewer = this._initViewer(n), this.draw();
  }
  generateLegend() {
    return jc();
  }
  get tracks() {
    return this.config.tracks ?? [];
  }
  get genome() {
    return this.config.genome;
  }
  closeModal() {
    for (const e of document.getElementsByClassName("gfc-tooltip"))
      e.style.visibility = "hidden";
  }
  setSelectedAlleles(e, n) {
    const r = Z(n);
    r.selectAll(".highlight").remove(), r.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((i) => i.selected).style("stroke", null).datum((i) => (i.selected = "false", i)), ji(e, r);
  }
  _initViewer(e) {
    Z(e).selectAll("*").remove();
    const n = Z(e), i = `${e.replace("#", "")} main-view`;
    if (this.config.locale === "global") {
      const a = {
        top: 8,
        right: 30,
        bottom: 30,
        left: 40
      };
      n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${a.left},${a.top})`).attr("class", i), this.width = this.width - a.left - a.right, this.height = this.height - a.top - a.bottom;
    } else {
      const a = {
        top: 10,
        bottom: 10
      };
      n.attr("width", this.width).attr("height", this.height).append("g").attr("class", i), this.height = this.height - a.top - a.bottom;
    }
    return Z(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    const e = this.width, n = this.config.transcriptTypes ?? [
      "mRNA",
      "ncRNA",
      "piRNA",
      "lincRNA",
      "miRNA",
      "pre_miRNA",
      "snoRNA",
      "lnc_RNA",
      "tRNA",
      "snRNA",
      "rRNA",
      "ARS",
      "antisense_RNA",
      "C_gene_segment",
      "V_gene_segment",
      "pseudogene_attribute",
      "snoRNA_gene",
      "polypeptide_region",
      "mature_protein_region"
    ], r = this.config.variantTypes ?? [
      "point_mutation",
      "MNV",
      "Deletion",
      "Insertion",
      "Delins"
    ], i = this.config.binRatio ?? 0.01, a = this.config, s = this._configureRange(
      a.region.start,
      a.region.end,
      e
    ), o = s.range, c = a.region.chromosome, l = a.variantFilter ?? [], f = a.isoformFilter ?? [], d = a.htpVariant ?? "", h = s.start, u = s.end;
    new af({
      viewer: this.viewer,
      track: {
        chromosome: c,
        start: h,
        end: u,
        range: s.range
      },
      height: this.height,
      width: e
    }).DrawOverviewTrack();
    let k = 100;
    const $ = !0, { viewer: g, genome: _, height: m, tracks: x } = this, A = { start: h, end: u, chromosome: c };
    Promise.all(
      x.map(async (y) => {
        const { variantData: T, trackData: b } = y;
        if (y.type === he.ISOFORM_AND_VARIANT) {
          const v = new ef({
            region: A,
            viewer: g,
            height: m,
            width: e,
            transcriptTypes: n,
            variantTypes: r,
            showVariantLabel: $,
            trackData: b,
            variantData: T,
            variantFilter: l,
            binRatio: i,
            isoformFilter: f
          });
          k += v.DrawTrack();
        } else if (y.type === he.ISOFORM_EMBEDDED_VARIANT) {
          const v = new nf({
            viewer: g,
            height: m,
            width: e,
            transcriptTypes: n,
            variantData: T,
            trackData: b,
            variantTypes: r,
            showVariantLabel: $,
            variantFilter: l
          });
          k += v.DrawTrack();
        } else if (y.type === he.ISOFORM) {
          const v = new rf({
            region: A,
            viewer: g,
            height: m,
            width: e,
            genome: _,
            trackData: b,
            transcriptTypes: n,
            htpVariant: d
          });
          k += v.DrawTrack();
        } else if (y.type === he.VARIANT) {
          const v = new Nu({
            region: A,
            viewer: g,
            range: o,
            height: m,
            width: e
          });
          await v.getTrackData(), v.DrawTrack();
        } else if (y.type === he.VARIANT_GLOBAL) {
          const v = new Ru({
            region: A,
            viewer: g,
            track: {
              ...y,
              range: o
            },
            height: m,
            width: e
          });
          await v.getTrackData(), v.DrawTrack();
        } else
          console.error(`TrackType not found for ${y.id}...`, y.type);
        Z(this.svg_target).attr("height", k);
      })
    ).catch((y) => {
      console.error(y);
    });
  }
  // Configure the range for our tracks two use cases
  //    1. Entered with a position
  //    2. TODO: Entered with a range start at 0?
  //    3. Are we in overview or scrollable?
  _configureRange(e, n, r) {
    let i = null;
    const a = 17;
    let s = 0, o = [0, 0];
    if (e === n) {
      i = 300, s = a * i, e = e - i / 2 - 1, n = n + i / 2;
      const c = (
        // @ts-expect-error
        Z("#clip-rect").node().getBoundingClientRect().width / 2 + 100
      );
      o = [
        c - s / 2,
        c + s / 2
      ];
    } else
      return {
        range: [0, r],
        start: e,
        end: n
      };
    return {
      range: o,
      start: e,
      end: n
    };
  }
}
export {
  h0 as default,
  u0 as fetchNCListData
};
