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
* 'There is no tracking information for the current branch' - git pull origin redux - DONE
  * git branch --set-upstream redux origin/redux
* upgrade w3.css 2.82 to 4.04 - DONE
* modify the summary 'change tax year' styling

### in-flight

* install jest - https://facebook.github.io/jest/docs/tutorial-react.html
* deprecation warning: value provided is not in a recognized ISO format - moment
* implement single responsibility principal
* implement donations and charities - WORKING
* upgrade navigation system and file structure - WORKING
* implement mileage
* redo the yarn/npm store
* make the whole application ES6'ish
* use placeholders throughout

### router rewrite

* upgrade react-router from 4.0.0-alpha.5 to react-router-dom version v4.0.0-beta.7 - DONE
* git - checkout from thumbdrive - DONE
  * git fetch origin
  * git checkout -b redux origin/redux
* remove jest for now - DONE
* redirect after authentication to original url
* react-router link activeClassName

### implement redux

* https://www.youtube.com/watch?v=DiLVAXlVYR0
* https://github.com/vijayst/redux-firebase-demo
* https://github.com/buckyroberts/react-redux-boilerplate
* https://www.youtube.com/watch?v=1w-oQ-i1XB8&list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt
* https://www.youtube.com/watch?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b&v=MhkGQAoc7bc
* https://www.codementor.io/vijayst/using-firebase-with-redux-for-building-a-react-app-du1086puw
* http://stackoverflow.com/questions/39761443/how-to-dispatch-redux-action-from-stateless-component-when-route-is-loaded
* https://github.com/reactjs/react-redux

* install redux, redux-logger, redux-thunk, redux-promise and react-redux - DONE
* remove redux-promise - DONE
* consolidate toaster notifications - DONE
  * https://codereviewvideos.com/blog/notifications-react-and-redux/
  * remove props
  * remove constructor
  * install react-notification-system-redux
* refactor properties using redux - DONE
* refactor categories using redux - DONE
* refactor reports using redux - DONE
* remove readme route, component, action and reducer - DONE
* display react version 1.1.0 - DONE
* refactor summary using redux - DONE
* refactor expenses using redux - DONE
  * code taxYear
  * test new, edit and delete
* move select to a component and use a placeholder - DONE
  * http://derpturkey.com/select-placeholder-with-react/
  * https://github.com/JedWatson/classnames
  * https://medium.com/@jviereck/modularise-css-the-react-way-1e817b317b04
  * https://medium.com/yplan-eng/inline-styles-are-so-2016-f100b79dafe1
  * pass the class name as props
* major refactor redux with firebase https://www.youtube.com/watch?v=UHJq5NOtNG4 - DONE
* do I need componentWillReceiveProps or can I bind directly to this.props.propertyObject
