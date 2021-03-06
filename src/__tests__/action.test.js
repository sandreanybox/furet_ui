/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import chai from 'chai';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../reducers';
import {updateGlobal} from '../testcase';
import '../views';
import '../fields';

jest.mock('../server-call')

test('Render Action Manager with default value from redux store', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const actions = require('../action'),
          ActionManager = actions.ActionManager;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <ActionManager/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Action Manager with default value from redux store with unexisting actionId', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const actions = require('../action'),
          ActionManager = actions.ActionManager;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <ActionManager actionId="1"/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Action Manager with default value from redux store with actionId', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();

    const actions = require('../action'),
          ActionManager = actions.ActionManager;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <ActionManager actionId="1"/>
            </MuiThemeProvider>
        </Provider>
    );
    store.dispatch({
        'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        'actionId': '1',
        'label': 'Action : 1',
        'viewId': '2',
        'views': [
            {
                'viewId': '2',
                'type': 'Thumbnail',
            },
        ],
        'model': 'Todo',
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Action Manager with default value from redux store with actionId and actionIds', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();

    const actions = require('../action'),
          ActionManager = actions.ActionManager;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <ActionManager actionId="1"/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        'actionId': '1',
        'label': 'Action : 1',
        'viewId': '2',
        'views': [
            {
                'viewId': '2',
                'type': 'Thumbnail',
            },
        ],
        'model': 'Todo',
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION',
        'actionId': '2',
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    store.dispatch({
        'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        'actionId': '2',
        'label': 'Action : 2',
        'viewId': '3',
        'views': [
            {
                'viewId': '3',
                'type': 'Thumbnail',
            },
        ],
        'model': 'Todo',
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Action with default value from redux store', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const actions = require('../action'),
          Action = actions.Action;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <Action/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Action with default value from redux store with unexisting actionId', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const actions = require('../action'),
          Action = actions.Action;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <Action actionId='1'/>
            </MuiThemeProvider>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Action with default value from redux store with actionId', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const actions = require('../action'),
          Action = actions.Action;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <Action 
                    actionId='1'
                    model='Todo'
                    viewId='1'
                    views={[
                        {
                            'viewId': '2',
                            'type': 'Thumbnail',
                        },
                    ]}
                />
            </MuiThemeProvider>
        </Provider>
    );
    store.dispatch({
        'type': 'UPDATE_ACTION_SELECT_VIEW',
        'actionId': '1',
        'viewId': '2',
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render Action with default value from redux store with disabled actionId', () => {
    const store = createStore(combineReducers(reducers));
    updateGlobal();
    const actions = require('../action'),
          Action = actions.Action;
    const component = renderer.create(
        <Provider store={store}>
            <MuiThemeProvider>
                <Action 
                    actionId='1'
                    model='Todo'
                    viewId='1'
                    views={[
                        {
                            'viewId': '2',
                            'type': 'Thumbnail',
                        },
                    ]}
                    disabled={true}
                />
            </MuiThemeProvider>
        </Provider>
    );
    store.dispatch({
        'type': 'UPDATE_ACTION_SELECT_VIEW',
        'actionId': '1',
        'viewId': '2',
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
