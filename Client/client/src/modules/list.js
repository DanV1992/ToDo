import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
    
    @inject(Router)
    export class List {
      constructor(router) {
        this.router = router;
              this.message = 'List';
      }
    
      logout(){
          this.router.navigate('home');
      }
    

    logout(){
        sessionStorage.removeItem('user');
        this.auth.logout();
    }
}
    
    