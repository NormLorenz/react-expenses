import React, { Component } from 'react'
import firebase from 'firebase';

// import Property from '../helpers/property';
// import Category from '../helpers/category';
// import Debit from '../helpers/debit'
// import { convertCentsToDollars } from '../helpers/utilities';

// import Moment from 'react-moment';
// import moment from 'moment';

class Reports extends Component {

  constructor() {
    super();
    this.state = {
      taxYear: 1776,
      credits: [],
      debits: [],
      categories: [],
      properties: []
    };
  }

  componentDidMount() {

    const rootRef = firebase.database().ref();
    const taxYearRef = rootRef.child('taxYear');
    taxYearRef.once('value', snapshot => {
      this.setState({
        taxYear: snapshot.val()
      });

      const creditsRef = firebase.database().ref('expenses').orderByChild('date');
      creditsRef.once('value', snapshot => {
        this.setState({
          credits: snapshot.numChildren()
        });
      });

      const debitsRef = firebase.database().ref('expenses').orderByChild('date');
      debitsRef.once('value', snapshot => {
        this.setState({
          debits: snapshot.numChildren()
        });
      });

    });

    const propertiesRef = firebase.database().ref('properties').orderByChild('description');
    propertiesRef.once('value', snapshot => {
      this.setState({
        properties: snapshot.numChildren()
      });
    });

    const categoriesRef = firebase.database().ref('categories').orderByChild('description');
    categoriesRef.once('value', snapshot => {
      this.setState({
        categories: snapshot.numChildren()
      });
    });


  }

  render() {
    const divStyle = { width: '400px' };

    // <colgroup>
    //   <col style='width:15%;'>
    //   <col style='width:30%;'>
    //   <col style='width:20%;'>
    //   <col style='width:20%;'>
    //   <col style='width:10%;'>
    //   <col style='width:5%;'>
    // </colgroup>

    return (
      <div classNameName='w3-container' style={divStyle}>
        <h3>Reports</h3>
        <div classNameName='w3-margin'>
          You are in the reports section of the application.
        </div>
      </div>


      //   <div className='w3-container'>
      //      <h3>report for tax year {this.state.taxYear}</h3>

      //   <p>
      //     <h4>credits {{format-currency creditsTotal}}</h4>
      //   </p>

      //   <table className='w3-table-all'>

      //     <tr>
      //       <th>date</th>
      //       <th>description</th>
      //       <th>category</th>
      //       <th>property</th>
      //       <th>amount</th>
      //       <th></th>
      //     </tr>
      //     {{#each sortedCredits as |expense|}}
      //     <tr>
      //       <td>{{moment-format expense.date 'L'}}</td>
      //       <td>{{expense.description}}</td>
      //       <td>{{expense.category.description}}</td>
      //       <td>{{expense.property.description}}</td>
      //       <td className='w3-right-align'>{{format-currency expense.amount}}</td>
      //       <td></td>
      //     </tr>
      //     {{else}}
      //     <tr>
      //       <td colspan='6'>no credits specified</td>
      //     </tr>
      //     {{/each}}
      //   </table>

      //   <p>
      //     <h4>debits {{format-currency debitsTotal}}</h4>
      //   </p>
      //   <table className='w3-table-all'>
      //     <colgroup>
      //       <col style='width:15%;'>
      //       <col style='width:30%;'>
      //       <col style='width:20%;'>
      //       <col style='width:20%;'>
      //       <col style='width:10%;'>
      //       <col style='width:5%;'>
      //     </colgroup>
      //     <tr>
      //       <th>date</th>
      //       <th>description</th>
      //       <th>category</th>
      //       <th>property</th>
      //       <th>amount</th>
      //       <th></th>
      //     </tr>
      //     {{#each sortedDebits as |expense|}}
      //     <tr>
      //       <td>{{moment-format expense.date 'L'}}</td>
      //       <td>{{expense.description}}</td>
      //       <td>{{expense.category.description}}</td>
      //       <td>{{expense.property.description}}</td>
      //       <td className='w3-right-align'>{{format-currency expense.amount}}</td>
      //       <td></td>
      //     </tr>
      //     {{else}}
      //     <tr>
      //       <td colspan='5'>no debits specified</td>
      //     </tr>
      //     {{/each}}
      //   </table>

      //   <p>
      //     <h4>properties {{format-currency propertiesTotal}}</h4>
      //   </p>
      //   <table className='w3-table-all'>
      //     <colgroup>
      //       <col style='width:65%;'>
      //       <col style='width:20%;'>
      //       <col style='width:10%;'>
      //       <col style='width:5%;'>
      //     </colgroup>
      //     <tr>
      //       <th>description</th>
      //       <th>active</th>
      //       <th>amount</th>
      //       <th></th>
      //     </tr>
      //     {{#each sortedProperties as |property|}}
      //     <tr>
      //       <td>{{property.description}}</td>
      //       <td>{{property.isActive}}</td>
      //       <td className='w3-right-align'>{{format-currency property.amount}}</td>
      //       <td></td>
      //     </tr>
      //     {{else}}
      //     <tr>
      //       <td colspan='4'>no properties specified</td>
      //     </tr>
      //     {{/each}}
      //   </table>

      //   <p>
      //     <h4>categories {{format-currency categoriesTotal}}</h4>
      //   </p>
      //   <table className='w3-table-all'>
      //     <colgroup>
      //       <col style='width:65%;'>
      //       <col style='width:20%;'>
      //       <col style='width:10%;'>
      //       <col style='width:5%;'>
      //     </colgroup>
      //     <tr>
      //       <th>description</th>
      //       <th>active</th>
      //       <th>amount</th>
      //       <th></th>
      //     </tr>
      //     {{#each sortedCategories as |category|}}
      //     <tr>
      //       <td>{{category.description}}</td>
      //       <td>{{category.isActive}}</td>
      //       <td className='w3-right-align'>{{format-currency category.amount}}</td>
      //       <td></td>
      //     </tr>
      //     {{else}}
      //     <tr>
      //       <td colspan='4'>no categories specified</td>
      //     </tr>
      //     {{/each}}
      //   </table>

      // </div>
    )
  }
}

export default Reports;