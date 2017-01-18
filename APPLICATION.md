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
* refactor bind on event handlers - DONE
* center modal form - DONE
* fix false refresh when closing modal form - DONE
* duplicate properties -> categories - DONE
* duplicate categories -> expenses - DONE
* debit/credit component - DONE
* get a select component - DONE
* integrate moment - DONE
* build out expenses list and form - DONE

### in-flight

* hook in react authentication
* find a sutable toaster
  * https://github.com/igorprado/react-notification-system
  * http://igorprado.com/react-notification-system/
  * http://stackoverflow.com/questions/39069513/react-global-notification-system
  * https://www.bountysource.com/teams/react-notification-system/issues
  * http://stackoverflow.com/questions/32933146/implementing-react-notification-system-on-react
* submit button - see W3 Schools
  * https://www.youtube.com/watch?v=yOu_PUAOtP0&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO&index=7 at 5.53 minutes

* add all categories
* rubix cube hourglass
* set focus first field in modal form
* can only set state on a mounted or unmounted component - categories page
* install surge.sh

### tomorrow

* http://wesbos.com/let-vs-const/
* consider react rebase https://www.npmjs.com/package/re-base
* what is the best way to add third party css
* https://www.youtube.com/watch?v=QY7Ibl37_08&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO&index=10
* 3:37 minutes

* https://www.youtube.com/watch?v=szmS_M-BMls
* see https://www.youtube.com/watch?v=AUso8hw2-JQ&index=8&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO 1:54 minutes

### update npm packages

* npm outdated
* https://docs.npmjs.com/getting-started/updating-local-packages
* npm update