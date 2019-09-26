var { Menu } = require('electron');
var { dialog } = require('electron');
var { BrowserWindow } = require('electron');

var tamplateX = [
    {
        label: '文件',
        submenu: [
            {
                label: '打开',
                accelerator:"CommandOrControl+O",
                click: function () {
                    console.log('dakai');
                    var d=BrowserWindow.getFocusedWindow();
                  
                    d.webContents.send('action', 'open');
                }
            },
            {
                label: '新建',
                accelerator:"CommandOrControl+N",
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'create');
                }
            },
            {
                label: '保存',
                accelerator:"CommandOrControl+S",
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'save');
                }
            },
            {
                label: '另存为',
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'otherSave');
                }
            }, {
                type: 'separator'
            }, {
                label: '打印',
                accelerator:"CommandOrControl+P",
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.print();
                }
            }
            , {
                type: 'separator'
            },
            {
                label: '退出',
                accelerator:"CommandOrControl+Q",
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'exit');
                }
            }
        ]
    },
    {
        label: '编辑',
        submenu: [{
            label: '撤销',
            role: 'undo'
        },
        {
            label: '恢复',
            role: 'redo'
        },
        {
            label: '剪切',
            role: 'cut'
        },
        {
            label: '复制',
            role: 'copy'
        }, {
            label: '粘贴',
            role: 'patse'
        },
        {
            label: '删除',
            role: 'delete'
        }, {
            lable: '全选',
            role: 'selectall'
        }]
    }, {
        label: '视图',
        submenu: [{
            label: '缩小',
            role: 'zoomin'
        },
        {
            label: '放大',
            role: 'zoomout'
        },
        {
            label: '还原',
            role: 'resetzoom'
        }
            , {
            type: 'separator'
        }
            , {
            label: '全屏',
            role: 'togglefullscreen'
        }
        ]
    }
    , {
        label: '帮助',
        submenu: [{
            label: '关于',
            click: () => {
                // alert('这是一个记事本');
                dialog.showMessageBox({
                    title: '关于',
                    message: '这是一个记事本,欢迎使用,版本0.0.1'
                }, function (index) {
                  
                })
            }
        }]
    }
]
var menu = Menu.buildFromTemplate(tamplateX);
Menu.setApplicationMenu(menu);

