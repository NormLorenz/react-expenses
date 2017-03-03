### learning react.js

* [ES6](https://leanpub.com/understandinges6/read#leanpub-auto-better-unicode-support)
* [ES6 modules](http://wesbos.com/javascript-modules/)

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

* https://www.youtube.com/watch?v=QY7Ibl37_08&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO&index=10  3:37 minutes
* https://www.youtube.com/watch?v=AUso8hw2-JQ&index=8&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO 1:54 minutes

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
* https://reacttraining.com/react-router/examples/basic

* install react-router $ npm install --save react-router

### update npm packages

* npm list -g --depth=0
* npm outdated
* https://docs.npmjs.com/getting-started/updating-local-packages
* npm update
* npm run build

### completed

* install w3.css - DONE
* bring over the markup for property list - DONE
* style pages with w3.css - DONE
* load react developer tools - DONE
* react-modal - DONE
  * https://github.com/reactjs/react-modal/
  * https://reactcommunity.org/react-modal/
* style properties component - DONE
* figure out inline style width - DONE
* install react-toggle - DONE
* move to expenses store from posts - DONE
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
* add all categories - DONE
* build out cents - DONE
* build out summary - DONE
* refactor application to use folders - DONE
* build out utilities - DONE
* [hook in react authentication](https://github.com/tylermcginnis/react-router-firebase-auth) - DONE
* style register page - DONE
* style login page - DONE
* style navbar and application page - DONE
* turn on firebase authentication - DONE
* surge - DONE
  * https://medium.freecodecamp.com/surge-vs-github-pages-deploying-a-create-react-app-project-c0ecbf317089#.qruf1kwoy
  * also explained in the README file
* set focus first field in modal form - DONE
* add space before the menu nav bar - DONE
* filter expenses based upon tax year yyyy - DONE
* build out reports - DONE
* summary page is not refreshing correctly - DONE
* add credit and debit totals to footer - DONE
* move totals under the report table - DONE
* fixed math problem - DONE
* used w3-small throughout - DONE
* fixed sorting problem - DONE
* modal use w3.css w3-navbar w3-card-8 w3-light-grey - DONE
* submit button - see W3 Schools - DONE
* find a sutable toaster https://github.com/igorprado/react-notification-system - DONE
  * https://www.bountysource.com/issues/39897543-would-love-an-es6-example-of-using-this
* finish toaster implemenation for categories, expenses and summary - DONE
* create report both credits and debits totals for properties and categories - DONE
* add summary modal form to change year for past ten years - DONE
* refactor Debit component to clickable ExpenseType - DONE
* use propTypes for stateless components - DONE 
* use mouse pointer with ExpenseType component - DONE
* build new expenseTypeSlider - DONE
  * add a tab stop to the label - CAN'T FIGURE THIS OUT
* refactor all forms to use a name property and a single input handler - DONE
  * see https://facebook.github.io/react/docs/forms.html
* building a utilities library - http://wesbos.com/javascript-modules/ - DONE
* what is the best way to add third party css or images - DONE
  * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
* string functions - see w3 schools - DONE
* http://wesbos.com/let-vs-const/ - DONE
* create a new redux branch - DONE

### in-flight

* consolidate toaster notifications
* install jest - https://facebook.github.io/jest/docs/tutorial-react.html
* finish taxYear in summary page
* Deprecation warning: value provided is not in a recognized ISO format - moment

### database and router rewrite

* the winner is HOC
  * https://facebook.github.io/react/docs/higher-order-components.html
  * https://www.sitepoint.com/react-higher-order-components/
  * this pattern is used currently in the application for authentication
  * remove total expense records in summary page
  * https://reacttraining.com/react-router/examples/basic

* react-router link activeClassName

* initialize steps
  * pull taxYear
  * then pull revelant expenses
  * and pull all properties
  * and pull all categories
* expenses change
  * do nothing
* properties change
  * do nothing
* categories change 
  * do nothing
* taxYear change
  * pull taxYear
  * then pull revelant expenses


