/**
 * Created by Administrator on 2017/5/15 0015.
 */
function post(option) {
  return fetch(option.url, {
    method: 'POST',
    body: JSON.stringify(option.body),
  })
    .then(data => {
      return data.json()
    })
    .then(data => data.data)
}

let app = new Vue({
    el: '#app',
    data: {
      note: [],
      moveInfo: {state: false, index: null, position: {}}
    },
    methods: {
      addNote: function (e) {
        const color = randomColor(),
          y = e.clientY - 60 - 10,
          x = e.clientX - 100;
        post({
          url: '/api/addCard',
          body: {
            color,
            y,
            x,
          }
        })
          .then(() => {
            this.fetch();
          })
      },
      md: function (i, e) {
        this.moveInfo.index = i;
        this.moveInfo.position = {
          y: e.offsetY,
          x: e.offsetX
        };
        this.moveInfo.state = true;
      },
      mv: function (event) {
        const el = document.querySelectorAll('.note')[this.moveInfo.index];
        if (this.moveInfo.state) {
          let pageX = event.clientX - this.moveInfo.position.x;
          let pageY = event.clientY - this.moveInfo.position.y - 60;
          let width = window.innerWidth - el.offsetWidth,
            height = window.innerHeight - el.offsetHeight;
          if(event.target.className === 'content') {
            pageY -= 42
            pageX -= 2
          }

          if(event.target.className === 'clone') {
            return
          }

          if(event.target.className === 'input') {
            pageX -= 18
            pageY -= 2
          }

          if (pageY <= 0) {
            pageY = 0;
          }
          if (pageY >= height) {
            pageY = height;
          }
          if (pageX <= 0) {
            pageX = 0;
          }
          if (pageX >= width) {
            pageX = width;
          }

          this.note[this.moveInfo.index].x = pageX;
          this.note[this.moveInfo.index].y = pageY;
          // this.save();
        }
      },
      mu: function (e) {
        e.stopPropagation();
        this.moveInfo.state = false;
      },
      save: function (i) {
        post({
          url: '/api/setCard',
          body: {
            id: this.note[i].id,
            title: this.note[i].title,
            content: this.note[i].content,
            y: this.note[i].y,
            x: this.note[i].x,
          }
        })
      },
      clone: function (i) {
        post({
          url: '/api/delCard',
          body: {
            id: this.note[i].id,
          }
        })
          .then(() => {
            this.fetch()
          })
        // this.note.splice(i, 1);
        // this.save();
      },
      fetch() {
        post({
          url: '/api/getList',
          body: {}
        })
          .then(res => {
            this.note = res
          })
      }
    },
    mounted() {
      // document.onkeyup=(function (event) {
      //     e = event || window.event;
      //     e.stopPropagation();
      //     if(e.keyCode === 46 ){
      //         if(this.moveInfo.index !== null){
      //             this.note.splice(this.moveInfo.index,1);
      //             this.save();
      //             this.moveInfo.index= this.note.length? this.note.length-1:null;
      //         }
      //     }
      // }).bind(this);
      this.fetch()
      document.addEventListener('mousemove', this.mv);
      document.addEventListener('mouseup', this.mu)
    }
  }
)

function randomColor(){
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);

  if(r < 16){
    r = "0"+r.toString(16);
  }else{
    r = r.toString(16);
  }

  if(g < 16){
    g = "0"+g.toString(16);
  }else{
    g = g.toString(16);
  }

  if(b < 16){
    b = "0"+b.toString(16);
  }else{
    b = b.toString(16);
  }
  return "#"+r+g+b;
}