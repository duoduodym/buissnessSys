import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import { Checkbox,Container,Header,Aside,Main,Menu,Submenu,
MenuItem,Button,Dialog,Input,Form,FormItem,Row,Col,Select,Option,
Table,TableColumn,Pagination,divider,CheckboxGroup,Message,MessageBox } from 'element-ui';
Vue.use(Checkbox).use(Container).use(Header).use(Aside).use(Main).use(Menu).use(Submenu).use(MenuItem).use(Button)
.use(Dialog).use(Input).use(Form).use(FormItem).use(Row).use(Col).use(Select).use(Option).use(TableColumn).use(Table)
.use(Pagination).use(divider).use(CheckboxGroup)
Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;