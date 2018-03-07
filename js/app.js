'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function setImages(data) {
  data = data.target.response.data; // wow
  for (var i = 0; i < data.length; i++) {
    this.refs['C' + i % 4].addImg(data[i]);
  }
  this.forceUpdate();
}

function getImages() {
  var req = new XMLHttpRequest();
  req.open('GET', 'https://api.imgur.com/3/album/eSgYR/images');
  req.setRequestHeader('Authorization', 'Client-ID 3db795949e3e86c');
  req.responseType = 'json';
  req.onload = setImages.bind(this);
  req.send(null);
}

var Image = function (_React$Component) {
  _inherits(Image, _React$Component);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { 'class': 'box' },
        React.createElement('img', { src: this.props.src }),
        React.createElement(
          'span',
          { className: 'label' },
          this.props.label
        )
      );
    }
  }]);

  return Image;
}(React.Component);

var Column = function (_React$Component2) {
  _inherits(Column, _React$Component2);

  function Column(props) {
    _classCallCheck(this, Column);

    var _this2 = _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).call(this, props));

    _this2.state = {
      imgs: []
    };
    return _this2;
  }

  _createClass(Column, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'column', 'data-n': this.props.n },
        this.state.imgs.map(function (e) {
          return React.createElement(Image, { src: e.link, label: 'ye' });
        })
      );
    }
  }, {
    key: 'addImg',
    value: function addImg(i) {
      this.state.imgs.push(i);
    }
  }]);

  return Column;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'app grid' },
        React.createElement(Column, { ref: 'C0' }),
        React.createElement(Column, { ref: 'C1' }),
        React.createElement(Column, { ref: 'C2' }),
        React.createElement(Column, { ref: 'C3' })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      getImages.call(this);
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('app'));