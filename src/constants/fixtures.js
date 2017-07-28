const fixtures = {

  properties: [
  ],

  categories: [
  ],

  charities: [
    { description: 'our lady of lourdes', isActive: true },
    { description: 'carmelite sisters', isActive: true },
    { description: 'catholic charities', isActive: true },
    { description: 'susan b anthony', isActive: true },
    { description: 'catholic vote', isActive: true },
    { description: 'dickow miistries', isActive: true },
    { description: 'gonzaga university', isActive: true },
    { description: 'grassfire', isActive: true },
    { description: 'hagee minisitries', isActive: true },
    { description: 'hillsdale college', isActive: true },
    { description: 'idaho catholic diocese', isActive: true },
    { description: 'life services', isActive: true },
    { description: 'ligonier ministries', isActive: true },
    { description: 'medical teams', isActive: true },
    { description: 'mt angel abby', isActive: true },
    { description: 'salvation army', isActive: true },
    { description: 'st aloysius', isActive: true },
    { description: 'st josephs', isActive: true },
    { description: 'st josephs indian school', isActive: true },
    { description: 'thomas moore law center', isActive: true },
    { description: 'uganda orphans', isActive: true },
    { description: 'union gospel mission', isActive: true },
    { description: 'shalome ministries', isActive: true },
    { description: 'tmagac', isActive: true }
  ],

  expenses: [
  ],

  donations: [
    { date: '1/31/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '1/31/2016', charity: 'gonzaga university', amount: '50.00' },
    { date: '1/31/2016', charity: 'uganda orphans', amount: '60.00' },
    { date: '1/31/2016', charity: 'salvation army', amount: '50.00' },
    { date: '1/31/2016', charity: 'carmelite sisters', amount: '60.00' },
    { date: '1/31/2016', charity: 'thomas moore law center', amount: '65.00' },
    { date: '1/31/2016', charity: 'union gospel mission', amount: '50.00' },
    { date: '1/31/2016', charity: 'medical teams', amount: '50.00' },
    { date: '1/31/2016', charity: 'st josephs', amount: '110.00' },
    { date: '1/31/2016', charity: 'st josephs', amount: '88.00' },
    { date: '1/31/2016', charity: 'st josephs', amount: '117.00' },
    { date: '1/31/2016', charity: 'st josephs', amount: '88.00' },
    { date: '1/3/2016', charity: 'st josephs', amount: '80.00' },
    { date: '1/28/2016', charity: 'st josephs', amount: '205.00' },
    { date: '2/4/2016', charity: 'mt angel abby', amount: '50.00' },
    { date: '2/29/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '2/29/2016', charity: 'salvation army', amount: '50.00' },
    { date: '2/29/2016', charity: 'carmelite sisters', amount: '60.00' },
    { date: '2/29/2016', charity: 'uganda orphans', amount: '60.00' },
    { date: '2/29/2016', charity: 'mt angel abby', amount: '60.00' },
    { date: '2/29/2016', charity: 'medical teams', amount: '60.00' },
    { date: '2/29/2016', charity: 'union gospel mission', amount: '60.00' },
    { date: '2/29/2016', charity: 'hillsdale college', amount: '60.00' },
    { date: '2/29/2016', charity: 'st josephs', amount: '442.00' },
    { date: '3/31/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '3/31/2016', charity: 'uganda orphans', amount: '65.00' },
    { date: '3/31/2016', charity: 'carmelite sisters', amount: '65.00' },
    { date: '3/31/2016', charity: 'salvation army', amount: '50.00' },
    { date: '3/31/2016', charity: 'union gospel mission', amount: '55.00' },
    { date: '3/31/2016', charity: 'medical teams', amount: '55.00' },
    { date: '3/31/2016', charity: 'st josephs', amount: '327.00' },
    { date: '3/31/2016', charity: 'st josephs', amount: '360.00' },
    { date: '3/31/2016', charity: 'idaho catholic diocese', amount: '55.00' },
    { date: '3/31/2016', charity: 'mt angel abby', amount: '55.00' },
    { date: '3/31/2016', charity: 'catholic vote', amount: '0.00' },
    { date: '3/6/2016', charity: 'st josephs', amount: '83.00' },
    { date: '3/11/2016', charity: 'our lady of lourdes', amount: '10.00' },
    { date: '4/24/2016', charity: 'st josephs', amount: '170.00' },
    { date: '4/30/2016', charity: 'uganda orphans', amount: '60.00' },
    { date: '4/30/2016', charity: 'hagee minisitries', amount: '55.00' },
    { date: '4/30/2016', charity: 'salvation army', amount: '50.00' },
    { date: '4/30/2016', charity: 'carmelite sisters', amount: '60.00' },
    { date: '4/30/2016', charity: 'st josephs', amount: '200.00' },
    { date: '4/30/2016', charity: 'hillsdale college', amount: '50.00' },
    { date: '4/30/2016', charity: 'thomas moore law center', amount: '60.00' },
    { date: '4/30/2016', charity: 'medical teams', amount: '56.00' },
    { date: '4/30/2016', charity: 'mt angel abby', amount: '60.00' },
    { date: '4/30/2016', charity: 'gonzaga university', amount: '60.00' },
    { date: '4/7/2016', charity: 'st josephs', amount: '83.00' },
    { date: '5/15/2016', charity: 'st josephs', amount: '85.00' },
    { date: '5/8/2016', charity: 'st josephs', amount: '85.00' },
    { date: '5/30/2016', charity: 'our lady of lourdes', amount: '50.00' },
    { date: '5/31/2016', charity: 'union gospel mission', amount: '50.00' },
    { date: '5/31/2016', charity: 'our lady of lourdes', amount: '120.00' },
    { date: '5/31/2016', charity: 'salvation army', amount: '50.00' },
    { date: '5/31/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '5/31/2016', charity: 'carmelite sisters', amount: '60.00' },
    { date: '5/31/2016', charity: 'uganda orphans', amount: '60.00' },
    { date: '5/31/2016', charity: 'gonzaga university', amount: '55.00' },
    { date: '5/30/2016', charity: 'st josephs', amount: '280.00' },
    { date: '6/4/2016', charity: 'st josephs', amount: '85.00' },
    { date: '6/13/2016', charity: 'our lady of lourdes', amount: '65.00' },
    { date: '6/30/2016', charity: 'thomas moore law center', amount: '65.00' },
    { date: '6/30/2016', charity: 'salvation army', amount: '50.00' },
    { date: '6/30/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '6/30/2016', charity: 'uganda orphans', amount: '60.00' },
    { date: '6/30/2016', charity: 'carmelite sisters', amount: '60.00' },
    { date: '6/30/2016', charity: 'union gospel mission', amount: '50.00' },
    { date: '6/30/2016', charity: 'medical teams', amount: '50.00' },
    { date: '6/25/2016', charity: 'st josephs', amount: '195.00' },
    { date: '6/19/2016', charity: 'st josephs', amount: '166.00' },
    { date: '7/24/2016', charity: 'st josephs', amount: '85.00' },
    { date: '7/10/2016', charity: 'st josephs', amount: '275.00' },
    { date: '7/17/2016', charity: 'st josephs', amount: '83.00' },
    { date: '7/31/2016', charity: 'union gospel mission', amount: '30.00' },
    { date: '7/31/2016', charity: 'st josephs indian school', amount: '25.00' },
    { date: '7/31/2016', charity: 'thomas moore law center', amount: '50.00' },
    { date: '7/31/2016', charity: 'medical teams', amount: '30.00' },
    { date: '7/31/2016', charity: 'our lady of lourdes', amount: '95.00' },
    { date: '7/31/2016', charity: 'salvation army', amount: '30.00' },
    { date: '7/31/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '7/31/2016', charity: 'susan b anthony', amount: '25.00' },
    { date: '7/31/2016', charity: 'gonzaga university', amount: '75.00' },
    { date: '7/31/2016', charity: 'uganda orphans', amount: '55.00' },
    { date: '7/31/2016', charity: 'carmelite sisters', amount: '55.00' },
    { date: '8/31/2016', charity: 'carmelite sisters', amount: '60.00' },
    { date: '8/31/2016', charity: 'gonzaga university', amount: '60.00' },
    { date: '8/31/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '8/31/2016', charity: 'salvation army', amount: '50.00' },
    { date: '8/31/2016', charity: 'uganda orphans', amount: '60.00' },
    { date: '8/7/2016', charity: 'st josephs', amount: '197.00' },
    { date: '8/15/2016', charity: 'st josephs', amount: '168.00' },
    { date: '8/21/2016', charity: 'st josephs', amount: '85.00' },
    { date: '8/28/2016', charity: 'st josephs', amount: '195.00' },
    { date: '8/31/2016', charity: 'catholic vote', amount: '20.00' },
    { date: '8/31/2016', charity: 'st josephs indian school', amount: '20.00' },
    { date: '8/31/2016', charity: 'thomas moore law center', amount: '58.00' },
    { date: '8/31/2016', charity: 'our lady of lourdes', amount: '58.00' },
    { date: '8/31/2016', charity: 'union gospel mission', amount: '30.00' },
    { date: '8/31/2016', charity: 'medical teams', amount: '30.00' },
    { date: '9/30/2016', charity: 'uganda orphans', amount: '75.00' },
    { date: '9/30/2016', charity: 'carmelite sisters', amount: '75.00' },
    { date: '9/30/2016', charity: 'st josephs indian school', amount: '25.00' },
    { date: '9/30/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '9/30/2016', charity: 'salvation army', amount: '50.00' },
    { date: '9/30/2016', charity: 'hillsdale college', amount: '50.00' },
    { date: '9/30/2016', charity: 'medical teams', amount: '50.00' },
    { date: '9/30/2016', charity: 'union gospel mission', amount: '50.00' },
    { date: '9/30/2016', charity: 'our lady of lourdes', amount: '70.00' },
    { date: '9/30/2016', charity: 'thomas moore law center', amount: '60.00' },
    { date: '9/30/2016', charity: 'gonzaga university', amount: '50.00' },
    { date: '9/30/2016', charity: 'tmagac', amount: '40.00' },
    { date: '9/26/2016', charity: 'our lady of lourdes', amount: '20.00' },
    { date: '9/4/2016', charity: 'st josephs', amount: '88.00' },
    { date: '9/10/2016', charity: 'st josephs', amount: '82.00' },
    { date: '9/25/2016', charity: 'st josephs', amount: '273.00' },
    { date: '10/31/2016', charity: 'st josephs indian school', amount: '50.00' },
    { date: '10/31/2016', charity: 'uganda orphans', amount: '70.00' },
    { date: '10/31/2016', charity: 'carmelite sisters', amount: '70.00' },
    { date: '10/31/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '10/31/2016', charity: 'salvation army', amount: '50.00' },
    { date: '10/25/2016', charity: 'our lady of lourdes', amount: '20.00' },
    { date: '10/18/2016', charity: 'tmagac', amount: '35.00' },
    { date: '10/7/2016', charity: 'st josephs', amount: '85.00' },
    { date: '10/31/2016', charity: 'thomas moore law center', amount: '65.00' },
    { date: '10/31/2016', charity: 'union gospel mission', amount: '50.00' },
    { date: '10/31/2016', charity: 'medical teams', amount: '50.00' },
    { date: '10/31/2016', charity: 'our lady of lourdes', amount: '65.00' },
    { date: '10/30/2016', charity: 'st josephs', amount: '364.00' },
    { date: '10/31/2016', charity: 'gonzaga university', amount: '60.00' },
    { date: '11/30/2016', charity: 'uganda orphans', amount: '70.00' },
    { date: '11/30/2016', charity: 'carmelite sisters', amount: '70.00' },
    { date: '11/30/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '11/30/2016', charity: 'gonzaga university', amount: '50.00' },
    { date: '11/30/2016', charity: 'st josephs indian school', amount: '50.00' },
    { date: '11/30/2016', charity: 'medical teams', amount: '40.00' },
    { date: '11/30/2016', charity: 'mt angel abby', amount: '40.00' },
    { date: '11/30/2016', charity: 'union gospel mission', amount: '40.00' },
    { date: '11/29/2016', charity: 'our lady of lourdes', amount: '20.00' },
    { date: '11/30/2016', charity: 'hillsdale college', amount: '40.00' },
    { date: '11/15/2016', charity: 'st josephs', amount: '170.00' },
    { date: '12/31/2016', charity: 'mt angel abby', amount: '40.00' },
    { date: '12/31/2016', charity: 'salvation army', amount: '50.00' },
    { date: '12/31/2016', charity: 'hagee minisitries', amount: '50.00' },
    { date: '12/31/2016', charity: 'carmelite sisters', amount: '55.00' },
    { date: '12/31/2016', charity: 'thomas moore law center', amount: '50.00' },
    { date: '12/31/2016', charity: 'our lady of lourdes', amount: '50.00' },
    { date: '12/31/2016', charity: 'medical teams', amount: '40.00' },
    { date: '12/31/2016', charity: 'union gospel mission', amount: '40.00' },
    { date: '12/31/2016', charity: 'hillsdale college', amount: '40.00' },
    { date: '12/31/2016', charity: 'our lady of lourdes', amount: '20.00' },
    { date: '12/25/2016', charity: 'our lady of lourdes', amount: '25.00' },
    { date: '12/31/2016', charity: 'st josephs', amount: '25.00' },
    { date: '12/17/2016', charity: 'st josephs', amount: '85.00' },
    { date: '12/1/2016', charity: 'salvation army', amount: '50.00' },
    { date: '12/31/2016', charity: 'salvation army', amount: '50.00' },
    { date: '12/11/2016', charity: 'our lady of lourdes', amount: '68.00' },
    { date: '12/4/2016', charity: 'st josephs', amount: '278.00' },
    { date: '12/31/2016', charity: 'st josephs', amount: '280.00' },
    { date: '12/31/2016', charity: 'uganda orphans', amount: '55.00' },
    { date: '12/11/2016', charity: 'st josephs', amount: '85.00' },
    { date: '12/1/2016', charity: 'st josephs', amount: '240.00' },
    { date: '12/1/2016', charity: 'st aloysius', amount: '160.00' },
    { date: '12/31/2016', charity: 'catholic charities', amount: '480.00' }
  ]

}

export default fixtures;