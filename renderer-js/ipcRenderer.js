//渲染进程通信
var ipcRenderer = require('electron').ipcRenderer;
var remote = require('electron').remote;
var fs = require('fs');
var officegen =require('officegen');
//var docx = officegen('docx');
var saveFlag = true;
var saveFilePath = null;

var docEdit = window.document.querySelector("#edits");

docEdit.oninput=function(){
   
 
}
editor.on("change", function () {
    // 显示智能提示
        console.log(123);
        //editor.showHint(); // 注意，注释了CodeMirror库中show-hint.js第131行的代码（阻止了代码补全，同时提供智能提示）
        if(saveFlag)
        {
           // document.title+=saveFilePath==null?'':saveFilePath;
            document.title+=" 已修改";
        }
        saveFlag = false;
     });
ipcRenderer.on('action',(event,data)=>{
    console.log(data);
    switch(data)
    {
        case "open":
        askFileSave();
        remote.dialog.showOpenDialog({
            properties:['openFile']
        },(dirPath)=>{
            if(dirPath){
                 let fileValue = fs.readFileSync(dirPath[0]);
                 
                 docEdit.value = fileValue;
                 document.title=dirPath[0];
                 saveFilePath=dirPath[0];
            }
        })
        break;
        case "save":
                saveFile();
        break;   
        case 'create':
                askFileSave();
                docEdit.value='';
        break;
        case 'otherSave':
                saveFilePath=null;
                saveFile();
        break;
        case 'exit':
            console.log(123);
                askFileSave();
                ipcRenderer.send('exit-app');
        break;
     }
})
//判断文件是否保存
function askFileSave()
{
    if(!saveFlag)
    {
        var index = remote.dialog.showMessageBox({
            type:"question",
            message:'是否要保存文件?'
            ,buttons:['Yes','No']
        })
        if(index == 0)
        {
            saveFile();
        }else
        {
            document.title='记事本';
            saveFlag = true;
        }
    }
   
}

//保存文件
function saveFile()
{
    if(saveFilePath ==null)
    {
        var dir = remote.dialog.showSaveDialogSync({
            defaultPath:'新建文档.txt',
            filters:[
                {
                    name:'txt'
                    ,extensions:['*']
                }
            ]
        });
        console.log(dir);
        if(dir)
        {
            saveFilePath = dir;
            fs.writeFileSync(saveFilePath,docEdit.value);
            saveFlag = true;
            document.title = saveFilePath+" 已保存";
        }
    }else{
        fs.writeFileSync(saveFilePath,docEdit.value);
        saveFlag = true;
        document.title=saveFilePath;
    }
}