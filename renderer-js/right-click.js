var remote = require('electron').remote;
var Menu = remote.Menu;
var template = [
    {
        lable: '撤销',
        role: 'undo'
    },
    {
        lable: '恢复',
        role: 'redo'
    },
    {

        lable: '复制'
        ,
        role: 'copy'

    },
    {

        lable: '粘贴'
        ,
        role: 'paste'

    },
    {

        lable: '剪切'
        ,
        role: 'cut'

    },
    {
        type: 'separator'
    },
    {
        lable: '全选',
        role: 'selectall'
    }

]
var m = Menu.buildFromTemplate(template);

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    m.popup({ window: remote.getCurrentWindow() })
})