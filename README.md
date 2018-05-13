### ajax
> Content-type 默认为 “application/x-www-form-urlencoded”

## usage

```js
ajax.requtest({
  method: 'post',
  url: 'http://localhost:9090/postTest',
  params: {
    x: 2, y: 1
  },
  headers: {
    'Content-type': 'application/json'
  }
}).then((res) => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```