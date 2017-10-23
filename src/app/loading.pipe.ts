import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform, ɵisObservable, ɵisPromise } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

interface SubscriptionStrategy {
  createSubscription(async: any, updateLatestValue: any): any;
  dispose(subscription: any): void;
  onDestroy(subscription: any): void;
}

class ObservableStrategy implements SubscriptionStrategy {
  createSubscription(async: any, updateLatestValue: any): any {
    return async.subscribe({
      error: updateLatestValue,
      complete: updateLatestValue,
    });
  }

  dispose(subscription: any): void { subscription.unsubscribe(); }

  onDestroy(subscription: any): void { subscription.unsubscribe(); }
}

class PromiseStrategy implements SubscriptionStrategy {
  createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): any {
    return async.then(updateLatestValue, updateLatestValue);
  }

  dispose(subscription: any): void { }

  onDestroy(subscription: any): void { }
}

const _promiseStrategy = new PromiseStrategy();
const _observableStrategy = new ObservableStrategy();

/**
 * 获取一个异步对象的执行状态
 *
 * <span>{{ (user$ | async)?.name }}</span>
 * <span *ngIf="user$ | fncLoading">Loading...</span>
 */
@Pipe({
  name: 'fncLoading',
  pure: false,
})
export class LoadingPipe implements OnDestroy, PipeTransform {

  private _value = false;

  private _subscription: any = null;
  private _obj: Observable<any> | Promise<any> = null;
  private _strategy: SubscriptionStrategy = null;

  constructor(private _ref: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    if (this._obj) {
      this._dispose();
    }
  }

  transform(obj: Observable<any> | Promise<any>): boolean {
    if (obj !== this._obj && this._obj) {
      this._dispose();
    }

    if (!obj) {
      this._value = false;
      return this._value;
    }

    if (this._obj !== obj) {
      this._subscribe(obj);
      this._value = true;
      return this._value;
    }

    return this._value;
  }

  private _subscribe(obj: Observable<any> | Promise<any>): void {
    this._obj = obj;
    this._strategy = this._selectStrategy(obj);
    this._subscription = this._strategy.createSubscription(obj, () => this._resolveLoading(obj));
  }

  private _selectStrategy(obj: Observable<any> | Promise<any>): any {
    if (ɵisPromise(obj)) {
      return _promiseStrategy;
    }

    if (ɵisObservable(obj)) {
      return _observableStrategy;
    }

    throw new Error('invalid pipe argument');
  }

  private _dispose(): void {
    this._strategy.dispose(this._subscription);
    this._value = null;
    this._subscription = null;
    this._obj = null;
  }

  private _resolveLoading(async: Observable<any> | Promise<any>): void {
    if (async !== this._obj) {
      return;
    }

    this._value = false;
    this._ref.markForCheck();
  }
}