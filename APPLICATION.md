### learning react.js

* https://www.youtube.com/watch?v=vYldnghykaU&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO
* Learning React.js [1] - An Overview
* Learning React.js [2] - Your First Component
* Learning React.js [3] - Adding Properties
  * getDefaultProps: function
  * validate properties
  * properties types
* Learning React.js [4] - Events
* Learning React.js [5] - State and Nested Components
* Learning React.js [6] - Mapping Data
  * todo list
* Learning React.js [7] - Adding State Data Through a Form
  * todo form

### setup application

* https://facebook.github.io/react/
* https://github.com/facebookincubator/create-react-app

* sudo npm install -g create-react-app

* https://github.com/facebookincubator/create-react-app
* https://www.youtube.com/watch?v=mwNATxfUsgI
* https://www.youtube.com/watch?v=p4XTMvagQ2Q&t=3s

* create-react-app react-expenses
* cd react-expenses
* npm install firebase --save

### setup git

* setup a git repro on thumbdrive
  * mkdir react-expenses
  * cd react-expenses
  * git init --bare
* setup a git on local drive
  * git remote add origin /media/norm/TRAVELDRIVE/gitMaster/react-expenses
  * git config branch.master.remote origin
  * git config branch.master.merge refs/heads/master
* git config --list

### routers

* https://github.com/aksonov/react-native-router-flux
* https://github.com/ReactTraining/react-router

* install react-router $ npm install --save react-router

### completed

* install w3.css - DONE
* bring over the markup for property list - DONE
* style pages with w3.css - DONE
* load react developer tools - DONE
* react-modal - DONE
  * https://github.com/reactjs/react-modal - DONE
  * https://reactcommunity.org/react-modal/ - DONE
* style properties component - DONE
* figure out inline style width - DONE
* install react-toggle - DONE
* move to expenses store from posts - DONE
* [ES6](https://leanpub.com/understandinges6/read#leanpub-auto-better-unicode-support) - DONE
* [component communication](http://andrewhfarmer.com/component-communication/) - DONE

### in-flight
* convert class to style
* install surge.sh
* build out properties with firebase
* fix false refresh when closing modal form
* what is the best way to add third party css

https://www.kirupa.com/react/styling_in_react.htm
https://www.youtube.com/watch?v=QY7Ibl37_08&t=59s

### tomorrow

hook into firebase

https://facebook.github.io/react/docs/forms.html

* need handlers for both isActive and description

* http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
* https://www.youtube.com/watch?v=szmS_M-BMls

http://blog.revathskumar.com/2016/02/reactjs-writing-in-es6.html
http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
http://stackoverflow.com/questions/37771316/react-triggering-click-event-on-table-row

```javascript
fetchSongDetails = () => {
  const song = e.target.getAttribute('data-item');
  console.log('We need to get the details for ', song);
}

renderResultRows(data) {
    return data.map((song, index) => {  // anon func maintains scope!
        // Pass in a function to our onClick, and make it anon
        // to maintain scope.  The function body can be anything
        // which will be executed on click only.  Our song value
        // is maintained via a closure so it works.
        return (
            <tr key={index} data-item={song} onClick={this.fetchSongDetails}>
                <td data-title="Song">{song.S_SONG}</td>
                <td data-title="Movie">{song.S_MOVIE}</td>
                <td data-title="Year">{song.S_YEAR}</td>
            </tr>
        );
    });  // no need to bind with anon function
}
```