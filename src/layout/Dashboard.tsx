/**
 * 본페이지 진입시, 세션이 없으면 /login으로 자동이동(포워딩) 한다
 * - 세션을 어디서 체크할 것인가?
 *  - sessionStorage 를 사용 / html5에서 추가되었다.
 *    - 세션 획득, 세션 제거, 세션 추가 및 설정(업데이트)
 *  - 로그인
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShopIcon from '@mui/icons-material/Shop';
import ComputerIcon from '@mui/icons-material/Computer';
import ToysIcon from '@mui/icons-material/Toys';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InputIcon from '@mui/icons-material/Input';
import HomeIcon from '@mui/icons-material/Home';
import ChairIcon from '@mui/icons-material/Chair';
import StoreIcon from '@mui/icons-material/Store';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// UI 컴포넌트에 사용 되는 타입
import { type Router, type Navigation, SignInPage } from '@toolpad/core';
//TODO 세션관련 내용 획득
import {
  getSession,//세션 체크용
  removeSession,//로그아웃용
  setSession
} from '../utils'
//페이지 이동관련
import {useNavigate} from 'react-router-dom';

// 타입가져오기
import type {
  DemoProps,
  IPage

} from '../types'
import ResponsiveGrid from './ResponsiveGrid';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import ProductCreatePage from '@/pages/productCreate';
import All from '@/pages/product/all';
import ProductDetailPage from '@/pages/ProdcutDetailPage';

// 커스텀 컴포넌트 가져오기
// import Main from '../jsTots';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: '로그인 정보',
  },
  {
    segment: 'signup',
    title: '회원 가입',
    icon: <LockOpenIcon />,
  },
  {
    segment: 'login',
    title: '로그인',
    icon: <LoginIcon />,
  },
  {
    segment: 'logout',
    title: '로그아웃',
    icon: <LogoutIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: '판매 물품',
  },
  {
    segment: 'productCreate',
    title: '물품등록',
    icon: <InputIcon />,
  },
  {
    segment: 'product',
    title: '판매 물품',
    icon: <StoreIcon />,
    children: [
      {
        segment: 'all',
        title: '전체',
        icon: <ShopIcon />,
      },
      {
        segment: 'grocery',
        title: '식품',
        icon: <RestaurantIcon />,
      },
      {
        segment: 'furniture',
        title: '가구',
        icon: <ChairIcon />,
      },
      {
        segment: 'elect',
        title: '전자 제품',
        icon: <ComputerIcon />,
      },
      {
        segment: 'toy',
        title: '완구',
        icon: <ToysIcon />,
      },
    ],
  },
  
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: '주문 및 카트',
  },
  {
    segment: 'carts',
    title: '카트',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'orders',
    title: '주문',
    icon: <ShoppingBagIcon />,
  },
  {
    segment: 'address',
    title: '주소 설정',
    icon: <HomeIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: '통계',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
// 컴포넌트의 인자 -> props 인데 아래와 같은 표현은 => (중괄호)<- props 를 바로객체 구조분해
//function DemoPageContent(props : { pathname: string }){
//function DemoPageContent(props : 타입){
function DemoPageContent({ pathname }: IPage) {
  const isProductPage = pathname.startsWith('/product/');
  const category = isProductPage ? pathname.split('/')[2] : null; // '/product/' 다음의 부분이 카테고리

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
      {isProductPage && category === 'all' && <All category="all" />}
      {isProductPage && category && category !== 'all' && <All category={category} />}
      {pathname ==='/product/detail/1' &&<ProductDetailPage/>}
      {
        pathname ==='/login'&&<LoginPage/>
      }
      {
        pathname ==='/signup'&&<SignupPage/>
      }
      {
        pathname ==='/productCreate'&&<ProductCreatePage/>
      }
    </Box>
  );
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const [pathname, setPathname] = React.useState('/dashboard');
  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
