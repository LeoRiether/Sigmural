function setImages(data) {
  data = data.target.response.data; // wow
  for (let i = 0; i < data.length; i++) {
    this.refs['C' + i%3].addImg(data[i]);
  }
  this.forceUpdate();
}

function getImages() {
  let req = new XMLHttpRequest();
  req.open('GET', 'https://api.imgur.com/3/album/l8XCc/images');
  req.setRequestHeader('Authorization', 'Client-ID 3db795949e3e86c');
  req.responseType = 'json';
  req.onload = setImages.bind(this);
  req.send(null);
}

function openModal(src) {
  document.querySelector('.modal').classList.remove('is-active');
  document.querySelector('.modal-img').src = src;
}

class Image extends React.Component {
  render() {
    if (this.props.label) {
      return (
        <div class="box" onClick={openModal(this.props.src)}>
          <img src={this.props.src}/>
          <span className="label">{this.props.label}</span>
        </div>
      );
    } else {
      return (
        <div class="box" onClick={openModal(this.props.src)}>
          <img src={this.props.src}/>
        </div>
      )
    }
  }
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: []
    };
  }
  render() {
    return (
      <div className="column" data-n={this.props.n}>
        {
          (this.state.imgs.map(e => {
            return <Image src={e.link} label={e.description} />
          }))
        }
      </div>
    );
  }
  addImg(i) {
    this.state.imgs.push(i);
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app grid">
        <Column ref="C0" />
        <Column ref="C1" />
        <Column ref="C2" />
      </div>
    ); 
  }

  componentDidMount() {
    
    getImages.call(this);

  }
}


ReactDOM.render(
  <App/>,
  document.querySelector('app')
);