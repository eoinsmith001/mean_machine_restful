# CRM Tool

This will commence with a RESTful API:
- CRUD for users
- standard url (http://example.com/api/users)
- RESTful via HTTP verbs
- JSON data
- console logging

# Do It

```
npm install
npm run db
// Then one of:
npm start
npm test
```



# Debugging

```
npm install -g node-inspector
// in one tab
node-inspector 
// in another tab
mocha <failing_test> --debug-brk
// visit url in Chrome and set breakpoints, stepthrough, etc.
```

# Notes
 
Here is an interesting presentation on testing [middleware](http://www.slideshare.net/morrissinger/unit-testing-express-middleware)

## Database hosted on modulus

```
mongodb://<user>:<pass>@proximus.modulusmongo.net:27017/Towo3wuq
mongo proximus.modulusmongo.net:27017/Towo3wuq -u <user> -p <pass>
```
