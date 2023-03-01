import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { httpInterceptorProviders } from './core/services/interceptors';

import { environment } from 'src/environments/environment';
import { UserEffects } from './core/store/effects/user.effects';
import { BoardsEffects } from './core/store/effects/boards.effects';
import { ColumnsEffects } from './core/store/effects/columns.effects';
import { TasksEffects } from './core/store/effects/tasks.effect';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(http));
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
      defaultLanguage: 'en',
    }),
    EffectsModule.forRoot([
      BoardsEffects,
      UserEffects,
      ColumnsEffects,
      TasksEffects,
    ]),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
