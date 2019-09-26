//系统托盘的实现
const { Menu, Tray,BrowserWindow,app} = require('electron');
 

var path = require('path');
//设置菜单栏图标
var t = new Tray(path.join(__dirname, '../static/image/editor.png'));

//定义托盘图标右键

var templateTools = [
    {
    label: '关于',
    click: () => {
        console.log(123);
    }
},
{
    label: '设置',
    click: () => {
        console.log('设置');
    }
},
{
    label: '退出',
    click: () => {
        console.log('退出');
    }
}];
var toolsOption=Menu.buildFromTemplate(templateTools);
t.setContextMenu(toolsOption);
//提示信息
t.setToolTip('这是一个记事本应用');
//退出到托盘 双击打开

 
var winX=BrowserWindow.getAllWindows()[0];
console.log(winX);
 
 winX.on('close',function(e){
     e.preventDefault();
     winX.hide();
      console.log(123);
    })

 

t.on('double-click',function(){
   console.log(223333);
})