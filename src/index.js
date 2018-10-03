const electron = require('electron');
// const browserWin = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer
var vid_Input = document.getElementById('vid_url');
var frame_element = document.getElementById('vid_frm');
var frame_container = document.getElementById('vid_container');
var vid_btn = document.getElementById('vid_btn');

ipc.on('targetPriceVal', function (event, arg) {
    var new_vid_url = 'https://www.youtube.com/embed/'+arg+'?autoplay=0'
    var new_frame_ele = frame_element;
    new_frame_ele.src = new_vid_url;
    frame_container.removeChild(frame_container.childNodes[0]);
    frame_container.appendChild(new_frame_ele);
});

vid_btn.addEventListener('click', function (eve) {

    if (!(vid_Input.value == '')) {

        var vid_Input_value = vid_Input.value;
        var pattern = /https:\/\/youtu.be\//i;
        var result = pattern.test(vid_Input_value);

        if(result){

            var splited_str = vid_Input_value.split('/');
            var vid_id = splited_str[splited_str.length - 1];
            var new_vid_url = 'https://www.youtube.com/embed/'+vid_id+'?autoplay=0'

            var new_frame_ele = frame_element;
            new_frame_ele.src = new_vid_url;
            frame_container.removeChild(frame_container.childNodes[0]);
            frame_container.appendChild(new_frame_ele);
        }
    }
});