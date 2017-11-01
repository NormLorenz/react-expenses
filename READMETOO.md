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

* echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
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
* upgrade navigation system and file structure - DONE
* new text size for menu - w3-almost-medium - DONE
* fixtures - update summary count for charities - DONE
* use placeholders throughout - DONE
* combine PropertyDisplay and CategoryDisplay with MyDisplay - DONE
* add a taxYear search key to donations in firebase - DONE
* componentWillReceiveProps test for isLoaded - DONE
* move helpers under components - DONE
* modify the summary 'change tax year' styling to span the whole width of the panel - DONE
* need to enable vs code navigation side bar - DONE
* edit multiple cursors - ctrl f2 - DONE

### router rewrite

* upgrade react-router from 4.0.0-alpha.5 to react-router-dom version v4.0.0-beta.7 - DONE
* git - checkout from thumbdrive - DONE
  * git fetch origin
  * git checkout -b redux origin/redux
* remove jest for now - DONE

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
* implement donations and charities - DONE

### nice to have

* install jest - https://facebook.github.io/jest/docs/tutorial-react.html - DONE
* install flow - https://flow.org/en/docs/getting-started/
* implement single responsibility principal
* make the whole application ES6'ish
* redirect after authentication to original url

### short list

* finish mileage tasks - DONE
* finish in-flight tasks - DONE
* backup production firebase - DONE
* backup development firebase - DONE
* backup development firebase one more time
* provide migration path from development to production
  * charities
  * donations
  * places
  * trips
* hook in eslint [here](https://github.com/Microsoft/vscode-eslint) - DONE
* extensive testing
* bugs
* build 404 page
* swap config firebase source
* publish to surge

### in-flight

* deprecation warning: value provided is not in a recognized ISO format moment - DONE
* reload donation fixtures with ISO format date - CANCELLED
* write a prime imports (imported 164 - 6 were wrong year) - CANCELLED
* redo the yarn/npm store - DONE
* jest - create unit tests - DONE
* code coverage `npm test -- --coverage` - DONE
* do I need componentWillReceiveProps or can I bind directly to this.props - CANCELLED
* all constructors should pass props down - CANCELLED

### mileage

* new trip is throwing error - DONE
* hook in delete trip - DONE
* hook in edit trip - DONE
* move searchbox.js to helpers - DONE
* calculate mileage - DONE
* connect to google distance - DONE
* build waypoints/places - DONE
* build trips - DONE
* write mapping popup - DONE
  * remove this.state.origin - DONE
  * pull when button is clicked - DONE
* remove directions component from menu - DONE
* enter key causes dialog box to close - CAN'T REPRODUCE
* write a mileage report - DONE

* const apiKey = 'AIzaSyCYmAO8B6vGQaRptBtg6C20r_9i67WgQhc'

* links
  * https://developers.google.com/maps/documentation/distance-matrix/start
  * https://developers.google.com/maps/documentation/distance-matrix/#api_key
  * https://github.com/fullstackreact/google-maps-react
  * https://www.npmjs.com/package/google-distance-matrix
  * https://www.npmjs.com/package/google-distance
  * https://developers.google.com/maps/documentation/javascript/distancematrix
  * https://developers.google.com/maps/
  * https://www.mapdevelopers.com/distance_from_to.php

  * https://console.developers.google.com/apis/credentials?project=posts-c2d22

  * https://developers.google.com/maps/documentation/javascript/directions
  * https://developers.google.com/maps/documentation/javascript/3.exp/reference
  * https://developers.google.com/maps/documentation/javascript/examples/directions-waypoints

  * https://github.com/tomchentw/react-google-maps/blob/master/src/app/pages/basics/DirectionsExample.js
  * https://tomchentw.github.io/react-google-maps/
  * https://github.com/tomchentw/react-google-maps

  * https://maps.googleapis.com/maps/api/geocode/json?address=home+depot+cda
  * http://andrewhfarmer.com/react-ajax-best-practices/
