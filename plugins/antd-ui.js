import Vue from 'vue'
import {
    Layout,
    Button,
    Icon,
    Select,
    Dropdown,
    Menu,
    Input,
    Tree,
    TreeSelect,
    Breadcrumb,
    Table,
    DatePicker,
    Switch,
    Popconfirm,
    Modal,
    message,
    Radio,
    Upload,
    Steps,
    Tabs,
    InputNumber,
    ConfigProvider,
    Checkbox,
    Tooltip
} from 'ant-design-vue/lib'

Vue.use(Dropdown);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Tree);
Vue.use(TreeSelect);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Popconfirm);
Vue.use(Modal);
Vue.prototype.$message = message
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(InputNumber);
Vue.use(ConfigProvider);
Vue.use(Tooltip);