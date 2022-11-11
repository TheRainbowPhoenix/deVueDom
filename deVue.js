/*
    TODO : Place your component-specific functions and variables here !!
    You'll see in the console "Undefined : stuff". take a look at the code to see if 
*/

/*
    END.
*/

var vm = new Proxy(window, {
  get(target, name) {
    if (target[name] !== undefined) return target[name];

    if (name.startsWith("is")) {
      console.log(`Undefined boolean : ${name}, returning true ...`);
      return true;
    }
    console.log(`Undefined : ${name}`);
    return "" + name;
  },
});

var VNode = function VNode(tag, data, child, text, elm, context, comment) {
  this.tag = tag;
  this.data = data;
  this.children = child;
  this.text = text;
  this.elm = elm;
  this.context = context;
  this.comment = comment;
};

function _createEmpty(text) {
  if (text === undefined) text = "";
  var node = new VNode();
  node.comment = " missing ";
  node.text = text;
  return node;
}

function $createElement(context, tag, data, child) {
  if (Array.isArray(data)) {
    child = data;
    data = undefined;
  }
  var vnode = new VNode(tag, data, child, undefined);
  if (vnode) {
    return vnode;
  }
  return _createEmpty();
}

function _v(val) {
  // create text VNode
  return new VNode(undefined, undefined, undefined, String(val));
  // console.log(`_v ${prop}`);
}

function _s(val) {
  // toString
  // console.log("_s ", prop);
  return val == null
    ? ""
    : Array.isArray(val)
    ? JSON.stringify(val, null, 2)
    : val.toString();
}

function $t(name) {
  // i18n translated
  return `{$t("${name}")}`;
}

function _e() {
  return _createEmpty();
}

function _l(val, render) {
  // list

  let args = render
    .toString()
    .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/gm, "")
    .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
    .split(/,/);

  //   let callArs = args
  //     ? args.map(
  //         (v) =>
  //           new Proxy(String, {
  //             get(target, name) {
  //               if (name) {
  //                 console.log(name);
  //                 return () => {
  //                   `${v}`;
  //                 };
  //               }
  //               return `${v}`;
  //             },
  //           })
  //       )
  //     : "__val__";

  return $createElement(
    vm,
    "_Loop",
    {
      attrs: {
        each: `${val} as ${
          args && Array.isArray(args) && args?.length > 0
            ? args?.length > 1
              ? `(${args.join(", ")})`
              : args[0]
            : "__val__"
        }`,
      },
    },
    [render.call(vm, ...args)]
  );
}

function _u() {
  // resolveScopedSlots
  return _createEmpty();
}

function _b(data, tag, value, asProp, isSync) {
  // bind node
  /*
    _vm._b(
        { on: { "hook:mounted": _vm.updateStickyElements } },
        "nav-bar",
        _vm.navbarProps,
        false
    )
  */
  //   if (data?.on) {
  //     for (const [attr, value] of Object.entries(data.on)) {
  //       el.setAttribute(`on:${attr}`, Object.keys({ value })[0]);
  //     }
  //   }
  return {
    data: data,
  };
}

var _self = {
  _c: (tag, data, child) => {
    return $createElement(vm, tag, data, child);
  },
};

function buildDom(vnode) {
  if (vnode.tag == undefined) {
    if (vnode.text !== undefined) {
      return document.createTextNode(vnode.text);
    }
    if (vnode.comment !== undefined) {
      return document.createComment(`<!-- ${vnode.comment} -->`);
    }
    return document.createTextNode("");
  }
  let el = document.createElement(vnode.tag);
  if (vnode.data?.staticClass) {
    el.className = vnode.data?.staticClass;
  }

  if (vnode.data?.attrs) {
    for (const [attr, value] of Object.entries(vnode.data.attrs)) {
      el.setAttribute(attr, value || "");
    }
  }

  if (vnode.data?.class && Array.isArray(vnode.data.class)) {
    for (const cls of vnode.data.class) {
      el.setAttribute(`class:${cls}`, "{ TODOCheckMe || true}");
      //   el.classList.add(cls);
    }
  }

  if (vnode.data?.on) {
    for (const [attr, value] of Object.entries(vnode.data.on)) {
      el.setAttribute(`on:${attr}`, value);
    }
  }

  if (vnode.children !== undefined) {
    if (Array.isArray(vnode.children)) {
      for (const child of vnode.children) {
        let elm = buildDom(child);
        elm && el.appendChild(elm);
      }
    } else {
      console.log(vnode.children);
      let elm = buildDom(vnode.children);
      elm && el.appendChild(elm);
    }
  }

  if (vnode.text !== undefined) {
    var textnode = document.createTextNode(vnode.text);
    el.appendChild(textnode);
  }
  return el;
}

function flush(vdom) {
  let $root = document.createElement("app");
  console.log(vdom);

  let elm = buildDom(vdom);
  elm && $root.appendChild(elm);

  document.body.appendChild($root);
}

/*
====================================================================================================
TODO: Paste here the code in the render() return
====================================================================================================
*/

var render = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "content-wrapper" }, [
    _c("div", { staticClass: "content" }, [
      _c(
        "div",
        {
          staticClass: "wrap",
        },
        [
          _c("div", { staticClass: "error-message" }, [
            _c("h1", { staticClass: "title" }, [
              _vm._v(_vm._s(_vm.$t("page_title"))),
            ]),
            _c("p", { staticClass: "subtitle" }, [
              _vm._v(_vm._s(_vm.$t("subtitle"))),
            ]),
          ]),
        ],
        1
      ),
    ]),
  ]);
};

/*
====================================================================================================
END HERE
====================================================================================================
*/

flush(render.call(vm));
