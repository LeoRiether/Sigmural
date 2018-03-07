function setImages(data) {
  data = data.target.response.data; // wow
  for (let i = 0; i < data.length; i++) {
    this.refs['C' + i%4].addImg(data[i]);
  }
  this.forceUpdate();
}

function getImages() {
  let req = new XMLHttpRequest();
  req.open('GET', 'https://api.imgur.com/3/album/eSgYR/images');
  req.setRequestHeader('Authorization', 'Client-ID 3db795949e3e86c');
  req.responseType = 'json';
  req.onload = setImages.bind(this);
  req.send(null);
}

class Image extends React.Component {
  render() {
    return (
      <div class="box">
        <img src={this.props.src}/>
        <span className="label">{this.props.label}</span>
      </div>
    );
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
            return <Image src={e.link} label="ye" />
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
        <Column ref="C3" />
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