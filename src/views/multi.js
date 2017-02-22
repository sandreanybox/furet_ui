import Base from './base';
import React from 'react';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import {blue500, red500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import DropdownMenu from './dropdown';


export class Multi extends Base {
    constructor (props) {
        super(props);
        this.state = {
            selectedIds: [],
            change: {},
            search: {},
            searchText: '',
        };
    }
    componentWillReceiveProps(nextProps) {
        const search = Object.assign({}, this.state.search);
        if (_.keys(search).length == 0) {
            _.each(this.props.search || [], s => {
                if (s.default) search[s.key] = [s.default];
            });
            this.setState({search});
        }
    }
    addNewEntry () {
        if (this.props.onSelect) {
            this.props.dispatch({
                type: 'UPDATE_ACTION_SELECT_VIEW',
                actionId: this.props.actionId,
                viewId: this.props.onSelect,
                params: {id: null, readonly: false, returnView: this.props.viewId},
            })
        }
    }
    removeEntry () {
        console.log('todo', 'removeEntry');
    }
    renderSearchBarButton () {
        return (
            <div className="row">
                { this.props.creatable &&
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.addNewEntry.bind(this)}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <ActionNoteAdd color={blue500} />
                        </IconButton>
                    </div>
                }
                { this.state.selectedIds.length != 0 && this.props.deletable &&
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.removeEntry.bind(this)}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <ActionDeleteForever color={red500} />
                        </IconButton>
                    </div>
                }
                { (this.props.buttons || []).length != 0 && 
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                         style={{paddingLeft: 10, paddingRight: 0}}
                    >
                        <DropdownMenu 
                            label="Actions" 
                            menus={this.props.buttons} 
                        />
                    </div>
                }
                { this.state.selectedIds.length != 0 && this.props.onSelect_buttons &&
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <DropdownMenu 
                            label="More" 
                            menus={this.props.onSelect_buttons} 
                            selectedIds={this.state.selectedIds}
                        />
                    </div>
                }
            </div>
        )
    }
    onUpdateInput (val) {
        this.setState({searchText: val});
    }
    updateSearchQuery (search) {
        console.log('updateSearchQuery', this.state.search);
        this.setState({search});
    }
    onEntrySelect(id) {
        if (this.props.onSelect) {
            this.props.dispatch({
                type: 'UPDATE_ACTION_SELECT_VIEW',
                actionId: this.props.actionId,
                viewId: this.props.onSelect,
                params: {id, returnView: this.props.viewId},
            })
        }
    }
    onNewRequest (val) {
        const search = Object.assign({}, this.state.search),
              index = val.text.indexOf(' : '),
              value = val.text.slice(index + 3);
        if (value) {
            if (! search[val.value]) search[val.value] = [];
            search[val.value].push(value);
            this.setState({searchText: ''});
            this.updateSearchQuery(search)
        }
    }
    onRequestDelete (key) {
        const search = Object.assign({}, this.state.search)
        if (search[key]) delete search[key];
        this.updateSearchQuery(search)
    }
    renderSearchBar () {
        const tags = [],
              choices=[];
        _.each(this.state.search, (values, key) => {
            const label = _.find(this.props.search, s => (s.key == key)).label;
            tags.push(
                <li key={key}>
                    <Chip onRequestDelete={() => {this.onRequestDelete(key)}}>
                        {label + ' : ' + values.join(', ')}
                    </Chip>
                </li>
            );
        });
        _.each(this.props.search || [], s => {
            choices.push({text: s.label + ' : ' + this.state.searchText, value: s.key});
        });
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                    {this.renderSearchBarButton()}
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-6">
                    <ul className="list-inline"
                        style={{
                            border: '2px solid gray',
                            WebkitBorderRadius: '10px',
                            MozBorderRadius: '10px',
                            borderRadius: '10px'
                        }}
                    >
                        <li>
                            <ul className="list-inline">
                                {tags}
                            </ul>
                        </li>
                        <li>
                            <AutoComplete
                                id='searchText'
                                filter={AutoComplete.caseInsensitiveFilter}
                                onNewRequest={this.onNewRequest.bind(this)}
                                onUpdateInput={this.onUpdateInput.bind(this)}
                                dataSource={choices}
                                searchText={this.state.searchText}
                                fullWidth={true}
                            />
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                    {this.props.selector}
                </div>
            </div>
        );
    }
}

export default Multi
