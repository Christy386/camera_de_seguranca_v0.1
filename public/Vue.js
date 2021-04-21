var app = new Vue({
    el: '#app',
    data: {
        update_b: true,

        front: true,
        back: true,
        right: true,
        left: true,
        front_right: true,
        front_left: true,
        back_right: true,
        back_left: true,
        stop: true,

        s_front: false,
        s_back: false,
        s_right: false,
        s_left: false,
        s_front_right: false,
        s_front_left: false,
        s_back_right: false,
        s_back_left: false,
        s_stop: false,

        img_src1:'./camera_icon.png',
        img_src2:'./camera_icon.png',
        img_src3:'./camera_icon.png',
        img_src4:'./camera_icon.png',

        container: true,

    },
    methods: {
        B_update: function () {
            /*let interval = setInterval(function () {
                socket.emit('update', 'update');
            }, 50);*/
            this.update_b = false;

            socket.on('camera1', (msg) => {

                //console.log(msg);
                let urlObject = URL.createObjectURL(new Blob([msg]));
                this.img_src1 = urlObject;

            })
            socket.on('camera2', (msg) => {

                //console.log(msg);
                let urlObject = URL.createObjectURL(new Blob([msg]));
                this.img_src2 = urlObject;

            })

        },

        front_up: function () {
            console.log('front-up')
            socket.emit('move', 'stop')
            this.s_front = false;
            
        },
        front_down: function () {
            if(this.s_front == false){
                console.log('front-down')
                socket.emit('move', 'front')
            }
            this.s_front = true;
            
        },

        back_up: function () {
            console.log('back-up')
            socket.emit('move', 'stop')
            this.s_back = false;
        },
        back_down: function () {
            if(this.s_back == false){
                console.log('back-down')
                socket.emit('move', 'back')
            }
            this.s_back = true;
            
        },

        right_up: function () {
            console.log('right-up')
            socket.emit('move', 'stop')
            this.s_right = false;
        },
        right_down: function () {
            if(this.s_right == false){
                console.log('right-down')
                socket.emit('move', 'right')
            }
            this.s_right = true;
            
        },

        left_up: function () {
            console.log('left-up')
            socket.emit('move', 'stop')
            this.s_left = false;
        },
        left_down: function () {
            if(this.s_left == false){
                console.log('left-down')
                socket.emit('move', 'left')
            }
            this.s_left = true;
            
        },

        

        B_stop: function () {
            socket.emit('move', 'stop');
        },

        B_front: function () {
            socket.emit('move', 'front');
        },
        B_back: function () {
            socket.emit('move', 'back');
        },
        B_right: function () {
            socket.emit('move', 'right');
        },
        B_left: function () {
            socket.emit('move', 'left');
        },
        B_front_right: function () {
            socket.emit('move', 'front_right');
        },
        B_front_left: function () {
            socket.emit('move', 'front_left');
        },
        B_back_right: function () {
            socket.emit('move', 'back_right');
        },
        B_back_left: function () {
            socket.emit('move', 'back_left');
        },

    }
})