import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

//SLIDER
import {register} from 'swiper/element/bundle';
register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//PUBLIC pages
import ErrorPage from './pages/custom/ErrorPage/index.jsx';
import Home from './pages/public/Home/index.jsx';
import Cadastro from './pages/public/Cadastro/index.jsx';
import Login from './pages/public/Login/index.jsx';
import RecuperarSenha from './pages/public/RecuperarSenha/index.jsx';
import Bonus from './pages/public/Bonus/index.jsx';

//PRIVATE Pages
import Conta from './pages/private/Conta/index.jsx';
import Deposito from './pages/private/Deposito/index.jsx';
import Saque from './pages/private/Saque/index.jsx';
import Jogo from './pages/private/Jogo/index.jsx';

//ADDMIN pages
import LoginAdmin from './pages/admin/LoginAdmin/index.jsx';
import MenuAdmin from './pages/admin/MenuAdmin/index.jsx';
import GestaoJogos from './pages/admin/GestaoJogos';
import SalvarJogo from './pages/admin/SalvarJogo/index.jsx';
import EditarJogo from './pages/admin/EditarJogo/index.jsx';
import GestaoUsuarios from './pages/admin/GestaoUsuarios/index.jsx';
import GestaoBonus from './pages/admin/GestaoBonus';
import SalvarBonus from './pages/admin/SalvarBonus/index.jsx';
import EditarBonus from './pages/admin/EditarBonus/index.jsx';
import GestaoDepositos from './pages/admin/GestaoDepositos';
import GestaoSaques from './pages/admin/GestaoSaques';
import DetalhesUsuario from './pages/admin/DetalhesUsuario/index.jsx';
import DetalhesDeposito from './pages/admin/DetalhesDeposito';
import DetalhesSaque from './pages/admin/DetalhesSaque/index.jsx';
import GestaoImagens from './pages/admin/GestaoImagens/index.jsx';
import SalvarImagem from './pages/admin/SalvarImagem/index.jsx';
import EditarImagem from './pages/admin/EditarImagem/index.jsx';

//GAMES page
import Mines from './games/Mines/index.jsx';

//contextos
import { SessaoProvider } from './contexts/SessaoContext.jsx';
import { FormulariosProvider } from './contexts/FormulariosContext.jsx';
import { MessageBoxProvider } from './contexts/MessageBoxContext.jsx';
import { AdminSessaoProvider } from './contexts/AdminSessaoContext.jsx';
import { LoaderProvider } from './contexts/LoaderContext.jsx';
import { SaldoProvider } from './contexts/SaldoContext.jsx';
import { PaginacaoProvider } from './contexts/PaginacaoContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cadastro",
        element: <Cadastro/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/recuperarSenha",
        element: <RecuperarSenha/>
      },
      {
        path: "/jogo",
        element: <Jogo/>
      },
      {
        path: "/mines",
        element: <Mines/>
      },
      {
        path: "/conta",
        element: <Conta/>
      },
      {
        path: "/deposito",
        element: <Deposito/>
      },
      {
        path: "/saque",
        element: <Saque/>
      },
      {
        path: "/bonus",
        element: <Bonus/>
      },
      {
        path: "/adm/login",
        element: <LoginAdmin/>
      },
      {
        path: "/adm/menuAdmin",
        element: <MenuAdmin/>
      },
      {
        path: "/adm/jogos",
        element: <GestaoJogos/>
      },
      {
        path: "/adm/salvarjogo",
        element: <SalvarJogo/>
      },
      {
        path: "/adm/editarjogo/:identificador",
        element: <EditarJogo/>
      },
      {
        path: "/adm/usuarios",
        element: <GestaoUsuarios/>
      },
      {
        path: "/adm/usuario/:identificador",
        element: <DetalhesUsuario/>
      },
      {
        path: "/adm/bonus",
        element: <GestaoBonus/>
      },
      {
        path: "/adm/salvarBonus",
        element: <SalvarBonus/>
      },
      {
        path: "/adm/editarBonus/:identificador",
        element: <EditarBonus/>
      },
      {
        path: "/adm/imagens",
        element: <GestaoImagens/>
      },
      {
        path: "/adm/salvarImagem",
        element: <SalvarImagem/>
      },    
      {
        path: "/adm/editarImagem/:identificador",
        element: <EditarImagem/>
      },    
      {
        path: "/adm/depositos",
        element: <GestaoDepositos/>
      },
      {
        path: "/adm/deposito/:identificador",
        element: <DetalhesDeposito/>
      },
      {
        path: "/adm/saques",
        element: <GestaoSaques/>
      },
      {
        path: "/adm/saque/:identificador",
        element: <DetalhesSaque/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <SessaoProvider>
    <AdminSessaoProvider>
      <FormulariosProvider>
        <MessageBoxProvider>
          <LoaderProvider>
            <PaginacaoProvider>
              <SaldoProvider>
                <RouterProvider router={router}/>
              </SaldoProvider>
            </PaginacaoProvider>
          </LoaderProvider>
        </MessageBoxProvider>
      </FormulariosProvider>
    </AdminSessaoProvider>
  </SessaoProvider>
)
