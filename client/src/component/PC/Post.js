import React from 'react';
import E from 'wangeditor';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import $ from 'jquery';
class MyEditor extends React.Component {
  constructor(props, context) {
        super(props, context);
        this.state = {
          editorContent: '',
          chipData: [],
          snackopen: false,
          errormsg:''
        }
    }
    componentDidMount() {
      const elem = this.edit
      const editor = new E(elem)
      // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
      editor.customConfig.menu = [
          'head',  // 标题
          'bold',  // 粗体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
      ]
      editor.customConfig.onchange = html => {
        this.setState({
          editorContent: html
        })
      }
      editor.customConfig.withCredentials = true
      editor.customConfig.uploadImgShowBase64 = true
      editor.customConfig.uploadFileName = 'img'
      editor.customConfig.uploadImgServer = '/upload'
      editor.customConfig.uploadImgTimeout = 5000
      editor.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          var url = result.data[0]
          insertImg(url)
        }
      }
      editor.create()
    }
    handletagDelete = data => () => {
      const chipData = [...this.state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      this.setState({ chipData });
    };
    handletagAdd = data => () =>{
      var chipData = [...this.state.chipData];
      if(chipData.length >= 3){
        this.setState({snackopen:true,errormsg:'標簽不超過三個' })
        return
      }else if(this.tag.value === ''){
        this.setState({snackopen:true,errormsg:'標簽不能爲空'})
        return
      }
      if(-chipData.findIndex((value) => {return value.label === this.tag.value})){
        chipData.push({key:chipData.length+1,label:this.tag.value})
        this.setState({ chipData })
        this.tag.value = ''
      }
    }
    handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ snackopen: false });
    };
    handlePost = data => () =>{
      console.log(this.psd.value !== 123)
      if(this.psd.value !== '123'){
        this.setState({errormsg:'標識碼錯誤',snackopen:true})
        return false
      }
      $.ajax({
        url: '/insert/',
        type: 'POST',
        data: {
          title: this.title.value,
          date:this.date.value,
          tag:[...this.state.chipData],
          content:encodeURI(this.state.editorContent),
          author:this.author.value
        }
      })
      .done(function(d) {
        return
      })
      .fail(function(e) {
        console.log(e);
      })
    }
    render() {
      return (
        <div className = "editor inner">
          <TextField label="標題" margin="normal" inputRef = {ref => { this.title = ref}} />
          <TextField label="日期" inputRef = {ref => { this.date = ref}} type="date" defaultValue={moment().format('YYYY-MM-DD')} InputLabelProps={{ shrink: true }} />
          <div className = "postTags">
            <TextField label="標簽" margin="normal" inputRef = {ref => { this.tag = ref}} />
            <Button fab color="primary" aria-label="add" style = {{marginTop:10}} onClick = {this.handletagAdd()}>
              <AddIcon />
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.snackopen}
              autoHideDuration={6000}
              onRequestClose={this.handleSnackClose}
              SnackbarContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.state.errormsg}</span>}
              action={[
                <Button key="undo" color="accent" dense onClick={this.handleSnackClose}>
                  知
                </Button>,
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleSnackClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </div>
          <div style = {{display: 'flex',flexDirection: 'row'}}>
            {this.state.chipData.map(data => {
              return (
                <Chip
                  label={data.label}
                  key={data.key}
                  onRequestDelete={this.handletagDelete(data)}
                  style = {{margin:4}}
                  />
              );
            })}
          </div>
          <TextField label="作者" margin="normal" defaultValue="YokeYang" inputRef = {ref => { this.author = ref}} />
          <TextField label="識別碼" type="password" margin="normal" inputRef = {ref => { this.psd = ref}} />
          <div ref={(edit) => this.edit = edit}></div>
          <Button raised color="primary" onClick = {this.handlePost()}>
            完成
          </Button>
        </div>
      );
    }
}

export default MyEditor;
