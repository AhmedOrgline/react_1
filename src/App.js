import { Routes , Route} from 'react-router-dom'
import Sign     from './SignUp'
import Login    from './login'
import Header   from './component/header'
import Home     from './home'
import Contact  from './contact'
import About    from './about'
import Footer   from './component/footer'
import Dashbord from './dashboard'
import Profile  from './profile'
import Update   from './Update'
import CreateUser from './createUser'
import RequireAuth from './RequireAuth'
import PersistLogin from './PersistLogin'
import Product from './product'
import NewProduct from './newProduct'
import UpdateProduct from './updateProduct'


export default function App(){
    return( 
        <div>
            <header>
                <Header/>
            </header>
            <div style={{padding : "10px"}}>
                <Routes>
                    <Route path ="/register"  element={<Sign />}   />
                    <Route path ="/login"     element={<Login />}  />
                    <Route path ="/"          element={<Home />}   />
                    <Route path ="/contact"   element={<Contact />}/>
                    <Route path ="/about"     element={<About />}  />
                    <Route element={<PersistLogin/>}>
                        <Route element = {<RequireAuth />}>
                            <Route path ="/dash"      element={<Dashbord />}>
                                <Route path='profile' element={<Profile/>} />
                                <Route path='profile/:id' element={<Update/>} />
                                <Route path='profil/create' element={<CreateUser/>} />
                                <Route path='product' element={<Product/>} />
                                <Route path='produc/create' element={<NewProduct/>} />
                                <Route path='product/:id' element={<UpdateProduct/>} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </div>
            <footer><Footer/></footer>
        </div>
    )
}