import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path:"/dashboard",
            component: importComponent("DashboardLayout"),
            children: [
                {
                    path:"/dashboard",
                    name:"DashboardPage",
                    meta: { title: 'Dashboard' },
                    component: importComponent("DashboardPage"),
                },

                {
                    path:"/book",
                    name:"BookPage",
                    meta: { title: 'Book' },
                    component: importComponent("MainMenu/BookPage"),
                },

                {
                    path:"/magazine",
                    name:"MagazinePage",
                    meta: { title: 'Magazine' },
                    component: importComponent("MainMenu/MagazinePage"),
                },

                {
                    path:"/profil",
                    name:"ProfilPage",
                    meta: { title: 'Profile' },
                    component: importComponent("MainMenu/ProfilPage"),
                },

                {
                    path:"/editprofil",
                    name:"EditProfilPage",
                    meta: { title: 'Edit Profile' },
                    component: importComponent("MainMenu/EditProfilPage"),
                },

            ],
        },

        {
            path:"/",
            name: "HomePage",
            meta: { title: 'Home' },
            component: importComponent("HomePage"),
        },

        {
            path:"/register",
            name: "RegisterMenu",
            meta: { title: 'Register' },
            component: importComponent("RegisterMenu"),
        },

        {
            path:"/login",
            name: "LoginMenu",
            meta: { title: 'Login' },
            component: importComponent("LoginMenu"),
        },

        {
            path: '*',
            redirect: '/'
        },

    ],
    });

    router.beforeEach((to, from, next) => {
        if(to.name != "LoginMenu" && localStorage.getItem("token") == null && to.name!="RegisterMenu" && to.name != "HomePage"){
            next('home')
            document.to.meta.title = "HomePage"
        }
        
        document.title = to.meta.title;
        next();
    });

    export default router;