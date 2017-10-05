import EventEmitter from "events";
import dispatcher from "../dispatcher";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Home from "../components/Home";
import UserRegistration from "../components/UserRegistration";
import Settings from "../components/Settings";
import ProjectsList from "../components/ProjectsList";

class BasicStore extends EventEmitter {
    constructor() {
        super();

        this.apiUrl = 'http://localhost:8000/';
        this.urlPaths = {
            home: '/',
            dashboard: '/dashboard',
            projects: '/projects',
            settings: '/settings',
            register: '/register',
            login: '/login',
            logout: '/logout',
            notFound: '/404',
        };

        this.navItems = [
            {
                id: 10,
                text: 'Home',
                url: this.urlPaths.home,
                component: Home,
                auth: false
            },
            {
                id: 15,
                text: 'Projects',
                url: this.urlPaths.projects,
                component: ProjectsList,
                auth: true
            },
            {
                id: 20,
                text: 'Dashboard',
                url: this.urlPaths.dashboard,
                component: Dashboard,
                auth: true
            },
            {
                id: 25,
                text: 'Settings',
                url: this.urlPaths.settings,
                component: Settings,
                auth: true
            },
            {
                id: 29,
                text: 'Register',
                url: this.urlPaths.register,
                component: UserRegistration,
                auth: false
            },
            {
                id: 30,
                text: 'Login',
                url: this.urlPaths.login,
                component: Login,
                auth: false
            },
            {
                id: 31,
                text: 'Logout',
                url: this.urlPaths.logout,
                component: Logout,
                auth: true
            },
        ];
        // Token -- Accessing from local storage
        this.token = localStorage.getItem('token') || '';
        this.userRole = localStorage.getItem('role') || '';

        // Declaring all urls
        this.allUrls = [];

        // Headers
        this.headers = {
            'Content-Type': 'application/json'
        };
        if(this.token !== "") {
            this.headers.Authorization = "Token " + this.token;
        }
        // Authentication data
        this.isAuthentication = this.token !== "";
    }

    makeUrl(path) {
        return this.apiUrl + path;
    }

    setToken(token, role) {
        this.token = token;
        this.userRole = role;
        // Set token to local storage
        localStorage.setItem('token', String(token));
        // Set role to local storage
        localStorage.setItem('role', String(role));
        // Change the authentication value
        this.isAuthentication = true;
        if (this.token !== '') {
            this.headers.Authorization = 'Token ' + this.token;
        }
        // Response to components for store change
        this.emit("change");
    }

    destroyToken() {
        this.token = '';
        this.userRole = '';
        // Set local storage token empty
        localStorage.setItem('token', '');
        // Set local storage role empty
        localStorage.setItem('role', '');
        this.isAuthentication = false;
        // Trick to delete Authorization when no need
        delete this.headers.Authorization;
        this.emit("change");
    }

    getToken() {
        return this.token;
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE":
                console.log("Create Action");
                break;
            case "UPDATE":
                console.log("UPDATE Action");
                break;
            case "DELETE":
                console.log("DELETE Action");
                break;
            default:
                console.log('No specified action');
        }
    }
}

const basicStore = new BasicStore();
dispatcher.register(basicStore.handleActions.bind(basicStore));
export default basicStore;