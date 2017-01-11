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
* hook into firebase - DONE
* use taxYear instead of an array - DONE
* need handlers for both isActive and description - DONE
* build out properties with firebase - DONE
* rename id to key - DONE
* code new, edit and delete handlers on the properties list - DONE
* another way is onClick={this.onDelete.bind(this, property, 'edit')} - DONE

### in-flight

* http://wesbos.com/let-vs-const/
* convert class to style
* consider react rebase https://www.npmjs.com/package/re-base
* install surge.sh
* fix false refresh when closing modal form
* what is the best way to add third party css

### tomorrow

* https://www.youtube.com/watch?v=QY7Ibl37_08&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO&index=10
* 3:37 minutes

* hook in the handlerSubmit 
* center modal form

* https://www.youtube.com/watch?v=szmS_M-BMls
* see https://www.youtube.com/watch?v=AUso8hw2-JQ&index=8&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO 1:54 minutes