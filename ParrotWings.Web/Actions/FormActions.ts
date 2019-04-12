import * as React from 'react';
import * as ReactDOM from 'react-dom';
import comment from 'material-ui/svg-icons/communication/comment';

export function makeDefaultValidationState(component: React.Component, ignore?: string[]): void {
  let validation = [];

  ignore = ignore || [];

  for (const key in component.state) {
    if (key === 'validation' || ignore.indexOf(key) != -1) {
      continue;
    }

    validation[key] = null;
  }

  component.state['validation'] = validation;
}

export function getValidationState(component: React.Component, key: string | string[]): boolean {
  if (typeof key === 'string') {
    if (key.indexOf('.') == -1) {
      return component.state['validation'] ? component.state['validation'][key] : true;
    } else {
      key = key.split('.');
    }
  }

  let result = component.state['validation'];

  key.forEach((value) => {
    if (result) {
      result = result[value];
    }
  });

  return result as boolean;
}

export function getValidationMessage(component: React.Component, key: string | string[], message: string): string {
  if (getValidationState(component, key) === false) {
    return message;
  } else {
    return null;
  }
}

export function isValid(component: React.Component): boolean {
  let result = true;

  $('input', ReactDOM.findDOMNode(component)).each((i, input: HTMLInputElement) => {
    if (!isValidInput(component, input)) {
      result = false;
    }
  });

  return result;
}

function getElementKeys(input: HTMLInputElement): string[] {
  let key: string = input.getAttribute('data-key') || input.getAttribute('id');
  let keys: string[];

  if (!key) {
    return null;
  }

  if (key.indexOf('.') == -1) {
    keys = [key];
  } else {
    keys = key.split('.');
  }

  return keys;
}

export function isValidInput(component: React.Component, input: HTMLInputElement): boolean {
  let result = true;
  let currentValidation = component.state['validation'];
  let validation = currentValidation;
  let keys: string[] = getElementKeys(input);
  let key: string;

  if (!keys) {
    return;
  }

  key = keys.pop();

  keys.forEach((value) => {
    validation = validation[value];
  });

  if (validation) {
    validation[key] = input.checkValidity();

    if (validation[key] && component.state['customValidation'] && typeof component.state['customValidation'][key] === 'function') {
      validation[key] = component.state['customValidation'][key]();
    }

    component.setState({ ['validation']: currentValidation } as any);

    result = validation[key];
  }

  console.debug('isValidInput', key, result);

  return result;
}

export function inputChangeHandler(component: React.Component, event: Event): void {
  let input = (event.target as HTMLInputElement);
  let key: string = input.getAttribute('data-key') || input.getAttribute('id');
  let keys: string[];

  if (!key) {
    return;
  }

  let currentState = component.state;
  let data = currentState;

  if (key.indexOf('.') == -1) {
    keys = [key];
  } else {
    keys = key.split('.');
  }

  key = keys.pop();

  keys.forEach((value) => {
    data = data[value];
  });

  if (typeof data[key] === 'number') {
    data[key] = parseFloat(input.value);
  } else {
    data[key] = input.value;
  }

  component.setState(currentState);
}

export function inputBlurHandler(component: React.Component, event: Event): void {
  isValidInput(component, event.target as HTMLInputElement);
}