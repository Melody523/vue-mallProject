import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Theme = () => import('views/theme/Theme')
const Country = () => import('views/country/Country')
const BrandSearch = () => import('views/brandSearch/BrandSearch')
const NewGoods = () => import('views/newGoods/NewGoods')
const GoodsDetail = () => import('views/goodsDetail/GoodsDetail')
const BrandGoods = () => import('views/newGoods/BrandGoods')
const Login = () => import('views/login/Login')
const Register = () => import('views/login/Register')
const FindPsw = () => import('views/login/FindPsw')
const SetPsw = () => import('views/login/SetPsw')
const SetPswSuccess = () => import('views/login/SetPswSuccess')
const Protocol = () => import('views/protocol/Protocol')
const OrderList = () => import('views/orderList/OrderList')
const SurePay = () => import('views/surePay/SurePay')
const Search = () => import('views/search/Search')
const MessageCenter = () => import('views/messageCenter/MessageCenter')
const Public = () => import('views/public/Public')
const PublicDetail = () => import('views/public/PublicDetail')
const Coupon = () => import('views/coupon/Coupon')
const FromAddress = () => import('views/fromAddress/FromAddress')
const AddAddress = () => import('views/fromAddress/AddAddress')
const Collection = () => import('views/collection/Collection')
const UseHelp = () => import('views/useHelp/UseHelp')
const Intro = () => import('views/useHelp/Intro')
const Person = () => import('views/person/Person')
const Nickname = () => import('views/person/NickName')
const ModifyMobile = () => import('views/person/ModifyMobile')
const ModifyMobileSuccess = () => import('views/person/ModifyMobileSuccess')
const ModifyPsw = () => import('views/person/ModifyPsw')
const ModifyPswSuccess = () => import('views/person/ModifyPswSuccess')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '唯妮海购'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/theme/:id',
    component: Theme,
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/country',
    component: Country,
    meta: {
      title: '国家馆'
    }
  },
  {
    path: '/brandSearch',
    component: BrandSearch,
    meta: {
      title: '品牌搜索'
    }
  },
  {
    path: '/newGoods',
    component: NewGoods,
    meta: {
      title: '新品'
    }
  },
  {
    path: '/goodsDetail/:goodsNo',
    component: GoodsDetail,
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/brandGoods',
    component: BrandGoods,
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/findPsw',
    component: FindPsw,
    meta: {
      title: '找回密码'
    }
  },
  {
    path: '/setPsw',
    component: SetPsw,
    meta: {
      title: '设置密码'
    }
  },
  {
    path: '/setPswSuccess',
    component: SetPswSuccess,
    meta: {
      title: '设置密码成功'
    }
  },
  {
    path: '/protocol',
    component: Protocol,
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/orderList',
    component: OrderList,
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/surePay',
    component: SurePay,
    meta: {
      title: '确认支付'
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/messageCenter',
    component: MessageCenter,
    meta: {
      title: '信息中心'
    }
  },
  {
    path: '/public',
    component: Public,
    meta: {
      title: '公告'
    }
  },
  {
    path: '/publicDetail/:id',
    component: PublicDetail,
    meta: {
      title: '公告详情'
    }
  },
  {
    path: '/coupon',
    component: Coupon,
    meta: {
      title: '优惠券'
    }
  },
  {
    path: "/fromAddress",
    component: FromAddress,
    meta: {
      title: '地址管理'
    }
  },
  {
    path: "/addAddress",
    component: AddAddress,
    meta: {
      title: '添加地址'
    }
  },
  {
    path: "/collection",
    component: Collection,
    meta: {
      title: '我的收藏'
    }
  },
  {
    path: "/useHelp",
    component: UseHelp,
    meta: {
      title: '使用帮助'
    }
  },
  {
    path: "/intro/:name",
    component: Intro,
    meta: {
      title: '详情介绍'
    }
  },
  {
    path: '/person',
    component: Person,
    meta: {
      title: '个人信息'
    }
  },
  {
    path: '/nickname',
    component: Nickname,
    meta: {
      title: '昵称'
    }
  },
  {
    path: '/modifyMobile',
    component: ModifyMobile,
    meta: {
      title: '修改手机号'
    }
  },
  {
    path: '/modifyMobileSuccess',
    component: ModifyMobileSuccess,
    meta: {
      title: '修改手机号成功'
    }
  },
  {
    path: '/modifyPsw',
    component: ModifyPsw,
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/modifyPswSuccess',
    component: ModifyPswSuccess,
    meta: {
      title: '修改密码成功'
    }
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history'
})

export default router
