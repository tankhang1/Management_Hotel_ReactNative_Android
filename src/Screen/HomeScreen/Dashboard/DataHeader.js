import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
/*Sales between today and last day */
let number_sales = 390.243;
let pre_number_sales = 250;
let change_sale = number_sales > pre_number_sales ? 1 : 0;
let how_much_change_sale =
  ((number_sales - pre_number_sales) / pre_number_sales) * 100;
let tmp_sale = change_sale === 1 ? '+' : '';
let sales_change = tmp_sale + how_much_change_sale.toFixed(2).toString() + '%';

/*Income between*/
let number_income = 460.293;
let pre_number_income = 555;
let change_income = number_income > pre_number_income ? 1 : 0;
let how_much_change_income =
  ((number_income - pre_number_income) / pre_number_income) * 100;
let tmp_income = change_income === 1 ? '+' : '';
let income_change =
  tmp_income + how_much_change_income.toFixed(2).toString() + '%';

/*Expenses*/
let number_expenses = 280.943;
let pre_number_expenses = 100;
let change_expenses = number_expenses > pre_number_expenses ? 1 : 0;
let how_much_change_expenses =
  ((number_expenses - pre_number_expenses) / pre_number_expenses) * 100;
let tmp_expenses = change_expenses === 1 ? '+' : '';
let expenese_change =
  tmp_expenses + how_much_change_expenses.toFixed(2).toString() + '%';

/*Balance*/
let number_balance = 340.213;
let pre_number_balance = 400;
let change_balance = number_balance > pre_number_balance ? 1 : 0;
let how_much_change_balance =
  ((number_balance - pre_number_balance) / pre_number_balance) * 100;
let tmp_balance = change_balance === 1 ? '+' : '';
let balance_change =
  tmp_balance + how_much_change_balance.toFixed(2).toString() + '%';

const DataHeader = [
  {
    title: 'Sales',
    icon_type: MaterialCommunityIcons,
    icon_name: 'tag-multiple',
    sales: number_sales,
    change_icon_name: change_sale === 1 ? 'arrow-up' : 'arrow-down',
    change_icon_type: Entypo,
    sales_change: sales_change,
    subtitle: 'than last day',
    color_change: change_sale === 1 ? 'hsl(151,82%,70%)' : 'hsl(0,89%,70%)',
    back_color_change:
      change_sale === 1 ? 'hsl(151,82%,90%)' : 'hsl(0,89%,90%)',
  },
  {
    title: 'Income',
    icon_type: MaterialIcons,
    icon_name: 'euro-symbol',
    sales: number_income,
    change_icon_name: change_income === 1 ? 'arrow-up' : 'arrow-down',
    change_icon_type: Entypo,
    sales_change: income_change,
    subtitle: 'than last week',
    color_change: change_income === 1 ? 'hsl(151,82%,70%)' : 'hsl(0,89%,70%)',
    back_color_change:
      change_income === 1 ? 'hsl(151,82%,90%)' : 'hsl(0,89%,90%)',
  },
  {
    title: 'Expenses',
    icon_type: AntDesign,
    icon_name: 'creditcard',
    sales: number_expenses,
    change_icon_name: change_expenses === 1 ? 'arrow-up' : 'arrow-down',
    change_icon_type: Entypo,
    sales_change: expenese_change,
    subtitle: 'than last week',
    color_change: change_expenses === 1 ? 'hsl(151,82%,70%)' : 'hsl(0,89%,70%)',
    back_color_change:
      change_expenses === 1 ? 'hsl(151,82%,90%)' : 'hsl(0,89%,90%)',
  },
  {
    title: 'Balance',
    icon_type: Ionicons,
    icon_name: 'card',
    sales: number_balance,
    change_icon_name: change_balance === 1 ? 'arrow-up' : 'arrow-down',
    change_icon_type: Entypo,
    sales_change: balance_change,
    subtitle: 'than last week',
    color_change: change_balance === 1 ? 'hsl(151,82%,70%)' : 'hsl(0,89%,70%)',
    back_color_change:
      change_balance === 1 ? 'hsl(151,82%,90%)' : 'hsl(0,89%,90%)',
  },
];

export default DataHeader;
