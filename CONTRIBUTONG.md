# Program structure

Add a directory under "programs". Your directory needs to have a details file:

#### _details.json_
```json
{
  "Menu entry for the program"
}
```

#### index.js
```js
module.exports = async () => {
  // Do the things you want to do
};
```

It is encouraged to allow the user further decision making using ['inquirer'](https://www.npmjs.com/package/inquirer)
