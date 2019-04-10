import * as React from 'react';
import { Snackbar } from 'material-ui';
import {
  inputChangeHandler,
  inputBlurHandler,
  makeDefaultValidationState,
  getValidationMessage,
  isValid
} from '@Actions/FormActions';

import { token, getUserData } from '@Actions/StorageActions';

export class Component<P, S> extends React.Component<P, S> {

  public input_changed;
  public input_lostFocus;

  private _shouldComponentUpdate: boolean = true;

  shouldComponentUpdate() {
    return this._shouldComponentUpdate;
  }
    
  public get user(): any {
    return getUserData();
  }
    
  public get token(): any {
    return token;
  }

  constructor(props, context) {
    super(props, context);

    this.input_changed = inputChangeHandler.bind(this, this);
    this.input_lostFocus = inputBlurHandler.bind(this, this);
  }
    
  public setStateAsync(state: S, doNotUpdate?: boolean): Promise<S> {
    this._shouldComponentUpdate = (typeof doNotUpdate != 'boolean' || doNotUpdate === false);

    return new Promise((resolve) => {
      this.setState(state, () => {
        resolve(this.state);

        this._shouldComponentUpdate = true;
      });
    });
  }
    
  public makeDefaultValidationState(ignore?: string[]): void {
    makeDefaultValidationState(this, ignore);
  }
    
  public get isValid(): boolean {
    return isValid(this);
  }
    
  public getValidationMessage(key: string | string[], message: string): string {
    return getValidationMessage(this, key, message);
  }

  componentDidMount() {
    if (this.props['pageTitle']) {
      document.title = `${this.props['pageTitle']} - ${TITLE}`;
    } else {
      document.title = TITLE;
    }
  }

}