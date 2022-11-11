var vm = {};

var VNode = function VNode(tag, data, child, text, elm, context) {
  this.tag = tag;
  this.data = data;
  this.children = child;
  this.text = text;
  this.elm = elm;
  this.context = context;
};

function _createEmpty(text) {
  if (text === undefined) text = "";
  var node = new VNode();
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
  // innerHTML
  // console.log("_s ", prop);
  return val == null
    ? ""
    : Array.isArray(val)
    ? JSON.stringify(val, null, 2)
    : String(val);
}

function $t(name) {
  // i18n translated
  return `{$t("${name}")}`;
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
  }
  let el = document.createElement(vnode.tag);
  if (vnode.data?.staticClass) {
    el.classList.add(vnode.data?.staticClass);
  }

  if (vnode.data?.attrs) {
    for (const [attr, value] of Object.entries(vnode.data.attrs)) {
      el.setAttribute(attr, value);
    }
  }

  if (vnode.children !== undefined) {
    for (const child of vnode.children) {
      console.log(child);
      let elm = buildDom(child);
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
  return _c("section", { staticClass: "not-found-page" }, [
    _c("div", { staticClass: "content" }, [
      _c(
        "div",
        {
          staticClass: "wrap",
          style: {
            transform: _vm.transformStyle,
          },
        },
        [
          _c("svgicon", {
            attrs: {
              focusable: "false",
              original: true,
              name: "404",
              width: "100%",
              height: "auto",
              "aria-hidden": "true",
            },
          }),
          _c("div", { staticClass: "error-message" }, [
            _c("h1", { staticClass: "h1" }, [_vm._v("404")]),
            _c("h2", { staticClass: "title" }, [
              _vm._v(_vm._s(_vm.$t("NotFoundPage.page_title"))),
            ]),
            _c("p", { staticClass: "subtitle" }, [
              _vm._v(_vm._s(_vm.$t("NotFoundPage.subtitle"))),
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

flush(render());
