import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, switchMap, throwError} from "rxjs";

let isRefrationg = false


export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req)

  const authService = inject(AuthService)
  const token = authService.token

  if (!token) return next(req)

  if (isRefrationg) {
    return refreshAndProceed(authService, req, next)
  }

  return next(addToken(req, token))
    .pipe(
      catchError(error => {
        if (error.status === 403) {
          return refreshAndProceed(authService, req, next)
        }
        return throwError(error)
      })
    )
}

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if ( !isRefrationg) {
    return authService.refreshAuthToken()
      .pipe(
        switchMap((res) => {
          return next(addToken(req, res.access_token))
        })
      )
  }
  return next(addToken(req, authService.token!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

}
