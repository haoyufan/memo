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

let colors = ['#0795dd', '#ff9333', '#fff439', '#70ff38', '#fff4e0', '#53bdff'];
let app = new Vue({
    el: '#app',
    data: {
      note: [],
      moveInfo: {state: false, index: null, position: {}}
    },
    methods: {
      addNote: function (e) {
        const color = colors[Math.floor(Math.random() * colors.length)],
          y = e.clientY - 60 - 20,
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
      mu: function () {
        this.moveInfo.state = false;
        document.onmousemove = document.onmouseup = null;
      },
      save: function (i) {
        console.log(this.note[i])
      },
      clone: function (i) {
        this.note.splice(i, 1);
        this.save();
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
      document.addEventListener('mousemove', this.mv)
      document.addEventListener('mouseup', this.mu)
    }
  }
)