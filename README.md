# countdown

### Useage:

```javascript
$('.countdown').countdown();
```
### Options:

```javascript
$('.countdown').countdown({
	attrName_start : 'date_s',
	attrName_end : 'date_e',
	tmpl : '剩余%{d}天%{h}时%{m}分%{s}秒%{sss}毫秒',
	end : '已到期',
    notStart: '即将开始%{d}天%{h}时%{m}分%{s}秒%{sss}毫秒',
	afterEnd : null,
    beforeStart: null,
    inTime: null,
    interval: 10,//精确到秒时，输入1000即可
    print: function(dur) {//自定义内容
        return dur.d + '天' + dur.h + '时' + dur.m + '分' + dur.s + '秒' + dur.ms + '毫秒';
    }
});
```