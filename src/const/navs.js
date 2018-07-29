/*  Navigation items
        name : the name on the card in home page
        path : the desired path name
        icon : the name of icon from font-awesome, with no fa- prefix
        description : the description on the card in home page

    If add new route, also modify Route.js
*/
const navs = [
    {
        name : 'Latest',
        path : 'latest',
        icon : 'money-bill-wave',
        description : 'Check the latest exchange rate on the market for more agile reaction'
    },
    {
        name : 'Historical',
        path : 'historical',
        icon : 'chart-line',
        description : 'Study the one-week historical exchange rate for deeper insight'
    },
    {
        name : 'History List',
        path : 'list',
        icon : 'history',
        description : 'Check the list of historical exchange rate of a day'
    },
    {
        name : 'Converter',
        path : 'converter',
        icon : 'calculator',
        description : 'Get the converter value before making transaction'
    }
];

export default navs;