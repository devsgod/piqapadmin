import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('../../restaurants/restaurants.module').then(m => m.RestaurantsModule)
  },
  {
    path: 'foods',
    loadChildren: () => import('../../foods/foods.module').then(m => m.FoodsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('../../orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'drivers',
    loadChildren: () => import('../../drivers/drivers.module').then(m => m.DriversModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('../../stats/stats.module').then(m => m.StatsModule)
  },
  {
    path: 'coupons',
    loadChildren: () => import('../../coupons/coupons.module').then(m => m.CouponsModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../../chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'banners',
    loadChildren: () => import('../../banners/banners.module').then(m => m.BannersModule)
  },
  {
    path: 'restdetails',
    loadChildren: () => import('../../restdetails/restdetails.module').then(m => m.RestdetailsModule)
  },
  {
    path: 'edit-driver',
    loadChildren: () => import('../../driverdetail/driverdetails.module').then(m => m.DriverdetailsModule)
  },
  {
    path: 'add-coupon',
    loadChildren: () => import('../../addcoupon/addcoupon.module').then(m => m.AddcouponModule)
  },
  {
    path: 'add-banner',
    loadChildren: () => import('../../addbanner/addbanner.module').then(m => m.AddbannerModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'orderdetails',
    loadChildren: () => import('../../orderdetails/orderdetails.module').then(m => m.OrderdetailsModule)
  },
  {
    path: 'userdetails',
    loadChildren: () => import('../../userdetails/userdetails.module').then(m => m.UserdetailsModule)
  },
  {
    path: 'fooddetails',
    loadChildren: () => import('../../fooddetails/fooddetails.module').then(m => m.FooddetailsModule)
  },




  {
    path: 'calendar',
    loadChildren: () => import('../../calendar/calendar.module').then(m => m.CalendarsModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsNg2Module)
  },
   {
    path: 'forms',
    loadChildren: () => import('../../forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('../../tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'datatables',
    loadChildren: () => import('../../data-tables/data-tables.module').then(m => m.DataTablesModule)
  },
  {
    path: 'uikit',
    loadChildren: () => import('../../ui-kit/ui-kit.module').then(m => m.UIKitModule)
  },
  {
    path: 'components',
    loadChildren: () => import('../../components/ui-components.module').then(m => m.UIComponentsModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('../../cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: 'chat-ngrx',
    loadChildren: () => import('../../chat-ngrx/chat-ngrx.module').then(m => m.ChatNGRXModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('../../inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: 'taskboard',
    loadChildren: () => import('../../taskboard/taskboard.module').then(m => m.TaskboardModule)
  },
  {
    path: 'taskboard-ngrx',
    loadChildren: () => import('../../taskboard-ngrx/taskboard-ngrx.module').then(m => m.TaskboardNGRXModule)
  }
];
