import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import { map } from "rxjs/operators";
import * as authActions from "../auth/store/auth.action";
import * as recipeActions from "../recipes/store/recipes.action";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.userSub = this.store
      .select("auth")
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  onSaveData() {
    //this.dataStorageService.storeRecipes();
    this.store.dispatch(new recipeActions.StoreRecipe());
  }

  onFetchData() {
    //this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new recipeActions.FetchRecipe());
  }

  onLogout() {
    //this.authService.logout();
    this.store.dispatch(new authActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
