import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../../modules/services/authentication/authentication.service";

@Injectable({ providedIn: 'root' })

export class RoleGuard implements CanActivate {

    constructor(private auth: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
        const user = this.auth.getCurrentUser();
        const roles = route.data['roles'] as Array<string>;
        if (user && roles.includes(user.role)) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}