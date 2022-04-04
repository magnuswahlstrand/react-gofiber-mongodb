

## Initialize app
```sh
go mod init github.com/magnuswahlstrand/react-gofiber-mongodb
go get -u github.com/gofiber/fiber/v2
```


## React app

```sh
npm install @mantine/hooks @mantine/core
npm install react-query
npm install tabler-icons-react
npm install axios
```


### Improvements

Frontend
* **Debounce the search field queries** - We should until the user input has stopped, and then another few 100 ms before issuing the query.
* **Add pagination**  


### References
* [SO: MongoDB $text search](https://stackoverflow.com/a/31030886)

### Questions

* Padding and margins
  * What unit? px, em? xs, md, lg?
  * CSS on a component, or wrapper component, or before/after-components
* How to keep table header columns fixed size?
* Best practices for reactive design?
